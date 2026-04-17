import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SurveyResponse } from "./types";
import bakedResponses from "../data/responses.json";
import bakedMeta from "../data/meta.json";

export type FilterState = {
  direcciones: string[]; // empty = all
  habilidadMin: number;
  habilidadMax: number;
  frecuenciaMin: number;
  frecuenciaMax: number;
  aperturaMin: number;
  plataformas: string[]; // empty = all
  search: string;

  // data overlay (after import)
  imported: SurveyResponse[] | null;
  importedMeta: {
    importedAt: string;
    added: number;
    skippedDuplicates: number;
    skippedNotInRoster: number;
    skippedTest: number;
  } | null;

  setDirecciones: (d: string[]) => void;
  setHabilidadMin: (n: number) => void;
  setHabilidadMax: (n: number) => void;
  setFrecuenciaMin: (n: number) => void;
  setFrecuenciaMax: (n: number) => void;
  setAperturaMin: (n: number) => void;
  setPlataformas: (p: string[]) => void;
  setSearch: (s: string) => void;
  reset: () => void;
  setImported: (data: SurveyResponse[] | null, meta: FilterState["importedMeta"]) => void;
};

const DEFAULTS = {
  direcciones: [] as string[],
  habilidadMin: 1,
  habilidadMax: 5,
  frecuenciaMin: 1,
  frecuenciaMax: 5,
  aperturaMin: 1,
  plataformas: [] as string[],
  search: "",
};

export const useFilters = create<FilterState>()(
  persist(
    (set) => ({
      ...DEFAULTS,
      imported: null,
      importedMeta: null,
      setDirecciones: (direcciones) => set({ direcciones }),
      setHabilidadMin: (habilidadMin) => set({ habilidadMin }),
      setHabilidadMax: (habilidadMax) => set({ habilidadMax }),
      setFrecuenciaMin: (frecuenciaMin) => set({ frecuenciaMin }),
      setFrecuenciaMax: (frecuenciaMax) => set({ frecuenciaMax }),
      setAperturaMin: (aperturaMin) => set({ aperturaMin }),
      setPlataformas: (plataformas) => set({ plataformas }),
      setSearch: (search) => set({ search }),
      reset: () => set({ ...DEFAULTS }),
      setImported: (imported, importedMeta) => set({ imported, importedMeta }),
    }),
    {
      name: "atisa-ia-filters",
      partialize: (state) => ({
        imported: state.imported,
        importedMeta: state.importedMeta,
      }),
    }
  )
);

export function getAllResponses(): SurveyResponse[] {
  const state = useFilters.getState();
  const baked = bakedResponses as SurveyResponse[];
  if (!state.imported) return baked;
  // dedup by email + fechaFin
  const keyOf = (r: SurveyResponse) => `${r.email}|${r.fechaFin}`;
  const seen = new Set(baked.map(keyOf));
  const extras = state.imported.filter((r) => !seen.has(keyOf(r)));
  return [...baked, ...extras];
}

export function getMeta() {
  return bakedMeta as {
    generatedAt: string;
    totalValid: number;
    excludedNotInRoster: string[];
    excludedTest: string[];
    duplicatesInRoster: string[];
    directionCounts: Record<string, number>;
  };
}

export function useFilteredResponses(): SurveyResponse[] {
  const f = useFilters();
  const all = getAllResponses();
  return all.filter((r) => {
    if (f.direcciones.length > 0 && !f.direcciones.includes(r.direccion)) return false;
    if (r.habilidad < f.habilidadMin || r.habilidad > f.habilidadMax) return false;
    if (r.frecuencia < f.frecuenciaMin || r.frecuencia > f.frecuenciaMax) return false;
    if (r.aperturaScore < f.aperturaMin) return false;
    if (f.plataformas.length > 0) {
      if (!f.plataformas.some((p) => r.plataformas.includes(p))) return false;
    }
    if (f.search) {
      const s = f.search.toLowerCase();
      const hay =
        r.nombre.toLowerCase().includes(s) ||
        r.email.toLowerCase().includes(s) ||
        r.direccion.toLowerCase().includes(s) ||
        r.departamento.toLowerCase().includes(s) ||
        r.ejemploExito.toLowerCase().includes(s) ||
        r.herramientasArea.toLowerCase().includes(s) ||
        r.procesoPrioritario.toLowerCase().includes(s);
      if (!hay) return false;
    }
    return true;
  });
}

export function listDirecciones(responses: SurveyResponse[]): string[] {
  const set = new Set<string>();
  responses.forEach((r) => set.add(r.direccion));
  return Array.from(set).sort();
}

export function listPlataformas(responses: SurveyResponse[]): string[] {
  const set = new Set<string>();
  responses.forEach((r) => r.plataformas.forEach((p) => set.add(p)));
  return Array.from(set).sort();
}
