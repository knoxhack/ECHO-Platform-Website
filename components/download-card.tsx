import Link from "next/link";
import { AlertTriangle, Download, ExternalLink } from "lucide-react";
import { CyberGlassCard } from "@/components/cyber-glass-card";
import { StatusBadge } from "@/components/status-badge";
import { formatBytes, type ReleaseAsset, type ReleaseAssetKind } from "@/lib/releases";

export type DownloadRecord = {
  id: string;
  platform: string;
  label: string;
  actionLabel: string;
  description: string;
  status: string;
  unavailableStatus?: string;
  unavailableLabel?: string;
  unavailableActionLabel?: string;
  href: string;
  fallbackHref?: string;
  fallbackLabel?: string;
  assetKind?: ReleaseAssetKind;
  assetRepoName?: string;
  assetNameIncludes?: string[];
  assetNameExcludes?: string[];
  requiresAsset?: boolean;
  allowMissingAsset?: boolean;
  notes: string[];
  requirements?: string[];
};

export function DownloadCard({
  download,
  asset
}: {
  download: DownloadRecord;
  asset?: ReleaseAsset;
}) {
  const unavailable = Boolean(download.requiresAsset && !asset);
  const href = asset?.downloadUrl ?? download.href;
  const external = href.startsWith("http");
  const title = unavailable ? download.unavailableLabel || download.label : download.label;
  const actionLabel = unavailable
    ? download.unavailableActionLabel || download.actionLabel
    : download.actionLabel;
  const status = unavailable ? download.unavailableStatus || download.status : download.status;

  return (
    <CyberGlassCard className="h-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="cyber-label">{download.platform}</p>
          <h3 className="mt-3 font-display text-2xl font-bold text-echo-text">{title}</h3>
        </div>
        <StatusBadge label={status} />
      </div>
      <p className="mt-4 text-sm leading-6 text-echo-muted">{download.description}</p>
      {asset ? (
        <div className="mt-5 rounded-[5px] border border-echo-green/25 bg-echo-green/10 p-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-echo-green">
            Matched release asset{asset.repositoryName ? ` - ${asset.repositoryName}` : ""}
          </p>
          <p className="mt-2 break-all font-mono text-xs leading-5 text-echo-text">{asset.name}</p>
          <p className="mt-1 font-mono text-xs text-echo-muted">{formatBytes(asset.size)}</p>
        </div>
      ) : null}
      {unavailable ? (
        <div className="mt-5 flex gap-3 rounded-[5px] border border-echo-amber/25 bg-echo-amber/10 p-3 text-sm leading-6 text-echo-text">
          <AlertTriangle className="mt-0.5 shrink-0 text-echo-amber" size={18} />
          <span>Required release asset not published yet. Use the docs path or GitHub releases.</span>
        </div>
      ) : null}
      <ul className="mt-5 space-y-2 text-sm text-echo-muted">
        {download.notes.map((note) => (
          <li key={note} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-echo-cyan" />
            <span>{note}</span>
          </li>
        ))}
      </ul>
      {download.requirements ? (
        <div className="mt-5 border-t border-white/10 pt-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-echo-muted">
            Requirements
          </p>
          <ul className="mt-3 space-y-2 text-sm text-echo-muted">
            {download.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <Link
        href={href}
        className="cyber-button cyber-button-primary mt-6 w-full"
        aria-label={`${actionLabel} download link`}
      >
        {external ? <ExternalLink size={16} /> : <Download size={16} />}
        {actionLabel}
      </Link>
      {unavailable && download.fallbackHref && download.fallbackLabel ? (
        <Link href={download.fallbackHref} className="cyber-button cyber-button-secondary mt-3 w-full">
          <ExternalLink size={16} />
          {download.fallbackLabel}
        </Link>
      ) : null}
    </CyberGlassCard>
  );
}
