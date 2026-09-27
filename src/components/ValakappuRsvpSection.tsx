import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, MessageSquareHeart, CheckCircle2 } from 'lucide-react';
import { getStoredRsvps, StoredRSVP } from '../services/googleSheets';

interface ValakappuRsvpSectionProps {
  onOpenRsvpModal: () => void;
}

export const ValakappuRsvpSection: React.FC<ValakappuRsvpSectionProps> = ({ onOpenRsvpModal }) => {
  const [wishesList, setWishesList] = useState<StoredRSVP[]>([]);

  useEffect(() => {
    const list = getStoredRsvps();
    // Filter to only those with wishes or attendance
    const withWishes = list.filter((item) => item.wishes && item.wishes.trim().length > 0 && item.wishes !== '-');
    setWishesList(withWishes);
  }, []);

  return (
    <section id="rsvp-section" className="relative w-full py-14 px-6 bg-gradient-to-b from-[#070D18] via-[#0B1325] to-[#040811] text-[#FAF8F5]">
      {/* Decorative Warm Ambient Glow (GPU-friendly radial gradient) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-88 h-88 bg-[radial-gradient(circle,rgba(212,175,55,0.14)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-[420px] mx-auto space-y-8 text-center">
        {/* Section Pill Kicker */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#18233C]/80 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-cinzel tracking-widest uppercase">
          <Heart className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
          <span>With Our Whole Hearts</span>
        </div>

        {/* Section Heading */}
        <div className="space-y-1">
          <h2 className="font-cursive text-4xl sm:text-5xl text-[#FAF8F5] gold-gradient-text drop-shadow-[0_2px_12px_rgba(212,175,55,0.3)]">
            RSVP &amp; Blessings
          </h2>
          <p className="font-serif italic text-sm text-[#D4AF37] tracking-wide">
            Your love and prayers mean the world to us
          </p>
        </div>

        {/* The Exact Family Note Requested */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-6 sm:p-7 rounded-3xl bg-[#142038]/85 border border-[#D4AF37]/35 shadow-[0_12px_40px_rgba(0,0,0,0.55)] backdrop-blur-md space-y-4"
        >
          <div className="w-10 h-10 rounded-full bg-[#0E1626] border border-[#D4AF37]/60 mx-auto flex items-center justify-center text-[#D4AF37]">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          </div>

          {/* User's Exact Note */}
          <blockquote className="font-serif italic text-base sm:text-lg text-[#FAF8F5] leading-relaxed">
            &ldquo;Your presence, love, and blessings will make this day truly unforgettable.&rdquo;
          </blockquote>

          {/* User's Exact Family Attribution */}
          <div className="pt-2">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto block mb-2" />
            <p className="font-cinzel text-xs sm:text-sm uppercase tracking-widest text-[#D4AF37] font-semibold">
              — With love, Anasma &amp; Safeel Family
            </p>
          </div>

          {/* Interactive Button: RSVP & Send Your Wishes */}
          <div className="pt-4">
            <button
              onClick={onOpenRsvpModal}
              className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-[#0B1325] font-cinzel text-xs sm:text-sm tracking-[0.2em] uppercase font-bold shadow-[0_6px_25px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>RSVP &amp; Send Your Wishes</span>
              <Heart className="w-4 h-4 fill-[#0B1325]" />
            </button>
            <p className="text-[10px] text-[#FAF8F5]/60 font-montserrat mt-2">
              Responses stream directly to the family's Google Sheet
            </p>
          </div>
        </motion.div>

        {/* Live Guest Wishes & Blessings Wall (if any submitted) */}
        {wishesList.length > 0 && (
          <div className="space-y-3 pt-2 text-left">
            <div className="flex items-center justify-between px-2">
              <span className="font-cinzel text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1.5">
                <MessageSquareHeart className="w-3.5 h-3.5" />
                <span>Guest Wishes &amp; Prayers</span>
              </span>
              <span className="text-[10px] text-[#FAF8F5]/50 font-montserrat">
                {wishesList.length} Blessing(s)
              </span>
            </div>

            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
              {wishesList.slice(0, 5).map((w, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#121C30]/70 border border-[#D4AF37]/20 text-xs space-y-1"
                >
                  <p className="font-serif italic text-sm text-[#FAF8F5]">
                    &ldquo;{w.wishes}&rdquo;
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-[#D4AF37]/80 pt-1 font-montserrat">
                    <span className="font-medium">{w.fullName}</span>
                    <span className="text-[#FAF8F5]/40">{w.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
