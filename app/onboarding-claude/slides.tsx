import type { ReactNode } from "react";
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

function BigNumeral({ n }: { n: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-6 right-6 md:top-10 md:right-10 font-serif-display font-light text-[140px] md:text-[220px] leading-none text-accent/[0.08] select-none tabular-nums"
    >
      {String(n).padStart(2, "0")}
    </div>
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
        "py-14 md:py-16 min-h-[60vh] flex flex-col"
      )}
    >
      {bigNumeral && num && variant !== "cover" && <BigNumeral n={num} />}
      {tag && (
        <div className="font-mono text-[11px] uppercase tracking-widest font-medium mb-6 text-accent relative z-10">
          {tag}
        </div>
      )}
      <div className="flex-1 flex flex-col relative z-10">{children}</div>
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
    {/* Optional cover image — graceful fallback to solid ink if missing */}
    <div
      className="absolute inset-0 bg-cover bg-center opacity-40"
      style={{ backgroundImage: "url('/onboarding-cover.jpg')" }}
      aria-hidden
    />
    <div className="absolute inset-0 bg-ink/60" aria-hidden />
    <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent" />

    <div className="page-container relative z-10 py-16 md:py-20 flex-1 flex flex-col">
      <div className="font-mono text-[11.5px] tracking-widest uppercase text-accent font-medium mb-7">
        Onboarding del equipo · 30 min
      </div>
      <h1 className="font-serif-display font-light text-[48px] md:text-[80px] leading-[1.04] tracking-[-0.025em] text-white max-w-[900px]">
        Claude en <strong className="text-accent font-medium">Atisa</strong>.
      </h1>
      <p className="text-white/75 text-[18px] md:text-[20px] mt-8 max-w-[680px] leading-[1.5]">
        Una sesión corta para que sepas qué es Claude, cómo hablarle y qué puedes hacer con él el mismo día.
      </p>
      <div className="mt-auto pt-16 flex justify-between items-end font-mono text-[12px] tracking-widest uppercase text-white/60">
        <span>Atisa Group · Mayo 2026</span>
        <span>Programa de Adopción de IA</span>
      </div>
    </div>
  </section>
);

// 02 Qué hay aquí
const Slide02 = (
  <SlideShell tag="Qué hay aquí · 2 min" num={2}>
    <h2 className="font-serif-display text-[40px] md:text-[56px] leading-[1.08] text-ink max-w-[900px] font-light">
      30 minutos. <strong className="font-medium">Sin tecnicismos.</strong>
      <br />Sales a usarlo el mismo día.
    </h2>
    <div className="mt-12 grid md:grid-cols-3 gap-0 max-w-[900px]">
      {[
        ["Qué es", "Qué hace, qué no hace, quién está detrás."],
        ["Cómo se le habla", "El modelo de prompt que vamos a usar."],
        ["Qué hacer hoy", "Una tarea real conectada a tu trabajo."],
      ].map(([title, body], i) => (
        <div
          key={title}
          className={cn(
            "py-5 px-5",
            i > 0 && "md:border-l border-line",
            i === 0 && "pl-0"
          )}
        >
          <div className="font-mono text-[10.5px] tracking-widest uppercase text-ink-4 mb-2">
            {String(i + 1).padStart(2, "0")}
          </div>
          <div className="font-medium text-ink text-[16px] mb-1.5">{title}</div>
          <div className="text-[13.5px] text-ink-3 leading-[1.55]">{body}</div>
        </div>
      ))}
    </div>
  </SlideShell>
);

// 03 Claude en una frase
const Slide03 = (
  <SlideShell tag="Parte 1 · Qué es Claude" num={3}>
    <div className="font-mono text-[11px] tracking-widest uppercase text-ink-4 mb-3">
      Claude en una frase
    </div>
    <h2 className="font-serif-display text-[36px] md:text-[52px] leading-[1.12] text-ink max-w-[1000px] font-light">
      Imagina un colega que leyó{" "}
      <strong className="font-medium text-navy-deep">millones de libros, artículos y páginas web</strong>
      , y al que le puedes preguntar lo que sea.
    </h2>
    <p className="text-[18px] md:text-[20px] text-ink-2 mt-10 max-w-[820px] leading-[1.55]">
      Eso es Claude. Un modelo de lenguaje al que le escribes en español o inglés y te responde con texto, código, análisis o ideas. No es buscador. No es Google con esteroides. Es un colega con mucha lectura.
    </p>
  </SlideShell>
);

