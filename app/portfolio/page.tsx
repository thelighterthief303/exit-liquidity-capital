import Header from "../components/Header";
import PortfolioTable from "../components/PortfolioTable";
import AllocationBars from "../components/AllocationBars";
import Footer from "../components/Footer";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-8 text-white">
      <Header />
      <section className="mx-auto max-w-6xl py-14">
        <h2 className="text-5xl font-bold">Portfolio</h2>
        <p className="mt-4 text-slate-400">Current holdings. Allegedly diversified.</p>
      </section>
      <AllocationBars />
      <PortfolioTable />
      <Footer />
    </main>
  );
}