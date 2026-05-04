import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({
  num,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  compact = false,
}: {
  num?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return (
    <section className={cn("border-b border-line", compact ? "py-10 md:py-14" : "py-14 md:py-20", className)}>
      <div className="page-container">
        {(num || title) && (
          <div className="grid md:grid-cols-[80px_1fr] gap-4 md:gap-10 items-baseline mb-7">
            {num && (
              <div className="font-mono text-[13px] tracking-widest text-accent font-medium md:pt-2">
                {num}
              </div>
            )}
            <div>
              {eyebrow && <div className="mono-eyebrow mb-2">{eyebrow}</div>}
              {title && (
                <h2 className="font-serif-display text-[28px] md:text-[36px] text-ink leading-[1.1]">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-ink-3 text-[15px] mt-2 max-w-[560px]">{subtitle}</p>
              )}
            </div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
