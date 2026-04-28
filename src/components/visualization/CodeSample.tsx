export function CodeSample({ source }: { source: string }) {
  return (
    <pre className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 p-4 text-sm text-slate-100">
      <code>{source}</code>
    </pre>
  );
}
