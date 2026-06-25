import Header from "./components/Header";
import Hero from "./components/Hero";
import PortfolioTable from "./components/PortfolioTable";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816] text-white px-6 py-8">
      <Header />
      <Hero />
      <PortfolioTable />
      <Footer />
    </main>
  );
}