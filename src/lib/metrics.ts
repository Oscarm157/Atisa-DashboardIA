import type { SurveyResponse } from "./types";

export function average(nums: number[]): number {
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function distributionScale(responses: SurveyResponse[], key: "frecuencia" | "habilidad") {
  const buckets: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  responses.forEach((r) => {
    buckets[r[key]] = (buckets[r[key]] || 0) + 1;
  });
  return [1, 2, 3, 4, 5].map((v) => ({ value: v, count: buckets[v] }));
}

export function countMulti(
  responses: SurveyResponse[],
  key: "plataformas" | "funcionesValor" | "barreras"
): { label: string; count: number; pct: number }[] {
  const counts = new Map<string, number>();
  responses.forEach((r) => {
    r[key].forEach((v) => counts.set(v, (counts.get(v) || 0) + 1));
  });
  const total = responses.length || 1;
  return Array.from(counts.entries())
    .map(([label, count]) => ({ label, count, pct: (count / total) * 100 }))
    .sort((a, b) => b.count - a.count);
}

export function hoursDistribution(responses: SurveyResponse[]) {
  const order = ["Menos de 2 horas", "Entre 2 - 5 horas", "Entre 5 - 10 horas", "Más de 10 horas"];
  const counts: Record<string, number> = Object.fromEntries(order.map((o) => [o, 0]));
  responses.forEach((r) => {
    counts[r.horasAhorrables] = (counts[r.horasAhorrables] || 0) + 1;
  });
  return order.map((label) => ({ label, count: counts[label] }));
}

export function totalHoursSaved(responses: SurveyResponse[]): number {
  return responses.reduce((sum, r) => sum + r.horasAhorradasNum, 0);
}

export function likertStacked(responses: SurveyResponse[]) {
  const keys: Array<["indispensable" | "repetitivo" | "modificarFlujos", string]> = [
    ["indispensable", "Aprender IA es indispensable"],
    ["repetitivo", "Mi tiempo se consume en tareas repetitivas"],
    ["modificarFlujos", "Dispuesto a modificar flujos"],
  ];
  return keys.map(([k, label]) => {
    const buckets: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    responses.forEach((r) => {
      const v = r.likert[k];
      buckets[v] = (buckets[v] || 0) + 1;
    });
    return {
      label,
      1: buckets[1],
      2: buckets[2],
      3: buckets[3],
      4: buckets[4],
      5: buckets[5],
    };
  });
}

export function byDirection<T>(
  responses: SurveyResponse[],
  fn: (group: SurveyResponse[]) => T
): Record<string, T> {
  const groups = new Map<string, SurveyResponse[]>();
  responses.forEach((r) => {
    if (!groups.has(r.direccion)) groups.set(r.direccion, []);
    groups.get(r.direccion)!.push(r);
  });
  const result: Record<string, T> = {};
  for (const [dir, group] of groups.entries()) {
    result[dir] = fn(group);
  }
  return result;
}

export function directionProfile(responses: SurveyResponse[]) {
  return byDirection(responses, (group) => ({
    n: group.length,
    frecuencia: round1(average(group.map((r) => r.frecuencia))),
    habilidad: round1(average(group.map((r) => r.habilidad))),
    apertura: round1(average(group.map((r) => r.aperturaScore))),
    horasSemana: round1(group.reduce((s, r) => s + r.horasAhorradasNum, 0)),
    pctCampeones: round1((group.filter((r) => r.esCampeon).length / (group.length || 1)) * 100),
    pctConoceHerramientas:
      round1(
        (group.filter((r) => r.plataformas.length >= 3).length / (group.length || 1)) * 100
      ),
  }));
}

export function categoryCounts(responses: SurveyResponse[], cat: "q5" | "q6" | "q8") {
  const counts = new Map<string, number>();
  responses.forEach((r) => {
    r.cat[cat].forEach((c) => counts.set(c, (counts.get(c) || 0) + 1));
  });
  return Array.from(counts.entries())
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count);
}

export function kpis(responses: SurveyResponse[]) {
  return {
    n: responses.length,
    frecuencia: round1(average(responses.map((r) => r.frecuencia))),
    habilidad: round1(average(responses.map((r) => r.habilidad))),
    apertura: round1(average(responses.map((r) => r.aperturaScore))),
    horasSemana: Math.round(totalHoursSaved(responses)),
    pctCampeones: round1(
      (responses.filter((r) => r.esCampeon).length / (responses.length || 1)) * 100
    ),
  };
}
