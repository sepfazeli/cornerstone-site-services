import Image from "next/image";
import Reveal from "./Reveal";

const shots = [
  { src: "/images/patio.jpg", alt: "Clean patio with outdoor furniture", tilt: "-rotate-2" },
  { src: "/images/home-1.jpg", alt: "Freshly washed home facade", tilt: "rotate-1" },
  { src: "/images/home-3.jpg", alt: "Washed house exterior with clean windows", tilt: "-rotate-1" },
  { src: "/images/home-night.jpg", alt: "Home exterior glowing at night after a wash", tilt: "rotate-2" },
];

export default function GalleryStrip() {
  return (
    <section aria-label="Recent work" className="overflow-hidden py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-5 sm:gap-7 lg:grid-cols-4 lg:px-8">
        {shots.map((s, i) => (
          <Reveal key={s.src} delay={i * 90}>
            <div className={`sticker relative aspect-square overflow-hidden bg-cream-100 transition-transform duration-200 hover:-translate-y-1.5 ${s.tilt}`}>
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width:1024px) 22vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
