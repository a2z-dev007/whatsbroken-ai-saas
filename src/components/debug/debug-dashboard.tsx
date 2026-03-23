"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { brokenCards } from "@/lib/mock-data";
import type { NetworkRequest } from "@/lib/mock-data";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/layout/logo";
import { useTheme } from "@/components/providers";
import { WebsitePreview } from "./website-preview";
import { BrokenPanel } from "./broken-panel";
import { NetworkDrawer } from "./network-drawer";
import {
  SummaryPanel,
  NetworkPanel,
  ConsolePanel,
  ErrorsPanel,
  AiInsightsPanel,
} from "./tab-panels";

const tabs = [
  { id: "summary", label: "Summary" },
  { id: "network", label: "Network" },
  { id: "console", label: "Console" },
  { id: "errors", label: "Errors" },
  { id: "ai", label: "AI Insights" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function DebugDashboard({ url }: { url: string }) {
  const { theme, toggleTheme } = useTheme();
  const [tab, setTab] = useState<TabId>("summary");
  const [selected, setSelected] = useState<NetworkRequest | null>(null);
  const [livePulse, setLivePulse] = useState(true);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => setLivePulse((p) => !p), 2400);
    return () => clearInterval(t);
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStart.current === null) return;
      const delta = e.changedTouches[0].clientX - touchStart.current;
      touchStart.current = null;
      if (Math.abs(delta) < 50) return;
      const idx = tabs.findIndex((t) => t.id === tab);
      if (delta < 0 && idx < tabs.length - 1) setTab(tabs[idx + 1].id);
      if (delta > 0 && idx > 0) setTab(tabs[idx - 1].id);
    },
    [tab],
  );

  const displayUrl =
    url.trim() || "https://shop.example.com/checkout";

  return (
    <div className="inspect-gradient-bg min-h-dvh pb-24 pt-3 sm:pt-4 lg:pb-8 lg:pt-6">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 lg:px-8">
        <header className="mb-4 flex flex-wrap items-center gap-3 border-b border-inspect-border pb-4">
          <Logo />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-inspect-text">
              {displayUrl.replace(/^https?:\/\//, "")}
            </p>
            <p className="text-xs text-inspect-muted">Site health report · Demo</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                livePulse
                  ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
                  : "bg-inspect-elevated text-inspect-muted",
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  livePulse ? "animate-pulse bg-emerald-400" : "bg-inspect-muted",
                )}
              />
              Live
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-xl border border-inspect-border px-3 py-1.5 text-xs text-inspect-muted transition hover:bg-inspect-elevated hover:text-inspect-text"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start lg:gap-6">
          <div className="space-y-4 lg:sticky lg:top-6">
            <WebsitePreview url={displayUrl} />
            <BrokenPanel cards={brokenCards} />
          </div>

          <div
            className="min-w-0"
            onTouchStart={(e) => {
              touchStart.current = e.touches[0].clientX;
            }}
            onTouchEnd={onTouchEnd}
          >
            <div className="glass-panel mb-3 rounded-2xl p-1">
              <div
                className="scrollbar-hide flex gap-1 overflow-x-auto rounded-xl bg-inspect-bg/40 p-1"
                data-lenis-prevent
              >
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition sm:text-sm",
                      tab === t.id
                        ? "bg-gradient-to-r from-violet-600/90 to-blue-600/90 text-white shadow-lg shadow-violet-500/20"
                        : "text-inspect-muted hover:text-inspect-text",
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl"
              >
                {tab === "summary" && <SummaryPanel />}
                {tab === "network" && (
                  <NetworkPanel onSelect={(r) => setSelected(r)} />
                )}
                {tab === "console" && <ConsolePanel />}
                {tab === "errors" && <ErrorsPanel />}
                {tab === "ai" && <AiInsightsPanel />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected ? (
          <NetworkDrawer
            key={selected.id}
            req={selected}
            onClose={() => setSelected(null)}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
