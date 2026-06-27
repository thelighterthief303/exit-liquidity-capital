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

  useEffect(() => {
    async function loadPositions() {
      try {
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
          error instanceof Error
            ? error.message
            : JSON.stringify(error, null, 2);

        setPriceMessage(`Using saved portfolio prices. ${message}`);
      } finally {
        setIsLoading(false);
      }
    }

    loadPositions();
  }, []);

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-8 text-white">
      <Header />

      {(isLoading || priceMessage) && (
        <section className="mx-auto max-w-6xl pt-8 text-sm text-slate-500">
          {isLoading ? "Loading portfolio data..." : priceMessage}
        </section>
      )}

      <Hero positions={positions} />
      <NavChart positions={positions} />
      <AllocationBars positions={positions} />
      <PortfolioTable positions={positions} />
      <RecentTrades />
      <Footer />
    </main>
  );
}