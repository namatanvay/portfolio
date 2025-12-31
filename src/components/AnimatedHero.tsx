import { motion, useReducedMotion } from 'motion/react';
import { useState, useEffect } from 'react';

// Use actual files from portfolio
const portfolioImages = [
  '/images/portfolio/portraits/DSC01007.webp',
  '/images/portfolio/portraits/DSC02316.webp',
  '/images/portfolio/food/DSC02218.webp',
  '/images/portfolio/events/TKN00957.webp',
];

export default function AnimatedHero() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative min-h-screen grid lg:grid-cols-2 bg-[#0D0D0D]">
      {/* LEFT: Text Content */}
      <div className="relative flex items-center justify-center px-8 md:px-16 lg:px-20 py-20 lg:py-0 bg-[#0D0D0D] z-10">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Small Label */}
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-neutral-400 mb-8 font-medium" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Mumbai Based Photographer
          </p>

          {/* Huge Name */}
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-black leading-[0.85] mb-10 text-white tracking-tighter">
            TANVAY<br />NAMA
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-neutral-300 mb-12 leading-relaxed max-w-md">
            Visual storytelling through the lens. Specializing in fashion, food, events, and portrait photography.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <a
              href="/portfolio"
              className="group relative px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider overflow-hidden"
            >
              <span className="relative z-10">Explore Work</span>
              <div className="absolute inset-0 bg-neutral-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                Explore Work
              </span>
            </a>
            <a
              href="/contact"
              className="px-8 py-4 border-2 border-neutral-600 text-white font-bold text-sm uppercase tracking-wider hover:border-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>
        </motion.div>
      </div>

      {/* RIGHT: Image Grid */}
      <div className="relative h-[50vh] lg:h-screen bg-[#111111] overflow-hidden">
        <motion.div
          className="grid grid-cols-2 h-full gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          {portfolioImages.map((image, index) => (
            <motion.div
              key={image}
              className="relative overflow-hidden group"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
            >
              <img
                src={image}
                alt={`Portfolio ${index + 1}`}
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                loading={index < 2 ? "eager" : "lazy"}
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Subtle grid lines */}
        <div className="absolute inset-0 border-l border-neutral-800 pointer-events-none" />
      </div>
    </div>
  );
}
