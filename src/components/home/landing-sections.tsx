"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const logos = ["Vercel", "Linear", "Notion", "Stripe", "Figma", "Shopify"];

const features = [
  {
    title: "Paste any URL—especially on mobile",
    body: "Check API failures and slow pages from your phone before you drag out your laptop.",
    icon: "📱",
    tag: "Mobile-first",
    className: "md:col-span-2",
  },
  {
    title: "AI website health check",
    body: "We tell you what’s wrong and what to do next—in plain English, not log dumps.",
    icon: "✨",
    tag: "Everyone",
    className: "",
  },
  {
    title: "See broken & slow requests clearly",
    body: "Which calls failed or dragged? One list, color-coded—tap when you want the details.",
    icon: "📡",
    tag: "Developers",
    className: "",
  },
  {
    title: "Errors that hurt visitors",
    body: "Spot the JavaScript issues that block checkout or forms—without opening DevTools.",
    icon: "🧾",
    tag: "Revenue",
    className: "md:col-span-2",
  },
];

const compareRows = [
  {
    without: "Rushing to a laptop to open DevTools or SSH",
    with: "Open WhatsBroken on your phone—see issues in seconds",
  },
  {
    without: "“Something’s broken” with no shared picture",
    with: "One link: what failed, how bad it is, and AI next steps",
  },
  {
    without: "Clients waiting while you reproduce locally",
    with: "Diagnose client sites from anywhere—perfect for agencies",
  },
];

const steps = [
  {
    step: "01",
    title: "Paste your URL",
    body: "Works in the browser on your phone—no install required for your first check.",
  },
  {
    step: "02",
    title: "Get your health report",
    body: "Failing requests, slow calls, errors, and AI summaries in one friendly view.",
  },
  {
    step: "03",
    title: "Share & scale",
    body: "Send the link to your team or client. Add Pro for monitoring, history, and alerts.",
  },
];

const faq = [
  {
    q: "Do I need to be technical?",
    a: "No. WhatsBroken is built so anyone can understand what’s wrong. Developers still get the detail when they want it.",
  },
  {
    q: "What do I get on Free vs Pro?",
    a: "Free is ideal for on-the-spot checks. Pro adds unlimited sites, longer history, alerts, and richer AI for teams and agencies.",
  },
  {
    q: "Why use this instead of my laptop?",
    a: "Because the fastest check is the one you can run from your phone between meetings—before you ever open DevTools.",
  },
];

