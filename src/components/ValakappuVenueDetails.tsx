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
      text: 'You are cordially invited to celebrate the Valakappu Ceremony of Anasma & Safeel on Monday, 05th October 2026, 03:00 PM to 06:00 PM at Udaya Resort, Palakkad, Kerala.',
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
  // Date: 2026-10-05 15:00 to 18:00 IST (Palakkad: UTC+5:30 -> UTC: 09:30 to 12:30)
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Anasma & Safeel - Valakappu Ceremony'
  )}&dates=20261005T093000Z/20261005T123000Z&details=${encodeURIComponent(
    'Valakappu Ceremony celebrating parents-to-be Anasma & Safeel with traditional bangle rituals, blessings, and dinner feast (03:00 PM to 06:00 PM).'
  )}&location=${encodeURIComponent(`${venueName}, ${venueAddress}`)}`;

  return (
    <section id="venue-location" className="relative w-full py-12 px-6 bg-gradient-to-b from-[#F5ECE0] via-[#FAF5EE] to-[#EFE4D6] text-[#2E1E14]">
      {/* Decorative Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-[radial-gradient(circle,rgba(226,149,120,0.18)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-[420px] mx-auto space-y-7 text-center">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5E6D8] border border-[#E8CDB5] text-[#8C4E3A] text-[11px] font-cinzel tracking-widest uppercase font-semibold">
            <MapPin className="w-3 h-3 text-[#D97D64]" />
            <span>Destination &amp; Venue</span>
          </div>

          <h2 className="font-cursive text-4xl sm:text-5xl gold-gradient-text py-0.5">
            Venue &amp; Location
          </h2>
          <p className="font-serif italic text-sm text-[#8C5835] tracking-wide font-medium">
            Where hearts gather to celebrate new beginnings
          </p>
        </div>

        {/* Venue Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-6 rounded-3xl bg-white/95 border border-[#E8DACB] shadow-[0_10px_35px_rgba(80,50,30,0.08)] backdrop-blur-md space-y-5"
        >
          {/* Scenic Venue Photo Preview */}
          <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-[#E8DACB] shadow-inner bg-[#FAF5EE]">
            <CouplePhotoVisual
              customUrl={venuePhoto}
              visualType="venue"
              alt="Udaya Resort, Palakkad"
              className="w-full h-full"
            />
          </div>

          {/* Venue Titles */}
          <div className="space-y-1 text-center">
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#2E1E14]">
              {venueName}
            </h3>
            <p className="font-montserrat text-xs sm:text-sm text-[#6E5448] font-normal px-2 leading-relaxed">
              {venueAddress}
            </p>
          </div>

          {/* Interactive Utility Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleCopyAddress}
              className="w-full py-2.5 px-3 rounded-xl bg-[#FAF5EE] hover:bg-[#F3E7D9] border border-[#E8DACB] text-[#5A4234] text-xs font-montserrat font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#D97D64]" />
                  <span>Copy Address</span>
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="w-full py-2.5 px-3 rounded-xl bg-[#FAF5EE] hover:bg-[#F3E7D9] border border-[#E8DACB] text-[#5A4234] text-xs font-montserrat font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              {shared ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Shared!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#D97D64]" />
                  <span>Share Invite</span>
                </>
              )}
            </button>
          </div>

          {/* Primary Action Button: Open in Google Maps */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#D97D64] via-[#E29578] to-[#C86D58] text-white font-cinzel text-xs uppercase tracking-wider font-bold shadow-[0_6px_25px_rgba(217,125,100,0.35)] hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-white" />
            <span>Get Directions via Google Maps</span>
          </a>

          {/* Secondary Action: Save to Calendar */}
          <div className="pt-1">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#F5E6D8] hover:bg-[#EFE0CE] border border-[#E8CDB5] text-[#8C5835] font-montserrat text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Calendar className="w-4 h-4 text-[#D97D64]" />
              <span>Add to Google Calendar (05 Oct 2026)</span>
            </a>
          </div>

          {/* Quick Notice about Timing */}
          <p className="text-[11px] text-[#7A6354] font-montserrat flex items-center justify-center gap-1.5 pt-1 font-medium">
            <Clock className="w-3 h-3 text-[#D97D64]" />
            <span>Ceremony commences promptly at 03:00 PM</span>
          </p>
        </motion.div>
      </div>

      {/* Photo Upload Modal */}
      {isUploadOpen && (
        <PhotoUploadModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          photoId="venue"
          photoTitle="Udaya Resort Venue Photo"
          currentPhotoUrl={venuePhoto || undefined}
          onPhotoSaved={(url) => {
            setVenuePhoto(url);
          }}
        />
      )}
    </section>
  );
};
