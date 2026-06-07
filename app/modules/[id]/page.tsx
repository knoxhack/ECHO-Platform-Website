import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  Github,
  PackageCheck,
  RadioTower,
  Route,
  ShieldCheck
} from "lucide-react";
import { CyberGlassCard } from "@/components/cyber-glass-card";
import { StatusBadge } from "@/components/status-badge";
import {
  adjacentModules,
  allModules,
  findModule,
  moduleHref,
  resolveDependencies
} from "@/lib/modules";
import { pageMetadata } from "@/lib/site";

type ModulePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return allModules.map((module) => ({ id: module.id }));
}

export async function generateMetadata({ params }: ModulePageProps): Promise<Metadata> {
  const { id } = await params;
  const moduleRecord = findModule(id);

  if (!moduleRecord) {
    return pageMetadata({
      title: "Module",
      path: "/modules"
    });
  }

  return pageMetadata({
    title: `${moduleRecord.name} | Modules`,
    description: moduleRecord.description,
    path: moduleHref(moduleRecord)
  });
}

function SummaryMetric({
  label,
  value,
  icon: Icon
}: {
  label: string;
  value: string;
  icon: typeof ShieldCheck;
}) {
  return (
    <CyberGlassCard className="p-4">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-[5px] border border-echo-cyan/25 bg-echo-cyan/10 text-echo-cyan">
          <Icon size={18} />
        </span>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-echo-muted">{label}</p>
          <p className="mt-1 font-display text-lg font-bold text-echo-text">{value}</p>
        </div>
      </div>
    </CyberGlassCard>
  );
}

