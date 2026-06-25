import { trades } from "../data/fund";

export default function RecentTrades() {
  return (
    <section className="mx-auto mt-8 max-w-6xl rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Recent Trades</h3>
        <p className="text-sm text-slate-500">Definitely not panic.</p>
      </div>

      <div className="space-y-4">
        {trades.map((trade) => (
          <div
            key={`${trade.date}-${trade.symbol}`}
            className="flex items-center justify-between rounded-2xl bg-white/[0.03] p-4"
          >
            <div>
              <p className="font-medium">{trade.action}</p>
              <p className="text-sm text-slate-500">
                {trade.asset} · {trade.quantity} {trade.symbol}
              </p>
            </div>

            <div className="text-right">
              <p>{trade.value}</p>
              <p className="text-sm text-slate-500">{trade.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}