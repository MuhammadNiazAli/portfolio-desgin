"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Mail, Sparkles } from "lucide-react";

export default function CTASection() {
  const { ref, inView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.2,
    rootMargin: "-50px 0px"
  });

  return (
    <section 
      ref={ref} 
      className="relative py-20 md:py-28 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] md:w-[600px] lg:w-[800px] h-[300px] md:h-[400px] bg-accent/10 rounded-full blur-[120px] animate-pulse" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff8822_1px,transparent_1px),linear-gradient(to_bottom,#00ff8822_1px,transparent_1px)] bg-[size:50px_50px] opacity-5 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        {/* Decorative Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center justify-center w-12 h-12 mb-6 rounded-full bg-accent/10 border border-accent/20"
        >
          <Sparkles className="w-6 h-6 text-accent" />
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-block font-mono text-xs sm:text-sm tracking-[3px] sm:tracking-[4px] text-accent uppercase mb-4"
        >
          Let's Work Together
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-white mb-5 md:mb-6"
        >
          HAVE A PROJECT
          <br />
          <span className="gradient-text bg-gradient-to-r from-accent via-accent2 to-accent bg-clip-text text-transparent">
            IN MIND?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-body text-white/50 text-sm sm:text-base max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed"
        >
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision. Let's bring your ideas to life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-accent text-black font-mono font-semibold text-sm sm:text-base rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,136,0.4)] hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-3">
              Start a Conversation
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </Link>
          
          <Link
            href="/services"
            className="group relative inline-flex items-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 border border-white/20 text-white font-mono text-sm sm:text-base rounded-full hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">View Services</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-accent/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </Link>
        </motion.div>

        {/* Optional: Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <p className="font-mono text-xs text-white/30">
            📧 mrniazali132@gmail.com &nbsp;&nbsp;|&nbsp;&nbsp; 📱 +92 320 8050617
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}