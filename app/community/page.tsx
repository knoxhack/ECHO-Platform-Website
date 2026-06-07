import Link from "next/link";
import {
  BookOpen,
  Bug,
  Download,
  ExternalLink,
  Github,
  LifeBuoy,
  MessageSquare,
  Wrench,
  Youtube
} from "lucide-react";
import socials from "@/data/socials.json";
import { CyberGlassCard } from "@/components/cyber-glass-card";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { StatusBadge } from "@/components/status-badge";
import { pageMetadata, siteConfig } from "@/lib/site";

type SocialRecord = {
  id: string;
  name: string;
  url: string;
  description: string;
  status: string;
  ctaLabel?: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
  audience?: string;
};

const socialRecords = socials as SocialRecord[];

const iconById = {
  discord: MessageSquare,
  github: Github,
  youtube: Youtube,
  releases: Download,
  support: LifeBuoy
};

const supportPaths = [
  {
    title: "Install ECHO Launcher",
    description: "Start with the launcher setup flow and platform notes.",
    href: siteConfig.links.launcherDocs,
    icon: Download
  },
  {
    title: "Troubleshoot Installs",
    description: "Repair broken paths, missing files, stale assets, and launcher handoff issues.",
    href: siteConfig.links.support,
    icon: Wrench
  },
  {
    title: "Report Bugs",
    description: "Use GitHub issues for reproducible bugs, release problems, and module defects.",
    href: siteConfig.links.githubIssues,
    icon: Bug
  },
  {
    title: "Read Platform Docs",
    description: "Understand ECHO, PackOS, modules, AdapterCore, and the native direction.",
    href: siteConfig.links.docs,
    icon: BookOpen
  }
];

export const metadata = pageMetadata({
  title: "Community",
  description: "Official ECHO community links for Discord, GitHub, YouTube, releases, and support.",
  path: "/community"
});

export default function CommunityPage() {
  return (
    <>
      <HeroSection
        compact
        eyebrow="Community"
        title="Join the ECHO community."
        kicker="Follow development, report issues, watch dev talks, test releases, and help shape the future of ECHO."
        description="This is the official link hub for players, testers, developers, and contributors following ECHO Platform, Ashfall, PackOS, and future native platform work."
        actions={[
          { label: "Join Discord", href: siteConfig.links.discord },
          { label: "Watch ECHO Labs", href: siteConfig.links.youtube, variant: "secondary" },
          { label: "Report Issues", href: siteConfig.links.githubIssues, variant: "secondary" }
        ]}
      />

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Official Links"
          title="One verified place for platform updates and support."
          description="Use these links for community discussion, development tracking, release access, and support escalation."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {socialRecords.map((social) => {
            const Icon = iconById[social.id as keyof typeof iconById] ?? ExternalLink;

            return (
              <CyberGlassCard key={social.id} className="h-full">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[5px] border border-echo-cyan/25 bg-echo-cyan/10 text-echo-cyan">
                    <Icon size={20} />
                  </span>
                  <StatusBadge label={social.status} />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-echo-text">
                  {social.name}
                </h3>
                {social.audience ? (
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.13em] text-echo-cyan">
                    {social.audience}
                  </p>
                ) : null}
                <p className="mt-4 text-sm leading-6 text-echo-muted">{social.description}</p>
                <Link href={social.url} className="cyber-button cyber-button-primary mt-6 w-full">
                  {isExternal(social.url) ? <ExternalLink size={16} /> : null}
                  {social.ctaLabel ?? `Open ${social.name}`}
                </Link>
                {social.secondaryUrl && social.secondaryLabel ? (
                  <Link
                    href={social.secondaryUrl}
                    className="cyber-button cyber-button-secondary mt-3 w-full"
                  >
                    {isExternal(social.secondaryUrl) ? <ExternalLink size={16} /> : null}
                    {social.secondaryLabel}
                  </Link>
                ) : null}
              </CyberGlassCard>
            );
          })}
        </div>
      </section>

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Support Paths"
          title="Send each issue to the right surface."
          description="Players should start with launcher setup and troubleshooting. Reproducible bugs and source-level issues belong on GitHub."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {supportPaths.map((supportPath) => {
            const Icon = supportPath.icon;

            return (
              <Link
                key={supportPath.title}
                href={supportPath.href}
                className="cyber-panel rounded-[6px] p-5 transition hover:border-echo-cyan/50 hover:bg-echo-cyan/5"
              >
                <Icon className="text-echo-cyan" size={24} />
                <h3 className="mt-4 font-display text-xl font-bold text-echo-text">
                  {supportPath.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-echo-muted">
                  {supportPath.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="cyber-panel rounded-[6px] p-6 sm:p-8">
          <p className="cyber-label">Official Source Trail</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-echo-text">
                Follow ECHO from Dev Talk to release asset.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-echo-muted">
                News posts connect to ECHO Labs videos, the download portal mirrors GitHub
                release metadata, and docs explain how launcher, PackOS, modules, and AdapterCore
                fit together.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/news" className="cyber-button cyber-button-primary">
                Read News
              </Link>
              <Link href="/media" className="cyber-button cyber-button-secondary">
                View Media
              </Link>
              <Link href="/download" className="cyber-button cyber-button-secondary">
                Open Downloads
              </Link>
              <Link href="/docs" className="cyber-button cyber-button-secondary">
                Browse Docs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}