// 04 Quién está detrás
const Slide04 = (
  <SlideShell tag="Parte 1 · Qué es Claude" num={4}>
    <h2 className="font-serif-display text-[40px] md:text-[56px] leading-[1.08] text-ink font-light max-w-[900px]">
      Detrás está <strong className="font-medium">Anthropic</strong>.
    </h2>
    <p className="text-[18px] md:text-[20px] text-ink-2 mt-8 max-w-[820px] leading-[1.55]">
      Empresa fundada en 2021 por exinvestigadores de OpenAI. Su prioridad declarada es la seguridad de la IA.
    </p>
    <div className="mt-12 border-l-2 border-accent pl-6 max-w-[760px]">
      <p className="font-serif-display text-[22px] md:text-[26px] italic text-ink leading-[1.4] font-light">
        &ldquo;Un auto muy rápido que también tiene los mejores frenos del mercado.&rdquo;
      </p>
      <div className="font-mono text-[10.5px] tracking-widest uppercase text-ink-4 mt-4">
        Enrique Rocha · Claude de Cero a Cien
      </div>
    </div>
    <p className="text-[15px] text-ink-3 mt-10 max-w-[760px] leading-[1.6]">
      No es trivial: cuando manejas información de clientes, contratos y operaciones, importa quién construyó la herramienta y con qué prioridades.
    </p>
  </SlideShell>
);

// 05 Por qué Atisa eligió Claude
const Slide05 = (
  <SlideShell tag="Parte 1 · Qué es Claude" num={5}>
    <h2 className="font-serif-display text-[36px] md:text-[48px] leading-[1.1] text-ink font-light max-w-[900px]">
      Por qué Atisa eligió <strong className="font-medium">Claude</strong>.
    </h2>
    <div className="mt-12 grid md:grid-cols-3 gap-5">
      {[
        {
          icon: BookOpen,
          title: "Lee textos largos",
          body: "Su ventana de contexto admite el equivalente a un libro de 750 mil palabras. Le pegas un contrato completo, un manual operativo, una semana de correos, y los procesa de un solo bocado.",
        },
        {
          icon: Shield,
          title: "Seguridad por diseño",
          body: "Anthropic puso la seguridad antes que la velocidad. Para una empresa que maneja datos de clientes, esa diferencia se nota.",
        },
        {
          icon: MessageCircleQuestion,
          title: "Dice no sé",
          body: "Cuando no está seguro de algo, lo dice. No siempre, pero más que otros modelos. Eso te ahorra verificar cosas que ya estaban mal de origen.",
        },
      ].map(({ icon: Icon, title, body }) => (
        <div
          key={title}
          className="border border-line bg-bg-soft p-6 hover:border-ink hover:bg-bg transition-colors"
        >
          <Icon className="w-5 h-5 text-accent mb-5" strokeWidth={1.5} />
          <h3 className="font-medium text-[17px] text-ink mb-2">{title}</h3>
          <p className="text-[13.5px] text-ink-3 leading-[1.6]">{body}</p>
        </div>
      ))}
    </div>
  </SlideShell>
);

// 06 Lo que Claude no es
const Slide06 = (
  <SlideShell tag="Parte 1 · Qué es Claude" num={6}>
    <h2 className="font-serif-display text-[36px] md:text-[48px] leading-[1.1] text-ink font-light max-w-[900px]">
      Lo que <strong className="font-medium">no</strong> es Claude.
    </h2>
    <p className="text-[16px] text-ink-3 mt-6 max-w-[760px] leading-[1.6]">
      Es importante saberlo desde el principio. Si esperas algo que no puede dar, te vas a frustrar y la herramienta termina archivada.
    </p>
    <div className="mt-10 space-y-0 max-w-[900px]">
      {[
        ["No piensa", "Genera texto palabra por palabra calculando cuál sigue. No tiene intenciones ni opiniones."],
        ["No siente", "No tiene consciencia ni emociones. Que escriba con tono cálido no significa que esté de buenas."],
        ["No recuerda solo", "Cada conversación arranca en blanco salvo que actives memoria o uses Proyectos."],
        ["Alucina", "A veces se inventa datos con seguridad. Hechos, cifras y citas hay que verificarlos siempre."],
        ["Tiene fecha de corte", "Su entrenamiento terminó en una fecha. No conoce noticias posteriores a menos que se las pegues."],
      ].map(([title, body]) => (
        <div key={title} className="grid grid-cols-[24px_1fr] gap-5 py-4 border-b border-line">
          <X className="w-4 h-4 text-accent mt-1" strokeWidth={2} />
          <div>
            <h3 className="text-[16px] font-medium text-ink">{title}</h3>
            <p className="text-[14px] text-ink-3 mt-0.5 leading-[1.55]">{body}</p>
          </div>
        </div>
      ))}
    </div>
  </SlideShell>
);

