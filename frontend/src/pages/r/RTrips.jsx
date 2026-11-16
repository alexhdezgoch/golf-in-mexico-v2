import { useState } from "react";
import { useSeo, breadcrumbSchema } from "@/hooks/useSeo";
import tripsEn from "@/data/rtrips.json";
import tripsEsRaw from "@/data/es/rtrips.json";
import { useLang, altLinks, localize, tripTypeLabel, placeLabel, esData } from "@/i18n";

const tripsEs = esData(tripsEsRaw);
import { PhotoHero, TitleBlock, SoftenedCall, Concierge } from "@/components/reverie/R";

/* Trips index (Reverie's journeys page): one picture, the title, a quiet filter by trip type, the cards in a grid. */

const RTrips = () => {
  const lang = useLang();
  const es = lang === "es";
  const trips = es ? tripsEs : tripsEn;
  useSeo({
    title: es ? "Viajes de golf a México por tipo de viaje | GOLF° IN MEXICO°" : "Golf Trips to Mexico by Trip Type | GOLF° IN MEXICO°",
    description: es
      ? "Viajes de golf para parejas, grupos, empresas, familias y lo mejor de México en Los Cabos, Punta Mita, Cancún, Puerto Vallarta, Ciudad de México y San Miguel de Allende."
      : "Couples, groups, corporate, family and Top in Mexico golf trips across Los Cabos, Punta Mita, Cancún, Puerto Vallarta, Mexico City and San Miguel de Allende.",
    canonical: es ? "/es/trips" : "/trips",
    alternates: altLinks("/trips"),
    jsonLd: [breadcrumbSchema([{ name: es ? "Viajes" : "Trips", path: es ? "/es/trips" : "/trips" }])],
  });
  const [type, setType] = useState("All");
  const types = ["All", ...new Set(trips.map((t) => t.type))];
  const shown = type === "All" ? trips : trips.filter((t) => t.type === type);

  return (
    <main data-testid="page-trips" className="bg-[var(--r-cream)] text-[var(--r-ink)]">
      {/* The user's pick from our own stock (2026-11-06): Pacífico's island green from the beach, Punta Mita. */}
      <PhotoHero image="/images/punta-mita/punta-mita-pacifico-island-green-shoreline.webp" alt={es ? "El green en la isla de Pacífico visto desde la playa en Punta Mita" : "Pacífico's island green seen from the beach in Punta Mita"} />
      <TitleBlock eyebrow={es ? "Viajes" : "Trips"} title={es ? "Explora viajes" : "Explore trips"} />

      <div className="px-5 md:px-10 -mt-6 mb-14 flex flex-wrap justify-center gap-x-7 gap-y-3" role="group" aria-label={es ? "Tipo de viaje" : "Trip type"}>
        {types.map((x) => (
          <button key={x} type="button" onClick={() => setType(x)} aria-pressed={type === x} className={`r-hit r-eyebrow pb-1 border-b ${type === x ? "border-[var(--r-green)] text-[var(--r-green)]" : "border-transparent text-[var(--r-ink-soft)] hover:text-[var(--r-green)]"}`}>
            {tripTypeLabel(x, lang)}
          </button>
        ))}
      </div>

      <section data-testid="trips-grid" className="px-5 md:px-10 pb-[120px]">
        <div className="mx-auto max-w-[1300px] grid gap-x-[30px] gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((t) => (
            <a key={t.slug} href={localize(`/trips/${t.slug}`, lang)} className="group flex flex-col">
              <div className="relative aspect-[414/561] overflow-hidden bg-[var(--r-cream-2)]">
                <img src={t.photo || t.image} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]" />
                {t.photo && <span className="absolute left-2 bottom-2 text-[10px] text-white/85 bg-black/30 px-1.5 py-0.5">{es ? "Foto" : "Photo"}: {t.photoCredit}</span>}
              </div>
              <span className="r-eyebrow text-[var(--r-ink-soft)] mt-6">{tripTypeLabel(t.type, lang)} · {placeLabel(t.destination, lang)}</span>
              <span className="r-title text-[19px] text-[var(--r-green)] mt-3">{t.title}</span>
              <span className="r-body text-[14px] mt-3">{t.hotels.join(" · ")}. {t.golfRounds} {es ? "rondas" : "rounds"}.</span>
              <span className="r-link self-start text-[var(--r-green)] mt-5">{es ? "Ver viaje" : "View trip"}</span>
            </a>
          ))}
        </div>
        <p data-testid="trips-illustrative" className="r-body mx-auto mt-16 max-w-[640px] text-center text-[13px] text-[var(--r-ink-soft)]">{es ? "Solo ilustrativo: estos viajes muestran el tipo de viaje de golf que planeamos. Cada viaje se diseña alrededor de tu grupo." : "Illustrative only: these trips show the kind of golf trip we plan. Every trip is designed around your group."}</p>
      </section>

      <SoftenedCall id="trips-close" image="/images/mmtjphx0-gim-stills-33.webp" title={es ? "Planeación gratis hasta que tu viaje de golf quede perfecto." : "Free planning until your golf trip is right."}>
        <p className="r-body text-[14px]">{es ? "Beneficios que no consigues reservando directo. Planeado por un agente de golf y un golfista profesional mexicanos." : "Perks you won't get booking direct. Planned by a golf agent and a pro golfer from Mexico."}</p>
        <Concierge id="trips-close" className="r-btn r-btn-light mt-2" />
      </SoftenedCall>
    </main>
  );
};

export default RTrips;
