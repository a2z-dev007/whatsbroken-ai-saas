"use client";

import { motion } from "framer-motion";
import {
  analyticsTrend,
  aiTimeline,
  summaryStats,
} from "@/lib/mock-data";
import { AnimatedNumber } from "@/components/ui/animated-number";

export default function AnalyticsPage() {
  const maxErr = Math.max(...analyticsTrend.map((d) => d.errors));
  const maxP95 = Math.max(...analyticsTrend.map((d) => d.p95));

  return (
    <div className="inspect-gradient-bg min-h-dvh px-4 pb-24 pt-6 lg:px-8">
      <header className="mx-auto mb-6 max-w-4xl">
        <h1 className="text-2xl font-semibold tracking-tight text-inspect-text">
          Analytics
        </h1>
        <p className="mt-1 text-sm text-inspect-muted">
          Error trends, API performance, and AI highlights—prototype data.
        </p>
      </header>

      <div className="mx-auto grid max-w-4xl gap-4 lg:grid-cols-3">
        <div className="glass-panel rounded-2xl p-4 lg:col-span-1">
          <p className="text-xs font-medium uppercase tracking-wider text-inspect-muted">
            Errors (7d peak)
          </p>
          <p className="mt-2 text-3xl font-semibold text-inspect-text">
            <AnimatedNumber value={summaryStats.errorsCount} />
          </p>
          <p className="mt-1 text-xs text-inspect-muted">Rolling window</p>
        </div>
        <div className="glass-panel rounded-2xl p-4 lg:col-span-2">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-inspect-muted">
            Error trend
          </p>
          <div className="flex h-40 items-end gap-2">
            {analyticsTrend.map((d, i) => (
              <div
                key={d.day}
                className="flex flex-1 flex-col items-center justify-end gap-1"
              >
                <motion.div
                  className="w-full rounded-t-lg bg-gradient-to-t from-red-500/70 to-violet-500/40"
                  initial={{ height: 0 }}
                  animate={{
                    height: `${Math.max(8, (d.errors / maxErr) * 120)}px`,
                  }}
                  transition={{ delay: i * 0.04, type: "spring", damping: 14 }}
                />
                <span className="text-[10px] text-inspect-muted">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 lg:col-span-2">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-inspect-muted">
            API p95 latency (ms)
          </p>
          <div className="flex h-36 items-end gap-2">
            {analyticsTrend.map((d, i) => (
              <div
                key={d.day}
                className="flex flex-1 flex-col items-center justify-end gap-1"
              >
                <motion.div
                  className="w-full rounded-t-lg bg-gradient-to-t from-blue-500/80 to-cyan-400/50"
                  initial={{ height: 0 }}
                  animate={{
                    height: `${Math.max(8, (d.p95 / maxP95) * 100)}px`,
                  }}
                  transition={{ delay: i * 0.04, type: "spring", damping: 14 }}
                />
                <span className="text-[10px] text-inspect-muted">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 lg:col-span-1">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-inspect-muted">
            AI insights timeline
          </p>
          <ul className="space-y-3">
            {aiTimeline.map((t, i) => (
              <motion.li
                key={t.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="border-l-2 border-violet-500/50 pl-3"
              >
                <p className="text-sm text-inspect-text">{t.text}</p>
                <p className="text-[11px] text-inspect-muted">{t.time}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
