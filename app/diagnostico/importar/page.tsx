"use client";

import { useState } from "react";
import { Upload, FileSpreadsheet, AlertTriangle, Info, RotateCcw } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

export default function ImportarPage() {
  const [step, setStep] = useState<"intro" | "warning">("intro");

  return (
    <div className="space-y-10">
      <FadeIn>
        <div>
          <div className="mono-eyebrow mb-3">Importar</div>
          <h1 className="font-serif-display text-[40px] md:text-[48px] text-ink leading-[1.05]">
            Datos del diagnóstico.
          </h1>
          <p className="text-[15px] text-ink-3 mt-3 max-w-[720px]">
            Regeneración via <span className="font-mono text-[13px] bg-bg-soft px-1.5 py-0.5">npm run ingest</span>.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="bg-bg border border-line border-l-4 border-l-amber p-7">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-ink">Carga desde browser pendiente de migración</h3>
              <pre className="mt-3 bg-ink text-white text-[12.5px] font-mono p-3 leading-relaxed">
                <code>{"# data/encuesta.xlsx\n# data/roster.csv\nnpm run ingest"}</code>
              </pre>
              <p className="text-[12.5px] text-ink-4 mt-3">
                Reescribe <span className="font-mono">data/responses.json</span> y <span className="font-mono">data/meta.json</span>. Commit + push.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="bg-bg border border-line p-7">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-navy shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-ink">Columnas esperadas</h3>
              <p className="text-[13.5px] text-ink-3 mt-2 leading-[1.55]">
                Formato MS Forms, &quot;Hora de última modificación&quot; en posición 5.
              </p>
              <ol className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-x-8 text-[12.5px] text-ink-2 font-mono">
                {[
                  "ID", "Hora inicio", "Hora finalización", "Correo", "Nombre",
                  "Hora última modificación", "Q1 Frecuencia", "Q2 Plataformas",
                  "Q3 Habilidad", "Q4 Funciones valor", "Q5 Ejemplo concreto",
                  "Q6 Herramientas área", "Q7 Barreras", "Q8 Proceso prioritario",
                  "Q9 Horas ahorrables", "Q10.1 Indispensable", "Q10.2 Repetitivo", "Q10.3 Modificar flujos",
                ].map((c, i) => (
                  <li key={i} className="py-1 border-b border-line-soft last:border-b-0 flex gap-3">
                    <span className="text-ink-4 tabular-nums w-6">{i.toString().padStart(2, "0")}</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
