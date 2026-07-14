export const site = {
  name: "Cornerstone Site Services",
  legalName: "Cornerstone Site Services LLC",
  tagline: "One call. Everything handled.",
  phone: "+19499941833",
  phoneDisplay: "(949) 994-1833",
  email: "hello@cornerstonesiteservices.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cornerstone-site-services.vercel.app",
  city: "Los Angeles",
  region: "CA",
  description:
    "Los Angeles pressure washing, exterior soft washing, and mobile auto detailing. Subscription care plans or one-time deep cleans — send photos, get a quote in hours, book a time slot online.",
} as const;

export const serviceAreas = [
  "Los Angeles",
  "Santa Monica",
  "Beverly Hills",
  "Pasadena",
  "Culver City",
  "West Hollywood",
  "Sherman Oaks",
  "Burbank",
  "Glendale",
  "Manhattan Beach",
  "Long Beach",
  "Irvine",
  "Newport Beach",
  "Orange County",
] as const;

export type ServiceKey =
  | "house-soft-wash"
  | "driveway-hardscape"
  | "patio-landscape"
  | "auto-detailing"
  | "windows-gutters"
  | "commercial";

export const services: {
  key: ServiceKey;
  title: string;
  short: string;
  image: string;
  bullets: string[];
}[] = [
  {
    key: "house-soft-wash",
    title: "House & Facade Soft Wash",
    short: "Low-pressure wash that lifts grime, algae and salt haze off stucco, siding and stone — without etching the finish.",
    image: "/images/home-1.jpg",
    bullets: ["Stucco, siding, brick & stone", "Algae, mold & mildew removal", "Paint-safe detergents"],
  },
  {
    key: "driveway-hardscape",
    title: "Driveways & Hardscape",
    short: "High-pressure surface cleaning for concrete, pavers and walkways. Oil stains, tire marks and gum — gone.",
    image: "/images/street-clean.jpg",
    bullets: ["Concrete & paver restoration", "Oil & rust stain treatment", "Optional sealing"],
  },
  {
    key: "patio-landscape",
    title: "Patios & Outdoor Living",
    short: "Decks, pergolas, pool surrounds, outdoor kitchens and garden hardscape — ready for guests year-round.",
    image: "/images/patio.jpg",
    bullets: ["Decks & pool decks", "Outdoor furniture & BBQ areas", "Garden paths & retaining walls"],
  },
  {
    key: "auto-detailing",
    title: "Auto Detailing",
    short: "Showroom-level interior and exterior detailing at your home or office. Hand wash, machine polish, ceramic options.",
    image: "/images/detail-wax.jpg",
    bullets: ["Interior deep clean & extraction", "Hand wash, clay & polish", "Ceramic coating packages"],
  },
  {
    key: "windows-gutters",
    title: "Windows & Gutters",
    short: "Streak-free window washing and gutter clearing that protects your roofline and foundation.",
    image: "/images/home-3.jpg",
    bullets: ["Interior / exterior glass", "Gutter clearing & flush", "Solar panel rinse"],
  },
  {
    key: "commercial",
    title: "Commercial & HOA",
    short: "Storefronts, parking structures, common areas and fleets on a schedule your tenants will notice.",
    image: "/images/wash-action.jpg",
    bullets: ["Storefront & sidewalk programs", "Parking & trash enclosures", "Fleet washing"],
  },
];

export const plans = [
  {
    name: "One-Time Deep Clean",
    price: "from $249",
    cadence: "single visit",
    highlight: false,
    blurb: "The full reset. Every exterior surface deep cleaned in one visit — perfect before listings, events or a new care plan.",
    features: [
      "Full property assessment",
      "House, driveway & patio deep wash",
      "Photo report before / after",
      "7-day rain re-touch guarantee",
    ],
  },
  {
    name: "Estate Care Plan",
    price: "from $149/mo",
    cadence: "monthly or quarterly",
    highlight: true,
    blurb: "Our signature subscription. We keep the whole property spotless on a schedule — you never think about it again.",
    features: [
      "Deep clean first visit, upkeep after",
      "Rotating focus: facade, hardscape, glass",
      "Priority scheduling & storm callouts",
      "Pause or cancel anytime",
    ],
  },
  {
    name: "Auto Care Membership",
    price: "from $99/mo",
    cadence: "2 visits / month",
    highlight: false,
    blurb: "Mobile detailing on repeat. Your cars stay showroom-clean at home — interior refresh plus hand wash every visit.",
    features: [
      "We come to your driveway",
      "Interior wipe-down & vacuum",
      "Hand wash, wheels & dressing",
      "Quarterly polish upgrade included",
    ],
  },
] as const;

export const testimonials = [
  {
    name: "Melissa R.",
    area: "Pacific Palisades",
    text: "They sent a quote two hours after I texted photos of our driveway and pool deck. Crew showed up Saturday 8am sharp — the travertine looks brand new.",
    service: "Driveway & pool deck",
  },
  {
    name: "David K.",
    area: "Sherman Oaks",
    text: "We're on the monthly plan for the house and both cars. It's the one subscription my wife refuses to cancel. The house literally glows at sunset.",
    service: "Estate Care Plan",
  },
  {
    name: "Priya S.",
    area: "Culver City",
    text: "Our HOA switched to Cornerstone for the walkways and parking structure. Same-week booking, photo reports for the board, zero complaints since.",
    service: "Commercial / HOA",
  },
  {
    name: "Jonah T.",
    area: "Manhattan Beach",
    text: "Ceramic coating on the M4 plus interior extraction on the family SUV, done in my driveway while I worked. Flawless finish, zero swirl marks.",
    service: "Auto detailing",
  },
] as const;

export const faqs = [
  {
    q: "How does the photo quote work?",
    a: "Snap 3–5 photos of the areas you want cleaned (driveway, facade, patio, car) and upload them with our quote form — or text them straight to (949) 994-1833. We size the job from the photos and reply with a firm quote, usually within 2 business hours. No site visit, no waiting around.",
  },
  {
    q: "What's the difference between the subscription and a one-time deep clean?",
    a: "A one-time deep clean is a full reset of your property in a single visit. Subscriptions start with that same deep clean, then keep everything maintained on a monthly or quarterly rotation at a lower per-visit rate — with priority scheduling and storm callouts included.",
  },
  {
    q: "Which areas of Los Angeles do you serve?",
    a: "We cover greater Los Angeles and northern Orange County — Santa Monica, Beverly Hills, Pasadena, Culver City, Sherman Oaks, Burbank, Long Beach, Manhattan Beach, Irvine, Newport Beach and everywhere between. Not sure? Send your zip with the quote form.",
  },
  {
    q: "Is pressure washing safe for my stucco, pavers and plants?",
    a: "Yes — we match the method to the surface. Delicate facades get low-pressure soft washing with biodegradable detergents, hardscape gets calibrated surface cleaners, and we pre-soak and rinse landscaping so plants are protected.",
  },
  {
    q: "Do you really detail cars at my home?",
    a: "We do. Our detailing rigs carry water and power, so we work in your driveway or office parking. Interior deep cleans, hand wash and polish, and ceramic coating packages — without you driving anywhere.",
  },
  {
    q: "What happens after I book a time slot?",
    a: "Your slot is reserved as a request the moment you submit. We confirm by text within 2 business hours with your quote attached. If the slot no longer fits, you approve the next best one — nothing is charged until the work is scheduled and approved.",
  },
] as const;
