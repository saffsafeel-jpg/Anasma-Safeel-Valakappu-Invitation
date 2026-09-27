import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Sparkles, Heart, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RSVPFormData } from '../types';
import { saveRsvpLocally, syncRsvpSubmission } from '../services/googleSheets';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmittedSuccess?: () => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose, onSubmittedSuccess }) => {
  const [formData, setFormData] = useState<RSVPFormData>({
    fullName: '',
    attendance: 'accept',
    guestsCount: 1,
    dietary: '',
    wishes: '',
  });
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string>('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setError('Please enter your full name');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      // 1. Save RSVP in local store
      const stored = saveRsvpLocally({
        fullName: formData.fullName.trim(),
        attendance: formData.attendance,
        guestsCount: formData.attendance === 'accept' ? formData.guestsCount : 0,
        song: phone.trim() ? `Phone: ${phone.trim()}` : '-',
        childrenInfo: formData.dietary?.trim() || '-',
        wishes: formData.wishes?.trim() || 'Warmest congratulations and prayers!',
      });

      // 2. Automatically sync to Google Sheets via server / webhook
      try {
        const syncResult = await syncRsvpSubmission(stored);
        if (syncResult.success) {
          setSyncStatus('Recorded directly in Google Sheet');
        }
      } catch (err) {
        console.warn('Auto-sync to Google Sheet deferred:', err);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSubmittedSuccess) {
        onSubmittedSuccess();
      }

      // 3. Celebratory golden confetti burst
      try {
        confetti({
          particleCount: 85,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FFF3B0', '#E5C378', '#FFFFFF', '#0B1325'],
        });
      } catch {
        // Fallback if canvas-confetti is unavailable
      }
    } catch {
      setIsSubmitting(false);
      setError('Could not save RSVP. Please try again.');
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      attendance: 'accept',
      guestsCount: 1,
      dietary: '',
      wishes: '',
    });
    setPhone('');
    setSyncStatus('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#070D18]/80 backdrop-blur-md">
          {/* Backdrop click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          {/* Modal / Bottom Sheet */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[440px] max-h-[92vh] bg-[#0E172E] text-[#FAF8F5] rounded-t-3xl sm:rounded-3xl border border-[#D4AF37]/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-y-auto z-10 flex flex-col"
          >
            {/* Header bar */}
            <div className="sticky top-0 bg-[#0E172E]/95 backdrop-blur-md pt-5 pb-3 px-6 border-b border-[#D4AF37]/20 flex items-center justify-between z-20">
              <div className="text-left">
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#FAF8F5]">
                  RSVP &amp; Send Your Wishes
                </h3>
                <p className="font-serif italic text-xs text-[#D4AF37]">
                  Valakappu Ceremony · Anasma &amp; Safeel
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#18233C] text-[#FAF8F5] hover:bg-[#223354] flex items-center justify-center transition-colors"
                aria-label="Close RSVP modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-6 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#142038] border-2 border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    <CheckCircle2 className="w-8 h-8 text-[#D4AF37]" />
                  </div>

                  <h4 className="font-cursive text-4xl text-[#FAF8F5] gold-gradient-text">
                    Heartfelt Thanks!
                  </h4>
                  <p className="font-serif italic text-sm text-[#FAF8F5]/85 max-w-[300px] mx-auto leading-relaxed">
                    {formData.attendance === 'accept'
                      ? `Dearest ${formData.fullName}, your presence and blessings bring immense joy to Anasma & Safeel.`
                      : `Thank you for your warm wishes, ${formData.fullName}. You will be in our thoughts and prayers.`}
                  </p>

                  {syncStatus && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-montserrat">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>{syncStatus}</span>
                    </div>
                  )}

                  <div className="pt-3">
                    <button
                      onClick={handleReset}
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0B1325] font-cinzel text-xs tracking-widest uppercase font-bold shadow-lg hover:brightness-110 transition-all cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {error && (
                    <div className="p-2.5 rounded-xl bg-rose-950/60 text-rose-200 text-xs font-montserrat border border-rose-500/40">
                      {error}
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label className="block font-cinzel text-xs uppercase tracking-wider text-[#D4AF37] mb-1.5 font-medium">
                      Your Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fatima &amp; Zayd"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-[#121B2F] text-[#FAF8F5] placeholder:text-[#FAF8F5]/30 text-sm focus:outline-none focus:border-[#D4AF37] focus:bg-[#15223C] transition-all font-montserrat"
                    />
                  </div>

                  {/* Will you be attending? */}
                  <div>
                    <label className="block font-cinzel text-xs uppercase tracking-wider text-[#D4AF37] mb-2 font-medium">
                      Will you be attending? <span className="text-rose-400">*</span>
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      <label
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          formData.attendance === 'accept'
                            ? 'bg-[#18253F] border-[#D4AF37] text-[#FAF8F5] shadow-sm'
                            : 'border-[#D4AF37]/20 hover:bg-[#142038] text-[#FAF8F5]/70'
                        }`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value="accept"
                          checked={formData.attendance === 'accept'}
                          onChange={() => setFormData({ ...formData, attendance: 'accept' })}
                          className="accent-[#D4AF37] w-4 h-4"
                        />
                        <span className="font-serif text-sm">Joyfully Attending with Blessings ✨</span>
                      </label>

                      <label
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          formData.attendance === 'decline'
                            ? 'bg-[#18253F] border-[#D4AF37] text-[#FAF8F5] shadow-sm'
                            : 'border-[#D4AF37]/20 hover:bg-[#142038] text-[#FAF8F5]/70'
                        }`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value="decline"
                          checked={formData.attendance === 'decline'}
                          onChange={() => setFormData({ ...formData, attendance: 'decline' })}
                          className="accent-[#D4AF37] w-4 h-4"
                        />
                        <span className="font-serif text-sm">Sending Love &amp; Prayers from Afar 💌</span>
                      </label>
                    </div>
                  </div>

                  {/* Number of Attendees */}
                  {formData.attendance === 'accept' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3 pt-1"
                    >
                      <div>
                        <label className="block font-cinzel text-xs uppercase tracking-wider text-[#D4AF37] mb-1.5 font-medium">
                          Number of Attendees
                        </label>
                        <select
                          value={formData.guestsCount}
                          onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-[#121B2F] text-[#FAF8F5] text-sm focus:outline-none focus:border-[#D4AF37] transition-all font-cinzel"
                        >
                          <option value={1} className="bg-[#0E172E]">1 Guest</option>
                          <option value={2} className="bg-[#0E172E]">2 Guests</option>
                          <option value={3} className="bg-[#0E172E]">3 Guests</option>
                          <option value={4} className="bg-[#0E172E]">4 Guests</option>
                          <option value={5} className="bg-[#0E172E]">5+ Guests</option>
                        </select>
                      </div>

                      {/* Phone / Contact */}
                      <div>
                        <label className="block font-cinzel text-xs uppercase tracking-wider text-[#D4AF37] mb-1.5 font-medium">
                          Phone / WhatsApp Number (Optional)
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. +91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-[#121B2F] text-[#FAF8F5] placeholder:text-[#FAF8F5]/30 text-sm focus:outline-none focus:border-[#D4AF37] transition-all font-montserrat"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Blessing Message / Wishes for Parents-To-Be */}
                  <div>
                    <label className="block font-cinzel text-xs uppercase tracking-wider text-[#D4AF37] mb-1.5 font-medium">
                      Blessing Message &amp; Wishes for Baby &amp; Parents
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Write your loving prayers, blessings, and joyful wishes..."
                      value={formData.wishes}
                      onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-[#121B2F] text-[#FAF8F5] placeholder:text-[#FAF8F5]/30 text-sm focus:outline-none focus:border-[#D4AF37] transition-all font-serif resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-[#0B1325] font-cinzel text-xs sm:text-sm tracking-[0.2em] uppercase font-bold shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-[#0B1325] border-t-transparent rounded-full animate-spin" />
                          <span>Sending Blessings...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>Submit RSVP &amp; Blessings</span>
                          <Sparkles className="w-4 h-4 text-[#0B1325]" />
                        </div>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
