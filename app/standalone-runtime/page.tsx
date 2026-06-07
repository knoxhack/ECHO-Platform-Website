import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { FeatureGrid } from "@/components/feature-grid";
import { CyberGlassCard } from "@/components/cyber-glass-card";
import { StatusBadge } from "@/components/status-badge";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Standalone Runtime",
  description:
    "ECHO Standalone Runtime: an experimental alpha runtime for testing addons and behavior outside NeoForge and Minecraft.",
  path: "/standalone-runtime"
});

const standaloneFeatures = [
  {
    title: "No NeoForge Required",
    description:
      "Run ECHO addons in a lightweight runtime that does not depend on the full Minecraft/NeoForge stack.",
    icon: "unlink" as const
  },
  {
    title: "Addon Test Harness",
    description:
      "Validate addon behavior, lifecycle, and data schemas in isolation before targeting the full game.",
    icon: "test" as const
  },
  {
    title: "Fast Iteration",
    description:
      "Startup and reload times are significantly faster than a full Minecraft dev loop.",
    icon: "zap" as const
  },
  {
    title: "Headless Mode",
    description:
      "Run server-side logic and automated tests without a client or display attached.",
    icon: "server" as const
  }
];

export default function StandaloneRuntimePage() {
  return (
    <>
      <HeroSection
        compact
        eyebrow="Experimental"
        title="ECHO Standalone Runtime"
        kicker="Alpha runtime for addon testing and lightweight execution."
        description="The Standalone Runtime is an experimental alpha environment for running ECHO addons outside NeoForge. It is perfect for rapid addon development, automated testing, and headless server scenarios."
        actions={[
          { label: "Download Launcher", href: "/download", variant: "primary" },
          { label: "Read SDK Docs", href: "/sdk", variant: "secondary" },
          { label: "Native Platform", href: "/native-platform", variant: "secondary" }
        ]}
      />

      <section className="section-shell py-16">
        <CyberGlassCard className="p-8 border-amber-500/30">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <StatusBadge label="Public Alpha Warning" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-echo-text">
                This is an experimental alpha.
              </h2>
              <p className="mt-2 max-w-4xl text-base leading-7 text-echo-muted">
                The Standalone Runtime is not a replacement for the full game.
                APIs may change. Saves may break. Use it for testing, prototyping,
                and learning the addon surface, not for production player experiences.
              </p>
            </div>
          </div>
        </CyberGlassCard>
      </section>

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Capabilities"
          title="What you can do in Standalone Runtime."
          description="A focused runtime for focused work."
        />
        <div className="mt-8">
          <FeatureGrid items={standaloneFeatures} />
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-5 lg:grid-cols-2">
          <CyberGlassCard className="p-8">
            <p className="cyber-label">For Addon Developers</p>
            <h2 className="mt-4 font-display text-2xl font-bold text-echo-text">
              Test addons without the full game loop.
            </h2>
            <p className="mt-4 text-sm leading-6 text-echo-muted">
              Build a Standalone addon in ECHO Addon Studio, test it in the
              Standalone Runtime, and promote it to Native or NeoForge compatibility
              when it is ready.
            </p>
            <Link href="/sdk" className="cyber-button cyber-button-primary mt-6 w-fit">
              Explore the SDK
            </Link>
          </CyberGlassCard>

          <CyberGlassCard className="p-8">
            <p className="cyber-label">For Players</p>
            <h2 className="mt-4 font-display text-2xl font-bold text-echo-text">
              Try the Showcase from the Launcher.
            </h2>
            <p className="mt-4 text-sm leading-6 text-echo-muted">
              The ECHO Launcher includes the Standalone Runtime Showcase as an
              experimental entry. Download it, run it, and see how addons behave
              outside NeoForge.
            </p>
            <Link href="/download" className="cyber-button cyber-button-primary mt-6 w-fit">
              Get the Launcher
            </Link>
          </CyberGlassCard>
        </div>
      </section>
    </>
  );
}
