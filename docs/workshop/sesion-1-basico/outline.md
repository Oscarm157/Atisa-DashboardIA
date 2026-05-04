# Sesión 1 · Básico · Outline para facilitador

**Duración:** 120 minutos · **Modalidad:** presencial en sala · **Audiencia:** un grupo Básico (recomendado: misma dirección o familia de áreas) · **Pre-requisito:** los participantes ya navegaron el lobby y la página de lanzamiento del programa.

## Objetivo de la sesión

Que cada participante salga con tres cosas concretas:
1. Su cuenta Claude Enterprise funcionando.
2. Un modelo simple para escribir prompts (rol, tarea, contexto, formato).
3. Un caso real propio resuelto en vivo durante la sesión.

## Pre-requisitos del facilitador

- Confirmar 24h antes con TI que las cuentas Claude Enterprise de los inscritos están activas. Si alguna no está, mover esa persona a sesión 2 o agregarla al final del onboarding.
- Tener abierto en pestañas del navegador: Claude Enterprise (con cuenta del facilitador), `casos_por_direccion.json` filtrado por la dirección del grupo, postura de seguridad de información firmada.
- Imprimir 1 hoja de tarea por participante (`tarea-participante.md`).
- Slides en pantalla: `slides.html` (mismo formato del reporte/lobby).

## Estructura (120 min)

### 0–7 min · Intro rápida (7 min)

**Slide:** "Sesión 1 · Básico · Atisa 2026"

**Lo que dice el facilitador (en sus palabras):**
- "Asumo que ya leyeron la página de lanzamiento, así que no repito el por qué del programa."
- Recordar 3 reglas mínimas:
  1. Asistencia: 4 de 5 sesiones para conservar plaza en el challenge.
  2. Tarea entre sesiones: corta y aplicada al trabajo real.
  3. Confidencialidad: lo que se discute en la sala se queda en la sala (especialmente la postura de seguridad).
- Decir qué pasa al final de las 2h: "vas a tener tu cuenta Claude funcionando, un modelo de prompt en la mano y un caso tuyo resuelto en vivo".

**No hacer:** no pedir presentaciones uno por uno (pierde 20 min). Si el grupo no se conoce, dinamica de "decir tu nombre + UNA tarea de tu trabajo que te roba tiempo" en 30 segundos por persona, máximo 5 minutos total.

---

### 7–22 min · Postura de seguridad de información (15 min)

**Por qué primero:** es la barrera #1 reportada en la encuesta (53% del personal). Si no se cierra esta duda al inicio, los participantes no ponen información real en sus prompts y la sesión se vuelve teórica.

**Slides:** "Qué SÍ puedes compartir con Claude Enterprise" / "Qué NO" / "Procedimiento ante duda"

**Contenido a cubrir:**
- **Sí se puede:** documentos públicos del proyecto, contratos modelo (sin partes nominales), correos sin datos confidenciales, planos arquitectónicos generales, respuestas internas de procedimiento, tareas ofimáticas (resumir, traducir, redactar).
- **No se puede:** datos fiscales, nóminas, datos personales de empleados (RFC, CURP, banco, salario), planos confidenciales de proyectos sensibles, contratos vigentes con cláusulas confidenciales, información de clientes regulada.
- **Procedimiento ante duda:** un solo canal a TI con respuesta en menos de 4h hábiles. Mientras tanto, no metas la información.

> ⚠ Si la postura aún no está firmada por DG/TI al momento de la sesión, esto es un bloqueador. NO se puede dar la sesión sin esto. Reportar al PMO antes de arrancar.

**Cierre del bloque:** preguntar "¿alguna duda concreta sobre algo de su día a día?" Tomar 2-3 ejemplos. No alargar.

---

### 22–35 min · Onboarding técnico Claude Enterprise (13 min)

**Slide:** "Tu cuenta Claude Enterprise"

