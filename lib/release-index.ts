export const releaseIndexChannelUrl =
  "https://raw.githubusercontent.com/knoxhack/ECHO-Release-Index/main/channels/alpha/launcher-channel.json";

export type ReleaseIndexEntry = {
  id: string;
  kind: "product" | "modpack" | "module" | "addon" | "runtime" | "studio" | "website";
  version: string;
  channel: string;
  publisher: string;
  sourceRepo: string;
  releaseTag: string;
  artifacts: Record<string, unknown>;
  dependencies: Array<{ id: string; kind?: string; version?: string }>;
  compatibility: string[];
  trust: string;
  validation: "approved" | "warning" | "rejected" | "blocked";
};

type ArtifactRecord = {
  role: string;
  name: string;
  url?: string;
  sha256?: string;
};

type ReleaseIndexChannel = {
  channel?: string;
  catalogUrls?: Record<string, string[] | string>;
};

function flattenCatalogUrls(channel: ReleaseIndexChannel): string[] {
  return Object.values(channel.catalogUrls ?? {})
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .filter((value): value is string => typeof value === "string" && value.startsWith("https://raw.githubusercontent.com/"));
}

function artifactRecords(artifacts: unknown): ArtifactRecord[] {
  const records: ArtifactRecord[] = [];
  const visit = (node: unknown, role = "asset") => {
    if (Array.isArray(node)) {
      node.forEach((item) => visit(item, role));
      return;
    }
    if (!node || typeof node !== "object") return;
    const row = node as Record<string, unknown>;
    if (row.file || row.name || row.filename || row.url || row.sha256 || row.downloadUrl) {
      records.push({
        role,
        name: String(row.file ?? row.name ?? row.filename ?? role),
        url: row.url || row.downloadUrl ? String(row.url ?? row.downloadUrl) : undefined,
        sha256: row.sha256 ? String(row.sha256) : undefined
      });
    }
    Object.entries(row).forEach(([key, value]) => visit(value, key));
  };
  visit(artifacts);
  return records;
}

function hasUrlAndSha256(artifact: ArtifactRecord): boolean {
  return Boolean(artifact.url && /^[a-f0-9]{64}$/i.test(String(artifact.sha256 ?? "")));
}

export function hasNativeInstallArtifact(entry: ReleaseIndexEntry): boolean {
  return artifactRecords(entry.artifacts).some(
    (artifact) =>
      hasUrlAndSha256(artifact) &&
      (artifact.role === "native" || /\.echo-addon$/i.test(artifact.name))
  );
}

export function hasModpackManifestArtifact(entry: ReleaseIndexEntry): boolean {
  return artifactRecords(entry.artifacts).some(
    (artifact) =>
      hasUrlAndSha256(artifact) &&
      (artifact.role === "manifest" || /\.pack\.json$/i.test(artifact.name))
  );
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { next: { revalidate: 600 } });
  if (!response.ok) throw new Error(`Release Index fetch failed ${response.status}: ${url}`);
  return response.json() as Promise<T>;
}

export async function getReleaseIndexCatalog(): Promise<{ channel?: string; entries: ReleaseIndexEntry[]; warnings: string[] }> {
  const warnings: string[] = [];
  try {
    const channel = await fetchJson<ReleaseIndexChannel>(releaseIndexChannelUrl);
    const entries: ReleaseIndexEntry[] = [];
    for (const url of flattenCatalogUrls(channel)) {
      try {
        const payload = await fetchJson<ReleaseIndexEntry | ReleaseIndexEntry[]>(url);
        entries.push(...(Array.isArray(payload) ? payload : [payload]));
      } catch (error) {
        warnings.push(error instanceof Error ? error.message : String(error));
      }
    }
    return { channel: channel.channel, entries, warnings };
  } catch (error) {
    return { entries: [], warnings: [error instanceof Error ? error.message : String(error)] };
  }
}

export function approvedEntries(entries: ReleaseIndexEntry[], kind: ReleaseIndexEntry["kind"]) {
  return entries.filter((entry) => {
    if (entry.kind !== kind || entry.validation !== "approved") return false;
    if (kind === "modpack") return hasModpackManifestArtifact(entry);
    if (kind === "module" || kind === "addon") return hasNativeInstallArtifact(entry);
    return true;
  });
}

export function approvedInstallableIds(entries: ReleaseIndexEntry[]) {
  return entries
    .filter((entry) => (entry.kind === "module" || entry.kind === "addon") && entry.validation === "approved")
    .filter((entry) => hasNativeInstallArtifact(entry))
    .map((entry) => entry.id);
}
