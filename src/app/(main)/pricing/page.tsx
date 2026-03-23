"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { pricingPlans } from "@/lib/mock-data";
import { cn } from "@/lib/cn";
import Link from "next/link";

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="inspect-gradient-bg min-h-dvh px-4 pb-24 pt-6 lg:px-8">
      <header className="mx-auto mb-8 max-w-3xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-inspect-text">
          Simple pricing
        </h1>
        <p className="mt-2 text-sm text-inspect-muted">
          Prototype plans—numbers are illustrative for investor conversations.
        </p>
        <div className="mt-6 inline-flex rounded-full border border-inspect-border bg-inspect-card/60 p-1">
          <button
            type="button"
            onClick={() => setYearly(false)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition",
              !yearly
                ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-md"
                : "text-inspect-muted hover:text-inspect-text",
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setYearly(true)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition",
              yearly
                ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-md"
                : "text-inspect-muted hover:text-inspect-text",
            )}
          >
            Yearly
            <span className="ml-1 text-[10px] font-normal text-emerald-300/90">
              Save ~17%
            </span>
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-4">
        {pricingPlans.map((plan, i) => {
          const price =
            plan.monthly === null
              ? "Custom"
              : plan.monthly === 0
                ? "$0"
                : yearly
                  ? `$${plan.yearly}/yr`
                  : `$${plan.monthly}/mo`;
          return (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={cn(
                "glass-panel flex flex-col rounded-2xl p-5",
                plan.highlighted &&
                  "ring-2 ring-violet-500/50 shadow-xl shadow-violet-500/10 md:scale-[1.02]",
              )}
            >
              {plan.highlighted && (
                <span className="mb-2 w-fit rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-200">
                  Most popular
                </span>
              )}
              <h2 className="text-lg font-semibold text-inspect-text">
                {plan.name}
              </h2>
              <p className="mt-1 text-sm text-inspect-muted">{plan.description}</p>
              <p className="mt-4 text-3xl font-semibold text-inspect-text">
                {price}
              </p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-inspect-muted">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-emerald-400">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/"
                className={cn(
                  "mt-6 block rounded-xl py-3 text-center text-sm font-semibold transition",
                  plan.highlighted
                    ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-500/25 hover:opacity-95"
                    : "border border-inspect-border text-inspect-text hover:bg-inspect-elevated",
                )}
              >
                {plan.id === "enterprise" ? "Contact sales" : "Start trial"}
              </Link>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
