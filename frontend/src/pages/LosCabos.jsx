import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PhotoSlot from "../components/hub/PhotoSlot";

/* ═══════════════════════════════════════════════════════════════════
   CREDENTIALS — identical across every destination hub
   ═══════════════════════════════════════════════════════════════════ */

const CREDENTIALS = ["PGA TOUR", "LIV GOLF", "MEXICO OPEN AT VIDANTA", "WWT CABO 2024"];

const CredentialStrip = ({ variant = "dark", testid }) => (
  <div data-testid={testid} className="credential-strip">
    {CREDENTIALS.map((c) => (
      <span
        key={c}
        className={`credential-pill ${variant === "light" ? "credential-pill--light" : ""}`}
      >
        {c}
      </span>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   ICONS — line SVGs, gold stroke
   ═══════════════════════════════════════════════════════════════════ */

const Icon = ({ name, className = "w-5 h-5" }) => {
  const paths = {
    flag: (
      <>
        <path d="M4 22V4M4 4h14l-3 5 3 5H4" />
      </>
    ),
    pen: (
      <>
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </>
    ),
    tag: (
      <>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <circle cx="7" cy="7" r="1.5" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>
    ),
    warning: (
      <>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <path d="M12 9v4M12 17h.01" />
      </>
    ),
    plane: (
      <>
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
      </>
    ),
    jet: (
      <>
        <path d="M10 16v-1.5l-8 4.5v-3l8-5V4a2 2 0 1 1 4 0v7l8 5v3l-8-4.5V16l3 2v2l-5-1.5L9 20v-2z" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" />
      </>
    ),
    person: (
      <>
        <circle cx="12" cy="6" r="3" />
        <path d="M9 22V12l-3-3 1.5-1.5L12 12l4.5-4.5L18 9l-3 3v10" />
      </>
    ),
    dollar: (
      <>
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </>
    ),
    unlock: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
      </>
    ),
    key: (
      <>
        <circle cx="7" cy="14" r="4" />
        <path d="M10 14h12M18 14v4M22 14v4" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </>
    ),
    shirt: (
      <>
        <path d="M20 5l-4-2-4 2-4-2-4 2v5h4v11h8V10h4z" />
      </>
    ),
    car: (
      <>
        <path d="M5 13l1.5-5h11L19 13M5 13h14v6H5v-6z" />
        <circle cx="8" cy="17" r="1.5" />
        <circle cx="16" cy="17" r="1.5" />
      </>
    ),
    map: (
      <>
        <path d="M1 6l7-3 8 3 7-3v15l-7 3-8-3-7 3V6z" />
        <path d="M8 3v15M16 6v15" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   DATA — exact from intake
   ═══════════════════════════════════════════════════════════════════ */

const QUICK_FACTS = [
  { icon: "flag",     label: "Courses",        value: "23 active · 5 under construction" },
  { icon: "pen",      label: "Designers",      value: "Nicklaus · Woods · Norman · Love III · Fazio · Eckenrode · Couples" },
  { icon: "tag",      label: "Green fees",     value: "$200 – $500 USD per round" },
  { icon: "calendar", label: "Best months",    value: "October – May" },
  { icon: "warning",  label: "Avoid",          value: "August – September (hurricane + rain peak)" },
  { icon: "plane",    label: "Airport",        value: "Los Cabos International (SJD)" },
  { icon: "jet",      label: "Private FBO",    value: "SJD dedicated terminal · CSL" },
  { icon: "globe",    label: "Languages",      value: "English + Spanish (all staff)" },
  { icon: "flag",     label: "Caddie policy",  value: "Mandatory at Tier-1 · Recommended corridor-wide" },
  { icon: "dollar",   label: "Currency",       value: "USD accepted everywhere" },
];

const COURSES = [
  { tier: "resort",  fee: "$395 – $450", name: "Quivira Golf Club",            photoLabel: "Quivira Golf Club",         photo: null, article: null, specs: "Jack Nicklaus · Par 72 · Championship",          note: "The crown jewel of the corridor. Quivira plays along the Pacific cliffs above Cabo San Lucas — every hole delivers an ocean view, climbing out of desert canyons to finish with one of the most photographed closing stretches in North America.",   standout: "#5 — Cliffside par 3, 178 yards hanging directly over the roaring Pacific." },
  { tier: "public",  fee: "$350 – $395", name: "Cabo del Sol — Ocean Course",   photoLabel: "Cabo del Sol — Ocean",       photo: null, article: null, specs: "Jack Nicklaus · Par 72 · Championship",          note: "The legendary layout that put Los Cabos golf on the global map. The back nine runs along the Sea of Cortez, with three holes playing directly on the water's edge.",                                                                                  standout: "#17 — A dramatic signature par 3 beside the crashing surf." },
  { tier: "private", fee: "$300 – $375", name: "Diamante — Dunes Course",       photoLabel: "Diamante — Dunes",          photo: null, article: null, specs: "Davis Love III · Par 72 · Championship",         note: "A true links experience framed by massive white sand dunes on the Pacific side of Cabo San Lucas. Walks and plays like a classic British course — with 340 days of sunshine.",                                                                       standout: "#14 — Links-style par 4 cutting through towering natural sand structures." },
  { tier: "private", fee: "$275 – $350", name: "El Cardonal at Diamante",       photoLabel: "El Cardonal at Diamante",   photo: null, article: null, specs: "Tiger Woods · Par 72 · Resort-Friendly",          note: "Tiger Woods' first solo design outside the United States. Wide, forgiving fairways through desert arroyos — highly playable for mixed-handicap groups, with panoramic Pacific views throughout.",                                                  standout: "#6 — Sweeping downhill par 5 with a complete Pacific Ocean backdrop." },
  { tier: "public",  fee: "$250 – $310", name: "Palmilla Golf Club",            photoLabel: "Palmilla Golf Club",        photo: null, article: null, specs: "Jack Nicklaus · Par 72 · Resort-Friendly",         note: "The course that started the modern corridor in 1992 — the first Nicklaus design in Latin America. Three interchangeable nines (Mountain, Arroyo, Ocean) showcasing the native topography.",                                                       standout: "Mountain #4 — Elevated tee shot, deep mountain shadows, distant sea view." },
  { tier: "public",  fee: "$250 – $300", name: "Puerto Los Cabos",              photoLabel: "Puerto Los Cabos",          photo: null, article: null, specs: "Jack Nicklaus + Greg Norman · Par 72 · Moderate", note: "The only routing in Mexico where two legends collaborated. Nicklaus shaped the front nine through desert foothills; Norman designed the coastal back nine.",                                                                                       standout: "#18 — Norman's finishing hole running parallel to the marina and coastline." },
  { tier: "public",  fee: "$200 – $260", name: "Club Campestre San José",       photoLabel: "Club Campestre San José",   photo: null, article: null, specs: "Nicklaus Design · Par 72 · Moderate",            note: "Best value on the corridor. Weaves through rugged desert arroyos with the Sierra de la Laguna mountains framing every shot. The truest sense of Baja's inland topography.",                                                                       standout: "#7 — Demanding approach over a deep arroyo crossing." },
  { tier: "private", fee: "$350 – $400", name: "Twin Dolphin Golf Club",        photoLabel: "Twin Dolphin Golf Club",     photo: null, article: null, specs: "Todd Eckenrode + Fred Couples · Par 72 · Championship", note: "Built on the historic grounds of the original Twin Dolphin Hotel. Incredible elevation changes and tournament-level greens — the Sea of Cortez visible from almost every tee.",                                                          standout: "#3 — Par 3 playing directly across a jagged canyon." },
];

const PHOTO_STRIP = [
  { label: "Quivira Golf Club · Pacific Cliffs" },
  { label: "The Corridor · Cabo San Lucas" },
  { label: "Diamante · Dunes Course" },
];

const COMPARISON = [
  ["Quivira Golf Club",         "Jack Nicklaus",     "$395–$450", "resort",  "4/5", "Cliffside ocean holes"],
  ["Cabo del Sol Ocean",        "Jack Nicklaus",     "$350–$395", "public",  "4/5", "Iconic back nine, sea views"],
  ["Diamante Dunes",            "Davis Love III",    "$300–$375", "private", "3/5", "Links experience, dunes"],
  ["El Cardonal at Diamante",   "Tiger Woods",       "$275–$350", "private", "3/5", "Mixed groups, desert design"],
  ["Palmilla Golf Club",        "Jack Nicklaus",     "$250–$310", "public*", "3/5", "Three nines, historic"],
  ["Puerto Los Cabos",          "Nicklaus + Norman", "$250–$300", "public",  "2/5", "Two-legend collaboration"],
  ["Club Campestre San José",   "Nicklaus Design",   "$200–$260", "public",  "2/5", "Best value on corridor"],
  ["Twin Dolphin",              "Eckenrode+Couples", "$350–$400", "private", "4/5", "Tournament greens, canyon"],
];

const COSTS = [
  ["Flights (commercial)",     "$280",  "$550",   "LAX · DFW · HOU direct"],
  ["Accommodation (4 nights)", "$600",  "$2,400", "Corridor luxury: $795/night"],
  ["Green fees (3 rounds)",    "$650",  "$1,200", "Elite + public mix"],
  ["Caddie tips",              "$120",  "$180",   "$40–$60/bag/round"],
  ["Club rentals (optional)",  "$0",    "$200",   "Premium sets at all shops"],
  ["Ground transport",         "$80",   "$250",   "Shuttle vs. private SUV"],
  ["Food & beverage",          "$300",  "$800",   "Top properties: all-inclusive"],
];

const FIELD_NOTES = [
  { title: "The course we'd play with one round left", body: "Diamante Dunes. It holds many great memories. José won the qualifying for the WWT Championship here twice; Pablo has organized flawless 12-man rounds with world-class prizes on this exact layout." },
  { title: "The underrated gem",                       body: "Solmar. A true links golf course with several holes right on the Pacific Ocean — parts of the movie Troy were filmed nearby. Top-notch amenities and smaller crowds than it deserves." },
  { title: "The access trick most people miss",        body: "Many courses are strictly private. But with the right relationships, you can play several of them. We are those relationships." },
  { title: "Is Cabo worth it?",                        body: "Absolutely. It offers the best versatility in pricing and unique, world-class experiences. From the seafood scene to high-end restaurants and local gems — your time and money are well spent on and off the course." },
];

const FAQS = [
  { q: "What is the best time of year to play golf in Los Cabos?",   a: "The peak season runs November through April — dry, warm (72\u201382°F), almost no rain. For the best balance of weather and value, late October and May are the sharpest shoulder months: great conditions, fewer crowds, better rates." },
  { q: "How much does a golf trip to Los Cabos cost?",                a: "A realistic trip (4 nights, 3 rounds) runs roughly $2,200 on the budget end to $5,500+ at the luxury end. The main variables are hotel tier and course selection. Green fees alone range from $200 to $450 per round at championship courses." },
  { q: "Which is the best course in Los Cabos?",                       a: "Quivira, Cabo del Sol Ocean, and Diamante Dunes are on the same tier. The \u201Cbest\u201D depends on what you\u2019re after — links, desert, or coastal golf. Play all three and you\u2019ll have an opinion." },
  { q: "Do I need to bring my own golf clubs?",                        a: "Not necessarily. Most courses and resorts offer premium rentals for $50\u2013$75 per round. Serious golfers will prefer their own. Airlines typically charge $35\u2013$50 each way for a golf bag." },
  { q: "Are the courses walkable?",                                    a: "Most are cart-mandatory or strongly cart-recommended. Desert terrain, elevation changes, and distances make walking impractical. Cliffside layouts are not walkable." },
  { q: "Is it safe to travel to Los Cabos?",                           a: "Yes. Los Cabos is one of the safest tourist destinations in Mexico. The resort corridor and courses have excellent infrastructure and security." },
  { q: "Why do so many golfers choose Los Cabos?",                     a: "Championship courses from Nicklaus, Woods, Norman, and Love III. 340 days of sunshine. Dramatic desert-meets-ocean terrain. Direct flights from 30+ US cities. The flight from LAX is shorter than the one to Palm Springs." },
  { q: "Can beginners enjoy golf in Los Cabos?",                       a: "Absolutely. Several public-access corridor courses offer multiple tee boxes for every skill level. Most resorts have practice facilities and PGA-certified instructors on staff." },
  { q: "Do I need to tip caddies?",                                    a: "Yes — it\u2019s expected and important to their income. Standard: $30\u2013$60 USD per bag per round. The caddies at top-tier courses are excellent. Tip accordingly." },
];

const KEEP_EXPLORING = [
  { slug: "punta-mita",           name: "Punta Mita",            region: "Riviera Nayarit",   image: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=1600&q=85" },
  { slug: "mexico-city",          name: "Mexico City",            region: "Valle de México",   image: "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=1600&q=85" },
  { slug: "cancun-riviera-maya",  name: "Cancún · Riviera Maya",  region: "Quintana Roo",      image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1600&q=85" },
  { slug: "puerto-vallarta",      name: "Puerto Vallarta",        region: "Bahía de Banderas", image: "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1600&q=85" },
];

/* ═══════════════════════════════════════════════════════════════════
   REUSABLE BITS
   ═══════════════════════════════════════════════════════════════════ */

const Label = ({ children, onDark = false }) => (
  <span className={`block font-mono text-[11px] uppercase tracking-[0.14em] mb-3 ${onDark ? "text-[var(--c-gold)]" : "text-[var(--c-gold)]"}`}>
    {children}
  </span>
);

const H2 = ({ children, onDark = false, className = "" }) => (
  <h2 className={`hub-h2 font-display font-light leading-[1.08] tracking-tight text-3xl md:text-5xl ${onDark ? "text-white" : "text-[var(--c-text)]"} ${className}`}>
    {children}
  </h2>
);

const AccessPill = ({ tier }) => {
  const map = {
    public:  { bg: "bg-[rgba(45,106,79,0.12)]",      color: "text-[#2d6a4f]", label: "Public" },
    resort:  { bg: "bg-[rgba(200,169,110,0.18)]",    color: "text-[#8a6a2e]", label: "Resort" },
    private: { bg: "bg-black/8",                      color: "text-[var(--c-text-muted)]", label: "Private" },
  };
  const s = map[tier] || map.private;
  return (
    <span className={`inline-flex items-center font-mono text-[9px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-full ${s.bg} ${s.color}`}>
      {s.label}
    </span>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   PLAYBOOK CTA
   ═══════════════════════════════════════════════════════════════════ */

const PlaybookCTA = ({ variant = "full", testid }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); if (email.trim().length > 3) setSent(true); };

  if (variant === "short") {
    return (
      <section data-testid={testid} className="bg-[var(--c-surface)] py-16 md:py-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8 border-y border-[var(--c-border)] py-12 md:py-14">
          <div className="max-w-2xl">
            <Label>The 2026 Cabo Golf Playbook</Label>
            <h3 className="font-display font-normal text-[var(--c-text)] text-xl md:text-3xl leading-[1.2] tracking-tight">
              The access codes, the insider notes, and a sample 4-day <em className="italic text-[var(--c-gold)]">itinerary — free.</em>
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            {!open && !sent && (
              <button type="button" onClick={() => setOpen(true)} data-testid={`${testid}-open`} className="group inline-flex items-center gap-3 bg-[var(--c-green-deep)] hover:bg-[var(--c-green-mid)] text-white px-7 py-4 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold transition-colors whitespace-nowrap">
                Download the Playbook
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            )}
            {open && !sent && (
              <form onSubmit={submit} className="flex gap-2" data-testid={`${testid}-form`}>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="flex-1 bg-white border border-[var(--c-border)] focus:border-[var(--c-gold)] text-[var(--c-text)] placeholder:text-[var(--c-text-muted)] font-body text-sm px-4 py-3 rounded-sm focus:outline-none transition-colors" />
                <button type="submit" className="bg-[var(--c-green-deep)] hover:bg-[var(--c-green-mid)] text-white px-5 py-3 rounded-sm font-mono text-[10px] uppercase tracking-[0.16em] font-bold transition-colors">Send →</button>
              </form>
            )}
            {sent && <p className="font-display italic text-[var(--c-green-deep)] text-lg">Check your inbox.</p>}
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--c-text-muted)]">Enter your email. We send it immediately.</p>
          </div>
        </div>
      </section>
    );
  }

  const inside = [
    "8 course field notes",
    "Access codes by resort",
    "Sample 4-day itinerary",
    "Caddie tip guide",
    "Season + pricing calendar",
  ];

  return (
    <div data-testid={testid} className="bg-[var(--c-green-deep)] text-white p-8 md:p-12 rounded-md border-l-[3px] border-[var(--c-gold)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7">
          <Label onDark>The 2026 Cabo Golf Playbook</Label>
          <h3 className="font-display font-light text-white leading-[1.15] tracking-tight text-2xl md:text-4xl mb-5">
            Everything we know about playing Cabo — <em className="italic text-[var(--c-gold)]">in one free guide.</em>
          </h3>
          <p className="font-body font-light text-white/65 text-sm md:text-base leading-[1.7] max-w-xl">
            Course-by-course notes, access codes, caddie tips, and a sample 4-day itinerary. Built from 5+ years inside the corridor.
          </p>
        </div>

        <div className="lg:col-span-5">
          <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-4">What&apos;s inside</span>
          <ul className="space-y-2.5 mb-7">
            {inside.map((i) => (
              <li key={i} className="flex items-center gap-3 text-white/85 text-sm">
                <span className="text-[var(--c-gold)] font-mono">✓</span>
                {i}
              </li>
            ))}
          </ul>
          {!open && !sent && (
            <button type="button" onClick={() => setOpen(true)} data-testid={`${testid}-open`} className="group w-full inline-flex items-center justify-center gap-3 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-6 py-3.5 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold transition-colors">
              Download the Free Playbook
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          )}
          {open && !sent && (
            <form onSubmit={submit} className="flex flex-col gap-2" data-testid={`${testid}-form`}>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" data-testid={`${testid}-email`} className="bg-white/[0.06] border border-white/20 focus:border-[var(--c-gold)] text-white placeholder:text-white/35 font-body text-sm px-4 py-3.5 rounded-sm focus:outline-none transition-colors" />
              <button type="submit" data-testid={`${testid}-submit`} className="bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-6 py-3.5 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold transition-colors">
                Send It →
              </button>
            </form>
          )}
          {sent && (
            <p data-testid={`${testid}-success`} className="font-display italic text-[var(--c-gold)] text-lg text-center">
              Check your inbox — your Playbook is on its way.
            </p>
          )}
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/30 text-center">
            Enter your email. We send it immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════════════════════ */

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section data-testid="lc-faq" className="bg-[var(--c-surface)] py-24 md:py-32">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <Label>Frequently Asked</Label>
        <H2 className="mb-14">Your questions, <em className="italic text-[var(--c-gold)]">answered.</em></H2>
        <div className="max-w-[720px]">
          {FAQS.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={f.q} data-testid={`lc-faq-${i}`} className="border-b border-[var(--c-border)]">
                <button type="button" onClick={() => setOpenIdx(isOpen ? -1 : i)} aria-expanded={isOpen} className="w-full text-left py-5 md:py-6 flex items-center justify-between gap-6">
                  <span className="font-display font-normal text-[var(--c-text)] text-base md:text-xl leading-snug">{f.q}</span>
                  <span className={`font-mono text-2xl text-[var(--c-gold)] leading-none transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="pb-6 md:pb-7 font-body font-light text-[var(--c-text-mid)] text-sm md:text-base leading-[1.75] max-w-2xl">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════ */

const LosCabos = () => {
  useEffect(() => {
    document.title = "Golf in Cabo San Lucas: Courses, Costs & Access (2026) | Golf in México";
    let meta = document.querySelector("meta[name='description']");
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = "23 championship courses, green fees from $200–$500, and the insider access most travelers never find. The complete guide to golf in Cabo San Lucas and the Los Cabos corridor.";

    const schemas = [
      { "@context": "https://schema.org", "@type": "Article", headline: "Golf in Cabo San Lucas: The Complete Course Guide", author: { "@type": "Organization", name: "Golf in México" }, publisher: { "@type": "Organization", name: "Golf in México", url: "https://golfin.mx" }, datePublished: "2026-05-01", dateModified: "2026-05-25" },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://golfin.mx/" },
        { "@type": "ListItem", position: 2, name: "Destinations", item: "https://golfin.mx/destinations/" },
        { "@type": "ListItem", position: 3, name: "Los Cabos", item: "https://golfin.mx/destinations/los-cabos/" },
      ]},
      { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ];
    const els = schemas.map((s) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.text = JSON.stringify(s);
      document.head.appendChild(el);
      return el;
    });
    return () => els.forEach((el) => el.remove());
  }, []);

  return (
    <main data-testid="page-los-cabos" className="hub-page relative bg-[var(--c-off-white)]">
      {/* ═════════ S1. HERO — FULL-BLEED PHOTO + CINEMATIC GRADIENT ═════════ */}
      <header
        data-testid="lc-header"
        className="relative text-white overflow-hidden bg-[#0a1510]"
      >
        {/* Hero photograph */}
        <img
          src="https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/0wyp4brb_CABO%20PHOTO.png"
          alt="Diamante Dunes Course — Cabo San Lucas, Baja California Sur"
          loading="eager"
          fetchpriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.92) saturate(1.02)" }}
        />

        {/* Contrast gradient — heavier bottom-left for text legibility */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(115deg, rgba(10,21,16,0.88) 0%, rgba(10,21,16,0.72) 35%, rgba(10,21,16,0.32) 65%, rgba(10,21,16,0.18) 100%)",
          }}
        />
        {/* Soft top fade for navbar legibility */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,21,16,0.6) 0%, rgba(10,21,16,0) 100%)",
          }}
        />

        {/* breadcrumb */}
        <nav
          data-testid="lc-breadcrumb"
          aria-label="Breadcrumb"
          className="relative z-10 pt-32 md:pt-36 max-w-[1200px] mx-auto px-6 md:px-12 pb-6"
        >
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
            <li><Link to="/" className="hover:text-[var(--c-gold)] transition-colors">Home</Link></li>
            <li aria-hidden>›</li>
            <li><Link to="/destinations" className="hover:text-[var(--c-gold)] transition-colors">Destinations</Link></li>
            <li aria-hidden>›</li>
            <li className="text-[var(--c-gold)]">Los Cabos</li>
          </ol>
        </nav>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 pt-8 md:pt-12 pb-20 md:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 min-h-[72vh] md:min-h-[78vh] items-end">
          <div className="lg:col-span-7">
            <Label onDark>Destination Guide · Los Cabos</Label>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="hub-h1 font-display text-white text-5xl md:text-7xl lg:text-[5.25rem]"
              style={{ textShadow: "0 2px 24px rgba(10,21,16,0.45)" }}
            >
              Golf in <em className="italic text-[var(--c-gold)]">Cabo San Lucas.</em>
            </motion.h1>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-gold)] leading-[1.7]">
              GIM Editorial · Field research by Pablo De La Mora<br className="hidden md:block" />
              <span className="md:hidden"> </span>&amp; José Islas · Updated May 2026
            </p>
          </div>

          {/* Minimal stat row — 4 inline, no borders */}
          <div className="lg:col-span-5 lg:pb-4">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:gap-y-8">
              {[
                { num: "23",        label: "Courses" },
                { num: "20 mi",     label: "Corridor" },
                { num: "$200–$500", label: "Green fees" },
                { num: "Oct – May", label: "Best months" },
              ].map((s) => (
                <div key={s.label} className="border-l border-[var(--c-gold)]/40 pl-4">
                  <div
                    className="font-display font-light text-white text-2xl md:text-3xl leading-none mb-2 tracking-tight"
                    style={{ textShadow: "0 1px 12px rgba(10,21,16,0.5)" }}
                  >
                    {s.num}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--c-gold)]/85">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Hero answer block — sits on light surface, full-width readability */}
      <section data-testid="lc-hero-answer" className="bg-[var(--c-off-white)] py-14 md:py-20 border-b border-[var(--c-border)]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <blockquote className="border-l-2 border-[var(--c-gold)] pl-6 md:pl-10 max-w-[820px]">
            <p className="font-display italic font-light text-[var(--c-text)] text-xl md:text-3xl leading-[1.45]">
              Los Cabos features 23 active championship golf courses and 5 more currently under construction along a dramatic 20-mile stretch where the Sonoran Desert meets the Sea of Cortez. Green fees range from $200 to $500 USD per round, with peak conditions running from October through May.
            </p>
          </blockquote>
        </div>
      </section>

      {/* ═════════ 2. QUICK FACTS — SURFACE ═════════ */}
      <section data-testid="lc-quickfacts" className="bg-[var(--c-surface)] py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <Label>At a glance</Label>
          <H2 className="mb-14">Everything you need to know <em className="italic text-[var(--c-gold)]">before you book.</em></H2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Facts */}
            <div className="lg:col-span-7">
              <div className="divide-y divide-[var(--c-border)]">
                {QUICK_FACTS.map((f) => (
                  <div key={f.label + f.value} className="grid grid-cols-[28px_160px_1fr] gap-3 items-start py-4">
                    <div className="text-[var(--c-gold)] pt-0.5"><Icon name={f.icon} /></div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--c-text-muted)] pt-0.5">{f.label}</div>
                    <div className="text-[15px] text-[var(--c-text)] leading-[1.5]">{f.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Access legend */}
            <div className="lg:col-span-5">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--c-text-muted)] mb-4">Access types</h3>
              <div className="space-y-2">
                {[
                  { tier: "public",  border: "border-[#2d6a4f]",       bg: "bg-[rgba(45,106,79,0.08)]",      title: "Public Access",        titleColor: "text-[#2d6a4f]", body: "Book directly. No room key.", courses: "Cabo del Sol · Puerto LC · Club Campestre" },
                  { tier: "resort",  border: "border-[var(--c-gold)]",  bg: "bg-[rgba(200,169,110,0.10)]",   title: "Resort Access",         titleColor: "text-[#8a6a2e]", body: "Room key required.",          courses: "Quivira · Twin Dolphin · Palmilla" },
                  { tier: "private", border: "border-[#8b2020]",       bg: "bg-[rgba(139,32,32,0.06)]",      title: "Private / Restricted",  titleColor: "text-[#8b2020]", body: "Invitation or membership.",   courses: "Diamante Dunes · El Cardonal" },
                ].map((b) => (
                  <div key={b.title} className={`${b.bg} border-l-[3px] ${b.border} px-5 py-4 rounded-sm`}>
                    <div className={`font-mono text-[10px] uppercase tracking-[0.12em] font-bold mb-1.5 ${b.titleColor}`}>{b.title}</div>
                    <div className="text-[13px] text-[var(--c-text)] mb-1">{b.body}</div>
                    <div className="text-[13px] text-[var(--c-text-muted)] leading-[1.5]">{b.courses}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ S3. OVERVIEW + INLINE PLAYBOOK CTA — PAPER ═════════ */}
      <section data-testid="lc-overview" className="bg-[var(--c-off-white)] py-24 md:py-32">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <Label>The corridor</Label>
          <H2 className="mb-12">Los Cabos golf — <em className="italic text-[var(--c-gold)]">what you need to understand first.</em></H2>
          <div className="max-w-[680px] space-y-6 text-[var(--c-text-mid)] text-base md:text-lg leading-[1.8]" style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}>
            <p>Los Cabos is not just a destination; it is a high-demand, ultra-premium golf ecosystem located at the southern tip of the Baja California Peninsula. Where the mountains clash directly with the shoreline, signature architects have carved out a paradise that moved over 329,500 air passengers in January 2025 alone. The region commands incredible loyalty among luxury travelers, posting an elite 38% repeat-visitor rate.</p>
            <p>The market splits into three distinct zones. San José del Cabo operates at a peaceful 63% hotel occupancy, offering a cultural backdrop. Cabo San Lucas runs hotter at 79% occupancy, centered around the marina and active nightlife. The real center of gravity for championship golf is The Tourist Corridor — this exclusive strip commands a luxury-segment ADR of $795 USD and hosts the vast majority of top-tier tracks.</p>
            <p>Eight championship layouts from Nicklaus, Woods, Norman, and Love III anchor a corridor that stretches 20 miles between the two towns. The terrain is the differentiator: Pacific cliffside holes at Quivira, links-style dunes at Diamante, desert arroyos at Club Campestre, coastal finishes at Puerto Los Cabos. No other destination in Mexico puts this variety inside a 20-mile stretch.</p>
          </div>

          {/* Data strip */}
          <div className="mt-14 max-w-[860px] border-t border-[var(--c-gold)] pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { num: "329,500", label: "Air passengers Jan 2025" },
              { num: "38%",     label: "Repeat visitors" },
              { num: "$795",    label: "Luxury ADR corridor" },
              { num: "20 mi",   label: "Corridor" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display font-light text-[var(--c-text)] text-3xl md:text-4xl leading-none mb-2 tracking-tight">{s.num}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--c-text-muted)]">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Inline Playbook CTA — dark, gold-bordered box */}
          <div className="mt-14 md:mt-16">
            <PlaybookCTA variant="full" testid="lc-playbook-1" />
          </div>
        </div>
      </section>

      {/* ═════════ 4.5 EDITORIAL PHOTO STRIP — between Overview and Course Roster ═════════ */}
      <section
        data-testid="lc-photo-strip"
        aria-label="Field photography from Los Cabos"
        className="bg-[var(--c-off-white)] pb-16 md:pb-20"
      >
        <div className="max-w-[1440px] mx-auto px-0 md:px-0">
          <div className="grid grid-cols-3 gap-0">
            {PHOTO_STRIP.map((p, idx) => (
              <PhotoSlot
                key={p.label}
                label={p.label}
                testid={`lc-photo-strip-${idx}`}
                className={`photo-slot--4x3 photo-slot--zoom-parent ${idx === 2 ? "photo-strip-hide-on-mobile" : ""}`}
              />
            ))}
          </div>
          <p className="photo-strip-caption max-w-[1200px] mx-auto px-6 md:px-12">
            Photography from GIM field research, Los Cabos corridor.
          </p>
        </div>
      </section>

      {/* ═════════ 5. COURSE ROSTER — DARK ═════════ */}
      <section data-testid="lc-courses" className="bg-[var(--c-green-deep)] text-white py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <Label onDark>The courses</Label>
          <H2 onDark className="mb-5">Eight courses <em className="italic text-[var(--c-gold)]">worth your round.</em></H2>
          <p className="font-body font-light text-white/65 text-base md:text-lg max-w-2xl mb-16 leading-[1.7]">
            From Nicklaus to Tiger Woods — the complete field guide to the best golf in Cabo San Lucas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {COURSES.map((c) => (
              <motion.article
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-[var(--c-off-white)] rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.35)]"
              >
                {/* Photo at top — 16:9 */}
                <PhotoSlot
                  label={c.photoLabel}
                  src={c.photo}
                  className="photo-slot--16x9 photo-slot--zoom-parent"
                />

                <div className="p-6 md:p-7 flex flex-col gap-4 flex-1">
                  <div className="flex items-center justify-between">
                    <AccessPill tier={c.tier} />
                    <span className="font-mono text-[13px] font-bold text-[var(--c-gold)] tracking-tight">{c.fee}</span>
                  </div>
                  <div>
                    <h3 className="course-name uppercase text-[var(--c-green-deep)] text-xl md:text-[22px] leading-tight tracking-wide">{c.name}</h3>
                    <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--c-text-muted)]">{c.specs}</p>
                  </div>
                  <div className="h-px bg-[var(--c-border)]" />
                  <p className="text-[14px] text-[var(--c-text-mid)] leading-[1.65]">{c.note}</p>
                  <div className="h-px bg-[var(--c-border)]" />
                  <div className="border-l-2 border-[var(--c-gold)] pl-4 ml-1">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--c-gold)] mb-1">Standout Hole</span>
                    <p className="text-[13px] italic text-[var(--c-text-mid)] leading-[1.5]">{c.standout}</p>
                  </div>

                  {/* Article link — live or coming soon */}
                  <div className="mt-auto pt-3 border-t border-[var(--c-border)]">
                    {c.article ? (
                      <Link
                        to={c.article}
                        className="live-link"
                        data-testid={`lc-course-article-${c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      >
                        Read Pablo&apos;s field notes
                        <span>→</span>
                      </Link>
                    ) : (
                      <span className="coming-soon-link">
                        Field notes coming — subscribe
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ 6. COMPARISON — PAPER ═════════ */}
      <section data-testid="lc-compare" className="bg-[var(--c-off-white)] py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <Label>Side by side</Label>
          <H2 className="mb-12">Compare before you book.</H2>
          <div className="overflow-x-auto border border-[var(--c-border)] rounded-sm">
            <table className="w-full text-sm min-w-[860px]">
              <thead>
                <tr className="bg-[var(--c-green-deep)]">
                  {["Course", "Designer", "Fee Range", "Access", "Difficulty", "Best For"].map((h, i) => (
                    <th key={h} className={`text-left font-mono text-[10px] uppercase tracking-[0.12em] font-normal py-3.5 px-4 ${i === 0 ? "text-[var(--c-gold)]" : "text-white/65"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row[0]} className="border-b border-[var(--c-border)] last:border-0 hover:bg-[var(--c-surface)] transition-colors">
                    <td className="py-3.5 px-4 align-top font-display text-[15px] text-[var(--c-text)]">{row[0]}</td>
                    <td className="py-3.5 px-4 align-top text-[var(--c-text-mid)]">{row[1]}</td>
                    <td className="py-3.5 px-4 align-top font-mono text-[var(--c-text)]">{row[2]}</td>
                    <td className="py-3.5 px-4 align-top text-[var(--c-text-mid)] capitalize">{row[3]}</td>
                    <td className="py-3.5 px-4 align-top font-mono text-[var(--c-gold)] font-bold">{row[4]}</td>
                    <td className="py-3.5 px-4 align-top text-[var(--c-text-mid)]">{row[5]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-[0.14em]">
            <span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#2d6a4f]" /> Public — book directly</span>
            <span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[var(--c-gold)]" /> Resort — room key required <span className="text-[var(--c-text-muted)] normal-case ml-1">* priority but open when available</span></span>
            <span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#8b2020]" /> Private — invitation only</span>
            <span className="text-[var(--c-text-muted)] basis-full normal-case">Difficulty: 1 Beginner → 5 Tournament · GIM editorial rating</span>
          </div>
        </div>
      </section>

      {/* ═════════ 7. PULL QUOTE — DARK ═════════ */}
      <section data-testid="lc-pullquote" className="bg-[var(--c-green-deep)] py-24 md:py-32">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <blockquote className="border-l-[3px] border-[var(--c-gold)] pl-7 md:pl-10 max-w-[700px] mx-auto">
            <p className="font-display italic font-normal text-white text-2xl md:text-4xl leading-[1.4]">
              &ldquo;Cabo is a true golf paradise. Whether you&apos;re a member of an exclusive club, a local with 30 years here, an expat, or a pro golfer — the feeling is the same.&rdquo;
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--c-gold)]">
              — Golf in México Field Notes
            </p>
          </blockquote>
        </div>
      </section>

      {/* ═════════ 8. COST — PAPER ═════════ */}
      <section data-testid="lc-costs" className="bg-[var(--c-off-white)] py-24 md:py-32">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <Label>The math</Label>
          <H2 className="mb-8">Here is exactly <em className="italic text-[var(--c-gold)]">what you will spend.</em></H2>
          <p className="max-w-[680px] font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.75] mb-12">
            Standard Cabo golf packages often cloud the true cost by hiding mandatory fees and customary incidentals. Here is what a realistic 4-night, 3-round golf trip looks like mid-season — no surprises.
          </p>

          <div className="overflow-x-auto border border-[var(--c-border)] rounded-sm">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="bg-[var(--c-green-deep)]">
                  {["Cost Element", "Low", "High", "Notes"].map((h, i) => (
                    <th key={h} className={`text-left font-mono text-[10px] uppercase tracking-[0.12em] font-normal py-3.5 px-4 ${i === 0 ? "text-[var(--c-gold)]" : "text-white/65"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COSTS.map((row) => (
                  <tr key={row[0]} className="border-b border-[var(--c-border)]">
                    <td className="py-3.5 px-4 align-top font-display text-[var(--c-text)]">{row[0]}</td>
                    <td className="py-3.5 px-4 align-top font-mono text-[#2d6a4f]">{row[1]}</td>
                    <td className="py-3.5 px-4 align-top font-mono text-[var(--c-text)]">{row[2]}</td>
                    <td className="py-3.5 px-4 align-top text-[var(--c-text-mid)] leading-[1.55]">{row[3]}</td>
                  </tr>
                ))}
                <tr className="bg-[var(--c-surface)] border-t-2 border-[var(--c-green-mid)]">
                  <td className="py-4 px-4 font-display text-base font-bold text-[var(--c-text)]">Total all-in (per person)</td>
                  <td className="py-4 px-4 font-mono font-bold text-[#2d6a4f] text-[15px]">$2,230</td>
                  <td className="py-4 px-4 font-mono font-bold text-[var(--c-text)] text-[15px]">$5,580</td>
                  <td className="py-4 px-4 italic text-[var(--c-text-mid)]">Mid-season estimate</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-[var(--c-surface)] border-l-[3px] border-[var(--c-gold)] rounded-sm p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--c-gold)] mb-3">💡 The luxury variable</div>
              <p className="text-sm text-[var(--c-text-mid)] leading-[1.7]">
                Your choice of base camp heavily dictates the financial footprint. While a hotel in Cabo San Lucas averages $319/night and San José averages $303, stepping into the gated Corridor properties moves your baseline to $795/night. However, premium courses like Quivira and Twin Dolphin completely change the value equation by bundling gourmet food and top-shelf liquor stations into the green fee.
              </p>
            </div>
            <div className="bg-[var(--c-surface)] border-l-[3px] border-[var(--c-gold)] rounded-sm p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--c-gold)] mb-3">🌅 The twilight advantage</div>
              <p className="text-sm text-[var(--c-text-mid)] leading-[1.7]">
                Afternoon booking windows (typically 1:00 or 2:00 PM) unlock 30–50% price reductions. During the spring shoulder months, an early afternoon tee time lets you finish all 18 holes before sunset while keeping budgets intact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ 9. ACCESS RULES — DARK ═════════ */}
      <section data-testid="lc-access" className="bg-[var(--c-green-deep)] text-white py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <Label onDark>The gates</Label>
          <H2 onDark className="mb-14">Who can play where — <em className="italic text-[var(--c-gold)]">and how.</em></H2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {[
              { icon: "unlock", title: "Open to All (Public)",     items: ["Cabo del Sol Ocean Course — advance reservation required", "Puerto Los Cabos — open to the public", "Club Campestre San José — best value on the corridor (60–90 day advance window in high season; 2-week window off-season)"] },
              { icon: "key",    title: "Resort Guest Access",      items: ["Quivira → confirmed room at any Pueblo Bonito property", "Twin Dolphin → Montage Los Cabos room key required", "Palmilla → priority for One&Only guests; open to all when availability allows"] },
              { icon: "shield", title: "Private / Restricted",     items: ["Diamante Dunes → member-guest or resort access", "El Cardonal at Diamante → private, restricted"] },
              { icon: "person", title: "The Caddie Culture",       paragraph: "Caddies are mandatory at elite tier layouts and highly recommended elsewhere. They read the tricky ocean breaks and protect your pace of play. Budget $40–$60 USD per bag as the standard tip. These veterans are part of the experience." },
              { icon: "shirt",  title: "Dress Code",                paragraph: "Collared shirts, tailored golf shorts or trousers, soft-spike shoes. No denim. GIM standard rules apply corridor-wide." },
            ].map((b) => (
              <div key={b.title}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[var(--c-gold)]"><Icon name={b.icon} className="w-6 h-6" /></span>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--c-gold)] font-bold">{b.title}</h3>
                </div>
                {b.items && (
                  <ul className="space-y-2.5">
                    {b.items.map((i) => (
                      <li key={i} className="flex gap-3 text-sm md:text-[15px] text-white/75 leading-[1.65]">
                        <span className="text-[var(--c-gold)] mt-1.5 text-[10px]">▸</span>
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {b.paragraph && (
                  <p className="text-sm md:text-[15px] text-white/75 leading-[1.7]">{b.paragraph}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 border-2 border-[var(--c-gold)] bg-white/[0.03] rounded-sm p-8 md:p-10 max-w-[820px]">
            <p className="font-display italic font-light text-white text-lg md:text-2xl leading-[1.5] mb-6">
              &ldquo;Many top courses are strictly private — but with the right relationships, you can play several of them. We are those relationships.&rdquo;
            </p>
            <Link
              to="/trip-builder"
              data-testid="lc-access-cta"
              className="group inline-flex items-center gap-3 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-7 py-3.5 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold transition-colors"
            >
              Get Course Access
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* ── Atmospheric photo ── */}
          <div className="mt-12 md:mt-16">
            <PhotoSlot
              label="The Corridor · Baja California Sur"
              testid="lc-atmo-photo"
              className="photo-slot--atmo photo-slot--zoom-parent"
            />
            <p className="atmo-caption" style={{ color: "rgba(248,245,240,0.55)" }}>
              The Corridor · Baja California Sur
            </p>
          </div>
        </div>
      </section>

      {/* ═════════ S8. LOGISTICS — PAPER ═════════ */}
      <section data-testid="lc-logistics" className="bg-[var(--c-off-white)] py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <Label>On the ground</Label>
          <H2 className="mb-14">Getting there and between courses.</H2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-[1100px]">
            {[
              { icon: "plane",   title: "Airport + Arrivals",       body: "SJD International handles 82.9% of international traffic from the US — anchored by Los Angeles (12.5%), Dallas (10.7%), and Phoenix (10.5%). SJD handled 2,000+ private-jet operations in January 2025 with its own dedicated FBO terminal." },
              { icon: "car",     title: "Getting to the Courses",   body: "Most courses sit 15–30 minutes from the airport along Highway 1. Pre-arranged private SUV transfers are the standard. Uber is legal but frequently blocked from entering the deep security gates of elite private clubs." },
              { icon: "map",     title: "Between Courses",           body: "San José del Cabo ↔ Cabo San Lucas: 25–35 minutes on Highway 1. Build 45 minutes into your schedule for mid-day traffic. Courses toward each town require separate transfer planning for multi-course days." },
              { icon: "dollar",  title: "Currency + Tipping",        body: "USD accepted everywhere on the golf corridor. Caddie tips in USD: $40–$60 per round. Restaurants: 15–20%. ATMs available for pesos if preferred." },
            ].map((c) => (
              <div key={c.title} className="bg-[var(--c-surface)] rounded-sm p-6 md:p-7 flex flex-col gap-3">
                <div className="text-[var(--c-gold)]"><Icon name={c.icon} className="w-6 h-6" /></div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-[var(--c-text)]">{c.title}</h3>
                <p className="text-sm text-[var(--c-text-mid)] leading-[1.7]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ 12. SEASON GUIDE — DARK ═════════ */}
      <section data-testid="lc-season" className="bg-[var(--c-green-deep)] text-white py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <Label onDark>The calendar</Label>
          <H2 onDark className="mb-14">When to play.</H2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
            {[
              { name: "Peak Season",     months: "Nov – Apr", conditions: "72–82°F · High Crowds · $$$", body: "Clear skies, low humidity, manageable winds. Every course delivers its best conditions. Book flights first, tee times second. Advance window: 60–90 days for public slots.", border: "border-[var(--c-gold)]" },
              { name: "Shoulder Season", months: "May – Jun", conditions: "82–90°F · Moderate Crowds · $$", body: "Warmer but playable with early tee times. Courses quieter; many resorts fold golf into the room rate. If you can take the heat, the math is hard to beat.", border: "border-[var(--c-gold)]/50" },
              { name: "Off-Season",      months: "Jul – Oct", conditions: "85–95°F · Low Crowds · $",     body: "30–50% below peak pricing. Humidity, afternoon storms, occasional hurricane risk (August–September peak). Morning rounds still excellent. Flexibility required.", border: "border-[var(--c-gold)]/20" },
            ].map((s) => (
              <div key={s.name} className={`bg-white/[0.03] p-7 md:p-8 border-t-[3px] ${s.border}`}>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--c-gold)] mb-2">{s.name}</div>
                <h3 className="font-display font-normal text-white text-2xl md:text-3xl mb-3">{s.months}</h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/45 mb-5">{s.conditions}</p>
                <p className="text-sm text-white/70 leading-[1.7]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ 13. FIELD NOTES — PAPER ═════════ */}
      <section data-testid="lc-field-notes" className="bg-[var(--c-off-white)] py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <Label>From the founders</Label>
          <H2 className="mb-10">The things <em className="italic text-[var(--c-gold)]">we tell our friends.</em></H2>

          {/* Credential strip — subtle proof above the notes */}
          <CredentialStrip variant="light" testid="lc-credentials" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Founder photo */}
            <div className="lg:col-span-4">
              <PhotoSlot
                label="Pablo De La Mora · Los Cabos"
                testid="lc-founder-photo"
                className="photo-slot--3x4 photo-slot--zoom-parent rounded-[4px]"
              />
            </div>

            {/* Notes */}
            <div className="lg:col-span-8">
              {FIELD_NOTES.map((n, i) => (
                <div key={n.title} className="grid grid-cols-[48px_1fr] md:grid-cols-[72px_1fr] gap-5 md:gap-8 py-6 md:py-7 border-b border-[var(--c-border)] last:border-0 items-start">
                  <span className="font-display font-light text-[var(--c-gold)] text-3xl md:text-5xl leading-none pt-1 tracking-tight">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-[var(--c-text-muted)] mb-3">{n.title}</div>
                    <p className="text-[15px] md:text-base text-[var(--c-text-mid)] leading-[1.75]">{n.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ S11. ALL ARTICLES & GUIDES — SURFACE ═════════ */}
      <section data-testid="lc-articles" className="bg-[var(--c-surface)] py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <Label>All guides</Label>
          <H2 className="mb-14">Every guide for <em className="italic text-[var(--c-gold)]">Los Cabos.</em></H2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[
              { status: "live",        title: "Los Cabos Golf — The Complete Guide",   desc: "This page — every course, cost, and access rule." },
              { status: "coming-soon", title: "Public Golf Courses in Cabo",            desc: "Which courses are open without a resort stay — and how to book them directly." },
              { status: "coming-soon", title: "All-Inclusive Golf Resorts in Los Cabos", desc: "What's actually included in the room rate — and what costs extra." },
              { status: "coming-soon", title: "Quivira Golf Club: Field Notes",         desc: "Hole-by-hole — Pablo's firsthand account." },
              { status: "coming-soon", title: "Cabo del Sol — Ocean Course: Field Notes", desc: "Hole-by-hole — Pablo's firsthand account." },
              { status: "coming-soon", title: "Diamante Golf Cabo: Field Notes",         desc: "Hole-by-hole — Pablo's firsthand account." },
            ].map((a) => (
              <article
                key={a.title}
                data-testid={`lc-article-${a.status}`}
                className="bg-white rounded-sm border border-[var(--c-border)] p-6 md:p-7 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.18)]"
              >
                <span
                  className={`inline-flex self-start items-center font-mono text-[9px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-full ${
                    a.status === "live"
                      ? "bg-[rgba(31,92,58,0.12)] text-[var(--c-live)]"
                      : "bg-black/5 text-[var(--c-text-muted)]"
                  }`}
                >
                  {a.status === "live" ? "● Live" : "Coming Soon"}
                </span>
                <h3 className="font-display font-light text-[var(--c-text)] text-lg md:text-xl leading-tight tracking-tight">{a.title}</h3>
                <p className="text-sm text-[var(--c-text-mid)] leading-[1.65]">{a.desc}</p>
              </article>
            ))}
          </div>

          <p className="article-count article-count--light mt-10" data-testid="lc-article-count-bottom">
            3 field reports published · Los Cabos
          </p>
        </div>
      </section>

      {/* ═════════ S12. NEWSLETTER — DARK ═════════ */}
      <section data-testid="lc-newsletter-cta" className="bg-[var(--c-green-deep)] text-white py-24 md:py-32">
        <div className="max-w-[640px] mx-auto px-6 md:px-12 text-center">
          <Label onDark>Field Notes</Label>
          <H2 onDark className="mb-6">Get Pablo&apos;s insider picks for <em className="italic text-[var(--c-gold)]">Los Cabos.</em></H2>
          <p className="font-body font-light text-white/70 text-base md:text-lg leading-[1.75] mb-5">
            Pablo&apos;s weekly Field Notes — which courses he&apos;d play this month, which caddie to request, and what a round actually costs. Written from inside México, not from a desk.
          </p>
          <p className="font-body font-light text-white/50 text-sm md:text-base mb-10">
            Subscribe and get Los Cabos-specific Field Notes plus The Caddie Report.
          </p>
          <NewsletterMiniForm testid="lc-newsletter-cta-form" />
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/30">
            No spam. Unsubscribe anytime. Pablo writes these himself.
          </p>
        </div>
      </section>

      {/* ═════════ S13. FAQ — SURFACE ═════════ */}
      <FAQ />

      {/* ═════════ END PLAYBOOK CTA — SURFACE ═════════ */}
      <section data-testid="lc-playbook-end" className="bg-[var(--c-surface)] py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center border-y border-[var(--c-border)] py-12 md:py-14">
          <div className="md:col-span-7">
            <Label>The 2026 Cabo Golf Playbook</Label>
            <h3 className="font-display font-light text-[var(--c-text)] text-2xl md:text-4xl leading-[1.15] tracking-tight mb-5">
              The access codes, the insider notes, and a sample 4-day <em className="italic text-[var(--c-gold)]">itinerary — free.</em>
            </h3>
            <p className="font-body font-light text-[var(--c-text-mid)] text-sm md:text-base leading-[1.7] max-w-xl">
              Built from 5+ years inside the corridor. Course notes, resort access by property, and the caddie tips most travelers never find.
            </p>
          </div>
          <div className="md:col-span-5">
            <PlaybookEndForm />
          </div>
        </div>
      </section>

      {/* ═════════ KEEP EXPLORING — DARK ═════════ */}
      <section data-testid="lc-keep-exploring" className="bg-[var(--c-green-deep)] text-white py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <Label onDark>Keep exploring</Label>
          <H2 onDark className="mb-4">More golf in <em className="italic text-[var(--c-gold)]">México.</em></H2>
          <p className="font-body font-light text-white/65 text-base md:text-lg max-w-xl mb-14 leading-[1.7]">
            Cabo, Cancún, Vallarta, Punta Mita, CDMX — the rest of the country in one editorial directory.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {KEEP_EXPLORING.map((d) => (
              <Link key={d.slug} to={`/destinations/${d.slug}`} data-testid={`lc-keep-${d.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--c-green-deep)] rounded-sm">
                  <img src={d.image} alt={d.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--c-gold)] mb-1">{d.region}</span>
                    <h3 className="font-display text-white text-lg md:text-xl leading-tight">{d.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

const NewsletterMiniForm = ({ testid }) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <p data-testid={`${testid}-success`} className="font-display italic text-[var(--c-gold)] text-lg">
        Welcome to the room.
      </p>
    );
  }
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (email.trim().length > 3) setSent(true); }}
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      data-testid={testid}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 bg-white/[0.06] border border-white/20 focus:border-[var(--c-gold)] text-white placeholder:text-white/35 font-body text-sm px-4 py-3.5 rounded-sm focus:outline-none transition-colors"
      />
      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-2 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-6 py-3.5 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold transition-colors"
      >
        Subscribe
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
};

const PlaybookEndForm = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <p data-testid="lc-playbook-end-success" className="font-display italic text-[var(--c-green-deep)] text-lg text-center">
        Check your inbox — your Playbook is on its way.
      </p>
    );
  }
  if (open) {
    return (
      <form
        onSubmit={(e) => { e.preventDefault(); if (email.trim().length > 3) setSent(true); }}
        className="flex flex-col gap-2"
        data-testid="lc-playbook-end-form"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="bg-white border border-[var(--c-border)] focus:border-[var(--c-gold)] text-[var(--c-text)] placeholder:text-[var(--c-text-muted)] font-body text-sm px-4 py-3.5 rounded-sm focus:outline-none transition-colors"
        />
        <button
          type="submit"
          className="bg-[var(--c-green-deep)] hover:bg-[var(--c-green-mid)] text-white px-6 py-3.5 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold transition-colors"
        >
          Send It →
        </button>
      </form>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      data-testid="lc-playbook-end-open"
      className="group w-full inline-flex items-center justify-center gap-3 bg-[var(--c-green-deep)] hover:bg-[var(--c-green-mid)] text-white px-7 py-4 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold transition-colors"
    >
      Download the Playbook
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </button>
  );
};

export default LosCabos;
