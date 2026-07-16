import Link from "next/link";
import Reveal from "./Reveal";
import { plans } from "@/lib/site";

export default function Plans() {
  return (
    <section id="plans" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 lg:px-8 lg:py-28">
      <Reveal>
        <p className="text-xs font-bold tracking-[0.3em] text-pink-500 uppercase">
          One-time or on repeat
        </p>
        <h2 className="display mt-2 max-w-3xl text-5xl sm:text-6xl">
          Deep clean once. Or never see grime again
        </h2>
        <p className="mt-4 max-w-2xl text-lg font-semibold leading-relaxed">
          Every plan starts with a full deep clean. Subscribers keep the result with
          scheduled follow-ups at a lower per-visit rate. Final pricing is confirmed
          in your photo quote.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 120}>
            <article
              className={`relative flex h-full flex-col p-8 transition-transform duration-200 hover:-translate-y-1.5 ${
                p.highlight
                  ? "sticker-blue bg-azure-500 text-cream-50"
                  : "sticker bg-cream-100"
              }`}
            >
              {p.highlight && (
                <span className="display-flat absolute -top-4 left-8 rounded-lg border-2 border-azure-600 bg-pink-300 px-4 py-1 text-sm tracking-[0.18em] text-azure-800 uppercase">
                  Most popular
                </span>
              )}
              <h3 className="display-flat text-3xl tracking-wide uppercase">{p.name}</h3>
              <p className={`mt-1 text-xs font-bold tracking-[0.2em] uppercase ${p.highlight ? "text-pink-200" : "text-pink-500"}`}>
                {p.cadence}
              </p>
              <p className="display-flat mt-4 text-5xl">{p.price}</p>
              <p className={`mt-4 text-sm font-semibold leading-relaxed ${p.highlight ? "text-cream-100/90" : ""}`}>
                {p.blurb}
              </p>
              <ul className="mt-5 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm font-semibold">
                    <span className={p.highlight ? "text-pink-200" : "text-pink-500"}>✦</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/#quote"
                className={`btn-retro mt-7 rounded-xl px-6 py-3.5 text-center text-lg ${
                  p.highlight
                    ? "bg-pink-300 text-azure-800"
                    : "bg-cream-50 text-azure-600"
                }`}
              >
                Start with a photo quote
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
