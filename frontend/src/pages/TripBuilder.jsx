import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════
   GIM Trip Builder · /trip-builder
   4 steps · no global nav · captures qualified leads (mocked)
   ═══════════════════════════════════════════════════════════════════ */

const DESTINATIONS = [
  { slug: "los-cabos",      name: "Los Cabos",           region: "Baja California Sur", desc: "13 courses · Pacific" },
  { slug: "punta-mita",     name: "Punta Mita",          region: "Riviera Nayarit",     desc: "Private peninsula · Nicklaus" },
  { slug: "mexico-city",    name: "Mexico City",         region: "Valle de México",     desc: "Historic clubs · altitude" },
  { slug: "cancun",         name: "Cancún · Riviera Maya", region: "Quintana Roo",     desc: "El Camaleón · Caribbean" },
];

const TRIP_TYPES = [
  { id: "family",    label: "Family Trip",     desc: "Multi-gen or kids included." },
  { id: "couples",   label: "Couples Trip",    desc: "Two travelers, full experience." },
  { id: "bachelor",  label: "Bachelor Trip",   desc: "Group, competition-ready itinerary." },
  { id: "corporate", label: "Corporate Retreat", desc: "12+ players, prizes, logistics." },
];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const LENGTHS = ["3–4 nights", "5–7 nights", "7–10 nights", "10+ nights"];

const PACKAGES = [
  {
    id: "curated",
    title: "Curated Escape",
    sub: "The essentials, handled.",
    desc: "We secure the courses, tee times, and access. You handle your own hotel and flights. Perfect for experienced travelers who know what they want — and want the insider access.",
    items: [
      "Course selection and tee times",
      "Access coordination",
      "Itinerary and day-by-day schedule",
      "Pablo available by message",
    ],
  },
  {
    id: "bespoke",
    title: "Bespoke Travel",
    sub: "Everything, taken care of.",
    badge: "Most requested",
    desc: "Full end-to-end management. We handle courses, lodging, transport, restaurants, and every detail in between. Your only job is to show up.",
    items: [
      "Everything in Curated Escape",
      "Hotel selection and booking",
      "Airport transfers and ground transport",
      "Restaurant reservations",
      "Pablo's personal cell for the entire trip",
    ],
  },
];

const Label = ({ children, onDark = false }) => (
  <span className={`block font-mono text-[11px] uppercase tracking-[0.18em] ${onDark ? "text-[var(--c-gold)]" : "text-[var(--c-gold)]"} mb-5`}>
    {children}
  </span>
);

const StepPill = ({ n, total = 4 }) => (
  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--c-text-muted)] mb-6">
    Step {String(n).padStart(2, "0")} / {String(total).padStart(2, "0")}
  </div>
);

const ProgressBar = ({ step }) => (
  <div className="grid grid-cols-4 gap-2 mb-12 max-w-3xl mx-auto">
    {[1,2,3,4].map((n) => (
      <div key={n} className={`h-[3px] rounded-full transition-colors duration-500 ${n < step ? "bg-[var(--c-green-mid)]" : n === step ? "bg-[var(--c-gold)]" : "bg-[var(--c-border)]"}`} />
    ))}
  </div>
);

const SelectCard = ({ selected, onClick, children, testid, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    data-testid={testid}
    aria-pressed={selected}
    className={`text-left rounded-sm transition-all duration-300 ${selected ? "border-2 border-[var(--c-gold)] bg-white shadow-[0_10px_28px_-12px_rgba(200,169,110,0.5)]" : "border border-[var(--c-border)] bg-white hover:border-[var(--c-text-muted)]"} ${className}`}
  >
    {children}
  </button>
);

const Checkmark = () => (
  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--c-gold)] text-[var(--c-green-deep)] font-mono text-[10px]">✓</span>
);

