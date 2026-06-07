import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { FeatureGrid } from "@/components/feature-grid";
import { CyberGlassCard } from "@/components/cyber-glass-card";
import { StatusBadge } from "@/components/status-badge";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Native Platform",
  description:
    "ECHO Native Platform: the runtime-independent foundation for ECHO modules, Native Loader, and Standalone Runtime.",
  path: "/native-platform"
});

const nativeFeatures = [
  {
    title: "Runtime Independent",
    description:
      "The Native Platform decouples ECHO modules from NeoForge lifecycle, enabling faster iteration and cleaner architecture.",
    icon: "cpu" as const
  },
  {
    title: "Native Loader",
    description:
      "Primary launch lane for Ashfall and future experiences. Replaces the NeoForge dependency for player installs.",
    icon: "loader" as const
  },
  {
    title: "Modular Core",
    description:
      "Core services, registries, networking, and data layers are platform-native, not adapter wrappers.",
    icon: "layers" as const
  },
  {
    title: "Addon API",
    description:
      "A stable addon surface for registering content, missions, screens, recipes, and worldgen without NeoForge hooks.",
    icon: "puzzle" as const
  },
  {
    title: "Standalone Runtime",
    description:
      "An experimental runtime for testing addons and behavior outside the full Minecraft/NeoForge stack.",
    icon: "box" as const
  },
  {
    title: "Deterministic Builds",
    description:
      "Reproducible release artifacts with SBOM, checksums, and license notices for every module.",
    icon: "shield" as const
  }
];

export default function NativePlatformPage() {
  return (
    <>
      <HeroSection
        compact
        eyebrow="Platform Foundation"
        title="ECHO Native Platform"
        kicker="Runtime-independent. Modular. Ready for alpha."
        description="The Native Platform is the new foundation for ECHO. It powers the Native Loader, the Standalone Runtime, and the next generation of ECHO addons."
        actions={[
          { label: "Download Launcher", href: "/download", variant: "primary" },
          { label: "Read SDK Docs", href: "/sdk", variant: "secondary" },
          { label: "Standalone Runtime", href: "/standalone-runtime", variant: "secondary" }
        ]}
      />

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Why Native Platform"
          title="Built for the future of ECHO."
          description="NeoForge compatibility is preserved where needed, but the Native Platform is where new development happens."
        />
        <div className="mt-8">
          <FeatureGrid items={nativeFeatures} />
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <CyberGlassCard className="p-8">
            <p className="cyber-label">Architecture</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-echo-text">
              From adapters to first-class platform.
            </h2>
            <p className="mt-5 max-w-5xl text-base leading-7 text-echo-muted">
              The Native Platform replaces adapter-based module loading with
              first-class service contracts. Modules declare their capabilities;
              the platform resolves dependencies, validates manifests, and
              orchestrates initialization without NeoForge mod-loading ceremony.
            </p>
            <ol className="mt-6 space-y-3 text-sm leading-6 text-echo-muted">
              {[
                "Manifest-driven module discovery",
                "Capability-based service registry",
                "Network layer decoupled from Minecraft networking",
                "Data layer with typed schemas and migration paths",
                "UI layer with screen providers and overlay system"
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
            <p className="cyber-label">Status</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-echo-text">
              Public Alpha
            </h2>
            <p className="mt-4 text-sm leading-6 text-echo-muted">
              The Native Platform is in public alpha. Core services are stable.
              Addon APIs are maturing. Standalone Runtime is experimental.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <StatusBadge label="Core: Stable" />
              <StatusBadge label="Native Loader: Beta" />
              <StatusBadge label="Addon API: Alpha" />
              <StatusBadge label="Standalone: Experimental" />
            </div>
            <Link href="/download" className="cyber-button cyber-button-primary mt-6 w-fit">
              Try the Launcher
            </Link>
          </CyberGlassCard>
        </div>
      </section>
    </>
  );
}
