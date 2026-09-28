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
    <section className="relative w-full py-12 px-6 bg-gradient-to-b from-[#EFE4D6] via-[#F8EFE4] to-[#FAF5EE] text-[#2E1E14] overflow-hidden">
      {/* Warm Golden Hour & Dusk Ambient Radiance (Aesthetic Pastel Glows) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-[radial-gradient(circle,rgba(226,149,120,0.18)_0%,transparent_70%)]" />
        <div className="absolute bottom-10 right-4 w-60 h-60 bg-[radial-gradient(circle,rgba(212,163,115,0.18)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-[420px] mx-auto space-y-7 text-center">
        {/* Section Pill Kicker */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5E6D8] border border-[#E8CDB5] text-[#8C4E3A] text-[11px] font-cinzel tracking-widest uppercase font-semibold">
          <Sparkles className="w-3 h-3 text-[#D97D64]" />
          <span>A Journey of Love &amp; Joy</span>
        </div>

        {/* Heading in Script & Serif */}
        <div>
          <h2 className="font-cursive text-4xl sm:text-5xl gold-gradient-text py-0.5">
            A New Little Miracle
          </h2>
          <p className="font-serif italic text-sm text-[#8C5835] mt-1 tracking-wide font-medium">
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
          <div className="relative w-full rounded-3xl p-0.5 bg-gradient-to-b from-[#E2A694]/60 via-[#E8C7B8]/40 to-[#E2A694]/30 shadow-[0_12px_35px_rgba(100,60,40,0.1)]">
            <div className="relative w-full h-[240px] rounded-[22px] overflow-hidden bg-[#FFFDF9] border border-[#E8DACB] flex items-center justify-center">
              <CouplePhotoVisual
                customUrl={duskPhotoUrl}
                visualType="dusk_embrace"
                alt="Safeel and Anasma - Dusk Sunset Maternity"
                className="w-full h-full"
              />
              <button
                type="button"
                onClick={() => setIsUploadOpen(true)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 border border-[#E8DACB] text-[#8C5835] hover:scale-110 active:scale-95 transition-all shadow-md backdrop-blur-md cursor-pointer flex items-center gap-1 text-[10px] font-montserrat font-medium z-20"
                title="Change Photo"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Change</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Heartfelt Note of Love & Blessings */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="p-5 rounded-2xl bg-white/95 border border-[#E8DACB] shadow-sm space-y-3"
        >
          <div className="flex items-center justify-center gap-2 text-[#D97D64]">
            <Heart className="w-4 h-4 fill-[#D97D64]" />
            <span className="font-cinzel text-xs uppercase tracking-widest text-[#8C4E3A] font-semibold">
              Showered with Blessings
            </span>
            <Heart className="w-4 h-4 fill-[#D97D64]" />
          </div>

          <p className="font-serif italic text-sm text-[#4A3528] leading-relaxed">
            &ldquo;As we await our bundle of joy, your smiles, prayers, and heartfelt blessings fill our hearts with eternal warmth and gratitude.&rdquo;
          </p>

          <p className="font-cinzel text-xs tracking-widest text-[#8C5835] font-semibold uppercase">
            — Safeel &amp; Anasma
          </p>
        </motion.div>
      </div>

      {/* Photo Upload Modal */}
      {isUploadOpen && (
        <PhotoUploadModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          photoId="dusk"
          photoTitle="Maternity Sunset Silhouette"
          currentPhotoUrl={duskPhotoUrl || undefined}
          onPhotoSaved={(url) => {
            setDuskPhotoUrl(url);
          }}
        />
      )}
    </section>
  );
};
