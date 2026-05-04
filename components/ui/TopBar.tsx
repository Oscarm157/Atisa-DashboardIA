import Link from "next/link";
import Image from "next/image";

export function TopBar({ meta }: { meta?: string }) {
  return (
    <div className="bg-ink text-white py-4 border-b border-white/10">
      <div className="page-container flex justify-between items-center">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/atisa-logo-white.png"
            alt="Atisa Group"
            width={116}
            height={30}
            priority
          />
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
