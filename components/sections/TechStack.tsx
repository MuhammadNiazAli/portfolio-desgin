"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const techs = [
  "React JS", "Next JS", "Node JS", "Express JS", "MongoDB", 
  "JavaScript", "TypeScript", "React", "Next.js", "TypeScript", 
  "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Prisma", 
   "Tailwind CSS", "Framer Motion",  "Git", "REST APIs", "Socket.io", "Firebase"
];

export default function TechStack() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isHovered, setIsHovered] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(30);

  // Adjust animation speed based on screen size
  useEffect(() => {
    const updateDuration = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setAnimationDuration(20);
      } else if (width < 1024) {
        setAnimationDuration(25);
      } else {
        setAnimationDuration(30);
      }
    };
    
    updateDuration();
    window.addEventListener('resize', updateDuration);
    return () => window.removeEventListener('resize', updateDuration);
  }, []);

  return (
    <section 
      ref={ref} 
      className="relative py-16 md:py-20 lg:py-24 bg-black border-t border-white/10 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent2/5 pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff8822_1px,transparent_1px),linear-gradient(to_bottom,#00ff8822_1px,transparent_1px)] bg-[size:40px_40px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block font-mono text-xs sm:text-sm tracking-[3px] sm:tracking-[4px] text-accent uppercase mb-3">
            Technology Stack
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
            TOOLS I <span className="gradient-text">USE</span>
          </h2>
          <p className="font-body text-white/40 text-sm mt-4 max-w-2xl mx-auto">
            Leveraging modern technologies to build scalable, performant applications
          </p>
        </motion.div>
      </div>

      {/* Infinite Scroll Container */}
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* First Row - Left to Right */}
        <div className="relative mb-4 md:mb-6 overflow-hidden">
          <div 
            className="flex gap-3 sm:gap-4 md:gap-6"
            style={{
              animation: `marqueeRight ${animationDuration}s linear infinite`,
              animationPlayState: isHovered ? 'paused' : 'running',
              width: 'max-content'
            }}
          >
            {[...techs, ...techs, ...techs].map((tech, i) => (
              <div
                key={`right-${i}`}
                className="flex-shrink-0 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 border border-white/10 rounded-full font-mono text-xs sm:text-sm text-white/50 hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-default whitespace-nowrap bg-white/5 hover:bg-accent/5 backdrop-blur-sm"
              >
                {tech}
              </div>
            ))}
          </div>
          
          {/* Gradient Overlays */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-20 md:w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
        </div>

        {/* Second Row - Right to Left */}
        <div className="relative overflow-hidden opacity-70">
          <div 
            className="flex gap-3 sm:gap-4 md:gap-6"
            style={{
              animation: `marqueeLeft ${animationDuration + 5}s linear infinite`,
              animationPlayState: isHovered ? 'paused' : 'running',
              width: 'max-content'
            }}
          >
            {[...techs, ...techs, ...techs].reverse().map((tech, i) => (
              <div
                key={`left-${i}`}
                className="flex-shrink-0 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 border border-white/10 rounded-full font-mono text-xs sm:text-sm text-white/50 hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-default whitespace-nowrap bg-white/5 hover:bg-accent/5 backdrop-blur-sm"
              >
                {tech}
              </div>
            ))}
          </div>
          
          {/* Gradient Overlays */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-20 md:w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
        </div>
      </div>

      <style jsx>{`
        @keyframes marqueeRight {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        
        @keyframes marqueeLeft {
          0% {
            transform: translateX(-33.33%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}