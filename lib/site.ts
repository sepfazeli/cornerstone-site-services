export const site = {
  name: "Cornerstone Site Services",
  legalName: "Cornerstone Site Services LLC",
  tagline: "One call. Everything handled.",
  phone: "+19499941833",
  phoneDisplay: "(949) 994-1833",
  email: "cstone.services.co@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cornerstone-site-services.vercel.app",
  city: "Orange County",
  region: "CA",
  description:
    "Orange County exterior cleaning and auto detailing: power washing, window cleaning, roof & gutter care, solar panel cleaning, holiday lights and more. Send photos, get a quote in hours, book a time slot online.",
} as const;

export const serviceAreas = [
  "Irvine",
  "Newport Beach",
  "Costa Mesa",
  "Huntington Beach",
  "Laguna Beach",
  "Anaheim",
  "Santa Ana",
  "Tustin",
  "Orange",
  "Mission Viejo",
  "Lake Forest",
  "Fountain Valley",
  "Yorba Linda",
  "San Clemente",
] as const;

export type ServiceKey =
  | "power-washing"
  | "window-cleaning"
  | "roof-washing"
  | "gutter-cleaning"
  | "solar-cleaning"
  | "house-washing"
  | "holiday-lights"
  | "auto-detailing"
  | "screen-cleaning"
  | "skylight-cleaning"
  | "paver-resanding"
  | "lawn-care";

export const services: {
  key: ServiceKey;
  title: string;
  short: string;
}[] = [
  {
    key: "power-washing",
    title: "Power Washing",
    short: "Driveways, patios, walkways and hardscape — oil stains, tire marks and grime blasted clean.",
  },
  {
    key: "window-cleaning",
    title: "Window Cleaning",
    short: "Streak-free glass inside and out, tracks and sills included.",
  },
  {
    key: "roof-washing",
    title: "Roof Washing",
    short: "Gentle soft-wash that lifts algae and staining without damaging shingles or tile.",
  },
  {
    key: "gutter-cleaning",
    title: "Gutter Cleaning",
    short: "Cleared, flushed and flowing — protecting your roofline and foundation.",
  },
  {
    key: "solar-cleaning",
    title: "Solar Panel Cleaning",
    short: "Deionized-water cleaning that restores lost output from dusty panels.",
  },
  {
    key: "house-washing",
    title: "House Washing",
    short: "Low-pressure facade wash for stucco, siding and stone. Paint-safe detergents.",
  },
  {
    key: "holiday-lights",
    title: "Holiday Lights",
    short: "Design, install, maintain and take-down. You pick the look, we handle the ladder.",
  },
  {
    key: "auto-detailing",
    title: "Auto Detailing",
    short: "Showroom-level interior and exterior detailing in your driveway — hand wash to ceramic.",
  },
  {
    key: "screen-cleaning",
    title: "Screen Cleaning",
    short: "Window and door screens de-gunked, washed and re-seated.",
  },
  {
    key: "skylight-cleaning",
    title: "Skylight Cleaning",
    short: "Roof-access glass cleaning that brings the light back in.",
  },
  {
    key: "paver-resanding",
    title: "Paver Resanding",
    short: "Joint sand replaced and compacted after washing — pavers locked tight, weeds out.",
  },
  {
    key: "lawn-care",
    title: "Basic Lawn Care",
    short: "Mow, edge and tidy on your cleaning schedule. Curb appeal, handled.",
  },
];

export const hearAboutOptions = [
  "Google search",
  "Instagram / TikTok",
  "Friend or neighbor",
  "Yard sign / truck",
  "Nextdoor",
  "Other",
] as const;

export const promise = [
  {
    n: "01",
    title: "We show up on time",
    body: "Which really means 10 minutes early. You get a text when we're on the way, and a crew that looks and acts professional.",
  },
  {
    n: "02",
    title: "We do what we said",
    body: "The quote you approved is the price you pay. Every item on the work order gets done, checked and photographed.",
  },
  {
    n: "03",
    title: "We leave it better",
    body: "Gear packed, gates closed, plants rinsed, and a property that honestly looks brand new. That's the whole point.",
  },
] as const;

export const plans = [
  {
    name: "One-Time Deep Clean",
    price: "from $249",
    cadence: "single visit",
    highlight: false,
    blurb: "The full reset. Every surface you pick, deep cleaned in one visit — perfect before listings, events or a new care plan.",
    features: [
      "Full property assessment",
      "Any services bundled into one visit",
      "Photo report before / after",
      "7-day rain re-touch guarantee",
    ],
  },
  {
    name: "Care Plan",
    price: "from $149/mo",
    cadence: "monthly or quarterly",
    highlight: true,
    blurb: "Our signature subscription. We keep the whole property spotless on a schedule — you never think about it again.",
    features: [
      "Deep clean first visit, upkeep after",
      "Rotating focus: windows, wash, gutters",
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
    area: "Newport Beach",
    text: "They sent a quote two hours after I texted photos of our driveway and pool deck. Crew showed up Saturday 8am sharp — the travertine looks brand new.",
    service: "Power washing",
  },
  {
    name: "David K.",
    area: "Irvine",
    text: "We're on the monthly plan for the house, windows and both cars. It's the one subscription my wife refuses to cancel.",
    service: "Care Plan",
  },
  {
    name: "Priya S.",
    area: "Tustin",
    text: "Our HOA switched to Cornerstone for the walkways and gutters. Same-week booking, photo reports for the board, zero complaints since.",
    service: "HOA / gutters",
  },
] as const;

