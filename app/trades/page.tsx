import Header from "../components/Header";
import RecentTrades from "../components/RecentTrades";
import Footer from "../components/Footer";

export default function TradesPage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-8 text-white">
      <Header />
      <section className="mx-auto max-w-6xl py-14">
        <h2 className="text-5xl font-bold">Trades</h2>
        <p className="mt-4 text-slate-400">Conviction increased. Occasionally reassessed.</p>
      </section>
      <RecentTrades />
      <Footer />
    </main>
  );
}