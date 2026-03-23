"use client";

export function GradientOrbs() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div
        className="particle absolute -left-20 top-20 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="particle absolute -right-16 top-1/3 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="particle absolute bottom-20 left-1/3 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}