// 07 La regla de oro
const Slide07 = (
  <SlideShell tag="Parte 2 · Cómo se le habla" num={7} variant="dark">
    <div className="font-mono text-[11px] tracking-widest uppercase text-white/50 mb-4">
      La regla de oro
    </div>
    <h2 className="font-serif-display text-[36px] md:text-[56px] leading-[1.1] text-white font-light max-w-[1000px]">
      Si un compañero <strong className="text-accent font-medium">que no conoce la tarea</strong> se confundiría con tu mensaje,
      <br />Claude también.
    </h2>
    <p className="text-[18px] md:text-[20px] text-white/75 mt-10 max-w-[760px] leading-[1.55]">
      Claude no está dentro de tu cabeza. No sabe a quién le hablas, qué proyecto traes, qué reportaste ayer. Lo que no escribes, no existe para él.
    </p>
    <p className="text-[15px] text-white/55 mt-6 max-w-[760px] leading-[1.6]">
      Casi todo lo que vas a aprender en las próximas sesiones es cómo darle ese contexto sin escribir un libro.
    </p>
  </SlideShell>
);

// 08 Vago vs claro
const Slide08 = (
  <SlideShell tag="Parte 2 · Cómo se le habla" num={8}>
    <h2 className="font-serif-display text-[36px] md:text-[48px] leading-[1.1] text-ink font-light max-w-[900px]">
      Vago contra <strong className="font-medium">claro</strong>.
    </h2>
    <p className="text-[16px] text-ink-3 mt-6 max-w-[760px] leading-[1.6]">
      Igual que en un restaurante. Si pides algo rico, te traen lo que el cocinero crea. Si pides algo específico, te traen lo que pediste.
    </p>
    <div className="mt-12 grid md:grid-cols-2 gap-0 max-w-[1000px]">
      <div className="border border-line p-7 bg-bg-soft">
        <div className="font-mono text-[10.5px] tracking-widest uppercase text-ink-4 mb-3">
          Vago
        </div>
        <p className="font-serif-display text-[20px] md:text-[24px] text-ink-3 leading-[1.4] italic font-light">
          &ldquo;Tráeme algo rico.&rdquo;
        </p>
        <div className="mt-6 pt-5 border-t border-line text-[13px] text-ink-3 leading-[1.6]">
          Aplicado a Claude: <span className="text-ink-2">&ldquo;Hazme un correo para el cliente.&rdquo;</span>
        </div>
      </div>
      <div className="border border-line border-l-0 p-7 bg-bg">
        <div className="font-mono text-[10.5px] tracking-widest uppercase text-accent mb-3 font-medium">
          Claro
        </div>
        <p className="font-serif-display text-[20px] md:text-[24px] text-ink leading-[1.4] font-light">
          &ldquo;Hamburguesa con queso, sin cebolla, con papas.&rdquo;
        </p>
        <div className="mt-6 pt-5 border-t border-line text-[13px] text-ink-2 leading-[1.6]">
          Aplicado a Claude: <span className="text-ink">&ldquo;Redacta un correo de 5 líneas para el cliente Pemex avisando retraso de 3 días en la obra del puente, tono cordial pero firme, sin disculpas excesivas.&rdquo;</span>
        </div>
      </div>
    </div>
  </SlideShell>
);

