"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#results", label: "Results" },
  { href: "/#plans", label: "Plans" },
  { href: "/pressure-washing", label: "Pressure Washing" },
  { href: "/auto-detailing", label: "Auto Detailing" },
  { href: "/#faq", label: "FAQ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream-50/90 shadow-[0_1px_0_0_rgba(166,90,67,0.15),0_10px_30px_-15px_rgba(47,27,20,0.25)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" aria-label="Cornerstone Site Services — home" onClick={() => setOpen(false)}>
          <Logo compact />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="link-line text-sm font-medium tracking-wide text-espresso-800/90 hover:text-clay-600"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${site.phone}`}
            className="text-sm font-semibold tracking-wide text-espresso-800 hover:text-clay-600"
          >
            {site.phoneDisplay}
          </a>
          <Link
            href="/#quote"
            className="btn-sheen rounded-full bg-clay-500 px-5 py-2.5 text-sm font-semibold text-cream-50 shadow-lg shadow-clay-500/25 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-clay-600"
          >
            Get My Quote
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-clay-500/30 text-espresso-900 lg:hidden"
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full bg-current transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-[5px] h-0.5 w-full bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 top-[10px] h-0.5 w-full bg-current transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {/* mobile menu */}
      <div
        className={`grid overflow-hidden bg-cream-50/95 backdrop-blur-md transition-all duration-400 lg:hidden ${
          open ? "grid-rows-[1fr] border-b border-clay-500/15" : "grid-rows-[0fr]"
        }`}
      >
        <nav className="min-h-0 overflow-hidden px-6" aria-label="Mobile">
          <div className="flex flex-col gap-1 py-4">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-espresso-800 hover:bg-cream-100"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/#quote"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-clay-500 px-5 py-3 text-center font-semibold text-cream-50"
            >
              Get My Quote
            </Link>
            <a
              href={`tel:${site.phone}`}
              className="py-3 text-center text-sm font-semibold text-clay-600"
            >
              Call {site.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
