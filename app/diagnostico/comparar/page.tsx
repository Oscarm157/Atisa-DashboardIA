import { getResponses } from "@/lib/data";
import { byDirection, average } from "@/lib/metrics";
import { FadeIn } from "@/components/motion/FadeIn";

export default function CompararPage() {
  const responses = getResponses();
  const profile = byDirection(responses, (g) => ({
    n: g.length,
    frecuencia: average(g.map((r) => r.frecuencia)),
    habilidad: average(g.map((r) => r.habilidad)),
    apertura: average(g.map((r) => r.aperturaScore)),
    horas: g.reduce((s, r) => s + r.horasAhorradasNum, 0),
    campeones: g.filter((r) => r.esCampeon).length,
  }));

  const rows = Object.entries(profile).sort((a, b) => b[1].n - a[1].n);

  return (
    <div className="space-y-10">
      <FadeIn>
        <div>
          <div className="mono-eyebrow mb-3">Comparar</div>
          <h1 className="font-serif-display text-[40px] md:text-[48px] text-ink leading-[1.05]">
            Direcciones.
          </h1>
          <p className="text-[15px] text-ink-3 mt-3 max-w-[720px]">
            Promedios de habilidad, frecuencia y apertura.
          </p>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="bg-bg border border-line overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead className="bg-bg-soft border-b border-line">
                <tr>
                  <Th>Dirección</Th>
                  <Th align="right">N</Th>
                  <Th align="right">Frec.</Th>
                  <Th align="right">Hab.</Th>
                  <Th align="right">Apertura</Th>
                  <Th align="right">Horas/sem</Th>
                  <Th align="right">Líderes</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([dir, p]) => (
                  <tr key={dir} className="border-b border-line last:border-b-0 hover:bg-bg-soft/40">
                    <td className="px-5 py-3 font-medium text-ink">{dir}</td>
                    <td className="px-5 py-3 text-right font-mono tabular-nums text-ink-2">{p.n}</td>
                    <td className="px-5 py-3 text-right font-mono tabular-nums text-ink-2">{p.frecuencia.toFixed(1)}</td>
                    <td className="px-5 py-3 text-right font-mono tabular-nums text-ink-2">{p.habilidad.toFixed(1)}</td>
                    <td className="px-5 py-3 text-right font-mono tabular-nums text-ink-2">{p.apertura.toFixed(1)}</td>
                    <td className="px-5 py-3 text-right font-mono tabular-nums text-ink-2">{Math.round(p.horas)}</td>
                    <td className="px-5 py-3 text-right">
                      <span className={p.campeones > 0 ? "font-mono tabular-nums font-medium text-accent" : "font-mono tabular-nums text-ink-4"}>
                        {p.campeones}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

function Th({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <th
      className={`px-5 py-3 font-mono text-[10.5px] uppercase tracking-widest text-ink-4 font-medium ${align === "right" ? "text-right" : "text-left"}`}
    >
      {children}
    </th>
  );
}
