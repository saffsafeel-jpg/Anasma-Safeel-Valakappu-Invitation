import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export const BlessingWelcome: React.FC = () => {
  return (
    <section 
      id="blessing-section"
      className="relative w-full py-16 px-6 bg-gradient-to-b from-[#FAF0F2] via-[#FFFDF9] to-[#FAF0F2] text-[#581825] flex flex-col items-center text-center overflow-hidden"
    >
      {/* Decorative top gold ornament */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
        <Heart className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]/20" />
        <div className="w-10 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
      </div>

      {/* Bismillah Calligraphy in Arabic */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <p 
          className="font-arabic text-2xl sm:text-3xl text-[#581825] leading-relaxed tracking-wider select-none font-bold"
          dir="rtl"
        >
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ
        </p>
        <p className="font-serif italic text-xs text-[#C5A059] tracking-widest mt-1">
          In the name of Allah, the Most Gracious, the Most Merciful
        </p>
      </motion.div>

      {/* Quranic / Poetic Quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="max-w-[340px] mx-auto mb-8 relative p-6 rounded-2xl bg-[#FFFDF9] border border-[#E8CCD1] shadow-sm"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFFDF9] px-3">
          <span className="text-[#C5A059] text-lg">❦</span>
        </div>

        <h3 className="font-script text-2xl sm:text-3xl text-[#581825] leading-snug">
          Two Souls, One Destiny,
        </h3>
        <h4 className="font-script text-2xl sm:text-3xl text-[#C5A059] leading-snug mt-1">
          A Lifetime written by Allah.
        </h4>

        <div className="w-12 h-px bg-[#E8CCD1] mx-auto my-4" />

        {/* Welcome Message */}
        <p className="font-serif text-sm leading-relaxed text-[#6B1D2F]/85 italic">
          &ldquo;Dear Friends and Family, join us for an evening of love, laughter, dua, and unforgettable memories as we begin our forever.&rdquo;
        </p>
      </motion.div>

      {/* Subtle divider */}
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />
    </section>
  );
};
