import Reveal from "./Reveal";
import { faqs } from "@/lib/site";

export default function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-20 lg:px-8 lg:py-28">
      <Reveal>
        <p className="text-center text-xs font-bold tracking-[0.3em] text-pink-500 uppercase">
          Good questions
        </p>
        <h2 className="display mt-2 text-center text-5xl sm:text-6xl">
          Before you ask
        </h2>
      </Reveal>
      <div className="mt-10 space-y-4">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 60}>
            <details className="sticker group bg-cream-100 open:bg-cream-50 transition-colors">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-bold text-azure-600 [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="display-flat shrink-0 text-2xl text-pink-500 transition-transform duration-300 group-open:rotate-45">
                  ＋
                </span>
              </summary>
              <p className="px-6 pb-6 leading-relaxed font-semibold">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
