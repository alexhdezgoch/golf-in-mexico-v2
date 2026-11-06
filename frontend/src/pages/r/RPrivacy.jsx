import { useSeo, breadcrumbSchema, SITE_URL, SITE_NAME } from "@/hooks/useSeo";
import { getPrivacyContent, PRIVACY_UPDATED, PRIVACY_EMAIL } from "@/data/privacy";
import { TitleBlock } from "@/components/reverie/R";
import { Jumper } from "@/pages/r/RJournal";

/* Privacy · /privacy (en) · /aviso-de-privacidad (es), set like a Journal article (2026-11-04): a centred title, then the
   text beside the jump list. Every word still comes from src/data/privacy.js; only the look changed. */
const RPrivacy = ({ locale = "en" }) => {
  const c = getPrivacyContent(locale);
  const es = locale === "es";

  useSeo({
    title: c.seoTitle,
    description: c.seoDescription,
    canonical: c.path,
    noindex: true,
    alternates: [
      { hrefLang: "en", href: "/privacy" },
      { hrefLang: "es", href: "/aviso-de-privacidad" },
      { hrefLang: "x-default", href: "/privacy" },
    ],
    jsonLd: [
      { "@context": "https://schema.org", "@type": "WebPage", name: c.seoTitle, description: c.seoDescription, url: `${SITE_URL}${c.path}`, inLanguage: es ? "es-MX" : "en-US", dateModified: PRIVACY_UPDATED, isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL } },
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: es ? "Aviso de Privacidad" : "Privacy Policy", path: c.path }]),
    ],
  });

  const toc = c.sections.map((s) => ({ id: s.id, text: s.heading }));
  const p = "r-body text-[15px] md:text-[16px] mt-5";

  return (
    <main data-testid="page-privacy" data-locale={locale} className="bg-[var(--r-cream)] text-[var(--r-ink)]">
      <TitleBlock eyebrow={c.eyebrow} title={`${c.title} ${c.titleEm}`}>
        <p data-testid="privacy-updated" className="text-[12px] text-[var(--r-ink-soft)]">
          {c.updatedLabel} · <time dateTime={PRIVACY_UPDATED}>{c.updated}</time> · <a href={c.altPath} data-testid="privacy-lang-switch" className="r-link text-[var(--r-green)]">{c.altLabel}</a>
        </p>
        <p data-testid="privacy-intro" className="r-body text-[15px] md:text-[16px] max-w-[640px]">{c.intro}</p>
      </TitleBlock>

      <div className="px-5 md:px-10 pb-[120px]">
        <div className="max-w-[1120px] mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-[80px]">
          <details className="lg:hidden mb-10 border-y border-[rgba(30,57,43,0.2)] py-4">
            <summary className="r-hit cursor-pointer list-none r-eyebrow text-[var(--r-green)] flex justify-between">{c.tocLabel} <span aria-hidden="true">+</span></summary>
            <ol className="mt-4 flex flex-col gap-2">
              {toc.map((i) => <li key={i.id}><a href={`#${i.id}`} className="text-[14px] text-[var(--r-green)]">{i.text}</a></li>)}
            </ol>
          </details>
          <article className="min-w-0 max-w-[720px]">
            {c.sections.map((s) => (
              <section key={s.id} id={s.id} data-testid={`privacy-section-${s.id}`} className="scroll-mt-28 pt-12 first:pt-0">
                <h2 className="r-title text-[20px] md:text-[24px] text-[var(--r-green)]">{s.heading}</h2>
                {s.body?.map((t, j) => <p key={j} className={p}>{t}</p>)}
                {s.list && typeof s.list[0] === "object" && (
                  <dl className="mt-5 flex flex-col gap-4">
                    {s.list.map((it) => (
                      <div key={it.term}>
                        <dt className="text-[15px] font-semibold text-[var(--r-green)]">{it.term}</dt>
                        <dd className="r-body text-[15px] mt-1">{it.def}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {s.list && typeof s.list[0] === "string" && (
                  <ul className="mt-5 flex flex-col gap-2 list-disc pl-5 marker:text-[var(--r-green)]">
                    {s.list.map((it) => <li key={it} className="r-body text-[15px]">{it}</li>)}
                  </ul>
                )}
                {s.after?.map((t, j) => <p key={j} className={p}>{t}</p>)}
              </section>
            ))}
            <p data-testid="privacy-contact-strip" className="mt-16 pt-8 border-t border-[rgba(30,57,43,0.2)] r-body text-[15px]">
              {es ? "¿Quieres ver, corregir o borrar tus datos?" : "Want to see, correct, or delete your data?"}{" "}
              <a href={`mailto:${PRIVACY_EMAIL}`} data-testid="privacy-contact-email" className="r-link text-[var(--r-green)]">{PRIVACY_EMAIL}</a>
            </p>
          </article>
          <aside className="hidden lg:block">
            <div className="sticky top-[110px]"><Jumper items={toc} label={c.tocLabel} /></div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default RPrivacy;
