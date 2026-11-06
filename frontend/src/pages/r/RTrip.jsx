import { useParams } from "react-router-dom";
import { useSeo, breadcrumbSchema, SITE_URL } from "@/hooks/useSeo";
import trips from "@/data/rtrips.json";
import siteCourses from "@/data/siteCourses.json";
import { PhotoHero, TitleBlock, SectionIntro, CardRail, Card, Split, GreenBand, SoftenedCall, Board, Concierge } from "@/components/reverie/R";

/* Trip page (Reverie's itinerary intro): picture, title with three facts, why we chose it, the courses, what it
   includes, getting there, who it suits, questions, the call. Text: the v2 catalog record and production /your-trip
   answers (the fee answers are left out: no $100 before the call). */

const FAQS = [
  ["When do I get my trip?", "Within 36 hours, by email, and by WhatsApp if you left your number: your 100% personalized itinerary and its quote. The trip on this page is your best match, an example to review in the meantime."],
  ["Do I need to book a call?", "No, your trip arrives either way. The call is for going through the proposal step by step with Pablo, asking anything and making changes. It is free, with no commitment, and your personalized trip is ready for it."],
  ["What does the price include?", "The estimate is per golfer: stay, green fees and taxes. Flights are not included. Every price is confirmed in writing before you book."],
  ["How do payments work?", "Each golfer pays their own share and has their own space to see it, and the whole group sees the full trip in one place. Hotels and villas are booked through our registered host agency partners, billed by each property and confirmed in your name. We coordinate every payment, tee times included."],
];

/* Meta description: whole sentences of the overview that fit in 160 characters, else cut at a word. */
const metaDescription = (text) => {
  let out = "";
  for (const s of text.match(/[^.!?]+[.!?]+(\s|$)/g) || []) {
    if ((out + s).trim().length > 160) break;
    out += s;
  }
  if (out.trim()) return out.trim();
  return `${text.slice(0, 157).replace(/\s+\S*$/, "")}…`;
};

/* TouristTrip schema (SEO/GEO audit 2026-11-04): only what the page already says, no prices. */
const COURSE_URL = new Map(siteCourses.courses.map((c) => [c.name, c.href]));
const tripSchema = (t) => ({
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: t.title,
  description: t.overview,
  url: `${SITE_URL}/trips/${t.slug}`,
  image: `${SITE_URL}${t.photo || t.image}`,
  touristType: t.type,
  provider: { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: "GOLF° IN MEXICO°", url: SITE_URL },
  itinerary: {
    "@type": "ItemList",
    itemListElement: t.courses.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "GolfCourse", name: c.name, ...(COURSE_URL.get(c.name) ? { url: `${SITE_URL}${COURSE_URL.get(c.name)}` } : {}) },
    })),
  },
});

