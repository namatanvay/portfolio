import { motion } from 'motion/react';

export default function FeaturedWork() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
      rotateY: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      }
    }
  };

  const items = [1, 2, 3, 4, 5, 6];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-center mb-12"
      >
        <motion.h2
          className="text-5xl font-bold mb-4"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          style={{
            background: 'linear-gradient(90deg, #00CED1, #FF6B6B, #00CED1)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Featured Work
        </motion.h2>
        <motion.p
          className="text-muted text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          A selection of my best photography and videography projects
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {items.map((item) => (
          <motion.div
            key={item}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              z: 50,
              transition: {
                type: "spring",
                stiffness: 300,
              }
            }}
            className="card group cursor-pointer overflow-hidden p-0 relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative aspect-[4/3] bg-dark-card overflow-hidden">
              {/* Placeholder */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <motion.i
                  className="fas fa-camera text-8xl text-muted opacity-20"
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent flex items-end p-6"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-2xl font-semibold mb-2">Project {item}</h3>
                  <p className="text-muted">Photography</p>
                </motion.div>
              </motion.div>

              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                style={{ transform: 'translateX(-100%)' }}
                whileHover={{
                  opacity: [0, 0.2, 0],
                  x: ['- 100%', '200%'],
                }}
                transition={{ duration: 0.8 }}
              />
            </div>

            {/* Corner Accent */}
            <motion.div
              className="absolute top-4 right-4 w-3 h-3 bg-accent rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.a
          href="/portfolio"
          className="btn btn-primary text-xl px-8 py-4"
          whileHover={{
            scale: 1.1,
            boxShadow: '0 0 30px rgba(0, 206, 209, 0.6)',
          }}
          whileTap={{ scale: 0.95 }}
        >
          View Full Portfolio
          <motion.i
            className="fas fa-arrow-right ml-3"
            animate={{ x: [0, 5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.a>
      </motion.div>
    </div>
  );
}
