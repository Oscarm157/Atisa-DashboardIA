import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import { BRAND } from "../../config/branding";

type Point = { label: string; count: number; pct?: number };

export function HorizontalBar({
  data,
  height,
  palette,
}: {
  data: Point[];
  height?: number;
  palette?: string[];
}) {
  const h = height || Math.max(180, 24 * data.length + 40);
  return (
    <ResponsiveContainer width="100%" height={h}>
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 20, left: 10, bottom: 8 }}>
        <CartesianGrid horizontal={false} stroke="#E5E5E5" />
        <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
        <YAxis type="category" dataKey="label" tick={{ fontSize: 11 }} width={160} />
        <Tooltip
          cursor={{ fill: "rgba(210,38,44,0.08)" }}
          contentStyle={{ fontSize: 12, borderRadius: 8, border: `1px solid ${BRAND.grayMid}` }}
          formatter={(val, _n, p: any) => [
            p.payload.pct != null ? `${val} (${Number(p.payload.pct).toFixed(0)}%)` : String(val),
            "Respuestas",
          ]}
        />
        <Bar dataKey="count" radius={[0, 6, 6, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={palette ? palette[i % palette.length] : BRAND.primary} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
