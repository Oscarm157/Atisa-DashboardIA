import Link from "next/link";
import { TopBar } from "@/components/ui/TopBar";
import { Section } from "@/components/ui/Section";
import { KPI } from "@/components/ui/KPI";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { CheckCircle2, AlertCircle, ArrowRight, Sparkles, Clock, BookOpen, Trophy } from "lucide-react";

type Bloque = {
  id: string;
  label: string;
  start: number;
  end: number;
  semanas: string;
  fechas: string;
  accent?: boolean;
  checkpoints?: number[];
};

const TOTAL_SEMANAS = 24;
// Programa: lunes 11 may 2026 (S1) → domingo 25 oct 2026 (fin S24)
const BLOQUES: Bloque[] = [
  { id: "B1", label: "Lanzamiento", start: 1, end: 2, semanas: "S1 – S2", fechas: "11 – 24 may" },
  { id: "B2", label: "Capacitación Básico", start: 3, end: 7, semanas: "S3 – S7", fechas: "25 may – 28 jun", accent: true },
  { id: "B3", label: "Capacitación Intermedio", start: 5, end: 8, semanas: "S5 – S8", fechas: "8 jun – 5 jul" },
  { id: "B4", label: "Mapeo por dirección", start: 8, end: 10, semanas: "S8 – S10", fechas: "29 jun – 19 jul" },
  { id: "B5", label: "Challenge interno", start: 11, end: 22, semanas: "S11 – S22", fechas: "20 jul – 11 oct", accent: true, checkpoints: [14, 18, 22] },
  { id: "B6", label: "Premiación", start: 23, end: 24, semanas: "S23 – S24", fechas: "12 – 25 oct" },
];

