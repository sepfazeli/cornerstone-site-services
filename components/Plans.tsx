import Link from "next/link";
import Reveal from "./Reveal";
import { plans } from "@/lib/site";

export default function Plans() {
  return (
    <section id="plans" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 lg:px-8 lg:py-32">
      <Reveal>
        <p className="text-xs font-semibold tracking-[0.3em] text-clay-500 uppercase">
          One-time or on repeat
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
          Deep clean once. Or never see grime <em className="text-clay-500">again</em>.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-espresso-700/90">
          Every plan starts with a full deep clean. Subscribers keep the result
          with scheduled follow-ups at a lower per-visit rate. Final pricing is
          confirmed in your photo quote.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 120}>
            <article
              className={`relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-500 hover:-translate-y-2 ${
                p.highlight
                  ? "border-clay-500 bg-espresso-900 text-cream-50 shadow-2xl shadow-clay-700/25"
                  : "border-clay-500/20 bg-cream-100/60 hover:shadow-xl hover:shadow-clay-700/10"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3.5 left-8 rounded-full bg-clay-500 px-4 py-1 text-xs font-bold tracking-[0.18em] text-cream-50 uppercase">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
              <p className={`mt-1 text-xs tracking-[0.2em] uppercase ${p.highlight ? "text-clay-300" : "text-clay-600"}`}>
                {p.cadence}
              </p>
              <p className="mt-5 font-display text-4xl font-semibold">
                {p.price}
              </p>
              <p className={`mt-4 text-sm leading-relaxed ${p.highlight ? "text-cream-100/85" : "text-espresso-700/90"}`}>
                {p.blurb}
              </p>
              <ul className="mt-6 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className={p.highlight ? "text-clay-300" : "text-clay-500"}>✦</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/#quote"
                className={`btn-sheen mt-8 rounded-full px-6 py-3.5 text-center text-sm font-semibold transition-colors ${
                  p.highlight
                    ? "bg-clay-500 text-cream-50 hover:bg-clay-400"
                    : "border border-clay-500/40 text-clay-700 hover:bg-clay-500 hover:text-cream-50"
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
