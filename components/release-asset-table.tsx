import Link from "next/link";
import { Download, ExternalLink } from "lucide-react";
import {
  assetKindLabel,
  formatBytes,
  type ReleaseAsset,
  type ReleaseAssetKind
} from "@/lib/releases";

export function ReleaseAssetTable({
  title,
  description,
  assets,
  compact = false
}: {
  title: string;
  description: string;
  assets: ReleaseAsset[];
  compact?: boolean;
}) {
  if (assets.length === 0) {
    return null;
  }

  const showSource = assets.some((asset) => asset.repositoryName || asset.repositoryProduct);

  return (
    <section className="cyber-panel rounded-[6px] p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="cyber-label">{title}</p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-echo-muted">{description}</p>
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-echo-muted">
          {assets.length} asset{assets.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-sm">
          <thead>
            <tr className="border-y border-white/10 bg-echo-cyan/10 text-left font-mono text-[11px] uppercase tracking-[0.12em] text-echo-cyan">
              <th className="px-3 py-3 font-semibold">Asset</th>
              {showSource ? <th className="px-3 py-3 font-semibold">Source</th> : null}
              <th className="px-3 py-3 font-semibold">Type</th>
              <th className="px-3 py-3 font-semibold">Size</th>
              {!compact ? <th className="px-3 py-3 font-semibold">Checksum</th> : null}
              <th className="px-3 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id} className="border-b border-white/10 align-top">
                <td className="px-3 py-4 font-mono text-xs text-echo-text">{asset.name}</td>
                {showSource ? (
                  <td className="px-3 py-4 text-xs text-echo-muted">
                    <span className="block font-semibold text-echo-text">
                      {asset.repositoryProduct || asset.repositoryName || "Release"}
                    </span>
                    {asset.repositoryName ? (
                      <span className="mt-1 block font-mono text-[11px]">{asset.repositoryName}</span>
                    ) : null}
                  </td>
                ) : null}
                <td className="px-3 py-4 text-echo-muted">{assetKindLabel(asset.kind)}</td>
                <td className="px-3 py-4 font-mono text-xs text-echo-muted">
                  {formatBytes(asset.size)}
                </td>
                {!compact ? (
                  <td className="max-w-[360px] px-3 py-4 font-mono text-[11px] leading-5 text-echo-muted">
                    <span className="break-all">{asset.digest || "Checksum unavailable"}</span>
                  </td>
                ) : null}
                <td className="px-3 py-4">
                  <Link
                    href={asset.downloadUrl}
                    className="inline-flex items-center gap-2 rounded-[4px] border border-white/15 bg-white/[0.045] px-3 py-2 text-xs font-semibold text-echo-text transition hover:border-echo-cyan/60 hover:bg-echo-cyan/10"
                  >
                    <Download size={14} />
                    Download
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ReleaseQuickLinks({
  assets,
  kinds
}: {
  assets: ReleaseAsset[];
  kinds: ReleaseAssetKind[];
}) {
  const quickAssets = kinds
    .map((kind) => assets.find((asset) => asset.kind === kind))
    .filter((asset): asset is ReleaseAsset => Boolean(asset));

  if (quickAssets.length === 0) return null;

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {quickAssets.map((asset) => (
        <Link
          key={asset.id}
          href={asset.downloadUrl}
          className="cyber-button cyber-button-secondary"
        >
          <ExternalLink size={16} />
          {assetKindLabel(asset.kind)}
        </Link>
      ))}
    </div>
  );
}
