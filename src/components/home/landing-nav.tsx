"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useLenis } from "lenis/react";
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

const SCROLL_GLASS_THRESHOLD = 24;

export function LandingNav() {
  const { demoMode, setDemoMode } = useDemoMode();
  const [scrolled, setScrolled] = useState(false);

  const onLenisScroll = useCallback((instance: { scroll: number }) => {
    setScrolled(instance.scroll > SCROLL_GLASS_THRESHOLD);
  }, []);

  const lenis = useLenis(onLenisScroll, []);

  useEffect(() => {
    if (lenis) return;
    const tick = () => {
      const y =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setScrolled(y > SCROLL_GLASS_THRESHOLD);
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    return () => window.removeEventListener("scroll", tick);
  }, [lenis]);

  const scrollToAnalyze = () => {
    const el = document.getElementById("analyze");
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -96, lerp: 0.08 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-30 border-b px-3 pb-3.5 pt-[max(0.875rem,env(safe-area-inset-top,0px))] transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300 ease-out sm:px-6 sm:pb-4 sm:pt-[max(1rem,env(safe-area-inset-top,0px))]",
        scrolled
          ? "border-white/[0.08] bg-inspect-bg/65 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.55)] backdrop-blur-2xl backdrop-saturate-150 ring-1 ring-inset ring-white/[0.04]"
          : "border-transparent bg-transparent shadow-none backdrop-blur-none ring-0 ring-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-2 sm:gap-4">
        <div className="min-w-0 flex-1 sm:flex-none">
          <Logo />
        </div>
        <nav
          className="hidden items-center gap-1 md:ml-4 md:flex"
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
        <div className="flex shrink-0 items-center gap-1.5 sm:ml-auto sm:gap-3">
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
            className="hidden touch-manipulation rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-500/25 transition active:scale-[0.98] hover:opacity-95 sm:inline-block sm:py-2"
          >
            Pro
          </Link>
          <button
            type="button"
            onClick={scrollToAnalyze}
            className="touch-manipulation rounded-xl bg-inspect-elevated px-3 py-2.5 text-sm font-medium text-inspect-text ring-1 ring-inspect-border transition active:scale-[0.98] hover:ring-violet-500/40 sm:min-h-0 sm:px-4 sm:py-2"
          >
            Scan
          </button>
        </div>
      </div>
    </motion.header>
  );
}
