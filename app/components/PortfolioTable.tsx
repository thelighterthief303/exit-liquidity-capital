import { positions } from "../data/fund";

export default function PortfolioTable() {
  return (
    <section className="mx-auto mt-8 max-w-6xl rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Current Positions</h3>
        <p className="text-sm text-slate-500">Diversification, allegedly.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 text-slate-400">
            <tr>
              <th className="py-3">Asset</th>
              <th className="py-3">Allocation</th>
              <th className="py-3">Value</th>
              <th className="py-3">Today</th>
            </tr>
          </thead>

          <tbody>
            {positions.map((position) => (
              <tr key={position.symbol} className="border-b border-white/5">
                <td className="py-4">
                  <p className="font-medium">{position.asset}</p>
                  <p className="text-xs text-slate-500">{position.symbol}</p>
                </td>

                <td className="py-4">{position.allocation}%</td>

                <td className="py-4">
                  £{position.value.toLocaleString("en-GB", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>

                <td className="py-4">
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
                      : `${position.change > 0 ? "+" : ""}${position.change}%`}
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