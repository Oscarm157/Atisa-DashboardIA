import { useMemo, useState } from "react";
import { useFilteredResponses, useFilters } from "../lib/filters";
import { Card } from "../components/ui/Card";
import { shortDirection } from "../config/branding";
import type { SurveyResponse } from "../lib/types";
import { initials } from "../lib/utils";
import { Search, X, Trophy } from "lucide-react";

type SortKey = "nombre" | "direccion" | "frecuencia" | "habilidad" | "aperturaScore";

export function Individual() {
  const responses = useFilteredResponses();
  const f = useFilters();
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "habilidad",
    dir: "desc",
  });
  const [selected, setSelected] = useState<SurveyResponse | null>(null);

  const sorted = useMemo(() => {
    const copy = [...responses];
    copy.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (typeof av === "string" && typeof bv === "string") {
        return sort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sort.dir === "asc" ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
    return copy;
  }, [responses, sort]);

  const setSortKey = (key: SortKey) => {
    setSort((s) => (s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "desc" }));
  };

  return (
    <div>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-atisa-black">Respuestas Individuales</h1>
          <p className="text-sm text-atisa-grayDark">
            {sorted.length} respondientes. Haz clic en cualquiera para ver sus 10 respuestas completas.
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-atisa-grayDark" />
          <input
            value={f.search}
            onChange={(e) => f.setSearch(e.target.value)}
            placeholder="Buscar por nombre, correo, respuesta..."
            className="text-xs pl-8 pr-3 py-1.5 border border-atisa-grayMid rounded-md focus:border-atisa-red focus:outline-none w-72"
          />
        </div>
      </div>

      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-atisa-gray">
              <tr className="text-left text-atisa-grayDark">
                <Th active={sort.key === "nombre"} dir={sort.dir} onClick={() => setSortKey("nombre")}>Nombre</Th>
                <Th active={sort.key === "direccion"} dir={sort.dir} onClick={() => setSortKey("direccion")}>Dirección</Th>
                <Th active={sort.key === "frecuencia"} dir={sort.dir} onClick={() => setSortKey("frecuencia")} align="right">Freq</Th>
                <Th active={sort.key === "habilidad"} dir={sort.dir} onClick={() => setSortKey("habilidad")} align="right">Hab</Th>
                <Th active={sort.key === "aperturaScore"} dir={sort.dir} onClick={() => setSortKey("aperturaScore")} align="right">Apertura</Th>
                <th className="py-2 px-3 text-right">Campeón</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className="border-b border-atisa-grayMid/30 hover:bg-atisa-gray/60 cursor-pointer"
                >
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-atisa-black/80 text-white flex items-center justify-center text-[10px] font-bold">
                        {initials(r.nombre)}
                      </div>
                      <div>
                        <div className="font-medium text-atisa-black">{r.nombre}</div>
                        <div className="text-[10px] text-atisa-grayDark">{r.departamento}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-3 text-atisa-grayDark">{shortDirection(r.direccion)}</td>
                  <td className="py-2 px-3 text-right font-semibold">{r.frecuencia}</td>
                  <td className="py-2 px-3 text-right font-semibold">{r.habilidad}</td>
                  <td className="py-2 px-3 text-right font-semibold">{r.aperturaScore.toFixed(1)}</td>
                  <td className="py-2 px-3 text-right">
                    {r.esCampeon && <Trophy className="inline w-3.5 h-3.5 text-atisa-red" />}
                  </td>
                </tr>
              ))}
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-atisa-grayDark py-6">Sin resultados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {selected && <DetailModal response={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function Th({
  children,
  active,
  dir,
  onClick,
  align = "left",
}: {
  children: React.ReactNode;
  active: boolean;
  dir: "asc" | "desc";
  onClick: () => void;
  align?: "left" | "right";
}) {
  return (
    <th
      onClick={onClick}
      className={`py-2 px-3 cursor-pointer select-none hover:text-atisa-red ${
        align === "right" ? "text-right" : "text-left"
      } ${active ? "text-atisa-red" : ""}`}
    >
      {children} {active ? (dir === "asc" ? "▲" : "▼") : ""}
    </th>
  );
}

function DetailModal({ response, onClose }: { response: SurveyResponse; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-atisa-grayMid/40 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-atisa-black text-white flex items-center justify-center font-bold">
              {initials(response.nombre)}
            </div>
            <div>
              <div className="font-bold text-atisa-black">{response.nombre}</div>
              <div className="text-xs text-atisa-grayDark">{shortDirection(response.direccion)} · {response.departamento}</div>
              <div className="text-[10px] text-atisa-grayDark">{response.email}</div>
            </div>
          </div>
          <button onClick={onClose} className="text-atisa-grayDark hover:text-atisa-red"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-3 text-sm">
          <Field label="Q1. Frecuencia">{response.frecuencia} / 5</Field>
          <Field label="Q2. Plataformas">{response.plataformas.join(", ") || "—"}</Field>
          <Field label="Q3. Habilidad">{response.habilidad} / 5</Field>
          <Field label="Q4. Funciones donde aporta valor">{response.funcionesValor.join(", ") || "—"}</Field>
          <Field label="Q5. Ejemplo concreto de uso" long>{response.ejemploExito || "—"}</Field>
          <Field label="Q6. Herramientas del área" long>{response.herramientasArea || "—"}</Field>
          <Field label="Q7. Barreras">{response.barreras.join(", ") || "—"}</Field>
          <Field label="Q8. Proceso prioritario" long>{response.procesoPrioritario || "—"}</Field>
          <Field label="Q9. Horas ahorrables">{response.horasAhorrables}</Field>
          <Field label="Q10. Indispensable aprender IA">{response.likert.indispensable} / 5</Field>
          <Field label="Q10. Tiempo en repetitivas">{response.likert.repetitivo} / 5</Field>
          <Field label="Q10. Dispuesto a modificar flujos">{response.likert.modificarFlujos} / 5</Field>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, long }: { label: string; children: React.ReactNode; long?: boolean }) {
  return (
    <div className={long ? "" : "flex gap-3 items-start"}>
      <div className="text-[10px] uppercase tracking-wider text-atisa-grayDark font-semibold w-56 shrink-0 pt-0.5">{label}</div>
      <div className={`text-sm text-atisa-black ${long ? "mt-1 whitespace-pre-wrap" : "flex-1"}`}>{children}</div>
    </div>
  );
}
