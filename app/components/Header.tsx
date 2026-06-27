"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [showDigital, setShowDigital] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDigital(true);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  return (
    <nav className="mx-auto flex max-w-6xl items-center justify-between border-b border-white/10 pb-6">
      <Link href="/" className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.04] text-sm font-bold tracking-widest shadow-lg transition-transform duration-300 hover:scale-105">
          ELC
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Exit Liquidity Capital
          </h1>

          <p className="mt-1 whitespace-nowrap text-sm text-slate-400">
            <span className="relative inline-block w-[46px] align-bottom">
              <span
                className={`absolute left-0 top-0 transition-opacity duration-400 ${
                  showDigital ? "opacity-0" : "opacity-100"
                }`}
              >
                Dodgy
              </span>

              <span
                className={`absolute left-0 top-0 transition-opacity duration-400 ${
                  showDigital ? "opacity-100" : "opacity-0"
                }`}
              >
                Digital
              </span>

              <span className="opacity-0">Digital</span>
            </span>{" "}
            Asset Investment Fund
          </p>
        </div>
      </Link>

      <div className="hidden gap-6 text-sm text-slate-300 md:flex">
        <Link href="/" className="transition-colors hover:text-white">Dashboard</Link>
        <Link href="/portfolio" className="transition-colors hover:text-white">Portfolio</Link>
        <Link href="/trades" className="transition-colors hover:text-white">Trades</Link>
        <Link href="/journal" className="transition-colors hover:text-white">Journal</Link>
        <Link href="/about" className="transition-colors hover:text-white">About</Link>
        <Link href="/admin" className="transition-colors hover:text-white">Admin</Link>
      </div>
    </nav>
  );
}