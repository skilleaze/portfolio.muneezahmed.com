import { X, MapPin, Calendar, Briefcase, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog';
import { ImageViewer } from './ImageViewer';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    title: string;
    image: string;
    images?: string[];
    description?: string;
    tags?: string[];
    certificateUrl?: string;
    websiteUrl?: string;
    detailedInfo?: {
      overview?: string;
      responsibilities?: string[];
      achievements?: string[];
      technologies?: string[];
      duration?: string;
      location?: string;
      clientInfo?: {
        client?: string;
        region?: string;
        industry?: string;
        duration?: string;
        platform?: string;
      };
      objective?: string;
      strategy?: string[];
      metrics?: Record<string, string>;
    };
  } | null;
}

export function DetailModal({ isOpen, onClose, item }: DetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  
  const displayImages = item?.images || (item?.image ? [item.image] : []);
  const hasMultipleImages = displayImages.length > 1;

  // Auto-slide effect
  useEffect(() => {
    if (!hasMultipleImages || !isOpen || isHovered) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [hasMultipleImages, isOpen, isHovered, displayImages.length]);

  // Reset image index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen]);
  
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto bg-[#181818] border-none p-0 m-0 w-full md:w-auto rounded-none md:rounded-lg">
        <DialogTitle className="sr-only">{item.title}</DialogTitle>
        <DialogDescription className="sr-only">
          Detailed information about {item.title}
        </DialogDescription>
        
        {/* Header Image */}
        <div 
          className="relative w-full aspect-video cursor-pointer group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsImageViewerOpen(true)}
        >
          <img
            src={displayImages[currentImageIndex]}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>
          
          {/* Zoom Indicator */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
            <div className="bg-white/90 text-black px-4 py-2 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
              <span className="font-semibold">Click to view full screen</span>
            </div>
          </div>
          
          {/* Image Navigation Dots */}
          {hasMultipleImages && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-3 right-3 md:top-4 md:right-4 w-9 h-9 md:w-10 md:h-10 bg-[#181818] rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors z-10"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8 pt-0">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
            {item.title}
          </h2>

          {/* View Certificate Button */}
          {item.certificateUrl && (
            <div className="mb-4 md:mb-6">
              <a
                href={item.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E50914] text-white px-5 py-2.5 md:px-6 md:py-3 rounded hover:bg-[#F40612] transition-all transform hover:scale-105 text-sm md:text-base"
              >
                <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                <span>View Certificate</span>
              </a>
            </div>
          )}

          {/* Visit Website Button */}
          {item.websiteUrl && (
            <div className="mb-4 md:mb-6">
              <a
                href={item.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E50914] text-white px-5 py-2.5 md:px-6 md:py-3 rounded hover:bg-[#F40612] transition-all transform hover:scale-105 text-sm md:text-base"
              >
                <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                <span>Visit Website</span>
              </a>
            </div>
          )}

          {/* Meta Information */}
          {(item.detailedInfo?.duration || item.detailedInfo?.location) && (
            <div className="flex flex-wrap gap-4 mb-6 text-[#B3B3B3]">
              {item.detailedInfo.duration && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#E50914]" />
                  <span>{item.detailedInfo.duration}</span>
                </div>
              )}
              {item.detailedInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#E50914]" />
                  <span>{item.detailedInfo.location}</span>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#2F2F2F] text-white text-sm rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Overview */}
          {item.detailedInfo?.overview && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-3">Overview</h3>
              <p className="text-[#B3B3B3] leading-relaxed">
                {item.detailedInfo.overview}
              </p>
            </div>
          )}

          {/* Client Information */}
          {item.detailedInfo?.clientInfo && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-3">Client Information</h3>
              <div className="bg-[#2F2F2F] rounded-lg p-4 space-y-2">
                {item.detailedInfo.clientInfo.client && (
                  <div className="flex gap-2">
                    <span className="text-[#B3B3B3] min-w-[100px]">Client:</span>
                    <span className="text-white font-semibold">{item.detailedInfo.clientInfo.client}</span>
                  </div>
                )}
                {item.detailedInfo.clientInfo.region && (
                  <div className="flex gap-2">
                    <span className="text-[#B3B3B3] min-w-[100px]">Region:</span>
                    <span className="text-white">{item.detailedInfo.clientInfo.region}</span>
                  </div>
                )}
                {item.detailedInfo.clientInfo.industry && (
                  <div className="flex gap-2">
                    <span className="text-[#B3B3B3] min-w-[100px]">Industry:</span>
                    <span className="text-white">{item.detailedInfo.clientInfo.industry}</span>
                  </div>
                )}
                {item.detailedInfo.clientInfo.duration && (
                  <div className="flex gap-2">
                    <span className="text-[#B3B3B3] min-w-[100px]">Duration:</span>
                    <span className="text-white">{item.detailedInfo.clientInfo.duration}</span>
                  </div>
                )}
                {item.detailedInfo.clientInfo.platform && (
                  <div className="flex gap-2">
                    <span className="text-[#B3B3B3] min-w-[100px]">Platform:</span>
                    <span className="text-white">{item.detailedInfo.clientInfo.platform}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Objective */}
          {item.detailedInfo?.objective && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-3">Objective</h3>
              <p className="text-[#B3B3B3] leading-relaxed">
                {item.detailedInfo.objective}
              </p>
            </div>
          )}

          {/* Strategy */}
          {item.detailedInfo?.strategy && item.detailedInfo.strategy.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-3">Strategy</h3>
              <ul className="space-y-2">
                {item.detailedInfo.strategy.map((strategy, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#B3B3B3]">
                    <span className="text-[#E50914] mt-1">•</span>
                    <span>{strategy}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Performance Metrics */}
          {item.detailedInfo?.metrics && Object.keys(item.detailedInfo.metrics).length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-3">Performance Metrics</h3>
              <div className="bg-[#2F2F2F] rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(item.detailedInfo.metrics).map(([key, value], idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-[#B3B3B3] text-sm mb-1">{key}</span>
                    <span className="text-white font-semibold text-lg">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Responsibilities */}
          {item.detailedInfo?.responsibilities && item.detailedInfo.responsibilities.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-3">Key Responsibilities</h3>
              <ul className="space-y-2">
                {item.detailedInfo.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#B3B3B3]">
                    <span className="text-[#E50914] mt-1">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          {item.detailedInfo?.technologies && item.detailedInfo.technologies.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-3">Technologies & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {item.detailedInfo.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-[#E50914]/10 border border-[#E50914]/30 text-white text-sm rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description (fallback if no detailed info) */}
          {!item.detailedInfo?.overview && item.description && (
            <div className="mb-6">
              <p className="text-[#B3B3B3] leading-relaxed">
                {item.description}
              </p>
            </div>
          )}
        </div>
      </DialogContent>

      {/* Full Screen Image Viewer */}
      <ImageViewer
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
        images={displayImages}
        currentIndex={currentImageIndex}
        title={item.title}
      />
    </Dialog>
  );
}