import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { DIRECTION_COLORS } from "../../config/branding";

export function DonutChart({
  data,
  height = 260,
  innerRadius = 55,
  outerRadius = 90,
  palette = DIRECTION_COLORS,
  legendFormatter,
}: {
  data: { name: string; value: number }[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  palette?: string[];
  legendFormatter?: (name: string) => string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={2}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={palette[i % palette.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8 }}
          formatter={(v, name) => [String(v), legendFormatter ? legendFormatter(String(name)) : String(name)]}
        />
        <Legend
          wrapperStyle={{ fontSize: 10 }}
          formatter={(v: string) => (legendFormatter ? legendFormatter(v) : v)}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
