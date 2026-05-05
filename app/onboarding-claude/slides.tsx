"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import {
  BookOpen,
  Shield,
  MessageCircleQuestion,
  Bike,
  Car,
  Truck,
  Code2,
  FolderKanban,
  Brain,
  Paperclip,
  Check,
  X,
  Download,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/cn";

const TOTAL = 17;

const SPRING = { type: "spring" as const, stiffness: 300, damping: 26 };
const HOVER = { y: -3, transition: { type: "spring" as const, stiffness: 400, damping: 17 } };

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: SPRING },
};

function BigNumeral({ n, dark = false }: { n: number; dark?: boolean }) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      className={cn(
        "pointer-events-none absolute -top-4 -right-2 md:-top-8 md:-right-4 font-serif-display font-light leading-[0.85] select-none tabular-nums",
        "text-[180px] md:text-[280px]",
        dark ? "text-accent/[0.10]" : "text-accent/[0.08]"
      )}
    >
      {String(n).padStart(2, "0")}
    </motion.div>
  );
}

function VerticalRule({ num, dark = false }: { num: number; dark?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "hidden md:flex pointer-events-none absolute right-3 top-0 bottom-0 flex-col items-center justify-between py-10 select-none",
        dark ? "text-white/25" : "text-ink-4/60"
      )}
    >
      <div className="font-mono text-[8.5px] tracking-[0.25em] uppercase rotate-180 [writing-mode:vertical-rl]">
        Atisa · IA
      </div>
      <div className="w-px flex-1 my-4 bg-current opacity-30" />
      <div className="font-mono text-[9px] tracking-[0.18em] uppercase">
        {String(num).padStart(2, "0")}/{TOTAL}
      </div>
    </div>
  );
}

