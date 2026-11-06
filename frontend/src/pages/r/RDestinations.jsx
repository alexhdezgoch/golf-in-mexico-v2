import { useSeo, breadcrumbSchema, SITE_URL } from "@/hooks/useSeo";
import { REGIONS } from "@/pages/Destinations";
import { PhotoHero, SoftenedCall, Concierge } from "@/components/reverie/R";

/* All destinations, set like reveriesafaris.com/safari-destinations: one opening picture, a left-set intro, then each
   destination as a large picture (two thirds of the width) with its name, line and link in a narrow column beside it,
   sides alternating down the page, and the closing call. Copy: the production /destinations page, word for word. */

const RDestinations = () => {
  useSeo({
    title: "Golf Destinations in Mexico: Los Cabos, Punta Mita & More",
    description: "Desert and Pacific in Los Cabos, a private peninsula at Punta Mita, private clubs at altitude in Mexico City, the Caribbean at Cancún, and who gets on each.",
    canonical: "/destinations",
    image: "/og/destinations.jpg",
    jsonLd: [
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Destinations", path: "/destinations" }]),
      // The guides on this page, in the order shown (2026-11-04).
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Golf destinations in Mexico",
        itemListElement: REGIONS.map((d, i) => ({ "@type": "ListItem", position: i + 1, name: `Golf in ${d.name}`, url: `${SITE_URL}${d.href}` })),
      },
    ],
  });

  return (
    <main data-testid="page-destinations" className="bg-[var(--r-cream)] text-[var(--r-ink)]">
      <PhotoHero image="/images/w5pux6b7-golfinmexico-156.webp" alt="Golfers on a dune-lined fairway in Los Cabos" />

      <section className="px-5 md:px-10 pt-[100px] md:pt-[120px] pb-[80px] md:pb-[120px]">
        <div className="max-w-[700px] md:ml-[12%] flex flex-col gap-5">
          <span className="r-eyebrow text-[var(--r-ink-soft)]">Across Mexico</span>
          <h1 className="r-title text-[30px] md:text-[42px] text-[var(--r-green)]">Golf destinations in Mexico.</h1>
          <p className="r-body text-[15px]">Curated destination guides and fact-based intelligence for Mexico&apos;s premier golf regions.</p>
        </div>
      </section>

      <section data-testid="regions-section" className="px-5 md:px-10 pb-[120px] flex flex-col gap-16 md:gap-[100px]">
        {REGIONS.map((d, i) => {
          const flip = i % 2 === 1;
          return (
            <article key={d.slug} data-testid={`region-${d.slug}`} className={`flex flex-col gap-8 md:items-start md:justify-between ${flip ? "md:flex-row-reverse" : "md:flex-row"}`}>
              <a href={d.href} className="group block md:w-[64.5%] overflow-hidden" aria-label={d.name}>
                <img src={d.image} alt={`Golf in ${d.name}`} loading={i < 2 ? "eager" : "lazy"} className="w-full aspect-[661/517] object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]" />
              </a>
              <div className="md:w-[24%] md:min-w-[240px] flex flex-col gap-4 md:pt-2">
                <span className="r-eyebrow text-[var(--r-ink-soft)]">{d.region}</span>
                <h2 className="r-title text-[26px] md:text-[30px] text-[var(--r-green)]">{d.name}</h2>
                <p className="r-body text-[14px]">{d.description}</p>
                <a href={d.href} className="r-link self-start text-[var(--r-green)] mt-2">Explore {d.name}</a>
              </div>
            </article>
          );
        })}
      </section>

      <SoftenedCall id="destinations-close" image="/images/d3b1vfc5-gim-stills-36.webp" title="Free planning until your golf trip is right.">
        <p className="r-body text-[14px]">Perks you won&apos;t get booking direct. Planned by a golf agent and a pro golfer from Mexico.</p>
        <div className="flex flex-wrap justify-center items-center gap-6 mt-2">
          <Concierge id="destinations-close" className="r-btn r-btn-light" />
          <a href="/trips" className="r-link">Curated Trips</a>
        </div>
      </SoftenedCall>
    </main>
  );
};

export default RDestinations;
