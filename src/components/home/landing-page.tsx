"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLandingAnalyze } from "@/hooks/use-landing-analyze";
import { LandingNav } from "./landing-nav";
import { LandingAnalyzeForm } from "./landing-analyze-form";
import { LandingSections } from "./landing-sections";
import { LandingFooter } from "./landing-footer";
import { LandingHeroWow } from "./landing-hero-wow";
import Link from "next/link";

export function LandingPage() {
  const {
    url,
    setUrl,
    loading,
    analyze,
    lineIdx,
    analysisLines,
    demoMode,
  } = useLandingAnalyze();

  return (
    <div className="inspect-gradient-bg relative min-h-dvh safe-bottom">
      {/* Nav stays outside overflow-x clip so position:sticky works (overflow on ancestors breaks sticky) */}
      <LandingNav />

      <div className="overflow-x-hidden">
        <LandingHeroWow
          url={url}
          setUrl={setUrl}
          analyze={analyze}
          loading={loading}
        />

        <div className="overflow-x-hidden">
          <LandingSections />
        </div>

        <section className="relative overflow-hidden border-t border-inspect-border/80 bg-gradient-to-b from-violet-950/40 via-inspect-bg to-inspect-bg px-4 py-16 sm:px-6 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(139,92,246,0.15),transparent)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400/90">
              Ready when you are
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-inspect-text sm:text-4xl">
              Know what&apos;s wrong before you open your laptop
            </h2>
            <p className="mt-4 text-base text-inspect-muted">
              Run a free check from your phone, then upgrade to Pro for unlimited
              sites, history, and AI explanations your whole team can use.
            </p>
          </div>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-start">
            <div className="flex-1 sm:max-w-md sm:mx-0 mx-auto w-full">
              <LandingAnalyzeForm
                url={url}
                setUrl={setUrl}
                analyze={analyze}
                loading={loading}
                variant="footer"
              />
            </div>
            <div className="flex flex-col gap-3 sm:w-56 sm:shrink-0">
              <Link
                href="/pricing"
                className="flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:opacity-95"
              >
                Upgrade to Pro →
              </Link>
              <p className="text-center text-[11px] leading-relaxed text-inspect-muted sm:text-left">
                Most teams pick <span className="text-inspect-text">Pro</span> after
                their first checkout incident. Plans from{" "}
                <span className="text-violet-300/90">$79/mo</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

        <LandingFooter />
      </div>

      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F1A]/88 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="glass-panel mx-4 w-[min(100%,24rem)] max-w-sm rounded-2xl p-6 text-center sm:mx-auto sm:p-8">
              <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500/40 to-blue-500/30 p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-[0.9rem] bg-inspect-card">
                  <span className="h-8 w-8 animate-pulse rounded-full bg-gradient-to-r from-violet-400 to-blue-400 opacity-80" />
                </div>
              </div>
              <p className="font-medium text-inspect-text">
                Checking your website…
              </p>
              <p className="typing-cursor mt-3 min-h-5 text-sm text-inspect-muted">
                {analysisLines[lineIdx]}
              </p>
              <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-inspect-elevated">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: demoMode ? 2.2 : 0.9,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
