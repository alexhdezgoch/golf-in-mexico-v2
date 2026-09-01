import { useEffect, useRef, useState } from "react";
import { useSeo, breadcrumbSchema, faqSchema } from "@/hooks/useSeo";
import { useHubspotForm } from "@/hooks/useHubspotForm";
import { FORM_KEYS } from "@/config/hubspot";
import { trackLead } from "@/lib/analytics";
import "./PackageWaitlistPage.css";

/* ═══════════════════════════════════════════════════════════════════
   PackageWaitlistPage — Mexico City

   Ported near-verbatim from Pablo's updated v5 "The Dossier" HTML/CSS/JS
   (golf-in-mexico-mexico-city-diciembre, shipped Aug 31 2026). One real
   functional gap closed, same as the prior port: his own join-form JS has
   no backend ("join the list — sin backend", his own comment) — it just
   swaps a CSS class to show a fake "you're on the list" message and drops
   every real signup. Wired to the site's actual capture path
   (destination_waitlist, the same form the other destination-placeholder
   waitlists use) so submissions are not silently discarded.

   v5 shipped all 5 FAQ answers complete — no more "Answer pending" TODO
   markers like the old v4 source had. The FAQS const below is now the
   single source for both the rendered accordion and the FAQPage schema
   (the old file hardcoded FAQ markup separately from the const; that
   duplication is gone).

   Per the agency lead's sign-off on this re-port: the #dock floating
   mobile bar and the .stamp/.stamp-mark/.stamp-text founder-photo callout
   are omitted (markup + CSS — .stamp-mark itself is kept only because the
   join-done confirmation panel reuses that circle style for its "GIM"
   mark, unrelated to the founder callout). The hero uses the homologated
   new-hero layout from PuntaMitaPackagePage (bottom-left .hero-content
   column, corner radial gradient, plain-dot .hero-dots, no thumbnail
   panel) instead of v5's old thumbnail-strip hero, with v5's hero copy
   carried over verbatim. v5's hero has no perks list, so none is invented.
   ═══════════════════════════════════════════════════════════════════ */

const PHOTOS = [
  "/images/duzvawrv-img-3845.webp",
  "/images/7240pgi5-screenshot-2026-06-10-at-1-53-33-p-m.webp",
  "/images/3npawpvw-screenshot-2026-06-10-at-1-53-50-p-m.webp",
  "/images/1hcyue43-screenshot-2026-06-10-at-1-53-59-p-m.webp",
];

const FAQS = [
  { q: "When is this happening?", a: "December 2026. Exact dates confirm the moment we lock 50 committed golfers — you'll hear first if you're on the list." },
  { q: "How many spots are there?", a: "50. This is a single member-only access event, not an open booking calendar — once it's full, it's full." },
  { q: "What's included in the $4,500?", a: "Four days, member-only course access through GIM, two supporting rounds at other courses, a boutique hotel, and dinners, activations, and private transport." },
  { q: "Can I bring a group?", a: "Yes — most of the 50 spots will fill through groups traveling together. Tell us your group size when we follow up." },
  { q: "Does joining the list commit me to anything?", a: "No — it tells us you're serious, and you hear the confirmed date before anyone else." },
];

const CANONICAL = "/destinations/mexico-city/private-access";

