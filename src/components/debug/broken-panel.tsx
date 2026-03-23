"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BrokenCard } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

const severityIcon: Record<
  BrokenCard["severity"],
  { emoji: string; ring: string }
> = {
  critical: { emoji: "❌", ring: "ring-red-500/30" },
  warning: { emoji: "⚠️", ring: "ring-amber-500/30" },
  info: { emoji: "ℹ️", ring: "ring-blue-500/30" },
};

export function BrokenPanel({ cards }: { cards: BrokenCard[] }) {
  const [expanded, setExpanded] = useState<string | null>(cards[0]?.id ?? null);

  return (
    <section className="glass-panel rounded-2xl p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-lg" aria-hidden>
          🚨
        </span>
        <h2 className="text-sm font-semibold text-inspect-text">
          What&apos;s broken
        </h2>
        <span className="ml-auto rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-medium text-red-300">
          {cards.filter((c) => c.severity === "critical").length} critical
        </span>
      </div>
      <ul className="space-y-2">
        {cards.map((card) => {
          const isOpen = expanded === card.id;
          const { emoji, ring } = severityIcon[card.severity];
          return (
            <li key={card.id}>
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : card.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl border border-inspect-border bg-inspect-elevated/40 p-3 text-left transition",
                  "hover:border-violet-500/25 hover:shadow-lg hover:shadow-violet-500/5",
                  isOpen && "ring-2 ring-violet-500/20",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-inspect-card text-base ring-1",
                    ring,
                  )}
                  aria-hidden
                >
                  {emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-inspect-text">{card.title}</p>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden text-sm text-inspect-muted"
                      >
                        {card.explanation}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <span className="shrink-0 text-xs text-violet-400">
                  {isOpen ? "Hide" : "Expand"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
