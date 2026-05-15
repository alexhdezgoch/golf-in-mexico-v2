import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
};

const ManifestoMeta = ({ number, label, name, role, photo, photoPosition, isMark, accent }) => (
  <div className="col-span-12 md:col-span-3">
    <motion.span
      {...fade}
      className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted block"
    >
      {number} — {label}
    </motion.span>

    <motion.div
      {...fade}
      transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="mt-8 flex items-center gap-4"
    >
      <span
        className={`relative inline-flex shrink-0 w-14 h-14 rounded-full overflow-hidden ${
          isMark ? "bg-ink p-2.5 flex items-center justify-center" : ""
        }`}
        style={{ outline: `1px solid ${accent}`, outlineOffset: 3 }}
      >
        {isMark ? (
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-contain"
            style={{ mixBlendMode: "screen" }}
          />
        ) : (
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover"
            style={{ objectPosition: photoPosition }}
          />
        )}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-xl font-light text-ink tracking-tight">{name}</span>
        <span
          className="mt-1 font-mono text-[10px] uppercase tracking-wide-editorial"
          style={{ color: accent }}
        >
          {role}
        </span>
      </span>
    </motion.div>
  </div>
);

const PabloManifesto = () => (
  <article
    data-testid="manifesto-pablo"
    className="grid grid-cols-12 gap-8 py-24 md:py-36 border-t hairline"
  >
    <ManifestoMeta
      number="N° 02"
      label="The Agent"
      name="Pablo De La Mora"
      role="Sports Agent"
      photo="/pablo.jpg"
      photoPosition="center 22%"
      accent="#2C4A2C"
    />

    <div className="col-span-12 md:col-span-9">
      <motion.span
        {...fade}
        className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted block"
      >
        Manifesto · By Pablo
      </motion.span>

      <motion.h3
        {...fade}
        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 font-display font-light text-ink text-4xl md:text-6xl lg:text-[5.25rem] leading-[1.02] tracking-tight max-w-4xl"
      >
        Most golf trips fail{" "}
        <span className="italic">before they begin.</span>
      </motion.h3>

      <motion.p
        {...fade}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 font-body font-light text-ink/80 text-lg md:text-xl leading-[1.75] max-w-2xl"
      >
        They are sold, not designed. I have spent years inside the ropes —
        Tour weeks, pro environments, premium itineraries — and the
        difference is never the course. It is the decisions made around it.
      </motion.p>

      <motion.p
        {...fade}
        transition={{ duration: 1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 font-body font-light text-ink/80 text-lg md:text-xl leading-[1.75] max-w-2xl"
      >
        The right tee time on the right day. The room two minutes from where
        you actually want to be. The car that does not make you wait. The
        dinner that does not feel transactional. Done well, a golf trip stops
        being a logistics problem — and becomes the reason you book the next
        one.
      </motion.p>

      <motion.blockquote
        {...fade}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14 max-w-3xl border-l-2 border-forest pl-6"
      >
        <p className="font-display italic font-light text-ink text-2xl md:text-3xl leading-[1.25] tracking-tight">
          My job is to remove every line between you and the round you came
          here for.
        </p>
      </motion.blockquote>

      <motion.div
        {...fade}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-ink/15 pt-6"
      >
        <span className="font-display italic font-light text-ink/70 text-base md:text-lg">
          — Pablo De La Mora, signing dispatches from Los Cabos.
        </span>
        <Link
          to="/journal"
          data-testid="manifesto-cta-pablo"
          className="group inline-flex items-center gap-3 border border-ink/40 px-5 py-3 hover:bg-ink hover:text-cream transition-colors duration-500"
        >
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial">
            Read Pablo in the Journal
          </span>
          <span className="font-mono text-[10px] transition-transform duration-500 group-hover:translate-x-0.5">
            ↗
          </span>
        </Link>
      </motion.div>
    </div>
  </article>
);

const JoseManifesto = () => (
  <article
    data-testid="manifesto-jose"
    className="grid grid-cols-12 gap-8 py-24 md:py-36 border-t hairline"
  >
    <ManifestoMeta
      number="N° 03"
      label="The Player"
      name="José Islas"
      role="Professional Golfer"
      photo="/jose.jpg"
      photoPosition="center 22%"
      accent="#C4A24E"
    />

    <div className="col-span-12 md:col-span-9">
      <motion.span
        {...fade}
        className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted block"
      >
        Manifesto · By José
      </motion.span>

      <motion.h3
        {...fade}
        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 font-display font-light text-ink text-4xl md:text-6xl lg:text-[5.25rem] leading-[1.02] tracking-tight max-w-4xl"
      >
        Every course tells you what round it wants you to{" "}
        <span className="italic">play.</span>
      </motion.h3>

      <motion.p
        {...fade}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 font-body font-light text-ink/80 text-lg md:text-xl leading-[1.75] max-w-2xl"
      >
        Most golfers are too busy fighting it to listen. I have played
        México's finest layouts at every level — junior, amateur,
        professional — and the lesson repeats. The grass, the wind, the line
        off the tee are all part of the same conversation.
      </motion.p>

      <motion.p
        {...fade}
        transition={{ duration: 1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 font-body font-light text-ink/80 text-lg md:text-xl leading-[1.75] max-w-2xl"
      >
        Mexican courses speak a particular dialect. Paspalum that holds the
        ball. Greens that read the ocean. Altitudes that lie about distance.
        My role here is to translate — so you walk the first tee already
        knowing what the course is asking, and you give it the answer it
        wants.
      </motion.p>

      <motion.blockquote
        {...fade}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14 max-w-3xl border-l-2 border-gold pl-6"
      >
        <p className="font-display italic font-light text-ink text-2xl md:text-3xl leading-[1.25] tracking-tight">
          A good round is not played against the course. It is played with
          it.
        </p>
      </motion.blockquote>

      <motion.div
        {...fade}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-ink/15 pt-6"
      >
        <span className="font-display italic font-light text-ink/70 text-base md:text-lg">
          — José Islas, writing from inside the ropes.
        </span>
        <Link
          to="/journal"
          data-testid="manifesto-cta-jose"
          className="group inline-flex items-center gap-3 border border-ink/40 px-5 py-3 hover:bg-ink hover:text-cream transition-colors duration-500"
        >
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial">
            Read José in the Journal
          </span>
          <span className="font-mono text-[10px] transition-transform duration-500 group-hover:translate-x-0.5">
            ↗
          </span>
        </Link>
      </motion.div>
    </div>
  </article>
);

const VALUES = [
  {
    roman: "I",
    title: "Professional Management",
    body:
      "Built around elite golfers and Tour-level environments. Structure over improvisation — every detail engineered to dissolve before you notice it.",
  },
  {
    roman: "II",
    title: "Destination Intelligence",
    body:
      "Six years traveling México's finest golf destinations. Trusted relationships across hospitality, golf, and logistics — never generic packages.",
  },
  {
    roman: "III",
    title: "Long-Term Relationships",
    body:
      "This is not a booking platform. It is a relationship-driven practice. Every trip is the start of the next one — not a transaction.",
  },
];

const GIMManifesto = () => (
  <article
    data-testid="manifesto-gim"
    className="grid grid-cols-12 gap-8 py-24 md:py-36 border-t hairline"
  >
    <ManifestoMeta
      number="N° 04"
      label="The Practice"
      name="Golf in Mexico°"
      role="Our Values"
      photo="/logo-wordmark.png"
      photoPosition="center"
      isMark
      accent="#1A1A18"
    />

    <div className="col-span-12 md:col-span-9">
      <motion.span
        {...fade}
        className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted block"
      >
        Manifesto · Our Values
      </motion.span>

      <motion.h3
        {...fade}
        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 font-display font-light text-ink text-4xl md:text-6xl lg:text-[5.25rem] leading-[1.02] tracking-tight max-w-4xl"
      >
        Three principles.{" "}
        <span className="italic">Every trip, every story.</span>
      </motion.h3>

      <motion.p
        {...fade}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 font-body font-light text-ink/80 text-lg md:text-xl leading-[1.75] max-w-2xl"
      >
        We do not write travel guides. We write the reasons we keep
        returning. Three principles shape every conversation, every page,
        and every trip we touch.
      </motion.p>

      <ul className="mt-16 md:mt-20 grid grid-cols-1 gap-px bg-ink/10 border-t border-b border-ink/10">
        {VALUES.map((v, i) => (
          <motion.li
            key={v.roman}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
            data-testid={`gim-value-${i + 1}`}
            className="bg-cream grid grid-cols-12 gap-6 py-8 md:py-10 px-1"
          >
            <div className="col-span-12 md:col-span-2">
              <span className="font-display italic font-light text-gold text-3xl md:text-5xl leading-none">
                {v.roman}
              </span>
            </div>
            <div className="col-span-12 md:col-span-4">
              <h4 className="font-display font-light text-ink text-2xl md:text-3xl leading-[1.1] tracking-tight">
                {v.title}
              </h4>
            </div>
            <div className="col-span-12 md:col-span-6">
              <p className="font-body font-light text-ink/75 text-base md:text-lg leading-[1.7]">
                {v.body}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>

      <motion.div
        {...fade}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-16 md:mt-20"
      >
        <p className="font-display italic font-light text-ink text-2xl md:text-3xl leading-[1.25] tracking-tight max-w-2xl">
          The full editorial — destinations, courses, and the field notes —
          lives in one place.
        </p>

        <Link
          to="/journal"
          data-testid="manifesto-cta-gim-journal"
          className="group mt-10 inline-flex items-center gap-4 bg-ink text-cream px-7 md:px-9 py-5 md:py-6 hover:bg-forest transition-colors duration-500"
        >
          <span className="font-mono text-[11px] uppercase tracking-wide-editorial">
            Enter the Journal
          </span>
          <span className="font-mono text-base transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </motion.div>
    </div>
  </article>
);

const TeamEditorial = () => {
  return (
    <section
      data-testid="team-editorial-section"
      className="relative bg-cream"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <PabloManifesto />
        <JoseManifesto />
        <GIMManifesto />
      </div>
    </section>
  );
};

export default TeamEditorial;
