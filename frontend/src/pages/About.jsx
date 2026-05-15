import { motion } from "framer-motion";
import FoundersSlider from "@/components/FoundersSlider";

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
};

const About = () => {
  return (
    <main data-testid="page-about" className="relative bg-cream">
      {/* Header */}
      <section className="relative pt-44 md:pt-52 pb-20 md:pb-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
            >
              Chapter — About
            </motion.span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <motion.h1
              {...fade}
              className="font-display font-light text-ink leading-[0.98] tracking-tight text-5xl md:text-7xl lg:text-[7.5rem]"
            >
              Behind <span className="italic">the journal.</span>
            </motion.h1>
            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 max-w-2xl font-body font-light text-ink/75 text-lg md:text-xl leading-[1.6]"
            >
              Two friends who could not agree, for years, which course in México
              was the most beautiful. They began the journal to settle it. They
              have not.
            </motion.p>
          </div>
        </div>
      </section>


      {/* FOUNDERS — slider with full bios, creds, and quotes */}
      <FoundersSlider />


      {/* THE GIM PROMISE — counterpositioning, named-human trust */}
      <section
        data-testid="gim-promise"
        className="relative bg-ink text-cream py-28 md:py-40"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/60"
            >
              The GIM Promise
            </motion.span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <motion.h2
              {...fade}
              className="font-display font-light text-cream text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl"
            >
              Two names, <span className="italic">one</span> phone, zero
              outsourcing.
            </motion.h2>

            <motion.p
              {...fade}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 font-body font-light text-cream/80 text-lg md:text-xl leading-[1.7] max-w-2xl"
            >
              Every trip we arrange is touched, walked, and confirmed by Pablo
              or José in person. No marketplace, no call centre, no
              sub-affiliate at check-in. If something is wrong at the tee, the
              person who answers the phone is the person who booked it.
            </motion.p>

            <ul className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
              {[
                {
                  k: "01",
                  t: "Walked before written",
                  d: "We do not write about a course we have not played.",
                },
                {
                  k: "02",
                  t: "By name, not by booking",
                  d: "Pablo or José replies within twenty-four hours, in your time zone.",
                },
                {
                  k: "03",
                  t: "Transparent pricing",
                  d: "Quoted once, in full — the way a private dinner is.",
                },
              ].map((p) => (
                <li
                  key={p.k}
                  data-testid={`promise-${p.k}`}
                  className="border-t border-cream/15 pt-5"
                >
                  <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
                    {p.k}
                  </span>
                  <h3 className="mt-3 font-display text-2xl md:text-3xl font-light text-cream leading-tight">
                    {p.t}
                  </h3>
                  <p className="mt-3 font-body font-light text-cream/70 text-base leading-[1.6]">
                    {p.d}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="border-t hairline" />

      {/* Closing */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <motion.span
              {...fade}
              className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted"
            >
              Postscript
            </motion.span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <motion.p
              {...fade}
              className="font-display font-light italic text-ink text-3xl md:text-5xl leading-[1.1] tracking-tight max-w-3xl"
            >
              “This is not a travel agency. It is an editorial brand that
              happens to offer the occasional trip.”
            </motion.p>
          </div>
        </div>
      </section>

      {/* GET IN TOUCH — dark CTA block */}
      <section
        data-testid="get-in-touch"
        className="relative bg-forest text-cream py-32 md:py-48"
      >
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 text-center">
          <motion.span
            {...fade}
            className="font-mono text-[10px] md:text-xs uppercase tracking-wide-editorial text-gold"
          >
            Get in touch
          </motion.span>

          <motion.h2
            {...fade}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 md:mt-16 font-display font-light text-cream leading-[1.05] tracking-tight text-4xl md:text-6xl lg:text-7xl"
          >
            Want to collaborate, share a story,{" "}
            <span className="italic text-gold">or just talk golf?</span>
          </motion.h2>

          <motion.p
            {...fade}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 md:mt-16 font-body font-light text-cream/70 text-base md:text-lg leading-[1.9] max-w-xl mx-auto"
          >
            We are always looking for new courses to cover, people to interview,
            and stories worth telling.
          </motion.p>

          <motion.div
            {...fade}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 md:mt-24"
          >
            <a
              href="mailto:hello@golf-in-mexico.com"
              data-testid="get-in-touch-cta"
              className="group inline-flex items-center gap-4 border border-cream/40 px-10 py-6 hover:bg-cream hover:text-ink transition-colors duration-500"
            >
              <span className="font-mono text-[11px] uppercase tracking-wide-editorial">
                Connect with us
              </span>
              <span className="font-mono text-[11px] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;
