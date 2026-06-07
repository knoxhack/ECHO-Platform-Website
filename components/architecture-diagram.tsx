import { CyberGlassCard } from "@/components/cyber-glass-card";

export type ArchitectureLayer = {
  title: string;
  items: string[];
};

export function ArchitectureDiagram({ layers }: { layers: ArchitectureLayer[] }) {
  return (
    <CyberGlassCard className="scanline">
      <div className="grid gap-3">
        {layers.map((layer, index) => (
          <div
            key={layer.title}
            className="grid gap-3 rounded-[5px] border border-white/10 bg-white/[0.035] p-4 lg:grid-cols-[220px_1fr]"
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-echo-muted">
                Layer {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-lg font-bold text-echo-cyan">{layer.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {layer.items.map((item) => (
                <span
                  key={item}
                  className="rounded-[4px] border border-echo-cyan/20 bg-echo-cyan/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-echo-text"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CyberGlassCard>
  );
}
