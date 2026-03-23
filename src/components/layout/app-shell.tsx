import { BottomNav } from "./bottom-nav";
import { DesktopRail } from "./desktop-rail";
import { GradientOrbs } from "./gradient-orbs";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GradientOrbs />
      <DesktopRail />
      <div className="min-h-dvh pb-20 lg:pb-0 lg:pl-56">
        {children}
      </div>
      <BottomNav />
    </>
  );
}
