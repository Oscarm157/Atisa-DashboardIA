import { useMemo, useState } from "react";
import { useFilteredResponses } from "../lib/filters";
import { Card } from "../components/ui/Card";
import { shortDirection } from "../config/branding";
import { initials } from "../lib/utils";
import type { SurveyResponse } from "../lib/types";
import { ChevronDown, Trophy, Clock, AlertTriangle, Lightbulb, Wrench, Target } from "lucide-react";

type CaseField = "procesoPrioritario" | "ejemploExito" | "herramientasArea";

const FIELD_LABELS: Record<CaseField, { label: string; icon: typeof Target; minLen: number }> = {
  procesoPrioritario: { label: "Proceso prioritario a automatizar (Q8)", icon: Target, minLen: 20 },
  ejemploExito: { label: "Ejemplo concreto de uso exitoso (Q5)", icon: Lightbulb, minLen: 20 },
  herramientasArea: { label: "Herramientas conocidas del área (Q6)", icon: Wrench, minLen: 10 },
};

export function CasosPorDireccion() {
  const responses = useFilteredResponses();
  const [activeField, setActiveField] = useState<CaseField>("procesoPrioritario");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const grouped = useMemo(() => {
    const map = new Map<string, SurveyResponse[]>();
    responses.forEach((r) => {
      if (!map.has(r.direccion)) map.set(r.direccion, []);
      map.get(r.direccion)!.push(r);
    });
    return Array.from(map.entries())
      .map(([direccion, rows]) => {
        const minLen = FIELD_LABELS[activeField].minLen;
        const withCases = rows.filter((r) => (r[activeField] || "").trim().length >= minLen);
        return { direccion, total: rows.length, withCases, rows };
      })
      .sort((a, b) => b.total - a.total);
  }, [responses, activeField]);

  const toggle = (d: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(d)) next.delete(d);
      else next.add(d);
      return next;
    });
  };

  const expandAll = () => setExpanded(new Set(grouped.map((g) => g.direccion)));
  const collapseAll = () => setExpanded(new Set());

  const ActiveIcon = FIELD_LABELS[activeField].icon;

  return (
    <div>
      <div className="flex items-end justify-between mb-4 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-atisa-black">Casos por dirección</h1>
          <p className="text-sm text-atisa-grayDark">
            Material crudo del diagnóstico, agrupado por las 17 direcciones. Material para preparar contenido de cada workshop.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={expandAll} className="text-xs text-atisa-grayDark hover:text-atisa-red px-2 py-1">
            Expandir todo
          </button>
          <button onClick={collapseAll} className="text-xs text-atisa-grayDark hover:text-atisa-red px-2 py-1">
            Colapsar todo
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {(Object.keys(FIELD_LABELS) as CaseField[]).map((k) => {
          const Icon = FIELD_LABELS[k].icon;
          const active = activeField === k;
          return (
            <button
              key={k}
              onClick={() => {
                setActiveField(k);
                setExpanded(new Set());
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium border transition-colors ${
                active
                  ? "bg-atisa-black text-white border-atisa-black"
                  : "bg-white text-atisa-grayDark border-atisa-grayMid hover:border-atisa-black/40 hover:text-atisa-black"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {FIELD_LABELS[k].label}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {grouped.map(({ direccion, total, withCases }) => {
          const isOpen = expanded.has(direccion);
          return (
            <Card key={direccion} padded={false}>
              <button
                onClick={() => toggle(direccion)}
                className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-atisa-gray/40 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <ChevronDown
                    className={`w-4 h-4 text-atisa-grayDark shrink-0 transition-transform ${isOpen ? "" : "-rotate-90"}`}
                  />
                  <div className="min-w-0">
                    <div className="font-semibold text-atisa-black text-sm">{shortDirection(direccion)}</div>
                    <div className="text-[11px] text-atisa-grayDark">
                      {withCases.length} de {total} respondientes con {activeField === "procesoPrioritario" ? "proceso" : activeField === "ejemploExito" ? "ejemplo" : "herramientas"} declarado
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <ActiveIcon className="w-3.5 h-3.5 text-atisa-grayDark" />
                  <span className="text-xs font-mono text-atisa-grayDark tabular-nums">
                    {withCases.length}/{total}
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-atisa-grayMid/40 divide-y divide-atisa-grayMid/30">
                  {withCases.length === 0 && (
                    <div className="px-4 py-6 text-xs text-atisa-grayDark text-center">
                      Ningún respondiente de esta dirección dejó {FIELD_LABELS[activeField].label.toLowerCase()} con contenido suficiente.
                    </div>
                  )}
                  {withCases.map((r) => (
                    <CaseRow key={r.id} response={r} field={activeField} />
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function CaseRow({ response, field }: { response: SurveyResponse; field: CaseField }) {
  const text = response[field];
  return (
    <div className="px-4 py-3 hover:bg-atisa-gray/30">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-atisa-black/85 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
          {initials(response.nombre)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs font-semibold text-atisa-black">{response.nombre}</span>
            <span className="text-[10px] text-atisa-grayDark">·</span>
            <span className="text-[10px] text-atisa-grayDark">{response.departamento}</span>
            {response.esCampeon && (
              <span className="inline-flex items-center gap-1 text-[10px] text-atisa-red font-semibold">
                <Trophy className="w-3 h-3" /> Campeón
              </span>
            )}
            <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-atisa-grayDark">
              <Clock className="w-3 h-3" />
              {response.horasAhorrables}
            </span>
          </div>
          <p className="text-sm text-atisa-black whitespace-pre-wrap leading-relaxed">{text}</p>
          {response.barreras.length > 0 && (
            <div className="mt-2 flex items-start gap-1.5 flex-wrap">
              <AlertTriangle className="w-3 h-3 text-atisa-grayDark mt-0.5 shrink-0" />
              {response.barreras.map((b) => (
                <span
                  key={b}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-atisa-grayMid/40 text-atisa-grayDark"
                >
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
