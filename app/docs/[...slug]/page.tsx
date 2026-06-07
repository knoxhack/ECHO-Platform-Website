import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { DocsPagination } from "@/components/docs/docs-pagination";
import { DocsSearch } from "@/components/docs/docs-search";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { adjacentDocs, allDocs, findDoc } from "@/lib/docs";
import { pageMetadata } from "@/lib/site";

type DocsPageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return allDocs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = findDoc(slug);

  if (!doc) {
    return pageMetadata({
      title: "Docs",
      path: "/docs"
    });
  }

  return pageMetadata({
    title: `${doc.title} | Docs`,
    description: doc.description,
    path: `/docs/${doc.slug.join("/")}`
  });
}

export default async function DocsArticlePage({ params }: DocsPageProps) {
  const { slug } = await params;
  const doc = findDoc(slug);

  if (!doc) notFound();

  const { previous, next } = adjacentDocs(doc);
  const Component = doc.component;

  return (
    <section className="section-shell py-10 sm:py-14">
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="grid h-fit gap-4">
          <DocsSearch compact />
          <DocsSidebar currentDoc={doc} />
        </div>

        <div className="min-w-0">
          <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-echo-muted">
            <Link href="/docs" className="hover:text-echo-cyan">
              Docs
            </Link>
            <ChevronRight size={14} />
            <span>{doc.section}</span>
            <ChevronRight size={14} />
            <span className="text-echo-cyan">{doc.title}</span>
          </div>

          <article
            data-pagefind-body
            data-pagefind-filter={`section:${doc.section}`}
            data-pagefind-meta={`title:${doc.title}, section:${doc.section}`}
            className="cyber-panel rounded-[6px] p-5 sm:p-8"
          >
            <p className="cyber-label">{doc.section}</p>
            <h1 className="mt-4 font-display text-4xl font-black text-echo-text sm:text-5xl">
              {doc.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-echo-muted">{doc.description}</p>
            <div className="prose-echo mt-8">
              <Component />
            </div>
          </article>

          <DocsPagination previous={previous} next={next} />
        </div>
      </div>
    </section>
  );
}
