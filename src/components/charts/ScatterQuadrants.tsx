import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  ZAxis,
  LabelList,
} from "recharts";
import { BRAND, DIRECTION_COLORS, shortDirection } from "../../config/branding";
import { useMemo } from "react";

type Point = {
  x: number;
  y: number;
  nombre: string;
  direccion: string;
  n?: number;
  tooltip?: string;
};

export function ScatterQuadrants({
  data,
  mode = "individual",
  xDomain = [0.5, 5.5],
  yDomain = [0.5, 5.5],
}: {
  data: Point[];
  mode?: "individual" | "direccion";
  xDomain?: [number, number];
  yDomain?: [number, number];
}) {
  const direcciones = useMemo(() => {
    const set = new Set<string>();
    data.forEach((d) => set.add(d.direccion));
    return Array.from(set);
  }, [data]);

  const grouped = useMemo(() => {
    const map = new Map<string, Point[]>();
    data.forEach((p) => {
      if (!map.has(p.direccion)) map.set(p.direccion, []);
      map.get(p.direccion)!.push(p);
    });
    return Array.from(map.entries());
  }, [data]);

  const zRange: [number, number] = mode === "direccion" ? [100, 900] : [60, 60];

  return (
    <ResponsiveContainer width="100%" height={500}>
      <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 40 }}>
        <CartesianGrid stroke="#EEE" />
        <XAxis
          type="number"
          dataKey="x"
          name="Apertura"
          domain={xDomain}
          ticks={[1, 2, 3, 4, 5]}
          tick={{ fontSize: 11 }}
          allowDataOverflow
          label={{ value: "Apertura →", position: "insideBottom", offset: -10, fontSize: 12, fill: BRAND.grayDark }}
        />
        <YAxis
          type="number"
          dataKey="y"
          name="Habilidad"
          domain={yDomain}
          ticks={[1, 2, 3, 4, 5]}
          tick={{ fontSize: 11 }}
          allowDataOverflow
          label={{ value: "Habilidad →", angle: -90, position: "insideLeft", fontSize: 12, fill: BRAND.grayDark }}
        />
        <ZAxis type="number" dataKey="n" range={zRange} />
        {/* Campeones: alta apertura + alta habilidad (top-right) */}
        <ReferenceArea x1={3} x2={5.5} y1={3} y2={5.5} fill={BRAND.primary} fillOpacity={0.05} />
        {/* Aliados Latentes: alta apertura + baja habilidad (bottom-right) */}
        <ReferenceArea x1={3} x2={5.5} y1={0.5} y2={3} fill="#F59E0B" fillOpacity={0.05} />
        {/* Escépticos Capaces: baja apertura + alta habilidad (top-left) */}
        <ReferenceArea x1={0.5} x2={3} y1={3} y2={5.5} fill="#6B7280" fillOpacity={0.05} />
        {/* Rezagados: baja-baja (bottom-left) */}
        <ReferenceArea x1={0.5} x2={3} y1={0.5} y2={3} fill="#1A1A1A" fillOpacity={0.03} />
        <ReferenceLine x={3} stroke={BRAND.grayDark} strokeDasharray="3 3" />
        <ReferenceLine y={3} stroke={BRAND.grayDark} strokeDasharray="3 3" />

        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          contentStyle={{ fontSize: 12, borderRadius: 8, border: `1px solid ${BRAND.grayMid}` }}
          content={({ active, payload }) => {
            if (!active || !payload || !payload.length) return null;
            const p = payload[0].payload as Point;
            return (
              <div className="bg-white p-2 rounded-md shadow-card text-xs">
                <div className="font-semibold">{p.nombre}</div>
                {mode === "individual" && (
                  <div className="text-atisa-grayDark">{shortDirection(p.direccion)}</div>
                )}
                <div>
                  Apertura: {p.x.toFixed(1)} · Habilidad: {p.y.toFixed(mode === "direccion" ? 1 : 0)}
                </div>
                {mode === "direccion" && p.n != null && (
                  <div className="text-atisa-grayDark">{p.n} colaborador{p.n === 1 ? "" : "es"}</div>
                )}
              </div>
            );
          }}
        />
        {grouped.map(([dir, pts]) => (
          <Scatter
            key={dir}
            name={dir}
            data={pts}
            fill={DIRECTION_COLORS[direcciones.indexOf(dir) % DIRECTION_COLORS.length]}
            fillOpacity={mode === "direccion" ? 0.6 : 0.8}
            stroke={mode === "direccion" ? "#1A1A1A" : undefined}
            strokeWidth={mode === "direccion" ? 1 : 0}
          >
            {mode === "direccion" && (
              <LabelList
                dataKey="nombre"
                position="top"
                offset={8}
                style={{ fontSize: 10, fill: "#1A1A1A", fontWeight: 600 }}
              />
            )}
          </Scatter>
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  );
}
