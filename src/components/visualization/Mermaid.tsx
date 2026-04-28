"use client";

export function Mermaid({ source }: { source: string }) {
  return (
    <pre className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-100 p-4 text-sm text-slate-800">
      {source}
    </pre>
  );
}
