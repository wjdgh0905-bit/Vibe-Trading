"""Options Lab HTTP routes for the Web UI.

Mounted by ``agent/api_server.py`` via ``register_options_routes(app, ...)``,
mirroring ``src/api/alpha_routes.py``'s module-per-feature pattern.

Routes (auth via the caller-supplied ``require_auth`` dependency):

- ``GET  /options/chain``   — thin read-only wrapper over ``OptionsChainTool``
- ``POST /options/surface`` — vol-surface grid: ``(expiry, strike, iv)`` points
                               across every expiration of a symbol
- ``POST /options/greeks``  — per-leg + aggregated Greeks for a leg basket via
                               ``OptionsPricingTool``'s Black-Scholes calc
- ``POST /options/payoff``  — payoff-curve data at expiry and at an arbitrary
                               scenario point (days elapsed / IV shift)

Design notes (see ``.github/proposals/options-lab.md``):

- Pure calculation/aggregation endpoints. They call ``OptionsChainTool`` /
  ``OptionsPricingTool`` directly — never the agent orchestrator — so they
  consume no "run" resource and never touch order placement or mandate
  gating (``trading_place_order`` etc. live entirely elsewhere). Read-only.
- ``/options/surface`` calls the chain tool once per expiration, which is
  expensive for symbols with many expirations, so results are cached with a
  short TTL in a process-local dict (``_SURFACE_CACHE``) kept separate from
  the on-disk loader cache gated by the ``VIBE_TRADING_DATA_CACHE`` env var.
- Risk-free rate: the proposal leaves this as an open question. We default
  to 0.05, matching ``OptionsPricingTool``'s own existing default, and let
  callers override it per-request (and per-leg). No dividend yield input —
  out of scope for v1, same as the proposal's deferred "leg presets" feature.
- Missing/outlier implied volatility (thin yfinance chains) is surfaced as an
  ``outlier: true`` flag on the affected surface point rather than dropped or
  treated as an error, so the frontend can grey it out (proposal §6).
"""

from __future__ import annotations

import asyncio
import json
import logging
import re
import threading
import time
from typing import Any, Awaitable, Callable, Literal

import numpy as np
from fastapi import Depends, FastAPI, HTTPException, Query
from pydantic import BaseModel, Field, field_validator, model_validator

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Constants / shared validation
# ---------------------------------------------------------------------------

# Symbol shape: letters/digits plus '.' and '-' (e.g. "AAPL", "BRK.B"),
# 1-15 chars. Rejects whitespace/script-injection-shaped input before it
# ever reaches the Yahoo client.
_SYMBOL_RE = re.compile(r"^[A-Za-z0-9.\-]{1,15}$")

_MAX_LEGS = 20
_DEFAULT_RISK_FREE_RATE = 0.05  # matches OptionsPricingTool's own default
_MAX_SURFACE_EXPIRATIONS = 12
_SURFACE_CACHE_TTL_SECONDS = 30.0
_MAX_PAYOFF_STEPS = 201


def _normalize_symbol(raw: str) -> str:
    """Uppercase + validate a ticker; raises HTTPException(400) if malformed."""
    symbol = (raw or "").strip().upper()
    if not symbol or not _SYMBOL_RE.fullmatch(symbol):
        raise HTTPException(status_code=400, detail=f"invalid symbol: {raw!r}")
    return symbol


def _safe_error(exc: BaseException) -> str:
    """Sanitised user-facing error string for unexpected exceptions.

    Mirrors ``alpha_routes._safe_error``: never echoes the exception message
    (paths, stack frames). Callers should ``logger.exception`` first.
    """
    return "internal error; see server logs"


def _parse_tool_envelope(raw: str) -> dict[str, Any]:
    """Parse a BaseTool JSON-string result; 502 on unexpected non-JSON."""
    try:
        parsed = json.loads(raw)
    except (TypeError, json.JSONDecodeError) as exc:
        logger.exception("options tool returned non-JSON output")
        raise HTTPException(status_code=502, detail=_safe_error(exc))
    if not isinstance(parsed, dict):
        raise HTTPException(status_code=502, detail="malformed tool response")
    return parsed


