import { useMemo, useState } from "react";
import { useFilteredResponses } from "../lib/filters";
import { Card, CardTitle } from "../components/ui/Card";
import { ScatterQuadrants } from "../components/charts/ScatterQuadrants";
import { shortDirection } from "../config/branding";
import { Lightbulb, Trophy, AlertTriangle, MoonStar, Users, Building2, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

const ZOOM_PRESETS: Array<{ label: string; x: [number, number]; y: [number, number] }> = [
  { label: "Completo", x: [0.5, 5.5], y: [0.5, 5.5] },
  { label: "2 - 5", x: [1.5, 5.5], y: [1.5, 5.5] },
  { label: "3 - 5 (Campeones)", x: [2.5, 5.3], y: [2.5, 5.3] },
];

export function Matrix() {
  const responses = useFilteredResponses();
  const [mode, setMode] = useState<"individual" | "direccion">("individual");
  const [zoom, setZoom] = useState(0);

  const points = useMemo(
    () =>
      responses.map((r) => ({
        x: r.aperturaScore + (Math.random() - 0.5) * 0.15,
        y: r.habilidad + (Math.random() - 0.5) * 0.25,
        nombre: r.nombre,
        direccion: r.direccion,
      })),
    [responses]
  );

  const dirPoints = useMemo(() => {
    const map = new Map<string, { apertura: number[]; habilidad: number[] }>();
    responses.forEach((r) => {
      if (!map.has(r.direccion)) map.set(r.direccion, { apertura: [], habilidad: [] });
      const g = map.get(r.direccion)!;
      g.apertura.push(r.aperturaScore);
      g.habilidad.push(r.habilidad);
    });
    return Array.from(map.entries()).map(([direccion, v]) => ({
      nombre: shortDirection(direccion),
      direccion,
      x: v.apertura.reduce((a, b) => a + b, 0) / v.apertura.length,
      y: v.habilidad.reduce((a, b) => a + b, 0) / v.habilidad.length,
      n: v.apertura.length,
    }));
  }, [responses]);

  const quadrants = useMemo(() => {
    const q = { champ: 0, latent: 0, skeptic: 0, rezagado: 0 };
    responses.forEach((r) => {
      if (r.habilidad >= 3 && r.aperturaScore >= 3) q.champ++;
      else if (r.habilidad < 3 && r.aperturaScore >= 3) q.latent++;
      else if (r.habilidad >= 3 && r.aperturaScore < 3) q.skeptic++;
      else q.rezagado++;
    });
    return q;
  }, [responses]);

  const total = responses.length || 1;
  const pct = (n: number) => Math.round((n / total) * 100);

  return (
    <div>
      <h1 className="text-2xl font-bold text-atisa-black mb-1">Matriz Apertura × Habilidad</h1>
      <p className="text-sm text-atisa-grayDark mb-5">
        Cada punto es un colaborador. El eje X mide su apertura promedio a la adopción (promedio Q10) y el Y su habilidad con IA (Q3).
        Los cuadrantes identifican dónde enfocar esfuerzos.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-sm font-semibold text-atisa-black tracking-tight">
                {mode === "individual" ? "Dispersión individual" : "Promedio por dirección"}
              </h3>
              <p className="text-xs text-atisa-grayDark mt-0.5">
                {mode === "individual"
                  ? "Cada punto es un colaborador."
                  : "Cada burbuja es una dirección. El tamaño refleja cuántos colaboradores respondieron."}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex bg-atisa-gray rounded-md p-0.5 text-xs">
                <button
                  onClick={() => setMode("individual")}
                  className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                    mode === "individual" ? "bg-white text-atisa-red shadow-sm" : "text-atisa-grayDark"
                  }`}
                >
                  <Users className="w-3 h-3" /> Por colaborador
                </button>
                <button
                  onClick={() => setMode("direccion")}
                  className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                    mode === "direccion" ? "bg-white text-atisa-red shadow-sm" : "text-atisa-grayDark"
                  }`}
                >
                  <Building2 className="w-3 h-3" /> Por dirección
                </button>
              </div>
              <div className="flex items-center gap-0.5 bg-atisa-gray rounded-md p-0.5">
                <button
                  onClick={() => setZoom((z) => Math.max(0, z - 1))}
                  disabled={zoom === 0}
                  title="Alejar"
                  className="p-1 rounded text-atisa-grayDark hover:bg-white hover:text-atisa-red transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] text-atisa-grayDark font-medium px-1 min-w-[60px] text-center">
                  {ZOOM_PRESETS[zoom].label}
                </span>
                <button
                  onClick={() => setZoom((z) => Math.min(ZOOM_PRESETS.length - 1, z + 1))}
                  disabled={zoom === ZOOM_PRESETS.length - 1}
                  title="Acercar"
                  className="p-1 rounded text-atisa-grayDark hover:bg-white hover:text-atisa-red transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                {zoom !== 0 && (
                  <button
                    onClick={() => setZoom(0)}
                    title="Restablecer zoom"
                    className="p-1 rounded text-atisa-grayDark hover:bg-white hover:text-atisa-red transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <ScatterQuadrants
            data={mode === "individual" ? points : dirPoints}
            mode={mode}
            xDomain={ZOOM_PRESETS[zoom].x}
            yDomain={ZOOM_PRESETS[zoom].y}
          />
        </Card>

        <div className="space-y-3">
          <QuadrantCard
            icon={<Trophy className="w-5 h-5" />}
            color="bg-atisa-red"
            title="Campeones"
            count={quadrants.champ}
            pct={pct(quadrants.champ)}
            hint="Habilidad ≥ 3 y apertura ≥ 3. Activarlos como embajadores."
          />
          <QuadrantCard
            icon={<Lightbulb className="w-5 h-5" />}
            color="bg-amber-500"
            title="Aliados Latentes"
            count={quadrants.latent}
            pct={pct(quadrants.latent)}
            hint="Baja habilidad + alta apertura. Foco prioritario de capacitación."
          />
          <QuadrantCard
            icon={<AlertTriangle className="w-5 h-5" />}
            color="bg-atisa-grayDark"
            title="Escépticos Capaces"
            count={quadrants.skeptic}
            pct={pct(quadrants.skeptic)}
            hint="Alta habilidad + baja apertura. Convencer con casos de uso concretos."
          />
          <QuadrantCard
            icon={<MoonStar className="w-5 h-5" />}
            color="bg-atisa-black"
            title="Rezagados"
            count={quadrants.rezagado}
            pct={pct(quadrants.rezagado)}
            hint="Baja habilidad + baja apertura. Estrategia de largo plazo."
          />
        </div>
      </div>

      <Card className="mt-4">
        <CardTitle>Tabla por dirección</CardTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-atisa-grayDark border-b border-atisa-grayMid">
                <th className="py-2 pr-3">Dirección</th>
                <th className="py-2 pr-3 text-right">Campeones</th>
                <th className="py-2 pr-3 text-right">Aliados Latentes</th>
                <th className="py-2 pr-3 text-right">Escépticos</th>
                <th className="py-2 pr-3 text-right">Rezagados</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(new Set(responses.map((r) => r.direccion))).sort().map((d) => {
                const group = responses.filter((r) => r.direccion === d);
                const c = group.filter((r) => r.habilidad >= 3 && r.aperturaScore >= 3).length;
                const l = group.filter((r) => r.habilidad < 3 && r.aperturaScore >= 3).length;
                const s = group.filter((r) => r.habilidad >= 3 && r.aperturaScore < 3).length;
                const rz = group.filter((r) => r.habilidad < 3 && r.aperturaScore < 3).length;
                return (
                  <tr key={d} className="border-b border-atisa-grayMid/30">
                    <td className="py-2 pr-3 font-medium">{shortDirection(d)}</td>
                    <td className="py-2 pr-3 text-right text-atisa-red font-semibold">{c}</td>
                    <td className="py-2 pr-3 text-right text-amber-600 font-semibold">{l}</td>
                    <td className="py-2 pr-3 text-right">{s}</td>
                    <td className="py-2 pr-3 text-right text-atisa-grayDark">{rz}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function QuadrantCard({
  icon,
  color,
  title,
  count,
  pct,
  hint,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
  count: number;
  pct: number;
  hint: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-card p-4 border border-atisa-grayMid/40">
      <div className="flex items-center gap-2 mb-1">
        <div className={`${color} text-white rounded-md w-8 h-8 flex items-center justify-center`}>{icon}</div>
        <div className="font-semibold text-sm text-atisa-black">{title}</div>
      </div>
      <div className="flex items-baseline gap-2">
        <div className="text-2xl font-bold text-atisa-black">{count}</div>
        <div className="text-xs text-atisa-grayDark">{pct}%</div>
      </div>
      <div className="text-[11px] text-atisa-grayDark mt-1">{hint}</div>
    </div>
  );
}
