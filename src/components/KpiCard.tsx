import type { ReactNode } from "react";
import { cn } from "../lib/utils";

type Props = {
  label: string;
  value: string | number;
  unit?: string;
  icon?: ReactNode;
  accent?: "red" | "black" | "neutral";
  hint?: string;
};

export function KpiCard({ label, value, unit, icon, accent = "neutral", hint }: Props) {
  const styles = {
    red: "bg-atisa-red text-white",
    black: "bg-atisa-black text-white",
    neutral: "bg-white text-atisa-black border border-atisa-grayMid/40",
  }[accent];

  return (
    <div className={cn("rounded-xl shadow-card p-4 flex flex-col justify-between", styles)}>
      <div className="flex items-start justify-between gap-2">
        <span
          className={cn(
            "text-xs font-medium uppercase tracking-wider",
            accent === "neutral" ? "text-atisa-grayDark" : "text-white/80"
          )}
        >
          {label}
        </span>
        {icon && <span className={cn(accent === "neutral" ? "text-atisa-red" : "text-white/80")}>{icon}</span>}
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-3xl font-bold tracking-tight">{value}</span>
        {unit && (
          <span
            className={cn(
              "text-sm font-medium",
              accent === "neutral" ? "text-atisa-grayDark" : "text-white/80"
            )}
          >
            {unit}
          </span>
        )}
      </div>
      {hint && (
        <div
          className={cn(
            "mt-1 text-xs",
            accent === "neutral" ? "text-atisa-grayDark" : "text-white/80"
          )}
        >
          {hint}
        </div>
      )}
    </div>
  );
}
