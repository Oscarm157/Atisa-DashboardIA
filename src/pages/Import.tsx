import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { useFilters, getMeta } from "../lib/filters";
import bakedResponses from "../data/responses.json";
import type { SurveyResponse, Likert1to5, HoursBucket } from "../lib/types";
import { Card, CardTitle, SectionTitle } from "../components/ui/Card";
import { Upload, FileSpreadsheet, Check, AlertTriangle, Download, RotateCcw, Info } from "lucide-react";
import { HOURS_BUCKETS } from "../data/questions";
import { Q5_CATEGORIES, Q6_CATEGORIES, Q8_CATEGORIES, categorize } from "../data/categorization";

type RosterMap = Map<string, { direccion: string; departamento: string; nombreOficial: string; nEmpleado: number }>;

type ImportResult = {
  added: SurveyResponse[];
  skippedDuplicates: string[];
  skippedNotInRoster: string[];
  skippedTest: string[];
};

const LIKERT_TEXT_MAP: Record<string, Likert1to5> = {
  "totalmente en desacuerdo": 1,
  "en desacuerdo": 2,
  "neutral": 3,
  "de acuerdo": 4,
  "totalmente de acuerdo": 5,
};
function toLikert(v: unknown): Likert1to5 {
  if (typeof v === "number" && v >= 1 && v <= 5) return v as Likert1to5;
  const s = String(v ?? "").trim().toLowerCase();
  if (s in LIKERT_TEXT_MAP) return LIKERT_TEXT_MAP[s];
  const n = Number(s);
  if (n >= 1 && n <= 5) return n as Likert1to5;
  return 3 as Likert1to5;
}
function splitMulti(v: unknown): string[] {
  if (!v) return [];
  return String(v).split(";").map((s) => s.trim()).filter(Boolean);
}
function toHoursBucket(v: unknown): HoursBucket {
  const s = String(v || "").trim();
  if (s in HOURS_BUCKETS) return s as HoursBucket;
  if (s.toLowerCase().includes("menos de 2")) return "Menos de 2 horas";
  if (s.toLowerCase().includes("más de 10") || s.toLowerCase().includes("mas de 10")) return "Más de 10 horas";
  if (s.includes("5 - 10") || s.includes("5-10")) return "Entre 5 - 10 horas";
  return "Entre 2 - 5 horas";
}
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = []; let field = ""; let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQ = false;
      else field += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
      else if (c !== "\r") field += c;
    }
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.trim().length > 0));
}

function buildRosterFromCSV(text: string): RosterMap {
  const rows = parseCSV(text);
  const header = rows[0].map((h) => h.toLowerCase());
  const idxEmp = header.indexOf("n_empleado");
  const idxNombre = header.indexOf("nombre");
  const idxDir = header.indexOf("direccion");
  const idxDep = header.indexOf("departamento");
  const idxCorreo = header.indexOf("correo");
  const map: RosterMap = new Map();
  for (let r = 1; r < rows.length; r++) {
    const email = (rows[r][idxCorreo] || "").trim().toLowerCase();
    if (!email) continue;
    if (!map.has(email)) {
      map.set(email, {
        nEmpleado: Number(rows[r][idxEmp]) || 0,
        nombreOficial: (rows[r][idxNombre] || "").trim(),
        direccion: (rows[r][idxDir] || "").trim(),
        departamento: (rows[r][idxDep] || "").trim(),
      });
    }
  }
  return map;
}

function buildExistingRosterMap(): RosterMap {
  const baked = bakedResponses as SurveyResponse[];
  const map: RosterMap = new Map();
  baked.forEach((r) => {
    map.set(r.email.toLowerCase(), {
      nEmpleado: r.nEmpleado ?? 0,
      nombreOficial: r.nombreOficial,
      direccion: r.direccion,
      departamento: r.departamento,
    });
  });
  const imported = useFilters.getState().imported || [];
  imported.forEach((r) => {
    map.set(r.email.toLowerCase(), {
      nEmpleado: r.nEmpleado ?? 0,
      nombreOficial: r.nombreOficial,
      direccion: r.direccion,
      departamento: r.departamento,
    });
  });
  return map;
}

