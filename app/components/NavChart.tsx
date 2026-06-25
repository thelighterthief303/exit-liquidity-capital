const navHistory = [
  { label: "Jan", value: 82000 },
  { label: "Feb", value: 91000 },
  { label: "Mar", value: 87500 },
  { label: "Apr", value: 104000 },
  { label: "May", value: 118000 },
  { label: "Jun", value: 127483 },
];

const maxValue = Math.max(...navHistory.map((item) => item.value));

export default function NavChart() {
  return (
    <section className="mx-auto mt-8 max-w-6xl rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">NAV History</h3>
          <p className="mt-1 text-sm text-slate-500">
            Mostly upwards, which is convenient.
          </p>
        </div>

        <div className="flex gap-2 text-xs text-slate-400">
          <span className="rounded-full bg-white/10 px-3 py-1">1M</span>
          <span className="rounded-full bg-white/10 px-3 py-1">3M</span>
          <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-emerald-400">
            6M
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1">ALL</span>
        </div>
      </div>

      <div className="flex h-56 items-end gap-4 border-b border-white/10 pb-4">
        {navHistory.map((item) => (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-3">
            <div
              className="w-full rounded-t-xl bg-emerald-400/80"
              style={{ height: `${(item.value / maxValue) * 100}%` }}
              title={`£${item.value.toLocaleString("en-GB")}`}
            />
            <span className="text-xs text-slate-500">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}