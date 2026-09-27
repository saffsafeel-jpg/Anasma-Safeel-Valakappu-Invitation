import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { RsvpModal } from './RsvpModal';

export const RsvpSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section 
      id="rsvp-section"
      className="relative w-full py-16 px-5 bg-gradient-to-b from-[#FAF0F2] via-[#FFFDF9] to-[#F7DEE2] text-[#581825] flex flex-col items-center text-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[380px] flex flex-col items-center"
      >
        <p className="font-serif italic text-xs tracking-[0.25em] uppercase text-[#C5A059]">
          Kindly Respond
        </p>
        <h3 className="font-script text-3xl sm:text-4xl text-[#581825] mt-1 mb-2">
          Confirm Your Attendance
        </h3>
        
        <p className="font-serif italic text-sm text-[#6B1D2F]/85 max-w-[280px] leading-relaxed mb-8">
          To help us prepare for a joyful celebration, kindly confirm your attendance.
        </p>

        {/* Wax Seal / Elegant Burgundy Pill Button with Gold Rim */}
        <div className="relative group cursor-pointer" onClick={() => setIsModalOpen(true)}>
          {/* Subtle golden halo glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#C5A059]/30 via-[#F3B8BF]/40 to-[#C5A059]/30 rounded-full blur-md group-hover:scale-105 transition-transform" />

          <button
            id="open-rsvp-btn"
            type="button"
            className="relative px-8 py-4 rounded-full bg-gradient-to-r from-[#581825] via-[#4A0E1A] to-[#581825] text-[#F5DEB3] shadow-xl border-2 border-[#C5A059] flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105 active:scale-95 cursor-pointer"
          >
            {/* Inner dotted border */}
            <div className="absolute inset-1 rounded-full border border-dotted border-[#F5DEB3]/50 pointer-events-none" />

            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="font-serif text-base tracking-[0.2em] uppercase font-semibold text-[#F5DEB3]">
                RSVP
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            </div>

            <span className="font-script text-sm text-[#F5DEB3]/90 mt-0.5">
              Click to open
            </span>
          </button>
        </div>

        {/* Footer closing signatures matching video: "Hope to see you there! Hannah and Nesban" */}
        <div className="mt-12 pt-8 border-t border-[#E8CCD1]/60 w-full flex flex-col items-center">
          <p className="font-script text-2xl text-[#C5A059]">
            Hope to see you there!
          </p>
          <h4 className="font-serif text-2xl text-[#581825] mt-1">
            Hannah &amp; Nesban
          </h4>
          <p className="font-serif italic text-xs text-[#6B1D2F]/70 tracking-widest uppercase mt-3">
            With Love &amp; Duas
          </p>
        </div>

      </motion.div>

      {/* Guest RSVP Form Popup Modal */}
      <RsvpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
