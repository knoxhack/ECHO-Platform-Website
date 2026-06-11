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
  title: "Sky Relay",
  description: "ECHO: Sky Relay is the phase-gated relay restoration experience for Native, NeoForge, and Standalone runtime tracks.",
  path: "/sky-relay"
});

const gameplay = [
  {
    title: "Restore the Relay",
    description: "Wake at a damaged relay core, recover power, repair anchor nodes, and bring the network back online.",
    icon: "radio" as const
  },
  {
    title: "Anchor Fragments",
    description: "Scan drifting platform fragments, pay power costs, manage storm risk, and stabilize new routes.",
    icon: "route" as const
  },
  {
    title: "Survive the Weather",
    description: "Use shelters, condensers, shields, and storm collectors to live above the lethal cloud layer.",
    icon: "gauge" as const
  },
  {
    title: "Map the Sky",
    description: "Track fragment registry data, power coverage, shield range, and logistics routes through HoloMap layers.",
    icon: "map" as const
  },
  {
    title: "Recover the Lost",
    description: "Use recovery caches, salvage crates, firmware shards, and void recovery hooks to keep the run intact.",
    icon: "archive" as const
  },
  {
    title: "Restore the Signal Crown",
    description: "Complete the late route, prove save reload stability, and earn the Sky Relay completion badge.",
    icon: "radar" as const
  }
];

const releaseGates = [
  "Native, NeoForge, and Standalone manual gameplay evidence",
  "First 30 minutes, first 2 hours, and Signal Crown completion proof",
  "Screenshots, notes, logs, save snapshots, and real tester metadata",
  "Launcher install, update, repair, rollback, and deep-link evidence",
  "Release Index public-alpha readiness and promotion dry-run"
];

export default function SkyRelayPage() {
  const skyRelayModules = (modules as ModuleRecord[]).filter(
    (module) => module.id === "echoskyrelayprotocol" || module.group === "Sky Relay"
  );

  return (
    <>
      <HeroSection
        compact
        eyebrow="Blocked Preview"
        title="Sky Relay"
        kicker="Restore a broken relay network above a lethal storm layer."
        description="Sky Relay is wired as an official ECHO experience across Native, NeoForge, and Standalone edition repos. It remains preview-gated until real manual gameplay evidence clears the release pipeline."
        actions={[
          { label: "Release Gate Docs", href: "/docs/release/sky-relay-editions" },
          { label: "Native Edition", href: "/sky-relay/native-edition", variant: "secondary" },
          { label: "NeoForge Edition", href: "/sky-relay/neoforge-edition", variant: "secondary" },
          { label: "Standalone Edition", href: "/sky-relay/standalone-edition", variant: "secondary" }
        ]}
      />

      <section className="section-shell py-16">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <CyberGlassCard className="p-8">
            <p className="cyber-label">Experience State</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-echo-text">
              Visible in the ecosystem. Not promoted to public alpha.
            </h2>
            <p className="mt-5 text-base leading-7 text-echo-muted">
              The release index, launcher, and website can all describe Sky Relay now.
              The install/play path stays blocked until the evidence files come from a
              real run instead of templates.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <StatusBadge label="Blocked Preview" />
              <StatusBadge label="3 Editions" />
              <StatusBadge label="Manual Evidence Required" />
            </div>
          </CyberGlassCard>

          <CyberGlassCard className="p-8">
            <p className="cyber-label">Canonical Module</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-echo-text">
              echoskyrelayprotocol
            </h2>
            <p className="mt-5 text-sm leading-6 text-echo-muted">
              This pack-root module owns the block, item, fragment, progression,
              terminal, Lens, HoloMap, weather, recovery, and release-readiness contracts.
            </p>
            <Link href="/modules/echoskyrelayprotocol" className="cyber-button cyber-button-secondary mt-6 w-fit">
              Open Module
            </Link>
          </CyberGlassCard>
        </div>
      </section>

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Gameplay Loop"
          title="A vertical restoration run, not a generic sky map."
          description="Sky Relay is built around fragment anchoring, storm windows, power stability, recovery, and a final Signal Crown sequence."
        />
        <div className="mt-8">
          <FeatureGrid items={gameplay} />
        </div>
      </section>

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Release Gates"
          title="What must pass before public alpha."
          description="The release pipeline is intentionally fail-closed so the site and launcher cannot quietly promote template evidence."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1fr]">
          <CyberGlassCard className="p-8">
            <p className="cyber-label">Open Evidence</p>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-echo-muted">
              {releaseGates.map((gate) => (
                <li key={gate} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-echo-cyan" />
                  <span>{gate}</span>
                </li>
              ))}
            </ul>
          </CyberGlassCard>

          <CyberGlassCard className="p-8">
            <p className="cyber-label">Runtime Tracks</p>
            <div className="mt-5 grid gap-3">
              {[
                ["Native Edition", "/sky-relay/native-edition", "Primary ECHO Native Platform lane."],
                ["NeoForge Edition", "/sky-relay/neoforge-edition", "Minecraft-compatible validation lane."],
                ["Standalone Edition", "/sky-relay/standalone-edition", "No-Minecraft runtime parity lane."]
              ].map(([title, href, detail]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-[5px] border border-white/10 bg-white/[0.035] p-4 transition hover:border-echo-cyan/40 hover:bg-echo-cyan/10"
                >
                  <span className="font-display text-lg font-bold text-echo-text">{title}</span>
                  <span className="mt-1 block text-sm leading-6 text-echo-muted">{detail}</span>
                </Link>
              ))}
            </div>
          </CyberGlassCard>
        </div>
      </section>

      {skyRelayModules.length ? (
        <section className="section-shell py-16">
          <SectionHeading
            eyebrow="Source Modules"
            title="Sky Relay source-backed modules."
            description="These entries are generated from ECHO-Modules metadata and stay tied to the module release graph."
          />
          <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {skyRelayModules.map((module) => (
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
      ) : null}
    </>
  );
}
