import Link from "next/link";
import { docHref, docsSections, slugPath, type DocEntry } from "@/lib/docs";

function DocsNavLinks({ currentDoc }: { currentDoc?: DocEntry }) {
  const currentPath = currentDoc ? slugPath(currentDoc.slug) : "";

  return (
    <nav className="grid gap-6">
      {docsSections.map((section) => (
        <div key={section.title}>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-echo-cyan">
            {section.title}
          </p>
          <div className="mt-3 grid gap-1">
            {section.items.map((doc) => {
              const active = slugPath(doc.slug) === currentPath;
              return (
                <Link
                  key={slugPath(doc.slug)}
                  href={docHref(doc)}
                  className={`rounded-[5px] border px-3 py-2 text-sm transition ${
                    active
                      ? "border-echo-cyan/35 bg-echo-cyan/10 text-echo-cyan"
                      : "border-transparent text-echo-muted hover:border-white/10 hover:bg-white/[0.04] hover:text-echo-text"
                  }`}
                >
                  {doc.title}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function DocsSidebar({ currentDoc }: { currentDoc?: DocEntry }) {
  return (
    <>
      <aside className="cyber-panel sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-y-auto rounded-[6px] p-4 lg:block">
        <DocsNavLinks currentDoc={currentDoc} />
      </aside>
      <details className="cyber-panel rounded-[6px] p-4 lg:hidden">
        <summary className="cursor-pointer font-mono text-xs uppercase tracking-[0.16em] text-echo-cyan">
          Browse Docs
        </summary>
        <div className="mt-5">
          <DocsNavLinks currentDoc={currentDoc} />
        </div>
      </details>
    </>
  );
}
