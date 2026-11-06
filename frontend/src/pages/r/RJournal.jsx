import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSeo, breadcrumbSchema, articleSchema, faqSchema, SITE_URL } from "@/hooks/useSeo";
import { ARTICLES, TYPES, getArticleBySlug, getRelatedArticles } from "@/data/articles";
import { SectionIntro, CardRail, Card, SoftenedCall, Concierge } from "@/components/reverie/R";

/* Journal (2026-11-03): the index is set like The Golfer's Journal category pages (centred title, a topic filter, a
   three-column grid of square pictures with the topic over a hairline), the article like Reverie's planning guides
   (title, subtitle and author on the green band, the picture full width, the text beside a sticky jump list of its
   sections). Every word is the article dataset's own (src/data/articles.js). */

const slug = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const typeLabel = (a) => (TYPES.find((t) => t.slug === a.articleType || t.slug === `${a.articleType}s`) || {}).label || a.articleType;

const col = "max-w-[720px]";

const Block = ({ b }) => {
  switch (b.type) {
    case "lead":
      return <p className={`${col} r-body text-[19px] md:text-[21px] leading-[1.6] text-[var(--r-green)] mb-10`}>{b.text}</p>;
    case "p":
      return <p className={`${col} r-body text-[16px] leading-[1.8] mb-6`}>{b.text}</p>;
    case "h2":
      return <h2 id={slug(b.text)} className={`${col} scroll-mt-28 r-title text-[22px] md:text-[26px] text-[var(--r-green)] mt-16 mb-6`}>{b.text}</h2>;
    case "h3":
      return <h3 className={`${col} r-title text-[17px] text-[var(--r-green)] mt-10 mb-4`}>{b.text}</h3>;
    case "divider":
      return <hr className="max-w-[120px] mx-auto my-16 border-[rgba(30,57,43,0.25)]" />;
    case "image":
      return (
        <figure className="my-12">
          <img src={b.src} alt={b.alt || ""} loading="lazy" className="w-full object-cover" />
          {b.caption && <figcaption className="mt-3 text-[12px] text-[var(--r-ink-soft)] text-center">{b.caption}</figcaption>}
        </figure>
      );
    case "list":
      return (
        <ul className={`${col} flex flex-col gap-4 mb-8`}>
          {b.items.map((x, i) => (
            <li key={i} className="r-body text-[16px] border-l-2 border-[var(--r-green)] pl-4">
              {x.title && <strong className="font-semibold text-[var(--r-green)]">{x.title}: </strong>}{x.text}
            </li>
          ))}
        </ul>
      );
    case "columns":
      return (
        <div className="my-12 grid gap-8 md:grid-cols-2">
          {b.columns.map((c) => (
            <div key={c.heading} className="bg-white border-[10px] border-[#e8e4d6] p-6">
              <h4 className="r-title text-[14px] text-[var(--r-green)] mb-4">{c.heading}</h4>
              <ul className="flex flex-col divide-y divide-[#ddd8c8]">
                {c.items.map((x) => (
                  <li key={x.title} className="py-2.5 flex justify-between gap-4 text-[14px]">
                    <span className="font-semibold text-[var(--r-green)]">{x.title}</span><span className="text-[var(--r-ink-soft)] text-right">{x.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "priceCards":
      return (
        <div className="my-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {b.items.map((x) => (
            <div key={x.title} className="bg-white border-[10px] border-[#e8e4d6] p-6 flex flex-col gap-2">
              <span className="r-eyebrow text-[var(--r-ink-soft)]">{x.tag}</span>
              <span className="r-title text-[17px] text-[var(--r-green)]">{x.title}</span>
              <span className="text-[22px] font-extrabold tabular-nums text-[var(--r-green)]">{x.price}</span>
              <span className="text-[12px] text-[var(--r-ink-soft)]">{x.unit}</span>
              <p className="r-body text-[14px] mt-2">{x.note}</p>
            </div>
          ))}
        </div>
      );
    case "callout":
      return (
        <aside className={`${col} my-12`}>
          <div className="bg-[var(--r-green)] text-[var(--r-cream)] p-8">
            <h4 className="r-title text-[15px] mb-5">{b.title}</h4>
            <dl className="flex flex-col gap-3">
              {b.items.map((x) => (
                <div key={x.term}><dt className="font-semibold text-[15px]">{x.term}</dt><dd className="r-body text-[14px] opacity-85">{x.def}</dd></div>
              ))}
            </dl>
            {b.note && <p className="r-body text-[13px] opacity-80 mt-5">{b.note}</p>}
          </div>
        </aside>
      );
    case "faq":
      return (
        <details className={`${col} group mb-0`}>
          <summary className="r-hit cursor-pointer list-none flex justify-between gap-6 border-b border-[rgba(30,57,43,0.2)] py-5 r-title text-[14px] text-[var(--r-green)]">
            {b.q}<span aria-hidden="true" className="transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="r-body text-[15px] py-4">{b.a}</p>
        </details>
      );
    case "cta":
      return (
        <section className="bg-[var(--r-green)] text-[var(--r-cream)] px-6 py-[70px] my-16">
          <div className="max-w-[620px] mx-auto flex flex-col items-center text-center gap-5">
            {b.eyebrow && <span className="r-eyebrow opacity-80">{b.eyebrow}</span>}
            <h3 className="r-title text-[24px] md:text-[28px]">{b.heading}</h3>
            {b.text && <p className="r-body text-[15px] opacity-90">{b.text}</p>}
            <a href={b.href} className="r-btn r-btn-light mt-2">{b.label}</a>
          </div>
        </section>
      );
    default:
      return null;
  }
};


/* The jump list: every section of the article, the one being read marked. */
export const Jumper = ({ items, label = "In this article" }) => {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-20% 0px -70% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);
  return (
    <nav aria-label={label} className="flex flex-col gap-3">
      <span className="r-eyebrow text-[var(--r-ink-soft)]">{label}</span>
      <ol className="flex flex-col border-l border-[rgba(30,57,43,0.2)]">
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} aria-current={active === i.id ? "true" : undefined} className={`block -ml-px border-l-2 pl-4 py-1.5 text-[13px] leading-snug transition-colors ${active === i.id ? "border-[var(--r-green)] text-[var(--r-green)] font-medium" : "border-transparent text-[var(--r-ink-soft)] hover:text-[var(--r-green)]"}`}>
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export const RArticle = () => {
  const { slug: s } = useParams();
  const a = getArticleBySlug(s);
  useSeo({
    title: a?.metaTitle || "Journal | GOLF° IN MEXICO°",
    description: a?.metaDescription || "",
    canonical: `/journal/${s}`,
    image: a?.heroImage,
    jsonLd: a ? [articleSchema({ headline: a.h1 || a.title, description: a.metaDescription || a.excerpt, path: `/journal/${a.slug}`, image: a.heroImage, author: { type: "Person", name: a.author?.name }, datePublished: a.datePublished || "2026-05-01" }), breadcrumbSchema([{ name: "Journal", path: "/journal" }, { name: a.title, path: `/journal/${a.slug}` }]),
      // The questions the article answers, as production marks them up (lost in the redesign, back 2026-11-05).
      ...(a.body.some((b) => b.type === "faq") ? [faqSchema(a.body.filter((b) => b.type === "faq").map(({ q, a: ans }) => ({ q, a: ans })))] : [])] : [],
  });
  const toc = useMemo(() => (a ? a.body.filter((b) => b.type === "h2").map((b) => ({ id: slug(b.text), text: b.text })) : []), [a]);
  if (!a) return null;
  const related = getRelatedArticles(a.relatedArticles);

  return (
    <main data-testid="page-article" className="bg-[var(--r-cream)] text-[var(--r-ink)]">
      {/* Title, subtitle and author on the green band */}
      <header className="bg-[var(--r-green)] text-[var(--r-cream)] px-6 pt-[150px] md:pt-[190px] pb-[90px] md:pb-[120px]">
        <div className="max-w-[860px] mx-auto flex flex-col items-center text-center gap-6">
          <a href="/journal" className="r-eyebrow opacity-80 hover:opacity-100">Journal · {typeLabel(a)}{a.destinationLabel && a.destinationLabel !== typeLabel(a) ? ` · ${a.destinationLabel}` : ""}</a>
          <h1 className="r-title text-[30px] md:text-[46px] leading-[1.08]">{a.h1 || a.title}</h1>
          <p className="r-body text-[16px] md:text-[18px] max-w-[640px] opacity-90">{a.subtitle}</p>
          <div className="flex items-center gap-4 mt-4">
            {a.author?.photo && <img src={a.author.photo} alt="" className="w-12 h-12 rounded-full object-cover ring-1 ring-[rgba(251,249,243,0.4)]" />}
            <div className="text-left">
              <div className="text-[14px] font-semibold">{a.author?.name}</div>
              <div className="text-[12px] opacity-75">{a.author?.role} · Updated {a.updated} · {a.readTimeMinutes} min read</div>
            </div>
          </div>
        </div>
      </header>

      {/* The picture, full width */}
      <div className="h-[62vh] md:h-[100vh] max-h-[900px] overflow-hidden bg-[var(--r-green)]">
        <img src={a.heroImage} alt={a.title} className="w-full h-full object-cover" />
      </div>

      {/* Text beside the sticky jump list */}
      <div className="px-5 md:px-10 pt-[70px] md:pt-[100px] pb-10">
        <div className="max-w-[1120px] mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-[80px]">
          <details className="lg:hidden mb-10 border-y border-[rgba(30,57,43,0.2)] py-4">
            <summary className="r-hit cursor-pointer list-none r-eyebrow text-[var(--r-green)] flex justify-between">Jump to a section <span aria-hidden="true">+</span></summary>
            <ol className="mt-4 flex flex-col gap-2">
              {toc.map((i) => <li key={i.id}><a href={`#${i.id}`} className="text-[14px] text-[var(--r-green)]">{i.text}</a></li>)}
            </ol>
          </details>
          <article className="min-w-0">{a.body.map((b, i) => <Block key={i} b={b} />)}</article>
          <aside className="hidden lg:block">
            <div className="sticky top-[110px]"><Jumper items={toc} /></div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="py-[100px] bg-[var(--r-cream-2)]">
          <SectionIntro as="p" title="Keep reading" link={<a href="/journal" className="r-link text-[var(--r-green)]">Journal</a>} />
          <div className="mt-[60px]">
            <CardRail label="Related stories">
              {related.map((r) => <Card key={r.slug} titleAs="span" href={`/journal/${r.slug}`} image={r.heroImage} eyebrow={typeLabel(r)} title={r.title} text={r.excerpt} cta="Read more" />)}
            </CardRail>
          </div>
        </section>
      )}

      <SoftenedCall id="article-close" titleAs="p" image={a.heroImage} title="Free planning until your golf trip is right.">
        <p className="r-body text-[14px]">Perks you won&apos;t get booking direct. Planned by a golf agent and a pro golfer from Mexico.</p>
        <Concierge id="article-close" className="r-btn r-btn-light mt-2" />
      </SoftenedCall>
    </main>
  );
};

/* Topics come from the articles themselves: their type and their place, only those that have a story. */
export const RJournal = () => {
  useSeo({ title: "The Journal: Mexico Golf Guides & Stories | GOLF° IN MEXICO°", description: "Field notes from inside the game: trip playbooks, course access and the stories behind golf in Mexico, written by the people who plan and play it.", canonical: "/journal", jsonLd: [breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Journal", path: "/journal" }]), { "@context": "https://schema.org", "@type": "Blog", name: "The Journal", url: `${SITE_URL}/journal`, publisher: { "@id": `${SITE_URL}/#org` }, blogPost: ARTICLES.map((x) => ({ "@type": "BlogPosting", headline: x.h1 || x.title, url: `${SITE_URL}/journal/${x.slug}`, ...(x.author?.name ? { author: { "@type": "Person", name: x.author.name } } : {}) })) }] });
  const topics = useMemo(() => {
    const set = new Map();
    ARTICLES.forEach((a) => {
      set.set(`type:${a.articleType}`, typeLabel(a));
      if (a.destination && a.destination !== "planning" && a.destinationLabel) set.set(`place:${a.destination}`, a.destinationLabel);
    });
    return [["all", "All stories"], ...set.entries()];
  }, []);
  const [topic, setTopic] = useState("all");
  const shown = ARTICLES.filter((a) => topic === "all" || topic === `type:${a.articleType}` || topic === `place:${a.destination}`);
  const current = topics.find(([k]) => k === topic)?.[1];

  return (
    <main data-testid="page-journal" className="bg-[var(--r-cream)] text-[var(--r-ink)] pt-[130px] md:pt-[150px]">
      <div className="px-5 md:px-10 max-w-[1240px] mx-auto">
        <h1 className="r-title text-[34px] md:text-[48px] text-[var(--r-green)] text-center">{topic === "all" ? "Journal" : current}</h1>

        <div className="mt-10 md:mt-14 flex items-end justify-between gap-6 border-b border-[rgba(30,57,43,0.25)] pb-4">
          <label className="flex flex-col gap-1">
            <span className="r-eyebrow text-[var(--r-ink-soft)]">Topic</span>
            <select value={topic} onChange={(e) => setTopic(e.target.value)} className="bg-transparent text-[15px] text-[var(--r-green)] font-medium pr-6 py-1 outline-none cursor-pointer">
              {topics.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
            </select>
          </label>
          <span className="text-[12px] text-[var(--r-ink-soft)]">{shown.length} {shown.length === 1 ? "story" : "stories"}</span>
        </div>

        <ul data-testid="journal-grid" className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 pt-10 pb-[120px]">
          {shown.map((a) => (
            <li key={a.slug}>
              <a href={`/journal/${a.slug}`} className="group flex flex-col">
                <div className="flex justify-between items-baseline border-t border-[rgba(30,57,43,0.35)] pt-2 pb-3 text-[13px]">
                  <span className="italic text-[var(--r-green)]">{typeLabel(a)}</span>
                  <span className="text-[var(--r-ink-soft)]">{a.destinationLabel && a.destinationLabel !== typeLabel(a) ? `${a.destinationLabel} · ` : ""}{a.readTimeMinutes} min</span>
                </div>
                <div className="aspect-square overflow-hidden bg-[var(--r-cream-2)]">
                  <img src={a.heroImage} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]" />
                </div>
                <h2 className="r-title text-[19px] md:text-[21px] text-[var(--r-green)] mt-5 leading-[1.2] group-hover:opacity-80">{a.title}</h2>
                <p className="r-body text-[14px] mt-3">{a.excerpt}</p>
                <span className="text-[12px] text-[var(--r-ink-soft)] mt-4">{a.author?.name} · {a.updated}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};
