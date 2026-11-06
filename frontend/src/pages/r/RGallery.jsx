import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSeo, breadcrumbSchema, SITE_URL } from "@/hooks/useSeo";
import PHOTOS from "@/data/gallery.json";

/* Gallery, set like reveriesafaris.com/safari-gallery (2026-11-04): one wall of pictures in columns, a quiet S · M · L
   switch for the picture size, and a full-screen view on click. Only GOLF° IN MEXICO°'s own photos (no hotel or club
   photos: those may only be shown with their owner's credit, beside the trip or course they belong to). */

/* Grid pictures are small copies (480/960 px, src/data/gallery.json "thumbs"); the full photo loads only in the viewer. */
const SIZES_ATTR = {
  S: "(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw",
  M: "(min-width: 768px) 33vw, 50vw",
  L: "(min-width: 768px) 50vw, 100vw",
};
const srcSet = (p) => Object.entries(p.thumbs).map(([w, u]) => `${u} ${Math.min(+w, p.w)}w`).join(", ");

const SIZES = {
  S: "columns-2 md:columns-4 lg:columns-5",
  M: "columns-2 md:columns-3",
  L: "columns-1 md:columns-2",
};

const Viewer = ({ index, onClose, onMove }) => {
  const p = PHOTOS[index];
  useEffect(() => {
    const key = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", key);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = prev;
    };
  }, [onClose, onMove]);
  useEffect(() => {
    // Warm the next and previous full photos so moving through the viewer is instant.
    [1, -1].forEach((d) => { const n = PHOTOS[(index + d + PHOTOS.length) % PHOTOS.length]; const im = new Image(); im.src = n.full || n.src; });
  }, [index]);
  const btn = "r-hit r-eyebrow text-[var(--r-cream)] opacity-80 hover:opacity-100";
  return (
    <div role="dialog" aria-modal="true" aria-label={p.alt} data-testid="gallery-viewer" className="fixed inset-0 z-[200] bg-[rgba(14,22,17,0.96)] flex flex-col">
      <div className="flex items-center justify-between px-5 md:px-10 h-[64px]">
        <span className="text-[12px] text-[rgba(251,249,243,0.6)] tabular-nums">{index + 1} / {PHOTOS.length}</span>
        <button type="button" onClick={onClose} className={btn} autoFocus data-testid="gallery-close">✕ Close</button>
      </div>
      <div className="flex-1 min-h-0 flex items-center justify-center px-5 md:px-20 pb-6" onClick={onClose}>
        <img src={p.full || p.src} alt={p.alt} className="max-w-full max-h-full object-contain" onClick={(e) => e.stopPropagation()} />
      </div>
      <div className="flex items-center justify-between px-5 md:px-10 h-[64px]">
        <button type="button" onClick={() => onMove(-1)} className={btn} data-testid="gallery-prev">← Previous</button>
        <span className="hidden md:block text-[12px] text-[rgba(251,249,243,0.6)]">{p.alt}</span>
        <button type="button" onClick={() => onMove(1)} className={btn} data-testid="gallery-next">Next →</button>
      </div>
    </div>
  );
};

const RGallery = () => {
  useSeo({
    title: "Golf in Mexico Photo Gallery | GOLF° IN MEXICO°",
    description: "Photos from the courses, coasts and rounds we plan trips around in Mexico: Los Cabos, Punta Mita, Cancún, Puerto Vallarta and Mexico City.",
    canonical: "/gallery",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        name: "GOLF° IN MEXICO° photo gallery",
        url: `${SITE_URL}/gallery`,
        image: PHOTOS.slice(0, 30).map((p) => ({ "@type": "ImageObject", contentUrl: `${SITE_URL}${p.src}`, description: p.alt, width: p.w, height: p.h })),
      },
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }]),
    ],
  });

  const [size, setSize] = useState("M");
  const [open, setOpen] = useState(null);
  const move = useCallback((d) => setOpen((i) => (i + d + PHOTOS.length) % PHOTOS.length), []);
  const close = useCallback(() => setOpen(null), []);

  return (
    <main data-testid="page-gallery" className="bg-[var(--r-cream)] text-[var(--r-ink)] pt-[96px] md:pt-[110px] pb-[100px]">
      <h1 className="sr-only">Golf in Mexico photo gallery</h1>
      <div role="group" aria-label="Picture size" className="flex justify-center gap-6 mb-8">
        {Object.keys(SIZES).map((k) => (
          <button key={k} type="button" onClick={() => setSize(k)} aria-pressed={size === k} data-testid={`gallery-size-${k}`}
            className={`r-hit r-eyebrow pb-1 border-b ${size === k ? "border-[var(--r-green)] text-[var(--r-green)]" : "border-transparent text-[var(--r-ink-soft)] hover:text-[var(--r-green)]"}`}>
            {k}
          </button>
        ))}
      </div>

      <ul data-testid="gallery-grid" className={`px-2 md:px-3 gap-2 md:gap-3 ${SIZES[size]}`}>
        {PHOTOS.map((p, i) => (
          <li key={p.src} className="mb-2 md:mb-3 break-inside-avoid">
            <button type="button" onClick={() => setOpen(i)} className="group block w-full overflow-hidden bg-[var(--r-cream-2)]" aria-label={`Open: ${p.alt}`}>
              <img src={p.thumbs[480]} srcSet={srcSet(p)} sizes={SIZES_ATTR[size]} alt={p.alt} width={p.w} height={p.h} loading={i < 9 ? "eager" : "lazy"} decoding="async" className="w-full h-auto block transition-transform duration-[900ms] group-hover:scale-[1.03]" />
            </button>
          </li>
        ))}
      </ul>

      {/* Portal: the page sits inside an animated (transformed) wrapper, which would trap a fixed overlay under the header. */}
      {open !== null && createPortal(<Viewer index={open} onClose={close} onMove={move} />, document.body)}
    </main>
  );
};

export default RGallery;
