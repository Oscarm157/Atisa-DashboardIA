import { useMemo, useState } from "react";
import { useFilteredResponses } from "../lib/filters";
import { directionProfile } from "../lib/metrics";
import { Card, CardTitle } from "../components/ui/Card";
import { RadarCompare } from "../components/charts/RadarCompare";
import { Heatmap } from "../components/charts/Heatmap";
import { shortDirection } from "../config/branding";

const AXES = [
  { key: "frecuencia", label: "Frecuencia", max: 5 },
  { key: "habilidad", label: "Habilidad", max: 5 },
  { key: "apertura", label: "Apertura", max: 5 },
  { key: "pctCampeones", label: "% Campeones", max: 100 },
  { key: "pctConoceHerramientas", label: "% ≥3 tools", max: 100 },
];

export function Compare() {
  const responses = useFilteredResponses();
  const profile = useMemo(() => directionProfile(responses), [responses]);
  const direcciones = useMemo(() => Object.keys(profile).sort(), [profile]);

  const [selected, setSelected] = useState<string[]>(direcciones.slice(0, 4));

  const toggle = (d: string) => {
    setSelected((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d].slice(-6)
    );
  };

  const radarSeries = selected.map((d) => ({
    name: d,
    values: AXES.map((a) => {
      const v = profile[d]?.[a.key as keyof (typeof profile)[string]] as number;
      // Normalize to 0-5 scale for radar
      return (v / a.max) * 5;
    }),
  }));

  const heatmapCells = direcciones.flatMap((d) =>
    AXES.map((a) => ({
      row: d,
      col: a.label,
      value:
        ((profile[d]?.[a.key as keyof (typeof profile)[string]] as number) / a.max) * 5,
      raw: profile[d]?.[a.key as keyof (typeof profile)[string]] as number,
    }))
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-atisa-black mb-1">Comparador por Dirección</h1>
      <p className="text-sm text-atisa-grayDark mb-5">
        Compara métricas entre direcciones. Selecciona hasta 6 para el radar; el mapa de calor muestra todas.
      </p>

      <Card className="mb-4">
        <CardTitle>Seleccionar direcciones para radar</CardTitle>
        <div className="flex flex-wrap gap-1">
          {direcciones.map((d) => (
            <button
              key={d}
              onClick={() => toggle(d)}
              className={`text-[10px] px-2 py-1 rounded-md border transition-colors ${
                selected.includes(d)
                  ? "bg-atisa-red text-white border-atisa-red"
                  : "bg-white text-atisa-black border-atisa-grayMid hover:border-atisa-red"
              }`}
            >
              {shortDirection(d)} ({profile[d].n})
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardTitle subtitle="Valores normalizados a escala 0-5 (donde 100% = 5).">
            Radar comparativo
          </CardTitle>
          <RadarCompare
            axes={AXES.map((a) => ({ axis: a.label, max: 5 }))}
            series={radarSeries}
          />
        </Card>

        <Card>
          <CardTitle subtitle="Mapa de calor con todas las direcciones y métricas (valores crudos al hover).">
            Heatmap completo
          </CardTitle>
          <Heatmap
            cells={heatmapCells}
            rows={direcciones}
            cols={AXES.map((a) => a.label)}
            min={0}
            max={5}
            rowLabel={shortDirection}
            formatValue={(v) => (typeof v === "number" ? v.toFixed(1) : String(v))}
          />
        </Card>

        <Card>
          <CardTitle>Tabla de perfiles</CardTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-atisa-grayDark border-b border-atisa-grayMid">
                  <th className="py-2 pr-3">Dirección</th>
                  <th className="py-2 pr-3 text-right">N</th>
                  {AXES.map((a) => (
                    <th key={a.key} className="py-2 pr-3 text-right">{a.label}</th>
                  ))}
                  <th className="py-2 pr-3 text-right">Horas/sem</th>
                </tr>
              </thead>
              <tbody>
                {direcciones.map((d) => (
                  <tr key={d} className="border-b border-atisa-grayMid/30 hover:bg-atisa-gray/50">
                    <td className="py-2 pr-3 font-medium">{shortDirection(d)}</td>
                    <td className="py-2 pr-3 text-right">{profile[d].n}</td>
                    {AXES.map((a) => (
                      <td key={a.key} className="py-2 pr-3 text-right">
                        {(profile[d]?.[a.key as keyof (typeof profile)[string]] as number).toFixed(1)}
                        {a.key.startsWith("pct") ? "%" : ""}
                      </td>
                    ))}
                    <td className="py-2 pr-3 text-right">{profile[d].horasSemana}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
