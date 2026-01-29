import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ImageIcon, MapPin } from 'lucide-react';
import { optimizeLightboxImage, optimizeThumbnail } from '../utils/imageOptimizer';

export interface LightboxImage {
  imageUrl: string;
  title?: string;
  description?: string;
  googleMapsUrl?: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageLightbox({ images, initialIndex = 0, isOpen, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
      >
        <X className="h-6 w-6 text-white" />
      </button>

      {/* Image counter */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-2 bg-white/10 rounded-full">
        <ImageIcon className="h-4 w-4 text-white" />
        <span className="text-white text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={goToPrevious}
          className="absolute left-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          <ChevronLeft className="h-8 w-8 text-white" />
        </button>
      )}

      {/* Main image with info */}
      <div className="relative max-w-[90vw] max-h-[80vh]">
        <img
          src={optimizeLightboxImage(images[currentIndex].imageUrl)}
          alt={images[currentIndex].title || `Imagem ${currentIndex + 1}`}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
        />
        
        {/* Title, Description and Location - Inside image */}
        {(images[currentIndex].title || images[currentIndex].description || images[currentIndex].googleMapsUrl) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 rounded-b-lg">
            <div className="flex items-end justify-between">
              <div className="text-white">
                {images[currentIndex].title && (
                  <h3 className="text-xl font-bold mb-1">{images[currentIndex].title}</h3>
                )}
                {images[currentIndex].description && (
                  <p className="text-white/90 text-sm">{images[currentIndex].description}</p>
                )}
              </div>
              {images[currentIndex].googleMapsUrl && (
                <button
                  onClick={() => {
                    window.open(images[currentIndex].googleMapsUrl, '_blank');
                  }}
                  className="flex-shrink-0 ml-4 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  title="Ver no Google Maps"
                >
                  <MapPin className="h-5 w-5 text-white" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={goToNext}
          className="absolute right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          <ChevronRight className="h-8 w-8 text-white" />
        </button>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2 bg-black/50 rounded-xl">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              title={image.title || `Imagem ${index + 1}`}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-primary-500 opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={optimizeThumbnail(image.imageUrl)}
                alt={image.title || `Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
