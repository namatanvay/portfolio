import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface Bio {
  name: string;
  title: string;
  description: string;
  experience: string;
  location: string;
  email: string;
  phone: string;
}

interface Skill {
  name: string;
  description: string;
  icon: string;
}

interface Equipment {
  category: string;
  items: string[];
}

interface AnimatedAboutProps {
  bio: Bio;
  skills: Skill[];
  equipment: Equipment[];
}

export default function AnimatedAbout({ bio, skills, equipment }: AnimatedAboutProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  useEffect(() => {
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
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: {
      y: 60,
      opacity: 0,
      scale: 0.9,
      rotateX: -20,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.3, 1],
      opacity: [0.2, 0.4, 0.2],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  const features = [
    { icon: 'fa-camera', title: 'Professional Approach', desc: 'Quality equipment and consistent technique for reliable results', color: 'text-primary' },
    { icon: 'fa-heart', title: 'Dedicated Work', desc: 'Every project receives careful attention and focus', color: 'text-secondary' },
    { icon: 'fa-clock', title: 'Timely Delivery', desc: 'Reliable turnaround times for project completion', color: 'text-tertiary' },
    { icon: 'fa-comments', title: 'Clear Communication', desc: 'Collaborative approach to understand and deliver your vision', color: 'text-purple' }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary opacity-20 rounded-full blur-3xl"
        variants={glowVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-secondary opacity-20 rounded-full blur-3xl"
        variants={glowVariants}
        animate="animate"
        style={{ animationDelay: '1.5s' }}
      />

      {/* Parallax Background Particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          x: mousePosition.x * 0.01,
          y: mousePosition.y * 0.01,
        }}
      >
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-primary rounded-full opacity-30"
            style={{
              left: `${(i * 7 + 10) % 90}%`,
              top: `${(i * 11 + 5) % 90}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Hero Section */}
      <section className="section pt-32 relative z-10">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Profile Image */}
            <motion.div variants={itemVariants} className="order-2 lg:order-1">
              <motion.div
                className="relative"
                variants={floatingVariants}
                animate="animate"
              >
                <motion.div
                  className="aspect-square rounded-2xl overflow-hidden card"
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                    rotateX: 5,
                  }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <img
                    src="/images/profile/profile_image.jpeg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                {/* Decorative accent */}
                <motion.div
                  className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary opacity-30 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Bio Content */}
            <motion.div variants={itemVariants} className="order-1 lg:order-2">
              <motion.h1
                className="text-5xl font-bold mb-4 overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              >
                <span className="gradient-text">About Me</span>
              </motion.h1>

              <motion.h2
                className="text-2xl text-primary mb-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              >
                {bio.title}
              </motion.h2>

              <motion.p
                className="text-light text-lg leading-relaxed mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {bio.description}
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                className="grid grid-cols-1 gap-6 mb-8"
                variants={containerVariants}
              >
                {[
                  { value: bio.experience, label: 'Experience' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.1,
                      y: -5,
                    }}
                    className="card text-center"
                  >
                    <motion.div
                      className="text-3xl font-bold gradient-text"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-muted">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Contact Info */}
              <motion.div className="space-y-3" variants={containerVariants}>
                {[
                  { icon: 'fa-map-marker-alt', value: bio.location, href: null },
                  { icon: 'fa-envelope', value: bio.email, href: `mailto:${bio.email}` },
                  { icon: 'fa-phone', value: bio.phone, href: `tel:${bio.phone}` }
                ].map((contact, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center text-muted"
                    variants={itemVariants}
                    whileHover={{
                      x: 10,
                      color: 'var(--accent-primary)',
                    }}
                  >
                    <motion.i
                      className={`fas ${contact.icon} w-6`}
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                    {contact.href ? (
                      <a href={contact.href} className="hover:text-primary transition-colors">
                        {contact.value}
                      </a>
                    ) : (
                      <span>{contact.value}</span>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section">
        <div className="container">
          <motion.h2
            className="text-4xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <span className="accent-underline">Skills & Expertise</span>
          </motion.h2>
          <motion.p
            className="text-center text-muted text-lg mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Core competencies and professional capabilities
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                className="card text-center group"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  boxShadow: '0 10px 40px rgba(0, 206, 209, 0.3)',
                }}
                onHoverStart={() => setHoveredSkill(i)}
                onHoverEnd={() => setHoveredSkill(null)}
              >
                <motion.div
                  className={`text-5xl mb-4 ${
                    i % 3 === 0 ? 'text-primary' :
                    i % 3 === 1 ? 'text-secondary' : 'text-tertiary'
                  }`}
                  animate={{
                    rotate: hoveredSkill === i ? [0, -10, 10, 0] : 0,
                    scale: hoveredSkill === i ? 1.2 : 1,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <i className={`fas ${skill.icon}`}></i>
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 text-light">
                  {skill.name}
                </h3>
                <p className="text-muted text-sm">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="section bg-dark-elevated relative">
        <div className="container">
          <motion.h2
            className="text-4xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="accent-underline">Equipment</span>
          </motion.h2>
          <motion.p
            className="text-center text-muted text-lg mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Professional gear for exceptional results
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {equipment.map((category, i) => (
              <motion.div
                key={i}
                className="card"
                initial={{ opacity: 0, y: 100, rotateY: -30 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateY: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  z: 50,
                }}
              >
                <motion.div
                  className={`text-4xl mb-4 ${
                    i % 4 === 0 ? 'text-primary' :
                    i % 4 === 1 ? 'text-secondary' :
                    i % 4 === 2 ? 'text-tertiary' : 'text-purple'
                  }`}
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  <i className={`fas fa-${
                    category.category.toLowerCase() === 'cameras' ? 'camera' :
                    category.category.toLowerCase() === 'lenses' ? 'circle' :
                    category.category.toLowerCase() === 'video' ? 'video' : 'tools'
                  }`}></i>
                </motion.div>
                <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, j) => (
                    <motion.li
                      key={j}
                      className="text-muted flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                      whileHover={{ x: 5, color: 'var(--accent-primary)' }}
                    >
                      <motion.i
                        className="fas fa-check text-primary mr-2 mt-1"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1, rotate: 360 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + j * 0.05 + 0.2 }}
                      />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="section">
        <div className="container">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="accent-underline">Why Choose Me</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="card text-center"
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.1,
                  rotateY: 10,
                  z: 50,
                }}
              >
                <motion.div
                  className={`text-5xl mb-4 ${feature.color}`}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }
                  }}
                >
                  <i className={`fas ${feature.icon}`}></i>
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-dark-elevated relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))',
            backgroundSize: '200% 200%',
          }}
        />

        <div className="container relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl font-bold mb-4"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Let's Create Something Amazing
            </motion.h2>
            <motion.p
              className="text-muted text-lg mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Ready to start your next project? Get in touch to discuss how I can help bring your vision to life.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.a
                href="/portfolio"
                className="btn btn-outline"
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 30px rgba(100, 255, 218, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.i
                  className="fas fa-images mr-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                View Portfolio
              </motion.a>
              <motion.a
                href="/contact"
                className="btn btn-primary"
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 30px rgba(100, 255, 218, 0.6)',
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                  }
                }}
              >
                <motion.i
                  className="fas fa-envelope mr-2"
                  animate={{
                    rotate: [0, -15, 15, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
