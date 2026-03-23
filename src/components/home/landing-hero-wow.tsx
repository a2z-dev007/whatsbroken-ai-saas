"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { LandingAnalyzeForm } from "./landing-analyze-form";
import { cn } from "@/lib/cn";
import {
  BRAND_MOBILE_HOOK,
  BRAND_NAME,
  BRAND_POSITIONING,
  BRAND_TAGLINE,
} from "@/lib/brand";
import Link from "next/link";

const rotatingClaims = [
  "from your phone—no laptop or DevTools.",
  "so developers see API failures instantly—even off their desk.",
  "in plain language anyone on the team can understand.",
  "perfect when you’re diagnosing a client site between meetings.",
];

const solutionPillars = [
  {
    title: "Phone-first issue finder",
    subtitle:
      "Paste a URL on mobile and get a clear health readout—no need to open your laptop.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    ),
    accent: "from-violet-500/30 to-fuchsia-500/20",
  },
  {
    title: "AI health explanations",
    subtitle:
      "We tell you what’s wrong and what to do next—not raw logs only engineers love.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    accent: "from-blue-500/30 to-cyan-500/20",
  },
  {
    title: "Failing requests, plain & simple",
    subtitle:
      "See which calls broke or slowed down—tap for details when you need them.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
      </svg>
    ),
    accent: "from-emerald-500/25 to-teal-500/15",
  },
  {
    title: "Agencies & teams",
    subtitle:
      "Diagnose client sites in seconds—share one link instead of a screen recording.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    accent: "from-amber-500/25 to-orange-500/15",
  },
];

const tickerItems = [
  "Checkout 500 traced to auth service",
  "P95 dropped 40% after one AI insight",
  "PM shared one link—exec signed off",
  "Silent JS error was costing signups",
];

type FormProps = {
  url: string;
  setUrl: (v: string) => void;
  analyze: () => void;
  loading: boolean;
};

