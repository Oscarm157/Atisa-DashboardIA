import * as XLSX from "xlsx";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import {
  Q5_CATEGORIES,
  Q6_CATEGORIES,
  Q8_CATEGORIES,
  categorize,
} from "../src/data/categorization";
import { HOURS_BUCKETS } from "../src/data/questions";
import type {
  SurveyResponse,
  RosterEntry,
  IngestMeta,
  Likert1to5,
  HoursBucket,
} from "../src/lib/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const XLSX_PATH = path.join(ROOT, "data", "encuesta.xlsx");
const CSV_PATH = path.join(ROOT, "data", "roster.csv");
const OUT_RESPONSES = path.join(ROOT, "src", "data", "responses.json");
const OUT_META = path.join(ROOT, "src", "data", "meta.json");

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") {
        row.push(field);
        field = "";
      } else if (c === "\n") {
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else if (c === "\r") {
        // skip
      } else {
        field += c;
      }
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim().length > 0));
}

function loadRoster(): { map: Map<string, RosterEntry>; duplicates: string[] } {
  const text = fs.readFileSync(CSV_PATH, "utf-8");
  const rows = parseCSV(text);
  const header = rows[0].map((h) => h.toLowerCase());
  const idxEmp = header.indexOf("n_empleado");
  const idxNombre = header.indexOf("nombre");
  const idxDir = header.indexOf("direccion");
  const idxDep = header.indexOf("departamento");
  const idxCorreo = header.indexOf("correo");

  const map = new Map<string, RosterEntry>();
  const duplicates: string[] = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const email = (row[idxCorreo] || "").trim().toLowerCase();
    if (!email) continue;
    const entry: RosterEntry = {
      nEmpleado: Number(row[idxEmp]) || 0,
      nombreOficial: (row[idxNombre] || "").trim(),
      direccion: (row[idxDir] || "").trim(),
      departamento: (row[idxDep] || "").trim(),
      email,
    };
    if (map.has(email)) {
      duplicates.push(email);
    } else {
      map.set(email, entry);
    }
  }
  return { map, duplicates };
}

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
  return String(v)
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function toHoursBucket(v: unknown): HoursBucket {
  const s = String(v || "").trim();
  if (s in HOURS_BUCKETS) return s as HoursBucket;
  // handle slight variations
  if (s.toLowerCase().includes("menos de 2")) return "Menos de 2 horas";
  if (s.toLowerCase().includes("más de 10") || s.toLowerCase().includes("mas de 10"))
    return "Más de 10 horas";
  if (s.includes("5 - 10") || s.includes("5-10")) return "Entre 5 - 10 horas";
  if (s.includes("2 - 5") || s.includes("2-5")) return "Entre 2 - 5 horas";
  return "Menos de 2 horas";
}

function normalizeDateString(v: unknown): string {
  if (!v) return "";
  if (v instanceof Date) return v.toISOString();
  return String(v);
}

function isTestResponse(r: { ejemploExito: string; herramientasArea: string; procesoPrioritario: string }): boolean {
  const s = (r.ejemploExito + " " + r.herramientasArea + " " + r.procesoPrioritario).toLowerCase();
  return s.includes("testttt") || (s.trim().length < 6 && !s.match(/\w{3,}/));
}

