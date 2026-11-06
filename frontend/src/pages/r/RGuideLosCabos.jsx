import { useState } from "react";
import { useSeo, breadcrumbSchema, articleSchema, faqSchema } from "@/hooks/useSeo";
import { GuideVoices, voicesSchema } from "@/components/reverie/GuideVoices";
import siteCourses from "@/data/siteCourses.json";
import trips from "@/data/rtrips.json";
import { ARTICLES } from "@/data/articles";
import { CABO } from "@/data/rcabo";
import { GUIDE } from "@/data/rcaboGuide";
import { TOURNAMENTS, noGD } from "@/data/rtournaments";
import { GUIDE_AUTHORS } from "@/data/authors";
import { trackLead } from "@/lib/analytics";
import { useHubspotForm } from "@/hooks/useHubspotForm";
import { FORM_KEYS } from "@/config/hubspot";
import ConsentNotice from "@/components/ConsentNotice";
import { GuideOverview, GuideCosts, GuideLogistics } from "@/components/reverie/GuideDepth";
import { PhotoHero, TitleBlock, SectionIntro, CardRail, Card, Split, SoftenedCall, Board, Sources, Concierge } from "@/components/reverie/R";

/* Los Cabos guide, short version (rediseno-sitio/proof-seo-los-cabos.md, 2026-11-03). The guide owns "golf in Cabo /
   which courses / which is best / which can I play" (~13,000 searches a month). Course names, course prices and the
   long course notes belong to each course page; packages and trip budgets to the golf-packages landing and /trips.
   So: one line per course with a link, no course name as a heading, no "packages" or "trip" in headings.
   Every sentence comes from the published guide (rcaboGuide.js, corrected 2026-11-03) or the verified months. */

const course = (slug) => siteCourses.courses.find((c) => c.slug === slug);
const byName = (n) => GUIDE.courses.find((c) => c.name === n);
const STATUS = { best: "First choice", good: "Transition", storm: "Hurricane season" };
const faq = (start) => GUIDE.faqs.find(([q]) => q.startsWith(start));

const ANSWER = "Los Cabos has 18 active championship golf courses — with 5 more under construction — along a dramatic 20-mile stretch where the Sonoran Desert meets the Sea of Cortez. Green fees range from $260 to $700 USD per round depending on course and season, with October through May delivering peak conditions.";

const CAN_PLAY = [
  ["Open to visitors", ["Solmar Golf Links", "Cabo del Sol Course", "Puerto Los Cabos", "Club Campestre San José", "Cabo Real", "Oleada Golf Links"], "Oleada: subject to outside-player availability."],
  ["Hotel guests", ["Quivira", "Twin Dolphin", "Chileno Bay", "Diamante Dunes", "El Cardonal", "Palmilla"], "Quivira: Pueblo Bonito Oceanfront. Twin Dolphin: Montage Los Cabos. Chileno Bay: Auberge Chileno Bay. Diamante: guests and members. Palmilla: One&Only guests, on the Arroyo nine during the 2026 renovation."],
  ["Members only", ["Cove Club", "El Dorado"], "Members and member-sponsored guests."],
];

const BEST = noGD(faq("Which is the best course")[1]);
const ACCESS = "Private access here works on two routes: stay at the right hotel, or know the right member. The fastest way in is to book the matching resort.";

