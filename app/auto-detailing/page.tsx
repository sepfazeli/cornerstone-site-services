import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ServiceHero from "@/components/ServiceHero";
import Reveal from "@/components/Reveal";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Mobile Auto Detailing Orange County — We Come To Your Driveway",
  description:
    "Mobile car detailing in Orange County: interior deep cleans, hand wash & polish, ceramic coatings — at your home or office. One-time details or monthly memberships from $99/mo. Call (949) 994-1833.",
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
        eyebrow="Mobile auto detailing · Orange County"
        title={
          <>
            Showroom finish,
            <br />
            in your driveway
          </>
        }
        intro="Our rigs carry water and power — you don't drive anywhere. Interior deep cleans, hand wash and polish, ceramic coatings. One-time or on a membership."
        image="/images/detail-wax.jpg"
        imageAlt="Professional detailer machine-polishing a car hood in Orange County"
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <h2 className="display max-w-2xl text-5xl sm:text-6xl">
            Three levels. Zero shortcuts
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <article className={`sticker group flex h-full flex-col overflow-hidden bg-cream-100 transition-transform duration-200 hover:-translate-y-1.5 ${i % 2 ? "rotate-[0.5deg]" : "-rotate-[0.5deg]"}`}>
                <div className="relative h-52 overflow-hidden border-b-3 border-pink-300">
                  <Image src={p.image} alt={p.name} fill sizes="(min-width:1024px) 30vw, 92vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="display-flat text-3xl tracking-wide text-azure-500 uppercase">{p.name}</h3>
                  <p className="display-flat mt-1 text-4xl text-pink-500">{p.price}</p>
                  <p className="mt-3 flex-1 text-sm font-semibold leading-relaxed">{p.body}</p>
                  <Link href="#quote" className="link-line mt-4 self-start font-bold text-pink-500 uppercase">
                    Book this detail →
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="sticker-blue mt-14 bg-azure-500 p-10 text-center lg:p-14">
            <h3 className="display-flat text-4xl uppercase text-cream-50 [text-shadow:0.05em_0.05em_0_var(--color-azure-700)]">
              Auto Care Membership — <span className="text-pink-200">from $99/mo</span>
            </h3>
            <p className="mx-auto mt-4 max-w-2xl font-semibold text-cream-100/90">
              Two visits a month, at your home or office. Interior refresh and hand
              wash every visit, quarterly polish included. Pair it with a Care Plan
              and the whole property stays flawless — one call, everything handled.
            </p>
            <Link
              href="#quote"
              className="btn-retro mt-7 inline-block rounded-xl bg-pink-300 px-8 py-4 text-xl text-azure-800"
            >
              Start My Membership →
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-20 lg:px-8">
        <QuoteForm />
      </section>
    </>
  );
}
