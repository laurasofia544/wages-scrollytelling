export function Timeline({ source }: { source: string }) {
  const events = source
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [time, label] = line.split("|").map((cell) => cell.trim());
      return { time, label };
    });

  return (
    <ol className="space-y-4 border-l-2 border-slate-300 pl-4">
      {events.map((event, index) => (
        <li key={index}>
          <div className="font-mono text-xs uppercase tracking-widest text-slate-500">{event.time}</div>
          <div className="text-slate-900">{event.label}</div>
        </li>
      ))}
    </ol>
  );
}
