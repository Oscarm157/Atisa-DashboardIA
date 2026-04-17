import { useMemo } from "react";
import { useFilteredResponses, getMeta } from "../lib/filters";
import { kpis, countMulti, byDirection } from "../lib/metrics";
import { KpiCard } from "../components/KpiCard";
import { Card, CardTitle, SectionTitle } from "../components/ui/Card";
import { HorizontalBar } from "../components/charts/HorizontalBar";
import { DonutChart } from "../components/charts/DonutChart";
import { shortDirection } from "../config/branding";
import {
  Users,
  Activity,
  Sparkles,
  Unlock,
  Clock,
  Trophy,
} from "lucide-react";

export function Overview() {
  const responses = useFilteredResponses();
  const meta = getMeta();
  const k = useMemo(() => kpis(responses), [responses]);
  const byDir = useMemo(
    () => byDirection(responses, (g) => g.length),
    [responses]
  );
  const topTools = useMemo(
    () => countMulti(responses, "plataformas").slice(0, 8),
    [responses]
  );
  const topBarriers = useMemo(
    () => countMulti(responses, "barreras").slice(0, 8),
    [responses]
  );

  const dirData = Object.entries(byDir)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));

  return (
    <div>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-atisa-black">Resumen Ejecutivo</h1>
          <p className="text-sm text-atisa-grayDark">
            Diagnóstico basado en {k.n} colaboradores · {meta.directionCounts ? Object.keys(meta.directionCounts).length : 13} direcciones
          </p>
        </div>
        <div className="text-right text-[10px] text-atisa-grayDark">
          Generado: {new Date(meta.generatedAt).toLocaleDateString("es-MX")}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <KpiCard label="Colaboradores" value={k.n} accent="red" icon={<Users className="w-4 h-4" />} />
        <KpiCard label="Frecuencia prom." value={k.frecuencia} unit="/ 5" icon={<Activity className="w-4 h-4" />} />
        <KpiCard label="Habilidad prom." value={k.habilidad} unit="/ 5" icon={<Sparkles className="w-4 h-4" />} />
        <KpiCard label="Apertura prom." value={k.apertura} unit="/ 5" icon={<Unlock className="w-4 h-4" />} />
        <KpiCard label="Horas ahorrables / sem" value={k.horasSemana} unit="h" icon={<Clock className="w-4 h-4" />} />
        <KpiCard label="% campeones" value={`${k.pctCampeones}%`} accent="black" icon={<Trophy className="w-4 h-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-2">
          <CardTitle subtitle="Participación por dirección">Distribución</CardTitle>
          <DonutChart
            data={dirData}
            legendFormatter={shortDirection}
            height={320}
            innerRadius={70}
            outerRadius={115}
          />
        </Card>

        <Card className="lg:col-span-3">
          <CardTitle subtitle="Plataformas más utilizadas">Top herramientas</CardTitle>
          <HorizontalBar data={topTools} labelWidth={140} height={320} />
        </Card>

        <Card className="lg:col-span-5">
          <CardTitle subtitle="Factores que frenan la adopción — pasa el cursor para ver la descripción completa">
            Top barreras
          </CardTitle>
          <HorizontalBar data={topBarriers} labelWidth={220} />
        </Card>
      </div>

      <SectionTitle>Dato importante</SectionTitle>
      <Card>
        <div className="flex items-start gap-3">
          <div className="text-atisa-red">
            <Trophy className="w-5 h-5" />
          </div>
          <div className="text-sm text-atisa-black">
            <p className="mb-1">
              <b>{Math.round(k.horasSemana * 48).toLocaleString("es-MX")}</b> horas al año podrían ahorrarse con IA
              si se habilitan las herramientas correctas, según lo estimado por los propios colaboradores
              ({k.horasSemana} h/semana × 48 semanas laborales).
            </p>
            <p className="text-atisa-grayDark text-xs">
              {k.pctCampeones}% del personal filtrado ya son "campeones" (habilidad ≥ 4 y uso frecuente).
              Esta base puede liderar el despliegue en sus áreas.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
