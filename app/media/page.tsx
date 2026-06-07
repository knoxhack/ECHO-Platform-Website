import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, MessageSquare, PlayCircle } from "lucide-react";
import mediaData from "@/data/media.json";
import { CyberGlassCard } from "@/components/cyber-glass-card";
import { HeroSection } from "@/components/hero-section";
import { MediaGallery, type MediaRecord } from "@/components/media-gallery";
import { NewsCard } from "@/components/news-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllNewsEntries, toNewsSummary } from "@/lib/news";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Media",
  description:
    "Official ECHO media gallery for Ashfall, ECHO Launcher, player interfaces, PackOS, and ECHO Labs Dev Talks.",
  path: "/media"
});

export default async function MediaPage() {
  const media = mediaData as MediaRecord[];
  const videoEntries = (await getAllNewsEntries())
    .filter((entry) => entry.videoId)
    .slice(0, 3)
    .map(toNewsSummary);

  return (
    <>
      <HeroSection
        compact
        eyebrow="Media"
        title="ECHO Media Gallery"
        kicker="Ashfall worlds, launcher surfaces, interface systems, PackOS visuals, and Dev Talks."
        description="A launch-ready media surface for players, builders, testers, and viewers who want to see what the ECHO ecosystem looks like before jumping into docs, downloads, or source."
        actions={[
          { label: "Explore Ashfall", href: "/ashfall" },
          { label: "Open Launcher", href: "/launcher", variant: "secondary" },
          { label: "Watch Dev Talks", href: "/news", variant: "secondary" }
        ]}
      />

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Gallery"
          title="A visual tour of the ECHO ecosystem."
          description="Generated launch visuals keep the gallery polished while real screenshots, trailers, and captures can replace or extend them later."
        />
        <div className="mt-8">
          <MediaGallery media={media} />
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Video"
            title="ECHO Labs Dev Talks connect the visuals to the architecture."
            description="These videos already power the news system, so the media gallery can surface them without duplicating editorial content."
          />
          <Link href="/news" className="cyber-button cyber-button-secondary w-fit">
            Open News
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {videoEntries.map((entry) => (
            <NewsCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-5 lg:grid-cols-3">
          <CyberGlassCard className="p-6">
            <Download className="text-echo-cyan" size={24} />
            <h2 className="mt-4 font-display text-2xl font-bold text-echo-text">
              Start with the launcher.
            </h2>
            <p className="mt-3 text-sm leading-6 text-echo-muted">
              The download portal is still the player-first route for ECHO Launcher,
              release metadata, checksums, and official Ashfall assets.
            </p>
            <Link href={siteConfig.links.download} className="cyber-button cyber-button-primary mt-6 w-fit">
              Open Downloads
            </Link>
          </CyberGlassCard>

          <CyberGlassCard className="p-6">
            <PlayCircle className="text-echo-cyan" size={24} />
            <h2 className="mt-4 font-display text-2xl font-bold text-echo-text">
              Follow development.
            </h2>
            <p className="mt-3 text-sm leading-6 text-echo-muted">
              Dev Talks, release posts, platform updates, and module spotlights live in
              the static news system.
            </p>
            <Link href="/news" className="cyber-button cyber-button-secondary mt-6 w-fit">
              Watch or Read
            </Link>
          </CyberGlassCard>

          <CyberGlassCard className="p-6">
            <MessageSquare className="text-echo-cyan" size={24} />
            <h2 className="mt-4 font-display text-2xl font-bold text-echo-text">
              Join the community.
            </h2>
            <p className="mt-3 text-sm leading-6 text-echo-muted">
              Discord, GitHub, YouTube, releases, and support paths are collected in
              the official community hub.
            </p>
            <Link href="/community" className="cyber-button cyber-button-secondary mt-6 w-fit">
              Community Hub
            </Link>
          </CyberGlassCard>
        </div>
      </section>
    </>
  );
}
