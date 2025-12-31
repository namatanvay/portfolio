import { motion } from 'motion/react';
import { useState } from 'react';

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

interface Testimonial {
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  date: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface AnimatedServicesProps {
  services: Service[];
  testimonials: Testimonial[];
  processSteps: ProcessStep[];
}

export default function AnimatedServices({ services, testimonials, processSteps }: AnimatedServicesProps) {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="section pt-32 bg-dark-elevated text-center relative">
        {/* Animated Background Blobs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-primary opacity-20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary opacity-20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <div className="container relative z-10">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <span className="gradient-text">Services</span>
          </motion.h1>
          <motion.p
            className="text-light text-xl mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Professional Photography & Videography Solutions
          </motion.p>
          <motion.p
            className="text-muted max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            From intimate portraits to grand weddings, from corporate events to creative video production,
            I offer comprehensive photography and videography services tailored to your needs.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                className="card flex flex-col h-full"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  z: 50,
                }}
                onHoverStart={() => setHoveredService(i)}
                onHoverEnd={() => setHoveredService(null)}
              >
                <motion.div
                  className={`text-5xl mb-4 ${
                    i % 3 === 0 ? 'text-primary' :
                    i % 3 === 1 ? 'text-secondary' : 'text-tertiary'
                  }`}
                  animate={hoveredService === i ? {
                    rotate: 360,
                    scale: 1.2,
                  } : {
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    rotate: hoveredService === i ? { duration: 0.6 } : { duration: 3, repeat: Infinity },
                    scale: { duration: 0.3 },
                  }}
                >
                  <i className={`fas ${service.icon}`}></i>
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted mb-6 flex-grow">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, j) => (
                    <motion.li
                      key={j}
                      className="flex items-start text-sm text-muted"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                      whileHover={{ x: 5, color: 'var(--accent-primary)' }}
                    >
                      <motion.i
                        className="fas fa-check text-primary mr-2 mt-1"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + j * 0.05 + 0.2 }}
                      />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
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
                animate={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Request a Quote
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-dark-elevated relative overflow-hidden">
        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background: 'radial-gradient(circle, var(--accent-primary) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="container relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="accent-underline">My Process</span>
            </h2>
            <p className="text-muted text-lg">
              How we work together from start to finish
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                className="text-center relative"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-dark font-bold text-2xl mb-4 relative z-10"
                  whileHover={{
                    scale: 1.2,
                    rotate: 360,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                    }
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(255, 255, 255, 0.3)',
                      '0 0 20px rgba(255, 255, 255, 0.6)',
                      '0 0 0px rgba(255, 255, 255, 0.3)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  {step.number}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted text-sm">{step.description}</p>

                {/* Connecting Line */}
                {i < processSteps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-accent opacity-30"
                    style={{ transform: 'translateX(50%)' }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.5, duration: 0.5 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="accent-underline">Client Testimonials</span>
            </h2>
            <p className="text-muted text-lg">
              What my clients say about working with me
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className="card flex flex-col h-full"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: '0 20px 40px rgba(100, 255, 218, 0.3)',
                }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <motion.i
                      key={j}
                      className="fas fa-star text-tertiary"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.1 + j * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{
                        scale: 1.3,
                        rotate: 360,
                      }}
                    />
                  ))}
                </div>

                {/* Quote */}
                <motion.p
                  className="text-light mb-6 italic flex-grow"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  "{testimonial.text}"
                </motion.p>

                {/* Author */}
                <div className="flex items-center gap-4 border-t border-gray-700 pt-4">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-dark-card flex items-center justify-center"
                    whileHover={{
                      scale: 1.2,
                      rotate: 360,
                    }}
                  >
                    <i className="fas fa-user text-muted"></i>
                  </motion.div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted">{testimonial.role}</p>
                    <p className="text-xs text-muted mt-1">{testimonial.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <motion.div
            className="card bg-white text-center py-16 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Floating particles */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-dark rounded-full opacity-30"
                style={{
                  left: `${(i * 10 + 10) % 100}%`,
                  top: `${(i * 15 + 10) % 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            <motion.h2
              className="text-4xl font-bold mb-4 relative z-10"
              style={{ color: '#0D0D0D' }}
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p
              className="text-lg mb-8 max-w-2xl mx-auto relative z-10"
              style={{ color: '#0D0D0D' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Let's discuss your project and create something amazing together. Contact me for a free consultation.
            </motion.p>
            <motion.a
              href="/contact"
              className="btn relative z-10"
              style={{
                backgroundColor: '#0D0D0D',
                color: '#FFFFFF',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                fontWeight: '600'
              }}
              whileHover={{
                scale: 1.1,
                backgroundColor: '#262626',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get Your Free Quote
              <motion.i
                className="fas fa-arrow-right ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
