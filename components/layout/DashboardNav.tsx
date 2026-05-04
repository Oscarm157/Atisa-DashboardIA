"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { LayoutDashboard, GitCompare, Target, Trophy, Clock, FolderOpen, Upload } from "lucide-react";

const NAV = [
  { href: "/diagnostico", label: "Resumen", icon: LayoutDashboard },
  { href: "/diagnostico/casos", label: "Casos", icon: FolderOpen },
  { href: "/diagnostico/comparar", label: "Comparar", icon: GitCompare },
  { href: "/diagnostico/matriz", label: "Matriz", icon: Target },
  { href: "/diagnostico/campeones", label: "Líderes", icon: Trophy },
  { href: "/diagnostico/horas", label: "Horas", icon: Clock },
  { href: "/diagnostico/importar", label: "Importar", icon: Upload },
];

export function DashboardNav() {
  const pathname = usePathname();
  return (
    <nav className="border-b border-line bg-bg sticky top-0 z-30">
      <div className="page-container flex items-center gap-1 overflow-x-auto no-scrollbar h-12">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || (href !== "/diagnostico" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 px-3 h-full text-[12.5px] font-medium whitespace-nowrap transition-colors border-b-2 -mb-px",
                active
                  ? "border-accent text-ink"
                  : "border-transparent text-ink-3 hover:text-ink"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
