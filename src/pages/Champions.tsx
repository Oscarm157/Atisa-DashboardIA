import { useMemo, useState } from "react";
import { useFilteredResponses } from "../lib/filters";
import { Card, CardTitle } from "../components/ui/Card";
import { shortDirection } from "../config/branding";
import { Sparkles, Activity, X } from "lucide-react";
import type { SurveyResponse } from "../lib/types";
import { initials } from "../lib/utils";

export function Champions() {
  const responses = useFilteredResponses();
  const champions = useMemo(
    () =>
      responses
        .filter((r) => r.esCampeon)
        .sort((a, b) => {
          if (b.habilidad !== a.habilidad) return b.habilidad - a.habilidad;
          return b.frecuencia - a.frecuencia;
        }),
    [responses]
  );

  const [selected, setSelected] = useState<SurveyResponse | null>(null);

  const byDir = useMemo(() => {
    const map = new Map<string, SurveyResponse[]>();
    champions.forEach((c) => {
      if (!map.has(c.direccion)) map.set(c.direccion, []);
      map.get(c.direccion)!.push(c);
    });
    return Array.from(map.entries()).sort((a, b) => b[1].length - a[1].length);
  }, [champions]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-atisa-black mb-1">Campeones de IA</h1>
      <p className="text-sm text-atisa-grayDark mb-5">
        Colaboradores con habilidad ≥ 4 y uso frecuente ≥ 4. {champions.length} identificados. Son candidatos naturales para liderar la adopción en sus áreas.
      </p>

      {byDir.length === 0 && (
        <Card>
          <div className="text-center text-sm text-atisa-grayDark py-8">
            No hay campeones con los filtros actuales.
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {byDir.map(([direccion, group]) => (
          <Card key={direccion}>
            <CardTitle subtitle={`${group.length} campeón(es)`}>
              {shortDirection(direccion)}
            </CardTitle>
            <div className="space-y-2">
              {group.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className="w-full text-left flex items-center gap-3 p-2 rounded-md hover:bg-atisa-gray transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-atisa-red text-white flex items-center justify-center text-xs font-bold">
                    {initials(c.nombre)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-atisa-black truncate">
                      {c.nombre}
                    </div>
                    <div className="text-[10px] text-atisa-grayDark truncate">
                      {c.departamento} · {c.plataformas.slice(0, 3).join(", ")}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center text-xs">
                    <span className="flex items-center gap-1 text-atisa-red font-semibold">
                      <Sparkles className="w-3 h-3" /> {c.habilidad}
                    </span>
                    <span className="flex items-center gap-1 text-atisa-black font-semibold">
                      <Activity className="w-3 h-3" /> {c.frecuencia}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {selected && <ChampionModal response={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function ChampionModal({ response, onClose }: { response: SurveyResponse; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-atisa-grayMid/40 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-atisa-red text-white flex items-center justify-center font-bold">
              {initials(response.nombre)}
            </div>
            <div>
              <div className="font-bold text-atisa-black">{response.nombre}</div>
              <div className="text-xs text-atisa-grayDark">
                {shortDirection(response.direccion)} · {response.departamento}
              </div>
              <div className="text-[10px] text-atisa-grayDark">{response.email}</div>
            </div>
          </div>
          <button onClick={onClose} className="text-atisa-grayDark hover:text-atisa-red">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 space-y-4 text-sm">
          <Row label="Frecuencia de uso">{response.frecuencia} / 5</Row>
          <Row label="Habilidad actual">{response.habilidad} / 5</Row>
          <Row label="Apertura promedio">{response.aperturaScore.toFixed(1)} / 5</Row>
          <Row label="Plataformas que usa">{response.plataformas.join(", ") || "—"}</Row>
          <Row label="Funciones donde aporta valor">{response.funcionesValor.join(", ") || "—"}</Row>
          <Row label="Barreras percibidas">{response.barreras.join(", ") || "—"}</Row>
          <Row label="Horas ahorrables / semana">{response.horasAhorrables}</Row>
          <div className="border-t border-atisa-grayMid/40 pt-3">
            <div className="text-[10px] uppercase tracking-wider text-atisa-grayDark font-semibold mb-1">
              Ejemplo concreto de uso
            </div>
            <div className="text-sm text-atisa-black whitespace-pre-wrap">{response.ejemploExito || "—"}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-atisa-grayDark font-semibold mb-1">
              Herramientas que conoce del área
            </div>
            <div className="text-sm text-atisa-black whitespace-pre-wrap">{response.herramientasArea || "—"}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-atisa-grayDark font-semibold mb-1">
              Proceso que considera prioritario
            </div>
            <div className="text-sm text-atisa-black whitespace-pre-wrap">{response.procesoPrioritario || "—"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-[10px] uppercase tracking-wider text-atisa-grayDark font-semibold w-40 shrink-0 pt-1">{label}</div>
      <div className="text-sm text-atisa-black flex-1">{children}</div>
    </div>
  );
}
