import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInquiry } from "@/context/Inquiry";

/* ------------------------------ DATA ------------------------------ */

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "courses", label: "Courses" },
  { id: "costs", label: "Costs" },
  { id: "access", label: "Access" },
  { id: "logistics", label: "Logistics" },
  { id: "season", label: "Season" },
  { id: "cta", label: "Book" },
  { id: "faq", label: "FAQ" },
];

const STATS = [
  { label: "Championship Courses", value: "12+" },
  { label: "Airport", value: "SJD" },
  { label: "Avg. Green Fee", value: "$250–$450" },
  { label: "Best Season", value: "Oct — May" },
  { label: "Region", value: "Baja California Sur" },
  { label: "Avg. Temp (Winter)", value: "78°F / 26°C" },
];

const COURSES = [
  {
    name: "Quivira Golf Club",
    architect: "Jack Nicklaus",
    par: 72,
    fee: "$395–$450",
    access: "Resort Exclusive",
    image: "https://images.unsplash.com/photo-1605144156546-91acf5e4cffd?auto=format&fit=crop&w=1200&q=85",
    note: "Crown jewel of the corridor. Pacific cliffs above Cabo San Lucas. Consistently ranked No. 1 in Latin America.",
    standout: "#5 — Cliffside par 3, 178 yds over the Pacific",
  },
  {
    name: "Cabo del Sol — Ocean Course",
    architect: "Jack Nicklaus",
    par: 72,
    fee: "$350–$395",
    access: "Resort / Public",
    image: "https://images.unsplash.com/photo-1672825952732-ecef34882416?auto=format&fit=crop&w=1200&q=85",
    note: "The course that put Los Cabos on the map. Three holes directly on the Sea of Cortez.",
    standout: "#17 — Signature par 3 beside the sea",
  },
  {
    name: "Diamante — Dunes",
    architect: "Davis Love III",
    par: 72,
    fee: "$295–$345",
    access: "Private / By introduction",
    image: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1200&q=85",
    note: "Top-100-in-the-world links carved into the Pacific dunes. Walks and plays like Scotland in the desert.",
    standout: "Routing along the open Pacific dunes",
  },
  {
    name: "El Camaleón Mayakoba",
    architect: "Greg Norman",
    par: 71,
    fee: "$275–$325",
    access: "Resort / Public",
    image: "https://images.unsplash.com/photo-1543105177-748ceda71741?auto=format&fit=crop&w=1200&q=85",
    note: "Only PGA Tour venue in México — limestone caverns, mangroves, ocean. Plays gentler than it photographs.",
    standout: "#15 — Cenote carry through the jungle",
  },
  {
    name: "Cabo Real",
    architect: "Robert Trent Jones II",
    par: 72,
    fee: "$220–$275",
    access: "Public",
    image: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=1200&q=85",
    note: "The corridor's most underrated round. Climbs into the foothills then drops to the sea.",
    standout: "#14 — Downhill par 3 over the ocean",
  },
  {
    name: "Puerto Los Cabos",
    architect: "Jack Nicklaus / Greg Norman",
    par: 72,
    fee: "$225–$295",
    access: "Resort / Public",
    image: "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=1200&q=85",
    note: "27 holes split by two legends. The Norman nine plays inland; Nicklaus runs to the marina.",
    standout: "On-course Comida Stations between holes",
  },
];

const COSTS = [
  { item: "Flights", detail: "Round-trip to SJD from major U.S. hubs", cost: "$280–$550" },
  { item: "Hotel (4 nights)", detail: "Golf-adjacent resort, double occupancy", cost: "$800–$2,400" },
  { item: "Green Fees (3 rounds)", detail: "Premium + mid-range corridor courses", cost: "$650–$1,200" },
  { item: "Caddie Tips", detail: "$40–$60 per round, per caddie", cost: "$120–$180" },
  { item: "Club Rental", detail: "Premium set, optional", cost: "$0–$200" },
  { item: "Ground Transport", detail: "Airport transfers + daily transport", cost: "$80–$250" },
  { item: "Food & Drink", detail: "4 days, meals + on-course", cost: "$300–$800" },
];

