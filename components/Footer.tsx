import Link from "next/link";
import Palm from "./Palm";
import { Logo } from "./Logo";
import { site, serviceAreas } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-3 border-pink-300 bg-azure-600 text-cream-50">
      <Palm className="pointer-events-none absolute -right-8 -top-4 h-48 w-auto -scale-x-100 text-azure-500" />
      <Palm className="pointer-events-none absolute -left-10 bottom-0 h-40 w-auto text-azure-500" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo className="[&_span]:!text-cream-50 [&_svg]:!text-pink-300" />
            <p className="mt-5 max-w-sm text-sm font-semibold leading-relaxed text-cream-100/85">
              {site.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`tel:${site.phone}`}
                className="btn-retro rounded-xl bg-pink-300 px-6 py-3 text-lg text-azure-800"
              >
                {site.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="rounded-xl border-3 border-pink-300 px-6 py-3 text-sm font-bold text-cream-50 transition-colors hover:bg-azure-500"
              >
                {site.email}
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <h3 className="display-flat text-xl tracking-[0.25em] text-pink-200 uppercase">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm font-bold">
              {[
                ["/#services", "Services"],
                ["/#results", "Before & After"],
                ["/#plans", "Care Plans"],
                ["/pressure-washing", "Power Washing OC"],
                ["/auto-detailing", "Mobile Auto Detailing OC"],
                ["/#quote", "Photo Quote & Booking"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="link-line text-cream-100/90 hover:text-cream-50">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="display-flat text-xl tracking-[0.25em] text-pink-200 uppercase">Service areas</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-semibold text-cream-100/85">
              {serviceAreas.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t-3 border-pink-300/40 pt-8 text-xs font-bold text-cream-100/70 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.legalName}. {site.tagline}</p>
          <p>Licensed &amp; insured · Orange County based &amp; operated</p>
        </div>
      </div>
    </footer>
  );
}
