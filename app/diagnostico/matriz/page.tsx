"use client";

import { getResponses } from "@/lib/data";
import { useMemo } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ZAxis, ResponsiveContainer } from "recharts";

type Quadrant = "champ" | "latent" | "skeptic" | "rezagado";

const QUAD: Record<Quadrant, { label: string; hint: string; color: string }> = {
  champ: { label: "Campeones", hint: "Habilidad ≥ 4 + apertura ≥ 4. Pueden liderar workshops y ser embajadores.", color: "#2F7D5C" },
  latent: { label: "Aliados latentes", hint: "Baja habilidad, alta apertura. Foco prioritario de capacitación.", color: "#1B3A5C" },
  skeptic: { label: "Escépticos hábiles", hint: "Alta habilidad, baja apertura. Convencer con casos de uso concretos.", color: "#B47A1C" },
  rezagado: { label: "Rezagados", hint: "Baja habilidad y baja apertura. Estrategia de largo plazo.", color: "#8A8A8A" },
};

function quadrantOf(habilidad: number, apertura: number): Quadrant {
  if (habilidad >= 4 && apertura >= 4) return "champ";
  if (habilidad < 4 && apertura >= 4) return "latent";
  if (habilidad >= 4 && apertura < 4) return "skeptic";
  return "rezagado";
}

export default function MatrizPage() {
  const responses = useMemo(() => getResponses(), []);

  const data = useMemo(
    () =>
      responses.map((r, i) => {
        const jx = ((i * 13) % 11 - 5) / 50;
        const jy = ((i * 7) % 11 - 5) / 50;
        return {
          x: r.aperturaScore + jx * 0.2,
          y: r.habilidad + jy * 0.2,
          nombre: r.nombre,
          direccion: r.direccion,
          habilidad: r.habilidad,
          apertura: r.aperturaScore,
          quadrant: quadrantOf(r.habilidad, r.aperturaScore),
        };
      }),
    [responses]
  );

  const counts: Record<Quadrant, number> = { champ: 0, latent: 0, skeptic: 0, rezagado: 0 };
  data.forEach((d) => counts[d.quadrant]++);

  return (
    <div className="space-y-10">
      <div>
        <div className="mono-eyebrow mb-3">Matriz</div>
        <h1 className="font-serif-display text-[40px] md:text-[48px] text-ink leading-[1.05]">
          Apertura · Habilidad.
        </h1>
        <p className="text-[15px] text-ink-3 mt-3 max-w-[720px]">
          X = apertura (Q10) · Y = habilidad (Q3) · cada punto un colaborador.
        </p>
      </div>

      <div className="bg-bg border border-line p-7">
        <div className="h-[480px]">
          <ResponsiveContainer>
            <ScatterChart margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid stroke="#E4E4E0" strokeDasharray="2 4" />
              <XAxis
                type="number"
                dataKey="x"
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                stroke="#8A8A8A"
                fontSize={11}
                tickLine={false}
                label={{ value: "Apertura →", position: "insideBottom", offset: -5, fill: "#525252", fontSize: 11 }}
              />
              <YAxis
                type="number"
                dataKey="y"
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                stroke="#8A8A8A"
                fontSize={11}
                tickLine={false}
                label={{ value: "Habilidad →", angle: -90, position: "insideLeft", fill: "#525252", fontSize: 11 }}
              />
              <ZAxis range={[40, 40]} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ active, payload }) => {
                  if (!active || !payload || !payload[0]) return null;
                  const d = payload[0].payload;
                  const q = QUAD[d.quadrant as Quadrant];
                  return (
                    <div className="bg-ink text-white p-3 text-[12px] border border-ink shadow-xl">
                      <div className="font-medium">{d.nombre}</div>
                      <div className="text-white/60 mt-0.5">{d.direccion}</div>
                      <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 font-mono">
                        <span>Habilidad</span><span className="tabular-nums">{d.habilidad}/5</span>
                        <span>Apertura</span><span className="tabular-nums">{d.apertura.toFixed(2)}</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-white/15 text-[10.5px] uppercase tracking-widest" style={{ color: q.color }}>
                        {q.label}
                      </div>
                    </div>
                  );
                }}
              />
              {(["champ", "latent", "skeptic", "rezagado"] as Quadrant[]).map((q) => (
                <Scatter
                  key={q}
                  name={QUAD[q].label}
                  data={data.filter((d) => d.quadrant === q)}
                  fill={QUAD[q].color}
                  fillOpacity={0.75}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        {(Object.keys(QUAD) as Quadrant[]).map((q) => (
          <div
            key={q}
            className="bg-bg border border-line p-5 border-l-4"
            style={{ borderLeftColor: QUAD[q].color }}
          >
            <div className="font-mono text-[10.5px] uppercase tracking-widest font-medium" style={{ color: QUAD[q].color }}>
              {QUAD[q].label}
            </div>
            <div className="font-serif-display text-[36px] text-ink leading-none mt-2">
              {counts[q]}
            </div>
            <p className="text-[12px] text-ink-3 mt-3 leading-[1.55]">{QUAD[q].hint}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
