import Reveal from "./Reveal";
import { faqs } from "@/lib/site";

export default function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-24 lg:px-8 lg:py-32">
      <Reveal>
        <p className="text-center text-xs font-semibold tracking-[0.3em] text-clay-500 uppercase">
          Good questions
        </p>
        <h2 className="mt-3 text-center font-display text-4xl font-semibold leading-tight sm:text-5xl">
          Before you <em className="text-clay-500">ask</em>.
        </h2>
      </Reveal>
      <div className="mt-12 space-y-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 60}>
            <details className="group rounded-2xl border border-clay-500/20 bg-cream-100/60 open:bg-cream-100 transition-colors">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-semibold text-espresso-900 [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="shrink-0 text-clay-500 transition-transform duration-300 group-open:rotate-45">
                  ＋
                </span>
              </summary>
              <p className="px-6 pb-6 leading-relaxed text-espresso-700/90">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
