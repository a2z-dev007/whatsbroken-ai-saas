import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="inspect-gradient-bg flex min-h-dvh flex-col items-center justify-center px-6 pb-24 text-center">
      <div className="glass-panel max-w-md rounded-3xl p-8">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-inspect-elevated text-3xl">
          📡
        </div>
        <h1 className="text-xl font-semibold text-inspect-text">
          You&apos;re offline
        </h1>
        <p className="mt-2 text-sm text-inspect-muted">
          This is a simulated offline screen for the PWA prototype. Reconnect
          to resume checks—WhatsBroken will sync automatically (prototype).
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25"
        >
          Back to Scan
        </Link>
      </div>
    </div>
  );
}
