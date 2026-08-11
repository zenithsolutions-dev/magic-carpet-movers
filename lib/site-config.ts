export const siteConfig = {
  name: "Magic Carpet Movers",
  tagline: "We move it like it's magic.",
  description:
    "Local & long-distance moving, packing & unpacking, furniture disassembly, moving boxes, and Canada-wide + international shipping. We move it like it's magic.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "magicarpet.inc@gmail.com",
  phone: "(514) 246-8463",
  phoneHref: "tel:+15142468463",
  // Ontario-based and mobile — the crew comes to you, so there is no walk-in
  // street address to publish. Keep this general (city + province only).
  serviceArea: {
    label: "Serving Ottawa & across Ontario",
    region: "Ontario, Canada",
  },
  // City-level map on the contact section — coverage area, not an office pin.
  mapQuery: "Ottawa, Ontario, Canada",
  hours: [{ day: "Every day", time: "24 hours" }],
  serviceCities: [
    "Ottawa",
    "Gatineau",
    "Kanata",
    "Orleans",
    "Nepean",
    "Barrhaven",
    "Stittsville",
    "Westboro",
    "Hull",
    "Aylmer",
    "Manotick",
    "Rockland",
  ], // TODO_USER_PROVIDE — replace with real service area
  credentials: {
    license: "Licensed in ON & QC", // TODO_USER_PROVIDE — replace with your CAM membership / provincial number
    cam: "CAM Member", // TODO_USER_PROVIDE
    bbb: "A+",
    insured: true,
  },
  social: {
    instagram: "https://instagram.com/magiccarpet",
    facebook: "https://facebook.com/magiccarpet",
    google: "https://g.page/magiccarpet",
  },
  // Leads go to the client's inbox. The sending domain is verified in the
  // client's own Resend account (RESEND_API_KEY in Vercel is theirs).
  quoteRecipientEmail: ["magicarpet.inc@gmail.com"],
  contactRecipientEmail: ["magicarpet.inc@gmail.com"],
  fromEmail: "Magic Carpet Movers <quotes@magiccarpetmoving.com>",
} as const;

export type SiteConfig = typeof siteConfig;

export const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "How it works" },
  { href: "/#story", label: "Our Story" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
] as const;

export type Service = {
  slug: string;
  title: string;
  short: string;
  blurb: string;
  features: string[];
  pricingFactors: { label: string; body: string }[];
  iconKey: "box" | "truck" | "shield" | "wrap" | "door";
  accent: "coral" | "twilight";
};

export const services: Service[] = [
  {
    slug: "local",
    title: "Local Moves",
    short: "City-to-city, same-day",
    blurb:
      "Apartments, townhomes, and houses across the metro. Hourly crews, no surprises, doors locked behind you by sunset.",
    features: [
      "2 — 4 person crews",
      "Floor & door padding included",
      "Hourly billing, no minimums after 2hr",
      "Free disassembly + reassembly",
    ],
    pricingFactors: [
      { label: "Crew size", body: "Tight stairs and big sofas mean more hands. We size the crew to your home, not the other way around." },
      { label: "Distance & access", body: "Walk-up vs. elevator vs. shuttle truck — access can change a half-day move into a full one." },
      { label: "Volume", body: "Studios fly. Four-bedroom houses with garages get a longer day. Our quote breaks it down by room." },
    ],
    iconKey: "truck",
    accent: "coral",
  },
  {
    slug: "long-distance",
    title: "Long-Distance",
    short: "State-to-state, fully tracked",
    blurb:
      "Cross-country with binding estimates, real-time GPS, and the same crew on both ends — no warehouse roulette.",
    features: [
      "Binding (not estimated) quotes",
      "GPS tracking through delivery",
      "Same crew, origin to destination",
      "Full-value protection included",
    ],
    pricingFactors: [
      { label: "Mileage", body: "Distance is the biggest lever. We use real route mileage, not zip-to-zip approximations." },
      { label: "Weight or volume", body: "Federal regs let us bill by weight; we offer volume-based binding for predictability." },
      { label: "Delivery window", body: "Tighter windows cost a little more. Flex by 3 — 5 days and we can pass savings on." },
    ],
    iconKey: "shield",
    accent: "twilight",
  },
  {
    slug: "commercial",
    title: "Commercial",
    short: "Offices, retail, labs",
    blurb:
      "After-hours, weekend, or floor-by-floor. We move you without missing a Monday morning.",
    features: [
      "After-hours & weekend crews",
      "COI to your building, signed same-day",
      "IT-aware: server, network, A/V handling",
      "Single point of contact, start to finish",
    ],
    pricingFactors: [
      { label: "Schedule sensitivity", body: "Off-hours and weekend windows carry a premium but eliminate downtime risk." },
      { label: "Specialty equipment", body: "Server racks, lab benches, and A/V need bonded handlers and the right rigging." },
      { label: "Floor & elevator logistics", body: "Single freight elevators, COI requirements, and dock access shape the day." },
    ],
    iconKey: "door",
    accent: "twilight",
  },
  {
    slug: "packing",
    title: "Packing",
    short: "Full or partial, museum-grade",
    blurb:
      "Glassware, books, art, electronics. Wrapped, boxed, and labeled by people who do this six days a week.",
    features: [
      "Materials included, no surprise charges",
      "Custom crating for art & antiques",
      "Color-coded labels by room",
      "Unpack-and-haul service available",
    ],
    pricingFactors: [
      { label: "Scope", body: "Full pack vs. fragiles-only. We can do everything, or just the things you'd rather not touch." },
      { label: "Fragility", body: "Stemware, vinyl collections, and original art use more material and time than dishware." },
      { label: "Materials", body: "Standard cartons are included. Custom crates and museum board are billed at cost." },
    ],
    iconKey: "wrap",
    accent: "coral",
  },
  {
    slug: "storage",
    title: "Storage",
    short: "Climate-controlled, vaulted",
    blurb:
      "Between leases, between coasts, between renovations — your stuff waits in conditioned vaults, not a roadside locker.",
    features: [
      "Climate-controlled vaults",
      "Inventory photos on intake",
      "Month-to-month, no contracts",
      "Direct delivery — no second move-in",
    ],
    pricingFactors: [
      { label: "Volume", body: "Billed by vault, not square footage. One vault holds about a one-bedroom worth of goods." },
      { label: "Duration", body: "Month-to-month with discounts at 6 and 12 months. No long-term contract required." },
      { label: "Access frequency", body: "Quarterly access is included. Weekly visits are arranged with notice." },
    ],
    iconKey: "box",
    accent: "twilight",
  },
];

