import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSeo, breadcrumbSchema, faqSchema, videoSchema } from "@/hooks/useSeo";
import { getLandingData, landingPath } from "@/data/landings";
import { PhotoHero, TitleBlock, SectionIntro, Split, SoftenedCall, Board, Concierge } from "@/components/reverie/R";

/* The two Punta Mita pages that live under the guide (/destinations/punta-mita/pacifico-bahia and /stay-and-play), kept at
   their URLs with the same sections and copy as production (src/data/landings.js), in the Reverie system (user, 2026-11-05:
   "dejémoslo pero cambia el diseño adaptado a como hoy vive"). Facts updated to the course pages: $388 per round, no
   add-on fee before the call. The production form is replaced by the site's planning call, as on every other page. */

const rule = "border-t border-[rgba(30,57,43,0.2)] pt-4";
const join = (...p) => p.filter(Boolean).join(" ");

const Heading = ({ label, pre, em, center }) => (
  <div className={`flex flex-col gap-4 ${center ? "items-center text-center" : ""}`}>
    {label && <span className="r-eyebrow text-[var(--r-ink-soft)]">{label}</span>}
    <h2 className="r-title text-[26px] md:text-[34px] text-[var(--r-green)]">{join(pre, em)}</h2>
  </div>
);

// YouTube facade: the poster until the visitor asks for the film (no third-party request before that).
const Film = ({ video }) => {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative w-full aspect-video bg-[var(--r-green)] overflow-hidden">
      {play ? (
        <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`} title={video.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
      ) : (
        <button type="button" onClick={() => setPlay(true)} className="group absolute inset-0 w-full h-full" aria-label={`Play: ${video.title}`}>
          <img src={video.poster} alt={video.posterAlt} loading="lazy" className="w-full h-full object-cover" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="r-btn r-btn-light group-hover:opacity-90">Play the film</span>
          </span>
        </button>
      )}
    </div>
  );
};

const RHubLanding = () => {
  const { hub, slug } = useParams();
  const l = getLandingData(hub, slug);
  const path = l ? landingPath(l) : "";
  useSeo(
    l
      ? {
          title: l.seoTitle,
          description: l.seoDescription,
          canonical: path,
          image: `/og/landing-${l.slug}.jpg`,
          jsonLd: [
            breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Destinations", path: "/destinations" }, { name: l.hubName, path: `/destinations/${l.hub}` }, { name: l.name, path }]),
            ...(l.faqs ? [faqSchema(l.faqs)] : []),
            ...(l.video ? [videoSchema({ name: l.video.title, description: l.video.description, videoId: l.video.videoId, thumbnailUrl: l.video.poster, uploadDate: l.video.uploadDate, durationSec: l.video.durationSec })] : []),
          ],
        }
      : {}
  );
  if (!l) return null;
  const photos = l.sectionPhotos || [];
  const [head, ...rows] = l.specs || [];

  return (
    <main data-testid="page-hub-landing" className="bg-[var(--r-cream)] text-[var(--r-ink)]">
      <PhotoHero image={l.heroPhoto} alt={l.heroAlt} />

      {/* The answer */}
      <TitleBlock eyebrow={l.heroLabel} title={join(l.h1Pre, l.h1Em)}>
        <p className="r-body text-[16px] max-w-[700px]">{l.heroAnswer}</p>
        <p className="text-[12px] text-[var(--r-ink-soft)]">{l.byline.replace(/ · Updated .*$/, "")} · Updated November 2026</p>
        <Concierge id={`${l.slug}-hero`} className="r-btn mt-2" />
      </TitleBlock>

      {/* Pacífico vs Bahía: the specs */}
      {rows.length > 0 && (
        <section data-testid="landing-specs" className="pb-[100px]">
          <SectionIntro title={join(l.specsH2Pre, l.specsH2Em)} />
          <div className="mt-[50px]">
            <Board caption={`${head.slice(1).join(" and ")}: specifications`} head={head.map((h, i) => (i === 0 ? "" : h))} rows={rows} />
            {l.specsNote && <p className="r-body text-[12px] text-center text-[var(--r-ink-soft)] mt-5 px-6 max-w-[760px] mx-auto">{l.specsNote}</p>}
          </div>
        </section>
      )}

      {/* Pacífico vs Bahía: the difference */}
      {l.contrastParagraphs && (
        <Split id="landing-contrast" image={photos[0]?.src} alt={photos[0]?.alt} credit={photos[0]?.photoSource}>
          <Heading label={l.contrastLabel} pre={l.contrastH2Pre} em={l.contrastH2Em} />
          {l.contrastParagraphs.map((p) => <p key={p.slice(0, 30)} className="r-body">{p}</p>)}
        </Split>
      )}

      {/* Pacífico vs Bahía: the Tail of the Whale */}
      {l.calloutBody && (
        <section data-testid="landing-callout" className="px-6 py-[90px] bg-[var(--r-cream-2)]">
          <div className="max-w-[760px] mx-auto flex flex-col items-center text-center gap-5">
            <h2 className="r-title text-[24px] md:text-[28px] text-[var(--r-green)]">{l.calloutLabel}</h2>
            <p className="r-body text-[16px]">{l.calloutBody}</p>
          </div>
        </section>
      )}

      {/* Stay & Play: the film */}
      {l.video && (
        <section data-testid="landing-video" className="px-5 md:px-10 py-[100px]">
          <div className="max-w-[1100px] mx-auto flex flex-col gap-10">
            <Heading label={l.videoLabel} pre={l.videoH2Pre} em={l.videoH2Em} />
            <Film video={l.video} />
            <p className="r-body text-[14px] max-w-[700px]">{l.video.description}</p>
          </div>
        </section>
      )}

      {/* Getting on: one paragraph (Pacífico vs Bahía) or the villa route (Stay & Play) */}
      {(l.accessBody || l.accessParagraphs) && (
        <Split id="landing-access" image={(photos[1] || photos[0])?.src} alt={(photos[1] || photos[0])?.alt} credit={(photos[1] || photos[0])?.photoSource} flip>
          <Heading label={l.accessLabel} pre={l.accessH2Pre} em={l.accessH2Em} />
          {(l.accessParagraphs || [l.accessBody]).map((p) => <p key={p.slice(0, 30)} className="r-body">{p}</p>)}
        </Split>
      )}

      {/* Stay & Play: how tee times work */}
      {l.packages && (
        <section data-testid="landing-packages" className="px-5 md:px-10 py-[100px] bg-[var(--r-cream-2)]">
          <div className="max-w-[1100px] mx-auto flex flex-col gap-12">
            <Heading label={l.includedLabel} pre={l.includedH2Pre} em={l.includedH2Em} />
            <div className="grid gap-10 md:grid-cols-3">
              {l.packages.map((p) => (
                <div key={p.name} className="flex flex-col gap-3">
                  <img src={p.photo} alt={p.photoAlt} loading="lazy" className="w-full aspect-[4/3] object-cover" />
                  <h3 className="r-title text-[18px] text-[var(--r-green)] mt-2">{p.name}</h3>
                  <p className="r-body text-[14px]">{p.blurb}</p>
                  <ul className={`flex flex-col gap-1.5 r-body text-[14px] ${rule}`}>
                    {p.includes.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                  <p className={`r-title text-[14px] text-[var(--r-green)] ${rule}`}>{p.price}</p>
                  {p.priceNote && <p className="text-[12px] text-[var(--r-ink-soft)]">{p.priceNote}</p>}
                </div>
              ))}
            </div>
            {l.addOnBody && (
              <div className={`max-w-[760px] flex flex-col gap-2 ${rule}`}>
                <h3 className="r-title text-[16px] text-[var(--r-green)]">{join(l.addOnH2Pre, l.addOnH2Em)}</h3>
                <p className="r-body text-[15px]">{l.addOnBody}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Stay & Play: the format and two sample days */}
      {l.tournamentParagraphs && (
        <Split id="landing-format" image={(photos[2] || photos[0])?.src} alt={(photos[2] || photos[0])?.alt} credit={(photos[2] || photos[0])?.photoSource}>
          <Heading label={l.tournamentLabel} pre={l.tournamentH2Pre} em={l.tournamentH2Em} />
          {l.tournamentParagraphs.map((p) => <p key={p.slice(0, 30)} className="r-body">{p}</p>)}
        </Split>
      )}
      {l.itinerary && (
        <section data-testid="landing-itinerary" className="px-5 md:px-10 py-[100px]">
          <div className="max-w-[1100px] mx-auto flex flex-col gap-10">
            <Heading label={l.itineraryLabel} pre={l.itineraryH2Pre} em={l.itineraryH2Em} />
            <div className="grid gap-10 md:grid-cols-2">
              {l.itinerary.map((d) => (
                <div key={d.day} className={`flex flex-col gap-2 ${rule}`}>
                  <h3 className="r-title text-[16px] text-[var(--r-green)]">{d.day}</h3>
                  <p className="r-body text-[15px]">{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {l.honestyBody && (
        <section className="px-6 pb-[90px]">
          <div className="max-w-[760px] mx-auto flex flex-col items-center text-center gap-4">
            <span className="r-eyebrow text-[var(--r-ink-soft)]">{l.honestyLabel}</span>
            <p className="r-body text-[15px]">{l.honestyBody}</p>
          </div>
        </section>
      )}

      {/* Questions (FAQPage) */}
      {l.faqs && (
        <section id="faq" data-testid="landing-faq" className="bg-[var(--r-green)] text-[var(--r-cream)] px-6 py-[90px] md:py-[110px]">
          <div className="max-w-[760px] mx-auto flex flex-col items-center text-center gap-5">
            <h2 className="r-title text-[26px] md:text-[34px]">Your questions, answered.</h2>
            <div className="w-full mt-6 text-left border-t border-[rgba(251,249,243,0.25)]">
              {l.faqs.map(({ q, a }) => (
                <details key={q} className="group border-b border-[rgba(251,249,243,0.25)]">
                  <summary className="r-hit cursor-pointer list-none flex justify-between gap-6 py-5 r-title text-[14px]">
                    <h3>{q}</h3><span aria-hidden="true" className="transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="r-body text-[15px] pb-5 opacity-90">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {l.relatedReads && (
        <section className="px-6 py-[70px]">
          <div className="max-w-[760px] mx-auto flex flex-col gap-2 text-center r-body text-[14px]">
            {l.relatedReads.map((r) => (
              <p key={r.to}>Read next: <a href={r.to} className="underline underline-offset-2 text-[var(--r-green)]">{r.anchor}</a> — {r.note}</p>
            ))}
          </div>
        </section>
      )}

      <SoftenedCall id={`${l.slug}-close`} titleAs="p" image={photos[photos.length - 1]?.src || l.heroPhoto} title={join(l.closingH2Pre, l.closingH2Em)}>
        <p className="r-body text-[14px]">{l.closingBody}</p>
        <Concierge id={`${l.slug}-close`} className="r-btn r-btn-light mt-2" />
      </SoftenedCall>

      {l.sources && (
        <section className="px-5 md:px-10 py-16">
          <div className="max-w-[1100px] mx-auto border-t border-[rgba(30,57,43,0.15)] pt-8 flex flex-col gap-2">
            <span className="r-eyebrow text-[var(--r-ink-soft)]">Sources</span>
            <ul className="flex flex-col gap-1.5">
              {l.sources.map((s) => <li key={s} className="r-body text-[13px]">{s}</li>)}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
};

export default RHubLanding;
