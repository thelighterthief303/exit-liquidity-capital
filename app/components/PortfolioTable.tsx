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

type PortfolioTableProps = {
  positions?: Position[];
};

export default function PortfolioTable({ positions }: PortfolioTableProps) {
  const calculatedPositions = positions
    ? positions.map((position) => {
        const value = position.quantity * position.currentPrice;
        const costBasis = position.quantity * position.averageBuyPrice;
        const profitLoss = value - costBasis;

        return {
          ...position,
          value,
          costBasis,
          profitLoss,
          profitLossPercent:
            costBasis === 0 ? 0 : (profitLoss / costBasis) * 100,
        };
      })
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
        <h3 className="text-xl font-semibold">Current Positions</h3>
        <p className="text-sm text-slate-500">Now with actual maths.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 text-slate-400">
            <tr>
              <th className="py-3">Asset</th>
              <th className="py-3">Quantity</th>
              <th className="py-3">Avg Buy</th>
              <th className="py-3">Price</th>
              <th className="py-3">Value</th>
              <th className="py-3">Allocation</th>
              <th className="py-3">P/L</th>
            </tr>
          </thead>

          <tbody>
            {positionsWithAllocations.map((position) => (
              <tr key={position.symbol} className="border-b border-white/5">
                <td className="py-4">
                  <p className="font-medium">{position.asset}</p>
                  <p className="text-xs text-slate-500">{position.symbol}</p>
                </td>

                <td className="py-4">{position.quantity}</td>

                <td className="py-4">
                  £{position.averageBuyPrice.toLocaleString("en-GB")}
                </td>

                <td className="py-4">
                  £{position.currentPrice.toLocaleString("en-GB")}
                </td>

                <td className="py-4">
                  £{position.value.toLocaleString("en-GB", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>

                <td className="py-4">{position.allocation.toFixed(1)}%</td>

                <td className="py-4">
                  <span
                    className={
                      position.profitLoss < 0
                        ? "text-red-400"
                        : "text-emerald-400"
                    }
                  >
                    £{position.profitLoss.toLocaleString("en-GB", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    ({position.profitLossPercent.toFixed(1)}%)
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}