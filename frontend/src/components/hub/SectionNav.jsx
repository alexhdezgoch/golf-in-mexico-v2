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
    const el = document.querySelector(`.section-nav-link[data-id='${active}']`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  const handleClick = useCallback((e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
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
