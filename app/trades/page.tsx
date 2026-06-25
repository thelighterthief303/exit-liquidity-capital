import Header from "../components/Header";
import RecentTrades from "../components/RecentTrades";
import Footer from "../components/Footer";

export default function TradesPage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-8 text-white">
      <Header />

      <section className="mx-auto max-w-6xl py-14">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
          Transaction History
        </p>

        <h2 className="mt-3 text-5xl font-bold">Trades</h2>

        <p className="mt-4 max-w-2xl text-slate-400">
          Conviction increased, reduced, and occasionally explained away with impressive confidence.
        </p>
      </section>

      <RecentTrades />
      <Footer />
    </main>
  );
}