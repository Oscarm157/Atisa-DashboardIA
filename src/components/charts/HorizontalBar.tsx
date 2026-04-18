import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, LabelList } from "recharts";
import { BRAND } from "../../config/branding";
import { shortLabel } from "../../lib/utils";

type Point = { label: string; count: number; pct?: number };

export function HorizontalBar({
  data,
  height,
  palette,
  labelWidth = 180,
  showValueLabels = true,
  onItemClick,
}: {
  data: Point[];
  height?: number;
  palette?: string[];
  labelWidth?: number;
  showValueLabels?: boolean;
  onItemClick?: (label: string) => void;
}) {
  const h = height || Math.max(200, 32 * data.length + 40);
  return (
    <ResponsiveContainer width="100%" height={h}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 6, right: 42, left: 4, bottom: 4 }}
      >
        <CartesianGrid horizontal={false} stroke="#F0F0F0" />
        <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
        <YAxis
          type="category"
          dataKey="label"
          tick={{ fontSize: 11, fill: "#1A1A1A" }}
          width={labelWidth}
          tickFormatter={(v) => shortLabel(String(v), 28)}
          interval={0}
        />
        <Tooltip
          cursor={{ fill: "rgba(210,38,44,0.08)" }}
          contentStyle={{ fontSize: 12, borderRadius: 8, border: `1px solid ${BRAND.grayMid}` }}
          labelFormatter={(label) => shortLabel(String(label), 80)}
          formatter={(val, _n, p: any) => [
            p.payload.pct != null ? `${val} (${Number(p.payload.pct).toFixed(0)}%)` : String(val),
            "Respuestas",
          ]}
        />
        <Bar
          dataKey="count"
          radius={[0, 6, 6, 0]}
          barSize={20}
          onClick={(d: any) => onItemClick && d && onItemClick(d.label)}
          cursor={onItemClick ? "pointer" : undefined}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={palette ? palette[i % palette.length] : BRAND.primary} />
          ))}
          {showValueLabels && (
            <LabelList
              dataKey="count"
              position="right"
              style={{ fontSize: 11, fill: "#1A1A1A", fontWeight: 600 }}
            />
          )}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
