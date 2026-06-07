import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { StatusStrip } from "@/components/status-strip";

type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export function HeroSection({
  eyebrow,
  title,
  kicker,
  description,
  actions = [],
  statusItems,
  children,
  image = "/images/echo-platform-hero.png",
  imageClassName = "object-cover opacity-40",
  compact = false
}: {
  eyebrow?: string;
  title: string;
  kicker?: string;
  description: string;
  actions?: HeroAction[];
  statusItems?: Array<{ name: string; status: string }>;
  children?: ReactNode;
  image?: string;
  imageClassName?: string;
  compact?: boolean;
}) {
  return (
    <section className={`relative overflow-hidden ${compact ? "py-16 sm:py-20" : "py-20 sm:py-28"}`}>
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt=""
          fill
          priority={!compact}
          className={imageClassName}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-[#05070a]/82 to-[#05070a]/34" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-[#05070a]/64" />
      </div>

      <div className="section-shell">
        <div className="max-w-4xl">
          {eyebrow ? <p className="cyber-label mb-4">{eyebrow}</p> : null}
          <h1 className="font-display text-5xl font-black tracking-normal text-echo-text sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {kicker ? (
            <p className="mt-5 max-w-3xl font-display text-2xl font-semibold text-echo-cyan sm:text-3xl">
              {kicker}
            </p>
          ) : null}
          <p className="mt-6 max-w-3xl text-lg leading-8 text-echo-muted sm:text-xl">
            {description}
          </p>
          {actions.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((action) => (
                <Link
                  key={action.href + action.label}
                  href={action.href}
                  className={`cyber-button ${
                    action.variant === "secondary"
                      ? "cyber-button-secondary"
                      : "cyber-button-primary"
                  }`}
                >
                  {action.label}
                  <ArrowRight size={16} />
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {children ? <div className="mt-10">{children}</div> : null}
        {statusItems ? <div className="mt-10"><StatusStrip items={statusItems} /></div> : null}
      </div>
    </section>
  );
}
