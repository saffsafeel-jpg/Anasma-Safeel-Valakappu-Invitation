import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, MapPin, Heart, Camera, ChevronRight, Volume2, VolumeX, Music } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CouplePhotoVisual } from './CouplePhotoVisual';
import { PhotoUploadModal } from './PhotoUploadModal';
import { getCustomPhoto, subscribeToPhotos, initPhotosSync } from '../services/photoStore';
import { useMusic } from '../context/MusicContext';

interface ValakappuCoverPageProps {
  onOpenInvitation: () => void;
}

export const ValakappuCoverPage: React.FC<ValakappuCoverPageProps> = ({ onOpenInvitation }) => {
  const [coverPhotoUrl, setCoverPhotoUrl] = useState<string | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const { play, isPlaying, songTitle } = useMusic();

  useEffect(() => {
    const sync = () => {
      // Prefer 'cover' photo, fallback to 'hero' photo
      const c = getCustomPhoto('cover') || getCustomPhoto('hero');
      setCoverPhotoUrl(c);
    };
    sync();
    initPhotosSync().then(sync);
    const unsub = subscribeToPhotos(sync);

    // Automatically trigger music from the cover page
    play();

    return () => unsub();
  }, [play]);

  const handleTriggerOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Ensure music is playing
    play();

    // Fire golden celebration confetti burst
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#FFF3B0', '#F3E5AB', '#FAF8F5'],
      });
    } catch {
      // Canvas confetti fallback
    }

    setTimeout(() => {
      onOpenInvitation();
    }, 700);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.98 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-4 py-6 bg-gradient-to-b from-[#060B14] via-[#0B1325] to-[#040810] text-[#FAF8F5] overflow-hidden select-none"
    >
      {/* ================= BACKGROUND ROYAL AMBIENCE ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep starry texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#FAF8F5_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        
        {/* Soft Golden Ambient Glows */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-[110px]" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#0E1F38]/60 rounded-full blur-[90px]" />
        <div className="absolute -bottom-16 right-0 w-88 h-88 bg-[#D4AF37]/10 rounded-full blur-[100px]" />

        {/* Traditional Royal Gold Corner Filigrees */}
        <div className="absolute top-3 left-3 w-16 h-16 border-t-2 border-l-2 border-[#D4AF37]/50 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-3 right-3 w-16 h-16 border-t-2 border-r-2 border-[#D4AF37]/50 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-16 h-16 border-b-2 border-l-2 border-[#D4AF37]/50 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-16 h-16 border-b-2 border-r-2 border-[#D4AF37]/50 rounded-br-xl pointer-events-none" />
      </div>

      {/* ================= TOP SECTION: ROYAL HEADER ================= */}
      <header className="relative z-10 w-full max-w-[420px] text-center pt-2 space-y-2">
        {/* Sacred / Auspicious Kicker */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#142038]/80 border border-[#D4AF37]/35 text-[#D4AF37] text-[11px] font-cinzel tracking-[0.25em] uppercase shadow-sm backdrop-blur-md"
        >
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          <span>Bundles of Joy</span>
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
        </motion.div>

        {/* Main Ceremony Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="space-y-0.5"
        >
          <h1 className="font-cursive text-5xl sm:text-6xl text-[#FAF8F5] gold-gradient-text tracking-wide drop-shadow-[0_4px_16px_rgba(212,175,55,0.4)] leading-tight">
            Valakappu Ceremony
          </h1>
          <p className="font-serif italic text-xs sm:text-sm text-[#D4AF37] tracking-wider">
            Celebrating new beginnings &amp; honoring parents-to-be
          </p>
        </motion.div>

        {/* Parents-To-Be Names with Gold Flourish */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-1 flex items-center justify-center gap-3"
        >
          <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#D4AF37]/70" />
          <h2 className="font-cinzel text-base sm:text-lg text-[#FAF8F5] font-bold tracking-[0.2em] uppercase">
            Anasma &amp; Safeel
          </h2>
          <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#D4AF37]/70" />
        </motion.div>
      </header>

      {/* ================= MIDDLE SECTION: FEATURED COUPLE PHOTO CARD ================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="relative z-10 w-full max-w-[340px] my-auto py-2"
      >
        {/* Ornate Gold Border & Shadow Card Frame */}
        <div className="relative p-1.5 rounded-[32px] bg-gradient-to-b from-[#D4AF37]/60 via-[#996E0F]/30 to-[#D4AF37]/50 shadow-[0_16px_50px_rgba(0,0,0,0.85)] group">
          {/* Inner card with arched aesthetic */}
          <div className="relative w-full h-[330px] sm:h-[360px] rounded-[28px] overflow-hidden bg-[#0A101C] border border-[#D4AF37]/30 shadow-inner flex flex-col justify-between">
            {/* Visual Portrait */}
            <CouplePhotoVisual
              customUrl={coverPhotoUrl}
              visualType="couple_cover"
              alt="Safeel and Anasma Valakappu Cover"
              className="w-full h-full"
            />

            {/* Quick Upload / Camera action badge on top-right of cover photo */}
            <div className="absolute top-3 right-3 z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUploadOpen(true);
                }}
                className="p-2 rounded-full bg-[#070D18]/85 border border-[#D4AF37]/60 text-[#D4AF37] hover:scale-110 active:scale-95 transition-all shadow-md backdrop-blur-md cursor-pointer"
                title="Personalize / Upload Cover Photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Top-left subtle blessing badge */}
            <div className="absolute top-3 left-3 z-20 pointer-events-none">
              <span className="px-2.5 py-1 rounded-full bg-[#070D18]/85 border border-[#D4AF37]/40 text-[#D4AF37] font-cinzel text-[9px] uppercase tracking-widest backdrop-blur-md flex items-center gap-1">
                <Heart className="w-2.5 h-2.5 fill-[#D4AF37]" />
                <span>Parents-To-Be</span>
              </span>
            </div>

            {/* Bottom Photo Overlay Ribbon with Date & Venue Teaser */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#060B14] via-[#060B14]/80 to-transparent border-t border-[#D4AF37]/25 text-center space-y-1">
              <p className="font-cinzel text-xs font-semibold text-[#FAF8F5] tracking-widest uppercase">
                Sunday, 04th October 2026
              </p>
              <p className="font-cinzel text-[11px] text-[#FAF8F5]/90 tracking-wider">
                03:00 PM to 06:00 PM
              </p>
              <p className="font-montserrat text-[10px] text-[#D4AF37] tracking-wider flex items-center justify-center gap-1">
                <MapPin className="w-3 h-3 text-[#D4AF37]" />
                <span>Udaya Resort, Palakkad</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ================= BOTTOM SECTION: TAP TO OPEN INVITATION ================= */}
      <footer className="relative z-10 w-full max-w-[380px] text-center pb-2 space-y-4">
        {/* Interactive Royal Wax Seal & Pulsing Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          {/* Royal Embossed Wax Seal Button */}
          <div className="relative cursor-pointer" onClick={handleTriggerOpen}>
            {/* Ambient Pulsing Rings */}
            <div className="absolute -inset-2 rounded-full bg-[#D4AF37]/25 animate-ping opacity-60 pointer-events-none" />
            <div className="absolute -inset-1 rounded-full bg-[#D4AF37]/40 blur-sm pointer-events-none" />

            {/* The Wax Seal Disc */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              disabled={isOpening}
              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#F5DE82] via-[#D4AF37] to-[#8C6209] p-[2px] shadow-[0_8px_30px_rgba(212,175,55,0.6)] cursor-pointer flex items-center justify-center border border-[#FFF8DC]"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#A47617] to-[#604207] flex flex-col items-center justify-center text-[#FFF8DC] shadow-inner">
                <span className="font-cinzel text-xs font-bold tracking-widest text-[#FFF8DC]">
                  A &amp; S
                </span>
                <Heart className="w-2.5 h-2.5 fill-[#FFF8DC] text-[#FFF8DC] mt-0.5" />
              </div>
            </motion.button>
          </div>

          {/* Primary "Tap to Open Invitation" Prompt Bar */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleTriggerOpen}
            disabled={isOpening}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-[#0B1325] font-cinzel text-xs sm:text-sm tracking-[0.2em] uppercase font-bold shadow-[0_6px_30px_rgba(212,175,55,0.45)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isOpening ? 'Opening Invitation...' : 'Tap to Open Invitation'}</span>
            <ChevronRight className={`w-4 h-4 text-[#0B1325] transition-transform ${isOpening ? 'translate-x-2' : ''}`} />
          </motion.button>

          <p className="text-[10px] text-[#FAF8F5]/60 font-montserrat tracking-widest uppercase">
            Touch anywhere on the seal to unfold the celebration
          </p>
        </motion.div>
      </footer>

      {/* Photo Upload Modal for Cover */}
      {isUploadOpen && (
        <PhotoUploadModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          photoId="cover"
          photoTitle="Valakappu Invitation Cover"
          currentPhotoUrl={coverPhotoUrl || undefined}
          onPhotoSaved={(url) => {
            setCoverPhotoUrl(url);
          }}
        />
      )}
    </motion.div>
  );
};
