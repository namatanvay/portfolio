import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function AnimatedHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ left: string; top: string }>>([]);

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    const generatedParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setParticles(generatedParticles);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: {
      y: 100,
      opacity: 0,
      scale: 0.8,
      rotateX: -30,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.8,
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-accent-primary opacity-20 rounded-full blur-3xl"
        variants={glowVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent-secondary opacity-20 rounded-full blur-3xl"
        variants={glowVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
      />

      {/* Parallax Background Elements - Only render after hydration */}
      {particles.length > 0 && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
        >
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent-primary rounded-full opacity-20"
              style={{
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-4 md:px-8 relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Camera Icon */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="mb-8"
        >
          <motion.i
            className="fas fa-camera text-6xl md:text-9xl text-gradient"
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* Name with Character Animation */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 overflow-hidden"
          variants={itemVariants}
        >
          {['T', 'A', 'N', 'V', 'A', 'Y', ' ', 'N', 'A', 'M', 'A'].map((char, i) => (
            <motion.span
              key={i}
              className="inline-block text-gradient"
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{
                opacity: 1,
                y: 0,
                rotateX: 0,
              }}
              transition={{
                delay: 0.5 + i * 0.05,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              whileHover={{
                scale: 1.2,
                color: '#FF6B6B',
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.div variants={itemVariants} className="mb-4">
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-light font-semibold"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: 'linear-gradient(90deg, #00CED1, #FF6B6B, #FFB347, #00CED1)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Photography & Videography
          </motion.p>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted mb-12 max-w-3xl mx-auto px-4"
        >
          Capturing life's most precious moments through the lens of creativity and passion
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4"
        >
          <motion.a
            href="/portfolio"
            className="btn btn-primary text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5"
            whileHover={{
              scale: 1.1,
              boxShadow: '0 0 30px rgba(0, 206, 209, 0.6)',
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }}
          >
            <motion.i
              className="fas fa-images mr-2 sm:mr-3"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            View Portfolio
          </motion.a>

          <motion.a
            href="/contact"
            className="btn btn-outline text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5"
            whileHover={{
              scale: 1.1,
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--bg-dark)',
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }
            }}
          >
            <motion.i
              className="fas fa-envelope mr-2 sm:mr-3"
              animate={{
                rotate: [0, -15, 15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="text-accent text-2xl"
            whileHover={{ scale: 1.5 }}
          >
            <i className="fas fa-chevron-down"></i>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
