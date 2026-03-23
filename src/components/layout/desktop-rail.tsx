"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Logo } from "./logo";

const links = [
  { href: "/", label: "Scan" },
  { href: "/debug", label: "Report" },
  { href: "/projects", label: "Projects" },
  { href: "/analytics", label: "Analytics" },
  { href: "/pricing", label: "Pricing" },
  { href: "/settings", label: "Settings" },
];

export function DesktopRail() {
  const pathname = usePathname();

  return (
    <aside className="glass-panel fixed bottom-0 left-0 top-0 z-30 hidden w-56 flex-col border-r border-inspect-border lg:flex">
      <div className="border-b border-inspect-border p-4">
        <Logo />
        <p className="mt-2 text-xs text-inspect-muted">
          Website health on your phone—in seconds
        </p>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-3" aria-label="Main">
        {links.map(({ href, label }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-gradient-to-r from-violet-500/20 to-blue-500/15 text-inspect-text shadow-sm"
                  : "text-inspect-muted hover:bg-inspect-elevated hover:text-inspect-text",
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-inspect-border p-3">
        <Link
          href="/offline"
          className="block rounded-xl px-3 py-2 text-xs text-inspect-muted hover:bg-inspect-elevated hover:text-inspect-text"
        >
          Offline demo
        </Link>
      </div>
    </aside>
  );
}
