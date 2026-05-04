import Link from "next/link";
import { TopBar } from "@/components/ui/TopBar";
import { Section } from "@/components/ui/Section";
import { Card, CardEyebrow, CardTitle, CardBody, CardGo } from "@/components/ui/Card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { ArrowUpRight, FileText, LayoutGrid, Megaphone, FolderOpen } from "lucide-react";

export default function LobbyPage() {
  return (
    <>
      <TopBar meta="Documento Interno · Mayo 2026" />

      {/* HERO */}
      <section className="border-b border-line py-16 md:py-24 bg-bg">
        <div className="page-container">
          <FadeIn>
            <div className="mono-eyebrow mb-5">
              Programa de Adopción de IA · 2026
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-serif-display text-[40px] md:text-[64px] leading-[1.05] text-ink max-w-[920px]">
              Estrategia, diagnóstico y{" "}
              <strong className="text-navy-deep font-medium">plan de ejecución</strong>{" "}
              en un solo lugar.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-5 text-[16px] text-ink-3 leading-[1.55] max-w-[680px]">
              Marco de gobernanza, encuesta a 119 colaboradores y 24 semanas de programa, mayo a octubre 2026.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 01 DIAGNOSTICO */}
      <Section num="01" title="Diagnóstico" compact className="bg-bg-soft">
        <StaggerChildren className="grid md:grid-cols-2 gap-4 ml-0 md:ml-[120px]">
          <StaggerItem>
            <Card href="/reporte" className="group h-full">
              <CardEyebrow>
                Documento ejecutivo
                <FileText className="w-3 h-3 text-ink-4" />
              </CardEyebrow>
              <CardTitle>Reporte ejecutivo</CardTitle>
              <CardBody>
                Resultados de la encuesta, segmentación Básico e Intermedio y cronograma.
              </CardBody>
              <CardGo>Abrir reporte</CardGo>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card href="/diagnostico" className="group h-full">
              <CardEyebrow>
                Tablero interactivo
                <LayoutGrid className="w-3 h-3 text-ink-4" />
              </CardEyebrow>
              <CardTitle>Dashboard</CardTitle>
              <CardBody>
                KPIs, matriz, campeones, horas ahorrables y casos por dirección.
              </CardBody>
              <CardGo>Abrir dashboard</CardGo>
            </Card>
          </StaggerItem>
        </StaggerChildren>
      </Section>

      {/* 02 ESTRATEGIA */}
      <Section num="02" title="Estrategia" compact className="bg-bg">
        <StaggerChildren className="grid md:grid-cols-2 gap-4 ml-0 md:ml-[120px]">
          <StaggerItem>
            <Card href="https://atisa-ia.vercel.app/ai-governance" external className="group h-full">
              <CardEyebrow>
                Deck externo · 7 slides
                <ArrowUpRight className="w-3 h-3 text-ink-4" />
              </CardEyebrow>
              <CardTitle>Atisa Governance</CardTitle>
              <CardBody>
                Marco de uso responsable de IA: principios, fases, ruta crítica y KPIs.
              </CardBody>
              <CardGo>Abrir presentación</CardGo>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card href="https://atisa-ia.vercel.app/ai-challenge" external className="group h-full">
              <CardEyebrow>
                Deck externo · 11 slides
                <ArrowUpRight className="w-3 h-3 text-ink-4" />
              </CardEyebrow>
              <CardTitle>Atisa Challenge</CardTitle>
              <CardBody>
                Mecánica del programa: oportunidad, herramientas, timeline, evaluación, premios.
              </CardBody>
              <CardGo>Abrir presentación</CardGo>
            </Card>
          </StaggerItem>
        </StaggerChildren>
      </Section>

      {/* 03 PROGRAMA */}
      <Section num="03" title="Programa" compact className="bg-bg-soft">
        <StaggerChildren className="grid md:grid-cols-2 gap-4 ml-0 md:ml-[120px]">
          <StaggerItem>
            <Card href="/lanzamiento" className="group h-full">
              <CardEyebrow>
                Convocatoria
                <Megaphone className="w-3 h-3 text-ink-4" />
              </CardEyebrow>
              <CardTitle>Lanzamiento</CardTitle>
              <CardBody>
                200 colaboradores: niveles, calendario, reglas, pasos de inscripción.
              </CardBody>
              <CardGo>Ver lanzamiento</CardGo>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card href="/diagnostico/casos" className="group h-full">
              <CardEyebrow>
                Material para workshops
                <FolderOpen className="w-3 h-3 text-ink-4" />
              </CardEyebrow>
              <CardTitle>Casos por dirección</CardTitle>
              <CardBody>
                105 procesos prioritarios reales escritos por los respondientes.
              </CardBody>
              <CardGo>Ver casos</CardGo>
            </Card>
          </StaggerItem>
        </StaggerChildren>
      </Section>

      {/* TRAY */}
      <section className="border-b border-line py-8 bg-bg">
        <div className="page-container">
          <div className="mono-eyebrow mb-4">Otras vistas del dashboard</div>
          <div className="flex flex-wrap">
            {[
              { href: "/diagnostico/comparar", label: "Comparar direcciones" },
              { href: "/diagnostico/matriz", label: "Matriz apertura · habilidad" },
              { href: "/diagnostico/campeones", label: "Campeones" },
              { href: "/diagnostico/horas", label: "Horas ahorrables" },
              { href: "/diagnostico/importar", label: "Importar datos" },
            ].map((it, i, arr) => (
              <Link
                key={it.href}
                href={it.href}
                className={`px-5 py-2.5 text-[13.5px] font-medium text-ink-2 border border-line transition-colors hover:bg-ink hover:text-white hover:border-ink ${i < arr.length - 1 ? "border-r-0" : ""}`}
              >
                {it.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-7 pb-10 bg-bg-soft">
        <div className="page-container font-mono text-[11px] tracking-widest uppercase text-ink-4">
          Atisa Group · Documento Interno · Mayo 2026
        </div>
      </footer>
    </>
  );
}