function PaperGrain({ dark = false }: { dark?: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
      style={{
        backgroundImage: dark
          ? "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"
          : "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      }}
    />
  );
}

function SlideShell({
  children,
  variant = "default",
  num,
  total = TOTAL,
  tag,
  bigNumeral = true,
}: {
  children: ReactNode;
  variant?: "default" | "cover" | "dark";
  num?: number;
  total?: number;
  tag?: string;
  bigNumeral?: boolean;
}) {
  const isDark = variant === "cover" || variant === "dark";
  return (
    <section
      className={cn(
        "page-container relative overflow-hidden",
        isDark ? "bg-ink text-white" : "bg-bg text-ink",
        "py-14 md:py-16 min-h-[68vh] flex flex-col"
      )}
    >
      {isDark && <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent" />}
      <PaperGrain dark={isDark} />
      {bigNumeral && num && variant !== "cover" && <BigNumeral n={num} dark={isDark} />}
      {num && <VerticalRule num={num} dark={isDark} />}
      {tag && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-[11px] uppercase tracking-widest font-medium mb-6 text-accent relative z-10"
        >
          {tag}
        </motion.div>
      )}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col relative z-10"
      >
        {children}
      </motion.div>
      {num && total && (
        <div
          className={cn(
            "font-mono text-[10px] uppercase tracking-widest mt-10 relative z-10",
            isDark ? "text-white/40" : "text-ink-4"
          )}
        >
          {String(num).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      )}
    </section>
  );
}

// 01 Portada
const Slide01 = (
  <section className="relative bg-ink text-white min-h-[80vh] flex flex-col overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center opacity-40"
      style={{ backgroundImage: "url('/onboarding-cover.jpg')" }}
      aria-hidden
    />
    <div className="absolute inset-0 bg-ink/60" aria-hidden />
    <PaperGrain dark />
    <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent" />
    <BigNumeral n={1} dark />
    <VerticalRule num={1} dark />

    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="page-container relative z-10 py-16 md:py-20 flex-1 flex flex-col"
    >
      <motion.div variants={item} className="font-mono text-[11.5px] tracking-widest uppercase text-accent font-medium mb-7">
        Onboarding del equipo · 30 min
      </motion.div>
      <motion.h1 variants={item} className="font-serif-display font-light text-[48px] md:text-[88px] leading-[1.02] tracking-[-0.025em] text-white max-w-[920px]">
        Claude en <strong className="text-accent font-medium">Atisa</strong>.
      </motion.h1>
      <motion.p variants={item} className="text-white/75 text-[18px] md:text-[20px] mt-8 max-w-[680px] leading-[1.5]">
        Una sesión corta para que sepas qué es Claude, cómo se redacta un prompt y qué puedes hacer con él el mismo día.
      </motion.p>
      <motion.div variants={item} className="mt-auto pt-16 flex justify-between items-end font-mono text-[12px] tracking-widest uppercase text-white/60">
        <span>Atisa Group · Mayo 2026</span>
        <span>Programa de Adopción de IA</span>
      </motion.div>
    </motion.div>
  </section>
);

// 02 Qué hay aquí — agenda concreta
const Slide02 = (
  <SlideShell tag="Qué hay aquí · 2 min" num={2}>
    <motion.h2 variants={item} className="font-serif-display text-[40px] md:text-[60px] leading-[1.06] text-ink max-w-[900px] font-light">
      30 minutos. <strong className="font-medium">5 partes.</strong>
      <br />Lo que verás en la sesión.
    </motion.h2>
    <motion.p variants={item} className="text-[16px] md:text-[17px] text-ink-3 mt-6 max-w-[760px] leading-[1.6]">
      Cero tecnicismos sin razón. Cada parte cierra con algo concreto que puedes aplicar el mismo día.
    </motion.p>
    <div className="mt-12 grid md:grid-cols-5 gap-0 max-w-[1100px] border-t border-line">
      {[
        ["5 min", "Qué es Claude", "Qué hace, qué no hace, quién está detrás."],
        ["10 min", "El prompt", "El modelo de redacción y los 4 bloques que vamos a usar."],
        ["5 min", "Qué hay dentro", "3 modelos, Proyectos, Artifacts, Memoria."],
        ["5 min", "Cómo se trabaja", "Iterar, qué información va y qué no."],
        ["5 min", "Tu primera tarea", "Caso real conectado a tu trabajo."],
      ].map(([time, title, body], i) => (
        <motion.div
          key={title}
          variants={item}
          className={cn(
            "py-6 px-5",
            i > 0 && "md:border-l border-line",
            i === 0 && "md:pl-0"
          )}
        >
          <div className="font-mono text-[10.5px] tracking-widest uppercase text-accent font-medium mb-3">
            {String(i + 1).padStart(2, "0")} · {time}
          </div>
          <div className="font-medium text-ink text-[15.5px] mb-2 leading-[1.3]">{title}</div>
          <div className="text-[13px] text-ink-3 leading-[1.55]">{body}</div>
        </motion.div>
      ))}
    </div>
  </SlideShell>
);

// 03 Claude en una frase — actualizado, sin "millones de libros"
const Slide03 = (
  <SlideShell tag="Parte 1 · Qué es Claude" num={3}>
    <motion.div variants={item} className="font-mono text-[11px] tracking-widest uppercase text-ink-4 mb-3">
      Claude en una frase
    </motion.div>
    <motion.h2 variants={item} className="font-serif-display text-[40px] md:text-[60px] leading-[1.08] text-ink max-w-[1000px] font-light">
      Razona, escribe y trabaja{" "}
      <strong className="font-medium text-accent">contigo</strong>.
    </motion.h2>
    <motion.p variants={item} className="text-[18px] md:text-[20px] text-ink-2 mt-10 max-w-[820px] leading-[1.55]">
      No es buscador. No te devuelve enlaces. Lee tu material, razona sobre tu caso y entrega un borrador, un análisis, código o un correo. Listo para revisar.
    </motion.p>
    <div className="mt-12 grid md:grid-cols-3 gap-0 max-w-[960px] border-t border-line">
      {[
        ["Conversa", "Sostiene la conversación. No es un solo turno de pregunta y respuesta."],
        ["Procesa contexto largo", "Hasta el equivalente a un libro completo en una sola entrada."],
        ["Reconoce cuándo no sabe", "Más que el promedio del mercado. No siempre, pero más."],
      ].map(([title, body], i) => (
        <motion.div
          key={title}
          variants={item}
          className={cn(
            "py-6 px-5",
            i > 0 && "md:border-l border-line",
            i === 0 && "md:pl-0"
          )}
        >
          <div className="font-mono text-[10px] tracking-widest uppercase text-accent font-medium mb-3">
            {String(i + 1).padStart(2, "0")}
          </div>
          <div className="font-medium text-ink text-[15.5px] mb-2">{title}</div>
          <div className="text-[13px] text-ink-3 leading-[1.6]">{body}</div>
        </motion.div>
      ))}
    </div>
  </SlideShell>
);

// 04 Quién está detrás — con contexto vs OpenAI / Google
const Slide04 = (
  <SlideShell tag="Parte 1 · Qué es Claude" num={4}>
    <motion.h2 variants={item} className="font-serif-display text-[40px] md:text-[60px] leading-[1.08] text-ink font-light max-w-[900px]">
      Detrás está <strong className="font-medium">Anthropic</strong>.
    </motion.h2>
    <motion.p variants={item} className="text-[18px] md:text-[19px] text-ink-2 mt-8 max-w-[820px] leading-[1.55]">
      La carrera la mueven tres laboratorios. Cada uno con un énfasis distinto. Anthropic es el que va al frente cuando la prioridad es seguridad y razonamiento sostenido.
    </motion.p>

    <div className="mt-10 grid md:grid-cols-3 gap-0 max-w-[1000px] border-t border-line">
      {[
        {
          name: "OpenAI",
          model: "ChatGPT",
          tag: "Pionero comercial",
          body: "Abrió el mercado en 2022. Producto de gran masa, fuerte en multimodal e imagen.",
          highlight: false,
        },
        {
          name: "Anthropic",
          model: "Claude",
          tag: "Lidera la carrera",
          body: "Fundada en 2021 por exinvestigadores de OpenAI. Prioridad declarada: seguridad de IA. Hoy referencia en razonamiento, código y contextos largos.",
          highlight: true,
        },
        {
          name: "Google",
          model: "Gemini",
          tag: "Integración total",
          body: "Apuesta a integrarse con Workspace, Search y Android. Fuerte en buscar, débil en mantener foco.",
          highlight: false,
        },
      ].map(({ name, model, tag, body, highlight }, i) => (
        <motion.div
          key={name}
          variants={item}
          className={cn(
            "py-6 px-5 relative",
            i > 0 && "md:border-l border-line",
            i === 0 && "md:pl-0",
            highlight && "bg-accent/[0.04]"
          )}
        >
          {highlight && <div className="absolute top-0 left-0 right-0 md:left-0 h-[2px] bg-accent" />}
          <div className={cn("font-mono text-[10px] tracking-widest uppercase mb-3 font-medium", highlight ? "text-accent" : "text-ink-4")}>
            {tag}
          </div>
          <div className="font-medium text-ink text-[16.5px]">{name}</div>
          <div className="font-mono text-[10.5px] tracking-widest uppercase text-ink-4 mt-0.5 mb-3">
            {model}
          </div>
          <p className="text-[13px] text-ink-3 leading-[1.6]">{body}</p>
        </motion.div>
      ))}
    </div>

    <motion.div variants={item} className="mt-10 border-l-2 border-accent pl-6 max-w-[760px]">
      <p className="font-serif-display text-[20px] md:text-[24px] italic text-ink leading-[1.4] font-light">
        &ldquo;Un auto muy rápido que también tiene los mejores frenos del mercado.&rdquo;
      </p>
      <div className="font-mono text-[10.5px] tracking-widest uppercase text-ink-4 mt-3">
        Enrique Rocha · Sobre Anthropic
      </div>
    </motion.div>
  </SlideShell>
);

// 05 Por qué Atisa eligió Claude — 6 razones
const Slide05 = (
  <SlideShell tag="Parte 1 · Qué es Claude" num={5}>
    <motion.h2 variants={item} className="font-serif-display text-[36px] md:text-[52px] leading-[1.08] text-ink font-light max-w-[900px]">
      Por qué Atisa eligió <strong className="font-medium">Claude</strong>.
    </motion.h2>
    <motion.p variants={item} className="text-[15.5px] text-ink-3 mt-5 max-w-[760px] leading-[1.6]">
      Seis razones concretas. No son marketing, son lo que cambia cuando lo usas en trabajo real.
    </motion.p>
    <div className="mt-10 grid md:grid-cols-3 gap-3">
      {[
        {
          icon: BookOpen,
          title: "Lee textos largos",
          body: "Su ventana de contexto admite el equivalente a un libro de 750 mil palabras. Le pegas un contrato, un manual operativo o una semana de correos, y los procesa de un solo bocado.",
        },
        {
          icon: Brain,
          title: "Razona mejor",
          body: "Tiene modo de pensamiento extendido para problemas largos. Mantiene el hilo cuando los demás se pierden. En benchmarks de razonamiento y código, hoy es la referencia.",
        },
        {
          icon: MessageCircleQuestion,
          title: "Suena más humano",
          body: "Tono claro, matiza cuando hace falta y reconoce cuándo no sabe. No siempre, pero más que el promedio. Eso te ahorra verificar cosas que ya estaban mal de origen.",
        },
        {
          icon: Shield,
          title: "Seguridad por diseño",
          body: "Anthropic puso la seguridad antes que la velocidad. Para una empresa que maneja datos de clientes, esa diferencia se nota.",
        },
        {
          icon: Code2,
          title: "Artifacts y proyectos",
          body: "Genera mini-aplicaciones dentro del chat y agrupa conversaciones con contexto compartido. No es solo respuesta, es entrega.",
        },
        {
          icon: FolderKanban,
          title: "Conecta con tus herramientas",
          body: "MCP y conectores lo enlazan con tus archivos, sistemas y plataformas. Empieza con chat, escala a flujo de trabajo.",
        },
      ].map(({ icon: Icon, title, body }) => (
        <motion.div
          key={title}
          variants={item}
          whileHover={HOVER}
          className="border border-line bg-bg-soft p-5 transition-colors hover:border-ink shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
        >
          <Icon className="w-5 h-5 text-accent mb-4" strokeWidth={1.5} />
          <h3 className="font-medium text-[16px] text-ink mb-1.5">{title}</h3>
          <p className="text-[13px] text-ink-3 leading-[1.55]">{body}</p>
        </motion.div>
      ))}
    </div>
  </SlideShell>
);

// 06 Lo que Claude no es
const Slide06 = (
  <SlideShell tag="Parte 1 · Qué es Claude" num={6}>
    <motion.h2 variants={item} className="font-serif-display text-[36px] md:text-[52px] leading-[1.1] text-ink font-light max-w-[900px]">
      Lo que <strong className="font-medium">no</strong> es Claude.
    </motion.h2>
    <motion.p variants={item} className="text-[16px] text-ink-3 mt-6 max-w-[760px] leading-[1.6]">
      Importa saberlo desde el principio. Si esperas algo que no puede dar, te frustras y la herramienta termina archivada.
    </motion.p>
    <div className="mt-10 max-w-[900px]">
      {[
        ["No te conoce", "Solo sabe lo que escribes en la conversación. Si no le das contexto sobre ti, tu proyecto o tu cliente, no lo tiene."],
        ["No siente", "No tiene consciencia ni emociones. Que escriba con tono cálido no significa que esté de buenas."],
        ["No recuerda solo", "Cada conversación arranca en blanco salvo que actives memoria o uses Proyectos."],
        ["Alucina", "A veces se inventa datos con seguridad. Hechos, cifras y citas hay que verificarlos siempre."],
        ["Tiene fecha de corte", "Su entrenamiento terminó en una fecha. No conoce noticias posteriores a menos que se las pegues."],
      ].map(([title, body]) => (
        <motion.div key={title} variants={item} className="grid grid-cols-[24px_1fr] gap-5 py-4 border-b border-line">
          <X className="w-4 h-4 text-accent mt-1" strokeWidth={2} />
          <div>
            <h3 className="text-[16px] font-medium text-ink">{title}</h3>
            <p className="text-[14px] text-ink-3 mt-0.5 leading-[1.55]">{body}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </SlideShell>
);

// 07 La regla de oro
const Slide07 = (
  <SlideShell tag="Parte 2 · El prompt" num={7} variant="dark">
    <motion.div variants={item} className="font-mono text-[11px] tracking-widest uppercase text-white/50 mb-4">
      La regla de oro
    </motion.div>
    <motion.h2 variants={item} className="font-serif-display text-[40px] md:text-[60px] leading-[1.08] text-white font-light max-w-[1100px]">
      Si un compañero <strong className="text-accent font-medium">que no conoce la tarea</strong> se confundiría con tu mensaje,
      <br />Claude también.
    </motion.h2>
    <motion.p variants={item} className="text-[18px] md:text-[20px] text-white/75 mt-10 max-w-[760px] leading-[1.55]">
      Claude no está dentro de tu cabeza. No sabe a quién le escribes, qué proyecto traes, qué reportaste ayer. Lo que no escribes, no existe para él.
    </motion.p>
    <motion.p variants={item} className="text-[15px] text-white/55 mt-6 max-w-[760px] leading-[1.6]">
      Casi todo lo que vas a aprender en las próximas sesiones es cómo darle ese contexto sin escribir un libro.
    </motion.p>
  </SlideShell>
);

// 08 Vago vs claro — escena de oficina
const Slide08 = (
  <SlideShell tag="Parte 2 · El prompt" num={8}>
    <motion.h2 variants={item} className="font-serif-display text-[36px] md:text-[52px] leading-[1.08] text-ink font-light max-w-[900px]">
      Vago contra <strong className="font-medium">claro</strong>.
    </motion.h2>
    <motion.p variants={item} className="text-[16px] text-ink-3 mt-6 max-w-[820px] leading-[1.6]">
      Igual que cuando le pides un favor a un compañero. Si la petición está vaga, regresa a preguntarte tres veces o te entrega algo que no sirve. Si está específica, lo hace y sigue con su día.
    </motion.p>
    <div className="mt-12 grid md:grid-cols-2 gap-0 max-w-[1100px]">
      <motion.div variants={item} className="border border-line p-7 bg-bg-soft">
        <div className="font-mono text-[10.5px] tracking-widest uppercase text-ink-4 mb-3">
          Vago
        </div>
        <p className="font-serif-display text-[20px] md:text-[24px] text-ink-3 leading-[1.4] italic font-light">
          &ldquo;Échame la mano con la presentación.&rdquo;
        </p>
        <div className="mt-6 pt-5 border-t border-line text-[13px] text-ink-3 leading-[1.65]">
          ¿Qué presentación, para quién, hasta cuándo, qué parte? El compañero adivina. Te entrega algo que tienes que rehacer, o regresa a preguntarte. Aplicado a Claude: <span className="text-ink-2">&ldquo;Hazme un correo para el cliente.&rdquo;</span>
        </div>
      </motion.div>
      <motion.div variants={item} className="border border-line border-l-0 p-7 bg-bg shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="font-mono text-[10.5px] tracking-widest uppercase text-accent mb-3 font-medium">
          Claro
        </div>
        <p className="font-serif-display text-[19px] md:text-[22px] text-ink leading-[1.4] font-light">
          &ldquo;Métele las 3 gráficas de ingresos Q2 al deck del lunes, mismo formato del trimestre pasado, antes de comer.&rdquo;
        </p>
        <div className="mt-6 pt-5 border-t border-line text-[13px] text-ink-2 leading-[1.65]">
          Sabe qué, sobre qué, con qué referencia y para cuándo. Lo hace y sigue. Aplicado a Claude: <span className="text-ink">&ldquo;Redacta un correo de 5 líneas a la Ing. Méndez de Pemex avisando retraso de 3 días en el puente Ruta 12, tono cordial pero firme, sin disculpas excesivas.&rdquo;</span>
        </div>
      </motion.div>
    </div>
  </SlideShell>
);

// 09 Los 4 bloques — un prompt completo, anatomía marcada
const Slide09 = (
  <SlideShell tag="Parte 2 · El prompt" num={9}>
    <motion.h2 variants={item} className="font-serif-display text-[36px] md:text-[52px] leading-[1.08] text-ink font-light max-w-[900px]">
      Los 4 bloques de un <strong className="font-medium">buen prompt</strong>.
    </motion.h2>
    <motion.p variants={item} className="text-[15.5px] text-ink-3 mt-5 max-w-[860px] leading-[1.6]">
      Un prompt largo y bien armado vale más que cinco iteraciones cortas. Mira cómo se ven los 4 bloques en un prompt real. En negritas, lo que define cada bloque.
    </motion.p>

    <motion.div variants={item} className="mt-8 grid md:grid-cols-4 gap-0 max-w-[1180px] border-t border-line">
      {[
        ["Rol", "Quién quieres que sea"],
        ["Contexto", "Qué situación rodea la tarea"],
        ["Tarea", "Qué quieres que haga"],
        ["Formato", "Cómo quieres el resultado"],
      ].map(([title, sub], i) => (
        <div
          key={title}
          className={cn(
            "py-5 px-5",
            i > 0 && "md:border-l border-line",
            i === 0 && "md:pl-0"
          )}
        >
          <div className="font-mono text-[10.5px] tracking-widest uppercase text-accent font-medium mb-2">
            {String(i + 1).padStart(2, "0")} · {title}
          </div>
          <div className="text-[13px] text-ink-3 leading-[1.55]">{sub}</div>
        </div>
      ))}
    </motion.div>

    <motion.div variants={item} className="mt-8 max-w-[1180px] bg-ink text-white p-8 md:p-9 shadow-[0_8px_30px_rgba(0,0,0,0.14)]">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/15">
        <div className="font-mono text-[10.5px] tracking-widest uppercase text-accent font-medium">
          Anatomía de un prompt
        </div>
        <div className="font-mono text-[9.5px] tracking-widest uppercase text-white/40">
          Caso real · obra Atisa
        </div>
      </div>

      <div className="space-y-7 text-[13.5px] leading-[1.75] font-mono text-white/75">
        <div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-accent mb-2">
            [ 01 · Rol ]
          </div>
          <p>
            <strong className="text-white font-medium">Eres ingeniero residente con 10 años en obra industrial pesada en México</strong>. Has manejado clientes como Pemex, CFE y constructoras grandes. Conoces los formatos de reporte que esperan, los plazos que sí se respetan y cuándo conviene dar contexto extra al cliente. No te disculpas de más ni endulzas problemas técnicos.
          </p>
        </div>

        <div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-accent mb-2">
            [ 02 · Contexto ]
          </div>
          <p>
            Pemex pidió actualización semanal del puente Ruta 12, sección 4 a 7. <strong className="text-white font-medium">Llevamos 3 días de retraso por lluvia atípica que paró la cimentación</strong>. El cliente ya está nervioso por dos retrasos previos en el mismo trimestre. La supervisora es la Ing. Méndez, formal pero técnica. El correo lo va a ver también su jefe, así que importa que se lea profesional.
          </p>
        </div>

        <div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-accent mb-2">
            [ 03 · Tarea ]
          </div>
          <p>
            <strong className="text-white font-medium">Redacta el correo de avance semanal para la Ing. Méndez</strong>. Incluye: estado real de la sección 4 a 7, causa del retraso, plan para recuperar 1.5 días la próxima semana, y qué decisión necesitamos del cliente para el próximo lunes. No incluyas comparativos contra el plan original ni proyecciones a 3 meses.
          </p>
        </div>

        <div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-accent mb-2">
            [ 04 · Formato ]
          </div>
          <p>
            <strong className="text-white font-medium">Máximo 9 líneas. Tono cordial pero firme, sin disculpas excesivas. Sin viñetas</strong>. Saludo formal con vocativo a la Ing. Méndez. Despedida estándar firmando como Residente de Obra. Que se pueda leer en 30 segundos.
          </p>
        </div>
      </div>
    </motion.div>

    <motion.p variants={item} className="mt-6 text-[13px] text-ink-3 max-w-[860px] leading-[1.6]">
      Esto es lo que se pega en Claude, completo, en un solo mensaje. Las negritas no se mandan, son sólo para que aquí veas qué frase ataca cada bloque.
    </motion.p>
  </SlideShell>
);

// 10 El poder del contexto — analogía workplace
const Slide10 = (
  <SlideShell tag="Parte 2 · El prompt" num={10}>
    <motion.h2 variants={item} className="font-serif-display text-[36px] md:text-[52px] leading-[1.08] text-ink font-light max-w-[900px]">
      El <strong className="font-medium">contexto</strong> cambia todo.
    </motion.h2>
    <motion.p variants={item} className="text-[16px] text-ink-3 mt-6 max-w-[820px] leading-[1.6]">
      Es la diferencia entre encargarle algo a un colaborador nuevo y encargárselo a alguien que ya conoce el caso.
    </motion.p>
    <div className="mt-10 grid md:grid-cols-2 gap-0 max-w-[1100px]">
      <motion.div variants={item} className="border border-line p-7 bg-bg-soft">
        <div className="font-mono text-[10.5px] tracking-widest uppercase text-ink-4 mb-4">
          Sin contexto
        </div>
        <p className="text-[16px] text-ink-2 leading-[1.55] font-serif-display italic font-light">
          &ldquo;Hazme el reporte semanal.&rdquo;
        </p>
        <div className="mt-5 pt-5 border-t border-line text-[13px] text-ink-3 leading-[1.65]">
          Te entrega un reporte genérico. Adivinó el formato, el tono, qué resaltar. Tú lo rehaces. La próxima semana, lo mismo.
        </div>
      </motion.div>
      <motion.div variants={item} className="border border-line border-l-0 p-7 bg-bg shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="font-mono text-[10.5px] tracking-widest uppercase text-accent mb-4 font-medium">
          Con contexto
        </div>
        <p className="text-[14.5px] text-ink leading-[1.6] font-serif-display italic font-light">
          &ldquo;Hazme el reporte semanal. Va al Director de Operaciones, lo lee en 5 minutos antes de la junta del lunes. Lo que le interesa: avance contra plan, riesgos nuevos y decisiones que necesita tomar él. Una página, sin viñetas, lenguaje técnico está bien. No incluyas detalle operativo del día a día.&rdquo;
        </p>
        <div className="mt-5 pt-5 border-t border-line text-[13px] text-ink-2 leading-[1.65]">
          Ahora puede hacerlo sin que lo revises. Y la próxima semana, tampoco te necesita: aprendió a quién va dirigido, qué importa y qué dejar fuera.
        </div>
      </motion.div>
    </div>
    <motion.p variants={item} className="text-[15px] text-ink-3 mt-10 max-w-[920px] leading-[1.6]">
      Con Claude pasa igual. Si le explicas a quién va, qué importa y qué dejar fuera, te entrega trabajo que no tienes que reescribir. Si solo le das la orden, obedece esta vez y falla la siguiente cuando la situación cambia.
    </motion.p>
  </SlideShell>
);

// 11 Mostrar es mejor que explicar — escena de oficina
const Slide11 = (
  <SlideShell tag="Parte 2 · El prompt" num={11}>
    <motion.h2 variants={item} className="font-serif-display text-[36px] md:text-[52px] leading-[1.08] text-ink font-light max-w-[900px]">
      Mostrar gana a <strong className="font-medium">explicar</strong>.
    </motion.h2>
    <motion.p variants={item} className="text-[16px] text-ink-3 mt-6 max-w-[860px] leading-[1.6]">
      Cuando le explicas a un colaborador nuevo el formato del reporte mensual, puedes describirlo con palabras o puedes mandarle el del mes pasado y decirle &ldquo;sigue este&rdquo;. El ejemplo es más rápido y no falla.
    </motion.p>
    <motion.div variants={item} className="mt-10 max-w-[900px]">
      <div className="font-mono text-[10.5px] tracking-widest uppercase text-accent mb-4 font-medium">
        Cómo se ve en un prompt
      </div>
      <div className="border border-line bg-bg-soft p-6 font-mono text-[12.5px] text-ink-2 leading-[1.7] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div>Clasifica las quejas como crítica, sugerencia o consulta.</div>
        <div className="mt-3 text-ink-3">Ejemplos:</div>
        <div className="mt-1 pl-3">&ldquo;El sistema lleva 2 horas caído&rdquo; → <span className="text-accent">crítica</span></div>
        <div className="pl-3">&ldquo;Sería bueno tener modo oscuro&rdquo; → <span className="text-accent">sugerencia</span></div>
        <div className="pl-3">&ldquo;¿Cómo cambio mi contraseña?&rdquo; → <span className="text-accent">consulta</span></div>
        <div className="mt-3">Clasifica esta: &ldquo;La búsqueda no encuentra mis archivos.&rdquo;</div>
      </div>
    </motion.div>
    <motion.p variants={item} className="text-[14px] text-ink-3 mt-6 max-w-[820px] leading-[1.6]">
      Dos o tres ejemplos suelen bastar. A esto se le llama few-shot y es la forma más confiable de enseñarle un patrón nuevo.
    </motion.p>
  </SlideShell>
);

// 12 Los 3 modelos
const Slide12 = (
  <SlideShell tag="Parte 3 · Qué hay dentro" num={12}>
    <motion.h2 variants={item} className="font-serif-display text-[36px] md:text-[52px] leading-[1.1] text-ink font-light max-w-[900px]">
      Tres modelos. <strong className="font-medium">Tres vehículos.</strong>
    </motion.h2>
    <motion.p variants={item} className="text-[16px] text-ink-3 mt-6 max-w-[760px] leading-[1.6]">
      Claude no es un solo modelo, son varios. Cada uno con un balance distinto entre rapidez, costo y profundidad.
    </motion.p>
    <div className="mt-10 grid md:grid-cols-3 gap-3">
      {[
        {
          icon: Bike,
          name: "Haiku",
          tag: "Motocicleta",
          desc: "Rápido y barato. Para tareas simples y de mucho volumen.",
          when: "Resúmenes cortos, clasificar correos, extracciones rápidas.",
          highlight: false,
        },
        {
          icon: Car,
          name: "Sonnet",
          tag: "Auto familiar",
          desc: "El equilibrado. Buena profundidad sin pagar de más.",
          when: "Por defecto. La mayoría del trabajo cotidiano.",
          highlight: true,
        },
        {
          icon: Truck,
          name: "Opus",
          tag: "Camión",
          desc: "El más potente. Más lento y más caro. Razona mejor en problemas largos.",
          when: "Análisis complejos, contratos largos, código difícil.",
          highlight: false,
        },
      ].map(({ icon: Icon, name, tag, desc, when, highlight }) => (
        <motion.div
          key={name}
          variants={item}
          whileHover={HOVER}
          className={cn(
            "border p-6 transition-colors",
            highlight
              ? "border-accent border-l-[3px] bg-bg shadow-[0_4px_18px_rgba(215,38,28,0.08)]"
              : "border-line bg-bg-soft shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          )}
        >
          <div className="flex items-center justify-between mb-5">
            <Icon className="w-6 h-6 text-ink" strokeWidth={1.5} />
            {highlight && (
              <span className="font-mono text-[9.5px] tracking-widest uppercase text-accent font-medium px-2 py-0.5 border border-accent">
                Por defecto
              </span>
            )}
          </div>
          <div className="font-medium text-[18px] text-ink">{name}</div>
          <div className="font-mono text-[10.5px] tracking-widest uppercase text-ink-4 mt-0.5 mb-4">
            {tag}
          </div>
          <p className="text-[13.5px] text-ink-2 leading-[1.55]">{desc}</p>
          <div className="mt-4 pt-4 border-t border-line text-[12.5px] text-ink-3 leading-[1.55]">
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink-4 block mb-1">
              Cuándo
            </span>
            {when}
          </div>
        </motion.div>
      ))}
    </div>
    <motion.p variants={item} className="text-[14px] text-ink-3 mt-8 max-w-[760px] leading-[1.6]">
      Recomendación: empieza siempre con Sonnet. Solo subes a Opus si la tarea no se resuelve. Casi nunca necesitas Opus.
    </motion.p>
  </SlideShell>
);

// 13 Más allá del chat
const Slide13 = (
  <SlideShell tag="Parte 3 · Qué hay dentro" num={13}>
    <motion.h2 variants={item} className="font-serif-display text-[36px] md:text-[52px] leading-[1.1] text-ink font-light max-w-[900px]">
      Más allá del <strong className="font-medium">chat</strong>.
    </motion.h2>
    <motion.p variants={item} className="text-[16px] text-ink-3 mt-6 max-w-[760px] leading-[1.6]">
      Claude.ai es más que la caja de texto. Hay cuatro cosas que cambian cómo trabajas.
    </motion.p>
    <div className="mt-10 grid md:grid-cols-2 gap-3 max-w-[900px]">
      {[
        {
          icon: Code2,
          title: "Artifacts",
          body: "Mini-aplicaciones dentro del chat. Un dashboard, un calculador, una página, todo en una conversación.",
        },
        {
          icon: FolderKanban,
          title: "Proyectos",
          body: "Conversaciones agrupadas con contexto compartido. Como un colaborador al que ya le explicaste las reglas del puesto.",
        },
        {
          icon: Brain,
          title: "Memoria",
          body: "Recuerda preferencias entre conversaciones. Útil para no repetir tu rol y tu contexto cada vez.",
        },
        {
          icon: Paperclip,
          title: "Archivos",
          body: "PDFs, hojas, imágenes, audio. Le pegas el documento y lo procesa entero.",
        },
      ].map(({ icon: Icon, title, body }) => (
        <motion.div
          key={title}
          variants={item}
          whileHover={HOVER}
          className="border border-line bg-bg-soft p-6 transition-colors hover:border-ink shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
        >
          <Icon className="w-5 h-5 text-accent mb-4" strokeWidth={1.5} />
          <h3 className="font-medium text-[16.5px] text-ink mb-1.5">{title}</h3>
          <p className="text-[13.5px] text-ink-3 leading-[1.6]">{body}</p>
        </motion.div>
      ))}
    </div>
  </SlideShell>
);

// 14 Iterar es conversación
const Slide14 = (
  <SlideShell tag="Parte 4 · Cómo se trabaja" num={14}>
    <motion.h2 variants={item} className="font-serif-display text-[36px] md:text-[52px] leading-[1.1] text-ink font-light max-w-[900px]">
      Iterar. <strong className="font-medium">No es examen.</strong>
    </motion.h2>
    <motion.p variants={item} className="text-[16px] text-ink-3 mt-6 max-w-[820px] leading-[1.6]">
      Si la primera respuesta no te sirve, no escribas el prompt de cero. Sigue la conversación. Claude no se ofende.
    </motion.p>
    <div className="mt-10 max-w-[760px] space-y-3">
      {[
        "Hazlo más corto.",
        "Cambia el tono a más formal.",
        "Agrega un ejemplo concreto.",
        "Quita la última parte.",
        "Vuélvelo a hacer pero con viñetas.",
      ].map((q) => (
        <motion.div
          key={q}
          variants={item}
          className="border-l-2 border-accent pl-5 py-2 font-serif-display text-[19px] md:text-[24px] text-ink italic font-light"
        >
          &ldquo;{q}&rdquo;
        </motion.div>
      ))}
    </div>
    <motion.p variants={item} className="text-[14px] text-ink-3 mt-10 max-w-[820px] leading-[1.6]">
      Iterar sirve para ajustes finos. Si te toca iterar cinco veces el mismo asunto, casi siempre el problema estaba arriba: faltó rol, contexto, tarea o formato en el prompt inicial.
    </motion.p>
  </SlideShell>
);

// 15 Qué sí va y qué no va
const Slide15 = (
  <SlideShell tag="Parte 4 · Cómo se trabaja" num={15}>
    <motion.h2 variants={item} className="font-serif-display text-[36px] md:text-[52px] leading-[1.1] text-ink font-light max-w-[900px]">
      Qué sí <strong className="font-medium">va</strong>. Qué no.
    </motion.h2>
    <motion.p variants={item} className="text-[16px] text-ink-3 mt-6 max-w-[760px] leading-[1.6]">
      La política definitiva la confirma TI antes del arranque. Mientras tanto, la regla práctica:
    </motion.p>
    <div className="mt-10 grid md:grid-cols-2 gap-0 max-w-[1000px]">
      <motion.div variants={item} className="border border-line p-7 bg-bg-soft">
        <div className="flex items-center gap-2 mb-5">
          <Check className="w-4 h-4 text-accent" strokeWidth={2.5} />
          <div className="font-mono text-[10.5px] tracking-widest uppercase text-accent font-medium">
            Sí va
          </div>
        </div>
        <ul className="space-y-2.5 text-[14px] text-ink-2 leading-[1.55]">
          <li>· Información pública del proyecto</li>
          <li>· Documentos internos sin datos de cliente</li>
          <li>· Plantillas, manuales, procesos</li>
          <li>· Texto, código y análisis general</li>
          <li>· Datos anonimizados</li>
        </ul>
      </motion.div>
      <motion.div variants={item} className="border border-line border-l-0 p-7 bg-bg shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-2 mb-5">
          <X className="w-4 h-4 text-accent" strokeWidth={2.5} />
          <div className="font-mono text-[10.5px] tracking-widest uppercase text-accent font-medium">
            No va
          </div>
        </div>
        <ul className="space-y-2.5 text-[14px] text-ink-2 leading-[1.55]">
          <li>· Datos personales de clientes o empleados</li>
          <li>· Contratos firmados sin anonimizar</li>
          <li>· Credenciales, contraseñas, llaves API</li>
          <li>· Información financiera no pública</li>
          <li>· Lo que no pondrías en un correo externo</li>
        </ul>
      </motion.div>
    </div>
    <motion.p variants={item} className="text-[13.5px] text-ink-3 mt-8 max-w-[760px] leading-[1.6]">
      Pendiente con TI: confirmación final de la lista, ruta de reporte si dudas, y si Claude Enterprise queda configurado con cero retención.
    </motion.p>
  </SlideShell>
);

// 16 Tu primera tarea esta semana
const Slide16 = (
  <SlideShell tag="Parte 5 · Tu siguiente paso" num={16}>
    <motion.div variants={item} className="font-mono text-[11px] tracking-widest uppercase text-ink-4 mb-3">
      Esta semana
    </motion.div>
    <motion.h2 variants={item} className="font-serif-display text-[36px] md:text-[60px] leading-[1.1] text-ink font-light max-w-[900px]">
      Una tarea real. <strong className="font-medium">Tuya.</strong>
    </motion.h2>
    <motion.p variants={item} className="text-[17px] md:text-[18px] text-ink-2 mt-8 max-w-[820px] leading-[1.55]">
      Toma uno de los 105 procesos prioritarios que tu dirección levantó en el diagnóstico. El que más horas te quita por semana.
    </motion.p>
    <div className="mt-10 grid md:grid-cols-3 gap-3 max-w-[960px]">
      {[
        ["01", "Elige", "Un proceso repetitivo que te coma 2+ horas a la semana."],
        ["02", "Prueba", "Aplica los 4 bloques: rol, contexto, tarea, formato."],
        ["03", "Comparte", "Sube el caso a la carpeta del programa antes de la siguiente sesión."],
      ].map(([n, title, body]) => (
        <motion.div
          key={n}
          variants={item}
          whileHover={HOVER}
          className="border border-line p-6 bg-bg-soft shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-colors hover:border-ink"
        >
          <div className="font-mono text-[11px] tracking-widest text-accent font-bold mb-3">{n}</div>
          <div className="font-medium text-[16.5px] text-ink mb-2">{title}</div>
          <div className="text-[13.5px] text-ink-3 leading-[1.6]">{body}</div>
        </motion.div>
      ))}
    </div>
    <motion.p variants={item} className="text-[14px] text-ink-3 mt-8 max-w-[820px] leading-[1.6]">
      No tiene que quedar perfecto. Tiene que estar hecho. La sesión 1 del programa básico la usamos para revisar tu intento y ajustarlo.
    </motion.p>
  </SlideShell>
);

// 17 Cierre
const Slide17 = (
  <SlideShell tag="Cierre" num={17} variant="dark">
    <motion.h2 variants={item} className="font-serif-display text-[40px] md:text-[68px] leading-[1.06] text-white font-light max-w-[1000px]">
      Eso es todo. <strong className="text-accent font-medium">Suficiente para empezar.</strong>
    </motion.h2>
    <motion.p variants={item} className="text-[18px] md:text-[20px] text-white/75 mt-8 max-w-[760px] leading-[1.55]">
      Las 5 sesiones del básico profundizan cada uno de estos temas con casos reales tuyos. Esto fue el mapa.
    </motion.p>

    <motion.div variants={item} className="mt-12 max-w-[760px]">
      <div className="font-mono text-[10.5px] tracking-widest uppercase text-white/50 mb-4">
        Para profundizar
      </div>
      <motion.a
        href="/claude-de-cero-a-cien.pdf"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={HOVER}
        className="group flex items-center justify-between gap-6 border border-white/20 bg-white/5 p-5 hover:border-accent hover:bg-white/10 transition-colors"
      >
        <div className="flex items-start gap-4 min-w-0">
          <Download className="w-5 h-5 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
          <div className="min-w-0">
            <div className="font-medium text-white text-[15.5px] mb-0.5">
              Claude de Cero a Cien
            </div>
            <div className="text-[13px] text-white/60">
              659 páginas. Guía completa. Consulta cuando se atore algo.
            </div>
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-white/50 shrink-0 group-hover:text-accent transition-colors" />
      </motion.a>
    </motion.div>

    <motion.div variants={item} className="mt-auto pt-16 flex justify-between items-end font-mono text-[11px] tracking-widest uppercase text-white/50">
      <span>Crédito: Enrique Rocha · @soyenriquerocha · Abril 2026</span>
      <span>Atisa Group · Mayo 2026</span>
    </motion.div>
  </SlideShell>
);

export const slides = [
  Slide01,
  Slide02,
  Slide03,
  Slide04,
  Slide05,
  Slide06,
  Slide07,
  Slide08,
  Slide09,
  Slide10,
  Slide11,
  Slide12,
  Slide13,
  Slide14,
  Slide15,
  Slide16,
  Slide17,
];
