import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export function Card({
  children,
  className,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-card border border-atisa-grayMid/40",
        padded && "p-5",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, subtitle }: { children: ReactNode; subtitle?: string }) {
  return (
    <div className="mb-3">
      <h3 className="text-sm font-semibold text-atisa-black tracking-tight">{children}</h3>
      {subtitle && <p className="text-xs text-atisa-grayDark mt-0.5">{subtitle}</p>}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-lg font-semibold text-atisa-black mt-6 mb-3 tracking-tight">
      {children}
    </h2>
  );
}
