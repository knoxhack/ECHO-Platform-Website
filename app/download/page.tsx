import type { Metadata } from "next";
import Link from "next/link";
import downloads from "@/data/downloads.json";
import { DownloadCard, type DownloadRecord } from "@/components/download-card";
import { HeroSection } from "@/components/hero-section";
import { ReleaseAssetTable, ReleaseQuickLinks } from "@/components/release-asset-table";
import { ReleaseNotes } from "@/components/release-notes";
import { SectionHeading } from "@/components/section-heading";
import { StatusBadge } from "@/components/status-badge";
import { pageMetadata, siteConfig } from "@/lib/site";
import { packUpdateLink } from "@/lib/install-links";
import { approvedEntries, getReleaseIndexCatalog } from "@/lib/release-index";
import {
  assetsByKind,
  formatBytes,
  formatReleaseDate,
  getEchoReleases,
  type ReleaseAsset
} from "@/lib/releases";

export const metadata: Metadata = pageMetadata({
  title: "Download",
  description:
    "ECHO download portal for launcher setup, Release Index metadata, official experience editions, module artifacts, checksums, and source access.",
  path: "/download"
});

export default async function DownloadPage() {
  const releases = await getEchoReleases();
  const releaseIndexCatalog = await getReleaseIndexCatalog();
  const latest = releases[0];
  const downloadRecords = downloads as DownloadRecord[];
  const indexedModpacks = approvedEntries(releaseIndexCatalog.entries, "modpack");
  const updateTargets = indexedModpacks.length
    ? indexedModpacks.map((entry) => ({ id: entry.id, label: `Update ${packLabel(entry.id)}` }))
    : [
        { id: "ashfall-native-edition", label: "Update Native Pack" },
        { id: "ashfall-neoforge-edition", label: "Update NeoForge Pack" },
        { id: "ashfall-standalone-edition", label: "Update Standalone Pack" }
      ];
  const packAssets = [
    ...assetsByKind(latest, "native-platform-package"),
    ...assetsByKind(latest, "standalone-runtime"),
    ...assetsByKind(latest, "echo-pack"),
    ...assetsByKind(latest, "pack-manifest"),
    ...assetsByKind(latest, "release-metadata")
  ];
  const moduleAssets = [
    ...assetsByKind(latest, "module-jar"),
    ...assetsByKind(latest, "native-addon")
  ];
  const verificationAssets = [
    ...assetsByKind(latest, "checksums"),
    ...assetsByKind(latest, "qa-report")
  ];
  const otherAssets = latest.assets.filter((asset) => asset.kind === "other");

  return (
    <>
      <HeroSection
        compact
        eyebrow="Downloads"
        title="ECHO Download Portal"
        kicker="Launcher first, Release Index accurate."
        description="Start with the launcher path. The page is generated from the Release Index snapshot so official experience editions, launcher installers, module artifacts, PackOS metadata, checksums, and studio app releases stay visible together."
        actions={[
          { label: "Open Launcher Page", href: "/launcher" },
          { label: "Launcher Setup Docs", href: siteConfig.links.launcherDocs, variant: "secondary" },
          { label: "Release Index Catalog", href: "/release-index", variant: "secondary" }
        ]}
      />

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Featured Downloads"
          title="Correct product, correct file."
          description="Each button is pinned to an owning repository and filename pattern. Launcher buttons target launcher assets, studio buttons target studio assets, and experience buttons target the selected edition package."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {downloadRecords.map((download) => (
            <div key={download.id} id={download.id}>
              <DownloadCard download={download} asset={findDownloadAsset(latest.assets, download)} />
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="cyber-panel rounded-[6px] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="cyber-label">Latest Release Catalog</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-echo-text sm:text-4xl">
                {latest.title}
              </h2>
              <p className="mt-4 max-w-4xl text-base leading-7 text-echo-muted">
                Snapshot generated {formatReleaseDate(latest.publishedAt)} from tag{" "}
                <span className="font-mono text-echo-text">{latest.tag}</span>. Release assets
                are exposed here as website downloads while GitHub Releases remain the verified
                storage backend.
              </p>
              <ReleaseQuickLinks
                assets={latest.assets}
                kinds={["echo-pack", "pack-manifest", "release-metadata"]}
              />
            </div>
            <div className="grid min-w-0 gap-3 sm:grid-cols-3 lg:min-w-[360px] lg:grid-cols-1">
          <ReleaseMetric label="Assets" value={latest.assets.length.toString()} />
              <ReleaseMetric label="Package Size" value={formatPackageSize(packAssets)} />
              <ReleaseMetric
                label="Channel"
                value={latest.prerelease ? "Prerelease" : "Public"}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <StatusBadge label={latest.prerelease ? "Prerelease" : "Public Release"} />
            <StatusBadge label={`${packAssets.length} PackOS Assets`} />
            <StatusBadge label={`${moduleAssets.length} Module Jars`} />
            <StatusBadge label={`${verificationAssets.length} Verification Assets`} />
          </div>

          <div className="mt-8 border-t border-white/10 pt-8">
            <div className="flex flex-wrap gap-3">
              <Link href="/launcher" className="cyber-button cyber-button-primary">
                Open Launcher Page
              </Link>
              {updateTargets.map((target) => (
                <a key={target.id} href={packUpdateLink(target.id)} className="cyber-button cyber-button-secondary">
                  {target.label}
                </a>
              ))}
              <Link href={latest.htmlUrl} className="cyber-button cyber-button-secondary">
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell space-y-5 py-16">
        <SectionHeading
          eyebrow="Release Assets"
          title="PackOS metadata, pack archive, and module artifacts."
          description="Checksums come directly from GitHub release asset digests. Manual downloads are useful for verification and testing, while normal players should stay with the launcher flow."
        />
        <ReleaseAssetTable
          title="Official Experience Package Assets"
          description="Native Platform, Standalone Runtime, SDK/addon, PackOS, and release metadata assets used by the launcher-managed install path."
          assets={packAssets}
        />
        <ReleaseAssetTable
          title="Module Artifacts"
          description="First-party ECHO module jars and .echo-addon packages included in the latest catalog. The launcher uses these for individual module updates."
          assets={moduleAssets}
          compact
        />
        <ReleaseAssetTable
          title="Verification Assets"
          description="Checksums, QA reports, and release proof files for testers and developers."
          assets={verificationAssets}
          compact
        />
        <ReleaseAssetTable
          title="Other Assets"
          description="Additional uploaded assets that do not match the current release classification rules."
          assets={otherAssets}
        />
      </section>

      <section className="section-shell py-16">
        <div className="cyber-panel rounded-[6px] p-6 sm:p-8">
          <p className="cyber-label">Release Notes</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-echo-text">
            Notes from {latest.title}
          </h2>
          <ReleaseNotes markdown={latest.body} />
        </div>
      </section>

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Release History"
          title="Recent public releases."
          description="Static export captures the visible GitHub release list during build. Rebuild the site to refresh this history."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {releases.slice(0, 6).map((release) => (
            <Link
              key={release.id}
              href={release.htmlUrl}
              className="cyber-panel rounded-[6px] p-5 transition hover:border-echo-cyan/55 hover:bg-echo-cyan/5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="cyber-label">{release.tag}</p>
                  <h3 className="mt-3 font-display text-xl font-bold text-echo-text">
                    {release.title}
                  </h3>
                </div>
                <StatusBadge label={release.prerelease ? "Prerelease" : "Public"} />
              </div>
              <p className="mt-4 text-sm text-echo-muted">
                {formatReleaseDate(release.publishedAt)} - {release.assets.length} assets
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function findDownloadAsset(
  assets: ReleaseAsset[],
  download: DownloadRecord
): ReleaseAsset | undefined {
  if (!download.assetKind) return undefined;

  const includes = download.assetNameIncludes?.map((value) => value.toLowerCase()) ?? [];
  const excludes = download.assetNameExcludes?.map((value) => value.toLowerCase()) ?? [];

  return assets.find((asset) => {
    const name = asset.name.toLowerCase();
    if (asset.kind !== download.assetKind) return false;
    if (download.assetRepoName && asset.repositoryName !== download.assetRepoName) return false;
    if (includes.some((value) => !name.includes(value))) return false;
    if (excludes.some((value) => name.includes(value))) return false;
    return true;
  });
}

function ReleaseMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[5px] border border-white/10 bg-white/[0.035] p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-echo-muted">{label}</p>
      <p className="mt-2 font-display text-xl font-bold text-echo-text">{value}</p>
    </div>
  );
}

function formatPackageSize(assets: ReleaseAsset[]) {
  const total = assets.reduce((sum, asset) => sum + asset.size, 0);
  return formatBytes(total);
}

function packLabel(id: string) {
  return id
    .replace(/^ashfall-/, "")
    .replace(/-edition$/, "")
    .split("-")
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(" ");
}
