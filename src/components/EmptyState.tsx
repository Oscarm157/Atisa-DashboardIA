import type { ReactNode } from "react";
import { Inbox, Filter } from "lucide-react";
import { useFilters } from "../lib/filters";

type Props = {
  title?: string;
  message?: string;
  icon?: ReactNode;
  showResetFilters?: boolean;
};

export function EmptyState({
  title = "Sin resultados",
  message = "No hay colaboradores que coincidan con los filtros activos.",
  icon,
  showResetFilters = true,
}: Props) {
  const reset = useFilters((s) => s.reset);
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-14 h-14 rounded-full bg-atisa-gray flex items-center justify-center mb-3 text-atisa-grayDark">
        {icon || <Inbox className="w-6 h-6" />}
      </div>
      <h3 className="text-sm font-semibold text-atisa-black">{title}</h3>
      <p className="text-xs text-atisa-grayDark mt-1 max-w-xs">{message}</p>
      {showResetFilters && (
        <button
          onClick={reset}
          className="mt-4 flex items-center gap-1.5 text-xs bg-atisa-red text-white px-3 py-1.5 rounded-md hover:bg-atisa-redDark transition-colors"
        >
          <Filter className="w-3 h-3" /> Limpiar filtros
        </button>
      )}
    </div>
  );
}
