export type QuestionType =
  | "scale5"
  | "multiSelect"
  | "openText"
  | "singleSelectHours"
  | "likertMatrix";

export type QuestionMeta = {
  id: string;
  number: number;
  type: QuestionType;
  title: string;
  subtitle?: string;
  options?: string[];
  maxSelections?: number;
};

export const QUESTIONS: QuestionMeta[] = [
  {
    id: "frecuencia",
    number: 1,
    type: "scale5",
    title: "Frecuencia de uso",
    subtitle:
      "¿Con qué frecuencia utiliza herramientas de IA en sus tareas laborales? (1 = no la uso, 5 = diario).",
  },
  {
    id: "plataformas",
    number: 2,
    type: "multiSelect",
    title: "Plataformas utilizadas",
    subtitle: "¿Qué plataformas de IA ha utilizado o utiliza actualmente?",
    options: [
      "Google Gemini",
      "Claude",
      "ChatGPT",
      "Microsoft Copilot",
      "Grok",
      "Otras",
    ],
  },
  {
    id: "habilidad",
    number: 3,
    type: "scale5",
    title: "Habilidad actual",
    subtitle:
      "¿Cómo califica su habilidad actual en el uso de la IA? (1 = muy básico, 5 = técnicas avanzadas).",
  },
  {
    id: "funcionesValor",
    number: 4,
    type: "multiSelect",
    title: "Funciones donde aporta valor",
    subtitle:
      "¿En qué funciones o procesos considera que la IA aporta mayor valor?",
    options: [
      "Análisis Financiero y de Datos",
      "Generación/lluvia de ideas",
      "Traducción",
      "Organización y planificación",
      "Codificación",
      "Automatización de tareas rutinarias",
      "Resumen y síntesis de contenido",
      "Creatividad y Estrategia",
      "Comunicación y Redacción",
      "Soporte en toma de decisiones",
      "Generación y edición de contenido visual",
      "Otras",
    ],
  },
  {
    id: "ejemploExito",
    number: 5,
    type: "openText",
    title: "Ejemplo concreto de uso",
    subtitle:
      "Caso donde la IA redujo tiempo, mejoró calidad o redujo costos en un proceso.",
  },
  {
    id: "herramientasArea",
    number: 6,
    type: "openText",
    title: "Herramientas técnicas del área",
    subtitle:
      "¿Conoce herramientas de IA diseñadas específicamente para los procesos técnicos de su área?",
  },
  {
    id: "barreras",
    number: 7,
    type: "multiSelect",
    title: "Barreras para la adopción",
    subtitle: "Máximo 3 opciones.",
    maxSelections: 3,
    options: [
      "Brecha de Conocimiento",
      "Carga Operativa",
      "Calidad del Resultado",
      "Naturaleza del Puesto",
      "Acceso Tecnológico",
      "Seguridad de Información",
      "Otras",
    ],
  },
  {
    id: "procesoPrioritario",
    number: 8,
    type: "openText",
    title: "Proceso prioritario a automatizar",
    subtitle:
      "Tarea recurrente, manual o que consuma tiempo que podría mejorarse con IA.",
  },
  {
    id: "horasAhorrables",
    number: 9,
    type: "singleSelectHours",
    title: "Horas ahorrables por semana",
    subtitle:
      "Tiempo estimado que podría ahorrar con las herramientas de IA adecuadas.",
    options: ["Menos de 2 horas", "Entre 2 - 5 horas", "Entre 5 - 10 horas", "Más de 10 horas"],
  },
  {
    id: "likert",
    number: 10,
    type: "likertMatrix",
    title: "Nivel de acuerdo",
    subtitle: "Tres afirmaciones sobre la integración de IA en su puesto.",
    options: [
      "Aprender IA es indispensable para mí",
      "Gran parte de mi tiempo se consume en tareas repetitivas automatizables",
      "Estoy dispuesto a modificar mis flujos para integrar IA",
    ],
  },
];

export const LIKERT_LEVELS = [
  "Totalmente en desacuerdo",
  "En desacuerdo",
  "Neutral",
  "De acuerdo",
  "Totalmente de acuerdo",
];

export const HOURS_BUCKETS: Record<string, number> = {
  "Menos de 2 horas": 1,
  "Entre 2 - 5 horas": 3.5,
  "Entre 5 - 10 horas": 7.5,
  "Más de 10 horas": 12,
};
