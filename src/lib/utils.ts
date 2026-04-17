import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("es-MX").format(n);
}

export function titleCase(s: string): string {
  return s
    .toLowerCase()
    .split(" ")
    .map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export function initials(nombre: string): string {
  const parts = nombre.replace(",", "").trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

/**
 * Acorta etiquetas verbosas de MS Forms.
 * "Carga Operativa: El ritmo de trabajo actual..." -> "Carga Operativa"
 */
export function shortLabel(label: string, max = 30): string {
  if (!label) return "";
  const colonIdx = label.indexOf(":");
  if (colonIdx > 0 && colonIdx <= 40) return label.slice(0, colonIdx).trim();
  if (label.length > max) return label.slice(0, max - 1).trim() + "…";
  return label;
}
