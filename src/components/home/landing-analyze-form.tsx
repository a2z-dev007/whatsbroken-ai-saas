"use client";

import { motion } from "framer-motion";
import { exampleUrls } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

type Props = {
  url: string;
  setUrl: (v: string) => void;
  analyze: () => void;
  loading: boolean;
  /** Tighter layout for bottom CTA */
  variant?: "hero" | "footer";
};

export function LandingAnalyzeForm({
  url,
  setUrl,
  analyze,
  loading,
  variant = "hero",
}: Props) {
  const isHero = variant === "hero";

  return (
    <div className={cn(!isHero && "w-full max-w-xl mx-auto")}>
      <div
        className={cn(
          "glass-panel rounded-2xl p-2 shadow-2xl",
          !isHero && "shadow-xl",
        )}
      >
        <label htmlFor={isHero ? "url" : "url-footer"} className="sr-only">
          Website URL
        </label>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            id={isHero ? "url" : "url-footer"}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your website URL (try it on your phone)"
            className="min-h-12 flex-1 rounded-xl border border-transparent bg-inspect-elevated/80 px-4 text-sm text-inspect-text outline-none ring-violet-500/40 placeholder:text-inspect-muted focus:ring-2"
          />
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={analyze}
            disabled={loading}
            className={cn(
              "flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold text-white",
              "bg-gradient-to-r from-violet-600 to-blue-600 shadow-lg shadow-violet-500/30",
              "disabled:cursor-not-allowed disabled:opacity-70",
            )}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Checking…
              </span>
            ) : (
              <>Check website</>
            )}
          </motion.button>
        </div>
      </div>

      {isHero && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-inspect-muted">Try:</span>
          {exampleUrls.map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setUrl(u)}
              className="rounded-full border border-inspect-border bg-inspect-card/50 px-3 py-1.5 text-xs text-inspect-muted transition hover:border-violet-500/40 hover:text-inspect-text"
            >
              {u.replace("https://", "")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
