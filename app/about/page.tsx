import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-8 text-white">
      <Header />
      <section className="mx-auto max-w-6xl py-14">
        <h2 className="text-5xl font-bold">About</h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          Exit Liquidity Capital is a digital asset portfolio experiment built with transparent reporting, questionable timing and a strong commitment to tea.
        </p>
      </section>
      <Footer />
    </main>
  );
}