export default async function ModuleDetailPage({ params }: ModulePageProps) {
  const { id } = await params;
  const moduleRecord = findModule(id);

  if (!moduleRecord) notFound();

  const dependencies = resolveDependencies(moduleRecord);
  const { previous, next } = adjacentModules(moduleRecord);

  return (
    <>
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-echo-grid bg-[length:48px_48px] opacity-35" />
        <div className="section-shell">
          <Link
            href="/modules"
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-echo-muted hover:text-echo-cyan"
          >
            <ArrowLeft size={15} />
            Module Registry
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge label={moduleRecord.status} />
                <span className="rounded-[4px] border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.13em] text-echo-muted">
                  {moduleRecord.category}
                </span>
              </div>
              <h1 className="mt-5 font-display text-5xl font-black text-echo-text sm:text-6xl">
                {moduleRecord.name}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-echo-muted">{moduleRecord.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={moduleRecord.docs} className="cyber-button cyber-button-primary">
                  <BookOpen size={16} />
                  Read docs
                </Link>
                <Link href={moduleRecord.github} className="cyber-button cyber-button-secondary">
                  <Github size={16} />
                  View GitHub
                </Link>
                <Link href="/docs/modules/overview" className="cyber-button cyber-button-secondary">
                  Module system
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <CyberGlassCard className="p-5">
              <p className="cyber-label">Registry State</p>
              <div className="mt-5 grid gap-3">
                <SummaryMetric label="Version" value={moduleRecord.version ?? "TBD"} icon={PackageCheck} />
                <SummaryMetric label="Dependencies" value={String(moduleRecord.dependencies.length)} icon={GitBranch} />
                <SummaryMetric
                  label="Standalone"
                  value={moduleRecord.standalone ? "Supported" : "Pack-bound"}
                  icon={ShieldCheck}
                />
                <SummaryMetric
                  label="Ashfall"
                  value={moduleRecord.usedByAshfall ? "Used by Ashfall" : "Optional / Future"}
                  icon={RadioTower}
                />
              </div>
            </CyberGlassCard>
          </div>
        </div>
      </section>

      <section className="section-shell py-12">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <CyberGlassCard className="p-6">
            <p className="cyber-label">Overview</p>
            <div className="mt-5 space-y-4">
              {moduleRecord.overview.map((paragraph) => (
                <p key={paragraph} className="text-base leading-7 text-echo-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </CyberGlassCard>

          <CyberGlassCard className="p-6">
            <p className="cyber-label">Status Note</p>
            <p className="mt-5 text-base leading-7 text-echo-muted">{moduleRecord.statusNote}</p>
          </CyberGlassCard>
        </div>
      </section>

      <section className="section-shell py-12">
        <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <CyberGlassCard className="p-6">
            <p className="cyber-label">Dependencies</p>
            {dependencies.length > 0 ? (
              <div className="mt-5 grid gap-3">
                {dependencies.map((dependency) =>
                  dependency.module ? (
                    <Link
                      key={dependency.id}
                      href={moduleHref(dependency.module)}
                      className="rounded-[5px] border border-white/10 bg-white/[0.035] p-4 transition hover:border-echo-cyan/40 hover:bg-echo-cyan/10"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="font-display text-lg font-bold text-echo-text">
                            {dependency.module.name}
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-echo-muted">{dependency.module.description}</p>
                        </div>
                        <StatusBadge label={dependency.module.status} />
                      </div>
                    </Link>
                  ) : (
                    <div
                      key={dependency.id}
                      className="rounded-[5px] border border-white/10 bg-white/[0.035] p-4 text-sm text-echo-muted"
                    >
                      {dependency.id}
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className="mt-5 text-sm leading-6 text-echo-muted">
                This module has no registry dependencies.
              </p>
            )}
          </CyberGlassCard>

          <div className="grid gap-5">
            <CyberGlassCard className="p-6">
              <p className="cyber-label">Capabilities</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {moduleRecord.capabilities.map((capability) => (
                  <div
                    key={capability}
                    className="rounded-[5px] border border-echo-cyan/20 bg-echo-cyan/10 p-3 text-sm font-semibold text-echo-text"
                  >
                    <CheckCircle2 className="mb-3 text-echo-cyan" size={18} />
                    {capability}
                  </div>
                ))}
              </div>
            </CyberGlassCard>

            <CyberGlassCard className="p-6">
              <p className="cyber-label">Integrations</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {moduleRecord.integrations.map((integration) => (
                  <span
                    key={integration}
                    className="rounded-[4px] border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.13em] text-echo-muted"
                  >
                    {integration}
                  </span>
                ))}
              </div>
            </CyberGlassCard>
          </div>
        </div>
      </section>

      <section className="section-shell py-12">
        <div className="grid gap-5 lg:grid-cols-2">
          <CyberGlassCard className="p-6">
            <p className="cyber-label">Roadmap</p>
            <div className="mt-5 space-y-3">
              {moduleRecord.roadmap.map((item) => (
                <div key={item} className="flex gap-3 rounded-[5px] border border-white/10 bg-white/[0.035] p-3">
                  <Route className="mt-0.5 shrink-0 text-echo-amber" size={17} />
                  <p className="text-sm leading-6 text-echo-muted">{item}</p>
                </div>
              ))}
            </div>
          </CyberGlassCard>

          <CyberGlassCard className="p-6">
            <p className="cyber-label">Release Notes</p>
            <div className="mt-5 space-y-4">
              {moduleRecord.releaseNotes.map((release) => (
                <div key={`${release.title}-${release.version ?? "tbd"}`} className="border-l border-echo-cyan/30 pl-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-lg font-bold text-echo-text">{release.title}</h2>
                    <span className="rounded-[4px] border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-echo-muted">
                      {release.version ?? "TBD"}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {release.notes.map((note) => (
                      <li key={note} className="flex gap-2 text-sm leading-6 text-echo-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-echo-cyan" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CyberGlassCard>
        </div>
      </section>

      <section className="section-shell py-12">
        <CyberGlassCard className="p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="cyber-label">Next Step</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-echo-text">
                Explore the module contract and source trail.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-echo-muted">
                Module detail pages keep the public registry readable while the docs explain deeper
                integration behavior. GitHub remains the source trail for implementation work.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={moduleRecord.docs} className="cyber-button cyber-button-primary">
                <BookOpen size={16} />
                Read docs
              </Link>
              <Link href={moduleRecord.github} className="cyber-button cyber-button-secondary">
                <ExternalLink size={16} />
                GitHub
              </Link>
            </div>
          </div>
        </CyberGlassCard>
      </section>

      <section className="section-shell py-12">
        <nav className="grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
          {previous ? (
            <Link href={moduleHref(previous)} className="cyber-panel rounded-[6px] p-4 transition hover:border-echo-cyan/40">
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-echo-muted">
                <ArrowLeft size={14} />
                Previous module
              </span>
              <span className="mt-2 block font-display text-lg font-bold text-echo-text">{previous.name}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={moduleHref(next)} className="cyber-panel rounded-[6px] p-4 text-right transition hover:border-echo-cyan/40">
              <span className="flex items-center justify-end gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-echo-muted">
                Next module
                <ArrowRight size={14} />
              </span>
              <span className="mt-2 block font-display text-lg font-bold text-echo-text">{next.name}</span>
            </Link>
          ) : null}
        </nav>
      </section>
    </>
  );
}
