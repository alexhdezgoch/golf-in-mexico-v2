import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════
   DATA — exact content from the spec
   ═══════════════════════════════════════════════════════════════════ */

const QUICK_FACTS = [
  ["Number of Golf Courses", "23 active (5 under construction)"],
  ["Course Designers", "Nicklaus, Woods, Norman, Love III, Fazio, Eckenrode, Couples"],
  ["Green Fee Range", "$200 – $500 USD"],
  ["Best Months for Golf", "October – May"],
  ["Months to Avoid", "August – September (peak hurricane and rain risk)"],
  ["Nearest Airport", "Los Cabos International (SJD)"],
  ["Private Aviation", "SJD dedicated FBO / Cabo San Lucas Airport (CSL)"],
  ["Languages at Courses", "English and Spanish (all staff)"],
  ["Caddie Policy", "Mandatory at Tier-1 courses; highly recommended corridor-wide"],
  ["USD Accepted", "Yes — everywhere on the corridor"],
];

const COURSES = [
  {
    name: "Quivira Golf Club",
    designer: "Jack Nicklaus",
    par: "72",
    type: "Championship",
    fee: "$395 – $450 USD",
    access: "Resort guests only — Pueblo Bonito Properties",
    accessTier: "resort",
    standout: "#5 — Cliffside par 3, 178 yards above the Pacific.",
    note: "The crown jewel of the corridor. Every hole delivers an ocean view; the closing stretch is among the most photographed in North America.",
  },
  {
    name: "Cabo del Sol — Ocean Course",
    designer: "Jack Nicklaus",
    par: "72",
    type: "Championship",
    fee: "$350 – $395 USD",
    access: "Open to the public — advance reservation required",
    accessTier: "public",
    standout: "#17 — Signature par 3 beside the crashing surf.",
    note: "The layout that put Los Cabos golf on the global map. The back nine runs along the Sea of Cortez.",
  },
  {
    name: "Diamante — Dunes Course",
    designer: "Davis Love III",
    par: "72",
    type: "Championship",
    fee: "$300 – $375 USD",
    access: "Private — member-guest or resort access",
    accessTier: "private",
    standout: "#14 — Links-style par 4 through towering sand structures.",
    note: "A true links experience on the Pacific side of Cabo. Walks and plays like a British course — 340 days of sun.",
  },
  {
    name: "El Cardonal at Diamante",
    designer: "Tiger Woods",
    par: "72",
    type: "Resort-Friendly",
    fee: "$275 – $350 USD",
    access: "Private — restricted access",
    accessTier: "private",
    standout: "#6 — Sweeping downhill par 5, Pacific Ocean backdrop.",
    note: "Tiger Woods' first solo design outside the United States. Wide fairways through desert arroyos — playable for mixed-handicap groups.",
  },
  {
    name: "Palmilla Golf Club",
    designer: "Jack Nicklaus",
    par: "72",
    type: "Resort-Friendly",
    fee: "$250 – $310 USD",
    access: "Open to all — resort guest priority (One&Only Palmilla)",
    accessTier: "public",
    standout: "Mountain #4 — Elevated tee shot, deep mountain shadows, distant sea view.",
    note: "The course that started the modern corridor in 1992 — the first Nicklaus design in Latin America. Three interchangeable nines: Mountain, Arroyo, Ocean.",
  },
  {
    name: "Puerto Los Cabos",
    designer: "Jack Nicklaus + Greg Norman",
    par: "72",
    type: "Moderate",
    fee: "$250 – $300 USD",
    access: "Open to the public",
    accessTier: "public",
    standout: "#18 — Norman's finishing hole along the marina coastline.",
    note: "The only routing in Mexico where two legends collaborated. Nicklaus shaped the front nine; Norman designed the back.",
  },
  {
    name: "Club Campestre San José",
    designer: "Nicklaus Design",
    par: "72",
    type: "Moderate",
    fee: "$200 – $260 USD",
    access: "Open to the public — best value on the corridor",
    accessTier: "public",
    standout: "#7 — Demanding approach over a deep arroyo crossing.",
    note: "Weaves through rugged desert arroyos with the Sierra de la Laguna mountains framing every shot. The truest sense of Baja's inland topography.",
  },
  {
    name: "Twin Dolphin Golf Club",
    designer: "Todd Eckenrode + Fred Couples",
    par: "72",
    type: "Championship",
    fee: "$350 – $400 USD",
    access: "Private — Montage Los Cabos guests only",
    accessTier: "private",
    standout: "#3 — Par 3 playing directly across a jagged canyon.",
    note: "Built on the historic grounds of the original Twin Dolphin Hotel. Tournament-level greens with the Sea of Cortez visible from almost every tee box.",
  },
];

