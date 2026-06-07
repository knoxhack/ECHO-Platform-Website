import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Braces,
  Cpu,
  Github,
  Layers3,
  Map,
  MessageSquare,
  PackageCheck,
  Radar,
  Rocket,
  ShieldCheck,
  Terminal
} from "lucide-react";
import { CyberGlassCard } from "@/components/cyber-glass-card";
import { DocsCard } from "@/components/docs-card";
import { FeatureGrid } from "@/components/feature-grid";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { StatusBadge } from "@/components/status-badge";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Developers",
  description: "Developer landing page for building modules, systems, interfaces, missions, routes, and PackOS-aware ECHO experiences.",
  path: "/developers"
});

const journey = [
  {
    title: "Clone and install",
    description: "Prepare the workspace, dependencies, and local development flow."
  },
  {
    title: "Build core modules",
    description: "Confirm ECHO Core, shared contracts, and required module outputs build cleanly."
  },
  {
    title: "Create a module",
    description: "Start from the module template and define identity, category, and dependencies."
  },
  {
    title: "Register contracts",
    description: "Connect services, lifecycle hooks, data ownership, and runtime-facing surfaces."
  },
  {
    title: "Integrate UI systems",
    description: "Add Terminal tabs, Index providers, Lens scanners, or HoloMap overlays."
  },
  {
    title: "Add PackOS metadata",
    description: "Describe package intent, dependencies, release channel, and validation state."
  },
  {
    title: "Validate release state",
    description: "Use docs and future Command Center checks to catch broken packaging early."
  },
  {
    title: "Package for launcher",
    description: "Prepare the experience for ECHO Launcher delivery and player handoff."
  }
];

const buildPaths = [
  {
    title: "Create a module",
    description: "Define a reusable ECHO building block with identity, dependencies, docs, and release notes.",
    href: "/docs/developers/module-template",
    cta: "Use template",
    icon: Boxes
  },
  {
    title: "Add a Terminal tab",
    description: "Expose missions, intel, route state, rewards, and addon tools inside the player command surface.",
    href: "/docs/modules/terminal",
    cta: "Terminal docs",
    icon: Terminal
  },
  {
    title: "Add an Index provider",
    description: "Publish recipes, usage records, item archives, and discovery entries without forking UI logic.",
    href: "/docs/modules/index",
    cta: "Index docs",
    icon: BookOpen
  },
  {
    title: "Add a Lens scanner",
    description: "Register scan results for blocks, entities, fluids, machines, hazards, and progression clues.",
    href: "/docs/modules/lens",
    cta: "Lens docs",
    icon: Radar
  },
  {
    title: "Add a HoloMap overlay",
    description: "Attach routes, points of interest, crash sites, hazards, relays, bases, and anomalies to world intel.",
    href: "/docs/modules/holomap",
    cta: "HoloMap docs",
    icon: Map
  },
  {
    title: "Package with PackOS",
    description: "Prepare manifest, channel, lockfile, artifact, and release-gate metadata for launcher-aware delivery.",
    href: "/docs/platform/packos",
    cta: "PackOS docs",
    icon: PackageCheck
  }
];

const apiAreas = [
  {
    title: "Core Services",
    description: "Services, registries, events, lifecycle contracts, and shared module boundaries.",
    href: "/docs/developers/service-contracts",
    links: ["Services", "Events", "Contracts"]
  },
  {
    title: "Networking",
    description: "Packets, server actions, sync behavior, rate limiting, and debug-friendly message flow.",
    href: "/docs/developers/networking",
    links: ["Packets", "Sync", "Actions"]
  },
  {
    title: "Persistent Data",
    description: "Player and world data ownership, storage contracts, migration paths, and save-aware design.",
    href: "/docs/developers/data-storage",
    links: ["Player", "World", "Storage"]
  },
  {
    title: "UI Integrations",
    description: "Terminal tabs, Index providers, Lens scanners, and HoloMap overlays as reusable extension surfaces.",
    href: "/docs/developers/ui-integration",
    links: ["Terminal", "Index", "Lens"]
  },
  {
    title: "Release Gates",
    description: "Validation expectations, packaging checks, release notes, and launcher-ready package flow.",
    href: "/docs/developers/release-process",
    links: ["Validation", "Release", "Launcher"]
  },
  {
    title: "PackOS",
    description: "Manifests, channels, lockfiles, snapshots, integrity checks, and future package validation.",
    href: "/docs/platform/packos",
    links: ["Manifest", "Channels", "Lockfiles"]
  }
];

const integrationGroups = [
  {
    label: "Module foundation",
    icon: Cpu,
    tone: "cyan" as const,
    items: ["ECHO Core", "NetCore", "DataCore", "MissionCore"]
  },
  {
    label: "Player surfaces",
    icon: Layers3,
    tone: "green" as const,
    items: ["Terminal", "Index", "Lens", "HoloMap"]
  },
  {
    label: "Release path",
    icon: ShieldCheck,
    tone: "amber" as const,
    items: ["PackOS", "Launcher"]
  }
];

