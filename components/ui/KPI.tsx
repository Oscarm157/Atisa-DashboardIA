import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function KPI({
  label,
  value,
  unit,
  hint,
  variant = "neutral",
}: {
  label: string;
  value: ReactNode;
  unit?: ReactNode;
  hint?: ReactNode;
  variant?: "neutral" | "ink" | "navy" | "accent";
}) {
  const styles = {
    neutral: "bg-bg border border-line text-ink",
    ink: "bg-ink text-white border border-ink",
    navy: "bg-navy-deep text-white border border-navy-deep",
    accent: "bg-accent text-white border border-accent",
  }[variant];

  const isInverted = variant !== "neutral";

  return (
    <div className={cn("p-6 md:p-7 flex flex-col justify-between min-h-[160px]", styles)}>
      <div className={cn("font-mono text-[10.5px] tracking-widest uppercase font-medium", isInverted ? "opacity-70" : "text-ink-4")}>
        {label}
      </div>
      <div className="flex items-baseline gap-2 mt-6">
        <span className={cn("font-serif-display text-[56px] md:text-[64px] leading-[0.95]")}>{value}</span>
        {unit && <span className={cn("font-sans font-medium text-base", isInverted ? "opacity-80" : "text-ink-3")}>{unit}</span>}
      </div>
      {hint && (
        <div className={cn("mt-3 text-[12.5px]", isInverted ? "opacity-70" : "text-ink-4")}>
          {hint}
        </div>
      )}
    </div>
  );
}