const COMPARISON = [
  ["Quivira Golf Club", "Nicklaus", "72", "$395–$450", "Resort", "Ocean views, clifftop holes"],
  ["Cabo del Sol Ocean", "Nicklaus", "72", "$350–$395", "Public", "Iconic layout, Sea of Cortez back 9"],
  ["Diamante Dunes", "Love III", "72", "$300–$375", "Private", "Links experience, sand dunes"],
  ["El Cardonal at Diamante", "Tiger Woods", "72", "$275–$350", "Private", "Mixed groups, desert arroyos"],
  ["Palmilla Golf Club", "Nicklaus", "72", "$250–$310", "Public", "Three nines, historic corridor"],
  ["Puerto Los Cabos", "Nicklaus + Norman", "72", "$250–$300", "Public", "Two-architect collaboration"],
  ["Club Campestre San José", "Nicklaus Design", "72", "$200–$260", "Public", "Best value, mountain terrain"],
  ["Twin Dolphin", "Eckenrode + Couples", "72", "$350–$400", "Private", "Tournament greens, canyon holes"],
];

const COSTS = [
  ["Flights (commercial)", "$280", "$550", "Direct from LAX, DFW, HOU"],
  ["Accommodation (4 nights)", "$600", "$2,400", "Double occupancy; corridor luxury: $795/night"],
  ["Green fees (3 rounds)", "$650", "$1,200", "Mix of elite + public courses"],
  ["Caddie tips", "$120", "$180", "$40–$60 per bag per round"],
  ["Club rentals (optional)", "$0", "$200", "Premium sets at all pro shops"],
  ["Ground transport", "$80", "$250", "Shuttle vs. private SUV"],
  ["Food & beverage", "$300", "$800", "Top properties include stations"],
];

const FAQS = [
  {
    q: "What is the best time of year to play golf in Los Cabos?",
    a: "The peak season runs November through April — dry, warm (72–82°F), almost no rain. For the best balance of weather and value, late October and May are the sharpest shoulder months: great conditions, fewer crowds, better rates.",
  },
  {
    q: "How much does a golf trip to Los Cabos cost?",
    a: "A realistic trip (4 nights, 3 rounds) runs roughly $2,230 on the budget end to $5,580 at the luxury end. The main variables are hotel tier and course selection. Green fees alone range from $200 to $450 per round at championship courses.",
  },
  {
    q: "Which is the best course in Los Cabos?",
    a: "Quivira, Cabo del Sol Ocean, and Diamante Dunes are on the same tier. The \u201Cbest\u201D depends on what you\u2019re after — links, desert, or coastal golf. Play all three and you\u2019ll have an opinion.",
  },
  {
    q: "Do I need to bring my own golf clubs?",
    a: "Not necessarily. Most courses and resorts offer premium rentals for $50–$75 per round. Serious golfers will still prefer their own. Airlines typically charge $35–$50 each way for a golf bag.",
  },
  {
    q: "Are the courses walkable?",
    a: "Most are cart-mandatory or strongly cart-recommended. The desert terrain, elevation changes, and distances make walking impractical. Cliffside layouts are not walkable. A handful of older parkland-style courses are your best bet if walking matters.",
  },
  {
    q: "Is it safe to travel to Los Cabos?",
    a: "Yes. Los Cabos is one of the safest tourist destinations in Mexico. The resort corridor and courses have excellent infrastructure and security. Standard travel precautions apply as anywhere.",
  },
  {
    q: "Do I need to tip caddies?",
    a: "Yes — tipping is expected and an important part of their income. Standard is $30–$60 USD per bag per round. The caddies at top-tier courses are excellent — knowledgeable, professional, genuinely part of the experience. Tip accordingly.",
  },
  {
    q: "Can beginners enjoy golf in Los Cabos?",
    a: "Absolutely. Several public-access corridor courses offer multiple tee boxes for every skill level. Most resorts have practice facilities and PGA-certified instructors on staff.",
  },
];

const KEEP_EXPLORING = [
  { slug: "punta-mita", name: "Punta Mita", region: "Riviera Nayarit", image: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=1600&q=85" },
  { slug: "mexico-city", name: "Mexico City", region: "Valle de México", image: "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=1600&q=85" },
  { slug: "cancun-riviera-maya", name: "Cancún · Riviera Maya", region: "Quintana Roo", image: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1600&q=85" },
  { slug: "puerto-vallarta", name: "Puerto Vallarta", region: "Bahía de Banderas", image: "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1600&q=85" },
];

/* ═══════════════════════════════════════════════════════════════════
   REUSABLE BITS
   ═══════════════════════════════════════════════════════════════════ */

const SectionLabel = ({ children }) => (
  <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--c-gold)] mb-4">
    {children}
  </span>
);

const SectionTitle = ({ children, className = "" }) => (
  <h2 className={`font-display font-normal text-[var(--c-text)] leading-[1.12] tracking-tight text-3xl md:text-5xl ${className}`}>
    {children}
  </h2>
);

