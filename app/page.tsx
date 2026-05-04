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
      <section className="relative bg-ink text-white py-20 md:py-24 border-b border-white/10">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent" />
        <div className="page-container">
          <FadeIn>
            <div className="font-mono text-[11.5px] tracking-widest uppercase text-accent font-medium mb-7">
              Atisa · Programa de Adopción de IA
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-serif-display font-light text-[44px] md:text-[68px] leading-[1.05] tracking-[-0.025em] text-white max-w-[760px]">
              Diagnóstico.<br />
              Estrategia.<br />
              <strong className="text-accent font-medium">Programa.</strong>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-10 border-l-2 border-accent pl-6 max-w-[460px]">
              <div className="flex justify-between py-3 border-b border-white/10 text-[13.5px]">
                <span className="font-mono text-[11.5px] tracking-widest uppercase text-white/55">Colaboradores</span>
                <span className="text-white font-medium">119</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10 text-[13.5px]">
                <span className="font-mono text-[11.5px] tracking-widest uppercase text-white/55">Duración</span>
                <span className="text-white font-medium">24 semanas</span>
              </div>
              <div className="flex justify-between py-3 text-[13.5px]">
                <span className="font-mono text-[11.5px] tracking-widest uppercase text-white/55">Periodo</span>
                <span className="text-white font-medium">Mayo a octubre 2026</span>
              </div>
            </div>
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
                KPIs, matriz, líderes, horas ahorrables y casos por dirección.
              </CardBody>
              <CardGo>Abrir dashboard</CardGo>
            </Card>
          </StaggerItem>
        </StaggerChildren>
      </Section>

      {/* 02 ESTRATEGIA */}
      <Section num="02" title="Estrategia" compact className="bg-bg">
        <div className="ml-0 md:ml-[120px]">
          <StaggerChildren className="grid md:grid-cols-3 gap-4">
            <StaggerItem>
              <Card href="https://atisa-ia.vercel.app/ai-governance" external className="group h-full">
                <div className="flex items-start justify-between mb-5">
                  <div className="font-serif-display text-[56px] md:text-[64px] text-accent leading-none font-light tabular-nums">
                    01
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-ink-4 mt-3" />
                </div>
                <div className="font-mono text-[10.5px] tracking-widest uppercase text-ink-4 mb-2.5">
                  Marco · Deck externo
                </div>
                <CardTitle>Atisa Governance</CardTitle>
                <CardBody>
                  Marco de uso responsable de IA: principios, fases, ruta crítica y KPIs. Sienta la base.
                </CardBody>
                <CardGo>Abrir presentación</CardGo>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card href="/lanzamiento" className="group h-full">
                <div className="flex items-start justify-between mb-5">
                  <div className="font-serif-display text-[56px] md:text-[64px] text-accent leading-none font-light tabular-nums">
                    02
                  </div>
                  <Megaphone className="w-4 h-4 text-ink-4 mt-3" />
                </div>
                <div className="font-mono text-[10.5px] tracking-widest uppercase text-ink-4 mb-2.5">
                  Capacitación · Convocatoria interna
                </div>
                <CardTitle>Programa de capacitación</CardTitle>
                <CardBody>
                  200 colaboradores: niveles, calendario, reglas, pasos de inscripción.
                </CardBody>
                <CardGo>Ver lanzamiento</CardGo>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card href="https://atisa-ia.vercel.app/ai-challenge" external className="group h-full">
                <div className="flex items-start justify-between mb-5">
                  <div className="font-serif-display text-[56px] md:text-[64px] text-accent leading-none font-light tabular-nums">
                    03
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-ink-4 mt-3" />
                </div>
                <div className="font-mono text-[10.5px] tracking-widest uppercase text-ink-4 mb-2.5">
                  Challenge · Deck externo
                </div>
                <CardTitle>Atisa Challenge</CardTitle>
                <CardBody>
                  Mecánica del reto interno: oportunidad, herramientas, timeline, evaluación, premios.
                </CardBody>
                <CardGo>Abrir presentación</CardGo>
              </Card>
            </StaggerItem>
          </StaggerChildren>

          <div className="mt-4 grid md:grid-cols-3 gap-4">
            <div className="hidden md:block" />
            <Link
              href="/diagnostico/casos"
              className="md:col-span-2 group flex items-center justify-between gap-6 border border-line bg-bg-soft p-5 hover:border-ink hover:bg-bg transition-colors"
            >
              <div className="flex items-start gap-4 min-w-0">
                <FolderOpen className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="font-mono text-[10.5px] tracking-widest uppercase text-ink-4 mb-1">
                    Insumo para capacitación y challenge
                  </div>
                  <div className="font-medium text-ink text-[15px] mb-0.5">
                    Casos por dirección
                  </div>
                  <div className="text-[13px] text-ink-3">
                    105 procesos prioritarios reales para nutrir workshops y proyectos del challenge.
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-ink-4 shrink-0 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </div>
      </Section>

      {/* TRAY */}
      <section className="border-b border-line py-8 bg-bg">
        <div className="page-container">
          <div className="mono-eyebrow mb-4">Otras vistas del dashboard</div>
          <div className="flex flex-wrap">
            {[
              { href: "/diagnostico/comparar", label: "Comparar direcciones" },
              { href: "/diagnostico/matriz", label: "Matriz apertura · habilidad" },
              { href: "/diagnostico/campeones", label: "Líderes" },
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