const MARKERS = [
  { semana: 1, label: "11 may" },
  { semana: 6, label: "15 jun" },
  { semana: 12, label: "27 jul" },
  { semana: 18, label: "7 sep" },
  { semana: 24, label: "19 oct" },
];
const pct = (week: number) => ((week - 1) / TOTAL_SEMANAS) * 100;
const widthPct = (b: Bloque) => ((b.end - b.start + 1) / TOTAL_SEMANAS) * 100;

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
              Lunes 11 de mayo a domingo 25 de octubre 2026. 125 plazas. Claude Enterprise como herramienta única del programa.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="grid md:grid-cols-3 gap-3 mt-10">
              <KPI
                label="Plazas disponibles"
                value="125"
                hint="Toda la plantilla administrativa"
                variant="ink"
              />
              <KPI
                label="Duración total"
                value="24"
                unit="semanas"
                hint="11 may – 25 oct 2026"
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
        <StaggerChildren className="grid md:grid-cols-3 gap-3">
          {[
            {
              big: "94%",
              body: "Del personal ya usa IA al menos una vez. Sin gobernanza ni método.",
              note: "Hoy todo es con cuentas personales y sin protocolo de manejo de información.",
            },
            {
              big: "$5.2M",
              unit: "MXN/año",
              body: "En horas liberables a nivel plantilla.",
              note: "Cada colaborador estima 4.5 horas semanales que podría reasignar a trabajo de mayor valor.",
            },
            {
              big: "3.33 vs 3.02",
              body: "Frecuencia de uso por encima de habilidad real.",
              note: "Usamos la herramienta a un ritmo que rebasa nuestro dominio. De ahí la queja recurrente sobre respuestas imprecisas.",
            },
          ].map((c, i) => (
            <StaggerItem key={i}>
              <div className="bg-bg border border-line p-5 md:p-6 h-full">
                <div className="flex items-baseline gap-2 mb-3">
                  <div className="font-serif-display text-[36px] md:text-[40px] text-accent leading-none font-light">
                    {c.big}
                  </div>
                  {c.unit && (
                    <div className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4">
                      {c.unit}
                    </div>
                  )}
                </div>
                <p className="text-[14px] font-medium text-ink leading-snug">{c.body}</p>
                <p className="mt-1.5 text-[12.5px] text-ink-3 leading-[1.55]">{c.note}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* TU NIVEL */}
      <Section
        title="Tu nivel"
      >
        <StaggerChildren className="grid md:grid-cols-2 gap-3">
          <StaggerItem>
            <div className="bg-bg border border-line border-l-4 border-l-accent p-5 md:p-6 h-full">
              <div className="flex items-baseline justify-between gap-3 mb-3">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-serif-display text-[26px] text-ink leading-none">Básico</span>
                  <span className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4">Nivel 01 · 5 sesiones de 2h</span>
                </div>
                <div className="font-serif-display text-[28px] text-accent leading-none font-light tabular-nums">~70%</div>
              </div>
              <p className="text-[13.5px] text-ink-3 leading-[1.6]">
                Aprendes a usar Claude con método: cómo escribir un buen prompt, cómo evaluar la respuesta, qué información sí y qué no se comparte. Sales con casos concretos de tu área.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="bg-bg border border-line border-l-4 border-l-navy-deep p-5 md:p-6 h-full">
              <div className="flex items-baseline justify-between gap-3 mb-3">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-serif-display text-[26px] text-ink leading-none">Intermedio</span>
                  <span className="font-mono text-[10.5px] uppercase tracking-widest text-ink-4">Nivel 02 · 4 sesiones de 2h</span>
                </div>
                <div className="font-serif-display text-[28px] text-navy-deep leading-none font-light tabular-nums">~30%</div>
              </div>
              <p className="text-[13.5px] text-ink-3 leading-[1.6]">
                Profundizas en flujos avanzados: contexto, memoria, evaluación de outputs y automatización inicial. Te formas como mentor informal de tu dirección durante el challenge.
              </p>
            </div>
          </StaggerItem>
        </StaggerChildren>

        <div className="mt-3 flex items-start gap-3 bg-bg-soft border border-line p-4">
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
          <div className="bg-bg border border-line p-6 md:p-8">
            {/* Eje */}
            <div className="grid grid-cols-[180px_minmax(0,1fr)] gap-4 md:gap-6 mb-6">
              <div className="hidden md:block" />
              <div className="relative h-9 border-b border-line">
                {MARKERS.map((m) => (
                  <div
                    key={m.semana}
                    className="absolute top-0 font-mono text-[10.5px] tracking-widest uppercase text-ink-4 leading-none"
                    style={{
                      left: `${pct(m.semana)}%`,
                      transform: m.semana === 24 ? "translateX(-100%)" : m.semana === 1 ? "none" : "translateX(-50%)",
                    }}
                  >
                    <div>S{m.semana}</div>
                    <div className="text-ink-3 mt-1 normal-case tracking-normal">{m.label}</div>
                  </div>
                ))}
                {MARKERS.map((m) => (
                  <div
                    key={`tick-${m.semana}`}
                    className="absolute bottom-0 w-px h-1.5 bg-line"
                    style={{ left: `${pct(m.semana)}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Filas */}
            <div className="space-y-2.5">
              {BLOQUES.map((b) => (
                <div
                  key={b.id}
                  className="grid grid-cols-[180px_minmax(0,1fr)] gap-4 md:gap-6 items-center"
                >
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-[11px] tracking-widest text-accent font-medium tabular-nums">
                        {b.id}
                      </span>
                      <span className="font-medium text-ink text-[13.5px] truncate">{b.label}</span>
                    </div>
                    <div className="font-mono text-[10.5px] tracking-wide text-ink-3 mt-1">
                      {b.fechas}
                    </div>
                    <div className="font-mono text-[10px] tracking-wide text-ink-4">
                      {b.semanas}
                    </div>
                  </div>
                  <div className="relative h-7 bg-line-soft">
                    <div
                      className={`absolute top-0 bottom-0 ${b.accent ? "bg-accent" : "bg-navy-deep"}`}
                      style={{ left: `${pct(b.start)}%`, width: `${widthPct(b)}%` }}
                    />
                    {b.checkpoints?.map((w) => (
                      <div
                        key={`cp-${w}`}
                        className="absolute top-0 bottom-0 w-0.5 bg-white"
                        style={{ left: `${pct(w)}%` }}
                        title={`Checkpoint S${w}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-[180px_minmax(0,1fr)] gap-4 md:gap-6 mt-5">
              <div className="hidden md:block" />
              <div className="flex items-center gap-4 flex-wrap text-[11.5px] text-ink-3">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-accent" />
                  Acentos del programa
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-navy-deep" />
                  Bloques operativos
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="relative w-3 h-3 bg-accent">
                    <span className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-white" />
                  </span>
                  Checkpoints S14 · S18 · S22
                </span>
              </div>
            </div>

            <p className="mt-5 text-[13px] text-ink-4 leading-[1.55]">
              Inicio lunes 11 de mayo, cierre domingo 25 de octubre. Checkpoints del Challenge: 10 ago, 7 sep y 5 oct. Quien no entrega en checkpoint, sale del ranking. La capacitación intermedia corre en paralelo a la básica de forma intencional.
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
              body: "Las sesiones son tiempo laboral, no personal. Calendario coordinado con cada dirección.",
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
