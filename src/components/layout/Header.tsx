import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  LayoutDashboard,
  BarChart3,
  GitCompare,
  Target,
  Trophy,
  Clock,
  Users,
  Upload,
} from "lucide-react";

const NAV = [
  { to: "/", label: "Resumen", icon: LayoutDashboard },
  { to: "/preguntas", label: "Por Pregunta", icon: BarChart3 },
  { to: "/comparar", label: "Comparar", icon: GitCompare },
  { to: "/matriz", label: "Matriz", icon: Target },
  { to: "/campeones", label: "Campeones", icon: Trophy },
  { to: "/horas", label: "Horas", icon: Clock },
  { to: "/individuales", label: "Individuales", icon: Users },
  { to: "/importar", label: "Importar", icon: Upload },
];

export function Header() {
  return (
    <header className="bg-atisa-black text-white sticky top-0 z-30 shadow-md">
      <div className="max-w-[1800px] mx-auto px-6 py-3 flex items-center gap-6">
        <div className="flex items-center gap-3 shrink-0">
          <img src="/atisa-logo.svg" alt="Atisa Group" className="h-8 w-auto" />
          <div className="leading-tight hidden md:block">
            <div className="text-[10px] uppercase tracking-widest text-white/60">Atisa Group</div>
            <div className="text-sm font-semibold">Diagnóstico de Adopción de IA</div>
          </div>
        </div>
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-1">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-atisa-red text-white"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                )
              }
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
