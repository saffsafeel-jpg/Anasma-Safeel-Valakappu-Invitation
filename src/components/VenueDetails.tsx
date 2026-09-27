import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

export const VenueDetails: React.FC = () => {
  const venueName = "Juna Jaas Hall";
  const venueAddress = "Juna Jaas Hall, Grand Reception & Event Center";
  const googleMapsUrl = "https://maps.app.goo.gl/R4CqsoWgaXRzVAcD6?g_st=ic";

  return (
    <section 
      id="venue-section"
      className="relative w-full py-16 px-5 bg-[#FFFDF9] text-[#581825] flex flex-col items-center text-center overflow-hidden border-t border-[#E8CCD1]"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[390px]"
      >
        <p className="font-serif italic text-xs tracking-[0.25em] uppercase text-[#C5A059]">
          The Destination
        </p>
        <h3 className="font-script text-3xl sm:text-4xl text-[#581825] mt-1 mb-6">
          Location &amp; Venue
        </h3>

        {/* Venue Watercolor Illustration Card */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#FCECEE] to-[#FFFDF9] border border-[#E8CCD1] shadow-sm p-4 mb-5">
          
          {/* Mosque / Architectural Watercolor SVG Graphic */}
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-b from-[#F9E8EC] to-[#FFF5F7] flex items-center justify-center p-2 border border-[#C5A059]/30">
            <svg viewBox="0 0 400 220" className="w-full h-full drop-shadow-sm">
              <defs>
                <linearGradient id="goldDome" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5DEB3" />
                  <stop offset="50%" stopColor="#C5A059" />
                  <stop offset="100%" stopColor="#8C6E2D" />
                </linearGradient>
                <linearGradient id="wallWash" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#F7DFE4" />
                </linearGradient>
              </defs>

              {/* Sky soft blush gradient clouds */}
              <ellipse cx="200" cy="180" rx="190" ry="60" fill="#FAF0F2" />
              <ellipse cx="200" cy="80" rx="120" ry="40" fill="#FDF1F4" opacity="0.6" />

              {/* Left Minaret */}
              <g transform="translate(60, 40)">
                <rect x="10" y="40" width="16" height="120" fill="url(#wallWash)" stroke="#C5A059" strokeWidth="0.8" />
                {/* Minaret Balcony */}
                <rect x="7" y="60" width="22" height="6" fill="#C5A059" rx="1" />
                <rect x="7" y="100" width="22" height="6" fill="#C5A059" rx="1" />
                {/* Minaret Dome Top */}
                <path d="M 18 10 Q 26 28 26 40 L 10 40 Q 10 28 18 10 Z" fill="url(#goldDome)" />
                {/* Crescent Finial */}
                <circle cx="18" cy="7" r="2.5" fill="#C5A059" />
              </g>

              {/* Right Minaret */}
              <g transform="translate(308, 40)">
                <rect x="10" y="40" width="16" height="120" fill="url(#wallWash)" stroke="#C5A059" strokeWidth="0.8" />
                <rect x="7" y="60" width="22" height="6" fill="#C5A059" rx="1" />
                <rect x="7" y="100" width="22" height="6" fill="#C5A059" rx="1" />
                <path d="M 18 10 Q 26 28 26 40 L 10 40 Q 10 28 18 10 Z" fill="url(#goldDome)" />
                <circle cx="18" cy="7" r="2.5" fill="#C5A059" />
              </g>

              {/* Main Building Base & Arches */}
              <g transform="translate(86, 90)">
                <rect x="0" y="40" width="228" height="70" fill="url(#wallWash)" stroke="#E8CCD1" strokeWidth="1" />
                
                {/* Grand Center Archway */}
                <path d="M 84 110 L 84 65 Q 114 45 144 65 L 144 110 Z" fill="#581825" opacity="0.85" />
                <path d="M 88 110 L 88 68 Q 114 50 140 68 L 140 110 Z" fill="#3D0B14" />
                {/* Inner Gold Arch outline */}
                <path d="M 92 110 L 92 72 Q 114 56 136 72 L 136 110" fill="none" stroke="#C5A059" strokeWidth="1.5" />

                {/* Side Windows */}
                <path d="M 20 100 L 20 75 Q 35 62 50 75 L 50 100 Z" fill="#FAF0F2" stroke="#C5A059" strokeWidth="1" />
                <path d="M 178 100 L 178 75 Q 193 62 208 75 L 208 100 Z" fill="#FAF0F2" stroke="#C5A059" strokeWidth="1" />

                {/* Central Grand Dome */}
                <path d="M 74 40 Q 114 -25 154 40 Z" fill="url(#goldDome)" stroke="#8C6E2D" strokeWidth="0.8" />
                {/* Main Dome Crescent */}
                <line x1="114" y1="-12" x2="114" y2="-28" stroke="#C5A059" strokeWidth="1.5" />
                <circle cx="114" cy="-30" r="3.5" fill="#C5A059" />

                {/* Side Smaller Domes */}
                <path d="M 25 40 Q 45 10 65 40 Z" fill="url(#goldDome)" opacity="0.9" />
                <path d="M 163 40 Q 183 10 203 40 Z" fill="url(#goldDome)" opacity="0.9" />
              </g>

              {/* Lush Watercolor Roses and Foliage at Foreground */}
              <g transform="translate(40, 180)">
                <circle cx="30" cy="15" r="14" fill="#F4BAC1" opacity="0.85" />
                <circle cx="30" cy="15" r="8" fill="#E89AA4" />
                <circle cx="30" cy="15" r="4" fill="#581825" />
                <circle cx="320" cy="15" r="14" fill="#F4BAC1" opacity="0.85" />
                <circle cx="320" cy="15" r="8" fill="#E89AA4" />
                <circle cx="320" cy="15" r="4" fill="#581825" />
              </g>
            </svg>
          </div>

          <div className="mt-4 text-center">
            <h4 className="font-serif text-2xl font-medium text-[#581825]">
              {venueName}
            </h4>
            <p className="font-sans text-xs text-[#6B1D2F]/80 mt-1 flex items-center justify-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{venueAddress}</span>
            </p>
          </div>
        </div>

        {/* Interactive Google Maps Iframe block */}
        <div className="w-full rounded-2xl overflow-hidden border border-[#E8CCD1] shadow-md bg-white relative">
          <div className="h-52 w-full">
            <iframe
              title="Juna Jaas Hall Location Map"
              src="https://maps.google.com/maps?q=Juna+Jaas+Hall&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[10%] contrast-[105%]"
            />
          </div>

          {/* Open in Google Maps button overlay */}
          <div className="p-3 bg-[#FFFDF9] border-t border-[#E8CCD1] flex items-center justify-between">
            <span className="text-xs font-serif italic text-[#6B1D2F]">
              Tap for navigation &amp; directions
            </span>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#581825] text-[#F5DEB3] text-xs font-serif tracking-wider hover:bg-[#4A0E1A] shadow-sm transition-colors"
            >
              <Navigation className="w-3 h-3 text-[#C5A059]" />
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3 text-[#C5A059]" />
            </a>
          </div>
        </div>

      </motion.div>
    </section>
  );
};
