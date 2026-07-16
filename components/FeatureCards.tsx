import Reveal from "./Reveal";
import { ClockIcon, ShieldIcon, TruckIcon, HomeIcon } from "./Icons";

const features = [
  {
    Icon: ClockIcon,
    title: "Quick & firm quotes",
    body: "Send photos, get a real number back in about 2 business hours — not a vague range.",
  },
  {
    Icon: ShieldIcon,
    title: "Licensed & insured",
    body: "Fully covered crews, eco-safe detergents, and a satisfaction guarantee in writing.",
  },
  {
    Icon: TruckIcon,
    title: "We show up on time",
    body: "Which really means 10 minutes early — with a text when we're on the way.",
  },
  {
    Icon: HomeIcon,
    title: "We respect your property",
    body: "Plants rinsed, gates closed, gear packed. We leave it better than we found it.",
  },
];

export default function FeatureCards() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 90}>
            <article className="sticker flex h-full flex-col items-start gap-3 bg-cream-100 p-6">
              <span className="flex h-13 w-13 items-center justify-center rounded-xl border-3 border-pink-300 bg-cream-50 text-azure-500">
                <f.Icon className="h-7 w-7" />
              </span>
              <h3 className="display-flat text-2xl tracking-wide text-azure-500 uppercase">
                {f.title}
              </h3>
              <p className="text-sm font-semibold leading-relaxed text-azure-700/90">{f.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
