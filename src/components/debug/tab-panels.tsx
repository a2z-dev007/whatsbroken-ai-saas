"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  summaryStats,
  networkRequests,
  consoleLogs,
  jsErrors,
  aiInsights,
  analyticsTrend,
} from "@/lib/mock-data";
import type { NetworkRequest } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

export function SummaryPanel() {
  const maxBar = Math.max(
    summaryStats.totalApiCalls,
    summaryStats.failedRequests * 10,
    summaryStats.avgResponseTimeMs,
    summaryStats.errorsCount * 5,
  );

  const bars = [
    { label: "API calls", value: summaryStats.totalApiCalls, color: "from-violet-500 to-blue-500" },
    {
      label: "Failed",
      value: summaryStats.failedRequests * 8,
      color: "from-red-500 to-rose-400",
    },
    {
      label: "Avg ms",
      value: summaryStats.avgResponseTimeMs,
      color: "from-amber-500 to-yellow-400",
    },
    {
      label: "Errors",
      value: summaryStats.errorsCount * 6,
      color: "from-orange-500 to-red-400",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat
          label="Total API calls"
          value={summaryStats.totalApiCalls}
          tone="neutral"
        />
        <Stat
          label="Failed requests"
          value={summaryStats.failedRequests}
          tone="bad"
        />
        <Stat
          label="Avg response"
          value={`${summaryStats.avgResponseTimeMs} ms`}
          tone="warn"
        />
        <Stat
          label="JS errors"
          value={summaryStats.errorsCount}
          tone="bad"
        />
      </div>
      <div className="glass-panel rounded-2xl p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-inspect-muted">
          Activity snapshot
        </p>
        <div className="flex h-36 items-end justify-stretch gap-2">
          {bars.map((b) => (
            <div
              key={b.label}
              className="flex min-h-0 flex-1 flex-col items-center justify-end gap-1"
            >
              <motion.div
                className={cn(
                  "w-full max-w-[3rem] rounded-t-lg bg-gradient-to-t",
                  b.color,
                )}
                initial={{ height: 0 }}
                animate={{
                  height: `${Math.max(10, Math.round((b.value / maxBar) * 120))}px`,
                }}
                transition={{ type: "spring", damping: 18, stiffness: 120 }}
              />
              <span className="text-[10px] text-inspect-muted">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="glass-panel rounded-2xl p-4">
        <p className="mb-3 text-xs font-medium text-inspect-muted">
          Error trend (7 days)
        </p>
        <div className="flex h-28 items-end gap-1">
          {analyticsTrend.map((d, i) => (
            <div
              key={d.day}
              className="flex min-h-0 flex-1 flex-col items-center justify-end gap-1"
            >
              <motion.div
                className="w-full rounded-t bg-gradient-to-t from-violet-600/80 to-blue-400/60"
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(6, (d.errors / 20) * 96)}px` }}
                transition={{ delay: i * 0.04, type: "spring", damping: 16 }}
              />
              <span className="text-[9px] text-inspect-muted">{d.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone: "neutral" | "bad" | "warn" | "good";
}) {
  const ring =
    tone === "bad"
      ? "ring-red-500/20"
      : tone === "warn"
        ? "ring-amber-500/20"
        : tone === "good"
          ? "ring-emerald-500/20"
          : "ring-inspect-border";
  return (
    <div className={cn("rounded-2xl border border-inspect-border bg-inspect-elevated/50 p-3 ring-1", ring)}>
      <p className="text-[10px] font-medium uppercase tracking-wide text-inspect-muted">
        {label}
      </p>
      <p className="mt-1 text-xl font-semibold tabular-nums text-inspect-text">
        {value}
      </p>
    </div>
  );
}

export function NetworkPanel({
  onSelect,
}: {
  onSelect: (r: NetworkRequest) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-inspect-border">
      <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 border-b border-inspect-border bg-inspect-elevated/60 px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-inspect-muted sm:px-4">
        <span>Endpoint</span>
        <span className="text-center">Method</span>
        <span className="text-center">Status</span>
        <span className="text-right">Time</span>
      </div>
      <ul className="divide-y divide-inspect-border">
        {networkRequests.map((r) => (
          <li key={r.id}>
            <button
              type="button"
              onClick={() => onSelect(r)}
              className="grid w-full grid-cols-[1fr_auto_auto_auto] gap-2 px-3 py-3 text-left text-sm transition hover:bg-inspect-elevated/80 sm:px-4"
            >
              <span className="truncate font-mono text-xs text-inspect-text">
                {r.url}
              </span>
              <span className="text-center font-mono text-[11px] text-inspect-muted">
                {r.method}
              </span>
              <span className="text-center">
                <span
                  className={cn(
                    "inline-block min-w-[2.25rem] rounded-md px-1.5 py-0.5 text-center font-mono text-[11px]",
                    r.status >= 500
                      ? "bg-red-500/20 text-red-300"
                      : r.status >= 400
                        ? "bg-amber-500/20 text-amber-200"
                        : r.status >= 200 && r.status < 300
                          ? "bg-emerald-500/20 text-emerald-200"
                          : "bg-inspect-elevated text-inspect-muted",
                  )}
                >
                  {r.status}
                </span>
              </span>
              <span className="text-right font-mono text-[11px] text-inspect-muted">
                {r.time}ms
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ConsolePanel() {
  const [filter, setFilter] = useState<"all" | "log" | "warn" | "error">("all");
  const rows = useMemo(() => {
    if (filter === "all") return consoleLogs;
    return consoleLogs.filter((l) => l.level === filter);
  }, [filter]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {(["all", "log", "warn", "error"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium capitalize transition",
              filter === f
                ? "bg-violet-600 text-white"
                : "border border-inspect-border text-inspect-muted hover:bg-inspect-elevated",
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <ul className="space-y-2 font-mono text-[11px]">
        {rows.map((l) => (
          <li
            key={l.id}
            className={cn(
              "rounded-xl border border-inspect-border bg-inspect-elevated/40 px-3 py-2",
              l.level === "error" && "border-red-500/25 bg-red-500/5",
              l.level === "warn" && "border-amber-500/25 bg-amber-500/5",
            )}
          >
            <span className="text-inspect-muted">{l.timestamp}</span>{" "}
            <span
              className={cn(
                "font-semibold",
                l.level === "error" && "text-red-300",
                l.level === "warn" && "text-amber-200",
                l.level === "log" && "text-slate-300",
              )}
            >
              [{l.level.toUpperCase()}]
            </span>{" "}
            <span className="text-inspect-text">{l.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ErrorsPanel() {
  return (
    <ul className="space-y-3">
      {jsErrors.map((e) => (
        <li
          key={e.id}
          className="overflow-hidden rounded-2xl border border-inspect-border bg-inspect-elevated/40"
        >
          <div className="flex flex-wrap items-center gap-2 border-b border-inspect-border px-3 py-2">
            <span className="rounded-md bg-red-500/20 px-2 py-0.5 text-[10px] font-medium text-red-200">
              ×{e.count} similar
            </span>
            <span className="text-xs text-inspect-muted">
              {e.file}:{e.line}
            </span>
          </div>
          <p className="px-3 py-2 text-sm text-inspect-text">{e.message}</p>
          <pre className="max-h-40 overflow-auto border-t border-inspect-border bg-inspect-bg/80 p-3 text-[10px] leading-relaxed text-inspect-muted">
            {e.stack}
          </pre>
        </li>
      ))}
    </ul>
  );
}

export function AiInsightsPanel() {
  return (
    <ul className="space-y-4">
      {aiInsights.map((a, i) => (
        <motion.li
          key={a.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="relative overflow-hidden rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 via-inspect-card to-blue-500/10 p-4"
        >
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/20 blur-2xl" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-lg" aria-hidden>
                🤖
              </span>
              <h3 className="font-semibold text-inspect-text">{a.title}</h3>
              <span
                className={cn(
                  "ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium",
                  a.severity === "critical"
                    ? "bg-red-500/20 text-red-200"
                    : "bg-amber-500/20 text-amber-100",
                )}
              >
                {a.severity}
              </span>
            </div>
            <p className="mt-2 text-sm text-inspect-muted">
              <span className="font-medium text-inspect-text">Cause: </span>
              {a.cause}
            </p>
            <p className="mt-2 text-sm text-inspect-muted">
              <span className="font-medium text-emerald-300/90">Suggested fix: </span>
              {a.fix}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-inspect-muted">
              <span className="rounded-lg bg-inspect-bg/80 px-2 py-1">
                Impact: {a.impact}
              </span>
              <span className="rounded-lg bg-inspect-bg/80 px-2 py-1">{a.time}</span>
            </div>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
