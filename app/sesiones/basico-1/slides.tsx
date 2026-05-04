import type { ReactNode } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";

function SlideShell({
  children,
  variant = "default",
  num,
  total,
  tag,
}: {
  children: ReactNode;
  variant?: "default" | "cover";
  num?: number;
  total?: number;
  tag?: string;
}) {
  return (
    <section
      className={cn(
        "page-container relative",
        variant === "cover" ? "bg-ink text-white" : "bg-bg text-ink",
        "py-14 md:py-16 min-h-[60vh] flex flex-col"
      )}
    >
      {tag && (
        <div className={cn("font-mono text-[11px] uppercase tracking-widest font-medium mb-6", variant === "cover" ? "text-accent" : "text-accent")}>
          {tag}
        </div>
      )}
      <div className="flex-1 flex flex-col">{children}</div>
      {num && total && (
        <div
          className={cn(
            "font-mono text-[10px] uppercase tracking-widest mt-10",
            variant === "cover" ? "text-white/40" : "text-ink-4"
          )}
        >
          {String(num).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      )}
    </section>
  );
}

const TOTAL = 14;

// 01 Portada
const Slide01 = (
  <SlideShell variant="cover" tag="Sesión 1 · Básico · 120 min" num={1} total={TOTAL}>
    <h1 className="font-serif-display text-[44px] md:text-[72px] leading-[1.05] text-white">
      Tu primera sesión<br />
      con <strong className="text-accent font-medium">Claude Enterprise</strong>.
    </h1>
    <p className="text-white/75 text-[17px] md:text-[19px] mt-6 max-w-[720px] leading-[1.5]">
      Empezamos con la postura de seguridad, configuramos tu cuenta, aprendes el modelo de prompt que vamos a usar las próximas 4 semanas y resuelves un caso real tuyo en vivo.
    </p>
    <div className="mt-auto pt-12 flex justify-between items-end font-mono text-[12px] tracking-widest uppercase text-white/60">
      <span>Atisa Group · Mayo 2026</span>
      <span>Sesión 1 de 5</span>
    </div>
  </SlideShell>
);

// 02 Reglas
const Slide02 = (
  <SlideShell tag="Intro · 7 min" num={2} total={TOTAL}>
    <h2 className="font-serif-display text-[36px] md:text-[44px] leading-[1.1] text-ink max-w-[800px]">
      Tres reglas.
    </h2>
    <div className="mt-10 space-y-0">
      {[
        ["01", "Asistencia", "4 de 5 sesiones para conservar tu plaza en el challenge. La asistencia se toma al inicio de cada sesión."],
        ["02", "Tarea entre sesiones", "Corta y aplicada al trabajo real. Se sube a la carpeta compartida del programa antes de cada sesión."],
        ["03", "Confidencialidad", "Lo que se discute en la sala se queda aquí. Aplica especialmente a la postura de seguridad de información."],
      ].map(([n, title, body]) => (
        <div key={n} className="grid grid-cols-[60px_1fr] gap-6 py-5 border-b border-line">
          <div className="font-mono text-[13px] font-bold text-accent tracking-wide">{n}</div>
          <div>
            <h3 className="text-[18px] font-medium text-ink">{title}</h3>
            <p className="text-[14.5px] text-ink-3 mt-1 leading-[1.55]">{body}</p>
          </div>
        </div>
      ))}
    </div>
  </SlideShell>
);

// 03 Seguridad intro
const Slide03 = (
  <SlideShell tag="Seguridad · 15 min" num={3} total={TOTAL}>
    <h2 className="font-serif-display text-[36px] md:text-[44px] leading-[1.1] text-ink max-w-[920px]">
      Antes de prompts:{" "}
      <strong className="text-navy-deep font-medium">qué información sí y qué no</strong>{" "}
      compartes con Claude.
    </h2>
    <p className="text-[19px] md:text-[22px] text-ink mt-8 max-w-[820px] leading-[1.5]">
      El 53% del personal reportó la seguridad de información como su barrera principal para usar IA. Si esto no queda claro, no usas la herramienta y la sesión se vuelve teórica.
    </p>
    <p className="text-ink-3 text-[15px] mt-5 max-w-[820px] leading-[1.6]">
      Claude Enterprise tiene un acuerdo institucional con Atisa: las conversaciones no entrenan modelos públicos. Eso resuelve la pregunta del modelo. Pero no resuelve qué datos podemos meter, eso lo define la postura corporativa.
    </p>
  </SlideShell>
);

// 04 Si / No
const Slide04 = (
  <SlideShell tag="Seguridad · qué se puede" num={4} total={TOTAL}>
    <h2 className="font-serif-display text-[36px] md:text-[40px] leading-[1.1] text-ink mb-8">
      Sí · No · Ante duda.
    </h2>
    <div className="grid md:grid-cols-2 gap-5 mb-5">
      <div className="bg-bg border border-line border-l-4 border-l-green p-6">
        <div className="font-mono text-[10.5px] uppercase tracking-widest font-bold text-green mb-3">
          Sí se puede compartir
        </div>
        <ul className="space-y-2 text-[13.5px] text-ink-2">
          {[
            "Documentos públicos del proyecto",
            "Contratos modelo, sin partes nominales",
            "Correos sin datos confidenciales",
            "Tareas ofimáticas: resumir, traducir, redactar",
            "Tus propias notas, borradores, ideas",
            "Información ya publicada externamente",
          ].map((it) => (
            <li key={it} className="flex gap-2 leading-[1.5]"><span className="text-ink-4">·</span>{it}</li>
          ))}
        </ul>
      </div>
      <div className="bg-bg border border-line border-l-4 border-l-accent p-6">
        <div className="font-mono text-[10.5px] uppercase tracking-widest font-bold text-accent mb-3">
          No se puede
        </div>
        <ul className="space-y-2 text-[13.5px] text-ink-2">
          {[
            "Datos fiscales, RFC, CURP",
            "Nóminas, salarios, datos bancarios",
            "Datos personales de empleados",
            "Planos confidenciales de proyectos sensibles",
            "Contratos vigentes con cláusulas confidenciales",
            "Información regulada de clientes",
          ].map((it) => (
            <li key={it} className="flex gap-2 leading-[1.5]"><span className="text-ink-4">·</span>{it}</li>
          ))}
        </ul>
      </div>
    </div>
    <div className="bg-bg border border-line border-l-4 border-l-navy p-5 flex items-start gap-3">
      <AlertCircle className="w-4 h-4 text-navy mt-0.5 shrink-0" />
      <div>
        <div className="font-mono text-[10.5px] uppercase tracking-widest font-bold text-navy mb-1">
          Ante duda
        </div>
        <p className="text-[14px] text-ink-2 leading-[1.55]">
          Un solo canal a TI con respuesta en menos de 4 horas hábiles. Mientras tanto, no metas la información. La regla básica: si dudas, pregunta antes que después.
        </p>
      </div>
    </div>
  </SlideShell>
);

// 05 Onboarding
const Slide05 = (
  <SlideShell tag="Onboarding · 13 min" num={5} total={TOTAL}>
    <h2 className="font-serif-display text-[36px] md:text-[44px] leading-[1.1] text-ink max-w-[800px]">
      Tu cuenta Claude Enterprise.
    </h2>
    <p className="text-ink-3 text-[15px] mt-4">Hands-on. Cada quien en su laptop, paso a paso.</p>
    <div className="mt-10 space-y-0">
      {[
        ["01", "Abre claude.ai", "En tu laptop. Login con tu correo corporativo Atisa."],
        ["02", "Verifica que entras", "Escribe en el chat: \"Hola Claude, soy [tu nombre] de [tu dirección], hoy es mi primer día.\""],
        ["03", "Tour rápido de la UI", "Chat principal. Historial de conversaciones (lateral). Nueva conversación. Adjuntar archivos (cuidando la regla de seguridad). Settings."],
        ["04", "Si no logras entrar", "Siéntate con un compañero que sí entró. TI te atiende al final de la sesión, no detenemos al grupo."],
      ].map(([n, t, b]) => (
        <div key={n} className="grid grid-cols-[60px_1fr] gap-6 py-4 border-b border-line">
          <div className="font-mono text-[13px] font-bold text-accent tracking-wide">{n}</div>
          <div>
            <h3 className="text-[16.5px] font-medium text-ink">{t}</h3>
            <p className="text-[13.5px] text-ink-3 mt-1 leading-[1.55]">{b}</p>
          </div>
        </div>
      ))}
    </div>
  </SlideShell>
);

// 06 Anatomía
const Slide06 = (
  <SlideShell tag="Prompt · 30 min" num={6} total={TOTAL}>
    <h2 className="font-serif-display text-[36px] md:text-[44px] leading-[1.1] text-ink">
      Cuatro elementos de un prompt útil.
    </h2>
    <p className="text-ink-3 text-[15px] mt-3 max-w-[640px]">
      No te saltes ninguno hasta que esté automatizado en tu cabeza.
    </p>
    <div className="mt-8 bg-bg border border-line">
      <table className="w-full text-[13.5px]">
        <thead className="bg-bg-soft border-b border-line">
          <tr>
            <th className="text-left px-5 py-3 font-mono text-[10.5px] uppercase tracking-widest text-ink-4">Elemento</th>
            <th className="text-left px-5 py-3 font-mono text-[10.5px] uppercase tracking-widest text-ink-4">Pregunta que contesta</th>
            <th className="text-left px-5 py-3 font-mono text-[10.5px] uppercase tracking-widest text-ink-4">Ejemplo</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Rol", "¿Quién quieres que sea Claude?", "Eres un comprador de obra con 10 años de experiencia."],
            ["Tarea", "¿Qué hace, en una frase verbo + objeto?", "Redacta un correo a un proveedor pidiendo cotización."],
            ["Contexto", "¿Qué necesita saber para hacerlo bien?", "Necesitamos 50 ton de cemento, obra Tijuana, urgencia 2 semanas."],
            ["Formato", "¿Cómo quieres la respuesta?", "3 párrafos cortos, tono profesional, en español."],
          ].map(([k, q, ex]) => (
            <tr key={k} className="border-b border-line last:border-b-0">
              <td className="px-5 py-3.5 font-medium text-navy-deep whitespace-nowrap">{k}</td>
              <td className="px-5 py-3.5 text-ink-2">{q}</td>
              <td className="px-5 py-3.5 text-ink-3">{ex}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </SlideShell>
);

// 07 Demo bad
const Slide07 = (
  <SlideShell tag="Prompt · demo en vivo" num={7} total={TOTAL}>
    <h2 className="font-serif-display text-[36px] md:text-[44px] leading-[1.1] text-ink">
      Primer intento sin método.
    </h2>
    <p className="text-ink-3 text-[15px] mt-3 max-w-[640px]">
      Esto es lo que la mayoría escribe cuando empieza. Y esto es lo que recibe.
    </p>
    <div className="mt-8 bg-ink text-white font-mono text-[13.5px] leading-[1.7] p-6 whitespace-pre-wrap">
      <span className="text-accent font-semibold">Prompt:</span>{"\n"}
      ayúdame con esto{"\n\n"}
      <span className="text-accent font-semibold">Respuesta de Claude:</span>{"\n"}
      Claro, con gusto te ayudo. ¿Podrías darme más detalles sobre lo que necesitas? Por ejemplo, qué tarea estás intentando completar, en qué contexto, y qué tipo de salida esperas.
    </div>
    <p className="text-ink-3 text-[14px] mt-5">Respuesta correcta del modelo. Inútil para nuestro trabajo.</p>
  </SlideShell>
);

// 08 Demo good
const Slide08 = (
  <SlideShell tag="Prompt · demo en vivo" num={8} total={TOTAL}>
    <h2 className="font-serif-display text-[36px] md:text-[44px] leading-[1.1] text-ink">
      Mismo problema con el método.
    </h2>
    <div className="mt-8 bg-ink text-white font-mono text-[13.5px] leading-[1.7] p-6 whitespace-pre-wrap">
      <span className="text-accent font-semibold">Prompt:</span>{"\n"}
      Eres un comprador de obra con 10 años de experiencia.{"\n"}
      Redacta un correo a un proveedor pidiendo cotización.{"\n"}
      Necesitamos 50 toneladas de cemento gris, obra en Tijuana,{"\n"}
      urgencia de 2 semanas. El contacto del proveedor es Juan{"\n"}
      Pérez de Cementos del Norte.{"\n"}
      Formato: 3 párrafos cortos, tono profesional, en español.{"\n\n"}
      <span className="text-accent font-semibold">Respuesta de Claude:</span>{"\n"}
      Estimado Juan Pérez,{"\n\n"}
      Le escribo en relación con un requerimiento de cemento gris para una obra en Tijuana. Necesitamos cotización para 50 toneladas con entrega en un plazo de 2 semanas a partir de la confirmación.{"\n\n"}
      Le agradezco incluir en su propuesta...{"\n"}
      [continúa]
    </div>
    <p className="text-ink-3 text-[14px] mt-5">El facilitador adapta este ejemplo al área del grupo presente, usando casos reales del diagnóstico.</p>
  </SlideShell>
);

// 09 Ejercicio 1
const Slide09 = (
  <SlideShell tag="Ejercicio · 15 min" num={9} total={TOTAL}>
    <h2 className="font-serif-display text-[36px] md:text-[44px] leading-[1.1] text-ink">
      Tu primer prompt con método.
    </h2>
    <div className="mt-10 space-y-0">
      {[
        ["01", "Toma una tarea de tu día", "Una real. Algo que vas a hacer esta semana o la próxima. Manual, repetible."],
        ["02", "Escribe el prompt con los 4 elementos", "Rol, tarea, contexto, formato. Si te tarda más de 5 minutos, está bien."],
        ["03", "Pruébalo en Claude", "Mira la respuesta. ¿Es útil? ¿Le falta algo? ¿Sobra algo?"],
        ["04", "Comparte en pares", "Con quien tienes a un lado. Comparten qué prompt usaron y qué tan útil salió la respuesta."],
      ].map(([n, t, b]) => (
        <div key={n} className="grid grid-cols-[60px_1fr] gap-6 py-4 border-b border-line">
          <div className="font-mono text-[13px] font-bold text-accent tracking-wide">{n}</div>
          <div>
            <h3 className="text-[16.5px] font-medium text-ink">{t}</h3>
            <p className="text-[13.5px] text-ink-3 mt-1 leading-[1.55]">{b}</p>
          </div>
        </div>
      ))}
    </div>
  </SlideShell>
);

// 10 Afinar
const Slide10 = (
  <SlideShell tag="Calidad · 25 min" num={10} total={TOTAL}>
    <h2 className="font-serif-display text-[36px] md:text-[44px] leading-[1.1] text-ink">
      Una respuesta no es <strong className="text-navy-deep font-medium">final</strong> hasta que tú la apruebas.
    </h2>
    <p className="text-[17px] text-ink mt-6 max-w-[720px] leading-[1.5]">
      Claude es un asistente, no un oráculo. Su primer output es un borrador. La habilidad real es saber afinar.
    </p>
    <div className="grid md:grid-cols-3 gap-4 mt-10">
      {[
        {
          n: "01 · Reescritura concreta",
          items: ["\"Hazlo más corto\"", "\"Cambia el tono, esto es para cliente\"", "\"Agrega cláusula sobre X\""],
        },
        {
          n: "02 · Dividir la tarea",
          items: ["Si pides demasiado, parte en 3", "Primero estructura", "Luego redacta", "Al final ajusta"],
        },
        {
          n: "03 · Más contexto",
          items: ["Pega el documento completo", "Agrega conversación previa", "Especifica destinatario"],
        },
      ].map((c) => (
        <div key={c.n} className="bg-bg border border-line border-l-4 border-l-navy p-5">
          <div className="font-mono text-[10.5px] uppercase tracking-widest font-bold text-navy mb-3">
            {c.n}
          </div>
          <ul className="space-y-2 text-[13px] text-ink-2">
            {c.items.map((it, i) => (
              <li key={i} className="flex gap-2 leading-[1.5]"><span className="text-ink-4">·</span>{it}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </SlideShell>
);

// 11 Ejercicio 2
const Slide11 = (
  <SlideShell tag="Ejercicio · 12 min" num={11} total={TOTAL}>
    <h2 className="font-serif-display text-[36px] md:text-[44px] leading-[1.1] text-ink">
      Afina lo que ya escribiste.
    </h2>
    <p className="text-ink-3 text-[15px] mt-4">
      En pares, toma TU prompt del ejercicio anterior y aplica al menos 2 de los 3 métodos.
    </p>
    <div className="mt-8 bg-bg border border-line border-l-4 border-l-amber p-6">
      <div className="font-mono text-[10.5px] uppercase tracking-widest font-bold text-amber mb-3">
        Compara antes y después
      </div>
      <ul className="space-y-2 text-[14px] text-ink-2">
        <li className="flex gap-2"><span className="text-ink-4">·</span>¿Qué cambió en la respuesta?</li>
        <li className="flex gap-2"><span className="text-ink-4">·</span>¿Sirve más para tu trabajo real?</li>
        <li className="flex gap-2"><span className="text-ink-4">·</span>¿Hay algo que aún ajustarías una vez más?</li>
      </ul>
    </div>
    <p className="text-[20px] md:text-[22px] text-ink mt-10 max-w-[720px] font-medium leading-[1.4]">
      El criterio de calidad lo pones tú. Claude no sabe si tu trabajo se hace en 1 párrafo o en 5. Tú decides.
    </p>
  </SlideShell>
);

// 12 Caso vivo
const Slide12 = (
  <SlideShell tag="Caso vivo · 20 min" num={12} total={TOTAL}>
    <h2 className="font-serif-display text-[36px] md:text-[44px] leading-[1.1] text-ink">
      Resuelve algo real, ahora.
    </h2>
    <p className="text-ink-3 text-[15px] mt-3 max-w-[640px]">
      En tríos. Cada participante toma 15 minutos máximo. Rotan los 3 roles.
    </p>
    <div className="grid md:grid-cols-3 gap-4 mt-8">
      {[
        ["Rol A · Quien escribe", "Escoge UNA tarea recurrente real de la próxima semana, mínimo 30 minutos de trabajo manual. Aplica el modelo de 4 elementos. Afina al menos 1 vez."],
        ["Rol B · Quien observa", "No tomas el teclado. Observas el prompt, sugieres qué afinar. Anota qué funcionó y qué no."],
        ["Rol C · Quien lleva tiempo", "15 minutos máximo por persona. Avisa cuando pasaron 10 y cuando pasaron 14. Después rotan."],
      ].map(([t, b]) => (
        <div key={t} className="bg-bg border border-line p-5">
          <div className="font-mono text-[10.5px] uppercase tracking-widest font-bold text-navy mb-3">
            {t}
          </div>
          <p className="text-[13.5px] text-ink-2 leading-[1.55]">{b}</p>
        </div>
      ))}
    </div>
  </SlideShell>
);

// 13 Tarea
const Slide13 = (
  <SlideShell tag="Cierre · 10 min" num={13} total={TOTAL}>
    <h2 className="font-serif-display text-[36px] md:text-[44px] leading-[1.1] text-ink">
      Tu tarea para la sesión 2.
    </h2>
    <div className="mt-10 space-y-0">
      {[
        ["01", "Identifica 3 tareas candidatas", "Tres tareas de tu trabajo donde Claude podría ayudarte. Para cada una, en 2 frases: qué es y cuánto tiempo te toma hoy."],
        ["02", "Escoge una y escribe el prompt", "De las 3, escoge la que más te interesa. Escribe el prompt con los 4 elementos. Pruébalo. Afínalo al menos 1 vez."],
        ["03", "Sube tu hoja antes de la sesión 2", "A la carpeta compartida del programa. Esta tarea es la base para escoger tu proceso del challenge en B5."],
      ].map(([n, t, b]) => (
        <div key={n} className="grid grid-cols-[60px_1fr] gap-6 py-5 border-b border-line">
          <div className="font-mono text-[13px] font-bold text-accent tracking-wide">{n}</div>
          <div>
            <h3 className="text-[18px] font-medium text-ink">{t}</h3>
            <p className="text-[14.5px] text-ink-3 mt-1 leading-[1.55]">{b}</p>
          </div>
        </div>
      ))}
    </div>
  </SlideShell>
);

// 14 Cierre
const Slide14 = (
  <SlideShell variant="cover" tag="Hasta la próxima" num={14} total={TOTAL}>
    <h1 className="font-serif-display text-[40px] md:text-[64px] leading-[1.05] text-white max-w-[1000px]">
      Tu prompt de hoy{" "}
      <strong className="text-accent font-medium">no es el final</strong>.<br />
      Lo vas a iterar 50 veces más.
    </h1>
    <p className="text-white/75 text-[17px] md:text-[19px] mt-6 max-w-[720px] leading-[1.5]">
      Ese es el oficio: probar, ajustar, ajustar otra vez. La sesión 2 arranca con tu tarea revisada y entramos a casos más largos.
    </p>
    <div className="mt-auto pt-12 flex justify-between items-end font-mono text-[12px] tracking-widest uppercase text-white/60">
      <span>Atisa Group · Programa de Adopción de IA</span>
      <span>Sesión 1 · Mayo 2026</span>
    </div>
  </SlideShell>
);

export const SLIDES = [
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
];
