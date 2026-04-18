import { useFilters, getAllResponses, listDirecciones, listPlataformas } from "../../lib/filters";
import { shortDirection } from "../../config/branding";
import { useMemo, useState } from "react";
import { cn } from "../../lib/utils";
import { RotateCcw, ChevronDown, ChevronUp, Filter } from "lucide-react";

export function FilterBar() {
  const f = useFilters();
  const all = useMemo(() => getAllResponses(), [f.imported]);
  const direcciones = useMemo(() => listDirecciones(all), [all]);
  const plataformas = useMemo(() => listPlataformas(all), [all]);
  const [open, setOpen] = useState(false);

  const activeCount =
    (f.direcciones.length > 0 ? 1 : 0) +
    (f.habilidadMin > 1 || f.habilidadMax < 5 ? 1 : 0) +
    (f.frecuenciaMin > 1 || f.frecuenciaMax < 5 ? 1 : 0) +
    (f.aperturaMin > 1 ? 1 : 0) +
    (f.plataformas.length > 0 ? 1 : 0) +
    (f.barreras.length > 0 ? 1 : 0);

  return (
    <div className="bg-white border-b border-atisa-grayMid/40 sticky top-[56px] z-20">
      <div className="max-w-[1800px] mx-auto px-6 py-2">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-1.5 text-xs font-semibold text-atisa-black hover:text-atisa-red transition-colors"
          >
            <Filter className="w-3.5 h-3.5" />
            Filtros
            {activeCount > 0 && (
              <span className="bg-atisa-red text-white rounded-full px-1.5 py-0.5 text-[10px] font-bold">
                {activeCount}
              </span>
            )}
            {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          <div className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {f.direcciones.map((d) => (
              <Chip key={d} onClick={() => f.setDirecciones(f.direcciones.filter((x) => x !== d))}>
                {shortDirection(d)} ×
              </Chip>
            ))}
            {f.plataformas.map((p) => (
              <Chip key={p} onClick={() => f.setPlataformas(f.plataformas.filter((x) => x !== p))}>
                {p} ×
              </Chip>
            ))}
            {f.barreras.map((b) => (
              <Chip key={b} onClick={() => f.setBarreras(f.barreras.filter((x) => x !== b))}>
                {b} ×
              </Chip>
            ))}
            {(f.habilidadMin > 1 || f.habilidadMax < 5) && (
              <Chip onClick={() => { f.setHabilidadMin(1); f.setHabilidadMax(5); }}>
                Habilidad {f.habilidadMin}-{f.habilidadMax} ×
              </Chip>
            )}
            {(f.frecuenciaMin > 1 || f.frecuenciaMax < 5) && (
              <Chip onClick={() => { f.setFrecuenciaMin(1); f.setFrecuenciaMax(5); }}>
                Frecuencia {f.frecuenciaMin}-{f.frecuenciaMax} ×
              </Chip>
            )}
            {f.aperturaMin > 1 && (
              <Chip onClick={() => f.setAperturaMin(1)}>Apertura ≥ {f.aperturaMin} ×</Chip>
            )}
          </div>
          {activeCount > 0 && (
            <button
              onClick={() => f.reset()}
              className="flex items-center gap-1 text-xs text-atisa-grayDark hover:text-atisa-red transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> limpiar
            </button>
          )}
        </div>

        {open && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-3 border-t border-atisa-grayMid/30 mt-2">
            <div>
              <Label>Direcciones</Label>
              <div className="flex flex-wrap gap-1">
                {direcciones.map((d) => (
                  <button
                    key={d}
                    onClick={() =>
                      f.setDirecciones(
                        f.direcciones.includes(d)
                          ? f.direcciones.filter((x) => x !== d)
                          : [...f.direcciones, d]
                      )
                    }
                    className={cn(
                      "text-[10px] px-2 py-1 rounded-md border transition-colors",
                      f.direcciones.includes(d)
                        ? "bg-atisa-red text-white border-atisa-red"
                        : "bg-white text-atisa-black border-atisa-grayMid hover:border-atisa-red"
                    )}
                  >
                    {shortDirection(d)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label>Plataformas usadas</Label>
              <div className="flex flex-wrap gap-1">
                {plataformas.map((p) => (
                  <button
                    key={p}
                    onClick={() =>
                      f.setPlataformas(
                        f.plataformas.includes(p)
                          ? f.plataformas.filter((x) => x !== p)
                          : [...f.plataformas, p]
                      )
                    }
                    className={cn(
                      "text-[10px] px-2 py-1 rounded-md border transition-colors",
                      f.plataformas.includes(p)
                        ? "bg-atisa-red text-white border-atisa-red"
                        : "bg-white text-atisa-black border-atisa-grayMid hover:border-atisa-red"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <RangeSlider
              label={`Habilidad: ${f.habilidadMin} - ${f.habilidadMax}`}
              min={f.habilidadMin}
              max={f.habilidadMax}
              onMin={f.setHabilidadMin}
              onMax={f.setHabilidadMax}
            />
            <RangeSlider
              label={`Frecuencia: ${f.frecuenciaMin} - ${f.frecuenciaMax}`}
              min={f.frecuenciaMin}
              max={f.frecuenciaMax}
              onMin={f.setFrecuenciaMin}
              onMax={f.setFrecuenciaMax}
            />
            <div>
              <Label>Apertura mínima: {f.aperturaMin}</Label>
              <input
                type="range"
                min={1}
                max={5}
                step={0.5}
                value={f.aperturaMin}
                onChange={(e) => f.setAperturaMin(Number(e.target.value))}
                className="w-full accent-atisa-red"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-[10px] px-2 py-0.5 rounded-full bg-atisa-red/10 text-atisa-red border border-atisa-red/30 hover:bg-atisa-red/20 transition-colors whitespace-nowrap"
    >
      {children}
    </button>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[10px] uppercase tracking-wider text-atisa-grayDark font-semibold mb-1">{children}</div>;
}

function RangeSlider({
  label,
  min,
  max,
  onMin,
  onMax,
}: {
  label: string;
  min: number;
  max: number;
  onMin: (n: number) => void;
  onMax: (n: number) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex gap-2 items-center">
        <input
          type="range"
          min={1}
          max={5}
          value={min}
          onChange={(e) => onMin(Math.min(Number(e.target.value), max))}
          className="w-full accent-atisa-red"
        />
        <input
          type="range"
          min={1}
          max={5}
          value={max}
          onChange={(e) => onMax(Math.max(Number(e.target.value), min))}
          className="w-full accent-atisa-red"
        />
      </div>
    </div>
  );
}
