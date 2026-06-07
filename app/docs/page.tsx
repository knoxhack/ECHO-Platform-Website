import type { Metadata } from "next";
import Link from "next/link";
import { DocsCard } from "@/components/docs-card";
import { DocsSearch } from "@/components/docs/docs-search";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { docsSections, docHref } from "@/lib/docs";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Docs",
  description: "ECHO documentation home for players, developers, platform architecture, and troubleshooting.",
  path: "/docs"
});

export default function DocsPage() {
  return (
    <>
      <HeroSection
        compact
        eyebrow="Documentation"
        title="ECHO Docs"
        kicker="Player path. Developer path. Platform path."
        description="The docs home is split around the way people enter ECHO: install and play, build modules, understand the platform, or troubleshoot launcher flow."
        actions={[
          { label: "Player Docs", href: "#players" },
          { label: "Developer Docs", href: "#developers", variant: "secondary" },
          { label: "Platform Docs", href: "#platform", variant: "secondary" }
        ]}
      />

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Docs Home"
          title="Two primary gateways, plus platform and troubleshooting references."
          description="Search the full docs, choose a path, or jump directly into the ordered documentation tree."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            <DocsSearch />
            <div className="grid gap-4 md:grid-cols-2">
              <div id="players">
                <DocsCard
                  title="I am a player"
                  description="Install ECHO Launcher, install Ashfall, update, repair, report bugs, and join the community."
                  href="/docs/install/launcher"
                  links={["Install", "Ashfall", "Repair"]}
                />
              </div>
              <div id="developers">
                <DocsCard
                  title="I am a developer"
                  description="Clone the repo, build the workspace, create modules, integrate systems, validate with PackOS, and package releases."
                  href="/docs/developers/getting-started"
                  links={["Workspace", "Modules", "Release"]}
                />
              </div>
              <div id="platform">
                <DocsCard
                  title="Platform architecture"
                  description="Understand PackOS, AdapterCore, runtime contracts, launcher flow, module systems, and future native foundations."
                  href="/docs/platform/overview"
                  links={["PackOS", "Adapters", "Native"]}
                />
              </div>
              <DocsCard
                title="Troubleshooting"
                description="Launcher dependency detection, install repair, profile handoff, invalid paths, stale files, and support links."
                href="/docs/install/troubleshooting"
                links={["Launcher", "Repair", "Support"]}
              />
            </div>
          </div>
          <div data-pagefind-body className="cyber-panel rounded-[6px] p-5">
            <p className="cyber-label">Docs Index</p>
            <div className="mt-5 grid gap-6">
              {docsSections.map((section) => (
                <div key={section.title}>
                  <h2 className="font-display text-xl font-bold text-echo-text">{section.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-echo-muted">{section.description}</p>
                  <div className="mt-3 grid gap-2">
                    {section.items.map((doc) => (
                      <Link
                        key={docHref(doc)}
                        href={docHref(doc)}
                        className="rounded-[5px] border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-echo-muted transition hover:border-echo-cyan/35 hover:bg-echo-cyan/10 hover:text-echo-text"
                      >
                        {doc.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
