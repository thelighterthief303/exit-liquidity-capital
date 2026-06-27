"use client";

import { useState } from "react";

const ADMIN_PASSWORD = "elc";

type LoginFormProps = {
  onUnlock: () => void;
};

export default function LoginForm({ onUnlock }: LoginFormProps) {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function unlockAdmin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password === ADMIN_PASSWORD) {
      setPassword("");
      setPasswordError("");
      onUnlock();
      return;
    }

    setPasswordError("Incorrect password. Very suspicious.");
  }

  return (
    <section className="mx-auto max-w-md py-24">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
          Admin
        </p>

        <h2 className="mt-3 text-4xl font-bold">Restricted Area</h2>

        <p className="mt-4 text-slate-400">
          Enter the admin password. Try not to write it on a Post-it.
        </p>

        <form onSubmit={unlockAdmin} className="mt-8 space-y-4">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
          />

          {passwordError && (
            <p className="text-sm text-red-400">{passwordError}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            Unlock Admin
          </button>
        </form>

        <p className="mt-4 text-xs text-slate-600">Temporary password: elc</p>
      </div>
    </section>
  );
}