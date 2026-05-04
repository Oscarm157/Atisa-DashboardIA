"use client";

import { useMemo, useState } from "react";
import { getResponses, getCasosCurados } from "@/lib/data";
import { Tag } from "@/components/ui/Tag";
import { initials, shortLabel } from "@/lib/utils";
import { ChevronDown, Trophy, Clock, Target, Lightbulb, Wrench, Quote as QuoteIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import type { DireccionCurada, CampoCurado } from "@/lib/types";

type CaseField = "procesoPrioritario" | "ejemploExito" | "herramientasArea";
type ViewMode = "ejecutiva" | "individual";

const FIELD_LABELS: Record<CaseField, { label: string; short: string; icon: typeof Target; minLen: number; curadoKey: keyof Pick<DireccionCurada, "q8" | "q5" | "q6"> }> = {
  procesoPrioritario: { label: "Proceso prioritario (Q8)", short: "proceso", icon: Target, minLen: 20, curadoKey: "q8" },
  ejemploExito: { label: "Ejemplo de uso exitoso (Q5)", short: "ejemplo", icon: Lightbulb, minLen: 20, curadoKey: "q5" },
  herramientasArea: { label: "Herramientas del área (Q6)", short: "herramientas", icon: Wrench, minLen: 10, curadoKey: "q6" },
};

const SIN_DECLARAR_KEY: Record<CaseField, keyof Pick<DireccionCurada, "sinDeclararQ8" | "sinDeclararQ5" | "sinDeclararQ6">> = {
  procesoPrioritario: "sinDeclararQ8",
  ejemploExito: "sinDeclararQ5",
  herramientasArea: "sinDeclararQ6",
};

export default function CasosPage() {
  const responses = useMemo(() => getResponses(), []);
  const curados = useMemo(() => getCasosCurados(), []);
  const [field, setField] = useState<CaseField>("procesoPrioritario");
  const [view, setView] = useState<ViewMode>("ejecutiva");
  const [open, setOpen] = useState<Set<string>>(new Set());

  const grouped = useMemo(() => {
    const map = new Map<string, typeof responses>();
    responses.forEach((r) => {
      if (!map.has(r.direccion)) map.set(r.direccion, []);
      map.get(r.direccion)!.push(r);
    });
    return Array.from(map.entries())
      .map(([direccion, rows]) => {
        const minLen = FIELD_LABELS[field].minLen;
        const withCases = rows.filter((r) => (r[field] || "").trim().length >= minLen);
        return { direccion, total: rows.length, rows, withCases, curado: curados[direccion] };
      })
      .sort((a, b) => b.total - a.total);
  }, [responses, field, curados]);

  const toggle = (d: string) =>
    setOpen((prev) => {
      const n = new Set(prev);
      if (n.has(d)) n.delete(d);
      else n.add(d);
      return n;
    });

  const ActiveIcon = FIELD_LABELS[field].icon;

  return (
    <div className="space-y-8">
      <div>
        <div className="mono-eyebrow mb-3">Casos</div>
        <h1 className="font-serif-display text-[40px] md:text-[48px] text-ink leading-[1.05]">
          Por dirección.
        </h1>
        <p className="text-[15px] text-ink-3 mt-3 max-w-[720px]">
          {grouped.length} direcciones · {responses.length} colaboradores · síntesis ejecutiva con autoría preservada.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {(Object.keys(FIELD_LABELS) as CaseField[]).map((k) => {
          const Icon = FIELD_LABELS[k].icon;
          const active = field === k;
          return (
            <button
              key={k}
              onClick={() => {
                setField(k);
                setOpen(new Set());
              }}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 text-[12.5px] font-medium border transition-colors",
                active
                  ? "bg-ink text-white border-ink"
                  : "bg-bg text-ink-3 border-line hover:border-ink/40 hover:text-ink"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {FIELD_LABELS[k].label}
            </button>
          );
        })}
        <div className="ml-auto flex items-center border border-ink">
          {(["ejecutiva", "individual"] as ViewMode[]).map((v, i) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "px-4 py-2 text-[12px] font-medium transition-colors",
                view === v ? "bg-ink text-white" : "bg-bg text-ink-3 hover:text-ink",
                i === 0 && "border-r border-ink"
              )}
            >
              {v === "ejecutiva" ? "Vista ejecutiva" : "Detalle individual"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {grouped.map(({ direccion, total, rows, withCases, curado }) => {
          const isOpen = open.has(direccion);
          const hasCuracion = !!curado;
          const useEjecutiva = view === "ejecutiva" && hasCuracion;
          const campo: CampoCurado | undefined = useEjecutiva ? curado![FIELD_LABELS[field].curadoKey] : undefined;
          const sinDeclarar = useEjecutiva ? curado![SIN_DECLARAR_KEY[field]] : [];
          const headerCount = useEjecutiva
            ? campo!.temas.reduce((s, t) => s + t.menciones, 0)
            : withCases.length;
          const headerLabel = useEjecutiva
            ? `${campo!.temas.length} temas · ${headerCount} menciones`
            : `${withCases.length} de ${total} con ${FIELD_LABELS[field].short} declarado`;

          return (
            <div key={direccion} className={cn("border", isOpen ? "border-ink" : "border-line bg-bg")}>
              <button
                onClick={() => toggle(direccion)}
                className={cn(
                  "w-full flex items-center justify-between gap-4 p-5 text-left transition-colors",
                  isOpen ? "bg-ink text-white" : "bg-bg hover:bg-bg-soft"
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 shrink-0 transition-transform",
                      isOpen ? "text-accent" : "-rotate-90 text-ink-4",
                    )}
                  />
                  <div className="min-w-0">
                    <div className={cn("font-medium text-[14.5px]", isOpen ? "text-white" : "text-ink")}>
                      {direccion}
                    </div>
                    <div className={cn("font-mono text-[11px] tracking-wide mt-0.5", isOpen ? "text-white/55" : "text-ink-4")}>
                      {headerLabel}
                      {view === "ejecutiva" && !hasCuracion && " · sin curación, n insuficiente"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <ActiveIcon className={cn("w-4 h-4", isOpen ? "text-accent" : "text-ink-4")} />
                  <span className={cn("font-mono text-[12px] tabular-nums", isOpen ? "text-white/70" : "text-ink-3")}>
                    n={total}
                  </span>
                </div>
              </button>

              {isOpen && useEjecutiva && (
                <div>
                  <div className="p-5 md:p-7 bg-bg-soft border-b border-line">
                    <div className="font-mono text-[10.5px] tracking-widest uppercase text-accent font-medium mb-3">
                      Resumen
                    </div>
                    <p className="font-serif-display text-[18px] md:text-[20px] text-ink leading-[1.45] max-w-[860px] font-light">
                      {campo!.resumen}
                    </p>
                  </div>

                  <div className="divide-y divide-line bg-bg">
                    {campo!.temas.map((tema, idx) => (
                      <div key={idx} className="p-5 md:p-7">
                        <div className="grid md:grid-cols-[64px_minmax(0,1fr)] gap-4 md:gap-6">
                          <div className="font-serif-display text-[28px] md:text-[32px] text-accent tabular-nums leading-none pt-1 font-light">
                            {String(idx + 1).padStart(2, "0")}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-baseline gap-3 flex-wrap mb-2.5">
                              <h3 className="font-medium text-ink text-[16px] leading-tight break-words">
                                {tema.titulo}
                              </h3>
                              <span className="font-mono text-[10.5px] text-ink-4 tracking-widest uppercase">
                                {tema.menciones} {tema.menciones === 1 ? "mención" : "menciones"}
                              </span>
                            </div>
                            <p className="text-[14px] text-ink-2 leading-[1.65] mb-4 break-words max-w-[720px]">
                              {tema.descripcion}
                            </p>
                            <div className="flex flex-wrap gap-1 mb-4">
                              {tema.autores.map((a) => (
                                <span
                                  key={a}
                                  className="text-[10.5px] text-ink-3 bg-bg-soft border border-line px-1.5 py-0.5 leading-tight"
                                >
                                  {a}
                                </span>
                              ))}
                            </div>
                            <div className="border-l-2 border-accent pl-4 py-1 min-w-0 bg-bg-soft/40">
                              <QuoteIcon className="w-3.5 h-3.5 text-accent mb-1.5" />
                              <p className="text-[13.5px] text-ink-2 italic leading-[1.6] whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
                                {tema.quote.texto}
                              </p>
                              <p className="font-mono text-[10.5px] text-ink-4 mt-2 uppercase tracking-widest break-words">
                                · {tema.quote.autor}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {sinDeclarar.length > 0 && (
                    <div className="p-5 md:p-7 bg-bg-soft border-t border-line">
                      <div className="font-mono text-[10.5px] tracking-widest uppercase text-ink-4 mb-2.5">
                        Sin declarar · {sinDeclarar.length} de {total}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {sinDeclarar.map((a) => (
                          <span
                            key={a}
                            className="text-[10.5px] text-ink-4 border border-line bg-bg px-1.5 py-0.5 leading-tight"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {isOpen && !useEjecutiva && (
                <div className="border-t border-line divide-y divide-line bg-bg">
                  {view === "ejecutiva" && !hasCuracion && (
                    <div className="px-5 py-4 bg-bg-soft text-[12.5px] text-ink-3">
                      Esta dirección tiene {total} {total === 1 ? "colaborador" : "colaboradores"}: muestra detalle individual.
                    </div>
                  )}
                  {(view === "ejecutiva" && !hasCuracion ? rows : withCases).length === 0 && (
                    <div className="px-5 py-8 text-[13px] text-ink-4 text-center">
                      Ningún colaborador de esta dirección dejó {FIELD_LABELS[field].short} con contenido suficiente.
                    </div>
                  )}
                  {(view === "ejecutiva" && !hasCuracion ? rows : withCases).map((r) => (
                    <div key={r.id} className="p-5 hover:bg-bg-soft/50">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-ink text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                          {initials(r.nombre)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1.5">
                            <span className="text-[13px] font-medium text-ink">{r.nombre}</span>
                            <span className="text-[11px] text-ink-4">·</span>
                            <span className="text-[11px] text-ink-4">{r.departamento}</span>
                            {r.esCampeon && (
                              <span className="inline-flex items-center gap-1 text-[10.5px] text-accent font-mono uppercase tracking-widest font-medium">
                                <Trophy className="w-3 h-3" /> Líder
                              </span>
                            )}
                            <span className="ml-auto inline-flex items-center gap-1 text-[10.5px] font-mono text-ink-4 uppercase tracking-widest">
                              <Clock className="w-3 h-3" />
                              {r.horasAhorrables}
                            </span>
                          </div>
                          <p className="text-[14px] text-ink leading-[1.6] whitespace-pre-wrap">
                            {(r[field] || "").trim() || <span className="text-ink-4 italic">sin respuesta</span>}
                          </p>
                          {r.barreras.length > 0 && (
                            <div className="mt-3 flex items-start gap-1.5 flex-wrap">
                              {r.barreras.map((b) => (
                                <Tag key={b} variant="neutral" className="!text-[10px] !py-0.5">
                                  {shortLabel(b, 30)}
                                </Tag>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
