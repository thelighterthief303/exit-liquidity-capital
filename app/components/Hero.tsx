import AnimatedValue from "./AnimatedValue";
import StatusCard from "./StatusCard";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-6 py-16 md:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 shadow-2xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-emerald-400">
          Reasonably Bullish
        </p>

        <h2 className="text-5xl font-bold tracking-tight md:text-7xl">
          <AnimatedValue value={127483.28} />
        </h2>

        <p className="mt-4 text-lg text-slate-300">
          Total fund value
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-emerald-400/10 px-5 py-4">
            <p className="text-sm text-slate-400">Today&apos;s Damage</p>
            <p className="text-2xl font-semibold text-emerald-400">
              +2.63%
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 px-5 py-4">
            <p className="text-sm text-slate-400">Risk Level</p>
            <p className="text-2xl font-semibold">
              Uncomfortable
            </p>
          </div>
        </div>
      </div>

      <StatusCard />
    </section>
  );
}