**Hands-on:**
1. Cada participante abre `claude.ai` en su laptop.
2. Login con correo corporativo Atisa (SSO si aplica, o credenciales).
3. Verificación: cada quien escribe en el chat: "Hola Claude, soy [nombre] de [dirección] y este es mi primer día usándote." Recibe respuesta.
4. Tour de la UI por el facilitador en su pantalla:
   - Chat principal y caja de prompt.
   - Historial de conversaciones (lateral izquierdo).
   - Crear nueva conversación.
   - Adjuntar archivos (pero recordar la regla de seguridad).
   - Settings básicos.

**Diferencia frente a ChatGPT (mencionar rápido):** Claude tiende a ser más cuidadoso con razonamiento largo, mejor con texto y análisis, integración corporativa de Atisa significa que las conversaciones no entrenan modelos públicos.

**Si alguien no logra entrar:** que se siente con un compañero que sí. TI atiende los casos al final de la sesión, no se detiene el grupo.

---

### 35–65 min · Anatomía de un buen prompt (30 min)

**Slide:** "Cuatro elementos de un prompt útil"

**Modelo a enseñar:**
1. **Rol**: quién quieres que sea Claude para esta tarea ("eres un analista de costos", "eres mi editor de correos").
2. **Tarea**: qué quieres que haga, en una frase verbo + objeto ("redacta un correo a proveedor", "resume este documento en 5 puntos").
3. **Contexto**: qué información necesita para hacerlo bien ("el proveedor se llama X, el tema es Y, la urgencia es Z").
4. **Formato**: cómo quieres la respuesta ("3 párrafos cortos", "tabla de 4 columnas", "lista numerada").

**Demo en vivo (6 min):**
- Tomar UN caso real del grupo (de `casos_por_direccion.json` o pedirle a un participante que comparta una tarea).
- Primer intento sin método: prompt vago como "ayúdame con esto". Mostrar respuesta genérica.
- Segundo intento con los 4 elementos. Mostrar respuesta útil.
- Resaltar la diferencia.

**Ejemplos por dirección** (el facilitador escoge según el grupo):

| Dirección | Tarea típica | Prompt modelo |
|-----------|--------------|---------------|
| Constructora | Redactar correo a proveedor pidiendo cotización | Rol: comprador. Tarea: redactar correo. Contexto: necesito 50 toneladas de cemento gris para obra Tijuana, urgencia 2 semanas. Formato: 3 párrafos cortos, tono profesional. |
| Capital Humano | Resumir hoja de vida para shortlist | Rol: reclutador. Tarea: resumir CV en 5 bullets clave. Contexto: vacante asistente administrativo. Formato: bullets con años de experiencia + competencia + alineación con perfil. |
| Finanzas | Redactar nota explicativa de varianza presupuestal | Rol: analista financiero. Tarea: explicar varianza del 8% en una partida. Contexto: presupuesto X, ejecutado Y, causa principal Z. Formato: párrafo de 4 líneas para reporte mensual. |
| Costos y Proyectos | Comparar dos cotizaciones | Rol: estimador. Tarea: comparar dos cotizaciones de obra. Contexto: obra X, cotización A vs B con valores diferentes. Formato: tabla con criterios y recomendación final. |
| TI | Documentar un procedimiento técnico | Rol: documentador técnico. Tarea: convertir mis notas en procedimiento paso a paso. Contexto: notas crudas pegadas. Formato: lista numerada con pre-requisitos y validación final. |
| Marketing | Generar 3 títulos para una pieza | Rol: copywriter. Tarea: generar 3 títulos para un post. Contexto: tema, audiencia, tono Atisa. Formato: 3 opciones, cada una con explicación de 1 línea. |

> Buscar más ejemplos del grupo específico en `docs/workshop/casos_por_direccion.json` antes de la sesión.

**Ejercicio guiado individual (15 min):**
- Cada participante toma una tarea de SU día a día.
- Escribe un prompt usando los 4 elementos.
- Lo prueba en Claude.
- En pares, comparten qué tan útil salió la respuesta.

**Cierre del bloque:** 2-3 voluntarios comparten su mejor prompt en plenaria.

---

### 65–90 min · Criterio de calidad + cómo afinar (25 min)

