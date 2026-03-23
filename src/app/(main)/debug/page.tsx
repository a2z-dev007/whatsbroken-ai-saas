import { Suspense } from "react";
import { DebugClient } from "./debug-client";
import { DebugSkeleton } from "@/components/debug/debug-skeleton";

export default function DebugPage() {
  return (
    <Suspense fallback={<DebugSkeleton />}>
      <DebugClient />
    </Suspense>
  );
}
