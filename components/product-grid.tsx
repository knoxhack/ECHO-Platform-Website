import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { CyberGlassCard } from "@/components/cyber-glass-card";
import { StatusBadge } from "@/components/status-badge";
import type { ProductRecord } from "@/lib/products";

export function ProductGrid({
  products,
  compact = false
}: {
  products: ProductRecord[];
  compact?: boolean;
}) {
  return (
    <div className={`grid gap-4 ${compact ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-2 xl:grid-cols-3"}`}>
      {products.map((product) => (
        <CyberGlassCard key={product.repoName} className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="cyber-label">{product.releaseKind}</p>
              <h3 className="mt-3 font-display text-xl font-bold text-echo-text">
                {product.product}
              </h3>
            </div>
            <StatusBadge label={product.status} />
          </div>
          <p className="mt-4 flex-1 text-sm leading-6 text-echo-muted">{product.tagline}</p>
          <div className="mt-5 grid gap-2 border-t border-white/10 pt-4 font-mono text-[11px] uppercase tracking-[0.13em] text-echo-muted sm:grid-cols-2">
            <span>{product.assetCount} assets</span>
            <span>{product.repoName}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href={product.route} className="cyber-button cyber-button-primary min-h-9 px-3 py-1.5 text-xs">
              Open
              <ArrowRight size={14} />
            </Link>
            <Link href={product.docsHref} className="cyber-button cyber-button-secondary min-h-9 px-3 py-1.5 text-xs">
              Docs
            </Link>
            <Link href={product.repoUrl} className="cyber-button cyber-button-secondary min-h-9 px-3 py-1.5 text-xs">
              <Github size={14} />
              Repo
            </Link>
            <Link href={product.releaseUrl} className="cyber-button cyber-button-secondary min-h-9 px-3 py-1.5 text-xs">
              <ExternalLink size={14} />
              Release
            </Link>
          </div>
        </CyberGlassCard>
      ))}
    </div>
  );
}
