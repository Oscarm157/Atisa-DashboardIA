import { HashRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { FilterBar } from "./components/layout/FilterBar";
import { Overview } from "./pages/Overview";
import { ByQuestion } from "./pages/ByQuestion";
import { Compare } from "./pages/Compare";
import { Matrix } from "./pages/Matrix";
import { Champions } from "./pages/Champions";
import { Hours } from "./pages/Hours";
import { Individual } from "./pages/Individual";
import { Import } from "./pages/Import";

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-atisa-gray">
        <Header />
        <FilterBar />
        <main className="max-w-[1800px] mx-auto px-6 py-6">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/preguntas" element={<ByQuestion />} />
            <Route path="/comparar" element={<Compare />} />
            <Route path="/matriz" element={<Matrix />} />
            <Route path="/campeones" element={<Champions />} />
            <Route path="/horas" element={<Hours />} />
            <Route path="/individuales" element={<Individual />} />
            <Route path="/importar" element={<Import />} />
          </Routes>
        </main>
        <footer className="text-center text-[10px] text-atisa-grayDark py-6">
          Atisa Group · Diagnóstico de Adopción de IA ·{" "}
          <span className="opacity-60">Dashboard interno — datos confidenciales</span>
        </footer>
      </div>
    </HashRouter>
  );
}
