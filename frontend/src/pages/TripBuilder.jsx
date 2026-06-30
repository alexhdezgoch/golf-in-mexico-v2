import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { trackLead, trackEvent } from "@/lib/analytics";

/* ═══════════════════════════════════════════════════════════════════
   GIM Trip Builder · /trip-builder
   4 steps · no global nav · captures qualified leads (mocked)
   ═══════════════════════════════════════════════════════════════════ */

const DESTINATIONS = [
  { slug: "los-cabos",      name: "Los Cabos",           region: "Baja California Sur", desc: "Most golf courses" },
  { slug: "punta-mita",     name: "Punta Mita",          region: "Riviera Nayarit",     desc: "Soft luxury + relaxed vacations" },
  { slug: "mexico-city",    name: "Mexico City",         region: "Valle de Mexico",     desc: "Historic clubs + off-course experiences" },
  { slug: "cancun",         name: "Cancun · Riviera Maya", region: "Quintana Roo",     desc: "Easiest trip to book" },
];

const TRIP_TYPES = [
  { id: "family",    label: "Family Trip",     desc: "Multi-gen or kids included.",        image: "/images/39q8yutm-lhc-services-richmond-va-gr1v3si-xau-unsplash.webp" },
  { id: "couples",   label: "Couples Trip",    desc: "Two travelers, full experience.",    image: "/images/yszj15ke-willdwind-william-martret-9c-w8jfuhtw-unsplash.webp" },
  { id: "bachelor",  label: "Bachelor Trip",   desc: "Group, competition-ready itinerary.", image: "/images/fhv2viqt-d14f99ba-7f14-4273-bcd5-ef597df7f5cb-1-105-c.webp" },
  { id: "corporate", label: "Corporate Retreat", desc: "12+ players, prizes, logistics.",  image: "/images/w9mm3zx2-dean-5yxjpt-tcao-unsplash.webp" },
];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const LENGTHS = ["3–4 nights", "5–7 nights", "7–10 nights", "10+ nights"];

const PACKAGES = [
  {
    id: "bespoke",
    title: "Bespoke Travel",
    sub: "Everything, taken care of.",
    desc: "Full end-to-end management. We handle courses, lodging, transport, restaurants, and every detail in between. Your only job is to show up.",
    items: [
      "Course selection and tee times",
      "Access coordination",
      "Itinerary and day-by-day schedule",
      "Hotel selection and booking",
      "Airport transfers and ground transport",
      "Restaurant reservations",
      "Pablo's personal cell for the entire trip",
    ],
  },
];

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

