"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { positions as startingPositions } from "../../data/fund";
import { useEffect, useState } from "react";
import type { Position } from "./types";
import LoginForm from "./LoginForm";
import AdminSummary from "./AdminSummary";
import ImportExport from "./ImportExport";
import PortfolioEditor from "./PortfolioEditor";

const STORAGE_KEY = "elc-admin-positions";
const LAST_SAVED_KEY = "elc-admin-last-saved";

function isValidPosition(item: unknown): item is Position {
  if (typeof item !== "object" || item === null) return false;
  const position = item as Position;

  return (
    typeof position.id === "number" &&
    typeof position.asset === "string" &&
    typeof position.symbol === "string" &&
    typeof position.quantity === "number" &&
    typeof position.averageBuyPrice === "number" &&
    typeof position.currentPrice === "number" &&
    typeof position.change === "number"
  );
}

export default function AdminClient() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [positions, setPositions] = useState<Position[]>(startingPositions);
  const [saveMessage, setSaveMessage] = useState("");
  const [importText, setImportText] = useState("");
  const [lastSaved, setLastSaved] = useState("");

  useEffect(() => {
    const savedPositions = localStorage.getItem(STORAGE_KEY);
    const savedTimestamp = localStorage.getItem(LAST_SAVED_KEY);

    if (savedPositions) {
      const parsed = JSON.parse(savedPositions);
      if (Array.isArray(parsed) && parsed.every(isValidPosition)) {
        setPositions(parsed);
      }
    }

    if (savedTimestamp) setLastSaved(savedTimestamp);
  }, []);

  function savePositions() {
    const timestamp = new Date().toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "medium",
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
    localStorage.setItem(LAST_SAVED_KEY, timestamp);
    setLastSaved(timestamp);
    setSaveMessage("Saved in this browser.");
  }

  function resetPositions() {
    setPositions(startingPositions);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LAST_SAVED_KEY);
    setLastSaved("");
    setSaveMessage("Reset to original data.");
  }

  function exportPortfolio() {
    const json = JSON.stringify(positions, null, 2);
    navigator.clipboard.writeText(json);
    setImportText(json);
    setSaveMessage("Portfolio JSON copied to clipboard.");
  }

  function importPortfolio() {
    try {
      const parsed = JSON.parse(importText);

      if (!Array.isArray(parsed) || !parsed.every(isValidPosition)) {
        setSaveMessage("Import failed: invalid portfolio format.");
        return;
      }

      setPositions(parsed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      setSaveMessage("Imported and saved in this browser.");
    } catch {
      setSaveMessage("Import failed: invalid JSON.");
    }
  }

  if (!isUnlocked) {
    return (
      <main className="min-h-screen bg-[#050816] px-6 py-8 text-white">
        <Header />
        <LoginForm onUnlock={() => setIsUnlocked(true)} />
        <Footer />
      </main>
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
          Manual portfolio edits. Currently saved in this browser only.
        </p>
        <p className="mt-4 text-sm text-slate-500">
          Last saved: {lastSaved || "Not saved yet"}
        </p>
      </section>

      <AdminSummary positions={positions} />

      <ImportExport
        importText={importText}
        setImportText={setImportText}
        exportPortfolio={exportPortfolio}
        importPortfolio={importPortfolio}
      />

      <PortfolioEditor
        positions={positions}
        setPositions={setPositions}
        saveMessage={saveMessage}
        setSaveMessage={setSaveMessage}
        savePositions={savePositions}
        resetPositions={resetPositions}
      />

      <Footer />
    </main>
  );
}