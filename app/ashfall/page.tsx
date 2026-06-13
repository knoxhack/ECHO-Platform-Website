import type { Metadata } from "next";
import Link from "next/link";
import modules from "@/data/modules.json";
import { CyberGlassCard } from "@/components/cyber-glass-card";
import { FeatureGrid } from "@/components/feature-grid";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { StatusBadge } from "@/components/status-badge";
import type { ModuleRecord } from "@/components/module-card";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Ashfall",
  description: "The first official ECHO survival experience, powered by ECHO modules and ECHO Launcher.",
  path: "/ashfall"
});

const gameplay = [
  {
    title: "Survive the Atmosphere",
    description: "Manage toxic exposure, radiation, hydration, filters, storms, and environmental pressure.",
    icon: "gauge" as const
  },
  {
    title: "Follow the Signal",
    description: "Use Terminal missions, route objectives, faction intel, and world discoveries to progress.",
    icon: "radio" as const
  },
  {
    title: "Scan the Ruins",
    description: "Use Lens to identify blocks, machines, hazards, mobs, resources, and hidden progression clues.",
    icon: "scan" as const
  },
  {
    title: "Map the Wasteland",
    description: "Use HoloMap overlays to track crash sites, hazards, routes, relays, missions, bases, and anomalies.",
    icon: "map" as const
  },
  {
    title: "Recover Lost Technology",
    description: "Find relic systems, prototypes, damaged machines, orbital caches, and pre-Gridfall remnants.",
    icon: "archive" as const
  },
  {
    title: "Reach the Nexus",
    description: "Unlock late-game anomaly systems, signal storms, route gates, and endgame consequences.",
    icon: "radar" as const
  }
];

export default function AshfallPage() {
  const poweredModules = (modules as ModuleRecord[]).filter(
    (module) => module.usedByAshfall && ["Interface", "Ashfall", "Core"].includes(module.group)
  );

  return (
    <>
      <HeroSection
        compact
        eyebrow="Official Experience"
        title="Ashfall"
        kicker="The first official ECHO survival experience."
        description="Survive the Gridfall aftermath in a world of broken relays, toxic storms, orbital wreckage, radiation zones, faction signals, and buried machine intelligence."
        actions={[
          { label: "View Readiness Status", href: "/download" },
          { label: "View Media", href: "/media", variant: "secondary" },
          { label: "Watch Dev Talks", href: "/news", variant: "secondary" },
          { label: "Read Survival Guide", href: "/docs", variant: "secondary" }
        ]}
      />

      <section className="section-shell py-16">
        <CyberGlassCard className="p-8">
          <p className="cyber-label">The World</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-echo-text">
            The Gridfall shattered the old world.
          </h2>
          <p className="mt-5 max-w-5xl text-lg leading-8 text-echo-muted">
            Now the surface is unstable. Toxic air moves through ruined regions.
            Radiation pockets twist the landscape. Orbital debris falls from above.
            Hidden relays broadcast corrupted signals. Factions fight over the remains
            of old infrastructure. Somewhere beyond the noise, the Nexus is still
            listening.
          </p>
        </CyberGlassCard>
      </section>

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Core Gameplay"
          title="Ashfall turns ECHO systems into a survival campaign."
          description="Each gameplay surface reinforces the platform: Terminal for mission flow, Lens for discovery, HoloMap for route awareness, and Index for knowledge recovery."
        />
        <div className="mt-8">
          <FeatureGrid items={gameplay} />
        </div>
      </section>

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Powered by ECHO"
          title="Ashfall is powered by first-party ECHO systems."
          description="The first official experience proves the platform through real gameplay, not only architecture diagrams."
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {poweredModules.map((module) => (
            <CyberGlassCard key={module.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-base font-bold text-echo-text">{module.name}</h3>
                <StatusBadge label={module.status} />
              </div>
              <p className="mt-2 text-sm leading-6 text-echo-muted">{module.description}</p>
            </CyberGlassCard>
          ))}
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <CyberGlassCard className="p-8">
            <p className="cyber-label">How to Play</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-echo-text">
              Ashfall installs are locked behind readiness evidence.
            </h2>
            <ol className="mt-6 space-y-3 text-sm leading-6 text-echo-muted">
              {[
                "Download ECHO Launcher.",
                "Check the Ashfall edition readiness state.",
                "Wait for Release Index approval before installing a pack.",
                "Use GitHub release assets only for audit and development work.",
                "Install through the launcher after Phase 7-10 evidence is green."
              ].map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[4px] border border-echo-cyan/25 bg-echo-cyan/10 font-mono text-xs text-echo-cyan">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </CyberGlassCard>
          <CyberGlassCard className="flex flex-col justify-center p-8">
            <p className="cyber-label">Player CTA</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-echo-text">
              Ashfall is not approved for player installs yet.
            </h2>
            <p className="mt-4 text-sm leading-6 text-echo-muted">
              Release assets are checksum-backed, but the catalog remains warning-gated
              until beta session proof, gameplay QA evidence, screenshots, and RC smoke
              results pass the readiness audit.
            </p>
            <Link href="/download" className="cyber-button cyber-button-primary mt-6 w-fit">
              Open Download Portal
            </Link>
            <Link href="/media" className="cyber-button cyber-button-secondary mt-3 w-fit">
              View Media
            </Link>
          </CyberGlassCard>
        </div>
      </section>
    </>
  );
}