const isDev = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.DEV)
  || (typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production");

const devLog = (label, payload) => {
  if (isDev) {
    console.log(label, payload);
  }
};

const safeSessionWrite = (key, value) => {
  try {
    sessionStorage.setItem(key, value);
  } catch (err) {
    if (isDev) console.warn(`[GIM TB] sessionStorage write failed for ${key}`, err);
  }
};

const safeSessionRead = (key) => {
  try {
    return sessionStorage.getItem(key);
  } catch (err) {
    if (isDev) console.warn(`[GIM TB] sessionStorage read failed for ${key}`, err);
    return null;
  }
};

const TripBuilder = () => {
  // Intent gate — splash before the wizard so people choose:
  // "Talk to Pablo first" vs "Build my proposal".
  const [intent, setIntent] = useState(null);

  const [step, setStep] = useState(1);

  // Funnel: emit a step event as the user advances (step 1 is the page view).
  useEffect(() => {
    if (step > 1) trackEvent("trip_builder_step", { step });
  }, [step]);
  const [destinations, setDestinations] = useState([]);
  const [tripType, setTripType] = useState(null);
  const [searchParams] = useSearchParams();

  // Pre-select trip type from ?type= query (from /experience cards).
  // We still show the intent splash to everyone — the type is just remembered
  // so it lands pre-selected on Step 1 once they choose "Build my proposal".
  useEffect(() => {
    const t = searchParams.get("type");
    if (t && TRIP_TYPES.some((x) => x.id === t)) {
      setTripType(t);
    }
  }, [searchParams]);
  const [isDM, setIsDM] = useState(true);
  const [otherDM, setOtherDM] = useState("");
  const [year, setYear] = useState("2026");
  const [months, setMonths] = useState([]);
  const [length, setLength] = useState(null);
  const [pkg, setPkg] = useState("bespoke");
  const [budget, setBudget] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Exit-intent soft capture state
  const [exitVisible, setExitVisible] = useState(false);
  const [exitEmail, setExitEmail] = useState("");
  const [exitSent, setExitSent] = useState(false);

  // Exit-intent trigger (only when wizard is not yet submitted and step < 4)
  useEffect(() => {
    if (submitted) return;
    if (safeSessionRead("gim-tb-exit-shown")) return;

    const trigger = () => {
      safeSessionWrite("gim-tb-exit-shown", "1");
      setExitVisible(true);
    };

    // Desktop: mouse leaves through top edge
    const onMouseLeave = (e) => {
      if (e.clientY <= 0 && step < 4) trigger();
    };
    // Mobile: tab switch / app minimize
    const onVisibility = () => {
      if (document.visibilityState === "hidden" && step < 4) trigger();
    };

    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [step, submitted]);

  const submitExitCapture = (ev) => {
    ev.preventDefault();
    if (exitEmail.trim().length > 3) {
      const exitLead = {
        email: exitEmail,
        destinations,
        tripType,
        year,
        months,
        length,
        contact,
        capturedAt: new Date().toISOString(),
        stage: "exit_intent",
      };
      // Note: stored in sessionStorage (cleared on tab close). Mocked persistence
      // until backend / MailerLite is wired up.
      safeSessionWrite("gim-exit-lead", JSON.stringify(exitLead));
      devLog("[GIM Trip Builder · exit-intent lead]", exitLead);
      setExitSent(true);
      trackLead({ form: "trip_builder_exit", trip_type: tripType });
      setTimeout(() => setExitVisible(false), 2200);
    }
  };

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
      // Contact captured BEFORE budget. Persist lead the moment user advances.
      if (!contact.name.trim())  e.name  = "Tell us your name.";
      if (!contact.email.trim()) e.email = "We need your email to send the proposal.";
    }
    setErrors(e);
    if (Object.keys(e).length !== 0) return;

    // Persist the partial lead the moment Step 3 is completed.
    // MOCKED (no MailerLite). Saves to sessionStorage (cleared on tab close —
    // sensitive data is NOT persisted across sessions) so we don't lose
    // anyone who abandons at Step 4.
    if (step === 3) {
      const partialLead = {
        destinations,
        tripType,
        isDM,
        otherDM,
        year,
        months,
        length,
        contact,
        capturedAt: new Date().toISOString(),
        stage: "contact_captured",
      };
      safeSessionWrite("gim-partial-lead", JSON.stringify(partialLead));
      devLog("[GIM Trip Builder · partial lead — Step 3]", partialLead);
    }

    setStep((s) => Math.min(4, s + 1));
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = {};
    if (!pkg) e.pkg = "Choose a package to continue.";
    setErrors(e);
    if (Object.keys(e).length === 0) {
      const finalLead = {
        destinations,
        tripType,
        isDM,
        otherDM,
        year,
        months,
        length,
        contact,
        pkg,
        budget,
        submittedAt: new Date().toISOString(),
        stage: "submitted",
      };
      safeSessionWrite("gim-final-lead", JSON.stringify(finalLead));
      devLog("[GIM Trip Builder · final lead]", finalLead);
      setSubmitted(true);
      trackLead({ form: "trip_builder", trip_type: tripType, package: pkg });
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById("get-proposal");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (submitted) {
    const destLabel = destinations.map((s) => DESTINATIONS.find((d) => d.slug === s)?.name).filter(Boolean).join(", ") || "Mexico";
    const typeLabel = TRIP_TYPES.find((t) => t.id === tripType)?.label || "golf";
    const whatsappMsg = encodeURIComponent(
      `Hi GIM — I'm planning a ${typeLabel} to ${destLabel}, just submitted my proposal request.`
    );
    const whatsappHref = `https://wa.me/?text=${whatsappMsg}`;

    return (
      <main data-testid="trip-builder-success" className="min-h-screen bg-[var(--c-off-white)]">
        <header className="border-b border-[var(--c-border)]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
            <Link to="/" className="flex items-center leading-none shrink-0">
              <img src="/logo-wordmark.png" alt="Golf in Mexico°" className="h-8 md:h-10 w-auto invert" />
            </Link>
          </div>
        </header>

        <section className="max-w-[760px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--c-gold)] text-[var(--c-green-deep)] font-mono text-2xl mb-8">✓</div>
            <h1 className="font-display font-light text-[var(--c-text)] text-4xl md:text-6xl leading-[1.05] tracking-tight mb-6">
              Your proposal is <em className="italic text-[var(--c-gold)]">in motion.</em>
            </h1>
            <p className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.75] max-w-[560px] mx-auto">
              Pablo is reviewing your trip now. Your named, itemized itinerary lands in your inbox within 48 hours.
            </p>
          </div>

          {/* WhatsApp quick line — secondary contact path only */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="tb-success-whatsapp"
            className="block bg-white border border-[var(--c-border)] hover:border-[var(--c-gold)] rounded-sm p-6 md:p-7 transition-colors mb-10"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-2">
                  Quicker question?
                </p>
                <h3 className="font-display text-[var(--c-text)] text-lg md:text-xl mb-1">
                  Message us on WhatsApp
                </h3>
                <p className="font-body font-light text-[var(--c-text-muted)] text-[13px] leading-[1.5]">
                  Pre-filled with your {typeLabel.toLowerCase()} to {destLabel}.
                </p>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-text-mid)] shrink-0">
                Open →
              </span>
            </div>
          </a>

          <p className="text-center font-body font-light text-[var(--c-text-muted)] text-sm leading-[1.7] max-w-[480px] mx-auto mb-10">
            Check your inbox — including spam, just in case.
          </p>

          <div className="text-center">
            <Link to="/journal" className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-gold)] hover:gap-4 transition-all">
              While you wait → Read the Journal
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>
    );
  }

  // Intent splash — shown before the wizard. Two paths:
  //   1. Talk to Pablo first  → Google Calendar (15 min, low friction)
  //   2. Build my proposal     → continues into Step 1 of the wizard
  if (intent === null && !submitted) {
    const calendarHref = "https://calendar.app.google/jb2v4ujwvMMovSV98";
    return (
      <main data-testid="trip-builder-intent" className="min-h-screen bg-[var(--c-off-white)]">
        <header className="border-b border-[var(--c-border)] bg-[var(--c-off-white)]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
            <Link to="/" className="flex items-center leading-none shrink-0">
              <img src="/logo-wordmark.png" alt="Golf in Mexico°" className="h-8 md:h-10 w-auto invert" />
            </Link>
          </div>
        </header>

        <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="text-center mb-14 md:mb-20">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--c-gold)]">
              How would you like to start?
            </span>
            <h1 className="mt-5 font-display font-light text-[var(--c-text)] text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-[18ch] mx-auto">
              Two ways in. <em className="italic text-[var(--c-gold)]">Both end in a real itinerary.</em>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {/* PATH 1 — Call (recommended) */}
            <a
              href={calendarHref}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="tb-intent-call"
              className="group block bg-[var(--c-green-deep)] text-white rounded-sm p-8 md:p-10 hover:bg-[var(--c-green-mid)] transition-colors relative"
            >
              <span className="absolute -top-3 left-6 md:left-8 bg-[var(--c-gold)] text-[var(--c-green-deep)] font-mono text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full">
                Our recommendation
              </span>
              <div className="flex items-center gap-5 mb-7">
                <img
                  src="/founders/pablo/01.jpg"
                  alt="Pablo De La Mora"
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-[var(--c-gold)] shrink-0"
                />
                <div className="leading-tight">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-1.5">
                    15 min with Pablo
                  </p>
                  <p className="font-display text-white text-xl md:text-2xl">Talk first</p>
                </div>
              </div>
              <p className="font-body font-light text-white/85 text-[15px] md:text-base leading-[1.7] mb-3">
                We are in the business of relationships, not forms.
              </p>
              <p className="font-body font-light text-white/65 text-[14px] leading-[1.65] italic mb-8">
                In a world running on automation, a real conversation is still the fastest way to build a trip that fits.
              </p>
              <span className="inline-flex items-center gap-3 bg-[var(--c-gold)] text-[var(--c-green-deep)] px-6 py-3 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold group-hover:bg-[var(--c-gold-light)] transition-colors">
                Book 15 min
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </a>

            {/* PATH 2 — Build the form */}
            <button
              type="button"
              onClick={() => setIntent("build")}
              data-testid="tb-intent-build"
              className="group block text-left bg-white border border-[var(--c-border)] rounded-sm p-8 md:p-10 hover:border-[var(--c-gold)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all"
            >
              <div className="mb-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-1.5">
                  By email · 48-hour proposal
                </p>
                <p className="font-display text-[var(--c-text)] text-xl md:text-2xl">Build it on your own</p>
              </div>
              <p className="font-body font-light text-[var(--c-text-mid)] text-[15px] md:text-base leading-[1.7] mb-8">
                A few questions about your group, dates, and budget. Pablo personally reviews every submission and sends the named, itemized itinerary back to your inbox within 48 hours.
              </p>
              <span className="inline-flex items-center gap-3 bg-[var(--c-green-deep)] text-white px-6 py-3 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold group-hover:bg-[var(--c-green-mid)] transition-colors">
                Start the proposal
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main data-testid="page-trip-builder" className="min-h-screen bg-[var(--c-off-white)]">
      {/* Minimal top bar */}
      <header className="border-b border-[var(--c-border)] bg-[var(--c-off-white)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center leading-none shrink-0" data-testid="tb-logo">
            <img
              src="/logo-wordmark.png"
              alt="Golf in Mexico°"
              className="h-8 md:h-10 w-auto invert"
            />
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative bg-[var(--c-off-white)] py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 text-center">
          <h1 className="font-display font-light text-[var(--c-text)] text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-[900px] mx-auto mb-8">
            A custom Mexico golf itinerary in <em className="italic text-[var(--c-gold)]">48 hours. On us.</em>
          </h1>
          <p className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.75] max-w-[680px] mx-auto mb-10">
            Built by real insiders — not AI. Tell us where you want to play and what matters most. We will hand-craft a named itinerary with confirmed course access, itemized down to the peso. No call required to get your proposal.
          </p>
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={scrollToForm}
              data-testid="tb-hero-cta"
              className="group inline-flex items-center gap-3 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-9 py-4 rounded-sm font-mono text-[11px] uppercase tracking-[0.2em] font-bold transition-colors"
            >
              Get My 48-Hour Proposal
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>

            {/* Scarcity banner — high contrast */}
            <div
              data-testid="tb-scarcity"
              className="mt-10 inline-flex items-center gap-3 bg-[var(--c-green-deep)] text-white px-6 py-3.5 rounded-sm font-mono text-[11px] md:text-[12px] uppercase tracking-[0.2em] font-bold"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--c-gold)] animate-pulse shrink-0" />
              <span>Each confirmed trip blocks a full week — we&apos;re filling 2026 now.</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROMISES */}
      <section className="bg-[var(--c-green-deep)] text-white py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <h2 className="font-display font-light text-white text-3xl md:text-5xl leading-[1.1] tracking-tight max-w-3xl mb-8">
            The GIM Promise: <em className="italic text-[var(--c-gold)]">if we can&apos;t deliver, we don&apos;t deserve your money.</em>
          </h2>
          <div className="border-t border-[var(--c-gold)]/40 pt-8 max-w-3xl mb-10">
            <h3 className="font-display font-normal text-[var(--c-gold)] text-xl md:text-2xl leading-[1.25] mb-5">
              Attention to clients &amp; the expectation refund.
            </h3>
            <p className="font-body font-light text-white/85 text-base md:text-lg leading-[1.75]">
              If after your first 36 hours on the ground you decide the trip isn&apos;t exactly what we promised, or we didn&apos;t give you the personalized attention we committed to, we refund the GIM fee.
            </p>
          </div>
          <p className="font-display italic font-normal text-[var(--c-gold)] text-base md:text-lg">
            — Pablo De La Mora · Golf in Mexico°
          </p>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="bg-[var(--c-off-white)] py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <h2 className="font-display font-light text-[var(--c-text)] text-3xl md:text-5xl leading-[1.1] tracking-tight mb-6">
            What you get in 48 hours: <em className="italic text-[var(--c-gold)]">everything.</em>
          </h2>
          <p className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.75] max-w-[640px] mb-12">
            Your proposal includes the full picture. Zero guesswork.
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
              <li key={d} className="flex items-start gap-4 text-[var(--c-text-mid)] text-base md:text-lg leading-[1.7]">
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
                            className="overflow-hidden p-0 flex flex-col"
                          >
                            <div className="relative w-full aspect-[4/3] overflow-hidden bg-[var(--c-green-deep)]">
                              <img
                                src={t.image}
                                alt={t.label}
                                loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover editorial-img transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
                              />
                              {tripType === t.id && (
                                <div className="absolute top-3 right-3 z-10">
                                  <Checkmark />
                                </div>
                              )}
                            </div>
                            <div className="p-4 md:p-5 mt-auto">
                              <h4 className="font-display text-[var(--c-text)] text-base md:text-lg mb-1">{t.label}</h4>
                              <p className="text-[12px] text-[var(--c-text-muted)]">{t.desc}</p>
                            </div>
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
                      Next: Contact
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

              {/* ── STEP 3 · CONTACT (captured BEFORE budget) ── */}
              {step === 3 && (
                <div data-testid="tb-step-3">
                  <StepPill n={3} />
                  <h2 className="font-display font-light text-[var(--c-text)] text-2xl md:text-4xl leading-[1.15] mb-3 tracking-tight">
                    Where should we send your proposal?
                  </h2>
                  <p className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.7] mb-10 max-w-2xl">
                    Pablo reviews every submission personally. Drop your details and we&apos;ll start building.
                  </p>

                  <div className="space-y-5 mb-8 max-w-xl">
                    <div>
                      <label htmlFor="tb-name" className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--c-text-muted)] mb-2">Your name *</label>
                      <input id="tb-name" type="text" value={contact.name} onChange={(e) => { setContact({ ...contact, name: e.target.value }); setErrors((er) => ({ ...er, name: null })); }} placeholder="Your name" data-testid="tb-name" className="w-full bg-[var(--c-surface)] border border-[var(--c-border)] focus:border-[var(--c-gold)] text-[var(--c-text)] placeholder:text-[var(--c-text-muted)] font-body text-base px-4 py-3.5 rounded-sm focus:outline-none transition-colors" />
                      {errors.name && <p className="mt-2 text-[13px] text-[#8b2020] font-mono">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="tb-email" className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--c-text-muted)] mb-2">Email *</label>
                      <input id="tb-email" type="email" value={contact.email} onChange={(e) => { setContact({ ...contact, email: e.target.value }); setErrors((er) => ({ ...er, email: null })); }} placeholder="your@email.com" data-testid="tb-email" className="w-full bg-[var(--c-surface)] border border-[var(--c-border)] focus:border-[var(--c-gold)] text-[var(--c-text)] placeholder:text-[var(--c-text-muted)] font-body text-base px-4 py-3.5 rounded-sm focus:outline-none transition-colors" />
                      <p className="mt-2 text-[12px] text-[var(--c-text-muted)] italic">Your named itinerary lands here within 48 hours.</p>
                      {errors.email && <p className="mt-2 text-[13px] text-[#8b2020] font-mono">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="tb-phone" className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--c-text-muted)] mb-2">WhatsApp / Phone (optional)</label>
                      <input id="tb-phone" type="tel" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} placeholder="For priority scheduling" data-testid="tb-phone" className="w-full bg-[var(--c-surface)] border border-[var(--c-border)] focus:border-[var(--c-gold)] text-[var(--c-text)] placeholder:text-[var(--c-text-muted)] font-body text-base px-4 py-3.5 rounded-sm focus:outline-none transition-colors" />
                    </div>
                  </div>

                  <div className="mt-10 flex items-center justify-between">
                    <button type="button" onClick={() => setStep(2)} className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-text-muted)] hover:text-[var(--c-text)] transition-colors">← Back</button>
                    <button type="button" onClick={next} data-testid="tb-next-3" className="group inline-flex items-center gap-3 bg-[var(--c-green-deep)] hover:bg-[var(--c-green-mid)] text-white px-7 py-3.5 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold transition-colors">
                      Next: Final detail
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 4 · PACKAGE PREVIEW + BUDGET + SUBMIT ── */}
              {step === 4 && (
                <form onSubmit={submit} data-testid="tb-step-4">
                  <StepPill n={4} />
                  <h2 className="font-display font-light text-[var(--c-text)] text-2xl md:text-4xl leading-[1.15] mb-3 tracking-tight">
                    Last step — <em className="italic text-[var(--c-gold)]">match us to your expectations.</em>
                  </h2>
                  <p className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.7] mb-10 max-w-2xl">
                    Ground + golf only. Excludes flights. No wrong answer — this helps us match course access and lodging to your expectations.
                  </p>

                  {/* Package selection (kept) */}
                  <div className="grid grid-cols-1 gap-4 mb-8 max-w-2xl">
                    {PACKAGES.map((p) => (
                      <SelectCard
                        key={p.id}
                        selected={pkg === p.id}
                        onClick={() => { setPkg(p.id); setErrors((e) => ({ ...e, pkg: null })); }}
                        testid={`tb-pkg-${p.id}`}
                        className="p-6 md:p-8 relative"
                      >
                        {p.badge && (
                          <span className="absolute -top-3 right-4 bg-[var(--c-gold)] text-[var(--c-green-deep)] font-mono text-[9px] uppercase tracking-[0.18em] font-bold px-2.5 py-1 rounded-full">{p.badge}</span>
                        )}
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-display text-[var(--c-text)] text-xl md:text-2xl">{p.title}</h3>
                          {pkg === p.id && <Checkmark />}
                        </div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--c-gold)] mb-3">{p.sub}</p>
                        <p className="text-[14px] md:text-[15px] text-[var(--c-text-mid)] leading-[1.7] mb-5">{p.desc}</p>
                        <ul className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                          {p.items.map((it) => (
                            <li key={it} className="flex items-start gap-2 text-[13px] text-[var(--c-text-mid)] leading-[1.5]">
                              <span className="text-[var(--c-gold)] mt-0.5">✓</span>
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </SelectCard>
                    ))}
                  </div>
                  {errors.pkg && <p className="text-[13px] text-[#8b2020] mb-5 font-mono">{errors.pkg}</p>}

                  {/* Open-ended budget input (USD primary) */}
                  <div className="mb-10 max-w-xl">
                    <label htmlFor="tb-budget" className="block font-display text-[var(--c-text)] text-lg md:text-xl mb-1.5">What&apos;s your budget per player?</label>
                    <p className="text-[13px] text-[var(--c-text-muted)] mb-4">Ground + golf only (USD). Excludes flights.</p>
                    <input
                      id="tb-budget"
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="e.g., $3,000 USD per person"
                      data-testid="tb-budget"
                      className="w-full bg-[var(--c-surface)] border border-[var(--c-border)] focus:border-[var(--c-gold)] text-[var(--c-text)] placeholder:text-[var(--c-text-muted)] font-body text-base px-4 py-3.5 rounded-sm focus:outline-none transition-colors"
                    />
                    <p className="mt-2 text-[12px] text-[var(--c-text-muted)] italic">No wrong answer. This helps us match course access and lodging to your expectations.</p>
                  </div>

                  {/* Recap value stack */}
                  <div className="bg-[var(--c-surface)] border border-[var(--c-border)] rounded-sm p-6 md:p-7 mb-10 max-w-2xl">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-4">What you&apos;ll get</p>
                    <ul className="space-y-2">
                      {[
                        "Named courses and routing for every day",
                        "Itemized costs in USD — green fees, caddies, transport, lodging",
                        "Two curated lodging options at each tier",
                        "Ground transport + restaurant reservations",
                        "Unlimited refinements until 100% perfect",
                        "Pablo's personal cell for the entire trip",
                      ].map((d) => (
                        <li key={d} className="flex items-start gap-2 text-[13px] md:text-[14px] text-[var(--c-text-mid)] leading-[1.6]">
                          <span className="text-[var(--c-gold)] mt-0.5">▸</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button type="submit" data-testid="tb-submit" className="group w-full inline-flex items-center justify-center gap-3 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-8 py-4 rounded-sm font-mono text-[12px] uppercase tracking-[0.18em] font-bold transition-colors">
                    Get My 48-Hour Proposal
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                  <p className="mt-4 text-[12px] text-[var(--c-text-muted)] text-center leading-[1.6]">
                    No commitment. No call required. We build the itinerary. You decide if you want to move forward.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 bg-[var(--c-green-deep)] text-white font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-bold w-full justify-center px-4 py-3 rounded-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--c-gold)]" />
                    Each confirmed trip blocks a full week — we&apos;re filling 2026 now.
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

      {/* EXIT-INTENT SOFT CAPTURE */}
      <AnimatePresence>
        {exitVisible && (
          <motion.div
            data-testid="tb-exit-intent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setExitVisible(false)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[var(--c-off-white)] rounded-sm max-w-[500px] w-full p-7 md:p-10 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setExitVisible(false)}
                data-testid="tb-exit-dismiss"
                aria-label="Dismiss"
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-[var(--c-text-muted)] hover:text-[var(--c-text)] hover:bg-[var(--c-border)]/40 transition-colors"
              >
                ×
              </button>
              {!exitSent ? (
                <>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--c-gold)]">
                    Leaving?
                  </span>
                  <h3 className="mt-3 font-display font-light text-[var(--c-text)] text-2xl md:text-3xl leading-[1.2] tracking-tight mb-3">
                    Let us send what you&apos;ve started — plus a free Mexico golf brief.
                  </h3>
                  <p className="font-body font-light text-[var(--c-text-mid)] text-sm md:text-[15px] leading-[1.6] mb-6">
                    Drop your email and we&apos;ll hold your progress so you can pick it back up when you&apos;re ready.
                  </p>
                  <form onSubmit={submitExitCapture} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      value={exitEmail}
                      onChange={(e) => setExitEmail(e.target.value)}
                      placeholder="your@email.com"
                      data-testid="tb-exit-email"
                      className="flex-1 bg-white border border-[var(--c-border)] focus:border-[var(--c-gold)] focus:outline-none font-body text-base px-4 py-3 rounded-sm text-[var(--c-text)] placeholder:text-[var(--c-text-muted)]"
                    />
                    <button
                      type="submit"
                      data-testid="tb-exit-submit"
                      className="bg-[var(--c-green-deep)] hover:bg-[var(--c-green-mid)] text-white px-6 py-3 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold transition-colors"
                    >
                      Send it to me →
                    </button>
                  </form>
                  <p className="mt-3 text-[11px] text-[var(--c-text-muted)] italic">
                    No spam. One email, then we go quiet until you reply.
                  </p>
                </>
              ) : (
                <p className="font-display italic text-[var(--c-gold)] text-xl py-6 text-center">
                  On its way. Check your inbox.
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MINIMAL FOOTER */}
      <footer className="bg-[var(--c-off-white)] border-t border-[var(--c-border)] py-8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--c-text-muted)]">© 2026 Golf in Mexico°</p>
          <a href="mailto:hello@golf-in-mexico.com" className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--c-text-muted)] hover:text-[var(--c-gold)] transition-colors">hello@golf-in-mexico.com</a>
        </div>
      </footer>
    </main>
  );
};

export default TripBuilder;
