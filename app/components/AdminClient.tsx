"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { positions as fallbackPositions } from "../../data/fund";
import { getPositions, savePositions as saveDbPositions } from "../../../lib/positions";
import { useEffect, useState } from "react";
import type { Position } from "./types";
import LoginForm from "./LoginForm";
import AdminSummary from "./AdminSummary";
import ImportExport from "./ImportExport";
import PortfolioEditor from "./PortfolioEditor";

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
  const [positions, setPositions] = useState<Position[]>(fallbackPositions);
  const [saveMessage, setSaveMessage] = useState("");
  const [importText, setImportText] = useState("");
  const [lastSaved, setLastSaved] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPositions() {
      try {
        const dbPositions = await getPositions();
        setPositions(dbPositions);
        setSaveMessage("");
      } catch {
        setSaveMessage("Could not load database positions. Using fallback data.");
      } finally {
        setIsLoading(false);
      }
    }

    loadPositions();
  }, []);

  async function savePositions() {
    try {
      await saveDbPositions(positions);

      const timestamp = new Date().toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "medium",
      });

      setLastSaved(timestamp);
      setSaveMessage("Saved to Supabase database.");
    } catch {
      setSaveMessage("Save failed. Database did not accept the update.");
    }
  }

  async function resetPositions() {
    setPositions(fallbackPositions);

    try {
      await saveDbPositions(fallbackPositions);
      setSaveMessage("Reset database to original data.");
    } catch {
      setSaveMessage("Reset locally, but database save failed.");
    }
  }

  function exportPortfolio() {
    const json = JSON.stringify(positions, null, 2);
    navigator.clipboard.writeText(json);
    setImportText(json);
    setSaveMessage("Portfolio JSON copied to clipboard.");
  }

  async function importPortfolio() {
    try {
      const parsed = JSON.parse(importText);

      if (!Array.isArray(parsed) || !parsed.every(isValidPosition)) {
        setSaveMessage("Import failed: invalid portfolio format.");
        return;
      }

      setPositions(parsed);
      await saveDbPositions(parsed);
      setSaveMessage("Imported and saved to database.");
    } catch {
      setSaveMessage("Import failed: invalid JSON or database error.");
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
          Manual portfolio edits saved to Supabase.
        </p>
        <p className="mt-4 text-sm text-slate-500">
          Last saved: {lastSaved || "Not saved this session"}
        </p>
        {isLoading && (
          <p className="mt-4 text-sm text-emerald-400">
            Loading database positions...
          </p>
        )}
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