**Slide:** "Una respuesta no es final hasta que tú la apruebas"

**Concepto a transmitir:** Claude es un asistente, no un oráculo. Su primer output es un borrador. La habilidad real es saber afinar.

**Tres formas de afinar:**

1. **Pedirle reescritura concreta:** "está bien pero hazlo más corto" / "cambia el tono, esto es para un cliente" / "agrega una cláusula sobre X".
2. **Dividir la tarea:** si pides demasiado en un prompt, divide. Primero "estructura el correo", luego "redacta el cuerpo", luego "ajusta el cierre".
3. **Dar más contexto:** muchas veces lo que falta es información. Pega el documento completo, comparte la conversación previa, especifica al destinatario.

**Demo en vivo (8 min):**
- Tomar el output del primer intento del bloque anterior (o uno propio del facilitador).
- Aplicar los 3 ajustes uno por uno.
- Mostrar cómo mejora cada iteración.

**Ejercicio en pares (12 min):**
- Cada participante toma SU prompt del bloque anterior y lo afina con al menos 2 de los 3 métodos.
- Pares comparan output inicial vs final.

**Concepto adicional (3 min):** "El criterio de calidad lo pones tú. Claude no sabe si tu trabajo se hace en 1 párrafo o en 5. Tú decides."

---

### 90–110 min · Tu primer caso vivo (20 min)

**Slide:** "Resuelve algo real, ahora"

**Dinámica:**
- Tríos. Cada participante:
  1. Escoge UNA tarea recurrente real de la próxima semana (mínimo 30 min de trabajo manual).
  2. Aplica el modelo: rol + tarea + contexto + formato.
  3. Afina al menos 1 vez.
  4. Termina con un output utilizable.

**Roles del trío:**
- Quien escribe el prompt.
- Quien observa y sugiere mejoras.
- Quien toma tiempo (15 min máximo por persona).

Rotan los 3 roles.

> El facilitador rota entre los tríos. Si alguien se atora 5 min en el mismo prompt sin avanzar, intervenir y modelar.

---

### 110–120 min · Tarea para sesión 2 + cierre (10 min)

**Slide:** "Lo que llevas a casa"

**Tarea entregable para sesión 2:**
- Identifica **3 tareas** de tu trabajo donde Claude podría ayudarte.
- Para cada una escribe en 2 frases: qué es la tarea y cuánto tiempo te toma hoy.
- Trae al menos **UNA con prompt borrador** ya probado.
- Esta tarea es la base para escoger tu proceso del challenge (B5).

**Entrega:** sube el documento a la carpeta compartida del programa antes de la sesión 2.

**Cierre (5 min):**
- Recordar fecha y hora de sesión 2.
- Preguntar: "¿qué fue lo más útil de hoy?". Tomar 3 respuestas, no más.
- Cerrar con: "Su prompt de hoy NO es el final. Lo van a iterar 50 veces más. Ese es el oficio."

## Riesgos en esta sesión específica

| Riesgo | Mitigación |
|--------|------------|
| Cuentas de Claude no listas para algunos | Confirmar con TI 24h antes. Tener lista de "asistencia con cuenta pendiente" para sesión 2. |
| Postura de seguridad no firmada | NO arrancar la sesión. Es el bloqueador #1. |
| Grupo silencioso, no comparte casos | Tener 6 ejemplos preparados de `casos_por_direccion.json` por si nadie habla. |
| Alguien quiere usarlo con datos sensibles desde el día 1 | Frenar en el momento, recordar la regla, ofrecer caso alternativo. |
| Se acaba el tiempo en bloque de prompts | Recortar la sección "criterio de calidad" a 15 min, NUNCA recortar "tu primer caso vivo", es el entregable simbólico de la sesión. |

## Métricas de éxito de esta sesión

- ≥95% de los inscritos asisten.
- ≥90% logra hacer login a Claude.
- ≥80% sale con su prompt afinado al menos 1 vez.
- 0 incidentes de información sensible compartida en la sesión.
- ≥70% entrega la tarea antes de sesión 2.
