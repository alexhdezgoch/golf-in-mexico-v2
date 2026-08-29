import { useEffect, useRef, useState } from "react";
import { useSeo, breadcrumbSchema, faqSchema } from "@/hooks/useSeo";
import { useHubspotForm } from "@/hooks/useHubspotForm";
import { FORM_KEYS } from "@/config/hubspot";
import { trackLead } from "@/lib/analytics";
import "./PackageWaitlistPage.css";

/* ═══════════════════════════════════════════════════════════════════
   PackageWaitlistPage — Mexico City

   Ported near-verbatim from Pablo's own HTML/CSS/JS, same rationale as
   PackageBookingPage.jsx. One real functional gap closed: his own join-form
   JS has no backend ("join the list — chips + submit sin backend" — his own
   comment) — it just swaps a CSS class to show a fake "you're on the list"
   message and drops every real signup. Wired to the site's actual capture
   path (destination_waitlist, the same form the other destination-placeholder
   waitlists use) so submissions are not silently discarded.

   Two of his four FAQ answers read "Answer pending" (his own TODO markers)
   and are omitted — publishing them would ship that text into FAQPage
   schema for AI engines to cite. Same precedent as the VERIFY gate on the
   non-golfer Punta Mita article.
   ═══════════════════════════════════════════════════════════════════ */

const PHOTOS = [
  "/images/duzvawrv-img-3845.webp",
  "/images/7240pgi5-screenshot-2026-06-10-at-1-53-33-p-m.webp",
  "/images/3npawpvw-screenshot-2026-06-10-at-1-53-50-p-m.webp",
  "/images/1hcyue43-screenshot-2026-06-10-at-1-53-59-p-m.webp",
];

const CHIPS = [
  { value: "specific-club", title: "A specific private club", note: "Tell us which one when you're ready" },
  { value: "high-altitude", title: "High-altitude golf, in general", note: "Open to whichever clubs we unlock first" },
  { value: "combine-beach", title: "Combining it with a beach destination", note: "Mexico City plus Los Cabos or Punta Mita" },
];

const FAQS = [
  { q: "Can I play a Mexico City golf course today?", a: "Semi-private and public options exist — the private member clubs are what we're building access to." },
  { q: "Does signing up commit me to anything?", a: "No — it tells us there's demand, and puts you first in line when access opens." },
];

const CANONICAL = "/destinations/mexico-city/private-access";

