"use client";

import { useSearchParams } from "next/navigation";
import { DebugDashboard } from "@/components/debug/debug-dashboard";

export function DebugClient() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") ?? "";
  return <DebugDashboard url={url} />;
}
