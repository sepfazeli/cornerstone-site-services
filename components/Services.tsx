import Link from "next/link";
import Palm from "./Palm";
import Reveal from "./Reveal";
import { services } from "@/lib/site";

export default function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-20 lg:px-8 lg:py-28">
      <Palm className="animate-sway pointer-events-none absolute -right-6 top-8 h-36 w-auto origin-bottom -scale-x-100 text-pink-200" />
      <Reveal>
        <p className="text-xs font-bold tracking-[0.3em] text-pink-500 uppercase">
          Our services
        </p>
        <h2 className="display mt-2 max-w-3xl text-5xl sm:text-6xl">
          Every surface outside your door
        </h2>
        <p className="mt-4 max-w-2xl text-lg font-semibold leading-relaxed">
          From the roofline to the driveway to the cars parked on it. Book services
          individually, or bundle them into a care plan and forget about it.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.key} delay={(i % 3) * 90}>
            <Link
              href="/#quote"
              className="sticker group flex h-full flex-col bg-cream-100 p-6 transition-transform duration-200 hover:-translate-y-1.5 hover:rotate-[0.5deg]"
            >
              <span className="display-flat text-sm tracking-[0.25em] text-pink-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display-flat mt-1 text-3xl tracking-wide text-azure-500 group-hover:text-azure-400">
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-sm font-semibold leading-relaxed text-azure-700/90">
                {s.short}
              </p>
              <span className="link-line mt-4 self-start text-sm font-bold text-pink-500 uppercase">
                Quote this →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
