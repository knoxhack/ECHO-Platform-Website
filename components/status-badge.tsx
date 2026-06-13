type StatusTone = "cyan" | "green" | "amber" | "red" | "blue" | "muted";

const toneMap: Record<StatusTone, string> = {
  cyan: "border-echo-cyan/40 bg-echo-cyan/10 text-echo-cyan",
  green: "border-echo-green/40 bg-echo-green/10 text-echo-green",
  amber: "border-echo-amber/40 bg-echo-amber/10 text-echo-amber",
  red: "border-echo-red/40 bg-echo-red/10 text-echo-red",
  blue: "border-echo-blue/50 bg-echo-blue/15 text-[#8edcff]",
  muted: "border-white/15 bg-white/[0.04] text-echo-muted"
};

export function statusTone(status: string): StatusTone {
  const normalized = status.toLowerCase();
  if (normalized.includes("stable") || normalized.includes("public")) return "green";
  if (normalized.includes("active")) return "cyan";
  if (
    normalized.includes("progress") ||
    normalized.includes("foundation") ||
    normalized.includes("warning") ||
    normalized.includes("gated")
  ) {
    return "amber";
  }
  if (
    normalized.includes("experimental") ||
    normalized.includes("research") ||
    normalized.includes("blocked")
  ) {
    return "red";
  }
  if (normalized.includes("planned") || normalized.includes("prototype")) return "blue";
  return "muted";
}

export function StatusBadge({
  label,
  tone
}: {
  label: string;
  tone?: StatusTone;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-[4px] border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.13em] ${toneMap[tone ?? statusTone(label)]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_12px_currentColor]" />
      {label}
    </span>
  );
}
