import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { CyberGlassCard } from "@/components/cyber-glass-card";
import { FeatureGrid, type FeatureItem } from "@/components/feature-grid";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { StatusBadge } from "@/components/status-badge";
import { getProductsByRepos, type ProductRecord } from "@/lib/products";

export function ProductDetailPage({ product }: { product: ProductRecord }) {
  const related = getProductsByRepos(product.relatedRepos);

  return (
    <>
      <HeroSection
        compact
        eyebrow={product.releaseKind}
        title={product.product}
        kicker={product.tagline}
        description={product.description}
        actions={[
          { label: "Downloads", href: product.downloadHref },
          { label: "Docs", href: product.docsHref, variant: "secondary" },
          { label: "GitHub", href: product.repoUrl, variant: "secondary" },
          { label: "Release", href: product.releaseUrl, variant: "secondary" }
        ]}
      />

      <section className="section-shell py-16">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <CyberGlassCard className="p-8">
            <p className="cyber-label">Repository Ownership</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-echo-text">
              {product.repoName}
            </h2>
            <p className="mt-5 text-base leading-7 text-echo-muted">{product.publicRole}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={product.repoUrl} className="cyber-button cyber-button-primary">
                <Github size={16} />
                Source Repository
              </Link>
              <Link href={product.releasesUrl} className="cyber-button cyber-button-secondary">
                <ExternalLink size={16} />
                Releases
              </Link>
            </div>
          </CyberGlassCard>

          <CyberGlassCard className="p-8">
            <p className="cyber-label">Release State</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <StatusBadge label={product.status} />
              <StatusBadge label={`${product.assetCount} assets`} />
              <StatusBadge label={product.releaseKind} />
            </div>
            <p className="mt-5 text-sm leading-6 text-echo-muted">{product.updateFlow}</p>
            {product.contentGraphEvidence ? (
              <div className="mt-6 border-t border-white/10 pt-5 text-sm leading-6 text-echo-muted">
                <p className="cyber-label">Content Graph Evidence</p>
                <p className="mt-3 text-echo-text">{product.contentGraphEvidence.artifact}</p>
                <p className="mt-2">{product.contentGraphEvidence.schemaVersion}</p>
                <p className="mt-2">{product.contentGraphEvidence.availability}</p>
                {product.contentGraphEvidence.releaseSources?.length ? (
                  <div className="mt-4 space-y-2">
                    {product.contentGraphEvidence.releaseSources.map((source) => (
                      <p key={source.releaseTag} className="text-xs text-echo-muted">
                        <span className="text-echo-text">
                          {source.primaryFullRelease ? "Full release evidence" : "Partial hotfix evidence"}
                        </span>
                        {`: ${source.moduleRows} module row(s) from ${source.releaseTag}`}
                      </p>
                    ))}
                  </div>
                ) : null}
                {product.contentGraphEvidence.nodeCount !== undefined ? (
                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs md:grid-cols-4">
                    {[
                      { label: "Modules", value: product.contentGraphEvidence.moduleCount },
                      { label: "Nodes", value: product.contentGraphEvidence.nodeCount },
                      { label: "Edges", value: product.contentGraphEvidence.edgeCount },
                      { label: "Features", value: product.contentGraphEvidence.featureCount },
                      { label: "Export plans", value: product.contentGraphEvidence.exportPlanCount },
                      { label: "Hytale blockers", value: product.contentGraphEvidence.hytaleBlockerCount }
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-[5px] border border-white/10 bg-white/[0.035] p-3">
                        <p className="text-echo-muted">{label}</p>
                        <p className="mt-1 font-display text-lg font-bold text-echo-text">{value}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </CyberGlassCard>
        </div>
      </section>

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Capabilities"
          title="What this product owns."
          description="Each product page is wired to its owning repository, release surface, docs entry, and launcher/update role."
        />
        <div className="mt-8">
          <FeatureGrid
            columns="three"
            items={product.features.map((feature) => ({
              ...feature,
              icon: feature.icon as FeatureItem["icon"]
            }))}
          />
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-5 lg:grid-cols-2">
          <CyberGlassCard className="p-8">
            <p className="cyber-label">Release Artifacts</p>
            <h2 className="mt-4 font-display text-2xl font-bold text-echo-text">
              Files that belong here.
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-echo-muted">
              {product.artifacts.map((artifact) => (
                <li key={artifact} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-echo-cyan" />
                  <span>{artifact}</span>
                </li>
              ))}
            </ul>
          </CyberGlassCard>

          <CyberGlassCard className="p-8">
            <p className="cyber-label">Related Repos</p>
            <h2 className="mt-4 font-display text-2xl font-bold text-echo-text">
              Connected release flow.
            </h2>
            <div className="mt-5 grid gap-3">
              {related.map((entry) => (
                <Link
                  key={entry.repoName}
                  href={entry.route}
                  className="rounded-[5px] border border-white/10 bg-white/[0.035] p-4 transition hover:border-echo-cyan/40 hover:bg-echo-cyan/10"
                >
                  <span className="font-display text-lg font-bold text-echo-text">{entry.product}</span>
                  <span className="mt-1 block text-sm leading-6 text-echo-muted">{entry.tagline}</span>
                </Link>
              ))}
            </div>
          </CyberGlassCard>
        </div>
      </section>
    </>
  );
}
