import { motion } from "framer-motion";
import { useSeo, breadcrumbSchema } from "@/hooks/useSeo";

/* ═══════════════════════════════════════════════════════════════════
   Contact · /contact
   Two ways to reach GIM: email or schedule a call.
   ═══════════════════════════════════════════════════════════════════ */

// The 15-minute call with Pablo, the same booking link as every other "Book 15 minutes" on the site.
const CALENDAR_URL = "https://calendly.com/pablo-golf-in-mexico/trip-builder";

const EMAIL_ADDRESS = "hello@golf-in-mexico.com";

const Contact = () => {
  useSeo({
    title: "Contact Us: Plan Your Mexico Golf Trip | GOLF° IN MEXICO°",
    description:
      "Talk golf with Golf in Mexico°. Email the team for trip planning, press, or partnerships, or book a call to plan your Mexico golf trip.",
    canonical: "/contact",
    jsonLd: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ]),
  });
  return (
  <main data-testid="page-contact" className="relative bg-[var(--c-off-white)] pb-24 md:pb-32">
    {/* HERO */}
    <section className="pt-32 md:pt-40 pb-12 md:pb-16">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          data-testid="contact-h1"
          className="font-display font-normal text-[var(--c-text)] leading-[1.05] tracking-tight text-4xl md:text-6xl lg:text-7xl max-w-[18ch]"
        >
          Let&apos;s talk <em className="italic text-[var(--c-gold)]">golf.</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 md:mt-10 font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.75] max-w-[58ch]"
        >
          Drop us a line or book a 30-minute call. We answer every message ourselves — no assistants, no help desk.
        </motion.p>
      </div>
    </section>

    {/* TWO OPTIONS */}
    <section data-testid="contact-options" className="py-8 md:py-12">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* EMAIL */}
        <div
          data-testid="contact-email-card"
          className="bg-white border border-[var(--c-border)] rounded-sm p-8 md:p-10 flex flex-col"
        >
          <h2 className="font-display font-normal text-[var(--c-text)] text-2xl md:text-3xl leading-[1.2] tracking-tight mb-4">
            Write us an email.
          </h2>
          <p className="font-body font-light text-[var(--c-text-mid)] text-base leading-[1.7] mb-8">
            For collaborations, story ideas, course recommendations, or anything else worth a thoughtful reply.
          </p>
          <div className="mt-auto">
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              data-testid="contact-email-link"
              className="group inline-flex items-center gap-3 bg-[var(--c-green-deep)] hover:bg-[var(--c-green-mid)] text-white px-8 py-4 rounded-sm font-mono text-[11px] uppercase tracking-[0.2em] font-bold transition-colors"
            >
              {EMAIL_ADDRESS}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* SCHEDULE A CALL */}
        <div
          data-testid="contact-call-card"
          className="bg-[var(--c-green-deep)] text-white rounded-sm p-8 md:p-10 flex flex-col"
        >
          <h2 className="font-display font-normal text-white text-2xl md:text-3xl leading-[1.2] tracking-tight mb-4">
            Schedule a <em className="italic text-[var(--c-gold)]">call.</em>
          </h2>
          <p className="font-body font-light text-white/80 text-base leading-[1.7] mb-8">
            Planning a trip? Build it first: see the trips that fit your group, with the price per person, and request a quote. Rather talk it through? Book 15 minutes with Pablo.
          </p>

          <div className="mt-auto flex flex-col gap-3">
            {/* Primary — Trip Builder */}
            <a
              href="/trip-builder"
              data-testid="contact-trip-cta"
              className="group inline-flex items-center justify-between gap-3 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-7 py-4 rounded-sm font-mono text-[11px] uppercase tracking-[0.2em] font-bold transition-colors"
            >
              Explore trips
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            {/* Secondary — Book a call */}
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-call-cta"
              data-track="planner_call"
              data-track-id="contact"
              className="group inline-flex items-center justify-between gap-3 border border-white/30 hover:border-white text-white px-7 py-4 rounded-sm font-mono text-[11px] uppercase tracking-[0.2em] transition-colors"
            >
              Book 15 minutes with Pablo
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
  );
};

export default Contact;
