import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSeo, breadcrumbSchema } from "@/hooks/useSeo";
import siteCourses from "@/data/siteCourses.json";
import trips from "@/data/rtrips.json";
import COURSES from "@/data/rcaboCourses.json";
import { ARTICLES } from "@/data/articles";
import { SCORECARDS } from "@/data/rcabo";
import { PhotoHero, TitleBlock, SectionIntro, CardRail, Card, Split, Sources, Concierge } from "@/components/reverie/R";

/* Course page in the Reverie system. Since the Los Cabos guide was cut to one line per course (2026-11-03,
   proof-seo-los-cabos.md), the course's own page carries its long text: the production one-line description, the note
   the guide used to publish and its standout hole (rcaboCourses.json, built from the v2 catalog, rcaboGuide.js and
   hubs.js). Headings speak only of this course, so the page owns "<course> golf / green fees / rates" and the guide keeps
   "golf in Cabo". The official scorecard, when there is one, is set as a Masters board. */
const sum = (a) => a.reduce((x, y) => x + y, 0);

const Scorecard = ({ card }) => {
  const [tee, setTee] = useState(0);
  const holes = Array.from({ length: 18 }, (_, i) => i);
  const cell = "border border-[#ddd8c8] px-1.5 py-2 text-center tabular-nums";
  const row = (label, vals, cls = "", color) => (
    <tr className={cls}>
      <th scope="row" className="border border-[#ddd8c8] px-3 py-2 text-left whitespace-nowrap">
        <span className="inline-flex items-center gap-2 r-title text-[12px]">
          {color && <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />}
          {label}
        </span>
      </th>
      {holes.slice(0, 9).map((h) => <td key={h} className={cell}>{vals[h]}</td>)}
      <td className={`${cell} font-bold bg-[#f4f1e6]`}>{sum(vals.slice(0, 9))}</td>
      {holes.slice(9).map((h) => <td key={h} className={cell}>{vals[h]}</td>)}
      <td className={`${cell} font-bold bg-[#f4f1e6]`}>{sum(vals.slice(9))}</td>
      <td className={`${cell} font-bold bg-[#efeadb]`}>{sum(vals)}</td>
    </tr>
  );
  const t = card.tees[tee];
  return (
    <div className="px-5 md:px-10">
      <div className="mx-auto max-w-[1240px] flex flex-wrap justify-center gap-2 mb-6" role="group" aria-label="Tee">
        {card.tees.map((x, i) => (
          <button key={x.name} type="button" onClick={() => setTee(i)} aria-pressed={tee === i} className={`px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] ${tee === i ? "bg-[var(--r-green)] text-[var(--r-cream)]" : "bg-white text-[var(--r-green)] hover:bg-[var(--r-cream-2)]"}`}>
            {x.name}
          </button>
        ))}
      </div>
      <div className="mx-auto max-w-[1240px] overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse bg-white text-[var(--r-green)] text-[13px] font-semibold border-[10px] border-[#e8e4d6]">
          <caption className="sr-only">Official scorecard</caption>
          <thead>
            <tr className="bg-[var(--r-green)] text-[var(--r-cream)]">
              <th scope="col" className="px-3 py-2 text-left r-title text-[12px]">Hole</th>
              {holes.slice(0, 9).map((h) => <th key={h} scope="col" className="px-1.5 py-2 text-center">{h + 1}</th>)}
              <th scope="col" className="px-1.5 py-2 text-center r-title text-[11px]">Out</th>
              {holes.slice(9).map((h) => <th key={h} scope="col" className="px-1.5 py-2 text-center">{h + 1}</th>)}
              <th scope="col" className="px-1.5 py-2 text-center r-title text-[11px]">In</th>
              <th scope="col" className="px-1.5 py-2 text-center r-title text-[11px]">Tot</th>
            </tr>
          </thead>
          <tbody>
            {row(t.name, t.yards, "", t.color)}
            {row("Par", card.par, "bg-[#faf8f1] text-[#a3352b]")}
          </tbody>
        </table>
      </div>
      <div className="mx-auto max-w-[640px] mt-10 overflow-x-auto">
        <table className="w-full border-collapse bg-white text-[var(--r-green)] text-[13px] border-[10px] border-[#e8e4d6]">
          <caption className="sr-only">Tees, ratings and slopes</caption>
          <thead>
            <tr>
              {["Tee", "Yards", "Par", "Rating", "Slope"].map((h, i) => (
                <th key={h} scope="col" className={`border border-[#ddd8c8] px-3 py-2 r-title text-[11px] ${i ? "text-center" : "text-left"}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {card.tees.map((x) => (
              <tr key={x.name} className={x.name === t.name ? "bg-[#f4f1e6]" : ""}>
                <th scope="row" className="border border-[#ddd8c8] px-3 py-2 text-left">
                  <span className="inline-flex items-center gap-2 font-semibold"><span aria-hidden="true" className="w-2.5 h-2.5 rounded-full" style={{ background: x.color }} />{x.name}</span>
                </th>
                <td className="border border-[#ddd8c8] px-3 py-2 text-center tabular-nums font-semibold">{sum(x.yards).toLocaleString("en-US")}</td>
                <td className="border border-[#ddd8c8] px-3 py-2 text-center tabular-nums font-semibold">{sum(card.par)}</td>
                <td className="border border-[#ddd8c8] px-3 py-2 text-center tabular-nums font-semibold">{x.rating}</td>
                <td className="border border-[#ddd8c8] px-3 py-2 text-center tabular-nums font-semibold">{x.slope}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


const RCourse = ({ slug: forced }) => {
  const params = useParams();
  const slug = forced || params.slug;
  const s = siteCourses.courses.find((c) => c.slug === slug);
  const d = COURSES[slug];
  const card = SCORECARDS[slug];
  const name = d?.name || s?.name;
  const key = (name || "").replace(/ (Golf|Course|Club|Links).*$/, "");
  const withCourse = trips.filter((t) => t.courses.some((c) => c.name.startsWith(key)));
  const story = ARTICLES.find((a) => (a.body || []).some((b) => (b.text || "").includes(key)));
  const siblings = siteCourses.courses.filter((c) => c.region === s?.region && c.slug !== slug);
  const title = name && /cabos/i.test(name) ? `${name}: Green Fee & Access | GOLF° IN MEXICO°` : `${name}, ${s?.place}: Green Fee & Access | GOLF° IN MEXICO°`;

  useSeo({
    title,
    description: d ? `${name}, ${s.place}: ${d.lead} Green fee, who can play and how to book a tee time.` : "",
    canonical: s?.href || "/courses",
    jsonLd: [breadcrumbSchema([{ name: "Home", path: "/" }, { name: s?.place || "Los Cabos", path: "/destinations/los-cabos" }, { name: name || "Course", path: s?.href || "/courses" }])],
  });
  if (!s || !d) return null;
  const par = card ? sum(card.par) : null;
  const yards = card ? sum(card.tees[0].yards).toLocaleString("en-US") : null;

  return (
    <main data-testid="page-course" className="bg-[var(--r-cream)] text-[var(--r-ink)]">
      <PhotoHero image={s.photo?.src} alt={name}>
        {s.photo?.credit && <span className="absolute left-4 bottom-4 text-[11px] text-white/85 bg-black/30 px-2 py-1">Photo: {s.photo.credit}</span>}
      </PhotoHero>

      <TitleBlock
        eyebrow={`${s.place} · Course`}
        title={name}
        facts={[
          ["Design", card ? `${card.designer} · Par ${par} · ${yards} yds` : d.specs],
          ["Green fee", d.fee],
          ["Who can play", d.access],
        ]}
      >
        <p className="r-body text-[16px] max-w-[640px]">{d.lead}</p>
        {d.rank && <p className="text-[12px] text-[var(--r-ink-soft)]">No. {d.rank} in Mexico, Golf Digest, June 2026</p>}
      </TitleBlock>

      {(d.note || d.standout) && (
        <Split id="course-about" image={s.photo?.src} alt={name} credit={s.photo?.credit}>
          <h2 className="r-title text-[24px] md:text-[28px] text-[var(--r-green)]">The course</h2>
          {d.note && <p className="r-body">{d.note}</p>}
          {d.standout && (
            <div className="border-l-2 border-[var(--r-green)] pl-4 flex flex-col gap-1">
              <span className="r-eyebrow text-[var(--r-ink-soft)]">Standout</span>
              <p className="r-body text-[var(--r-green)]">{d.standout}</p>
            </div>
          )}
        </Split>
      )}

      {card && (
        <section data-testid="course-scorecard" className="pb-[100px]">
          <SectionIntro title={`${name} scorecard`}>Official scorecard{card.opened ? `, opened ${card.opened}` : ""}.</SectionIntro>
          <div className="mt-[50px]"><Scorecard card={card} /></div>
        </section>
      )}

      <Split id="course-plan" image="/images/los-cabos/hero-dune-swing.webp" alt="A golfer in the Los Cabos dunes" flip>
        <h2 className="r-title text-[24px] md:text-[28px] text-[var(--r-green)]">The tee time is 10% of the trip</h2>
        <p className="r-body"><span className="font-medium text-[var(--r-green)]">Green fee.</span> {d.fee}. Set by the club and subject to change; the rate for your date is confirmed in writing before you book.</p>
        {card?.address && <p className="r-body"><span className="font-medium text-[var(--r-green)]">Address.</span> {card.address}</p>}
        <div className="flex flex-wrap items-center gap-6 mt-2">
          <Concierge id="course-plan" />
          <a href={`/trip-builder?place=${encodeURIComponent(s.region || "")}`} className="r-link text-[var(--r-green)]">Plan my trip</a>
        </div>
      </Split>

      {withCourse.length > 0 && (
        <section data-testid="course-trips" className="py-[100px] bg-[var(--r-cream-2)]">
          <SectionIntro as="p" title="Explore trips" link={<a href="/trips" className="r-link text-[var(--r-green)]">All trips</a>} />
          <div className="mt-[60px]">
            <CardRail label="Trips with this course">
              {withCourse.map((t) => <Card key={t.slug} titleAs="span" href={`/trips/${t.slug}`} image={t.image} eyebrow={t.type} title={t.title} cta="View trip" />)}
              {story && <Card titleAs="span" href={`/journal/${story.slug}`} image={story.heroImage} eyebrow="Journal" title={story.title} cta="Read more" />}
            </CardRail>
          </div>
        </section>
      )}

      <section data-testid="course-more" className="py-[100px]">
        <SectionIntro as="p" title="More courses in Los Cabos" link={<a href="/destinations/los-cabos" className="r-link text-[var(--r-green)]">Golf in Los Cabos</a>} />
        <div className="mt-[60px]">
          <CardRail label="More courses in Los Cabos">
            {siblings.map((c) => <Card key={c.slug} titleAs="span" href={c.href} image={c.photo?.src} credit={c.photo?.credit} eyebrow={COURSES[c.slug]?.fee} title={COURSES[c.slug]?.name || c.name} cta="View course" />)}
          </CardRail>
        </div>
      </section>

      {card && <Sources items={card.sources} />}
    </main>
  );
};

export default RCourse;
