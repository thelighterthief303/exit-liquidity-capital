export default function Header() {
  return (
    <nav className="mx-auto flex max-w-6xl items-center justify-between border-b border-white/10 pb-6">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
          Exit Liquidity Capital
        </p>
        <h1 className="mt-2 text-2xl font-semibold">
          Digital Asset Investment Fund
        </h1>
      </div>

      <div className="hidden gap-6 text-sm text-slate-300 md:flex">
        <span>Dashboard</span>
        <span>Portfolio</span>
        <span>Trades</span>
        <span>Performance</span>
        <span>About</span>
      </div>
    </nav>
  );
}