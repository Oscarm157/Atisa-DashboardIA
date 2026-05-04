import Link from "next/link";

export function TopBar({ meta }: { meta?: string }) {
  return (
    <div className="bg-ink text-white py-[18px] border-b border-white/10">
      <div className="page-container flex justify-between items-center">
        <Link href="/" className="font-semibold text-[15px] tracking-[0.18em] text-white hover:opacity-80 transition-opacity">
          ATISA
        </Link>
        {meta && (
          <div className="font-mono text-[11px] tracking-widest uppercase text-white/50">
            {meta}
          </div>
        )}
      </div>
    </div>
  );
}
