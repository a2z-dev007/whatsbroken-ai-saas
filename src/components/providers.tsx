"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { InstallPrompt } from "@/components/pwa/install-banner";
import { SmoothScroll } from "@/components/smooth-scroll";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("whatsbroken-theme") as Theme | null;
    if (stored === "light" || stored === "dark") {
      setThemeState(stored);
      document.documentElement.classList.toggle("light", stored === "light");
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem("whatsbroken-theme", t);
    document.documentElement.classList.toggle("light", t === "light");
    document.documentElement.classList.toggle("dark", t === "dark");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({ theme: mounted ? theme : "dark", setTheme, toggleTheme }),
    [mounted, theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

const DemoContext = createContext<{
  demoMode: boolean;
  setDemoMode: (v: boolean) => void;
} | null>(null);

export function DemoModeProvider({ children }: { children: React.ReactNode }) {
  const [demoMode, setDemoModeState] = useState(true);

  useEffect(() => {
    const v = localStorage.getItem("whatsbroken-demo");
    if (v === "0") setDemoModeState(false);
  }, []);

  const setDemoMode = useCallback((v: boolean) => {
    setDemoModeState(v);
    localStorage.setItem("whatsbroken-demo", v ? "1" : "0");
  }, []);

  const value = useMemo(() => ({ demoMode, setDemoMode }), [demoMode, setDemoMode]);

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemoMode() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemoMode must be used within DemoModeProvider");
  return ctx;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DemoModeProvider>
        <SmoothScroll>
          {children}
          <InstallPrompt />
        </SmoothScroll>
      </DemoModeProvider>
    </ThemeProvider>
  );
}
