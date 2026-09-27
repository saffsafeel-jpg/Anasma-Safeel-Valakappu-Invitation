import React, { useState } from 'react';
import { Heart, Sparkles, Image as ImageIcon } from 'lucide-react';
import { PhotoVisualType } from '../types';

interface CouplePhotoVisualProps {
  customUrl?: string | null;
  visualType: PhotoVisualType;
  alt: string;
  className?: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

export const CouplePhotoVisual: React.FC<CouplePhotoVisualProps> = ({
  customUrl,
  visualType,
  alt,
  className = '',
  aspectRatio = 'portrait',
}) => {
  const [imageError, setImageError] = useState(false);

  // If user provided a custom photo that didn't error out, display it
  if (customUrl && !imageError) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#0A101C] ${className}`}>
        <img
          src={customUrl}
          alt={alt}
          decoding="async"
          loading="eager"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
        />
        {/* Soft vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1325]/80 via-transparent to-black/20 pointer-events-none" />
      </div>
    );
  }

  // Cover Portrait: Majestic Night Silhouette & Royal Maternity
  if (visualType === 'couple_cover') {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-gradient-to-b from-[#060D1A] via-[#09152B] to-[#040810] flex items-center justify-center ${className}`}>
        {/* Starry Night Sky Ambient Backing */}
        <div className="absolute inset-0 bg-[radial-gradient(#FAF8F5_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#D4AF37]/25 rounded-full blur-[75px] pointer-events-none" />
        <div className="absolute bottom-4 inset-x-0 h-32 bg-gradient-to-t from-[#0B1325] to-transparent pointer-events-none" />

        {/* Full vector artwork of Anasma & Safeel on the cover */}
        <svg
          viewBox="0 0 380 460"
          className="relative z-10 w-full h-full max-h-[460px] drop-shadow-[0_12px_32px_rgba(0,0,0,0.9)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="coverGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF4BD" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#9C7210" />
            </linearGradient>
            <radialGradient id="coverHalo" cx="50%" cy="42%" r="50%">
              <stop offset="0%" stopColor="#FFDE82" stopOpacity="0.4" />
              <stop offset="55%" stopColor="#D4AF37" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#0B1325" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="coverHusband" x1="0.2" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#FFFDF7" />
              <stop offset="60%" stopColor="#F5EEDB" />
              <stop offset="100%" stopColor="#DFCDB0" />
            </linearGradient>
            <linearGradient id="coverEmeraldSaree" x1="0" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#1E5443" />
              <stop offset="45%" stopColor="#113F30" />
              <stop offset="100%" stopColor="#082218" />
            </linearGradient>
          </defs>

          {/* Golden Celestial Arch & Moon Rim */}
          <circle cx="190" cy="180" r="150" fill="url(#coverHalo)" />
          <path d="M60,340 C60,190 120,60 190,60 C260,60 320,190 320,340" stroke="url(#coverGold)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.65" />

          {/* Marigold and Jasmine garlands hanging at top */}
          <g opacity="0.85">
            <circle cx="50" cy="40" r="6" fill="#FFA500" />
            <circle cx="64" cy="46" r="5" fill="#FFD700" />
            <circle cx="78" cy="54" r="5" fill="#FFFFFF" />
            <circle cx="92" cy="62" r="6" fill="#FFA500" />
            <circle cx="330" cy="40" r="6" fill="#FFA500" />
            <circle cx="316" cy="46" r="5" fill="#FFD700" />
            <circle cx="302" cy="54" r="5" fill="#FFFFFF" />
            <circle cx="288" cy="62" r="6" fill="#FFA500" />
          </g>

          {/* HUSBAND (SAFEEL) */}
          <path d="M124,115 C124,82 144,68 170,68 C194,68 210,82 210,110 C210,122 204,132 198,140 C188,150 182,158 178,170 C166,166 154,160 144,146 C130,138 124,126 124,115 Z" fill="#1C1816" />
          <path d="M138,108 C138,90 152,80 170,80 C184,80 196,90 196,108 C196,128 184,144 167,148 C152,148 140,132 138,108 Z" fill="#D29A74" />
          <path d="M170,120 Q176,126 184,122" stroke="#7A492E" strokeWidth="2" strokeLinecap="round" />
          <circle cx="176" cy="106" r="2.5" fill="#24140D" />
          {/* Kurta & Embracing Arm */}
          <path d="M144,154 C122,170 94,196 84,244 C74,290 70,345 66,450 L196,450 C196,375 192,305 194,250 C196,204 184,170 168,154 Z" fill="url(#coverHusband)" />
          <path d="M168,154 L168,265" stroke="url(#coverGold)" strokeWidth="3" strokeLinecap="round" />
          <path d="M128,200 C144,230 168,270 198,295 C224,316 254,326 274,338 C268,350 244,352 218,338 C188,320 158,280 135,232 Z" fill="url(#coverHusband)" />
          <path d="M264,332 C272,328 288,336 290,346 C292,354 282,360 272,360 C260,360 254,350 258,340 Z" fill="#D29A74" />

          {/* WIFE (ANASMA) */}
          <path d="M268,100 Q294,115 288,150" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeDasharray="3 7" />
          <path d="M218,120 C218,92 234,76 256,76 C278,76 292,92 292,120 C292,140 282,154 270,162 C260,170 250,174 244,184 C236,176 228,164 224,148 C218,138 218,128 218,120 Z" fill="#181310" />
          <path d="M230,114 C230,98 244,88 260,88 C274,88 284,98 284,114 C284,134 274,150 258,152 C244,152 232,136 230,114 Z" fill="#E8B595" />
          <circle cx="250" cy="102" r="2.2" fill="#C41E3A" />
          <path d="M248,112 Q254,109 260,113" stroke="#2B1408" strokeWidth="2" strokeLinecap="round" />
          <path d="M250,128 Q258,134 266,128" stroke="#9E4738" strokeWidth="2.2" strokeLinecap="round" />
          {/* Gold Jhumka */}
          <path d="M238,132 L236,140 Q241,146 246,140 Z" fill="url(#coverGold)" />
          {/* Gold Necklace */}
          <path d="M244,160 Q256,176 270,162" stroke="url(#coverGold)" strokeWidth="3.5" fill="none" strokeLinecap="round" />

          {/* Saree & Baby Bump */}
          <path d="M244,172 C262,185 294,210 306,250 C318,290 318,345 320,450 L208,450 C204,405 202,365 206,315 C210,260 216,218 226,184 Z" fill="url(#coverEmeraldSaree)" />
          <path d="M228,188 Q264,254 248,334" stroke="url(#coverGold)" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <path d="M216,280 C240,284 278,300 292,340 C304,375 290,415 256,435" fill="none" stroke="url(#coverGold)" strokeWidth="3" strokeLinecap="round" />

          {/* Bangles on Wrist */}
          <g filter="drop-shadow(0 0 4px #FFD700)">
            <ellipse cx="270" cy="365" rx="3.5" ry="6.5" fill="none" stroke="#D4AF37" strokeWidth="1.8" />
            <ellipse cx="274" cy="367" rx="3.5" ry="6.5" fill="none" stroke="#00B074" strokeWidth="1.6" />
            <ellipse cx="278" cy="369" rx="3.5" ry="6.5" fill="none" stroke="#D4AF37" strokeWidth="1.8" />
            <ellipse cx="282" cy="371" rx="3.5" ry="6.5" fill="none" stroke="#E63946" strokeWidth="1.6" />
            <ellipse cx="286" cy="373" rx="3.5" ry="6.5" fill="none" stroke="#D4AF37" strokeWidth="2" />
          </g>
        </svg>

        {/* Ambient bottom label */}
        <div className="absolute bottom-3 inset-x-0 flex items-center justify-center">
          <span className="font-cinzel text-[10px] text-[#FAF8F5]/90 tracking-[0.2em] uppercase font-semibold bg-[#070D18]/85 px-3.5 py-1 rounded-full border border-[#D4AF37]/35 shadow-lg backdrop-blur-md">
            Safeel &amp; Anasma · Expecting With Love
          </span>
        </div>
      </div>
    );
  }

  // Otherwise, render stylized high-fidelity visual matching the photoshoot in the screenshots
  if (visualType === 'couple_hero') {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-gradient-to-b from-[#0E1A33] via-[#0A1224] to-[#060B14] flex items-center justify-center ${className}`}>
        {/* Ambient festive lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#D4AF37]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-48 h-48 bg-[#0D6E50]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Detailed SVG Illustration of South Indian Maternity Couple */}
        <svg
          viewBox="0 0 380 460"
          className="relative z-10 w-full h-full max-h-[460px] drop-shadow-[0_12px_30px_rgba(0,0,0,0.85)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gold gradients */}
            <linearGradient id="heroGoldZari" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF3B0" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#996E0F" />
            </linearGradient>

            <linearGradient id="sareeEmerald" x1="0" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#1B4D3E" />
              <stop offset="45%" stopColor="#0F382A" />
              <stop offset="100%" stopColor="#082218" />
            </linearGradient>

            <linearGradient id="kurtaCream" x1="0.2" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#FFFDF7" />
              <stop offset="60%" stopColor="#F5EEDB" />
              <stop offset="100%" stopColor="#E2D6BC" />
            </linearGradient>

            <linearGradient id="skinToneHusband" x1="0.3" y1="0" x2="0.7" y2="1">
              <stop offset="0%" stopColor="#D29A74" />
              <stop offset="100%" stopColor="#A86E4B" />
            </linearGradient>

            <linearGradient id="skinToneWife" x1="0.3" y1="0" x2="0.7" y2="1">
              <stop offset="0%" stopColor="#E8B595" />
              <stop offset="100%" stopColor="#BE825C" />
            </linearGradient>

            <radialGradient id="haloSun" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#FFDE82" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#0B1325" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Golden Warm Halo Backdrop */}
          <circle cx="190" cy="180" r="160" fill="url(#haloSun)" />

          {/* Marigold and Jasmine floral garland strands at top corners */}
          <g opacity="0.6">
            <circle cx="40" cy="30" r="6" fill="#FFA500" />
            <circle cx="54" cy="35" r="5" fill="#FFD700" />
            <circle cx="68" cy="42" r="5" fill="#FFFFFF" />
            <circle cx="82" cy="50" r="6" fill="#FFA500" />
            <circle cx="340" cy="30" r="6" fill="#FFA500" />
            <circle cx="326" cy="35" r="5" fill="#FFD700" />
            <circle cx="312" cy="42" r="5" fill="#FFFFFF" />
            <circle cx="298" cy="50" r="6" fill="#FFA500" />
          </g>

          {/* ================= HUSBAND (SAFEEL) ================= */}
          {/* Hair & Face */}
          <path d="M120,110 C120,78 142,65 168,65 C192,65 208,78 208,105 C208,118 202,128 196,135 C186,145 180,154 176,166 C165,162 152,156 142,142 C128,135 120,122 120,110 Z" fill="#1C1816" />
          {/* Face Profile / Smile */}
          <path d="M136,105 C136,88 150,78 168,78 C182,78 194,88 194,105 C194,125 182,142 165,145 C150,145 138,130 136,105 Z" fill="url(#skinToneHusband)" />
          {/* Gentle Smile & Eye */}
          <path d="M168,118 Q174,124 182,120" stroke="#7A492E" strokeWidth="2" strokeLinecap="round" />
          <circle cx="174" cy="104" r="2.5" fill="#24140D" />
          {/* Kurta Collar & Cream Silk Body */}
          <path d="M142,150 C120,165 92,192 82,240 C72,285 68,340 65,450 L195,450 C195,370 190,300 192,245 C194,200 182,165 166,150 Z" fill="url(#kurtaCream)" />
          {/* Embroidered Kurta Placket with Gold Zari Buttons */}
          <path d="M166,150 L166,260" stroke="url(#heroGoldZari)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="166" cy="170" r="2.5" fill="#D4AF37" />
          <circle cx="166" cy="195" r="2.5" fill="#D4AF37" />
          <circle cx="166" cy="220" r="2.5" fill="#D4AF37" />
          <circle cx="166" cy="245" r="2.5" fill="#D4AF37" />

          {/* Husband's Loving Arm & Hand Embracing Wife & Bump */}
          <path d="M125,195 C140,225 165,265 195,290 C220,310 250,320 270,332 C265,344 240,346 215,332 C185,315 155,275 132,228 Z" fill="url(#kurtaCream)" />
          {/* Husband's Hand Gently Cradling Wife's Belly */}
          <path d="M260,326 C268,322 284,330 286,340 C288,348 278,354 268,354 C256,354 250,344 254,334 Z" fill="url(#skinToneHusband)" />

          {/* ================= WIFE (ANASMA) ================= */}
          {/* Traditional Jasmine Gajra Garland in Hair */}
          <path d="M265,95 Q290,110 285,145" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeDasharray="3 7" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
          <path d="M268,98 Q292,112 287,147" stroke="#FFF7C2" strokeWidth="4" strokeLinecap="round" strokeDasharray="4 8" />

          {/* Wife Hair Bun & Profile */}
          <path d="M216,115 C216,88 232,72 254,72 C276,72 290,88 290,115 C290,135 280,150 268,158 C258,165 248,170 242,180 C234,172 226,160 222,144 C216,134 216,124 216,115 Z" fill="#181310" />
          {/* Wife Face & Radiant Expression */}
          <path d="M228,110 C228,94 242,84 258,84 C272,84 282,94 282,110 C282,130 272,146 256,148 C242,148 230,132 228,110 Z" fill="url(#skinToneWife)" />
          {/* Elegant eye with kohl & sweet smile */}
          <path d="M246,108 Q252,105 258,109" stroke="#2B1408" strokeWidth="2" strokeLinecap="round" />
          <path d="M248,124 Q256,130 264,124" stroke="#9E4738" strokeWidth="2.2" strokeLinecap="round" />
          {/* Red Bindi / Pottu on Forehead */}
          <circle cx="248" cy="98" r="2.2" fill="#C41E3A" />
          {/* Gold Jhumka Earring */}
          <path d="M236,128 L234,136 Q239,142 244,136 Z" fill="url(#heroGoldZari)" stroke="#AA7C11" strokeWidth="0.8" />

          {/* Elegant Gold Necklace / Maala */}
          <path d="M242,156 Q254,172 268,158" stroke="url(#heroGoldZari)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <circle cx="255" cy="166" r="3" fill="#D4AF37" />

          {/* Saree Blouse & Pallu (Emerald Green & Gold Silk) */}
          <path d="M242,168 C260,180 290,205 302,245 C314,285 315,340 318,450 L205,450 C200,400 198,360 202,310 C206,255 212,215 222,180 Z" fill="url(#sareeEmerald)" />

          {/* Rich Gold Zari Saree Borders & Motifs */}
          <path d="M224,185 Q260,250 245,330" stroke="url(#heroGoldZari)" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M205,440 L320,440" stroke="url(#heroGoldZari)" strokeWidth="12" fill="none" />
          <path d="M205,444 L320,444" stroke="#FFF3B0" strokeWidth="2" fill="none" />

          {/* ================= THE BABY BUMP (VALAKAPPU EMBRACE) ================= */}
          <path
            d="M212,275 C235,278 274,295 288,335 C300,370 286,410 252,430"
            fill="none"
            stroke="url(#heroGoldZari)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Saree drape highlight over the bump */}
          <path
            d="M218,282 C242,286 275,304 286,338 C294,368 280,402 254,424 Z"
            fill="#124032"
            opacity="0.85"
          />

          {/* Gold Ottiyanam / Waist Belt with Charms over Bump */}
          <path d="M230,380 Q265,395 285,365" stroke="url(#heroGoldZari)" strokeWidth="2.5" fill="none" />
          <circle cx="258" cy="389" r="3" fill="#D4AF37" />

          {/* Mother's Hand & Wrist with Traditional Valakappu Bangles */}
          <path d="M248,348 C256,346 270,356 270,366 C270,374 258,378 248,376 C238,372 236,360 242,352 Z" fill="url(#skinToneWife)" />

          {/* Stack of Gold & Emerald Green Glass Bangles (Valayal) */}
          <g filter="drop-shadow(0 0 4px #FFD700)">
            <ellipse cx="265" cy="360" rx="3.5" ry="6" fill="none" stroke="#D4AF37" strokeWidth="1.8" />
            <ellipse cx="269" cy="362" rx="3.5" ry="6" fill="none" stroke="#00B074" strokeWidth="1.6" />
            <ellipse cx="273" cy="364" rx="3.5" ry="6" fill="none" stroke="#D4AF37" strokeWidth="1.8" />
            <ellipse cx="277" cy="366" rx="3.5" ry="6" fill="none" stroke="#E63946" strokeWidth="1.6" />
            <ellipse cx="281" cy="368" rx="3.5" ry="6" fill="none" stroke="#D4AF37" strokeWidth="2" />
          </g>

          {/* Bottom gentle vignette */}
          <rect x="0" y="430" width="380" height="30" fill="url(#kurtaCream)" opacity="0.1" />
        </svg>

        {/* Ambient Bottom Tag */}
        <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 px-4 pointer-events-none">
          <span className="font-cinzel text-[10px] text-[#FAF8F5]/85 tracking-[0.2em] uppercase font-semibold bg-[#070D18]/80 px-3 py-1 rounded-full border border-[#D4AF37]/30 backdrop-blur-md">
            Safeel &amp; Anasma · Expecting With Love
          </span>
        </div>
      </div>
    );
  }

  if (visualType === 'bangles_ritual') {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-gradient-to-b from-[#131D33] via-[#0E1626] to-[#0A101C] flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:18px_18px] opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-[#D4AF37]/20 rounded-full blur-2xl" />

        {/* SVG of Sacred Bangle Ceremony & Bump */}
        <svg
          viewBox="0 0 340 240"
          className="relative z-10 w-full h-full max-h-[240px] drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bangleGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF8DC" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#9E7611" />
            </linearGradient>
            <linearGradient id="bumpSaree" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E4D3E" />
              <stop offset="100%" stopColor="#0D2B22" />
            </linearGradient>
          </defs>

          {/* Baby Bump Arch */}
          <path d="M90,210 C105,140 160,100 220,115 C270,128 300,175 310,230 L70,230 Z" fill="url(#bumpSaree)" />
          <path d="M110,195 C130,135 180,105 230,120 C270,132 295,170 300,215" stroke="url(#bangleGold)" strokeWidth="3" fill="none" strokeDasharray="6 4" />

          {/* Gentle floral garland across baby bump */}
          <g opacity="0.85">
            <circle cx="120" cy="180" r="5" fill="#FFFFFF" />
            <circle cx="132" cy="165" r="5.5" fill="#FFC107" />
            <circle cx="146" cy="152" r="5" fill="#FFFFFF" />
            <circle cx="162" cy="142" r="6" fill="#FF9800" />
            <circle cx="180" cy="136" r="5.5" fill="#FFFFFF" />
            <circle cx="198" cy="138" r="6" fill="#FFC107" />
            <circle cx="216" cy="145" r="5" fill="#FFFFFF" />
            <circle cx="234" cy="156" r="5.5" fill="#FF9800" />
          </g>

          {/* Mother & Father Hands Joined Over Belly with Henna (Mehndi) */}
          <path d="M140,165 C155,160 185,170 195,182 C190,192 170,192 150,185 Z" fill="#D29A74" stroke="#7A492E" strokeWidth="1" />
          <path d="M175,170 C190,162 220,172 230,184 C225,195 200,196 185,188 Z" fill="#E8B595" stroke="#9E4738" strokeWidth="1" />

          {/* Multiple Stacks of Auspicious Valakappu Bangles */}
          <g filter="drop-shadow(0 0 5px #FFD700)">
            {/* Left stack */}
            <ellipse cx="130" cy="174" rx="4" ry="12" stroke="#D4AF37" strokeWidth="2.2" fill="none" />
            <ellipse cx="135" cy="172" rx="4" ry="12" stroke="#00A86B" strokeWidth="2" fill="none" />
            <ellipse cx="140" cy="170" rx="4" ry="12" stroke="#E63946" strokeWidth="2" fill="none" />
            <ellipse cx="145" cy="168" rx="4" ry="12" stroke="#D4AF37" strokeWidth="2.4" fill="none" />
            {/* Right stack */}
            <ellipse cx="230" cy="176" rx="4" ry="12" stroke="#D4AF37" strokeWidth="2.2" fill="none" />
            <ellipse cx="235" cy="178" rx="4" ry="12" stroke="#00A86B" strokeWidth="2" fill="none" />
            <ellipse cx="240" cy="180" rx="4" ry="12" stroke="#E63946" strokeWidth="2" fill="none" />
            <ellipse cx="245" cy="182" rx="4" ry="12" stroke="#D4AF37" strokeWidth="2.4" fill="none" />
          </g>

          {/* Floating blessing sparkles */}
          <circle cx="100" cy="90" r="1.5" fill="#FFF3B0" />
          <circle cx="240" cy="85" r="2" fill="#D4AF37" />
          <circle cx="180" cy="70" r="2.5" fill="#FFF8DC" />
        </svg>

        <div className="absolute bottom-2.5 inset-x-0 text-center">
          <span className="font-montserrat text-[10px] text-[#FAF8F5]/85 tracking-widest uppercase font-medium">
            Auspicious Bangles &amp; Maternal Blessings
          </span>
        </div>
      </div>
    );
  }

  if (visualType === 'felicitation') {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-gradient-to-b from-[#18233C] via-[#0E1729] to-[#080E1A] flex items-center justify-center ${className}`}>
        {/* Ambient glow and golden bokeh particles */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-2xl" />
        <svg viewBox="0 0 340 240" className="relative z-10 w-full h-full max-h-[240px]" fill="none">
          <defs>
            <radialGradient id="felicitationGlow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#FFF3B0" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0B1325" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="170" cy="120" r="100" fill="url(#felicitationGlow)" />
          {/* Couple Portrait Smiles Close-Up */}
          <path d="M125,75 C125,58 138,48 152,48 C166,48 175,58 175,75 C175,90 166,104 150,106 C136,106 125,92 125,75 Z" fill="#D29A74" />
          <path d="M115,105 C115,80 132,60 152,60 C172,60 180,80 180,105 Z" fill="#1C1816" />
          <path d="M148,84 Q154,90 162,86" stroke="#7A492E" strokeWidth="2" strokeLinecap="round" />
          <path d="M120,110 C100,125 80,150 75,190 L185,190 C185,150 170,125 150,110 Z" fill="#F5EEDB" />

          {/* Wife */}
          <path d="M185,80 C185,62 198,52 212,52 C226,52 235,62 235,80 C235,95 226,108 210,110 C196,110 185,96 185,80 Z" fill="#E8B595" />
          <path d="M175,110 C175,85 192,65 212,65 C232,65 240,85 240,110 Z" fill="#181310" />
          <circle cx="206" cy="72" r="2" fill="#C41E3A" />
          <path d="M204,90 Q212,96 220,90" stroke="#9E4738" strokeWidth="2" strokeLinecap="round" />
          <path d="M175,115 C190,130 215,150 225,190 L150,190 C160,150 170,130 175,115 Z" fill="#154234" />

          {/* Shower of blessing flower petals & gold sparkles */}
          {[
            { cx: 80, cy: 50, r: 4, f: '#FFD700' },
            { cx: 110, cy: 35, r: 3.5, f: '#FF69B4' },
            { cx: 230, cy: 35, r: 4.5, f: '#FFF8DC' },
            { cx: 260, cy: 55, r: 3.5, f: '#FFA500' },
            { cx: 65, cy: 90, r: 3, f: '#FFD700' },
            { cx: 275, cy: 95, r: 4, f: '#FF69B4' },
            { cx: 95, cy: 130, r: 3.5, f: '#FFF3B0' },
            { cx: 245, cy: 135, r: 4, f: '#FFA500' },
          ].map((dot, i) => (
            <circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} fill={dot.f} opacity="0.8" />
          ))}
        </svg>
        <div className="absolute bottom-2.5 inset-x-0 text-center">
          <span className="font-montserrat text-[10px] text-[#FAF8F5]/85 tracking-widest uppercase font-medium">
            Joy &amp; Felicitations · Showered With Love
          </span>
        </div>
      </div>
    );
  }

  if (visualType === 'venue') {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-gradient-to-b from-[#0A1628] via-[#0E1F38] to-[#060D1A] flex items-center justify-center ${className}`}>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#D4AF37]/15 rounded-full blur-2xl" />
        <svg viewBox="0 0 340 240" className="relative z-10 w-full h-full max-h-[240px]" fill="none">
          <defs>
            <linearGradient id="venueMoon" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF8DC" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
          </defs>
          <circle cx="250" cy="60" r="30" fill="url(#venueMoon)" opacity="0.3" filter="blur(6px)" />
          {/* Resort Architecture & Coconut Palms */}
          <path d="M40,240 Q48,160 30,90" stroke="#060B14" strokeWidth="4" />
          <path d="M30,90 Q10,75 0,90 M30,90 Q20,65 5,75 M30,90 Q40,60 50,75 M30,90 Q50,75 60,95" stroke="#060B14" strokeWidth="2.5" />
          <path d="M300,240 Q290,165 310,100" stroke="#060B14" strokeWidth="4" />
          <path d="M310,100 Q285,85 275,100 M310,100 Q300,75 285,85 M310,100 Q325,70 335,85 M310,100 Q330,85 340,105" stroke="#060B14" strokeWidth="2.5" />
          {/* Traditional Kerala Tiled Resort Roof */}
          <polygon points="90,160 170,120 250,160" fill="#2C1B14" stroke="#D4AF37" strokeWidth="1" />
          <rect x="110" y="160" width="120" height="60" fill="#141E33" />
          {/* Lit Windows & Pillars */}
          <rect x="125" y="170" width="20" height="30" rx="3" fill="#FFDE82" opacity="0.85" />
          <rect x="160" y="170" width="20" height="30" rx="3" fill="#FFDE82" opacity="0.85" />
          <rect x="195" y="170" width="20" height="30" rx="3" fill="#FFDE82" opacity="0.85" />
          {/* Warm Garden Pathway Lights */}
          <circle cx="80" cy="210" r="3.5" fill="#FFDE82" />
          <circle cx="260" cy="210" r="3.5" fill="#FFDE82" />
        </svg>
        <div className="absolute bottom-2.5 inset-x-0 text-center">
          <span className="font-montserrat text-[10px] text-[#FAF8F5]/85 tracking-widest uppercase font-medium">
            Udaya Resort · Palakkad, Kerala
          </span>
        </div>
      </div>
    );
  }

  // dusk_embrace
  return (
    <div className={`relative w-full h-full overflow-hidden bg-gradient-to-b from-[#1C182B] via-[#121B2F] to-[#0A101C] flex items-center justify-center ${className}`}>
      {/* Sunset warm glow */}
      <div className="absolute bottom-6 w-56 h-36 bg-gradient-to-t from-[#FF7E40]/40 via-[#D4AF37]/35 to-transparent rounded-full blur-2xl" />

      {/* Couple Silhouette facing each other outdoors */}
      <svg
        viewBox="0 0 340 240"
        className="relative z-10 w-full h-full max-h-[240px] drop-shadow-[0_8px_25px_rgba(0,0,0,0.85)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="duskCoupleGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF3B0" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#FFA07A" />
          </linearGradient>
          <linearGradient id="duskCoupleBody" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#141E33" />
            <stop offset="100%" stopColor="#070C16" />
          </linearGradient>
        </defs>

        {/* Setting Sun Orb */}
        <circle cx="170" cy="150" r="60" fill="#FFA07A" fillOpacity="0.25" filter="blur(12px)" />

        {/* Resort Palm Tree Silhouette in background */}
        <path d="M40,240 Q45,170 30,130" stroke="#0B1325" strokeWidth="3" />
        <path d="M30,130 Q10,120 5,130 M30,130 Q18,110 8,118 M30,130 Q35,105 45,115 M30,130 Q45,118 55,128" stroke="#0B1325" strokeWidth="2" />

        {/* Husband (Left) */}
        <path d="M120,70 C120,55 130,45 142,45 C155,45 162,55 162,70 C162,82 155,92 148,98 C140,105 132,112 130,122 C122,120 118,112 116,102 Z" fill="url(#duskCoupleBody)" stroke="url(#duskCoupleGold)" strokeWidth="1" />
        <path d="M130,120 C110,132 85,152 75,188 C70,215 68,245 65,255 L175,255 C175,215 170,182 172,150 C172,130 160,118 142,110 Z" fill="url(#duskCoupleBody)" stroke="url(#duskCoupleGold)" strokeWidth="0.8" />
        {/* Husband hand embracing wife's bump */}
        <path d="M120,150 C140,170 165,182 190,188 C185,195 165,195 145,182 Z" fill="url(#duskCoupleBody)" stroke="url(#duskCoupleGold)" strokeWidth="1" />

        {/* Wife (Right) with visible baby bump */}
        <path d="M205,75 C205,60 215,50 228,50 C240,50 248,60 248,75 C248,88 242,98 235,104 C230,110 225,115 222,125 C215,122 212,114 210,102 Z" fill="url(#duskCoupleBody)" stroke="url(#duskCoupleGold)" strokeWidth="1" />
        <path d="M222,122 C234,132 255,148 262,178 C270,208 272,240 275,255 L175,255 C170,225 172,200 175,178 C178,152 185,132 202,118 Z" fill="url(#duskCoupleBody)" stroke="url(#duskCoupleGold)" strokeWidth="0.8" />

        {/* Baby Bump Golden Contour */}
        <path d="M185,152 C202,154 224,168 232,188 C240,208 232,230 210,242" fill="none" stroke="url(#duskCoupleGold)" strokeWidth="2.5" strokeLinecap="round" />

        {/* Heart between them */}
        <path d="M170,100 C170,95 166,92 162,92 C158,92 155,95 153,98 C151,95 148,92 144,92 C140,92 136,95 136,100 C136,106 142,112 153,120 C164,112 170,106 170,100 Z" fill="#D4AF37" opacity="0.9" transform="scale(0.8) translate(40, 20)" />
      </svg>

      <div className="absolute bottom-2.5 inset-x-0 text-center">
        <span className="font-montserrat text-[10px] text-[#FAF8F5]/85 tracking-widest uppercase font-medium">
          Dusk Radiance · A Golden Journey Ahead
        </span>
      </div>
    </div>
  );
};
