export const BRAND = {
  primary: "#D2262C",
  primaryDark: "#A51E23",
  primaryLight: "#F04A50",
  black: "#1A1A1A",
  gray: "#F5F5F5",
  grayMid: "#D4D4D4",
  grayDark: "#6B6B6B",
  white: "#FFFFFF",
};

// Palette for categorical charts (13 direcciones)
export const DIRECTION_COLORS = [
  "#D2262C", // Atisa red
  "#1A1A1A", // black
  "#F59E0B", // amber
  "#3B82F6", // blue
  "#10B981", // emerald
  "#8B5CF6", // violet
  "#EC4899", // pink
  "#F97316", // orange
  "#06B6D4", // cyan
  "#84CC16", // lime
  "#A855F7", // purple
  "#EF4444", // red light
  "#6B7280", // gray
];

export function colorForDirection(direccion: string, list: string[]): string {
  const i = list.indexOf(direccion);
  if (i < 0) return BRAND.grayDark;
  return DIRECTION_COLORS[i % DIRECTION_COLORS.length];
}

// Sequential palette for Likert (5 levels: disagree → agree)
export const LIKERT_COLORS = ["#A51E23", "#D2262C", "#D4D4D4", "#67A867", "#2F7D32"];

// Sequential for scale 1-5
export const SCALE_COLORS = ["#FAD0D2", "#F59498", "#E8595E", "#D2262C", "#A51E23"];

export const DIRECTION_LABELS: Record<string, string> = {
  CONSTRUCTORA: "Constructora",
  "DIRECCION DE COSTOS Y PROYECTOS": "Costos y Proyectos",
  "CAPITAL HUMANO": "Capital Humano",
  ADMINISTRACION: "Administración",
  "CADENA DE SUMINISTROS": "Cadena de Suministros",
  "ASISTENCIA DIRECCION": "Asistencia Dirección",
  FINANZAS: "Finanzas",
  "TECNOLOGIA IT": "Tecnología IT",
  MARKETING: "Marketing",
  INMOBILIARIA: "Inmobiliaria",
  "MOVIMIENTO DE TIERRA": "Mov. de Tierra",
  MAQUINARIA: "Maquinaria",
  "DIRECCION DE DESARROLLO DE NUEVOS NEGOCIOS": "Nuevos Negocios",
};

export function shortDirection(d: string): string {
  return DIRECTION_LABELS[d] || d;
}
