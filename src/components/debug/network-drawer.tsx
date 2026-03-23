"use client";

import { motion } from "framer-motion";
import type { NetworkRequest } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

export function NetworkDrawer({
  req,
  onClose,
}: {
  req: NetworkRequest;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center lg:items-start lg:justify-end lg:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm lg:bg-black/30"
        aria-label="Close drawer"
        onClick={onClose}
      />
      <motion.aside
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        className={cn(
          "relative max-h-[85dvh] w-full overflow-y-auto rounded-t-3xl border border-inspect-border bg-inspect-card p-5 shadow-2xl",
          "lg:max-h-[calc(100dvh-6rem)] lg:max-w-md lg:rounded-2xl",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between gap-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-inspect-muted">
              Request detail
            </p>
            <p className="mt-1 font-mono text-sm text-inspect-text">{req.url}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-inspect-border px-3 py-1.5 text-xs text-inspect-muted hover:bg-inspect-elevated hover:text-inspect-text"
          >
            Close
          </button>
        </div>
        <div className="mb-3 flex flex-wrap gap-2 text-xs">
          <span className="rounded-md bg-inspect-elevated px-2 py-1 font-mono">
            {req.method}
          </span>
          <span
            className={cn(
              "rounded-md px-2 py-1 font-mono",
              req.status >= 500
                ? "bg-red-500/20 text-red-300"
                : req.status >= 400
                  ? "bg-amber-500/20 text-amber-200"
                  : "bg-emerald-500/20 text-emerald-200",
            )}
          >
            {req.status}
          </span>
          <span className="rounded-md bg-inspect-elevated px-2 py-1 text-inspect-muted">
            {req.time} ms
          </span>
        </div>
        <Section title="Request headers">
          <pre className="max-h-32 overflow-auto rounded-xl bg-inspect-bg p-3 text-[11px] leading-relaxed text-inspect-muted">
            {JSON.stringify(req.requestHeaders, null, 2)}
          </pre>
        </Section>
        {req.payload !== undefined && (
          <Section title="Payload">
            <pre className="max-h-40 overflow-auto rounded-xl bg-inspect-bg p-3 text-[11px] text-violet-200/90">
              {JSON.stringify(req.payload, null, 2)}
            </pre>
          </Section>
        )}
        <Section title="Response JSON">
          <pre className="max-h-48 overflow-auto rounded-xl bg-inspect-bg p-3 text-[11px] text-blue-200/90">
            {JSON.stringify(req.responseBody, null, 2)}
          </pre>
        </Section>
      </motion.aside>
    </motion.div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <p className="mb-2 text-xs font-medium text-inspect-muted">{title}</p>
      {children}
    </div>
  );
}