# ---------------------------------------------------------------------------
# Surface cache — short-TTL, in-memory, process-local. Deliberately separate
# from the on-disk loader cache toggled by VIBE_TRADING_DATA_CACHE: this one
# only smooths repeated /options/surface calls (e.g. re-renders / retries)
# over a ~30s window, not cross-process/cross-restart persistence.
# ---------------------------------------------------------------------------

_SURFACE_CACHE: dict[str, tuple[float, dict[str, Any]]] = {}
_SURFACE_CACHE_LOCK = threading.Lock()


def _surface_cache_get(key: str) -> dict[str, Any] | None:
    with _SURFACE_CACHE_LOCK:
        entry = _SURFACE_CACHE.get(key)
        if entry is None:
            return None
        ts, data = entry
        if time.time() - ts > _SURFACE_CACHE_TTL_SECONDS:
            _SURFACE_CACHE.pop(key, None)
            return None
        return data


def _surface_cache_set(key: str, data: dict[str, Any]) -> None:
    with _SURFACE_CACHE_LOCK:
        _SURFACE_CACHE[key] = (time.time(), data)


def clear_surface_cache() -> None:
    """Test hook: drop all cached surface results."""
    with _SURFACE_CACHE_LOCK:
        _SURFACE_CACHE.clear()


# ---------------------------------------------------------------------------
# Request/response schemas
# ---------------------------------------------------------------------------


class OptionLeg(BaseModel):
    """One leg of a position: a single call/put contract + signed quantity."""

    option_type: Literal["call", "put"]
    strike: float = Field(..., gt=0)
    expiry_days: float = Field(..., ge=0, description="Days remaining to expiry")
    iv: float = Field(..., gt=0, description="Annualised implied volatility, e.g. 0.25 for 25%")
    quantity: float = Field(..., description="Signed contract count: positive = long, negative = short")
    risk_free_rate: float | None = Field(
        None, description="Per-leg override; falls back to the request-level risk_free_rate"
    )

    @field_validator("iv")
    @classmethod
    def _iv_finite(cls, v: float) -> float:
        if not np.isfinite(v):
            raise ValueError(f"iv must be finite, got {v}")
        return v


class GreeksRequest(BaseModel):
    """POST /options/greeks body."""

    spot: float = Field(..., gt=0)
    risk_free_rate: float = Field(_DEFAULT_RISK_FREE_RATE)
    legs: list[OptionLeg] = Field(..., min_length=1, max_length=_MAX_LEGS)


class PriceRange(BaseModel):
    """A linspace-shaped underlying-price sweep for payoff curves."""

    min: float = Field(..., gt=0)
    max: float = Field(..., gt=0)
    steps: int = Field(41, ge=2, le=_MAX_PAYOFF_STEPS)

    @model_validator(mode="after")
    def _min_lt_max(self) -> "PriceRange":
        if self.min >= self.max:
            raise ValueError("price_range.min must be < price_range.max")
        return self


class PayoffRequest(BaseModel):
    """POST /options/payoff body.

    ``days_elapsed`` / ``iv_shift`` are the "scenario" sliders described in
    the proposal (§5.2): the response carries both the intrinsic-value curve
    at expiry (time-invariant) and a Black-Scholes-repriced curve at the
    requested scenario point, so the frontend can overlay them.
    """

    spot: float = Field(..., gt=0, description="Reference spot; legs are priced at this spot at entry (t=0)")
    risk_free_rate: float = Field(_DEFAULT_RISK_FREE_RATE)
    legs: list[OptionLeg] = Field(..., min_length=1, max_length=_MAX_LEGS)
    price_range: PriceRange | None = Field(None, description="Defaults to spot * [0.5, 1.5], 41 steps")
    days_elapsed: float = Field(0.0, ge=0, description="Scenario slider: days elapsed since entry")
    iv_shift: float = Field(0.0, description="Scenario slider: additive IV shift applied to every leg")


