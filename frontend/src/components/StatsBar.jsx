import { motion } from "framer-motion";

const STATS = [
  { number: "13+", label: "Courses in Los Cabos", gold: false },
  { number: "06", label: "Years inside the ropes", gold: true },
  { number: "03", label: "Destinations covered", gold: false },
  { number: "100", label: "Verified field research", gold: true, suffix: "%" },
];

const StatsBar = () => {
  return (
    <section data-testid="home-stats-bar" className="stats-bar">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="stats-bar-grid">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.7,
                delay: 0.08 * i,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="stat-item"
              data-testid={`stat-${i}`}
            >
              <span className="stat-number">
                {s.gold ? <em>{s.number}</em> : s.number}
                {s.suffix ? <em>{s.suffix}</em> : null}
              </span>
              <span className="stat-label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
