"""API tests for the Options Lab routes: /options/chain, /surface, /greeks, /payoff.

Chain/surface tests mock ``yahoo_client.get_options`` (same patch point as
``test_options_chain_tool.py``) so no test ever reaches a live Yahoo endpoint.
Greeks/payoff tests exercise the real Black-Scholes math in
``OptionsPricingTool`` — no network involved — and cross-check numbers
against the reference values in ``test_options_pricing_degenerate.py``.

Loopback ``TestClient`` (127.0.0.1) bypasses dev-mode auth, matching the
convention in ``test_alpha_compare_api.py`` / ``test_goal_api.py``.
"""

from __future__ import annotations

from unittest.mock import patch

import pytest
from fastapi.testclient import TestClient

import api_server
from src.api import options_routes
from src.tools import options_chain_tool as oc


def _client() -> TestClient:
    return TestClient(api_server.app, client=("127.0.0.1", 50000))


@pytest.fixture(autouse=True)
def _clear_surface_cache():
    options_routes.clear_surface_cache()
    yield
    options_routes.clear_surface_cache()


def _contract(strike: float, iv: float | None, **overrides) -> dict:
    base = {
        "contractSymbol": f"AAPL250101C{int(strike * 1000):08d}",
        "strike": strike,
        "lastPrice": 1.0,
        "bid": 0.9,
        "ask": 1.1,
        "volume": 10,
        "openInterest": 100,
        "impliedVolatility": iv,
        "inTheMoney": False,
    }
    base.update(overrides)
    return base


# ---------------------------------------------------------------------------
# GET /options/chain
# ---------------------------------------------------------------------------


class TestOptionsChain:
    def test_success_envelope(self):
        result = {
            "expirationDates": [1750000000, 1750604800],
            "options": [
                {
                    "expirationDate": 1750000000,
                    "calls": [_contract(190.0, 0.28, expiration=1750000000)],
                    "puts": [_contract(190.0, 0.30, expiration=1750000000)],
                }
            ],
        }
        with patch.object(oc.yahoo_client, "get_options", return_value=result):
            resp = _client().get("/options/chain", params={"symbol": "aapl"})
        assert resp.status_code == 200
        body = resp.json()
        assert body["status"] == "ok"
        assert body["ticker"] == "AAPL"
        assert body["expiration"] == 1750000000
        assert body["expirations"] == [1750000000, 1750604800]
        assert body["calls_count"] == 1
        assert body["puts"][0]["implied_volatility"] == 0.30

    def test_invalid_symbol_rejected(self):
        resp = _client().get("/options/chain", params={"symbol": "bad sym!"})
        assert resp.status_code == 400

    def test_empty_chain_is_not_an_error(self):
        result = {"expirationDates": [], "options": []}
        with patch.object(oc.yahoo_client, "get_options", return_value=result):
            resp = _client().get("/options/chain", params={"symbol": "ILLQ"})
        assert resp.status_code == 200
        body = resp.json()
        assert body["status"] == "ok"
        assert body["calls"] == []
        assert body["puts"] == []

    def test_upstream_error_maps_to_400(self):
        with patch.object(oc.yahoo_client, "get_options", side_effect=RuntimeError("boom")):
            resp = _client().get("/options/chain", params={"symbol": "AAPL"})
        assert resp.status_code == 400
        assert "boom" in resp.json()["detail"]

    def test_invalid_expiration_query_type_rejected(self):
        resp = _client().get("/options/chain", params={"symbol": "AAPL", "expiration": "not-a-number"})
        assert resp.status_code == 422

    def test_non_positive_expiration_rejected(self):
        resp = _client().get("/options/chain", params={"symbol": "AAPL", "expiration": -5})
        assert resp.status_code == 422

    def test_missing_symbol_rejected(self):
        resp = _client().get("/options/chain")
        assert resp.status_code == 422


# ---------------------------------------------------------------------------
# POST /options/surface
# ---------------------------------------------------------------------------


