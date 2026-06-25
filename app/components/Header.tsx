import Link from "next/link";

export default function Header() {
  return (
    <nav className="mx-auto flex max-w-6xl items-center justify-between border-b border-white/10 pb-6">
      <Link href="/" className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.04] text-sm font-bold tracking-widest shadow-lg">
          ELC
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
            Exit Liquidity Capital
          </p>
          <h1 className="mt-1 text-xl font-semibold text-white">
            Digital Asset Investment Fund
          </h1>
        </div>
      </Link>

      <div className="hidden gap-6 text-sm text-slate-300 md:flex">
        <Link href="/" className="hover:text-white">Dashboard</Link>
        <Link href="/portfolio" className="hover:text-white">Portfolio</Link>
        <Link href="/trades" className="hover:text-white">Trades</Link>
        <Link href="/journal" className="hover:text-white">Journal</Link>
        <Link href="/about" className="hover:text-white">About</Link>
      </div>
    </nav>
  );
}