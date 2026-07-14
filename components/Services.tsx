import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { services } from "@/lib/site";

export default function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-24 lg:px-8 lg:py-32">
      <Reveal>
        <p className="text-xs font-semibold tracking-[0.3em] text-clay-500 uppercase">
          What we handle
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
          Every surface outside your door —{" "}
          <em className="text-clay-500">one call</em>.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-espresso-700/90">
          From the facade to the driveway to the cars parked on it. Book services
          individually, or bundle them into a care plan and forget about it.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.key} delay={(i % 3) * 110}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-clay-500/15 bg-cream-100/60 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-clay-700/15">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/45 to-transparent" />
                <span className="absolute bottom-3 left-4 font-display text-xs tracking-[0.25em] text-cream-100 uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl font-semibold text-espresso-900">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-espresso-700/90">{s.short}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-espresso-800">
                      <span className="mt-1 text-clay-500">✦</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/#quote?service=${s.key}`}
                  className="link-line mt-auto pt-5 text-sm font-semibold text-clay-600"
                >
                  Quote this service →
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
