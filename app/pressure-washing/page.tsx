import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ServiceHero from "@/components/ServiceHero";
import Reveal from "@/components/Reveal";
import QuoteForm from "@/components/QuoteForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Power Washing Orange County — House, Driveway, Roof & Gutters",
  description:
    "Professional power washing in Orange County: house soft wash, driveway & paver cleaning, roof washing, gutter cleaning, solar panels and paver resanding. Photo quotes in ~2 hours. Call (949) 994-1833.",
  alternates: { canonical: "/pressure-washing" },
};

const surfaces = [
  { title: "House & Stucco Soft Wash", body: "OC sun bakes grime and algae into stucco. Our low-pressure soft wash lifts it with biodegradable detergents — no etching, no stripped paint, no forced water behind siding.", image: "/images/home-1.jpg" },
  { title: "Driveways, Pavers & Concrete", body: "Rotary surface cleaners deliver even, streak-free results on concrete and pavers. Oil, rust and tire marks get targeted pre-treatment; paver resanding locks joints tight after washing.", image: "/images/street-clean.jpg" },
  { title: "Roof, Gutters & Solar", body: "Gentle roof washing that won't void warranties, gutters cleared and flushed, and deionized-water solar cleaning that restores lost panel output.", image: "/images/home-3.jpg" },
  { title: "Patios, Pool Decks & Outdoor Living", body: "Travertine, flagstone, decks and outdoor kitchens each get the right pressure and chemistry. Plants and furniture are protected, pre-soaked and rinsed.", image: "/images/patio.jpg" },
];

export default function PressureWashingPage() {
  return (
    <>
      <ServiceHero
        eyebrow="Power washing · Orange County"
        title={
          <>
            OC grime doesn&apos;t
            <br />
            stand a chance
          </>
        }
        intro="House facades, driveways, roofs, gutters and everything between — deep cleaned once, or kept immaculate on a care plan. Send photos, get a firm quote in about 2 hours."
        image="/images/home-night.jpg"
        imageAlt="Modern Orange County home exterior at night after professional power washing"
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <h2 className="display max-w-2xl text-5xl sm:text-6xl">
            The right pressure for every surface
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-semibold leading-relaxed">
            &ldquo;Max pressure everywhere&rdquo; is how surfaces get ruined. We match
            method, pressure and detergent to each material — that&apos;s the
            difference between blasted and restored.
          </p>
        </Reveal>
        <div className="mt-12 space-y-14">
          {surfaces.map((s, i) => (
            <Reveal key={s.title}>
              <div className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className={`sticker relative aspect-[16/10] overflow-hidden bg-cream-100 ${i % 2 ? "rotate-1" : "-rotate-1"}`}>
                  <Image src={s.image} alt={s.title} fill sizes="(min-width:1024px) 48vw, 92vw" className="object-cover" />
                </div>
                <div>
                  <p className="display-flat text-lg tracking-[0.25em] text-pink-500">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="display-flat mt-1 text-4xl tracking-wide text-azure-500 uppercase">{s.title}</h3>
                  <p className="mt-3 text-lg font-semibold leading-relaxed">{s.body}</p>
                  <Link href="#quote" className="link-line mt-4 inline-block font-bold text-pink-500 uppercase">
                    Quote this →
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y-3 border-pink-300 bg-azure-500 py-16">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <Reveal>
            <h2 className="display-flat text-4xl uppercase text-cream-50 sm:text-5xl [text-shadow:0.05em_0.05em_0_var(--color-azure-700)]">
              Serving all of Orange County
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-semibold text-cream-100/90">
              Irvine to San Clemente, Newport to Yorba Linda. Text photos to{" "}
              <a href={`sms:${site.phone}`} className="font-bold text-pink-200 underline underline-offset-2">
                {site.phoneDisplay}
              </a>{" "}
              or use the form below — quotes back in about 2 business hours.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
        <QuoteForm />
      </section>
    </>
  );
}
