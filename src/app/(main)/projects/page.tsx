"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

export default function ProjectsPage() {
  return (
    <div className="inspect-gradient-bg min-h-dvh px-4 pb-24 pt-6 lg:px-8">
      <header className="mx-auto mb-6 max-w-4xl">
        <h1 className="text-2xl font-semibold tracking-tight text-inspect-text">
          Projects
        </h1>
        <p className="mt-1 text-sm text-inspect-muted">
          Monitor health across sites. Tap a project to open the debug view.
        </p>
      </header>
      <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
        {projects.map((p, i) => (
          <motion.li
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              href={`/debug?url=${encodeURIComponent(`https://${p.url}`)}`}
              className={cn(
                "glass-panel block rounded-2xl p-4 transition",
                "hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/10",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-inspect-text">{p.name}</p>
                  <p className="mt-0.5 font-mono text-xs text-inspect-muted">
                    {p.url}
                  </p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                    p.status === "healthy"
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "bg-red-500/15 text-red-300",
                  )}
                >
                  {p.status === "healthy" ? "Healthy" : "Issues"}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-inspect-muted">
                <span>Last activity: {p.lastActivity}</span>
                {p.errorsCount > 0 && (
                  <span className="text-red-300/90">
                    {p.errorsCount} open errors
                  </span>
                )}
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
