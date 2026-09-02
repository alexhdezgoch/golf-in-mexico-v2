import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSeo, breadcrumbSchema, faqSchema } from "@/hooks/useSeo";
import "./PackageBookingPage.css";

/* ═══════════════════════════════════════════════════════════════════
   PackageBookingPage — Cancun, Los Cabos, Puerto Vallarta

   This is Pablo's actual page, ported close to verbatim rather than rebuilt
   in the site's component system, per his 2026-08-29 feedback ("Modificaciones
   LPS"): the design, copy, and interaction code (hero slider, scrollspy,
   drag-scroll cards) are his; only the color/font tokens are swapped to GIM's
   real palette (Marcellus/Inter -> Libre Baskerville/Outfit) and the
   structural CSS is scoped under .pkgBooking so it can't leak onto the rest
   of the site (his stylesheet uses bare selectors like `body`, `.btn`,
   `.section` that would otherwise collide globally).

   Verified byte-identical CSS + JS across all three of Pablo's source files
   for this page shape — this is genuinely one template, not three.

   His own hero already has the two CTA buttons pointing at /trip-builder and
   no inline lead form — that satisfies his "send them to trip-builder, not a
   form" note for free once ported literally; the form only existed in an
   earlier componentized rebuild of this page, not in his design.

   Two real fixes applied on top of the port:
     - the reduced-motion savings-counter fallback showed "$1,500+" instead of
       the real $750 figure (see effect below)
     - scroll-behavior:smooth was scoped to a non-scrolling wrapper div in the
       naive CSS port; it now applies to document.documentElement, which is
       what actually scrolls
   ═══════════════════════════════════════════════════════════════════ */