const AccessBadge = ({ tier }) => {
  const styles = {
    public: "bg-[rgba(31,92,58,0.10)] text-[#1f5c3a]",
    resort: "bg-[rgba(200,169,110,0.15)] text-[#8a6a2e]",
    private: "bg-black/5 text-[var(--c-text-muted)]",
  };
  const label = { public: "Public", resort: "Resort", private: "Private" }[tier];
  return (
    <span className={`inline-flex items-center font-mono text-[9px] uppercase tracking-[0.12em] px-2.5 py-1 rounded-sm ${styles[tier]}`}>
      {label}
    </span>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   PLAYBOOK CTA — inline email capture (MOCKED submit)
   ═══════════════════════════════════════════════════════════════════ */

const PlaybookCTA = ({ variant = "full", testid }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (email.trim().length > 3) {
      // MOCKED — tag: leadmagnet:cabos
      setSent(true);
    }
  };

  const isShort = variant === "short";

  return (
    <section data-testid={testid} className="py-14 md:py-20">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <div className="bg-[var(--c-green-deep)] border-l-4 border-[var(--c-gold)] rounded-sm p-8 md:p-12 lg:p-14 text-white">
          <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--c-gold)] mb-6">
            The 2026 Cabo Golf Playbook
          </span>
          <h3 className={`font-display font-normal text-white leading-[1.1] tracking-tight ${isShort ? "text-2xl md:text-4xl" : "text-3xl md:text-5xl"} max-w-3xl mb-5`}>
            {isShort ? (
              <>
                The access codes, insider notes, and a sample 4-day
                <em className="italic text-[var(--c-gold)]"> itinerary — free.</em>
              </>
            ) : (
              <>
                Everything we know about playing Los Cabos —
                <em className="italic text-[var(--c-gold)]"> in one free guide.</em>
              </>
            )}
          </h3>
          {!isShort && (
            <p className="font-body font-light text-white/65 text-base md:text-lg leading-[1.7] max-w-2xl mb-9">
              Course-by-course notes, access codes, the caddie tips most travelers
              never find, and a sample 4-day itinerary. Built from 5+ years inside
              the corridor.
            </p>
          )}

          {!open && !sent && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              data-testid={`${testid}-open`}
              className="group inline-flex items-center gap-3 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-7 py-4 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold transition-colors duration-300 shadow-[0_12px_32px_-8px_rgba(200,169,110,0.5)]"
            >
              Download the Free Playbook
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </button>
          )}

          {open && !sent && (
            <form onSubmit={onSubmit} data-testid={`${testid}-form`} className="mt-2 grid grid-cols-1 md:grid-cols-12 gap-3 max-w-2xl">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                data-testid={`${testid}-name`}
                className="md:col-span-4 bg-white/[0.04] border border-white/20 focus:border-[var(--c-gold)] text-white placeholder:text-white/40 font-body text-sm px-4 py-3.5 rounded-sm focus:outline-none transition-colors"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                data-testid={`${testid}-email`}
                className="md:col-span-5 bg-white/[0.04] border border-white/20 focus:border-[var(--c-gold)] text-white placeholder:text-white/40 font-body text-sm px-4 py-3.5 rounded-sm focus:outline-none transition-colors"
              />
              <button
                type="submit"
                data-testid={`${testid}-submit`}
                className="md:col-span-3 group inline-flex items-center justify-center gap-2 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-5 py-3.5 rounded-sm font-mono text-[11px] uppercase tracking-[0.16em] font-bold transition-colors"
              >
                Send Me the Playbook
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </form>
          )}

          {sent && (
            <p data-testid={`${testid}-success`} className="font-display italic font-normal text-[var(--c-gold)] text-xl md:text-2xl">
              Check your inbox — your Playbook is on its way.
            </p>
          )}

          {!isShort && !sent && (
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
              We send it immediately. No spam. One email with the guide + Pablo&apos;s weekly field notes.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   FAQ — single-open accordion
   ═══════════════════════════════════════════════════════════════════ */

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section data-testid="loscabos-faq" className="py-20 md:py-28 border-t border-[var(--c-border)]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <SectionLabel>Frequently Asked</SectionLabel>
        <SectionTitle className="mb-12 md:mb-16">
          Your questions, <em className="italic text-[var(--c-gold)]">answered.</em>
        </SectionTitle>
        <div className="max-w-[820px]">
          {FAQS.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={f.q} data-testid={`faq-item-${i}`} className="border-b border-[var(--c-border)]">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className="w-full text-left py-5 md:py-6 flex items-center justify-between gap-6"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-normal text-[var(--c-text)] text-base md:text-xl leading-snug">
                    {f.q}
                  </span>
                  <span
                    className={`font-mono text-2xl text-[var(--c-gold)] leading-none transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 md:pb-7 font-body font-light text-[var(--c-text-mid)] text-sm md:text-base leading-[1.75] max-w-2xl">
                      {f.a}
                    </p>
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
    document.title = "Golf in Cabo San Lucas: The Complete Course Guide | Golf in México";
    const meta = document.querySelector("meta[name='description']") || document.createElement("meta");
    meta.name = "description";
    meta.content =
      "23 championship courses, green fees from $200–$500, and the insider access most travelers never find. The complete guide to golf in Cabo San Lucas and the Los Cabos corridor — every course, what it costs, and how to get on.";
    if (!meta.parentNode) document.head.appendChild(meta);

    // JSON-LD blocks
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Golf in Cabo San Lucas: The Complete Course Guide",
        author: { "@type": "Organization", name: "Golf in México" },
        publisher: { "@type": "Organization", name: "Golf in México", url: "https://golfin.mx" },
        datePublished: "2026-05-01",
        dateModified: "2026-05-25",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://golfin.mx/" },
          { "@type": "ListItem", position: 2, name: "Destinations", item: "https://golfin.mx/destinations/" },
          { "@type": "ListItem", position: 3, name: "Los Cabos", item: "https://golfin.mx/destinations/los-cabos/" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ];
    const scriptEls = schemas.map((s) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.text = JSON.stringify(s);
      document.head.appendChild(el);
      return el;
    });
    return () => scriptEls.forEach((el) => el.remove());
  }, []);

  return (
    <main data-testid="page-los-cabos" className="relative bg-[var(--c-off-white)] pt-32 md:pt-36">
      {/* ── 1. Breadcrumb ── */}
      <nav data-testid="loscabos-breadcrumb" aria-label="Breadcrumb" className="max-w-[1100px] mx-auto px-6 md:px-12 mb-10">
        <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--c-text-muted)]">
          <li><Link to="/" className="hover:text-[var(--c-gold)] transition-colors">Home</Link></li>
          <li aria-hidden>›</li>
          <li><Link to="/destinations" className="hover:text-[var(--c-gold)] transition-colors">Destinations</Link></li>
          <li aria-hidden>›</li>
          <li className="text-[var(--c-text)]">Los Cabos</li>
        </ol>
      </nav>

      {/* ── 2. Header ── */}
      <header data-testid="loscabos-header" className="max-w-[1100px] mx-auto px-6 md:px-12 pb-16 md:pb-20 border-b border-[var(--c-border)]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-normal text-[var(--c-text)] leading-[1.05] tracking-tight text-4xl md:text-6xl lg:text-[4.5rem] max-w-[20ch]"
        >
          Golf in Cabo San Lucas: <em className="italic text-[var(--c-gold)]">The Complete Course Guide.</em>
        </motion.h1>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--c-text-muted)]">
          By Golf in México Editorial · Last updated May 2026
        </p>
        <blockquote className="mt-10 border-l-2 border-[var(--c-gold)] pl-6 md:pl-8 max-w-[680px]">
          <p className="font-display italic font-normal text-[var(--c-text)] text-lg md:text-2xl leading-[1.55]">
            Cabo golf spans 23 championship courses along a 20-mile Pacific corridor between Cabo San Lucas and San José del Cabo. Green fees range from $200 to $500 USD per round, with October through May delivering peak conditions. Golf in Cabo San Lucas — and across the full Los Cabos corridor — is the most concentrated collection of signature-architect designs in Mexico. This guide covers every course, what each costs all-in, and how to get on.
          </p>
        </blockquote>
      </header>

      {/* ── 3. Quick Facts ── */}
      <section data-testid="loscabos-quickfacts" className="py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <SectionLabel>At a glance</SectionLabel>
          <SectionTitle className="mb-10 md:mb-12">The essentials.</SectionTitle>
          <div className="overflow-x-auto border border-[var(--c-border)] rounded-sm max-w-[820px]">
            <table className="w-full text-sm md:text-[15px]">
              <tbody>
                {QUICK_FACTS.map(([k, v], i) => (
                  <tr key={k} className={i % 2 === 0 ? "bg-white" : "bg-[var(--c-surface)]"}>
                    <th scope="row" className="text-left align-top font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--c-text-muted)] py-4 px-5 md:px-6 md:w-[260px] font-normal">
                      {k}
                    </th>
                    <td className="py-4 px-5 md:px-6 text-[var(--c-text-mid)] leading-[1.55]">
                      {v}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 4. Playbook CTA — first ── */}
      <PlaybookCTA variant="full" testid="loscabos-playbook-1" />

      {/* ── 5. Destination Overview ── */}
      <section data-testid="loscabos-overview" className="py-20 md:py-24 border-t border-[var(--c-border)]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <SectionLabel>The destination</SectionLabel>
          <SectionTitle className="mb-10 md:mb-12">
            Three zones, <em className="italic text-[var(--c-gold)]">twenty-three courses.</em>
          </SectionTitle>
          <div className="max-w-[680px] space-y-6 md:space-y-7 font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.8]">
            <p>
              Los Cabos is a high-demand, ultra-premium golf ecosystem at the southern tip of the Baja California Peninsula. Where the mountains clash directly with the shoreline, signature architects have carved out a corridor that moved over 329,500 air passengers in January 2025 alone — and posts a 38% repeat-visitor rate among luxury travelers.
            </p>
            <p>
              The region splits into three zones. San José del Cabo (63% hotel occupancy) offers a cultural, walkable backdrop. Cabo San Lucas (79% occupancy) centers around the marina. The Tourist Corridor between them — where the luxury-segment ADR sits at $795 USD — is where championship golf lives.
            </p>
            <h3 className="font-display text-[var(--c-text)] text-xl md:text-2xl pt-2">The golf.</h3>
            <p>
              Twenty-three active championship courses. Five more under construction. Eight of them were shaped by Nicklaus, Woods, Norman, and Love III.
            </p>
            <p>
              The terrain is the differentiator. Pacific cliffside holes at Quivira. Links-style dunes at Diamante. Desert arroyos at Club Campestre. Coastal finishes at Puerto Los Cabos. No other destination in Mexico puts this variety inside a 20-mile stretch.
            </p>
            <h3 className="font-display text-[var(--c-text)] text-xl md:text-2xl pt-2">The access reality.</h3>
            <p>
              Most first-time visitors underestimate the access structure. Quivira requires a confirmed room at a Pueblo Bonito property. Twin Dolphin requires a Montage key. The top six courses on the corridor run some version of this gating.
            </p>
            <p>
              The public-access exceptions — Cabo del Sol Ocean, Puerto Los Cabos, Club Campestre — are excellent and book 60 to 90 days out in high season. The insider move: secure your target course first, then book your room around it.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. Course Roster ── */}
      <section data-testid="loscabos-roster" className="py-20 md:py-28 border-t border-[var(--c-border)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <SectionLabel>The courses</SectionLabel>
          <SectionTitle className="mb-12 md:mb-14">
            Every course <em className="italic text-[var(--c-gold)]">worth your round.</em>
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {COURSES.map((c) => (
              <motion.article
                key={c.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                data-testid={`course-card-${c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="bg-white border border-[var(--c-border)] rounded-sm p-6 md:p-7 flex flex-col gap-3 transition-all duration-300 hover:border-[var(--c-green-mid)] hover:shadow-[0_8px_28px_-6px_rgba(15,36,25,0.12)] hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display font-normal text-[var(--c-green-deep)] text-xl md:text-2xl leading-tight">
                    {c.name}
                  </h3>
                  <AccessBadge tier={c.accessTier} />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--c-text-muted)]">
                  {c.designer} · Par {c.par} · {c.type}
                </div>
                <div className="font-mono text-[13px] font-bold text-[var(--c-text)] tracking-tight">
                  {c.fee}
                </div>
                <div className="text-sm text-[var(--c-text-muted)] leading-[1.55]">
                  {c.access}
                </div>
                <div className="border-l-2 border-[var(--c-gold)] pl-3 text-[13px] italic text-[var(--c-text-mid)] leading-[1.55]">
                  {c.standout}
                </div>
                <p className="pt-3 mt-auto border-t border-[var(--c-border)] text-[14px] text-[var(--c-text-mid)] leading-[1.65]">
                  {c.note}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Comparison Table ── */}
      <section data-testid="loscabos-compare" className="py-20 md:py-24 border-t border-[var(--c-border)]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <SectionLabel>Side by side</SectionLabel>
          <SectionTitle className="mb-10 md:mb-12">Compare before you book.</SectionTitle>
          <div className="overflow-x-auto border border-[var(--c-border)] rounded-sm">
            <table className="w-full text-[13px] md:text-sm min-w-[760px]">
              <thead>
                <tr className="bg-[var(--c-green-deep)] text-white">
                  {["Course", "Designer", "Par", "Fee Range", "Access", "Best For"].map((h, i) => (
                    <th key={h} className={`text-left font-mono text-[10px] uppercase tracking-[0.14em] font-normal py-3.5 px-4 ${i === 0 ? "text-[var(--c-gold)]" : "text-white/70"}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row[0]} className={i % 2 === 0 ? "bg-white" : "bg-[var(--c-surface)]"}>
                    {row.map((cell, j) => (
                      <td key={j} className={`py-3.5 px-4 align-top leading-[1.55] ${j === 0 ? "text-[var(--c-text)] font-display text-base" : "text-[var(--c-text-mid)]"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--c-text-muted)]">
            Public = bookable directly · Resort = room key required · Private = invitation or membership required
          </p>
        </div>
      </section>

      {/* ── 8. Pull Quote ── */}
      <section data-testid="loscabos-pullquote" className="py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
          <blockquote className="border-l-2 border-[var(--c-gold)] pl-6 md:pl-10 text-left max-w-[700px] mx-auto">
            <p className="font-display italic font-normal text-[var(--c-text)] text-2xl md:text-4xl leading-[1.4]">
              &ldquo;Cabo is a true golf paradise. Whether you&apos;re a member of an exclusive club, a local with 30 years here, or visiting from the US — the feeling is the same.&rdquo;
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--c-text-muted)]">
              — Golf in México Field Notes
            </p>
          </blockquote>
        </div>
      </section>

      {/* ── 9. True-Cost ── */}
      <section data-testid="loscabos-costs" className="py-20 md:py-24 border-t border-[var(--c-border)]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <SectionLabel>The math</SectionLabel>
          <SectionTitle className="mb-8 md:mb-10">
            Here is exactly <em className="italic text-[var(--c-gold)]">what you will spend.</em>
          </SectionTitle>
          <p className="max-w-[680px] font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.75] mb-10 md:mb-12">
            Standard Cabo golf packages often cloud the true cost by hiding mandatory fees and customary incidentals. Here is what a realistic 4-night, 3-round golf trip looks like mid-season — no surprises.
          </p>

          <div className="overflow-x-auto border border-[var(--c-border)] rounded-sm">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="bg-[var(--c-green-deep)] text-white">
                  {["Cost Element", "Low", "High", "Notes"].map((h, i) => (
                    <th key={h} className={`text-left font-mono text-[10px] uppercase tracking-[0.14em] font-normal py-3.5 px-4 ${i === 0 ? "text-[var(--c-gold)]" : "text-white/70"}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COSTS.map((row, i) => (
                  <tr key={row[0]} className={i % 2 === 0 ? "bg-white" : "bg-[var(--c-surface)]"}>
                    <td className="py-3.5 px-4 align-top text-[var(--c-text)] font-display">{row[0]}</td>
                    <td className="py-3.5 px-4 align-top font-mono text-[var(--c-text-mid)]">{row[1]}</td>
                    <td className="py-3.5 px-4 align-top font-mono text-[var(--c-text-mid)]">{row[2]}</td>
                    <td className="py-3.5 px-4 align-top text-[var(--c-text-mid)] leading-[1.55]">{row[3]}</td>
                  </tr>
                ))}
                <tr className="bg-[var(--c-surface)] border-t-2 border-[var(--c-green-mid)]">
                  <td className="py-4 px-4 font-display font-normal text-[var(--c-text)] text-base">Total all-in (per person)</td>
                  <td className="py-4 px-4 font-mono font-bold text-[var(--c-text)]">$2,230</td>
                  <td className="py-4 px-4 font-mono font-bold text-[var(--c-text)]">$5,580</td>
                  <td className="py-4 px-4 text-[var(--c-text-mid)] italic">Mid-season estimate</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-[1000px]">
            <div className="border-l-2 border-[var(--c-gold)] pl-5 md:pl-6">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-text)] mb-3">The luxury variable</h3>
              <p className="font-body font-light text-[var(--c-text-mid)] text-sm md:text-base leading-[1.7]">
                Your hotel choice is the biggest lever. Cabo San Lucas averages $319/night. San José averages $303/night. The Tourist Corridor moves your baseline to $795/night — but Quivira and Twin Dolphin offset this by bundling gourmet food and top-shelf liquor stations into the green fee.
              </p>
            </div>
            <div className="border-l-2 border-[var(--c-gold)] pl-5 md:pl-6">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-text)] mb-3">The twilight advantage</h3>
              <p className="font-body font-light text-[var(--c-text-mid)] text-sm md:text-base leading-[1.7]">
                Booking after 1:00 or 2:00 PM unlocks 30–50% price reductions. In the spring shoulder months, an early afternoon tee time finishes 18 holes before sunset.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Access Rules ── */}
      <section data-testid="loscabos-access" className="py-20 md:py-24 border-t border-[var(--c-border)]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <SectionLabel>The gates</SectionLabel>
          <SectionTitle className="mb-12">
            Who can play where — <em className="italic text-[var(--c-gold)]">and how.</em>
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 max-w-[1000px]">
            {[
              {
                title: "Open to All (Public Access)",
                items: [
                  "Cabo del Sol Ocean Course — advance reservation, direct booking",
                  "Puerto Los Cabos — open to the public",
                  "Club Campestre San José — best value on the corridor (public slots open 60–90 days out in high season; 2-week window off-season)",
                ],
              },
              {
                title: "Resort Guest Access",
                items: [
                  "Quivira → confirmed room at any Pueblo Bonito Property",
                  "Twin Dolphin → Montage Los Cabos room key required",
                  "Palmilla → priority for One&Only Palmilla guests; open to all when availability allows",
                ],
              },
              {
                title: "Private / Restricted",
                items: [
                  "Diamante Dunes → member-guest or resort access",
                  "El Cardonal at Diamante → private, restricted access",
                ],
              },
              {
                title: "The Caddie Culture",
                items: [
                  "Caddies are mandatory at elite tier layouts and highly recommended elsewhere. They read the tricky ocean breaks and protect your pace of play. Budget $40–$60 USD per bag as the standard tip. These veterans are part of the experience — tip accordingly.",
                ],
              },
            ].map((block) => (
              <div key={block.title}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-text)] mb-4 md:mb-5">
                  {block.title}
                </h3>
                <ul className="space-y-2.5">
                  {block.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm md:text-[15px] text-[var(--c-text-mid)] leading-[1.65]">
                      <span className="text-[var(--c-gold)] mt-1.5 text-[10px]">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-14 max-w-[820px]">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-text)] mb-3">Dress Code</h3>
            <p className="font-body font-light text-[var(--c-text-mid)] text-sm md:text-base leading-[1.7]">
              Collared shirts, tailored golf shorts or trousers, soft-spike shoes. No denim. GIM standard rules apply corridor-wide.
            </p>
          </div>

          <div className="mt-12 md:mt-14 bg-[var(--c-surface)] border-l-2 border-[var(--c-gold)] p-6 md:p-8 rounded-sm max-w-[820px]">
            <p className="font-display italic font-normal text-[var(--c-text)] text-lg md:text-xl leading-[1.55] mb-5">
              &ldquo;Many top courses are strictly private — but with the right relationships, you can play several of them. We are those relationships.&rdquo;
            </p>
            <Link
              to="/trip-builder"
              data-testid="loscabos-access-cta"
              className="group inline-flex items-center gap-3 bg-[var(--c-green-deep)] hover:bg-[var(--c-green-mid)] text-white px-6 py-3.5 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] transition-colors"
            >
              Get Course Access
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 11. Playbook CTA — mid-page ── */}
      <PlaybookCTA variant="short" testid="loscabos-playbook-2" />

      {/* ── 12. Travel Logistics ── */}
      <section data-testid="loscabos-logistics" className="py-20 md:py-24 border-t border-[var(--c-border)]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <SectionLabel>On the ground</SectionLabel>
          <SectionTitle className="mb-12">Getting there and between courses.</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 max-w-[1000px]">
            {[
              {
                title: "Airport + Arrivals",
                body: [
                  "Los Cabos International (SJD) handles 82.9% of international traffic from the US — anchored by Los Angeles (12.5%), Dallas (10.7%), and Phoenix (10.5%). For West Coast and Texas golfers, SJD operates as a short commute.",
                  "Private aviation: SJD handled 2,000+ private operations in January 2025 alone, with a dedicated FBO terminal. Several corridor resorts offer direct tarmac-to-villa transfers.",
                ],
              },
              {
                title: "Getting to the Courses",
                body: [
                  "Most courses sit 15–30 minutes from the airport. The corridor stretches 20 miles along Highway 1.",
                  "Pre-arranged private SUV transfers are the standard for traveling golfers. Uber is legal but frequently restricted from entering the deep security gates of elite private clubs.",
                ],
              },
              {
                title: "Between Courses",
                body: [
                  "San José del Cabo ↔ Cabo San Lucas: 25–35 minutes on Highway 1. Build 45 minutes into your schedule for mid-day traffic.",
                  "Courses toward San José (Puerto Los Cabos, Club Campestre) and courses toward Cabo San Lucas (Quivira, Diamante) require separate transfer planning for multi-course days.",
                ],
              },
              {
                title: "Currency + Tipping",
                body: [
                  "USD accepted everywhere on the golf corridor. Caddie tips in USD are standard ($40–$60 per round). Restaurants: 15–20% expected. ATMs available for pesos if preferred.",
                ],
              },
            ].map((b) => (
              <div key={b.title}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-text)] mb-4">
                  {b.title}
                </h3>
                <div className="space-y-3 font-body font-light text-[var(--c-text-mid)] text-sm md:text-[15px] leading-[1.7]">
                  {b.body.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13. Season Guide ── */}
      <section data-testid="loscabos-season" className="py-20 md:py-24 bg-[var(--c-green-deep)] text-white">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--c-gold)] mb-4">
            The calendar
          </span>
          <h2 className="font-display font-normal text-white leading-[1.12] tracking-tight text-3xl md:text-5xl mb-14">
            When to go.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-px md:bg-white/8">
            {[
              { label: "Peak Season", months: "November – April", spec: "72–82°F · High crowds · $$$ prices", body: "Clear skies, low humidity, manageable winds. Every course delivers its best conditions. Book flights first, tee times second. Advance booking: 60–90 days for public slots." },
              { label: "Shoulder Season", months: "May – June", spec: "82–90°F · Moderate crowds · $$ prices", body: "Warmer but playable with early morning tee times. Courses are quieter; many resorts fold golf into the room rate. If you can take the heat, the math is hard to beat." },
              { label: "Off-Season", months: "July – October", spec: "85–95°F · Low crowds · $ prices", body: "Dramatic discounts — 30–50% below peak. Humidity, afternoon storms, and occasional hurricane risk (August–September is the peak window). Morning rounds can still be excellent. Flexibility required." },
            ].map((s) => (
              <div key={s.label} className="bg-[var(--c-green-deep)] p-2 md:p-8">
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--c-gold)] mb-3">
                  {s.label}
                </span>
                <h3 className="font-display font-normal text-white text-2xl md:text-3xl mb-3">
                  {s.months}
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/55 mb-5">
                  {s.spec}
                </p>
                <p className="font-body font-light text-white/70 text-sm md:text-[15px] leading-[1.7]">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 14. Field Notes ── */}
      <section data-testid="loscabos-field-notes" className="py-20 md:py-28 border-t border-[var(--c-border)]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <SectionLabel>From the founders</SectionLabel>
          <SectionTitle className="mb-12">
            The things <em className="italic text-[var(--c-gold)]">we tell our friends.</em>
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 max-w-[1000px]">
            {[
              { label: "The course we'd play with one round left", body: "Diamante Dunes. It holds many great memories. José won the qualifying for the WWT Championship here twice; Pablo has organized flawless 12-man rounds with world-class prizes on this exact layout." },
              { label: "The underrated gem", body: "Solmar. A true links golf course with several holes right on the Pacific Ocean — parts of the movie Troy were filmed nearby. The amenities are top-notch and the crowds are smaller than they should be." },
              { label: "The access trick most people miss", body: "Many courses are strictly private. But with the right relationships, you can play several of them. We are those relationships." },
              { label: "Is Cabo worth it?", body: "Absolutely. It offers the best versatility in pricing and some of the most unique, world-class experiences in the game. From the seafood scene to high-end restaurants and local gems — your time and money are well spent on and off the course." },
            ].map((n, i) => (
              <div key={i}>
                <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-3">
                  {n.label}
                </span>
                <p className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.7]">
                  {n.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 15. FAQ ── */}
      <FAQ />

      {/* ── 16. Keep Exploring ── */}
      <section data-testid="loscabos-keep-exploring" className="py-20 md:py-24 border-t border-[var(--c-border)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <SectionLabel>Keep exploring</SectionLabel>
          <SectionTitle className="mb-4">More golf in México.</SectionTitle>
          <p className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg max-w-xl mb-12 leading-[1.7]">
            Cabo, Cancún, Vallarta, Punta Mita, CDMX — the rest of the country in one editorial directory.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {KEEP_EXPLORING.map((d) => (
              <Link
                key={d.slug}
                to={`/destinations/${d.slug}`}
                data-testid={`keep-exploring-${d.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--c-green-deep)] rounded-sm">
                  <img src={d.image} alt={d.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-1">
                      {d.region}
                    </span>
                    <h3 className="font-display text-white text-lg md:text-xl leading-tight">
                      {d.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 17. Newsletter ── */}
      <section data-testid="loscabos-newsletter" className="bg-[var(--c-green-deep)] text-white py-24 md:py-32">
        <div className="max-w-[820px] mx-auto px-6 md:px-12 text-center">
          <h2 className="font-display font-normal text-white text-4xl md:text-6xl leading-[1.1] tracking-tight mb-6">
            Stay <em className="italic text-[var(--c-gold)]">inside</em> the ropes.
          </h2>
          <p className="font-body font-light text-white/65 text-base md:text-lg leading-[1.7] max-w-xl mx-auto mb-10">
            Tour-level insights, hidden gems, and the culture of Mexican golf delivered straight to your inbox. No generic spam. Just pure signal.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
};

/* Small newsletter form (mocked, tag newsletter:cabos) */
const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (email.trim().length > 3) setSent(true);
  };

  if (sent) {
    return (
      <p data-testid="loscabos-newsletter-success" className="font-display italic text-[var(--c-gold)] text-xl md:text-2xl">
        On its way. Welcome to the room.
      </p>
    );
  }
  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" data-testid="loscabos-newsletter-form">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        data-testid="loscabos-newsletter-email"
        className="flex-1 bg-white/[0.05] border border-white/20 focus:border-[var(--c-gold)] text-white placeholder:text-white/35 font-body text-sm px-4 py-3.5 rounded-sm focus:outline-none transition-colors"
      />
      <button
        type="submit"
        data-testid="loscabos-newsletter-submit"
        className="group inline-flex items-center justify-center gap-2 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-6 py-3.5 rounded-sm font-mono text-[11px] uppercase tracking-[0.16em] font-bold transition-colors"
      >
        Subscribe
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
};

export default LosCabos;
