import { CyberGlassCard } from "@/components/cyber-glass-card";
import { StatusBadge } from "@/components/status-badge";

export type RoadmapGroup = {
  phase: string;
  description: string;
  items: Array<{
    title: string;
    status: string;
    description: string;
  }>;
};

export function RoadmapTimeline({ groups }: { groups: RoadmapGroup[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-4">
      {groups.map((group) => (
        <CyberGlassCard key={group.phase} className="h-full">
          <p className="cyber-label">{group.phase}</p>
          <p className="mt-3 text-sm leading-6 text-echo-muted">{group.description}</p>
          <div className="mt-6 space-y-4">
            {group.items.map((item) => (
              <div key={item.title} className="border-l border-echo-cyan/25 pl-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-base font-bold text-echo-text">{item.title}</h3>
                  <StatusBadge label={item.status} />
                </div>
                <p className="mt-2 text-sm leading-6 text-echo-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </CyberGlassCard>
      ))}
    </div>
  );
}
