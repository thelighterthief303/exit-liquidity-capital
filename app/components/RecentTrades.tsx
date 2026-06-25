import { trades } from "../data/fund";

export default function RecentTrades() {
  return (
    <section className="mx-auto mt-8 max-w-6xl rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Recent Trades</h3>
        <p className="text-sm text-slate-500">
          Definitely not panic.
        </p>
      </div>

      <div className="space-y-4">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className="flex items-center justify-between rounded-2xl bg-white/[0.03] p-4"
          >
            <div>
              <p
                className={`font-medium ${
                  trade.type === "BUY"
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {trade.type}
              </p>

              <p className="text-sm text-slate-300">
                {trade.quantity} {trade.symbol} @ £
                {trade.price.toLocaleString("en-GB", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {trade.notes}
              </p>
            </div>

            <div className="text-right">
              <p>
                £
                {trade.value.toLocaleString("en-GB", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>

              <p className="text-sm text-slate-500">
                {trade.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}