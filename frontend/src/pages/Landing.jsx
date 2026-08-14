import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useSeo, breadcrumbSchema, faqSchema, videoSchema } from "@/hooks/useSeo";
import { useHubspotForm } from "@/hooks/useHubspotForm";
import { trackLead, trackEvent } from "@/lib/analytics";
import { FORM_KEYS } from "@/config/hubspot";
import ConsentNotice from "@/components/ConsentNotice";
import { getLandingData, landingPath } from "@/data/landings";

/* ═══════════════════════════════════════════════════════════════════
   Landing · /destinations/:hub/:slug
   Transactional page under a destination hub. Unlike the editorial hub
   layout, every section here funnels to one form — these are the pages
   paid traffic lands on, so the CTA sits above the fold and the lead
   event fires on submit (GA4 generate_lead via trackLead).

   Content lives in data/landings.js. This file is layout only.
   ═══════════════════════════════════════════════════════════════════ */

const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: EASE },
};

/* ── Section heading: eyebrow + two-tone display headline ───────────── */
const SectionHead = ({ label, pre, em }) => (
  <motion.div {...fadeUp} className="mb-8 md:mb-12">
    {label && (
      <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[var(--c-gold)] mb-4">
        {label}
      </p>
    )}
    <h2 className="font-display font-normal text-[var(--c-text)] text-2xl md:text-4xl lg:text-[2.75rem] leading-[1.2] md:leading-[1.2] tracking-tight max-w-[24ch]">
      {pre} <em className="italic text-[var(--c-gold)]">{em}</em>
    </h2>
  </motion.div>
);