const TripBuilder = () => {
  const [step, setStep] = useState(1);
  const [destinations, setDestinations] = useState([]);
  const [tripType, setTripType] = useState(null);
  const [isDM, setIsDM] = useState(true);
  const [otherDM, setOtherDM] = useState("");
  const [year, setYear] = useState("2026");
  const [months, setMonths] = useState([]);
  const [length, setLength] = useState(null);
  const [pkg, setPkg] = useState(null);
  const [budget, setBudget] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const toggleDestination = (slug) => {
    setDestinations((prev) => prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]);
    setErrors((e) => ({ ...e, destinations: null }));
  };
  const toggleMonth = (m) => {
    const tag = `${m} ${year}`;
    setMonths((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
    setErrors((e) => ({ ...e, months: null }));
  };

  const next = () => {
    const e = {};
    if (step === 1) {
      if (destinations.length === 0) e.destinations = "Pick at least one destination to continue.";
      if (!tripType) e.tripType = "Choose a trip type.";
    }
    if (step === 2) {
      if (months.length === 0) e.months = "Select at least one month — even a rough window works.";
      if (!length) e.length = "Pick a trip length.";
    }
    if (step === 3) {
      if (!pkg) e.pkg = "Choose a package to continue.";
    }
    setErrors(e);
    if (Object.keys(e).length === 0) setStep((s) => Math.min(4, s + 1));
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = {};
    if (!contact.name.trim())  e.name = "Tell us your name.";
    if (!contact.email.trim()) e.email = "We need your email to send the proposal.";
    setErrors(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  };

  const scrollToForm = () => {
    const el = document.getElementById("get-proposal");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (submitted) {
    return (
      <main data-testid="trip-builder-success" className="min-h-screen bg-[var(--c-off-white)] flex items-center justify-center px-6 py-20">
        <div className="max-w-[640px] mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--c-gold)] text-[var(--c-green-deep)] font-mono text-2xl mb-8">✓</div>
          <h1 className="font-display font-light text-[var(--c-text)] text-4xl md:text-6xl leading-[1.05] tracking-tight mb-8">You&apos;re in.</h1>
          <p className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.75] mb-5">
            Pablo or José will review your request personally. Your custom proposal arrives within 48 hours.
          </p>
          <p className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.75] mb-12">
            Check your inbox — including spam, just in case. If your dates are urgent, reply to the confirmation email and we&apos;ll prioritize your slot.
          </p>
          <Link to="/journal" className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-gold)] hover:gap-4 transition-all">
            While you wait → Read the Vault
            <span>→</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main data-testid="page-trip-builder" className="min-h-screen bg-[var(--c-off-white)]">
      {/* Minimal top bar */}
      <header className="border-b border-[var(--c-border)] bg-[var(--c-off-white)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link to="/" className="font-display text-[var(--c-text)] text-lg tracking-tight" data-testid="tb-logo">
            Golf<span className="italic text-[var(--c-gold)]">°</span> in México<span className="italic text-[var(--c-gold)]">°</span>
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--c-text-muted)] hidden sm:inline">Custom Trip Proposals</span>
        </div>
      </header>

      {/* HERO */}
      <section className="relative bg-[var(--c-off-white)] py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 text-center">
          <Label>Custom Trip Proposals</Label>
          <h1 className="font-display font-light text-[var(--c-text)] text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-[900px] mx-auto mb-8">
            A custom México golf itinerary in <em className="italic text-[var(--c-gold)]">48 hours. On us.</em>
          </h1>
          <p className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.75] max-w-[680px] mx-auto mb-10">
            Built by real insiders — not AI. Tell us where you want to play and what matters most. We will hand-craft a named itinerary with confirmed course access, itemized down to the peso. No call required to get your proposal.
          </p>
          <button
            type="button"
            onClick={scrollToForm}
            data-testid="tb-hero-cta"
            className="group inline-flex items-center gap-3 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-9 py-4 rounded-sm font-mono text-[11px] uppercase tracking-[0.2em] font-bold transition-colors"
          >
            Get My 48-Hour Proposal
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
          <div className="mt-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--c-text-muted)]">
            <span className="w-2 h-2 rounded-full bg-[var(--c-gold)] animate-pulse" />
            Q2 2026 Availability — One trip per week. Weeks fill as proposals are accepted.
          </div>
        </div>
      </section>

      {/* PROMISES */}
      <section className="bg-[var(--c-green-deep)] text-white py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <Label>The GIM Promise</Label>
          <h2 className="font-display font-light text-white text-3xl md:text-5xl leading-[1.1] tracking-tight max-w-3xl mb-14">
            If we can&apos;t deliver on these three, <em className="italic text-[var(--c-gold)]">we don&apos;t deserve your money.</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-14">
            {[
              { n: "01", title: "The Tee-Time Guarantee",   body: "If a tee time falls through, we replace it with an equal-or-better option at no cost." },
              { n: "02", title: "The Expectation Refund",   body: "If after your first 36 hours on the ground you decide the trip isn't exactly what we promised, we refund the GIM fee." },
              { n: "03", title: "Named Contact. Always.",   body: "From booking to dinner reservation #12, you have Pablo's personal cell. Not a help desk. Not an assistant." },
            ].map((p) => (
              <div key={p.n} className="border-t border-[var(--c-gold)]/40 pt-6">
                <div className="font-display font-light text-[var(--c-gold)] text-3xl md:text-4xl mb-3">{p.n}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--c-gold)] mb-4">{p.title}</div>
                <p className="text-sm md:text-[15px] text-white/75 leading-[1.7]">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--c-gold)]">
            — Pablo De La Mora &amp; José Islas · Golf in México°
          </p>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="bg-[var(--c-off-white)] py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <Label>What you get in 48 hours</Label>
          <h2 className="font-display font-light text-[var(--c-text)] text-3xl md:text-5xl leading-[1.1] tracking-tight mb-5">
            Your proposal includes <em className="italic text-[var(--c-gold)]">everything.</em>
          </h2>
          <p className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.7] max-w-[640px] mb-12">
            Zero guesswork.
          </p>
          <ul className="space-y-3 max-w-[760px] mb-14">
            {[
              "Named courses and routing for every day.",
              "Itemized costs — green fees, caddies, private transport, and lodging.",
              "Lodging tiers with two curated options at each price point.",
              "Ground transport and elite restaurant reservations.",
              "Unlimited refinements until your itinerary is 100% perfect.",
              "Pablo's personal cell — yours for the duration of the trip.",
            ].map((d) => (
              <li key={d} className="flex items-start gap-4 text-[var(--c-text-mid)] text-[15px] md:text-base leading-[1.7]">
                <span className="text-[var(--c-gold)] mt-1.5">▸</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <p className="font-display italic font-light text-[var(--c-text)] text-xl md:text-2xl text-center max-w-[760px] mx-auto leading-[1.5] border-t border-[var(--c-border)] pt-10">
            &ldquo;This is the exact logistical blueprint a Tour agent and Tour Pro would build for himself. You&apos;re getting the blueprint on us.&rdquo;
          </p>
        </div>
      </section>

      {/* FORM */}
      <section id="get-proposal" data-testid="tb-form-section" className="bg-[var(--c-surface)] py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <ProgressBar step={step} />

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-[var(--c-border)] rounded-sm p-7 md:p-14 max-w-3xl mx-auto"
            >
              {/* ── STEP 1 ── */}
              {step === 1 && (
                <div data-testid="tb-step-1">
                  <StepPill n={1} />
                  <h2 className="font-display font-light text-[var(--c-text)] text-2xl md:text-4xl leading-[1.15] mb-10 tracking-tight">Where do you want to play?</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {DESTINATIONS.map((d) => {
                      const selected = destinations.includes(d.slug);
                      return (
                        <SelectCard
                          key={d.slug}
                          selected={selected}
                          onClick={() => toggleDestination(d.slug)}
                          testid={`tb-dest-${d.slug}`}
                          className="p-5 md:p-6"
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h3 className="font-display text-[var(--c-text)] text-lg md:text-xl">{d.name}</h3>
                            {selected && <Checkmark />}
                          </div>
                          <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--c-gold)] mb-2">Available</span>
                          <div className="text-[13px] text-[var(--c-text-mid)] leading-[1.5]">{d.region}</div>
                          <div className="text-[13px] text-[var(--c-text-muted)] mt-1">{d.desc}</div>
                        </SelectCard>
                      );
                    })}
                  </div>
                  {errors.destinations && <p className="text-[13px] text-[#8b2020] mb-5 font-mono">{errors.destinations}</p>}

                  {destinations.length > 0 && (
                    <div className="mb-8">
                      <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--c-text-muted)] mb-4">What kind of trip is this?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {TRIP_TYPES.map((t) => (
                          <SelectCard
                            key={t.id}
                            selected={tripType === t.id}
                            onClick={() => { setTripType(t.id); setErrors((e) => ({ ...e, tripType: null })); }}
                            testid={`tb-triptype-${t.id}`}
                            className="p-4 md:p-5"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-display text-[var(--c-text)] text-base md:text-lg">{t.label}</h4>
                              {tripType === t.id && <Checkmark />}
                            </div>
                            <p className="text-[12px] text-[var(--c-text-muted)]">{t.desc}</p>
                          </SelectCard>
                        ))}
                      </div>
                      {errors.tripType && <p className="mt-3 text-[13px] text-[#8b2020] font-mono">{errors.tripType}</p>}
                    </div>
                  )}

                  <label className="flex items-start gap-3 text-sm text-[var(--c-text-mid)] cursor-pointer mb-3" data-testid="tb-dm-checkbox">
                    <input type="checkbox" checked={isDM} onChange={(e) => setIsDM(e.target.checked)} className="mt-1 accent-[var(--c-gold)]" />
                    <span>I am the primary decision maker for this trip.</span>
                  </label>
                  {!isDM && (
                    <input
                      type="text"
                      value={otherDM}
                      onChange={(e) => setOtherDM(e.target.value)}
                      placeholder="Who else needs to be involved? e.g., my partner, the CFO, the group"
                      data-testid="tb-other-dm"
                      className="w-full bg-[var(--c-surface)] border border-[var(--c-border)] focus:border-[var(--c-gold)] text-[var(--c-text)] placeholder:text-[var(--c-text-muted)] font-body text-sm px-4 py-3 rounded-sm focus:outline-none transition-colors"
                    />
                  )}

                  <div className="mt-10 flex items-center justify-end">
                    <button type="button" onClick={next} data-testid="tb-next-1" className="group inline-flex items-center gap-3 bg-[var(--c-green-deep)] hover:bg-[var(--c-green-mid)] text-white px-7 py-3.5 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold transition-colors">
                      Next: When
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 2 ── */}
              {step === 2 && (
                <div data-testid="tb-step-2">
                  <StepPill n={2} />
                  <h2 className="font-display font-light text-[var(--c-text)] text-2xl md:text-4xl leading-[1.15] mb-10 tracking-tight">When are you thinking?</h2>

                  <div className="flex gap-2 mb-6">
                    {["2026", "2027"].map((y) => (
                      <button
                        key={y}
                        type="button"
                        onClick={() => setYear(y)}
                        data-testid={`tb-year-${y}`}
                        className={`px-5 py-2 rounded-sm font-mono text-[11px] uppercase tracking-[0.16em] font-bold transition-colors ${year === y ? "bg-[var(--c-green-deep)] text-white" : "bg-[var(--c-surface)] text-[var(--c-text-muted)] border border-[var(--c-border)]"}`}
                      >
                        {y}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-10">
                    {MONTHS.map((m) => {
                      const tag = `${m} ${year}`;
                      const selected = months.includes(tag);
                      return (
                        <button
                          key={m}
                          type="button"
                          onClick={() => toggleMonth(m)}
                          data-testid={`tb-month-${m.toLowerCase()}`}
                          className={`py-3 rounded-sm font-mono text-[11px] uppercase tracking-[0.14em] transition-all ${selected ? "bg-[var(--c-gold)] text-[var(--c-green-deep)] font-bold" : "bg-[var(--c-surface)] text-[var(--c-text-mid)] border border-[var(--c-border)] hover:border-[var(--c-gold)]"}`}
                        >
                          {m}
                        </button>
                      );
                    })}
                  </div>
                  {errors.months && <p className="text-[13px] text-[#8b2020] mb-5 font-mono">{errors.months}</p>}

                  <div className="mt-10 flex items-center justify-between">
                    <button type="button" onClick={() => setStep(1)} className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-text-muted)] hover:text-[var(--c-text)] transition-colors">← Back</button>
                    <button type="button" onClick={next} data-testid="tb-next-2" className="group inline-flex items-center gap-3 bg-[var(--c-green-deep)] hover:bg-[var(--c-green-mid)] text-white px-7 py-3.5 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold transition-colors">
                      Next: Your Trip
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </button>
                  </div>

                  {months.length > 0 && (
                    <div className="mt-12 pt-10 border-t border-[var(--c-border)]">
                      <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--c-text-muted)] mb-4">How long?</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {LENGTHS.map((l) => (
                          <button
                            key={l}
                            type="button"
                            onClick={() => { setLength(l); setErrors((e) => ({ ...e, length: null })); }}
                            data-testid={`tb-length-${l.split(" ")[0]}`}
                            className={`py-3 rounded-sm font-mono text-[11px] uppercase tracking-[0.1em] transition-all ${length === l ? "bg-[var(--c-gold)] text-[var(--c-green-deep)] font-bold" : "bg-[var(--c-surface)] text-[var(--c-text-mid)] border border-[var(--c-border)] hover:border-[var(--c-gold)]"}`}
                          >
                            {l}
                          </button>
                        ))}
                      </div>
                      {errors.length && <p className="mt-3 text-[13px] text-[#8b2020] font-mono">{errors.length}</p>}
                    </div>
                  )}
                </div>
              )}

              {/* ── STEP 3 ── */}
              {step === 3 && (
                <div data-testid="tb-step-3">
                  <StepPill n={3} />
                  <h2 className="font-display font-light text-[var(--c-text)] text-2xl md:text-4xl leading-[1.15] mb-10 tracking-tight">What level of support do you need?</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {PACKAGES.map((p) => (
                      <SelectCard
                        key={p.id}
                        selected={pkg === p.id}
                        onClick={() => { setPkg(p.id); setErrors((e) => ({ ...e, pkg: null })); }}
                        testid={`tb-pkg-${p.id}`}
                        className="p-6 md:p-7 relative"
                      >
                        {p.badge && (
                          <span className="absolute -top-3 right-4 bg-[var(--c-gold)] text-[var(--c-green-deep)] font-mono text-[9px] uppercase tracking-[0.18em] font-bold px-2.5 py-1 rounded-full">{p.badge}</span>
                        )}
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-display text-[var(--c-text)] text-lg md:text-xl">{p.title}</h3>
                          {pkg === p.id && <Checkmark />}
                        </div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--c-gold)] mb-3">{p.sub}</p>
                        <p className="text-[13px] text-[var(--c-text-mid)] leading-[1.65] mb-4">{p.desc}</p>
                        <ul className="space-y-1.5">
                          {p.items.map((it) => (
                            <li key={it} className="flex items-start gap-2 text-[12px] text-[var(--c-text-mid)]">
                              <span className="text-[var(--c-gold)] mt-0.5">✓</span>
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </SelectCard>
                    ))}
                  </div>
                  {errors.pkg && <p className="text-[13px] text-[#8b2020] mb-5 font-mono">{errors.pkg}</p>}

                  {pkg && (
                    <div className="mb-8">
                      <label className="block font-display text-[var(--c-text)] text-lg md:text-xl mb-1.5">What&apos;s your budget per player?</label>
                      <p className="text-[13px] text-[var(--c-text-muted)] mb-4">Ground + golf only. Excludes flights.</p>
                      <input
                        type="text"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="e.g., $3,000 per person"
                        data-testid="tb-budget"
                        className="w-full bg-[var(--c-surface)] border border-[var(--c-border)] focus:border-[var(--c-gold)] text-[var(--c-text)] placeholder:text-[var(--c-text-muted)] font-body text-base px-4 py-3.5 rounded-sm focus:outline-none transition-colors"
                      />
                      <p className="mt-2 text-[12px] text-[var(--c-text-muted)] italic">No wrong answer. This helps us match course access and lodging to your expectations.</p>
                    </div>
                  )}

                  <div className="mt-10 flex items-center justify-between">
                    <button type="button" onClick={() => setStep(2)} className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-text-muted)] hover:text-[var(--c-text)] transition-colors">← Back</button>
                    <button type="button" onClick={next} data-testid="tb-next-3" className="group inline-flex items-center gap-3 bg-[var(--c-green-deep)] hover:bg-[var(--c-green-mid)] text-white px-7 py-3.5 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold transition-colors">
                      Next: Contact
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 4 ── */}
              {step === 4 && (
                <form onSubmit={submit} data-testid="tb-step-4">
                  <StepPill n={4} />
                  <h2 className="font-display font-light text-[var(--c-text)] text-2xl md:text-4xl leading-[1.15] mb-3 tracking-tight">Last step. Where do we send your proposal?</h2>
                  <p className="font-body font-light text-[var(--c-text-mid)] text-base leading-[1.7] mb-10">Pablo reviews every submission personally before building the itinerary.</p>

                  <div className="space-y-5 mb-8">
                    <div>
                      <label htmlFor="tb-name" className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--c-text-muted)] mb-2">Your name *</label>
                      <input id="tb-name" type="text" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="Your name" data-testid="tb-name" className="w-full bg-[var(--c-surface)] border border-[var(--c-border)] focus:border-[var(--c-gold)] text-[var(--c-text)] placeholder:text-[var(--c-text-muted)] font-body text-base px-4 py-3.5 rounded-sm focus:outline-none transition-colors" />
                      {errors.name && <p className="mt-2 text-[13px] text-[#8b2020] font-mono">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="tb-email" className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--c-text-muted)] mb-2">Email *</label>
                      <input id="tb-email" type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="your@email.com" data-testid="tb-email" className="w-full bg-[var(--c-surface)] border border-[var(--c-border)] focus:border-[var(--c-gold)] text-[var(--c-text)] placeholder:text-[var(--c-text-muted)] font-body text-base px-4 py-3.5 rounded-sm focus:outline-none transition-colors" />
                      {errors.email && <p className="mt-2 text-[13px] text-[#8b2020] font-mono">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="tb-phone" className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--c-text-muted)] mb-2">Phone (optional)</label>
                      <input id="tb-phone" type="tel" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} placeholder="Cell phone — for priority scheduling" data-testid="tb-phone" className="w-full bg-[var(--c-surface)] border border-[var(--c-border)] focus:border-[var(--c-gold)] text-[var(--c-text)] placeholder:text-[var(--c-text-muted)] font-body text-base px-4 py-3.5 rounded-sm focus:outline-none transition-colors" />
                    </div>
                  </div>

                  <button type="submit" data-testid="tb-submit" className="group w-full inline-flex items-center justify-center gap-3 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-8 py-4 rounded-sm font-mono text-[12px] uppercase tracking-[0.18em] font-bold transition-colors">
                    Get My Proposal in 48 Hours
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                  <p className="mt-4 text-[12px] text-[var(--c-text-muted)] text-center leading-[1.6]">
                    No commitment. No call required. We build the itinerary. You decide if you want to move forward.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--c-text-muted)] w-full justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--c-gold)]" />
                    One trip per week. Currently accepting Q2 2026 proposals.
                  </div>

                  <div className="mt-10 flex items-center justify-start">
                    <button type="button" onClick={() => setStep(3)} className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-text-muted)] hover:text-[var(--c-text)] transition-colors">← Back</button>
                  </div>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* MINIMAL FOOTER */}
      <footer className="bg-[var(--c-off-white)] border-t border-[var(--c-border)] py-8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--c-text-muted)]">© 2026 Golf in México°</p>
          <a href="mailto:hello@golf-in-mexico.com" className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--c-text-muted)] hover:text-[var(--c-gold)] transition-colors">hello@golf-in-mexico.com</a>
        </div>
      </footer>
    </main>
  );
};

export default TripBuilder;
