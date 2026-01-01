import { motion } from 'motion/react';

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
  portfolioLink?: string;  // Optional link to portfolio category
  color: string;  // Color theme for the card
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      }
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="section pt-32 bg-dark-elevated text-center">
        <div className="container">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="gradient-text">Services</span>
          </motion.h1>
          <motion.p
            className="text-light text-xl mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Professional Photography & Videography Solutions
          </motion.p>
          <motion.p
            className="text-muted max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            From intimate portraits to grand events, from creative food photography to professional video production,
            I offer comprehensive services tailored to your needs.
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
                className="card-gradient flex flex-col h-full relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -8 }}
                style={{
                  background: `linear-gradient(135deg, ${service.color}15 0%, ${service.color}05 100%)`,
                  borderLeft: `4px solid ${service.color}`
                }}
              >
                {/* Icon */}
                <div
                  className="text-5xl mb-4"
                  style={{ color: service.color }}
                >
                  <i className={`fas ${service.icon}`}></i>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted mb-6 flex-grow">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-start text-sm text-muted">
                      <i
                        className="fas fa-check-circle mr-2 mt-1"
                        style={{ color: service.color }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Portfolio Link Button */}
                {service.portfolioLink && (
                  <a
                    href={service.portfolioLink}
                    className="btn-samples mt-auto"
                    style={{
                      borderColor: service.color,
                      color: service.color
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = service.color;
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = service.color;
                    }}
                  >
                    <i className="fas fa-images mr-2"></i>
                    View Samples
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a
              href="/contact"
              className="btn btn-primary"
            >
              <i className="fas fa-envelope mr-2" />
              Request a Quote
            </a>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-dark-elevated">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="accent-underline">My Process</span>
            </h2>
            <p className="text-muted text-lg">
              How we work together from start to finish
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                className="text-center relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full font-bold text-2xl mb-4"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                    color: '#FFFFFF'
                  }}
                >
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted text-sm">{step.description}</p>

                {/* Connecting Line */}
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-accent opacity-20"
                    style={{ transform: 'translateX(50%)' }}
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
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
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <i
                      key={j}
                      className="fas fa-star"
                      style={{ color: '#FFD700' }}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-light mb-6 italic flex-grow">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 border-t border-gray-700 pt-4">
                  <div className="w-12 h-12 rounded-full bg-dark-card flex items-center justify-center">
                    <i className="fas fa-user text-muted"></i>
                  </div>
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
          <div className="card bg-white text-center py-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: '#0D0D0D' }}
            >
              Ready to Get Started?
            </h2>
            <p
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{ color: '#0D0D0D' }}
            >
              Let's discuss your project and create something amazing together. Contact me for a free consultation.
            </p>
            <a
              href="/contact"
              className="btn"
              style={{
                backgroundColor: '#0D0D0D',
                color: '#FFFFFF',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                fontWeight: '600'
              }}
            >
              Get Your Free Quote
              <i className="fas fa-arrow-right ml-2" />
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .gradient-text {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .accent-underline {
          position: relative;
          display: inline-block;
        }

        .accent-underline::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100%;
          height: 4px;
          background: var(--gradient-accent);
          border-radius: 2px;
        }

        .btn-samples {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          border: 2px solid;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
        }

        .card-gradient {
          background-color: var(--bg-dark-card);
          padding: 2rem;
          border-radius: 1rem;
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
}
