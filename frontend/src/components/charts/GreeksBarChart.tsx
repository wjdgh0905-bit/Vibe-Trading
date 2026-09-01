import { useEffect, useRef } from "react";
import i18n from "@/i18n";
import type { OptionsAggregateGreeks } from "@/lib/api";
import { getChartTheme } from "@/lib/chart-theme";
import { echarts } from "@/lib/echarts";

interface Props {
  aggregate: OptionsAggregateGreeks;
  height?: number;
}

/** Bar chart of the four aggregated portfolio Greeks (Greeks Dashboard, stage 1). */
export function GreeksBarChart({ aggregate, height = 220 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const t = getChartTheme();
    const chart = echarts.init(ref.current);

    const labels = [
      i18n.t("optionsLab.delta"),
      i18n.t("optionsLab.gamma"),
      i18n.t("optionsLab.theta"),
      i18n.t("optionsLab.vega"),
    ];
    const values = [aggregate.delta, aggregate.gamma, aggregate.theta, aggregate.vega];

    chart.setOption({
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        backgroundColor: t.tooltipBg,
        borderColor: t.tooltipBorder,
        textStyle: { color: t.tooltipText, fontSize: 11 },
      },
      grid: { left: 8, right: 16, top: 16, bottom: 8, containLabel: true },
      xAxis: {
        type: "category",
        data: labels,
        axisLine: { lineStyle: { color: t.axisColor } },
        axisLabel: { color: t.textColor, fontSize: 11 },
      },
      yAxis: {
        type: "value",
        axisLine: { lineStyle: { color: t.axisColor } },
        axisLabel: { color: t.textColor, fontSize: 10 },
        splitLine: { lineStyle: { color: t.gridColor } },
      },
      series: [
        {
          type: "bar",
          data: values.map((v) => ({ value: v, itemStyle: { color: v >= 0 ? t.upColor : t.downColor } })),
          barMaxWidth: 40,
        },
      ],
    });

    const ro = new ResizeObserver(() => chart.resize());
    ro.observe(ref.current!);
    return () => { ro.disconnect(); chart.dispose(); };
  }, [aggregate]);

  return <div ref={ref} style={{ height }} />;
}
