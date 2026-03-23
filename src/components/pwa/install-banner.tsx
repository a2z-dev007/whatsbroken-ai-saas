"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

export function InstallBanner() {
  const [open, setOpen] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="glass-panel mx-auto mb-4 w-full max-w-lg rounded-2xl border border-inspect-border p-3 shadow-xl sm:p-4"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-blue-500/20 text-lg">
              📲
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-inspect-text">Add WhatsBroken to Home Screen</p>
              <p className="mt-1 text-sm text-inspect-muted">
                Prototype: on iOS use Share → Add to Home Screen. On Android, use
                Install app from the browser menu.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  className={cn(
                    "rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-sm font-medium text-white",
                    "shadow-lg shadow-violet-500/25 transition hover:opacity-95 active:scale-[0.98]",
                  )}
                  onClick={() => setOpen(false)}
                >
                  Got it
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-inspect-border px-4 py-2 text-sm text-inspect-muted transition hover:bg-inspect-elevated hover:text-inspect-text"
                  onClick={() => setDismissed(true)}
                >
                  Don&apos;t show again
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
