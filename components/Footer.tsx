import Link from "next/link";
import { Logo } from "./Logo";
import { site, serviceAreas } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-espresso-950 text-cream-100">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo className="text-cream-100 [&_span]:!text-cream-100 [&_svg]:!text-clay-300" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-100/70">
              {site.description}
            </p>
            <a
              href={`tel:${site.phone}`}
              className="mt-6 inline-block rounded-full border border-clay-400/50 px-6 py-3 font-semibold text-cream-50 transition-colors hover:bg-clay-500"
            >
              {site.phoneDisplay}
            </a>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-xs font-semibold tracking-[0.25em] text-clay-300 uppercase">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ["/#services", "Services"],
                ["/#results", "Before & After"],
                ["/#plans", "Care Plans"],
                ["/pressure-washing", "Pressure Washing LA"],
                ["/auto-detailing", "Mobile Auto Detailing LA"],
                ["/#quote", "Photo Quote & Booking"],
                ["/#faq", "FAQ"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="link-line text-cream-100/80 hover:text-cream-50">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.25em] text-clay-300 uppercase">Service areas</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-cream-100/70">
              {serviceAreas.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream-100/10 pt-8 text-xs text-cream-100/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.legalName}. {site.tagline}</p>
          <p>Licensed &amp; insured · Serving greater Los Angeles &amp; Orange County</p>
        </div>
      </div>
    </footer>
  );
}