const fadeUp = (reduce: boolean, delay = 0) => ({
  initial: reduce ? false : { opacity: 0, y: 20 },
  whileInView: reduce ? undefined : { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: {
    duration: 0.5,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

export function LandingSections() {
  const reduceMotion = useReducedMotion();
  const reduce = reduceMotion === true;

  return (
    <>
      <section
        id="social"
        className="border-y border-inspect-border/80 bg-inspect-card/25 py-10"
        aria-label="Trusted by teams"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-inspect-muted">
            Teams who can&apos;t afford downtime
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {logos.map((name) => (
              <span
                key={name}
                className="text-sm font-semibold tracking-tight text-inspect-muted/80 transition hover:text-inspect-text"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        id="compare"
        className="scroll-mt-24 border-b border-inspect-border/80 bg-gradient-to-b from-red-950/20 via-inspect-bg to-inspect-bg py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeUp(reduce)} className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400/80">
              The old way is expensive
            </p>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-inspect-text sm:text-4xl">
              Stop paying for outages with churn, refunds, and reputation
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-inspect-muted sm:text-base">
              WhatsBroken helps you catch website issues early—often from your phone—before customers do.
            </p>
          </motion.div>
          <div className="mt-14 grid gap-4 lg:grid-cols-2">
            <motion.div
              {...fadeUp(reduce, 0.05)}
              className="rounded-3xl border border-inspect-border bg-inspect-card/40 p-6 sm:p-8"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-red-400/90">
                Without WhatsBroken
              </p>
              <ul className="mt-6 space-y-4">
                {compareRows.map((row) => (
                  <li
                    key={row.without}
                    className="flex gap-3 text-sm text-inspect-muted"
                  >
                    <span className="shrink-0 text-red-400/80" aria-hidden>
                      ✕
                    </span>
                    {row.without}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              {...fadeUp(reduce, 0.1)}
              className="relative overflow-hidden rounded-3xl border border-violet-500/35 bg-gradient-to-br from-violet-500/15 via-inspect-card/90 to-blue-500/10 p-6 shadow-xl shadow-violet-500/10 sm:p-8"
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />
              <p className="relative text-xs font-bold uppercase tracking-wider text-emerald-400/90">
                With WhatsBroken
              </p>
              <ul className="relative mt-6 space-y-4">
                {compareRows.map((row) => (
                  <li
                    key={row.with}
                    className="flex gap-3 text-sm font-medium text-inspect-text"
                  >
                    <span className="shrink-0 text-emerald-400" aria-hidden>
                      ✓
                    </span>
                    {row.with}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className="relative mt-8 inline-flex rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-violet-950 transition hover:bg-violet-100"
              >
                See plans &amp; upgrade
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28"
      >
        <motion.div {...fadeUp(reduce)}>
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-violet-400/90">
            Website issue finder
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center text-3xl font-semibold tracking-tight text-inspect-text sm:text-4xl">
            Health checks that fit in your pocket
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-inspect-muted sm:text-base">
            Not a logging platform—a fast way to see what’s broken, who it affects, and what to do next.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              {...fadeUp(reduce, i * 0.06)}
              className={cn(
                "glass-panel group relative overflow-hidden rounded-2xl p-6 transition",
                "hover:-translate-y-0.5 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10",
                f.className,
              )}
            >
              <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl transition group-hover:bg-violet-500/20" />
              <div className="relative flex items-start justify-between gap-2">
                <span className="text-2xl" aria-hidden>
                  {f.icon}
                </span>
                <span className="rounded-full bg-inspect-elevated px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-300/90 ring-1 ring-violet-500/25">
                  {f.tag}
                </span>
              </div>
              <h3 className="relative mt-4 text-lg font-semibold text-inspect-text">
                {f.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-inspect-muted">
                {f.body}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section
        id="how-it-works"
        className="border-y border-inspect-border/80 bg-gradient-to-b from-inspect-card/35 to-transparent py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeUp(reduce)} className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400/90">
              How it works
            </p>
            <h2 className="mx-auto mt-3 max-w-xl text-3xl font-semibold tracking-tight text-inspect-text sm:text-4xl">
              From paste to peace of mind
            </h2>
          </motion.div>
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <motion.li
                key={s.step}
                {...fadeUp(reduce, i * 0.08)}
                className="relative rounded-2xl border border-inspect-border bg-inspect-card/50 p-6 ring-1 ring-transparent transition hover:ring-violet-500/20"
              >
                <span className="font-mono text-xs font-bold text-violet-400">
                  {s.step}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-inspect-text">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-inspect-muted">
                  {s.body}
                </p>
                {i < steps.length - 1 && (
                  <span
                    className="absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-violet-500/50 to-transparent md:block"
                    aria-hidden
                  />
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="preview"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28"
      >
        <motion.div {...fadeUp(reduce)} className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400/90">
            Product
          </p>
          <h2 className="mx-auto mt-3 max-w-xl text-3xl font-semibold tracking-tight text-inspect-text sm:text-4xl">
            Your report—readable on a phone
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-inspect-muted">
            Same screen whether you’re technical or not: what’s broken, how serious it is, and AI guidance.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp(reduce, 0.1)}
          className="relative mt-12 overflow-hidden rounded-3xl border border-inspect-border bg-inspect-card/50 shadow-2xl shadow-violet-500/15 ring-1 ring-violet-500/10"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-blue-600/10" />
          <div className="relative grid gap-6 p-6 lg:grid-cols-[1fr_1.2fr] lg:p-10">
            <div className="space-y-4">
              <div className="rounded-2xl border border-inspect-border bg-inspect-bg/80 p-4">
                <div className="flex gap-2 border-b border-inspect-border pb-3">
                  <div className="h-8 flex-1 rounded-lg bg-inspect-elevated skeleton" />
                  <div className="h-8 w-16 rounded-lg bg-emerald-500/20" />
                </div>
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-3/4 rounded skeleton" />
                  <div className="h-3 w-1/2 rounded skeleton" />
                </div>
              </div>
              <div className="rounded-2xl border border-red-500/25 bg-red-500/5 p-4">
                <p className="text-xs font-semibold text-red-300">
                  What&apos;s broken
                </p>
                <p className="mt-2 text-sm text-inspect-text">
                  2 APIs failed · Checkout blocked
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-inspect-border bg-inspect-bg/60 p-4">
              <div
                className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide"
                data-lenis-prevent
              >
                {["Summary", "Network", "AI"].map((t, j) => (
                  <span
                    key={t}
                    className={cn(
                      "shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium",
                      j === 0
                        ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-md"
                        : "bg-inspect-elevated text-inspect-muted",
                    )}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { l: "API calls", v: "47" },
                  { l: "Failed", v: "4", bad: true },
                  { l: "Avg ms", v: "186" },
                  { l: "Errors", v: "7", bad: true },
                ].map((x) => (
                  <div
                    key={x.l}
                    className="rounded-xl border border-inspect-border bg-inspect-card/80 p-3"
                  >
                    <p className="text-[10px] uppercase tracking-wide text-inspect-muted">
                      {x.l}
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-xl font-semibold tabular-nums",
                        x.bad ? "text-red-300" : "text-inspect-text",
                      )}
                    >
                      {x.v}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 rounded-xl border border-violet-500/25 bg-violet-500/5 p-3 text-xs leading-relaxed text-inspect-muted">
                <span className="font-medium text-violet-200">AI: </span>
                Payment proxy returned 502—retry with idempotency and verify auth
                upstream.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <motion.div
          {...fadeUp(reduce)}
          className="grid gap-8 rounded-3xl border border-inspect-border bg-gradient-to-br from-violet-500/15 via-inspect-card/90 to-blue-500/10 p-8 sm:grid-cols-3 sm:p-10"
        >
          {[
            { n: "10M+", l: "Requests traced (demo scale)" },
            { n: "3.2s", l: "Median time to first insight" },
            { n: "94%", l: "Teams report faster exec alignment" },
          ].map((s) => (
            <div key={s.l} className="text-center sm:text-left">
              <p className="text-3xl font-semibold tracking-tight text-inspect-text sm:text-4xl">
                {s.n}
              </p>
              <p className="mt-1 text-sm text-inspect-muted">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <motion.figure
          {...fadeUp(reduce)}
          className="glass-panel relative overflow-hidden rounded-3xl p-8 sm:p-10"
        >
          <div className="absolute right-6 top-6 flex gap-0.5 text-amber-400 text-lg">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} aria-hidden>
                ★
              </span>
            ))}
          </div>
          <blockquote className="max-w-3xl text-lg font-medium leading-relaxed text-inspect-text sm:text-xl">
            “We stopped screen-recording repro steps. WhatsBroken is the link we paste
            in Slack when checkout feels off—often from someone’s phone before eng opens a laptop.”
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold text-white">
              SK
            </div>
            <div>
              <p className="text-sm font-medium text-inspect-text">Samira Khan</p>
              <p className="text-xs text-inspect-muted">
                VP Engineering · Series B commerce
              </p>
            </div>
          </figcaption>
        </motion.figure>
      </section>

      <section
        id="faq"
        className="mx-auto max-w-3xl scroll-mt-24 px-4 pb-8 sm:px-6"
      >
        <motion.div {...fadeUp(reduce)} className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-inspect-muted">
            FAQ
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-inspect-text sm:text-3xl">
            Questions before you upgrade
          </h2>
        </motion.div>
        <ul className="mt-10 space-y-3">
          {faq.map((item, i) => (
            <motion.li
              key={item.q}
              {...fadeUp(reduce, i * 0.05)}
              className="rounded-2xl border border-inspect-border bg-inspect-card/40 p-5"
            >
              <p className="font-semibold text-inspect-text">{item.q}</p>
              <p className="mt-2 text-sm leading-relaxed text-inspect-muted">
                {item.a}
              </p>
            </motion.li>
          ))}
        </ul>
      </section>

      <section
        id="pricing-teaser"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-20 sm:px-6"
      >
        <motion.div {...fadeUp(reduce)} className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400/90">
            Simple upgrade path
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-inspect-text sm:text-4xl">
            Start free. Scale when WhatsBroken saves you another fire drill.
          </h2>
        </motion.div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <motion.div
            {...fadeUp(reduce, 0.05)}
            className="rounded-2xl border border-inspect-border bg-inspect-card/40 p-6"
          >
            <p className="text-sm font-semibold text-inspect-text">Free</p>
            <p className="mt-2 text-3xl font-bold text-inspect-text">$0</p>
            <p className="mt-2 text-sm text-inspect-muted">
              Prove value on one project. Perfect for your first scan.
            </p>
            <a
              href="#analyze"
              className="mt-6 inline-block w-full rounded-xl border border-inspect-border py-2.5 text-center text-sm font-semibold text-inspect-text transition hover:bg-inspect-elevated"
            >
              Run free scan
            </a>
          </motion.div>
          <motion.div
            {...fadeUp(reduce, 0.1)}
            className="relative rounded-2xl border-2 border-violet-500/50 bg-gradient-to-b from-violet-500/15 to-inspect-card/90 p-6 shadow-xl shadow-violet-500/15 md:scale-[1.02]"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
              Best for teams
            </span>
            <p className="text-sm font-semibold text-violet-200">Pro</p>
            <p className="mt-2 text-3xl font-bold text-inspect-text">
              $79<span className="text-base font-normal text-inspect-muted">/mo</span>
            </p>
            <p className="mt-2 text-sm text-inspect-muted">
              Unlimited projects, 1-year history, SSO, priority AI—what serious teams
              pick after their first incident.
            </p>
            <Link
              href="/pricing"
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:opacity-95"
            >
              Get Pro now
            </Link>
          </motion.div>
          <motion.div
            {...fadeUp(reduce, 0.15)}
            className="rounded-2xl border border-inspect-border bg-inspect-card/40 p-6"
          >
            <p className="text-sm font-semibold text-inspect-text">Enterprise</p>
            <p className="mt-2 text-3xl font-bold text-inspect-text">Custom</p>
            <p className="mt-2 text-sm text-inspect-muted">
              VPC, DPA, SLA, and a partner for regulated or global rollouts.
            </p>
            <Link
              href="/pricing"
              className="mt-6 inline-block w-full rounded-xl border border-inspect-border py-2.5 text-center text-sm font-semibold text-inspect-text transition hover:bg-inspect-elevated"
            >
              Talk to sales
            </Link>
          </motion.div>
        </div>
        <p className="mt-8 text-center text-xs text-inspect-muted">
          <span className="text-emerald-400/90">✓</span> 14-day satisfaction on paid
          plans (illustrative) · <span className="text-emerald-400/90">✓</span> Cancel
          anytime
        </p>
      </section>
    </>
  );
}
