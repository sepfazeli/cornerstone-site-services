const items = [
  "Orange County Based",
  "Licensed & Insured",
  "Eco-Safe Detergents",
  "Same-Week Slots",
  "Photo Quotes in ~2 Hours",
  "Subscription Care Plans",
  "We Come To You",
  "Satisfaction Guaranteed",
];

export default function TrustMarquee() {
  const row = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden border-y-3 border-pink-300 bg-azure-500 py-3.5"
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="display-flat flex items-center gap-10 text-lg tracking-[0.18em] text-cream-50"
          >
            {t}
            <span className="text-pink-200">🌴</span>
          </span>
        ))}
      </div>
    </div>
  );
}
