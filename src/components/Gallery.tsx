import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

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
  const [activeFilter, setActiveFilter] = useState('portraits-fashion');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [itemsToShow, setItemsToShow] = useState(12); // Increased from 6 for better UX
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Category labels for display
  const categoryLabels: Record<string, string> = {
    'portraits-fashion': 'Portraits',
    'events': 'Events',
    'food': 'Food',
    'product': 'Product',
    'videos': 'Videos',
  };

  // Filter buttons (no "all")
  const categories = ['portraits-fashion', 'events', 'food', 'product', 'videos'];

  // Filter items based on selection
  const allFilteredItems = activeFilter === 'videos'
    ? items.filter(item => item.type === 'video')
    : items.filter(item => item.category === activeFilter && item.type === 'photo');

  // Pagination
  const filteredItems = allFilteredItems.slice(0, itemsToShow);
  const hasMore = itemsToShow < allFilteredItems.length;

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    setItemsToShow(12); // Reset to 12 on filter change
  };

  const loadMore = () => {
    setItemsToShow(prev => prev + 12); // Load 12 more at a time
  };

  return (
    <>
      {/* Filter Buttons - Mobile Optimized */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleFilterChange(category)}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all ${
              activeFilter === category
                ? 'bg-white text-dark scale-105'
                : 'bg-dark-card text-light hover:bg-dark-elevated'
            }`}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      {/* Gallery Grid - Optimized */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={prefersReducedMotion || isMobile ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                delay: isMobile ? 0 : Math.min(index * 0.03, 0.3)
              }}
              onClick={() => setSelectedItem(item)}
              className={`relative bg-dark-card rounded-lg overflow-hidden cursor-pointer group ${
                item.type === 'video' ? 'aspect-[9/16]' : 'aspect-square'
              }`}
            >
              {/* Thumbnail */}
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="400"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-dark-elevated">
                  <i className={`fas ${item.type === 'video' ? 'fa-play-circle' : 'fa-camera'} text-4xl sm:text-5xl text-muted opacity-30`}></i>
                </div>
              )}

            {/* Video Badge */}
            {item.type === 'video' && (
              <div className="absolute top-2 right-2 bg-dark/80 backdrop-blur-sm rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                <i className="fas fa-play text-accent text-xs sm:text-sm"></i>
              </div>
            )}

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2 sm:p-3">
                <div className="text-white">
                  <h3 className="text-xs sm:text-sm font-semibold line-clamp-2">{item.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-8 sm:mt-12">
          <button
            onClick={loadMore}
            className="btn btn-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
          >
            Load More ({allFilteredItems.length - itemsToShow})
            <i className="fas fa-chevron-down ml-2"></i>
          </button>
        </div>
      )}

      {/* Lightbox Modal - Simplified */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white text-2xl sm:text-3xl z-20"
              onClick={() => setSelectedItem(null)}
            >
              <i className="fas fa-times"></i>
            </button>

            {/* Content */}
            <div
              className="w-full h-full flex flex-col justify-center items-center px-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Media Container */}
              <div className="relative bg-dark-card rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                {selectedItem.type === 'video' && selectedItem.video ? (
                  <video
                    controls
                    playsInline
                    preload="none"
                    className="max-h-[85vh] max-w-full h-auto w-auto object-contain"
                    style={{ maxWidth: selectedItem.type === 'video' ? '500px' : '100%' }}
                    poster={selectedItem.image || undefined}
                  >
                    <source src={selectedItem.video} type="video/mp4" />
                  </video>
                ) : selectedItem.image ? (
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="max-h-[85vh] max-w-full h-auto w-auto object-contain"
                  />
                ) : (
                  <div className="w-full h-96 flex items-center justify-center">
                    <i className="fas fa-camera text-6xl text-muted opacity-20"></i>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-center text-white">
                <h3 className="text-xl sm:text-2xl font-bold mb-1">{selectedItem.title}</h3>
                <p className="text-muted text-sm sm:text-base">
                  {categoryLabels[selectedItem.category] || selectedItem.category}
                </p>
              </div>
            </div>
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
          background: var(--gradient-accent);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
