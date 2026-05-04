import { getResponses, getMeta } from "@/lib/data";
import { kpis, byDirection, countMulti } from "@/lib/metrics";
import { KPI } from "@/components/ui/KPI";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { Tag } from "@/components/ui/Tag";
import { shortLabel } from "@/lib/utils";

export default function DiagnosticoOverviewPage() {
  const responses = getResponses();
  const meta = getMeta();
  const k = kpis(responses);
  const byDir = byDirection(responses, (g) => g.length);
  const dirData = Object.entries(byDir).sort((a, b) => b[1] - a[1]);
  const maxN = dirData[0]?.[1] ?? 1;
  const topBarriers = countMulti(responses, "barreras").slice(0, 6);
  const topPlatforms = countMulti(responses, "plataformas").slice(0, 6);

  return (
    <div className="space-y-12">
      <FadeIn>
        <div>
          <div className="mono-eyebrow mb-3">Resumen ejecutivo</div>
          <h1 className="font-serif-display text-[40px] md:text-[52px] text-ink leading-[1.05]">
            Diagnóstico de adopción de IA.
          </h1>
          <p className="text-[15px] text-ink-3 mt-3 max-w-[720px]">
            Basado en {k.n} colaboradores válidos. {Object.keys(meta.directionCounts || {}).length} direcciones representadas. Generado {new Date(meta.generatedAt).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <KPI label="Colaboradores" value={k.n} variant="ink" />
          <KPI label="Frecuencia" value={k.frecuencia} unit="/ 5" />
          <KPI label="Habilidad" value={k.habilidad} unit="/ 5" />
          <KPI label="Apertura" value={k.apertura} unit="/ 5" />
          <KPI label="Horas / sem" value={k.horasSemana} unit="h" />
          <KPI label="Campeones" value={`${k.pctCampeones}%`} variant="accent" />
        </div>
      </FadeIn>

      <FadeIn>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-bg border border-line p-7">
            <div className="mono-eyebrow mb-2">Distribución por dirección</div>
            <h2 className="font-serif-display text-[24px] text-ink mb-6 leading-tight">
              {dirData.length} direcciones, ordenadas por número de respuestas.
            </h2>
            <StaggerChildren className="space-y-2.5">
              {dirData.map(([name, n]) => (
                <StaggerItem key={name}>
                  <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                    <div>
                      <div className="text-[13px] font-medium text-ink mb-1">{name}</div>
                      <div className="bg-line-soft h-1.5 relative">
                        <div
                          className="h-full bg-navy-deep"
                          style={{ width: `${(n / maxN) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="font-mono text-[12px] text-ink-3 tabular-nums w-8 text-right">{n}</div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>

          <div className="space-y-4">
            <div className="bg-bg border border-line p-6">
              <div className="mono-eyebrow mb-2">Top barreras</div>
              <ul className="space-y-2">
                {topBarriers.map((b) => (
                  <li key={b.label} className="flex justify-between text-[13px]">
                    <span className="text-ink">{shortLabel(b.label, 28)}</span>
                    <span className="font-mono text-ink-3 tabular-nums">{b.count}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-bg border border-line p-6">
              <div className="mono-eyebrow mb-2">Plataformas en uso</div>
              <ul className="space-y-2">
                {topPlatforms.map((p) => (
                  <li key={p.label} className="flex justify-between text-[13px]">
                    <span className="text-ink">{shortLabel(p.label, 28)}</span>
                    <span className="font-mono text-ink-3 tabular-nums">{p.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="flex flex-wrap gap-2">
          <Tag variant="navy">Universo: {k.n}</Tag>
          <Tag variant="accent">Campeones: {responses.filter((r) => r.esCampeon).length}</Tag>
          <Tag variant="green">{Math.round(k.horasSemana)}h ahorrables/sem</Tag>
        </div>
      </FadeIn>
    </div>
  );
}