const ACCESS_STEPS = [
  { n: "01", title: "Resort Guest Priority", body: "Several premium courses give priority — or exclusive access — to guests of their affiliated resorts. Pick the course first, the hotel second." },
  { n: "02", title: "Advance Booking", body: "For high-season (Nov–Apr), book tee times 60 to 90 days out. Public-access corridor courses fill first. Off-season, 2–3 weeks is usually enough." },
  { n: "03", title: "Caddie Policy", body: "Caddies are mandatory at the top private and resort-exclusive tier, highly recommended everywhere else. Budget $40–$60 per bag per round." },
  { n: "04", title: "Dress Code", body: "Every corridor course enforces a collared-shirt policy. No denim, no metal spikes. Pro shops can bail you out — at resort prices." },
  { n: "05", title: "Twilight & Replay", body: "Several courses offer twilight rates (after 1 or 2 p.m.) at 30–50% off. Some resorts bundle replay rounds at a discount. Ask at the pro shop." },
];

const LOGISTICS = [
  { title: "Airport (SJD)", body: "Direct flights from 30+ U.S. and Canadian cities. ~2.5h from LAX, ~3h from Dallas/Houston, ~5h from NY. One of the easiest airports on the continent for a first-class round." },
  { title: "Private Aviation", body: "SJD handles ~2,000 private-jet operations per month with a dedicated FBO. Several Corridor resorts arrange direct tarmac-to-villa transfers." },
  { title: "The Corridor", body: "20 miles between San José del Cabo and Cabo San Lucas. Most courses sit 15–30 minutes from the airport. Pre-arranged private transfers are standard." },
  { title: "Where to Stay", body: "Tourist Corridor for proximity to courses. San José del Cabo for art walks and quieter evenings. Cabo San Lucas for marina and nightlife." },
  { title: "Health & Safety", body: "Among the safest tourist destinations in México. Resort areas and the corridor have excellent security. Standard travel insurance recommended." },
  { title: "Currency & Tipping", body: "USD accepted across the corridor. Caddie tips in USD ($40–$60 / round). Restaurants 15–20%. ATMs readily available for pesos." },
];

const SEASONS = [
  { tag: "Peak", months: "Nov — Apr", temp: "72–82°F", crowds: "High", prices: "$$$", body: "The window. Clear skies, low humidity, manageable winds. Book the flight first, the tee time second." },
  { tag: "Shoulder", months: "May — Jun", temp: "82–90°F", crowds: "Moderate", prices: "$$", body: "The value play. Warmer but very playable with early tee times. Many resorts fold golf into the room rate." },
  { tag: "Summer", months: "Jul — Oct", temp: "85–95°F", crowds: "Low", prices: "$", body: "Dramatic discounts but humidity, afternoon storms, and occasional hurricane risk. Mornings can still be excellent." },
];

const FAQS = [
  { q: "When is the best time to play golf in Los Cabos?", a: "November through April delivers the best conditions — clear skies, 72–82°F, low humidity, and manageable winds. May–June is the value sweet spot. July–October is hurricane season; bring flexibility." },
  { q: "How much does a Los Cabos golf trip cost?", a: "A realistic 4-night, 3-round trip ranges from $2,230 to $5,580 per person depending on resort tier, courses, and rental needs. Premium rounds run $350–$450; mid-tier $220–$295." },
  { q: "Which courses are open to non-resort guests?", a: "Cabo Real, Puerto Los Cabos, El Camaleón Mayakoba, and Cabo del Sol take public play. Quivira is resort-exclusive (Pueblo Bonito Pacifica / Sunset). Diamante is private; access is by introduction." },
  { q: "Do I need a caddie?", a: "Mandatory at the top private and resort-exclusive tier, highly recommended elsewhere. The best caddies have read these greens for fifteen years — tip them well ($40–$60 / bag)." },
  { q: "How far in advance should I book tee times?", a: "60–90 days for high season (Nov–Apr); 2–3 weeks off-season. The most exclusive rounds require an introduction — that's where we come in." },
  { q: "What's the easiest way to get from SJD to the courses?", a: "Pre-arranged private transfer. Uber is legal but unreliable for tee-time schedules. Most corridor resorts arrange transport — or we do it for you." },
];

