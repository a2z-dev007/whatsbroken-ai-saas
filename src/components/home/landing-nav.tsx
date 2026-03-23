"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/layout/logo";
import { useDemoMode } from "@/components/providers";
import { cn } from "@/lib/cn";

const links = [
  { href: "#solutions", label: "Solutions" },
  { href: "#compare", label: "Why us" },
  { href: "#features", label: "Features" },
  { href: "#faq", label: "FAQ" },
  { href: "#pricing-teaser", label: "Pricing" },
] as const;

export function LandingNav() {
  const { demoMode, setDemoMode } = useDemoMode();

  const scrollToAnalyze = () => {
    document.getElementById("analyze")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-30 border-b border-transparent px-4 py-3 backdrop-blur-xl sm:px-6"
      style={{
        background:
          "color-mix(in srgb, var(--inspect-bg) 75%, transparent)",
        borderColor: "var(--inspect-border)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4">
        <Logo />
        <nav
          className="ml-4 hidden items-center gap-1 md:flex"
          aria-label="Page sections"
        >
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="rounded-lg px-3 py-2 text-sm text-inspect-muted transition hover:bg-inspect-elevated/80 hover:text-inspect-text"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <label className="hidden cursor-pointer items-center gap-2 text-xs text-inspect-muted sm:flex">
            <span>Demo</span>
            <button
              type="button"
              role="switch"
              aria-checked={demoMode}
              onClick={() => setDemoMode(!demoMode)}
              className={cn(
                "relative h-7 w-12 shrink-0 rounded-full transition-colors",
                demoMode ? "bg-violet-600" : "bg-inspect-elevated",
              )}
            >
              <span
                className={cn(
                  "absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform",
                  demoMode ? "left-6" : "left-1",
                )}
              />
            </button>
          </label>
          <Link
            href="/pricing"
            className="hidden rounded-xl border border-inspect-border px-3 py-2 text-sm text-inspect-muted transition hover:bg-inspect-elevated hover:text-inspect-text md:inline-block"
          >
            Pricing
          </Link>
          <Link
            href="/pricing"
            className="hidden rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-md shadow-violet-500/25 transition hover:opacity-95 sm:inline-block"
          >
            Get Pro
          </Link>
          <button
            type="button"
            onClick={scrollToAnalyze}
            className="rounded-xl bg-inspect-elevated px-3 py-2 text-sm font-medium text-inspect-text ring-1 ring-inspect-border transition hover:ring-violet-500/40 sm:px-4"
          >
            Free scan
          </button>
        </div>
      </div>
    </motion.header>
  );
}
