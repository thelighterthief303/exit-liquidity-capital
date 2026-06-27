"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { positions as startingPositions } from "../data/fund";
import { useState } from "react";

export default function AdminPage() {
  const [positions, setPositions] = useState(startingPositions);

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
    field: "quantity" | "averageBuyPrice" | "currentPrice" | "change",
    value: string
  ) {
    setPositions((currentPositions) =>
      currentPositions.map((position) =>
        position.id === id
          ? {
              ...position,
              [field]: Number(value),
            }
          : position
      )
    );
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
          Manual portfolio edits. Changes update on this page only for now.
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
        <h3 className="mb-6 text-xl font-semibold">Edit Manual Positions</h3>

        <div className="space-y-4">
          {positions.map((position) => {
            const value = position.quantity * position.currentPrice;
            const allocation = totalValue === 0 ? 0 : (value / totalValue) * 100;

            return (
              <div
                key={position.id}
                className="grid gap-4 rounded-2xl bg-white/[0.03] p-4 md:grid-cols-7"
              >
                <div>
                  <p className="text-sm text-slate-500">Asset</p>
                  <p>{position.asset}</p>
                  <p className="text-xs text-slate-500">{position.symbol}</p>
                </div>

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
                  <p className="text-sm text-slate-500">Current Price</p>
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
                </div>

                <div>
                  <p className="text-sm text-slate-500">Allocation</p>
                  <p className="mt-2 font-semibold">{allocation.toFixed(1)}%</p>
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