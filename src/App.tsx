import { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Header, PresentationTopBar } from "./components/layout/Header";
import { FilterBar } from "./components/layout/FilterBar";
import { Overview } from "./pages/Overview";
import { Compare } from "./pages/Compare";
import { Champions } from "./pages/Champions";
import { Hours } from "./pages/Hours";
import { Import } from "./pages/Import";
import { useFilters } from "./lib/filters";
import { cn } from "./lib/utils";

export default function App() {
  const presentationMode = useFilters((s) => s.presentationMode);
  const setPresentationMode = useFilters((s) => s.setPresentationMode);

  // ESC para salir del modo presentación. F11/F para activarlo.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && presentationMode) {
        setPresentationMode(false);
      } else if ((e.key === "F" || e.key === "f") && !presentationMode && !isInputFocused()) {
        setPresentationMode(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [presentationMode, setPresentationMode]);

  return (
    <HashRouter>
      <div className={cn("min-h-screen bg-atisa-gray", presentationMode && "presentation-mode")}>
        {!presentationMode && (
          <>
            <Header />
            <FilterBar />
          </>
        )}
        {presentationMode && <PresentationTopBar />}
        <main
          className={cn(
            "max-w-[1800px] mx-auto",
            presentationMode ? "px-10 py-8" : "px-6 py-6"
          )}
        >
          <Routes>
            <Route path="/dashboard" element={<Overview />} />
            <Route path="/dashboard/comparar" element={<Compare />} />
            <Route path="/dashboard/campeones" element={<Champions />} />
            <Route path="/dashboard/horas" element={<Hours />} />
            <Route path="/dashboard/importar" element={<Import />} />
            <Route path="/" element={<RedirectToReport />} />
          </Routes>
        </main>
        <footer
          className={cn(
            "text-center text-[10px] text-atisa-grayDark py-6 print:hidden",
            presentationMode && "hidden"
          )}
        >
          Atisa Group · Diagnóstico de Adopción de IA ·{" "}
          <span className="opacity-60">Dashboard interno — datos confidenciales</span>
        </footer>
      </div>
    </HashRouter>
  );
}

function RedirectToReport() {
  useEffect(() => {
    window.location.href = "/reporte_diagnostico_ia_atisa_2026.html";
  }, []);
  return null;
}

function isInputFocused(): boolean {
  const t = document.activeElement;
  if (!t) return false;
  const tag = t.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select";
}
