import Image from "next/image";
import Link from "next/link";
import { FileText, PackageCheck, PlayCircle, RadioTower } from "lucide-react";
import { CyberGlassCard } from "@/components/cyber-glass-card";
import { StatusBadge } from "@/components/status-badge";
import { displayNewsDate, type NewsSummary } from "@/lib/news";

export function NewsCard({ entry }: { entry: NewsSummary }) {
  const Icon = entry.videoId ? PlayCircle : entry.source === "release" ? PackageCheck : FileText;

  return (
    <CyberGlassCard className="flex h-full flex-col overflow-hidden p-0">
      {entry.thumbnailUrl ? (
        <Link href={entry.href} className="relative block aspect-video overflow-hidden border-b border-white/10">
          <Image
            src={entry.thumbnailUrl}
            alt=""
            fill
            className="object-cover opacity-85 transition hover:scale-[1.02]"
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 grid h-12 w-12 place-items-center rounded-[5px] border border-echo-amber/40 bg-[#05070a]/80 text-echo-amber backdrop-blur">
            <Icon size={24} />
          </div>
        </Link>
      ) : (
        <Link href={entry.href} className="grid aspect-video place-items-center border-b border-white/10 bg-echo-cyan/10 text-echo-cyan">
          <Icon size={36} />
        </Link>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <StatusBadge label={entry.category} tone={entry.source === "release" ? "green" : "blue"} />
          <span className="font-mono text-xs uppercase tracking-[0.13em] text-echo-muted">
            {displayNewsDate(entry)}
          </span>
        </div>

        <h3 className="mt-5 font-display text-xl font-bold text-echo-text">{entry.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-echo-muted">{entry.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {entry.videoId ? (
            <span className="inline-flex items-center gap-2 rounded-[4px] border border-echo-amber/25 bg-echo-amber/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-echo-amber">
              <PlayCircle size={13} />
              Video
            </span>
          ) : null}
          {entry.relatedModules.length > 0 ? (
            <span className="inline-flex items-center gap-2 rounded-[4px] border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-echo-muted">
              <RadioTower size={13} />
              {entry.relatedModules.length} modules
            </span>
          ) : null}
        </div>

        <Link href={entry.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-echo-cyan">
          Watch or read update
        </Link>
      </div>
    </CyberGlassCard>
  );
}
