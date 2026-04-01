"use client";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const stats = [
  { value: 2, suffix: "+", label: "Projects Completed", desc: "Delivered across industries" },
  { value: 2, suffix: "+", label: "Years Experience", desc: "Building web solutions" },
  { value: 3, suffix: "+", label: "Happy Clients", desc: "Worldwide satisfaction" },
  { value: 2, suffix: "%", label: "Client Satisfaction", desc: "5-star rated work" },
];

export default function StatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: "-50px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-20 border-y border-white/10 bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff8822_1px,transparent_1px),linear-gradient(to_bottom,#00ff8822_1px,transparent_1px)] bg-[size:40px_40px] opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={[
                "relative flex flex-col items-center text-center px-4 py-8",
                // mobile: right border on col 0 (left column), bottom border on row 0 (top two)
                i % 2 === 0 ? "border-r border-white/10" : "",
                i < 2 ? "border-b border-white/10" : "",
                // desktop: reset bottom border, only right border on first 3
                i < 2 ? "lg:border-b-0" : "",
                i < stats.length - 1 ? "lg:border-r border-white/10" : "lg:border-r-0",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* Animated Counter */}
              <div className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent mb-3">
                {inView ? (
                  <CountUp end={stat.value} duration={2} delay={0.2} useEasing />
                ) : (
                  "0"
                )}
                {stat.suffix}
              </div>

              {/* Label */}
              <div className="font-heading font-semibold text-white text-xs sm:text-sm lg:text-base mb-1.5 tracking-wide">
                {stat.label}
              </div>

              {/* Description */}
              <div className="font-body text-xs text-white/40 max-w-[160px] mx-auto leading-relaxed">
                {stat.desc}
              </div>

              {/* Decorative dot — desktop only */}
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute -right-[2px] top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent/30" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}