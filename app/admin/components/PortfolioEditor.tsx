import type { Position } from "./types";

type PortfolioEditorProps = {
  positions: Position[];
  setPositions: React.Dispatch<React.SetStateAction<Position[]>>;
  saveMessage: string;
  setSaveMessage: (message: string) => void;
  savePositions: () => void;
  resetPositions: () => void;
};

export default function PortfolioEditor({
  positions,
  setPositions,
  saveMessage,
  setSaveMessage,
  savePositions,
  resetPositions,
}: PortfolioEditorProps) {
  const totalValue = positions.reduce(
    (total, position) => total + position.quantity * position.currentPrice,
    0
  );

  function updatePosition(
    id: number,
    field:
      | "asset"
      | "symbol"
      | "quantity"
      | "averageBuyPrice"
      | "currentPrice"
      | "change",
    value: string
  ) {
    setSaveMessage("");

    setPositions((currentPositions) =>
      currentPositions.map((position) =>
        position.id === id
          ? {
              ...position,
              [field]:
                field === "asset" || field === "symbol" ? value : Number(value),
            }
          : position
      )
    );
  }

  function addPosition() {
    setSaveMessage("");

    const nextId =
      positions.length === 0
        ? 1
        : Math.max(...positions.map((position) => position.id)) + 1;

    setPositions((currentPositions) => [
      ...currentPositions,
      {
        id: nextId,
        asset: "New Asset",
        symbol: "NEW",
        quantity: 0,
        averageBuyPrice: 0,
        currentPrice: 0,
        change: 0,
      },
    ]);
  }

  function deletePosition(id: number) {
    setSaveMessage("");

    setPositions((currentPositions) =>
      currentPositions.filter((position) => position.id !== id)
    );
  }

  return (
    <section className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">Edit Holdings</h3>
          <p className="mt-1 text-sm text-slate-500">
            Quantity and average buy are manual. Current price is used as fallback if live pricing is unavailable.
          </p>
          {saveMessage && (
            <p className="mt-2 text-sm text-emerald-400">{saveMessage}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={resetPositions}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10"
          >
            Reset
          </button>

          <button
            onClick={addPosition}
            className="rounded-xl border border-emerald-400/30 px-4 py-2 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-400/10"
          >
            + Add Holding
          </button>

          <button
            onClick={savePositions}
            className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            Save
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead className="border-b border-white/10 text-slate-400">
            <tr>
              <th className="py-3">Asset</th>
              <th className="py-3">Symbol</th>
              <th className="py-3 text-right">Quantity</th>
              <th className="py-3 text-right">Avg Buy</th>
              <th className="py-3 text-right">Fallback Price</th>
              <th className="py-3 text-right">Fallback 24h %</th>
              <th className="py-3 text-right">Value</th>
              <th className="py-3 text-right">Allocation</th>
              <th className="py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {positions.map((position) => {
              const value = position.quantity * position.currentPrice;
              const allocation =
                totalValue === 0 ? 0 : (value / totalValue) * 100;

              return (
                <tr key={position.id} className="border-b border-white/5">
                  <td className="py-3 pr-3">
                    <input
                      value={position.asset}
                      onChange={(event) =>
                        updatePosition(position.id, "asset", event.target.value)
                      }
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none"
                    />
                  </td>

                  <td className="py-3 pr-3">
                    <input
                      value={position.symbol}
                      onChange={(event) =>
                        updatePosition(
                          position.id,
                          "symbol",
                          event.target.value.toUpperCase()
                        )
                      }
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none"
                    />
                  </td>

                  <td className="py-3 pr-3">
                    <input
                      type="number"
                      value={position.quantity}
                      onChange={(event) =>
                        updatePosition(
                          position.id,
                          "quantity",
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-right text-white outline-none"
                    />
                  </td>

                  <td className="py-3 pr-3">
                    <input
                      type="number"
                      value={position.averageBuyPrice}
                      onChange={(event) =>
                        updatePosition(
                          position.id,
                          "averageBuyPrice",
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-right text-white outline-none"
                    />
                  </td>

                  <td className="py-3 pr-3">
                    <input
                      type="number"
                      value={position.currentPrice}
                      onChange={(event) =>
                        updatePosition(
                          position.id,
                          "currentPrice",
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-right text-white outline-none"
                    />
                  </td>

                  <td className="py-3 pr-3">
                    <input
                      type="number"
                      value={position.change}
                      onChange={(event) =>
                        updatePosition(position.id, "change", event.target.value)
                      }
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-right text-white outline-none"
                    />
                  </td>

                  <td className="py-3 text-right">
                    £
                    {value.toLocaleString("en-GB", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  <td className="py-3 text-right">{allocation.toFixed(1)}%</td>

                  <td className="py-3 text-right">
                    <button
                      onClick={() => deletePosition(position.id)}
                      className="rounded-xl border border-red-400/30 px-3 py-2 text-sm text-red-400 transition hover:bg-red-400/10"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}