/* ── Lead form. The only conversion surface on the page. ────────────── */
const LeadForm = ({ landing, placement, dark = false }) => {
  const { submit, submitting, error, honeypotProps } = useHubspotForm(FORM_KEYS.inquiry);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const ok = await submit({
      email,
      firstname: name,
      region: landing.hubName,
      // Free-text so the sales context survives into HubSpot without a new property.
      message: `Landing: ${landing.name} · Group size: ${group || "not given"}`,
    });
    if (!ok) return;
    setSent(true);
    trackLead({
      form: FORM_KEYS.inquiry,
      placement,
      region: landing.hubName,
      landing: landing.slug,
    });
  };

  const label = dark ? "text-white/60" : "text-[var(--c-text-mid)]";
  const field = dark
    ? "bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[var(--c-gold)]"
    : "bg-white border-[var(--c-border)] text-[var(--c-text)] placeholder:text-[var(--c-text-mid)]/60 focus:border-[var(--c-gold)]";

  if (sent) {
    return (
      <div
        data-testid={`landing-form-sent-${placement}`}
        className={`rounded-sm border p-6 md:p-8 ${
          dark ? "border-white/20 bg-white/5" : "border-[var(--c-border)] bg-white"
        }`}
      >
        <p
          className={`font-display text-xl md:text-2xl leading-snug ${
            dark ? "text-white" : "text-[var(--c-text)]"
          }`}
        >
          Got it — <em className="italic text-[var(--c-gold)]">we&apos;ll be in touch.</em>
        </p>
        <p className={`mt-3 font-body font-light text-sm leading-relaxed ${label}`}>
          Pablo reads these himself and comes back inside 48 hours with a proposal, not a brochure.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      data-testid={`landing-form-${placement}`}
      className={`rounded-sm border p-6 md:p-8 ${
        dark ? "border-white/20 bg-white/5" : "border-[var(--c-border)] bg-white"
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First name"
          aria-label="First name"
          className={`w-full border rounded-sm px-4 py-3 font-body text-sm outline-none transition-colors ${field}`}
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          aria-label="Email"
          className={`w-full border rounded-sm px-4 py-3 font-body text-sm outline-none transition-colors ${field}`}
        />
      </div>
      <input
        type="text"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
        placeholder="How many players?"
        aria-label="How many players"
        className={`mt-3 md:mt-4 w-full border rounded-sm px-4 py-3 font-body text-sm outline-none transition-colors ${field}`}
      />
      {/* Spam guard — visually hidden, never filled by a human. */}
      <input {...honeypotProps} />

      <button
        type="submit"
        disabled={submitting}
        data-testid={`landing-submit-${placement}`}
        className="group mt-4 w-full inline-flex items-center justify-between gap-3 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] disabled:opacity-60 text-[var(--c-green-deep)] px-8 py-4 rounded-full font-mono text-[11px] uppercase tracking-[0.2em] font-bold transition-colors"
      >
        {submitting ? "Sending…" : landing.ctaPrimary}
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>

      {error && (
        <p className="mt-3 font-body text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <p className={`mt-4 font-body font-light text-xs leading-relaxed ${label}`}>
        {landing.ctaNote}
      </p>
      <ConsentNotice tone={dark ? "dark" : "light"} className="mt-3" testid={`landing-consent-${placement}`} />
    </form>
  );
};

/* ── Photo with a caption. Course attribution stays neutral until the
      shoot is labelled — see the FACT NOTES in data/landings.js. ────── */
const Figure = ({ photo, eager = false }) => (
  <motion.figure {...fadeUp} className="overflow-hidden">
    <div className="aspect-[3/2] overflow-hidden rounded-sm bg-[var(--c-border)]">
      <img
        src={photo.src}
        alt={photo.alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="w-full h-full object-cover"
      />
    </div>
    {(photo.caption || photo.photoSource) && (
      <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--c-text-mid)]">
        {photo.caption}
        {photo.caption && photo.photoSource && " · "}
        {photo.photoSource}
      </figcaption>
    )}
  </motion.figure>
);

/* ── Click-to-play video facade.
      A live YouTube iframe pulls ~700KB of third-party JS before the page
      settles, which on an ads landing hurts both Quality Score and the
      conversion rate it feeds. So we paint our own poster and only mount the
      iframe once someone actually asks for the video. ─────────────────── */
const VideoFacade = ({ video }) => {
  const [playing, setPlaying] = useState(false);

  const play = () => {
    setPlaying(true);
    trackEvent("video_play", { video_id: video.videoId, title: video.title });
  };

  return (
    <div className="aspect-video overflow-hidden rounded-sm bg-[var(--c-green-deep)] relative">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        />
      ) : (
        <button
          type="button"
          onClick={play}
          data-testid="landing-video-play"
          aria-label={`Play: ${video.title}`}
          className="group w-full h-full block relative"
        >
          <img
            src={video.poster}
            alt={video.posterAlt || ""}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--c-gold)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              {/* Play triangle */}
              <svg
                width="22"
                height="26"
                viewBox="0 0 22 26"
                aria-hidden="true"
                className="translate-x-[2px]"
              >
                <path d="M0 0 L22 13 L0 26 Z" fill="var(--c-green-deep)" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
};

const Landing = () => {
  const { hub, slug } = useParams();
  const landing = getLandingData(hub, slug);

  const path = landing ? landingPath(landing) : "/destinations";

  useSeo({
    title: landing?.seoTitle,
    description: landing?.seoDescription,
    canonical: path,
    jsonLd: landing
      ? [
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Destinations", path: "/destinations" },
            { name: landing.hubName, path: `/destinations/${landing.hub}` },
            { name: landing.name, path },
          ]),
          faqSchema(landing.faqs),
          ...(landing.video
            ? [
                videoSchema({
                  name: landing.video.title,
                  description: landing.video.description,
                  videoId: landing.video.videoId,
                  thumbnailUrl: landing.video.poster,
                  uploadDate: landing.video.uploadDate,
                  durationSec: landing.video.durationSec,
                }),
              ]
            : []),
        ]
      : undefined,
  });

  // Package-card CTA → glide to the closing form (lenis owns wheel scroll).
  const scrollToProposal = () => {
    const el = document.getElementById("landing-proposal");
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -60 });
    else el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (!landing) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center bg-[var(--c-off-white)]">
        <div className="text-center px-6">
          <p className="font-display text-2xl text-[var(--c-text)]">Page not found.</p>
          <Link
            to="/destinations"
            className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--c-gold)]"
          >
            Back to destinations →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      data-testid={`page-landing-${landing.slug}`}
      className="relative bg-[var(--c-off-white)] pb-24 md:pb-32"
    >
      {/* ── HERO — full-bleed photo, offer + CTA over it ──────────
            Same pattern as the destination-hub heroes: the photograph IS the
            hero, headline and form float over a scrim, so photo + answer +
            form all sit above the fold. The img is the LCP element — eager,
            high priority, and it's a <200KB local WebP. ─────────────────── */}
      <section className="relative lg:min-h-[92vh] flex items-center pt-28 md:pt-36 pb-12 md:pb-16">
        <img
          src={landing.heroPhoto}
          alt={landing.heroAlt}
          loading="eager"
          fetchpriority="high"
          decoding="async"
          data-testid="landing-hero-photo"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Scrim: heavier at the top (nav + headline legibility) and the
            bottom, lighter mid-frame so the course still reads as a photo. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/50"
        />

        <div className="relative w-full max-w-[1200px] mx-auto px-6 md:px-12">
          <nav aria-label="Breadcrumb" className="mb-6">
            <Link
              to={`/destinations/${landing.hub}`}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 hover:text-[var(--c-gold-light)] transition-colors"
            >
              ← {landing.hubName}
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[var(--c-gold-light)] mb-5"
              >
                {landing.heroLabel}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
                data-testid="landing-h1"
                className="font-display font-normal text-white leading-[1.1] md:leading-[1.1] tracking-tight text-4xl md:text-6xl max-w-[16ch]"
              >
                {landing.h1Pre} <em className="italic text-[var(--c-gold-light)]">{landing.h1Em}</em>
              </motion.h1>

              {/* Answer-first: the title question is settled in the first 50 words. */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
                data-testid="landing-answer"
                className="mt-7 md:mt-9 font-body font-light text-white/85 text-base md:text-lg leading-[1.75] max-w-[58ch]"
              >
                {landing.heroAnswer}
              </motion.p>

              {/* Byline — same editorial signature the hubs carry. */}
              {landing.byline && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
                  data-testid="landing-byline"
                  className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60"
                >
                  {landing.byline}
                </motion.p>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              className="lg:col-span-5 w-full backdrop-blur-md rounded-sm"
            >
              <LeadForm landing={landing} placement="hero" dark />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SPECS TABLE (comparison landings) ─────────────────────── */}
      {landing.specs && (
        <section className="py-12 md:py-20 border-t border-[var(--c-border)]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12">
            <SectionHead label={landing.specsLabel} pre={landing.specsH2Pre} em={landing.specsH2Em} />
            <motion.div {...fadeUp} className="overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse" data-testid="landing-specs">
                <tbody>
                  {landing.specs.map((row, i) => (
                    <tr
                      key={row[0] || i}
                      className={
                        i === 0
                          ? "border-b border-[var(--c-text)]/20"
                          : "border-b border-[var(--c-border)]"
                      }
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={[
                            "py-4 pr-6 align-top",
                            j === 0
                              ? "font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--c-text-mid)] w-[34%]"
                              : "font-body font-light text-sm md:text-base text-[var(--c-text)]",
                            i === 0 && j > 0
                              ? "font-display text-base md:text-lg text-[var(--c-gold)]"
                              : "",
                          ].join(" ")}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
            {landing.specsNote && (
              <motion.p
                {...fadeUp}
                className="mt-6 font-body font-light text-sm leading-relaxed text-[var(--c-text-mid)] max-w-[70ch]"
              >
                {landing.specsNote}
              </motion.p>
            )}
          </div>
        </section>
      )}

      {/* ── PROSE BLOCK (contrast / access) ───────────────────────── */}
      {(landing.contrastParagraphs || landing.accessParagraphs) && (
        <section className="py-12 md:py-20 border-t border-[var(--c-border)]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12">
            <SectionHead
              label={landing.contrastLabel || landing.accessLabel}
              pre={landing.contrastH2Pre || landing.accessH2Pre}
              em={landing.contrastH2Em || landing.accessH2Em}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {(landing.contrastParagraphs || landing.accessParagraphs).map((p, i) => (
                <motion.p
                  key={i}
                  {...fadeUp}
                  className="font-body font-light text-[var(--c-text-mid)] text-base leading-[1.8]"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PHOTOS ────────────────────────────────────────────────── */}
      {landing.sectionPhotos && (
        <section className="py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {landing.sectionPhotos.map((p) => (
              <Figure key={p.src} photo={p} />
            ))}
          </div>
        </section>
      )}

      {/* ── CALLOUT (the one hole / the honest caveat) ────────────── */}
      {landing.calloutBody && (
        <section className="py-10 md:py-16">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12">
            <motion.div
              {...fadeUp}
              data-testid="landing-callout"
              className="bg-[var(--c-green-deep)] text-white rounded-sm p-8 md:p-12"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--c-gold)] mb-4">
                {landing.calloutLabel}
              </p>
              <p className="font-body font-light text-white/85 text-base md:text-lg leading-[1.8] max-w-[70ch]">
                {landing.calloutBody}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── FILM ─────────────────────────────────────────────────── */}
      {landing.video && (
        <section className="py-12 md:py-20 border-t border-[var(--c-border)]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12">
            <SectionHead label={landing.videoLabel} pre={landing.videoH2Pre} em={landing.videoH2Em} />
            <motion.div {...fadeUp}>
              <VideoFacade video={landing.video} />
            </motion.div>
          </div>
        </section>
      )}

      {/* ── PACKAGES — Preserve-style trip cards on the dark ground ──
            Pablo's named reference (preservegolfjapan.com/premium-tour):
            photo → name → one-liner → ✓ inclusions → price line → pill CTA,
            in GIM's palette (deep green, not black; gold, not white). ───── */}
      {landing.packages && (
        <section className="py-14 md:py-24 bg-[var(--c-green-deep)]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <motion.div {...fadeUp} className="mb-10 md:mb-14">
              <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[var(--c-gold-light)] mb-4">
                {landing.includedLabel}
              </p>
              <h2 className="font-display font-normal text-white text-2xl md:text-4xl lg:text-[2.75rem] leading-[1.2] md:leading-[1.2] tracking-tight max-w-[24ch]">
                {landing.includedH2Pre}{" "}
                <em className="italic text-[var(--c-gold-light)]">{landing.includedH2Em}</em>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" data-testid="landing-packages">
              {landing.packages.map((pkg) => (
                <motion.article
                  key={pkg.name}
                  {...fadeUp}
                  className="flex flex-col bg-white/[0.04] border border-white/10 rounded-sm overflow-hidden"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={pkg.photo}
                      alt={pkg.photoAlt || ""}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-6 md:p-7">
                    <h3 className="font-display text-white text-xl md:text-2xl mb-2">{pkg.name}</h3>
                    <p className="font-body font-light text-white/70 text-sm leading-[1.7] mb-5">
                      {pkg.blurb}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {pkg.includes.map((item) => (
                        <li key={item} className="flex gap-2.5 font-body font-light text-white/85 text-sm leading-snug">
                          <span aria-hidden="true" className="text-[var(--c-gold)] shrink-0">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--c-gold-light)]">
                        {pkg.price}
                      </p>
                      {pkg.priceNote && (
                        <p className="mt-1 font-body font-light text-white/50 text-xs">{pkg.priceNote}</p>
                      )}
                      <button
                        type="button"
                        onClick={scrollToProposal}
                        className="mt-5 w-full inline-flex items-center justify-center border border-white/30 hover:border-[var(--c-gold)] hover:text-[var(--c-gold-light)] text-white px-6 py-3.5 rounded-full font-mono text-[11px] uppercase tracking-[0.2em] transition-colors"
                      >
                        Request this trip
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ADD-ONS ──────────────────────────────────────────────── */}
      {landing.addOnBody && (
        <section className="py-12 md:py-16">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12">
            <SectionHead label={landing.addOnLabel} pre={landing.addOnH2Pre} em={landing.addOnH2Em} />
            <motion.p
              {...fadeUp}
              className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.8] max-w-[70ch]"
            >
              {landing.addOnBody}
            </motion.p>
          </div>
        </section>
      )}

      {/* ── THE FORMAT ───────────────────────────────────────────── */}
      {landing.tournamentParagraphs && (
        <section className="py-12 md:py-20 border-t border-[var(--c-border)]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12">
            <SectionHead
              label={landing.tournamentLabel}
              pre={landing.tournamentH2Pre}
              em={landing.tournamentH2Em}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {landing.tournamentParagraphs.map((p, i) => (
                <motion.p
                  key={i}
                  {...fadeUp}
                  className="font-body font-light text-[var(--c-text-mid)] text-base leading-[1.8]"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ITINERARY ────────────────────────────────────────────── */}
      {landing.itinerary && (
        <section className="py-12 md:py-20 border-t border-[var(--c-border)]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12">
            <SectionHead
              label={landing.itineraryLabel}
              pre={landing.itineraryH2Pre}
              em={landing.itineraryH2Em}
            />
            <div className="space-y-8">
              {landing.itinerary.map((d) => (
                <motion.div
                  key={d.day}
                  {...fadeUp}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 border-t border-[var(--c-border)] pt-6"
                >
                  <p className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--c-gold)]">
                    {d.day}
                  </p>
                  <p className="md:col-span-9 font-body font-light text-[var(--c-text-mid)] text-base leading-[1.8]">
                    {d.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ACCESS (prose, comparison landing) ───────────────────── */}
      {landing.accessBody && (
        <section className="py-12 md:py-20 border-t border-[var(--c-border)]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12">
            <SectionHead label={landing.accessLabel} pre={landing.accessH2Pre} em={landing.accessH2Em} />
            <motion.p
              {...fadeUp}
              className="font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.8] max-w-[72ch]"
            >
              {landing.accessBody}
            </motion.p>
          </div>
        </section>
      )}

      {/* ── HONESTY BLOCK ────────────────────────────────────────── */}
      {landing.honestyBody && (
        <section className="py-10 md:py-16">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12">
            <motion.div
              {...fadeUp}
              className="border-l-2 border-[var(--c-gold)] pl-6 md:pl-8 max-w-[72ch]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--c-gold)] mb-3">
                {landing.honestyLabel}
              </p>
              <p className="font-body font-light text-[var(--c-text-mid)] text-base leading-[1.8]">
                {landing.honestyBody}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 border-t border-[var(--c-border)]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <SectionHead label="Questions" pre="What golfers" em="actually ask." />
          <div data-testid="landing-faqs">
            {landing.faqs.map((f) => (
              <motion.div key={f.q} {...fadeUp} className="border-t border-[var(--c-border)] py-6">
                <h3 className="font-display text-lg md:text-xl text-[var(--c-text)] mb-3 max-w-[60ch]">
                  {f.q}
                </h3>
                <p className="font-body font-light text-[var(--c-text-mid)] text-base leading-[1.8] max-w-[72ch]">
                  {f.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────── */}
      <section id="landing-proposal" className="py-12 md:py-20">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <motion.div
            {...fadeUp}
            className="bg-[var(--c-green-deep)] rounded-sm p-8 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center"
          >
            <div>
              <h2 className="font-display font-normal text-white text-2xl md:text-4xl leading-[1.2] md:leading-[1.2] tracking-tight">
                {landing.closingH2Pre}{" "}
                <em className="italic text-[var(--c-gold)]">{landing.closingH2Em}</em>
              </h2>
              <p className="mt-6 font-body font-light text-white/75 text-base leading-[1.8] max-w-[52ch]">
                {landing.closingBody}
              </p>
            </div>
            <LeadForm landing={landing} placement="closing" dark />
          </motion.div>
        </div>
      </section>

      {/* ── SOURCES — same convention as the destination hubs ────── */}
      {landing.sources && (
        <section className="pb-12 md:pb-16">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--c-gold)] mb-4">
              Sources
            </p>
            <ul data-testid="landing-sources" className="space-y-1.5">
              {landing.sources.map((s) => (
                <li
                  key={s}
                  className="font-body font-light text-[13px] leading-relaxed text-[var(--c-text-mid)]"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── READ NEXT ────────────────────────────────────────────── */}
      {landing.relatedReads && (
        <section className="pb-4">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--c-gold)] mb-6">
              Read next
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {landing.relatedReads.map((r) => (
                <Link
                  key={r.to}
                  to={r.to}
                  className="group border-t border-[var(--c-border)] pt-5 block"
                >
                  <p className="font-display text-lg md:text-xl text-[var(--c-text)] group-hover:text-[var(--c-gold)] transition-colors">
                    {r.anchor}{" "}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </p>
                  <p className="mt-2 font-body font-light text-sm text-[var(--c-text-mid)] leading-relaxed">
                    {r.note}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Landing;
