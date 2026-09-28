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
    <section id="rsvp-section" className="relative w-full py-14 px-6 bg-gradient-to-b from-[#EFE4D6] via-[#FAF5EE] to-[#F5ECE0] text-[#2E1E14]">
      {/* Decorative Warm Ambient Glow (Aesthetic Pastel) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-88 h-88 bg-[radial-gradient(circle,rgba(226,149,120,0.18)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-[420px] mx-auto space-y-8 text-center">
        {/* Section Pill Kicker */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5E6D8] border border-[#E8CDB5] text-[#8C4E3A] text-[11px] font-cinzel tracking-widest uppercase font-semibold">
          <Heart className="w-3 h-3 text-[#D97D64] fill-[#D97D64]" />
          <span>With Our Whole Hearts</span>
        </div>

        {/* Section Heading */}
        <div className="space-y-1">
          <h2 className="font-cursive text-4xl sm:text-5xl gold-gradient-text py-0.5">
            RSVP &amp; Blessings
          </h2>
          <p className="font-serif italic text-sm text-[#8C5835] tracking-wide font-medium">
            Your love and prayers mean the world to us
          </p>
        </div>

        {/* The Exact Family Note Requested */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-6 sm:p-7 rounded-3xl bg-white/95 border border-[#E8DACB] shadow-[0_12px_40px_rgba(80,50,30,0.08)] backdrop-blur-md space-y-4"
        >
          <div className="w-10 h-10 rounded-full bg-[#F5E6D8] border border-[#E8CDB5] flex items-center justify-center mx-auto text-[#D97D64]">
            <Heart className="w-5 h-5 fill-[#D97D64]" />
          </div>

          <p className="font-serif italic text-base sm:text-lg text-[#3C2A20] leading-relaxed">
            &ldquo;We kindly request no gifts. Your presence, loving blessings, and joyous prayers are the greatest gift you could bestow upon our expanding family.&rdquo;
          </p>

          <div className="pt-2 border-t border-[#E8DACB] flex items-center justify-center gap-2">
            <span className="font-cinzel text-xs text-[#8C5835] tracking-widest uppercase font-semibold">
              With Gratitude · Anasma &amp; Safeel
            </span>
          </div>
        </motion.div>

        {/* Primary Interactive RSVP Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-3"
        >
          <button
            onClick={onOpenRsvpModal}
            className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#D97D64] via-[#E29578] to-[#C86D58] text-white font-cinzel text-sm uppercase tracking-[0.2em] font-bold shadow-[0_8px_30px_rgba(217,125,100,0.35)] hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#FFF0E6]"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Send RSVP &amp; Warm Wishes</span>
            <Sparkles className="w-4 h-4 text-white" />
          </button>
          <p className="text-[11px] text-[#7A6354] font-montserrat font-medium">
            Please confirm your attendance so we may warmly prepare for your presence
          </p>
        </motion.div>

        {/* Live Guest Blessings Wall Preview (if any submitted) */}
        {wishesList.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-3 pt-4 text-left"
          >
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-cinzel tracking-wider text-[#8C5835] uppercase font-bold flex items-center gap-1.5">
                <MessageSquareHeart className="w-3.5 h-3.5 text-[#D97D64]" />
                <span>Blessings Wall ({wishesList.length})</span>
              </span>
              <span className="text-[10px] text-[#7A6354] font-montserrat">
                Recent Wishes
              </span>
            </div>

            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {wishesList.slice(0, 5).map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-[#FDF9F5] border border-[#EADCC9] space-y-1 shadow-sm"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-cinzel font-bold text-[#2E1E14]">
                      {item.guestName}
                    </span>
                    <span className="text-[10px] text-emerald-700 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Attending
                    </span>
                  </div>
                  <p className="text-xs text-[#5A4234] font-montserrat italic">
                    &ldquo;{item.wishes}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
