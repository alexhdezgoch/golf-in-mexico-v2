import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSeo, breadcrumbSchema, articleSchema, faqSchema } from "@/hooks/useSeo";
import { GuideVoices, voicesSchema } from "@/components/reverie/GuideVoices";
import trips from "@/data/rtrips.json";
import { shortGuide, TRIP_PLACES } from "@/data/rguides";
import { GUIDE_AUTHORS } from "@/data/authors";
import { DESTINATIONS } from "@/data/siteNav";
import { trackLead } from "@/lib/analytics";
import { useHubspotForm } from "@/hooks/useHubspotForm";
import { FORM_KEYS } from "@/config/hubspot";
import ConsentNotice from "@/components/ConsentNotice";
import { GuideOverview, GuideCosts, GuideLogistics } from "@/components/reverie/GuideDepth";
import { PhotoHero, TitleBlock, SectionIntro, CardRail, Card, Split, SoftenedCall, Board, Concierge } from "@/components/reverie/R";

/* The same photos each guide uses on the live site (its destination picture, then its photo slider), 2026-11-04. Back to the
   production photos on 2026-11-05 (the user: the published site's photos were curated by the team). */
const GUIDE_PHOTOS = {
  "punta-mita": ["/images/0wmultbm-dji-0048.webp", "/images/jdd69nak-punta-mita-drone.webp", "/images/uibfbgsu-punta-mita.webp"],
  "mexico-city": ["/images/g6r7fp45-golfinmexico-062.webp", "/images/duzvawrv-img-3845.webp", "/images/7240pgi5-screenshot-2026-06-10-at-1-53-33-p-m.webp"],
  "cancun-riviera-maya": ["/images/xg8drvr6-img-3947.webp", "/images/e9jy3mtt-6d0178a2-8a06-4752-bbe4-3ae6b5a70413-1-105-c.webp", "/images/newnok86-b9ce778b-517c-4a10-8f13-e5b8156efb2c-1-105-c.webp"],
  "puerto-vallarta": ["/images/gyf4bofm-d104455e-21a3-4a8e-8a51-72fdb3b5b227-1-105-c.webp", "/images/3z3gpvuk-81f3f231-303b-42ae-969b-440d82c25c70-1-105-c.webp", "/images/jbqxmvek-b9218c30-f95e-41c2-a24a-a9867eb4de7c-1-105-c.webp"],
  "unique-destinations": ["/images/dhz92vfa-golfinmexico-001-2.webp"],
};

/* The short destination guide (2026-11-03), the Los Cabos layout for every other guide: the answer with three facts, the
   course table with each name linked to its page, which courses can I play, which is best, when to play, the questions,
   then trips and the call. Data: src/data/rguides.js (the published guide plus the approved rules). Course names are never
   headings here, and "trip" or "packages" never title a section, so the course pages and golf packages pages keep theirs. */