class SurfaceRequest(BaseModel):
    """POST /options/surface body."""

    symbol: str = Field(..., min_length=1, max_length=15)
    max_expirations: int = Field(_MAX_SURFACE_EXPIRATIONS, ge=1, le=_MAX_SURFACE_EXPIRATIONS)

    @field_validator("symbol")
    @classmethod
    def _symbol_shape(cls, v: str) -> str:
        s = v.strip().upper()
        if not _SYMBOL_RE.fullmatch(s):
            raise ValueError(f"invalid symbol: {v!r}")
        return s


# ---------------------------------------------------------------------------
# Pricing helpers (wrap OptionsPricingTool; never reimplement the BS math)
# ---------------------------------------------------------------------------


def _price_leg(spot: float, leg: OptionLeg, default_rate: float, *, expiry_days: float | None = None, iv: float | None = None) -> dict[str, Any]:
    """Run one leg through OptionsPricingTool.execute and return the parsed result."""
    from src.tools.options_pricing_tool import OptionsPricingTool

    tool = OptionsPricingTool()
    raw = tool.execute(
        spot=spot,
        strike=leg.strike,
        expiry_days=max(expiry_days if expiry_days is not None else leg.expiry_days, 0.0),
        risk_free_rate=leg.risk_free_rate if leg.risk_free_rate is not None else default_rate,
        volatility=max(iv if iv is not None else leg.iv, 1e-4),
        option_type=leg.option_type,
    )
    return json.loads(raw)


def _intrinsic(spot: float, leg: OptionLeg) -> float:
    """Payoff at expiry, ignoring time value — the textbook payoff-diagram curve."""
    if leg.option_type == "call":
        return max(spot - leg.strike, 0.0)
    return max(leg.strike - spot, 0.0)


def _linspace(lo: float, hi: float, steps: int) -> list[float]:
    return [float(x) for x in np.linspace(lo, hi, steps)]


def _default_price_range(spot: float) -> PriceRange:
    return PriceRange(min=max(spot * 0.5, 0.01), max=spot * 1.5, steps=41)


def _compute_greeks(payload: GreeksRequest) -> dict[str, Any]:
    """Blocking worker: price every leg, aggregate portfolio Greeks."""
    leg_results: list[dict[str, Any]] = []
    agg = {"delta": 0.0, "gamma": 0.0, "theta": 0.0, "vega": 0.0}
    total_cost = 0.0

    for idx, leg in enumerate(payload.legs):
        priced = _price_leg(payload.spot, leg, payload.risk_free_rate)
        if priced.get("status") == "error":
            raise ValueError(f"leg {idx}: {priced.get('error', 'pricing failed')}")
        qty = leg.quantity
        for greek in agg:
            agg[greek] += float(priced.get(greek, 0.0)) * qty
        price = float(priced.get("price", 0.0))
        total_cost += price * qty
        leg_results.append(
            {
                "index": idx,
                "option_type": leg.option_type,
                "strike": leg.strike,
                "expiry_days": leg.expiry_days,
                "iv": leg.iv,
                "quantity": qty,
                "price": price,
                "delta": priced.get("delta"),
                "gamma": priced.get("gamma"),
                "theta": priced.get("theta"),
                "vega": priced.get("vega"),
                "status": priced.get("status"),
                "warning": priced.get("warning"),
            }
        )

    return {
        "legs": leg_results,
        "aggregate": {**{k: round(v, 6) for k, v in agg.items()}, "total_cost": round(total_cost, 6)},
    }