export default function DevelopersPage() {
  return (
    <>
      <HeroSection
        compact
        eyebrow="Developer Gateway"
        title="Build with ECHO"
        kicker="Create modules, systems, interfaces, missions, routes, worlds, and full experiences on top of the ECHO Platform."
        description="Start from shared contracts, reusable services, launcher-aware metadata, module templates, UI integrations, scanner providers, map overlays, mission systems, and PackOS-ready release flow."
        image="/images/echo-developer-workbench.png"
        actions={[
          { label: "Start Building", href: "/docs/developers/getting-started" },
          { label: "View GitHub", href: siteConfig.links.github, variant: "secondary" },
          { label: "Create a Module", href: "/docs/developers/module-template", variant: "secondary" },
          { label: "Explore APIs", href: "/docs/developers/service-contracts", variant: "secondary" }
        ]}
      />

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="What You Can Build"
          title="ECHO gives developers reusable surfaces instead of isolated one-off systems."
          description="Gameplay modules, route logic, mission systems, UI tabs, map overlays, scanner providers, world hazards, machines, PackOS manifests, and launcher-compatible experiences can all become part of the same ecosystem."
        />
        <div className="mt-8">
          <FeatureGrid
            columns="four"
            items={[
              { title: "Gameplay Modules", description: "Survival systems, machines, progression gates, hazards, and world events.", icon: "blocks" },
              { title: "Interface Providers", description: "Terminal tabs, Index providers, Lens scanners, and HoloMap overlays.", icon: "terminal" },
              { title: "PackOS Metadata", description: "Manifest, channel, release, dependency, and validation metadata.", icon: "shield" },
              { title: "Launcher Experiences", description: "Package official or future community experiences for launcher-aware delivery.", icon: "install" }
            ]}
          />
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Build Paths"
            title="Pick a surface and start from the right contract."
            description="ECHO development is organized around reusable integration surfaces. Choose the system you are extending, then follow the docs path that keeps your module compatible with the broader platform."
          />
          <Link href="/docs/developers/getting-started" className="cyber-button cyber-button-secondary w-fit">
            Getting Started
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {buildPaths.map((path) => {
            const Icon = path.icon;
            return (
              <CyberGlassCard key={path.title} className="group h-full p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[5px] border border-echo-cyan/25 bg-echo-cyan/10 text-echo-cyan">
                    <Icon size={21} />
                  </div>
                  <ArrowRight
                    className="mt-2 text-echo-muted transition group-hover:translate-x-1 group-hover:text-echo-cyan"
                    size={18}
                  />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-echo-text">{path.title}</h3>
                <p className="mt-3 text-sm leading-6 text-echo-muted">{path.description}</p>
                <Link href={path.href} className="mt-6 inline-flex text-sm font-semibold text-echo-cyan">
                  {path.cta}
                </Link>
              </CyberGlassCard>
            );
          })}
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="cyber-label">Developer Journey</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-echo-text">
              From workspace to launcher package.
            </h2>
            <p className="mt-4 text-base leading-7 text-echo-muted">
              The flow is written as a practical operating path: build locally, integrate
              through platform surfaces, describe package state, then move toward the
              launcher path players actually use.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <StatusBadge label="Minecraft/NeoForge Today" tone="cyan" />
              <StatusBadge label="Runtime-Independent Direction" tone="amber" />
              <StatusBadge label="PackOS-Aware Flow" tone="green" />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/docs/developers/getting-started" className="cyber-button cyber-button-primary">
                Start Journey
              </Link>
              <Link href={siteConfig.links.github} className="cyber-button cyber-button-secondary">
                <Github size={16} />
                View GitHub
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {journey.map((step, index) => (
              <CyberGlassCard key={step.title} className="p-4">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-echo-cyan">
                  Step {index + 1}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-echo-text">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-echo-muted">{step.description}</p>
              </CyberGlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Integration Surface Map"
          title="Modules connect through shared systems, not isolated patches."
          description="This map shows the developer mental model: build on core services, publish into player-facing surfaces, and prepare releases for PackOS and launcher delivery."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {integrationGroups.map((group) => {
            const Icon = group.icon;
            return (
              <CyberGlassCard key={group.label} className="h-full p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-[5px] border border-echo-cyan/25 bg-echo-cyan/10 text-echo-cyan">
                      <Icon size={21} />
                    </div>
                    <div>
                      <p className="cyber-label">{group.label}</p>
                      <StatusBadge label={group.tone === "amber" ? "Release Flow" : "Active Surface"} tone={group.tone} />
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid gap-3">
                  {group.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-[5px] border border-white/10 bg-white/[0.035] px-3 py-3"
                    >
                      <span className="font-display text-base font-semibold text-echo-text">{item}</span>
                      <span className="h-2 w-2 rounded-full bg-echo-cyan shadow-[0_0_14px_rgba(54,217,255,0.85)]" />
                    </div>
                  ))}
                </div>
              </CyberGlassCard>
            );
          })}
        </div>
      </section>

      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="API Areas"
          title="Open the exact docs surface you need."
          description="The developer docs are already split by contract area, integration surface, and release workflow so builders do not have to start from a generic docs index."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {apiAreas.map((area) => (
            <DocsCard
              key={area.title}
              title={area.title}
              description={area.description}
              href={area.href}
              links={area.links}
            />
          ))}
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="overflow-hidden rounded-[6px] border border-echo-cyan/25 bg-gradient-to-br from-echo-cyan/12 via-white/[0.035] to-echo-amber/10 p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="cyber-label">Next Build Step</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-echo-text sm:text-4xl">
                Start with the path that matches what you want to ship.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-echo-muted">
                ECHO development should move from docs to modules to package metadata without
                losing sight of the player delivery path. Use the getting started guide for
                setup, the module template for structure, GitHub for source, and Discord for
                community feedback.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/docs/developers/getting-started" className="cyber-button cyber-button-primary">
                <Rocket size={16} />
                Start with Getting Started
              </Link>
              <Link href="/docs/developers/module-template" className="cyber-button cyber-button-secondary">
                <Braces size={16} />
                Use the Module Template
              </Link>
              <Link href={siteConfig.links.github} className="cyber-button cyber-button-secondary">
                <Github size={16} />
                Open GitHub
              </Link>
              <Link href={siteConfig.links.discord} className="cyber-button cyber-button-secondary">
                <MessageSquare size={16} />
                Join Discord
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
