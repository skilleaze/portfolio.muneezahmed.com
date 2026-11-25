import { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  title?: string;
}

export function ImageViewer({ isOpen, onClose, images, currentIndex: initialIndex, title }: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (isOpen) {
      // Reset zoom and position when opening
      setZoom(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen, currentIndex]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.5, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
        case '_':
          handleZoomOut();
          break;
        case 'r':
        case 'R':
          handleRotate();
          break;
        case '0':
          handleReset();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[100vw] max-h-[100vh] w-screen h-screen bg-black/95 border-none p-0 m-0 rounded-none"
      >
        <DialogTitle className="sr-only">
          {title ? `${title} - Image Viewer` : 'Image Viewer'}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Full screen image viewer with zoom and navigation controls. Use arrow keys to navigate, +/- to zoom, R to rotate, 0 to reset, and Escape to close.
        </DialogDescription>

        {/* Top Controls Bar */}
        <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-4 flex items-center justify-between">
          <div className="text-white">
            {title && <h3 className="font-semibold text-lg">{title}</h3>}
            <p className="text-sm text-gray-300">
              {currentIndex + 1} / {images.length}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Close viewer"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Image Container */}
        <div 
          className="w-full h-full flex items-center justify-center overflow-hidden cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          <img
            src={images[currentIndex]}
            alt={`${title || 'Portfolio image'} ${currentIndex + 1}`}
            className="max-w-none transition-transform duration-200"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg)`,
              cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
              maxHeight: '90vh',
              maxWidth: zoom === 1 ? '90vw' : 'none',
            }}
            draggable={false}
          />
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-40"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-40"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        {/* Bottom Controls Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-5 h-5 text-white" />
            </button>

            <span className="text-white font-semibold min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>

            <button
              onClick={handleZoomIn}
              disabled={zoom >= 5}
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-5 h-5 text-white" />
            </button>

            <div className="w-px h-8 bg-white/20 mx-2"></div>

            <button
              onClick={handleRotate}
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Rotate image"
            >
              <RotateCw className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={handleReset}
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Reset view"
            >
              <Maximize2 className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                    index === currentIndex
                      ? 'border-[#E50914] scale-110'
                      : 'border-white/20 hover:border-white/50'
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="absolute bottom-20 right-4 bg-black/60 backdrop-blur-sm text-white text-xs p-3 rounded-lg hidden md:block">
          <div className="space-y-1">
            <div><kbd className="px-1.5 py-0.5 bg-white/20 rounded">←→</kbd> Navigate</div>
            <div><kbd className="px-1.5 py-0.5 bg-white/20 rounded">+/-</kbd> Zoom</div>
            <div><kbd className="px-1.5 py-0.5 bg-white/20 rounded">R</kbd> Rotate</div>
            <div><kbd className="px-1.5 py-0.5 bg-white/20 rounded">0</kbd> Reset</div>
            <div><kbd className="px-1.5 py-0.5 bg-white/20 rounded">ESC</kbd> Close</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
