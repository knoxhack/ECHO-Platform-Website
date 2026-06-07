import type { Metadata } from "next";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { CyberGlassCard } from "@/components/cyber-glass-card";
import { FeatureGrid } from "@/components/feature-grid";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Platform",
  description: "ECHO Platform overview, architecture layers, PackOS, runtime lanes, and Native Loader direction.",
  path: "/platform"
});

const architectureLayers = [
  {
    title: "Official Experiences",
    items: ["Ashfall", "ECHO Prime", "Future ECHO Worlds"]
  },
  {
    title: "Player Layer",
    items: ["ECHO Launcher", "Download Channels", "Repair Tools", "Update Flow"]
  },
  {
    title: "Pack Layer",
    items: ["PackOS", "Manifests", "Lockfiles", "Channels", "Snapshots", "Release Gates"]
  },
  {
    title: "Module Layer",
    items: ["Core Modules", "UI Modules", "Gameplay Modules", "World Modules", "Progression Modules"]
  },
  {
    title: "Runtime Contract Layer",
    items: ["Registries", "Services", "Events", "Data Ownership", "Networking", "Save Compatibility"]
  },
  {
    title: "Runtime Lane Layer",
    items: ["Native Loader", "NeoForge Compatibility Backend", "Standalone Parity Harness", "Resource Bridge", "Registry Bridge", "Content Bridge"]
  },
  {
    title: "Native Loader Runtime",
    items: ["World Runtime", "Entity Runtime", "Item Runtime", "UI Runtime", "Renderer Runtime", "Save Runtime", "Networking Runtime"]
  }
];

export default function PlatformPage() {
  return (
    <>
      <HeroSection
        compact
        eyebrow="Platform Overview"
        title="ECHO Platform"
        kicker="The foundation behind ECHO experiences."
        description="A modular architecture for launcher-managed worlds, first-party systems, PackOS validation, runtime contracts, and future native ECHO games."
        actions={[
          { label: "Explore Modules", href: "/modules" },
          { label: "Developer Docs", href: "/developers", variant: "secondary" }
        ]}
      />

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Architecture"
          title="Native Loader first, with explicit compatibility and parity lanes."
          description="Native Loader is the primary future platform lane. NeoForge remains the compatibility backend for Minecraft play, Standalone Runtime is the parity harness, and AdapterCore keeps gameplay contracts shared across them."
        />
        <div className="mt-8">
          <ArchitectureDiagram layers={architectureLayers} />
        </div>
      </section>

      <section className="section-shell py-16">
        <CyberGlassCard className="p-8">
          <p className="cyber-label">Key Message</p>
          <h2 className="mt-4 max-w-4xl font-display text-3xl font-bold text-echo-text">
            ECHO is currently Minecraft-compatible, but it is not architecturally
            limited to being only a modpack.
          </h2>
          <p className="mt-5 max-w-4xl text-base leading-8 text-echo-muted">
            The platform is being built around contracts, adapters, validation,
            tooling, and reusable systems so official ECHO experiences can evolve
            through Native Loader first while keeping NeoForge fallback and Standalone parity honest.
          </p>
        </CyberGlassCard>
      </section>

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Platform Systems"
          title="The operational pieces that make ECHO feel official."
          description="The site separates the platform into clear responsibilities so players, developers, and contributors can understand where each system fits."
        />
        <div className="mt-8">
          <FeatureGrid
            columns="two"
            items={[
              {
                title: "PackOS",
                description: "Manifest, lockfile, channel, snapshot, release gate, and future integrity layer for official experiences.",
                icon: "shield"
              },
              {
                title: "AdapterCore",
                description: "Shared gameplay contract that keeps runtime-specific concerns behind Native Loader, NeoForge, and Standalone hosts.",
                icon: "network"
              },
              {
                title: "Runtime Contracts",
                description: "Services, registries, events, data ownership, and networking surfaces that can outlive a single runtime.",
                icon: "braces"
              },
              {
                title: "Command Center",
                description: "Developer-side scanning, validation, promotion, and pack rebuild workflows for ECHO releases.",
                icon: "terminal"
              }
            ]}
          />
        </div>
      </section>
    </>
  );
}
