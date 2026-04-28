export function StatGrid({ source }: { source: string }) {
  const rows = source
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/^[-|\s]+$/.test(line))
    .map((line) => line.split("|").map((cell) => cell.trim()));

  if (!rows.length || rows.some((row) => row.length < 2)) {
    return <div className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm text-rose-900">StatGrid parse error</div>;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map(([value, label], index) => (
        <li key={index} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-3xl font-semibold tracking-tight text-slate-900">{value}</div>
          <div className="mt-1 text-sm text-slate-600">{label}</div>
        </li>
      ))}
    </ul>
  );
}
