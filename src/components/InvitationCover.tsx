import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface InvitationCoverProps {
  onScrollNext: () => void;
}

export const InvitationCover: React.FC<InvitationCoverProps> = ({ onScrollNext }) => {
  return (
    <section
      id="invitation-cover"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between px-3 sm:px-6 py-4 sm:py-6 bg-[#FAF7F2] text-[#581825] overflow-hidden select-none"
    >
      {/* ========================================================================= */}
      {/* WATERCOLOR SCENE BACKGROUND (Matching the user's reference illustration) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Sage & Linen Watercolor Wash Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F3F4EE] via-[#EBEFE5] to-[#E3E8DC] opacity-75" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-[#DDE4D4]/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[#D6DFCC]/60 to-transparent" />

        {/* Full Rich Vector Watercolor Scenery */}
        <svg 
          className="absolute inset-0 w-full h-full object-cover" 
          viewBox="0 0 500 800" 
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Gradients for Birch Wood, Stones, and Watercolor Foliage */}
            <linearGradient id="birchWood" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A88764" />
              <stop offset="30%" stopColor="#CBB599" />
              <stop offset="70%" stopColor="#A4825F" />
              <stop offset="100%" stopColor="#7E6043" />
            </linearGradient>

            <linearGradient id="fountainStone" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5DFE2" />
              <stop offset="50%" stopColor="#E8CCD1" />
              <stop offset="100%" stopColor="#C99DA5" />
            </linearGradient>

            <linearGradient id="groomSuit" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2D2B2E" />
              <stop offset="60%" stopColor="#1C1B1D" />
              <stop offset="100%" stopColor="#0F0E10" />
            </linearGradient>

            <linearGradient id="bridalGown" x1="0%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#F7FAFC" />
              <stop offset="70%" stopColor="#DDE6EE" />
              <stop offset="100%" stopColor="#C5D3E0" />
            </linearGradient>

            <radialGradient id="peacockNeck" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#2BB0D4" />
              <stop offset="50%" stopColor="#0A7299" />
              <stop offset="100%" stopColor="#073B54" />
            </radialGradient>

            <radialGradient id="flowerBlush" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#FADCE2" />
              <stop offset="100%" stopColor="#E8AAB6" />
            </radialGradient>

            <radialGradient id="flowerWhiteLis" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F5F8F0" />
              <stop offset="100%" stopColor="#D4DFCA" />
            </radialGradient>

            <filter id="softBlur" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="1" />
            </filter>
          </defs>

          {/* 1. TOP-LEFT: Flying Birds Silhouette */}
          <g transform="translate(45, 45)" fill="#44413E" opacity="0.6">
            <path d="M 10 10 Q 22 2 34 10 Q 28 17 10 10 Z" />
            <path d="M 20 6 Q 30 -4 40 4 Q 34 11 20 6 Z" />
            <path d="M 60 25 Q 70 18 80 25 Q 75 31 60 25 Z" />
            <path d="M 68 22 Q 76 13 84 19 Q 80 25 68 22 Z" />
            <path d="M 35 40 Q 44 34 52 40 Q 48 45 35 40 Z" />
          </g>

          {/* 2. TOP-RIGHT: Hanging Eucalyptus & Succulent Cluster */}
          <g transform="translate(380, -20)" opacity="0.85">
            {/* Deep Green Leaves */}
            <ellipse cx="60" cy="50" rx="22" ry="14" transform="rotate(-35 60 50)" fill="#688065" />
            <ellipse cx="30" cy="80" rx="26" ry="16" transform="rotate(-15 30 80)" fill="#789474" />
            <ellipse cx="80" cy="90" rx="20" ry="12" transform="rotate(-50 80 90)" fill="#566E53" />
            <ellipse cx="15" cy="120" rx="24" ry="14" transform="rotate(10 15 120)" fill="#8AA885" />
            <ellipse cx="55" cy="140" rx="18" ry="11" transform="rotate(-25 55 140)" fill="#688065" />
            <ellipse cx="-10" cy="90" rx="20" ry="12" transform="rotate(25 -10 90)" fill="#84A181" />
            {/* Hanging sprigs */}
            <path d="M 40 80 Q 20 160 30 210" stroke="#789474" strokeWidth="2" fill="none" />
            <circle cx="28" cy="170" r="8" fill="#8AA885" />
            <circle cx="32" cy="195" r="7" fill="#789474" />
            <circle cx="30" cy="210" r="5" fill="#688065" />
            {/* White blossoms in foliage */}
            <circle cx="45" cy="65" r="10" fill="#FFFFFF" opacity="0.9" />
            <circle cx="45" cy="65" r="6" fill="#FCE5E9" />
            <circle cx="15" cy="100" r="8" fill="#FFFFFF" opacity="0.9" />
            <circle cx="15" cy="100" r="4" fill="#FCE5E9" />
          </g>

          {/* 3. CENTER BACKGROUND: Classical Tier Stone Garden Fountain */}
          <g transform="translate(250, 480)" opacity="0.9">
            {/* Fountain Base Basin */}
            <ellipse cx="0" cy="140" rx="140" ry="32" fill="#E8D1D5" stroke="#C99DA5" strokeWidth="1.5" />
            <ellipse cx="0" cy="136" rx="125" ry="24" fill="#D4BAC0" />
            <ellipse cx="0" cy="134" rx="118" ry="20" fill="#AFC4CD" opacity="0.6" />

            {/* Mid Stem & Bowl */}
            <path d="M -22 135 L -16 60 L 16 60 L 22 135 Z" fill="url(#fountainStone)" />
            <ellipse cx="0" cy="60" rx="55" ry="18" fill="url(#fountainStone)" stroke="#C99DA5" strokeWidth="1.5" />
            <ellipse cx="0" cy="57" rx="46" ry="13" fill="#D4BAC0" />

            {/* Top Stem & Spout */}
            <path d="M -10 58 L -7 15 L 7 15 L 10 58 Z" fill="url(#fountainStone)" />
            <ellipse cx="0" cy="15" rx="24" ry="9" fill="url(#fountainStone)" />
            <ellipse cx="0" cy="0" rx="8" ry="12" fill="url(#fountainStone)" />

            {/* Overflowing Ivy Greenery draping from the fountain */}
            <g fill="#7A9372" opacity="0.85">
              <path d="M -45 62 Q -55 90 -48 120 Q -40 100 -35 65 Z" />
              <path d="M -20 64 Q -25 95 -18 115 Q -10 90 -12 65 Z" />
              <path d="M 15 64 Q 25 100 20 125 Q 12 95 10 65 Z" />
              <path d="M 40 62 Q 52 92 46 118 Q 38 90 35 65 Z" />
              <circle cx="-48" cy="95" r="7" fill="#8CA884" />
              <circle cx="-18" cy="100" r="6" fill="#8CA884" />
              <circle cx="20" cy="105" r="7" fill="#8CA884" />
              <circle cx="48" cy="98" r="6" fill="#8CA884" />
            </g>
          </g>

          {/* 4. WOODEN BIRCH ARBOR / CEREMONY ARCH (Spanning Left to Right) */}
          <g>
            {/* Left Tree Trunk Column */}
            <path 
              d="M 68 800 Q 64 550 68 380 Q 72 240 120 160 Q 155 110 205 90" 
              fill="none" 
              stroke="url(#birchWood)" 
              strokeWidth="16" 
              strokeLinecap="round" 
            />
            {/* Birch Natural Bark Markings Left */}
            <path d="M 62 480 Q 72 482 76 480" stroke="#523E2A" strokeWidth="2.5" fill="none" opacity="0.6" />
            <path d="M 64 350 Q 74 352 78 350" stroke="#523E2A" strokeWidth="2.5" fill="none" opacity="0.6" />
            <path d="M 80 230 Q 90 234 94 230" stroke="#523E2A" strokeWidth="2.5" fill="none" opacity="0.6" />

            {/* Right Tree Trunk Column */}
            <path 
              d="M 432 800 Q 436 550 432 380 Q 428 240 380 160 Q 345 110 295 90" 
              fill="none" 
              stroke="url(#birchWood)" 
              strokeWidth="16" 
              strokeLinecap="round" 
            />
            {/* Birch Natural Bark Markings Right */}
            <path d="M 424 480 Q 434 482 438 480" stroke="#523E2A" strokeWidth="2.5" fill="none" opacity="0.6" />
            <path d="M 422 350 Q 432 352 436 350" stroke="#523E2A" strokeWidth="2.5" fill="none" opacity="0.6" />
            <path d="M 406 230 Q 416 234 420 230" stroke="#523E2A" strokeWidth="2.5" fill="none" opacity="0.6" />

            {/* Branch Extensions */}
            <path d="M 180 105 Q 210 80 235 90" stroke="url(#birchWood)" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 320 105 Q 290 80 265 90" stroke="url(#birchWood)" strokeWidth="8" strokeLinecap="round" fill="none" />

            {/* Lush Floral Arrangement on Left Arch Apex */}
            <g transform="translate(130, 140)">
              {/* Eucalyptus Spray */}
              <path d="M -30 20 Q -70 -10 -40 -60 Q -10 -30 -30 20" fill="#8CA884" opacity="0.75" />
              <path d="M 10 -10 Q 0 -60 40 -80 Q 50 -30 10 -10" fill="#75936F" opacity="0.75" />
              <path d="M -40 50 Q -80 70 -90 40 Q -50 20 -40 50" fill="#9CB895" opacity="0.8" />
              
              {/* White Lisianthus & Blush Peonies */}
              <circle cx="0" cy="0" r="28" fill="url(#flowerWhiteLis)" filter="url(#softBlur)" />
              <circle cx="0" cy="0" r="18" fill="#F4F8EE" />
              <circle cx="0" cy="0" r="8" fill="#93B087" opacity="0.7" />

              <circle cx="-35" cy="-25" r="22" fill="url(#flowerBlush)" filter="url(#softBlur)" />
              <circle cx="-35" cy="-25" r="14" fill="#FAD1D8" />
              
              <circle cx="35" cy="-20" r="20" fill="url(#flowerBlush)" filter="url(#softBlur)" />
              <circle cx="35" cy="-20" r="12" fill="#FAD1D8" />

              <circle cx="-25" cy="30" r="16" fill="url(#flowerWhiteLis)" />
              <circle cx="30" cy="25" r="16" fill="url(#flowerWhiteLis)" />
            </g>

            {/* Lush Floral Arrangement on Right Arch Apex */}
            <g transform="translate(370, 140)">
              {/* Eucalyptus Spray */}
              <path d="M 30 20 Q 70 -10 40 -60 Q 10 -30 30 20" fill="#8CA884" opacity="0.75" />
              <path d="M -10 -10 Q 0 -60 -40 -80 Q -50 -30 -10 -10" fill="#75936F" opacity="0.75" />
              <path d="M 40 50 Q 80 70 90 40 Q 50 20 40 50" fill="#9CB895" opacity="0.8" />
              
              {/* White Lisianthus & Blush Peonies */}
              <circle cx="0" cy="0" r="28" fill="url(#flowerWhiteLis)" filter="url(#softBlur)" />
              <circle cx="0" cy="0" r="18" fill="#F4F8EE" />
              <circle cx="0" cy="0" r="8" fill="#93B087" opacity="0.7" />

              <circle cx="35" cy="-25" r="22" fill="url(#flowerBlush)" filter="url(#softBlur)" />
              <circle cx="35" cy="-25" r="14" fill="#FAD1D8" />
              
              <circle cx="-35" cy="-20" r="20" fill="url(#flowerBlush)" filter="url(#softBlur)" />
              <circle cx="-35" cy="-20" r="12" fill="#FAD1D8" />

              <circle cx="25" cy="30" r="16" fill="url(#flowerWhiteLis)" />
              <circle cx="-30" cy="25" r="16" fill="url(#flowerWhiteLis)" />
            </g>
          </g>

          {/* 5. LOWER-LEFT: Tree Stump Pedestal with Floral Vase & Potted Plants */}
          <g transform="translate(10, 600)">
            {/* Tree Stump */}
            <path d="M 35 150 L 30 80 Q 75 75 120 80 L 115 150 Z" fill="#9B7C5C" />
            <ellipse cx="75" cy="80" rx="45" ry="12" fill="#BA9A78" stroke="#7A5E42" strokeWidth="1" />
            {/* Glass Vase with Flowers */}
            <path d="M 60 78 L 56 45 Q 75 42 94 45 L 90 78 Z" fill="#E6EFF5" stroke="#BFD3E0" strokeWidth="1" opacity="0.85" />
            {/* Pastel Flowers in Vase */}
            <circle cx="75" cy="35" r="20" fill="url(#flowerBlush)" />
            <circle cx="60" cy="25" r="14" fill="url(#flowerWhiteLis)" />
            <circle cx="90" cy="25" r="14" fill="url(#flowerBlush)" />
            <circle cx="75" cy="15" r="12" fill="#FFFFFF" />

            {/* Dark Ceramic Pot on Ground & Green Foliage */}
            <path d="M 10 190 L 15 140 L 65 140 L 70 190 Z" fill="#3D3C3A" />
            <ellipse cx="40" cy="140" rx="25" ry="6" fill="#585654" />
            {/* Potted Eucalyptus Greenery */}
            <path d="M 40 138 Q 20 80 15 50" stroke="#688065" strokeWidth="2.5" fill="none" />
            <ellipse cx="25" cy="90" rx="10" ry="6" transform="rotate(-30 25 90)" fill="#789474" />
            <ellipse cx="18" cy="65" rx="8" ry="5" transform="rotate(-15 18 65)" fill="#8AA885" />
            <path d="M 40 138 Q 60 90 65 60" stroke="#688065" strokeWidth="2.5" fill="none" />
            <ellipse cx="55" cy="95" rx="10" ry="6" transform="rotate(30 55 95)" fill="#789474" />
            {/* Smooth Ground River Stones */}
            <ellipse cx="15" cy="195" rx="14" ry="7" fill="#B0A8A0" />
            <ellipse cx="38" cy="197" rx="12" ry="6" fill="#8E8882" />
          </g>

          {/* 6. LOWER-RIGHT: Tree Stump Pedestal, Big Peony Bouquet & Royal Peacock */}
          <g transform="translate(370, 600)">
            {/* Tree Stump */}
            <path d="M 45 150 L 40 80 Q 80 75 120 80 L 115 150 Z" fill="#9B7C5C" />
            <ellipse cx="80" cy="80" rx="40" ry="11" fill="#BA9A78" stroke="#7A5E42" strokeWidth="1" />
            {/* Large Flower Bouquet on Stump */}
            <circle cx="80" cy="50" r="26" fill="url(#flowerBlush)" />
            <circle cx="60" cy="40" r="18" fill="url(#flowerBlush)" />
            <circle cx="100" cy="40" r="18" fill="#FCE2E6" />
            <circle cx="80" cy="25" r="16" fill="url(#flowerWhiteLis)" />
            <circle cx="80" cy="50" r="12" fill="#FAD1D8" />
            {/* Surrounding Foliage */}
            <path d="M 40 60 Q 20 80 30 110" stroke="#688065" strokeWidth="2" fill="none" />
            <ellipse cx="25" cy="90" rx="12" ry="7" transform="rotate(-40 25 90)" fill="#789474" />

            {/* Majestic Peacock Standing among Shrubbery */}
            <g transform="translate(5, 90)">
              {/* Peacock Body & Fan Plumes */}
              <ellipse cx="35" cy="65" rx="30" ry="20" transform="rotate(25 35 65)" fill="#4A7555" />
              <path d="M 25 70 Q 55 100 70 120" stroke="#C5A059" strokeWidth="2.5" fill="none" />
              <circle cx="60" cy="105" r="6" fill="#0A7299" />
              <circle cx="60" cy="105" r="3" fill="#C5A059" />

              {/* Graceful S-Curved Neck & Head */}
              <path d="M 15 65 C 10 40 0 25 8 10 C 12 5 20 8 18 20 C 16 35 22 45 22 65" fill="url(#peacockNeck)" />
              {/* Head & Beak */}
              <circle cx="10" cy="8" r="6" fill="#0A7299" />
              <polygon points="6,7 0,9 6,11" fill="#D99B52" />
              {/* Feather Crest */}
              <path d="M 12 4 L 14 -4" stroke="#0A7299" strokeWidth="1.5" />
              <path d="M 10 3 L 8 -5" stroke="#0A7299" strokeWidth="1.5" />
              <circle cx="14" cy="-5" r="2" fill="#2BB0D4" />
              <circle cx="8" cy="-6" r="2" fill="#2BB0D4" />
            </g>
          </g>

          {/* 7. CENTER FOREGROUND: Romantic Bride & Groom (Viewed from Behind) */}
          <g transform="translate(200, 605)">
            {/* Groom (Left Side) */}
            <g transform="translate(-18, 0)">
              {/* Groom Hair & Head */}
              <ellipse cx="25" cy="20" rx="10" ry="12" fill="#2B1A15" />
              <ellipse cx="25" cy="28" rx="7" ry="6" fill="#E8C5A8" />
              {/* Suit Jacket & Shoulders */}
              <path 
                d="M 6 32 C 12 30 38 30 44 32 L 48 105 L 14 105 L 2 55 Z" 
                fill="url(#groomSuit)" 
              />
              {/* Groom Left Arm Wrapped Around Bride's Waist */}
              <path 
                d="M 38 42 C 48 44 64 56 68 72 L 60 76 C 56 64 44 52 36 50 Z" 
                fill="url(#groomSuit)" 
              />
              {/* Groom Hand on Bride's Back */}
              <ellipse cx="66" cy="74" rx="4" ry="5" fill="#E8C5A8" />
              {/* Groom Trousers */}
              <path d="M 14 105 L 28 105 L 26 195 L 12 195 Z" fill="#1C1B1D" />
              <path d="M 32 105 L 46 105 L 48 195 L 34 195 Z" fill="#1C1B1D" />
            </g>

            {/* Bride (Right Side) */}
            <g transform="translate(32, 5)">
              {/* Bride Elegant Hair Updo & Pearl Pins */}
              <ellipse cx="22" cy="18" rx="9" ry="11" fill="#241611" />
              <circle cx="22" cy="14" r="7" fill="#3D251D" />
              {/* Hair Pearls */}
              <circle cx="20" cy="16" r="1.5" fill="#FFFFFF" />
              <circle cx="24" cy="18" r="1.5" fill="#FFFFFF" />
              <circle cx="22" cy="21" r="1.5" fill="#FFFFFF" />
              {/* Delicate Neck & Open Back */}
              <path d="M 15 28 C 17 38 27 38 29 28 Z" fill="#F3D5C0" />
              <path d="M 14 36 C 18 55 26 55 30 36 Z" fill="#F3D5C0" />
              {/* Lace Straps & Back Bodice */}
              <path d="M 11 32 L 15 48 L 13 54 L 8 36 Z" fill="#FFFFFF" opacity="0.9" />
              <path d="M 33 32 L 29 48 L 31 54 L 36 36 Z" fill="#FFFFFF" opacity="0.9" />
              {/* Sweeping Powder-Blue & White Bridal Gown with Train */}
              <path 
                d="M 12 52 C 16 50 28 50 32 52 C 40 85 58 135 75 190 C 45 195 -5 195 -25 190 C -5 135 6 85 12 52 Z" 
                fill="url(#bridalGown)" 
                stroke="#C5D5E4" 
                strokeWidth="1"
              />
              {/* Flowing Gown Folds & Highlights */}
              <path d="M 16 65 Q 12 125 5 190" stroke="#BACEDF" strokeWidth="1.5" fill="none" opacity="0.7" />
              <path d="M 28 65 Q 35 125 48 190" stroke="#BACEDF" strokeWidth="1.5" fill="none" opacity="0.7" />
              <path d="M 22 75 Q 24 135 26 192" stroke="#BACEDF" strokeWidth="1" fill="none" opacity="0.5" />
            </g>
          </g>
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* INSET GOLD FRAME & INVITATION CALLIGRAPHY OVERLAY */}
      {/* ========================================================================= */}
      <div className="relative w-full max-w-[420px] mx-auto flex-1 flex flex-col items-center justify-between p-5 sm:p-7 rounded-t-[190px] rounded-b-3xl border border-[#E8CCD1]/80 bg-[#FFFDF9]/85 backdrop-blur-[3px] shadow-[0_20px_50px_rgba(88,24,37,0.12)] my-auto z-10">
        
        {/* Double Inset Gold Borders */}
        <div className="absolute inset-2.5 rounded-t-[180px] rounded-b-[20px] border border-[#C5A059]/60 pointer-events-none" />
        <div className="absolute inset-3.5 rounded-t-[172px] rounded-b-[16px] border border-dotted border-[#C5A059]/45 pointer-events-none" />

        {/* TOP: Islamic Calligraphy & Monogram Crest with "H & N" */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mt-1 z-10"
        >
          <span className="font-arabic text-sm sm:text-base text-[#C5A059] tracking-wider mb-2 drop-shadow-sm">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </span>

          <div className="w-13 h-13 rounded-full border border-[#C5A059] bg-[#FAF0F2]/90 flex items-center justify-center shadow-md p-1">
            <div className="w-full h-full rounded-full border border-dashed border-[#C5A059]/70 flex items-center justify-center">
              <span className="font-serif italic font-semibold text-sm text-[#581825] tracking-wider">
                H &amp; N
              </span>
            </div>
          </div>
        </motion.div>

        {/* CENTER: Main Invitation Text */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-col items-center text-center my-2 sm:my-3 z-10 w-full"
        >
          {/* Cursive Script for "Nikkah" */}
          <p className="font-script text-4xl sm:text-5xl text-[#C5A059] tracking-wide drop-shadow-sm">
            Nikkah
          </p>

          {/* Date: 21.09.2026 with gold flourish dividers */}
          <div className="flex items-center gap-3 my-2 justify-center w-full">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#C5A059]" />
            <p className="font-serif text-sm sm:text-base tracking-[0.25em] text-[#581825] font-semibold">
              21 . 09 . 2026
            </p>
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#C5A059]" />
          </div>

          {/* Elegant Typography for Hannah & Nesban */}
          <div className="mt-1 space-y-0.5">
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#581825] tracking-tight leading-none">
              Hannah
            </h1>
            <p className="font-cursive text-2xl sm:text-3xl text-[#C5A059] my-0.5">&amp;</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#581825] tracking-tight leading-none">
              Nesban
            </h1>
          </div>

          <p className="font-serif italic text-xs sm:text-sm text-[#6B1D2F]/80 mt-3 max-w-[280px]">
            request the honour of your presence to celebrate their wedding ceremony
          </p>
        </motion.div>

        {/* BOTTOM: Animated Bouncing "Scroll down" Indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          onClick={onScrollNext}
          className="flex flex-col items-center cursor-pointer pt-2 group z-20 select-none"
        >
          <span className="font-script text-xl sm:text-2xl text-[#C5A059] group-hover:text-[#581825] transition-colors">
            Scroll down
          </span>
          <ChevronDown className="w-4 h-4 text-[#C5A059] -mt-1 group-hover:text-[#581825] transition-colors animate-pulse" />
        </motion.div>

      </div>
    </section>
  );
};
