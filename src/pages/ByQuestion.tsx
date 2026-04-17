import { useMemo, useState } from "react";
import { useFilteredResponses } from "../lib/filters";
import { QUESTIONS, HOURS_BUCKETS } from "../data/questions";
import { Card, CardTitle } from "../components/ui/Card";
import { DistributionBar } from "../components/charts/DistributionBar";
import { HorizontalBar } from "../components/charts/HorizontalBar";
import { LikertStacked } from "../components/charts/LikertStacked";
import {
  distributionScale,
  countMulti,
  hoursDistribution,
  likertStacked,
  categoryCounts,
} from "../lib/metrics";
import {
  Q5_CATEGORIES,
  Q6_CATEGORIES,
  Q8_CATEGORIES,
  categoryLabel,
} from "../data/categorization";
import { shortDirection } from "../config/branding";
import { Search } from "lucide-react";

export function ByQuestion() {
  const responses = useFilteredResponses();

  return (
    <div>
      <h1 className="text-2xl font-bold text-atisa-black mb-1">Por Pregunta</h1>
      <p className="text-sm text-atisa-grayDark mb-5">
        Vista detallada de cada una de las 10 preguntas de la encuesta sobre los {responses.length} colaboradores filtrados.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {QUESTIONS.map((q) => (
          <Card key={q.id}>
            <CardTitle subtitle={q.subtitle}>
              <span className="text-atisa-red mr-2">Q{q.number}.</span>
              {q.title}
            </CardTitle>
            {q.type === "scale5" && (
              <DistributionBar data={distributionScale(responses, q.id as "frecuencia" | "habilidad")} />
            )}
            {q.type === "multiSelect" && (
              <HorizontalBar
                data={countMulti(
                  responses,
                  q.id as "plataformas" | "funcionesValor" | "barreras"
                )}
              />
            )}
            {q.type === "singleSelectHours" && (
              <DistributionBar
                data={hoursDistribution(responses).map((d) => ({
                  value: HOURS_BUCKETS[d.label] ?? 0,
                  label: d.label.replace("Entre ", "").replace(" horas", "h"),
                  count: d.count,
                }))}
              />
            )}
            {q.type === "likertMatrix" && (
              <LikertStacked data={likertStacked(responses)} />
            )}
            {q.type === "openText" && (
              <OpenTextExplorer
                responses={responses}
                field={q.id as "ejemploExito" | "herramientasArea" | "procesoPrioritario"}
                category={q.id === "ejemploExito" ? "q5" : q.id === "herramientasArea" ? "q6" : "q8"}
                rules={
                  q.id === "ejemploExito"
                    ? Q5_CATEGORIES
                    : q.id === "herramientasArea"
                    ? Q6_CATEGORIES
                    : Q8_CATEGORIES
                }
              />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function OpenTextExplorer({
  responses,
  field,
  category,
  rules,
}: {
  responses: ReturnType<typeof useFilteredResponses>;
  field: "ejemploExito" | "herramientasArea" | "procesoPrioritario";
  category: "q5" | "q6" | "q8";
  rules: { id: string; label: string; keywords: string[] }[];
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const cats = useMemo(
    () =>
      categoryCounts(responses, category).map((c) => ({
        label: categoryLabel(c.id, rules),
        count: c.count,
        id: c.id,
      })),
    [responses, category, rules]
  );

  const filtered = useMemo(() => {
    let list = responses.filter((r) => (r[field] || "").trim().length > 0);
    if (selected) list = list.filter((r) => r.cat[category].includes(selected));
    if (search) {
      const s = search.toLowerCase();
      list = list.filter((r) => r[field].toLowerCase().includes(s));
    }
    return list;
  }, [responses, field, category, selected, search]);

  return (
    <div>
      <HorizontalBar
        data={cats.map((c) => ({ label: c.label, count: c.count }))}
        height={Math.max(160, cats.length * 24 + 20)}
      />
      <div className="flex flex-wrap gap-1 mt-2">
        {cats.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelected(selected === c.id ? null : c.id)}
            className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
              selected === c.id
                ? "bg-atisa-red text-white border-atisa-red"
                : "bg-white text-atisa-black border-atisa-grayMid hover:border-atisa-red"
            }`}
          >
            {c.label} ({c.count})
          </button>
        ))}
      </div>
      <div className="mt-3 relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-atisa-grayDark" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar en respuestas..."
          className="w-full text-xs pl-7 pr-2 py-1.5 border border-atisa-grayMid rounded-md focus:border-atisa-red focus:outline-none"
        />
      </div>
      <div className="mt-2 max-h-52 overflow-y-auto border border-atisa-grayMid/50 rounded-md divide-y divide-atisa-grayMid/40">
        {filtered.slice(0, 50).map((r) => (
          <div key={r.id} className="p-2 text-xs">
            <div className="flex items-center justify-between text-[10px] text-atisa-grayDark mb-0.5">
              <span className="font-semibold">{r.nombre}</span>
              <span>{shortDirection(r.direccion)}</span>
            </div>
            <div className="text-atisa-black">{r[field]}</div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="p-3 text-xs text-atisa-grayDark text-center">Sin resultados</div>
        )}
      </div>
      <div className="text-[10px] text-atisa-grayDark mt-1 text-right">
        {filtered.length} respuesta{filtered.length === 1 ? "" : "s"}
      </div>
    </div>
  );
}

