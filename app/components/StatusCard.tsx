"use client";

import { useEffect, useState } from "react";

export default function StatusCard() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-sm text-slate-500">Market Status</p>

      <div className="mt-5 space-y-3">
        <p className="text-emerald-400">● Online</p>
        <p className="text-3xl font-bold">{time}</p>
        <p className="text-slate-400">London</p>
        <p className="text-sm text-slate-500">Reasonably Bullish</p>
      </div>
    </div>
  );
}