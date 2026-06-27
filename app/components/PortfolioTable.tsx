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

  const totalCost = calculatedPositions.reduce(
    (total, position) => total + position.costBasis,
    0
  );

  const totalProfitLoss = totalValue - totalCost;
  const totalProfitLossPercent =
    totalCost === 0 ? 0 : (totalProfitLoss / totalCost) * 100;

  const positionsWithAllocations = calculatedPositions.map((position) => ({
    ...position,
    allocation: totalValue === 0 ? 0 : (position.value / totalValue) * 100,
  }));

  return (
    <section className="mx-auto mt-8 max-w-6xl rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Portfolio Tracker</h3>
        <p className="mt-1 text-sm text-slate-500">
          Holdings, live prices, value, profit/loss and allocation.
        </p>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white/[0.03] p-4">
          <p className="text-sm text-slate-500">Total Value</p>
          <p className="mt-2 text-2xl font-semibold">
            £
            {totalValue.toLocaleString("en-GB", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="rounded-2xl bg-white/[0.03] p-4">
          <p className="text-sm text-slate-500">Total Cost</p>
          <p className="mt-2 text-2xl font-semibold">
            £
            {totalCost.toLocaleString("en-GB", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="rounded-2xl bg-white/[0.03] p-4">
          <p className="text-sm text-slate-500">Total P/L</p>
          <p
            className={`mt-2 text-2xl font-semibold ${
              totalProfitLoss < 0 ? "text-red-400" : "text-emerald-400"
            }`}
          >
            £
            {totalProfitLoss.toLocaleString("en-GB", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            <span className="text-sm">
              ({totalProfitLossPercent.toFixed(1)}%)
            </span>
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-white/10 text-slate-400">
            <tr>
              <th className="py-3">Holding</th>
              <th className="py-3 text-right">Quantity</th>
              <th className="py-3 text-right">Avg Buy</th>
              <th className="py-3 text-right">Live Price</th>
              <th className="py-3 text-right">Value</th>
              <th className="py-3 text-right">P/L</th>
              <th className="py-3 text-right">24h</th>
              <th className="py-3 text-right">Allocation</th>
            </tr>
          </thead>

          <tbody>
            {positionsWithAllocations.map((position) => (
              <tr key={position.symbol} className="border-b border-white/5">
                <td className="py-4">
                  <p className="font-medium">{position.asset}</p>
                  <p className="text-xs text-slate-500">{position.symbol}</p>
                </td>

                <td className="py-4 text-right">{position.quantity}</td>

                <td className="py-4 text-right">
                  £{position.averageBuyPrice.toLocaleString("en-GB")}
                </td>

                <td className="py-4 text-right">
                  £{position.currentPrice.toLocaleString("en-GB", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                  })}
                </td>

                <td className="py-4 text-right">
                  £{position.value.toLocaleString("en-GB", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>

                <td className="py-4 text-right">
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
                    })}
                    <span className="ml-1 text-xs">
                      ({position.profitLossPercent.toFixed(1)}%)
                    </span>
                  </span>
                </td>

                <td className="py-4 text-right">
                  <span
                    className={
                      position.change < 0
                        ? "text-red-400"
                        : position.change > 0
                        ? "text-emerald-400"
                        : "text-slate-500"
                    }
                  >
                    {position.change === 0
                      ? "—"
                      : `${position.change > 0 ? "+" : ""}${position.change.toFixed(
                          2
                        )}%`}
                  </span>
                </td>

                <td className="py-4 text-right">
                  {position.allocation.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}