class TestOptionsSurface:
    def _fake_get_options(self, exp_dates, blocks):
        def _fn(ticker, expiration=None):
            chosen = expiration if expiration is not None else exp_dates[0]
            return {"expirationDates": exp_dates, "options": [blocks[chosen]]}

        return _fn

    def test_surface_builds_grid_with_outlier_flag(self):
        exp_dates = [1750000000, 1750604800]
        blocks = {
            1750000000: {
                "expirationDate": 1750000000,
                "calls": [_contract(190.0, 0.28), _contract(195.0, None)],  # missing IV
                "puts": [_contract(190.0, 0.30)],
            },
            1750604800: {
                "expirationDate": 1750604800,
                "calls": [_contract(190.0, 0.32)],
                "puts": [_contract(190.0, 0.34)],
            },
        }
        with patch.object(oc.yahoo_client, "get_options", side_effect=self._fake_get_options(exp_dates, blocks)):
            resp = _client().post("/options/surface", json={"symbol": "aapl"})
        assert resp.status_code == 200
        body = resp.json()
        assert body["status"] == "ok"
        assert body["expirations"] == exp_dates
        # 2 calls + 1 put @ nearest expiry, 1 call + 1 put @ far expiry = 5 points
        assert len(body["points"]) == 5
        outliers = [p for p in body["points"] if p.get("outlier")]
        assert len(outliers) == 1
        assert outliers[0]["strike"] == 195.0

    def test_surface_empty_chain_returns_empty_grid(self):
        with patch.object(oc.yahoo_client, "get_options", return_value={"expirationDates": [], "options": []}):
            resp = _client().post("/options/surface", json={"symbol": "ILLQ"})
        assert resp.status_code == 200
        body = resp.json()
        assert body["points"] == []
        assert body["expirations"] == []

    def test_surface_invalid_symbol_rejected(self):
        resp = _client().post("/options/surface", json={"symbol": "bad sym!"})
        assert resp.status_code == 422

    def test_surface_upstream_error_maps_to_400(self):
        with patch.object(oc.yahoo_client, "get_options", side_effect=RuntimeError("boom")):
            resp = _client().post("/options/surface", json={"symbol": "AAPL"})
        assert resp.status_code == 400

    def test_surface_is_cached_within_ttl(self):
        exp_dates = [1750000000, 1750604800]
        blocks = {
            1750000000: {"expirationDate": 1750000000, "calls": [_contract(190.0, 0.28)], "puts": []},
            1750604800: {"expirationDate": 1750604800, "calls": [_contract(190.0, 0.32)], "puts": []},
        }
        fake = self._fake_get_options(exp_dates, blocks)
        with patch.object(oc.yahoo_client, "get_options", side_effect=fake) as mock_get:
            resp1 = _client().post("/options/surface", json={"symbol": "AAPL"})
            assert resp1.status_code == 200
            calls_after_first = mock_get.call_count
            assert calls_after_first == 2  # nearest (no expiration) + 1 more expiry

            resp2 = _client().post("/options/surface", json={"symbol": "AAPL"})
            assert resp2.status_code == 200
            assert mock_get.call_count == calls_after_first  # served from cache
            assert resp2.json() == resp1.json()


# ---------------------------------------------------------------------------
# POST /options/greeks
# ---------------------------------------------------------------------------


class TestOptionsGreeks:
    def test_single_atm_call_matches_reference_bs_values(self):
        body = {
            "spot": 100,
            "risk_free_rate": 0.05,
            "legs": [
                {"option_type": "call", "strike": 100, "expiry_days": 30, "iv": 0.25, "quantity": 1}
            ],
        }
        resp = _client().post("/options/greeks", json=body)
        assert resp.status_code == 200
        out = resp.json()
        assert out["status"] == "ok"
        leg = out["legs"][0]
        assert leg["price"] == pytest.approx(3.0626, abs=1e-3)
        assert leg["delta"] == pytest.approx(0.537118, abs=1e-4)
        assert leg["gamma"] == pytest.approx(0.055421, abs=1e-4)
        assert leg["vega"] == pytest.approx(0.113878, abs=1e-4)
        agg = out["aggregate"]
        assert agg["delta"] == pytest.approx(leg["delta"], abs=1e-6)
        assert agg["total_cost"] == pytest.approx(leg["price"], abs=1e-6)

    def test_aggregate_sums_signed_quantity_across_legs(self):
        body = {
            "spot": 100,
            "legs": [
                {"option_type": "call", "strike": 100, "expiry_days": 30, "iv": 0.25, "quantity": 2},
                {"option_type": "call", "strike": 100, "expiry_days": 30, "iv": 0.25, "quantity": -1},
            ],
        }
        resp = _client().post("/options/greeks", json=body)
        assert resp.status_code == 200
        out = resp.json()
        leg_delta = out["legs"][0]["delta"]
        # 2 long - 1 short of the identical contract = net delta of 1x
        assert out["aggregate"]["delta"] == pytest.approx(leg_delta, abs=1e-6)

    def test_degenerate_leg_at_zero_expiry_does_not_error(self):
        body = {
            "spot": 100,
            "legs": [
                {"option_type": "call", "strike": 90, "expiry_days": 0, "iv": 0.25, "quantity": 1}
            ],
        }
        resp = _client().post("/options/greeks", json=body)
        assert resp.status_code == 200
        leg = resp.json()["legs"][0]
        assert leg["status"] == "degenerate"
        assert leg["price"] == pytest.approx(10.0)  # ITM intrinsic
        assert leg["delta"] == pytest.approx(1.0)

    @pytest.mark.parametrize(
        "bad_leg",
        [
            {"option_type": "bogus", "strike": 100, "expiry_days": 30, "iv": 0.25, "quantity": 1},
            {"option_type": "call", "strike": -1, "expiry_days": 30, "iv": 0.25, "quantity": 1},
            {"option_type": "call", "strike": 100, "expiry_days": 30, "iv": -0.1, "quantity": 1},
            {"option_type": "call", "strike": 100, "expiry_days": -1, "iv": 0.25, "quantity": 1},
        ],
    )
    def test_invalid_leg_shape_rejected(self, bad_leg):
        resp = _client().post("/options/greeks", json={"spot": 100, "legs": [bad_leg]})
        assert resp.status_code == 422

    def test_empty_legs_rejected(self):
        resp = _client().post("/options/greeks", json={"spot": 100, "legs": []})
        assert resp.status_code == 422

    def test_too_many_legs_rejected(self):
        legs = [
            {"option_type": "call", "strike": 100, "expiry_days": 30, "iv": 0.25, "quantity": 1}
            for _ in range(21)
        ]
        resp = _client().post("/options/greeks", json={"spot": 100, "legs": legs})
        assert resp.status_code == 422


