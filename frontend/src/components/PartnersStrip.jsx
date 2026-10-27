import siteCourses from "@/data/siteCourses.json";

/* Who we work with: real partners only, each with its logo and what it does for the trip (the same list the trip builder
   shows, from src/data/siteCourses.json). `only` picks some by name, in that order; without it, every partner shows. The price promise
   lives only on the trip builder pages (golf packages, trip builder, comparison). */
const PartnersStrip = ({ only, className = "" }) => {
  const all = siteCourses.partners;
  const list = only ? only.map((n) => all.find((p) => p.name === n)).filter(Boolean) : all;
  if (!list.length) return null;
  return (
    <section
      aria-labelledby="partners-title"
      data-testid="partners-strip"
      className={`bg-[var(--c-off-white)] border-y border-[var(--c-border)] py-14 md:py-16 ${className}`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <h2 id="partners-title" className="font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--c-live)] mb-8">
          Who we work with
        </h2>
        <ul className={`grid gap-8 sm:grid-cols-2 ${list.length > 3 ? "lg:grid-cols-5" : "lg:grid-cols-3"}`}>
          {list.map((p) => (
            <li key={p.name} className="flex min-w-0 flex-col items-start gap-3">
              <a href={p.href} target="_blank" rel="noopener" aria-label={p.name} className="flex h-14 items-center">
                <img
                  src={p.logo}
                  alt={p.name}
                  loading="lazy"
                  className={`object-contain transition ${
                    p.round
                      ? "h-14 w-14 rounded-full"
                      : p.dark
                        ? "h-10 w-auto max-w-[9rem] opacity-80 brightness-0 hover:opacity-100"
                        : "h-10 w-auto max-w-[9rem] opacity-80 grayscale hover:opacity-100 hover:grayscale-0"
                  }`}
                />
              </a>
              <p className="min-w-0 font-body text-[15px] leading-snug">
                <span className="block font-normal text-[var(--c-text)]">{p.name}</span>
                <span className="block font-light text-[var(--c-text-mid)]">{p.role}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PartnersStrip;
