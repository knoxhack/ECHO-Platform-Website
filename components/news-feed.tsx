"use client";

import { useMemo, useState } from "react";
import { NewsCard } from "@/components/news-card";
import type { NewsSummary } from "@/lib/news";

type NewsFilter = "all" | "dev-talk" | "releases" | "platform" | "ashfall" | "modules";

const filters: Array<{ id: NewsFilter; label: string }> = [
  { id: "all", label: "All" },
  { id: "dev-talk", label: "Dev Talk" },
  { id: "releases", label: "Releases" },
  { id: "platform", label: "Platform" },
  { id: "ashfall", label: "Ashfall" },
  { id: "modules", label: "Modules" }
];

export function NewsFeed({ entries }: { entries: NewsSummary[] }) {
  const [active, setActive] = useState<NewsFilter>("all");

  const filteredEntries = useMemo(
    () => entries.filter((entry) => matchesFilter(entry, active)),
    [active, entries]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActive(filter.id)}
            className={`rounded-[5px] border px-3 py-2 font-mono text-xs uppercase tracking-[0.13em] transition ${
              active === filter.id
                ? "border-echo-cyan bg-echo-cyan text-[#031018]"
                : "border-white/15 bg-white/[0.045] text-echo-muted hover:border-echo-cyan/50 hover:text-echo-text"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {filteredEntries.length > 0 ? (
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredEntries.map((entry) => (
            <NewsCard key={entry.slug} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="cyber-panel mt-8 rounded-[6px] p-6">
          <p className="cyber-label">No entries</p>
          <p className="mt-3 text-sm leading-6 text-echo-muted">
            This filter does not have public updates yet.
          </p>
        </div>
      )}
    </div>
  );
}

function matchesFilter(entry: NewsSummary, filter: NewsFilter) {
  if (filter === "all") return true;
  if (filter === "dev-talk") return entry.category === "Dev Talk";
  if (filter === "releases") return entry.category === "Launcher Release";
  if (filter === "platform") return entry.category === "Platform Update";
  if (filter === "ashfall") return entry.category === "Ashfall Update";
  if (filter === "modules") return entry.category === "Module Spotlight";
  return true;
}
