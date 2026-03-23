"use client";

import "@/types/pwa-install-globals";
import { useCallback, useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { BRAND_NAME, BRAND_MOBILE_HOOK } from "@/lib/brand";

const STORAGE_DISMISS = "whatsbroken-install-dismissed-v2";
const STORAGE_SNOOZE = "whatsbroken-install-snooze-until-v2";
const SNOOZE_MS = 1000 * 60 * 60 * 24 * 5;

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const nav = window.navigator as Navigator & { standalone?: boolean };
    if (nav.standalone === true) return true;
    const mm = window.matchMedia?.("(display-mode: standalone)");
    if (mm?.matches) return true;
  } catch {
    /* ignore */
  }
  return false;
}

function isIosLike(): boolean {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent;
  const iOS = /iPad|iPhone|iPod/.test(ua);
  const iPadOS =
    window.navigator.platform === "MacIntel" &&
    window.navigator.maxTouchPoints > 1;
  return iOS || iPadOS;
}

function isAndroidUa(): boolean {
  if (typeof window === "undefined") return false;
  return /Android/i.test(window.navigator.userAgent);
}

function readDismissed(): boolean {
  try {
    return localStorage.getItem(STORAGE_DISMISS) === "1";
  } catch {
    return false;
  }
}

function readSnoozed(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_SNOOZE);
    if (!raw) return false;
    return Date.now() < parseInt(raw, 10);
  } catch {
    return false;
  }
}

/** Fixed bottom PWA install bar; `Install` calls the native prompt when the browser provides it. */
export function InstallPrompt() {
  const pathname = usePathname();
  const reduce = useReducedMotion() === true;
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(
    null,
  );
  const [installing, setInstalling] = useState(false);

  const liftAboveTabBar = pathname !== "/";

  const refreshVisibility = useCallback(() => {
    if (typeof window === "undefined") return;
    if (isStandalone() || readDismissed() || readSnoozed()) {
      setShow(false);
      return;
    }
    setShow(true);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    refreshVisibility();
  }, [mounted, refreshVisibility]);

  useEffect(() => {
    if (!mounted) return;

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setExpanded(false);
    };

    const onInstalled = () => {
      setDeferred(null);
      setShow(false);
      setExpanded(false);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, [mounted]);

  const snooze = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_SNOOZE, String(Date.now() + SNOOZE_MS));
    } catch {
      /* ignore */
    }
    setShow(false);
    setExpanded(false);
  }, []);

  const dismissForever = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_DISMISS, "1");
    } catch {
      /* ignore */
    }
    setShow(false);
    setExpanded(false);
  }, []);

  const runInstall = useCallback(async () => {
    if (!deferred) return;
    setInstalling(true);
    try {
      await deferred.prompt();
      await deferred.userChoice;
    } catch {
      /* user dismissed */
    } finally {
      setDeferred(null);
      setInstalling(false);
    }
  }, [deferred]);

  const onPrimaryClick = useCallback(() => {
    if (deferred) {
      void runInstall();
      return;
    }
    setExpanded((e) => !e);
  }, [deferred, runInstall]);

  if (!mounted) return null;

  const ios = isIosLike();
  const android = isAndroidUa();
  const canNativeInstall = deferred !== null;

  const primaryLabel = (() => {
    if (installing) return "Installing…";
    if (canNativeInstall) return "Install";
    if (ios) return "How to add";
    return "How to install";
  })();

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="pwa-install-bottom"
          role="region"
          aria-label={`Install ${BRAND_NAME}`}
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "pointer-events-none fixed inset-x-0 z-50 flex justify-center px-3",
            liftAboveTabBar
              ? "max-lg:bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] lg:bottom-0"
              : "bottom-0",
            "pb-[max(0.65rem,env(safe-area-inset-bottom,0px))] pt-2",
          )}
        >
          <div className="pointer-events-auto w-full max-w-lg">
            <AnimatePresence>
              {expanded && !canNativeInstall ? (
                <motion.div
                  key="install-help"
                  initial={reduce ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={reduce ? undefined : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mb-2 overflow-hidden rounded-2xl border border-inspect-border/90 bg-inspect-card/95 p-3 text-sm text-inspect-muted shadow-xl backdrop-blur-xl"
                >
                  {ios ? (
                    <ol className="space-y-2">
                      <li>
                        1. Tap <strong className="text-inspect-text">Share</strong>{" "}
                        in Safari’s toolbar.
                      </li>
                      <li>
                        2. Choose{" "}
                        <strong className="text-inspect-text">
                          Add to Home Screen
                        </strong>{" "}
                        → <strong className="text-inspect-text">Add</strong>.
                      </li>
                    </ol>
                  ) : android ? (
                    <p>
                      In Chrome: tap <strong className="text-inspect-text">⋮</strong>{" "}
                      →{" "}
                      <strong className="text-inspect-text">Install app</strong> or{" "}
                      <strong className="text-inspect-text">
                        Add to Home screen
                      </strong>
                      . Samsung Internet / Edge: same from the menu.
                    </p>
                  ) : (
                    <p>
                      Use the <strong className="text-inspect-text">install</strong>{" "}
                      icon in the address bar if shown, or the browser menu →{" "}
                      <strong className="text-inspect-text">Install app</strong>. Chrome
                      may offer install after you interact with the site briefly.
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setExpanded(false)}
                    className="mt-2 text-xs font-medium text-violet-400/90 hover:text-violet-300"
                  >
                    Close details
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div
              className={cn(
                "flex items-center gap-3 rounded-2xl border border-white/10 p-3 shadow-[0_-12px_48px_-12px_rgba(0,0,0,0.55)]",
                "bg-inspect-bg/90 backdrop-blur-2xl backdrop-saturate-150 ring-1 ring-inset ring-white/[0.06]",
              )}
            >
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/35 to-blue-500/25 opacity-90 blur-sm" />
                <Image
                  src="/icon.svg"
                  alt=""
                  width={44}
                  height={44}
                  className="relative h-11 w-11 rounded-xl shadow-md ring-1 ring-white/10"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-inspect-text">
                  Install {BRAND_NAME}
                </p>
                <p className="line-clamp-2 text-xs leading-snug text-inspect-muted">
                  {BRAND_MOBILE_HOOK}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  disabled={installing}
                  onClick={onPrimaryClick}
                  className={cn(
                    "touch-manipulation rounded-xl px-4 py-2.5 text-sm font-semibold transition active:scale-[0.98] disabled:opacity-60",
                    canNativeInstall
                      ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-500/25 hover:opacity-95"
                      : "border border-inspect-border bg-inspect-elevated/90 text-inspect-text hover:bg-inspect-elevated",
                  )}
                >
                  {primaryLabel}
                </button>
                <button
                  type="button"
                  onClick={snooze}
                  className="touch-manipulation rounded-xl p-2.5 text-inspect-muted transition hover:bg-inspect-elevated/80 hover:text-inspect-text"
                  aria-label="Dismiss install prompt"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <p className="mt-1.5 text-center">
              <button
                type="button"
                onClick={dismissForever}
                className="text-[11px] text-inspect-muted/80 underline-offset-2 hover:text-inspect-muted hover:underline"
              >
                Don&apos;t show again
              </button>
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** @deprecated Use `InstallPrompt` — kept for any stale imports */
export const InstallBanner = InstallPrompt;
