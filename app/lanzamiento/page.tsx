import Link from "next/link";
import { TopBar } from "@/components/ui/TopBar";
import { Section } from "@/components/ui/Section";
import { KPI } from "@/components/ui/KPI";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { CheckCircle2, AlertCircle, ArrowRight, Sparkles, Clock, BookOpen, Trophy } from "lucide-react";

const BLOQUES = [
  { id: "B1", label: "Lanzamiento", semanas: "S1 – S2", weight: 8 },
  { id: "B2", label: "Capacitación Básico", semanas: "S3 – S7", weight: 21, accent: true },
  { id: "B3", label: "Capacitación Intermedio", semanas: "S5 – S8", weight: 17 },
  { id: "B4", label: "Mapeo por dirección", semanas: "S8 – S10", weight: 13 },
  { id: "B5", label: "Challenge interno", semanas: "S11 – S22", weight: 50, accent: true },
  { id: "B6", label: "Premiación", semanas: "S23 – S24", weight: 8 },
];

export default function LanzamientoPage() {
  return (
    <>
      <TopBar meta="Convocatoria · Mayo 2026" />

      {/* HERO */}
      <section className="border-b border-line py-20 md:py-24">
        <div className="page-container">
          <FadeIn>
            <div className="mono-eyebrow text-accent mb-6">
              Convocatoria abierta
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="font-serif-display text-[44px] md:text-[68px] leading-[1.05] text-ink max-w-[920px]">
              Programa de Adopción de IA<br />
              <strong className="text-accent font-medium">Atisa 2026</strong>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-[17px] text-ink-3 max-w-[680px]">
              Mayo a octubre 2026. 200 plazas. Claude Enterprise como herramienta única del programa.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="grid md:grid-cols-3 gap-3 mt-10">
              <KPI
                label="Plazas disponibles"
                value="200"
                hint="Toda la plantilla administrativa"
                variant="ink"
              />
              <KPI
                label="Duración total"
                value="24"
                unit="semanas"
                hint="Mayo a octubre 2026"
                variant="accent"
              />
              <KPI
                label="Herramienta del programa"
                value="Claude"
                unit="Enterprise"
                hint="Cuentas corporativas, sin uso personal"
                variant="neutral"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* POR QUÉ */}
      <Section
        title="Por qué ahora"
      >
        <StaggerChildren className="grid md:grid-cols-3 gap-5 ">
          {[
            {
              big: "94%",
              body: "Del personal ya usa IA al menos una vez. Sin gobernanza ni método.",
              note: "Hoy todo es con cuentas personales y sin protocolo de manejo de información.",
            },
            {
              big: "$5.2M",
              unit: "MXN al año",
              body: "En horas liberables a nivel plantilla.",
              note: "Cada colaborador estima 4.5 horas semanales que podría reasignar a trabajo de mayor valor con las herramientas adecuadas.",
            },
            {
              big: "3.33 vs 3.02",
              body: "Frecuencia de uso por encima de habilidad real.",
              note: "Usamos la herramienta a un ritmo que rebasa nuestro dominio. Esto explica la queja recurrente sobre respuestas imprecisas.",
            },
          ].map((c, i) => (
            <StaggerItem key={i}>
              <div className="bg-bg border border-line p-7 md:p-8 h-full">
                <div className="font-serif-display text-[44px] md:text-[52px] text-accent leading-none">
                  {c.big}
                </div>
                {c.unit && (
                  <div className="font-mono text-[11px] uppercase tracking-widest text-ink-4 mt-2">{c.unit}</div>
                )}
                <p className="mt-4 text-[15px] font-medium text-ink leading-snug">{c.body}</p>
                <p className="mt-2 text-[13px] text-ink-3 leading-[1.55]">{c.note}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* TU NIVEL */}
      <Section
        title="Tu nivel"
      >
        <StaggerChildren className="grid md:grid-cols-2 gap-5 ">
          <StaggerItem>
            <div className="bg-bg border border-line border-l-4 border-l-accent p-7 md:p-8 h-full">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="mono-eyebrow">Nivel 01</div>
                  <div className="font-serif-display text-[28px] text-ink mt-1">Básico</div>
                </div>
                <div className="text-right">
                  <div className="font-serif-display text-[38px] text-ink leading-none">~70%</div>
                  <div className="text-[11px] text-ink-4 mt-1 font-mono uppercase tracking-widest">de la plantilla</div>
                </div>
              </div>
              <p className="text-[15px] font-medium text-ink mt-4">5 sesiones de 2h, una por semana.</p>
              <p className="text-[13.5px] text-ink-3 mt-2 leading-[1.6]">
                Aprendes a usar Claude con método: cómo escribir un buen prompt, cómo evaluar la respuesta, qué información sí y qué información no se comparte. Sales con casos concretos de tu área.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="bg-bg border border-line border-l-4 border-l-navy-deep p-7 md:p-8 h-full">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="mono-eyebrow">Nivel 02</div>
                  <div className="font-serif-display text-[28px] text-ink mt-1">Intermedio</div>
                </div>
                <div className="text-right">
                  <div className="font-serif-display text-[38px] text-ink leading-none">~30%</div>
                  <div className="text-[11px] text-ink-4 mt-1 font-mono uppercase tracking-widest">de la plantilla</div>
                </div>
              </div>
              <p className="text-[15px] font-medium text-ink mt-4">4 sesiones de 2h, una por semana.</p>
              <p className="text-[13.5px] text-ink-3 mt-2 leading-[1.6]">
                Profundizas en flujos avanzados: contexto, memoria, evaluación de outputs y automatización inicial. Te formas como mentor informal de tu dirección durante el challenge.
              </p>
            </div>
          </StaggerItem>
        </StaggerChildren>

        <div className=" mt-5 flex items-start gap-3 bg-bg-soft border border-line p-4">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-ink-4" />
          <p className="text-[13.5px] text-ink-3 leading-[1.6]">
            Tu nivel se asignó según tu respuesta a la encuesta diagnóstica. Si no contestaste, hay diagnóstico rápido al momento de inscribirte.
          </p>
        </div>
      </Section>

      {/* TIMELINE */}
      <Section
        title="24 semanas"
      >
        <FadeIn>
          <div className=" bg-bg border border-line p-7 md:p-8">
            <div className="space-y-3">
              {BLOQUES.map((b) => (
                <div key={b.id} className="grid grid-cols-[40px_180px_1fr_90px] gap-3 md:gap-4 items-center text-[13.5px]">
                  <div className="font-mono text-[11px] font-bold text-ink-4">{b.id}</div>
                  <div className="font-medium text-ink">{b.label}</div>
                  <div className="bg-line-soft h-2 relative overflow-hidden">
                    <div
                      className={`h-full ${b.accent ? "bg-accent" : "bg-navy-deep"}`}
                      style={{ width: `${b.weight * 1.7}%` }}
                    />
                  </div>
                  <div className="font-mono text-[11px] text-ink-3 text-right">{b.semanas}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[13px] text-ink-4 leading-[1.55]">
              Checkpoints del challenge: semanas 14, 18 y 22. Quien no entrega, sale del ranking.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* QUÉ OBTIENES */}
      <Section
        title="Qué obtienes"
      >
        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 ">
          {[
            {
              icon: Sparkles,
              title: "Acceso a Claude Enterprise",
              body: "Licencia corporativa durante todo el programa, con políticas de manejo de información de Atisa.",
            },
            {
              icon: Clock,
              title: "Capacitación dentro de tu jornada",
              body: "Las sesiones son tiempo laboral, no personal. Tu jefe ya está enterado del calendario.",
            },
            {
              icon: BookOpen,
              title: "Plaza en el challenge",
              body: "Optimizas un proceso real de tu trabajo y mides el resultado en tiempo, calidad o costo. Tu dirección compite contra el resto.",
            },
            {
              icon: Trophy,
              title: "Premiación y Comité",
              body: "El programa cierra con premiación. La naturaleza del premio se anuncia con la convocatoria oficial. Los ganadores forman el Comité Interno de IA.",
            },
          ].map((c, i) => (
            <StaggerItem key={i}>
              <div className="bg-bg border border-line p-6 h-full">
                <c.icon className="w-5 h-5 text-accent mb-4" />
                <p className="text-[15px] font-medium text-ink leading-snug">{c.title}</p>
                <p className="text-[13px] text-ink-3 mt-2 leading-[1.55]">{c.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* REGLAS */}
      <Section
        title="Reglas"
      >
        <FadeIn>
          <div className=" bg-bg border border-line p-7 md:p-8 space-y-5">
            {[
              {
                title: "Asistencia mínima",
                body: "4 de 5 sesiones para Básico, 3 de 4 para Intermedio. Bajo este umbral pierdes plaza en el challenge.",
              },
              {
                title: "Checkpoints mensuales",
                body: "Tres entregas durante el challenge. Si no entregas en un checkpoint, sales del ranking individual y de tu dirección.",
              },
              {
                title: "Política de seguridad de información",
                body: "TI publica el documento con qué datos sí y qué datos no se comparten con Claude antes de la primera sesión. Es parte del onboarding.",
              },
            ].map((r, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
                <div>
                  <p className="text-[15px] font-medium text-ink">{r.title}</p>
                  <p className="text-[13.5px] text-ink-3 mt-1 leading-[1.55]">{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* COMO TE INSCRIBES */}
      <Section
        title="Inscripción"
      >
        <StaggerChildren className="grid md:grid-cols-3 gap-5 ">
          {[
            {
              step: "01",
              title: "Confirmas inscripción",
              body: "Recibes un correo con un formulario de 2 minutos. Confirmas tu nivel asignado o pides el diagnóstico rápido si no respondiste la encuesta.",
            },
            {
              step: "02",
              title: "Recibes calendario",
              body: "Te llega tu calendario de sesiones con sala, horario y grupo. Si hay choque con una junta, lo reportas al punto único de TI.",
            },
            {
              step: "03",
              title: "Asistes a la primera",
              body: "La primera sesión arranca con la postura de seguridad de información, configuración de tu cuenta de Claude Enterprise y prompts base.",
            },
          ].map((s) => (
            <StaggerItem key={s.step}>
              <div className="bg-bg border border-line p-7 h-full">
                <div className="font-mono text-[11px] tracking-widest font-bold text-accent">PASO {s.step}</div>
                <p className="font-serif-display text-[24px] text-ink mt-2 leading-tight">{s.title}</p>
                <p className="text-[13.5px] text-ink-3 mt-3 leading-[1.6]">{s.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* CTA */}
      <section className="border-b border-line py-20">
        <div className="page-container">
          <FadeIn>
            <div className="bg-ink text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-[560px]">
                <div className="mono-eyebrow !text-accent mb-3">Diagnóstico</div>
                <h3 className="font-serif-display text-[28px] md:text-[34px] text-white leading-tight">
                  El dashboard tiene los hallazgos por dirección, procesos prioritarios y líderes.
                </h3>
              </div>
              <Link
                href="/diagnostico"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-medium text-sm px-5 py-3 transition-colors shrink-0"
              >
                Abrir dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5 mt-5">
            <FadeIn>
              <div className="bg-bg border border-line p-6">
                <div className="mono-eyebrow mb-2">Punto único de contacto</div>
                <p className="text-[15px] font-medium text-ink">TI</p>
                <p className="text-[13.5px] text-ink-3 mt-1">[pendiente nombre y correo]</p>
                <p className="text-[12.5px] text-ink-4 mt-3 leading-[1.5]">
                  Respuesta a dudas de acceso o configuración en menos de 4 horas hábiles.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <div className="bg-bg border border-line p-6">
                <div className="mono-eyebrow mb-2">Antes del lanzamiento</div>
                <p className="text-[15px] font-medium text-ink">Sesiones de Q&amp;A</p>
                <p className="text-[13.5px] text-ink-3 mt-1">Calendario: [pendiente]</p>
                <p className="text-[12.5px] text-ink-4 mt-3 leading-[1.5]">
                  Espacios abiertos para resolver dudas del programa antes de la convocatoria formal.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <footer className="py-9 pb-14">
        <div className="page-container font-mono text-[11px] tracking-widest uppercase text-ink-4 flex justify-between flex-wrap gap-2">
          <span>Atisa Group · Programa de Adopción de IA · Mayo 2026</span>
          <Link href="/" className="hover:text-accent transition-colors">← Volver al lobby</Link>
        </div>
      </footer>
    </>
  );
}
