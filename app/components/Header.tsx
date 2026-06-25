"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [text, setText] = useState("Dodgy");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(
      setTimeout(() => {
        setVisible(false);
      }, 250)
    );

    timers.push(
      setTimeout(() => {
        setText("Digital");
        setVisible(true);
      }, 420)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <nav className="mx-auto flex max-w-6xl items-center justify-between border-b border-white/10 pb-6">
      <Link href="/" className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.04] text-sm font-bold tracking-widest shadow-lg transition-transform duration-300 hover:scale-105">
          ELC
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
            Exit Liquidity Capital
          </p>

          <h1 className="mt-1 text-xl font-semibold text-white">
            <span
              className={`transition-opacity duration-200 ${
                visible ? "opacity-100" : "opacity-0"
              }`}
            >
              {text}
            </span>{" "}
            Asset Investment Fund
          </h1>
        </div>
      </Link>

      <div className="hidden gap-6 text-sm text-slate-300 md:flex">
        <Link href="/" className="transition-colors hover:text-white">
          Dashboard
        </Link>
        <Link href="/portfolio" className="transition-colors hover:text-white">
          Portfolio
        </Link>
        <Link href="/trades" className="transition-colors hover:text-white">
          Trades
        </Link>
        <Link href="/journal" className="transition-colors hover:text-white">
          Journal
        </Link>
        <Link href="/about" className="transition-colors hover:text-white">
          About
        </Link>
      </div>
    </nav>
  );
}