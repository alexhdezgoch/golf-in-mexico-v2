import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════
   About · /about
   Pablo De La Mora & José Islas — credibility for Google + readers
   ═══════════════════════════════════════════════════════════════════ */

const FOUNDERS = [
  {
    slug: "pablo",
    name: "Pablo De La Mora",
    role: "Co-Founder · Trip Architect",
    location: "Based in Querétaro, MX",
    bio:
      "Pablo De La Mora is a Mexican golf insider, businessman and writer. He spent over a decade inside the México golf industry — from PGA Tour events at Vidanta and the WGC-Mexico Championship at Chapultepec, to private member-guest tournaments at Diamante and Mayakoba. Pablo writes the editorial voice of GIM and personally architects every Bespoke Travel itinerary.",
    credentials: [
      "PGA Tour event operations — Mexico Open at Vidanta",
      "WGC-Mexico Championship · Chapultepec 2017–2020",
      "12+ years inside México's championship golf network",
      "Diamante Dunes member-guest tournament organizer",
    ],
    quote:
      "I write what I would tell a friend over a beer — not what a tourism board would write. That is the entire difference.",
    portrait: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=900&q=85",
    gallery: [
      { src: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=1200&q=85", caption: "Diamante Dunes · Member-guest tournament, 2024" },
      { src: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1200&q=85", caption: "Mayakoba El Camaleón · PGA Tour week, 2022" },
      { src: "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1200&q=85", caption: "Vista Vallarta · Field research, 2023" },
      { src: "https://images.unsplash.com/photo-1717388835452-c9c8cda0002e?auto=format&fit=crop&w=1200&q=85", caption: "Club de Golf Chapultepec · WGC era" },
    ],
  },
  {
    slug: "jose",
    name: "José Islas",
    role: "Co-Founder · Tournament Director",
    location: "Based in Los Cabos, MX",
    bio:
      "José Islas is a competitive Mexican golfer and tournament director. He qualified for the WWT Championship at Mayakoba twice and competed across the Latinoamérica Tour. José runs the on-the-ground operations of GIM in Los Cabos, holds the relationships with Pueblo Bonito, Montage, and Diamante, and personally walks every course we recommend.",
    credentials: [
      "WWT Championship qualifier · Mayakoba (2x)",
      "PGA Tour Latinoamérica competitor",
      "Diamante Dunes · personal relationships since 2018",
      "Pueblo Bonito (Quivira) · operations contact",
    ],
    quote:
      "Golf in México is about relationships, not bookings. The right phone call still beats the right form every single time.",
    portrait: "https://images.unsplash.com/photo-1531594896955-305789152ddc?auto=format&fit=crop&w=900&q=85",
    gallery: [
      { src: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1200&q=85", caption: "Quivira Golf Club · Pacific cliffs" },
      { src: "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1200&q=85", caption: "Twin Dolphin Golf Club · Montage week" },
      { src: "https://images.unsplash.com/photo-1592965046687-1acdbcdb5642?auto=format&fit=crop&w=1200&q=85", caption: "WWT Championship qualifying · Mayakoba" },
      { src: "https://images.unsplash.com/photo-1646606617448-e48f619c4abd?auto=format&fit=crop&w=1200&q=85", caption: "Solmar Golf Links · Pre-tournament walk" },
    ],
  },
];

const Slider = ({ photos, testid }) => {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i === 0 ? photos.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === photos.length - 1 ? 0 : i + 1));
  return (
    <div className="mt-8" data-testid={testid}>
      <div className="relative overflow-hidden rounded-sm bg-[var(--c-green-deep)] aspect-[16/9]">
        <motion.img
          key={idx}
          src={photos[idx].src}
          alt={photos[idx].caption}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/85">{photos[idx].caption}</p>
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous photo"
          data-testid={`${testid}-prev`}
          className="absolute top-1/2 -translate-y-1/2 left-3 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white font-mono text-sm flex items-center justify-center backdrop-blur-sm transition-colors"
        >
          ←
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next photo"
          data-testid={`${testid}-next`}
          className="absolute top-1/2 -translate-y-1/2 right-3 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white font-mono text-sm flex items-center justify-center backdrop-blur-sm transition-colors"
        >
          →
        </button>
      </div>

      {/* Dots + counter */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`h-[2px] transition-all ${i === idx ? "w-8 bg-[var(--c-gold)]" : "w-4 bg-[var(--c-border)] hover:bg-[var(--c-text-muted)]"}`}
            />
          ))}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--c-text-muted)]">{String(idx + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>
      </div>
    </div>
  );
};