const FAQS = [
  ["Which golf courses in Los Cabos can I play?", `${ACCESS} Open to visitors: Solmar, Cabo del Sol Course, Puerto Los Cabos, Club Campestre, Cabo Real and Oleada (subject to availability). Hotel guests: Quivira, Twin Dolphin, Chileno Bay, Diamante Dunes, El Cardonal and Palmilla, where One&Only guests play the Arroyo nine during the 2026 renovation. Members only: Cove Club and El Dorado.`],
  ["Which is the best course in Los Cabos?", BEST],
  faq("What is the best time"),
  ["How much does a round of golf cost near luxury resorts in Los Cabos?", "Green fees range from $260 at Cabo Real and Club Campestre San José to $700 at Twin Dolphin, caddie included. Quivira publishes $360–$465 from October to May and $306–$395 from June to September, with cart, practice facility and food included. Green fees as of 2026, confirmed in writing before you book."],
  faq("How do I get access"),
  faq("Do I need to bring"),
  ["How do I get to the golf courses?", GUIDE.logistics[1][1]],
  faq("Do I need to tip"),
  faq("Is it safe"),
  // Guide-level questions production ranked with, back on 2026-11-05 (course-specific ones stay on the course pages).
  faq("Are the courses walkable"),
  [faq("Why do so many golfers choose")[0], noGD(faq("Why do so many golfers choose")[1]).replace(/^Four of Mexico's top 10 courses\. /, "")],
  [faq("What are the best golf courses in Cabo San Lucas")[0], noGD(faq("What are the best golf courses in Cabo San Lucas")[1])],
  ["How much does a golf trip to Los Cabos cost?", "The main variables are hotel choice and course selection. Green fees range from $260 at Cabo Real and Club Campestre San José to $700 at Twin Dolphin, caddie included. Green fees as of 2026, confirmed in writing before you book.", { href: "/destinations/los-cabos/golf-packages", label: "Los Cabos golf packages" }],
];

// The production guide's overview, what moves the price and Getting there (2026-11-05), from rcaboGuide.js.
const OVERVIEW = { label: "The corridor", pre: "Los Cabos golf —", em: "what you need to understand first.", paragraphs: GUIDE.overview.map((p) => noGD(p)) };
const COSTS = { label: "The math", pre: "In Los Cabos,", em: "the base camp sets the price.", callouts: [["The luxury variable", GUIDE.luxury], ["The twilight advantage", GUIDE.twilight]] };
const LOGISTICS = { label: "On the ground", pre: "Getting there", em: "and between courses.", items: GUIDE.logistics };

const Newsletter = ({ id }) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { submit, submitting, error, honeypotProps } = useHubspotForm(FORM_KEYS.hub_playbook);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!(await submit({ email, region: "los-cabos" }))) return;
    setSent(true);
    trackLead({ form: FORM_KEYS.hub_playbook, placement: id, region: "los-cabos" });
  };
  return (
    <section data-testid={id} className="px-5 md:px-10 py-[70px] bg-[var(--r-cream-2)]">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="max-w-[520px] flex flex-col gap-3">
          <p className="r-title text-[20px] md:text-[22px] text-[var(--r-green)]">Stay in the loop on Cabo golf.</p>
          <p className="r-body text-[14px]">{GUIDE.newsletter}</p>
        </div>
        <div className="flex flex-col gap-3 md:w-[420px]">
          {sent ? (
            <p className="r-title text-[16px] text-[var(--r-green)]">You&apos;re on the list.</p>
          ) : (
            <form onSubmit={onSubmit} className="flex gap-2">
              <input {...honeypotProps} name="company_website" />
              <label htmlFor={`${id}-email`} className="sr-only">Email</label>
              <input id={`${id}-email`} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="flex-1 min-w-0 bg-white border border-[rgba(30,57,43,0.25)] focus:border-[var(--r-green)] px-4 py-3 text-[14px] outline-none" />
              <button type="submit" disabled={submitting} className="r-btn disabled:opacity-60">{submitting ? "…" : "Keep me in the loop"}</button>
            </form>
          )}
          {error && !sent && <p className="text-[12px] text-[#a3352b]">{error}</p>}
          {!sent && <ConsentNotice tone="light" testid={`${id}-consent`} className="max-w-sm" />}
        </div>
      </div>
    </section>
  );
};

