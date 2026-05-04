import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, PresentationTopBar } from "./components/layout/Header";
import { FilterBar } from "./components/layout/FilterBar";
import { Overview } from "./pages/Overview";
import { Compare } from "./pages/Compare";
import { Matrix } from "./pages/Matrix";
import { Champions } from "./pages/Champions";
import { Hours } from "./pages/Hours";
import { CasosPorDireccion } from "./pages/CasosPorDireccion";
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
    <BrowserRouter basename="/dashboard">
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
            <Route path="/" element={<Overview />} />
            <Route path="/comparar" element={<Compare />} />
            <Route path="/matriz" element={<Matrix />} />
            <Route path="/campeones" element={<Champions />} />
            <Route path="/horas" element={<Hours />} />
            <Route path="/casos" element={<CasosPorDireccion />} />
            <Route path="/importar" element={<Import />} />
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
    </BrowserRouter>
  );
}

function isInputFocused(): boolean {
  const t = document.activeElement;
  if (!t) return false;
  const tag = t.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select";
}
