import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Copy, Check, Calendar, Share2, Camera, Clock } from 'lucide-react';
import { CouplePhotoVisual } from './CouplePhotoVisual';
import { PhotoUploadModal } from './PhotoUploadModal';
import { getCustomPhoto, subscribeToPhotos } from '../services/photoStore';

export const ValakappuVenueDetails: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [venuePhoto, setVenuePhoto] = useState<string | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  useEffect(() => {
    const sync = () => setVenuePhoto(getCustomPhoto('venue'));
    sync();
    const unsub = subscribeToPhotos(sync);
    return () => unsub();
  }, []);

  const venueName = 'Udaya Resort';
  const venueAddress = 'Nila Nagar, West Yakkara, Palakkad, Kerala';
  const mapsUrl = 'https://maps.app.goo.gl/MVFEHUsMxWosw9NA6';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${venueName}, ${venueAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Valakappu Ceremony - Anasma & Safeel',
      text: 'You are cordially invited to celebrate the Valakappu Ceremony of Anasma & Safeel on Sunday, 04th October 2026, 03:00 PM to 06:00 PM at Udaya Resort, Palakkad, Kerala.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShared(true);
        setTimeout(() => setShared(false), 2500);
      } catch {
        // User cancelled or unsupported
      }
    } else {
      // Fallback: Copy link
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  // Google Calendar URL generator
  // Date: 2026-10-04 15:00 to 18:00 IST (Palakkad: UTC+5:30 -> UTC: 09:30 to 12:30)
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Anasma & Safeel - Valakappu Ceremony'
  )}&dates=20261004T093000Z/20261004T123000Z&details=${encodeURIComponent(
    'Valakappu Ceremony celebrating parents-to-be Anasma & Safeel with traditional bangle rituals, blessings, and dinner feast (03:00 PM to 06:00 PM).'
  )}&location=${encodeURIComponent(`${venueName}, ${venueAddress}`)}`;

  return (
    <section id="venue-location" className="relative w-full py-12 px-6 bg-gradient-to-b from-[#121B2F] via-[#0D1527] to-[#070D18] text-[#FAF8F5]">
      {/* Decorative Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#D4AF37]/10 blur-[85px]" />
      </div>

      <div className="relative z-10 max-w-[420px] mx-auto space-y-7 text-center">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#18233C]/80 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-cinzel tracking-widest uppercase">
            <MapPin className="w-3 h-3 text-[#D4AF37]" />
            <span>Destination &amp; Venue</span>
          </div>

          <h2 className="font-cursive text-4xl sm:text-5xl text-[#FAF8F5] gold-gradient-text drop-shadow-[0_2px_12px_rgba(212,175,55,0.3)]">
            Venue &amp; Location
          </h2>
          <p className="font-serif italic text-sm text-[#D4AF37] tracking-wide">
            Where hearts gather to celebrate new beginnings
          </p>
        </div>

        {/* Venue Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-6 rounded-3xl bg-[#142038]/85 border border-[#D4AF37]/30 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-md space-y-5"
        >
          {/* Scenic Venue Photo Preview */}
          <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-[#D4AF37]/35 shadow-inner bg-[#0A101C]">
            <CouplePhotoVisual
              customUrl={venuePhoto}
              visualType="venue"
              alt="Udaya Resort, Palakkad"
              className="w-full h-full"
            />
            <button
              onClick={() => setIsUploadOpen(true)}
              className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-[#070D18]/85 border border-[#D4AF37]/50 text-[#D4AF37] hover:scale-110 active:scale-95 transition-all text-[10px] shadow-md cursor-pointer"
              title="Personalize / Upload Venue Photo"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Venue Icon & Name */}
          <div className="space-y-1.5">
            <div className="w-12 h-12 rounded-full bg-[#0E1626] border border-[#D4AF37] mx-auto flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.35)]">
              <MapPin className="w-6 h-6 text-[#D4AF37]" />
            </div>

            <h3 className="font-cinzel text-2xl font-bold text-[#FAF8F5] tracking-wider pt-2">
              {venueName}
            </h3>

            {/* Date & Time Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E1626] border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-cinzel my-1">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Sun, 04 Oct 2026 · 03:00 PM – 06:00 PM</span>
            </div>

            <p className="font-montserrat text-xs sm:text-sm text-[#FAF8F5]/80 font-light leading-relaxed max-w-[280px] mx-auto">
              {venueAddress}
            </p>
          </div>

          {/* Quick Map Preview Badge */}
          <div className="py-2.5 px-4 rounded-xl bg-[#0B1325]/90 border border-[#D4AF37]/20 flex items-center justify-between text-xs text-left">
            <span className="font-montserrat text-[#FAF8F5]/70 text-[11px]">
              Palakkad, Kerala, India
            </span>
            <button
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-1 text-[11px] text-[#D4AF37] hover:text-[#FFF3B0] transition-colors font-medium"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied!' : 'Copy Address'}</span>
            </button>
          </div>

          {/* Primary Action: Get Directions on Google Maps */}
          <div className="space-y-2.5 pt-1">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-[#0B1325] font-cinzel text-xs tracking-[0.18em] uppercase font-bold shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4 text-[#0B1325]" />
              <span>Get Directions on Google Maps</span>
            </a>

            {/* Secondary Actions: Add to Calendar & Share */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl border border-[#D4AF37]/40 bg-[#0E1626]/70 hover:bg-[#0E1626] text-[#FAF8F5] text-xs font-montserrat flex items-center justify-center gap-1.5 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="truncate">Add to Calendar</span>
              </a>

              <button
                onClick={handleShare}
                className="py-2.5 px-3 rounded-xl border border-[#D4AF37]/40 bg-[#0E1626]/70 hover:bg-[#0E1626] text-[#FAF8F5] text-xs font-montserrat flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{shared ? 'Link Copied!' : 'Share Invite'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {isUploadOpen && (
        <PhotoUploadModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          photoId="venue"
          photoTitle="Udaya Resort Venue Photo"
          currentPhotoUrl={venuePhoto || undefined}
          onPhotoSaved={(url) => setVenuePhoto(url)}
        />
      )}
    </section>
  );
};
