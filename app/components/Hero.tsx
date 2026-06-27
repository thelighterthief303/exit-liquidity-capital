import AnimatedValue from "./AnimatedValue";
import StatusCard from "./StatusCard";

type Position = {
  id: number;
  asset: string;
  symbol: string;
  quantity: number;
  averageBuyPrice: number;
  currentPrice: number;
  change: number;
};

type HeroProps = {
  positions: Position[];
};

export default function Hero({ positions }: HeroProps) {
  const calculatedPositions = positions.map((position) => ({
    ...position,
    value: position.quantity * position.currentPrice,
  }));

  const nav = calculatedPositions.reduce(
    (total, position) => total + position.value,
    0
  );

  const bestPerformer = calculatedPositions.reduce((best, position) =>
    position.change > best.change ? position : best
  );

  const worstPerformer = calculatedPositions.reduce((worst, position) =>
    position.change < worst.change ? position : worst
  );

  return (
    <section className="mx-auto max-w-6xl py-14">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
          Digital Asset Portfolio
        </p>

        <h2 className="mt-3 text-6xl font-bold tracking-tight">
          <AnimatedValue value={nav} />
        </h2>

        <p className="mt-4 text-xl text-slate-400">Total Net Asset Value</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm text-slate-500">Today's Damage</p>
          <p className="mt-3 text-3xl font-bold text-emerald-400">
            Manual
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm text-slate-500">Best Performer</p>
          <p className="mt-3 text-3xl font-bold">{bestPerformer.asset}</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm text-slate-500">Worst Performer</p>
          <p className="mt-3 text-3xl font-bold">{worstPerformer.asset}</p>
        </div>

        <StatusCard />
      </div>
    </section>
  );
}