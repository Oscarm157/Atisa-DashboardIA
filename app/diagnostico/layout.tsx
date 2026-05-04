import { TopBar } from "@/components/ui/TopBar";
import { DashboardNav } from "@/components/layout/DashboardNav";

export default function DiagnosticoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar meta="Diagnóstico · 119 colaboradores" />
      <DashboardNav />
      <main className="bg-bg-soft min-h-[calc(100vh-110px)]">
        <div className="page-container py-10 md:py-12">{children}</div>
      </main>
    </>
  );
}
