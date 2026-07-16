import Image from "next/image";
import Palm from "./Palm";
import Reveal from "./Reveal";
import QuoteForm from "./QuoteForm";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20">
      {/* palms peeking behind content */}
      <Palm className="animate-sway pointer-events-none absolute -left-8 top-28 h-40 w-auto origin-bottom text-pink-300/70 lg:h-56" />
      <Palm className="animate-sway pointer-events-none absolute -right-10 top-40 h-32 w-auto origin-bottom -scale-x-100 text-azure-300/50 lg:h-48 [animation-delay:1.2s]" />

      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:px-8">
        {/* left: photos */}
        <div className="relative hidden lg:block">
          <div className="sticky top-28 space-y-6">
            <Reveal>
              <div className="sticker relative aspect-[4/3] -rotate-1 overflow-hidden bg-cream-100">
                <Image
                  src="/images/home-2.jpg"
                  alt="Freshly washed Orange County home with pool at dusk"
                  fill
                  priority
                  sizes="(min-width:1024px) 45vw, 92vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-6">
              <Reveal delay={120}>
                <div className="sticker relative aspect-square rotate-1 overflow-hidden bg-cream-100">
                  <Image
                    src="/images/detail-wax.jpg"
                    alt="Detailer polishing a car hood"
                    fill
                    sizes="22vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={220}>
                <div className="sticker relative aspect-square -rotate-2 overflow-hidden bg-cream-100">
                  <Image
                    src="/images/street-clean.jpg"
                    alt="Crew power washing pavement"
                    fill
                    sizes="22vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
            <Reveal delay={300}>
              <p className="display-flat rotate-1 text-center text-2xl tracking-wider text-pink-500">
                {site.tagline}
              </p>
            </Reveal>
          </div>
        </div>

        {/* right: headline + form */}
        <div>
          <Reveal>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border-3 border-pink-300 bg-cream-100 px-4 py-1.5 text-xs font-bold tracking-[0.22em] text-azure-600 uppercase">
              <span className="h-2 w-2 rounded-full bg-pink-400" />
              Orange County Based &amp; Operated
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display text-6xl sm:text-7xl">
              Cornerstone
              <br />
              Site Services
              <br />
              Orange County
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <a
              href={`tel:${site.phone}`}
              className="mt-5 inline-flex items-center gap-3 text-azure-500 hover:text-azure-400"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border-3 border-pink-300 bg-pink-200 text-xl">
                ☎
              </span>
              <span className="display-flat text-3xl tracking-wider">{site.phoneDisplay}</span>
            </a>
          </Reveal>

          {/* mobile photo */}
          <Reveal delay={250}>
            <div className="sticker relative mt-6 aspect-[16/9] overflow-hidden bg-cream-100 lg:hidden">
              <Image
                src="/images/home-2.jpg"
                alt="Freshly washed Orange County home with pool at dusk"
                fill
                priority
                sizes="92vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8">
              <QuoteForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
