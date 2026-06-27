"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import NavChart from "./NavChart";
import AllocationBars from "./AllocationBars";
import PortfolioTable from "./PortfolioTable";
import RecentTrades from "./RecentTrades";
import Footer from "./Footer";
import { positions as startingPositions } from "../data/fund";

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

export default function DashboardClient() {
  const [positions, setPositions] = useState<Position[]>(startingPositions);

  useEffect(() => {
    const savedPositions = localStorage.getItem(STORAGE_KEY);

    if (savedPositions) {
      setPositions(JSON.parse(savedPositions));
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-8 text-white">
      <Header />
      <Hero positions={positions} />
      <NavChart positions={positions} />
      <AllocationBars positions={positions} />
      <PortfolioTable positions={positions} />
      <RecentTrades />
      <Footer />
    </main>
  );
}