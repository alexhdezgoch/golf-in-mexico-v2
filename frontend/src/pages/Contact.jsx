import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════
   Contact · /contact
   Two ways to reach GIM: email or schedule a call via Google Calendar.
   ═══════════════════════════════════════════════════════════════════ */

const CALENDAR_EMBED_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0-5yCStoiBQ6flTE4ehdqPBbM437JWGYn8zaHwxQiavGhjRLGDkXwsoP2Kbr2pFx2H8de_f8cE?gv=true";

const EMAIL_ADDRESS = "hello@golf-in-mexico.com";

const Contact = () => (
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

        {/* CALL */}
        <div
          data-testid="contact-call-card"
          className="bg-[var(--c-green-deep)] text-white rounded-sm p-8 md:p-10 flex flex-col"
        >
          <h2 className="font-display font-normal text-white text-2xl md:text-3xl leading-[1.2] tracking-tight mb-4">
            Schedule a <em className="italic text-[var(--c-gold)]">call.</em>
          </h2>
          <p className="font-body font-light text-white/80 text-base leading-[1.7] mb-8">
            Thirty minutes with Pablo. Walk through your trip, your group, your dates. By the end of the call you&apos;ll know exactly what your itinerary looks like.
          </p>
          <div className="mt-auto">
            <a
              href={CALENDAR_EMBED_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-call-link"
              className="group inline-flex items-center gap-3 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-8 py-4 rounded-sm font-mono text-[11px] uppercase tracking-[0.2em] font-bold transition-colors"
            >
              Pick a time
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* CALENDAR EMBED */}
    <section data-testid="contact-calendar-section" className="py-12 md:py-20">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <h2 className="font-display font-normal text-[var(--c-text)] text-2xl md:text-4xl leading-[1.15] tracking-tight mb-8 md:mb-10 max-w-[28ch]">
          Or pick a time right here.
        </h2>
        <div className="relative w-full bg-white border border-[var(--c-border)] rounded-sm overflow-hidden">
          <iframe
            title="Schedule a call with Golf in Mexico"
            src={CALENDAR_EMBED_URL}
            data-testid="contact-calendar-iframe"
            style={{ border: 0 }}
            width="100%"
            height="720"
            frameBorder="0"
          />
        </div>
      </div>
    </section>
  </main>
);

export default Contact;
