import { useMemo } from "react";
import { useFilteredResponses } from "../lib/filters";
import { Card, CardTitle, SectionTitle } from "../components/ui/Card";
import { HorizontalBar } from "../components/charts/HorizontalBar";
import { DistributionBar } from "../components/charts/DistributionBar";
import { byDirection, hoursDistribution, totalHoursSaved } from "../lib/metrics";
import { HOURS_BUCKETS } from "../data/questions";
import { shortDirection } from "../config/branding";
import { Clock, TrendingUp, BarChart3, Users2 } from "lucide-react";
import { KpiCard } from "../components/KpiCard";

export function Hours() {
  const responses = useFilteredResponses();

  const total = useMemo(() => totalHoursSaved(responses), [responses]);
  const perDir = useMemo(
    () =>
      Object.entries(
        byDirection(responses, (g) => g.reduce((s, r) => s + r.horasAhorradasNum, 0))
      )
        .map(([d, v]) => ({ label: shortDirection(d), count: Math.round(v) }))
        .sort((a, b) => b.count - a.count),
    [responses]
  );
  const dist = useMemo(() => hoursDistribution(responses), [responses]);
  const avgPer = responses.length ? total / responses.length : 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-atisa-black mb-1">Horas Ahorrables</h1>
      <p className="text-sm text-atisa-grayDark mb-5">
        Estimación de horas que el personal cree que podría ahorrarse semanalmente si contara con las herramientas de IA adecuadas.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <KpiCard label="Horas / semana" value={Math.round(total)} unit="h" accent="red" icon={<Clock className="w-4 h-4" />} />
        <KpiCard
          label="Horas / año"
          value={Math.round(total * 48).toLocaleString("es-MX")}
          unit="h (48 sem)"
          accent="black"
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <KpiCard label="Promedio / persona" value={avgPer.toFixed(1)} unit="h/sem" icon={<Users2 className="w-4 h-4" />} />
        <KpiCard label="Colaboradores" value={responses.length} icon={<BarChart3 className="w-4 h-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardTitle subtitle="Distribución de respuestas (Q9).">
            ¿Cuántas horas a la semana podrían ahorrar?
          </CardTitle>
          <DistributionBar
            data={dist.map((d) => ({
              value: HOURS_BUCKETS[d.label] ?? 0,
              label: d.label.replace("Entre ", "").replace(" horas", "h"),
              count: d.count,
            }))}
          />
        </Card>

        <Card>
          <CardTitle subtitle="Suma de medianas por dirección (h/semana).">
            Horas por dirección
          </CardTitle>
          <HorizontalBar data={perDir} />
        </Card>
      </div>

      <SectionTitle>Metodología</SectionTitle>
      <Card>
        <div className="text-sm text-atisa-black space-y-2">
          <p>
            Cada colaborador escogió un rango en Q9. Para estimar horas totales asignamos la mediana de cada rango:
          </p>
          <ul className="text-xs text-atisa-grayDark list-disc ml-5 space-y-0.5">
            <li>Menos de 2 horas → 1 h</li>
            <li>Entre 2 - 5 horas → 3.5 h</li>
            <li>Entre 5 - 10 horas → 7.5 h</li>
            <li>Más de 10 horas → 12 h</li>
          </ul>
          <p className="text-xs text-atisa-grayDark">
            La proyección anual considera 48 semanas laborales netas (descontando vacaciones y días festivos).
            No se considera overhead de adopción ni tiempo de aprendizaje inicial. Es un estimado conservador
            basado en la auto-percepción del personal.
          </p>
        </div>
      </Card>
    </div>
  );
}
