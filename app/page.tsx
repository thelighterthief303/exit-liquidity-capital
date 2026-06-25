import RecentTrades from "./components/RecentTrades";
import Header from "./components/Header";
import Hero from "./components/Hero";
import NavChart from "./components/NavChart";
import AllocationBars from "./components/AllocationBars";
import PortfolioTable from "./components/PortfolioTable";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-8 text-white">
      <Header />
      <Hero />
      <NavChart />
      <AllocationBars />
      <PortfolioTable />
      <RecentTrades />
      <Footer />
    </main>
  );
}