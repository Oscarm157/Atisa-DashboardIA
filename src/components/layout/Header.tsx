import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";
import { useFilters } from "../../lib/filters";
import {
  LayoutDashboard,
  GitCompare,
  Trophy,
  Clock,
  Upload,
  Printer,
  Maximize,
  Minimize,
} from "lucide-react";

const NAV = [
  { to: "/dashboard", label: "Resumen", icon: LayoutDashboard },
  { to: "/dashboard/comparar", label: "Comparar", icon: GitCompare },
  { to: "/dashboard/campeones", label: "Campeones", icon: Trophy },
  { to: "/dashboard/horas", label: "Horas", icon: Clock },
  { to: "/dashboard/importar", label: "Importar", icon: Upload },
];

export function Header() {
  const presentationMode = useFilters((s) => s.presentationMode);
  const setPresentationMode = useFilters((s) => s.setPresentationMode);

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="bg-atisa-black text-white sticky top-0 z-30 shadow-md print:hidden no-print">
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
              end={to === "/dashboard"}
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
        <div className="flex items-center gap-1 shrink-0 border-l border-white/15 pl-3">
          <button
            onClick={handlePrint}
            title="Exportar a PDF / Imprimir"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-white/75 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">PDF</span>
          </button>
          <button
            onClick={() => setPresentationMode(!presentationMode)}
            title={presentationMode ? "Salir del modo presentación" : "Modo presentación (oculta nav)"}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-white/75 hover:bg-white/10 hover:text-white transition-colors"
          >
            {presentationMode ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
            <span className="hidden lg:inline">Presentar</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// Barra mínima en modo presentación: solo logo + botón para salir.
export function PresentationTopBar() {
  const setPresentationMode = useFilters((s) => s.setPresentationMode);
  return (
    <div className="fixed top-0 right-0 z-40 flex items-center gap-2 p-3 print:hidden">
      <button
        onClick={() => setPresentationMode(false)}
        title="Salir del modo presentación (Esc)"
        className="bg-atisa-black/90 text-white backdrop-blur-sm rounded-md px-3 py-1.5 text-xs font-medium hover:bg-atisa-black transition-colors flex items-center gap-1.5 shadow-lg"
      >
        <Minimize className="w-3.5 h-3.5" /> Salir
      </button>
    </div>
  );
}
