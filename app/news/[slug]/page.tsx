import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, ExternalLink } from "lucide-react";
import { NewsPagination } from "@/components/news-pagination";
import { ReleaseAssetTable, ReleaseQuickLinks } from "@/components/release-asset-table";
import { ReleaseNotes } from "@/components/release-notes";
import { StatusBadge } from "@/components/status-badge";
import { YouTubeEmbed } from "@/components/youtube-embed";
import {
  adjacentNews,
  displayNewsDate,
  findNewsEntry,
  getAllNewsEntries
} from "@/lib/news";
import { assetsByKind, formatBytes } from "@/lib/releases";
import { findModule, moduleHref } from "@/lib/modules";
import { pageMetadata } from "@/lib/site";

type NewsPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const entries = await getAllNewsEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: NewsPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await findNewsEntry(slug);

  if (!entry) {
    return pageMetadata({
      title: "News",
      path: "/news"
    });
  }

  return pageMetadata({
    title: `${entry.title} | News`,
    description: entry.description,
    path: `/news/${entry.slug}`
  });
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { slug } = await params;
  const entry = await findNewsEntry(slug);

  if (!entry) notFound();

  const { previous, next } = await adjacentNews(entry);
  const Component = entry.component;
  const release = entry.release;
  const dateLabel = displayNewsDate(entry);
  const showStatusBadge = entry.status !== dateLabel;
  const packAssets = release
    ? [
        ...assetsByKind(release, "echo-pack"),
        ...assetsByKind(release, "pack-manifest"),
        ...assetsByKind(release, "release-metadata")
      ]
    : [];
  const moduleAssets = release ? assetsByKind(release, "module-jar") : [];

  return (
    <>
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 -z-10 bg-echo-grid bg-[length:48px_48px] opacity-25" />
        <div className="section-shell">
          <Link
            href="/news"
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-echo-muted hover:text-echo-cyan"
          >
            <ArrowLeft size={15} />
            News
          </Link>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge label={entry.category} tone={entry.source === "release" ? "green" : "blue"} />
              <span className="rounded-[4px] border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.13em] text-echo-muted">
                {dateLabel}
              </span>
              {showStatusBadge ? <StatusBadge label={entry.status} /> : null}
            </div>
            <h1 className="mt-5 font-display text-5xl font-black text-echo-text sm:text-6xl">
              {entry.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-echo-muted">{entry.description}</p>
          </div>
        </div>
      </section>

      <section className="section-shell py-10">
        <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-echo-muted">
          <Link href="/news" className="hover:text-echo-cyan">
            News
          </Link>
          <ChevronRight size={14} />
          <span>{entry.category}</span>
          <ChevronRight size={14} />
          <span className="text-echo-cyan">{entry.title}</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-6">
            {entry.videoId || entry.thumbnailUrl ? (
              <YouTubeEmbed
                videoId={entry.videoId}
                title={entry.title}
                thumbnailUrl={entry.thumbnailUrl}
                youtubeUrl={entry.youtubeUrl}
              />
            ) : null}

            {Component ? (
              <article className="cyber-panel rounded-[6px] p-5 sm:p-8">
                <div className="prose-echo">
                  <Component />
                </div>
              </article>
            ) : null}

            {release ? (
              <div className="space-y-5">
                <div className="cyber-panel rounded-[6px] p-5 sm:p-8">
                  <p className="cyber-label">Release Summary</p>
                  <h2 className="mt-4 font-display text-3xl font-bold text-echo-text">
                    {release.title}
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-echo-muted">
                    This generated news post mirrors GitHub release data captured during the
                    static build. It includes PackOS assets, module artifacts, checksums, and
                    release notes for the public ECHO download path.
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <ReleaseMetric label="Tag" value={release.tag} />
                    <ReleaseMetric label="Assets" value={String(release.assets.length)} />
                    <ReleaseMetric
                      label="Pack Assets"
                      value={formatBytes(packAssets.reduce((sum, asset) => sum + asset.size, 0))}
                    />
                  </div>
                  <ReleaseQuickLinks
                    assets={release.assets}
                    kinds={["echo-pack", "pack-manifest", "release-metadata"]}
                  />
                </div>
                <ReleaseAssetTable
                  title="Package Assets"
                  description="Pack archive, PackOS manifest, and release metadata from this GitHub release."
                  assets={packAssets}
                />
                <ReleaseAssetTable
                  title="Module Artifacts"
                  description="First-party ECHO module jars included in this release."
                  assets={moduleAssets}
                  compact
                />
                <div className="cyber-panel rounded-[6px] p-5 sm:p-8">
                  <p className="cyber-label">Release Notes</p>
                  <ReleaseNotes markdown={release.body} />
                </div>
              </div>
            ) : null}
          </div>

          <aside className="grid h-fit gap-4">
            <div className="cyber-panel rounded-[6px] p-5">
              <p className="cyber-label">Actions</p>
              <div className="mt-5 grid gap-3">
                {entry.youtubeUrl ? (
                  <Link href={entry.youtubeUrl} className="cyber-button cyber-button-primary">
                    <ExternalLink size={16} />
                    Watch on YouTube
                  </Link>
                ) : null}
                {entry.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="cyber-button cyber-button-secondary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {entry.relatedModules.length > 0 ? (
              <div className="cyber-panel rounded-[6px] p-5">
                <p className="cyber-label">Related Modules</p>
                <div className="mt-5 grid gap-3">
                  {entry.relatedModules.map((moduleId) => {
                    const moduleRecord = findModule(moduleId);

                    return moduleRecord ? (
                      <Link
                        key={moduleId}
                        href={moduleHref(moduleRecord)}
                        className="rounded-[5px] border border-white/10 bg-white/[0.035] p-3 transition hover:border-echo-cyan/40"
                      >
                        <span className="font-display text-base font-bold text-echo-text">
                          {moduleRecord.name}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-echo-muted">
                          {moduleRecord.description}
                        </span>
                      </Link>
                    ) : (
                      <span
                        key={moduleId}
                        className="rounded-[5px] border border-white/10 bg-white/[0.035] p-3 text-sm text-echo-muted"
                      >
                        {moduleId}
                      </span>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      <section className="section-shell py-10">
        <NewsPagination previous={previous} next={next} />
      </section>
    </>
  );
}

function ReleaseMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[5px] border border-white/10 bg-white/[0.035] p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-echo-muted">{label}</p>
      <p className="mt-2 break-words font-display text-lg font-bold text-echo-text">{value}</p>
    </div>
  );
}
