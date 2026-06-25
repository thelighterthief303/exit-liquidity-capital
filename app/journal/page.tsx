import Header from "../components/Header";
import Footer from "../components/Footer";

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-8 text-white">
      <Header />
      <section className="mx-auto max-w-6xl py-14">
        <h2 className="text-5xl font-bold">Fund Manager Journal</h2>
        <p className="mt-4 text-slate-400">A record of decisions, hindsight and mild regret.</p>
      </section>
      <Footer />
    </main>
  );
}