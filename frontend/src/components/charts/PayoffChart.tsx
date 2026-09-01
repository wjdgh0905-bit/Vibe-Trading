import { useEffect, useRef } from "react";
import i18n from "@/i18n";
import { getChartTheme } from "@/lib/chart-theme";
import { echarts } from "@/lib/echarts";

interface Props {
  prices: number[];
  expiryPnl: number[];
  scenarioPnl: number[];
  spot: number;
  height?: number;
}

/** Payoff / scenario P&L curve: at-expiry (intrinsic) vs. a re-priced scenario point. */
export function PayoffChart({ prices, expiryPnl, scenarioPnl, spot, height = 340 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || prices.length === 0) return;
    const t = getChartTheme();
    const chart = echarts.init(ref.current);

    chart.setOption({
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        backgroundColor: t.tooltipBg,
        borderColor: t.tooltipBorder,
        textStyle: { color: t.tooltipText, fontSize: 11 },
        valueFormatter: (v: unknown) => (typeof v === "number" ? v.toFixed(2) : String(v)),
      },
      legend: {
        data: [i18n.t("optionsLab.payoffAtExpiry"), i18n.t("optionsLab.payoffScenario")],
        textStyle: { color: t.textColor, fontSize: 11 },
        top: 0,
      },
      grid: { left: 8, right: 16, top: 32, bottom: 8, containLabel: true },
      xAxis: {
        type: "category",
        data: prices.map((p) => p.toFixed(2)),
        axisLine: { lineStyle: { color: t.axisColor } },
        axisLabel: { color: t.textColor, fontSize: 10 },
        name: i18n.t("optionsLab.underlyingPrice"),
        nameLocation: "middle",
        nameGap: 28,
        nameTextStyle: { color: t.textColor, fontSize: 11 },
      },
      yAxis: {
        type: "value",
        axisLine: { lineStyle: { color: t.axisColor } },
        axisLabel: { color: t.textColor, fontSize: 10 },
        splitLine: { lineStyle: { color: t.gridColor } },
      },
      series: [
        {
          name: i18n.t("optionsLab.payoffAtExpiry"),
          type: "line",
          data: expiryPnl,
          showSymbol: false,
          lineStyle: { color: t.infoColor, width: 2 },
          itemStyle: { color: t.infoColor },
          markLine: {
            symbol: "none",
            silent: true,
            lineStyle: { color: t.axisColor, type: "dashed" },
            data: [
              { yAxis: 0 },
              { xAxis: prices.findIndex((p) => p >= spot), label: { formatter: "spot", color: t.textColor } },
            ],
          },
        },
        {
          name: i18n.t("optionsLab.payoffScenario"),
          type: "line",
          data: scenarioPnl,
          showSymbol: false,
          lineStyle: { color: t.warningColor, width: 2 },
          itemStyle: { color: t.warningColor },
        },
      ],
    });

    const ro = new ResizeObserver(() => chart.resize());
    ro.observe(ref.current!);
    return () => { ro.disconnect(); chart.dispose(); };
  }, [prices, expiryPnl, scenarioPnl, spot]);

  if (prices.length === 0) {
    return <div className="text-muted-foreground text-sm p-4">{i18n.t("optionsLab.noPayoffData")}</div>;
  }
  return <div ref={ref} style={{ height }} />;
}