const PackageBookingPage = ({ data }) => {
  const rootRef = useRef(null);
  const saveAmtRef = useRef(null);

  useSeo({
    title: data.seoTitle,
    description: data.seoDescription,
    canonical: data.canonical,
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Destinations", path: "/destinations" },
        { name: data.hubName, path: `/destinations/${data.hub}` },
        { name: data.h1, path: data.canonical },
      ]),
      faqSchema(data.faqs),
    ],
  });

  // Behavior ported near-verbatim from Pablo's vanilla JS (the same script
  // across all three bookable pages — verified byte-identical). Vanilla DOM
  // manipulation rather than React state on purpose: this is imperative,
  // interaction-driven behavior (a hero slider, a scrollspy, a drag-to-scroll
  // carousel) that his design already implements correctly — reimplementing
  // it as React state would be a rewrite, not a port. Two real fixes applied:
  // the reduced-motion counter fallback used to show "$1,500+" instead of the
  // real "$750" figure, and scroll-behavior:smooth is set on the actual
  // scrolling element (documentElement) instead of a non-scrolling wrapper div.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups = [];

    if (!reduced) {
      document.documentElement.style.scrollBehavior = "smooth";
      cleanups.push(() => { document.documentElement.style.scrollBehavior = ""; });
    }

    // reveal
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

    // hero slider with thumbnails
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

    // scrollspy on the horizontal index, auto-centered
    const subnav = root.querySelector("#subnavInner");
    const spyTargets = ["film", "problem", "handled", "faq", "final"];
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

    // mobile dock — shows after the reader clears the hero
    const dock = root.querySelector("#dock");
    const onScroll = () => {
      if (dock) dock.classList.toggle("show", window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    // tabs (no-op on pages without .tab/.panel — present for parity with the
    // shared script across page shapes)
    const tabHandlers = [];
    root.querySelectorAll(".tab").forEach((t) => {
      const h = () => {
        root.querySelectorAll(".tab").forEach((x) => { x.classList.remove("on"); x.setAttribute("aria-selected", "false"); });
        t.classList.add("on");
        t.setAttribute("aria-selected", "true");
        root.querySelectorAll(".panel").forEach((p) => p.classList.toggle("on", p.id === t.dataset.tab));
      };
      t.addEventListener("click", h);
      tabHandlers.push([t, h]);
    });
    cleanups.push(() => tabHandlers.forEach(([t, h]) => t.removeEventListener("click", h)));

    // savings counter — FIXED: always animates to and displays the real
    // figure ($750), including the reduced-motion path, and carries no "+"
    // (Pablo's exact requested copy has none).
    const amt = saveAmtRef.current;
    let counterIO;
    if (amt) {
      const target = +amt.dataset.target;
      if ("IntersectionObserver" in window && !reduced) {
        counterIO = new IntersectionObserver((es) => {
          es.forEach((e) => {
            if (!e.isIntersecting) return;
            counterIO.unobserve(amt);
            let t0 = null;
            const step = (t) => {
              if (!t0) t0 = t;
              const k = Math.min((t - t0) / 1400, 1);
              const eased = 1 - (1 - k) ** 3;
              amt.textContent = `$${Math.round(target * eased).toLocaleString("en-US")}`;
              if (k < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          });
        }, { threshold: 0.6 });
        counterIO.observe(amt);
        cleanups.push(() => counterIO.disconnect());
      } else {
        amt.textContent = `$${target.toLocaleString("en-US")}`;
      }
    }

    // FAQ accordion
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

    // package cards — horizontal carousel: drag-to-scroll + arrows + dots
    const pkCards = root.querySelector("#pkCards");
    if (pkCards) {
      const pkItems = pkCards.querySelectorAll(".pk-card");
      const pkDots = root.querySelectorAll("#pkDots i");
      let isDown = false;
      let startX = 0;
      let scrollStart = 0;
      let dragged = false;

      const pkCardStep = () => pkItems[0].getBoundingClientRect().width + 22;
      const pkUpdateDots = () => {
        let idx = Math.round(pkCards.scrollLeft / pkCardStep());
        idx = Math.max(0, Math.min(idx, pkItems.length - 1));
        pkDots.forEach((d, i) => d.classList.toggle("on", i === idx));
      };
      pkCards.addEventListener("scroll", pkUpdateDots, { passive: true });

      const prevBtn = root.querySelector("#pkPrev");
      const nextBtn = root.querySelector("#pkNext");
      const onPrev = () => pkCards.scrollBy({ left: -pkCardStep(), behavior: "smooth" });
      const onNext = () => pkCards.scrollBy({ left: pkCardStep(), behavior: "smooth" });
      prevBtn?.addEventListener("click", onPrev);
      nextBtn?.addEventListener("click", onNext);

      const dotHandlers = [];
      pkDots.forEach((d, i) => {
        const h = () => pkCards.scrollTo({ left: pkCardStep() * i, behavior: "smooth" });
        d.addEventListener("click", h);
        dotHandlers.push([d, h]);
      });

      const onPointerDown = (e) => {
        isDown = true;
        dragged = false;
        pkCards.classList.add("dragging");
        startX = e.clientX;
        scrollStart = pkCards.scrollLeft;
        pkCards.setPointerCapture(e.pointerId);
      };
      const onPointerMove = (e) => {
        if (!isDown) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 4) dragged = true;
        pkCards.scrollLeft = scrollStart - dx;
      };
      const onPointerEnd = () => {
        isDown = false;
        pkCards.classList.remove("dragging");
        pkUpdateDots();
      };
      const onClickCapture = (e) => { if (dragged) { e.preventDefault(); e.stopPropagation(); } };
      pkCards.addEventListener("pointerdown", onPointerDown);
      pkCards.addEventListener("pointermove", onPointerMove);
      pkCards.addEventListener("pointerup", onPointerEnd);
      pkCards.addEventListener("pointerleave", onPointerEnd);
      pkCards.addEventListener("click", onClickCapture, true);

      cleanups.push(() => {
        pkCards.removeEventListener("scroll", pkUpdateDots);
        prevBtn?.removeEventListener("click", onPrev);
        nextBtn?.removeEventListener("click", onNext);
        dotHandlers.forEach(([d, h]) => d.removeEventListener("click", h));
        pkCards.removeEventListener("pointerdown", onPointerDown);
        pkCards.removeEventListener("pointermove", onPointerMove);
        pkCards.removeEventListener("pointerup", onPointerEnd);
        pkCards.removeEventListener("pointerleave", onPointerEnd);
        pkCards.removeEventListener("click", onClickCapture, true);
      });
    }

    // wide "full film" — muted autoplay once it's in view, pause once it
    // scrolls away. A YouTube embed is a cross-origin iframe, so play/pause
    // on an already-mounted player go through the postMessage command
    // protocol (enablejsapi=1) rather than a DOM method; loop=1+playlist=id
    // makes a single-video iframe loop. No-ops gracefully when data-yt is
    // empty (Cancún and Puerto Vallarta have no video yet).
    const ytCommand = (iframe, func) => {
      iframe.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), "*");
    };
    const wideEl = root.querySelector(".vslot.wide");
    const wideId = (wideEl?.dataset.yt || "").trim();
    let wideIO;
    if (wideEl && wideId && "IntersectionObserver" in window) {
      wideIO = new IntersectionObserver((es) => {
        es.forEach((e) => {
          const v = e.target;
          let iframe = v.querySelector("iframe");
          if (e.isIntersecting) {
            if (!iframe) {
              iframe = document.createElement("iframe");
              iframe.src = `https://www.youtube-nocookie.com/embed/${wideId}?autoplay=1&mute=1&rel=0&playsinline=1&loop=1&playlist=${wideId}&enablejsapi=1`;
              iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
              iframe.allowFullscreen = true;
              v.innerHTML = "";
              v.appendChild(iframe);
              // the static poster lives on this div's own inline style, not
              // just its (now-removed) .v-ph overlay — clear it once the
              // video mounts so no sliver of it shows at the frame's edge
              v.style.backgroundImage = "none";
            } else {
              ytCommand(iframe, "playVideo");
            }
          } else if (iframe) {
            ytCommand(iframe, "pauseVideo");
          }
        });
      }, { threshold: 0.5 });
      wideIO.observe(wideEl);
      cleanups.push(() => wideIO.disconnect());
    }

    // tap the full film to toggle play/pause manually
    const wideHandlers = [];
    if (wideEl && wideId) {
      const h = () => {
        const iframe = wideEl.querySelector("iframe");
        if (!iframe) return;
        ytCommand(iframe, wideEl.classList.contains("yt-paused") ? "playVideo" : "pauseVideo");
        wideEl.classList.toggle("yt-paused");
      };
      wideEl.addEventListener("click", h);
      wideHandlers.push([wideEl, h]);
    }
    cleanups.push(() => wideHandlers.forEach(([v, h]) => v.removeEventListener("click", h)));

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <main data-testid={`page-package-${data.hub}`} className="pkgBooking" ref={rootRef}>
{/* ————— HERO FIJO CON SLIDER ————— */}
<div className="hero" id="top">
  <div className="slides" aria-hidden="true">
    <div className="slide k1 on"><i style={{ backgroundImage: `url(${data.heroPhotos[0 % data.heroPhotos.length]})` }} /></div>
    <div className="slide k2"><i style={{ backgroundImage: `url(${data.heroPhotos[1 % data.heroPhotos.length]})` }} /></div>
    <div className="slide k3"><i style={{ backgroundImage: `url(${data.heroPhotos[2 % data.heroPhotos.length]})` }} /></div>
    <div className="slide k4"><i style={{ backgroundImage: `url(${data.heroPhotos[3 % data.heroPhotos.length]})` }} /></div>
    <div className="slide k5"><i style={{ backgroundImage: `url(${data.heroPhotos[4 % data.heroPhotos.length]})` }} /></div>
  </div>
  <div className="hero-inner">
    <div className="hero-content">
      <div className="hero-eyebrow"><span className="label">{data.heroLabel}</span></div>
      <h1>{data.h1}</h1>
      <p className="hero-sub">{data.heroSub}</p>
      <div className="hero-ctas">
        <a href="https://golf-in-mexico.com/trip-builder" target="_blank" rel="noopener" className="btn solid">Claim Preferred Rates &amp; Perks →</a>
        <a href="#problem" className="btn ghost">Why Us? →</a>
      </div>
      <ul className="hero-perks-list">
        {data.perks.map((p) => <li key={p}>{p}</li>)}
      </ul>
      <div className="hero-dots">
        <button className="thumb t1 on" data-slide="0" aria-label="Photo 1" />
        <button className="thumb t2" data-slide="1" aria-label="Photo 2" />
        <button className="thumb t3" data-slide="2" aria-label="Photo 3" />
        <button className="thumb t4" data-slide="3" aria-label="Photo 4" />
        <button className="thumb t5" data-slide="4" aria-label="Photo 5" />
      </div>
    </div>
  </div>
</div>

{/* ————— ÍNDICE HORIZONTAL (aparece al pasar la foto) ————— */}
<nav className="subnav" id="subnav" aria-label="Index">
  <div className="subnav-inner" id="subnavInner">
    <span className="idx">Index</span>
    <a href="#film" data-spy="film">The Experience</a>
    <a href="#problem" data-spy="problem">Why Book With Us</a>
    <a href="#handled" data-spy="handled">Golf Concierge</a>
    <a href="#faq" data-spy="faq">Questions</a>
    <a href="#final" data-spy="final">Get a Quote</a>
  </div>
</nav>

{/* ————— PROBLEMA / RESPUESTA ————— */}
{/* ————— THE EXPERIENCE ————— */}
<section className="film" id="film">
  <div className="wrap">
    <div className="center-head rv">
      <span className="label">The Experience</span>
      <h2>The Experience, by Golf in Mexico.</h2>
      <p className="lede" style={{margin: "20px auto 0"}}>{data.filmLede}</p>
    </div>
    <div className="film-frame rv">
      <div className="vslot wide" data-yt={data.filmVideoId || ""}>
        <div className="v-ph"><div className="v-play"></div><div className="v-lab"><b>{data.filmLabel}</b>The full film</div></div>
      </div>
      <div className="film-verticals">
        <div className="vphoto" style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${data.heroPhotos[2 % data.heroPhotos.length]})` }}><span>The Resort</span></div>
        <div className="vphoto" style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${data.heroPhotos[3 % data.heroPhotos.length]})` }}><span>The Courses</span></div>
        <div className="vphoto" style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${data.heroPhotos[0 % data.heroPhotos.length]})` }}><span>The Group</span></div>
        <div className="vphoto" style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${data.heroPhotos[1 % data.heroPhotos.length]})` }}><span>The Table</span></div>
        <div className="vphoto" style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${data.heroPhotos[2 % data.heroPhotos.length]})` }}><span>Arrival</span></div>
      </div>
    </div>
    <div className="stamp" style={{marginTop: "32px", justifyContent: "center", display: "flex"}}>
      <div className="stamp-mark">PM</div>
      <div className="stamp-text"><b>Pablo De La Mora</b>PGA / LPGA / WTA Agent, 5+ years</div>
    </div>
  </div>
</section>

<div className="photo-divider pd-1" aria-hidden="true" style={{ backgroundImage: `url(${data.heroPhotos[0]})` }} />

<section className="section" id="problem" style={{paddingTop: "clamp(60px,8vw,100px)"}}>
  <div className="wrap">
    <div className="center-head rv">
      <span className="label">Why Book With Us</span>
      <h2>No 14 Browser Tabs. No Dying Group Chats. No Hidden Markup. Just Insider Access.</h2>
      <p className="lede" style={{margin: "20px auto 0"}}>Give us your dates, budget, and handicaps. We unlock real inventory, transparent pricing, and a Tour-level itinerary tailored to your group.</p>
    </div>

    <div className="pk-scroll rv">
      <div className="pk-cards" id="pkCards">
      <div className="pk-card hot rv">
        <div className="pk-img pk-preferred"><span>Preferred</span></div>
        <div className="pk-card-body">
        <h4>Luxury Stay</h4>
        <div className="pk-tag">5 Star Hotels</div>
        <p className="pk-desc">{data.tiers[0].desc}</p>
        <div className="pk-price">{data.tiers[0].price}<span>{data.tiers[0].priceUnit}</span></div>
        <ul className="pk-list">
          {data.tiers[0].features.map((f) => <li key={f}>{f}</li>)}
        </ul>
        <a href="https://golf-in-mexico.com/trip-builder" target="_blank" rel="noopener" className="btn solid">Claim Preferred Rates &amp; Perks →</a>
        </div>
      </div>

      <div className="pk-card rv">
        <div className="pk-img"><span>Golf-Forward</span></div>
        <div className="pk-card-body">
        <h4>Golf Every Day</h4>
        <div className="pk-tag">Pure Championship Golf</div>
        <p className="pk-desc">Built for the group that came to play, not to lounge.</p>
        <div className="pk-price">{data.tiers[1].price}<span>{data.tiers[1].priceUnit}</span></div>
        <ul className="pk-list">
          {data.tiers[1].features.map((f) => <li key={f}>{f}</li>)}
        </ul>
        <a href="https://golf-in-mexico.com/trip-builder" target="_blank" rel="noopener" className="btn solid">Claim Preferred Rates &amp; Perks →</a>
        </div>
      </div>

      <div className="pk-card rv">
        <div className="pk-img"><span>Budget</span></div>
        <div className="pk-card-body">
        <h4>Golf &amp; Beach</h4>
        <div className="pk-tag">Value for Price</div>
        <p className="pk-desc">For the trip that isn’t only about golf.</p>
        <div className="pk-price">{data.tiers[2].price}<span>{data.tiers[2].priceUnit}</span></div>
        <ul className="pk-list">
          {data.tiers[2].features.map((f) => <li key={f}>{f}</li>)}
        </ul>
        <a href="https://golf-in-mexico.com/trip-builder" target="_blank" rel="noopener" className="btn solid">Claim Preferred Rates &amp; Perks →</a>
        </div>
      </div>
      </div>
      <div className="pk-scroll-hint">
        <button className="pk-arrow" id="pkPrev" aria-label="Previous package"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button>
        <div className="pk-dots" id="pkDots"><i className="on"></i><i></i><i></i></div>
        <button className="pk-arrow" id="pkNext" aria-label="Next package"><svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg></button>
      </div>
    </div>

    <div className="save-strip rv">
      <div className="amt" ref={saveAmtRef} data-target="750">$0</div>
      <div className="lbl">Typically savings $750 per person in GIM Packages</div>
    </div>

    <div className="vs-cta rv" style={{marginTop: "36px"}}><a href="https://golf-in-mexico.com/trip-builder" target="_blank" rel="noopener" className="btn solid">Claim Preferred Rates &amp; Perks →</a></div>
  </div>
</section>

<div className="photo-divider pd-2" aria-hidden="true" style={{ backgroundImage: `url(${data.heroPhotos[4 % data.heroPhotos.length]})` }} />

{/* ————— TIERS ————— */}
{/* ————— THE FILM ————— */}




{/* ————— HANDLED ————— */}
<section className="section" id="handled">
  <div className="wrap handled-grid">
    <div className="handled-intro rv">
      <span className="label">Golf Concierge</span>
      <h2 style={{marginTop: "16px"}}>Curated travel from end to end.</h2>
    </div>
    <div className="handled-list rv">
      <div className="h-item"><div className="h-num">01</div><div><b>Tee Times</b><span>Booked and matched to your group, regardless of destination.</span></div></div>
      <div className="h-item"><div className="h-num">02</div><div><b>Itinerary</b><span>Built around golf first, everything else sequenced around it.</span></div></div>
      <div className="h-item"><div className="h-num">03</div><div><b>Private Transport</b><span>Airport pick up.</span></div></div>
      <div className="h-item"><div className="h-num">04</div><div><b>Curated Dining</b><span>From Michelin-rated spots to local hidden gems.</span></div></div>
      <div className="h-item"><div className="h-num">05</div><div><b>Single Contact</b><span>One dedicated point of contact for everything.</span></div></div>
    </div>
  </div>
</section>

{/* ————— WHO DOES WHAT ————— */}
<section className="section" id="whodoeswhat" style={{paddingTop: "0"}}>
  <div className="wrap">
    <div className="center-head rv">
      <span className="label">Two Operators, Direct Transparency</span>
      <h2>Who Does What.</h2>
    </div>
    <div className="vs-grid" style={{marginTop: "44px"}}>
      <div className="vs-col gim rv" style={{borderColor: "rgba(26,23,20,.14)"}}>
        <h3>Golf in Mexico</h3>
        <p style={{fontSize: ".92rem", lineHeight: "1.7", color: "#3E382C", margin: "0"}}>Plans the golf, arranges rounds, builds the itinerary, runs the concierge desk, and holds the booking.</p>
      </div>
      <div className="vs-col rv">
        <h3>We have Private Villas and Partner Hotels</h3>
        <p style={{fontSize: ".92rem", lineHeight: "1.7", color: "#3E382C", margin: "0"}}>Operates the hotel booking, provides the staff, golf carts, and on-property amenities.</p>
      </div>
    </div>
    <p style={{fontSize: ".85rem", color: "#544C3D", lineHeight: "1.8", marginTop: "32px", maxWidth: "74ch"}}>You know who handles what before paying anything.</p>
    <details className="rd" style={{maxWidth: "74ch"}}>
      <summary>Read More</summary>
      <div className="rd-body">
        <p style={{fontSize: ".85rem", color: "#544C3D", lineHeight: "1.8"}}>Golf in Mexico charges only for golf-related services—green fees, bilingual booking/hosting, and optional cart rentals. Every non-golf element (accommodation, dining, and private transport) is provided and billed directly by our separately licensed local partners. Sample packages are illustrative; prices are indicative and shown in USD. Your final quote is tailored to your group and preferred dates.</p>
      </div>
    </details>
  </div>
</section>

<div className="photo-divider pd-3" aria-hidden="true" style={{ backgroundImage: `url(${data.heroPhotos[2]})` }} />

{/* ————— FAQ ————— */}
<section className="section" id="faq" style={{paddingTop: "0"}}>
  <div className="faq-wrap">
    <div className="rv">
      <span className="label">Questions</span>
      <h2 style={{margin: "16px 0 20px"}}>What golfers actually ask.</h2>
    </div>
    <div className="faq-item rv">
      <button className="faq-q" aria-expanded="false">{data.faqs[0].q}<span className="x">+</span></button>
      <div className="faq-a"><p>{data.faqs[0].a}</p></div>
    </div>
    <div className="faq-item rv">
      <button className="faq-q" aria-expanded="false">{data.faqs[1].q}<span className="x">+</span></button>
      <div className="faq-a"><p>{data.faqs[1].a}</p></div>
    </div>
    <div className="faq-item rv">
      <button className="faq-q" aria-expanded="false">{data.faqs[2].q}<span className="x">+</span></button>
      <div className="faq-a"><p>{data.faqs[2].a}</p></div>
    </div>
  </div>
</section>

{/* ————— FINAL ————— */}
<div className="final" id="final">
  <div className="final-bg" aria-hidden="true"></div>
  <div className="final-inner rv">
    <h2>Let’s Talk.</h2>
    <p>We value relationships over forms. 15 minutes to align your trip.</p>
    <div className="hero-ctas">
      <a href="https://golf-in-mexico.com/trip-builder" target="_blank" rel="noopener" className="btn solid">Book Call &amp; Claim Preferred Rates &amp; Perks →</a>
    </div>
    <br/>
    <Link to={data.guideLinkHref} className="guide-link">{data.guideLinkText} →</Link>
  </div>
</div>

<div className="dock" id="dock">
  <span className="dock-msg">{data.dockMsg}</span>
  <a href="#problem" className="btn ghostd">See Pricing</a>
  <Link to="/trip-builder" className="btn solid">Claim Preferred Rates &amp; Perks →</Link>
</div>
    </main>
  );
};

export default PackageBookingPage;
