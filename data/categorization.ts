export type CategoryRule = {
  id: string;
  label: string;
  keywords: string[];
};

// Q5 — ejemplos concretos de éxito
export const Q5_CATEGORIES: CategoryRule[] = [
  {
    id: "minutas",
    label: "Resumen y minutas",
    keywords: ["minuta", "reunion", "reunión", "junta", "resumen", "resumir", "síntesis", "sintesis"],
  },
  {
    id: "redaccion",
    label: "Redacción y correos",
    keywords: ["correo", "redacción", "redaccion", "redactar", "escribir", "mensaje", "comunic"],
  },
  {
    id: "analisis",
    label: "Análisis de datos",
    keywords: ["análisis", "analisis", "datos", "insight", "reporte", "report", "tablero", "dashboard"],
  },
  {
    id: "excel",
    label: "Fórmulas y Excel",
    keywords: ["fórmula", "formula", "excel", "hoja de cálculo", "hoja de calculo", "automatiz"],
  },
  {
    id: "presentaciones",
    label: "Presentaciones",
    keywords: ["presentación", "presentacion", "slide", "ppt", "powerpoint", "diapositiva"],
  },
  {
    id: "traduccion",
    label: "Traducción",
    keywords: ["traduc", "idioma", "inglés", "ingles", "translate"],
  },
  {
    id: "visual",
    label: "Imágenes y video",
    keywords: ["imagen", "foto", "video", "render", "diseño", "edición", "edicion"],
  },
  {
    id: "codigo",
    label: "Código y desarrollo",
    keywords: ["código", "codigo", "programación", "programacion", "dev", "copilot", "sprint", "refactor"],
  },
  {
    id: "planos",
    label: "Planos y construcción",
    keywords: ["plano", "arquitect", "construcción", "construccion", "obra", "nave", "industrial"],
  },
];

// Q6 — herramientas técnicas del área
export const Q6_CATEGORIES: CategoryRule[] = [
  {
    id: "cad",
    label: "CAD / Construcción (Revit, Autodesk)",
    keywords: ["revit", "autodesk", "cad", "arquitect", "construcción", "construccion", "bim", "plano"],
  },
  {
    id: "dev",
    label: "Desarrollo / código",
    keywords: ["código", "codigo", "dev", "copilot", "cursor", "github", "programac"],
  },
  {
    id: "visual",
    label: "Multimedia / visual",
    keywords: ["imagen", "video", "audio", "edición", "edicion", "render", "diseño"],
  },
  {
    id: "legal",
    label: "Legal",
    keywords: ["legal", "contrato", "cláusula", "clausula", "jurídic", "juridic"],
  },
  {
    id: "finanzas",
    label: "Finanzas",
    keywords: ["finanz", "contab", "audit", "fiscal", "impuesto", "factur"],
  },
  {
    id: "no_conoce",
    label: "No conoce",
    keywords: ["no conozco", "no conoce", "no sé", "no se", "aun no", "aún no", "todavía no", "todavia no"],
  },
];

// Q8 — proceso prioritario a automatizar
export const Q8_CATEGORIES: CategoryRule[] = [
  {
    id: "reportes",
    label: "Reportes y análisis",
    keywords: ["reporte", "análisis", "analisis", "dashboard", "tablero", "indicador", "kpi"],
  },
  {
    id: "minutas",
    label: "Minutas y reuniones",
    keywords: ["minuta", "reunion", "reunión", "junta"],
  },
  {
    id: "admin",
    label: "Administrativo / SAP",
    keywords: ["sap", "administrativ", "requisición", "requisicion", "orden de compra", "autorización", "autorizacion", "facturación", "facturacion"],
  },
  {
    id: "diseno",
    label: "Diseño y visual",
    keywords: ["render", "presentación", "presentacion", "imagen", "visual", "diseño", "prototipo"],
  },
  {
    id: "procurement",
    label: "Procurement y proveedores",
    keywords: ["proveedor", "compra", "cotización", "cotizacion", "subcontrat"],
  },
  {
    id: "repetitivo",
    label: "Procesos repetitivos",
    keywords: ["repetitiv", "rutinari", "manual", "automatiz"],
  },
  {
    id: "comunicacion",
    label: "Comunicación y correos",
    keywords: ["correo", "comunic", "redacción", "redaccion", "mensaje"],
  },
];

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function categorize(
  text: string,
  rules: CategoryRule[]
): string[] {
  if (!text || text.trim().length < 2) return ["otros"];
  const normalized = normalizeText(text);
  const matches = rules
    .filter((rule) =>
      rule.keywords.some((kw) => normalized.includes(normalizeText(kw)))
    )
    .map((r) => r.id);
  return matches.length > 0 ? matches : ["otros"];
}

export function categoryLabel(
  id: string,
  rules: CategoryRule[]
): string {
  if (id === "otros") return "Otros";
  return rules.find((r) => r.id === id)?.label ?? id;
}
