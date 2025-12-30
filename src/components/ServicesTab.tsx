import { motion } from 'motion/react';

export default function ServicesTab() {
  const services = [
    { icon: 'fa-user-circle', title: 'Portrait Photography', desc: 'Professional portraits that capture your essence' },
    { icon: 'fa-ring', title: 'Wedding Photography', desc: 'Your special day, beautifully preserved' },
    { icon: 'fa-video', title: 'Video Production', desc: 'Cinematic videos that tell your story' },
    { icon: 'fa-briefcase', title: 'Commercial Work', desc: 'Professional content for your business' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -60,
      scale: 0.7,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      }
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-center mb-12"
      >
        <motion.h2
          className="text-5xl font-bold mb-4 text-gradient"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Services
        </motion.h2>
        <motion.p
          className="text-muted text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Professional photography and videography services
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              scale: 1.1,
              rotateY: 10,
              z: 50,
            }}
            className="card text-center relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Glowing Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-accent opacity-0 rounded-xl blur-xl"
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className="text-accent text-7xl mb-6 relative"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            >
              <i className={`fas ${service.icon}`}></i>
            </motion.div>

            <motion.h3
              className="text-2xl font-semibold mb-3 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              {service.title}
            </motion.h3>

            <motion.p
              className="text-muted relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {service.desc}
            </motion.p>

            {/* Particle Effect */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-accent rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.a
          href="/services"
          className="btn btn-outline text-xl px-8 py-4"
          whileHover={{
            scale: 1.1,
            backgroundColor: 'var(--accent-primary)',
            color: 'var(--bg-dark)',
          }}
          whileTap={{ scale: 0.95 }}
        >
          View All Services
        </motion.a>
      </motion.div>
    </div>
  );
}
