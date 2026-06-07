import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { docHref, type DocEntry } from "@/lib/docs";

export function DocsPagination({
  previous,
  next
}: {
  previous?: DocEntry;
  next?: DocEntry;
}) {
  return (
    <nav className="mt-10 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
      {previous ? (
        <Link
          href={docHref(previous)}
          className="cyber-panel rounded-[6px] p-4 transition hover:border-echo-cyan/40"
        >
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-echo-muted">
            <ArrowLeft size={14} />
            Previous
          </span>
          <span className="mt-2 block font-display text-lg font-bold text-echo-text">{previous.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={docHref(next)}
          className="cyber-panel rounded-[6px] p-4 text-right transition hover:border-echo-cyan/40"
        >
          <span className="flex items-center justify-end gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-echo-muted">
            Next
            <ArrowRight size={14} />
          </span>
          <span className="mt-2 block font-display text-lg font-bold text-echo-text">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