# ---------------------------------------------------------------------------
# POST /options/payoff
# ---------------------------------------------------------------------------


class TestOptionsPayoff:
    def test_default_price_range_and_expiry_curve_shape(self):
        body = {
            "spot": 100,
            "legs": [
                {"option_type": "call", "strike": 100, "expiry_days": 30, "iv": 0.25, "quantity": 1}
            ],
        }
        resp = _client().post("/options/payoff", json=body)
        assert resp.status_code == 200
        out = resp.json()
        assert len(out["prices"]) == 41
        assert out["prices"][0] == pytest.approx(50.0, abs=1e-6)
        assert out["prices"][-1] == pytest.approx(150.0, abs=1e-6)
        entry_cost = out["entry_cost"]
        assert entry_cost == pytest.approx(3.0626, abs=1e-3)
        # deep OTM at expiry: pure loss of the premium paid
        assert out["expiry_pnl"][0] == pytest.approx(-entry_cost, abs=1e-6)
        # deep ITM at expiry: intrinsic (150-100) minus premium
        assert out["expiry_pnl"][-1] == pytest.approx(50.0 - entry_cost, abs=1e-6)

    def test_custom_price_range_and_steps(self):
        body = {
            "spot": 100,
            "legs": [
                {"option_type": "put", "strike": 100, "expiry_days": 30, "iv": 0.25, "quantity": 1}
            ],
            "price_range": {"min": 80, "max": 120, "steps": 5},
        }
        resp = _client().post("/options/payoff", json=body)
        assert resp.status_code == 200
        out = resp.json()
        assert out["prices"] == [80.0, 90.0, 100.0, 110.0, 120.0]

    def test_scenario_curve_collapses_to_expiry_curve_at_full_days_elapsed(self):
        body = {
            "spot": 100,
            "legs": [
                {"option_type": "call", "strike": 100, "expiry_days": 30, "iv": 0.25, "quantity": 1}
            ],
            "days_elapsed": 30,
        }
        resp = _client().post("/options/payoff", json=body)
        assert resp.status_code == 200
        out = resp.json()
        for a, b in zip(out["expiry_pnl"], out["scenario_pnl"]):
            assert a == pytest.approx(b, abs=1e-4)

    def test_scenario_curve_differs_before_expiry(self):
        body = {
            "spot": 100,
            "legs": [
                {"option_type": "call", "strike": 100, "expiry_days": 30, "iv": 0.25, "quantity": 1}
            ],
            "days_elapsed": 0,
        }
        resp = _client().post("/options/payoff", json=body)
        out = resp.json()
        mid = len(out["prices"]) // 2
        # At t=0 (no time elapsed, no IV shift) the scenario curve is just
        # the entry price re-centered — flat zero P&L at the reference spot.
        assert out["scenario_pnl"][mid] == pytest.approx(0.0, abs=1e-2)
        # ...but the expiry (intrinsic-only) curve is not flat there.
        assert out["expiry_pnl"][mid] != pytest.approx(0.0, abs=1e-2)

    def test_invalid_price_range_rejected(self):
        body = {
            "spot": 100,
            "legs": [{"option_type": "call", "strike": 100, "expiry_days": 30, "iv": 0.25, "quantity": 1}],
            "price_range": {"min": 120, "max": 80, "steps": 5},
        }
        resp = _client().post("/options/payoff", json=body)
        assert resp.status_code == 422

    def test_steps_over_cap_rejected(self):
        body = {
            "spot": 100,
            "legs": [{"option_type": "call", "strike": 100, "expiry_days": 30, "iv": 0.25, "quantity": 1}],
            "price_range": {"min": 80, "max": 120, "steps": 999},
        }
        resp = _client().post("/options/payoff", json=body)
        assert resp.status_code == 422

    def test_empty_legs_rejected(self):
        resp = _client().post("/options/payoff", json={"spot": 100, "legs": []})
        assert resp.status_code == 422
