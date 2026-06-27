"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import NavChart from "./NavChart";
import AllocationBars from "./AllocationBars";
import PortfolioTable from "./PortfolioTable";
import RecentTrades from "./RecentTrades";
import Footer from "./Footer";
import { positions as fallbackPositions } from "../data/fund";
import { getLivePricedPortfolio } from "../../lib/priceService";

type Position = {
  id: number;
  asset: string;
  symbol: string;
  quantity: number;
  averageBuyPrice: number;
  currentPrice: number;
  change: number;
};

type PositionsApiResponse = {
  ok: boolean;
  positions?: Position[];
  error?: string;
};

export default function DashboardClient() {
  const [positions, setPositions] = useState<Position[]>(fallbackPositions);
  const [isLoading, setIsLoading] = useState(true);
  const [priceMessage, setPriceMessage] = useState("");

  async function loadPositions() {
    try {
      setIsLoading(true);

      const response = await fetch("/api/positions");

      if (!response.ok) {
        throw new Error("Positions API request failed");
      }

      const positionsData: PositionsApiResponse = await response.json();

      if (!positionsData.ok || !positionsData.positions) {
        throw new Error(positionsData.error || "Positions API returned no positions");
      }

      const pricedPortfolio = await getLivePricedPortfolio(positionsData.positions);

      setPositions(
        pricedPortfolio.positions.map((position) => ({
          ...position,
          currentPrice: position.livePrice,
          change: position.liveChange24h,
        }))
      );

      setPriceMessage(
        `Live prices from ${pricedPortfolio.source} · Updated ${new Date(
          pricedPortfolio.updatedAt
        ).toLocaleTimeString("en-GB")}`
      );
    } catch (error) {
      console.error("Dashboard load error:", error);

      const message =
        error instanceof Error ? error.message : JSON.stringify(error, null, 2);

      setPriceMessage(`Using saved portfolio prices. ${message}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPositions();
  }, []);

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-8 text-white">
      <Header />

      <section className="mx-auto flex max-w-6xl items-center justify-between gap-4 pt-8 text-sm text-slate-500">
        <p>{isLoading ? "Loading portfolio data..." : priceMessage}</p>

        <button
          onClick={loadPositions}
          disabled={isLoading}
          className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Refreshing..." : "Refresh Prices"}
        </button>
      </section>

      <Hero positions={positions} />
      <NavChart positions={positions} />
      <AllocationBars positions={positions} />
      <PortfolioTable positions={positions} />
      <RecentTrades />
      <Footer />
    </main>
  );
}