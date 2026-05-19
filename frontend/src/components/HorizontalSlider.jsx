import { useRef, useState, useEffect } from "react";

const ArrowSvg = ({ left = false }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ transform: left ? "rotate(180deg)" : "none" }}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const HorizontalSlider = ({ children, testId = "slider", arrowOffset = 0 }) => {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.6) * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative" data-testid={testId}>
      <div
        ref={trackRef}
        className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 -mx-6 md:-mx-12 px-6 md:px-12 [scrollbar-width:none] [-ms-overflow-style:none]"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <style>{`[data-testid="${testId}"] > div::-webkit-scrollbar{display:none}`}</style>
        {children}
      </div>

      {/* Arrows */}
      <div
        className="hidden md:flex absolute right-4 lg:right-8 z-20 items-center gap-2"
        style={{ top: `calc(50% + ${arrowOffset}px)`, transform: "translateY(-50%)" }}
      >
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          disabled={!canPrev}
          aria-label="Previous"
          data-testid={`${testId}-prev`}
          className={`inline-flex items-center justify-center w-11 h-11 rounded-full bg-ink text-cream transition-all duration-300 ${
            canPrev ? "opacity-100 hover:bg-gold hover:text-ink" : "opacity-30 cursor-not-allowed"
          }`}
        >
          <ArrowSvg left />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          disabled={!canNext}
          aria-label="Next"
          data-testid={`${testId}-next`}
          className={`inline-flex items-center justify-center w-11 h-11 rounded-full bg-ink text-cream transition-all duration-300 ${
            canNext ? "opacity-100 hover:bg-gold hover:text-ink" : "opacity-30 cursor-not-allowed"
          }`}
        >
          <ArrowSvg />
        </button>
      </div>
    </div>
  );
};

export default HorizontalSlider;
