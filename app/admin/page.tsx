import Header from "../components/Header";
import Footer from "../components/Footer";
import { positions } from "../data/fund";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-8 text-white">
      <Header />

      <section className="mx-auto max-w-6xl py-14">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
          Admin
        </p>

        <h2 className="mt-3 text-5xl font-bold">Portfolio Management</h2>

        <p className="mt-4 max-w-2xl text-slate-400">
          Manual portfolio edits. No cleverness yet. Probably for the best.
        </p>
      </section>

      <section className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h3 className="mb-6 text-xl font-semibold">Current Manual Positions</h3>

        <div className="space-y-4">
          {positions.map((position) => (
            <div
              key={position.id}
              className="grid gap-4 rounded-2xl bg-white/[0.03] p-4 md:grid-cols-5"
            >
              <div>
                <p className="text-sm text-slate-500">Asset</p>
                <p>{position.asset}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Symbol</p>
                <p>{position.symbol}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Quantity</p>
                <p>{position.quantity}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Avg Buy</p>
                <p>£{position.averageBuyPrice.toLocaleString("en-GB")}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Current Price</p>
                <p>£{position.currentPrice.toLocaleString("en-GB")}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}