export type Testimonial = {
  name: string;
  route: string;
  quote: string;
  stars: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Geneviève L.",
    route: "Gatineau (Hull) → Aylmer",
    quote:
      "The crew showed up on time, wrapped every piece of furniture, and carried it all down three flights of stairs without a single scratch. Fair price, no last-minute add-ons.",
    stars: 5,
  },
  {
    name: "Marc T.",
    route: "Centretown → Kanata",
    quote:
      "Booked on a Monday, moved that Saturday. Two movers, four hours, everything in place. They even reassembled the beds. Honestly the easiest move we've had.",
    stars: 5,
  },
  {
    name: "Sarah B.",
    route: "Orleans → Barrhaven",
    quote:
      "I was nervous about my grandmother's china, but they packed it themselves and it arrived perfect. Polite, careful, and they gave us a clear quote upfront.",
    stars: 5,
  },
  {
    name: "David C.",
    route: "Ottawa → Toronto",
    quote:
      "Long-distance move and the same crew handled both ends. They kept me updated the whole way and delivered right on schedule. No damage, no surprises on the bill.",
    stars: 5,
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Do you charge by the hour or by weight?",
    a: "Local moves are hourly with a 2-hour minimum. Long-distance moves are binding quotes based on volume — meaning the price you see is the price you pay, no truck-scale surprises.",
  },
  {
    q: "How far ahead should I book?",
    a: "Whenever suits you — including today. We're available 24/7 and we keep crews open for short-notice and last-minute moves, so a same-day or next-morning booking is never a problem. Booking further ahead simply gives you first pick of the time slot, especially around July 1 and through the summer moving season.",
  },
  {
    q: "What's not included in a quote?",
    a: "Anything we can't legally transport (pressurized tanks, certain plants across provincial borders, perishables, ammunition). We'll flag it during the survey, and we never charge for items we won't move.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes — fully insured, licensed on both sides of the river (Ontario & Quebec), and a member of the Canadian Association of Movers (CAM). We issue a Certificate of Insurance to your building or condo board the moment you book. Full-value protection is included on long-distance.",
  },
  {
    q: "What if my move date changes?",
    a: "Reschedule once at no charge up to 72 hours before. After that we work with you in good faith — we'd rather move you on the right day than charge you for the wrong one.",
  },
  {
    q: "Do you offer storage between moves?",
    a: "Yes. Climate-controlled vaulted storage, month-to-month, with inventory photos. Most common use case: closing dates that don't line up.",
  },
];

export const trustBadges = [
  { label: "Fully Insured" },
  { label: "Experienced & Friendly Team" },
  { label: "On-Time, Every Time" },
  { label: "Satisfaction Guaranteed" },
  { label: "Canada-Wide + International" },
] as const;
