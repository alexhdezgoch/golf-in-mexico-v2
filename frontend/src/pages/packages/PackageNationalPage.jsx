import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSeo, breadcrumbSchema, faqSchema } from "@/hooks/useSeo";
import "./PackageNationalPage.css";

/* ═══════════════════════════════════════════════════════════════════
   PackageNationalPage — /golf-packages

   Ported near-verbatim from Pablo's own HTML/CSS/JS, same rationale as the
   other two pages in pages/packages/. Sits above every destination hub, so
   it gets its own top-level route rather than replacing the homepage — the
   homepage carries the brand intro and the site's existing equity.

   Region cards linked to Pablo's own flat ad-URLs (/cancun/golf-packages
   etc.) opening in a new tab — converted to internal same-tab navigation at
   the real routes, since those pages now exist on this same site.

   Three of his four FAQ answers read "Answer pending — real data needed"
   (his own TODO markers) and are omitted, same precedent as the other two
   package pages.
   ═══════════════════════════════════════════════════════════════════ */

// Pablo's own NATIONAL photo set (Drive folder, received 2026-09-01),
// resized to 2000px and converted to webp.
const HERO_PHOTOS = [
  "/images/national/hero-punta-mita-coastline.webp",
  "/images/national/hero-mandarina-bunkers.webp",
  "/images/national/hero-cancun-jungle-lake.webp",
  "/images/national/hero-cdmx-volcano-fairway.webp",
  "/images/national/hero-parkland-dusk.webp",
];

const REGION_PHOTOS = {
  cancun: "/images/national/hero-cancun-jungle-lake.webp",
  loscabos: "/images/national/region-cabo-desert-course.webp",
  vallarta: "/images/national/hero-mandarina-bunkers.webp",
  cdmx: "/images/national/hero-cdmx-volcano-fairway.webp",
  unique: "/images/national/region-unique-hill-green.webp",
};

const FAQS = [
  { q: "Which destination is best for a first golf trip to Mexico?", a: "Depends on your group and budget — this is exactly what we help you figure out." },
];

const CANONICAL = "/golf-packages";

