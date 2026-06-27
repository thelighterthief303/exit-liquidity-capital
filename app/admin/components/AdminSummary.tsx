import type { Position } from "./types";

type AdminSummaryProps = {
  positions: Position[];
};

export default function AdminSummary({ positions }: AdminSummaryProps) {
  const totalValue = positions.reduce(
    (total, position) => total + position.quantity * position.currentPrice,
    0
  );

  const totalCost = positions.reduce(
    (total, position) => total + position.quantity * position.averageBuyPrice,
    0
  );

  const totalProfitLoss = totalValue - totalCost;
  const totalProfitLossPercent =
    totalCost === 0 ? 0 : (totalProfitLoss / totalCost) * 100;

  return (
    <section className="mx-auto mb-8 grid max-w-6xl gap-4 md:grid-cols-3">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <p className="text-sm text-slate-500">Live Admin NAV</p>
        <p className="mt-3 text-3xl font-bold">
          £{totalValue.toLocaleString("en-GB", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <p className="text-sm text-slate-500">Cost Basis</p>
        <p className="mt-3 text-3xl font-bold">
          £{totalCost.toLocaleString("en-GB", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <p className="text-sm text-slate-500">Unrealised P/L</p>
        <p
          className={`mt-3 text-3xl font-bold ${
            totalProfitLoss >= 0 ? "text-emerald-400" : "text-red-400"
          }`}
        >
          £{totalProfitLoss.toLocaleString("en-GB", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          ({totalProfitLossPercent.toFixed(1)}%)
        </p>
      </div>
    </section>
  );
}