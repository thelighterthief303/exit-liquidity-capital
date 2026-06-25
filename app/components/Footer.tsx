const quotes = [
  "Past performance looked obvious afterwards.",
  "This portfolio contains traces of hopium.",
  "Our analysts remain cautiously caffeinated.",
  "Today’s strategy remains: see what happens.",
  "Remember to zoom out before panicking.",
];

export default function Footer() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <footer className="mx-auto mt-16 max-w-6xl border-t border-white/10 pt-6 text-sm text-slate-400">
      <p>{quote}</p>
      <p className="mt-4">
        Not financial advice. Definitely not tax advice. Tea helps.
      </p>
    </footer>
  );
}