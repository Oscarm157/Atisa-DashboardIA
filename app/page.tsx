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
      <section className="border-b border-line py-24 md:py-32">
        <div className="page-container">
          <FadeIn>
            <div className="mono-eyebrow mb-7">
              Programa de Adopción de IA · 2026
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-serif-display text-[44px] md:text-[68px] leading-[1.05] text-ink max-w-[920px]">
              Estrategia, diagnóstico y{" "}
              <strong className="text-navy-deep font-medium">plan de ejecución</strong>{" "}
              en un solo lugar.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-7 text-[17px] text-ink-3 leading-[1.55] max-w-[680px]">
              Tres bloques de trabajo: el marco de gobernanza, los hallazgos de la encuesta a 119 colaboradores, y las 24 semanas que arrancan en mayo.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 01 ESTRATEGIA */}
      <Section
        num="01"
        eyebrow=""
        title="Estrategia"
        subtitle="El marco de gobernanza y la mecánica del challenge interno."
      >
        <StaggerChildren className="grid md:grid-cols-2 gap-5 ml-0 md:ml-[120px]">
          <StaggerItem>
            <Card href="https://atisa-ia.vercel.app/ai-governance" external className="group h-full">
              <CardEyebrow>
                Deck externo · 7 slides
                <ArrowUpRight className="w-3 h-3 text-ink-4" />
              </CardEyebrow>
              <CardTitle>Atisa Governance</CardTitle>
              <CardBody>
                Marco de uso responsable de IA: principios, fases de adopción, ruta crítica y KPIs institucionales.
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
                Mecánica del programa interno: oportunidad, datos, herramientas, propuesta, timeline, evaluación, premios e inversión.
              </CardBody>
              <CardGo>Abrir presentación</CardGo>
            </Card>
          </StaggerItem>
        </StaggerChildren>
      </Section>

      {/* 02 DIAGNOSTICO */}
      <Section
        num="02"
        title="Diagnóstico"
        subtitle="119 colaboradores encuestados. Hallazgos por dirección, por nivel y por proceso."
      >
        <StaggerChildren className="grid md:grid-cols-2 gap-5 ml-0 md:ml-[120px]">
          <StaggerItem>
            <Card href="/reporte" className="group h-full">
              <CardEyebrow>
                Documento ejecutivo
                <FileText className="w-3 h-3 text-ink-4" />
              </CardEyebrow>
              <CardTitle>Reporte ejecutivo</CardTitle>
              <CardBody>
                Resultados de la encuesta, segmentación Básico e Intermedio, mecanismos del programa y cronograma de 24 semanas.
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
              <CardTitle>Dashboard de hallazgos</CardTitle>
              <CardBody>
                KPIs filtrables, matriz apertura por habilidad, campeones identificados, horas ahorrables y casos por dirección.
              </CardBody>
              <CardGo>Abrir dashboard</CardGo>
            </Card>
          </StaggerItem>
        </StaggerChildren>
      </Section>

      {/* 03 PROGRAMA */}
      <Section
        num="03"
        title="Programa"
        subtitle="Lo que sigue: 24 semanas de ejecución. Convocatoria al personal y material para preparar las sesiones."
      >
        <StaggerChildren className="grid md:grid-cols-2 gap-5 ml-0 md:ml-[120px]">
          <StaggerItem>
            <Card href="/lanzamiento" className="group h-full">
              <CardEyebrow>
                Convocatoria
                <Megaphone className="w-3 h-3 text-ink-4" />
              </CardEyebrow>
              <CardTitle>Lanzamiento del programa</CardTitle>
              <CardBody>
                Para los 200 colaboradores: niveles de partida, calendario, reglas de asistencia, pasos de inscripción.
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
                105 procesos prioritarios reales escritos por los respondientes. Material crudo para preparar cada sesión.
              </CardBody>
              <CardGo>Ver casos</CardGo>
            </Card>
          </StaggerItem>
        </StaggerChildren>
      </Section>

      {/* TRAY */}
      <section className="border-b border-line py-14">
        <div className="page-container">
          <div className="mono-eyebrow mb-5">Otras vistas del dashboard</div>
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
      <footer className="py-9 pb-14">
        <div className="page-container font-mono text-[11px] tracking-widest uppercase text-ink-4">
          Atisa Group · Documento Interno · Mayo 2026
        </div>
      </footer>
    </>
  );
}
