import Reveal from "./Reveal";
import { promise } from "@/lib/site";

export default function Promise() {
  return (
    <section className="relative overflow-hidden bg-azure-500 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.3em] text-pink-200 uppercase">
            The Cornerstone promise
          </p>
          <h2 className="display-flat mt-2 max-w-2xl text-5xl uppercase leading-[0.95] text-cream-50 sm:text-6xl [text-shadow:0.05em_0.05em_0_var(--color-azure-700)]">
            Three things, every visit
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {promise.map((p, i) => (
            <Reveal key={p.n} delay={i * 120}>
              <article className="h-full rounded-2xl border-3 border-pink-300 bg-azure-600/50 p-7 shadow-[6px_6px_0_0_var(--color-azure-700)]">
                <p className="display-flat text-6xl text-pink-300">{p.n}</p>
                <h3 className="display-flat mt-3 text-3xl tracking-wide text-cream-50 uppercase">
                  {p.title}
                </h3>
                <p className="mt-3 leading-relaxed font-semibold text-cream-100/90">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