// 09 Los 4 bloques del buen prompt
const Slide09 = (
  <SlideShell tag="Parte 2 · Cómo se le habla" num={9}>
    <h2 className="font-serif-display text-[36px] md:text-[48px] leading-[1.1] text-ink font-light max-w-[900px]">
      Los 4 bloques de un <strong className="font-medium">buen prompt</strong>.
    </h2>
    <div className="mt-10 grid md:grid-cols-4 gap-3">
      {[
        ["Rol", "Quién quieres que sea", "Eres ingeniero residente con 10 años en obra."],
        ["Contexto", "Qué situación rodea la tarea", "Pemex pidió actualización del puente Ruta 12."],
        ["Tarea", "Qué quieres que haga", "Redacta el correo de avance semanal."],
        ["Formato", "Cómo quieres el resultado", "5 líneas, viñetas no, tono cordial firme."],
      ].map(([title, sub, example], i) => (
        <div key={title} className="border border-line p-5 bg-bg-soft">
          <div className="font-mono text-[10.5px] tracking-widest uppercase text-accent mb-3 font-medium">
            {String(i + 1).padStart(2, "0")}
          </div>
          <div className="font-medium text-[17px] text-ink mb-1">{title}</div>
          <div className="text-[12.5px] text-ink-3 mb-4">{sub}</div>
          <div className="text-[12.5px] text-ink-2 italic leading-[1.55] pt-3 border-t border-line">
            {example}
          </div>
        </div>
      ))}
    </div>
    <div className="mt-8 text-[14px] text-ink-3 max-w-[760px] leading-[1.6]">
      No siempre necesitas los cuatro. Pero cuando algo sale mal, casi siempre falta uno.
    </div>
  </SlideShell>
);

// 10 El poder del contexto
const Slide10 = (
  <SlideShell tag="Parte 2 · Cómo se le habla" num={10}>
    <h2 className="font-serif-display text-[36px] md:text-[48px] leading-[1.1] text-ink font-light max-w-[900px]">
      El <strong className="font-medium">contexto</strong> cambia todo.
    </h2>
    <p className="text-[16px] text-ink-3 mt-6 max-w-[760px] leading-[1.6]">
      Es la diferencia entre decirle a un niño &ldquo;no cruces la calle&rdquo; y explicarle por qué.
    </p>
    <div className="mt-10 grid md:grid-cols-2 gap-0 max-w-[1000px]">
      <div className="border border-line p-7 bg-bg-soft">
        <div className="font-mono text-[10.5px] tracking-widest uppercase text-ink-4 mb-4">
          Sin contexto
        </div>
        <p className="text-[16px] text-ink-2 leading-[1.6]">
          &ldquo;No cruces la calle.&rdquo;
        </p>
        <div className="mt-5 pt-5 border-t border-line text-[13px] text-ink-3 leading-[1.6]">
          El niño puede obedecer una vez. La siguiente, si nadie está mirando, cruza igual.
        </div>
      </div>
      <div className="border border-line border-l-0 p-7 bg-bg">
        <div className="font-mono text-[10.5px] tracking-widest uppercase text-accent mb-4 font-medium">
          Con contexto
        </div>
        <p className="text-[16px] text-ink leading-[1.6]">
          &ldquo;No cruces porque vienen carros y es peligroso.&rdquo;
        </p>
        <div className="mt-5 pt-5 border-t border-line text-[13px] text-ink-2 leading-[1.6]">
          Ahora entiende la regla. Puede aplicarla a calles que no había visto antes.
        </div>
      </div>
    </div>
    <p className="text-[15px] text-ink-3 mt-10 max-w-[760px] leading-[1.6]">
      Con Claude pasa igual. Si le explicas el porqué, generaliza bien. Si solo le das la orden, te obedece esta vez y falla la siguiente.
    </p>
  </SlideShell>
);

// 11 Mostrar es mejor que explicar
const Slide11 = (
  <SlideShell tag="Parte 2 · Cómo se le habla" num={11}>
    <h2 className="font-serif-display text-[36px] md:text-[48px] leading-[1.1] text-ink font-light max-w-[900px]">
      Mostrar gana a <strong className="font-medium">explicar</strong>.
    </h2>
    <p className="text-[16px] text-ink-3 mt-6 max-w-[820px] leading-[1.6]">
      Si quieres que pinten tu casa de un color exacto, puedes describirlo con palabras o puedes mandar una foto. La foto es más rápida y no falla.
    </p>
    <div className="mt-10 max-w-[900px]">
      <div className="font-mono text-[10.5px] tracking-widest uppercase text-accent mb-4 font-medium">
        Cómo se ve en un prompt
      </div>
      <div className="border border-line bg-bg-soft p-6 font-mono text-[12.5px] text-ink-2 leading-[1.7]">
        <div>Clasifica las quejas como crítica, sugerencia o consulta.</div>
        <div className="mt-3 text-ink-3">Ejemplos:</div>
        <div className="mt-1 pl-3">&ldquo;El sistema lleva 2 horas caído&rdquo; → <span className="text-accent">crítica</span></div>
        <div className="pl-3">&ldquo;Sería bueno tener modo oscuro&rdquo; → <span className="text-accent">sugerencia</span></div>
        <div className="pl-3">&ldquo;¿Cómo cambio mi contraseña?&rdquo; → <span className="text-accent">consulta</span></div>
        <div className="mt-3">Clasifica esta: &ldquo;La búsqueda no encuentra mis archivos.&rdquo;</div>
      </div>
    </div>
    <p className="text-[14px] text-ink-3 mt-6 max-w-[820px] leading-[1.6]">
      Dos o tres ejemplos suelen bastar. A esto se le llama few-shot y es la forma más confiable de enseñarle un patrón nuevo.
    </p>
  </SlideShell>
);

