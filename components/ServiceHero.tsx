import Image from "next/image";
import Link from "next/link";
import Palm from "./Palm";
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
    <section className="relative overflow-hidden pt-20">
      <Palm className="animate-sway pointer-events-none absolute -left-8 top-28 h-40 w-auto origin-bottom text-pink-300/70" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-10 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border-3 border-pink-300 bg-cream-100 px-4 py-1.5 text-xs font-bold tracking-[0.22em] text-azure-600 uppercase">
            <span className="h-2 w-2 rounded-full bg-pink-400" />
            {eyebrow}
          </p>
          <h1 className="display text-6xl sm:text-7xl">{title}</h1>
          <p className="mt-5 max-w-xl text-lg font-semibold leading-relaxed">{intro}</p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              href="#quote"
              className="btn-retro rounded-xl bg-pink-300 px-7 py-3.5 text-xl text-azure-800"
            >
              Get a Photo Quote →
            </Link>
            <a
              href={`tel:${site.phone}`}
              className="display-flat rounded-xl border-3 border-pink-300 px-7 py-3.5 text-xl text-azure-600 transition-colors hover:bg-pink-100"
            >
              {site.phoneDisplay}
            </a>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="sticker relative aspect-[4/3] rotate-1 overflow-hidden bg-cream-100">
            <Image src={image} alt={imageAlt} fill priority sizes="(min-width:1024px) 45vw, 92vw" className="object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
