import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MusicProvider } from './context/MusicContext';
import { ValakappuCoverPage } from './components/ValakappuCoverPage';
import { HeroSilhouetteHeader } from './components/HeroSilhouetteHeader';
import { MaternityDuskSection } from './components/MaternityDuskSection';
import { ValakappuProgramTimeline } from './components/ValakappuProgramTimeline';
import { ValakappuCelebrationSong } from './components/ValakappuCelebrationSong';
import { ValakappuVenueDetails } from './components/ValakappuVenueDetails';
import { ValakappuRsvpSection } from './components/ValakappuRsvpSection';
import { RsvpModal } from './components/RsvpModal';
import { AdminRsvpModal } from './components/AdminRsvpModal';
import { ValakappuMusicPlayer } from './components/ValakappuMusicPlayer';
import { FileSpreadsheet, Heart, BookOpen, Sparkles } from 'lucide-react';

function ValakappuAppContent() {
  const [isCoverOpen, setIsCoverOpen] = useState(true);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="min-h-screen w-full bg-[#050912] flex justify-center items-start sm:py-6 sm:px-4 text-[#FAF8F5]">
      {/* Desktop background ambient lighting (Zero GPU blur overhead) */}
      <div className="fixed inset-0 pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-[420px] h-[420px] bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,transparent_70%)]" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(18,27,47,0.7)_0%,transparent_70%)]" />
      </div>

      {/* Mobile-First Frame Container (Strictly max-w-[480px]) */}
      <main
        ref={containerRef}
        className="relative w-full max-w-[480px] min-h-screen sm:min-h-[92vh] sm:rounded-[36px] bg-[#0B1325] shadow-[0_25px_70px_rgba(0,0,0,0.85)] sm:border-[6px] sm:border-[#1C2840] overflow-x-hidden overflow-y-auto flex flex-col z-10"
      >
        {/* Mobile Phone Speaker Notch / Header Indicator for Desktop Frame */}
        <div className="hidden sm:flex justify-center pt-2 pb-1 bg-[#070D18] text-[#D4AF37] z-50">
          <div className="w-20 h-1 rounded-full bg-white/20" />
        </div>

        <AnimatePresence mode="wait">
          {isCoverOpen ? (
            /* ================= SCREEN 1: INTERACTIVE COVER ================= */
            <ValakappuCoverPage
              key="invitation-cover"
              onOpenInvitation={() => setIsCoverOpen(false)}
            />
          ) : (
            /* ================= SCREEN 2: MAIN INVITATION ================= */
            <motion.div
              key="main-invitation"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col"
            >
              {/* Discrete Top Bar: Return to Cover & Event Badge */}
              <div className="sticky top-0 z-40 px-4 py-2.5 bg-[#070D18]/90 backdrop-blur-md border-b border-[#D4AF37]/25 flex items-center justify-between">
                <button
                  onClick={() => setIsCoverOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#142038] hover:bg-[#1C2C4E] border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-cinzel uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>View Cover</span>
                </button>

                <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-cinzel tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Anasma &amp; Safeel</span>
                </div>
              </div>

              {/* Section 1: Hero Header with Couple Photo & Countdown */}
              <HeroSilhouetteHeader />

              {/* Section 2: Maternity Dusk Silhouette & Love Note */}
              <MaternityDuskSection />

              {/* Section 3: Celebration Theme MP3 Audio (Azhagu Kutti Chellam) */}
              <ValakappuCelebrationSong />

              {/* Section 4: Program / Timeline with Visual Ceremony Moments */}
              <ValakappuProgramTimeline />

              {/* Section 5: Venue Map, Address & Route Planning */}
              <ValakappuVenueDetails />

              {/* Section 6: RSVP & Heartfelt Wishes Section */}
              <ValakappuRsvpSection onOpenRsvpModal={() => setIsRsvpOpen(true)} />

              {/* Discreet Footer with Host Admin Link */}
              <footer className="w-full py-8 px-6 bg-[#070D18] border-t border-[#D4AF37]/20 text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-xs font-cinzel text-[#D4AF37] tracking-[0.2em] uppercase">
                  <span>With Love &amp; Joy</span>
                  <Heart className="w-3 h-3 fill-[#D4AF37]" />
                  <span>Anasma &amp; Safeel</span>
                </div>
                <p className="text-[11px] text-[#FAF8F5]/50 font-montserrat">
                  October 04, 2026 • Udaya Resort, Palakkad
                </p>

                {/* Secret/Discreet Host Dashboard Link */}
                <div className="pt-2">
                  <button
                    onClick={() => setIsAdminOpen(true)}
                    className="inline-flex items-center gap-1.5 text-[10px] text-[#FAF8F5]/40 hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    <FileSpreadsheet className="w-3 h-3" />
                    <span>Host RSVP Management</span>
                  </button>
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Floating Celebration Music Pill (Azhagu Kutti Chellam - Active on Both Cover & Invitation) */}
        <ValakappuMusicPlayer />

        {/* Interactive RSVP Submission Modal */}
        <RsvpModal
          isOpen={isRsvpOpen}
          onClose={() => setIsRsvpOpen(false)}
        />

        {/* Host Google Sheets & RSVP Dashboard Modal */}
        <AdminRsvpModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <MusicProvider>
      <ValakappuAppContent />
    </MusicProvider>
  );
}