// 12 Los 3 modelos
const Slide12 = (
  <SlideShell tag="Parte 3 · Qué hay dentro" num={12}>
    <h2 className="font-serif-display text-[36px] md:text-[48px] leading-[1.1] text-ink font-light max-w-[900px]">
      Tres modelos. <strong className="font-medium">Tres vehículos.</strong>
    </h2>
    <p className="text-[16px] text-ink-3 mt-6 max-w-[760px] leading-[1.6]">
      Claude no es un solo modelo, son varios. Cada uno con un balance distinto entre rapidez, costo y profundidad.
    </p>
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
        <div
          key={name}
          className={cn(
            "border p-6 transition-colors",
            highlight
              ? "border-accent border-l-[3px] bg-bg"
              : "border-line bg-bg-soft"
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
        </div>
      ))}
    </div>
    <p className="text-[14px] text-ink-3 mt-8 max-w-[760px] leading-[1.6]">
      Recomendación: empieza siempre con Sonnet. Solo subes a Opus si la tarea no se resuelve. Casi nunca necesitas Opus.
    </p>
  </SlideShell>
);

// 13 Más allá del chat
const Slide13 = (
  <SlideShell tag="Parte 3 · Qué hay dentro" num={13}>
    <h2 className="font-serif-display text-[36px] md:text-[48px] leading-[1.1] text-ink font-light max-w-[900px]">
      Más allá del <strong className="font-medium">chat</strong>.
    </h2>
    <p className="text-[16px] text-ink-3 mt-6 max-w-[760px] leading-[1.6]">
      Claude.ai es más que la caja de texto. Hay cuatro cosas que cambian cómo trabajas.
    </p>
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
          body: "Conversaciones agrupadas con contexto compartido. Como un empleado al que ya le explicaste las reglas del puesto.",
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
        <div
          key={title}
          className="border border-line bg-bg-soft p-6 hover:border-ink hover:bg-bg transition-colors"
        >
          <Icon className="w-5 h-5 text-accent mb-4" strokeWidth={1.5} />
          <h3 className="font-medium text-[16.5px] text-ink mb-1.5">{title}</h3>
          <p className="text-[13.5px] text-ink-3 leading-[1.6]">{body}</p>
        </div>
      ))}
    </div>
  </SlideShell>
);

// 14 Iterar es conversación
const Slide14 = (
  <SlideShell tag="Parte 4 · Cómo se trabaja" num={14}>
    <h2 className="font-serif-display text-[36px] md:text-[48px] leading-[1.1] text-ink font-light max-w-[900px]">
      Iterar. <strong className="font-medium">No es examen.</strong>
    </h2>
    <p className="text-[16px] text-ink-3 mt-6 max-w-[820px] leading-[1.6]">
      Si la primera respuesta no te sirve, no escribas el prompt de cero. Sigue la conversación. Claude no se ofende.
    </p>
    <div className="mt-10 max-w-[760px] space-y-3">
      {[
        "Hazlo más corto.",
        "Cambia el tono a más formal.",
        "Agrega un ejemplo concreto.",
        "Quita la última parte.",
        "Vuélvelo a hacer pero con viñetas.",
      ].map((q) => (
        <div
          key={q}
          className="border-l-2 border-accent pl-5 py-2 font-serif-display text-[19px] md:text-[22px] text-ink italic font-light"
        >
          &ldquo;{q}&rdquo;
        </div>
      ))}
    </div>
    <p className="text-[14px] text-ink-3 mt-10 max-w-[820px] leading-[1.6]">
      Tres iteraciones en 30 segundos suelen llegar más lejos que un prompt perfecto en 5 minutos.
    </p>
  </SlideShell>
);

