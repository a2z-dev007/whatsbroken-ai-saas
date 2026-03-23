import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { BRAND_NAME, BRAND_TAGLINE, SUPPORT_EMAIL } from "@/lib/brand";

const productLinks = [
  { href: "/debug", label: "Site report" },
  { href: "/projects", label: "Projects" },
  { href: "/analytics", label: "Analytics" },
  { href: "/settings", label: "SDK & install" },
  { href: "/pricing", label: "Pricing" },
] as const;

const resourceLinks = [
  { href: "#analyze", label: "Free URL scan" },
  { href: "#features", label: "Features" },
  { href: "#compare", label: `Why ${BRAND_NAME}` },
  { href: "#faq", label: "FAQ" },
  { href: "/offline", label: "Offline PWA demo" },
] as const;

const legalLinks = [
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
  { href: "#", label: "Security" },
] as const;

function SocialLinks() {
  const itemClass =
    "flex h-10 w-10 items-center justify-center rounded-xl border border-inspect-border bg-inspect-card/50 text-inspect-muted transition hover:border-violet-500/35 hover:bg-inspect-elevated hover:text-inspect-text";

  return (
    <div className="flex gap-2 pt-2">
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className={itemClass}
        aria-label="X (Twitter)"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className={itemClass}
        aria-label="GitHub"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
          />
        </svg>
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className={itemClass}
        aria-label="LinkedIn"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
    </div>
  );
}

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-inspect-muted">
        {title}
      </p>
      <ul className="mt-4 space-y-3">
        {links.map(({ href, label }) => (
          <li key={href + label}>
            <Link
              href={href}
              className="text-sm text-inspect-muted transition hover:text-inspect-text"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-0 border-t border-inspect-border bg-gradient-to-b from-inspect-card/30 via-inspect-bg to-inspect-bg">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/45 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="glass-panel relative overflow-hidden rounded-2xl border border-inspect-border p-6 sm:p-8">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400/90">
                Ready to ship safer?
              </p>
              <h2 className="mt-2 max-w-md text-xl font-semibold tracking-tight text-inspect-text sm:text-2xl">
                Turn every incident into a link your whole org can understand.
              </h2>
              <p className="mt-2 max-w-lg text-sm text-inspect-muted">
                Start with a free check from any device—then scale on Pro when {BRAND_NAME}{" "}
                is how your team spots issues before opening a laptop.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="#analyze"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:opacity-95"
              >
                Run free scan
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-xl border border-inspect-border bg-inspect-card/60 px-6 py-3 text-sm font-semibold text-inspect-text transition hover:border-violet-500/35 hover:bg-inspect-elevated"
              >
                Compare plans
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-inspect-muted">
              {BRAND_NAME}: {BRAND_TAGLINE} Website issue finder with AI—check from
              your phone, share one link with your team. Prototype UI; no live backend.
            </p>
            <SocialLinks />
            <p className="mt-6 text-xs text-inspect-muted">
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50 opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                All systems operational (demo)
              </span>
            </p>
          </div>

          <div className="grid gap-10 sm:col-span-2 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            <FooterLinkColumn title="Product" links={productLinks} />
            <FooterLinkColumn title="Resources" links={resourceLinks} />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-inspect-muted">
                Company
              </p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="text-sm text-inspect-muted transition hover:text-inspect-text"
                  >
                    {SUPPORT_EMAIL}
                  </a>
                </li>
                <li>
                  <span className="text-sm text-inspect-muted">
                    Built for investor &amp; customer demos
                  </span>
                </li>
              </ul>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.15em] text-inspect-muted">
                Legal
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                {legalLinks.map(({ href, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-inspect-muted transition hover:text-inspect-text"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-inspect-border/80 bg-inspect-card/20">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-6 sm:flex-row sm:justify-between sm:px-6">
          <p className="text-center text-xs text-inspect-muted sm:text-left">
            © {year} {BRAND_NAME}. All rights reserved. Prototype UI—no data collection.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-inspect-muted">
            <Link
              href="/pricing"
              className="font-medium text-violet-300/90 transition hover:text-violet-200"
            >
              Upgrade to Pro
            </Link>
            <span className="hidden text-inspect-border sm:inline" aria-hidden>
              |
            </span>
            <Link href="#analyze" className="transition hover:text-inspect-text">
              Back to top
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
