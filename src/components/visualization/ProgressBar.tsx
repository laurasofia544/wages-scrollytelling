export function ProgressBar({ source }: { source: string }) {
  const value = Math.max(0, Math.min(100, Number(source.trim()) || 0));
  return (
    <div className="rounded-full border border-slate-200 bg-slate-100 p-1">
      <div className="h-3 rounded-full bg-sky-500" style={{ width: `${value}%` }} />
    </div>
  );
}
