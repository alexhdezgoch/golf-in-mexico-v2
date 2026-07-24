import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSeo, breadcrumbSchema, SITE_URL, SITE_NAME } from "@/hooks/useSeo";
import { getPrivacyContent, PRIVACY_UPDATED, PRIVACY_EMAIL } from "@/data/privacy";

/* ═══════════════════════════════════════════════════════════════════
   Privacy · /privacy (en) · /aviso-de-privacidad (es)
   One component, two routes. All copy lives in src/data/privacy.js so the
   English and Spanish versions cannot drift apart.
   ═══════════════════════════════════════════════════════════════════ */

const two = (n) => String(n).padStart(2, "0");

const Privacy = ({ locale = "en" }) => {
  const c = getPrivacyContent(locale);

  useSeo({
    title: c.seoTitle,
    description: c.seoDescription,
    canonical: c.path,
    // hreflang pair so the two language versions are read as alternates of each
    // other rather than as duplicate content.
    alternates: [
      { hrefLang: "en", href: "/privacy" },
      { hrefLang: "es", href: "/aviso-de-privacidad" },
      { hrefLang: "x-default", href: "/privacy" },
    ],
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: c.seoTitle,
        description: c.seoDescription,
        url: `${SITE_URL}${c.path}`,
        inLanguage: locale === "es" ? "es-MX" : "en-US",
        dateModified: PRIVACY_UPDATED,
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: locale === "es" ? "Aviso de Privacidad" : "Privacy Policy", path: c.path },
      ]),
    ],
  });

  return (
    <main
      data-testid="page-privacy"
      data-locale={locale}
      className="relative bg-[var(--c-off-white)] pb-24 md:pb-32"
    >
      {/* ─────────── HERO ─────────── */}
      <section className="pt-32 md:pt-40 pb-10 md:pb-14">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--c-gold)]">
            {c.eyebrow}
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            data-testid="privacy-h1"
            className="mt-5 font-display font-normal text-[var(--c-text)] leading-[1.05] tracking-tight text-4xl md:text-6xl lg:text-7xl max-w-[20ch]"
          >
            {c.title} <em className="italic text-[var(--c-gold)]">{c.titleEm}</em>
          </motion.h1>

          <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--c-border)] pt-6">
            <span
              data-testid="privacy-updated"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--c-text-mid)]"
            >
              {c.updatedLabel} — <time dateTime={PRIVACY_UPDATED}>{c.updated}</time>
            </span>
            <Link
              to={c.altPath}
              data-testid="privacy-lang-switch"
              className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--c-gold)] hover:text-[var(--c-green-deep)] transition-colors duration-300"
            >
              {c.altLabel}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            data-testid="privacy-intro"
            className="mt-10 font-body font-light text-[var(--c-text-mid)] text-base md:text-lg leading-[1.8] max-w-[64ch]"
          >
            {c.intro}
          </motion.p>
        </div>
      </section>

      {/* ─────────── TOC + BODY ─────────── */}
      <section className="pb-8">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16">
          {/* Sticky index — desktop only; the body reads fine without it on mobile */}
          <nav
            aria-label={c.tocLabel}
            data-testid="privacy-toc"
            className="hidden lg:block self-start sticky top-32"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--c-gold)]">
              {c.tocLabel}
            </span>
            <ol className="mt-5 flex flex-col gap-2.5">
              {c.sections.map((s, i) => (
                <li key={s.id} className="flex gap-3">
                  <span className="font-mono text-[10px] text-[var(--c-text-mid)]/50 pt-[3px]">
                    {two(i + 1)}
                  </span>
                  <a
                    href={`#${s.id}`}
                    className="font-body font-light text-[13px] leading-[1.5] text-[var(--c-text-mid)] hover:text-[var(--c-gold)] transition-colors duration-300"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-[68ch]">
            {c.sections.map((s, i) => (
              <article
                key={s.id}
                id={s.id}
                data-testid={`privacy-section-${s.id}`}
                className="scroll-mt-28 pt-10 mt-10 first:mt-0 first:pt-0 border-t first:border-t-0 border-[var(--c-border)]"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--c-gold)]">
                  {two(i + 1)}
                </span>
                <h2 className="mt-4 font-display font-normal text-[var(--c-text)] text-2xl md:text-[32px] leading-[1.2] tracking-tight">
                  {s.heading}
                </h2>

                {s.body?.map((p, j) => (
                  <p
                    key={j}
                    className="mt-5 font-body font-light text-[var(--c-text-mid)] text-[15px] md:text-base leading-[1.8]"
                  >
                    {p}
                  </p>
                ))}

                {/* Definition-style list (term + description) or a plain bullet list */}
                {s.list && typeof s.list[0] === "object" ? (
                  <dl className="mt-7 flex flex-col gap-5">
                    {s.list.map((item) => (
                      <div
                        key={item.term}
                        className="border-l-2 border-[var(--c-gold)]/35 pl-5 hover:border-[var(--c-gold)] transition-colors duration-300"
                      >
                        <dt className="font-display font-normal text-[var(--c-text)] text-base md:text-lg leading-[1.35]">
                          {item.term}
                        </dt>
                        <dd className="mt-2 font-body font-light text-[var(--c-text-mid)] text-[15px] leading-[1.75]">
                          {item.def}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}

                {s.list && typeof s.list[0] === "string" ? (
                  <ul className="mt-6 flex flex-col gap-3">
                    {s.list.map((item) => (
                      <li
                        key={item}
                        className="relative pl-6 font-body font-light text-[var(--c-text-mid)] text-[15px] leading-[1.75] before:content-['—'] before:absolute before:left-0 before:text-[var(--c-gold)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {s.after?.map((p, j) => (
                  <p
                    key={j}
                    className="mt-6 font-body font-light text-[var(--c-text)] text-[15px] md:text-base leading-[1.8]"
                  >
                    {p}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── CONTACT STRIP ─────────── */}
      <section className="pt-12 md:pt-16">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <div
            data-testid="privacy-contact-strip"
            className="bg-[var(--c-green-deep)] text-white rounded-sm p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <p className="font-display font-normal text-white text-xl md:text-2xl leading-[1.3] tracking-tight max-w-[34ch]">
              {locale === "es" ? (
                <>
                  ¿Quieres ver, corregir o <em className="italic text-[var(--c-gold)]">borrar</em> tus datos?
                </>
              ) : (
                <>
                  Want to see, correct, or <em className="italic text-[var(--c-gold)]">delete</em> your data?
                </>
              )}
            </p>
            {/* Tighter tracking on mobile keeps the address on one line at 375px */}
            <a
              href={`mailto:${PRIVACY_EMAIL}`}
              data-testid="privacy-contact-email"
              className="group shrink-0 inline-flex items-center justify-between md:justify-start gap-3 bg-[var(--c-gold)] hover:bg-[var(--c-gold-light)] text-[var(--c-green-deep)] px-6 md:px-7 py-4 rounded-sm font-mono text-[10px] md:text-[11px] uppercase tracking-[0.12em] md:tracking-[0.18em] font-bold transition-colors duration-300"
            >
              {PRIVACY_EMAIL}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Privacy;
