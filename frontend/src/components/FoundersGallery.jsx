import { useState } from "react";
import { motion } from "framer-motion";

/* ════════════════════════════════════════════════════════════════════
   FoundersGallery
   Multi-photo slider for Pablo and José. Used on Home as the visual
   introduction; full editorial bios (The Agent · The Player · The
   Collaboration) live directly below via <TeamEditorial />.
   ════════════════════════════════════════════════════════════════════ */

const FOUNDERS = [
  {
    slug: "pablo",
    name: "Pablo De La Mora",
    role: "The Agent",
    photos: [
      { src: "/founders/pablo/01.jpg" },
      { src: "/founders/pablo/02.jpg" },
      { src: "/founders/pablo/03.jpg" },
      { src: "/founders/pablo/04.jpg", position: "left center" },
      { src: "/founders/pablo/05.jpg" },
    ],
  },
  {
    slug: "jose",
    name: "José Islas",
    role: "The Pro Player",
    photos: [
      { src: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/xzs0k4px_JOSE%20PHOTO1.jpeg" },
      { src: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/6pjb9z9s_JOSE%20PHOTO%202jpeg.jpeg" },
      { src: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/55n1fq21_JOSE%20PHOTO3.jpeg" },
      { src: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/13l2h84i_JOSE%20PHOTO4.jpeg" },
      { src: "https://customer-assets.emergentagent.com/job_the-golfers-journal/artifacts/zva8jb69_JOSE%20PHOTO5.jpeg" },
    ],
  },
];

const StillSlider = ({ photos, name, testid }) => {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i === 0 ? photos.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === photos.length - 1 ? 0 : i + 1));
  const current = photos[idx];

  return (
    <div data-testid={testid}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[var(--c-green-deep)]">
        <motion.img
          key={idx}
          src={current.src}
          alt={`${name} — photo ${idx + 1} of ${photos.length}`}
          initial={{ opacity: 0, scale: 1.015 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover editorial-img"
          style={{ objectPosition: current.position || "center center" }}
        />
        <span
          data-testid={`${testid}-counter`}
          className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/95 bg-black/35 backdrop-blur-sm px-2.5 py-1 rounded-sm"
        >
          {String(idx + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </span>
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              data-testid={`${testid}-prev`}
              className="absolute top-1/2 -translate-y-1/2 left-3 w-9 h-9 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              data-testid={`${testid}-next`}
              className="absolute top-1/2 -translate-y-1/2 right-3 w-9 h-9 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </>
        )}
      </div>
      {photos.length > 1 && (
        <div className="mt-4 flex items-center gap-2">
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Go to photo ${i + 1}`}
              data-testid={`${testid}-dot-${i}`}
              className={`h-[2px] transition-all duration-300 ${i === idx ? "w-8 bg-[var(--c-gold)]" : "w-4 bg-[var(--c-border)] hover:bg-[var(--c-text-muted)]"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FoundersGallery = () => (
  <section
    data-testid="home-founders-gallery"
    className="bg-[var(--c-off-white)] border-t border-[var(--c-border)] py-20 md:py-32"
  >
    <div className="max-w-[1240px] mx-auto px-6 md:px-12">
      <div className="text-center mb-14 md:mb-20">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--c-gold)]">
          The team
        </span>
        <h2 className="mt-5 font-display font-light text-[var(--c-text)] text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight max-w-[22ch] mx-auto">
          An agent and a tour pro <em className="italic text-[var(--c-gold)]">behind every itinerary.</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
        {FOUNDERS.map((f, i) => (
          <motion.article
            key={f.slug}
            id={f.slug}
            data-testid={`home-founder-${f.slug}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
            itemScope
            itemType="https://schema.org/Person"
          >
            <StillSlider
              photos={f.photos}
              name={f.name}
              testid={`home-slider-${f.slug}`}
            />
            <h3
              className="mt-6 font-display font-light text-[var(--c-text)] text-2xl md:text-3xl tracking-tight mb-1"
              itemProp="name"
            >
              {f.name}
            </h3>
            <p
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--c-gold)]"
              itemProp="jobTitle"
            >
              {f.role}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default FoundersGallery;
