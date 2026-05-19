import { useState, useRef } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { getDestination, COMING_SOON } from "@/data/destinations";

const fmt = (n) => (n === 0 ? "Included" : `$${n.toLocaleString()}`);

/* --------------------------- HERO --------------------------- */

const Hero = ({ d }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section ref={ref} data-testid="dh-hero" className="relative h-[92vh] min-h-[640px] w-full overflow-hidden bg-ink text-cream">
      <motion.div style={{ y }} className="absolute inset-0 -top-20 -bottom-20">
        <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover scale-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/30 to-ink/80" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 h-full max-w-[1100px] mx-auto px-6 md:px-12 flex flex-col justify-end pb-16 md:pb-20">
        <nav aria-label="Breadcrumb" className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/70 mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
            <li aria-hidden>›</li>
            <li><Link to="/destinations" className="hover:text-gold transition-colors">Destinations</Link></li>
            <li aria-hidden>›</li>
            <li className="text-cream">{d.name}</li>
          </ol>
        </nav>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-light text-cream leading-[0.96] tracking-tight text-4xl md:text-6xl lg:text-7xl max-w-4xl"
        >
          {d.title.split(":")[0]}:<span className="italic text-gold">{d.title.split(":")[1] || ""}</span>
        </motion.h1>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-wide-editorial text-cream/70">
          By <span className="text-cream">Pablo De La Mora</span> · Last updated {d.lastUpdated}
        </p>
      </motion.div>
    </section>
  );
};

/* --------------------- SECTION WRAPPER --------------------- */

const Section = ({ id, label, title, children, testId, dark = false }) => (
  <section
    id={id}
    data-testid={testId}
    className={`relative py-20 md:py-28 border-b ${dark ? "bg-ink text-cream border-cream/10" : "bg-cream text-ink hairline"}`}
  >
    <div className="max-w-[1100px] mx-auto px-6 md:px-12">
      {label && (
        <span className={`block font-mono text-[10px] uppercase tracking-wide-editorial mb-3 ${dark ? "text-gold" : "text-ink/55"}`}>
          — {label}
        </span>
      )}
      {title && (
        <h2 className={`font-display font-light leading-[0.98] tracking-tight text-3xl md:text-5xl mb-10 md:mb-14 ${dark ? "text-cream" : "text-ink"}`}>
          {title}
        </h2>
      )}
      {children}
    </div>
  </section>
);

/* ------------------- PHOTO DIVIDER ------------------- */

const PhotoDivider = ({ image }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  return (
    <section ref={ref} className="relative h-[42vh] min-h-[320px] w-full overflow-hidden bg-ink">
      <motion.div style={{ y }} className="absolute inset-0 -top-16 -bottom-16">
        <img src={image} alt="" className="w-full h-full object-cover scale-110" />
        <div className="absolute inset-0 bg-ink/15" />
      </motion.div>
    </section>
  );
};

/* ------------------- S1 HERO ANSWER ------------------- */

const HeroAnswer = ({ d }) => (
  <Section id="s1" testId="dh-s1">
    <blockquote className="border-l-2 border-gold pl-6 md:pl-8 max-w-3xl font-display italic font-light text-ink text-xl md:text-2xl lg:text-3xl leading-[1.55]">
      {d.heroAnswer}
    </blockquote>
  </Section>
);

/* ------------------- S2 QUICK FACTS ------------------- */

