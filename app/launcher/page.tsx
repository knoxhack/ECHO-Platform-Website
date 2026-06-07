import type { Metadata } from "next";
import Link from "next/link";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { FeatureGrid } from "@/components/feature-grid";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Launcher",
  description: "ECHO Launcher product page for installing, updating, repairing, validating, and launching official ECHO experiences.",
  path: "/launcher"
});

export default function LauncherPage() {
  return (
    <>
      <HeroSection
        compact
        eyebrow="Player Gateway"
        title="ECHO Launcher"
        kicker="The official gateway to ECHO experiences."
        description="Install, update, repair, validate, and launch official ECHO packs like Ashfall."
        actions={[
          { label: "Open Download Portal", href: siteConfig.links.download },
          { label: "Launcher Setup Docs", href: siteConfig.links.launcherDocs, variant: "secondary" },
          { label: "View Media", href: siteConfig.links.media, variant: "secondary" },
          { label: "View GitHub Releases", href: siteConfig.links.githubReleases, variant: "secondary" }
        ]}
      />

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Main Features"
          title="A serious launcher surface for an ecosystem, not a zip-file handoff."
          description="ECHO Launcher is the official way to install, update, repair, validate, and prepare official experiences so players can focus on playing."
        />
        <div className="mt-8">
          <FeatureGrid
            items={[
              {
                title: "Official ECHO Pack Install",
                description: "Install Ashfall and future official ECHO experiences from approved release channels.",
                icon: "download"
              },
              {
                title: "Minecraft Launcher Handoff",
                description: "Prepare the official profile and hand off to the Minecraft Launcher for normal play.",
                icon: "route"
              },
              {
                title: "Windows and Linux Support",
                description: "Designed around Windows and Linux distribution paths. Direct installer buttons appear on the download portal only when release assets are published.",
                icon: "install"
              },
              {
                title: "Repair and Diagnostics",
                description: "Detect missing launcher dependencies, invalid paths, stale files, locked jars, and broken installs.",
                icon: "wrench"
              },
              {
                title: "PackOS-Ready",
                description: "Designed to support manifests, channels, lockfiles, snapshots, integrity checks, and release validation.",
                icon: "shield"
              },
              {
                title: "Developer-Aware",
                description: "Works with Command Center, build outputs, jar promotion, release exports, and module state.",
                icon: "terminal"
              }
            ]}
          />
        </div>
      </section>

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Launcher Flow"
          title="From selected experience to playable profile."
          description="The launcher selects an explicit runtime lane: Native Loader first, NeoForge compatibility fallback when requested or blocked, and Standalone parity when checking runtime behavior."
        />
        <div className="mt-8">
          <ArchitectureDiagram
            layers={[
              { title: "ECHO Launcher", items: ["Select Experience"] },
              { title: "Install / Update / Repair", items: ["Dependencies", "Files", "Diagnostics"] },
              { title: "Validate Pack State", items: ["Manifest", "Lockfile", "Channel", "Future PackOS"] },
              { title: "Prepare Runtime Lane", items: ["Native Loader", "NeoForge Fallback", "Standalone Parity"] },
              { title: "Launch Experience", items: ["Ashfall", "Support Bundle Lane Evidence"] }
            ]}
          />
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="cyber-panel rounded-[6px] p-8">
          <p className="cyber-label">Download Area</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-echo-text">
            Choose your platform.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-echo-muted">
            The download page separates Windows, Linux, advanced release access, and
            source access so players and developers do not have to follow the same path.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/download" className="cyber-button cyber-button-primary">
              Open Download Portal
            </Link>
            <Link href="/docs/install/launcher" className="cyber-button cyber-button-secondary">
              Launcher Setup Docs
            </Link>
            <Link href="/media" className="cyber-button cyber-button-secondary">
              View Media
            </Link>
            <Link href={siteConfig.links.githubReleases} className="cyber-button cyber-button-secondary">
              GitHub Releases
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
