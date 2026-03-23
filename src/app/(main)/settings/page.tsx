"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme, useDemoMode } from "@/components/providers";
import { CDN_SDK_URL } from "@/lib/brand";
import { cn } from "@/lib/cn";

const SNIPPET = `<script
  src="${CDN_SDK_URL}"
  data-project="YOUR_PROJECT_ID"
  async
></script>`;

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { demoMode, setDemoMode } = useDemoMode();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(SNIPPET.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="inspect-gradient-bg min-h-dvh px-4 pb-24 pt-6 lg:px-8">
      <header className="mx-auto mb-6 max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight text-inspect-text">
          Settings & SDK
        </h1>
        <p className="mt-1 text-sm text-inspect-muted">
          Install the snippet, tune the prototype, and match your brand theme.
        </p>
      </header>

      <div className="mx-auto max-w-2xl space-y-4">
        <section className="glass-panel rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-inspect-text">Install SDK</h2>
          <p className="mt-1 text-sm text-inspect-muted">
            Add this before the closing <code className="text-violet-300">&lt;/body&gt;</code> tag.
          </p>
          <div className="relative mt-4 overflow-hidden rounded-xl border border-inspect-border bg-inspect-bg">
            <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed text-slate-300">
              {SNIPPET}
            </pre>
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={copy}
              className={cn(
                "absolute right-3 top-3 rounded-lg px-3 py-1.5 text-xs font-medium",
                copied
                  ? "bg-emerald-500/20 text-emerald-200"
                  : "bg-violet-600 text-white shadow-lg shadow-violet-500/25",
              )}
            >
              {copied ? "Copied" : "Copy"}
            </motion.button>
          </div>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-inspect-muted">
            <li>Copy the snippet and paste it into your site layout.</li>
            <li>Replace <code className="text-inspect-text">YOUR_PROJECT_ID</code> with your project key.</li>
            <li>Deploy—WhatsBroken begins streaming health data to your dashboard.</li>
          </ol>
        </section>

        <section className="glass-panel rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-inspect-text">Appearance</h2>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-inspect-text">Theme</p>
              <p className="text-xs text-inspect-muted">
                Dark is default; switch to light for stakeholder reviews.
              </p>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-xl border border-inspect-border px-4 py-2 text-sm font-medium text-inspect-text transition hover:bg-inspect-elevated"
            >
              Use {theme === "dark" ? "light" : "dark"} mode
            </button>
          </div>
        </section>

        <section className="glass-panel rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-inspect-text">Plans</h2>
          <p className="mt-1 text-sm text-inspect-muted">
            Compare tiers for your rollout storyboards.
          </p>
          <Link
            href="/pricing"
            className="mt-4 inline-flex rounded-xl border border-inspect-border px-4 py-2 text-sm font-medium text-inspect-text transition hover:bg-inspect-elevated"
          >
            View pricing
          </Link>
        </section>

        <section className="glass-panel rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-inspect-text">Prototype</h2>
          <label className="mt-4 flex cursor-pointer items-center justify-between gap-3">
            <div>
              <p className="text-sm text-inspect-text">Demo mode</p>
              <p className="text-xs text-inspect-muted">
                Longer “Analyzing…” animation on the home screen.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={demoMode}
              onClick={() => setDemoMode(!demoMode)}
              className={cn(
                "relative h-8 w-14 shrink-0 rounded-full transition-colors",
                demoMode ? "bg-violet-600" : "bg-inspect-elevated",
              )}
            >
              <span
                className={cn(
                  "absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-transform",
                  demoMode ? "left-7" : "left-1",
                )}
              />
            </button>
          </label>
        </section>
      </div>
    </div>
  );
}