const PackageNationalPage = () => {
  const rootRef = useRef(null);

  useSeo({
    title: "Mexico Golf Packages — Plan Your Trip | Golf in Mexico°",
    description:
      "Five regions, one operator. Founded by a former PGA Tour agent and a Mexican Tour pro, Golf in Mexico matches your group to the right destination before you book the wrong one.",
    canonical: CANONICAL,
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Mexico Golf Packages", path: CANONICAL },
      ]),
      faqSchema(FAQS),
    ],
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups = [];

    if (!reduced) {
      document.documentElement.style.scrollBehavior = "smooth";
      cleanups.push(() => { document.documentElement.style.scrollBehavior = ""; });
    }

    let revealIO;
    if ("IntersectionObserver" in window && !reduced) {
      revealIO = new IntersectionObserver(
        (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); } }),
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      root.querySelectorAll(".rv").forEach((el) => revealIO.observe(el));
      cleanups.push(() => revealIO.disconnect());
    } else {
      root.querySelectorAll(".rv").forEach((el) => el.classList.add("in"));
    }

    const slides = root.querySelectorAll(".slide");
    const thumbs = root.querySelectorAll(".thumb");
    let cur = 0;
    let timer = null;
    const go = (n) => {
      cur = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle("on", i === cur));
      thumbs.forEach((t, i) => t.classList.toggle("on", i === cur));
    };
    const auto = () => {
      if (reduced) return;
      clearInterval(timer);
      timer = setInterval(() => go(cur + 1), 6000);
    };
    const thumbHandlers = [];
    thumbs.forEach((t) => {
      const h = () => { go(+t.dataset.slide); auto(); };
      t.addEventListener("click", h);
      thumbHandlers.push([t, h]);
    });
    auto();
    cleanups.push(() => {
      clearInterval(timer);
      thumbHandlers.forEach(([t, h]) => t.removeEventListener("click", h));
    });

    const subnav = root.querySelector("#subnavInner");
    const spyTargets = ["regions", "handled", "problem", "explore", "faq", "final"];
    let spyIO;
    if (subnav) {
      const setSpy = (id) => {
        subnav.querySelectorAll("a").forEach((a) => {
          const on = a.dataset.spy === id;
          a.classList.toggle("on", on);
          if (on) {
            const target = a.offsetLeft - subnav.clientWidth / 2 + a.clientWidth / 2;
            subnav.scrollTo({ left: target, behavior: reduced ? "auto" : "smooth" });
          }
        });
      };
      if ("IntersectionObserver" in window) {
        spyIO = new IntersectionObserver(
          (es) => es.forEach((e) => { if (e.isIntersecting) setSpy(e.target.id); }),
          { rootMargin: "-35% 0px -55% 0px" },
        );
        spyTargets.forEach((id) => {
          const el = root.querySelector(`#${id}`);
          if (el) spyIO.observe(el);
        });
        cleanups.push(() => spyIO.disconnect());
      }
    }

    const dock = root.querySelector("#dock");
    const onScroll = () => {
      if (dock) dock.classList.toggle("show", window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    const faqHandlers = [];
    root.querySelectorAll(".faq-item").forEach((item) => {
      const q = item.querySelector(".faq-q");
      const a = item.querySelector(".faq-a");
      if (!q || !a) return;
      const h = () => {
        const open = item.classList.toggle("open");
        q.setAttribute("aria-expanded", open);
        a.style.maxHeight = open ? `${a.scrollHeight}px` : "0";
      };
      q.addEventListener("click", h);
      faqHandlers.push([q, h]);
    });
    cleanups.push(() => faqHandlers.forEach(([q, h]) => q.removeEventListener("click", h)));

    // region cards — horizontal carousel: drag-to-scroll + arrows + dots
    const regionCards = root.querySelector("#regionCards");
    if (regionCards) {
      const rItems = regionCards.querySelectorAll(".region-card");
      const rDots = root.querySelectorAll("#regionDots i");
      let rDown = false;
      let rStartX = 0;
      let rScrollStart = 0;
      let rDragged = false;

      const rCardStep = () => rItems[0].getBoundingClientRect().width + 22;
      const rUpdateDots = () => {
        let idx = Math.round(regionCards.scrollLeft / rCardStep());
        idx = Math.max(0, Math.min(idx, rItems.length - 1));
        rDots.forEach((d, i) => d.classList.toggle("on", i === idx));
      };
      regionCards.addEventListener("scroll", rUpdateDots, { passive: true });

      const prevBtn = root.querySelector("#regionPrev");
      const nextBtn = root.querySelector("#regionNext");
      const onPrev = () => regionCards.scrollBy({ left: -rCardStep(), behavior: "smooth" });
      const onNext = () => regionCards.scrollBy({ left: rCardStep(), behavior: "smooth" });
      prevBtn?.addEventListener("click", onPrev);
      nextBtn?.addEventListener("click", onNext);

      const dotHandlers = [];
      rDots.forEach((d, i) => {
        const h = () => regionCards.scrollTo({ left: rCardStep() * i, behavior: "smooth" });
        d.addEventListener("click", h);
        dotHandlers.push([d, h]);
      });

      const onPointerDown = (e) => {
        rDown = true;
        rDragged = false;
        regionCards.classList.add("dragging");
        rStartX = e.clientX;
        rScrollStart = regionCards.scrollLeft;
        regionCards.setPointerCapture(e.pointerId);
      };
      const onPointerMove = (e) => {
        if (!rDown) return;
        const dx = e.clientX - rStartX;
        if (Math.abs(dx) > 4) rDragged = true;
        regionCards.scrollLeft = rScrollStart - dx;
      };
      const onPointerEnd = () => {
        rDown = false;
        regionCards.classList.remove("dragging");
        rUpdateDots();
      };
      const onClickCapture = (e) => { if (rDragged) { e.preventDefault(); e.stopPropagation(); } };
      regionCards.addEventListener("pointerdown", onPointerDown);
      regionCards.addEventListener("pointermove", onPointerMove);
      regionCards.addEventListener("pointerup", onPointerEnd);
      regionCards.addEventListener("pointerleave", onPointerEnd);
      regionCards.addEventListener("click", onClickCapture, true);

      cleanups.push(() => {
        regionCards.removeEventListener("scroll", rUpdateDots);
        prevBtn?.removeEventListener("click", onPrev);
        nextBtn?.removeEventListener("click", onNext);
        dotHandlers.forEach(([d, h]) => d.removeEventListener("click", h));
        regionCards.removeEventListener("pointerdown", onPointerDown);
        regionCards.removeEventListener("pointermove", onPointerMove);
        regionCards.removeEventListener("pointerup", onPointerEnd);
        regionCards.removeEventListener("pointerleave", onPointerEnd);
        regionCards.removeEventListener("click", onClickCapture, true);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <main data-testid="page-package-national" className="pkgNational" ref={rootRef}>
{/* ————— HERO FIJO CON SLIDER ————— */}
<div className="hero" id="top">
  <div className="slides" aria-hidden="true">
    <div className="slide k1 on"><i style={{ backgroundImage: `url(${HERO_PHOTOS[0 % HERO_PHOTOS.length]})` }} /></div>
    <div className="slide k2"><i style={{ backgroundImage: `url(${HERO_PHOTOS[1 % HERO_PHOTOS.length]})` }} /></div>
    <div className="slide k3"><i style={{ backgroundImage: `url(${HERO_PHOTOS[2 % HERO_PHOTOS.length]})` }} /></div>
    <div className="slide k4"><i style={{ backgroundImage: `url(${HERO_PHOTOS[3 % HERO_PHOTOS.length]})` }} /></div>
    <div className="slide k5"><i style={{ backgroundImage: `url(${HERO_PHOTOS[4 % HERO_PHOTOS.length]})` }} /></div>
  </div>
  <div className="hero-inner">
    <div>
      <div className="hero-eyebrow"><span className="label">Mexico</span></div>
      <h1>Why Is Mexico the Best Golf Destination?</h1>
      <p className="hero-sub">No other country offers this exact formula: championship designer architecture, legendary hospitality, incredible gastronomy, and unbeatable value.</p>
      <p className="hero-credibility">Golf in Mexico was founded by a former PGA Tour agent and a Mexican Tour pro to guide you to the best golf experiences in Mexico.</p>
      <div className="hero-ctas">
        <Link to="/trip-builder" className="btn solid">Plan My Trip →</Link>
        <a href="#final" className="btn ghost">Talk to Someone →</a>
      </div>
    </div>
    <div className="thumbs">
      <span className="thumbs-label">The Country</span>
      <div className="thumbs-row">
        <button className="thumb t1 on" data-slide="0" aria-label="Photo 1" style={{ backgroundImage: `url(${HERO_PHOTOS[0 % HERO_PHOTOS.length]})` }} />
        <button className="thumb t2" data-slide="1" aria-label="Photo 2" style={{ backgroundImage: `url(${HERO_PHOTOS[1 % HERO_PHOTOS.length]})` }} />
        <button className="thumb t3" data-slide="2" aria-label="Photo 3" style={{ backgroundImage: `url(${HERO_PHOTOS[2 % HERO_PHOTOS.length]})` }} />
        <button className="thumb t4" data-slide="3" aria-label="Photo 4" style={{ backgroundImage: `url(${HERO_PHOTOS[3 % HERO_PHOTOS.length]})` }} />
        <button className="thumb t5" data-slide="4" aria-label="Photo 5" style={{ backgroundImage: `url(${HERO_PHOTOS[4 % HERO_PHOTOS.length]})` }} />
      </div>
    </div>
  </div>
</div>

{/* ————— ÍNDICE HORIZONTAL ————— */}
<nav className="subnav" id="subnav" aria-label="Index">
  <div className="subnav-inner" id="subnavInner">
    <span className="idx">Index</span>
    <a href="#regions" data-spy="regions">The Regions</a>
    <a href="#handled" data-spy="handled">Everything, Handled</a>
    <a href="#problem" data-spy="problem">The Problem</a>
    <a href="#explore" data-spy="explore">Explore</a>
    <a href="#faq" data-spy="faq">Questions</a>
    <a href="#final" data-spy="final">Talk to Someone</a>
  </div>
</nav>

{/* ————— 02 · SAME COUNTRY, DIFFERENT TRIPS ————— */}
<section className="section" id="regions" style={{paddingTop: "clamp(64px,8vw,100px)"}}>
  <div className="wrap">
    <div className="center-head rv">
      <div className="sec-no">02</div>
      <span className="label">One Country, Five Ways to Play</span>
      <h2>Same Country, Different Trips.</h2>
    </div>
    <div className="regions-body rv">
      <p><b>Mexico City</b> is the one nobody's chasing yet — private member clubs where public access simply doesn't exist. We're the first operator unlocking direct access to CDMX's exclusive gates, pairing historic Tour fairways with experiences that match them.</p>
      <p><b>Punta Mita</b>, in Riviera Nayarit, is the next step up — accessible resort-town courses with the option to reach into signature layouts nearby.</p>
      <p><b>Los Cabos</b> is championship golf — signature designer courses, higher ticket, built for golfers who've already decided the round is the main point of the trip.</p>
      <p><b>Cancún</b> is resort golf — all-inclusive, built for families and mixed groups who want the round to fit around everything else.</p>
      <p><b>Unique Destinations</b> — we also manage handpicked courses worth the flight, outside the four main regions.</p>
      <p>We've played all of it. Tell us what matters most to your group and we'll tell you where to go, not just what to book.</p>
    </div>
  </div>
</section>

{/* ————— 03 · EVERYTHING, HANDLED ————— */}
<section className="section" id="handled">
  <div className="wrap handled-grid">
    <div className="handled-intro rv">
      <div className="sec-no">03</div>
      <span className="label">Wherever You End Up</span>
      <h2 style={{marginTop: "16px"}}>Everything, Handled — Wherever You End Up.</h2>
    </div>
    <div className="handled-list rv">
      <div className="h-item"><div className="h-num">01</div><div><b>Tee Times</b><span>Booked and matched to your group, regardless of destination.</span></div></div>
      <div className="h-item"><div className="h-num">02</div><div><b>Itinerary</b><span>Built around golf first, everything else sequenced around it.</span></div></div>
      <div className="h-item"><div className="h-num">03</div><div><b>Transportation</b><span>Between your stay and every course on the plan.</span></div></div>
      <div className="h-item"><div className="h-num">04</div><div><b>One Point of Contact</b><span>For the whole trip, start to finish.</span></div></div>
    </div>
  </div>
</section>

{/* ————— 04 · THE PROBLEM GOLFERS ACTUALLY HAVE ————— */}
<section className="section" id="problem" style={{paddingTop: "0"}}>
  <div className="wrap">
    <div className="center-head rv">
      <div className="sec-no">04</div>
      <span className="label">The Real Problem</span>
      <h2>The Problem Golfers Actually Have.</h2>
    </div>
    <div className="pa-grid">
      <div className="pa-col rv">
        <span className="pa-kicker">The Problem</span>
        <p>Planning a golf trip to Mexico means fighting total regional fragmentation. You end up with twenty browser tabs open, conflicting forum advice, and a trip that dies in the group chat because nobody knows which coast actually matches your group's budget and handicap spread.</p>
      </div>
      <div className="pa-col answer rv">
        <span className="pa-kicker">The Golf in Mexico Answer</span>
        <p>A sports agent and a Mexican Tour pro have walked over 60 fairways across every region in the country. We don't just push inventory — we match your group to the right destination before you build the wrong itinerary. Tell us your dates, budget, and group profile, and we'll tell you exactly where to fly, how to optimize your spend, and get your whole trip arranged from inside the ropes.</p>
      </div>
    </div>
  </div>
</section>

{/* ————— 05 · EXPLORE BY REGION ————— */}
<section className="section" id="explore" style={{paddingTop: "0"}}>
  <div className="wrap">
    <div className="center-head rv">
      <div className="sec-no">05</div>
      <span className="label">Pick Your Region</span>
      <h2>Explore by Region.</h2>
    </div>
    <div className="region-scroll rv">
      <div className="region-cards" id="regionCards">
        <div className="region-card">
          <div className="region-img" style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${REGION_PHOTOS.cancun})` }} />
          <div className="region-card-body">
            <div>
              <h4>Cancún &amp; Riviera Maya</h4>
              <p>Resort golf, all-inclusive, mid-market.</p>
            </div>
            <Link to="/destinations/cancun-riviera-maya/golf-packages">Explore →</Link>
          </div>
        </div>
        <div className="region-card">
          <div className="region-img" style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${REGION_PHOTOS.loscabos})` }} />
          <div className="region-card-body">
            <div>
              <h4>Los Cabos</h4>
              <p>Signature designer courses, access-driven.</p>
            </div>
            <Link to="/destinations/los-cabos/golf-packages">Explore →</Link>
          </div>
        </div>
        <div className="region-card">
          <div className="region-img" style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${REGION_PHOTOS.vallarta})` }} />
          <div className="region-card-body">
            <div>
              <h4>Puerto Vallarta &amp; Riviera Nayarit</h4>
              <p>Resort-town courses, room to go bigger nearby.</p>
            </div>
            <Link to="/destinations/puerto-vallarta/golf-packages">Explore →</Link>
          </div>
        </div>
        <div className="region-card">
          <div className="region-img" style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${REGION_PHOTOS.cdmx})` }} />
          <div className="region-card-body">
            <div>
              <h4>Mexico City</h4>
              <p>High-altitude, private member clubs, Tour-level fairways.</p>
            </div>
            <Link to="/destinations/mexico-city/private-access">Explore →</Link>
          </div>
        </div>
        <div className="region-card">
          <div className="region-img" style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${REGION_PHOTOS.unique})` }} />
          <div className="region-card-body">
            <div>
              <h4>Unique Destinations</h4>
              <p>Handpicked boutique layouts worth the flight.</p>
            </div>
            <Link to="/destinations/unique-destinations">Explore →</Link>
          </div>
        </div>
      </div>
      <div className="region-scroll-hint">
        <button className="pk-arrow" id="regionPrev" aria-label="Previous region"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button>
        <div className="pk-dots" id="regionDots"><i className="on"></i><i></i><i></i><i></i><i></i></div>
        <button className="pk-arrow" id="regionNext" aria-label="Next region"><svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg></button>
      </div>
    </div>
  </div>
</section>

{/* ————— 06 · FAQ ————— */}
<section className="section" id="faq" style={{paddingTop: "0"}}>
  <div className="faq-wrap">
    <div className="rv">
      <div className="sec-no">06</div>
      <span className="label">Questions</span>
      <h2 style={{margin: "16px 0 20px"}}>FAQ</h2>
    </div>
    <div className="faq-item rv">
      <button className="faq-q" aria-expanded="false">Which destination is best for a first golf trip to Mexico?<span className="x">+</span></button>
      <div className="faq-a"><p>Depends on your group and budget — this is exactly what we help you figure out.</p></div>
    </div>
  </div>
</section>

{/* ————— CTA FINAL ————— */}
<div className="final" id="final">
  <div className="final-bg" aria-hidden="true"></div>
  <div className="final-inner rv">
    <h2>Let's Talk.</h2>
    <p>We value relationships over forms. 15 minutes to align your trip.</p>
    <div className="hero-ctas">
      <Link to="/trip-builder" className="btn solid">Book Call →</Link>
    </div>
    <br/>
    <Link to="/destinations" className="guide-link">Check Out Our Golf Destination Guides →</Link>
  </div>
</div>

<div className="dock" id="dock">
  <Link to="/trip-builder" className="btn solid">Plan My Trip →</Link>
</div>
    </main>
  );
};

export default PackageNationalPage;