const PackageWaitlistPage = () => {
  const rootRef = useRef(null);
  const emailRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const { submit, submitting, error, honeypotProps } = useHubspotForm(FORM_KEYS.destination_waitlist);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await submit({
      email: emailRef.current?.value,
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
    const spyTargets = ["film", "solution", "handled", "join", "faq"];
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

    // wide "full film" — muted autoplay once it's in view, pause once it
    // scrolls away. A YouTube embed is a cross-origin iframe, so play/pause
    // on an already-mounted player go through the postMessage command
    // protocol (enablejsapi=1) rather than a DOM method; loop=1+playlist=id
    // makes a single-video iframe loop.
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
{/* ————— HERO FIJO CON SLIDER (homologated new-hero layout, v5 copy) ————— */}
<div className="hero" id="top">
  <div className="slides" aria-hidden="true">
    <div className="slide k1 on"><i style={{ backgroundImage: `url(${PHOTOS[0 % PHOTOS.length]})` }} /></div>
    <div className="slide k2"><i style={{ backgroundImage: `url(${PHOTOS[1 % PHOTOS.length]})` }} /></div>
    <div className="slide k3"><i style={{ backgroundImage: `url(${PHOTOS[2 % PHOTOS.length]})` }} /></div>
    <div className="slide k4"><i style={{ backgroundImage: `url(${PHOTOS[3 % PHOTOS.length]})` }} /></div>
    <div className="slide k5"><i style={{ backgroundImage: `url(${PHOTOS[4 % PHOTOS.length]})` }} /></div>
  </div>
  <div className="hero-inner">
    <div className="hero-content">
      <div className="hero-eyebrow"><span className="label">Mexico City</span></div>
      <h1>Mexico City's Best Golf Isn't Public — Yet.</h1>
      <p className="hero-sub">We're led by a former PGA Tour agent who has lived in Mexico City for 30 years — these aren't new relationships. They're finally being put to use.</p>
      <div className="hero-ctas">
        <a href="#join" className="btn solid">Join the List →</a>
        <a href="#film" className="btn ghost">See the Opportunity →</a>
      </div>
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
    <a href="#film" data-spy="film">The Opportunity</a>
    <a href="#solution" data-spy="solution">Our Solution</a>
    <a href="#handled" data-spy="handled">Golf Concierge</a>
    <a href="#join" data-spy="join">Join the List</a>
    <a href="#faq" data-spy="faq">Questions</a>
  </div>
</nav>

{/* ————— 01 · THE OPPORTUNITY + VIDEO ————— */}
<section className="film" id="film">
  <div className="wrap">
    <div className="center-head rv">
      <div className="sec-no">01</div>
      <span className="label">The Opportunity</span>
      <h2>Mexico City's best golf isn't public. We're working on that.</h2>
      <p className="lede" style={{margin: "20px auto 0"}}>Clubs here have hosted the biggest names in the sport — Tiger Woods, Dustin Johnson, the WGC-Mexico Championship — and they don't open their gates to outside golfers. We're building the relationships to change that for Mexico City, the way we already have in Los Cabos.</p>
    </div>
    <div className="film-frame rv">
      <div className="vslot wide" data-yt="d-ebc_mJABo">
        <div className="v-ph"><div className="v-play"></div><div className="v-lab"><b>Mexico City, golf-side.</b>The full film</div></div>
      </div>
    </div>
  </div>
</section>

{/* ————— 02 · OUR SOLUTION: MEMBER-ONLY ACCESS ————— */}
<div className="photo-divider pd-1" aria-hidden="true" style={{ backgroundImage: `url(${PHOTOS[1 % PHOTOS.length]})` }} />

<section className="section" id="solution">
  <div className="wrap">
    <div className="center-head rv">
      <div className="sec-no">02</div>
      <span className="label">Our Solution</span>
      <h2>Private clubs don’t say yes to one golfer. They say yes to the room.</h2>
    </div>
    <div className="notyet-body rv">
      <p>So that’s what we’re building: access to a member-only course in Mexico City, through GIM, this December. Four days. Golf at the center, but not the whole trip — two supporting rounds, a boutique hotel, and dinners and activations that only work because the whole group is there together.</p>
      <p><b>$4,500 per person.</b> Member-only course, through GIM access. Everything handled, start to finish.</p>
      <p>The only thing standing between this and a confirmed date on the calendar: <b>50 golfers ready to commit.</b></p>
    </div>
    <div className="spec-line rv" style={{justifyContent: "center", marginTop: "32px"}}>
      <div className="spec-cell"><em>Length</em><b>4 Days</b></div>
      <div className="spec-cell"><em>Access</em><b>Member-Only, via GIM</b></div>
      <div className="spec-cell"><em>Golf</em><b>1 Member Course + 2 Supporting Rounds</b></div>
      <div className="spec-cell"><em>Price</em><b>$4,500 / Person</b></div>
    </div>
    <div className="spots-badge-wrap rv">
      <span className="spots-badge">First to Register, First Option to Buy</span>
    </div>
    <div className="hero-ctas" style={{justifyContent: "center", marginTop: "20px"}}>
      <a href="#join" className="btn solid">Join the List →</a>
    </div>
  </div>
</section>

<div className="photo-divider pd-2" aria-hidden="true" style={{ backgroundImage: `url(${PHOTOS[3 % PHOTOS.length]})` }} />

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

<div className="photo-divider pd-3" aria-hidden="true" style={{ backgroundImage: `url(${PHOTOS[0 % PHOTOS.length]})` }} />

{/* ————— 03 · JOIN THE LIST (solo email, copy que filtra) ————— */}
<section className="section" id="join" style={{paddingTop: "0"}}>
  <div className="wrap">
    <div className="center-head rv">
      <div className="sec-no">03</div>
      <span className="label">Join the List</span>
      <h2>This is for 50 golfers. Not everyone.</h2>
    </div>

    <div className="spots-badge-wrap rv" style={{marginBottom: "22px"}}>
      <span className="spots-badge">First to Register, First Option to Buy</span>
    </div>
    <div className="notyet-body rv" style={{textAlign: "center", maxWidth: "64ch", margin: "0 auto"}}>
      <p>This works if you can travel <b>December 2026</b>, you’re bringing or joining a group, and <b>$4,500 for four days</b> — member-only course access through GIM, two supporting rounds, hotel, dining, and transport — is the trip you’re already looking for.</p>
      <p>If that’s you, leave your email. We confirm the date the moment we lock 50.</p>
    </div>

    {!submitted && (
    <form className="joinform rv" style={{maxWidth: "440px"}} onSubmit={handleSubmit}>
      {error && <p className="join-error">{error}</p>}
      <input {...honeypotProps} name="company" />
      <div className="field"><label htmlFor="jf-email">Email</label><input id="jf-email" type="email" autoComplete="email" placeholder="you@email.com" required ref={emailRef} /></div>
      <button type="submit" className="btn solid joinform-submit" disabled={submitting}>
        {submitting ? "Sending…" : "Join the 50 →"}
      </button>
    </form>
    )}

    {submitted && (
    <div className="joinform join-done rv show">
      <div className="stamp-mark">GIM</div>
      <h3 style={{marginTop: "0"}}>You're in.</h3>
      <p style={{color: "#544C3D", lineHeight: "1.7", marginTop: "10px"}}>We’ll confirm the December date the moment we lock 50 golfers. You hear first — before anyone else.</p>
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
    {FAQS.map((f) => (
      <div className="faq-item rv" key={f.q}>
        <button className="faq-q" aria-expanded="false">{f.q}<span className="x">+</span></button>
        <div className="faq-a"><p>{f.a}</p></div>
      </div>
    ))}
  </div>
</section>

{/* ————— CTA FINAL ————— */}
<div className="final" id="final">
  <div className="final-bg" aria-hidden="true"></div>
  <div className="final-inner rv">
    <h2>Tell Us You're In.</h2>
    <p>We need 50 golfers to make this real. Leave your email — that's it.</p>
    <div className="hero-ctas">
      <a href="#join" className="btn solid">Join the List →</a>
    </div>
  </div>
</div>
    </main>
  );
};

export default PackageWaitlistPage;
