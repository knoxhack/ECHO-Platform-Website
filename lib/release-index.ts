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

type ReleaseIndexChannel = {
  channel?: string;
  catalogUrls?: Record<string, string[] | string>;
};

function flattenCatalogUrls(channel: ReleaseIndexChannel): string[] {
  return Object.values(channel.catalogUrls ?? {})
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .filter((value): value is string => typeof value === "string" && value.startsWith("https://raw.githubusercontent.com/"));
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
  return entries.filter((entry) => entry.kind === kind && entry.validation === "approved");
}

export function approvedInstallableIds(entries: ReleaseIndexEntry[]) {
  return entries
    .filter((entry) => (entry.kind === "module" || entry.kind === "addon") && entry.validation === "approved")
    .map((entry) => entry.id);
}
