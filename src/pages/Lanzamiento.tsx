import { useNavigate } from "react-router-dom";
import { Card, CardTitle, SectionTitle } from "../components/ui/Card";
import { KpiCard } from "../components/KpiCard";
import {
  Rocket,
  Users,
  Clock,
  Sparkles,
  BookOpen,
  Trophy,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

const BLOQUES = [
  { id: "B1", label: "Lanzamiento", semanas: "S1 – S2", color: "bg-atisa-grayMid/50" },
  { id: "B2", label: "Capacitación Básico", semanas: "S3 – S7", color: "bg-atisa-red" },
  { id: "B3", label: "Capacitación Intermedio", semanas: "S5 – S8", color: "bg-atisa-red/80" },
  { id: "B4", label: "Mapeo por dirección", semanas: "S8 – S10", color: "bg-atisa-black/80" },
  { id: "B5", label: "Challenge interno", semanas: "S11 – S22", color: "bg-atisa-black" },
  { id: "B6", label: "Premiación", semanas: "S23 – S24", color: "bg-atisa-grayDark" },
];

export function Lanzamiento() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* HERO */}
      <section>
        <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-atisa-red/10 text-atisa-red text-[11px] font-semibold uppercase tracking-widest">
          <Rocket className="w-3 h-3" /> Convocatoria abierta
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-atisa-black tracking-tight leading-tight">
          Programa de Adopción de IA
          <br />
          <span className="text-atisa-red">Atisa 2026</span>
        </h1>
        <p className="text-base text-atisa-grayDark mt-3 max-w-3xl">
          24 semanas para que tu trabajo tenga IA detrás. De mayo a octubre, 200 plazas, una sola
          herramienta corporativa: Claude Enterprise.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
          <KpiCard
            label="Plazas disponibles"
            value={200}
            accent="black"
            icon={<Users className="w-4 h-4" />}
            hint="Toda la plantilla administrativa"
          />
          <KpiCard
            label="Duración total"
            value={24}
            unit="semanas"
            accent="red"
            icon={<Clock className="w-4 h-4" />}
            hint="Mayo a octubre 2026"
          />
          <KpiCard
            label="Herramienta del programa"
            value="Claude"
            unit="Enterprise"
            accent="neutral"
            icon={<Sparkles className="w-4 h-4" />}
            hint="Cuentas corporativas, sin uso personal"
          />
        </div>
      </section>

      {/* POR QUÉ */}
      <section>
        <SectionTitle>Por qué este programa, ahora</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card>
            <div className="text-3xl font-bold text-atisa-red leading-none">94%</div>
            <p className="text-sm text-atisa-black mt-2 font-medium">
              Del personal ya usa IA al menos una vez.
            </p>
            <p className="text-xs text-atisa-grayDark mt-1">
              El uso ya ocurrió. Falta darle gobernanza, método y dirección. Hoy todo es con cuentas
              personales y sin protocolo de manejo de información.
            </p>
          </Card>
          <Card>
            <div className="text-3xl font-bold text-atisa-red leading-none">~$5.2M</div>
            <p className="text-sm text-atisa-black mt-2 font-medium">
              MXN al año en horas liberables a nivel plantilla.
            </p>
            <p className="text-xs text-atisa-grayDark mt-1">
              Cada colaborador estima 4.5 horas semanales que podría reasignar a trabajo de mayor
              valor si tuviera las herramientas de IA adecuadas.
            </p>
          </Card>
          <Card>
            <div className="text-3xl font-bold text-atisa-red leading-none">3.33 vs 3.02</div>
            <p className="text-sm text-atisa-black mt-2 font-medium">
              Frecuencia de uso por encima de habilidad real.
            </p>
            <p className="text-xs text-atisa-grayDark mt-1">
              Usamos la herramienta a un ritmo que rebasa nuestro dominio. Esto explica la queja
              recurrente sobre respuestas imprecisas.
            </p>
          </Card>
        </div>
      </section>

      {/* TU NIVEL */}
      <section>
        <SectionTitle>Tu nivel de partida</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="border-l-4 border-l-atisa-red">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-atisa-grayDark font-semibold">
                  Nivel 01
                </div>
                <div className="text-xl font-bold text-atisa-black">Básico</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-atisa-black">~70%</div>
                <div className="text-[10px] text-atisa-grayDark">de la plantilla</div>
              </div>
            </div>
            <p className="text-sm text-atisa-black font-medium">5 sesiones de 2h, una por semana.</p>
            <p className="text-xs text-atisa-grayDark mt-1">
              Aprendes a usar Claude con método: cómo escribir un buen prompt, cómo evaluar la
              respuesta, qué información sí y qué información no se comparte. Sales con casos
              concretos de tu área.
            </p>
          </Card>

          <Card className="border-l-4 border-l-atisa-black">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-atisa-grayDark font-semibold">
                  Nivel 02
                </div>
                <div className="text-xl font-bold text-atisa-black">Intermedio</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-atisa-black">~30%</div>
                <div className="text-[10px] text-atisa-grayDark">de la plantilla</div>
              </div>
            </div>
            <p className="text-sm text-atisa-black font-medium">4 sesiones de 2h, una por semana.</p>
            <p className="text-xs text-atisa-grayDark mt-1">
              Profundizas en flujos avanzados: contexto, memoria, evaluación de outputs y
              automatización inicial. Te formas como mentor informal de tu dirección durante el
              challenge.
            </p>
          </Card>
        </div>
        <div className="mt-3 flex items-start gap-2 text-xs text-atisa-grayDark bg-atisa-gray rounded-lg p-3">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-atisa-grayDark" />
          <p>
            Tu nivel se asignó según tu respuesta a la encuesta diagnóstica. Si no contestaste, hay
            diagnóstico rápido al momento de inscribirte.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section>
        <SectionTitle>Las 24 semanas</SectionTitle>
        <Card>
          <div className="space-y-2">
            {BLOQUES.map((b) => (
              <div key={b.id} className="flex items-center gap-3">
                <div className="w-12 shrink-0 text-[10px] font-mono font-bold text-atisa-grayDark">
                  {b.id}
                </div>
                <div className="w-44 shrink-0 text-sm font-medium text-atisa-black">{b.label}</div>
                <div className={`h-2 ${b.color} rounded-full flex-1`}></div>
                <div className="w-24 shrink-0 text-right text-xs font-mono text-atisa-grayDark">
                  {b.semanas}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-atisa-grayDark mt-4">
            El challenge (B5) tiene 3 checkpoints mensuales: semanas 14, 18 y 22. Quien no entrega
            reporte de avance en un checkpoint sale del ranking.
          </p>
        </Card>
      </section>

      {/* QUÉ OBTIENES */}
      <section>
        <SectionTitle>Qué obtienes</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Card>
            <Sparkles className="w-5 h-5 text-atisa-red mb-2" />
            <p className="text-sm font-medium text-atisa-black">Acceso a Claude Enterprise</p>
            <p className="text-xs text-atisa-grayDark mt-1">
              Licencia corporativa durante todo el programa, con políticas de manejo de información
              de Atisa.
            </p>
          </Card>
          <Card>
            <Clock className="w-5 h-5 text-atisa-red mb-2" />
            <p className="text-sm font-medium text-atisa-black">Capacitación dentro de tu jornada</p>
            <p className="text-xs text-atisa-grayDark mt-1">
              Las sesiones son tiempo laboral, no personal. Tu jefe ya está enterado del calendario.
            </p>
          </Card>
          <Card>
            <BookOpen className="w-5 h-5 text-atisa-red mb-2" />
            <p className="text-sm font-medium text-atisa-black">Plaza en el challenge</p>
            <p className="text-xs text-atisa-grayDark mt-1">
              Optimizas un proceso real de tu trabajo y mides el resultado en tiempo, calidad o
              costo. Tu dirección compite contra el resto.
            </p>
          </Card>
          <Card>
            <Trophy className="w-5 h-5 text-atisa-red mb-2" />
            <p className="text-sm font-medium text-atisa-black">Premiación y Comité</p>
            <p className="text-xs text-atisa-grayDark mt-1">
              El programa cierra con premiación. La naturaleza del premio se anuncia con la
              convocatoria oficial. Los ganadores forman el Comité Interno de IA.
            </p>
          </Card>
        </div>
      </section>

      {/* REGLAS */}
      <section>
        <SectionTitle>Reglas del programa</SectionTitle>
        <Card>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-atisa-red shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-atisa-black">Asistencia mínima</p>
                <p className="text-xs text-atisa-grayDark">
                  4 de 5 sesiones para Básico, 3 de 4 para Intermedio. Bajo este umbral pierdes
                  plaza en el challenge.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-atisa-red shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-atisa-black">Checkpoints mensuales</p>
                <p className="text-xs text-atisa-grayDark">
                  Tres entregas durante el challenge. Si no entregas en un checkpoint, sales del
                  ranking individual y de tu dirección.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-atisa-red shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-atisa-black">
                  Política de seguridad de información
                </p>
                <p className="text-xs text-atisa-grayDark">
                  TI publica el documento con qué datos sí y qué datos no se comparten con Claude
                  antes de la primera sesión. Es parte del onboarding.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* CÓMO TE INSCRIBES */}
      <section>
        <SectionTitle>Cómo te inscribes</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              n: "01",
              title: "Confirmas inscripción",
              body: "Recibes un correo con un formulario de 2 minutos. Confirmas tu nivel asignado o pides el diagnóstico rápido si no respondiste la encuesta.",
            },
            {
              n: "02",
              title: "Recibes calendario",
              body: "Te llega tu calendario de sesiones con sala, horario y grupo. Si hay choque con una junta, lo reportas al punto único de TI.",
            },
            {
              n: "03",
              title: "Asistes a la primera",
              body: "La primera sesión arranca con la postura de seguridad de información, configuración de tu cuenta de Claude Enterprise y prompts base.",
            },
          ].map((step) => (
            <Card key={step.n}>
              <div className="text-[10px] font-mono font-bold text-atisa-red tracking-widest">
                PASO {step.n}
              </div>
              <p className="text-base font-semibold text-atisa-black mt-1">{step.title}</p>
              <p className="text-xs text-atisa-grayDark mt-2 leading-relaxed">{step.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA + DUDAS */}
      <section>
        <Card className="bg-atisa-black text-white border-none">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle>
                <span className="text-white">¿Quieres ver el diagnóstico completo?</span>
              </CardTitle>
              <p className="text-sm text-white/80">
                El dashboard tiene los hallazgos por dirección, los procesos prioritarios que la
                gente ya identificó y el top de campeones detectados.
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 bg-atisa-red hover:bg-atisa-red/90 text-white font-semibold text-sm px-4 py-2 rounded-md transition-colors"
            >
              Abrir dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <Card>
            <CardTitle subtitle="Punto único de contacto">Dudas y soporte</CardTitle>
            <p className="text-sm text-atisa-black">
              TI · <span className="text-atisa-grayDark">[pendiente nombre y correo]</span>
            </p>
            <p className="text-xs text-atisa-grayDark mt-1">
              Respuesta a dudas de acceso o configuración en menos de 4 horas hábiles.
            </p>
          </Card>
          <Card>
            <CardTitle subtitle="Antes del lanzamiento">Sesiones de Q&amp;A</CardTitle>
            <p className="text-sm text-atisa-black">
              Calendario: <span className="text-atisa-grayDark">[pendiente]</span>
            </p>
            <p className="text-xs text-atisa-grayDark mt-1">
              Sesiones abiertas para preguntar lo que quieras del programa antes de inscribirte. Sin
              compromiso.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
