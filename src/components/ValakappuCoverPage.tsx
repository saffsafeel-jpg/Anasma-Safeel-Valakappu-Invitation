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
  const [coverPhotoUrl, setCoverPhotoUrl] = useState<string>(() => getCustomPhoto('cover'));
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const { play } = useMusic();

  useEffect(() => {
    const sync = () => {
      const c = getCustomPhoto('cover') || getCustomPhoto('hero');
      setCoverPhotoUrl(c);
    };
    const unsub = subscribeToPhotos(sync);
    return () => unsub();
  }, []);

  const handleTriggerOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Start celebration music on user interaction
    play();

    // Fire golden & peach celebration confetti burst
    try {
      confetti({
        particleCount: 16,
        spread: 45,
        origin: { y: 0.7 },
        colors: ['#D97D64', '#E29578', '#F7D6C8', '#D4AF37'],
      });
    } catch {
      // Canvas confetti fallback
    }

    setTimeout(() => {
      onOpenInvitation();
    }, 550);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.98 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-4 py-6 bg-gradient-to-b from-[#FDF9F4] via-[#F8F1E7] to-[#F3E7D9] text-[#2E1E14] overflow-hidden select-none"
    >
      {/* ================= BACKGROUND AESTHETIC PASTEL AMBIENCE ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft pastel stippled texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#D97D64_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        
        {/* Soft Peach & Rose Champagne Ambient Glows */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(226,149,120,0.22)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[radial-gradient(circle,rgba(212,163,115,0.18)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-16 right-0 w-88 h-88 bg-[radial-gradient(circle,rgba(235,188,145,0.2)_0%,transparent_70%)] pointer-events-none" />

        {/* Traditional Royal Gold & Rose Corner Filigrees */}
        <div className="absolute top-3 left-3 w-16 h-16 border-t-2 border-l-2 border-[#D4A373]/60 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-3 right-3 w-16 h-16 border-t-2 border-r-2 border-[#D4A373]/60 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-16 h-16 border-b-2 border-l-2 border-[#D4A373]/60 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-16 h-16 border-b-2 border-r-2 border-[#D4A373]/60 rounded-br-xl pointer-events-none" />
      </div>

      {/* ================= TOP SECTION: AESTHETIC HEADER ================= */}
      <header className="relative z-10 w-full max-w-[420px] text-center pt-2 space-y-2">
        {/* Auspicious Kicker */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#F4E6D8] border border-[#E8CDB5] text-[#8A4F38] text-[11px] font-cinzel tracking-[0.25em] uppercase shadow-sm"
        >
          <Sparkles className="w-3 h-3 text-[#D97D64]" />
          <span>Bundles of Joy</span>
          <Sparkles className="w-3 h-3 text-[#D97D64]" />
        </motion.div>

        {/* Main Ceremony Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="space-y-0.5"
        >
          <h1 className="font-cursive text-5xl sm:text-6xl gold-gradient-text tracking-wide leading-tight">
            Valakappu Ceremony
          </h1>
          <p className="font-serif italic text-xs sm:text-sm text-[#8C5835] tracking-wider">
            Celebrating new beginnings &amp; honoring parents-to-be
          </p>
        </motion.div>

        {/* Parents-To-Be Names with Soft Warm Flourish */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-1 flex items-center justify-center gap-3"
        >
          <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#D97D64]/70" />
          <h2 className="font-cinzel text-base sm:text-lg text-[#2E1E14] font-bold tracking-[0.2em] uppercase">
            Anasma &amp; Safeel
          </h2>
          <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#D97D64]/70" />
        </motion.div>
      </header>

      {/* ================= MIDDLE SECTION: FEATURED COUPLE PHOTO CARD ================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="relative z-10 w-full max-w-[340px] my-auto py-2"
      >
        {/* Ornate Pastel Terracotta & Champagne Frame */}
        <div className="relative p-1.5 rounded-[32px] bg-gradient-to-b from-[#E2A694]/70 via-[#DDB09A]/40 to-[#E2A694]/60 shadow-[0_16px_45px_rgba(120,70,40,0.15)] group">
          {/* Inner card with arched aesthetic */}
          <div className="relative w-full h-[330px] sm:h-[360px] rounded-[28px] overflow-hidden bg-[#FAF5EE] border border-[#E8DACB] shadow-inner flex flex-col justify-between">
            {/* Visual Portrait */}
            <CouplePhotoVisual
              customUrl={coverPhotoUrl}
              visualType="couple_cover"
              alt="Safeel and Anasma Valakappu Cover"
              className="w-full h-full"
            />

            {/* Top-left subtle blessing badge */}
            <div className="absolute top-3 left-3 z-20 pointer-events-none">
              <span className="px-2.5 py-1 rounded-full bg-white/90 border border-[#E8DACB] text-[#8C4E3A] font-cinzel text-[9px] uppercase tracking-widest backdrop-blur-md flex items-center gap-1 font-semibold">
                <Heart className="w-2.5 h-2.5 fill-[#D97D64] text-[#D97D64]" />
                <span>Parents-To-Be</span>
              </span>
            </div>

            {/* Bottom Photo Overlay Ribbon with Date & Venue Teaser */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#FAF5EE] via-[#FAF5EE]/95 to-transparent border-t border-[#E8DACB] text-center space-y-1">
              <p className="font-cinzel text-xs font-bold text-[#2E1E14] tracking-widest uppercase">
                Monday, 05th October 2026
              </p>
              <p className="font-cinzel text-[11px] text-[#5A4234] font-medium tracking-wider">
                03:00 PM to 06:00 PM
              </p>
              <p className="font-montserrat text-[10px] text-[#8C5835] tracking-wider flex items-center justify-center gap-1 font-medium">
                <MapPin className="w-3 h-3 text-[#D97D64]" />
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
          {/* Royal Embossed Pastel Wax Seal Button */}
          <div className="relative cursor-pointer" onClick={handleTriggerOpen}>
            {/* Ambient Pulsing Rings */}
            <div className="absolute -inset-2 rounded-full bg-[#E29578]/25 animate-ping opacity-60 pointer-events-none" />
            <div className="absolute -inset-1 rounded-full bg-[#D97D64]/35 blur-sm pointer-events-none" />

            {/* The Wax Seal Disc */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              disabled={isOpening}
              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#F4B2A0] via-[#D97D64] to-[#B85D43] p-[2px] shadow-[0_8px_25px_rgba(217,125,100,0.4)] cursor-pointer flex items-center justify-center border border-[#FFF0E6]"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#C86D58] to-[#9E4E38] flex flex-col items-center justify-center text-[#FFF6EE] shadow-inner">
                <span className="font-cinzel text-xs font-bold tracking-widest text-[#FFF6EE]">
                  A &amp; S
                </span>
                <Heart className="w-2.5 h-2.5 fill-[#FFF6EE] text-[#FFF6EE] mt-0.5" />
              </div>
            </motion.button>
          </div>

          {/* Primary "Tap to Open Invitation" Prompt Bar */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleTriggerOpen}
            disabled={isOpening}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#D97D64] via-[#E29578] to-[#C86D58] text-white font-cinzel text-xs sm:text-sm tracking-[0.2em] uppercase font-bold shadow-[0_8px_30px_rgba(217,125,100,0.35)] hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isOpening ? 'Opening Invitation...' : 'Tap to Open Invitation'}</span>
            <ChevronRight className={`w-4 h-4 text-white transition-transform ${isOpening ? 'translate-x-2' : ''}`} />
          </motion.button>

          <p className="text-[10px] text-[#7A6354] font-montserrat tracking-widest uppercase">
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