function main() {
  console.log("→ Leyendo roster:", CSV_PATH);
  const { map: rosterMap, duplicates } = loadRoster();
  console.log(`  Roster: ${rosterMap.size} empleados (${duplicates.length} duplicados ignorados)`);
  if (duplicates.length > 0) {
    console.log(`  ⚠ Correos duplicados en CSV: ${duplicates.join(", ")}`);
  }

  console.log("→ Leyendo encuesta:", XLSX_PATH);
  const buf = fs.readFileSync(XLSX_PATH);
  const wb = XLSX.read(buf, { type: "buffer", cellDates: true });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, { defval: "" });
  console.log(`  Excel: ${rows.length} filas totales`);

  const firstHeader = Object.keys(rows[0] || {});
  // Identify columns by position
  const cols = {
    id: firstHeader[0],
    inicio: firstHeader[1],
    fin: firstHeader[2],
    email: firstHeader[3],
    nombre: firstHeader[4],
    frecuencia: firstHeader[5],
    plataformas: firstHeader[6],
    habilidad: firstHeader[7],
    funcionesValor: firstHeader[8],
    ejemploExito: firstHeader[9],
    herramientasArea: firstHeader[10],
    barreras: firstHeader[11],
    procesoPrioritario: firstHeader[12],
    horasAhorrables: firstHeader[13],
    likert1: firstHeader[14],
    likert2: firstHeader[15],
    likert3: firstHeader[16],
  };

  const valid: SurveyResponse[] = [];
  const excludedNotInRoster: string[] = [];
  const excludedTest: string[] = [];
  const directionCounts: Record<string, number> = {};

  for (const row of rows) {
    const email = String(row[cols.email] || "").trim().toLowerCase();
    const nombre = String(row[cols.nombre] || "").trim();

    const parsed = {
      frecuencia: toLikert(row[cols.frecuencia]),
      plataformas: splitMulti(row[cols.plataformas]),
      habilidad: toLikert(row[cols.habilidad]),
      funcionesValor: splitMulti(row[cols.funcionesValor]),
      ejemploExito: String(row[cols.ejemploExito] || "").trim(),
      herramientasArea: String(row[cols.herramientasArea] || "").trim(),
      barreras: splitMulti(row[cols.barreras]),
      procesoPrioritario: String(row[cols.procesoPrioritario] || "").trim(),
      horasAhorrables: toHoursBucket(row[cols.horasAhorrables]),
      likert: {
        indispensable: toLikert(row[cols.likert1]),
        repetitivo: toLikert(row[cols.likert2]),
        modificarFlujos: toLikert(row[cols.likert3]),
      },
    };

    if (isTestResponse(parsed)) {
      excludedTest.push(email || nombre || "(unknown)");
      continue;
    }

    const roster = rosterMap.get(email);
    if (!roster) {
      excludedNotInRoster.push(email || nombre);
      continue;
    }

    const aperturaScore =
      (parsed.likert.indispensable +
        parsed.likert.repetitivo +
        parsed.likert.modificarFlujos) /
      3;
    const horasAhorradasNum = HOURS_BUCKETS[parsed.horasAhorrables] || 0;
    const esCampeon = parsed.habilidad >= 4 && parsed.frecuencia >= 4;

    const response: SurveyResponse = {
      id: Number(row[cols.id]) || valid.length + 1,
      email,
      nombre,
      nombreOficial: roster.nombreOficial,
      nEmpleado: roster.nEmpleado,
      direccion: roster.direccion,
      departamento: roster.departamento,
      fechaInicio: normalizeDateString(row[cols.inicio]),
      fechaFin: normalizeDateString(row[cols.fin]),
      ...parsed,
      aperturaScore,
      horasAhorradasNum,
      esCampeon,
      cat: {
        q5: categorize(parsed.ejemploExito, Q5_CATEGORIES),
        q6: categorize(parsed.herramientasArea, Q6_CATEGORIES),
        q8: categorize(parsed.procesoPrioritario, Q8_CATEGORIES),
      },
    };

    valid.push(response);
    directionCounts[roster.direccion] = (directionCounts[roster.direccion] || 0) + 1;
  }

  const meta: IngestMeta = {
    generatedAt: new Date().toISOString(),
    totalValid: valid.length,
    excludedNotInRoster,
    excludedTest,
    duplicatesInRoster: duplicates,
    directionCounts,
  };

  fs.writeFileSync(OUT_RESPONSES, JSON.stringify(valid, null, 2), "utf-8");
  fs.writeFileSync(OUT_META, JSON.stringify(meta, null, 2), "utf-8");

  console.log("\n===== RESUMEN =====");
  console.log(`✓ Respondientes válidos:      ${valid.length}`);
  console.log(`✗ Excluidos (test):           ${excludedTest.length}`);
  console.log(`✗ Excluidos (no en roster):   ${excludedNotInRoster.length}`);
  if (excludedNotInRoster.length > 0) {
    console.log(`   ${excludedNotInRoster.join("\n   ")}`);
  }
  console.log(`\nPor dirección:`);
  Object.entries(directionCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([d, n]) => console.log(`  ${n.toString().padStart(3)}  ${d}`));
  console.log(`\n✓ Escrito: ${OUT_RESPONSES}`);
  console.log(`✓ Escrito: ${OUT_META}`);
}

main();
