import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { NewsFeed } from "@/components/news-feed";
import { SectionHeading } from "@/components/section-heading";
import { getAllNewsEntries, toNewsSummary } from "@/lib/news";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "News",
  description: "ECHO news, Dev Talks, release updates, platform updates, and module spotlights.",
  path: "/news"
});

export default async function NewsPage() {
  const entries = (await getAllNewsEntries()).map(toNewsSummary);

  return (
    <>
      <HeroSection
        compact
        eyebrow="News / Devlogs"
        title="ECHO Updates"
        kicker="Dev Talks, platform updates, release notes, and module spotlights."
        description="Watch ECHO Labs videos, read platform updates, and follow GitHub release posts generated from the same public release data that powers the download portal."
        actions={[
          { label: "ECHO Labs YouTube", href: siteConfig.links.youtube },
          { label: "Latest Downloads", href: siteConfig.links.download, variant: "secondary" },
          { label: "View Roadmap", href: "/roadmap", variant: "secondary" }
        ]}
      />

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Update Feed"
          title="Official videos and release posts in one feed."
          description="Filter Dev Talks, release notes, platform updates, Ashfall updates, and module spotlights without leaving the public ECHO Platform site."
        />
        <div className="mt-8">
          <NewsFeed entries={entries} />
        </div>
      </section>
    </>
  );
}
