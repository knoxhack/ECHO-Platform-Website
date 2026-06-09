import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import mediaData from "@/data/media.json";
import {
  ArrowRight,
  BookOpen,
  Braces,
  Cpu,
  Download,
  Github,
  HardDriveDownload,
  MessagesSquare,
  PackageCheck,
  Radio,
  Terminal,
  type LucideIcon
} from "lucide-react";
import modules from "@/data/modules.json";
import roadmap from "@/data/roadmap.json";
import statusItems from "@/data/status.json";
import type { MediaRecord } from "@/components/media-gallery";
import type { ModuleRecord } from "@/components/module-card";
import { Reveal } from "@/components/reveal";
import { ProductGrid } from "@/components/product-grid";
import type { RoadmapGroup } from "@/components/roadmap-timeline";
import { StatusBadge } from "@/components/status-badge";
import { displayNewsDate, getAllNewsEntries, type NewsSummary, toNewsSummary } from "@/lib/news";
import { allProducts } from "@/lib/products";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/"
});

type HomeAction = {
  label: string;
  href: string;
  icon?: LucideIcon;
  variant?: "primary" | "secondary";
};

type HomeStatus = {
  name: string;
  status: string;
};

type SignalNode = {
  id: string;
  label: string;
  href: string;
  status: string;
  description: string;
  x: number;
  y: number;
  tone: "cyan" | "green" | "amber" | "blue";
};

const heroActions: HomeAction[] = [
  { label: "Download Launcher", href: siteConfig.links.download, icon: Download },
  { label: "Play Ashfall", href: "/ashfall", icon: Radio, variant: "secondary" },
  { label: "Start Building", href: "/developers", icon: Terminal, variant: "secondary" },
  { label: "Read Docs", href: siteConfig.links.docs, icon: BookOpen, variant: "secondary" }
];

const architectureLayers = [
  {
    label: "Official Experiences",
    value: "Ashfall and future ECHO worlds",
    href: "/ashfall"
  },
  {
    label: "Player Gateway",
    value: "Launcher, download channels, repair flow",
    href: "/launcher"
  },
  {
    label: "Pack Layer",
    value: "PackOS manifests, lockfiles, release gates",
    href: "/docs/platform/packos"
  },
  {
    label: "Module Layer",
    value: "Core, interface, world, progression systems",
    href: "/modules"
  },
  {
    label: "Runtime Contracts",
    value: "Services, registries, data, networking",
    href: "/docs/developers/service-contracts"
  },
  {
    label: "Runtime Lanes",
    value: "Native Loader, NeoForge fallback, Standalone parity",
    href: "/docs/platform/adaptercore"
  },
  {
    label: "Native Loader",
    value: "Primary future platform lane",
    href: "/docs/platform/native-platform"
  }
];

const developerSurfaces = [
  { label: "Core", detail: "Contracts and shared services", href: "/docs/modules/core", icon: Cpu },
  { label: "Terminal", detail: "Missions, intel, routes", href: "/docs/modules/terminal", icon: Terminal },
  { label: "Index", detail: "Recipes and archive providers", href: "/docs/modules/index", icon: BookOpen },
  { label: "Lens", detail: "Scanner providers", href: "/docs/modules/lens", icon: Radio },
  { label: "HoloMap", detail: "Routes, overlays, hazards", href: "/docs/modules/holomap", icon: Braces },
  { label: "PackOS", detail: "Release metadata and gates", href: "/docs/platform/packos", icon: PackageCheck }
];

const operations = [
  {
    label: "Launcher",
    image: "/images/media/echo-launcher-portal.png",
    href: "/launcher",
    cta: "Open Launcher",
    detail: "Install, update, repair, validate, and hand off official ECHO experiences."
  },
  {
    label: "PackOS",
    image: "/images/media/echo-packos-validation.png",
    href: "/docs/platform/packos",
    cta: "Read PackOS",
    detail: "Manifests, checksums, release gates, package metadata, and integrity flow."
  }
];

