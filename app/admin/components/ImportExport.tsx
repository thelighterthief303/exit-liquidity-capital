type ImportExportProps = {
  importText: string;
  setImportText: (value: string) => void;
  exportPortfolio: () => void;
  importPortfolio: () => void;
};

export default function ImportExport({
  importText,
  setImportText,
  exportPortfolio,
  importPortfolio,
}: ImportExportProps) {
  return (
    <section className="mx-auto mb-8 max-w-6xl rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">Backup / Import</h3>
          <p className="mt-1 text-sm text-slate-500">
            Copy portfolio data between browsers or keep a backup.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={exportPortfolio}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10"
          >
            Export JSON
          </button>

          <button
            onClick={importPortfolio}
            className="rounded-xl border border-emerald-400/30 px-4 py-2 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-400/10"
          >
            Import JSON
          </button>
        </div>
      </div>

      <textarea
        value={importText}
        onChange={(event) => setImportText(event.target.value)}
        placeholder="Paste exported portfolio JSON here..."
        className="min-h-36 w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-200 outline-none"
      />
    </section>
  );
}