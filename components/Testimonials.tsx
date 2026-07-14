import Reveal from "./Reveal";
import { testimonials } from "@/lib/site";

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
      <Reveal>
        <p className="text-xs font-semibold tracking-[0.3em] text-clay-500 uppercase">
          Neighbors talking
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
          LA keeps us <em className="text-clay-500">busy</em>.
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={(i % 2) * 130}>
            <figure className="flex h-full flex-col rounded-3xl border border-clay-500/15 bg-cream-100/60 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-clay-700/10">
              <div className="text-clay-500" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-espresso-800">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4 border-t border-clay-500/15 pt-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-clay-500 font-display text-lg font-semibold text-cream-50">
                  {t.name[0]}
                </span>
                <div>
                  <p className="font-semibold text-espresso-900">{t.name} · {t.area}</p>
                  <p className="text-sm text-espresso-700/70">{t.service}</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
