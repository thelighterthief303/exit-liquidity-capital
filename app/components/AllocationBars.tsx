import {
  portfolioWithAllocations as defaultPositions,
} from "../data/fund";

type Position = {
  id: number;
  asset: string;
  symbol: string;
  quantity: number;
  averageBuyPrice: number;
  currentPrice: number;
  change: number;
};

type AllocationBarsProps = {
  positions?: Position[];
};

export default function AllocationBars({ positions }: AllocationBarsProps) {
  const calculatedPositions = positions
    ? positions.map((position) => ({
        ...position,
        value: position.quantity * position.currentPrice,
      }))
    : defaultPositions;

  const totalValue = calculatedPositions.reduce(
    (total, position) => total + position.value,
    0
  );

  const positionsWithAllocations = calculatedPositions.map((position) => ({
    ...position,
    allocation: totalValue === 0 ? 0 : (position.value / totalValue) * 100,
  }));

  return (
    <section className="mx-auto mt-8 max-w-6xl rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Portfolio Allocation</h3>
        <p className="text-sm text-slate-500">Calculated, not guessed.</p>
      </div>

      <div className="space-y-5">
        {positionsWithAllocations.map((item) => (
          <div key={item.symbol}>
            <div className="mb-2 flex justify-between text-sm">
              <span>
                {item.asset} <span className="text-slate-500">{item.symbol}</span>
              </span>
              <span className="text-slate-400">
                {item.allocation.toFixed(1)}%
              </span>
            </div>

            <div className="h-3 rounded-full bg-white/10">
              <div
                className="h-3 rounded-full bg-emerald-400"
                style={{ width: `${item.allocation}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}