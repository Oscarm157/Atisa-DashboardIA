import { BRAND } from "../../config/branding";

type Cell = { row: string; col: string; value: number; raw?: number | string };

export function Heatmap({
  cells,
  rows,
  cols,
  max = 5,
  min = 0,
  rowLabel,
  colLabel,
  formatValue,
}: {
  cells: Cell[];
  rows: string[];
  cols: string[];
  max?: number;
  min?: number;
  rowLabel?: (r: string) => string;
  colLabel?: (c: string) => string;
  formatValue?: (v: number | string) => string;
}) {
  const get = (r: string, c: string) => cells.find((x) => x.row === r && x.col === c);

  function color(v: number): string {
    const t = Math.max(0, Math.min(1, (v - min) / (max - min || 1)));
    // white → atisa red
    const r = Math.round(255 + t * (210 - 255));
    const g = Math.round(255 + t * (38 - 255));
    const b = Math.round(255 + t * (44 - 255));
    return `rgb(${r},${g},${b})`;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-separate border-spacing-0.5">
        <thead>
          <tr>
            <th className="sticky left-0 bg-white z-10"></th>
            {cols.map((c) => (
              <th
                key={c}
                className="px-2 py-1 text-[10px] font-semibold text-atisa-grayDark text-center whitespace-nowrap"
              >
                {colLabel ? colLabel(c) : c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r}>
              <td className="sticky left-0 bg-white z-10 pr-3 py-1 text-[11px] font-medium text-atisa-black whitespace-nowrap">
                {rowLabel ? rowLabel(r) : r}
              </td>
              {cols.map((c) => {
                const cell = get(r, c);
                const val = cell?.value ?? 0;
                return (
                  <td
                    key={c}
                    style={{
                      background: cell ? color(val) : BRAND.gray,
                    }}
                    className="text-center py-1.5 px-2 font-semibold text-atisa-black rounded-sm min-w-[50px]"
                    title={`${r} / ${c}: ${cell?.raw ?? val}`}
                  >
                    {cell ? (formatValue ? formatValue(cell.raw ?? val) : val) : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
