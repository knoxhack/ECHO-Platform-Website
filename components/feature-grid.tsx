import {
  Archive,
  AppWindow,
  Blocks,
  Box,
  Braces,
  Cpu,
  Database,
  Download,
  Eye,
  FileText,
  FlaskConical,
  Gauge,
  Globe2,
  Hammer,
  HardDriveDownload,
  Layers,
  Loader2,
  Map,
  Monitor,
  Network,
  PlayCircle,
  Puzzle,
  Radio,
  Radar,
  Rocket,
  Route,
  ScanLine,
  Search,
  Server,
  ShieldCheck,
  Target,
  Terminal,
  Unlink,
  Upload,
  Zap,
  Wrench
} from "lucide-react";
import { CyberGlassCard } from "@/components/cyber-glass-card";

const icons = {
  app: AppWindow,
  archive: Archive,
  blocks: Blocks,
  box: Box,
  braces: Braces,
  cpu: Cpu,
  database: Database,
  download: Download,
  eye: Eye,
  file: FileText,
  gauge: Gauge,
  globe: Globe2,
  hammer: Hammer,
  install: HardDriveDownload,
  layers: Layers,
  loader: Loader2,
  map: Map,
  monitor: Monitor,
  network: Network,
  play: PlayCircle,
  puzzle: Puzzle,
  radio: Radio,
  radar: Radar,
  rocket: Rocket,
  route: Route,
  scan: ScanLine,
  search: Search,
  server: Server,
  shield: ShieldCheck,
  target: Target,
  template: Braces,
  test: FlaskConical,
  terminal: Terminal,
  unlink: Unlink,
  upload: Upload,
  zap: Zap,
  wrench: Wrench
};

export type FeatureItem = {
  title: string;
  description: string;
  icon?: keyof typeof icons;
};

export function FeatureGrid({
  items,
  columns = "three"
}: {
  items: FeatureItem[];
  columns?: "two" | "three" | "four";
}) {
  const gridClass =
    columns === "four"
      ? "lg:grid-cols-4"
      : columns === "two"
        ? "lg:grid-cols-2"
        : "lg:grid-cols-3";

  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${gridClass}`}>
      {items.map((item) => {
        const Icon = item.icon ? icons[item.icon] : Blocks;
        return (
          <CyberGlassCard key={item.title} className="h-full">
            <div className="mb-5 grid h-11 w-11 place-items-center rounded-[5px] border border-echo-cyan/25 bg-echo-cyan/10 text-echo-cyan">
              <Icon size={21} />
            </div>
            <h3 className="font-display text-xl font-bold text-echo-text">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-echo-muted">{item.description}</p>
          </CyberGlassCard>
        );
      })}
    </div>
  );
}
