import { getResponses } from "@/lib/data";
import { byDirection, hoursDistribution, totalHoursSaved } from "@/lib/metrics";
import { KPI } from "@/components/ui/KPI";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";

export default function HorasPage() {
  const responses = getResponses();
  const total = totalHoursSaved(responses);
  const dist = hoursDistribution(responses);
  const byDirHours = byDirection(responses, (g) => g.reduce((s, r) => s + r.horasAhorradasNum, 0));
  const dirData = Object.entries(byDirHours).sort((a, b) => b[1] - a[1]);
  const maxH = dirData[0]?.[1] ?? 1;
  const annual = Math.round(total * 52);
  const moneyMxn = Math.round(annual * 115);

  return (
    <div className="space-y-10">
      <FadeIn>
        <div>
          <div className="mono-eyebrow mb-3">Horas ahorrables</div>
          <h1 className="font-serif-display text-[40px] md:text-[48px] text-ink leading-[1.05]">
            {Math.round(total)}h por semana en la encuesta.
          </h1>
          <p className="text-[15px] text-ink-3 mt-3 max-w-[720px]">
            Cantidad agregada de horas que los {responses.length} respondientes estiman podrían ahorrar con las herramientas de IA adecuadas. Extrapolado a la plantilla de 200 administrativos sería substancialmente mayor.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="grid md:grid-cols-3 gap-3">
          <KPI label="Horas / semana" value={Math.round(total)} unit="h" variant="ink" />
          <KPI label="Horas / año (encuesta)" value={annual.toLocaleString("es-MX")} unit="h" />
          <KPI
            label="Equivalencia económica"
            value={`$${(moneyMxn / 1000000).toFixed(1)}M`}
            unit="MXN/año"
            hint="Estimación a $115 MXN/h promedio"
            variant="accent"
          />
        </div>
      </FadeIn>

      <FadeIn>
        <div className="bg-bg border border-line p-7">
          <div className="mono-eyebrow mb-2">Distribución</div>
          <h2 className="font-serif-display text-[24px] text-ink mb-6 leading-tight">
            Cuántas horas/semana declara cada respondiente.
          </h2>
          <StaggerChildren className="space-y-4">
            {dist.map((d) => {
              const pct = Math.round((d.count / responses.length) * 100);
              return (
                <StaggerItem key={d.label}>
                  <div className="grid grid-cols-[180px_1fr_auto] gap-4 items-center">
                    <div className="text-[13.5px] text-ink">{d.label}</div>
                    <div className="bg-line-soft h-2.5 relative overflow-hidden">
                      <div className="h-full bg-navy-deep" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="font-mono text-[12px] text-ink-3 tabular-nums w-16 text-right">
                      {d.count} <span className="text-ink-4">·</span> {pct}%
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="bg-bg border border-line p-7">
          <div className="mono-eyebrow mb-2">Por dirección</div>
          <h2 className="font-serif-display text-[24px] text-ink mb-6 leading-tight">
            Las direcciones con más potencial de ahorro semanal.
          </h2>
          <StaggerChildren className="space-y-2.5">
            {dirData.map(([name, h]) => (
              <StaggerItem key={name}>
                <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                  <div>
                    <div className="text-[13px] font-medium text-ink mb-1">{name}</div>
                    <div className="bg-line-soft h-1.5 relative overflow-hidden">
                      <div
                        className="h-full bg-accent"
                        style={{ width: `${(h / maxH) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="font-mono text-[12px] text-ink-3 tabular-nums w-16 text-right">
                    {Math.round(h)}h
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </FadeIn>
    </div>
  );
}
