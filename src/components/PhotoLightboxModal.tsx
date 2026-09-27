import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { CouplePhotoVisual } from './CouplePhotoVisual';
import { CouplePhoto } from '../types';

interface PhotoLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: CouplePhoto[];
  currentIndex: number;
  onSelectIndex: (idx: number) => void;
  customPhotos: Record<string, string>;
}

export const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({
  isOpen,
  onClose,
  photos,
  currentIndex,
  onSelectIndex,
  customPhotos,
}) => {
  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex] || photos[0];
  const customUrl = customPhotos[currentPhoto.id];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex + 1) % photos.length);
  };

  return (
    <AnimatePresence>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6 text-[#FAF8F5]"
      >
        {/* Top Control Bar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[500px] flex items-center justify-between z-10"
        >
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
            <span className="font-cinzel text-xs text-[#D4AF37] tracking-widest uppercase">
              {currentIndex + 1} of {photos.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center Main Photo Frame */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[440px] my-auto flex items-center justify-center"
        >
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-[#D4AF37]/40 text-[#D4AF37] backdrop-blur-md transition-all active:scale-95"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Photo Card Container */}
          <motion.div
            key={currentPhoto.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 bg-[#0B1325] shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-h-[70vh] flex flex-col"
          >
            <div className="relative w-full h-[360px] sm:h-[420px] overflow-hidden bg-black/40">
              <CouplePhotoVisual
                customUrl={customUrl}
                visualType={currentPhoto.defaultVisual}
                alt={currentPhoto.title}
                className="w-full h-full"
              />
            </div>

            {/* Captions */}
            <div className="p-4 bg-[#0A101C] border-t border-[#D4AF37]/20 text-center">
              <h4 className="font-cinzel text-base text-[#FAF8F5] font-semibold">
                {currentPhoto.title}
              </h4>
              <p className="font-montserrat text-xs text-[#D4AF37] font-medium mt-0.5">
                {currentPhoto.subtitle}
              </p>
              <p className="font-serif italic text-xs text-[#FAF8F5]/70 mt-1 max-w-[320px] mx-auto">
                &ldquo;{currentPhoto.caption}&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-[#D4AF37]/40 text-[#D4AF37] backdrop-blur-md transition-all active:scale-95"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail Strip */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 pt-2 z-10"
        >
          {photos.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => onSelectIndex(idx)}
              className={`w-12 h-12 rounded-xl overflow-hidden border transition-all ${
                idx === currentIndex
                  ? 'border-[#D4AF37] scale-110 shadow-[0_0_12px_rgba(212,175,55,0.6)]'
                  : 'border-white/20 opacity-50 hover:opacity-80'
              }`}
            >
              <CouplePhotoVisual
                customUrl={customPhotos[item.id]}
                visualType={item.defaultVisual}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
};
