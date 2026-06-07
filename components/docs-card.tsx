import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { CyberGlassCard } from "@/components/cyber-glass-card";

export function DocsCard({
  title,
  description,
  href,
  links = []
}: {
  title: string;
  description: string;
  href: string;
  links?: string[];
}) {
  return (
    <CyberGlassCard className="h-full">
      <div className="mb-5 grid h-11 w-11 place-items-center rounded-[5px] border border-echo-green/30 bg-echo-green/10 text-echo-green">
        <BookOpen size={21} />
      </div>
      <h3 className="font-display text-xl font-bold text-echo-text">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-echo-muted">{description}</p>
      {links.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {links.map((link) => (
            <span
              key={link}
              className="rounded-[4px] border border-white/10 bg-white/[0.035] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.13em] text-echo-muted"
            >
              {link}
            </span>
          ))}
        </div>
      ) : null}
      <Link href={href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-echo-cyan">
        Open docs
        <ArrowRight size={16} />
      </Link>
    </CyberGlassCard>
  );
}
