import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TeamEditorial from "@/components/TeamEditorial";
import { useSeo, orgSchema } from "@/hooks/useSeo";
import PartnersStrip from "@/components/PartnersStrip";

/* ═══════════════════════════════════════════════════════════════════
   About · /about
   Founder gallery + full editorial bios live on the homepage. This
   page focuses on the brand mission and the three editorial pillars.
   ═══════════════════════════════════════════════════════════════════ */

const About = () => {
  useSeo({
    title: "About Us: Pablo De La Mora & José Islas | GOLF° IN MEXICO°",
    description:
      "GOLF° IN MEXICO° is run by Pablo De La Mora, a sports agent with five years inside PGA Tour, LIV Golf, LPGA and WTA events, and José Islas, a professional golfer with four Mexican Tour wins. We help golfers play Mexico's best: curated trips around the top courses, authentic local experiences and the best value for every group.",
    canonical: "/about",
    jsonLd: [
      orgSchema(),
      { "@context": "https://schema.org", "@type": "AboutPage", name: "About GOLF° IN MEXICO°", url: "https://golf-in-mexico.com/about", about: { "@type": "Organization", name: "GOLF° IN MEXICO°", url: "https://golf-in-mexico.com" } },
    ],
  });
  return (
  <main data-testid="page-about" className="bg-[var(--c-off-white)]">
    {/* ── HERO ── */}
    <header className="relative bg-[var(--c-off-white)] pt-32 md:pt-40 pb-16 md:pb-24 border-b border-[var(--c-border)]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-6">
          About Golf in Mexico°
        </span>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light text-[var(--c-text)] text-4xl md:text-6xl lg:text-[5rem] leading-[1.04] tracking-tight max-w-[18ch] mb-8"
        >
          Built by the people{" "}
          <em className="italic text-[var(--c-gold)]">inside the ropes.</em>
        </motion.h1>
        <p className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.75] max-w-[680px]">
          Golf in Mexico° comes from{" "}
          <strong className="font-normal text-[var(--c-text)]">Pablo De La Mora</strong>{" "}
          and{" "}
          <strong className="font-normal text-[var(--c-text)]">José Islas</strong>{" "}
          — a sport agent and a professional golfer who together hold the
          relationships, the access, and the editorial voice that turn a
          Mexico golf trip into something different from what a tourism board
          would build.
        </p>
      </div>
    </header>

    {/* ── FULL EDITORIAL · The Agent · The Player · The Collaboration ──
        Built directly under the hero so the brand mission lands first,
        then opens straight into the three named bios. ── */}
    <TeamEditorial />

    {/* ── THREE PILLARS · OUR VALUES ── */}
    <section
      data-testid="about-pillars"
      className="bg-[var(--c-surface)] py-20 md:py-32"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-6">
          Three Pillars
        </span>
        <h2 className="font-display font-light text-[var(--c-text)] text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.05] mb-12 md:mb-16 max-w-[22ch]">
          Our values<span className="text-[var(--c-gold)]">.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
          {[
            {
              n: "/",
              title: "Precision",
              subtitle: "In every itinerary.",
              body:
                "Our standards were forged on professional tours. From the first tee time to the final ride home, every course, hotel, and transfer is vetted, sequenced, and confirmed in writing — the same rigor expected by the world's best players, applied to your trip.",
            },
            {
              n: "//",
              title: "Destination Intelligence",
              subtitle: "Over a decade in the field.",
              body:
                "Over a decade spent scouting Mexico's most exclusive regions. We rely on genuine, boots-on-the-ground relationships to bypass the tourist noise and unlock the country's true hidden gems.",
            },
            {
              n: "///",
              title: "Relationships That Open Doors",
              subtitle: "Insider access, built over decades.",
              body:
                "Real access is relational, not transactional. Years of direct work with caddies, course directors, head pros, and resort operators means our clients get tee times, suites, and introductions that are not on any public booking platform. That network is the trip.",
            },
          ].map((p, i) => (
            <motion.article
              key={p.n}
              data-testid={`pillar-${i + 1}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-[var(--c-gold)]/40 pt-6"
            >
              <div className="font-display font-light text-[var(--c-gold)] text-3xl md:text-4xl mb-5 leading-none">{p.n}</div>
              <h3 className="font-display font-normal text-[var(--c-text)] text-xl md:text-2xl leading-[1.15] mb-2">
                {p.title}
              </h3>
              <p className="font-display italic text-[var(--c-gold)] text-sm md:text-base leading-[1.4] mb-5">
                {p.subtitle}
              </p>
              <p className="font-body font-light text-[var(--c-text-mid)] text-sm md:text-[15px] leading-[1.7]">
                {p.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    {/* ── THE TEAM IN SHORT ── Both people in plain text, so the page says who
        they are without opening a tab (the bios above show one at a time). ── */}
    <section data-testid="about-team-facts" className="bg-[var(--c-off-white)] py-20 md:py-28 border-t border-[var(--c-border)]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-6">
          The team
        </span>
        <h2 className="font-display font-light text-[var(--c-text)] text-3xl md:text-5xl leading-[1.08] mb-12 max-w-[22ch]">
          An agent and a tour pro <em className="italic text-[var(--c-gold)]">behind every trip.</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <article className="border-t border-[var(--c-gold)]/40 pt-6">
            <h3 className="font-display font-normal text-[var(--c-text)] text-2xl mb-2">Pablo De La Mora</h3>
            <p className="font-display italic text-[var(--c-gold)] text-base mb-4">Founder · the agent</p>
            <p className="font-body font-light text-[var(--c-text-mid)] text-[15px] md:text-base leading-[1.75]">
              A sports agent for five years, Pablo has worked inside the player areas of PGA TOUR, LPGA, LIV Golf and WTA events.
              He plans every GOLF° IN MEXICO° trip himself and stays your one contact from the first message until you fly home.
            </p>
          </article>
          <article className="border-t border-[var(--c-gold)]/40 pt-6">
            <h3 className="font-display font-normal text-[var(--c-text)] text-2xl mb-2">José Islas</h3>
            <p className="font-display italic text-[var(--c-gold)] text-base mb-4">Co-founder · the player</p>
            <p className="font-body font-light text-[var(--c-text-mid)] text-[15px] md:text-base leading-[1.75]">
              A professional golfer with four wins on the Mexican Tour, three PGA TOUR starts and one Korn Ferry Tour start. He played two
              World Amateur Team Championships, two Latin American Amateurs and two US Amateurs. José knows which Mexican courses are worth the trip.
            </p>
          </article>
        </div>
      </div>
    </section>

    {/* ── HOW A TRIP WITH US WORKS ── */}
    <section data-testid="about-how-it-works" className="bg-[var(--c-surface)] py-20 md:py-28">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-6">
          How it works
        </span>
        <h2 className="font-display font-light text-[var(--c-text)] text-3xl md:text-5xl leading-[1.08] mb-12 max-w-[22ch]">
          From a curated trip <em className="italic text-[var(--c-gold)]">to your written quote.</em>
        </h2>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {[
            { t: "Pick a trip we curated", d: "Browse trips Pablo and José put together for groups: the stay, the courses and the price per golfer, taxes included. Change the golfers, nights and room, and the price follows." },
            { t: "Get your quote in 48 hours", d: "Request a quote for up to three trips at once. Pablo confirms availability with the hotel and the clubs, then sends a written proposal with the final price. Nothing is paid on this site." },
            { t: "Hotels at the hotel's own rate", d: "We are an independent Fora Travel advisor: your stay is booked through Fora at the hotel's published rate, often with perks like breakfast or resort credit, and the hotel charges you directly." },
            { t: "GIM Concierge, $100 per golfer", d: "Our planning service: every tee time booked, the trip sequenced, one contact until you are home. Non-golfers are free. If your first 36 hours aren't what we planned, we refund the fee in full." },
          ].map((s, i) => (
            <li key={s.t} className="border-t border-[var(--c-gold)]/40 pt-6">
              <span className="block font-display text-[var(--c-gold)] text-3xl leading-none mb-4">{i + 1}</span>
              <h3 className="font-display font-normal text-[var(--c-text)] text-xl md:text-2xl leading-[1.2] mb-3">{s.t}</h3>
              <p className="font-body font-light text-[var(--c-text-mid)] text-[15px] md:text-base leading-[1.75]">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="font-body font-light text-[var(--c-text-mid)] text-base leading-[1.75] mt-14 max-w-[70ch]">
          We plan golf trips across Mexico:{" "}
          <Link to="/destinations/los-cabos" className="underline underline-offset-4 decoration-[var(--c-gold)]">Los Cabos</Link>,{" "}
          <Link to="/destinations/punta-mita" className="underline underline-offset-4 decoration-[var(--c-gold)]">Punta Mita</Link>,{" "}
          <Link to="/destinations/cancun-riviera-maya" className="underline underline-offset-4 decoration-[var(--c-gold)]">Cancún and the Riviera Maya</Link>,{" "}
          <Link to="/destinations/puerto-vallarta" className="underline underline-offset-4 decoration-[var(--c-gold)]">Puerto Vallarta</Link> and{" "}
          <Link to="/destinations/mexico-city" className="underline underline-offset-4 decoration-[var(--c-gold)]">Mexico City</Link>.
          See every course in the{" "}
          <a href="/courses" className="underline underline-offset-4 decoration-[var(--c-gold)]">course guide</a>, or{" "}
          <a href="/trip-builder" className="underline underline-offset-4 decoration-[var(--c-gold)]">explore our trips</a>.
        </p>
      </div>
    </section>

    {/* ── WHO WE WORK WITH ── */}
    <PartnersStrip />

    {/* ── GET IN TOUCH FOOTER ── */}
    <section className="bg-[var(--c-green-deep)] text-white py-20 md:py-28">
      <div className="max-w-[820px] mx-auto px-6 md:px-12 text-center">
        <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-gold)] mb-6">
          Get in touch
        </span>
        <h2 className="font-display font-light text-white text-3xl md:text-5xl leading-[1.1] tracking-tight mb-8">
          Want to collaborate, share a story,{" "}
          <em className="italic text-[var(--c-gold)]">or just talk golf?</em>
        </h2>
        <p className="font-body font-light text-white/75 text-base md:text-lg leading-[1.75] mb-10">
          We&apos;re always looking for new courses to cover, people to
          interview, and stories worth telling.
        </p>
        <a
          href="mailto:hello@golf-in-mexico.com"
          data-testid="about-contact-cta"
          className="group inline-flex items-center gap-3 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-8 py-4 rounded-sm font-mono text-[11px] uppercase tracking-[0.18em] font-bold transition-colors"
        >
          Connect with us
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </section>
  </main>
  );
};

export default About;
