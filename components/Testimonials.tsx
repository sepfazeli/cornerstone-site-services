import Reveal from "./Reveal";
import { testimonials } from "@/lib/site";

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <Reveal>
        <p className="text-xs font-bold tracking-[0.3em] text-pink-500 uppercase">
          Neighbors talking
        </p>
        <h2 className="display mt-2 max-w-2xl text-5xl sm:text-6xl">
          Orange County keeps us busy
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={(i % 3) * 120}>
            <figure className={`sticker flex h-full flex-col bg-cream-100 p-7 ${i % 2 ? "rotate-[0.6deg]" : "-rotate-[0.6deg]"}`}>
              <div className="text-pink-500" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote className="mt-3 flex-1 leading-relaxed font-semibold">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t-3 border-pink-200 pt-4">
                <span className="display-flat flex h-11 w-11 items-center justify-center rounded-full border-3 border-pink-300 bg-azure-500 text-xl text-cream-50">
                  {t.name[0]}
                </span>
                <div>
                  <p className="font-bold">{t.name} · {t.area}</p>
                  <p className="text-sm font-semibold text-pink-500">{t.service}</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
