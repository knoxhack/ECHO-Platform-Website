import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { FeatureGrid } from "@/components/feature-grid";
import { CyberGlassCard } from "@/components/cyber-glass-card";
import { StatusBadge } from "@/components/status-badge";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "ECHO Developer Studio",
  description:
    "The release and operator console for the ECHO Platform. View reports, manage releases, validate manifests, and prepare GitHub Releases.",
  path: "/developer-studio"
});

const devStudioFeatures = [
  {
    title: "Plan 3 Report Viewer",
    description:
      "View module release matrices, SBOMs, reproducibility reports, and artifact audits from the latest release plan.",
    icon: "file" as const
  },
  {
    title: "QA Status Dashboard",
    description:
      "Real-time overview of build status, test results, artifact validation, and release readiness across all modules.",
    icon: "gauge" as const
  },
  {
    title: "Release Assistant",
    description:
      "Step through manifest generation, release notes editing, artifact signing, and GitHub Release draft creation.",
    icon: "rocket" as const
  },
  {
    title: "Artifact Validation",
    description:
      "Verify checksums, inspect SBOM components, and confirm artifact completeness before publishing.",
    icon: "shield" as const
  },
  {
    title: "Launcher Manifest Preview",
    description:
      "Preview how the launcher will see your release metadata before it goes live.",
    icon: "eye" as const
  },
  {
    title: "Website Preview",
    description:
      "Preview release content as it will appear on the official website, including download cards and release notes.",
    icon: "monitor" as const
  }
];

export default function DeveloperStudioPage() {
  return (
    <>
      <HeroSection
        compact
        eyebrow="Operator Console"
        title="ECHO Developer Studio"
        kicker="Release, operate, and validate the platform."
        description="Developer Studio is the control center for ECHO platform operators. It provides report viewers, QA dashboards, release assistants, and manifest validation tools to ship the platform with confidence."
        actions={[
          { label: "Download", href: "/download", variant: "primary" },
          { label: "View on GitHub", href: siteConfig.links.github, variant: "secondary" }
        ]}
      />

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Features"
          title="A console for platform release operations."
          description="Developer Studio turns raw build output into release decisions."
        />
        <div className="mt-8">
          <FeatureGrid items={devStudioFeatures} />
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-5 lg:grid-cols-2">
          <CyberGlassCard className="p-8">
            <p className="cyber-label">New in this release</p>
            <h2 className="mt-4 font-display text-2xl font-bold text-echo-text">
              Release-focused tooling.
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-echo-muted">
              <li className="flex items-center gap-2">
                <StatusBadge label="New" />
                <span>Plan 3 report viewer and QA dashboard</span>
              </li>
              <li className="flex items-center gap-2">
                <StatusBadge label="New" />
                <span>Artifact checksum and SBOM viewer</span>
              </li>
              <li className="flex items-center gap-2">
                <StatusBadge label="New" />
                <span>GitHub Release preparation assistant</span>
              </li>
              <li className="flex items-center gap-2">
                <StatusBadge label="New" />
                <span>Launcher manifest and website preview</span>
              </li>
              <li className="flex items-center gap-2">
                <StatusBadge label="New" />
                <span>Public release checklist</span>
              </li>
            </ul>
            <Link href="/download" className="cyber-button cyber-button-primary mt-6 w-fit">
              Download Developer Studio
            </Link>
          </CyberGlassCard>

          <CyberGlassCard className="p-8">
            <p className="cyber-label">Who is it for?</p>
            <h2 className="mt-4 font-display text-2xl font-bold text-echo-text">
              Platform operators and release managers.
            </h2>
            <p className="mt-4 text-sm leading-6 text-echo-muted">
              Developer Studio is designed for the team responsible for shipping
              ECHO releases. It requires access to the platform workspace, Gradle
              builds, and GitHub release assets.
            </p>
            <div className="mt-4 space-y-2 text-sm text-echo-muted">
              <p>View build reports and diagnostics</p>
              <p>Manage release versions and changelogs</p>
              <p>Validate artifacts before publishing</p>
              <p>Prepare GitHub Release drafts</p>
            </div>
          </CyberGlassCard>
        </div>
      </section>
    </>
  );
}
