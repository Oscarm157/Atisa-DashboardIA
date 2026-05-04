"use client";

import { useMemo, useState } from "react";
import { getResponses } from "@/lib/data";
import { Tag } from "@/components/ui/Tag";
import { initials, shortLabel } from "@/lib/utils";
import { ChevronDown, Trophy, Clock, Target, Lightbulb, Wrench } from "lucide-react";
import { cn } from "@/lib/cn";

type CaseField = "procesoPrioritario" | "ejemploExito" | "herramientasArea";

const FIELD_LABELS: Record<CaseField, { label: string; icon: typeof Target; minLen: number; short: string }> = {
  procesoPrioritario: { label: "Proceso prioritario a automatizar (Q8)", short: "proceso", icon: Target, minLen: 20 },
  ejemploExito: { label: "Ejemplo concreto de uso exitoso (Q5)", short: "ejemplo", icon: Lightbulb, minLen: 20 },
  herramientasArea: { label: "Herramientas conocidas del área (Q6)", short: "herramientas", icon: Wrench, minLen: 10 },
};

export default function CasosPage() {
  const responses = useMemo(() => getResponses(), []);
  const [field, setField] = useState<CaseField>("procesoPrioritario");
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
        return { direccion, total: rows.length, withCases };
      })
      .sort((a, b) => b.total - a.total);
  }, [responses, field]);

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
          {grouped.length} direcciones · {responses.length} respondientes · texto crudo de Q5, Q6 y Q8.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
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
        <div className="ml-auto flex gap-1">
          <button
            onClick={() => setOpen(new Set(grouped.map((g) => g.direccion)))}
            className="text-[12px] text-ink-3 hover:text-accent px-2"
          >
            Expandir todo
          </button>
          <button
            onClick={() => setOpen(new Set())}
            className="text-[12px] text-ink-3 hover:text-accent px-2"
          >
            Colapsar
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {grouped.map(({ direccion, total, withCases }) => {
          const isOpen = open.has(direccion);
          return (
            <div key={direccion} className="bg-bg border border-line">
              <button
                onClick={() => toggle(direccion)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-bg-soft transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-ink-4 shrink-0 transition-transform",
                      !isOpen && "-rotate-90"
                    )}
                  />
                  <div className="min-w-0">
                    <div className="font-medium text-ink text-[14.5px]">{direccion}</div>
                    <div className="font-mono text-[11px] text-ink-4 tracking-wide mt-0.5">
                      {withCases.length} de {total} con {FIELD_LABELS[field].short} declarado
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <ActiveIcon className="w-4 h-4 text-ink-4" />
                  <span className="font-mono text-[12px] text-ink-3 tabular-nums">
                    {withCases.length}/{total}
                  </span>
                </div>
              </button>
              {isOpen && (
                <div className="border-t border-line divide-y divide-line">
                  {withCases.length === 0 && (
                    <div className="px-5 py-8 text-[13px] text-ink-4 text-center">
                      Ningún respondiente de esta dirección dejó {FIELD_LABELS[field].short} con contenido suficiente.
                    </div>
                  )}
                  {withCases.map((r) => (
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
                                <Trophy className="w-3 h-3" /> Campeón
                              </span>
                            )}
                            <span className="ml-auto inline-flex items-center gap-1 text-[10.5px] font-mono text-ink-4 uppercase tracking-widest">
                              <Clock className="w-3 h-3" />
                              {r.horasAhorrables}
                            </span>
                          </div>
                          <p className="text-[14px] text-ink leading-[1.6] whitespace-pre-wrap">
                            {r[field]}
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