const Newsletter = ({ id, region, title, body }) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { submit, submitting, error, honeypotProps } = useHubspotForm(FORM_KEYS.hub_playbook);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!(await submit({ email, region }))) return;
    setSent(true);
    trackLead({ form: FORM_KEYS.hub_playbook, placement: id, region });
  };
  return (
    <section data-testid={id} className="px-5 md:px-10 py-[70px] bg-[var(--r-cream-2)]">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="max-w-[520px] flex flex-col gap-3">
          <p className="r-title text-[20px] md:text-[22px] text-[var(--r-green)]">{title}</p>
          <p className="r-body text-[14px]">{body}</p>
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

const RGuide = ({ slug: forced }) => {
  const params = useParams();
  const slug = forced || params.slug;
  const g = shortGuide(slug);
  const photos = GUIDE_PHOTOS[slug] || [];
  const dest = DESTINATIONS.find((d) => d.to === `/destinations/${slug}`);
  useSeo(
    g
      ? {
          title: g.seoTitle,
          description: g.seoDescription,
          canonical: `/destinations/${slug}`,
          image: `/og/guide-${slug}.jpg`,
          jsonLd: [
            articleSchema({ headline: g.seoTitle.replace(/ \| GOLF° IN MEXICO°$/, ""), description: g.answer, path: `/destinations/${slug}`, image: g.heroPhoto || dest?.image, authors: GUIDE_AUTHORS, datePublished: "2026-05-01", dateModified: "2026-11-03" }),
            breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Destinations", path: "/destinations" }, { name: g.name, path: `/destinations/${slug}` }]),
            ...(g.faqs.length ? [faqSchema(g.faqs.map(([q, a]) => ({ q, a })))] : []),
            ...voicesSchema(slug),
          ],
        }
      : {}
  );
  if (!g) return null;
  const linked = g.courses.filter((c) => c.page);
  const unlinked = g.courses.filter((c) => !c.page && c.note);
  const places = TRIP_PLACES[slug] || [];
  const here = trips.filter((t) => places.includes(t.destination));
  const link = (c) => (c.page ? <a href={c.page.href} className="underline underline-offset-2 hover:opacity-70">{c.name}</a> : c.name);
  const unique = slug === "unique-destinations";

  return (
    <main data-testid="page-guide" className="bg-[var(--r-cream)] text-[var(--r-ink)]">
      <PhotoHero image={photos[0] || g.heroPhoto || dest?.image} alt={`Golf in ${g.name}`} />

      {/* 1 · The answer, with three facts */}
      <TitleBlock eyebrow={`Destination guide · ${g.name}`} title={g.title} facts={g.facts}>
        <p className="r-body text-[16px] max-w-[700px]">{g.answer}</p>
        {g.byline && <p className="text-[12px] text-[var(--r-ink-soft)]">{g.byline} · Updated November 2026</p>}
      </TitleBlock>

      {/* 1b · The agent and the player (2026-11-05) */}
      <GuideVoices slug={slug} />

      {/* 2 · The courses: one line each, every name linked to its own page */}
      <section id="courses" data-testid="guide-courses" className="pb-[100px] scroll-mt-24">
        <SectionIntro title={`${g.name} golf courses, green fees and access`} />
        <div className="mt-[50px]">
          <Board
            caption={`${g.name} golf courses: design, who can play, green fee and professional tournaments hosted`}
            head={unique ? ["Course", "Where", "Design", "Who can play", "Green fee"] : ["Course", "Design", "Who can play", "Green fee", "Tour venue"]}
            rows={g.courses.map((c) => (unique ? [link(c), c.place, c.design, c.access, c.fee] : [link(c), c.design, c.access, c.fee, c.tournament === "—" ? "—" : "Yes"]))}
            wide
          />
          <p className="r-body text-[12px] text-center text-[var(--r-ink-soft)] mt-5 px-6">Green fees as of 2026, confirmed in writing before you book.</p>
        </div>
        {unlinked.length > 0 && (
          <div className="mt-12 px-5 md:px-10">
            <dl className="mx-auto max-w-[1100px] grid gap-8 md:grid-cols-2">
              {unlinked.map((c) => (
                <div key={c.name} className="flex flex-col gap-2 border-t border-[rgba(30,57,43,0.2)] pt-4">
                  <dt className="r-title text-[14px] text-[var(--r-green)]">{c.name}</dt>
                  <dd className="r-body text-[14px]">{c.note}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        {linked.length > 0 && (
          <div className="mt-[70px]">
            <CardRail label={`${g.name} course pages`}>
              {linked.map((c) => <Card key={c.slug} titleAs="span" href={c.page.href} image={c.page.photo?.src} credit={c.page.photo?.credit} eyebrow={unique ? c.place : c.design} title={c.page.name} cta="View course" />)}
            </CardRail>
          </div>
        )}
      </section>

      {/* 3 · Which can I play? */}
      {g.groups.length > 1 && (
        <section data-testid="guide-access" className="py-[100px] bg-[var(--r-cream-2)] px-5 md:px-10">
          <SectionIntro title="Which courses can I play?">{g.access.length > 0 && g.access.map((p) => <p key={p.slice(0, 20)} className="mt-3 first:mt-0">{p}</p>)}</SectionIntro>
          <div className={`mt-[50px] mx-auto max-w-[1100px] grid gap-10 ${g.groups.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
            {g.groups.map(([k, list]) => (
              <div key={k} className="flex flex-col gap-3 border-t-2 border-[var(--r-green)] pt-5">
                <h3 className="r-title text-[16px] text-[var(--r-green)]">{k}</h3>
                <ul className="flex flex-col gap-1.5 r-body text-[15px] text-[var(--r-green)]">{list.map((c) => <li key={c.name}>{link(c)}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3b · The production guide's overview and what moves the price (2026-11-05) */}
      <GuideOverview {...g.overview} />
      <GuideCosts {...g.costs} link={g.costs.packages && <a href={g.costs.packages} className="r-link self-start text-[var(--r-green)]">{g.name} golf packages</a>} />

      {/* 4 · Tournament venues, then the guide's own answer on the best course */}
      {g.hosts.length > 0 && (
        <Split id="guide-tournaments" image={photos[1] || dest?.image || g.heroPhoto} alt={`A golf course in ${g.name}`} flip>
          <h2 className="r-title text-[24px] md:text-[28px] text-[var(--r-green)]">Which courses have hosted professional tournaments?</h2>
          <ul className="flex flex-col gap-4 border-t border-[rgba(30,57,43,0.2)] pt-4">
            {g.hosts.map((c) => (
              <li key={c.name} className="flex flex-col gap-1">
                <span className="r-title text-[14px] text-[var(--r-green)]">{link(c)}</span>
                <span className="r-body text-[14px]">{c.tournament}</span>
              </li>
            ))}
          </ul>
        </Split>
      )}
      {g.best && (
        <section data-testid="guide-best" className="px-6 py-[90px] bg-[var(--r-cream-2)]">
          <div className="max-w-[760px] mx-auto flex flex-col items-center text-center gap-5">
            <h2 className="r-title text-[24px] md:text-[28px] text-[var(--r-green)]">Which is the best course in {g.name}?</h2>
            <p className="r-body text-[16px]">{g.best}</p>
          </div>
        </section>
      )}

      {/* 5 · When to play */}
      {g.seasons.length > 0 && (
        <section id="season" data-testid="guide-season" className="py-[100px] scroll-mt-24">
          <SectionIntro title="When to play." />
          <div className="mt-[50px] px-5 md:px-10 mx-auto max-w-[1100px] grid gap-8 md:grid-cols-3">
            {g.seasons.map(([t, sub, b]) => (
              <div key={t} className="flex flex-col gap-2 border-t border-[rgba(30,57,43,0.2)] pt-4">
                <h3 className="r-title text-[17px] text-[var(--r-green)]">{t}</h3>
                <span className="text-[12px] font-semibold text-[var(--r-ink-soft)]">{sub}</span>
                <p className="r-body text-[14px]">{b}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5b · Getting there (production guide, 2026-11-05) */}
      <GuideLogistics {...g.logistics} />

      {/* 6 · Questions (FAQPage) */}
      {g.faqs.length > 0 && (
        <section id="faq" data-testid="guide-faq" className="bg-[var(--r-green)] text-[var(--r-cream)] px-6 py-[90px] md:py-[110px]">
          <div className="max-w-[760px] mx-auto flex flex-col items-center text-center gap-5">
            <h2 className="r-title text-[26px] md:text-[34px]">Your questions, answered.</h2>
            <div className="w-full mt-6 text-left border-t border-[rgba(251,249,243,0.25)]">
              {g.faqs.map(([q, a, more]) => (
                <details key={q} className="group border-b border-[rgba(251,249,243,0.25)]">
                  <summary className="cursor-pointer list-none flex justify-between gap-6 py-5 r-title text-[14px]">
                    <h3>{q}</h3><span aria-hidden="true" className="transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="r-body text-[15px] pb-5 opacity-90">{a}{more && <> Full trip budgets: <a href={more.href} className="underline underline-offset-2">{more.label}</a>.</>}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7 · Where to go next: links only */}
      {here.length > 0 && (
        <section data-testid="guide-next" className="py-[100px]">
          <SectionIntro as="p" title="Explore trips" link={<a href="/trips" className="r-link text-[var(--r-green)]">All trips</a>} />
          <div className="mt-[60px]">
            <CardRail label={`${g.name} trips`}>
              {here.map((t) => <Card key={t.slug} titleAs="span" href={`/trips/${t.slug}`} image={t.photo || t.image} credit={t.photo ? t.photoCredit : undefined} eyebrow={t.type} title={t.title} cta="View trip" />)}
            </CardRail>
          </div>
        </section>
      )}

      {g.newsletter && <Newsletter id="guide-loop" region={slug} title={g.newsletterTitle} body={g.newsletter} />}

      {g.readNext.length > 0 && (
        <section className="px-6 py-[70px]">
          <div className="max-w-[760px] mx-auto flex flex-col gap-2 text-center r-body text-[14px]">
            {g.readNext.map(([to, anchor, note]) => (
              <p key={to}>Read next: <a href={to} className="underline underline-offset-2 text-[var(--r-green)]">{anchor}</a> — {note}</p>
            ))}
          </div>
        </section>
      )}

      <SoftenedCall id="guide-close" titleAs="p" image={photos[2] || dest?.image || g.heroPhoto} title="Free planning until your golf trip is right.">
        <p className="r-body text-[14px]">Perks you won&apos;t get booking direct. Planned by a golf agent and a pro golfer from Mexico.</p>
        <Concierge id="guide-close" className="r-btn r-btn-light mt-2" />
      </SoftenedCall>

      {g.sources.length > 0 && (
        <section className="px-5 md:px-10 py-16">
          <div className="max-w-[1100px] mx-auto border-t border-[rgba(30,57,43,0.15)] pt-8 flex flex-col gap-2">
            <span className="r-eyebrow text-[var(--r-ink-soft)]">Sources</span>
            <ul className="flex flex-col gap-1.5">
              {g.sources.map((s) => <li key={s} className="r-body text-[13px]">{s}</li>)}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
};

export default RGuide;
