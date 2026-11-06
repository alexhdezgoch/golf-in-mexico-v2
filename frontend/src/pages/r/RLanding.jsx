import { useEffect, useState } from "react";
import { useSeo, breadcrumbSchema } from "@/hooks/useSeo";
import trips from "@/data/rtrips.json";
import { PhotoHero, SectionIntro, CardRail, Card, Split, GreenBand, FullBleed, SoftenedCall, Board } from "@/components/reverie/R";

/* Los Cabos golf packages (the ad landing) in the Reverie system. Copy: production AdLanding (v2) word for word, the
   offer the user approved (B) on the close. The 36-Hour Promise is left out: it names the planning fee, and the fee is
   not shown before the call. */

const PAINS = [
  ["Fragmented planning.", "Hours lost to conflicting reviews, anonymous blogs and generic booking sites, and still nothing feels guaranteed."],
  ["The organizer's burden.", "A multi-week spreadsheet, group payments to chase and deposits fronted for the guy who bails late."],
  ["The one-size-fits-all trap.", "A 36-hole crew and a relaxed vacation group need different trips. Booked from afar, you get leftover tee times that don't fit how you play."],
];
const FIXES = [
  ["Tour-level execution.", "Curated by Pablo, a professional tour player manager: tournament coordination for your private group trip."],
  ["One unified itinerary.", "Tee times, lodging, transfers and dinners, locked into a single schedule."],
  ["One link, transparent pricing.", "No spreadsheets. Every golfer sees the full trip and their exact share."],
  ["Curated luxury access.", "Preferred resort rates with VIP amenities, plus vetted private villas and estates."],
];
const DAYS = [
  ["Arrive", "Private airport transfer, check-in and a welcome dinner booked"],
  ["Round 1", "A championship course, with a morning tee time for your group"],
  ["Round 2", "A Top in Mexico course, then the best table in town"],
  ["Round 3", "Your pick: a third round, or spa and beach time"],
  ["Depart", "Private transfer back to the airport"],
];

