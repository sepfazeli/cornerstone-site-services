import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ServiceHero from "@/components/ServiceHero";
import Reveal from "@/components/Reveal";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Mobile Auto Detailing Los Angeles — We Come To Your Driveway",
  description:
    "Mobile car detailing in Los Angeles: interior deep cleans, hand wash & polish, ceramic coatings — at your home or office. One-time details or monthly memberships from $99/mo. Call (949) 994-1833.",
  alternates: { canonical: "/auto-detailing" },
};

const packages = [
  {
    name: "The Refresh",
    price: "from $89",
    body: "Hand wash, wheels & tires, windows, interior vacuum and wipe-down. The weekly-driver reset.",
    image: "/images/detail-sponge.jpg",
  },
  {
    name: "The Full Detail",
    price: "from $219",
    body: "Everything in The Refresh plus clay bar, machine polish, interior extraction, leather conditioning and engine bay dressing.",
    image: "/images/detail-interior.jpg",
  },
  {
    name: "The Ceramic",
    price: "from $699",
    body: "Multi-stage paint correction and a professional-grade ceramic coating. Years of gloss and protection, warrantied in writing.",
    image: "/images/detail-droplets.jpg",
  },
];

export default function AutoDetailingPage() {
  return (
    <>
      <ServiceHero
        eyebrow="Mobile auto detailing · Los Angeles"
        title={
          <>
            Showroom finish, in your <em className="text-clay-300 italic">driveway</em>.
          </>
        }
        intro="Our rigs carry water and power — you don't drive anywhere. Interior deep cleans, hand wash and polish, ceramic coatings. One-time or on a membership."
        image="/images/detail-wax.jpg"
        imageAlt="Professional detailer machine-polishing a car hood in Los Angeles"
      />

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Three levels. Zero <em className="text-clay-500">shortcuts</em>.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-clay-500/15 bg-cream-100/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-clay-700/15">
                <div className="relative h-56 overflow-hidden">
                  <Image src={p.image} alt={p.name} fill sizes="(min-width:1024px) 30vw, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-108" />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/50 to-transparent" />
                  <p className="absolute bottom-4 left-5 font-display text-2xl font-semibold text-cream-50">{p.name}</p>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-display text-3xl font-semibold text-clay-600">{p.price}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-espresso-700/90">{p.body}</p>
                  <Link href="/#quote" className="link-line mt-5 font-semibold text-clay-600">
                    Book this detail →
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 rounded-3xl border border-clay-500/20 bg-espresso-900 p-10 text-center lg:p-14">
            <h3 className="font-display text-3xl font-semibold text-cream-50">
              Auto Care Membership — <span className="text-clay-300">from $99/mo</span>
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-cream-100/85">
              Two visits a month, at your home or office. Interior refresh and hand wash
              every visit, quarterly polish included. Pair it with an Estate Care Plan
              and the whole property stays flawless — one call, everything handled.
            </p>
            <Link
              href="/#quote"
              className="btn-sheen mt-8 inline-block rounded-full bg-clay-500 px-8 py-4 font-semibold text-cream-50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-clay-400"
            >
              Start My Membership →
            </Link>
          </div>
        </Reveal>
      </section>

      <QuoteForm />
    </>
  );
}
