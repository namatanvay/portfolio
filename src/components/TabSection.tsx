import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import FeaturedWork from './FeaturedWork';
import ServicesTab from './ServicesTab';
import TestimonialsTab from './TestimonialsTab';

export default function TabSection() {
  const [activeTab, setActiveTab] = useState('work');

  const tabs = [
    { id: 'work', label: 'Featured Work', icon: 'fa-images', shortLabel: 'Work' },
    { id: 'services', label: 'Services', icon: 'fa-briefcase', shortLabel: 'Services' },
    { id: 'testimonials', label: 'Testimonials', icon: 'fa-star', shortLabel: 'Reviews' },
  ];

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
      rotateY: 45,
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 0.5,
      }
    },
    exit: {
      zIndex: 0,
      x: -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: -45,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
      }
    }
  };

  const indicatorVariants = {
    initial: { scaleX: 0, opacity: 0 },
    animate: {
      scaleX: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'work':
        return <FeaturedWork />;
      case 'services':
        return <ServicesTab />;
      case 'testimonials':
        return <TestimonialsTab />;
      default:
        return <FeaturedWork />;
    }
  };

  return (
    <div className="w-full">
      {/* Tab Navigation - Responsive */}
      <div className="flex justify-center mb-8 md:mb-12 px-2">
        <div className="inline-flex bg-dark-card rounded-xl md:rounded-2xl p-1 md:p-2 gap-1 md:gap-2 shadow-2xl border border-gray-800 w-full sm:w-auto overflow-x-auto">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-semibold text-sm sm:text-base md:text-lg transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-light'
                  : 'text-muted'
              }`}
              variants={tabVariants}
              initial="inactive"
              animate={activeTab === tab.id ? "active" : "inactive"}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              {/* Active Tab Background */}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-accent rounded-lg md:rounded-xl"
                  layoutId="activeTab"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}

              {/* Tab Content */}
              <span className="relative z-10 flex items-center gap-2">
                <motion.i
                  className={`fas ${tab.icon}`}
                  animate={{
                    rotate: activeTab === tab.id ? [0, 360] : 0,
                    scale: activeTab === tab.id ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                />
                {/* Show short label on mobile, full label on desktop */}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </span>

              {/* Active Indicator Dot */}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute -bottom-0.5 md:-bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-light rounded-full"
                  variants={indicatorVariants}
                  initial="initial"
                  animate="animate"
                  layoutId="indicator"
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative overflow-hidden" style={{ perspective: '1000px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