// 15 Qué sí va y qué no va
const Slide15 = (
  <SlideShell tag="Parte 4 · Cómo se trabaja" num={15}>
    <h2 className="font-serif-display text-[36px] md:text-[48px] leading-[1.1] text-ink font-light max-w-[900px]">
      Qué sí <strong className="font-medium">va</strong>. Qué no.
    </h2>
    <p className="text-[16px] text-ink-3 mt-6 max-w-[760px] leading-[1.6]">
      La política definitiva la confirma TI antes del arranque. Mientras tanto, la regla práctica:
    </p>
    <div className="mt-10 grid md:grid-cols-2 gap-0 max-w-[1000px]">
      <div className="border border-line p-7 bg-bg-soft">
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
      </div>
      <div className="border border-line border-l-0 p-7 bg-bg">
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
      </div>
    </div>
    <p className="text-[13.5px] text-ink-3 mt-8 max-w-[760px] leading-[1.6]">
      Pendiente con TI: confirmación final de la lista, ruta de reporte si dudas, y si Claude Enterprise queda configurado con cero retención.
    </p>
  </SlideShell>
);

// 16 Tu primera tarea esta semana
const Slide16 = (
  <SlideShell tag="Parte 5 · Tu siguiente paso" num={16}>
    <div className="font-mono text-[11px] tracking-widest uppercase text-ink-4 mb-3">
      Esta semana
    </div>
    <h2 className="font-serif-display text-[36px] md:text-[52px] leading-[1.1] text-ink font-light max-w-[900px]">
      Una tarea real. <strong className="font-medium">Tuya.</strong>
    </h2>
    <p className="text-[17px] md:text-[18px] text-ink-2 mt-8 max-w-[820px] leading-[1.55]">
      Toma uno de los 105 procesos prioritarios que tu dirección levantó en el diagnóstico. El que más horas te quita por semana.
    </p>
    <div className="mt-10 grid md:grid-cols-3 gap-3 max-w-[960px]">
      {[
        ["01", "Elige", "Un proceso repetitivo que te coma 2+ horas a la semana."],
        ["02", "Prueba", "Aplica los 4 bloques: rol, contexto, tarea, formato."],
        ["03", "Comparte", "Sube el caso a la carpeta del programa antes de la siguiente sesión."],
      ].map(([n, title, body]) => (
        <div key={n} className="border border-line p-6 bg-bg-soft">
          <div className="font-mono text-[11px] tracking-widest text-accent font-bold mb-3">{n}</div>
          <div className="font-medium text-[16.5px] text-ink mb-2">{title}</div>
          <div className="text-[13.5px] text-ink-3 leading-[1.6]">{body}</div>
        </div>
      ))}
    </div>
    <p className="text-[14px] text-ink-3 mt-8 max-w-[820px] leading-[1.6]">
      No tiene que quedar perfecto. Tiene que estar hecho. La sesión 1 del programa básico la usamos para revisar tu intento y ajustarlo.
    </p>
  </SlideShell>
);

// 17 Cierre
const Slide17 = (
  <SlideShell tag="Cierre" num={17} variant="dark">
    <h2 className="font-serif-display text-[40px] md:text-[60px] leading-[1.08] text-white font-light max-w-[900px]">
      Eso es todo. <strong className="text-accent font-medium">Suficiente para empezar.</strong>
    </h2>
    <p className="text-[18px] md:text-[20px] text-white/75 mt-8 max-w-[760px] leading-[1.55]">
      Las 5 sesiones del básico profundizan cada uno de estos temas con casos reales tuyos. Esto fue el mapa.
    </p>

    <div className="mt-12 max-w-[760px]">
      <div className="font-mono text-[10.5px] tracking-widest uppercase text-white/50 mb-4">
        Para profundizar
      </div>
      <a
        href="/claude-de-cero-a-cien.pdf"
        target="_blank"
        rel="noopener noreferrer"
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
      </a>
    </div>

    <div className="mt-auto pt-16 flex justify-between items-end font-mono text-[11px] tracking-widest uppercase text-white/50">
      <span>Crédito: Enrique Rocha · @soyenriquerocha · Abril 2026</span>
      <span>Atisa Group · Mayo 2026</span>
    </div>
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
