import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Tag({
  children,
  variant = "neutral",
  className,
}: {
  children: ReactNode;
  variant?: "neutral" | "navy" | "accent" | "green" | "amber";
  className?: string;
}) {
  const styles = {
    neutral: "bg-bg-soft text-ink-3 border-line",
    navy: "bg-navy/8 text-navy-deep border-navy/15",
    accent: "bg-accent-soft text-accent border-accent/20",
    green: "bg-green/8 text-green border-green/20",
    amber: "bg-amber/8 text-amber border-amber/20",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 border text-[10.5px] font-mono uppercase tracking-widest font-medium",
        styles,
        className
      )}
    >
      {children}
    </span>
  );
}
