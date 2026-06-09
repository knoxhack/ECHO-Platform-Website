import type { ComponentType } from "react";

import Intro from "@/docs/intro.mdx";
import DeveloperDataStorage from "@/docs/developers/data-storage.mdx";
import DeveloperGettingStarted from "@/docs/developers/getting-started.mdx";
import DeveloperModuleTemplate from "@/docs/developers/module-template.mdx";
import DeveloperNetworking from "@/docs/developers/networking.mdx";
import DeveloperReleaseProcess from "@/docs/developers/release-process.mdx";
import DeveloperServiceContracts from "@/docs/developers/service-contracts.mdx";
import DeveloperUiIntegration from "@/docs/developers/ui-integration.mdx";
import InstallAshfall from "@/docs/install/ashfall.mdx";
import InstallLauncher from "@/docs/install/launcher.mdx";
import InstallTroubleshooting from "@/docs/install/troubleshooting.mdx";
import ModulesCore from "@/docs/modules/core.mdx";
import ModulesHoloMap from "@/docs/modules/holomap.mdx";
import ModulesIndex from "@/docs/modules/index.mdx";
import ModulesLens from "@/docs/modules/lens.mdx";
import ModulesOverview from "@/docs/modules/overview.mdx";
import ModulesTerminal from "@/docs/modules/terminal.mdx";
import PlatformAdapterCore from "@/docs/platform/adaptercore.mdx";
import PlatformLauncher from "@/docs/platform/launcher.mdx";
import PlatformNative from "@/docs/platform/native-platform.mdx";
import PlatformOverview from "@/docs/platform/overview.mdx";
import PlatformPackOS from "@/docs/platform/packos.mdx";
import ReferenceGlossary from "@/docs/reference/glossary.mdx";
import ReferenceModuleManifest from "@/docs/reference/module-manifest.mdx";
import ReferencePackOSManifest from "@/docs/reference/packos-manifest.mdx";
import ReferenceStatusBadges from "@/docs/reference/status-badges.mdx";
import ReleaseAshfallEditions from "@/docs/release/ashfall-editions.mdx";
import ReleaseLauncherIndividualModuleUpdates from "@/docs/release/launcher-individual-module-updates.mdx";
import ReleaseModuleArtifacts from "@/docs/release/module-artifacts.mdx";
import ReleaseIndex from "@/docs/release/release-index.mdx";
import { sdkDocs } from "@/lib/generated-sdk-docs";

export type DocEntry = {
  title: string;
  description: string;
  section: string;
  slug: string[];
  component: ComponentType;
};

export type DocSection = {
  title: string;
  description: string;
  items: DocEntry[];
};

function doc(
  section: string,
  title: string,
  description: string,
  slug: string[],
  component: ComponentType
): DocEntry {
  return { title, description, section, slug, component };
}

