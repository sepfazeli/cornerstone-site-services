import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { site } from "@/lib/site";

export default function ServiceHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="relative flex min-h-[72svh] items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="animate-kenburns object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/50 to-espresso-950/15" />
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-44 lg:px-8">
        <Reveal>
          <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-clay-300 uppercase">{eyebrow}</p>
          <h1 className="max-w-3xl font-display text-4xl leading-tight font-semibold text-cream-50 sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-100/90">{intro}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/#quote"
              className="btn-sheen rounded-full bg-clay-500 px-7 py-3.5 font-semibold text-cream-50 shadow-xl shadow-clay-700/40 transition-all duration-300 hover:-translate-y-1 hover:bg-clay-400"
            >
              Get a Photo Quote →
            </Link>
            <a
              href={`tel:${site.phone}`}
              className="rounded-full border border-cream-50/35 px-7 py-3.5 font-semibold text-cream-50 backdrop-blur-sm transition-colors hover:bg-cream-50/10"
            >
              {site.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