const RTrip = () => {
  const { slug } = useParams();
  const t = trips.find((x) => x.slug === slug) || trips[0];
  useSeo({ title: `${t.seoTitle || t.title} | GOLF° IN MEXICO°`, description: metaDescription(t.overview), canonical: `/trips/${t.slug}`, jsonLd: [tripSchema(t), breadcrumbSchema([{ name: "Trips", path: "/trips" }, { name: t.title, path: `/trips/${t.slug}` }])], });
  const others = trips.filter((x) => x.slug !== t.slug);

  return (
    <main data-testid="page-trip" className="bg-[var(--r-cream)] text-[var(--r-ink)]">
      <PhotoHero image={t.photo || t.image} alt={t.title} credit={t.photo ? t.photoCredit : undefined} />

      <TitleBlock
        eyebrow={`${t.type} · ${t.destination}`}
        title={t.title}
        facts={[["Golf rounds", String(t.golfRounds)], ["Stay", t.hotels.join(" · ")], ["Best time", t.season]]}
      >
        <p className="r-body text-[15px] max-w-[680px]">{t.overview}</p>
      </TitleBlock>

      <GreenBand id="trip-why">
        <span className="r-eyebrow opacity-80">Why we chose it</span>
        <p className="r-body text-[16px] md:text-[17px] leading-[1.75]">{t.whyWeChoseIt}</p>
      </GreenBand>

      <section data-testid="trip-courses" className="py-[100px] md:py-[120px]">
        <SectionIntro title="The stay and the courses" />
        <div className="mt-[60px]">
          <CardRail label="Courses">
            {t.courses.map((c) => (
              <Card key={c.name} href={c.href} image={c.photo} credit={c.credit} eyebrow={c.specs} title={c.name} text={c.description} cta="View course" />
            ))}
          </CardRail>
        </div>
      </section>

      <section data-testid="trip-specs" className="pb-[100px]">
        <SectionIntro title="Specs" />
        <div className="mt-[50px]">
          <Board
            caption="Trip specs"
            head={["Course", "Design and length", "Who can play"]}
            rows={t.courses.map((c) => [c.name, c.specs, c.access])}
          />
        </div>
        <div className="mt-[60px] px-5 md:px-10">
          <dl className="mx-auto max-w-[1100px] grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[["Course access", t.courseAccess], ["Arrival airport", t.arrivalAirport], ["Airport transfer", t.airportTransferTime], ["Non-golfers", t.nonGolferFriendly]].map(([k, v]) => v && (
              <div key={k} className="flex flex-col gap-2 border-t border-[rgba(30,57,43,0.2)] pt-4">
                <dt className="r-eyebrow text-[var(--r-ink-soft)]">{k}</dt>
                <dd className="r-body text-[14px]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Split id="trip-included" image={t.courses[1]?.photo || t.image} alt="" credit={t.courses[1]?.credit} flip>
        <div className="flex flex-col gap-3">
          <h2 className="r-title text-[22px] text-[var(--r-green)]">Included</h2>
          <ul className="r-body flex flex-col gap-1">{t.included.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="r-title text-[22px] text-[var(--r-green)]">Not included</h2>
          <ul className="r-body flex flex-col gap-1">{t.notIncluded.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </Split>
      <p data-testid="trip-illustrative" className="r-body mx-auto max-w-[640px] px-6 pb-[60px] text-center text-[13px] text-[var(--r-ink-soft)]">Illustrative only: this trip shows the kind of golf trip we plan. Every trip is designed around your group.</p>

      {t.gimReview && (
        <section data-testid="trip-review" className="px-6 py-[90px] bg-[var(--r-cream-2)]">
          <figure className="max-w-[760px] mx-auto flex flex-col items-center text-center gap-6">
            <blockquote className="r-title text-[20px] md:text-[24px] leading-[1.35] text-[var(--r-green)] normal-case">“{t.gimReview.trim()}”</blockquote>
            <figcaption className="r-eyebrow text-[var(--r-ink-soft)]">Pablo De La Mora · Founder of GOLF° IN MEXICO°, golf agent</figcaption>
          </figure>
        </section>
      )}

      <section data-testid="trip-faq" className="py-[100px] px-5 md:px-10">
        <SectionIntro title="Questions" />
        <div className="mx-auto max-w-[760px] mt-[50px] border-t border-[rgba(30,57,43,0.2)]">
          {FAQS.map(([q, a]) => (
            <details key={q} className="group border-b border-[rgba(30,57,43,0.2)] py-5">
              <summary className="r-hit cursor-pointer list-none flex justify-between gap-6 r-title text-[14px] text-[var(--r-green)]">
                {q}<span aria-hidden="true" className="transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="r-body mt-4">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section data-testid="trip-more" className="pb-[100px]">
        <SectionIntro title="Explore trips" link={<a href="/trips" className="r-link text-[var(--r-green)]">All trips</a>} />
        <div className="mt-[60px]">
          <CardRail label="More trips">
            {others.map((x) => (
              <Card key={x.slug} href={`/trips/${x.slug}`} image={x.image} eyebrow={`${x.type} · ${x.destination}`} title={x.title} cta="View trip" />
            ))}
          </CardRail>
        </div>
      </section>

      <SoftenedCall id="trip-close" image={t.image} title="Free planning until your golf trip is right.">
        <p className="r-body text-[14px]">Perks you won&apos;t get booking direct. Planned by a golf agent and a pro golfer from Mexico.</p>
        <div className="flex flex-wrap justify-center items-center gap-6 mt-2">
          <Concierge id="trip-close" className="r-btn r-btn-light" />
          <a href={`/your-trip/${t.slug}?s=1`} className="r-link">Plan my trip</a>
        </div>
      </SoftenedCall>
    </main>
  );
};

export default RTrip;