export default async function HomePage() {
  const moduleRecords = modules as ModuleRecord[];
  const statusMap = new Map((statusItems as HomeStatus[]).map((item) => [item.name, item.status]));
  const roadmapPreview = roadmap as RoadmapGroup[];
  const mediaPreview = (mediaData as MediaRecord[]).filter((item) => item.featured).slice(0, 3);
  const newsPreview = (await getAllNewsEntries()).slice(0, 4).map(toNewsSummary);
  const modulePreview = moduleRecords
    .filter((module) => module.usedByAshfall || module.category === "Player Interface")
    .slice(0, 8);

  const signals: SignalNode[] = [
    {
      id: "ashfall",
      label: "Ashfall",
      href: "/ashfall",
      status: statusMap.get("Ashfall") ?? "Active Development",
      description: "First official survival experience",
      x: 50,
      y: 12,
      tone: "amber"
    },
    {
      id: "launcher",
      label: "Launcher",
      href: "/launcher",
      status: statusMap.get("Launcher") ?? "Public Releases",
      description: "Player install and repair gateway",
      x: 16,
      y: 32,
      tone: "green"
    },
    {
      id: "packos",
      label: "PackOS",
      href: "/docs/platform/packos",
      status: statusMap.get("PackOS") ?? "In Progress",
      description: "Package validation and release gates",
      x: 84,
      y: 34,
      tone: "amber"
    },
    {
      id: "modules",
      label: "Modules",
      href: "/modules",
      status: `${moduleRecords.length} tracked`,
      description: "First-party building blocks",
      x: 23,
      y: 74,
      tone: "cyan"
    },
    {
      id: "docs",
      label: "Docs",
      href: "/docs",
      status: "Public guides",
      description: "Player and developer entrypoint",
      x: 77,
      y: 75,
      tone: "blue"
    },
    {
      id: "adaptercore",
      label: "AdapterCore",
      href: "/docs/platform/adaptercore",
      status: statusMap.get("NeoForge Adapter") ?? "Active",
      description: "Compatibility boundary",
      x: 50,
      y: 88,
      tone: "cyan"
    },
    {
      id: "native",
      label: "Native Direction",
      href: "/docs/platform/native-platform",
      status: statusMap.get("Native Platform") ?? "Foundation Phase",
      description: "Future runtime-independent work",
      x: 50,
      y: 50,
      tone: "blue"
    }
  ];

  return (
    <>
      <EchoCommandHero signals={signals} moduleCount={moduleRecords.length} />
      <GatewayDock />
      <EcosystemProductRail />
      <SignalRouteMap signals={signals} />
      <TransmissionBand />
      <OperationsLane />
      <DeveloperSurfaceMap modules={modulePreview} />
      <RuntimeStackPanel />
      <TerminalFeed media={mediaPreview} news={newsPreview} roadmap={roadmapPreview} />
    </>
  );
}

function EcosystemProductRail() {
  const products = allProducts.filter((product) => product.repoName !== "ECHO-Platform-Website");

  return (
    <section className="section-shell py-16">
      <Reveal>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="cyber-label">Ecosystem Products</p>
            <h2 className="mt-4 font-display text-4xl font-black text-echo-text">
              The official surface now maps every repo to a product.
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-7 text-echo-muted">
              Launcher, modules, Ashfall editions, Release Index, SDK, runtimes, and studios each
              have an owner, release surface, docs entry, and download role.
            </p>
          </div>
          <Link href="/release-index" className="cyber-button cyber-button-secondary w-fit">
            Release Index
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-8">
          <ProductGrid products={products} compact />
        </div>
      </Reveal>
    </section>
  );
}

