"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import Reveal from "./Reveal";

function Slider({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, pct)));
  }, []);

  return (
    <div
      ref={ref}
      role="slider"
      aria-label={`Before and after comparison: ${alt}`}
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
      }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => {
        if (e.buttons > 0) move(e.clientX);
      }}
      className="group relative aspect-[4/3] cursor-ew-resize touch-pan-y overflow-hidden rounded-3xl border border-clay-500/20 shadow-xl shadow-espresso-900/10 select-none"
      style={{ "--ba": `${pos}%` } as React.CSSProperties}
    >
      {/* AFTER (base) */}
      <Image src={src} alt={`${alt} — after cleaning`} fill sizes="(min-width:1024px) 45vw, 92vw" className="object-cover" />
      {/* BEFORE (clipped, simulated grime) */}
      <div className="ba-clip absolute inset-0">
        <Image
          src={src}
          alt=""
          aria-hidden
          fill
          sizes="(min-width:1024px) 45vw, 92vw"
          className="object-cover brightness-[0.62] contrast-[0.88] saturate-[0.55] sepia-[0.35]"
        />
      </div>
      {/* handle */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-cream-50/90" />
        <div className="absolute top-1/2 -ml-6 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream-50/60 bg-espresso-900/70 text-cream-50 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          <span className="text-sm tracking-tighter">◂▸</span>
        </div>
      </div>
      <span className="absolute top-4 left-4 rounded-full bg-espresso-950/70 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-cream-100 uppercase backdrop-blur-sm">
        Before
      </span>
      <span className="absolute top-4 right-4 rounded-full bg-clay-500/90 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-cream-50 uppercase">
        After
      </span>
    </div>
  );
}

const examples = [
  { src: "/images/garden-steps.jpg", alt: "Stone garden steps and hardscape", label: "Hardscape & garden paths · Pasadena" },
  { src: "/images/detail-droplets.jpg", alt: "White car paintwork with water beading", label: "Exterior detail & sealant · Santa Monica" },
];

export default function BeforeAfter() {
  return (
    <section id="results" className="relative scroll-mt-24 overflow-hidden bg-espresso-900 py-24 lg:py-32">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.3em] text-clay-300 uppercase">
            Drag to see the difference
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight text-cream-50 sm:text-5xl">
            Proof you can <em className="text-clay-300">slide</em>.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream-100/80">
            Years of sun, grime and salt air disappear in a single visit. Drag the
            handle — this is what your surfaces are hiding. <span className="text-cream-100/50 text-sm">(Illustrative comparison.)</span>
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {examples.map((ex, i) => (
            <Reveal key={ex.src} delay={i * 150}>
              <figure>
                <Slider src={ex.src} alt={ex.alt} />
                <figcaption className="mt-4 text-sm tracking-wide text-cream-100/70">
                  {ex.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
