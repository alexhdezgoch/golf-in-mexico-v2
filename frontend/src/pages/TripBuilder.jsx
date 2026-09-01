import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { trackLead, trackEvent } from "@/lib/analytics";
import { useHubspotForm } from "@/hooks/useHubspotForm";
import { useSeo, breadcrumbSchema } from "@/hooks/useSeo";
import ConsentNotice from "@/components/ConsentNotice";

/* ═══════════════════════════════════════════════════════════════════
   GIM Trip Builder · /trip-builder
   4 steps · no global nav · captures qualified leads (mocked)
   ═══════════════════════════════════════════════════════════════════ */

const DESTINATIONS = [
  { slug: "los-cabos",      name: "Los Cabos",           region: "Baja California Sur", desc: "Most golf courses" },
  { slug: "punta-mita",     name: "Punta Mita",          region: "Riviera Nayarit",     desc: "Soft luxury + relaxed vacations" },
  { slug: "mexico-city",    name: "Mexico City",         region: "Valle de Mexico",     desc: "Historic clubs + off-course experiences" },
  { slug: "cancun",         name: "Cancun · Riviera Maya", region: "Quintana Roo",     desc: "Easiest trip to book" },
  { slug: "puerto-vallarta", name: "Puerto Vallarta",     region: "Riviera Nayarit",     desc: "Colonial charm, oceanfront golf" },
  { slug: "unique-destinations", name: "Unique Destinations", region: "Nationwide",     desc: "Courses beyond the usual coasts" },
];

