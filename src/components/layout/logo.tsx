import Link from "next/link";
import { cn } from "@/lib/cn";
import { BRAND_NAME } from "@/lib/brand";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 font-semibold tracking-tight text-inspect-text",
        className,
      )}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold text-white shadow-lg shadow-violet-500/25">
        W
      </span>
      <span className="min-w-0 text-sm font-semibold leading-tight sm:text-base">
        {BRAND_NAME}
      </span>
    </Link>
  );
}
