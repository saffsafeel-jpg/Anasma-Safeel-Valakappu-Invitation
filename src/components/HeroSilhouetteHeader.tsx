import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Heart, ChevronDown, Camera, Sparkles, Image as ImageIcon } from 'lucide-react';
import { CountdownTime } from '../types';
import { CouplePhotoVisual } from './CouplePhotoVisual';
import { PhotoUploadModal } from './PhotoUploadModal';
import { getCustomPhoto, subscribeToPhotos } from '../services/photoStore';

interface HeroSilhouetteHeaderProps {
  onRsvpClick?: () => void;
  onExploreClick?: () => void;
}

export const HeroSilhouetteHeader: React.FC<HeroSilhouetteHeaderProps> = () => {
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(getCustomPhoto('hero'));
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  useEffect(() => {
    const sync = () => setCustomPhotoUrl(getCustomPhoto('hero'));
    sync();
    const unsub = subscribeToPhotos(sync);
    return () => unsub();
  }, []);

  // Target Event: Sunday, 04th October 2026 at 15:00:00 (Palakkad, Kerala IST / UTC+5:30)
  const targetDate = new Date('2026-10-04T15:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isComplete: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="relative w-full min-h-[92vh] flex flex-col justify-between items-center text-center px-5 pt-8 pb-10 overflow-hidden bg-gradient-to-b from-[#070D18] via-[#0B1325] to-[#121B2F]">
      {/* Ambient Starry Sky & Deep Twilight Lighting (Optimized for 60fps mobile) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep navy & twilight horizon glow (GPU radial gradients) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[340px] h-[340px] bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[280px] h-[280px] bg-[radial-gradient(circle,rgba(229,195,120,0.1)_0%,transparent_70%)]" />

        {/* Subtle twinkling stars */}
        <span className="absolute top-[8%] left-[15%] w-1 h-1 rounded-full bg-white/70 animate-ping opacity-60" />
        <span className="absolute top-[12%] right-[22%] w-1.5 h-1.5 rounded-full bg-[#FFF3B0] opacity-80" />
        <span className="absolute top-[18%] left-[28%] w-1 h-1 rounded-full bg-[#E5C378] opacity-50" />
        <span className="absolute top-[25%] right-[14%] w-1 h-1 rounded-full bg-white/80 opacity-70" />
        <span className="absolute top-[34%] left-[10%] w-1.5 h-1.5 rounded-full bg-[#D4AF37] opacity-60" />
        <span className="absolute top-[42%] right-[18%] w-1 h-1 rounded-full bg-white/70 opacity-50" />
      </div>

      {/* Top Header Branding & Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full pt-2"
      >
        {/* Subtle decorative gold emblem */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <span className="text-[#D4AF37] text-xs font-serif tracking-[0.3em] uppercase">
            ✦ BLESSED BEGINNINGS ✦
          </span>
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </div>

        {/* Tagline */}
        <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] uppercase text-[#D4AF37] mb-2 font-medium">
          Bundles of Joy
        </p>

        {/* Heading in Cursive/Script Font */}
        <h1 className="font-cursive text-5xl sm:text-6xl text-[#FAF8F5] gold-gradient-text tracking-wide drop-shadow-[0_4px_16px_rgba(212,175,55,0.35)] leading-tight py-1">
          Valakappu Ceremony
        </h1>

        {/* Sub-text */}
        <div className="mt-3 space-y-1">
          <p className="text-xs sm:text-sm text-[#FAF8F5]/80 font-montserrat font-light tracking-wide max-w-[340px] mx-auto leading-relaxed">
            Celebrating new beginnings &amp; honoring parents-to-be
          </p>
          <p className="font-cinzel text-lg sm:text-xl text-[#F8F9FA] tracking-[0.15em] font-semibold pt-1">
            Anasma &amp; Safeel
          </p>
        </div>
      </motion.div>

      {/* Hero Visual: Featured Couple Photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 my-3 w-full max-w-[340px] flex flex-col items-center justify-center"
      >
        <div className="relative w-[300px] h-[340px] sm:w-[320px] sm:h-[360px] rounded-3xl overflow-hidden border border-[#D4AF37]/40 bg-gradient-to-b from-[#0A1326] via-[#0E1A33] to-[#16223E] shadow-[0_15px_40px_rgba(0,0,0,0.7)] flex items-center justify-center group">
          <CouplePhotoVisual
            customUrl={customPhotoUrl}
            visualType="couple_hero"
            alt="Safeel and Anasma Valakappu"
            className="w-full h-full"
          />

          {/* Top Bar inside photo */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20 pointer-events-auto">
            <span className="px-2.5 py-1 rounded-full bg-[#070D18]/85 border border-[#D4AF37]/40 text-[#D4AF37] font-cinzel text-[9px] uppercase tracking-widest backdrop-blur-md flex items-center gap-1">
              <Heart className="w-2.5 h-2.5 fill-[#D4AF37]" />
              <span>Parents-To-Be</span>
            </span>

            <button
              type="button"
              onClick={() => setIsUploadOpen(true)}
              className="p-2 rounded-full bg-[#0B1325]/90 border border-[#D4AF37]/50 text-[#D4AF37] hover:scale-110 active:scale-95 transition-all shadow-md backdrop-blur-md cursor-pointer flex items-center gap-1 text-[10px] font-montserrat"
              title="Upload Couple Photo"
            >
              <Camera className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Change</span>
            </button>
          </div>

          {/* Corner golden framing accents */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#D4AF37]/50 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#D4AF37]/50 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#D4AF37]/50 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#D4AF37]/50 pointer-events-none" />
        </div>
      </motion.div>

      {/* Quick Date & Live Interactive Countdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 w-full max-w-[380px] space-y-4"
      >
        {/* Quick Date & Time Display */}
        <div className="flex flex-col items-center gap-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121B2F]/80 border border-[#D4AF37]/40 shadow-sm backdrop-blur-md">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-cinzel text-xs sm:text-sm text-[#FAF8F5] tracking-widest uppercase font-semibold">
              Sunday, 04th October 2026
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0E1626]/85 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-cinzel tracking-wider backdrop-blur-sm">
            <Clock className="w-3 h-3 text-[#D4AF37]" />
            <span>03:00 PM to 06:00 PM</span>
          </div>
        </div>

        {/* Live Countdown Element */}
        <div className="grid grid-cols-4 gap-2 px-1">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.minutes },
            { label: 'Secs', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="py-2.5 px-1.5 rounded-2xl bg-[#0F182B]/90 border border-[#D4AF37]/35 shadow-[0_4px_15px_rgba(0,0,0,0.4)] backdrop-blur-md flex flex-col items-center justify-center"
            >
              <span className="font-cinzel text-xl sm:text-2xl font-bold text-[#FAF8F5] gold-gradient-text tabular-nums">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="font-montserrat text-[9px] uppercase tracking-wider text-[#D4AF37] font-medium mt-0.5">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Upload Modal for Hero Photo */}
      <PhotoUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        photoId="hero"
        photoTitle="Hero Couple Portrait (Anasma & Safeel)"
        currentPhotoUrl={customPhotoUrl}
        onPhotoSaved={(url) => setCustomPhotoUrl(url)}
      />
    </section>
  );
};