const RLanding = () => {
  useSeo({ title: "Los Cabos Golf Packages | GOLF° IN MEXICO°", description: "Curated Los Cabos Golf. You Play, We Perfect Every Detail.", canonical: "/destinations/los-cabos/golf-packages", jsonLd: [breadcrumbSchema([{ name: "Los Cabos", path: "/destinations/los-cabos" }, { name: "Golf packages", path: "/destinations/los-cabos/golf-packages" }])], });
  // The matcher opens with Los Cabos picked and keeps the ad's parameters (utm, gclid).
  const [href, setHref] = useState("/trip-builder?place=los-cabos");
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    q.delete("intent");
    q.set("place", "los-cabos");
    setHref(`/trip-builder?${q}`);
  }, []);
  const Btn = ({ id, light }) => (
    <a href={href} data-track="landing_explore" data-track-id={`ad_${id}`} className={`r-btn ${light ? "r-btn-light" : ""}`}>Plan my trip with Pablo</a>
  );
  const caboTrips = trips.filter((t) => t.destination === "Los Cabos");

  return (
    <main data-testid="page-landing" className="bg-[var(--r-cream)] text-[var(--r-ink)] pb-[72px] md:pb-0">
      <PhotoHero image="/media/courses/solmar-golf-links/01.jpg" alt="Solmar Golf Links, Los Cabos">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[rgba(15,22,16,0.7)] via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-5 md:px-10 pb-14 md:pb-20 flex flex-col items-center text-center gap-5 text-[var(--r-cream)]">
          <p className="r-eyebrow">Tired of generic itineraries and group-chat chaos?</p>
          <h1 className="r-title text-[32px] md:text-[52px] max-w-[900px]">Curated Los Cabos Golf.</h1>
          <p className="r-body text-[16px] md:text-[18px]">You Play, We Perfect Every Detail.</p>
          <Btn id="hero" light />
          <p className="text-[12px] opacity-85">100% bespoke · Free, no commitment · Verified Tour Manager credentials</p>
        </div>
      </PhotoHero>

      <GreenBand id="ad-pain">
        <h2 className="r-title text-[24px] md:text-[32px]">Organizing a golf trip shouldn&rsquo;t feel like a second job.</h2>
        <ul className="mt-6 grid gap-8 md:grid-cols-3 text-left max-w-[1000px]">
          {PAINS.map(([lead, text]) => (
            <li key={lead} className="border-t border-[rgba(251,249,243,0.3)] pt-5">
              <strong className="r-title text-[14px] block mb-2">{lead}</strong>
              <span className="r-body text-[14px] opacity-90">{text}</span>
            </li>
          ))}
        </ul>
      </GreenBand>

      <Split id="ad-fix" image="/media/team/pablo-tour.jpg" alt="Pablo De La Mora walking a PGA TOUR round with players" flip>
        <h2 className="r-title text-[26px] md:text-[32px] text-[var(--r-green)]">The Tour Standard</h2>
        <p className="r-body text-[16px] text-[var(--r-green)]">One coordinated itinerary. Zero logistical friction.</p>
        <ul className="flex flex-col gap-4">
          {FIXES.map(([lead, text]) => (
            <li key={lead} className="r-body"><strong className="font-semibold text-[var(--r-green)]">{lead}</strong> {text}</li>
          ))}
        </ul>
        <figure className="flex items-center gap-4 mt-2 border-t border-[rgba(30,57,43,0.2)] pt-5">
          <img src="/media/team/pablo-card.jpg" alt="Pablo De La Mora's 2024 PGA TOUR credential as a player manager" loading="lazy" className="w-20 h-auto" />
          <figcaption className="r-body text-[13px]"><strong className="font-semibold text-[var(--r-green)]">Verified experience.</strong> Backed by Pablo&rsquo;s 2024 professional tour player manager credential.</figcaption>
        </figure>
      </Split>

      <section id="ad-card" className="py-[100px] bg-[var(--r-cream-2)]">
        <SectionIntro title="Your trip, on one card">How a Los Cabos trip comes together. Yours is built around your group.</SectionIntro>
        <div className="mt-[50px]">
          <Board caption="A typical Los Cabos group trip, day by day" head={["Day", "The plan", "Included"]} rows={DAYS.map(([d, p]) => [d, p, "✓"])} />
        </div>
        <p className="r-body text-[13px] text-center mt-6 px-6">Per golfer, all in: best, personalized price for your needs. Priced for your group and dates, confirmed in writing before you book.</p>
        <div className="flex justify-center mt-8"><Btn id="card" /></div>
      </section>

      <section className="py-[100px]">
        <SectionIntro title="Explore trips" />
        <div className="mt-[60px]">
          <CardRail label="Los Cabos trips">
            {caboTrips.map((t) => <Card key={t.slug} href={`/trips/${t.slug}`} image={t.image} eyebrow={t.type} title={t.title} cta="View trip" />)}
          </CardRail>
        </div>
      </section>

      <section id="ad-partners" className="px-6 pb-[100px]">
        <div className="max-w-[640px] mx-auto text-center flex flex-col items-center gap-5">
          <h2 className="r-title text-[22px] md:text-[26px] text-[var(--r-green)]">Transparent, protected billing.</h2>
          <p className="r-body">Each golfer pays their own share and has their own space to see it, and the whole group sees the full trip in one place. Hotels and villas are booked through our registered host agency partners, billed by each property and confirmed in your name. We coordinate every payment, tee times included.</p>
          <p className="r-body text-[13px] text-[var(--r-ink-soft)]">Every price is confirmed in writing before you book.</p>
        </div>
      </section>

      <FullBleed image="/images/los-cabos/hero-oceanfront-green.webp" />

      <SoftenedCall id="ad-cta" image="/images/los-cabos/hero-dune-swing.webp" title="Ready when your group is.">
        <p className="r-body text-[14px]">Tell us your dates and group size. While Pablo builds your bespoke itinerary, you&rsquo;ll see sample Cabo trips and estimated pricing right away.</p>
        <p className="r-body text-[14px]">Free planning until your golf trip is right.</p>
        <Btn id="close" light />
      </SoftenedCall>

      <a href={href} data-track="landing_explore" data-track-id="ad_mbar" className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-[var(--r-green)] text-[var(--r-cream)] px-5 py-3 flex items-center justify-between gap-3">
        <span className="text-[12px] opacity-85">Free custom itinerary · Zero commitment</span>
        <span className="text-[12px] font-semibold uppercase tracking-[0.06em]">Plan my trip with Pablo</span>
      </a>
    </main>
  );
};

export default RLanding;
