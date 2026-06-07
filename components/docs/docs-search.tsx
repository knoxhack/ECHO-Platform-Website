"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type PagefindResultData = {
  url: string;
  excerpt: string;
  meta: {
    title?: string;
    section?: string;
  };
};

type PagefindResult = {
  id: string;
  data: () => Promise<PagefindResultData>;
};

type PagefindSearchResponse = {
  results: PagefindResult[];
};

type PagefindModule = {
  search: (query: string) => Promise<PagefindSearchResponse>;
};

type SearchResult = {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  section?: string;
};

async function loadPagefind(): Promise<PagefindModule> {
  const importer = new Function("return import('/pagefind/pagefind.js')");
  return importer() as Promise<PagefindModule>;
}

export function DocsSearch({ compact = false }: { compact?: boolean }) {
  const [pagefind, setPagefind] = useState<PagefindModule | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState("Search is available after the production docs build.");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    loadPagefind()
      .then((module) => {
        if (!mounted) return;
        setPagefind(module);
        setStatus("Search the ECHO docs.");
      })
      .catch(() => {
        if (!mounted) return;
        setStatus("Search is available after the production docs build.");
      });

    return () => {
      mounted = false;
    };
  }, []);

  const trimmedQuery = useMemo(() => query.trim(), [query]);

  useEffect(() => {
    if (!pagefind || trimmedQuery.length < 2) {
      setResults([]);
      return;
    }

    let cancelled = false;
    setLoading(true);

    const timeout = window.setTimeout(async () => {
      try {
        const search = await pagefind.search(trimmedQuery);
        const loaded = await Promise.all(
          search.results.slice(0, 6).map(async (result) => {
            const data = await result.data();
            return {
              id: result.id,
              title: data.meta.title ?? data.url,
              url: data.url,
              excerpt: data.excerpt,
              section: data.meta.section
            };
          })
        );

        if (!cancelled) {
          setResults(loaded);
          setStatus(loaded.length > 0 ? `${loaded.length} result${loaded.length === 1 ? "" : "s"}` : "No docs matched that signal.");
        }
      } catch {
        if (!cancelled) {
          setStatus("Search could not load the docs index.");
          setResults([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 180);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [pagefind, trimmedQuery]);

  return (
    <div className={`cyber-panel rounded-[6px] ${compact ? "p-4" : "p-5"}`}>
      <label className="cyber-label" htmlFor={compact ? "docs-search-compact" : "docs-search"}>
        Docs Search
      </label>
      <div className="mt-3 flex min-h-11 items-center gap-3 rounded-[5px] border border-white/10 bg-[#05070a]/72 px-3">
        <Search size={18} className="shrink-0 text-echo-cyan" />
        <input
          id={compact ? "docs-search-compact" : "docs-search"}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search PackOS, Launcher, Lens..."
          className="min-w-0 flex-1 bg-transparent py-3 text-sm text-echo-text outline-none placeholder:text-echo-muted"
        />
      </div>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.13em] text-echo-muted">
        {loading ? "Searching..." : status}
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid gap-3">
          {results.map((result) => (
            <Link
              key={result.id}
              href={result.url}
              className="rounded-[5px] border border-white/10 bg-white/[0.035] p-3 transition hover:border-echo-cyan/40 hover:bg-echo-cyan/10"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-sm font-bold text-echo-text">{result.title}</span>
                {result.section ? (
                  <span className="rounded-[4px] border border-echo-cyan/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-echo-cyan">
                    {result.section}
                  </span>
                ) : null}
              </div>
              <p
                className="mt-2 text-xs leading-5 text-echo-muted [&_mark]:rounded-[3px] [&_mark]:bg-echo-amber/20 [&_mark]:px-0.5 [&_mark]:text-echo-amber"
                dangerouslySetInnerHTML={{ __html: result.excerpt }}
              />
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
