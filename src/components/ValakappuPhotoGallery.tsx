import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Camera, Sparkles, Heart, Maximize2, RefreshCw, UploadCloud, ChevronRight } from 'lucide-react';
import { CouplePhotoVisual } from './CouplePhotoVisual';
import { PhotoUploadModal } from './PhotoUploadModal';
import { PhotoLightboxModal } from './PhotoLightboxModal';
import { DEFAULT_PHOTOS, subscribeToPhotos, getCustomPhoto, initPhotosSync, resetCustomPhotos } from '../services/photoStore';
import { CouplePhoto } from '../types';

export const ValakappuPhotoGallery: React.FC = () => {
  const [photos] = useState<CouplePhoto[]>(DEFAULT_PHOTOS);
  const [customPhotosMap, setCustomPhotosMap] = useState<Record<string, string>>({});
  const [uploadTarget, setUploadTarget] = useState<CouplePhoto | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Exact photo items for each frame
  const heroPhoto = photos.find((p) => p.id === 'hero') || photos[1] || photos[0];
  const ritualPhoto = photos.find((p) => p.id === 'ritual') || photos[2] || photos[0];
  const felicitationPhoto = photos.find((p) => p.id === 'felicitation') || photos[3] || photos[0];
  const duskPhoto = photos.find((p) => p.id === 'dusk') || photos[4] || photos[0];
  const venuePhoto = photos.find((p) => p.id === 'venue') || photos[5] || photos[0];

  const galleryPhotos = [heroPhoto, ritualPhoto, felicitationPhoto, duskPhoto, venuePhoto];

  // Sync photos from local and server
  useEffect(() => {
    const updateLocalMap = () => {
      const map: Record<string, string> = {};
      DEFAULT_PHOTOS.forEach((p) => {
        const custom = getCustomPhoto(p.id);
        if (custom) map[p.id] = custom;
      });
      setCustomPhotosMap(map);
    };

    updateLocalMap();
    initPhotosSync().then((serverMap) => {
      if (serverMap) setCustomPhotosMap((prev) => ({ ...prev, ...serverMap }));
    });

    const unsubscribe = subscribeToPhotos(updateLocalMap);
    return () => unsubscribe();
  }, []);

  const handleOpenUpload = (photo: CouplePhoto, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setUploadTarget(photo);
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const hasAnyCustomPhoto = Object.keys(customPhotosMap).length > 0;

  return (
    <section id="photo-gallery" className="relative w-full py-12 px-5 bg-gradient-to-b from-[#0A101C] via-[#0E1626] to-[#121B2F] text-[#FAF8F5] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-[#0D6E50]/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[420px] mx-auto space-y-7">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18233C]/80 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-cinzel tracking-widest uppercase">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>Moments of Love &amp; Celebration</span>
          </div>

          <h2 className="font-cursive text-4xl sm:text-5xl text-[#FAF8F5] gold-gradient-text drop-shadow-[0_2px_12px_rgba(212,175,55,0.25)]">
            Parents-To-Be Gallery
          </h2>

          <p className="text-xs sm:text-sm text-[#FAF8F5]/75 font-montserrat font-light tracking-wide max-w-[340px] mx-auto leading-relaxed">
            Capturing the grace, smiles, and sacred memories of our Valakappu journey.
          </p>
        </div>

        {/* Quick Customizer Banner for Host / Couple */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#142138] via-[#1A2A47] to-[#142138] border border-[#D4AF37]/35 shadow-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] shrink-0">
              <Camera className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="font-cinzel text-xs text-[#FAF8F5] font-semibold">
                Personalize Your Photos
              </p>
              <p className="text-[10px] text-[#FAF8F5]/60 font-montserrat">
                Upload your camera photos anytime
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleOpenUpload(photos[0])}
              className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B1325] font-cinzel text-[10px] font-bold tracking-wider uppercase hover:brightness-110 flex items-center gap-1 cursor-pointer transition-all shadow-sm"
            >
              <span>Upload</span>
              <UploadCloud className="w-3 h-3" />
            </button>
            {hasAnyCustomPhoto && (
              <button
                onClick={() => resetCustomPhotos()}
                title="Reset to default illustration"
                className="p-1.5 rounded-xl border border-white/10 text-white/50 hover:text-white hover:bg-white/10 text-[10px]"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Featured Photo 1: Big Hero Portrait Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={() => handleOpenLightbox(0)}
          className="group relative w-full rounded-3xl p-1 bg-gradient-to-b from-[#D4AF37]/50 via-[#AA7C11]/25 to-[#0B1325]/50 shadow-[0_15px_40px_rgba(0,0,0,0.7)] cursor-pointer"
        >
          <div className="relative w-full rounded-[22px] overflow-hidden bg-[#0A101C] flex flex-col">
            {/* Top Photo Frame */}
            <div className="relative w-full h-[320px] sm:h-[350px] overflow-hidden">
              <CouplePhotoVisual
                customUrl={customPhotosMap['hero']}
                visualType="couple_hero"
                alt="Safeel and Anasma - Valakappu"
                className="w-full h-full"
              />

              {/* Top corner actions */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20 pointer-events-auto">
                <span className="px-2.5 py-1 rounded-full bg-[#070D18]/80 border border-[#D4AF37]/40 text-[#D4AF37] font-cinzel text-[9px] uppercase tracking-widest backdrop-blur-md flex items-center gap-1">
                  <Heart className="w-2.5 h-2.5 fill-[#D4AF37]" />
                  <span>Featured Portrait</span>
                </span>

                <button
                  onClick={(e) => handleOpenUpload(heroPhoto, e)}
                  className="p-2 rounded-full bg-[#0B1325]/85 border border-[#D4AF37]/50 text-[#D4AF37] hover:scale-110 active:scale-95 transition-all shadow-md backdrop-blur-md cursor-pointer"
                  title="Upload / Change Photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Click to expand hover hint */}
              <div className="absolute bottom-3 right-3 p-1.5 rounded-full bg-black/60 text-white/80 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Bottom Caption Bar */}
            <div className="p-4 bg-gradient-to-b from-[#0D1527] to-[#080D18] border-t border-[#D4AF37]/25 flex items-center justify-between">
              <div>
                <h3 className="font-cinzel text-base font-semibold text-[#FAF8F5] tracking-wide">
                  Anasma &amp; Safeel
                </h3>
                <p className="font-montserrat text-xs text-[#D4AF37] font-medium">
                  Parents-To-Be · Welcoming Our Miracle
                </p>
              </div>
              <span className="text-xs text-[#D4AF37] font-cinzel flex items-center gap-1">
                <span>View</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </motion.div>

        {/* Secondary 2-Grid: Photo 2 & Photo 3 */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* Photo 2: Bangle Ceremony Ritual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onClick={() => handleOpenLightbox(1)}
            className="group relative rounded-2xl p-0.5 bg-gradient-to-b from-[#D4AF37]/40 via-[#AA7C11]/20 to-transparent shadow-[0_10px_25px_rgba(0,0,0,0.6)] cursor-pointer flex flex-col"
          >
            <div className="relative w-full rounded-[14px] overflow-hidden bg-[#0A101C] flex flex-col h-full">
              <div className="relative w-full h-[180px] overflow-hidden">
                <CouplePhotoVisual
                  customUrl={customPhotosMap['ritual']}
                  visualType="bangles_ritual"
                  alt="Valakappu Bangle Ceremony"
                  className="w-full h-full"
                />

                <button
                  onClick={(e) => handleOpenUpload(ritualPhoto, e)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-[#0B1325]/85 border border-[#D4AF37]/50 text-[#D4AF37] hover:scale-110 active:scale-95 transition-all shadow-md backdrop-blur-md cursor-pointer"
                  title="Upload Bangle Photo"
                >
                  <Camera className="w-3 h-3" />
                </button>
              </div>

              <div className="p-2.5 bg-[#090E1A] border-t border-[#D4AF37]/20 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-cinzel text-xs font-semibold text-[#FAF8F5]">
                    Valakappu Ritual
                  </h4>
                  <p className="font-montserrat text-[10px] text-[#D4AF37] line-clamp-1 mt-0.5">
                    Sacred Bangles &amp; Prayers
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Photo 3: Joy & Felicitations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onClick={() => handleOpenLightbox(2)}
            className="group relative rounded-2xl p-0.5 bg-gradient-to-b from-[#D4AF37]/40 via-[#AA7C11]/20 to-transparent shadow-[0_10px_25px_rgba(0,0,0,0.6)] cursor-pointer flex flex-col"
          >
            <div className="relative w-full rounded-[14px] overflow-hidden bg-[#0A101C] flex flex-col h-full">
              <div className="relative w-full h-[180px] overflow-hidden">
                <CouplePhotoVisual
                  customUrl={customPhotosMap['felicitation']}
                  visualType="felicitation"
                  alt="Joy and Felicitations"
                  className="w-full h-full"
                />

                <button
                  onClick={(e) => handleOpenUpload(felicitationPhoto, e)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-[#0B1325]/85 border border-[#D4AF37]/50 text-[#D4AF37] hover:scale-110 active:scale-95 transition-all shadow-md backdrop-blur-md cursor-pointer"
                  title="Upload Felicitation Photo"
                >
                  <Camera className="w-3 h-3" />
                </button>
              </div>

              <div className="p-2.5 bg-[#090E1A] border-t border-[#D4AF37]/20 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-cinzel text-xs font-semibold text-[#FAF8F5]">
                    Felicitations
                  </h4>
                  <p className="font-montserrat text-[10px] text-[#D4AF37] line-clamp-1 mt-0.5">
                    Family Blessings &amp; Joy
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Third 2-Grid: Photo 4 (Dusk) & Photo 5 (Venue) */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* Photo 4: Dusk Sunset Silhouette */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => handleOpenLightbox(3)}
            className="group relative rounded-2xl p-0.5 bg-gradient-to-b from-[#D4AF37]/40 via-[#AA7C11]/20 to-transparent shadow-[0_10px_25px_rgba(0,0,0,0.6)] cursor-pointer flex flex-col"
          >
            <div className="relative w-full rounded-[14px] overflow-hidden bg-[#0A101C] flex flex-col h-full">
              <div className="relative w-full h-[180px] overflow-hidden">
                <CouplePhotoVisual
                  customUrl={customPhotosMap['dusk']}
                  visualType="dusk_embrace"
                  alt="Dusk Sunset Maternity"
                  className="w-full h-full"
                />

                <button
                  onClick={(e) => handleOpenUpload(duskPhoto, e)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-[#0B1325]/85 border border-[#D4AF37]/50 text-[#D4AF37] hover:scale-110 active:scale-95 transition-all shadow-md backdrop-blur-md cursor-pointer"
                  title="Upload Dusk Photo"
                >
                  <Camera className="w-3 h-3" />
                </button>
              </div>

              <div className="p-2.5 bg-[#090E1A] border-t border-[#D4AF37]/20 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-cinzel text-xs font-semibold text-[#FAF8F5]">
                    Dusk Radiance
                  </h4>
                  <p className="font-montserrat text-[10px] text-[#D4AF37] line-clamp-1 mt-0.5">
                    Golden Sunset Moments
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Photo 5: Udaya Resort Venue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            onClick={() => handleOpenLightbox(4)}
            className="group relative rounded-2xl p-0.5 bg-gradient-to-b from-[#D4AF37]/40 via-[#AA7C11]/20 to-transparent shadow-[0_10px_25px_rgba(0,0,0,0.6)] cursor-pointer flex flex-col"
          >
            <div className="relative w-full rounded-[14px] overflow-hidden bg-[#0A101C] flex flex-col h-full">
              <div className="relative w-full h-[180px] overflow-hidden">
                <CouplePhotoVisual
                  customUrl={customPhotosMap['venue']}
                  visualType="venue"
                  alt="Udaya Resort, Palakkad"
                  className="w-full h-full"
                />

                <button
                  onClick={(e) => handleOpenUpload(venuePhoto, e)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-[#0B1325]/85 border border-[#D4AF37]/50 text-[#D4AF37] hover:scale-110 active:scale-95 transition-all shadow-md backdrop-blur-md cursor-pointer"
                  title="Upload Venue Photo"
                >
                  <Camera className="w-3 h-3" />
                </button>
              </div>

              <div className="p-2.5 bg-[#090E1A] border-t border-[#D4AF37]/20 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-cinzel text-xs font-semibold text-[#FAF8F5]">
                    Udaya Resort
                  </h4>
                  <p className="font-montserrat text-[10px] text-[#D4AF37] line-clamp-1 mt-0.5">
                    Palakkad, Kerala
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Upload Modal */}
      {uploadTarget && (
        <PhotoUploadModal
          isOpen={Boolean(uploadTarget)}
          onClose={() => setUploadTarget(null)}
          photoId={uploadTarget.id}
          photoTitle={uploadTarget.title}
          currentPhotoUrl={customPhotosMap[uploadTarget.id]}
          onPhotoSaved={(url) => {
            setCustomPhotosMap((prev) => ({ ...prev, [uploadTarget.id]: url }));
          }}
        />
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <PhotoLightboxModal
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          photos={galleryPhotos}
          currentIndex={lightboxIndex}
          onSelectIndex={(idx) => setLightboxIndex(idx)}
          customPhotos={customPhotosMap}
        />
      )}
    </section>
  );
};
