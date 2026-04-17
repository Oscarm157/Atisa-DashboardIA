import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { LIKERT_COLORS, BRAND } from "../../config/branding";
import { LIKERT_LEVELS } from "../../data/questions";

type Row = { label: string; 1: number; 2: number; 3: number; 4: number; 5: number };

export function LikertStacked({ data }: { data: Row[] }) {
  return (
    <ResponsiveContainer width="100%" height={Math.max(220, 60 * data.length + 40)}>
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 20, left: 10, bottom: 8 }} stackOffset="expand">
        <CartesianGrid horizontal={false} stroke="#EEE" />
        <XAxis type="number" tickFormatter={(v) => `${Math.round(v * 100)}%`} tick={{ fontSize: 11 }} />
        <YAxis type="category" dataKey="label" tick={{ fontSize: 11 }} width={280} />
        <Tooltip
          formatter={(v) => [String(v), ""]}
          contentStyle={{ fontSize: 12, borderRadius: 8, border: `1px solid ${BRAND.grayMid}` }}
        />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        {[1, 2, 3, 4, 5].map((n) => (
          <Bar
            key={n}
            dataKey={String(n)}
            stackId="a"
            fill={LIKERT_COLORS[n - 1]}
            name={LIKERT_LEVELS[n - 1]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
