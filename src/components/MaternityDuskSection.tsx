import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Camera, Image as ImageIcon } from 'lucide-react';
import { CouplePhotoVisual } from './CouplePhotoVisual';
import { PhotoUploadModal } from './PhotoUploadModal';
import { getCustomPhoto, subscribeToPhotos } from '../services/photoStore';

export const MaternityDuskSection: React.FC = () => {
  const [duskPhotoUrl, setDuskPhotoUrl] = useState<string | null>(getCustomPhoto('dusk'));
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  useEffect(() => {
    const sync = () => setDuskPhotoUrl(getCustomPhoto('dusk'));
    sync();
    const unsub = subscribeToPhotos(sync);
    return () => unsub();
  }, []);

  return (
    <section className="relative w-full py-12 px-6 bg-gradient-to-b from-[#121B2F] via-[#0E1626] to-[#0A101C] text-[#FAF8F5] overflow-hidden">
      {/* Warm Golden Hour & Dusk Ambient Radiance (GPU-friendly radial gradients) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-[radial-gradient(circle,rgba(229,195,120,0.12)_0%,transparent_70%)]" />
        <div className="absolute bottom-10 right-4 w-60 h-60 bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-[420px] mx-auto space-y-7 text-center">
        {/* Section Pill Kicker */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#18233C]/80 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-cinzel tracking-widest uppercase">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          <span>A Journey of Love &amp; Joy</span>
        </div>

        {/* Heading in Script & Serif */}
        <div>
          <h2 className="font-cursive text-4xl sm:text-5xl text-[#FAF8F5] gold-gradient-text drop-shadow-[0_2px_12px_rgba(212,175,55,0.25)]">
            A New Little Miracle
          </h2>
          <p className="font-serif italic text-sm text-[#D4AF37] mt-1 tracking-wide">
            Two hearts creating a wondrous little soul
          </p>
        </div>

        {/* Dusk Photo Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-[320px] mx-auto flex flex-col items-center"
        >
          <div className="relative w-full rounded-3xl p-0.5 bg-gradient-to-b from-[#D4AF37]/40 via-[#AA7C11]/20 to-transparent shadow-[0_12px_35px_rgba(0,0,0,0.6)]">
            <div className="relative w-full h-[240px] rounded-[22px] overflow-hidden bg-gradient-to-b from-[#151F33] via-[#0E1626] to-[#080D17] flex items-center justify-center">
              <CouplePhotoVisual
                customUrl={duskPhotoUrl}
                visualType="dusk_embrace"
                alt="Safeel and Anasma - Dusk Sunset Maternity"
                className="w-full h-full"
              />
              <button
                type="button"
                onClick={() => setIsUploadOpen(true)}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-[#0B1325]/85 border border-[#D4AF37]/50 text-[#D4AF37] hover:scale-110 active:scale-95 transition-all shadow-md backdrop-blur-md cursor-pointer z-20"
                title="Upload Dusk Photo"
              >
                <Camera className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Heartfelt Note / Ceremony Meaning */}
        <div className="p-5 rounded-2xl bg-[#131D33]/70 border border-[#D4AF37]/25 backdrop-blur-sm space-y-3">
          <p className="font-serif italic text-base sm:text-lg text-[#FAF8F5] leading-relaxed">
            &ldquo;As we step into the sacred chapter of parenthood, we seek your warmest smiles, prayers, and heartfelt blessings for our growing family.&rdquo;
          </p>

          <div className="flex items-center justify-center gap-2 pt-1 text-xs text-[#D4AF37] font-cinzel">
            <Heart className="w-3.5 h-3.5 fill-[#D4AF37]" />
            <span>Valakappu Tradition of Love &amp; Protection</span>
            <Heart className="w-3.5 h-3.5 fill-[#D4AF37]" />
          </div>
        </div>
      </div>

      <PhotoUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        photoId="dusk"
        photoTitle="Dusk Sunset Maternity Photo"
        currentPhotoUrl={duskPhotoUrl}
        onPhotoSaved={(url) => setDuskPhotoUrl(url)}
      />
    </section>
  );
};

