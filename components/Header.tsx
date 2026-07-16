"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#results", label: "Results" },
  { href: "/#plans", label: "Plans" },
  { href: "/pressure-washing", label: "Power Washing" },
  { href: "/auto-detailing", label: "Auto Detailing" },
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
      className={`fixed inset-x-0 top-0 z-50 border-b-3 transition-all duration-300 ${
        scrolled
          ? "border-pink-300 bg-cream-50/95 shadow-[0_8px_0_0_rgba(245,178,186,0.25)] backdrop-blur-md"
          : "border-transparent bg-cream-50/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" aria-label="Cornerstone Site Services — home" onClick={() => setOpen(false)}>
          <Logo compact />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="link-line text-sm font-bold tracking-wide text-azure-700 uppercase hover:text-azure-500"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${site.phone}`}
            className="display-flat text-lg tracking-wider text-azure-500 hover:text-azure-400"
          >
            {site.phoneDisplay}
          </a>
          <Link
            href="/#quote"
            className="btn-retro rounded-xl bg-pink-300 px-5 py-2.5 text-base text-azure-800"
          >
            Get a Quote
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="flex h-11 w-11 items-center justify-center rounded-xl border-3 border-pink-300 text-azure-600 lg:hidden"
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
          open ? "grid-rows-[1fr] border-b-3 border-pink-300" : "grid-rows-[0fr]"
        }`}
      >
        <nav className="min-h-0 overflow-hidden px-6" aria-label="Mobile">
          <div className="flex flex-col gap-1 py-4">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-bold text-azure-700 uppercase hover:bg-pink-100"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/#quote"
              onClick={() => setOpen(false)}
              className="btn-retro mt-2 rounded-xl bg-pink-300 px-5 py-3 text-center text-azure-800"
            >
              Get a Quote
            </Link>
            <a
              href={`tel:${site.phone}`}
              className="display-flat py-3 text-center text-xl text-azure-500"
            >
              Call {site.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
