export type Likert1to5 = 1 | 2 | 3 | 4 | 5;
export type HoursBucket = "Menos de 2 horas" | "Entre 2 - 5 horas" | "Entre 5 - 10 horas" | "Más de 10 horas";

export type SurveyResponse = {
  id: number;
  email: string;
  nombre: string;
  nombreOficial: string;
  nEmpleado: number | null;
  direccion: string;
  departamento: string;
  fechaInicio: string;
  fechaFin: string;

  frecuencia: Likert1to5;
  plataformas: string[];
  habilidad: Likert1to5;
  funcionesValor: string[];
  ejemploExito: string;
  herramientasArea: string;
  barreras: string[];
  procesoPrioritario: string;
  horasAhorrables: HoursBucket;
  likert: {
    indispensable: Likert1to5;
    repetitivo: Likert1to5;
    modificarFlujos: Likert1to5;
  };

  // derived
  aperturaScore: number;
  horasAhorradasNum: number;
  esCampeon: boolean;
  cat: {
    q5: string[];
    q6: string[];
    q8: string[];
  };
};

export type RosterEntry = {
  nEmpleado: number;
  nombreOficial: string;
  direccion: string;
  departamento: string;
  email: string;
};

export type IngestMeta = {
  generatedAt: string;
  totalValid: number;
  excludedNotInRoster: string[];
  excludedTest: string[];
  duplicatesInRoster: string[];
  directionCounts: Record<string, number>;
};
