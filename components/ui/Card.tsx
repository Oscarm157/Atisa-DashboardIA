import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  padded = true,
  href,
  external,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
  href?: string;
  external?: boolean;
}) {
  const base = cn(
    "block bg-bg border border-line transition-[border-color,transform,box-shadow] duration-200",
    padded && "p-7 md:p-8",
    href && "hover:border-accent hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.07)]",
    className
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
          {children}
        </a>
      );
    }
    return (
      <a href={href} className={base}>
        {children}
      </a>
    );
  }
  return <div className={base}>{children}</div>;
}

export function CardEyebrow({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <div
      className={cn(
        "mono-eyebrow mb-3.5 flex items-center gap-2",
        accent && "!text-accent"
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, as: As = "h3", size = "md" }: { children: ReactNode; as?: keyof React.JSX.IntrinsicElements; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "text-lg",
    md: "text-2xl md:text-[26px]",
    lg: "text-3xl md:text-[32px]",
  };
  return (
    <As className={cn("font-serif-display text-ink leading-[1.18] mb-2.5", sizes[size])}>
      {children}
    </As>
  );
}

export function CardBody({ children }: { children: ReactNode }) {
  return <p className="text-ink-3 text-[14.5px] leading-[1.55]">{children}</p>;
}

export function CardGo({ children }: { children: ReactNode }) {
  return (
    <div className="mt-5 flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-accent font-medium">
      {children}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </div>
  );
}
