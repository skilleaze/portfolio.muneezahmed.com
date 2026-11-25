import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp, ChevronDown, ExternalLink, LucideIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ContentItem {
  id: string;
  title: string;
  company?: string;
  image: string;
  description?: string;
  tags?: string[];
  certificateUrl?: string;
  websiteUrl?: string;
  icon?: LucideIcon;
  detailedInfo?: {
    overview?: string;
    responsibilities?: string[];
    achievements?: string[];
    technologies?: string[];
    duration?: string;
    location?: string;
  };
}

interface ContentRowProps {
  title: string;
  items: ContentItem[];
  onItemClick?: (item: ContentItem) => void;
  disableViewAll?: boolean;
}

export function ContentRow({ title, items, onItemClick, disableViewAll = false }: ContentRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollPosition();
    container.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [items]);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const targetScroll = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  const handleAddToList = (e: React.MouseEvent, item: ContentItem) => {
    e.stopPropagation();
    toast.success('Added to My List', {
      description: `${item.title} has been added to your list`,
    });
  };

  const handleLike = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
        toast.info('Removed from Liked');
      } else {
        newSet.add(itemId);
        toast.success('Added to Liked');
      }
      return newSet;
    });
  };

  return (
    <div className="mb-8 md:mb-12 group/row">
      <div className="flex items-center justify-between mb-3 md:mb-4 px-4 md:px-12">
        <h2 className="text-lg md:text-2xl font-bold text-white">
          {title}
        </h2>
        {items.length >= 4 && !disableViewAll && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-[#E50914] hover:text-white transition-colors text-sm md:text-base group"
          >
            <span>{isExpanded ? 'Show Less' : 'View All'}</span>
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>

      {isExpanded ? (
        // Expanded Grid View
        <div className="px-4 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="group/card"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => onItemClick?.(item)}
              >
                <div className="relative rounded overflow-hidden netflix-card cursor-pointer">
                  <img
                    src={typeof item.image === 'string' ? item.image : item.image}
                    alt={item.title}
                    className="w-full aspect-video object-cover"
                    onError={(e) => {
                      console.error('Image failed to load:', item.title, item.image);
                      e.currentTarget.src = 'https://via.placeholder.com/320x180/141414/E50914?text=Image+Not+Found';
                    }}
                  />

                  {/* Icon Badge */}
                  {item.icon && (
                    <div className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-8 md:w-10 md:h-10 bg-[#E50914] rounded-full flex items-center justify-center shadow-lg pointer-events-none z-10">
                      <item.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                  )}

                  {/* Always Visible Title Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2 md:p-4 pointer-events-none">
                    {item.company ? (
                      <>
                        <h3 className="text-white font-bold text-xs md:text-base line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-[#B3B3B3] text-[10px] md:text-sm mt-0.5 md:mt-1 line-clamp-1">
                          {item.company}
                        </p>
                      </>
                    ) : (
                      <h3 className="text-white font-bold text-xs md:text-base line-clamp-2">
                        {item.title}
                      </h3>
                    )}
                  </div>

                  {/* Hover Overlay with Additional Info */}
                  {hoveredItem === item.id && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end p-2 md:p-4 animate-fade-in pointer-events-none">
                      {item.description && (
                        <p className="hidden md:block text-[#B3B3B3] text-xs line-clamp-2 mb-3">
                          {item.description}
                        </p>
                      )}
                      <div className="flex items-center gap-1.5 md:gap-2 pointer-events-auto">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onItemClick?.(item);
                          }}
                          className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center hover:bg-white/80 transition-colors"
                        >
                          <Play className="w-3 h-3 md:w-4 md:h-4 text-black fill-black ml-0.5" />
                        </button>
                        <button 
                          onClick={(e) => handleAddToList(e, item)}
                          className="hidden md:flex w-8 h-8 bg-transparent border-2 border-[#B3B3B3] rounded-full items-center justify-center hover:border-white transition-colors"
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                        <button 
                          onClick={(e) => handleLike(e, item.id)}
                          className={`hidden md:flex w-8 h-8 bg-transparent border-2 rounded-full items-center justify-center transition-all ${
                            likedItems.has(item.id) 
                              ? 'border-[#E50914] bg-[#E50914]/10' 
                              : 'border-[#B3B3B3] hover:border-white'
                          }`}
                        >
                          <ThumbsUp 
                            className={`w-4 h-4 transition-colors ${
                              likedItems.has(item.id) ? 'text-[#E50914] fill-[#E50914]' : 'text-white'
                            }`} 
                          />
                        </button>
                        {item.certificateUrl ? (
                          <a
                            href={item.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="ml-auto w-6 h-6 md:w-8 md:h-8 bg-[#E50914] rounded-full flex items-center justify-center hover:bg-[#F40612] transition-colors"
                            title="View Certificate"
                          >
                            <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-white" />
                          </a>
                        ) : (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onItemClick?.(item);
                            }}
                            className="ml-auto w-6 h-6 md:w-8 md:h-8 bg-transparent border-2 border-[#B3B3B3] rounded-full flex items-center justify-center hover:border-white transition-colors"
                          >
                            <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-white" />
                          </button>
                        )}
                      </div>
                      {item.tags && item.tags.length > 0 && (
                        <div className="hidden md:flex gap-2 mt-3 flex-wrap">
                          {item.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="text-xs text-[#B3B3B3]">
                              {tag}
                              {idx < Math.min(2, item.tags!.length - 1) && ' •'}
                            </span>
                          ))}
                        </div>
                      )}
                      {item.certificateUrl && (
                        <div className="mt-2 md:mt-3 pointer-events-auto">
                          <a
                            href={item.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 md:gap-1.5 bg-[#E50914] text-white px-2 py-1 md:px-3 md:py-1.5 rounded text-xs hover:bg-[#F40612] transition-all transform hover:scale-105"
                          >
                            <ExternalLink className="w-2.5 h-2.5 md:w-3 md:h-3" />
                            <span className="text-xs md:text-xs">View Certificate</span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Horizontal Scroll View (Default)
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="hidden md:flex absolute left-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-r from-[#141414] to-transparent items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity hover:scale-110"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="hidden md:flex absolute right-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-l from-[#141414] to-transparent items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity hover:scale-110"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          )}

          {/* Content Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-1.5 md:gap-2 overflow-x-auto hide-scrollbar px-4 md:px-12 scroll-smooth"
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-[140px] md:w-[280px] lg:w-[320px] group/card"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => onItemClick?.(item)}
              >
                <div className="relative rounded overflow-hidden netflix-card cursor-pointer">
                  <img
                    src={typeof item.image === 'string' ? item.image : item.image}
                    alt={item.title}
                    className="w-full aspect-video object-cover"
                    onError={(e) => {
                      console.error('Image failed to load:', item.title, item.image);
                      e.currentTarget.src = 'https://via.placeholder.com/320x180/141414/E50914?text=Image+Not+Found';
                    }}
                  />

                  {/* Icon Badge */}
                  {item.icon && (
                    <div className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-8 md:w-10 md:h-10 bg-[#E50914] rounded-full flex items-center justify-center shadow-lg pointer-events-none z-10">
                      <item.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                  )}

                  {/* Always Visible Title Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2 md:p-4 pointer-events-none">
                    {item.company ? (
                      <>
                        <h3 className="text-white font-bold text-xs md:text-base line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-[#B3B3B3] text-[10px] md:text-sm mt-0.5 md:mt-1 line-clamp-1">
                          {item.company}
                        </p>
                      </>
                    ) : (
                      <h3 className="text-white font-bold text-xs md:text-base line-clamp-2">
                        {item.title}
                      </h3>
                    )}
                  </div>

                  {/* Hover Overlay with Additional Info */}
                  {hoveredItem === item.id && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end p-2 md:p-4 animate-fade-in pointer-events-none">
                      {item.description && (
                        <p className="hidden md:block text-[#B3B3B3] text-xs line-clamp-2 mb-3">
                          {item.description}
                        </p>
                      )}
                      <div className="flex items-center gap-1.5 md:gap-2 pointer-events-auto">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onItemClick?.(item);
                          }}
                          className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center hover:bg-white/80 transition-colors"
                        >
                          <Play className="w-3 h-3 md:w-4 md:h-4 text-black fill-black ml-0.5" />
                        </button>
                        <button 
                          onClick={(e) => handleAddToList(e, item)}
                          className="hidden md:flex w-8 h-8 bg-transparent border-2 border-[#B3B3B3] rounded-full items-center justify-center hover:border-white transition-colors"
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                        <button 
                          onClick={(e) => handleLike(e, item.id)}
                          className={`hidden md:flex w-8 h-8 bg-transparent border-2 rounded-full items-center justify-center transition-all ${
                            likedItems.has(item.id) 
                              ? 'border-[#E50914] bg-[#E50914]/10' 
                              : 'border-[#B3B3B3] hover:border-white'
                          }`}
                        >
                          <ThumbsUp 
                            className={`w-4 h-4 transition-colors ${
                              likedItems.has(item.id) ? 'text-[#E50914] fill-[#E50914]' : 'text-white'
                            }`} 
                          />
                        </button>
                        {item.certificateUrl ? (
                          <a
                            href={item.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="ml-auto w-6 h-6 md:w-8 md:h-8 bg-[#E50914] rounded-full flex items-center justify-center hover:bg-[#F40612] transition-colors"
                            title="View Certificate"
                          >
                            <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-white" />
                          </a>
                        ) : (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onItemClick?.(item);
                            }}
                            className="ml-auto w-6 h-6 md:w-8 md:h-8 bg-transparent border-2 border-[#B3B3B3] rounded-full flex items-center justify-center hover:border-white transition-colors"
                          >
                            <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-white" />
                          </button>
                        )}
                      </div>
                      {item.tags && item.tags.length > 0 && (
                        <div className="hidden md:flex gap-2 mt-3 flex-wrap">
                          {item.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="text-xs text-[#B3B3B3]">
                              {tag}
                              {idx < Math.min(2, item.tags!.length - 1) && ' •'}
                            </span>
                          ))}
                        </div>
                      )}
                      {item.certificateUrl && (
                        <div className="mt-2 md:mt-3 pointer-events-auto">
                          <a
                            href={item.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 md:gap-1.5 bg-[#E50914] text-white px-2 py-1 md:px-3 md:py-1.5 rounded text-xs hover:bg-[#F40612] transition-all transform hover:scale-105"
                          >
                            <ExternalLink className="w-2.5 h-2.5 md:w-3 md:h-3" />
                            <span className="text-xs md:text-xs">View Certificate</span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}