const fade = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
};

/* ----------------------------- COMPONENTS ----------------------------- */

const SubNav = () => {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const onScroll = () => {
      const offsets = SECTIONS.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return { id: s.id, top: Infinity };
        return { id: s.id, top: Math.abs(el.getBoundingClientRect().top - 120) };
      });
      offsets.sort((a, b) => a.top - b.top);
      setActive(offsets[0].id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <nav
      data-testid="destination-subnav"
      className="sticky top-[64px] md:top-[80px] z-[50] bg-cream/90 backdrop-blur-md border-b hairline"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-3 flex items-center gap-1 md:gap-4 overflow-x-auto scrollbar-none">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => jump(s.id)}
            data-testid={`subnav-${s.id}`}
            className={`shrink-0 px-3 py-2 font-mono text-[10px] uppercase tracking-wide-editorial transition-colors duration-300 ${
              active === s.id
                ? "text-ink border-b-2 border-gold"
                : "text-muted hover:text-ink border-b-2 border-transparent"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

const LosCabos = () => {
  const { openInquiry } = useInquiry();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main data-testid="page-los-cabos" className="bg-cream">
      {/* Hero */}
      <section className="pt-44 md:pt-52 pb-12 md:pb-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Breadcrumb */}
          <nav
            data-testid="breadcrumb"
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
          >
            <Link to="/" className="hover:text-ink transition-colors">Home</Link>
            <span>›</span>
            <Link to="/journal" className="hover:text-ink transition-colors">Destinations</Link>
            <span>›</span>
            <span className="text-ink">Los Cabos</span>
          </nav>

          <motion.span
            {...fade}
            className="mt-12 md:mt-16 block font-mono text-[10px] uppercase tracking-wide-editorial text-gold"
          >
            Destination Guide
          </motion.span>

          <motion.h1
            {...fade}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display font-light text-ink leading-[0.98] tracking-tight text-5xl md:text-7xl lg:text-[8rem]"
          >
            Golf in <span className="italic">Los Cabos.</span>
          </motion.h1>

          <motion.p
            {...fade}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 md:mt-14 font-body font-light text-ink/75 text-base md:text-lg leading-[1.75] max-w-2xl"
          >
            A field guide to México's most-played golf corridor. A 20-mile
            stretch of Baja between San José del Cabo and Cabo San Lucas,
            where the Sonoran Desert ends in the Sea of Cortez. A dozen
            championship courses — routed by a generation of signature
            architects — on cliffs, arroyos, and coastline that left no room
            for a weak hole.
          </motion.p>

          <motion.div
            {...fade}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="hero-cta-courses"
              className="inline-flex items-center gap-3 bg-ink text-cream px-6 py-4 hover:bg-forest transition-colors duration-500"
            >
              <span className="font-mono text-[11px] uppercase tracking-wide-editorial">See the Courses</span>
              <span className="font-mono text-base">↓</span>
            </button>
            <button
              type="button"
              onClick={() => document.getElementById("costs")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="hero-cta-costs"
              className="inline-flex items-center gap-3 border border-ink/30 px-6 py-4 text-ink hover:bg-ink hover:text-cream transition-colors duration-500"
            >
              <span className="font-mono text-[11px] uppercase tracking-wide-editorial">True Costs</span>
              <span className="font-mono text-base">↓</span>
            </button>
            <button
              type="button"
              onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="hero-cta-faq"
              className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-wide-editorial text-ink editorial-link"
            >
              Jump to FAQ →
            </button>
          </motion.div>
        </div>
      </section>

      <SubNav />

      {/* Stats row */}
      <section className="pt-10 md:pt-14 pb-6 md:pb-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <ul className="grid grid-cols-2 md:grid-cols-6 gap-px bg-ink/10 border-y border-ink/10">
            {STATS.map((s) => (
              <li key={s.label} className="bg-cream p-5 md:p-6 flex flex-col gap-1.5" data-testid={`stat-${s.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
                <span className="font-mono text-[9px] uppercase tracking-wide-editorial text-muted">{s.label}</span>
                <span className="font-display font-light text-ink text-xl md:text-2xl leading-tight">{s.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Overview */}
      <section id="overview" data-testid="section-overview" className="py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">— Overview</span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <motion.h2 {...fade} className="font-display font-light text-ink text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl">
              What makes golf in Los Cabos <span className="italic">different.</span>
            </motion.h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 font-body font-light text-ink/75 text-base md:text-[17px] leading-[1.75]">
              <p>Golf in Los Cabos begins where the Pacific meets the Sea of Cortez. Between granite cliffs, cardón cacti, and water that turns turquoise by 10 a.m., architects have built a run of courses that would be the headliner anywhere else on the map — and here they share a 20-mile stretch of highway.</p>
              <p>The corridor took shape in the 1990s, when the first signature course in Latin America opened on this coastline. Norman, Woods, Love III, and Couples each inherited terrain that rewarded restraint over spectacle. The land did most of the work.</p>
              <p>A Los Cabos golf trip has become a question of how many rounds, not whether. Dry heat through winter, caddies included at most clubs, flight from LAX shorter than the one to Palm Springs. The comparisons get made to Scottsdale, the Algarve, Scotland. They miss the point.</p>
              <p>The visitor numbers back this up quietly: SJD moved 329,500 passengers in January 2025 alone, 83% from the United States. Private-jet traffic rose 6.9% year-over-year. The Corridor posted ADR of $795 — second-highest on record. This is not a destination hoping to be discovered.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" data-testid="section-courses" className="py-16 md:py-24 border-t hairline">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between gap-6 mb-12 md:mb-16 border-b hairline pb-5">
            <div>
              <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">— Course Roster</span>
              <h2 className="mt-4 font-display font-light text-ink text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl">
                The courses worth your round.
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">{COURSES.length} of 12+</span>
          </div>
          <ul className="grid grid-cols-12 gap-6 md:gap-8">
            {COURSES.map((c, i) => (
              <motion.li
                key={c.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.85, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
                data-testid={`course-${c.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                className="col-span-12 sm:col-span-6 lg:col-span-4 group"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
                  <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]" />
                  <span className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-wide-editorial text-cream bg-ink/55 backdrop-blur-sm px-2 py-1">
                    {c.access}
                  </span>
                  <span className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-wide-editorial text-ink bg-gold/85 px-2 py-1">
                    {c.fee}
                  </span>
                </div>
                <div className="mt-5">
                  <h3 className="font-display font-light text-ink text-2xl md:text-3xl leading-[1.1] tracking-tight">{c.name}</h3>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
                    {c.architect} · Par {c.par}
                  </span>
                  <p className="mt-3 font-body font-light text-ink/70 text-sm md:text-[15px] leading-[1.65] max-w-md">{c.note}</p>
                  <span className="mt-3 block font-display italic font-light text-ink/65 text-sm">Standout — {c.standout}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Costs */}
      <section id="costs" data-testid="section-costs" className="py-16 md:py-24 border-t hairline">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">— True Costs</span>
          <motion.h2 {...fade} className="mt-5 font-display font-light text-ink text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl">
            What a Los Cabos golf trip <span className="italic">actually</span> costs.
          </motion.h2>
          <p className="mt-6 font-body font-light text-ink/65 text-sm md:text-base max-w-2xl">
            A realistic 4-night, 3-round trip for one golfer, mid-season (Nov–Apr).
          </p>

          <div className="mt-12 border-t border-b border-ink/15">
            <div className="hidden md:grid grid-cols-12 gap-4 py-4 border-b border-ink/15 font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
              <span className="col-span-3">Item</span>
              <span className="col-span-6">Details</span>
              <span className="col-span-3 text-right">Cost</span>
            </div>
            {COSTS.map((row) => (
              <div key={row.item} className="grid grid-cols-12 gap-4 py-5 md:py-6 border-b border-ink/10 last:border-b-0" data-testid={`cost-row-${row.item.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
                <span className="col-span-12 md:col-span-3 font-display font-light text-ink text-base md:text-lg leading-tight">{row.item}</span>
                <span className="col-span-12 md:col-span-6 font-body font-light text-ink/70 text-sm md:text-[15px]">{row.detail}</span>
                <span className="col-span-12 md:col-span-3 md:text-right font-mono text-[11px] uppercase tracking-wide-editorial text-ink">{row.cost}</span>
              </div>
            ))}
            <div className="grid grid-cols-12 gap-4 py-5 md:py-6 bg-ink text-cream">
              <span className="col-span-12 md:col-span-9 font-display font-light text-cream text-lg md:text-xl px-4 md:px-0">Total estimated · per person, 4 nights / 3 rounds</span>
              <span className="col-span-12 md:col-span-3 md:text-right font-mono text-[12px] uppercase tracking-wide-editorial text-gold px-4 md:px-0">$2,230 – $5,580</span>
            </div>
          </div>
        </div>
      </section>

      {/* Access */}
      <section id="access" data-testid="section-access" className="py-16 md:py-24 border-t hairline">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">— Access & Booking</span>
          <motion.h2 {...fade} className="mt-5 font-display font-light text-ink text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl">
            How to get on the <span className="italic">best courses.</span>
          </motion.h2>

          <ul className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/10 border border-ink/10">
            {ACCESS_STEPS.map((s) => (
              <li key={s.n} className="bg-cream p-6 md:p-8" data-testid={`access-step-${s.n}`}>
                <span className="font-mono text-[11px] uppercase tracking-wide-editorial text-gold">{s.n}</span>
                <h3 className="mt-3 font-display font-light text-ink text-xl md:text-2xl leading-tight tracking-tight">{s.title}</h3>
                <p className="mt-3 font-body font-light text-ink/70 text-sm md:text-[15px] leading-[1.7]">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Logistics */}
      <section id="logistics" data-testid="section-logistics" className="py-16 md:py-24 border-t hairline">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">— Logistics</span>
          <motion.h2 {...fade} className="mt-5 font-display font-light text-ink text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl">
            Getting there, getting around, getting on.
          </motion.h2>

          <ul className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {LOGISTICS.map((l) => (
              <li key={l.title} data-testid={`logistics-${l.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
                <h3 className="font-display font-light text-ink text-xl md:text-2xl tracking-tight leading-tight">{l.title}</h3>
                <p className="mt-3 font-body font-light text-ink/70 text-sm md:text-[15px] leading-[1.7]">{l.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Season */}
      <section id="season" data-testid="section-season" className="py-16 md:py-24 border-t hairline">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">— When to Play</span>
          <motion.h2 {...fade} className="mt-5 font-display font-light text-ink text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl">
            The three Los Cabos seasons.
          </motion.h2>

          <ul className="mt-14 grid grid-cols-12 gap-6 md:gap-8">
            {SEASONS.map((s) => (
              <li key={s.tag} className="col-span-12 md:col-span-4 border border-ink/10 p-6 md:p-8 bg-cream" data-testid={`season-${s.tag.toLowerCase()}`}>
                <span className="font-mono text-[11px] uppercase tracking-wide-editorial text-gold">{s.tag} Season</span>
                <h3 className="mt-2 font-display font-light text-ink text-2xl md:text-3xl leading-[1.05] tracking-tight">{s.months}</h3>
                <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-ink/10 pt-4">
                  <div>
                    <dt className="font-mono text-[9px] uppercase tracking-wide-editorial text-muted">Temp</dt>
                    <dd className="mt-1 font-mono text-[10px] uppercase tracking-wide-editorial text-ink">{s.temp}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9px] uppercase tracking-wide-editorial text-muted">Crowds</dt>
                    <dd className="mt-1 font-mono text-[10px] uppercase tracking-wide-editorial text-ink">{s.crowds}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9px] uppercase tracking-wide-editorial text-muted">Prices</dt>
                    <dd className="mt-1 font-mono text-[10px] uppercase tracking-wide-editorial text-ink">{s.prices}</dd>
                  </div>
                </dl>
                <p className="mt-6 font-body font-light text-ink/70 text-sm md:text-[15px] leading-[1.7]">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA — Booking */}
      <section id="cta" data-testid="section-cta" className="py-20 md:py-28 border-t hairline bg-ink text-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="col-span-12 md:col-span-8">
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-gold">— Plan Your Round</span>
            <motion.h2 {...fade} className="mt-5 font-display font-light text-cream text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-3xl">
              We are the company that calls you back.{" "}
              <span className="italic">By name.</span>
            </motion.h2>
            <motion.p {...fade} transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="mt-10 font-body font-light text-cream/70 text-base md:text-lg leading-[1.7] max-w-xl">
              Tell us where you want to play, who is coming, and what matters
              most. Pablo or José replies within 24 hours — and yes, we will
              pick up the phone. No call center. No deposit.
            </motion.p>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            <button
              type="button"
              onClick={openInquiry}
              data-testid="los-cabos-cta-book"
              className="group inline-flex items-center gap-4 bg-cream text-ink px-7 md:px-9 py-5 md:py-6 hover:bg-gold transition-colors duration-500"
            >
              <span className="font-mono text-[11px] uppercase tracking-wide-editorial">
                Request a curated trip
              </span>
              <span className="font-mono text-base transition-transform duration-500 group-hover:translate-x-1">→</span>
            </button>
            <span className="block mt-4 font-mono text-[10px] uppercase tracking-wide-editorial text-cream/55">
              24h reply · We call you · No deposit
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" data-testid="section-faq" className="py-16 md:py-24 border-t hairline">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wide-editorial text-ink">— FAQ</span>
          <motion.h2 {...fade} className="mt-5 font-display font-light text-ink text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-3xl">
            Questions, answered.
          </motion.h2>

          <ul className="mt-12 md:mt-16 divide-y divide-ink/10 border-t border-b border-ink/15">
            {FAQS.map((f, i) => (
              <Accordion key={f.q} q={f.q} a={f.a} idx={i} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

const Accordion = ({ q, a, idx }) => {
  const [open, setOpen] = useState(idx === 0);
  return (
    <li data-testid={`faq-${idx}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        data-testid={`faq-toggle-${idx}`}
        className="w-full flex items-start justify-between gap-6 py-5 md:py-6 text-left group"
      >
        <span className="font-display font-light text-ink text-lg md:text-2xl leading-tight tracking-tight max-w-3xl">
          {q}
        </span>
        <span
          className={`shrink-0 inline-flex items-center justify-center w-8 h-8 border border-ink/25 font-mono text-base transition-transform duration-500 ${
            open ? "rotate-45 bg-ink text-cream border-ink" : "text-ink"
          }`}
          aria-hidden
        >
          +
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-6 md:pb-8 font-body font-light text-ink/70 text-base md:text-[17px] leading-[1.75] max-w-3xl">
          {a}
        </p>
      </motion.div>
    </li>
  );
};

export default LosCabos;