const QuickFacts = ({ d }) => (
  <Section id="s2" label="At a glance" title="Quick Facts" testId="dh-s2">
    <div className="overflow-x-auto">
      <table className="w-full max-w-[760px] border-collapse">
        <tbody>
          {d.quickFacts.map(([k, v]) => (
            <tr key={k} className="border-b hairline">
              <th className="text-left align-top font-mono text-[10px] uppercase tracking-wide-editorial text-ink/55 py-3 pr-6 w-1/3">{k}</th>
              <td className="font-body text-ink py-3">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Section>
);

/* ------------------- S3 OVERVIEW ------------------- */

const Overview = ({ d }) => (
  <Section id="s3" label="The picture" title={`About golf in ${d.name}`} testId="dh-s3" dark>
    <div className="max-w-[720px] space-y-8 font-body text-cream/85 text-base md:text-[17px] leading-[1.75]">
      {d.overview.map((p) => (
        <div key={p.h3}>
          <h3 className="font-mono text-[11px] uppercase tracking-wide-editorial text-gold mb-3">{p.h3}</h3>
          <p>{p.text}</p>
        </div>
      ))}
    </div>
  </Section>
);

/* ------------------- S4 COURSE ROSTER ------------------- */

const CourseCard = ({ c }) => (
  <article
    data-testid={`course-${c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
    className={`flex flex-col gap-3 p-6 rounded-2xl bg-cream ${c.isGIMProperty ? "border-2 border-gold" : "border border-ink/15"}`}
  >
    <div className="flex items-center justify-between gap-3">
      <h3 className="font-display font-light text-ink text-xl leading-tight tracking-tight">{c.name}</h3>
      {c.isGIMProperty && (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gold text-ink font-mono text-[9px] uppercase tracking-wide-editorial whitespace-nowrap">
          GIM Property
        </span>
      )}
    </div>
    <ul className="text-sm space-y-1.5">
      <li><span className="font-mono text-[9px] uppercase tracking-wide-editorial text-ink/55 mr-2">Designer</span>{c.designer}</li>
      <li><span className="font-mono text-[9px] uppercase tracking-wide-editorial text-ink/55 mr-2">Type</span>{c.type}</li>
      <li><span className="font-mono text-[9px] uppercase tracking-wide-editorial text-ink/55 mr-2">Format</span>{c.holes} holes · Par {c.par}</li>
      <li><span className="font-mono text-[9px] uppercase tracking-wide-editorial text-ink/55 mr-2">Green fee</span>{c.feeLow === 0 && c.feeHigh === 0 ? "Member-guest pricing" : `${fmt(c.feeLow)} – ${fmt(c.feeHigh)} USD`}</li>
      <li><span className="font-mono text-[9px] uppercase tracking-wide-editorial text-ink/55 mr-2">Access</span>{c.access}</li>
    </ul>
    <p className="italic font-display font-light text-ink/75 text-sm leading-snug pt-2 border-t hairline">{c.bestFor}</p>
    <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted pt-1">Field Notes — coming soon</span>
  </article>
);

const Roster = ({ d }) => (
  <Section id="s4" label="The roster" title={`Every golf course in ${d.name}`} testId="dh-s4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {d.courses.map((c) => <CourseCard key={c.name} c={c} />)}
    </div>
  </Section>
);

/* ------------------- S5 COMPARISON ------------------- */

const difficulty = (c) => {
  // Simple editorial rating heuristic for look & feel
  if (/Nicklaus|Norman|Tiger|Fazio/.test(c.designer) && c.feeHigh >= 350) return 4;
  if (c.type.startsWith("Private")) return 4;
  if (c.feeHigh >= 250) return 3;
  return 2;
};

const Comparison = ({ d }) => (
  <Section id="s5" label="Side by side" title="Course comparison" testId="dh-s5">
    <div className="overflow-x-auto rounded-2xl border hairline">
      <table className="w-full min-w-[760px] border-collapse">
        <thead>
          <tr className="bg-ink text-cream">
            {["Course", "Designer", "Par", "Difficulty", "Green Fee", "Access", "Highlight"].map((h) => (
              <th key={h} className="text-left font-mono text-[10px] uppercase tracking-wide-editorial px-4 py-3 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {d.courses.map((c, i) => (
            <tr key={c.name} className={`border-b hairline ${i % 2 ? "bg-cream" : "bg-cream/60"}`}>
              <td className="px-4 py-3 font-display text-ink text-sm">{c.name}</td>
              <td className="px-4 py-3 font-body text-ink/80 text-sm">{c.designer}</td>
              <td className="px-4 py-3 font-mono text-[11px] text-ink/70">{c.par}</td>
              <td className="px-4 py-3 font-mono text-[11px] text-gold">{difficulty(c)}/5</td>
              <td className="px-4 py-3 font-mono text-[11px] text-ink/80">
                {c.feeLow === 0 && c.feeHigh === 0 ? "M-G" : `${fmt(c.feeLow)}–${fmt(c.feeHigh)}`}
              </td>
              <td className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide-editorial text-ink/70 whitespace-nowrap">{c.type.split(" ")[0]}</td>
              <td className="px-4 py-3 font-body text-ink/75 text-sm italic">{c.bestFor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="mt-4 font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
      Difficulty: 1 Beginner · 2 Moderate · 3 Challenging · 4 Advanced · 5 Tournament — GIM editorial rating.
    </p>
  </Section>
);

/* ------------------- S6 TRUE COST ------------------- */

const TrueCost = ({ d }) => (
  <Section id="s6" label="The math" title="What a round actually costs" testId="dh-s6">
    <p className="max-w-[720px] font-body text-ink/80 text-base md:text-[17px] leading-[1.75] mb-10">{d.costNote}</p>
    <div className="overflow-x-auto rounded-2xl border hairline">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr className="bg-ink text-cream">
            {["Cost element", "Low", "High", "Notes"].map((h) => (
              <th key={h} className="text-left font-mono text-[10px] uppercase tracking-wide-editorial px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {d.costRows.map(([label, lo, hi, note], i) => (
            <tr key={label} className={`border-b hairline ${i % 2 ? "bg-cream" : "bg-cream/60"}`}>
              <td className="px-4 py-3 font-display text-ink">{label}</td>
              <td className="px-4 py-3 font-mono text-sm text-ink/80">{fmt(lo)}</td>
              <td className="px-4 py-3 font-mono text-sm text-ink/80">{fmt(hi)}</td>
              <td className="px-4 py-3 font-body text-ink/70 text-sm">{note}</td>
            </tr>
          ))}
          <tr className="bg-gold/15 border-t-2 border-gold">
            <td className="px-4 py-4 font-display text-ink font-semibold">Total all-in</td>
            <td className="px-4 py-4 font-mono text-base text-ink font-semibold">{fmt(d.costRows.reduce((s, r) => s + r[1], 0))}</td>
            <td className="px-4 py-4 font-mono text-base text-ink font-semibold">{fmt(d.costRows.reduce((s, r) => s + r[2], 0))}</td>
            <td className="px-4 py-4 font-body text-ink/80 text-sm">Per person</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Section>
);

/* ------------------- S7 ACCESS ------------------- */

const AccessBlock = ({ h3, items }) => (
  items.length === 0 ? null : (
    <div className="max-w-[720px] mb-12 last:mb-0">
      <h3 className="font-mono text-[11px] uppercase tracking-wide-editorial text-gold mb-4">{h3}</h3>
      <ul className="space-y-3 font-body text-ink/85 text-base md:text-[17px] leading-[1.7]">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-gold mt-2 shrink-0">▸</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
);

const Access = ({ d }) => (
  <Section id="s7" label="The gates" title="Access rules: who can play where" testId="dh-s7">
    <AccessBlock h3="Open to all (public)" items={d.access.public} />
    <AccessBlock h3="Resort guest access" items={d.access.resort} />
    <AccessBlock h3="Cross-resort programs" items={d.access.cross} />
    <AccessBlock h3="Private / member-guest" items={d.access.private} />

    <div className="max-w-[720px] mt-6 rounded-2xl bg-ink text-cream p-7 md:p-9 border-l-4 border-gold">
      <p className="font-body font-light text-cream/85 text-base md:text-[17px] leading-relaxed">
        If navigating access across multiple courses is complicated, GIM&apos;s concierge booking handles all of it — one email to Pablo gets you tee times at any course in {d.name} regardless of where you&apos;re staying.
      </p>
      <button type="button" data-testid="access-cta-email" className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold text-ink px-5 py-3 font-mono text-[11px] uppercase tracking-wide-editorial hover:bg-cream transition-colors">
        Email Pablo →
      </button>
    </div>
  </Section>
);

/* ------------------- S8 LOGISTICS ------------------- */

const Logistics = ({ d }) => (
  <Section id="s8" label="On the ground" title="Getting there and between courses" testId="dh-s8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 max-w-[860px]">
      {[
        ["Airport + arrivals", d.logistics.airport],
        ["Getting to the courses", d.logistics.toCourses],
        ["Between courses", d.logistics.betweenCourses],
        ["Practical notes", d.logistics.practical],
      ].map(([h, p]) => (
        <div key={h}>
          <h3 className="font-mono text-[11px] uppercase tracking-wide-editorial text-gold mb-3">{h}</h3>
          <p className="font-body text-ink/80 text-base leading-[1.75]">{p}</p>
        </div>
      ))}
    </div>
  </Section>
);

/* ------------------- S9 SEASON ------------------- */

const Season = ({ d }) => (
  <Section id="s9" label="The calendar" title="When to go" testId="dh-s9" dark>
    <div className="overflow-x-auto rounded-2xl border border-cream/15">
      <table className="w-full min-w-[720px] border-collapse">
        <thead>
          <tr className="bg-cream text-ink">
            {["Month", "Temp °F", "Rain", "Conditions", "Crowds", "Notes"].map((h) => (
              <th key={h} className="text-left font-mono text-[10px] uppercase tracking-wide-editorial px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {d.seasonRows.map((row) => (
            <tr key={row[0]} className="border-b border-cream/10">
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-3 text-sm ${j === 0 ? "font-display text-cream" : "font-body text-cream/80"}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="mt-8 max-w-[720px] font-body text-cream/85 text-base md:text-[17px] leading-[1.75]">{d.seasonNote}</p>
  </Section>
);

/* ------------------- S10 JOURNAL (Phase 2 placeholder) ------------------- */

const JournalPlaceholder = ({ d }) => (
  <Section id="s10" label="Phase 2 · Coming" title="Field Notes from Pablo" testId="dh-s10">
    <div className="max-w-[720px] rounded-2xl border border-dashed border-ink/25 bg-cream/40 p-8 md:p-10">
      <p className="font-display italic font-light text-ink/75 text-lg md:text-xl leading-relaxed">
        Pablo&apos;s firsthand accounts from every course in {d.name} are being added to this page. The first entries are scheduled around{" "}
        <span className="text-ink">{d.journalTargets.join(", ")}</span>. Subscribe below to be notified when new field notes are published.
      </p>
    </div>
  </Section>
);

/* ------------------- S11 ALL ARTICLES ------------------- */

const AllArticles = ({ d }) => {
  const articles = [
    { title: `${d.name} Golf — The Complete Guide`, sub: "This page — every course, cost, and access rule.", live: true },
    { title: `Public Golf Courses in ${d.name}`, sub: "Which courses are open without a resort stay.", live: false },
    { title: `All-Inclusive Golf Resorts in ${d.name}`, sub: "What's actually included — and what isn't.", live: false },
    ...d.courses.slice(0, 4).map((c) => ({ title: `${c.name}: Field Notes`, sub: "Hole-by-hole editorial — Pablo's firsthand account.", live: false })),
  ];
  return (
    <Section id="s11" label="All guides" title={`Every guide for ${d.name}`} testId="dh-s11">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {articles.map((a, i) => (
          <div key={i} className="rounded-2xl border hairline bg-cream p-6 flex flex-col gap-3">
            <span className={`inline-flex self-start px-2.5 py-1 rounded-full font-mono text-[9px] uppercase tracking-wide-editorial ${a.live ? "bg-forest text-cream" : "bg-ink/8 text-ink/55"}`}>
              {a.live ? "Live" : "Coming soon"}
            </span>
            <h3 className="font-display font-light text-ink text-xl leading-tight tracking-tight">{a.title}</h3>
            <p className="font-body text-ink/65 text-sm leading-relaxed">{a.sub}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

/* ------------------- S12 NEWSLETTER CTA ------------------- */

const NewsletterCTA = ({ d }) => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = (e) => { e.preventDefault(); if (email.trim().length > 3) setDone(true); };
  return (
    <Section id="s12" testId="dh-s12" dark>
      <div className="max-w-[760px] mx-auto text-center">
        <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">— Field Notes</span>
        <h2 className="mt-4 font-display font-light text-cream leading-[1.02] tracking-tight text-3xl md:text-5xl">
          Get Pablo&apos;s insider picks for <span className="italic text-gold">{d.name}</span>.
        </h2>
        <p className="mt-6 font-body font-light text-cream/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Pablo&apos;s weekly Field Notes — which courses he&apos;d play this month, which caddie to request, and what a round actually costs. Written from inside México, not from a desk.
        </p>
        {!done ? (
          <form onSubmit={submit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" data-testid={`dh-newsletter-${d.slug}`} className="flex-1 bg-transparent border-b border-cream/30 focus:border-gold transition-colors text-cream placeholder:text-cream/35 font-body py-2 focus:outline-none" />
            <button type="submit" className="rounded-full bg-gold text-ink px-6 py-3 font-mono text-[11px] uppercase tracking-wide-editorial hover:bg-cream transition-colors whitespace-nowrap">Subscribe →</button>
          </form>
        ) : (
          <p className="mt-8 font-display italic text-gold text-xl">On its way. Welcome to the room.</p>
        )}
        <p className="mt-4 font-mono text-[10px] uppercase tracking-wide-editorial text-cream/45">No spam. Pablo writes these himself.</p>
      </div>
    </Section>
  );
};

/* ------------------- S13 FAQ ------------------- */

const FAQ = ({ d }) => {
  const [open, setOpen] = useState(null);
  return (
    <Section id="s13" label="Frequently asked" title={`${d.name} — your questions, answered`} testId="dh-s13">
      <ul className="max-w-[760px] border-t hairline">
        {d.faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={i} className="border-b hairline">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                data-testid={`dh-faq-${i}`}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-display text-ink text-lg md:text-xl leading-snug pr-4">{item.q}</span>
                <span className={`text-gold text-xl transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 font-body font-light text-ink/75 text-base leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </Section>
  );
};

/* --------------------- COMING SOON STRIP --------------------- */

const ComingSoonStrip = () => (
  <section className="bg-ink text-cream py-10 md:py-12 border-t border-cream/15">
    <div className="max-w-[1100px] mx-auto px-6 md:px-12 text-center">
      <h3 className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold mb-4">— More Destinations · Coming Soon</h3>
      <ul className="flex flex-col md:flex-row md:justify-center gap-3 md:gap-10 font-display italic text-cream/70 text-base md:text-lg">
        {COMING_SOON.map((c) => <li key={c}>{c}<span className="text-gold not-italic">°</span></li>)}
      </ul>
    </div>
  </section>
);

/* ------------------------- PAGE ------------------------- */

const DestinationHub = () => {
  const { slug } = useParams();
  const d = getDestination(slug);
  if (!d) return <Navigate to="/destinations" replace />;

  return (
    <main data-testid={`page-destination-${d.slug}`} className="relative bg-cream">
      <Hero d={d} />
      <HeroAnswer d={d} />
      <QuickFacts d={d} />
      <Overview d={d} />
      <PhotoDivider image={d.dividerImage} />
      <Roster d={d} />
      <Comparison d={d} />
      <TrueCost d={d} />
      <Access d={d} />
      <Logistics d={d} />
      <Season d={d} />
      <JournalPlaceholder d={d} />
      <AllArticles d={d} />
      <NewsletterCTA d={d} />
      <FAQ d={d} />
      <ComingSoonStrip />
    </main>
  );
};

export default DestinationHub;
