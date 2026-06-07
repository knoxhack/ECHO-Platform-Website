import type { ComponentType } from "react";

import AdapterCoreExplained from "@/news/adaptercore-explained.mdx";
import BuildingPackOS from "@/news/building-packos.mdx";
import DevTalk3 from "@/news/dev-talk-3.mdx";
import { formatReleaseDate, getEchoReleases, type EchoRelease } from "@/lib/releases";
import { siteConfig } from "@/lib/site";

export type NewsCategory =
  | "Dev Talk"
  | "Launcher Release"
  | "Ashfall Update"
  | "Platform Update"
  | "Module Spotlight"
  | "Roadmap Update";

export type NewsSource = "mdx" | "release";

export type NewsRelatedLink = {
  label: string;
  href: string;
};

export type NewsEntry = {
  slug: string;
  title: string;
  description: string;
  category: NewsCategory;
  status: string;
  publishedAt: string | null;
  publishedLabel?: string;
  videoId?: string;
  youtubeUrl?: string;
  thumbnailUrl?: string;
  relatedLinks: NewsRelatedLink[];
  relatedModules: string[];
  component?: ComponentType;
  source: NewsSource;
  release?: EchoRelease;
  priority: number;
};

export type NewsSummary = Omit<NewsEntry, "component" | "release"> & {
  href: string;
};

const ECHO_LABS_CHANNEL = siteConfig.links.youtube;

export const manualNews: NewsEntry[] = [
  {
    slug: "dev-talk-3-standalone-engine",
    title: "ECHO Dev Talk #3 - Turning ECHO Into a Standalone Engine",
    description:
      "A platform-level talk about how ECHO moves beyond a loose modpack model through launcher systems, PackOS, modules, adapters, and future native runtime foundations.",
    category: "Dev Talk",
    status: "Live on YouTube",
    publishedAt: null,
    publishedLabel: "Live on YouTube",
    videoId: "IPRMmSSrXAg",
    youtubeUrl: "https://www.youtube.com/watch?v=IPRMmSSrXAg",
    thumbnailUrl: "https://i.ytimg.com/vi/IPRMmSSrXAg/hqdefault.jpg",
    relatedLinks: [
      { label: "Native platform docs", href: "/docs/platform/native-platform" },
      { label: "Platform overview", href: "/platform" },
      { label: "ECHO Labs channel", href: ECHO_LABS_CHANNEL }
    ],
    relatedModules: ["echocore", "echonetcore", "echodatacore"],
    component: DevTalk3,
    source: "mdx",
    priority: 300
  },
  {
    slug: "adaptercore-explained",
    title: "ECHO AdapterCore Explained - The Bridge Between Minecraft, NeoForge, and ECHO Native",
    description:
      "A focused explanation of AdapterCore as the boundary between current Minecraft/NeoForge compatibility and future runtime-independent ECHO systems.",
    category: "Platform Update",
    status: "Live on YouTube",
    publishedAt: null,
    publishedLabel: "Live on YouTube",
    videoId: "48ov2fg6jZI",
    youtubeUrl: "https://www.youtube.com/watch?v=48ov2fg6jZI",
    thumbnailUrl: "https://i.ytimg.com/vi/48ov2fg6jZI/hqdefault.jpg",
    relatedLinks: [
      { label: "AdapterCore docs", href: "/docs/platform/adaptercore" },
      { label: "Platform architecture", href: "/platform" },
      { label: "ECHO Labs channel", href: ECHO_LABS_CHANNEL }
    ],
    relatedModules: ["echocore", "echoworldcore", "echorendercore"],
    component: AdapterCoreExplained,
    source: "mdx",
    priority: 290
  },
  {
    slug: "building-packos",
    title: "ECHO: Building PackOS - The Architecture of a Deterministic Modding Platform",
    description:
      "A PackOS architecture talk covering release metadata, manifests, package validation, deterministic installs, and why launcher-managed assets matter.",
    category: "Dev Talk",
    status: "Live on YouTube",
    publishedAt: null,
    publishedLabel: "Live on YouTube",
    videoId: "CthtM2D4kC4",
    youtubeUrl: "https://www.youtube.com/watch?v=CthtM2D4kC4",
    thumbnailUrl: "https://i.ytimg.com/vi/CthtM2D4kC4/hqdefault.jpg",
    relatedLinks: [
      { label: "PackOS docs", href: "/docs/platform/packos" },
      { label: "Download portal", href: "/download" },
      { label: "ECHO Labs channel", href: ECHO_LABS_CHANNEL }
    ],
    relatedModules: ["echocore", "echodatacore", "echomissioncore"],
    component: BuildingPackOS,
    source: "mdx",
    priority: 280
  }
];

export async function getAllNewsEntries(): Promise<NewsEntry[]> {
  const releases = await getEchoReleases();
  const releaseNews = releases.map(releaseToNewsEntry);
  return [...manualNews, ...releaseNews].sort(sortNewsEntries);
}

export async function findNewsEntry(slug: string): Promise<NewsEntry | undefined> {
  const entries = await getAllNewsEntries();
  return entries.find((entry) => entry.slug === slug);
}

export async function adjacentNews(entry: NewsEntry) {
  const entries = await getAllNewsEntries();
  const index = entries.findIndex((item) => item.slug === entry.slug);

  return {
    previous: index > 0 ? entries[index - 1] : undefined,
    next: index >= 0 && index < entries.length - 1 ? entries[index + 1] : undefined
  };
}

export function newsHref(entry: Pick<NewsEntry, "slug">) {
  return `/news/${entry.slug}`;
}

export function toNewsSummary(entry: NewsEntry): NewsSummary {
  return {
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    category: entry.category,
    status: entry.status,
    publishedAt: entry.publishedAt,
    publishedLabel: entry.publishedLabel,
    videoId: entry.videoId,
    youtubeUrl: entry.youtubeUrl,
    thumbnailUrl: entry.thumbnailUrl,
    relatedLinks: entry.relatedLinks,
    relatedModules: entry.relatedModules,
    source: entry.source,
    priority: entry.priority,
    href: newsHref(entry)
  };
}

export function displayNewsDate(entry: Pick<NewsEntry, "publishedAt" | "publishedLabel">) {
  if (entry.publishedLabel) return entry.publishedLabel;
  if (!entry.publishedAt) return "Undated";
  return formatReleaseDate(entry.publishedAt);
}

function releaseToNewsEntry(release: EchoRelease): NewsEntry {
  const packAssets = release.assets.filter((asset) =>
    ["echo-pack", "pack-manifest", "release-metadata"].includes(asset.kind)
  );

  return {
    slug: `release-${slugifyReleaseTag(release.tag)}`,
    title: release.title,
    description: `${release.title} published with ${release.assets.length} release assets, including ${packAssets.length} PackOS package asset${packAssets.length === 1 ? "" : "s"} and checksum-backed downloads.`,
    category: "Launcher Release",
    status: release.prerelease ? "Prerelease" : "Public Release",
    publishedAt: release.publishedAt,
    relatedLinks: [
      { label: "Download portal", href: "/download" },
      { label: "GitHub release", href: release.htmlUrl },
      { label: "Launcher docs", href: "/docs/install/launcher" }
    ],
    relatedModules: [],
    source: "release",
    release,
    priority: 100
  };
}

function slugifyReleaseTag(tag: string) {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sortNewsEntries(a: NewsEntry, b: NewsEntry) {
  if (a.priority !== b.priority) return b.priority - a.priority;

  const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
  const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
  return bTime - aTime || a.title.localeCompare(b.title);
}
