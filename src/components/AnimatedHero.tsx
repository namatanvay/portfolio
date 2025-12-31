import { motion, useReducedMotion } from 'motion/react';
import { useState, useEffect } from 'react';

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
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-20" style={{ background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)' }}>
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: 'linear-gradient(#06B6D4 1px, transparent 1px), linear-gradient(90deg, #06B6D4 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Colorful Ambient Glows - Desktop Only */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)', top: '10%', left: '10%' }}
            animate={prefersReducedMotion ? {} : {
              x: [0, 50, 0],
              y: [0, -30, 0],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
            style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)', bottom: '10%', right: '10%' }}
            animate={prefersReducedMotion ? {} : {
              x: [0, -40, 0],
              y: [0, 40, 0],
              opacity: [0.12, 0.2, 0.12]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full blur-3xl opacity-10"
            style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)', top: '50%', right: '30%' }}
            animate={prefersReducedMotion ? {} : {
              scale: [1, 1.2, 1],
              opacity: [0.08, 0.15, 0.08]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-6 md:px-12 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Top Badge */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/10 border border-accent-primary/30 rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 bg-accent-primary rounded-full animate-pulse" />
              <span className="text-xs uppercase tracking-wider text-accent-primary font-medium" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Available for Projects</span>
            </div>
          </motion.div>

          {/* Name with Gradient */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 leading-none tracking-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-purple">
                TANVAY NAMA
              </span>
            </h1>
          </motion.div>

          {/* Title & Info */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <p className="text-xl sm:text-2xl md:text-3xl text-light font-medium mb-4">
              Photography & Videography
            </p>
            <div className="flex items-center justify-center gap-3 text-sm text-muted" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              <span className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-accent-primary"></i>
                <span>Mumbai, India</span>
              </span>
              <span className="text-accent-primary/30">•</span>
              <span>5+ Years</span>
            </div>
          </motion.div>

          {/* Specialty Tags */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            {['Product', 'Fashion', 'Events', 'Food', 'Portraits'].map((tag, index) => (
              <motion.span
                key={tag}
                className="px-5 py-2.5 bg-dark-card/50 backdrop-blur-sm border border-accent-primary/20 rounded-lg text-sm text-light font-medium hover:border-accent-secondary hover:bg-dark-card transition-all cursor-default"
                whileHover={prefersReducedMotion || isMobile ? {} : {
                  y: -3,
                  borderColor: 'rgba(16, 185, 129, 0.5)',
                  boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <motion.a
              href="/portfolio"
              className="px-10 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold rounded-lg text-lg transition-all"
              whileHover={prefersReducedMotion || isMobile ? {} : {
                scale: 1.05,
                boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)'
              }}
              whileTap={{ scale: 0.97 }}
            >
              <i className="fas fa-images mr-3"></i>
              View Portfolio
            </motion.a>

            <motion.a
              href="/contact"
              className="px-10 py-4 bg-transparent border-2 border-accent-primary/50 text-accent-primary font-semibold rounded-lg text-lg hover:border-accent-primary hover:bg-accent-primary/10 transition-all"
              whileHover={prefersReducedMotion || isMobile ? {} : {
                scale: 1.05,
                boxShadow: '0 0 25px rgba(6, 182, 212, 0.2)'
              }}
              whileTap={{ scale: 0.97 }}
            >
              <i className="fas fa-envelope mr-3"></i>
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      {!isMobile && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={prefersReducedMotion ? { opacity: 0.6 } : { opacity: [0.3, 1, 0.3], y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 0.8, duration: 2, repeat: Infinity },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-muted" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Scroll Down</span>
            <motion.i
              className="fas fa-chevron-down text-accent-primary"
              animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
