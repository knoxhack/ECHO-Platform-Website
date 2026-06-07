export type ReleaseAssetKind =
  | "echo-pack"
  | "pack-manifest"
  | "release-metadata"
  | "module-jar"
  | "native-addon"
  | "native-platform-package"
  | "standalone-runtime"
  | "checksums"
  | "qa-report"
  | "windows-installer"
  | "linux-appimage"
  | "other";

export type ReleaseAsset = {
  id: number;
  name: string;
  kind: ReleaseAssetKind;
  contentType: string;
  size: number;
  digest: string | null;
  downloadUrl: string;
  downloadCount: number;
};

export type EchoRelease = {
  id: number;
  tag: string;
  title: string;
  htmlUrl: string;
  publishedAt: string;
  createdAt: string;
  prerelease: boolean;
  body: string;
  assets: ReleaseAsset[];
};

type GitHubReleaseAsset = {
  id: number;
  name: string;
  content_type?: string;
  size: number;
  digest?: string | null;
  browser_download_url: string;
  download_count?: number;
};

type GitHubRelease = {
  id: number;
  tag_name: string;
  name: string | null;
  html_url: string;
  published_at: string | null;
  created_at: string;
  prerelease: boolean;
  draft: boolean;
  body: string | null;
  assets: GitHubReleaseAsset[];
};

type ReleaseIndexAsset = {
  name: string;
  size?: number;
  sha256?: string;
  browserDownloadUrl?: string;
  path?: string;
};

type ReleaseIndexRepository = {
  repoName: string;
  product: string;
  repoUrl: string;
  release?: {
    htmlUrl?: string;
    draft?: boolean;
    prerelease?: boolean;
  } | null;
  assets?: ReleaseIndexAsset[];
};

type ReleaseIndexManifest = {
  generatedAt?: string;
  releaseTag?: string;
  repositories?: ReleaseIndexRepository[];
};

const CORE_RELEASES_URL =
  process.env.ECHO_CORE_RELEASES_URL ??
  "https://api.github.com/repos/knoxhack/ECHO-Native-Platform-Public-Alpha/releases";
const RELEASE_INDEX_URL =
  process.env.ECHO_RELEASE_INDEX_URL ??
  "https://raw.githubusercontent.com/knoxhack/ECHO-Release-Index-Public-Alpha/main/channels/alpha/release-manifest.json";

