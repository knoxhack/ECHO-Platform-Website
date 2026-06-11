"use client";

import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/platform", label: "Platform" },
  { href: "/ashfall", label: "Ashfall" },
  { href: "/sky-relay", label: "Sky Relay" },
  { href: "/launcher", label: "Launcher" },
  { href: "/modules", label: "Modules" },
  { href: "/sdk", label: "SDK" },
  { href: "/studios", label: "Studios" },
  { href: "/docs", label: "Docs" },
  { href: "/download", label: "Download" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070a]/82 backdrop-blur-xl">
      <nav className="section-shell flex min-h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-[6px] border border-echo-cyan/35 bg-echo-cyan/10 font-mono text-sm font-black text-echo-cyan shadow-glow">
            E
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-bold uppercase tracking-[0.18em] text-echo-text">
              ECHO
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-echo-muted">
              Platform
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-[4px] px-3 py-2 text-sm transition ${
                  active
                    ? "bg-echo-cyan/10 text-echo-cyan"
                    : "text-echo-muted hover:bg-white/[0.045] hover:text-echo-text"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/download" className="cyber-button cyber-button-primary hidden sm:inline-flex">
            <Download size={16} />
            Download
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="cyber-button cyber-button-secondary px-3 lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-[#061019]/95 lg:hidden">
          <div className="section-shell grid gap-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-[5px] border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-echo-text"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/download"
              onClick={() => setOpen(false)}
              className="cyber-button cyber-button-primary mt-1"
            >
              <Download size={16} />
              Download
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