function EchoCommandHero({
  signals,
  moduleCount
}: {
  signals: SignalNode[];
  moduleCount: number;
}) {
  return (
    <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden border-b border-echo-cyan/15">
      <Image
        src="/images/echo-home-command-panorama.png"
        alt=""
        fill
        priority
        className="absolute inset-0 -z-30 object-cover opacity-75"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,rgba(54,217,255,0.16),transparent_28rem),linear-gradient(180deg,rgba(5,7,10,0.68),rgba(5,7,10,0.9)_62%,#05070a)]" />
      <div className="absolute inset-0 -z-10 bg-echo-grid bg-[size:64px_64px] opacity-25 [mask-image:radial-gradient(circle_at_center,black,transparent_76%)]" />

      <div className="section-shell flex min-h-[calc(100svh-4rem)] flex-col py-6 sm:py-8">
        <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)_260px]">
          <CommandRail title="Platform Signals" items={signals.slice(0, 5)} />

          <div className="relative min-h-[760px] overflow-hidden rounded-[8px] border border-echo-cyan/20 bg-[#05070a]/50 shadow-glow backdrop-blur sm:min-h-[640px] lg:min-h-[560px]">
            <div className="absolute inset-x-4 top-4 z-10 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-echo-muted">
              <span>Runtime control surface</span>
              <span>{moduleCount} modules indexed</span>
            </div>

            <div className="absolute left-1/2 top-[38%] h-[370px] w-[370px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-echo-cyan/20 bg-echo-cyan/[0.025] shadow-[0_0_120px_rgba(54,217,255,0.12)] sm:top-[47%] sm:h-[460px] sm:w-[460px]" />
            <div className="absolute left-1/2 top-[38%] h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-echo-amber/20 sm:top-[47%] sm:h-[330px] sm:w-[330px]" />
            <div className="absolute left-1/2 top-[38%] h-[132px] w-[132px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-echo-green/25 bg-[#05070a]/80 shadow-[0_0_70px_rgba(70,255,176,0.14)] sm:top-[47%]" />

            <div className="absolute left-1/2 top-[38%] z-10 w-[min(92%,780px)] -translate-x-1/2 -translate-y-1/2 text-center sm:top-[47%]">
              <p className="cyber-label text-echo-green">Official ecosystem home</p>
              <h1 className="mt-4 font-display text-5xl font-black text-echo-text sm:text-7xl lg:text-8xl">
                ECHO
              </h1>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.32em] text-echo-cyan sm:text-sm">
                Platform
              </p>
              <p className="mx-auto mt-7 max-w-2xl font-display text-2xl font-bold leading-tight text-echo-text sm:text-4xl">
                Build worlds. Launch experiences. Evolve beyond the modpack.
              </p>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-echo-muted sm:text-lg">
                ECHO powers official experiences like Ashfall through modules,
                launcher-managed installs, PackOS validation, developer tooling,
                runtime contracts, and future native platform foundations.
              </p>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-20 grid gap-3 rounded-[6px] border border-white/10 bg-[#05070a]/78 p-3 backdrop-blur md:grid-cols-4">
              {heroActions.map((action) => (
                <CommandAction key={action.href + action.label} action={action} />
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="cyber-panel rounded-[6px] p-4">
              <p className="cyber-label">Current compatibility</p>
              <p className="mt-4 text-sm leading-6 text-echo-muted">
                Native Loader is the primary future lane, NeoForge is the compatibility
                backend for Minecraft play, and Standalone Runtime is the parity harness.
              </p>
            </div>
            <div className="cyber-panel rounded-[6px] p-4">
              <p className="cyber-label">Primary routes</p>
              <div className="mt-4 grid gap-2">
                <MiniLink href="/download" label="Download" value="Launcher path" />
                <MiniLink href="/ashfall" label="Ashfall" value="Official experience" />
                <MiniLink href="/developers" label="Developers" value="Build modules" />
                <MiniLink href="/docs" label="Docs" value="Public guides" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommandRail({ title, items }: { title: string; items: SignalNode[] }) {
  return (
    <div className="hidden gap-3 lg:grid">
      <div className="cyber-panel rounded-[6px] p-4">
        <p className="cyber-label">{title}</p>
        <div className="mt-4 grid gap-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group block border-l border-echo-cyan/30 bg-white/[0.025] px-3 py-3 transition hover:border-echo-green hover:bg-echo-cyan/10"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-echo-text">
                  {item.label}
                </span>
                <span className="h-2 w-2 rounded-full bg-echo-cyan shadow-[0_0_16px_currentColor]" />
              </div>
              <p className="mt-2 text-xs leading-5 text-echo-muted">{item.status}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommandAction({ action }: { action: HomeAction }) {
  const Icon = action.icon ?? ArrowRight;
  const className =
    action.variant === "secondary"
      ? "border-white/15 bg-white/[0.035] text-echo-text hover:border-echo-cyan/50 hover:bg-echo-cyan/10"
      : "border-echo-cyan bg-echo-cyan text-[#031018] shadow-glow hover:bg-[#70e7ff]";

  return (
    <Link
      href={action.href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-[5px] border px-4 py-2 text-sm font-bold transition ${className}`}
    >
      <Icon size={16} />
      {action.label}
    </Link>
  );
}

function GatewayDock() {
  return (
    <section className="section-shell py-14">
      <Reveal>
        <div className="relative overflow-hidden rounded-[8px] border border-echo-cyan/20 bg-[#05070a]/72 shadow-glow">
          <div className="absolute inset-y-0 left-1/2 hidden w-px bg-gradient-to-b from-transparent via-echo-cyan/45 to-transparent lg:block" />
          <div className="grid lg:grid-cols-2">
            <GatewayLane
              eyebrow="Player gateway"
              title="Play Ashfall through the official launcher path."
              description="Start with the download portal, follow current release channels, prepare the launcher handoff, and enter the first official ECHO survival experience."
              image="/images/media/echo-launcher-portal.png"
              icon={HardDriveDownload}
              primary={{ label: "Download Launcher", href: siteConfig.links.download, icon: Download }}
              secondary={{ label: "Explore Ashfall", href: "/ashfall", icon: Radio }}
            />
            <GatewayLane
              eyebrow="Developer gateway"
              title="Build modules and platform-aware integrations."
              description="Start with the developer portal, then move into module templates, service contracts, UI providers, PackOS metadata, and release gates."
              image="/images/echo-developer-workbench.png"
              icon={Terminal}
              primary={{ label: "Start Building", href: "/developers", icon: Terminal }}
              secondary={{ label: "Developer Docs", href: "/docs/developers/getting-started", icon: BookOpen }}
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function GatewayLane({
  eyebrow,
  title,
  description,
  image,
  icon: Icon,
  primary,
  secondary
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  primary: HomeAction;
  secondary: HomeAction;
}) {
  return (
    <div className="relative min-h-[410px] overflow-hidden p-5 sm:p-8">
      <Image src={image} alt="" fill className="-z-10 object-cover opacity-[0.36]" sizes="(min-width: 1024px) 50vw, 100vw" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#05070a] via-[#05070a]/82 to-[#05070a]/40" />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-[5px] border border-echo-cyan/30 bg-echo-cyan/10 text-echo-cyan">
              <Icon size={22} />
            </span>
            <p className="cyber-label">{eyebrow}</p>
          </div>
          <h2 className="mt-7 max-w-xl font-display text-3xl font-black leading-tight text-echo-text sm:text-4xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-echo-muted">{description}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <CommandAction action={primary} />
          <CommandAction action={{ ...secondary, variant: "secondary" }} />
        </div>
      </div>
    </div>
  );
}

function SignalRouteMap({ signals }: { signals: SignalNode[] }) {
  return (
    <section className="section-shell py-16">
      <div className="grid gap-8 xl:grid-cols-[0.34fr_0.66fr] xl:items-center">
        <Reveal>
          <div>
            <p className="cyber-label">Signal route map</p>
            <h2 className="mt-4 font-display text-4xl font-black text-echo-text sm:text-5xl">
              ECHO is the operating surface between experience, launcher, package, module, and runtime.
            </h2>
            <p className="mt-5 text-base leading-8 text-echo-muted">
              This is the idea the homepage needs to own: ECHO is not a loose
              modpack description. It is a platform architecture for official
              experiences like Ashfall, Native Loader-first runtime work,
              NeoForge compatibility fallback, and Standalone parity.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/platform" className="cyber-button cyber-button-primary">
                Platform Overview
                <ArrowRight size={16} />
              </Link>
              <Link href="/docs/intro" className="cyber-button cyber-button-secondary">
                What is ECHO?
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative overflow-hidden rounded-[8px] border border-echo-cyan/20 bg-[#05070a]/72 p-4 shadow-glow sm:p-6">
            <div className="hidden min-h-[620px] lg:block">
              <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {signals
                  .filter((node) => node.id !== "native")
                  .map((node) => (
                    <line
                      key={node.id}
                      x1="50"
                      y1="50"
                      x2={node.x}
                      y2={node.y}
                      vectorEffect="non-scaling-stroke"
                      className="stroke-echo-cyan/25"
                      strokeWidth="0.2"
                    />
                  ))}
              </svg>
              <Link
                href="/platform"
                className="absolute left-1/2 top-1/2 grid h-36 w-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-echo-cyan/40 bg-[#05070a]/88 text-center shadow-[0_0_80px_rgba(54,217,255,0.16)]"
              >
                <span>
                  <span className="block font-display text-3xl font-black text-echo-text">ECHO</span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-echo-cyan">
                    Platform
                  </span>
                </span>
              </Link>
              {signals.map((node) => (
                <SignalNodeView key={node.id} node={node} />
              ))}
            </div>

            <div className="grid gap-3 lg:hidden">
              {signals.map((node) => (
                <MobileSignalNode key={node.id} node={node} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SignalNodeView({ node }: { node: SignalNode }) {
  return (
    <Link
      href={node.href}
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      className="absolute w-44 -translate-x-1/2 -translate-y-1/2 rounded-[6px] border border-echo-cyan/20 bg-[#05070a]/84 p-3 backdrop-blur transition hover:border-echo-green/70 hover:bg-echo-cyan/10"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-display text-lg font-bold text-echo-text">{node.label}</span>
        <span className="h-2 w-2 rounded-full bg-echo-cyan shadow-[0_0_14px_currentColor]" />
      </div>
      <p className="mt-2 text-xs leading-5 text-echo-muted">{node.description}</p>
      <div className="mt-3">
        <StatusBadge label={node.status} tone={node.tone === "blue" ? "blue" : node.tone === "green" ? "green" : node.tone === "amber" ? "amber" : "cyan"} />
      </div>
    </Link>
  );
}

function MobileSignalNode({ node }: { node: SignalNode }) {
  return (
    <Link href={node.href} className="rounded-[6px] border border-white/10 bg-white/[0.035] p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-bold text-echo-text">{node.label}</h3>
          <p className="mt-1 text-sm text-echo-muted">{node.description}</p>
        </div>
        <ArrowRight className="shrink-0 text-echo-cyan" size={18} />
      </div>
    </Link>
  );
}

function TransmissionBand() {
  return (
    <section className="relative isolate overflow-hidden py-20">
      <Image
        src="/images/media/ashfall-gridfall-wasteland.png"
        alt=""
        fill
        className="-z-30 object-cover opacity-72"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-[#05070a] via-[#05070a]/82 to-[#05070a]/22" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#05070a] to-transparent" />

      <div className="section-shell">
        <Reveal>
          <div className="max-w-3xl border-l border-echo-amber/50 bg-[#05070a]/68 p-5 backdrop-blur sm:p-8">
            <p className="cyber-label text-echo-amber">Ashfall transmission</p>
            <h2 className="mt-4 font-display text-4xl font-black text-echo-text sm:text-5xl">
              The first official ECHO experience is a survival signal, not a product card.
            </h2>
            <p className="mt-5 text-base leading-8 text-echo-muted">
              Ashfall proves the platform in real gameplay: toxic air, radiation,
              orbital wreckage, faction signals, relays, Lens discovery, HoloMap
              routes, Terminal missions, Index archives, and Nexus anomalies.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/ashfall" className="cyber-button cyber-button-primary">
                Explore Ashfall
                <ArrowRight size={16} />
              </Link>
              <Link href={siteConfig.links.download} className="cyber-button cyber-button-secondary">
                <Download size={16} />
                Download Launcher
              </Link>
              <Link href="/media" className="cyber-button cyber-button-secondary">
                View Media
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function OperationsLane() {
  return (
    <section className="section-shell py-16">
      <Reveal>
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="cyber-label">Operations lane</p>
            <h2 className="mt-3 font-display text-4xl font-black text-echo-text">
              Launcher and PackOS are the install path, release path, and trust path.
            </h2>
          </div>
          <Link href="/download" className="cyber-button cyber-button-secondary w-fit">
            Download Portal
            <ArrowRight size={16} />
          </Link>
        </div>
      </Reveal>
      <div className="grid gap-4 lg:grid-cols-[0.7fr_1fr_1fr_0.7fr] lg:items-stretch">
        <OperationTerminal label="Input" lines={["Official release", "Pack metadata", "Module artifacts"]} />
        {operations.map((operation) => (
          <OperationBay key={operation.label} {...operation} />
        ))}
        <OperationTerminal label="Output" lines={["Validated state", "Launcher handoff", "Playable experience"]} />
      </div>
    </section>
  );
}

function OperationTerminal({ label, lines }: { label: string; lines: string[] }) {
  return (
    <Reveal>
      <div className="h-full rounded-[6px] border border-white/10 bg-[#05070a]/72 p-4 font-mono">
        <p className="text-xs uppercase tracking-[0.18em] text-echo-cyan">{label}</p>
        <div className="mt-5 grid gap-3">
          {lines.map((line, index) => (
            <div key={line} className="flex items-center gap-3 text-xs uppercase tracking-[0.12em] text-echo-muted">
              <span className="text-echo-green">{String(index + 1).padStart(2, "0")}</span>
              {line}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function OperationBay({
  label,
  image,
  href,
  cta,
  detail
}: {
  label: string;
  image: string;
  href: string;
  cta: string;
  detail: string;
}) {
  return (
    <Reveal delay={0.06}>
      <Link href={href} className="group relative block min-h-[340px] overflow-hidden rounded-[6px] border border-echo-cyan/20 bg-[#05070a]/72">
        <Image src={image} alt="" fill className="object-cover opacity-55 transition duration-500 group-hover:scale-[1.025]" sizes="(min-width: 1024px) 28vw, 100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/58 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="cyber-label">{label}</p>
          <p className="mt-3 text-sm leading-6 text-echo-muted">{detail}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-echo-cyan">
            {cta}
            <ArrowRight size={16} />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function DeveloperSurfaceMap({ modules }: { modules: ModuleRecord[] }) {
  return (
    <section className="section-shell py-16">
      <div className="grid gap-8 xl:grid-cols-[0.42fr_0.58fr] xl:items-stretch">
        <Reveal>
          <div className="relative min-h-[520px] overflow-hidden rounded-[8px] border border-echo-cyan/20 bg-[#05070a]/72 p-5 sm:p-7">
            <Image src="/images/echo-developer-workbench.png" alt="" fill className="-z-10 object-cover opacity-[0.34]" sizes="(min-width: 1280px) 42vw, 100vw" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#05070a] via-[#05070a]/72 to-transparent" />
            <p className="cyber-label">Developer surface</p>
            <h2 className="mt-4 font-display text-4xl font-black text-echo-text">
              Build against interfaces that know the platform.
            </h2>
            <p className="mt-5 text-base leading-8 text-echo-muted">
              ECHO modules can connect to services, data, networking, Terminal tabs,
              Index providers, Lens scans, HoloMap overlays, PackOS metadata, and
              launcher-aware release flow.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/developers" className="cyber-button cyber-button-primary">
                Start Building
                <ArrowRight size={16} />
              </Link>
              <Link href="/docs/developers/getting-started" className="cyber-button cyber-button-secondary">
                Developer Docs
              </Link>
              <Link href={siteConfig.repositories.sdk} className="cyber-button cyber-button-secondary">
                <Github size={16} />
                SDK GitHub
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {developerSurfaces.map((surface, index) => {
              const Icon = surface.icon;
              return (
                <Reveal key={surface.label} delay={index * 0.03}>
                  <Link href={surface.href} className="block h-full rounded-[6px] border border-white/10 bg-white/[0.035] p-4 transition hover:border-echo-cyan/50 hover:bg-echo-cyan/10">
                    <Icon size={20} className="text-echo-cyan" />
                    <h3 className="mt-4 font-display text-xl font-bold text-echo-text">{surface.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-echo-muted">{surface.detail}</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <ModuleTicker modules={modules} />
        </div>
      </div>
    </section>
  );
}

function ModuleTicker({ modules }: { modules: ModuleRecord[] }) {
  return (
    <Reveal>
      <div className="rounded-[6px] border border-echo-cyan/20 bg-[#05070a]/72 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="cyber-label">Module registry pulse</p>
          <Link href="/modules" className="text-sm font-bold text-echo-cyan">
            View all modules
          </Link>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {modules.map((module) => (
            <Link key={module.id} href={`/modules/${module.id}`} className="rounded-[5px] border border-white/10 bg-white/[0.025] px-3 py-3">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate font-mono text-xs uppercase tracking-[0.12em] text-echo-text">
                  {module.name.replace("ECHO: ", "")}
                </span>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-echo-green shadow-[0_0_12px_currentColor]" />
              </div>
              <p className="mt-2 truncate text-xs text-echo-muted">{module.category}</p>
            </Link>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function RuntimeStackPanel() {
  return (
    <section className="section-shell py-16">
      <Reveal>
        <div className="grid gap-7 xl:grid-cols-[0.35fr_0.65fr] xl:items-start">
          <div>
            <p className="cyber-label">Runtime stack</p>
            <h2 className="mt-4 font-display text-4xl font-black text-echo-text">
              A platform stack, not a feature card wall.
            </h2>
            <p className="mt-5 text-base leading-8 text-echo-muted">
              The stack stays honest: Minecraft/NeoForge compatibility is the current
              runtime target. Native runtime work remains future-facing until the
              shipped platform says otherwise.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[8px] border border-echo-cyan/20 bg-[#05070a]/72 p-4 sm:p-6">
            <div className="absolute inset-0 bg-echo-grid bg-[size:40px_40px] opacity-10" />
            <div className="relative grid gap-3">
              {architectureLayers.map((layer, index) => (
                <Link
                  key={layer.label}
                  href={layer.href}
                  className="group grid gap-3 rounded-[5px] border border-white/10 bg-white/[0.035] p-4 transition hover:border-echo-cyan/50 hover:bg-echo-cyan/10 sm:grid-cols-[120px_1fr_auto] sm:items-center"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-echo-cyan">
                    Layer {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-display text-xl font-bold text-echo-text">{layer.label}</span>
                    <span className="mt-1 block text-sm text-echo-muted">{layer.value}</span>
                  </span>
                  <ArrowRight size={17} className="text-echo-cyan transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function TerminalFeed({
  media,
  news,
  roadmap
}: {
  media: MediaRecord[];
  news: NewsSummary[];
  roadmap: RoadmapGroup[];
}) {
  return (
    <section className="section-shell py-16">
      <Reveal>
        <div className="rounded-[8px] border border-echo-cyan/20 bg-[#030609] shadow-glow">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-echo-muted">
            <span>Terminal feed</span>
            <span>ECHO public surface</span>
          </div>
          <div className="grid min-w-0 gap-0 lg:grid-cols-3">
            <FeedColumn title="Media" href="/media">
              {media.map((item) => (
                <FeedLink key={item.id} href={item.relatedHref} label={item.title} detail={item.category} />
              ))}
            </FeedColumn>
            <FeedColumn title="News" href="/news">
              {news.map((entry) => (
                <FeedLink key={entry.slug} href={entry.href} label={entry.title} detail={displayNewsDate(entry)} />
              ))}
            </FeedColumn>
            <FeedColumn title="Roadmap" href="/roadmap">
              {roadmap.map((group) => (
                <FeedLink key={group.phase} href="/roadmap" label={group.phase} detail={group.description} />
              ))}
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={siteConfig.links.discord} className="cyber-button cyber-button-secondary min-h-9 px-3 py-1.5 text-xs">
                  <MessagesSquare size={14} />
                  Discord
                </Link>
                <Link href={siteConfig.repositories.releaseIndex} className="cyber-button cyber-button-secondary min-h-9 px-3 py-1.5 text-xs">
                  <Github size={14} />
                  GitHub
                </Link>
              </div>
            </FeedColumn>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FeedColumn({
  title,
  href,
  children
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0 border-b border-white/10 p-4 lg:border-b-0 lg:border-r last:lg:border-r-0">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="cyber-label">{title}</p>
        <Link href={href} className="text-sm font-bold text-echo-cyan">
          Open
        </Link>
      </div>
      <div className="grid min-w-0 gap-2">{children}</div>
    </div>
  );
}

function FeedLink({ href, label, detail }: { href: string; label: string; detail: string }) {
  return (
    <Link href={href} className="block min-w-0 rounded-[5px] border border-white/10 bg-white/[0.025] px-3 py-3 transition hover:border-echo-cyan/50 hover:bg-echo-cyan/10">
      <span className="block truncate text-sm font-semibold text-echo-text">{label}</span>
      <span className="mt-1 block truncate font-mono text-[11px] uppercase tracking-[0.12em] text-echo-muted">
        {detail}
      </span>
    </Link>
  );
}

function MiniLink({ href, label, value }: { href: string; label: string; value: string }) {
  return (
    <Link href={href} className="flex items-center justify-between gap-3 rounded-[5px] border border-white/10 bg-white/[0.035] px-3 py-2 transition hover:border-echo-cyan/45 hover:bg-echo-cyan/10">
      <span className="font-mono text-xs uppercase tracking-[0.13em] text-echo-text">{label}</span>
      <span className="text-xs text-echo-muted">{value}</span>
    </Link>
  );
}
