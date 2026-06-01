import { useEffect, useState, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════
   SectionNav — Sticky secondary navigation for destination hubs.
   • Sits below the global nav, sticky at top: 72px
   • Horizontal scroll on mobile, active link auto-centers
   • Scrollspy via IntersectionObserver
   ═══════════════════════════════════════════════════════════════════ */

const LINKS = [
  { id: "overview",  label: "Overview" },
  { id: "courses",   label: "Courses" },
  { id: "costs",     label: "Costs" },
  { id: "logistics", label: "Logistics" },
  { id: "season",    label: "Season" },
  { id: "faq",       label: "FAQ" },
];

const OFFSET = 132;

const SectionNav = () => {
  const [active, setActive] = useState(LINKS[0].id);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const sections = LINKS
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.getAttribute("id"));
      },
      { rootMargin: `-${OFFSET}px 0px -60% 0px`, threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Only auto-center the active link in the nav AFTER the user has
    // interacted with the page — otherwise the initial scrollIntoView
    // would force the page to scroll to the nav on mount.
    if (!userInteracted) return;
    const el = document.querySelector(`.section-nav-link[data-id='${active}']`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active, userInteracted]);

  const handleClick = useCallback((e, id) => {
    e.preventDefault();
    setUserInteracted(true);
    const target = document.getElementById(id);
    if (!target) return;
    // Try to scroll to the section's H2 heading so the title lands just below
    // the sticky nav, rather than the section's top edge with padding above it.
    const heading = target.querySelector("h2") || target;
    const top = heading.getBoundingClientRect().top + window.scrollY - OFFSET;
    if (window.__lenis && typeof window.__lenis.scrollTo === "function") {
      window.__lenis.scrollTo(top, { duration: 1.0, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <nav className="section-nav" aria-label="Page sections" data-testid="section-nav">
      <div className="section-nav-inner">
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            data-id={link.id}
            data-testid={`section-nav-${link.id}`}
            onClick={(e) => handleClick(e, link.id)}
            className={`section-nav-link ${active === link.id ? "active" : ""}`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default SectionNav;
