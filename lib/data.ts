import responses from "@/data/responses.json";
import meta from "@/data/meta.json";
import type { SurveyResponse, IngestMeta } from "@/lib/types";

export function getResponses(): SurveyResponse[] {
  return responses as SurveyResponse[];
}

export function getMeta(): IngestMeta {
  return meta as IngestMeta;
}
