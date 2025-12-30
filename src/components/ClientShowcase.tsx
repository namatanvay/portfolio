import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ClientWork {
  id: number;
  title: string;
  category: string;
  image: string;
  video?: string;
  type: 'photo' | 'video';
}

interface Client {
  name: string;
  description: string;
  work: ClientWork[];
}

interface ClientShowcaseProps {
  clients: Client[];
}

export default function ClientShowcase({ clients }: ClientShowcaseProps) {
  const [activeClient, setActiveClient] = useState(0);

  const tabVariants = {
    inactive: {
      scale: 0.95,
      opacity: 0.6,
    },
    active: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      }
    }
  };

  const contentVariants = {
    enter: {
      x: 1000,
      opacity: 0,
      scale: 0.8,
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
      }
    },
    exit: {
      zIndex: 0,
      x: -1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      }
    }
  };

  return (
    <section className="section bg-dark-elevated">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="accent-underline">Client Work</span>
          </h2>
          <p className="text-muted text-lg">
            Select a client to view their projects
          </p>
        </motion.div>

        {/* Client Tabs */}
        <div className="flex justify-center mb-12 px-2">
          <div className="inline-flex bg-dark-card rounded-2xl p-2 gap-2 shadow-2xl border border-gray-800 overflow-x-auto w-full max-w-4xl">
            {clients.map((client, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveClient(i)}
                className={`relative px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-base transition-all whitespace-nowrap ${
                  activeClient === i
                    ? 'text-light'
                    : 'text-muted'
                }`}
                variants={tabVariants}
                initial="inactive"
                animate={activeClient === i ? "active" : "inactive"}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                {/* Active Tab Background */}
                {activeClient === i && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-accent rounded-xl"
                    layoutId="activeClientTab"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}

                {/* Client Name */}
                <span className="relative z-10 flex items-center gap-2">
                  <motion.i
                    className="fas fa-building text-xs"
                    animate={{
                      scale: activeClient === i ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                  />
                  {client.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Client Work Content */}
        <div className="relative overflow-hidden" style={{ perspective: '1000px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeClient}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              {/* Client Description */}
              <motion.div
                className="text-center mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-muted text-lg">
                  {clients[activeClient].description}
                </p>
              </motion.div>

              {/* Work Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    }
                  }
                }}
              >
                {clients[activeClient].work.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      z: 50,
                    }}
                    className="card group cursor-pointer overflow-hidden p-0 relative"
                    style={{ transformStyle: 'preserve-3d' }}
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
                            }}
                          />
                        </motion.div>
                      )}

                      {/* Overlay */}
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
                          <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                          <p className="text-muted capitalize text-sm">{item.category}</p>
                        </motion.div>
                      </motion.div>

                      {/* Video Badge */}
                      {item.type === 'video' && (
                        <motion.div
                          className="absolute top-4 right-4 bg-dark/90 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          whileHover={{
                            scale: 1.2,
                            rotate: 360,
                          }}
                        >
                          <motion.i
                            className="fas fa-play text-primary text-lg"
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
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Empty State */}
              {clients[activeClient].work.length === 0 && (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.i
                    className="fas fa-folder-open text-6xl text-muted opacity-20 mb-4"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <p className="text-muted text-xl">No work to display yet</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .text-primary {
          color: var(--accent-primary);
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
    </section>
  );
}