def _compute_payoff(payload: PayoffRequest) -> dict[str, Any]:
    """Blocking worker: entry cost, at-expiry curve, at-scenario curve."""
    price_range = payload.price_range or _default_price_range(payload.spot)
    prices = _linspace(price_range.min, price_range.max, price_range.steps)

    def _entry_price(leg: OptionLeg) -> float:
        priced = _price_leg(payload.spot, leg, payload.risk_free_rate)
        if priced.get("status") == "error":
            raise ValueError(priced.get("error", "pricing failed"))
        return float(priced.get("price", 0.0))

    entry_cost = sum(_entry_price(leg) * leg.quantity for leg in payload.legs)

    expiry_pnl: list[float] = []
    scenario_pnl: list[float] = []
    for s in prices:
        expiry_total = sum(_intrinsic(s, leg) * leg.quantity for leg in payload.legs) - entry_cost

        scenario_total = 0.0
        for leg in payload.legs:
            priced = _price_leg(
                s,
                leg,
                payload.risk_free_rate,
                expiry_days=leg.expiry_days - payload.days_elapsed,
                iv=leg.iv + payload.iv_shift,
            )
            if priced.get("status") == "error":
                raise ValueError(priced.get("error", "pricing failed"))
            scenario_total += float(priced.get("price", 0.0)) * leg.quantity
        scenario_total -= entry_cost

        expiry_pnl.append(round(expiry_total, 6))
        scenario_pnl.append(round(scenario_total, 6))

    return {
        "entry_cost": round(entry_cost, 6),
        "prices": [round(p, 6) for p in prices],
        "expiry_pnl": expiry_pnl,
        "scenario_pnl": scenario_pnl,
    }


# ---------------------------------------------------------------------------
# Registration
# ---------------------------------------------------------------------------

AuthDep = Callable[..., Awaitable[Any] | Any]


