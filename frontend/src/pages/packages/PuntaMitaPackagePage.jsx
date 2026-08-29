import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSeo, breadcrumbSchema, faqSchema } from "@/hooks/useSeo";
import "./PuntaMitaPackagePage.css";

/* ═══════════════════════════════════════════════════════════════════
   PuntaMitaPackagePage — Pablo's actual golf-in-mexico-punta-mita.html,
   ported close to verbatim (see PackageBookingPage.jsx's header for why:
   same approach, same reasoning).

   This page's shape genuinely differs from the three PackageBookingPage
   destinations — no pricing-tier carousel. Instead: a cost-comparison
   table, a $1,500 savings banner, a 3-course proof grid, and a two-operator
   (Golf in Mexico / Punta Mita Rentals) transparency section. That's why it
   gets its own component rather than reusing PackageBookingPage with a
   different data shape.

   Verified against Pablo's source script: the savings counter here
   genuinely targets $1,500 (not $750 like the other three pages), and the
   "+" suffix in both the counter and its label is his own copy — no fix
   needed, unlike the reduced-motion fallback bug on PackageBookingPage.
   ═══════════════════════════════════════════════════════════════════ */

const PuntaMitaPackagePage = ({ data }) => {
  const rootRef = useRef(null);
  const saveAmtRef = useRef(null);
  const tallVideoRefs = useRef([]);

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

    // scrollspy on the horizontal index, auto-centered — this page's
    // subnav has 6 targets (Pablo's source includes "proof", unlike the
    // 5-target PackageBookingPage script, since only this page has a
    // dedicated Courses/proof-grid section).
    const subnav = root.querySelector("#subnavInner");
    const spyTargets = ["film", "problem", "proof", "handled", "faq", "final"];
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

    // tabs (no-op — no .tab/.panel on this page; present for parity with
    // the shared script base, same as PackageBookingPage)
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

    // savings counter — targets $1,500 with a trailing "+", Pablo's real copy
    const amt = saveAmtRef.current;
    let counterIO;
    if (amt) {
      const target = +amt.dataset.target;
      const suffix = target >= 1500 ? "+" : "";
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
              amt.textContent = `$${Math.round(target * eased).toLocaleString("en-US")}${k >= 1 ? suffix : ""}`;
              if (k < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          });
        }, { threshold: 0.6 });
        counterIO.observe(amt);
        cleanups.push(() => counterIO.disconnect());
      } else {
        amt.textContent = `$${target.toLocaleString("en-US")}${suffix}`;
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

    // wide "full film" — click-to-embed YouTube once a real video ID is supplied
    const wideHandlers = [];
    root.querySelectorAll(".vslot.wide").forEach((v) => {
      const h = () => {
        const id = (v.dataset.yt || "").trim();
        if (!id || v.querySelector("iframe")) return;
        const f = document.createElement("iframe");
        f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
        f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        f.allowFullscreen = true;
        v.innerHTML = "";
        v.appendChild(f);
      };
      v.addEventListener("click", h);
      wideHandlers.push([v, h]);
    });
    cleanups.push(() => wideHandlers.forEach(([v, h]) => v.removeEventListener("click", h)));

    // the 5 vertical clips — muted autoplay/pause as each scrolls in and out
    // of view (Reels-style), not click-to-play: they're short silent teaser
    // loops, unlike the wide slot's deliberate full-film watch with sound.
    const tallVideos = tallVideoRefs.current.filter(Boolean);
    // belt-and-suspenders: the JSX `muted` prop doesn't reliably stick on
    // <video> across browsers/React versions, and an unmuted autoplay()
    // call is silently blocked rather than erroring — so it would look
    // exactly like "doesn't play" again. Force the property directly.
    tallVideos.forEach((v) => { v.muted = true; });
    let filmIO;
    if (tallVideos.length && "IntersectionObserver" in window && !reduced) {
      filmIO = new IntersectionObserver((es) => {
        es.forEach((e) => {
          const vid = e.target;
          const slot = vid.closest(".vslot");
          if (e.isIntersecting) {
            vid.play().catch(() => {});
            slot?.classList.add("playing");
          } else {
            vid.pause();
            slot?.classList.remove("playing");
          }
        });
      }, { threshold: 0.5 });
      tallVideos.forEach((v) => filmIO.observe(v));
      cleanups.push(() => filmIO.disconnect());
    }

    // tap a clip to override the auto-behavior (pause a playing one, resume a paused one)
    const tallClickHandlers = [];
    root.querySelectorAll(".vslot.tall").forEach((slot) => {
      const vid = slot.querySelector("video");
      if (!vid) return;
      const h = () => { if (vid.paused) { vid.play().catch(() => {}); } else { vid.pause(); } };
      slot.addEventListener("click", h);
      tallClickHandlers.push([slot, h]);
    });
    cleanups.push(() => tallClickHandlers.forEach(([s, h]) => s.removeEventListener("click", h)));

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <main data-testid={`page-package-${data.hub}`} className="pkgPuntaMita" ref={rootRef}>
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
    <div>
      <div className="hero-eyebrow"><span className="label">{data.heroLabel}</span></div>
      <h1>{data.h1}</h1>
      <p className="hero-sub">{data.heroSub}</p>
      <div className="perks">
        {data.perks.map((p) => <span className="perk" key={p}>{p}</span>)}
      </div>
      <div className="hero-ctas">
        <a href="https://golf-in-mexico.com/trip-builder" target="_blank" rel="noopener" className="btn solid">Claim Preferred Rates &amp; Perks →</a>
        <a href="#problem" className="btn ghost">Why Us? →</a>
      </div>
    </div>
    <div className="thumbs">
      <span className="thumbs-label">The Peninsula</span>
      <div className="thumbs-row">
        <button className="thumb t1 on" data-slide="0" aria-label="Photo 1" style={{ backgroundImage: `url(${data.heroPhotos[0 % data.heroPhotos.length]})` }} />
        <button className="thumb t2" data-slide="1" aria-label="Photo 2" style={{ backgroundImage: `url(${data.heroPhotos[1 % data.heroPhotos.length]})` }} />
        <button className="thumb t3" data-slide="2" aria-label="Photo 3" style={{ backgroundImage: `url(${data.heroPhotos[2 % data.heroPhotos.length]})` }} />
        <button className="thumb t4" data-slide="3" aria-label="Photo 4" style={{ backgroundImage: `url(${data.heroPhotos[3 % data.heroPhotos.length]})` }} />
        <button className="thumb t5" data-slide="4" aria-label="Photo 5" style={{ backgroundImage: `url(${data.heroPhotos[4 % data.heroPhotos.length]})` }} />
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
    <a href="#proof" data-spy="proof">The Courses</a>
    <a href="#handled" data-spy="handled">Golf Concierge</a>
    <a href="#faq" data-spy="faq">Questions</a>
    <a href="#final" data-spy="final">Get a Quote</a>
  </div>
</nav>

{/* ————— THE EXPERIENCE ————— */}
<section className="film" id="film">
  <div className="wrap">
    <div className="center-head rv">
      <span className="label">The Experience</span>
      <h2>The Experience, by Golf in Mexico.</h2>
      <p className="lede" style={{margin: "20px auto 0"}}>{data.filmLede}</p>
    </div>
    <div className="film-frame rv">
      <div className="vslot wide" data-yt={data.filmVideoId} style={{ backgroundImage: `url(${data.filmWidePhoto})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="v-ph"><div className="v-play"></div><div className="v-lab"><b>{data.filmLabel}</b>The full film</div></div>
      </div>
      <div className="film-verticals">
        {data.filmTall.map((f, i) => (
          <div className="vslot tall" key={f.label}>
            <video
              ref={(el) => { tallVideoRefs.current[i] = el; }}
              className="vslot-video"
              src={f.video}
              poster={f.photo}
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="v-ph"><div className="v-lab"><b>{f.label}</b>Short · 0{i + 1}</div></div>
          </div>
        ))}
      </div>
    </div>
    <div className="stamp" style={{marginTop: "32px", justifyContent: "center", display: "flex"}}>
      <div className="stamp-mark">PM</div>
      <div className="stamp-text"><b>Pablo De La Mora</b>PGA / LPGA / WTA Agent, 5+ years</div>
    </div>
  </div>
</section>

{/* ————— WHY BOOK WITH US ————— */}
<section className="section" id="problem" style={{paddingTop: "clamp(60px,8vw,100px)"}}>
  <div className="wrap">
    <div className="center-head rv">
      <span className="label">Why Book With Us</span>
      <h2>Same 5-Star Hotel Experience. Fraction of the Price.</h2>
      <p className="lede" style={{margin: "20px auto 0"}}>We deliver this trip at a fraction of the resort cost because villas are built for groups. Same courses, same peninsula, same experience. Split across eight players in one villa instead of eight separate hotel rooms, the math changes completely.</p>
    </div>

    <table className="cost-table rv">
      <thead>
        <tr><th>Per Player (USD)</th><th className="gim-col">Golf in Mexico Booking</th><th>Hotel Booking</th></tr>
      </thead>
      <tbody>
        {data.costTable.rows.map((r) => (
          <tr key={r.label}><td>{r.label}</td><td className="gim-col">{r.gim}</td><td>{r.hotel}</td></tr>
        ))}
        <tr className="total"><td>{data.costTable.total.label}</td><td className="gim-col">{data.costTable.total.gim}</td><td>{data.costTable.total.hotel}</td></tr>
      </tbody>
    </table>

    <div className="save-strip rv">
      <div className="amt" ref={saveAmtRef} data-target={data.savingsTarget}>$0</div>
      <div className="lbl">{data.savingsLabel}</div>
    </div>

    <div className="vs-cta rv" style={{marginTop: "36px"}}><a href="https://golf-in-mexico.com/trip-builder" target="_blank" rel="noopener" className="btn solid">Claim Preferred Rates &amp; Perks →</a></div>
  </div>
</section>

{/* ————— VISUAL PROOF ————— */}
<section className="section" id="proof" style={{paddingTop: "0"}}>
  <div className="wrap">
    <div className="center-head rv">
      <span className="label">The Courses</span>
      <h2>{data.proofHeading}</h2>
    </div>
    <div className="proof-grid rv">
      {data.proofCards.map((c) => (
        <div className="pcard" key={c.title} style={{ backgroundImage: `url(${c.photo})` }}>
          <span>{c.title}<small>{c.caption}</small></span>
        </div>
      ))}
    </div>
  </div>
</section>

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
        <h3>Punta Mita Rentals</h3>
        <p style={{fontSize: ".92rem", lineHeight: "1.7", color: "#3E382C", margin: "0"}}>Owns and operates the villas, provides the staff, golf carts, and on-property amenities.</p>
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

{/* ————— FAQ ————— */}
<section className="section" id="faq" style={{paddingTop: "0"}}>
  <div className="faq-wrap">
    <div className="rv">
      <span className="label">Questions</span>
      <h2 style={{margin: "16px 0 20px"}}>What golfers actually ask.</h2>
    </div>
    {data.faqs.map((f) => (
      <div className="faq-item rv" key={f.q}>
        <button className="faq-q" aria-expanded="false">{f.q}<span className="x">+</span></button>
        <div className="faq-a"><p>{f.a}</p></div>
      </div>
    ))}
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

export default PuntaMitaPackagePage;
