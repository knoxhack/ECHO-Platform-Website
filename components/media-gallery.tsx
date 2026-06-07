"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/status-badge";

export type MediaRecord = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  kind: "image";
  featured: boolean;
  relatedHref: string;
  ctaLabel: string;
};

type MediaGalleryProps = {
  media: MediaRecord[];
};

export function MediaGallery({ media }: MediaGalleryProps) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(media.map((item) => item.category)))],
    [media]
  );
  const [activeCategory, setActiveCategory] = useState("All");
  const featured = media.filter((item) => item.featured);
  const filteredMedia =
    activeCategory === "All"
      ? media
      : media.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-10">
      <div className="grid items-start gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        {featured[0] ? <FeaturedMedia item={featured[0]} /> : null}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {featured.slice(1, 3).map((item) => (
            <MediaCard key={item.id} item={item} compact />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const active = category === activeCategory;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-[4px] border px-3 py-2 font-mono text-xs uppercase tracking-[0.13em] transition ${
                active
                  ? "border-echo-cyan/50 bg-echo-cyan/15 text-echo-cyan"
                  : "border-white/10 bg-white/[0.035] text-echo-muted hover:border-echo-cyan/35 hover:text-echo-text"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filteredMedia.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function FeaturedMedia({ item }: { item: MediaRecord }) {
  return (
    <article className="cyber-panel overflow-hidden rounded-[6px]">
      <Link href={item.relatedHref} className="group relative block aspect-video overflow-hidden">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          priority
          className="object-cover transition duration-500 group-hover:scale-[1.025]"
          sizes="(min-width: 1024px) 58vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/25 to-transparent" />
        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          <StatusBadge label="Featured" tone="green" />
          <StatusBadge label={item.category} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="max-w-2xl font-display text-3xl font-bold text-echo-text">
            {item.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-echo-muted">
            {item.description}
          </p>
        </div>
      </Link>
      <div className="border-t border-white/10 p-5">
        <Link href={item.relatedHref} className="inline-flex items-center gap-2 text-sm font-semibold text-echo-cyan">
          {item.ctaLabel}
          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}

function MediaCard({ item, compact = false }: { item: MediaRecord; compact?: boolean }) {
  return (
    <article className="cyber-panel flex h-full flex-col overflow-hidden rounded-[6px]">
      <Link href={item.relatedHref} className="group relative block aspect-video overflow-hidden">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          loading="eager"
          className="object-cover transition duration-500 group-hover:scale-[1.025]"
          sizes={compact ? "(min-width: 1024px) 34vw, 50vw" : "(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent" />
        <div className="absolute left-4 top-4">
          <span className="grid h-10 w-10 place-items-center rounded-[5px] border border-echo-cyan/30 bg-[#05070a]/78 text-echo-cyan backdrop-blur">
            <ImageIcon size={18} />
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="cyber-label">{item.category}</p>
          {item.featured ? <StatusBadge label="Featured" tone="green" /> : null}
        </div>
        <h3 className="mt-3 font-display text-xl font-bold text-echo-text">{item.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-echo-muted">{item.description}</p>
        <Link href={item.relatedHref} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-echo-cyan">
          {item.ctaLabel}
          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}
