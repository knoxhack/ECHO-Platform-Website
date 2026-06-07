import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { FeatureGrid } from "@/components/feature-grid";
import { CyberGlassCard } from "@/components/cyber-glass-card";
import { StatusBadge } from "@/components/status-badge";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "ECHO Addon Studio",
  description:
    "The official desktop IDE for creating, testing, and publishing ECHO Native and Standalone addons.",
  path: "/addons-studio"
});

const studioFeatures = [
  {
    title: "SDK Detection",
    description:
      "Automatically detects the installed ECHO SDK version and suggests compatible templates and build targets.",
    icon: "search" as const
  },
  {
    title: "Multi-Target Templates",
    description:
      "Create projects for Native, Standalone, or dual-target addons with optional NeoForge compatibility.",
    icon: "target" as const
  },
  {
    title: "Manifest Editor",
    description:
      "Visual echo.mod.json editor with validation, autocomplete, and PackOS policy checking.",
    icon: "file" as const
  },
  {
    title: "Build for Each Target",
    description:
      "One-click builds for Native, Standalone, and NeoForge from the same project source.",
    icon: "hammer" as const
  },
  {
    title: "Local Runtime Testing",
    description:
      "Launch the Standalone Runtime directly from the studio to test addons without leaving the IDE.",
    icon: "play" as const
  },
  {
    title: "Publish Assistant",
    description:
      "Prepares release assets, generates checksums, and creates GitHub Release drafts with proper metadata.",
    icon: "upload" as const
  }
];

export default function AddonsStudioPage() {
  return (
    <>
      <HeroSection
        compact
        eyebrow="Creator Tool"
        title="ECHO Addon Studio"
        kicker="Build addons for the ECHO Platform."
        description="The official desktop IDE for ECHO addon developers. Create Native and Standalone addons from templates, edit manifests visually, build for multiple targets, and publish through GitHub Releases."
        actions={[
          { label: "Download", href: "/download", variant: "primary" },
          { label: "Read SDK Docs", href: "/sdk", variant: "secondary" },
          { label: "View on GitHub", href: siteConfig.links.github, variant: "secondary" }
        ]}
      />

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to build and ship an addon."
          description="Addon Studio is not a text editor. It is a purpose-built environment for the ECHO addon lifecycle."
        />
        <div className="mt-8">
          <FeatureGrid items={studioFeatures} />
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-5 lg:grid-cols-2">
          <CyberGlassCard className="p-8">
            <p className="cyber-label">New in this release</p>
            <h2 className="mt-4 font-display text-2xl font-bold text-echo-text">
              Native and Standalone support.
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-echo-muted">
              <li className="flex items-center gap-2">
                <StatusBadge label="New" />
                <span>SDK detection and version selector</span>
              </li>
              <li className="flex items-center gap-2">
                <StatusBadge label="New" />
                <span>Native, Standalone, and dual-target templates</span>
              </li>
              <li className="flex items-center gap-2">
                <StatusBadge label="New" />
                <span>Manifest editor with live validation</span>
              </li>
              <li className="flex items-center gap-2">
                <StatusBadge label="New" />
                <span>Standalone Runtime preview and testing</span>
              </li>
              <li className="flex items-center gap-2">
                <StatusBadge label="New" />
                <span>Publish assistant for GitHub Releases</span>
              </li>
            </ul>
            <Link href="/download" className="cyber-button cyber-button-primary mt-6 w-fit">
              Download Addon Studio
            </Link>
          </CyberGlassCard>

          <CyberGlassCard className="p-8">
            <p className="cyber-label">System Requirements</p>
            <h2 className="mt-4 font-display text-2xl font-bold text-echo-text">
              Windows and Linux.
            </h2>
            <p className="mt-4 text-sm leading-6 text-echo-muted">
              Addon Studio runs on Windows 10+ and modern Linux distributions.
              It requires a 64-bit system and approximately 200 MB of disk space.
            </p>
            <div className="mt-4 space-y-2 text-sm text-echo-muted">
              <p>Windows: Windows 10 version 1903 or later</p>
              <p>Linux: Ubuntu 20.04+, Fedora 35+, or equivalent</p>
            </div>
          </CyberGlassCard>
        </div>
      </section>
    </>
  );
}
