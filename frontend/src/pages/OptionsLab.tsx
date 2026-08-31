import i18n from '@/i18n';
/**
 * Options Lab — Greeks dashboard / payoff & scenario explorer / vol surface.
 *
 * Staged per the proposal (.github/proposals/options-lab.md §7):
 *   Stage 1: Greeks Dashboard (spot + leg builder -> /options/greeks)
 *   Stage 2: Payoff & Scenario Explorer (leg builder + sliders -> /options/payoff)
 *   Stage 3: Vol Surface heatmap (explicit "load" click -> /options/surface;
 *            3D is deferred to a later iteration — this chart stack is
 *            echarts-core without echarts-gl, so a 2D heatmap is the v1
 *            rendering, matching the proposal's fallback plan).
 *
 * All three read-only calc endpoints (greeks/payoff/surface) never touch the
 * agent "run" resource or order placement / mandate gating — pure
 * calculation over OptionsChainTool / OptionsPricingTool.
 */

import { useEffect, useState } from "react";
import { Sigma, Plus, Trash2, LineChart as LineChartIcon, Grid3x3 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  api,
  type OptionLeg,
  type OptionType,
  type OptionsGreeksResponse,
  type OptionsPayoffResponse,
  type OptionsSurfaceResponse,
} from "@/lib/api";
import { PayoffChart } from "@/components/charts/PayoffChart";
import { VolSurfaceHeatmap } from "@/components/charts/VolSurfaceHeatmap";
import { GreeksBarChart } from "@/components/charts/GreeksBarChart";

type Tab = "greeks" | "payoff" | "surface";

interface LegRow extends OptionLeg {
  id: string;
}

let legIdCounter = 0;
function nextLegId(): string {
  legIdCounter += 1;
  return `leg-${legIdCounter}`;
}

function defaultLeg(): LegRow {
  return { id: nextLegId(), option_type: "call", strike: 100, expiry_days: 30, iv: 0.25, quantity: 1 };
}

function toApiLegs(rows: LegRow[]): OptionLeg[] {
  return rows.map(({ id: _id, ...leg }) => leg);
}

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handle = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(handle);
  }, [value, delayMs]);
  return debounced;
}

/* ---------- Page entry ---------- */