export const docsSections: DocSection[] = [
  {
    title: "Start Here",
    description: "The quickest way to understand ECHO as a player, developer, or contributor.",
    items: [
      doc(
        "Start Here",
        "Introduction",
        "What ECHO is, what Ashfall proves, and how the launcher, modules, PackOS, and native direction fit together.",
        ["intro"],
        Intro
      )
    ]
  },
  {
    title: "Players",
    description: "Install ECHO Launcher, play Ashfall, repair installs, and get support.",
    items: [
      doc(
        "Players",
        "Install ECHO Launcher",
        "Download, install, update, and launch official ECHO experiences through the launcher.",
        ["install", "launcher"],
        InstallLauncher
      ),
      doc(
        "Players",
        "Play Ashfall",
        "Install Ashfall, understand the handoff flow, and start the first official ECHO experience.",
        ["install", "ashfall"],
        InstallAshfall
      ),
      doc(
        "Players",
        "Troubleshooting",
        "Repair installs, diagnose launcher issues, and know what to include in support reports.",
        ["install", "troubleshooting"],
        InstallTroubleshooting
      )
    ]
  },
  {
    title: "Platform",
    description: "The architecture behind official ECHO experiences.",
    items: [
      doc(
        "Platform",
        "Platform Overview",
        "The ECHO architecture across launcher, PackOS, modules, contracts, adapters, and future runtime foundations.",
        ["platform", "overview"],
        PlatformOverview
      ),
      doc(
        "Platform",
        "PackOS",
        "Package metadata, manifests, channels, lockfiles, snapshots, and release validation.",
        ["platform", "packos"],
        PlatformPackOS
      ),
      doc(
        "Platform",
        "Native Platform",
        "The long-term runtime-independent direction and what is intentionally not claimed yet.",
        ["platform", "native-platform"],
        PlatformNative
      ),
      doc(
        "Platform",
        "AdapterCore",
        "The shared gameplay contract for Native Loader, NeoForge fallback, Standalone parity, resources, registries, and future runtime targets.",
        ["platform", "adaptercore"],
        PlatformAdapterCore
      ),
      doc(
        "Platform",
        "Launcher Architecture",
        "How ECHO Launcher prepares, repairs, validates, and hands off official experiences.",
        ["platform", "launcher"],
        PlatformLauncher
      )
    ]
  },
  {
    title: "Modules",
    description: "The first-party building blocks that power ECHO experiences.",
    items: [
      doc(
        "Modules",
        "Module System",
        "How ECHO modules share contracts, services, metadata, and player-facing integration surfaces.",
        ["modules", "overview"],
        ModulesOverview
      ),
      doc(
        "Modules",
        "Core Modules",
        "Core, NetCore, DataCore, MissionCore, WorldCore, and RenderCore responsibilities.",
        ["modules", "core"],
        ModulesCore
      ),
      doc(
        "Modules",
        "Terminal",
        "Mission, route, intel, inbox, reward, and addon-tab integration for player command surfaces.",
        ["modules", "terminal"],
        ModulesTerminal
      ),
      doc(
        "Modules",
        "Index",
        "Recipe, item, archive, and discovery integration for ECHO-aware content.",
        ["modules", "index"],
        ModulesIndex
      ),
      doc(
        "Modules",
        "Lens",
        "Scanner providers for blocks, entities, fluids, machines, hazards, and progression clues.",
        ["modules", "lens"],
        ModulesLens
      ),
      doc(
        "Modules",
        "HoloMap",
        "Routes, hazards, relays, missions, anomalies, and world overlay integration.",
        ["modules", "holomap"],
        ModulesHoloMap
      )
    ]
  },
  {
    title: "Developers",
    description: "Build modules and package launcher-aware ECHO experiences.",
    items: [
      doc(
        "Developers",
        "Getting Started",
        "Set up the workspace, build core modules, and create a small ECHO-compatible module.",
        ["developers", "getting-started"],
        DeveloperGettingStarted
      ),
      doc(
        "Developers",
        "Module Template",
        "The expected shape of a module: identity, dependencies, contracts, metadata, docs, and release notes.",
        ["developers", "module-template"],
        DeveloperModuleTemplate
      ),
      doc(
        "Developers",
        "Service Contracts",
        "Design reusable contracts that separate ECHO behavior from runtime-specific implementation details.",
        ["developers", "service-contracts"],
        DeveloperServiceContracts
      ),
      doc(
        "Developers",
        "Networking",
        "Packets, server actions, sync, rate limiting, and debug expectations for ECHO systems.",
        ["developers", "networking"],
        DeveloperNetworking
      ),
      doc(
        "Developers",
        "Data Storage",
        "Persistent player and world data ownership, migration, and save compatibility guidance.",
        ["developers", "data-storage"],
        DeveloperDataStorage
      ),
      doc(
        "Developers",
        "UI Integration",
        "Terminal, Index, Lens, and HoloMap integration surfaces for player-facing modules.",
        ["developers", "ui-integration"],
        DeveloperUiIntegration
      ),
      doc(
        "Developers",
        "Release Process",
        "PackOS metadata, Command Center validation, launcher packaging, and public release readiness.",
        ["developers", "release-process"],
        DeveloperReleaseProcess
      )
    ]
  },
  {
    title: "SDK",
    description: "Generated mirror of the ECHO-SDK docs for schemas, templates, APIs, and authoring guides.",
    items: sdkDocs
  },
  {
    title: "Release & Updates",
    description: "Release ownership, module artifacts, Ashfall editions, and launcher update behavior.",
    items: [
      doc(
        "Release & Updates",
        "Module Artifact Contract",
        "Per-module Native, NeoForge, Standalone, sources, and descriptor file expectations.",
        ["release", "module-artifacts"],
        ReleaseModuleArtifacts
      ),
      doc(
        "Release & Updates",
        "Launcher Individual Module Updates",
        "How the launcher resolves moduleRequirements and updates only changed module files.",
        ["release", "launcher-individual-module-updates"],
        ReleaseLauncherIndividualModuleUpdates
      ),
      doc(
        "Release & Updates",
        "Release Index",
        "The catalog that connects launcher channels, pack metadata, GitHub Releases, and website downloads.",
        ["release", "release-index"],
        ReleaseIndex
      ),
      doc(
        "Release & Updates",
        "Ashfall Editions",
        "Native, NeoForge, and Standalone edition ownership and module artifact families.",
        ["release", "ashfall-editions"],
        ReleaseAshfallEditions
      )
    ]
  },
  {
    title: "Reference",
    description: "Stable language for manifests, badges, and platform terms.",
    items: [
      doc(
        "Reference",
        "Module Manifest",
        "Reference fields for module identity, status, dependencies, standalone support, docs, and release notes.",
        ["reference", "module-manifest"],
        ReferenceModuleManifest
      ),
      doc(
        "Reference",
        "PackOS Manifest",
        "Reference fields for package identity, channels, lockfiles, snapshots, validation, and release gates.",
        ["reference", "packos-manifest"],
        ReferencePackOSManifest
      ),
      doc(
        "Reference",
        "Status Badges",
        "Definitions for Stable, Active, Prototype, Experimental, Planned, Deprecated, and Internal.",
        ["reference", "status-badges"],
        ReferenceStatusBadges
      ),
      doc(
        "Reference",
        "Glossary",
        "Shared terminology for ECHO Platform, Ashfall, PackOS, AdapterCore, modules, and runtime layers.",
        ["reference", "glossary"],
        ReferenceGlossary
      )
    ]
  }
];

export const allDocs = docsSections.flatMap((section) => section.items);

export function docHref(doc: Pick<DocEntry, "slug">) {
  return `/docs/${doc.slug.join("/")}`;
}

export function slugPath(slug: string[]) {
  return slug.join("/");
}

export function findDoc(slug: string[]) {
  const path = slugPath(slug);
  return allDocs.find((docEntry) => slugPath(docEntry.slug) === path);
}

export function adjacentDocs(doc: DocEntry) {
  const index = allDocs.findIndex((entry) => slugPath(entry.slug) === slugPath(doc.slug));
  return {
    previous: index > 0 ? allDocs[index - 1] : undefined,
    next: index >= 0 && index < allDocs.length - 1 ? allDocs[index + 1] : undefined
  };
}
