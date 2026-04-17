# Diagnóstico de Adopción de IA — Atisa Group

Dashboard web ejecutivo para presentarle al CEO el estado de adopción de IA en Atisa Group, basado en una encuesta interna de 10 preguntas aplicada a colaboradores.

## Lo que hace

- **Resumen ejecutivo** con KPIs clave (frecuencia, habilidad, apertura, horas ahorrables/semana, % campeones).
- **Vista por pregunta**: cada una de las 10 preguntas con su gráfica apropiada.
- **Comparador por dirección**: radar, heatmap y tabla.
- **Matriz Apertura × Habilidad**: 4 cuadrantes (Campeones, Aliados Latentes, Escépticos, Rezagados).
- **Campeones**: colaboradores con habilidad ≥ 4 y uso frecuente ≥ 4, agrupados por dirección.
- **Horas ahorrables**: proyección semanal y anual por dirección.
- **Respuestas individuales**: tabla filtrable con drill-down por respondiente.
- **Importar datos**: UI para subir Excel/CSV actualizados y deduplicar por `email + fechaFin`.
- **Filtros globales**: dirección, habilidad, frecuencia, apertura, plataformas.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS (colores Atisa: `#D2262C` primario, `#1A1A1A` header)
- Recharts para gráficas
- Zustand para filtros globales con persistencia en localStorage
- SheetJS (xlsx) para leer Excels
- React Router (Hash-based para deploy estático)
- Lucide icons

## Quick start

```bash
npm install
npm run ingest      # procesa data/encuesta.xlsx + data/roster.csv -> src/data/responses.json
npm run dev         # http://localhost:5173
npm run build       # genera dist/ listo para deploy
```

## Actualizar los datos

### Opción A - Permanente (al build)

1. Reemplaza `data/encuesta.xlsx` con el export actualizado de MS Forms.
2. Reemplaza `data/roster.csv` si cambio la plantilla.
3. `npm run ingest && npm run build`.
4. Re-deploy.

### Opción B - En vivo (por sesion, solo en el navegador)

1. En la app, abre la pestaña **Importar**.
2. Sube opcional un roster CSV actualizado.
3. Sube el Excel de MS Forms actualizado.
4. El sistema identifica nuevos por `correo + fecha de finalizacion`, ignora duplicados y excluye quienes no esten en el roster.
5. Confirma la importacion. Los datos viven en `localStorage` hasta que resetees.
6. Boton "Descargar JSON consolidado" te da el snapshot para reemplazar `src/data/responses.json` y commitear.

## Estructura

```
diagnostico-ia-atisa/
  data/                 # fuentes crudas (xlsx + csv)
  scripts/ingest.ts     # Excel + CSV -> responses.json
  src/
    config/             # branding y colores
    data/               # responses.json, meta.json, questions.ts, categorization.ts
    lib/                # types, filters (zustand), metrics, utils
    components/
      layout/           # Header, FilterBar
      charts/           # DistributionBar, HorizontalBar, Radar, Scatter, Heatmap...
      ui/               # Card, KpiCard
    pages/              # Overview, ByQuestion, Compare, Matrix, Champions, Hours, Individual, Import
```

## Datos y privacidad

La encuesta contiene correos, nombres y opiniones individuales. El build genera `src/data/responses.json` con esa info. Al deployarse en Vercel con URL publica, cualquiera con el link puede ver las respuestas. Considera:

- Proteger con Vercel Password Protection (plan Pro).
- O mover a despliegue privado.
- Ajustar `src/data/categorization.ts` para afinar categorias tematicas.

## Deploy a Vercel

```bash
npm install -g vercel
vercel --prod
```

O conectar el repo en vercel.com (detecta Vite automaticamente).

## Branding

- Rojo primario: `#D2262C`
- Header negro: `#1A1A1A`
- Gris fondo: `#F5F5F5`
- Tipografia: Segoe UI (stack de sistema)
- Logo en `public/atisa-logo.svg`
