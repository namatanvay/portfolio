import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface EventItem {
  id: number;
  title: string;
  category: string;
  eventName: string;
  image: string;
  type: 'photo';
}

interface EventsSectionProps {
  eventItems: EventItem[];
  onImageClick: (item: EventItem) => void;
}

interface GroupedEvents {
  [eventName: string]: EventItem[];
}

export default function EventsSection({ eventItems, onImageClick }: EventsSectionProps) {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  // Group images by event name
  const groupedEvents: GroupedEvents = eventItems.reduce((acc, item) => {
    if (!acc[item.eventName]) {
      acc[item.eventName] = [];
    }
    acc[item.eventName].push(item);
    return acc;
  }, {} as GroupedEvents);

  // Sort event names alphabetically
  const sortedEventNames = Object.keys(groupedEvents).sort();

  const toggleEvent = (eventName: string) => {
    setExpandedEvent(expandedEvent === eventName ? null : eventName);
  };

  // Get first image as preview
  const getPreviewImage = (eventName: string) => {
    return groupedEvents[eventName][0]?.image || '';
  };

  return (
    <div className="space-y-4">
      {sortedEventNames.map((eventName) => {
        const images = groupedEvents[eventName];
        const isExpanded = expandedEvent === eventName;
        const displayName = eventName
          .split(/[-_]/)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');

        return (
          <motion.div
            key={eventName}
            className="event-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Event Header - Clickable */}
            <button
              onClick={() => toggleEvent(eventName)}
              className="event-header"
            >
              <div className="flex items-center gap-4 flex-1">
                {/* Preview Thumbnail */}
                <div className="event-thumbnail">
                  <img
                    src={getPreviewImage(eventName)}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Event Info */}
                <div className="text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-light">
                    {displayName}
                  </h3>
                  <p className="text-muted text-sm">
                    {images.length} {images.length === 1 ? 'photo' : 'photos'}
                  </p>
                </div>
              </div>

              {/* Expand Icon */}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <i className="fas fa-chevron-down text-2xl text-muted"></i>
              </motion.div>
            </button>

            {/* Event Images - Expandable */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="event-images-grid">
                    {images.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="gallery-item"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        onClick={() => onImageClick(item)}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          loading={index < 4 ? 'eager' : 'lazy'}
                          fetchPriority={index < 2 ? 'high' : 'auto'}
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                        <div className="gallery-overlay">
                          <i className="fas fa-search-plus text-3xl"></i>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      <style>{`
        .event-card {
          background: var(--bg-dark-card);
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: border-color 0.3s ease;
        }

        .event-card:hover {
          border-color: rgba(255, 255, 255, 0.2);
        }

        .event-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .event-header:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        .event-thumbnail {
          width: 80px;
          height: 80px;
          border-radius: 0.5rem;
          overflow: hidden;
          flex-shrink: 0;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .event-images-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          padding: 0 1.5rem 1.5rem 1.5rem;
        }

        @media (min-width: 640px) {
          .event-images-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .event-images-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .gallery-item {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
          border-radius: 0.5rem;
          cursor: pointer;
          background: var(--bg-dark-elevated);
        }

        .gallery-item img {
          transition: transform 0.3s ease;
        }

        .gallery-item:hover img {
          transform: scale(1.05);
        }

        .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          color: white;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
