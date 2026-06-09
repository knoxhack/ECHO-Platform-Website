import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { FeatureGrid } from "@/components/feature-grid";
import { CyberGlassCard } from "@/components/cyber-glass-card";
import { StatusBadge } from "@/components/status-badge";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Official SDK",
  description:
    "The official ECHO SDK for building Native and Standalone addons, including templates, manifest schemas, and build tooling.",
  path: "/sdk"
});

const sdkFeatures = [
  {
    title: "Native Addon Templates",
    description:
      "Start with official templates for Native addons that target the ECHO Native Platform directly.",
    icon: "template" as const
  },
  {
    title: "Standalone Addon Templates",
    description:
      "Build addons that run in the Standalone Runtime without NeoForge dependencies.",
    icon: "box" as const
  },
  {
    title: "Manifest Schemas",
    description:
      "Strict echo.mod.json schemas with validation, autocomplete, and PackOS policy checking.",
    icon: "file" as const
  },
  {
    title: "Build Targets",
    description:
      "One project builds for Native, Standalone, and optional NeoForge compatibility.",
    icon: "target" as const
  },
  {
    title: "ECHO Addon Studio",
    description:
      "The official desktop IDE for creating, testing, and publishing addons.",
    icon: "app" as const
  },
  {
    title: "GitHub Release Publishing",
    description:
      "Built-in publish assistant prepares release assets, checksums, and manifests for GitHub.",
    icon: "upload" as const
  }
];

export default function SdkPage() {
  return (
    <>
      <HeroSection
        compact
        eyebrow="Developer Tools"
        title="ECHO Official SDK"
        kicker="Build on top of ECHO, not inside it."
        description="The public SDK provides everything you need to create Native and Standalone addons: templates, manifest editors, build tooling, and a clear path to publishing."
        actions={[
          { label: "Download Addon Studio", href: "/download", variant: "primary" },
          { label: "Read Addon Docs", href: "/docs/sdk/native-addon-guide", variant: "secondary" },
          { label: "View Native Platform", href: "/native-platform", variant: "secondary" }
        ]}
      />

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="What is included"
          title="Templates, schemas, tools, and a path to release."
          description="The SDK is not just a spec. It is a working toolchain that takes an idea from template to published GitHub release."
        />
        <div className="mt-8">
          <FeatureGrid items={sdkFeatures} />
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-5 lg:grid-cols-2">
          <CyberGlassCard className="p-8">
            <p className="cyber-label">Native Addon</p>
            <h2 className="mt-4 font-display text-2xl font-bold text-echo-text">
              Targets the ECHO Native Platform
            </h2>
            <p className="mt-4 text-sm leading-6 text-echo-muted">
              Native addons use the ECHO Native Loader runtime. They have direct
              access to platform services, registries, and the modular core without
              NeoForge indirection.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-echo-muted">
              <li className="flex items-center gap-2">
                <StatusBadge label="Recommended" />
                <span>Best performance and compatibility</span>
              </li>
              <li className="flex items-center gap-2">
                <StatusBadge label="Public Alpha" />
                <span>Ready for testing and early addons</span>
              </li>
            </ul>
            <Link href="/native-platform" className="cyber-button cyber-button-primary mt-6 w-fit">
              Learn About Native Platform
            </Link>
          </CyberGlassCard>

          <CyberGlassCard className="p-8">
            <p className="cyber-label">Standalone Addon</p>
            <h2 className="mt-4 font-display text-2xl font-bold text-echo-text">
              Runs in the Standalone Runtime
            </h2>
            <p className="mt-4 text-sm leading-6 text-echo-muted">
              Standalone addons run outside NeoForge entirely. They are perfect for
              lightweight tools, server utilities, and experimental gameplay systems
              that do not need Minecraft-mod compatibility.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-echo-muted">
              <li className="flex items-center gap-2">
                <StatusBadge label="Experimental" />
                <span>Alpha runtime, great for testing</span>
              </li>
              <li className="flex items-center gap-2">
                <StatusBadge label="Sandbox" />
                <span>Isolated from NeoForge lifecycle</span>
              </li>
            </ul>
            <Link href="/standalone-runtime" className="cyber-button cyber-button-primary mt-6 w-fit">
              Explore Standalone Runtime
            </Link>
          </CyberGlassCard>
        </div>
      </section>

      <section className="section-shell py-16">
        <CyberGlassCard className="p-8">
          <p className="cyber-label">Quickstart</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-echo-text">
            Start building in three steps.
          </h2>
          <ol className="mt-6 space-y-4 text-sm leading-6 text-echo-muted">
            {[
              "Download and install ECHO Addon Studio.",
              "Create a new project from the Native or Standalone template.",
              "Build, test locally, and publish through the publish-assistant panel."
            ].map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[4px] border border-echo-cyan/25 bg-echo-cyan/10 font-mono text-xs text-echo-cyan">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/download" className="cyber-button cyber-button-primary">
              Download Addon Studio
            </Link>
            <Link href="/docs/sdk/native-addon-guide" className="cyber-button cyber-button-secondary">
              Read Addon Docs
            </Link>
          </div>
        </CyberGlassCard>
      </section>
    </>
  );
}