const RGuideLosCabos = () => {
  useSeo({
    title: "Cabo San Lucas Golf Courses | Diamante, Quivira & Cabo del Sol",
    description: "Tiger Woods's El Cardonal and the dunes at Diamante, Nicklaus on the cliffs at Quivira: 18 Los Cabos courses, and which open to visitors or need a room key.",
    canonical: "/destinations/los-cabos",
    image: "/og/guide-los-cabos.jpg",
    jsonLd: [
      articleSchema({
        headline: "Cabo San Lucas Golf Courses: Prices & Access",
        description: ANSWER,
        path: "/destinations/los-cabos",
        image: "/images/los-cabos/hero-dunes-fairway.webp",
        authors: GUIDE_AUTHORS,
        datePublished: "2026-05-01",
        dateModified: "2026-11-03",
      }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Destinations", path: "/destinations" }, { name: "Los Cabos", path: "/destinations/los-cabos" }]),
      faqSchema(FAQS.map(([q, a]) => ({ q, a }))),
      ...voicesSchema("los-cabos"),
    ],
  });
  const caboTrips = trips.filter((t) => t.destination === "Los Cabos");
  const bachelor = ARTICLES.find((a) => a.slug === "the-bachelor-trip-cabo");
  const linked = GUIDE.courses.filter((c) => c.slug && course(c.slug));
  const link = (name) => {
    const c = byName(name);
    const s = c?.slug && course(c.slug);
    return s ? <a href={s.href} className="underline underline-offset-2 hover:opacity-70">{name}</a> : name;
  };

  return (
    <main data-testid="page-guide" className="bg-[var(--r-cream)] text-[var(--r-ink)]">
      <PhotoHero image="/images/w5pux6b7-golfinmexico-156.webp" alt="Golfers on a dune-lined fairway in Los Cabos" />

      {/* 1 · The answer, in two sentences, with three facts */}
      <TitleBlock eyebrow="Destination guide · Los Cabos" title="Golf in Los Cabos" facts={[["Courses", "18 active · 5 under construction"], ["Green fees", "$260 – $700 per round"], ["Best months", "October – May"]]}>
        <p className="r-body text-[16px] max-w-[700px]">{ANSWER}</p>
        <p className="text-[12px] text-[var(--r-ink-soft)]">{GUIDE.byline} · Updated {GUIDE.updated}</p>
      </TitleBlock>

      {/* 1b · The agent and the player (2026-11-05) */}
      <GuideVoices slug="los-cabos" />

      {/* 2 · The courses: one line each, every name linked to its own page */}
      <section id="courses" data-testid="guide-courses" className="pb-[100px] scroll-mt-24">
        <SectionIntro title="Los Cabos golf courses, green fees and access" />
        <div className="mt-[50px]">
          <Board
            caption="Los Cabos golf courses: design, who can play, green fee and professional tournaments hosted"
            head={["Course", "Design", "Who can play", "Green fee", "Tour venue"]}
            rows={GUIDE.courses.map((c) => [link(c.name), c.design, c.access, c.fee, TOURNAMENTS[c.slug] ? "Yes" : "—"])}
            wide
          />
          <p className="r-body text-[12px] text-center text-[var(--r-ink-soft)] mt-5 px-6">{GUIDE.feesNote}</p>
        </div>
        <div className="mt-[70px]">
          <CardRail label="Los Cabos course pages">
            {linked.map((c) => {
              const s = course(c.slug);
              return <Card titleAs="span" key={c.slug} href={s.href} image={s.photo?.src} credit={s.photo?.credit} eyebrow={c.design} title={c.name} cta="View course" />;
            })}
          </CardRail>
        </div>
      </section>

      {/* 3 · Which can I play? (the Reddit and "cabo public golf courses" question) */}
      <section data-testid="guide-access" className="py-[100px] bg-[var(--r-cream-2)] px-5 md:px-10">
        <SectionIntro title="Which courses can I play?">{ACCESS}</SectionIntro>
        <div className="mt-[50px] mx-auto max-w-[1100px] grid gap-10 md:grid-cols-3">
          {CAN_PLAY.map(([k, names, note]) => (
            <div key={k} className="flex flex-col gap-3 border-t-2 border-[var(--r-green)] pt-5">
              <h3 className="r-title text-[16px] text-[var(--r-green)]">{k}</h3>
              <ul className="flex flex-col gap-1.5 r-body text-[15px] text-[var(--r-green)]">
                {names.map((n) => <li key={n}>{link(n)}</li>)}
              </ul>
              <p className="r-body text-[13px] text-[var(--r-ink-soft)]">{note}</p>
            </div>
          ))}
        </div>
      </section>

      <GuideOverview {...OVERVIEW} />
      <GuideCosts {...COSTS} link={<a href="/destinations/los-cabos/golf-packages" className="r-link self-start text-[var(--r-green)]">Los Cabos golf packages</a>} />

      {/* 4 · Which is the best? */}
      <Split id="guide-best" image="/images/d3b1vfc5-gim-stills-36.webp" alt="An oceanfront green in Los Cabos" flip>
        <h2 className="r-title text-[24px] md:text-[28px] text-[var(--r-green)]">Which is the best course in Los Cabos?</h2>
        <p className="r-body">{BEST}</p>
        <div className="flex flex-col gap-3 border-t border-[rgba(30,57,43,0.2)] pt-4">
          <h3 className="r-title text-[15px] text-[var(--r-green)]">Which courses have hosted professional tournaments?</h3>
          {GUIDE.courses.filter((c) => TOURNAMENTS[c.slug]).map((c) => (
            <p key={c.slug} className="r-body text-[14px]"><span className="font-semibold text-[var(--r-green)]">{link(c.name)}</span> — {TOURNAMENTS[c.slug]}</p>
          ))}
        </div>
      </Split>

      {/* 5 · When to go */}
      <section id="season" data-testid="guide-months" className="py-[100px] scroll-mt-24">
        <SectionIntro title="When to play.">{faq("What is the best time")[1]}</SectionIntro>
        <div className="mt-[50px] px-5 md:px-10">
          <div className="mx-auto max-w-[1100px] grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 border-[10px] border-[#e8e4d6] bg-white">
            {CABO.months.map(([m, s, note]) => (
              <div key={m} className="border border-[#ddd8c8] p-4 flex flex-col gap-2 min-h-[150px]">
                <span className="r-title text-[15px] text-[var(--r-green)]">{m}</span>
                <span className={`text-[12px] font-semibold uppercase tracking-[0.06em] ${s === "storm" ? "text-[#a3352b]" : "text-[var(--r-green)]"}`}>{STATUS[s]}</span>
                <span className="r-body text-[12px] leading-snug">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GuideLogistics {...LOGISTICS} />

      {/* 6 · Questions (FAQPage) */}
      <section id="faq" data-testid="guide-faq" className="bg-[var(--r-green)] text-[var(--r-cream)] px-6 py-[90px] md:py-[110px]">
        <div className="max-w-[760px] mx-auto flex flex-col items-center text-center gap-5">
          <h2 className="r-title text-[26px] md:text-[34px]">Your questions, answered.</h2>
          <div className="w-full mt-6 text-left border-t border-[rgba(251,249,243,0.25)]">
            {FAQS.slice(3).map(([q, a, more]) => (
              <details key={q} className="group border-b border-[rgba(251,249,243,0.25)]">
                <summary className="r-hit cursor-pointer list-none flex justify-between gap-6 py-5 r-title text-[14px]">
                  <h3>{q}</h3><span aria-hidden="true" className="transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="r-body text-[15px] pb-5 opacity-90">{a}{more && <> Full trip budgets: <a href={more.href} className="underline underline-offset-2">{more.label}</a>.</>}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · Where to go next: links only, their text lives on their own pages */}
      <section data-testid="guide-next" className="py-[100px]">
        <SectionIntro as="p" title="Explore trips" link={<a href="/trips" className="r-link text-[var(--r-green)]">All trips</a>} />
        <div className="mt-[60px]">
          <CardRail label="Los Cabos trips">
            {caboTrips.map((t) => <Card titleAs="span" key={t.slug} href={`/trips/${t.slug}`} image={t.photo || t.image} credit={t.photo ? t.photoCredit : undefined} eyebrow={t.type} title={t.title} cta="View trip" />)}
            {bachelor && <Card titleAs="span" href={`/journal/${bachelor.slug}`} image={bachelor.heroImage} eyebrow="Journal" title={bachelor.title} cta="Read more" />}
          </CardRail>
        </div>
      </section>

      <Newsletter id="guide-loop" />

      <SoftenedCall id="guide-close" image="/images/mmtjphx0-gim-stills-33.webp" titleAs="p" title="Free planning until your golf trip is right.">
        <p className="r-body text-[14px]">Perks you won&apos;t get booking direct. Planned by a golf agent and a pro golfer from Mexico.</p>
        <Concierge id="guide-close" className="r-btn r-btn-light mt-2" />
      </SoftenedCall>

      <div className="pt-16">
        <Sources items={GUIDE.sources} note="Web sources checked on November 3, 2026. Access and rates can change." />
      </div>
    </main>
  );
};

export default RGuideLosCabos;
