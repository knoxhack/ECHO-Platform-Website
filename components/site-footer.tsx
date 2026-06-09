import Link from "next/link";
import socials from "@/data/socials.json";
import { siteConfig } from "@/lib/site";

const footerGroups = [
  {
    title: "Platform",
    links: [
      { href: "/platform", label: "Overview" },
      { href: "/native-platform", label: "Native Platform" },
      { href: "/standalone-runtime", label: "Standalone Runtime" },
      { href: "/release-index", label: "Release Index" },
      { href: "/launcher", label: "Launcher" },
      { href: "/modules", label: "Modules" },
      { href: "/media", label: "Media" }
    ]
  },
  {
    title: "Ashfall",
    links: [
      { href: "/ashfall", label: "Overview" },
      { href: "/ashfall/native-edition", label: "Native Edition" },
      { href: "/ashfall/neoforge-edition", label: "NeoForge Edition" },
      { href: "/ashfall/standalone-edition", label: "Standalone Edition" }
    ]
  },
  {
    title: "Build",
    links: [
      { href: "/developers", label: "Developers" },
      { href: "/sdk", label: "SDK" },
      { href: "/developer-studio", label: "Developer Studio" },
      { href: "/addons-studio", label: "Addons Studio" },
      { href: "/docs", label: "Docs" },
      { href: "/download", label: "Downloads" }
    ]
  },
  {
    title: "Community",
    links: socials.map((social) => ({ href: social.url, label: social.name }))
  }
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-[#05070a]/80">
      <div className="section-shell grid gap-10 py-12 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-[6px] border border-echo-cyan/35 bg-echo-cyan/10 font-mono font-black text-echo-cyan">
              E
            </span>
            <div>
              <p className="font-display text-lg font-bold uppercase tracking-[0.18em]">
                ECHO Platform
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-echo-muted">
                Official ecosystem gateway
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-6 text-echo-muted">
            Official home of ECHO experiences, first-party modules, launcher tools,
            PackOS validation, and future runtime-independent platform foundations.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={siteConfig.links.discord} className="font-mono text-xs uppercase tracking-[0.14em] text-echo-cyan hover:text-echo-text">
              Join Discord
            </Link>
            <Link href={siteConfig.links.youtube} className="font-mono text-xs uppercase tracking-[0.14em] text-echo-cyan hover:text-echo-text">
              ECHO Labs
            </Link>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="cyber-label">{group.title}</p>
              <ul className="mt-4 space-y-3 text-sm text-echo-muted">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link className="hover:text-echo-cyan" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="section-shell flex flex-col gap-2 font-mono text-xs uppercase tracking-[0.14em] text-echo-muted sm:flex-row sm:items-center sm:justify-between">
          <span>ECHO Platform</span>
          <span>Static-first. Launcher-aware. Runtime-facing.</span>
        </div>
      </div>
    </footer>
  );
}
