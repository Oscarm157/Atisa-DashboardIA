import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from "recharts";
import { BRAND, SCALE_COLORS } from "../../config/branding";

type Point = { value: number; count: number; label?: string };

export function DistributionBar({
  data,
  palette,
  height = 220,
}: {
  data: Point[];
  palette?: string[];
  height?: number;
}) {
  const colors = palette || SCALE_COLORS;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#E5E5E5" />
        <XAxis dataKey={(d) => d.label || d.value} tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
        <Tooltip
          cursor={{ fill: "rgba(210,38,44,0.08)" }}
          contentStyle={{ fontSize: 12, borderRadius: 8, border: `1px solid ${BRAND.grayMid}` }}
        />
        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
