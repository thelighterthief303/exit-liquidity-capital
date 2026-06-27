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
import { getPositions } from "../../lib/positions";
import {
  getLivePricedPositions,
  type PricedPosition,
} from "../../lib/priceService";

type Position = {
  id: number;
  asset: string;
  symbol: string;
  quantity: number;
  averageBuyPrice: number;
  currentPrice: number;
  change: number;
};

export default function DashboardClient() {
  const [positions, setPositions] = useState<Position[]>(fallbackPositions);
  const [isLoading, setIsLoading] = useState(true);
  const [priceMessage, setPriceMessage] = useState("");

  useEffect(() => {
    async function loadPositions() {
      try {
        const dbPositions = await getPositions();
        const pricedPositions: PricedPosition[] =
          await getLivePricedPositions(dbPositions);

        setPositions(
          pricedPositions.map((position) => ({
            ...position,
            currentPrice: position.livePrice,
            change: position.liveChange24h,
          }))
        );

        setPriceMessage("Live prices from internal price service");
      } catch (error) {
        console.error("Price service error:", error);
        setPriceMessage(`Using saved portfolio prices: ${String(error)}`);
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