export function OptionsLab() {
  const [tab, setTab] = useState<Tab>("greeks");
  const [spot, setSpot] = useState(100);
  const [riskFreeRate, setRiskFreeRate] = useState(0.05);
  const [legs, setLegs] = useState<LegRow[]>([defaultLeg()]);

  // Scenario sliders (Payoff & Scenario Explorer only).
  const [daysElapsed, setDaysElapsed] = useState(0);
  const [ivShift, setIvShift] = useState(0);

  const debouncedSpot = useDebouncedValue(spot, 350);
  const debouncedLegs = useDebouncedValue(legs, 350);
  const debouncedRate = useDebouncedValue(riskFreeRate, 350);
  const debouncedDays = useDebouncedValue(daysElapsed, 250);
  const debouncedIvShift = useDebouncedValue(ivShift, 250);

  const [greeks, setGreeks] = useState<OptionsGreeksResponse | null>(null);
  const [greeksLoading, setGreeksLoading] = useState(false);
  const [greeksError, setGreeksError] = useState<string | null>(null);

  const [payoff, setPayoff] = useState<OptionsPayoffResponse | null>(null);
  const [payoffLoading, setPayoffLoading] = useState(false);
  const [payoffError, setPayoffError] = useState<string | null>(null);

  const [symbol, setSymbol] = useState("AAPL");
  const [maxExpirations, setMaxExpirations] = useState(6);
  const [surface, setSurface] = useState<OptionsSurfaceResponse | null>(null);
  const [surfaceLoading, setSurfaceLoading] = useState(false);
  const [surfaceError, setSurfaceError] = useState<string | null>(null);

  const hasLegs = debouncedLegs.length > 0;

  // Stage 1: Greeks Dashboard re-fetches on every settled spot/leg/rate change.
  useEffect(() => {
    if (!hasLegs) { setGreeks(null); return; }
    let cancelled = false;
    setGreeksLoading(true);
    setGreeksError(null);
    api
      .getOptionsGreeks({ spot: debouncedSpot, risk_free_rate: debouncedRate, legs: toApiLegs(debouncedLegs) })
      .then((res) => { if (!cancelled) setGreeks(res); })
      .catch((e) => { if (!cancelled) setGreeksError(e instanceof Error ? e.message : String(e)); })
      .finally(() => { if (!cancelled) setGreeksLoading(false); });
    return () => { cancelled = true; };
  }, [debouncedSpot, debouncedLegs, debouncedRate, hasLegs]);

  // Stage 2: Payoff & Scenario Explorer re-fetches on the same settle plus
  // the days-elapsed / IV-shift scenario sliders.
  useEffect(() => {
    if (!hasLegs) { setPayoff(null); return; }
    let cancelled = false;
    setPayoffLoading(true);
    setPayoffError(null);
    api
      .getOptionsPayoff({
        spot: debouncedSpot,
        risk_free_rate: debouncedRate,
        legs: toApiLegs(debouncedLegs),
        days_elapsed: debouncedDays,
        iv_shift: debouncedIvShift,
      })
      .then((res) => { if (!cancelled) setPayoff(res); })
      .catch((e) => { if (!cancelled) setPayoffError(e instanceof Error ? e.message : String(e)); })
      .finally(() => { if (!cancelled) setPayoffLoading(false); });
    return () => { cancelled = true; };
  }, [debouncedSpot, debouncedLegs, debouncedRate, debouncedDays, debouncedIvShift, hasLegs]);

  function updateLeg(id: string, patch: Partial<OptionLeg>) {
    setLegs((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }
  function addLeg() {
    setLegs((prev) => [...prev, defaultLeg()]);
  }
  function removeLeg(id: string) {
    setLegs((prev) => prev.filter((l) => l.id !== id));
  }

  async function loadSurface() {
    setSurfaceLoading(true);
    setSurfaceError(null);
    try {
      const res = await api.getOptionsSurface({ symbol, max_expirations: maxExpirations });
      setSurface(res);
    } catch (e) {
      setSurfaceError(e instanceof Error ? e.message : String(e));
    } finally {
      setSurfaceLoading(false);
    }
  }

  const TABS: { id: Tab; label: string; icon: typeof Sigma }[] = [
    { id: "greeks", label: i18n.t("optionsLab.tabGreeks"), icon: Sigma },
    { id: "payoff", label: i18n.t("optionsLab.tabPayoff"), icon: LineChartIcon },
    { id: "surface", label: i18n.t("optionsLab.tabSurface"), icon: Grid3x3 },
  ];

  const maxExpiryDays = Math.max(1, ...legs.map((l) => l.expiry_days || 0));

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Sigma className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold">{i18n.t("optionsLab.title")}</h1>
        </div>
        <p className="text-sm text-muted-foreground">{i18n.t("optionsLab.subtitle")}</p>
        <div className="flex items-center gap-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors",
                tab === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-3.5 w-3.5" /> {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 max-w-6xl mx-auto w-full space-y-6">
        {tab !== "surface" && (
          <PositionInputs
            spot={spot}
            onSpot={setSpot}
            riskFreeRate={riskFreeRate}
            onRiskFreeRate={setRiskFreeRate}
            legs={legs}
            onUpdateLeg={updateLeg}
            onAddLeg={addLeg}
            onRemoveLeg={removeLeg}
          />
        )}

        {tab === "greeks" && (
          <GreeksDashboard loading={greeksLoading} error={greeksError} data={greeks} hasLegs={hasLegs} />
        )}

        {tab === "payoff" && (
          <PayoffExplorer
            loading={payoffLoading}
            error={payoffError}
            data={payoff}
            hasLegs={hasLegs}
            spot={spot}
            daysElapsed={daysElapsed}
            onDaysElapsed={setDaysElapsed}
            ivShift={ivShift}
            onIvShift={setIvShift}
            maxExpiryDays={maxExpiryDays}
          />
        )}

        {tab === "surface" && (
          <SurfaceExplorer
            symbol={symbol}
            onSymbol={setSymbol}
            maxExpirations={maxExpirations}
            onMaxExpirations={setMaxExpirations}
            loading={surfaceLoading}
            error={surfaceError}
            data={surface}
            onLoad={loadSurface}
          />
        )}
      </div>
    </div>
  );
}

/* ---------- Shared position inputs (spot / rate / leg builder) ---------- */

function PositionInputs({
  spot, onSpot, riskFreeRate, onRiskFreeRate, legs, onUpdateLeg, onAddLeg, onRemoveLeg,
}: {
  spot: number;
  onSpot: (v: number) => void;
  riskFreeRate: number;
  onRiskFreeRate: (v: number) => void;
  legs: LegRow[];
  onUpdateLeg: (id: string, patch: Partial<OptionLeg>) => void;
  onAddLeg: () => void;
  onRemoveLeg: (id: string) => void;
}) {
  return (
    <section className="border rounded-lg p-4 space-y-4">
      <div className="flex flex-wrap gap-4">
        <NumberField label={i18n.t("optionsLab.spotPrice")} value={spot} onChange={onSpot} min={0.01} step={0.5} testId="spot-input" />
        <NumberField
          label={i18n.t("optionsLab.riskFreeRate")}
          value={riskFreeRate}
          onChange={onRiskFreeRate}
          min={0}
          max={1}
          step={0.005}
          testId="rate-input"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">{i18n.t("optionsLab.legs")}</h2>
          <button
            onClick={onAddLeg}
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-md border hover:bg-muted transition-colors"
            data-testid="add-leg"
          >
            <Plus className="h-3.5 w-3.5" /> {i18n.t("optionsLab.addLeg")}
          </button>
        </div>

        {legs.length === 0 ? (
          <p className="text-xs text-muted-foreground">{i18n.t("optionsLab.noLegs")}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground text-left">
                  <th className="py-1 pr-2">{i18n.t("optionsLab.type")}</th>
                  <th className="py-1 pr-2">{i18n.t("optionsLab.strike")}</th>
                  <th className="py-1 pr-2">{i18n.t("optionsLab.expiryDays")}</th>
                  <th className="py-1 pr-2">{i18n.t("optionsLab.iv")}</th>
                  <th className="py-1 pr-2">{i18n.t("optionsLab.quantity")}</th>
                  <th className="py-1" />
                </tr>
              </thead>
              <tbody>
                {legs.map((leg, idx) => (
                  <tr key={leg.id} className="border-t">
                    <td className="py-1.5 pr-2">
                      <select
                        value={leg.option_type}
                        onChange={(e) => onUpdateLeg(leg.id, { option_type: e.target.value as OptionType })}
                        className="px-2 py-1 rounded border bg-background text-xs"
                        data-testid={`leg-type-${idx}`}
                      >
                        <option value="call">{i18n.t("optionsLab.call")}</option>
                        <option value="put">{i18n.t("optionsLab.put")}</option>
                      </select>
                    </td>
                    <td className="py-1.5 pr-2">
                      <input
                        type="number"
                        value={leg.strike}
                        min={0.01}
                        step={0.5}
                        onChange={(e) => onUpdateLeg(leg.id, { strike: Number(e.target.value) })}
                        className="w-20 px-2 py-1 rounded border bg-background text-xs"
                        data-testid={`leg-strike-${idx}`}
                      />
                    </td>
                    <td className="py-1.5 pr-2">
                      <input
                        type="number"
                        value={leg.expiry_days}
                        min={0}
                        step={1}
                        onChange={(e) => onUpdateLeg(leg.id, { expiry_days: Number(e.target.value) })}
                        className="w-16 px-2 py-1 rounded border bg-background text-xs"
                        data-testid={`leg-expiry-${idx}`}
                      />
                    </td>
                    <td className="py-1.5 pr-2">
                      <input
                        type="number"
                        value={leg.iv}
                        min={0.0001}
                        step={0.01}
                        onChange={(e) => onUpdateLeg(leg.id, { iv: Number(e.target.value) })}
                        className="w-16 px-2 py-1 rounded border bg-background text-xs"
                        data-testid={`leg-iv-${idx}`}
                      />
                    </td>
                    <td className="py-1.5 pr-2">
                      <input
                        type="number"
                        value={leg.quantity}
                        step={1}
                        onChange={(e) => onUpdateLeg(leg.id, { quantity: Number(e.target.value) })}
                        className="w-16 px-2 py-1 rounded border bg-background text-xs"
                        data-testid={`leg-qty-${idx}`}
                      />
                    </td>
                    <td className="py-1.5">
                      <button
                        onClick={() => onRemoveLeg(leg.id)}
                        className="p-1 text-muted-foreground hover:text-danger rounded"
                        data-testid={`leg-remove-${idx}`}
                        title={i18n.t("optionsLab.removeLeg")}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

function NumberField({
  label, value, onChange, min, max, step, testId,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  testId?: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs">
      <span className="font-medium text-foreground">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-28 px-2 py-1 rounded border bg-background text-sm"
        data-testid={testId}
      />
    </label>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="text-sm text-danger border border-danger/30 rounded p-3 bg-danger/5">
      {i18n.t("optionsLab.failedToLoad")}: {message}
    </div>
  );
}

/* ---------- Stage 1: Greeks Dashboard ---------- */

function GreeksDashboard({
  loading, error, data, hasLegs,
}: {
  loading: boolean;
  error: string | null;
  data: OptionsGreeksResponse | null;
  hasLegs: boolean;
}) {
  if (!hasLegs) return <p className="text-sm text-muted-foreground">{i18n.t("optionsLab.noLegs")}</p>;

  return (
    <section className="space-y-4">
      {error && <ErrorBanner message={error} />}
      {loading && !data && <p className="text-sm text-muted-foreground">{i18n.t("optionsLab.loadingGreeks")}</p>}
      {data && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <GreekCard label={i18n.t("optionsLab.delta")} value={data.aggregate.delta} />
            <GreekCard label={i18n.t("optionsLab.gamma")} value={data.aggregate.gamma} />
            <GreekCard label={i18n.t("optionsLab.theta")} value={data.aggregate.theta} />
            <GreekCard label={i18n.t("optionsLab.vega")} value={data.aggregate.vega} />
            <GreekCard label={i18n.t("optionsLab.totalCost")} value={data.aggregate.total_cost} />
          </div>

          <GreeksBarChart aggregate={data.aggregate} />

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground text-left">
                  <th className="py-1 pr-2">#</th>
                  <th className="py-1 pr-2">{i18n.t("optionsLab.type")}</th>
                  <th className="py-1 pr-2">{i18n.t("optionsLab.strike")}</th>
                  <th className="py-1 pr-2">{i18n.t("optionsLab.price")}</th>
                  <th className="py-1 pr-2">{i18n.t("optionsLab.delta")}</th>
                  <th className="py-1 pr-2">{i18n.t("optionsLab.gamma")}</th>
                  <th className="py-1 pr-2">{i18n.t("optionsLab.theta")}</th>
                  <th className="py-1 pr-2">{i18n.t("optionsLab.vega")}</th>
                </tr>
              </thead>
              <tbody>
                {data.legs.map((leg) => (
                  <tr key={leg.index} className="border-t" data-testid={`greeks-leg-row-${leg.index}`}>
                    <td className="py-1 pr-2 text-muted-foreground">{leg.index + 1}</td>
                    <td className="py-1 pr-2 capitalize">{leg.option_type}</td>
                    <td className="py-1 pr-2">{leg.strike}</td>
                    <td className="py-1 pr-2">{leg.price?.toFixed(4)}</td>
                    <td className="py-1 pr-2">{leg.delta?.toFixed(4)}</td>
                    <td className="py-1 pr-2">{leg.gamma?.toFixed(4)}</td>
                    <td className="py-1 pr-2">{leg.theta?.toFixed(4)}</td>
                    <td className="py-1 pr-2">{leg.vega?.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}

function GreekCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border rounded-lg p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold font-mono">{value.toFixed(4)}</p>
    </div>
  );
}

/* ---------- Stage 2: Payoff & Scenario Explorer ---------- */

function PayoffExplorer({
  loading, error, data, hasLegs, spot, daysElapsed, onDaysElapsed, ivShift, onIvShift, maxExpiryDays,
}: {
  loading: boolean;
  error: string | null;
  data: OptionsPayoffResponse | null;
  hasLegs: boolean;
  spot: number;
  daysElapsed: number;
  onDaysElapsed: (v: number) => void;
  ivShift: number;
  onIvShift: (v: number) => void;
  maxExpiryDays: number;
}) {
  if (!hasLegs) return <p className="text-sm text-muted-foreground">{i18n.t("optionsLab.noLegs")}</p>;

  return (
    <section className="space-y-4">
      <div className="border rounded-lg p-4 flex flex-wrap gap-6">
        <SliderField
          label={`${i18n.t("optionsLab.daysElapsed")}: ${daysElapsed}`}
          value={daysElapsed}
          min={0}
          max={maxExpiryDays}
          step={1}
          onChange={onDaysElapsed}
          testId="days-elapsed-slider"
        />
        <SliderField
          label={`${i18n.t("optionsLab.ivShift")}: ${(ivShift * 100).toFixed(0)}%`}
          value={ivShift}
          min={-0.5}
          max={0.5}
          step={0.01}
          onChange={onIvShift}
          testId="iv-shift-slider"
        />
      </div>

      {error && <ErrorBanner message={error} />}
      {loading && !data && <p className="text-sm text-muted-foreground">{i18n.t("optionsLab.loadingPayoff")}</p>}
      {data && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <GreekCard label={i18n.t("optionsLab.entryCost")} value={data.entry_cost} />
          </div>
          <PayoffChart prices={data.prices} expiryPnl={data.expiry_pnl} scenarioPnl={data.scenario_pnl} spot={spot} />
        </>
      )}
    </section>
  );
}

function SliderField({
  label, value, min, max, step, onChange, testId,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  testId?: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs flex-1 min-w-[200px]">
      <span className="font-medium text-foreground">{label}</span>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        data-testid={testId}
      />
    </label>
  );
}

/* ---------- Stage 3: Vol Surface ---------- */

function SurfaceExplorer({
  symbol, onSymbol, maxExpirations, onMaxExpirations, loading, error, data, onLoad,
}: {
  symbol: string;
  onSymbol: (v: string) => void;
  maxExpirations: number;
  onMaxExpirations: (v: number) => void;
  loading: boolean;
  error: string | null;
  data: OptionsSurfaceResponse | null;
  onLoad: () => void;
}) {
  return (
    <section className="space-y-4">
      <div className="border rounded-lg p-4 flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1 text-xs">
          <span className="font-medium text-foreground">{i18n.t("optionsLab.symbol")}</span>
          <input
            type="text"
            value={symbol}
            onChange={(e) => onSymbol(e.target.value.toUpperCase())}
            className="w-28 px-2 py-1.5 rounded border bg-background text-sm"
            data-testid="surface-symbol"
          />
        </label>
        <NumberField
          label={i18n.t("optionsLab.maxExpirations")}
          value={maxExpirations}
          onChange={onMaxExpirations}
          min={1}
          max={12}
          step={1}
          testId="surface-max-expirations"
        />
        <button
          onClick={onLoad}
          disabled={loading || !symbol.trim()}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
          data-testid="load-surface"
        >
          {loading ? i18n.t("optionsLab.loadingSurface") : i18n.t("optionsLab.loadSurface")}
        </button>
      </div>

      {error && <ErrorBanner message={error} />}

      {data && data.points.some((p) => p.outlier) && (
        <p className="text-xs text-muted-foreground">{i18n.t("optionsLab.outlierNote")}</p>
      )}

      <VolSurfaceHeatmap points={data?.points ?? []} />
    </section>
  );
}
