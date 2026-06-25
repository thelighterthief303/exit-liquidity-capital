"use client";

import { useEffect, useState } from "react";

export default function StatusCard() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function updateTime() {
      const now = new Date();

      setTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Europe/London",
        })
      );
    }

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
      <h3 className="text-xl font-semibold">Market Status</h3>

      <div className="mt-6 space-y-5 text-slate-300">
        <div>
          <p className="text-sm text-slate-500">System</p>
          <p className="text-lg text-emerald-400">● Online</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">London Time</p>
          <p className="text-2xl font-semibold text-white">{time}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Data Source</p>
          <p>Manual Entry</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Market Mood</p>
          <p>Reasonably Bullish</p>
        </div>
      </div>
    </div>
  );
}