import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Sparkles, Heart, Camera } from 'lucide-react';
import { CouplePhotoVisual } from './CouplePhotoVisual';
import { PhotoUploadModal } from './PhotoUploadModal';
import { getCustomPhoto, subscribeToPhotos } from '../services/photoStore';

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export const HeroSilhouetteHeader: React.FC = () => {
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(getCustomPhoto('hero'));
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  useEffect(() => {
    const sync = () => setCustomPhotoUrl(getCustomPhoto('hero'));
    sync();
    const unsub = subscribeToPhotos(sync);
    return () => unsub();
  }, []);

  // Event Date: Monday, 05th October 2026, 03:00 PM IST
  const targetDate = new Date('2026-10-05T15:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState<CountdownState>({
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
    <section className="relative w-full min-h-[92vh] flex flex-col justify-between items-center text-center px-5 pt-8 pb-10 overflow-hidden bg-gradient-to-b from-[#FAF5EE] via-[#F6ECE0] to-[#EFE4D6] text-[#2E1E14]">
      {/* Ambient Aesthetic Pastel Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[340px] h-[340px] bg-[radial-gradient(circle,rgba(226,149,120,0.18)_0%,transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[280px] h-[280px] bg-[radial-gradient(circle,rgba(212,163,115,0.15)_0%,transparent_70%)]" />

        {/* Subtle twinkling rose & champagne sparkles */}
        <span className="absolute top-[8%] left-[15%] w-1.5 h-1.5 rounded-full bg-[#D97D64]/70 opacity-60" />
        <span className="absolute top-[12%] right-[22%] w-1.5 h-1.5 rounded-full bg-[#C59B27]/80 opacity-70" />
        <span className="absolute top-[18%] left-[28%] w-1 h-1 rounded-full bg-[#E29578] opacity-60" />
        <span className="absolute top-[25%] right-[14%] w-1 h-1 rounded-full bg-[#D97D64]/60 opacity-60" />
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
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#D97D64] to-transparent" />
          <span className="text-[#8C5835] text-xs font-serif tracking-[0.3em] uppercase font-semibold">
            ✦ BLESSED BEGINNINGS ✦
          </span>
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#D97D64] to-transparent" />
        </div>

        {/* Tagline */}
        <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] uppercase text-[#8C4E3A] mb-2 font-semibold">
          Bundles of Joy
        </p>

        {/* Heading in Cursive/Script Font */}
        <h1 className="font-cursive text-5xl sm:text-6xl gold-gradient-text tracking-wide leading-tight py-1">
          Valakappu Ceremony
        </h1>

        {/* Sub-text */}
        <div className="mt-3 space-y-1">
          <p className="text-xs sm:text-sm text-[#5A4234] font-montserrat font-medium tracking-wide max-w-[340px] mx-auto leading-relaxed">
            Celebrating new beginnings &amp; honoring parents-to-be
          </p>
          <p className="font-cinzel text-lg sm:text-xl text-[#2E1E14] tracking-[0.15em] font-bold pt-1">
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
        <div className="relative w-[300px] h-[340px] sm:w-[320px] sm:h-[360px] rounded-3xl overflow-hidden border border-[#E2A694]/60 bg-white shadow-[0_15px_40px_rgba(100,60,40,0.12)] flex items-center justify-center group">
          <CouplePhotoVisual
            customUrl={customPhotoUrl}
            visualType="couple_hero"
            alt="Safeel and Anasma Valakappu"
            className="w-full h-full"
          />

          {/* Top Bar inside photo */}
          <div className="absolute top-3 left-3 z-20 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full bg-white/90 border border-[#E8DACB] text-[#8C4E3A] font-cinzel text-[9px] uppercase tracking-widest backdrop-blur-md flex items-center gap-1 font-semibold">
              <Heart className="w-2.5 h-2.5 fill-[#D97D64] text-[#D97D64]" />
              <span>Parents-To-Be</span>
            </span>
          </div>

          {/* Bottom Photo Overlay Ribbon with Sacred Valakappu Kicker */}
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#FAF5EE] via-[#FAF5EE]/95 to-transparent border-t border-[#E8DACB] text-center space-y-0.5">
            <p className="font-cinzel text-xs font-bold text-[#2E1E14] tracking-widest uppercase">
              Monday, 05th October 2026
            </p>
            <p className="font-montserrat text-[10px] text-[#8C5835] font-medium tracking-wide">
              03:00 PM to 06:00 PM • Udaya Resort, Palakkad
            </p>
          </div>
        </div>
      </motion.div>

      {/* Countdown Clock to Ceremony */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 w-full max-w-[340px] space-y-4"
      >
        <div className="p-4 rounded-3xl bg-white/95 border border-[#E8DACB] shadow-[0_8px_30px_rgba(80,50,30,0.08)] backdrop-blur-md">
          <p className="text-[10px] font-cinzel tracking-[0.25em] text-[#8C5835] uppercase mb-3 font-semibold flex items-center justify-center gap-1.5">
            <Clock className="w-3 h-3 text-[#D97D64]" />
            <span>Counting Down to Celebration</span>
          </p>

          {timeLeft.isComplete ? (
            <div className="py-2 text-center text-[#7C3A2D] font-cinzel text-lg font-bold">
              The Auspicious Ceremony Has Begun!
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'DAYS', value: timeLeft.days },
                { label: 'HOURS', value: timeLeft.hours },
                { label: 'MINUTES', value: timeLeft.minutes },
                { label: 'SECONDS', value: timeLeft.seconds },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#FDF9F5] border border-[#EADCC9] rounded-2xl p-2.5 flex flex-col items-center justify-center shadow-sm"
                >
                  <span className="font-cinzel text-xl sm:text-2xl font-bold text-[#7C3A2D]">
                    {item.value.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-montserrat tracking-widest text-[#9E6E57] uppercase mt-0.5 font-semibold">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Date and Venue Overview Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#E8DACB] text-[#5A4234] shadow-sm font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#D97D64]" />
            <span>05th Oct 2026</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#E8DACB] text-[#5A4234] shadow-sm font-medium">
            <Clock className="w-3.5 h-3.5 text-[#D97D64]" />
            <span>03:00 PM – 06:00 PM</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#E8DACB] text-[#5A4234] shadow-sm font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#D97D64]" />
            <span>Palakkad, Kerala</span>
          </div>
        </div>
      </motion.div>

      {/* Photo Upload Modal */}
      {isUploadOpen && (
        <PhotoUploadModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          photoId="hero"
          photoTitle="Valakappu Couple Photo"
          currentPhotoUrl={customPhotoUrl || undefined}
          onPhotoSaved={(url) => {
            setCustomPhotoUrl(url);
          }}
        />
      )}
    </section>
  );
};
