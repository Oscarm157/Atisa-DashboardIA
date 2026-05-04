import responses from "@/data/responses.json";
import meta from "@/data/meta.json";
import casosCurados from "@/data/casos_curados.json";
import type { SurveyResponse, IngestMeta, CasosCurados } from "@/lib/types";

export function getResponses(): SurveyResponse[] {
  return responses as SurveyResponse[];
}

export function getMeta(): IngestMeta {
  return meta as IngestMeta;
}

export function getCasosCurados(): CasosCurados {
  const { _meta, ...rest } = casosCurados as Record<string, unknown>;
  void _meta;
  return rest as unknown as CasosCurados;
}
