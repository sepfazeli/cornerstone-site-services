import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ServiceHero from "@/components/ServiceHero";
import Reveal from "@/components/Reveal";
import QuoteForm from "@/components/QuoteForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pressure Washing Los Angeles — House, Driveway & Patio Cleaning",
  description:
    "Professional pressure washing in Los Angeles: facade soft wash, driveway & paver cleaning, patios, pool decks, windows and gutters. Photo quotes in ~2 hours, one-time deep cleans or subscription care plans. Call (949) 994-1833.",
  alternates: { canonical: "/pressure-washing" },
};

const surfaces = [
  { title: "Stucco & Siding Soft Wash", body: "LA sun bakes grime and algae into stucco. Our low-pressure soft wash lifts it with biodegradable detergents — no etching, no stripped paint, no forced water behind siding.", image: "/images/home-1.jpg" },
  { title: "Driveways, Pavers & Concrete", body: "Rotary surface cleaners deliver even, streak-free results on concrete and pavers. Oil, rust and tire marks get targeted pre-treatment; optional sealing keeps them out.", image: "/images/street-clean.jpg" },
  { title: "Patios, Pool Decks & Outdoor Living", body: "Travertine, flagstone, wood decks and outdoor kitchens each get the right pressure and chemistry. Plants and furniture are protected, pre-soaked and rinsed.", image: "/images/patio.jpg" },
  { title: "Windows, Gutters & Rooflines", body: "Streak-free glass inside and out, gutters cleared and flushed, and roofline runoff staining treated — the details that make the whole facade read clean.", image: "/images/home-3.jpg" },
];

export default function PressureWashingPage() {
  return (
    <>
      <ServiceHero
        eyebrow="Pressure washing · Los Angeles"
        title={
          <>
            LA&apos;s grime doesn&apos;t stand a <em className="text-clay-300 italic">chance</em>.
          </>
        }
        intro="House facades, driveways, patios and everything between — deep cleaned once, or kept immaculate on a subscription. Send photos, get a firm quote in about 2 hours."
        image="/images/home-night.jpg"
        imageAlt="Modern Los Angeles home exterior at night after professional pressure washing"
      />

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            The right pressure for every <em className="text-clay-500">surface</em>.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-espresso-700/90">
            &ldquo;Max pressure everywhere&rdquo; is how surfaces get ruined. We match method,
            pressure and detergent to each material — that&apos;s the difference between
            blasted and restored.
          </p>
        </Reveal>
        <div className="mt-14 space-y-16">
          {surfaces.map((s, i) => (
            <Reveal key={s.title}>
              <div className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-clay-500/15 shadow-lg">
                  <Image src={s.image} alt={s.title} fill sizes="(min-width:1024px) 48vw, 92vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                </div>
                <div>
                  <p className="font-display text-sm tracking-[0.25em] text-clay-500 uppercase">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 font-display text-3xl font-semibold">{s.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-espresso-700/90">{s.body}</p>
                  <Link href="/#quote" className="link-line mt-5 inline-block font-semibold text-clay-600">
                    Quote this →
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-espresso-900 py-20">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-cream-50 sm:text-4xl">
              Serving greater Los Angeles &amp; Orange County
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream-100/80">
              Santa Monica to Pasadena, Long Beach to Newport. Text photos to{" "}
              <a href={`sms:${site.phone}`} className="font-semibold text-clay-300 underline underline-offset-2">
                {site.phoneDisplay}
              </a>{" "}
              or use the form below — quotes back in about 2 business hours.
            </p>
          </Reveal>
        </div>
      </section>

      <QuoteForm />
    </>
  );
}
