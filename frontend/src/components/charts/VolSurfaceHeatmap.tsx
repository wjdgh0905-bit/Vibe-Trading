import { useEffect, useMemo, useRef } from "react";
import i18n from "@/i18n";
import type { OptionsSurfacePoint } from "@/lib/api";
import { getChartTheme } from "@/lib/chart-theme";
import { echarts } from "@/lib/echarts";

interface Props {
  points: OptionsSurfacePoint[];
  height?: number;
}

/**
 * 2D heatmap of implied volatility across (expiry x strike). The proposal's
 * stage 3 plan is a 3D surface with a heatmap fallback if the chart stack
 * doesn't support it easily — this stack (echarts-core, no echarts-gl) does
 * not, so this is the v1 rendering; 3D is a later iteration.
 *
 * Missing/outlier IV points are rendered as distinguishable grey cells
 * rather than dropped, per the proposal's data-quality note (§6).
 */
export function VolSurfaceHeatmap({ points, height = 480 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const { strikes, expiries, cells, minIv, maxIv } = useMemo(() => {
    const strikeSet = new Set<number>();
    const expirySet = new Set<number>();
    for (const p of points) {
      if (p.strike != null) strikeSet.add(p.strike);
      expirySet.add(p.expiry);
    }
    const strikes = [...strikeSet].sort((a, b) => a - b);
    const expiries = [...expirySet].sort((a, b) => a - b);
    const strikeIdx = new Map(strikes.map((s, i) => [s, i]));
    const expiryIdx = new Map(expiries.map((e, i) => [e, i]));

    let minIv = Infinity;
    let maxIv = -Infinity;
    const cells = points
      .filter((p) => p.strike != null)
      .map((p) => {
        const x = strikeIdx.get(p.strike as number)!;
        const y = expiryIdx.get(p.expiry)!;
        const outlier = !!p.outlier || p.iv == null;
        if (!outlier && p.iv != null) {
          minIv = Math.min(minIv, p.iv);
          maxIv = Math.max(maxIv, p.iv);
        }
        return { x, y, iv: p.iv, outlier, optionType: p.option_type };
      });
    return {
      strikes,
      expiries,
      cells,
      minIv: Number.isFinite(minIv) ? minIv : 0,
      maxIv: Number.isFinite(maxIv) ? maxIv : 1,
    };
  }, [points]);

  useEffect(() => {
    if (!ref.current || cells.length === 0) return;
    const t = getChartTheme();
    const chart = echarts.init(ref.current);

    const expiryLabels = expiries.map((e) => new Date(e * 1000).toISOString().slice(0, 10));

    const data = cells.map((c) => ({
      value: [c.x, c.y, c.outlier ? null : Number((c.iv ?? 0).toFixed(4))],
      itemStyle: c.outlier ? { color: "#9ca3af", opacity: 0.35 } : undefined,
    }));

    chart.setOption({
      backgroundColor: "transparent",
      tooltip: {
        position: "top",
        backgroundColor: t.tooltipBg,
        borderColor: t.tooltipBorder,
        textStyle: { color: t.tooltipText, fontSize: 12 },
        formatter: (params: unknown) => {
          const p = params as { data: { value: [number, number, number | null] } };
          const [x, y, v] = p.data.value;
          const strike = strikes[x];
          const expiry = expiryLabels[y];
          if (v == null) {
            return `<b>${strike}</b> / ${expiry}<br/>${i18n.t("optionsLab.outlierIv")}`;
          }
          return `<b>${strike}</b> / ${expiry}<br/>IV = <b>${(v * 100).toFixed(1)}%</b>`;
        },
      },
      grid: { left: "3%", right: "10%", top: "4%", bottom: "14%", containLabel: true },
      xAxis: {
        type: "category",
        data: strikes.map(String),
        axisLabel: { color: t.textColor, fontSize: 10, rotate: 45 },
        axisLine: { lineStyle: { color: t.axisColor } },
        name: i18n.t("optionsLab.strike"),
        nameLocation: "middle",
        nameGap: 36,
        nameTextStyle: { color: t.textColor, fontSize: 11 },
      },
      yAxis: {
        type: "category",
        data: expiryLabels,
        axisLabel: { color: t.textColor, fontSize: 10 },
        axisLine: { lineStyle: { color: t.axisColor } },
      },
      visualMap: {
        min: minIv,
        max: Math.max(maxIv, minIv + 0.0001),
        calculable: true,
        orient: "vertical",
        right: 8,
        top: "center",
        textStyle: { color: t.textColor, fontSize: 11 },
        formatter: (v: number) => `${(v * 100).toFixed(0)}%`,
        inRange: {
          color: ["#2166ac", "#4393c3", "#92c5de", "#f7f7f7", "#f4a582", "#d6604d", "#b2182b"],
        },
      },
      series: [
        {
          name: "IV",
          type: "heatmap",
          data,
          emphasis: { itemStyle: { shadowBlur: 10, shadowColor: "rgba(0,0,0,0.5)" } },
        },
      ],
    });

    const ro = new ResizeObserver(() => chart.resize());
    ro.observe(ref.current!);
    return () => { ro.disconnect(); chart.dispose(); };
  }, [cells, strikes, expiries, minIv, maxIv]);

  if (points.length === 0) {
    return <div className="text-muted-foreground text-sm p-4">{i18n.t("optionsLab.noSurfaceData")}</div>;
  }
  return <div ref={ref} style={{ height }} />;
}
