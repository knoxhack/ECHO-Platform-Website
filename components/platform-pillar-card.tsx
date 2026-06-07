import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { CyberGlassCard } from "@/components/cyber-glass-card";

export function PlatformPillarCard({
  title,
  description,
  href
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <CyberGlassCard className="group flex h-full flex-col justify-between">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-echo-cyan">ECHO Layer</p>
        <h3 className="mt-4 font-display text-xl font-bold text-echo-text">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-echo-muted">{description}</p>
      </div>
      <Link href={href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-echo-cyan">
        Open layer
        <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </CyberGlassCard>
  );
}
