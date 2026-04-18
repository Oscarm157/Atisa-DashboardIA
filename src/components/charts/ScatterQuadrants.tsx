import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  ZAxis,
  LabelList,
} from "recharts";
import { BRAND, DIRECTION_COLORS, shortDirection } from "../../config/branding";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw, MousePointer2 } from "lucide-react";

type Point = {
  x: number;
  y: number;
  nombre: string;
  direccion: string;
  n?: number;
  idx?: number;
  tooltip?: string;
};

const FULL: [number, number] = [0.5, 5.5];
const MIN_RANGE = 0.6; // no puedes zoom más cerca que este tamaño
const MAX_RANGE = 5;   // tope al alejar

export function ScatterQuadrants({
  data,
  mode = "individual",
  onItemClick,
}: {
  data: Point[];
  mode?: "individual" | "direccion";
  onItemClick?: (direccion: string) => void;
}) {
  const [xDomain, setXDomain] = useState<[number, number]>(FULL);
  const [yDomain, setYDomain] = useState<[number, number]>(FULL);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    x0: [number, number];
    y0: [number, number];
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const isDefault = xDomain[0] === FULL[0] && xDomain[1] === FULL[1] && yDomain[0] === FULL[0] && yDomain[1] === FULL[1];

  const reset = useCallback(() => {
    setXDomain(FULL);
    setYDomain(FULL);
  }, []);

  const clamp = useCallback((a: number, b: number): [number, number] => {
    let range = b - a;
    if (range < MIN_RANGE) {
      const c = (a + b) / 2;
      return [c - MIN_RANGE / 2, c + MIN_RANGE / 2];
    }
    if (range > MAX_RANGE) {
      const c = (a + b) / 2;
      return [c - MAX_RANGE / 2, c + MAX_RANGE / 2];
    }
    if (a < FULL[0]) return [FULL[0], FULL[0] + range];
    if (b > FULL[1]) return [FULL[1] - range, FULL[1]];
    return [a, b];
  }, []);

  // Listener no-pasivo para poder prevenir scroll del body al hacer zoom dentro de la gráfica
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      // Offset aproximado del área de plot (descontando márgenes de recharts)
      const padLeft = 60;
      const padRight = 30;
      const padTop = 20;
      const padBottom = 50;
      const plotW = rect.width - padLeft - padRight;
      const plotH = rect.height - padTop - padBottom;
      const px = Math.max(0, Math.min(1, (e.clientX - rect.left - padLeft) / plotW));
      const py = 1 - Math.max(0, Math.min(1, (e.clientY - rect.top - padTop) / plotH));
      const factor = e.deltaY > 0 ? 1.2 : 1 / 1.2;
      setXDomain((prev) => {
        const [a, b] = prev;
        const center = a + px * (b - a);
        const range = (b - a) * factor;
        return clamp(center - range * px, center + range * (1 - px));
      });
      setYDomain((prev) => {
        const [a, b] = prev;
        const center = a + py * (b - a);
        const range = (b - a) * factor;
        return clamp(center - range * py, center + range * (1 - py));
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [clamp]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      x0: xDomain,
      y0: yDomain,
    };
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => {
      const d = dragRef.current;
      const el = wrapRef.current;
      if (!d || !el) return;
      const rect = el.getBoundingClientRect();
      const padLeft = 60;
      const padRight = 30;
      const padTop = 20;
      const padBottom = 50;
      const plotW = rect.width - padLeft - padRight;
      const plotH = rect.height - padTop - padBottom;
      const dx = (e.clientX - d.startX) / plotW;
      const dy = (e.clientY - d.startY) / plotH;
      const xRange = d.x0[1] - d.x0[0];
      const yRange = d.y0[1] - d.y0[0];
      setXDomain(clamp(d.x0[0] - dx * xRange, d.x0[1] - dx * xRange));
      setYDomain(clamp(d.y0[0] + dy * yRange, d.y0[1] + dy * yRange));
    };
    const onUp = () => {
      dragRef.current = null;
      setIsDragging(false);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDragging, clamp]);

  const direcciones = useMemo(() => {
    const set = new Set<string>();
    data.forEach((d) => set.add(d.direccion));
    return Array.from(set);
  }, [data]);

  const grouped = useMemo(() => {
    const map = new Map<string, Point[]>();
    data.forEach((p) => {
      if (!map.has(p.direccion)) map.set(p.direccion, []);
      map.get(p.direccion)!.push(p);
    });
    return Array.from(map.entries());
  }, [data]);

  const zRange: [number, number] = mode === "direccion" ? [100, 900] : [60, 60];

  // Ticks dinámicos según el rango visible
  const ticks = (dom: [number, number]) => {
    const step = dom[1] - dom[0] > 3 ? 1 : 0.5;
    const arr: number[] = [];
    for (let v = Math.ceil(dom[0] / step) * step; v <= dom[1]; v += step) {
      arr.push(Math.round(v * 10) / 10);
    }
    return arr;
  };

  const zoomPct = Math.round(((FULL[1] - FULL[0]) / (xDomain[1] - xDomain[0])) * 100);

  return (
    <div className="relative">
      <div
        ref={wrapRef}
        onMouseDown={onMouseDown}
        onDoubleClick={reset}
        className={`${isDragging ? "cursor-grabbing" : "cursor-grab"} select-none touch-none`}
        style={{ height: 500 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 40 }}>
            <CartesianGrid stroke="#EEE" />
            <XAxis
              type="number"
              dataKey="x"
              name="Apertura"
              domain={xDomain}
              ticks={ticks(xDomain)}
              tick={{ fontSize: 11 }}
              allowDataOverflow
              label={{
                value: "Apertura →",
                position: "insideBottom",
                offset: -10,
                fontSize: 12,
                fill: BRAND.grayDark,
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Habilidad"
              domain={yDomain}
              ticks={ticks(yDomain)}
              tick={{ fontSize: 11 }}
              allowDataOverflow
              label={{
                value: "Habilidad →",
                angle: -90,
                position: "insideLeft",
                fontSize: 12,
                fill: BRAND.grayDark,
              }}
            />
            <ZAxis type="number" dataKey="n" range={zRange} />
            <ReferenceArea x1={3} x2={5.5} y1={3} y2={5.5} fill={BRAND.primary} fillOpacity={0.05} />
            <ReferenceArea x1={3} x2={5.5} y1={0.5} y2={3} fill="#F59E0B" fillOpacity={0.05} />
            <ReferenceArea x1={0.5} x2={3} y1={3} y2={5.5} fill="#6B7280" fillOpacity={0.05} />
            <ReferenceArea x1={0.5} x2={3} y1={0.5} y2={3} fill="#1A1A1A" fillOpacity={0.03} />
            <ReferenceLine x={3} stroke={BRAND.grayDark} strokeDasharray="3 3" />
            <ReferenceLine y={3} stroke={BRAND.grayDark} strokeDasharray="3 3" />

            <Tooltip
              cursor={isDragging ? false : { strokeDasharray: "3 3" }}
              wrapperStyle={{ pointerEvents: "none" }}
              contentStyle={{ fontSize: 12, borderRadius: 8, border: `1px solid ${BRAND.grayMid}` }}
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length || isDragging) return null;
                const p = payload[0].payload as Point;
                return (
                  <div className="bg-white p-2 rounded-md shadow-card text-xs">
                    <div className="font-semibold">{p.nombre}</div>
                    {mode === "individual" && (
                      <div className="text-atisa-grayDark">{shortDirection(p.direccion)}</div>
                    )}
                    <div>
                      Apertura: {p.x.toFixed(1)} · Habilidad: {p.y.toFixed(mode === "direccion" ? 1 : 0)}
                    </div>
                    {mode === "direccion" && p.n != null && (
                      <div className="text-atisa-grayDark">
                        {p.n} colaborador{p.n === 1 ? "" : "es"}
                      </div>
                    )}
                  </div>
                );
              }}
            />
            {grouped.map(([dir, pts]) => (
              <Scatter
                key={dir}
                name={dir}
                data={pts}
                fill={DIRECTION_COLORS[direcciones.indexOf(dir) % DIRECTION_COLORS.length]}
                fillOpacity={mode === "direccion" ? 0.6 : 0.8}
                stroke={mode === "direccion" ? "#1A1A1A" : undefined}
                strokeWidth={mode === "direccion" ? 1 : 0}
                isAnimationActive={false}
                onClick={(d: any) => onItemClick && d && onItemClick(d.direccion)}
                cursor={onItemClick ? "pointer" : undefined}
              >
                {mode === "direccion" && (
                  <LabelList
                    dataKey="idx"
                    position="center"
                    style={{ fontSize: 11, fill: "#FFFFFF", fontWeight: 700, pointerEvents: "none" }}
                  />
                )}
              </Scatter>
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="absolute top-2 right-2 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-atisa-grayMid/40 rounded-md px-2 py-1 shadow-card text-[10px] text-atisa-grayDark">
        <MousePointer2 className="w-3 h-3" />
        <span>arrastra · scroll zoom · doble-click reset</span>
        <span className="font-semibold text-atisa-red min-w-[34px] text-right">{zoomPct}%</span>
        {!isDefault && (
          <button
            onClick={reset}
            title="Restablecer"
            className="text-atisa-grayDark hover:text-atisa-red transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