def register_options_routes(app: FastAPI, require_auth: AuthDep | None = None) -> None:
    """Mount the Options Lab routes onto ``app``.

    Args:
        app: The host FastAPI app.
        require_auth: Header-auth dependency for JSON endpoints. Resolved
            from the host ``api_server`` module via ``sys.modules`` when not
            passed explicitly, matching ``register_alpha_routes``.
    """
    if require_auth is None:
        import sys as _sys

        host = _sys.modules.get("api_server") or _sys.modules.get("agent.api_server")
        if host is None:  # pragma: no cover — only triggers on weird import setups
            raise RuntimeError(
                "register_options_routes: api_server module not in sys.modules; "
                "pass require_auth explicitly"
            )
        require_auth = host.require_auth

    # -----------------------------------------------------------------------
    # GET /options/chain
    # -----------------------------------------------------------------------

    @app.get("/options/chain", dependencies=[Depends(require_auth)])
    async def get_options_chain(
        symbol: str = Query(..., min_length=1, max_length=15),
        expiration: int | None = Query(None, gt=0, description="Epoch seconds; omit for nearest expiration"),
    ) -> dict[str, Any]:
        """Thin read-only wrapper over OptionsChainTool. Empty chains are not errors."""
        from src.tools.options_chain_tool import OptionsChainTool

        ticker = _normalize_symbol(symbol)
        tool = OptionsChainTool()
        raw = await asyncio.to_thread(tool.execute, ticker=ticker, expiration=expiration)
        envelope = _parse_tool_envelope(raw)
        if not envelope.get("ok"):
            raise HTTPException(status_code=400, detail=envelope.get("error", "options chain lookup failed"))

        data = envelope.get("data") or {}
        return {"status": "ok", **data}

    # -----------------------------------------------------------------------
    # POST /options/surface
    # -----------------------------------------------------------------------

    @app.post("/options/surface", dependencies=[Depends(require_auth)])
    async def get_options_surface(payload: SurfaceRequest) -> dict[str, Any]:
        """Gather the chain across every expiration and return an (expiry, strike, iv) grid."""
        from src.tools.options_chain_tool import OptionsChainTool

        symbol = payload.symbol
        cache_key = f"{symbol}:{payload.max_expirations}"
        cached = _surface_cache_get(cache_key)
        if cached is not None:
            return cached

        tool = OptionsChainTool()
        first_raw = await asyncio.to_thread(tool.execute, ticker=symbol)
        first_envelope = _parse_tool_envelope(first_raw)
        if not first_envelope.get("ok"):
            raise HTTPException(status_code=400, detail=first_envelope.get("error", "options chain lookup failed"))

        first_data = first_envelope.get("data") or {}
        expirations = [e for e in (first_data.get("expirations") or []) if isinstance(e, int)]
        if not expirations:
            # Illiquid/delisted tickers can legitimately have no options chain
            # at all — an empty surface, not an error.
            result = {"status": "ok", "symbol": symbol, "expirations": [], "points": []}
            _surface_cache_set(cache_key, result)
            return result

        chosen = sorted(set(expirations))[: payload.max_expirations]

        points: list[dict[str, Any]] = []
        for expiry in chosen:
            if expiry == first_data.get("expiration"):
                block = first_data  # already fetched — avoid a redundant call
            else:
                raw = await asyncio.to_thread(tool.execute, ticker=symbol, expiration=expiry)
                envelope = _parse_tool_envelope(raw)
                if not envelope.get("ok"):
                    # One bad expiration shouldn't sink the whole surface.
                    logger.warning(
                        "options surface: expiration %s failed for %s: %s",
                        expiry, symbol, envelope.get("error"),
                    )
                    continue
                block = envelope.get("data") or {}

            for side, option_type in (("calls", "call"), ("puts", "put")):
                for contract in block.get(side) or []:
                    strike = contract.get("strike")
                    iv = contract.get("implied_volatility")
                    point: dict[str, Any] = {
                        "expiry": expiry,
                        "strike": strike,
                        "iv": iv,
                        "option_type": option_type,
                    }
                    if strike is None or not isinstance(iv, (int, float)) or iv is None or iv <= 0:
                        # Missing/non-positive IV is common for thin yfinance
                        # chains — flag it so the UI can grey it out instead
                        # of treating it as an error (proposal §6).
                        point["outlier"] = True
                    points.append(point)

        result = {"status": "ok", "symbol": symbol, "expirations": chosen, "points": points}
        _surface_cache_set(cache_key, result)
        return result

    # -----------------------------------------------------------------------
    # POST /options/greeks
    # -----------------------------------------------------------------------

    @app.post("/options/greeks", dependencies=[Depends(require_auth)])
    async def compute_greeks(payload: GreeksRequest) -> dict[str, Any]:
        """Per-leg + aggregated Greeks for a basket of legs, via OptionsPricingTool."""
        try:
            computed = await asyncio.to_thread(_compute_greeks, payload)
        except ValueError as exc:
            raise HTTPException(status_code=400, detail=str(exc))
        except Exception as exc:  # noqa: BLE001
            logger.exception("options/greeks failed")
            raise HTTPException(status_code=500, detail=_safe_error(exc))
        return {"status": "ok", "spot": payload.spot, **computed}

    # -----------------------------------------------------------------------
    # POST /options/payoff
    # -----------------------------------------------------------------------

    @app.post("/options/payoff", dependencies=[Depends(require_auth)])
    async def compute_payoff(payload: PayoffRequest) -> dict[str, Any]:
        """Payoff-curve data at expiry and at an arbitrary scenario point."""
        try:
            computed = await asyncio.to_thread(_compute_payoff, payload)
        except ValueError as exc:
            raise HTTPException(status_code=400, detail=str(exc))
        except Exception as exc:  # noqa: BLE001
            logger.exception("options/payoff failed")
            raise HTTPException(status_code=500, detail=_safe_error(exc))
        return {
            "status": "ok",
            "spot": payload.spot,
            "days_elapsed": payload.days_elapsed,
            "iv_shift": payload.iv_shift,
            **computed,
        }
