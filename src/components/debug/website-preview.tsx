"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function WebsitePreview({ url }: { url: string }) {
  const host = (() => {
    try {
      return new URL(url).hostname;
    } catch {
      return url.replace(/^https?:\/\//, "").split("/")[0];
    }
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel overflow-hidden rounded-2xl"
    >
      <div className="flex items-center gap-2 border-b border-inspect-border bg-inspect-elevated/50 px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <div className="mx-auto flex max-w-[min(100%,280px)] flex-1 items-center gap-2 rounded-lg bg-inspect-bg/80 px-2 py-1 text-[10px] text-inspect-muted">
          <span className="text-emerald-400">🔒</span>
          <span className="truncate font-mono">{host}</span>
        </div>
      </div>
      <div className="relative mx-auto max-w-[280px] bg-inspect-bg p-3 sm:max-w-[320px]">
        <div
          className={cn(
            "overflow-hidden rounded-xl border border-inspect-border bg-gradient-to-b from-inspect-card to-inspect-bg",
            "shadow-inner",
          )}
        >
          <div className="border-b border-inspect-border px-3 py-2">
            <div className="h-2 w-24 rounded skeleton" />
          </div>
          <div className="space-y-3 p-3">
            <div className="flex gap-2">
              <div className="h-10 flex-1 rounded-lg skeleton" />
              <div className="h-10 w-10 rounded-lg skeleton" />
            </div>
            <div className="h-24 rounded-xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 p-3">
              <div className="h-3 w-2/3 rounded skeleton" />
              <div className="mt-2 h-2 w-full rounded skeleton" />
              <div className="mt-1 h-2 w-4/5 rounded skeleton" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-16 rounded-lg skeleton" />
              <div className="h-16 rounded-lg skeleton" />
            </div>
            <motion.div
              className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 py-1.5 text-[10px] text-amber-200/90"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            >
              Simulated preview — optional SDK mirrors your real page in the app.
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
