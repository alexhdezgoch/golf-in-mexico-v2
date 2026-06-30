import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { trackLead } from "@/lib/analytics";

/* Static placeholder copy for the 3 not-yet-live destinations */
const PLACEHOLDERS = {
  "puerto-vallarta": {
    name: "Puerto Vallarta",
    region: "Bahía de Banderas",
    tagline: "Jungle fairways, mountain greens.",
    heroImage:
      "/images/e60z74y2-golf-in-mexico-5.webp",
  },
  "cancun-riviera-maya": {
    name: "Cancun · Riviera Maya",
    region: "Quintana Roo",
    tagline: "Limestone fairways, Caribbean light.",
    heroImage:
      "/images/e60z74y2-golf-in-mexico-5.webp",
  },
  "unique-destinations": {
    name: "Unique Destinations",
    region: "Across Mexico",
    tagline: "Bajío, Huatulco, Mérida, and beyond.",
    heroImage:
      "/images/e60z74y2-golf-in-mexico-5.webp",
  },
};

export const isDestinationPlaceholder = (slug) => Boolean(PLACEHOLDERS[slug]);

const DestinationPlaceholder = () => {
  const { slug } = useParams();
  const d = PLACEHOLDERS[slug];
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (email.trim().length > 3) {
      setSubmitted(true);
      trackLead({ form: "destination_waitlist", destination: slug });
    }
  };

  if (!d) return null;

  return (
    <main data-testid="page-destination-placeholder" className="relative bg-[var(--c-off-white)]">
      {/* HERO */}
      <section
        data-testid="dh-placeholder-hero"
        className="relative h-[80vh] min-h-[560px] w-full overflow-hidden bg-[var(--c-green-deep)] text-white"
      >
        <img
          src={d.heroImage}
          alt={d.name}
          className="absolute inset-0 w-full h-full object-cover editorial-img"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/70" />

        <div className="relative z-10 h-full max-w-[1100px] mx-auto px-6 md:px-12 flex flex-col justify-end pb-16 md:pb-20">
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 mb-6"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-[var(--c-gold)] transition-colors">Home</Link>
              </li>
              <li aria-hidden>›</li>
              <li>
                <Link to="/destinations" className="hover:text-[var(--c-gold)] transition-colors">Destinations</Link>
              </li>
              <li aria-hidden>›</li>
              <li className="text-white">{d.name}</li>
            </ol>
          </nav>

          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--c-gold)] mb-4">
            {d.region}
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-normal text-white leading-[0.96] tracking-tight text-4xl md:text-6xl lg:text-7xl max-w-4xl"
          >
            {d.name}
          </motion.h1>

          <p className="mt-5 font-display italic font-normal text-[var(--c-gold)] text-lg md:text-2xl">
            {d.tagline}
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="py-24 md:py-32">
        <div className="max-w-[820px] mx-auto px-6 md:px-12 text-center">
          <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--c-gold)] mb-6">
            In production
          </span>

          <h2
            data-testid="dh-placeholder-headline"
            className="font-display font-normal text-[var(--c-text)] text-3xl md:text-5xl leading-[1.1] tracking-tight mb-8"
          >
            The complete guide is being <em className="italic text-[var(--c-gold)]">written.</em>
          </h2>

          <p className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.75] max-w-xl mx-auto mb-12">
            The complete guide to golf in {d.name} — courses, costs, access, and
            insider intelligence — is being built by Pablo and the team.
            Subscribe below and you&apos;ll be the first to know when it goes live.
          </p>

          {!submitted ? (
            <form
              onSubmit={onSubmit}
              data-testid="dh-placeholder-form"
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                data-testid="dh-placeholder-email"
                className="flex-1 bg-white border border-[var(--c-border)] focus:border-[var(--c-gold)] transition-colors text-[var(--c-text)] placeholder:text-[var(--c-text-muted)] font-body text-sm px-4 py-3 rounded-sm focus:outline-none"
              />
              <button
                type="submit"
                data-testid="dh-placeholder-submit"
                className="group inline-flex items-center justify-center gap-2 bg-[var(--c-green-deep)] hover:bg-[var(--c-green-mid)] text-white px-6 py-3 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] transition-colors whitespace-nowrap"
              >
                Notify Me
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </form>
          ) : (
            <p
              data-testid="dh-placeholder-success"
              className="font-display italic font-normal text-[var(--c-gold)] text-xl md:text-2xl"
            >
              Welcome. You&apos;ll hear from us first.
            </p>
          )}

          <div className="mt-16 pt-12 border-t border-[var(--c-border)]">
            <Link
              to="/destinations"
              data-testid="dh-placeholder-back"
              className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-green-mid)] hover:text-[var(--c-gold)] transition-colors duration-500"
            >
              <span className="transition-transform duration-500 group-hover:-translate-x-1.5">←</span>
              Back to all destinations
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DestinationPlaceholder;
