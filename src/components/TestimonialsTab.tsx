import { motion } from 'motion/react';
import { useState } from 'react';

export default function TestimonialsTab() {
  const testimonials = [
    { name: 'Client Name 1', role: 'Wedding Client', text: 'Absolutely stunning work! The photos exceeded all our expectations and captured our special day perfectly.' },
    { name: 'Client Name 2', role: 'Business Owner', text: 'Professional, creative, and delivers on time. The commercial photos boosted our sales tremendously!' },
    { name: 'Client Name 3', role: 'Event Organizer', text: 'Captured our event perfectly. The video was exactly what we needed and more. Highly recommended!' },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      rotateY: -90,
      z: -100,
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      z: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
      }
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" }}
        className="text-center mb-12"
      >
        <motion.h2
          className="text-5xl font-bold mb-4 text-white"
        >
          Client Testimonials
        </motion.h2>
        <motion.p
          className="text-muted text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          What my clients say about working with me
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{
              scale: 1.08,
              rotateY: 5,
              z: 50,
            }}
            className="card relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Animated Background Glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-accent opacity-0 rounded-xl blur-2xl"
              animate={{
                opacity: hoveredIndex === index ? 0.4 : 0,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Quote Icon */}
            <motion.div
              className="text-accent text-6xl mb-4 relative"
              animate={{
                rotate: hoveredIndex === index ? 360 : 0,
                scale: hoveredIndex === index ? 1.2 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
            >
              <i className="fas fa-quote-left"></i>
            </motion.div>

            {/* Testimonial Text */}
            <motion.p
              className="text-light mb-6 italic text-lg relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              "{testimonial.text}"
            </motion.p>

            {/* Divider */}
            <motion.div
              className="border-t border-gray-700 pt-4 relative"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 0.5 + index * 0.1,
                type: "spring",
              }}
            >
              {/* Author Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <p className="font-semibold text-lg">{testimonial.name}</p>
                <p className="text-muted text-sm">{testimonial.role}</p>
              </motion.div>
            </motion.div>

            {/* Stars Animation */}
            <motion.div
              className="absolute top-4 right-4 flex gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.i
                  key={i}
                  className="fas fa-star text-accent text-sm"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.8 + index * 0.1 + i * 0.05,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.3,
                    rotate: 360,
                  }}
                />
              ))}
            </motion.div>

            {/* Floating Particles */}
            {hoveredIndex === index && [...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-accent rounded-full"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                }}
                animate={{
                  x: Math.cos(i * 45 * Math.PI / 180) * 50,
                  y: Math.sin(i * 45 * Math.PI / 180) * 50,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
                style={{
                  left: '50%',
                  top: '50%',
                }}
              />
            ))}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
