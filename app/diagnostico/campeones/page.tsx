import { getResponses } from "@/lib/data";
import { initials, shortLabel } from "@/lib/utils";
import { KPI } from "@/components/ui/KPI";
import { Tag } from "@/components/ui/Tag";
import { FadeIn } from "@/components/motion/FadeIn";
import { Trophy, Sparkles, Activity, Mail } from "lucide-react";

export default function CampeonesPage() {
  const responses = getResponses();
  const champions = responses
    .filter((r) => r.esCampeon)
    .sort((a, b) => {
      if (b.habilidad !== a.habilidad) return b.habilidad - a.habilidad;
      return b.frecuencia - a.frecuencia;
    });

  const byDir = new Map<string, typeof champions>();
  champions.forEach((c) => {
    if (!byDir.has(c.direccion)) byDir.set(c.direccion, []);
    byDir.get(c.direccion)!.push(c);
  });

  return (
    <div className="space-y-10">
      <FadeIn>
        <div>
          <div className="mono-eyebrow mb-3">Campeones</div>
          <h1 className="font-serif-display text-[40px] md:text-[48px] text-ink leading-[1.05]">
            {champions.length} colaboradores.
          </h1>
          <p className="text-[15px] text-ink-3 mt-3 max-w-[720px]">
            Habilidad ≥ 4 y frecuencia ≥ 4. Base de mentores Intermedios.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="grid md:grid-cols-3 gap-3">
          <KPI label="Total identificados" value={champions.length} variant="ink" />
          <KPI
            label="Direcciones con al menos 1"
            value={byDir.size}
            unit={`/ ${new Set(responses.map((r) => r.direccion)).size}`}
          />
          <KPI label="Áreas sin campeones" value={new Set(responses.map((r) => r.direccion)).size - byDir.size} variant="accent" />
        </div>
      </FadeIn>

      <div className="space-y-6">
        {Array.from(byDir.entries())
          .sort((a, b) => b[1].length - a[1].length)
          .map(([dir, list]) => (
            <FadeIn key={dir}>
              <div className="bg-bg border border-line">
                <div className="px-6 py-4 border-b border-line flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4 font-medium">Dirección</div>
                    <div className="font-medium text-ink text-[15px] mt-0.5">{dir}</div>
                  </div>
                  <Tag variant="accent">
                    <Trophy className="w-3 h-3" /> {list.length}
                  </Tag>
                </div>
                <div className="divide-y divide-line">
                  {list.map((c) => (
                    <div key={c.id} className="px-6 py-4 flex items-start gap-4 hover:bg-bg-soft/50">
                      <div className="w-10 h-10 bg-ink text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                        {initials(c.nombre)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-ink text-[14px]">{c.nombre}</div>
                        <div className="text-[12px] text-ink-3 mt-0.5">{c.departamento || c.direccion}</div>
                        {c.email && (
                          <div className="flex items-center gap-1.5 mt-1.5 text-[11.5px] text-ink-4">
                            <Mail className="w-3 h-3" />
                            <span className="font-mono">{c.email}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-[12px] text-ink-3 shrink-0">
                        <div className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-accent" />
                          <span className="font-mono tabular-nums font-medium text-ink">{c.habilidad}</span>
                          <span className="text-ink-4">/5</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="w-3.5 h-3.5 text-accent" />
                          <span className="font-mono tabular-nums font-medium text-ink">{c.frecuencia}</span>
                          <span className="text-ink-4">/5</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
      </div>
    </div>
  );
}