const TRIP_TYPES = [
  { id: "family",    label: "Family Trip",     desc: "Multi-gen or kids included.",        image: "/images/39q8yutm-lhc-services-richmond-va-gr1v3si-xau-unsplash.webp" },
  { id: "couples",   label: "Couples Trip",    desc: "Two golfers or more, one seamless trip.", image: "/images/yszj15ke-willdwind-william-martret-9c-w8jfuhtw-unsplash.webp" },
  { id: "bachelor",  label: "Bachelor / Buddies Trip", desc: "Group trip, competition-ready itinerary.", image: "/images/fhv2viqt-d14f99ba-7f14-4273-bcd5-ef597df7f5cb-1-105-c.webp" },
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

// Trip focus — single-select on Step 2 ("Select your type of trip").
const TRIP_FOCUS = [
  { id: "luxury",       label: "Luxury",       desc: "Five-star hotels, elevated everything." },
  { id: "golf-focused", label: "Golf Focused", desc: "Serious golf, top-ranked courses, nothing else on the agenda." },
  { id: "golf-beyond",  label: "Golf & Beyond", desc: "The round's only part of the trip. Good company, relaxed pace, the scorecard doesn't matter." },
];

// Budget per player — single-select chips on Step 2 (USD, ground + golf).
const BUDGET_OPTIONS = [
  { id: "under-2000", label: "Under $2,000" },
  { id: "2000-4000",  label: "$2,000–$4,000" },
  { id: "4000-7000",  label: "$4,000–$7,000" },
  { id: "7000-plus",  label: "$7,000+" },
];

const CALENDAR_HREF = "https://calendar.app.google/jb2v4ujwvMMovSV98";

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
  useSeo({
    title: "Plan Your Trip — Golf in Mexico°",
    description:
      "Build your Mexico golf trip in a few steps — destinations, dates, and budget. Pablo personally reviews every request and sends a named, itemized itinerary within 48 hours.",
    canonical: "/trip-builder",
    jsonLd: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Plan Your Trip", path: "/trip-builder" },
    ]),
  });

  const [step, setStep] = useState(1);

  // Funnel: emit a step event as the user advances (step 1 is the page view).
  useEffect(() => {
    if (step > 1) trackEvent("trip_builder_step", { step });
  }, [step]);
  const [destinations, setDestinations] = useState([]);
  const [tripType, setTripType] = useState(null);
  const [searchParams] = useSearchParams();

  // Pre-select trip type from ?type= query (from /experience cards) so it
  // lands pre-selected on the trip-kind step.
  useEffect(() => {
    const t = searchParams.get("type");
    if (t && TRIP_TYPES.some((x) => x.id === t)) {
      setTripType(t);
    }
  }, [searchParams]);
  const [uniqueCities, setUniqueCities] = useState("");
  const [tripFocus, setTripFocus] = useState(null);
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

  // Conversion event — fires once when the confirmation screen is reached.
  useEffect(() => {
    if (submitted) trackEvent("trip_builder_complete", { trip_type: tripType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  // Exit-intent soft capture state
  const [exitVisible, setExitVisible] = useState(false);
  const [exitEmail, setExitEmail] = useState("");
  const [exitSent, setExitSent] = useState(false);

  // HubSpot submission — main qualified lead + the exit-intent soft capture.
  const mainHs = useHubspotForm("trip_builder");
  const exitHs = useHubspotForm("trip_builder_exit");

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

  const submitExitCapture = async (ev) => {
    ev.preventDefault();
    if (exitEmail.trim().length <= 3) return;

    const ok = await exitHs.submit({
      email: exitEmail,
      destinations,
      trip_type: tripType,
      preferred_dates: months.join(", "),
    });
    if (!ok) return;

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
    // Local safety copy (cleared on tab close) alongside the HubSpot submission.
    safeSessionWrite("gim-exit-lead", JSON.stringify(exitLead));
    devLog("[GIM Trip Builder · exit-intent lead]", exitLead);
    setExitSent(true);
    trackLead({ form: "trip_builder_exit", trip_type: tripType });
    setTimeout(() => setExitVisible(false), 2200);
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
    }
    if (step === 2) {
      if (!tripType) e.tripType = "Choose a trip type.";
    }
    if (step === 3) {
      if (months.length === 0) e.months = "Select at least one month — even a rough window works.";
      if (!length) e.length = "Pick a trip length.";
    }
    setErrors(e);
    if (Object.keys(e).length !== 0) return;

    // Persist a partial-lead safety copy the moment Step 3 is completed
    // (trip details are known; contact comes on the final step). Saves to
    // sessionStorage (cleared on tab close — sensitive data is NOT persisted
    // across sessions) so we don't lose everything if Step 4 is abandoned.
    // The lead itself only fires on the final submit or via exit-intent.
    if (step === 3) {
      const partialLead = {
        destinations,
        uniqueCities,
        tripType,
        tripFocus,
        budget,
        isDM,
        otherDM,
        year,
        months,
        length,
        capturedAt: new Date().toISOString(),
        stage: "pre_contact",
      };
      safeSessionWrite("gim-partial-lead", JSON.stringify(partialLead));
      devLog("[GIM Trip Builder · partial lead — Step 3]", partialLead);
    }

    setStep((s) => Math.min(4, s + 1));
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = {};
    if (!contact.name.trim())  e.name  = "Tell us your name.";
    if (!contact.email.trim()) e.email = "We need your email to send the proposal.";
    if (!pkg) e.pkg = "Choose a package to continue.";
    setErrors(e);
    if (Object.keys(e).length !== 0) return;

    // Full qualified lead → HubSpot.
    const ok = await mainHs.submit({
      email: contact.email,
      firstname: contact.name,
      phone: contact.phone,
      destinations,
      unique_cities: uniqueCities,
      trip_type: tripType,
      trip_focus: tripFocus,
      preferred_dates: months.join(", "),
      trip_length: length,
      package: pkg,
      budget,
    });
    if (!ok) return; // hook surfaces the error; keep them on Step 4 to retry

    const finalLead = {
      destinations,
      uniqueCities,
      tripType,
      tripFocus,
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
          <div className="flex flex-col items-center">
            {/* Minimal scroll cue */}
            <button
              type="button"
              onClick={scrollToForm}
              aria-label="Scroll down"
              data-testid="tb-hero-arrow"
              className="font-display text-[var(--c-gold)] text-3xl md:text-4xl leading-none animate-bounce hover:text-[var(--c-gold-light)] transition-colors"
            >
              ↓
            </button>

            {/* Exclusivity banner — high contrast */}
            <div
              data-testid="tb-scarcity"
              className="mt-10 flex items-start gap-3 bg-[var(--c-green-deep)] text-white px-6 py-4 rounded-sm max-w-[620px] text-left"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--c-gold)] animate-pulse shrink-0 mt-[7px]" />
              <p className="font-body font-light text-[13px] md:text-[14px] leading-[1.7]">
                When you block your dates, they&apos;re yours alone — we don&apos;t run another trip at the same time. It&apos;s how we protect the attention to detail every trip deserves. <span className="font-bold">We&apos;re filling 2026 now.</span>
              </p>
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
            <p className="font-body font-light text-white/85 text-base md:text-lg leading-[1.75]">
              If your first 36 hours on the ground aren&apos;t exactly what we promised, we refund our fee — in full.
            </p>
          </div>
          <p className="font-display italic font-normal text-[var(--c-gold)] text-base md:text-lg">
            — Pablo De La Mora, Founder, Golf in Mexico
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

      {/* TWO WAYS IN — call vs. self-serve, right above the form */}
      <section data-testid="tb-two-ways" className="bg-[var(--c-off-white)] border-t border-[var(--c-border)] py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <div className="text-center mb-14 md:mb-20">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--c-gold)]">
              How would you like to start?
            </span>
            <h2 className="mt-5 font-display font-light text-[var(--c-text)] text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-[18ch] mx-auto">
              Two ways in. <em className="italic text-[var(--c-gold)]">Both end in a real itinerary.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {/* PATH 1 — Call (recommended) */}
            <a
              href={CALENDAR_HREF}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="tb-intent-call"
              onClick={() => trackEvent("book_call_click", { source: "trip_builder" })}
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

            {/* PATH 2 — Build it yourself (the form is right below) */}
            <button
              type="button"
              onClick={scrollToForm}
              data-testid="tb-intent-build"
              className="group block text-left bg-white border border-[var(--c-border)] rounded-sm p-8 md:p-10 hover:border-[var(--c-gold)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all"
            >
              <div className="mb-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-1.5">
                  By Email:
                </p>
                <p className="font-display text-[var(--c-text)] text-xl md:text-2xl">Build it on your own</p>
              </div>
              <p className="font-body font-light text-[var(--c-text-mid)] text-[15px] md:text-base leading-[1.7] mb-8">
                Itinerary back to your inbox in 48 hours.
              </p>
              <span className="inline-flex items-center gap-3 bg-[var(--c-green-deep)] text-white px-6 py-3 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold group-hover:bg-[var(--c-green-mid)] transition-colors">
                Start Trip Builder
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </button>
          </div>
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

                  {destinations.includes("unique-destinations") && (
                    <div className="mb-8">
                      <label htmlFor="tb-unique-cities" className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--c-text-muted)] mb-2">Any cities in mind?</label>
                      <input
                        id="tb-unique-cities"
                        type="text"
                        value={uniqueCities}
                        onChange={(e) => setUniqueCities(e.target.value)}
                        placeholder="e.g., Guadalajara, Monterrey, San Miguel"
                        data-testid="tb-unique-cities"
                        className="w-full bg-[var(--c-surface)] border border-[var(--c-border)] focus:border-[var(--c-gold)] text-[var(--c-text)] placeholder:text-[var(--c-text-muted)] font-body text-sm px-4 py-3 rounded-sm focus:outline-none transition-colors"
                      />
                      <p className="mt-2 text-[12px] text-[var(--c-text-muted)] italic">Optional — helps us start with courses you&apos;re already curious about.</p>
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
                      Next: Trip Type
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 2 · TRIP KIND + FOCUS + BUDGET ── */}
              {step === 2 && (
                <div data-testid="tb-step-2">
                  <StepPill n={2} />
                  <h2 className="font-display font-light text-[var(--c-text)] text-2xl md:text-4xl leading-[1.15] mb-10 tracking-tight">What kind of trip is this?</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
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
                  {errors.tripType && <p className="text-[13px] text-[#8b2020] mb-5 font-mono">{errors.tripType}</p>}

                  {/* Trip focus — single select */}
                  <div className="mt-10">
                    <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--c-text-muted)] mb-4">Select your type of trip</label>
                    <div className="grid grid-cols-1 gap-3">
                      {TRIP_FOCUS.map((f) => (
                        <SelectCard
                          key={f.id}
                          selected={tripFocus === f.id}
                          onClick={() => setTripFocus(f.id)}
                          testid={`tb-focus-${f.id}`}
                          className="p-5 md:p-6"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h4 className="font-display text-[var(--c-text)] text-base md:text-lg mb-1">{f.label}</h4>
                              <p className="text-[13px] text-[var(--c-text-mid)] leading-[1.6]">{f.desc}</p>
                            </div>
                            {tripFocus === f.id && <Checkmark />}
                          </div>
                        </SelectCard>
                      ))}
                    </div>
                  </div>

                  {/* Budget per player — single-select chips */}
                  <div className="mt-10">
                    <label className="block font-display text-[var(--c-text)] text-lg md:text-xl mb-1.5">What&apos;s your budget per player?</label>
                    <p className="text-[13px] text-[var(--c-text-muted)] mb-4">Ground + golf only (USD). Excludes flights. No wrong answer — this helps us match course access and lodging to your expectations.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {BUDGET_OPTIONS.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setBudget(b.label)}
                          data-testid={`tb-budget-${b.id}`}
                          aria-pressed={budget === b.label}
                          className={`py-3 px-2 rounded-sm font-mono text-[11px] uppercase tracking-[0.08em] transition-all ${budget === b.label ? "bg-[var(--c-gold)] text-[var(--c-green-deep)] font-bold" : "bg-[var(--c-surface)] text-[var(--c-text-mid)] border border-[var(--c-border)] hover:border-[var(--c-gold)]"}`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10 flex items-center justify-between">
                    <button type="button" onClick={() => setStep(1)} className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-text-muted)] hover:text-[var(--c-text)] transition-colors">← Back</button>
                    <button type="button" onClick={next} data-testid="tb-next-2" className="group inline-flex items-center gap-3 bg-[var(--c-green-deep)] hover:bg-[var(--c-green-mid)] text-white px-7 py-3.5 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold transition-colors">
                      Next: When
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 3 · WHEN ── */}
              {step === 3 && (
                <div data-testid="tb-step-3">
                  <StepPill n={3} />
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
                    <button type="button" onClick={() => setStep(2)} className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-text-muted)] hover:text-[var(--c-text)] transition-colors">← Back</button>
                    <button type="button" onClick={next} data-testid="tb-next-3" className="group inline-flex items-center gap-3 bg-[var(--c-green-deep)] hover:bg-[var(--c-green-mid)] text-white px-7 py-3.5 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold transition-colors">
                      Next: Last Step
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

              {/* ── STEP 4 · CONTACT + BESPOKE + SUBMIT ── */}
              {step === 4 && (
                <form onSubmit={submit} data-testid="tb-step-4">
                  <input {...mainHs.honeypotProps} name="company_website" />
                  <StepPill n={4} />
                  <h2 className="font-display font-light text-[var(--c-text)] text-2xl md:text-4xl leading-[1.15] mb-10 tracking-tight">
                    Last Step
                  </h2>

                  {/* Contact fields */}
                  <div className="space-y-5 mb-10 max-w-xl">
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

                  {/* Bespoke Travel box (COPY ONLY — no payment flow) */}
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
                        <div className="mt-6 pt-5 border-t border-[var(--c-border)]">
                          <p className="text-[14px] text-[var(--c-text-mid)] leading-[1.7]">
                            A $100 USD deposit per player initiates your custom itinerary and confirms your trip booking.
                          </p>
                          <p className="mt-1.5 text-[13px] text-[var(--c-text-muted)] italic">
                            Protected by our 36-Hour GIM Guarantee.
                          </p>
                        </div>
                      </SelectCard>
                    ))}
                  </div>
                  {errors.pkg && <p className="text-[13px] text-[#8b2020] mb-5 font-mono">{errors.pkg}</p>}

                  <button type="submit" disabled={mainHs.submitting} data-testid="tb-submit" className="group w-full inline-flex items-center justify-center gap-3 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-8 py-4 rounded-sm font-mono text-[12px] uppercase tracking-[0.18em] font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                    {mainHs.submitting ? "Sending…" : "Get My 48-Hour Proposal"}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                  {mainHs.error && (
                    <p className="mt-4 text-[12px] text-[#8b2020] text-center font-mono">{mainHs.error}</p>
                  )}
                  <p className="mt-4 text-[12px] text-[var(--c-text-muted)] text-center leading-[1.6]">
                    No commitment. No call required. We build the itinerary. You decide if you want to move forward.
                  </p>
                  {/* The email typed above is only POSTed when this button is
                      pressed, so the consent line belongs on the step that sends it. */}
                  <ConsentNotice
                    tone="light"
                    testid="consent-notice-trip-builder"
                    className="mt-3 text-center"
                  />

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
                    <input {...exitHs.honeypotProps} name="company_website" />
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
                      disabled={exitHs.submitting}
                      data-testid="tb-exit-submit"
                      className="bg-[var(--c-green-deep)] hover:bg-[var(--c-green-mid)] text-white px-6 py-3 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {exitHs.submitting ? "Sending…" : "Send it to me →"}
                    </button>
                  </form>
                  {exitHs.error && (
                    <p className="mt-2 text-[11px] text-[#8b2020] font-mono">{exitHs.error}</p>
                  )}
                  <p className="mt-3 text-[11px] text-[var(--c-text-muted)] italic">
                    No spam. One email, then we go quiet until you reply.
                  </p>
                  <ConsentNotice
                    tone="light"
                    testid="consent-notice-trip-builder-exit"
                    className="mt-2"
                  />
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
