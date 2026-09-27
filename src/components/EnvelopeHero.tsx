import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnvelopeHeroProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const EnvelopeHero: React.FC<EnvelopeHeroProps> = ({ onOpen, isOpen }) => {
  const [animStage, setAnimStage] = useState<'sealed' | 'unsealing' | 'flap-open' | 'card-rising' | 'opened'>(
    isOpen ? 'opened' : 'sealed'
  );

  const handleWaxSealClick = () => {
    if (animStage !== 'sealed') return;

    // Trigger celebratory gold and rose confetti burst
    try {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.52, x: 0.5 },
        colors: ['#C5A059', '#F3B8BF', '#E8CCD1', '#FFFFFF', '#851D33'],
        disableForReducedMotion: true,
      });
    } catch {
      // Confetti fallback
    }

    setAnimStage('unsealing');

    // Step 1: Wax seal pop/fade
    setTimeout(() => {
      setAnimStage('flap-open');
    }, 450);

    // Step 2: 3D Top Flap flips upwards
    setTimeout(() => {
      setAnimStage('card-rising');
    }, 950);

    // Step 3: Invitation card rises from the envelope pocket
    setTimeout(() => {
      setAnimStage('opened');
      onOpen();
    }, 2000);
  };

  return (
    <section 
      id="envelope-hero"
      className="relative w-full h-[100dvh] min-h-[640px] flex flex-col items-center justify-between overflow-hidden bg-[#FBF7F5] select-none"
    >
      {/* SVG Filters for Realistic 3D Paper Embossing & Wax Seal Lighting */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          {/* Paper Blind Emboss Filter */}
          <filter id="paper-emboss" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="1.5" stdDeviation="0.8" floodColor="#8E6770" floodOpacity="0.25" />
            <feDropShadow dx="-1" dy="-1" stdDeviation="0.6" floodColor="#FFFFFF" floodOpacity="0.9" />
          </filter>

          {/* Deep Wax Seal Specular & Drop Shadow */}
          <filter id="wax-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#2E0710" floodOpacity="0.45" />
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.3" />
          </filter>
        </defs>
      </svg>

      {/* Main Full-Screen Vertical Envelope Viewport matching the viral reel */}
      <div className="relative w-full h-full max-w-[480px] mx-auto flex items-center justify-center overflow-hidden">
        
        {/* Envelope Shell Container */}
        <div className="relative w-full h-full bg-[#F7EEEE] shadow-[inset_0_0_40px_rgba(142,103,112,0.08)] overflow-hidden perspective-1000">
          
          {/* Subtle paper grain texture */}
          <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[radial-gradient(#C5A059_0.75px,transparent_0.75px)] [background-size:16px_16px] pointer-events-none" />

          {/* ========================================================= */}
          {/* INNER ENVELOPE BASE (Behind card) */}
          {/* ========================================================= */}
          <div className="absolute inset-0 bg-[#F2E4E6] flex flex-col items-center justify-start pt-8">
            {/* Shimmering Gold Foil Interior Lining */}
            <div className="w-[92%] h-[65%] rounded-t-2xl bg-gradient-to-b from-[#F5DEB3] via-[#E8CD94] to-[#F2E4E6] opacity-80 shadow-inner relative overflow-hidden">
              {/* Gold foil geometric ornament watermark inside envelope */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8F5E16_1px,transparent_1px)] [background-size:10px_10px]" />
              <div className="absolute top-4 inset-x-8 h-px bg-[#8F5E16]/30" />
            </div>
          </div>

          {/* ========================================================= */}
          {/* THE INVITATION CARD (Glides up and expands into full view) */}
          {/* ========================================================= */}
          <motion.div
            initial={{ y: 20, scale: 0.92, opacity: 0.8 }}
            animate={
              animStage === 'card-rising' || animStage === 'opened'
                ? { y: 0, scale: 1, opacity: 1, zIndex: 45 }
                : { y: 20, scale: 0.92, opacity: 0.8, zIndex: 15 }
            }
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1]
            }}
            className={`absolute inset-x-4 top-8 bottom-8 rounded-2xl bg-[#FFFDF9] shadow-[0_20px_50px_rgba(88,24,37,0.22)] border border-[#E8CCD1] p-5 sm:p-6 flex flex-col items-center justify-between text-center transition-all duration-500 overflow-hidden ${
              animStage === 'card-rising' || animStage === 'opened' ? 'z-45' : 'z-15'
            }`}
          >
            {/* Elegant Double Gold Framing */}
            <div className="absolute inset-2 border border-[#C5A059]/40 rounded-xl pointer-events-none" />
            <div className="absolute inset-3 border border-dotted border-[#C5A059]/30 rounded-lg pointer-events-none" />

            {/* Top Monogram Seal & Calligraphy */}
            <div className="flex flex-col items-center pt-1 z-10">
              <span className="font-arabic text-base sm:text-lg text-[#C5A059] tracking-wider">
                بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
              </span>
              <p className="font-script text-3xl sm:text-4xl text-[#C5A059] mt-1">
                Nikkah Ceremony
              </p>
            </div>

            {/* Prominent High-Contrast Date Badge (100% Clear & Visible) */}
            <div className="w-full flex flex-col items-center my-1 z-10">
              <div className="flex items-center gap-3 w-full justify-center">
                <div className="h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent flex-1 max-w-[50px]" />
                <div className="px-4 py-1.5 rounded-full bg-[#FAF0F2] border border-[#C5A059]/50 shadow-sm flex flex-col items-center">
                  <span className="font-serif text-sm sm:text-base font-semibold tracking-[0.25em] text-[#581825]">
                    21 . 09 . 2026
                  </span>
                  <span className="font-sans text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.2em] text-[#C5A059] -mt-0.5">
                    MONDAY
                  </span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent flex-1 max-w-[50px]" />
              </div>
            </div>

            {/* Couple Names */}
            <div className="flex flex-col items-center my-1 z-10">
              <p className="font-serif italic text-[11px] text-[#6B1D2F]/80 mb-1">
                request the honour of your presence to celebrate
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#581825] tracking-tight leading-tight">
                Hannah
              </h2>
              <p className="font-cursive text-2xl text-[#C5A059] -my-1">&amp;</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#581825] tracking-tight leading-tight">
                Nesban
              </h2>
            </div>

            {/* Venue & Time Summary */}
            <div className="flex flex-col items-center text-center space-y-0.5 z-10">
              <p className="font-sans text-[11px] font-semibold tracking-wider text-[#581825] uppercase">
                Juna Jaas Hall
              </p>
              <p className="font-serif italic text-[10px] text-[#6B1D2F]/70">
                10:00 AM • Guest Arrival &amp; Nikkah
              </p>
            </div>

            {/* Bottom Proceed Action Button */}
            <div className="pt-2 z-20 w-full flex justify-center">
              <button
                onClick={onOpen}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#581825] text-[#F5DEB3] text-xs font-serif tracking-[0.15em] uppercase hover:bg-[#45101B] shadow-md transition-all active:scale-95"
              >
                <span>View Full Invitation</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#C5A059] animate-bounce" />
              </button>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* ENVELOPE POCKET: LEFT & RIGHT SIDE FLAPS */}
          {/* ========================================================= */}
          <motion.div 
            className="absolute inset-0 z-20 pointer-events-none"
            animate={
              animStage === 'card-rising' || animStage === 'opened'
                ? { opacity: 0.4, scale: 0.98, y: 15 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            transition={{ duration: 0.9 }}
          >
            {/* LEFT TRIANGULAR FLAP */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-[#F6EAEC] via-[#F8EEF0] to-[#F3E2E5]"
              style={{
                clipPath: 'polygon(0% 0%, 50% 52%, 0% 100%)',
                filter: 'drop-shadow(4px 0 10px rgba(107,29,47,0.06))'
              }}
            >
              {/* Embossed Botanical Vine on Left Flap Border */}
              <svg className="w-full h-full absolute inset-0" viewBox="0 0 240 500" preserveAspectRatio="none">
                <g filter="url(#paper-emboss)" stroke="#FAF5F5" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
                  {/* Vine Stem running down the diagonal */}
                  <path d="M 10 10 Q 50 120 115 255" />
                  {/* Leaves along top-left diagonal */}
                  <path d="M 25 40 Q 35 30 45 42 Q 35 48 25 40" fill="#FAF5F5" fillOpacity="0.4" />
                  <path d="M 40 80 Q 55 75 62 90 Q 50 95 40 80" fill="#FAF5F5" fillOpacity="0.4" />
                  <path d="M 60 130 Q 75 120 85 135 Q 70 145 60 130" fill="#FAF5F5" fillOpacity="0.4" />
                  <path d="M 80 180 Q 98 175 105 190 Q 92 198 80 180" fill="#FAF5F5" fillOpacity="0.4" />
                  <path d="M 100 225 Q 112 218 118 230 Q 108 238 100 225" fill="#FAF5F5" fillOpacity="0.4" />
                  
                  {/* Vine Stem running down lower diagonal */}
                  <path d="M 115 265 Q 55 380 10 490" />
                  <path d="M 100 295 Q 110 305 102 315 Q 92 305 100 295" fill="#FAF5F5" fillOpacity="0.4" />
                  <path d="M 80 340 Q 95 350 85 365 Q 72 355 80 340" fill="#FAF5F5" fillOpacity="0.4" />
                  <path d="M 55 400 Q 70 410 58 425 Q 45 415 55 400" fill="#FAF5F5" fillOpacity="0.4" />
                  <path d="M 30 450 Q 42 460 32 472 Q 22 462 30 450" fill="#FAF5F5" fillOpacity="0.4" />

                  {/* Delicate Botanical Buds & Flowers */}
                  <circle cx="35" cy="60" r="2.5" fill="#FAF5F5" />
                  <circle cx="70" cy="155" r="2.5" fill="#FAF5F5" />
                  <circle cx="92" cy="320" r="2.5" fill="#FAF5F5" />
                  <circle cx="45" cy="425" r="2.5" fill="#FAF5F5" />
                </g>
              </svg>
            </div>

            {/* RIGHT TRIANGULAR FLAP */}
            <div 
              className="absolute inset-0 bg-gradient-to-l from-[#F6EAEC] via-[#F8EEF0] to-[#F3E2E5]"
              style={{
                clipPath: 'polygon(100% 0%, 50% 52%, 100% 100%)',
                filter: 'drop-shadow(-4px 0 10px rgba(107,29,47,0.06))'
              }}
            >
              {/* Embossed Botanical Vine on Right Flap Border */}
              <svg className="w-full h-full absolute inset-0" viewBox="0 0 240 500" preserveAspectRatio="none">
                <g filter="url(#paper-emboss)" stroke="#FAF5F5" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
                  {/* Vine Stem running down the diagonal */}
                  <path d="M 230 10 Q 190 120 125 255" />
                  {/* Leaves along top-right diagonal */}
                  <path d="M 215 40 Q 205 30 195 42 Q 205 48 215 40" fill="#FAF5F5" fillOpacity="0.4" />
                  <path d="M 200 80 Q 185 75 178 90 Q 190 95 200 80" fill="#FAF5F5" fillOpacity="0.4" />
                  <path d="M 180 130 Q 165 120 155 135 Q 170 145 180 130" fill="#FAF5F5" fillOpacity="0.4" />
                  <path d="M 160 180 Q 142 175 135 190 Q 148 198 160 180" fill="#FAF5F5" fillOpacity="0.4" />
                  <path d="M 140 225 Q 128 218 122 230 Q 132 238 140 225" fill="#FAF5F5" fillOpacity="0.4" />
                  
                  {/* Vine Stem running down lower diagonal */}
                  <path d="M 125 265 Q 185 380 230 490" />
                  <path d="M 140 295 Q 130 305 138 315 Q 148 305 140 295" fill="#FAF5F5" fillOpacity="0.4" />
                  <path d="M 160 340 Q 145 350 155 365 Q 168 355 160 340" fill="#FAF5F5" fillOpacity="0.4" />
                  <path d="M 185 400 Q 170 410 182 425 Q 195 415 185 400" fill="#FAF5F5" fillOpacity="0.4" />
                  <path d="M 210 450 Q 198 460 208 472 Q 218 462 210 450" fill="#FAF5F5" fillOpacity="0.4" />

                  {/* Delicate Botanical Buds & Flowers */}
                  <circle cx="205" cy="60" r="2.5" fill="#FAF5F5" />
                  <circle cx="170" cy="155" r="2.5" fill="#FAF5F5" />
                  <circle cx="148" cy="320" r="2.5" fill="#FAF5F5" />
                  <circle cx="195" cy="425" r="2.5" fill="#FAF5F5" />
                </g>
              </svg>
            </div>

            {/* BOTTOM TRIANGULAR FOLD (Overlaps left and right flaps) */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-[#F4E1E4] via-[#F8EEF0] to-[#FAF2F4]"
              style={{
                clipPath: 'polygon(0% 100%, 50% 50.5%, 100% 100%)',
                filter: 'drop-shadow(0 -4px 8px rgba(107,29,47,0.08))'
              }}
            >
              {/* Embossed bottom seams */}
              <svg className="w-full h-full absolute inset-0" viewBox="0 0 240 500" preserveAspectRatio="none">
                <path d="M 0 500 L 120 252.5 L 240 500" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.8" />
              </svg>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* TOP FLAP (3D Open Flip Animation) */}
          {/* ========================================================= */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[52%] z-30 origin-top transform-style-3d pointer-events-none"
            initial={{ rotateX: 0 }}
            animate={
              animStage === 'flap-open' || animStage === 'card-rising' || animStage === 'opened'
                ? { rotateX: 180 }
                : { rotateX: 0 }
            }
            transition={{
              duration: 0.95,
              ease: [0.34, 1.2, 0.64, 1]
            }}
          >
            {/* FRONT OF TOP FLAP (Visible when closed) */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-[#F9EFF1] via-[#F6EAEC] to-[#F1DEE1] backface-hidden shadow-[0_6px_14px_rgba(88,24,37,0.12)] border-t border-white/80"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
              }}
            >
              {/* Embossed Botanical Vines across Top Flap */}
              <svg className="w-full h-full absolute inset-0" viewBox="0 0 240 260" preserveAspectRatio="none">
                <g filter="url(#paper-emboss)" stroke="#FAF5F5" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
                  {/* Left edge vine */}
                  <path d="M 10 10 Q 55 120 115 250" />
                  <path d="M 28 45 Q 38 35 48 48 Q 38 54 28 45" fill="#FAF5F5" fillOpacity="0.4" />
                  <path d="M 50 95 Q 65 90 72 105 Q 60 110 50 95" fill="#FAF5F5" fillOpacity="0.4" />
                  <path d="M 78 155 Q 92 148 100 162 Q 88 170 78 155" fill="#FAF5F5" fillOpacity="0.4" />
                  
                  {/* Right edge vine */}
                  <path d="M 230 10 Q 185 120 125 250" />
                  <path d="M 212 45 Q 202 35 192 48 Q 202 54 212 45" fill="#FAF5F5" fillOpacity="0.4" />
                  <path d="M 190 95 Q 175 90 168 105 Q 180 110 190 95" fill="#FAF5F5" fillOpacity="0.4" />
                  <path d="M 162 155 Q 148 148 140 162 Q 152 170 162 155" fill="#FAF5F5" fillOpacity="0.4" />
                </g>
              </svg>
            </div>

            {/* BACKSIDE OF TOP FLAP (Revealed when open) */}
            <div 
              className="absolute inset-0 bg-[#E8C5CC] [transform:rotateX(180deg)] backface-hidden shadow-inner"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
              }}
            >
              {/* Inner gold shimmer triangle */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#F5DEB3] via-[#E8CD94]/80 to-transparent" />
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* BURGUNDY WAX SEAL WITH GOLD MONOGRAM & "TAP TO OPEN" */}
          {/* ========================================================= */}
          <AnimatePresence>
            {animStage === 'sealed' && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.3, opacity: 0, rotate: 15 }}
                transition={{ duration: 0.4 }}
                onClick={handleWaxSealClick}
                className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 z-40 cursor-pointer flex flex-col items-center group"
              >
                {/* Pulsing Warm Gold Glow under seal */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#C5A059]/40 via-[#F3B8BF]/50 to-[#C5A059]/40 blur-lg animate-pulse group-hover:scale-125 transition-transform duration-500" />

                {/* The Realistic Burgundy Wax Seal Body */}
                <div 
                  className="relative w-24 h-24 sm:w-26 sm:h-26 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 group-hover:scale-105 active:scale-95"
                  style={{ filter: 'url(#wax-shadow)' }}
                >
                  {/* Organic Melted Wax SVG Perimeter & Relief */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <defs>
                      <radialGradient id="wax-grad" cx="35%" cy="30%" r="65%">
                        <stop offset="0%" stopColor="#8C253B" />
                        <stop offset="45%" stopColor="#5E1424" />
                        <stop offset="85%" stopColor="#3B0A16" />
                        <stop offset="100%" stopColor="#25050D" />
                      </radialGradient>
                      <linearGradient id="gold-monogram" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFE7B3" />
                        <stop offset="50%" stopColor="#E6C275" />
                        <stop offset="100%" stopColor="#B38B38" />
                      </linearGradient>
                    </defs>

                    {/* Outer undulating melted wax blob */}
                    <path
                      d="M 50 5 
                         C 63 4, 76 8, 86 18 
                         C 96 28, 98 42, 95 56 
                         C 92 70, 84 83, 72 90 
                         C 60 97, 44 96, 30 92 
                         C 16 88, 6 78, 4 64 
                         C 2 50, 7 36, 16 24 
                         C 25 12, 37 6, 50 5 Z"
                      fill="url(#wax-grad)"
                    />

                    {/* Wax Ridge Highlight Rim */}
                    <path
                      d="M 50 8 
                         C 61 7, 73 11, 82 20 
                         C 91 29, 93 41, 90 53 
                         C 87 65, 80 77, 69 83 
                         C 58 89, 44 88, 32 85 
                         C 20 82, 11 73, 9 61 
                         C 7 49, 11 37, 19 26 
                         C 27 15, 39 9, 50 8 Z"
                      fill="none"
                      stroke="#A8394E"
                      strokeWidth="1.2"
                      opacity="0.6"
                    />

                    {/* Inner Pressed Circle Face */}
                    <circle cx="50" cy="50" r="32" fill="#4A0E1C" stroke="#25050D" strokeWidth="1.5" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#C5A059" strokeWidth="0.8" strokeDasharray="1.5,1.5" opacity="0.8" />
                    <circle cx="50" cy="50" r="27.5" fill="none" stroke="#8C253B" strokeWidth="0.6" opacity="0.9" />

                    {/* Shiny Specular Highlight at Top-Left */}
                    <ellipse cx="38" cy="24" rx="12" ry="5" fill="#FFFFFF" opacity="0.25" transform="rotate(-30 38 24)" />
                  </svg>

                  {/* Monogram Initials "H & N" in Metallic Gold Cursive */}
                  <div className="relative z-10 text-center select-none pt-0.5">
                    <span 
                      className="font-script text-3xl sm:text-4xl font-normal tracking-wide drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.8)]"
                      style={{
                        background: 'linear-gradient(135deg, #FFF0D0 0%, #F5DEB3 30%, #D4AF37 70%, #997825 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      H &amp; N
                    </span>
                  </div>
                </div>

                {/* Subtle "TAP TO OPEN" Cue below Wax Seal (Matching the Reel) */}
                <div className="mt-8 flex flex-col items-center pointer-events-auto">
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    className="text-[#9E6D78] mb-1"
                  >
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 7L6 2L11 7" />
                    </svg>
                  </motion.div>
                  <p className="font-serif text-[11px] sm:text-xs tracking-[0.35em] text-[#8E5E69] uppercase font-medium">
                    Tap to Open
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ========================================================= */}

        </div>
      </div>
    </section>
  );
};