const About = () => (
  <main data-testid="page-about" className="bg-[var(--c-off-white)]">
    {/* HERO */}
    <header className="relative bg-[var(--c-off-white)] pt-32 md:pt-40 pb-20 md:pb-28 border-b border-[var(--c-border)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-6">About Golf in México°</span>
        <h1 className="font-display font-light text-[var(--c-text)] text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.04] tracking-tight max-w-[1000px] mb-10">
          Two Mexican golfers, <em className="italic text-[var(--c-gold)]">one editorial promise.</em>
        </h1>
        <p className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.75] max-w-[720px]">
          Golf in México° is Pablo De La Mora and José Islas — a writer-architect and a competitive golfer who together hold the relationships, the access, and the editorial voice that turn a México golf trip into something different from what a tourism board would build. Everything you read on this site is written by one of us. Everything we recommend, one of us has played.
        </p>
      </div>
    </header>

    {/* FOUNDERS */}
    <section className="py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 space-y-24 md:space-y-32">
        {FOUNDERS.map((f, idx) => (
          <article
            key={f.slug}
            id={f.slug}
            data-testid={`founder-${f.slug}`}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14"
            itemScope
            itemType="https://schema.org/Person"
          >
            {/* Portrait + identity */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-[var(--c-green-deep)]">
                <img
                  src={f.portrait}
                  alt={`${f.name} — ${f.role}`}
                  itemProp="image"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="mt-6">
                <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-2">{String(idx + 1).padStart(2, "0")} · {f.location}</span>
                <h2 className="font-display font-light text-[var(--c-text)] text-3xl md:text-4xl tracking-tight" itemProp="name">{f.name}</h2>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--c-text-muted)] mt-2" itemProp="jobTitle">{f.role}</p>
              </div>
            </div>

            {/* Bio + credentials + slider */}
            <div className="lg:col-span-7">
              <p className="font-body font-light text-[var(--c-text)] text-base md:text-lg leading-[1.85] mb-8" itemProp="description">
                {f.bio}
              </p>

              <blockquote className="border-l-2 border-[var(--c-gold)] pl-6 mb-10 max-w-[640px]">
                <p className="font-display italic font-light text-[var(--c-text)] text-lg md:text-2xl leading-[1.5]">&ldquo;{f.quote}&rdquo;</p>
              </blockquote>

              <div className="mb-2">
                <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--c-gold)] mb-4">Selected credentials</span>
                <ul className="space-y-2.5">
                  {f.credentials.map((c) => (
                    <li key={c} className="flex items-start gap-3 text-[var(--c-text-mid)] text-[14px] md:text-[15px] leading-[1.65]">
                      <span className="text-[var(--c-gold)] mt-1.5">▸</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Slider of validation photos */}
              <Slider photos={f.gallery} testid={`slider-${f.slug}`} />
            </div>
          </article>
        ))}
      </div>
    </section>

    {/* PROMISE FOOTER */}
    <section className="bg-[var(--c-green-deep)] text-white py-20 md:py-28">
      <div className="max-w-[820px] mx-auto px-6 md:px-12 text-center">
        <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-6">The editorial promise</span>
        <h2 className="font-display font-light text-white text-3xl md:text-5xl leading-[1.1] tracking-tight mb-8">
          Written from inside México, <em className="italic text-[var(--c-gold)]">not from a desk.</em>
        </h2>
        <p className="font-body font-light text-white/75 text-base md:text-lg leading-[1.75] mb-10">
          We don&apos;t republish press releases. We don&apos;t accept comp rounds in exchange for coverage. Every course on this site has been walked by one of us. Every restaurant we recommend, one of us has eaten at. Every relationship we leverage to get you on a private course, we built ourselves.
        </p>
        <Link
          to="/trip-builder"
          data-testid="about-trip-cta"
          className="group inline-flex items-center gap-3 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-8 py-4 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold transition-colors"
        >
          Start a Trip Proposal
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  </main>
);

export default About;