export function Import() {
  const filters = useFilters();
  const meta = getMeta();
  const encuestaRef = useRef<HTMLInputElement>(null);
  const rosterRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newRoster, setNewRoster] = useState<RosterMap | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRosterFile = async (file: File) => {
    setError(null);
    try {
      const text = await file.text();
      const rm = buildRosterFromCSV(text);
      setNewRoster(rm);
    } catch (e) {
      setError(`Error leyendo el roster CSV: ${(e as Error).message}`);
    }
  };

  const handleEncuestaFile = async (file: File) => {
    setError(null);
    setLoading(true);
    try {
      const ab = await file.arrayBuffer();
      const wb = XLSX.read(ab, { type: "array", cellDates: true });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, { defval: "" });
      if (rows.length === 0) throw new Error("El archivo está vacío.");

      const headers = Object.keys(rows[0]);
      const rosterMap = newRoster ?? buildExistingRosterMap();

      const baked = bakedResponses as SurveyResponse[];
      const existing = new Set([...baked, ...(filters.imported || [])].map((r) => `${r.email}|${r.fechaFin}`));

      const added: SurveyResponse[] = [];
      const skippedDuplicates: string[] = [];
      const skippedNotInRoster: string[] = [];
      const skippedTest: string[] = [];

      let maxId = [...baked, ...(filters.imported || [])].reduce((m, r) => Math.max(m, r.id), 0);

      for (const row of rows) {
        const email = String(row[headers[3]] || "").trim().toLowerCase();
        const nombre = String(row[headers[4]] || "").trim();
        const fechaFin = String(row[headers[2]] || "");
        const key = `${email}|${fechaFin}`;

        const ejemploExito = String(row[headers[10]] || "").trim();
        const herramientasArea = String(row[headers[11]] || "").trim();
        const procesoPrioritario = String(row[headers[13]] || "").trim();

        const testStr = (ejemploExito + herramientasArea + procesoPrioritario).toLowerCase();
        if (testStr.includes("testttt")) {
          skippedTest.push(email || nombre);
          continue;
        }
        if (existing.has(key)) {
          skippedDuplicates.push(email);
          continue;
        }
        const roster = rosterMap.get(email);
        if (!roster) {
          skippedNotInRoster.push(email || nombre);
          continue;
        }

        const frec = toLikert(row[headers[6]]);
        const hab = toLikert(row[headers[8]]);
        const li1 = toLikert(row[headers[15]]);
        const li2 = toLikert(row[headers[16]]);
        const li3 = toLikert(row[headers[17]]);
        const apertura = (li1 + li2 + li3) / 3;
        const horasBucket = toHoursBucket(row[headers[14]]);

        maxId += 1;
        const entry: SurveyResponse = {
          id: maxId,
          email,
          nombre,
          nombreOficial: roster.nombreOficial,
          nEmpleado: roster.nEmpleado,
          direccion: roster.direccion,
          departamento: roster.departamento,
          fechaInicio: String(row[headers[1]] || ""),
          fechaFin,
          frecuencia: frec,
          plataformas: splitMulti(row[headers[7]]),
          habilidad: hab,
          funcionesValor: splitMulti(row[headers[9]]),
          ejemploExito,
          herramientasArea,
          barreras: splitMulti(row[headers[12]]),
          procesoPrioritario,
          horasAhorrables: horasBucket,
          likert: { indispensable: li1, repetitivo: li2, modificarFlujos: li3 },
          aperturaScore: apertura,
          horasAhorradasNum: HOURS_BUCKETS[horasBucket] ?? 0,
          esCampeon: hab >= 4 && frec >= 4,
          cat: {
            q5: categorize(ejemploExito, Q5_CATEGORIES),
            q6: categorize(herramientasArea, Q6_CATEGORIES),
            q8: categorize(procesoPrioritario, Q8_CATEGORIES),
          },
        };
        added.push(entry);
        existing.add(key);
      }

      setResult({ added, skippedDuplicates, skippedNotInRoster, skippedTest });
    } catch (e) {
      setError(`Error procesando el Excel: ${(e as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const confirmImport = () => {
    if (!result) return;
    const current = filters.imported || [];
    const merged = [...current, ...result.added];
    filters.setImported(merged, {
      importedAt: new Date().toISOString(),
      added: result.added.length,
      skippedDuplicates: result.skippedDuplicates.length,
      skippedNotInRoster: result.skippedNotInRoster.length,
      skippedTest: result.skippedTest.length,
    });
    setResult(null);
    if (encuestaRef.current) encuestaRef.current.value = "";
  };

  const resetImport = () => {
    filters.setImported(null, null);
    setResult(null);
  };

  const downloadMerged = () => {
    const baked = bakedResponses as SurveyResponse[];
    const merged = [...baked, ...(filters.imported || [])];
    const blob = new Blob([JSON.stringify(merged, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `responses-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importedCount = (filters.imported || []).length;
  const baked = bakedResponses as SurveyResponse[];
  const totalCount = baked.length + importedCount;

  return (
    <div>
      <h1 className="text-2xl font-bold text-atisa-black mb-1">Importar datos</h1>
      <p className="text-sm text-atisa-grayDark mb-5">
        Sube un Excel actualizado (MS Forms) y opcionalmente un roster CSV actualizado. El sistema identifica por
        <span className="font-mono text-xs mx-1 px-1 py-0.5 bg-atisa-gray rounded">correo + fecha de finalización</span>
        qué respuestas son nuevas; las duplicadas y las que no están en el roster se omiten automáticamente.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        <StatCard label="Baked in (base)" value={baked.length} />
        <StatCard label="Importadas (sesión)" value={importedCount} accent />
        <StatCard label="Total activo" value={totalCount} bold />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardTitle subtitle="Opcional. Si actualizas el roster, se aplicará en esta sesión y a futuras importaciones.">
            1. Roster CSV (opcional)
          </CardTitle>
          <Uploader
            label="Selecciona roster.csv"
            accept=".csv"
            inputRef={rosterRef}
            onFile={handleRosterFile}
          />
          {newRoster && (
            <div className="mt-2 text-xs text-atisa-grayDark flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-green-600" /> Roster cargado: {newRoster.size} empleados.
            </div>
          )}
          {!newRoster && (
            <div className="mt-2 text-xs text-atisa-grayDark">
              Si no subes uno, se usa el roster original (ingestado al build).
            </div>
          )}
        </Card>

        <Card>
          <CardTitle subtitle="Export .xlsx de Microsoft Forms. Mismas columnas que el original.">
            2. Excel de respuestas
          </CardTitle>
          <Uploader
            label={loading ? "Procesando..." : "Selecciona encuesta.xlsx"}
            accept=".xlsx"
            inputRef={encuestaRef}
            onFile={handleEncuestaFile}
            disabled={loading}
          />
          {error && (
            <div className="mt-2 text-xs text-red-600 flex items-start gap-1">
              <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" /> {error}
            </div>
          )}
        </Card>
      </div>

      {result && (
        <>
          <SectionTitle>Resultado del análisis</SectionTitle>
          <Card>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard label="Nuevas" value={result.added.length} accent />
              <StatCard label="Duplicadas (ignoradas)" value={result.skippedDuplicates.length} />
              <StatCard label="No están en roster" value={result.skippedNotInRoster.length} />
              <StatCard label="De prueba" value={result.skippedTest.length} />
            </div>
            {result.skippedNotInRoster.length > 0 && (
              <div className="mt-3 text-xs text-atisa-grayDark">
                <div className="font-semibold mb-1 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" />
                  Correos excluidos por no estar en el roster:
                </div>
                <div className="font-mono bg-atisa-gray p-2 rounded-md max-h-24 overflow-y-auto">
                  {result.skippedNotInRoster.join(", ")}
                </div>
              </div>
            )}
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={confirmImport}
                disabled={result.added.length === 0}
                className="flex items-center gap-2 bg-atisa-red text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-atisa-redDark transition-colors disabled:opacity-40"
              >
                <Check className="w-4 h-4" /> Confirmar y agregar ({result.added.length})
              </button>
              <button
                onClick={() => setResult(null)}
                className="text-xs text-atisa-grayDark hover:text-atisa-red"
              >
                Cancelar
              </button>
            </div>
          </Card>
        </>
      )}

      <SectionTitle>Gestión</SectionTitle>
      <Card>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={downloadMerged}
            className="flex items-center gap-2 bg-atisa-black text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4" /> Descargar JSON consolidado
          </button>
          {importedCount > 0 && (
            <button
              onClick={resetImport}
              className="flex items-center gap-2 bg-white border border-atisa-grayMid text-atisa-black px-4 py-2 rounded-md text-sm hover:border-atisa-red transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Limpiar importados ({importedCount})
            </button>
          )}
        </div>
        <div className="mt-3 text-xs text-atisa-grayDark">
          El JSON descargado puede reemplazar <span className="font-mono">src/data/responses.json</span> en el proyecto
          y rebuildearse para que los nuevos datos queden como base.
        </div>
      </Card>

      <SectionTitle>Notas del último ingest</SectionTitle>
      <Card>
        <div className="text-xs text-atisa-grayDark space-y-1">
          <div>Generado: {new Date(meta.generatedAt).toLocaleString("es-MX")}</div>
          <div>Base total: {meta.totalValid} colaboradores válidos.</div>
          <div>Correos en el Excel original no encontrados en roster: {meta.excludedNotInRoster.length}</div>
          {meta.duplicatesInRoster.length > 0 && (
            <div>Duplicados detectados en roster CSV: {meta.duplicatesInRoster.join(", ")}</div>
          )}
        </div>
      </Card>
    </div>
  );
}

function Uploader({
  label,
  accept,
  inputRef,
  onFile,
  disabled,
}: {
  label: string;
  accept: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onFile: (f: File) => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={() => inputRef.current?.click()}
      disabled={disabled}
      className="w-full border-2 border-dashed border-atisa-grayMid rounded-md px-4 py-6 flex flex-col items-center gap-2 hover:border-atisa-red transition-colors disabled:opacity-50"
    >
      <div className="w-10 h-10 rounded-full bg-atisa-red/10 flex items-center justify-center text-atisa-red">
        <Upload className="w-5 h-5" />
      </div>
      <div className="text-sm font-medium text-atisa-black">{label}</div>
      <div className="text-[10px] text-atisa-grayDark flex items-center gap-1">
        <FileSpreadsheet className="w-3 h-3" /> {accept}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
        }}
      />
    </button>
  );
}

function StatCard({
  label,
  value,
  accent,
  bold,
}: {
  label: string;
  value: number | string;
  accent?: boolean;
  bold?: boolean;
}) {
  return (
    <div
      className={`rounded-md p-3 ${
        accent ? "bg-atisa-red text-white" : bold ? "bg-atisa-black text-white" : "bg-white border border-atisa-grayMid/40"
      }`}
    >
      <div className={`text-[10px] uppercase tracking-wider ${accent || bold ? "text-white/80" : "text-atisa-grayDark"} font-semibold`}>
        {label}
      </div>
      <div className={`text-xl font-bold ${accent || bold ? "text-white" : "text-atisa-black"}`}>{value}</div>
    </div>
  );
}