export async function getEchoReleases(): Promise<EchoRelease[]> {
  const indexedRelease = await getReleaseIndexDownloadPortal().catch(() => null);
  if (indexedRelease?.assets.length) {
    return [indexedRelease];
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "ECHO-Platform-Website",
    "X-GitHub-Api-Version": "2022-11-28"
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(CORE_RELEASES_URL, {
    headers,
    cache: "force-cache"
  });

  if (!response.ok) {
    return [pendingPublicAlphaRelease()];
  }

  const releases = (await response.json()) as GitHubRelease[];

  if (!Array.isArray(releases)) {
    throw new Error("GitHub releases response was not an array.");
  }

  const normalized = releases
    .filter((release) => !release.draft)
    .map(normalizeRelease)
    .sort(
      (a, b) =>
        new Date(b.publishedAt || b.createdAt).getTime() -
        new Date(a.publishedAt || a.createdAt).getTime()
    );

  if (normalized.length === 0) {
    return [pendingPublicAlphaRelease()];
  }

  return normalized;
}

function pendingPublicAlphaRelease(): EchoRelease {
  return {
    id: -1,
    tag: "v0.1.0-native-public-alpha",
    title: "ECHO Native Platform Public Alpha",
    htmlUrl: "https://github.com/knoxhack/ECHO-Native-Platform-Public-Alpha/releases",
    publishedAt: new Date(0).toISOString(),
    createdAt: new Date(0).toISOString(),
    prerelease: true,
    body:
      "Public alpha release assets are not indexed yet. The website will show direct downloads after the release index is published.",
    assets: []
  };
}

export function classifyAsset(name: string): ReleaseAssetKind {
  const normalized = name.toLowerCase();

  if (normalized.endsWith(".echo-pack.zip")) return "echo-pack";
  if (normalized.endsWith(".pack.json")) return "pack-manifest";
  if (normalized === "echo-release.json") return "release-metadata";
  if (normalized.includes("checksum") || normalized === "checksums.txt") return "checksums";
  if (normalized.includes("final-qa") || normalized.includes("release-prep") || normalized.includes("proof-gate")) return "qa-report";
  if (normalized.endsWith(".echo-addon")) return "native-addon";
  if (normalized.includes("standalone") && (normalized.endsWith(".zip") || normalized.endsWith(".jar"))) return "standalone-runtime";
  if (normalized.includes("native-product") && normalized.endsWith(".zip")) return "native-platform-package";
  if (normalized.endsWith(".jar")) return "module-jar";
  if (normalized.endsWith(".exe") || normalized.endsWith(".msi")) return "windows-installer";
  if (normalized.endsWith(".appimage")) return "linux-appimage";

  return "other";
}

export function assetKindLabel(kind: ReleaseAssetKind): string {
  switch (kind) {
    case "echo-pack":
      return "ECHO pack archive";
    case "pack-manifest":
      return "PackOS manifest";
    case "release-metadata":
      return "Release metadata";
    case "module-jar":
      return "Module artifact";
    case "native-addon":
      return "Native addon package";
    case "native-platform-package":
      return "Native Platform package";
    case "standalone-runtime":
      return "Standalone Runtime artifact";
    case "checksums":
      return "Checksums";
    case "qa-report":
      return "QA report";
    case "windows-installer":
      return "Windows launcher installer";
    case "linux-appimage":
      return "Linux AppImage";
    default:
      return "Other asset";
  }
}

export function findAssetByKind(
  release: EchoRelease,
  kind: ReleaseAssetKind
): ReleaseAsset | undefined {
  return release.assets.find((asset) => asset.kind === kind);
}

export function assetsByKind(release: EchoRelease, kind: ReleaseAssetKind): ReleaseAsset[] {
  return release.assets.filter((asset) => asset.kind === kind);
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  const precision = size >= 100 || unitIndex === 0 ? 0 : 1;
  return `${size.toFixed(precision)} ${units[unitIndex]}`;
}

export function formatReleaseDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

function normalizeRelease(release: GitHubRelease): EchoRelease {
  return {
    id: release.id,
    tag: release.tag_name,
    title: release.name || release.tag_name,
    htmlUrl: release.html_url,
    publishedAt: release.published_at || release.created_at,
    createdAt: release.created_at,
    prerelease: release.prerelease,
    body: release.body || "",
    assets: release.assets.map(normalizeAsset).sort((a, b) => {
      const kindOrder: ReleaseAssetKind[] = [
        "windows-installer",
        "linux-appimage",
        "echo-pack",
        "pack-manifest",
        "release-metadata",
        "native-platform-package",
        "standalone-runtime",
        "native-addon",
        "module-jar",
        "checksums",
        "qa-report",
        "other"
      ];

      const kindDiff = kindOrder.indexOf(a.kind) - kindOrder.indexOf(b.kind);
      return kindDiff || a.name.localeCompare(b.name);
    })
  };
}

function normalizeAsset(asset: GitHubReleaseAsset): ReleaseAsset {
  return {
    id: asset.id,
    name: asset.name,
    kind: classifyAsset(asset.name),
    contentType: asset.content_type || "application/octet-stream",
    size: asset.size,
    digest: asset.digest || null,
    downloadUrl: asset.browser_download_url,
    downloadCount: asset.download_count || 0
  };
}

async function getReleaseIndexDownloadPortal(): Promise<EchoRelease | null> {
  const headers: HeadersInit = {
    Accept: "application/json",
    "User-Agent": "ECHO-Platform-Website"
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(RELEASE_INDEX_URL, {
    headers,
    cache: "force-cache"
  });

  if (!response.ok) return null;

  const manifest = (await response.json()) as ReleaseIndexManifest;
  const repositories = manifest.repositories ?? [];
  const assets = repositories.flatMap((repository, repoIndex) =>
    (repository.assets ?? [])
      .filter((asset) => asset.browserDownloadUrl || asset.path)
      .map((asset, assetIndex) => normalizeIndexedAsset(asset, repository, repoIndex, assetIndex))
  );

  if (!assets.length) return null;

  return {
    id: 0,
    tag: manifest.releaseTag ?? "v0.1.0-native-public-alpha",
    title: "ECHO Native Platform Public Alpha",
    htmlUrl:
      repositories.find((repository) => repository.release?.htmlUrl)?.release?.htmlUrl ??
      "https://github.com/knoxhack/ECHO-Native-Platform-Public-Alpha/releases",
    publishedAt: manifest.generatedAt ?? new Date(0).toISOString(),
    createdAt: manifest.generatedAt ?? new Date(0).toISOString(),
    prerelease: true,
    body:
      "Public alpha download portal generated from the ECHO release index. The official website is the public download hub; GitHub Releases store and verify the assets.",
    assets: assets.sort((a, b) => {
      const kindOrder: ReleaseAssetKind[] = [
        "windows-installer",
        "linux-appimage",
        "native-platform-package",
        "standalone-runtime",
        "echo-pack",
        "pack-manifest",
        "release-metadata",
        "native-addon",
        "module-jar",
        "checksums",
        "qa-report",
        "other"
      ];
      const kindDiff = kindOrder.indexOf(a.kind) - kindOrder.indexOf(b.kind);
      return kindDiff || a.name.localeCompare(b.name);
    })
  };
}

function normalizeIndexedAsset(
  asset: ReleaseIndexAsset,
  repository: ReleaseIndexRepository,
  repoIndex: number,
  assetIndex: number
): ReleaseAsset {
  const name = asset.name;
  return {
    id: repoIndex * 10_000 + assetIndex,
    name,
    kind: classifyAsset(name),
    contentType: "application/octet-stream",
    size: asset.size ?? 0,
    digest: asset.sha256 ? `sha256:${asset.sha256}` : null,
    downloadUrl: asset.browserDownloadUrl ?? asset.path ?? repository.repoUrl,
    downloadCount: 0
  };
}
