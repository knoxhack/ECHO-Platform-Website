import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { newsHref, type NewsEntry } from "@/lib/news";

export function NewsPagination({
  previous,
  next
}: {
  previous?: NewsEntry;
  next?: NewsEntry;
}) {
  return (
    <nav className="grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
      {previous ? (
        <Link
          href={newsHref(previous)}
          className="cyber-panel rounded-[6px] p-4 transition hover:border-echo-cyan/40"
        >
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-echo-muted">
            <ArrowLeft size={14} />
            Previous update
          </span>
          <span className="mt-2 block font-display text-lg font-bold text-echo-text">
            {previous.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={newsHref(next)}
          className="cyber-panel rounded-[6px] p-4 text-right transition hover:border-echo-cyan/40"
        >
          <span className="flex items-center justify-end gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-echo-muted">
            Next update
            <ArrowRight size={14} />
          </span>
          <span className="mt-2 block font-display text-lg font-bold text-echo-text">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
