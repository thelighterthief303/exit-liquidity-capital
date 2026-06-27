"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { positions as startingPositions } from "../data/fund";
import { useEffect, useState } from "react";

type Position = {
  id: number;
  asset: string;
  symbol: string;
  quantity: number;
  averageBuyPrice: number;
  currentPrice: number;
  change: number;
};

const STORAGE_KEY = "elc-admin-positions";

export default function AdminPage() {
  const [positions, setPositions] = useState<Position[]>(startingPositions);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const savedPositions = localStorage.getItem(STORAGE_KEY);

    if (savedPositions) {
      setPositions(JSON.parse(savedPositions));
    }
  }, []);

  const totalValue = positions.reduce(
    (total, position) => total + position.quantity * position.currentPrice,
    0
  );

  const totalCost = positions.reduce(
    (total, position) => total + position.quantity * position.averageBuyPrice,
    0
  );

  const totalProfitLoss = totalValue - totalCost;
  const totalProfitLossPercent =
    totalCost === 0 ? 0 : (totalProfitLoss / totalCost) * 100;

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

  function resetPositions() {
    setPositions(startingPositions);
    localStorage.removeItem(STORAGE_KEY);
    setSaveMessage("Reset to original data.");
  }

  function savePositions() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
    setSaveMessage("Saved in this browser.");
  }

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-8 text-white">
      <Header />

      <section className="mx-auto max-w-6xl py-14">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
          Admin
        </p>

        <h2 className="mt-3 text-5xl font-bold">Portfolio Management</h2>

        <p className="mt-4 max-w-2xl text-slate-400">
          Manual portfolio edits. Currently saved in this browser only.
        </p>
      </section>

      <section className="mx-auto mb-8 max-w-6xl rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
        <h3 className="text-lg font-semibold text-yellow-200">
          Browser-only admin mode
        </h3>
        <p className="mt-2 text-sm text-yellow-100/80">
          Changes saved here are stored only in this browser on this device. They
          are useful for testing and managing your own view, but they are not yet
          written to a database.
        </p>
      </section>

      <section className="mx-auto mb-8 grid max-w-6xl gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm text-slate-500">Live Admin NAV</p>
          <p className="mt-3 text-3xl font-bold">
            £
            {totalValue.toLocaleString("en-GB", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm text-slate-500">Cost Basis</p>
          <p className="mt-3 text-3xl font-bold">
            £
            {totalCost.toLocaleString("en-GB", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm text-slate-500">Unrealised P/L</p>
          <p
            className={`mt-3 text-3xl font-bold ${
              totalProfitLoss >= 0 ? "text-emerald-400" : "text-red-400"
            }`}
          >
            £
            {totalProfitLoss.toLocaleString("en-GB", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            ({totalProfitLossPercent.toFixed(1)}%)
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Edit Manual Positions</h3>
            {saveMessage && (
              <p className="mt-1 text-sm text-emerald-400">{saveMessage}</p>
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
              + Add Position
            </button>

            <button
              onClick={savePositions}
              className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Save
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {positions.map((position) => {
            const value = position.quantity * position.currentPrice;
            const allocation = totalValue === 0 ? 0 : (value / totalValue) * 100;

            return (
              <div
                key={position.id}
                className="grid gap-4 rounded-2xl bg-white/[0.03] p-4 md:grid-cols-8"
              >
                <label>
                  <p className="text-sm text-slate-500">Asset</p>
                  <input
                    value={position.asset}
                    onChange={(event) =>
                      updatePosition(position.id, "asset", event.target.value)
                    }
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none"
                  />
                </label>

                <label>
                  <p className="text-sm text-slate-500">Symbol</p>
                  <input
                    value={position.symbol}
                    onChange={(event) =>
                      updatePosition(
                        position.id,
                        "symbol",
                        event.target.value.toUpperCase()
                      )
                    }
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none"
                  />
                </label>

                <label>
                  <p className="text-sm text-slate-500">Quantity</p>
                  <input
                    type="number"
                    value={position.quantity}
                    onChange={(event) =>
                      updatePosition(position.id, "quantity", event.target.value)
                    }
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none"
                  />
                </label>

                <label>
                  <p className="text-sm text-slate-500">Avg Buy</p>
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
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none"
                  />
                </label>

                <label>
                  <p className="text-sm text-slate-500">Current</p>
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
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none"
                  />
                </label>

                <label>
                  <p className="text-sm text-slate-500">Daily %</p>
                  <input
                    type="number"
                    value={position.change}
                    onChange={(event) =>
                      updatePosition(position.id, "change", event.target.value)
                    }
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none"
                  />
                </label>

                <div>
                  <p className="text-sm text-slate-500">Value</p>
                  <p className="mt-2 font-semibold">
                    £
                    {value.toLocaleString("en-GB", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p className="text-xs text-slate-500">
                    {allocation.toFixed(1)}%
                  </p>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => deletePosition(position.id)}
                    className="rounded-xl border border-red-400/30 px-3 py-2 text-sm text-red-400 transition hover:bg-red-400/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}