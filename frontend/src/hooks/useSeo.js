import { useEffect } from "react";

/**
 * Client-side SEO/meta manager for a route. Sets document.title, meta
 * description, canonical link, and injects JSON-LD schema (cleaned up on
 * unmount / route change).
 *
 * NOTE: this runs in useEffect, so it only benefits crawlers that execute
 * JavaScript (Googlebot, some AI-search bots). JS-less LLM crawlers are served
 * the content directly via /llms.txt and /llms-full.txt.
 */

export const SITE_URL = "https://golf-in-mexico.com";
export const SITE_NAME = "Golf in Mexico°";

const abs = (url) => (url && url.startsWith("http") ? url : `${SITE_URL}${url || ""}`);

export function useSeo({ title, description, canonical, jsonLd, alternates } = {}) {
  // Serialize jsonLd for a stable dependency (callers pass fresh literals).
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : "";
  const alternatesKey = alternates ? JSON.stringify(alternates) : "";

  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let meta = document.querySelector("meta[name='description']");
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }

    if (canonical) {
      let link = document.querySelector("link[rel='canonical']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = abs(canonical);
    }

    // hreflang alternates — only for routes that exist in more than one language
    // (currently /privacy ↔ /aviso-de-privacidad). Same rule as JSON-LD below:
    // clear whatever is in the document first. Without this, hydrating a
    // prerendered page would DOUBLE the baked-in tags, and navigating away from
    // /privacy would leave its alternates behind on a single-language route.
    document
      .querySelectorAll("link[rel='alternate'][hreflang]")
      .forEach((el) => el.remove());
    const altEls = (alternates || []).map(({ hrefLang, href }) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = hrefLang;
      link.href = abs(href);
      document.head.appendChild(link);
      return link;
    });

    const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
    // Drop any JSON-LD already in the document (e.g. injected at build time by the
    // prerenderer) before adding this route's, so hydration doesn't duplicate it.
    if (schemas.length) {
      document
        .querySelectorAll("script[type='application/ld+json']")
        .forEach((el) => el.remove());
    }
    const els = schemas.map((schema) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.text = JSON.stringify(schema);
      document.head.appendChild(el);
      return el;
    });
    return () => [...els, ...altEls].forEach((el) => el.remove());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, canonical, jsonLdKey, alternatesKey]);
}

// ── Schema builders (all URLs absolute, on golf-in-mexico.com) ──────────────

export const orgSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-wordmark.png`,
  description:
    "Editorial guide and bespoke trip planning for golf in Mexico, by sports agent Pablo De La Mora and professional golfer José Islas.",
  founder: [
    { "@type": "Person", name: "Pablo De La Mora" },
    { "@type": "Person", name: "José Islas" },
  ],
  sameAs: [
    "https://www.instagram.com/pablodlmc/",
    "https://www.linkedin.com/in/pablodlm/",
    "https://www.instagram.com/joseislasgolf/",
  ],
});

export const webSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
});

export const breadcrumbSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

/**
 * VideoObject for an embedded YouTube film.
 *
 * NOTE: Google only awards a video rich result when the video is the main
 * content of the page AND the video itself is publicly indexable. An UNLISTED
 * YouTube video cannot rank and cannot be surfaced — the markup is still valid
 * and harmless, but it earns nothing until the upload is switched to Public.
 */
export const videoSchema = ({
  name,
  description,
  videoId,
  thumbnailUrl,
  uploadDate,
  durationSec,
}) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name,
  ...(description ? { description } : {}),
  ...(thumbnailUrl ? { thumbnailUrl: abs(thumbnailUrl) } : {}),
  ...(uploadDate ? { uploadDate } : {}),
  ...(durationSec ? { duration: `PT${durationSec}S` } : {}),
  embedUrl: `https://www.youtube.com/embed/${videoId}`,
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-wordmark.png` },
  },
});

export const faqSchema = (faqs = []) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

/**
 * Build the author value for Article schema.
 *
 * A Person entity is only worth emitting if it can be resolved to a real,
 * identifiable person — a bare name with no bio, profile or link is a weaker
 * claim than naming the organization. So a full canonical author (see
 * data/authors.js) gets url/image/sameAs/jobTitle attached; anything else falls
 * back to the Organization.
 */
const authorEntity = (a) => ({
  "@type": "Person",
  name: a.name,
  ...(a.jobTitle ? { jobTitle: a.jobTitle } : {}),
  ...(a.description ? { description: a.description } : {}),
  ...(a.path ? { url: abs(a.path) } : {}),
  ...(a.image ? { image: abs(a.image) } : {}),
  ...(a.sameAs?.length ? { sameAs: a.sameAs } : {}),
  ...(a.knowsAbout?.length ? { knowsAbout: a.knowsAbout } : {}),
});

export const articleSchema = ({
  headline,
  description,
  path,
  image,
  author,
  authors,
  datePublished,
  dateModified,
}) => {
  const people = (authors?.length ? authors : author ? [author] : []).filter(
    (a) => a?.type === "Person" && a?.name
  );
  return {
  "@context": "https://schema.org",
  "@type": "Article",
  headline,
  ...(description ? { description } : {}),
  ...(image ? { image: abs(image) } : {}),
  author: people.length
    ? (people.length === 1 ? authorEntity(people[0]) : people.map(authorEntity))
    : { "@type": "Organization", name: SITE_NAME },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-wordmark.png` },
  },
  ...(path ? { mainEntityOfPage: abs(path) } : {}),
  ...(datePublished ? { datePublished } : {}),
  ...(dateModified ? { dateModified } : {}),
  };
};
