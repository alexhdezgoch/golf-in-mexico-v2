import { SITE_URL } from "@/hooks/useSeo";
import { GUIDE_VOICES } from "@/data/guideVoices";

/* Each line as a Quotation spoken by its author, part of the guide page, so answer engines can attribute it. */
export const voicesSchema = (slug) =>
  (GUIDE_VOICES[slug] || []).map((v) => ({
    "@context": "https://schema.org",
    "@type": "Quotation",
    text: v.text,
    spokenByCharacter: { "@type": "Person", name: v.name, jobTitle: v.role === "The agent" ? "Golf agent, founder of GOLF° IN MEXICO°" : "Professional golfer" },
    // The guide Article names its page with mainEntityOfPage (no @id), so the quote points at the same page URL.
    isPartOf: { "@type": "WebPage", url: `${SITE_URL}/destinations/${slug}` },
  }));

/* The two lines under the guide's answer: quiet, side by side on wide screens, no boxes (keep the redesign minimal). */
export const GuideVoices = ({ slug }) => {
  const voices = GUIDE_VOICES[slug] || [];
  if (!voices.length) return null;
  return (
    <section data-testid="guide-voices" className="px-5 md:px-10 pb-[90px]">
      <div className={`mx-auto max-w-[1100px] grid gap-10 ${voices.length > 1 ? "md:grid-cols-2" : ""}`}>
        {voices.map((v) => (
          <figure key={v.role} className="flex flex-col gap-4 border-t border-[rgba(30,57,43,0.2)] pt-6">
            <figcaption className="r-eyebrow text-[var(--r-ink-soft)]">{v.role} · {v.name}</figcaption>
            <blockquote className="r-title normal-case text-[18px] md:text-[21px] leading-[1.4] text-[var(--r-green)]">“{v.text}”</blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
};
