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

export function useSeo({ title, description, canonical, jsonLd } = {}) {
  // Serialize jsonLd for a stable dependency (callers pass fresh literals).
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : "";

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

    const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
    const els = schemas.map((schema) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.text = JSON.stringify(schema);
      document.head.appendChild(el);
      return el;
    });
    return () => els.forEach((el) => el.remove());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, canonical, jsonLdKey]);
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

export const faqSchema = (faqs = []) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const articleSchema = ({
  headline,
  description,
  path,
  image,
  author,
  datePublished,
  dateModified,
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline,
  ...(description ? { description } : {}),
  ...(image ? { image: abs(image) } : {}),
  author: {
    "@type": author?.type === "Person" ? "Person" : "Organization",
    name: author?.name || SITE_NAME,
  },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-wordmark.png` },
  },
  ...(path ? { mainEntityOfPage: abs(path) } : {}),
  ...(datePublished ? { datePublished } : {}),
  ...(dateModified ? { dateModified } : {}),
});
