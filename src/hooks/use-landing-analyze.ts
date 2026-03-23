"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDemoMode } from "@/components/providers";

const analysisLines = [
  "Checking requests to your page…",
  "Looking for slow or failed calls…",
  "Scanning for errors visitors might hit…",
  "Preparing your plain-English summary…",
];

export function useLandingAnalyze(initialUrl = "https://shop.example.com/checkout") {
  const router = useRouter();
  const { demoMode } = useDemoMode();
  const [url, setUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const analyze = useCallback(() => {
    const target = url.trim() || initialUrl;
    setLoading(true);
    setLineIdx(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    intervalRef.current = setInterval(() => {
      setLineIdx((i) => (i + 1) % analysisLines.length);
    }, 650);
    const ms = demoMode ? 2200 : 900;
    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      timeoutRef.current = null;
      router.push(`/debug?url=${encodeURIComponent(target)}`);
    }, ms);
  }, [url, router, demoMode, initialUrl]);

  return {
    url,
    setUrl,
    loading,
    analyze,
    lineIdx,
    analysisLines,
    demoMode,
  };
}
