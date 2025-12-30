import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  video?: string;
  type: 'photo' | 'video';
}

interface GalleryProps {
  items: GalleryItem[];
}

export default function Gallery({ items }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Map category keys to display names
  const categoryLabels: Record<string, string> = {
    'all': 'All',
    'portraits-fashion': 'Portraits/Fashion',
    'events': 'Events',
    'food': 'Food',
    'travel': 'Travel',
  };

  const categories = ['all', ...Array.from(new Set(items.map(item => item.category)))];
  const filteredItems = activeFilter === 'all'
    ? items
    : items.filter(item => item.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.3,
      rotateY: -90,
      y: 100,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      }
    },
    exit: {
      opacity: 0,
      scale: 0.3,
      rotateY: 90,
      y: -100,
      transition: {
        duration: 0.3,
      }
    }
  };

  const filterVariants = {
    inactive: {
      scale: 0.9,
      opacity: 0.6,
    },
    active: {
      scale: 1,
      opacity: 1,
    },
    hover: {
      scale: 1.1,
      y: -3,
    }
  };

  return (
    <>
      {/* Filter Buttons with Animations */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`relative px-8 py-4 rounded-xl font-semibold text-lg capitalize transition-all overflow-hidden ${
              activeFilter === category
                ? 'text-dark'
                : 'text-light bg-dark-card'
            }`}
            variants={filterVariants}
            initial="inactive"
            animate={activeFilter === category ? "active" : "inactive"}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            {/* Active Background */}
            {activeFilter === category && (
              <motion.div
                className="absolute inset-0 bg-gradient-accent"
                layoutId="activeFilter"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}

            {/* Category Label */}
            <span className="relative z-10 flex items-center gap-2">
              <motion.i
                className="fas fa-circle text-xs"
                animate={{
                  scale: activeFilter === category ? [1, 1.5, 1] : 1,
                }}
                transition={{
                  duration: 0.5,
                  repeat: activeFilter === category ? Infinity : 0,
                  repeatDelay: 1,
                }}
              />
              {categoryLabels[category] || category}
            </span>

            {/* Ripple Effect */}
            {activeFilter === category && (
              <motion.div
                className="absolute inset-0 bg-white opacity-20 rounded-xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Gallery Grid with Staggered Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              layout
              onClick={() => setSelectedItem(item)}
              className="card group cursor-pointer overflow-hidden p-0 relative"
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{
                scale: 1.05,
                rotateY: 8,
                z: 50,
                transition: {
                  type: "spring",
                  stiffness: 300,
                }
              }}
            >
              <div className="relative aspect-[4/3] bg-dark-card overflow-hidden">
                {/* Placeholder or Image */}
                {item.image ? (
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ scale: 1.15 }}
                  />
                ) : (
                  <motion.div
                    className="w-full h-full flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.i
                      className={`fas ${item.type === 'video' ? 'fa-play-circle' : 'fa-camera'} text-8xl text-muted opacity-20`}
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                    />
                  </motion.div>
                )}

                {/* Animated Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-transparent flex items-end p-6"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className="text-2xl font-semibold mb-1">{item.title}</h3>
                    <p className="text-muted capitalize">{item.category}</p>
                  </motion.div>
                </motion.div>

                {/* Video Badge */}
                {item.type === 'video' && (
                  <motion.div
                    className="absolute top-4 right-4 bg-dark/90 backdrop-blur-sm rounded-full w-14 h-14 flex items-center justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: index * 0.05,
                    }}
                    whileHover={{
                      scale: 1.2,
                      rotate: 360,
                    }}
                  >
                    <motion.i
                      className="fas fa-play text-accent text-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                )}

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 pointer-events-none"
                  initial={{ x: '-100%' }}
                  whileHover={{
                    x: '200%',
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{ duration: 0.8 }}
                />

                {/* Corner Particles */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-accent rounded-full"
                    style={{
                      top: i < 2 ? '8px' : 'auto',
                      bottom: i >= 2 ? '8px' : 'auto',
                      left: i % 2 === 0 ? '8px' : 'auto',
                      right: i % 2 === 1 ? '8px' : 'auto',
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Lightbox Modal with Heavy Animations */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white text-3xl md:text-4xl hover:text-accent transition-colors z-20"
              onClick={() => setSelectedItem(null)}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-times"></i>
            </motion.button>

            {/* Content */}
            <motion.div
              className="max-w-7xl w-full h-full flex flex-col justify-center"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.5, rotateY: -90, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotateY: 90, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            >
              {/* Image/Video Container - Fixed height for proper layout */}
              <motion.div
                className="relative w-full bg-dark-card rounded-2xl overflow-hidden mb-4 md:mb-6"
                style={{
                  maxHeight: 'calc(100vh - 200px)',
                  height: 'auto',
                  aspectRatio: '16/9'
                }}
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {selectedItem.type === 'video' && selectedItem.video ? (
                  <video
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                    style={{ maxHeight: 'calc(100vh - 200px)' }}
                    poster={selectedItem.image || undefined}
                  >
                    <source src={selectedItem.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : selectedItem.image ? (
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-contain"
                    style={{ maxHeight: 'calc(100vh - 200px)' }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <motion.i
                      className={`fas ${selectedItem.type === 'video' ? 'fa-play-circle' : 'fa-camera'} text-7xl md:text-9xl text-muted opacity-20`}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>
                )}
              </motion.div>

              {/* Info */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.h3
                  className="text-2xl md:text-4xl font-bold text-light mb-2"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    delay: 0.5,
                  }}
                >
                  {selectedItem.title}
                </motion.h3>
                <motion.p
                  className="text-muted text-base md:text-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {categoryLabels[selectedItem.category] || selectedItem.category}
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Background Particles */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-accent rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .bg-accent {
          background-color: var(--accent-primary);
        }

        .text-accent {
          color: var(--accent-primary);
        }

        .text-dark {
          color: var(--bg-dark);
        }

        .text-light {
          color: var(--text-light);
        }

        .text-muted {
          color: var(--text-muted);
        }

        .bg-dark {
          background-color: var(--bg-dark);
        }

        .bg-dark-card {
          background-color: var(--bg-dark-card);
        }

        .bg-dark-elevated {
          background-color: var(--bg-dark-elevated);
        }

        .bg-gradient-accent {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        }
      `}</style>
    </>
  );
}
