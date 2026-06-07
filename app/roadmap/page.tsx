import type { Metadata } from "next";
import roadmap from "@/data/roadmap.json";
import { HeroSection } from "@/components/hero-section";
import { RoadmapTimeline, type RoadmapGroup } from "@/components/roadmap-timeline";
import { SectionHeading } from "@/components/section-heading";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Roadmap",
  description: "Public ECHO roadmap grouped by Now, Next, Later, and Research without fixed dates.",
  path: "/roadmap"
});

export default function RoadmapPage() {
  return (
    <>
      <HeroSection
        compact
        eyebrow="Public Roadmap"
        title="ECHO Roadmap"
        kicker="Now, next, later, and research."
        description="The roadmap is public but controlled. It avoids fixed dates unless release data provides them, and it keeps native runtime work clearly marked as future research unless the status changes."
        actions={[
          { label: "Platform Overview", href: "/platform" },
          { label: "Developer Docs", href: "/developers", variant: "secondary" }
        ]}
      />

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Roadmap Groups"
          title="A clear direction without overpromising."
          description="Each item renders from data/roadmap.json so the public site can evolve as work moves between phases."
        />
        <div className="mt-8">
          <RoadmapTimeline groups={roadmap as RoadmapGroup[]} />
        </div>
      </section>
    </>
  );
}
