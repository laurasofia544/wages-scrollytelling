"use client";

import { useMemo } from "react";

export function ScrollDemo({ source }: { source: string }) {
  const text = useMemo(() => source.trim(), [source]);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <pre className="whitespace-pre-wrap text-sm text-slate-700">{text || "ScrollDemo parse error"}</pre>
    </div>
  );
}
