import { StatusBadge } from "@/components/status-badge";

export function StatusStrip({
  items
}: {
  items: Array<{ name: string; status: string }>;
}) {
  return (
    <div className="cyber-panel rounded-[6px] p-3">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-3 border-white/10 px-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-echo-muted">
              {item.name}
            </span>
            <StatusBadge label={item.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
