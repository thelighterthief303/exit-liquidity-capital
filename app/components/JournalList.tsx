import { journalEntries } from "../data/journal";

export default function JournalList() {
  return (
    <section className="mx-auto max-w-6xl space-y-5">
      {journalEntries.map((entry) => (
        <article
          key={entry.title}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
        >
          <p className="text-sm text-slate-500">{entry.date}</p>
          <h3 className="mt-2 text-2xl font-semibold">{entry.title}</h3>
          <p className="mt-4 text-slate-400">{entry.summary}</p>
          <p className="mt-4 text-sm text-emerald-400">
            Confidence: {entry.confidence}
          </p>
        </article>
      ))}
    </section>
  );
}