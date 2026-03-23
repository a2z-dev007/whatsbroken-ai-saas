"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const items = [
  { href: "/", label: "Scan", icon: RadarIcon },
  { href: "/debug", label: "Report", icon: BugIcon },
  { href: "/projects", label: "Projects", icon: FolderIcon },
  { href: "/analytics", label: "Analytics", icon: ChartIcon },
  { href: "/settings", label: "Settings", icon: GearIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="glass-panel fixed bottom-0 left-0 right-0 z-40 border-t border-inspect-border pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] pt-1 shadow-[0_-8px_32px_rgba(0,0,0,0.35)] lg:hidden"
      aria-label="Primary"
    >
      <ul
        className="scrollbar-hide flex snap-x snap-mandatory gap-0.5 overflow-x-auto px-1.5 py-1 sm:gap-1 sm:px-2 sm:py-2"
        data-lenis-prevent
      >
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href} className="min-w-[3.75rem] flex-1 snap-center sm:min-w-[4.25rem]">
              <Link
                href={href}
                className={cn(
                  "touch-manipulation flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-xl px-1.5 py-2 text-[10px] font-medium transition-colors active:opacity-80",
                  active
                    ? "bg-violet-500/10 text-violet-400"
                    : "text-inspect-muted hover:text-inspect-text",
                )}
              >
                <Icon active={active} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function RadarIcon({ active }: { active?: boolean }) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      className={cn(active && "drop-shadow-[0_0_8px_rgba(167,139,250,0.6)]")}
      aria-hidden
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity={0.35}
      />
      <path
        d="M12 3v3M12 18v3M3 12h3M18 12h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.5}
      />
      <path
        d="M12 12l6-4"
        stroke="url(#g1)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <defs>
        <linearGradient id="g1" x1="12" y1="12" x2="18" y2="8">
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BugIcon({ active }: { active?: boolean }) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={cn(active && "text-violet-400")}
      aria-hidden
    >
      <path d="M8 10h8M10 14h4M12 4v2M9 4.5a5 5 0 016 0M6 8l-2 1M18 8l2 1M6 16l-2-1M18 16l2-1M12 22v-3" />
      <ellipse cx="12" cy="12" rx="5" ry="7" />
    </svg>
  );
}

function FolderIcon({ active }: { active?: boolean }) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={cn(active && "text-violet-400")}
      aria-hidden
    >
      <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    </svg>
  );
}

function ChartIcon({ active }: { active?: boolean }) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={cn(active && "text-violet-400")}
      aria-hidden
    >
      <path d="M4 19V5M8 19v-6M12 19V9M16 19v-4M20 19v-9" strokeLinecap="round" />
    </svg>
  );
}

function GearIcon({ active }: { active?: boolean }) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={cn(active && "text-violet-400")}
      aria-hidden
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}
