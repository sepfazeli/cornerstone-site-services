import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { site } from "@/lib/site";

const stats = [
  { value: "2 hrs", label: "avg. quote turnaround" },
  { value: "500+", label: "LA properties cared for" },
  { value: "4.9★", label: "average client rating" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/home-2.jpg"
          alt="Freshly washed modern Los Angeles home exterior at dusk"
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/55 to-espresso-950/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso-950/60 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-40 lg:px-8 lg:pb-24">
        <Reveal>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cream-50/25 bg-cream-50/10 px-4 py-1.5 text-xs font-medium tracking-[0.22em] text-cream-100 backdrop-blur-sm uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-clay-300" />
            Los Angeles · Exterior Cleaning · Auto Detailing
          </p>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="max-w-4xl font-display text-5xl leading-[1.05] font-semibold text-cream-50 sm:text-6xl lg:text-7xl">
            Your property,
            <br />
            <em className="text-clay-300 not-italic font-display italic">immaculate</em> on schedule.
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-100/90">
            Pressure washing, facade soft-wash, and mobile auto detailing across LA.
            Text us photos, get a firm quote in hours, and book your slot online.{" "}
            <span className="font-semibold text-cream-50">{site.tagline}</span>
          </p>
        </Reveal>

        <Reveal delay={360}>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/#quote"
              className="btn-sheen group rounded-full bg-clay-500 px-8 py-4 text-base font-semibold text-cream-50 shadow-xl shadow-clay-700/40 transition-all duration-300 hover:-translate-y-1 hover:bg-clay-400"
            >
              Get a Photo Quote
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <a
              href={`tel:${site.phone}`}
              className="rounded-full border border-cream-50/35 bg-cream-50/5 px-8 py-4 text-base font-semibold text-cream-50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cream-50/70 hover:bg-cream-50/15"
            >
              Call {site.phoneDisplay}
            </a>
          </div>
        </Reveal>

        <Reveal delay={480}>
          <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-cream-50/20 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="font-display text-3xl font-semibold text-cream-50 sm:text-4xl">
                    {s.value}
                  </span>
                  <span aria-hidden className="mt-1 block text-xs tracking-wide text-cream-100/70 uppercase">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
        <div className="animate-float flex h-12 w-7 items-start justify-center rounded-full border border-cream-50/30 p-1.5">
          <div className="h-2.5 w-1 rounded-full bg-cream-50/70" />
        </div>
      </div>
    </section>
  );
}
