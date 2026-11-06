/* The production guide's depth sections, back in the short guides (user, 2026-11-05: "mantener lo que ya habíamos curado"):
   the overview ("what you need to understand first"), what moves the price (the two callouts) and Getting there. The text is
   the published guide's (src/data/hubs.js, Los Cabos: src/data/rcaboGuide.js), restyled in the Reverie system: plain
   columns under thin rules, no boxes, no icons. */

const rule = "border-t border-[rgba(30,57,43,0.2)] pt-4";

const Heading = ({ label, pre, em }) => (
  <div className="flex flex-col gap-4">
    {label && <span className="r-eyebrow text-[var(--r-ink-soft)]">{label}</span>}
    <h2 className="r-title text-[26px] md:text-[34px] text-[var(--r-green)]">
      {[pre, em].filter(Boolean).join(" ")}
    </h2>
  </div>
);

/** Overview: a left-set heading and the guide's paragraphs. */
export const GuideOverview = ({ id = "overview", label, pre, em, paragraphs = [] }) =>
  paragraphs.length ? (
    <section id={id} data-testid="guide-overview" className="px-5 md:px-10 py-[100px] scroll-mt-24">
      <div className="max-w-[760px] md:ml-[12%] flex flex-col gap-6">
        <Heading label={label} pre={pre} em={em} />
        {paragraphs.map((p) => <p key={p.slice(0, 32)} className="r-body text-[16px]">{p}</p>)}
      </div>
    </section>
  ) : null;

/** What moves the price: heading, the guide's intro line and its callouts side by side. */
export const GuideCosts = ({ id = "costs", label, pre, em, intro, callouts = [], link }) =>
  callouts.length ? (
    <section id={id} data-testid="guide-costs" className="px-5 md:px-10 py-[100px] bg-[var(--r-cream-2)] scroll-mt-24">
      <div className="max-w-[1100px] mx-auto flex flex-col gap-10">
        <div className="max-w-[760px] flex flex-col gap-5">
          <Heading label={label} pre={pre} em={em} />
          {intro && <p className="r-body text-[16px]">{intro}</p>}
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {callouts.map(([t, b]) => (
            <div key={t} className={`flex flex-col gap-2 ${rule}`}>
              <h3 className="r-title text-[16px] text-[var(--r-green)]">{t}</h3>
              <p className="r-body text-[15px]">{b}</p>
            </div>
          ))}
        </div>
        {link}
      </div>
    </section>
  ) : null;

/** Getting there: four short columns (airport, to the courses, between courses, currency and tips). */
export const GuideLogistics = ({ id = "getting-there", label, pre, em, items = [] }) =>
  items.length ? (
    <section id={id} data-testid="guide-logistics" className="px-5 md:px-10 py-[100px] scroll-mt-24">
      <div className="max-w-[1100px] mx-auto flex flex-col gap-10">
        <Heading label={label} pre={pre} em={em} />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map(([t, b]) => (
            <div key={t} className={`flex flex-col gap-2 ${rule}`}>
              <h3 className="r-title text-[15px] text-[var(--r-green)]">{t}</h3>
              <p className="r-body text-[14px]">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : null;
