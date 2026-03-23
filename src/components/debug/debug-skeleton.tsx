export function DebugSkeleton() {
  return (
    <div className="inspect-gradient-bg min-h-dvh px-4 pb-24 pt-6">
      <div className="mx-auto max-w-6xl space-y-4">
        <div className="flex gap-3 border-b border-inspect-border pb-4">
          <div className="h-10 w-10 rounded-xl skeleton" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-2/3 max-w-xs rounded skeleton" />
            <div className="h-3 w-40 rounded skeleton" />
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,320px)_1fr]">
          <div className="space-y-4">
            <div className="h-72 rounded-2xl skeleton" />
            <div className="h-48 rounded-2xl skeleton" />
          </div>
          <div className="space-y-3">
            <div className="h-12 rounded-2xl skeleton" />
            <div className="h-64 rounded-2xl skeleton" />
          </div>
        </div>
      </div>
    </div>
  );
}
