import Link from "next/link";
import { cn } from "@/lib/cn";
import { BRAND_NAME } from "@/lib/brand";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      title={BRAND_NAME}
      className={cn(
        "flex min-w-0 max-w-full items-center gap-1.5 font-semibold tracking-tight text-inspect-text sm:gap-2",
        className,
      )}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold text-white shadow-lg shadow-violet-500/25 sm:h-8 sm:w-8">
        W
      </span>
      <span className="min-w-0 truncate text-[0.8125rem] font-semibold leading-tight sm:text-sm md:text-base">
        {BRAND_NAME}
      </span>
    </Link>
  );
}
