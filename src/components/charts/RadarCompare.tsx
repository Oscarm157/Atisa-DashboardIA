import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { DIRECTION_COLORS, shortDirection } from "../../config/branding";

type Axis = { axis: string; max: number };

export function RadarCompare({
  axes,
  series,
}: {
  axes: Axis[];
  series: { name: string; values: number[] }[];
}) {
  const data = axes.map((a, i) => {
    const row: Record<string, string | number> = { axis: a.axis };
    series.forEach((s) => {
      row[s.name] = s.values[i];
    });
    return row;
  });

  return (
    <ResponsiveContainer width="100%" height={420}>
      <RadarChart data={data}>
        <PolarGrid stroke="#E5E5E5" />
        <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11 }} />
        <PolarRadiusAxis angle={30} domain={[0, "auto"]} tick={{ fontSize: 10 }} />
        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
        <Legend wrapperStyle={{ fontSize: 11 }} formatter={(v) => shortDirection(v)} />
        {series.map((s, i) => (
          <Radar
            key={s.name}
            name={s.name}
            dataKey={s.name}
            stroke={DIRECTION_COLORS[i % DIRECTION_COLORS.length]}
            fill={DIRECTION_COLORS[i % DIRECTION_COLORS.length]}
            fillOpacity={0.18}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );
}