const PackageWaitlistPage = () => {
  const rootRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const groupRef = useRef(null);
  const datesRef = useRef(null);
  const [chip, setChip] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const { submit, submitting, error, honeypotProps } = useHubspotForm(FORM_KEYS.destination_waitlist);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await submit({
      firstname: nameRef.current?.value,
      email: emailRef.current?.value,
      group: groupRef.current?.value,
      dates: datesRef.current?.value,
      whatMattersMost: chip,
      destination: "mexico-city",
      region: "Mexico City",
    });
    if (!ok) return;
    setSubmitted(true);
    trackLead({ form: "destination_waitlist", destination: "mexico-city" });
  };

  useSeo({
    title: "Mexico City Private Golf Access — Join the List | Golf in Mexico°",
    description:
      "Mexico City's best golf is private, member-guest only. We're building the relationships to open those gates. Join the list and you hear first.",
    canonical: CANONICAL,
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Destinations", path: "/destinations" },
        { name: "Mexico City", path: "/destinations/mexico-city" },
        { name: "Private Access", path: CANONICAL },
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
    const spyTargets = ["film", "notyet", "handled", "join", "faq"];
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

    const videoHandlers = [];
    root.querySelectorAll(".vslot").forEach((v) => {
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
      videoHandlers.push([v, h]);
    });
    cleanups.push(() => videoHandlers.forEach(([v, h]) => v.removeEventListener("click", h)));

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

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <main data-testid="page-package-mexico-city" className="pkgWaitlist" ref={rootRef}>
{/* ————— HERO FIJO CON SLIDER ————— */}
<div className="hero" id="top">
  <div className="slides" aria-hidden="true">
    <div className="slide k1 on"><i style={{ backgroundImage: `url(${PHOTOS[0 % PHOTOS.length]})` }} /></div>
    <div className="slide k2"><i style={{ backgroundImage: `url(${PHOTOS[1 % PHOTOS.length]})` }} /></div>
    <div className="slide k3"><i style={{ backgroundImage: `url(${PHOTOS[2 % PHOTOS.length]})` }} /></div>
    <div className="slide k4"><i style={{ backgroundImage: `url(${PHOTOS[3 % PHOTOS.length]})` }} /></div>
    <div className="slide k5"><i style={{ backgroundImage: `url(${PHOTOS[4 % PHOTOS.length]})` }} /></div>
  </div>
  <div className="hero-inner">
    <div>
      <div className="hero-eyebrow"><span className="label">Mexico City</span></div>
      <h1>Mexico City's Best Golf Isn't Public — Yet.</h1>
      <p className="hero-sub">We're building the relationships to open the doors of Mexico City's private, member-guest clubs — the same way we already have in Los Cabos.</p>
      <div className="hero-ctas">
        <a href="#join" className="btn solid">Join the List →</a>
        <a href="#film" className="btn ghost">See the Opportunity →</a>
      </div>
    </div>
    <div className="thumbs">
      <span className="thumbs-label">The Destination</span>
      <div className="thumbs-row">
        <button className="thumb t1 on" data-slide="0" aria-label="Photo 1" style={{ backgroundImage: `url(${PHOTOS[0 % PHOTOS.length]})` }} />
        <button className="thumb t2" data-slide="1" aria-label="Photo 2" style={{ backgroundImage: `url(${PHOTOS[1 % PHOTOS.length]})` }} />
        <button className="thumb t3" data-slide="2" aria-label="Photo 3" style={{ backgroundImage: `url(${PHOTOS[2 % PHOTOS.length]})` }} />
        <button className="thumb t4" data-slide="3" aria-label="Photo 4" style={{ backgroundImage: `url(${PHOTOS[3 % PHOTOS.length]})` }} />
        <button className="thumb t5" data-slide="4" aria-label="Photo 5" style={{ backgroundImage: `url(${PHOTOS[4 % PHOTOS.length]})` }} />
      </div>
    </div>
  </div>
</div>

{/* ————— ÍNDICE HORIZONTAL (aparece al pasar la foto) ————— */}
<nav className="subnav" id="subnav" aria-label="Index">
  <div className="subnav-inner" id="subnavInner">
    <span className="idx">Index</span>
    <a href="#film" data-spy="film">The Opportunity</a>
    <a href="#notyet" data-spy="notyet">Why Not Yet</a>
    <a href="#handled" data-spy="handled">Golf Concierge</a>
    <a href="#join" data-spy="join">Join the List</a>
    <a href="#faq" data-spy="faq">Questions</a>
  </div>
</nav>

{/* ————— 01 · THE OPPORTUNITY + VIDEO (espacio del video sin cambios) ————— */}
<section className="film" id="film">
  <div className="wrap">
    <div className="center-head rv">
      <div className="sec-no">01</div>
      <span className="label">The Opportunity</span>
      <h2>Mexico City's best golf isn't public. We're working on that.</h2>
      <p className="lede" style={{margin: "20px auto 0"}}>Clubs here have hosted the biggest names in the sport — Tiger Woods, Dustin Johnson, the WGC-Mexico Championship — and they don't open their gates to outside golfers. We're building the relationships to change that for Mexico City, the way we already have in Los Cabos.</p>
    </div>
    <div className="film-frame rv">
      <div className="vslot wide" data-yt="">
        <div className="v-ph"><div className="v-play"></div><div className="v-lab"><b>Mexico City, golf-side.</b>The full film</div></div>
      </div>
      <div className="film-verticals">
        <div className="vphoto" style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${PHOTOS[2 % PHOTOS.length]})` }}><span>The Clubs</span></div>
        <div className="vphoto" style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${PHOTOS[3 % PHOTOS.length]})` }}><span>The City</span></div>
        <div className="vphoto" style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${PHOTOS[0 % PHOTOS.length]})` }}><span>The History</span></div>
        <div className="vphoto" style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${PHOTOS[1 % PHOTOS.length]})` }}><span>The Group</span></div>
        <div className="vphoto" style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${PHOTOS[2 % PHOTOS.length]})` }}><span>Arrival</span></div>
      </div>
    </div>
    <div className="stamp" style={{marginTop: "32px", justifyContent: "center", display: "flex"}}>
      <div className="stamp-mark">PM</div>
      <div className="stamp-text"><b>Pablo De La Mora</b>PGA / LPGA / WTA Agent, 5+ years</div>
    </div>
  </div>
</section>

{/* ————— 02 · WHY THIS ISN'T A BOOKING PAGE YET ————— */}
<section className="section" id="notyet">
  <div className="wrap">
    <div className="center-head rv">
      <div className="sec-no">02</div>
      <span className="label">Not Yet Bookable</span>
      <h2>Why this isn't a booking page yet.</h2>
    </div>
    <div className="notyet-body rv">
      <p>Most of our destinations, you can book today. Mexico City is different — the courses that matter here are private, member-guest clubs, some public. No rack rate, no outside bookings, no amount of calling changes that.</p>
      <p>Getting access to a club like that isn't a transaction. It's a relationship, and relationships get built faster when there's real demand standing behind them. That's what this page is for.</p>
      <p>Leave your info and you're on the list. As we lock in access, you hear first — and you'll have already told us exactly what kind of trip you're waiting for.</p>
    </div>
  </div>
</section>

{/* ————— GOLF CONCIERGE ————— */}
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

{/* ————— 03 · JOIN THE LIST (formulario, sin backend) ————— */}
<section className="section" id="join" style={{paddingTop: "0"}}>
  <div className="wrap">
    <div className="center-head rv">
      <div className="sec-no">03</div>
      <span className="label">Join the List</span>
      <h2>Tell us what you're waiting for.</h2>
    </div>

    {!submitted && (
    <form className="joinform rv" onSubmit={handleSubmit}>
      {error && <p className="join-error">{error}</p>}
      <input {...honeypotProps} name="company" />
      <div className="field-row">
        <div className="field"><label htmlFor="jf-name">Name</label><input id="jf-name" type="text" autoComplete="name" required ref={nameRef} /></div>
        <div className="field"><label htmlFor="jf-email">Email</label><input id="jf-email" type="email" autoComplete="email" required ref={emailRef} /></div>
      </div>
      <div className="field"><label htmlFor="jf-group">Group Size</label><input id="jf-group" type="number" min="1" placeholder="4" ref={groupRef} /></div>
      <div className="field"><label htmlFor="jf-dates">Approximate Season or Dates</label><input id="jf-dates" type="text" placeholder="e.g. Spring 2027" ref={datesRef} /></div>
      <div className="field">
        <label>What Matters Most</label>
        <div className="chip-row">
          {CHIPS.map((c) => (
            <button
              key={c.value}
              type="button"
              className={`chip${chip === c.value ? " sel" : ""}`}
              onClick={() => setChip(c.value)}
            >
              <b>{c.title}</b><span>{c.note}</span>
            </button>
          ))}
        </div>
      </div>
      <button type="submit" className="btn solid joinform-submit" disabled={submitting}>
        {submitting ? "Sending…" : "Join the List →"}
      </button>
    </form>
    )}

    {submitted && (
    <div className="joinform join-done rv show">
      <div className="stamp-mark">GIM</div>
      <h3 style={{marginTop: "0"}}>You're on the list.</h3>
      <p style={{color: "#544C3D", lineHeight: "1.7", marginTop: "10px"}}>As we lock in access, you hear first. Thanks for telling us exactly what you're waiting for.</p>
    </div>
    )}
  </div>
</section>

{/* ————— 04 · FAQ ————— */}
<section className="section" id="faq" style={{paddingTop: "0"}}>
  <div className="faq-wrap">
    <div className="rv">
      <div className="sec-no">04</div>
      <span className="label">Questions</span>
      <h2 style={{margin: "16px 0 20px"}}>FAQ</h2>
    </div>
    <div className="faq-item rv">
      <button className="faq-q" aria-expanded="false">Can I play a Mexico City golf course today?<span className="x">+</span></button>
      <div className="faq-a"><p>Semi-private and public options exist — the private member clubs are what we're building access to.</p></div>
    </div>
    <div className="faq-item rv">
      <button className="faq-q" aria-expanded="false">Does signing up commit me to anything?<span className="x">+</span></button>
      <div className="faq-a"><p>No — it tells us there's demand, and puts you first in line when access opens.</p></div>
    </div>
  </div>
</section>

{/* ————— CTA FINAL ————— */}
<div className="final" id="final">
  <div className="final-bg" aria-hidden="true"></div>
  <div className="final-inner rv">
    <h2>Tell Us You're Interested.</h2>
    <p>That's what gets a club like this to say yes.</p>
    <div className="hero-ctas">
      <a href="#join" className="btn solid">Join the List →</a>
    </div>
  </div>
</div>

<div className="dock" id="dock">
  <a href="#join" className="btn solid">Join the List →</a>
</div>
    </main>
  );
};

export default PackageWaitlistPage;
