const items = [
  "Licensed & Insured",
  "Eco-Safe Detergents",
  "Same-Week Slots",
  "Photo Quotes in ~2 Hours",
  "Subscription Care Plans",
  "We Come To You",
  "LA & Orange County",
  "Satisfaction Guaranteed",
];

export default function TrustMarquee() {
  const row = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden border-y border-clay-500/20 bg-espresso-900 py-4"
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-sm font-medium tracking-[0.18em] text-cream-100/80 uppercase"
          >
            {t}
            <span className="text-clay-400">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
