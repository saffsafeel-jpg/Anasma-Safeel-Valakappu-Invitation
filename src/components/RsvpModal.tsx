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

      // Fire celebratory pastel confetti burst
      try {
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#D97D64', '#E29578', '#F7D6C8', '#D4AF37'],
        });
      } catch {
        // Fallback
      }
    } catch (err) {
      console.error('RSVP submission error:', err);
      setError('Could not record RSVP. Please try again.');
      setIsSubmitting(false);
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
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#2E1E14]/50 backdrop-blur-sm">
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
            className="relative w-full max-w-[440px] max-h-[92vh] bg-[#FAF5EE] text-[#2E1E14] rounded-t-3xl sm:rounded-3xl border border-[#E8DACB] shadow-[0_20px_60px_rgba(80,50,30,0.18)] overflow-y-auto z-10 flex flex-col"
          >
            {/* Header bar */}
            <div className="sticky top-0 bg-[#FAF5EE]/95 backdrop-blur-md pt-5 pb-3 px-6 border-b border-[#E8DACB] flex items-center justify-between z-20">
              <div className="text-left">
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#2E1E14]">
                  RSVP &amp; Send Your Wishes
                </h3>
                <p className="font-serif italic text-xs text-[#8C5835] font-medium">
                  Valakappu Ceremony · Anasma &amp; Safeel
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#F5E6D8] text-[#5A4234] hover:bg-[#EFE0CE] flex items-center justify-center transition-colors cursor-pointer"
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
                  <div className="w-16 h-16 rounded-full bg-[#F5E6D8] border-2 border-[#D97D64] flex items-center justify-center mx-auto text-[#D97D64] shadow-[0_0_20px_rgba(217,125,100,0.3)]">
                    <CheckCircle2 className="w-8 h-8 text-[#D97D64]" />
                  </div>

                  <h4 className="font-cursive text-4xl gold-gradient-text">
                    Heartfelt Thanks!
                  </h4>
                  <p className="font-serif italic text-sm text-[#4A3528] max-w-[300px] mx-auto leading-relaxed">
                    {formData.attendance === 'accept'
                      ? `Dearest ${formData.fullName}, your presence and blessings bring immense joy to Anasma & Safeel.`
                      : `Thank you for your warm wishes, ${formData.fullName}. You will be in our thoughts and prayers.`}
                  </p>

                  {syncStatus && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-montserrat font-medium">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>{syncStatus}</span>
                    </div>
                  )}

                  <div className="pt-3">
                    <button
                      onClick={handleReset}
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D97D64] via-[#E29578] to-[#C86D58] text-white font-cinzel text-xs tracking-widest uppercase font-bold shadow-md hover:brightness-105 transition-all cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {error && (
                    <div className="p-2.5 rounded-xl bg-rose-50 text-rose-800 text-xs font-montserrat border border-rose-200">
                      {error}
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label className="block font-cinzel text-xs uppercase tracking-wider text-[#8C4E3A] mb-1.5 font-bold">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fatima &amp; Zayd"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DACB] bg-white text-[#2E1E14] placeholder:text-[#8C7668]/60 text-sm focus:outline-none focus:border-[#D97D64] transition-all font-montserrat shadow-sm"
                    />
                  </div>

                  {/* Will you be attending? */}
                  <div>
                    <label className="block font-cinzel text-xs uppercase tracking-wider text-[#8C4E3A] mb-2 font-bold">
                      Will you be attending? <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      <label
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          formData.attendance === 'accept'
                            ? 'bg-[#F5E6D8] border-[#D97D64] text-[#2E1E14] shadow-sm font-medium'
                            : 'bg-white border-[#E8DACB] hover:bg-[#FAF5EE] text-[#5A4234]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value="accept"
                          checked={formData.attendance === 'accept'}
                          onChange={() => setFormData({ ...formData, attendance: 'accept' })}
                          className="accent-[#D97D64] w-4 h-4"
                        />
                        <span className="font-serif text-sm">Joyfully Attending with Blessings ✨</span>
                      </label>

                      <label
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          formData.attendance === 'decline'
                            ? 'bg-[#F5E6D8] border-[#D97D64] text-[#2E1E14] shadow-sm font-medium'
                            : 'bg-white border-[#E8DACB] hover:bg-[#FAF5EE] text-[#5A4234]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value="decline"
                          checked={formData.attendance === 'decline'}
                          onChange={() => setFormData({ ...formData, attendance: 'decline' })}
                          className="accent-[#D97D64] w-4 h-4"
                        />
                        <span className="font-serif text-sm">Regretfully Unable to Attend, Sending Love 💌</span>
                      </label>
                    </div>
                  </div>

                  {/* Number of Guests */}
                  {formData.attendance === 'accept' && (
                    <div>
                      <label className="block font-cinzel text-xs uppercase tracking-wider text-[#8C4E3A] mb-1.5 font-bold">
                        Number of Attending Guests
                      </label>
                      <select
                        value={formData.guestsCount}
                        onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DACB] bg-white text-[#2E1E14] text-sm focus:outline-none focus:border-[#D97D64] transition-all font-montserrat shadow-sm cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Phone / Contact */}
                  <div>
                    <label className="block font-cinzel text-xs uppercase tracking-wider text-[#8C4E3A] mb-1.5 font-bold">
                      Phone / WhatsApp Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DACB] bg-white text-[#2E1E14] placeholder:text-[#8C7668]/60 text-sm focus:outline-none focus:border-[#D97D64] transition-all font-montserrat shadow-sm"
                    />
                  </div>

                  {/* Wishes & Blessings */}
                  <div>
                    <label className="block font-cinzel text-xs uppercase tracking-wider text-[#8C4E3A] mb-1.5 font-bold">
                      Wishes &amp; Prayers for Mother &amp; Baby
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share your loving wishes, blessings, or prayers for Anasma &amp; Safeel..."
                      value={formData.wishes}
                      onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DACB] bg-white text-[#2E1E14] placeholder:text-[#8C7668]/60 text-sm focus:outline-none focus:border-[#D97D64] transition-all font-montserrat shadow-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#D97D64] via-[#E29578] to-[#C86D58] text-white font-cinzel text-xs sm:text-sm tracking-[0.2em] uppercase font-bold shadow-[0_6px_25px_rgba(217,125,100,0.35)] hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Recording Wishes...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-white" />
                          <span>Submit My RSVP</span>
                        </>
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
