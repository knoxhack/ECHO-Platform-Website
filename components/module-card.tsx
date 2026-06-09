import Link from "next/link";
import { ArrowRight, Box, GitBranch, PackageCheck, ShieldCheck } from "lucide-react";
import { CyberGlassCard } from "@/components/cyber-glass-card";
import { StatusBadge } from "@/components/status-badge";
import { addonInstallLink } from "@/lib/install-links";

export type ModuleReleaseNote = {
  title: string;
  version: string | null;
  notes: string[];
};

export type ModuleRecord = {
  id: string;
  name: string;
  category: string;
  group: string;
  status: string;
  version?: string | null;
  description: string;
  dependencies: string[];
  standalone: boolean;
  usedByAshfall: boolean;
  docs: string;
  github: string;
  overview: string[];
  capabilities: string[];
  integrations: string[];
  statusNote: string;
  roadmap: string[];
  releaseNotes: ModuleReleaseNote[];
};

export function ModuleCard({ module, installable = false }: { module: ModuleRecord; installable?: boolean }) {
  return (
    <CyberGlassCard className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[5px] border border-echo-cyan/25 bg-echo-cyan/10 text-echo-cyan">
          <Box size={19} />
        </div>
        <StatusBadge label={module.status} />
      </div>
      <h3 className="mt-5 font-display text-xl font-bold text-echo-text">{module.name}</h3>
      <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-echo-muted">
        {module.category}
      </p>
      <p className="mt-4 flex-1 text-sm leading-6 text-echo-muted">{module.description}</p>

      <div className="mt-5 grid gap-2 border-t border-white/10 pt-4 font-mono text-[11px] uppercase tracking-[0.13em] text-echo-muted sm:grid-cols-2">
        <span className="inline-flex items-center gap-2">
          <GitBranch size={14} />
          {module.dependencies.length} deps
        </span>
        <span className="inline-flex items-center gap-2">
          <PackageCheck size={14} />
          {module.version ?? "TBD"}
        </span>
        <span className="inline-flex items-center gap-2">
          <ShieldCheck size={14} />
          {module.standalone ? "Standalone" : "Pack-bound"}
        </span>
        <span className="inline-flex items-center gap-2">
          <ShieldCheck size={14} />
          {module.usedByAshfall ? "Ashfall" : "Optional"}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {installable ? (
          <a href={addonInstallLink(module.id)} className="cyber-button cyber-button-primary min-h-9 px-3 py-1.5 text-xs">
            Install
            <ArrowRight size={14} />
          </a>
        ) : null}
        <Link href={`/modules/${module.id}`} className="cyber-button cyber-button-primary min-h-9 px-3 py-1.5 text-xs">
          Details
          <ArrowRight size={14} />
        </Link>
        <Link href={module.docs} className="cyber-button cyber-button-secondary min-h-9 px-3 py-1.5 text-xs">
          Docs
        </Link>
        <Link href={module.github} className="cyber-button cyber-button-secondary min-h-9 px-3 py-1.5 text-xs">
          GitHub
        </Link>
      </div>
    </CyberGlassCard>
  );
}