export function LandingHeroWow({
  url,
  setUrl,
  analyze,
  loading,
}: FormProps) {
  const reduce = useReducedMotion() === true;
  const [claimIdx, setClaimIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setClaimIdx((i) => (i + 1) % rotatingClaims.length),
      3200,
    );
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section
      id="analyze"
      className="hero-grid-bg relative scroll-mt-[calc(5.5rem+env(safe-area-inset-top,0px))] overflow-x-hidden px-3 pb-14 pt-8 sm:scroll-mt-32 sm:px-6 sm:pb-36 sm:pt-16"
    >
      <div className="hero-aurora pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 top-40 h-[360px] w-[360px] rounded-full bg-blue-600/15 blur-[90px]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-10">
          <div className="min-w-0">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-4 flex flex-col gap-2 sm:mb-5 sm:flex-row sm:flex-wrap sm:items-center">
                <span className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1.5 text-[11px] font-semibold leading-snug text-emerald-200/95 sm:px-3 sm:text-xs">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="min-w-0">{BRAND_POSITIONING}</span>
                </span>
                <span className="w-full rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-1.5 text-[11px] font-medium leading-snug text-violet-200/90 backdrop-blur sm:w-auto sm:px-3 sm:text-xs">
                  {BRAND_MOBILE_HOOK}
                </span>
              </div>

              <h1 className="w-full text-balance text-[1.625rem] font-semibold leading-[1.2] tracking-tight text-inspect-text min-[400px]:text-[1.75rem] sm:text-4xl sm:leading-[1.15] md:text-5xl lg:text-[2.65rem] lg:leading-[1.1]">
                <span className="bg-gradient-to-br from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  {BRAND_TAGLINE}
                </span>
              </h1>

              <p className="mt-3 max-w-xl text-pretty text-[0.9375rem] font-medium leading-relaxed text-inspect-text/95 sm:mt-4 sm:text-lg">
                Paste your URL. We&apos;ll tell you what&apos;s wrong—no coding needed.
              </p>

              <p className="mt-2 min-h-[3.25rem] max-w-xl text-pretty text-sm leading-relaxed text-inspect-muted sm:mt-3 sm:min-h-[3.5rem] sm:text-base">
                {BRAND_NAME} is a website issue finder—not another DevTools tab. It explains{" "}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={claimIdx}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.35 }}
                    className="font-medium text-violet-200/95"
                  >
                    {rotatingClaims[claimIdx]}
                  </motion.span>
                </AnimatePresence>
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="flex gap-0.5 text-amber-400" aria-hidden>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-sm text-inspect-muted">
                  <span className="font-semibold text-inspect-text">4.9/5</span>{" "}
                  from teams who upgraded to{" "}
                  <span className="text-violet-300/90">Pro</span>
                </p>
              </div>

              <div className="hero-cta-glow relative mt-6 max-w-full sm:mt-10">
                <LandingAnalyzeForm
                  url={url}
                  setUrl={setUrl}
                  analyze={analyze}
                  loading={loading}
                  variant="hero"
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                  <Link
                    href="/pricing"
                    className="touch-manipulation inline-flex min-h-11 items-center justify-center rounded-xl border border-violet-500/40 bg-violet-500/10 px-5 py-2.5 text-sm font-semibold text-violet-100 transition active:scale-[0.99] hover:border-violet-400/50 hover:bg-violet-500/20"
                  >
                    View Pro plans
                  </Link>
                  <a
                    href="#solutions"
                    className="touch-manipulation inline-flex min-h-11 items-center justify-center text-sm font-medium text-inspect-muted underline-offset-4 transition hover:text-inspect-text hover:underline"
                  >
                    Explore solutions
                  </a>
                </div>
                <p className="text-[11px] leading-relaxed text-inspect-muted sm:text-xs">
                  <span className="text-emerald-400/90">✓</span> Free scan ·{" "}
                  <span className="text-emerald-400/90">✓</span> No card ·{" "}
                  <Link href="/pricing" className="text-violet-300/90 hover:underline">
                    Pro from $79/mo
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>

          <div className="relative min-w-0 lg:min-h-[520px]">
            <HeroSolutionMarquee reduce={reduce} />
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:mt-0"
            >
              <div className="overflow-hidden rounded-2xl border border-inspect-border bg-inspect-card/40 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-2 border-b border-inspect-border bg-inspect-elevated/50 px-4 py-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-inspect-muted">
                    Live outcomes
                  </span>
                  <span className="ml-auto flex items-center gap-1.5 text-[10px] text-emerald-400/90">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Updating
                  </span>
                </div>
                <div className="hero-ticker-mask py-2" data-lenis-prevent>
                  <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={reduce ? undefined : { x: [0, -800] }}
                    transition={{
                      x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 28,
                        ease: "linear",
                      },
                    }}
                  >
                    {[...tickerItems, ...tickerItems, ...tickerItems].map(
                      (item, i) => (
                        <span
                          key={`${item}-${i}`}
                          className="text-xs font-medium text-inspect-muted"
                        >
                          <span className="text-violet-400/90">→</span> {item}
                        </span>
                      ),
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div
          id="solutions"
          className="mt-12 scroll-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] sm:mt-24 sm:scroll-mt-28"
        >
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-violet-400/80">
            Main solutions
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center text-2xl font-semibold tracking-tight text-inspect-text sm:text-3xl">
            Everything you need to find issues without a laptop
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-inspect-muted">
            Built for developers, PMs, and agencies—one link that explains what&apos;s
            wrong on your site.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solutionPillars.map((p, i) => (
              <motion.li
                key={p.title}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-inspect-border bg-inspect-card/50 p-5 transition",
                  "hover:border-violet-500/35 hover:shadow-lg hover:shadow-violet-500/10",
                )}
              >
                <div
                  className={cn(
                    "mb-4 inline-flex rounded-xl bg-gradient-to-br p-2.5 text-violet-200 ring-1 ring-white/10",
                    p.accent,
                  )}
                >
                  {p.icon}
                </div>
                <h3 className="font-semibold text-inspect-text">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-inspect-muted">
                  {p.subtitle}
                </p>
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl transition group-hover:bg-violet-500/20" />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

type MarqueeCard = {
  id: string;
  kind: "api" | "ai" | "slow" | "js" | "solution";
  method?: string;
  path?: string;
  status?: number;
  statusTone?: "red" | "amber" | "green";
  detail?: string;
  /** Tailwind width class for progress bar */
  barWidth?: "w-1/2" | "w-2/3" | "w-3/4" | "w-[85%]";
  aiTitle?: string;
  aiBody?: string;
  aiMeta?: string;
  aiImpact?: string;
  solutionLabel?: string;
  solutionBody?: string;
};

const marqueeCards: MarqueeCard[] = [
  {
    id: "m1",
    kind: "api",
    method: "POST",
    path: "/api/checkout",
    status: 502,
    statusTone: "red",
    detail: "Upstream timeout · 2.1s · blocking payment",
    barWidth: "w-2/3",
  },
  {
    id: "m2",
    kind: "ai",
    aiTitle: "AI insight",
    aiBody:
      "Payment proxy is failing over—retry with idempotency keys and verify region routing.",
    aiMeta: "Suggested owner: Platform · Est. users affected: ~18%",
    aiImpact: "High impact",
  },
  {
    id: "m3",
    kind: "slow",
    method: "GET",
    path: "/api/products",
    status: 200,
    statusTone: "amber",
    detail: "Slow response · 3.2s TTFB · hurting LCP",
    barWidth: "w-[85%]",
  },
  {
    id: "m4",
    kind: "ai",
    aiTitle: "AI insight",
    aiBody:
      "Cart lines came back undefined—default to [] before .map in CartSummary to stop checkout crashes.",
    aiMeta: "Linked to 128 similar errors · checkout step 2",
    aiImpact: "Critical",
  },
  {
    id: "m5",
    kind: "js",
  },
  {
    id: "m6",
    kind: "api",
    method: "POST",
    path: "/api/login",
    status: 500,
    statusTone: "red",
    detail: "Auth service error · sessions may be invalid",
    barWidth: "w-1/2",
  },
  {
    id: "m7",
    kind: "solution",
    solutionLabel: "URL scan",
    solutionBody: "Every failing endpoint surfaced in one paste—no local repro.",
  },
  {
    id: "m8",
    kind: "ai",
    aiTitle: "AI insight",
    aiBody:
      "Deprecated getCart API still in bundle—migrate to getCartV2 to remove console warnings and 404s.",
    aiMeta: "Quick win · low risk refactor",
    aiImpact: "Medium",
  },
  {
    id: "m9",
    kind: "solution",
    solutionLabel: "Network truth",
    solutionBody: "Headers, payloads, and JSON responses—tap any row for the full request.",
  },
];

function HeroSolutionMarquee({ reduce }: { reduce: boolean }) {
  const track = [...marqueeCards, ...marqueeCards];

  return (
    <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto lg:max-w-none">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/20 via-transparent to-blue-600/15 blur-2xl" />

      <motion.div
        className="relative"
        initial={reduce ? false : { opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-inspect-muted lg:text-left">
          Solution highlights
        </p>

        <div
          className="hero-marquee-viewport relative mx-auto h-[min(36vh,280px)] max-w-full overflow-hidden sm:h-[min(44vh,380px)] md:h-[420px] lg:h-[460px]"
          role="region"
          aria-label="Scrolling examples of API issues, AI insights, and solution highlights"
        >
          <div
            className={cn(
              "flex flex-col gap-4 will-change-transform",
              !reduce && "hero-marquee-track-animate",
            )}
          >
            {track.map((card, i) => (
              <MarqueeCardItem key={`${card.id}-${i}`} card={card} reduce={reduce} />
            ))}
          </div>
        </div>

        <p className="mt-4 rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-4 py-2.5 text-center text-xs font-medium leading-snug text-emerald-200/90">
          Live cards loop so stakeholders see real outcomes—then{" "}
          <Link
            href="/pricing"
            className="underline decoration-emerald-400/50 underline-offset-2 hover:text-white"
          >
            unlock Pro
          </Link>{" "}
          for always-on monitoring
        </p>
      </motion.div>
    </div>
  );
}

function MarqueeCardItem({
  card,
  reduce,
}: {
  card: MarqueeCard;
  reduce: boolean;
}) {
  if (card.kind === "api") {
    const tone =
      card.statusTone === "amber"
        ? "bg-amber-500/20 text-amber-200"
        : card.statusTone === "green"
          ? "bg-emerald-500/20 text-emerald-200"
          : "bg-red-500/20 text-red-300";
    return (
      <div className="shrink-0 rounded-2xl border border-inspect-border bg-inspect-card/90 p-4 shadow-lg backdrop-blur-xl">
        <div className="flex flex-wrap items-start justify-between gap-2 border-b border-inspect-border pb-3">
          <span className="min-w-0 break-all font-mono text-[11px] text-inspect-muted">
            <span className="text-inspect-text/80">{card.method}</span>{" "}
            {card.path}
          </span>
          <span
            className={cn(
              "rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold",
              tone,
            )}
          >
            {card.status}
          </span>
        </div>
        <p className="mt-3 text-xs text-inspect-muted">{card.detail}</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-inspect-elevated">
          <motion.div
            className={cn(
              "h-full rounded-full",
              card.statusTone === "amber"
                ? "bg-gradient-to-r from-amber-500 to-yellow-400"
                : "bg-gradient-to-r from-red-500 to-amber-500",
              card.barWidth ?? "w-2/3",
            )}
            animate={reduce ? undefined : { opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    );
  }

  if (card.kind === "ai") {
    const impact =
      card.aiImpact === "Critical"
        ? "bg-red-500/20 text-red-200"
        : card.aiImpact === "Medium"
          ? "bg-amber-500/20 text-amber-200"
          : "bg-emerald-500/20 text-emerald-300";
    return (
      <div className="shrink-0 rounded-2xl border border-violet-500/35 bg-gradient-to-br from-violet-500/15 via-inspect-card/95 to-blue-500/10 p-4 shadow-lg backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden>
            ✨
          </span>
          <span className="text-xs font-bold uppercase tracking-wide text-violet-300">
            {card.aiTitle}
          </span>
          {card.aiImpact && (
            <span
              className={cn(
                "ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold",
                impact,
              )}
            >
              {card.aiImpact}
            </span>
          )}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-inspect-text">
          {card.aiBody}
        </p>
        {card.aiMeta && (
          <p className="mt-2 text-xs text-inspect-muted">{card.aiMeta}</p>
        )}
      </div>
    );
  }

  if (card.kind === "slow") {
    return (
      <div className="shrink-0 rounded-2xl border border-inspect-border bg-inspect-card/90 p-4 shadow-lg backdrop-blur-xl">
        <div className="flex flex-wrap items-start justify-between gap-2 border-b border-inspect-border pb-3">
          <span className="min-w-0 break-all font-mono text-[11px] text-inspect-muted">
            <span className="text-inspect-text/80">{card.method}</span>{" "}
            {card.path}
          </span>
          <span className="rounded-md bg-amber-500/20 px-2 py-0.5 font-mono text-[11px] font-semibold text-amber-200">
            {card.status} slow
          </span>
        </div>
        <p className="mt-3 text-xs text-inspect-muted">{card.detail}</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-inspect-elevated">
          <motion.div
            className={cn(
              "h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400",
              card.barWidth ?? "w-[85%]",
            )}
            animate={reduce ? undefined : { opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    );
  }

  if (card.kind === "js") {
    return (
      <div className="shrink-0 rounded-2xl border border-orange-500/25 bg-orange-500/5 p-4 shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wide text-orange-300">
            Console
          </span>
          <span className="rounded-md bg-red-500/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-red-300">
            ERROR
          </span>
        </div>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-inspect-text">
          Cannot read properties of undefined (reading &apos;map&apos;)
        </p>
        <p className="mt-2 text-[10px] text-inspect-muted">app.js:42 · CartSummary</p>
      </div>
    );
  }

  return (
    <div className="shrink-0 rounded-2xl border border-blue-500/25 bg-gradient-to-r from-blue-500/10 to-violet-500/10 p-4 shadow-md backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-sm">
          ⚡
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-blue-300">
            {card.solutionLabel}
          </p>
          <p className="mt-1 text-sm text-inspect-muted">{card.solutionBody}</p>
        </div>
      </div>
    </div>
  );
}
