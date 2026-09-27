import React, { useRef } from 'react';
import { motion } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Disc3,
  Sparkles,
  Music,
  Upload,
  Check,
} from 'lucide-react';
import { useMusic } from '../context/MusicContext';

export const ValakappuCelebrationSong: React.FC = () => {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    songTitle,
    songArtist,
    customFileName,
    togglePlay,
    seekTo,
    setVolume,
    toggleMute,
    setCustomFile,
  } = useMusic();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomFile(file);
    }
  };

  return (
    <section
      id="celebration-song"
      className="relative w-full py-12 px-5 bg-gradient-to-b from-[#0E1626] via-[#10192C] to-[#0A101C] text-[#FAF8F5] overflow-hidden"
    >
      {/* Ambient background gold glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-[440px] mx-auto space-y-6 text-center">
        {/* Header Pill */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#18233C]/80 border border-[#D4AF37]/35 text-[#D4AF37] text-[11px] font-cinzel tracking-widest uppercase shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Celebration MP3 Audio</span>
        </div>

        {/* Section Heading */}
        <div className="space-y-1">
          <h2 className="font-cursive text-4xl sm:text-5xl text-[#FAF8F5] gold-gradient-text drop-shadow-[0_2px_12px_rgba(212,175,55,0.3)]">
            Azhagu Kutti Chellam
          </h2>
          <p className="font-serif italic text-sm text-[#D4AF37] tracking-wide">
            {songArtist}
          </p>
        </div>

        {/* ================= PURE MP3 AUDIO PLAYER CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full rounded-3xl p-[1px] bg-gradient-to-b from-[#D4AF37]/60 via-[#AA7C11]/30 to-[#D4AF37]/15 shadow-[0_16px_40px_rgba(0,0,0,0.65)]"
        >
          <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#0E1728] to-[#080D17] p-6 space-y-6">
            {/* Centerpiece: Golden Vinyl Record & Concentric Audio Grooves */}
            <div className="relative flex flex-col items-center justify-center pt-2">
              <div
                className={`relative w-40 h-40 sm:w-44 sm:h-44 rounded-full flex items-center justify-center p-3 bg-gradient-to-br from-[#1C263A] via-[#0C1220] to-[#141C2E] border-2 border-[#D4AF37]/50 shadow-[0_0_35px_rgba(212,175,55,0.25)] transition-transform duration-1000 ${
                  isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''
                }`}
              >
                {/* Concentric Gold Grooves */}
                <div className="absolute inset-3 rounded-full border border-[#D4AF37]/20 pointer-events-none" />
                <div className="absolute inset-6 rounded-full border border-[#D4AF37]/15 pointer-events-none" />
                <div className="absolute inset-9 rounded-full border border-[#D4AF37]/25 pointer-events-none" />

                {/* Center Label Spindle */}
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#B38728] via-[#FBF5B7] to-[#AA771C] flex flex-col items-center justify-center shadow-lg border border-[#FAF8F5]/40 text-[#0B1325]">
                  <Disc3 className="w-6 h-6 text-[#0B1325]" />
                  <span className="text-[7px] font-cinzel font-bold tracking-tighter uppercase mt-0.5">
                    A &amp; S 2026
                  </span>
                  <div className="absolute w-2 h-2 rounded-full bg-[#0B1325] border border-white/50" />
                </div>
              </div>

              {/* Live Dancing Equalizer Waveform (Hardware-Accelerated CSS Transforms) */}
              <div className="flex items-end justify-center gap-1.5 h-7 mt-5 px-4 w-full">
                {[1, 2, 3, 4, 1, 3, 2, 4, 2, 1, 4, 3, 1, 2, 4, 3, 1, 2, 3, 4].map((variant, i) => (
                  <span
                    key={i}
                    className={`w-1 h-6 rounded-full bg-gradient-to-t from-[#B38728] via-[#FBF5B7] to-[#D4AF37] ${
                      isPlaying
                        ? `animate-eq-dance-${variant}`
                        : 'opacity-25 scale-y-[0.2] transform-origin-bottom transition-transform duration-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Track Info Badge */}
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <Music className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-cinzel text-base font-bold text-[#FAF8F5] tracking-wider">
                  {customFileName ? customFileName.replace(/\.[^/.]+$/, '') : songTitle}
                </span>
              </div>
              <p className="font-montserrat text-xs text-[#D4AF37]">
                {customFileName ? 'Custom Selected MP3 Track' : songArtist}
              </p>
            </div>

            {/* Time Scrubber & Progress Bar */}
            <div className="space-y-1.5 px-2">
              <div className="relative w-full flex items-center">
                <input
                  type="range"
                  min={0}
                  max={duration}
                  value={currentTime}
                  onChange={(e) => seekTo(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#1C283E] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-montserrat text-[#FAF8F5]/60 font-light px-0.5">
                <span>{formatTime(currentTime)}</span>
                <span className="text-[#D4AF37]/70 font-cinzel text-[10px]">MP3 AUDIO</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Primary Audio Transport Controls */}
            <div className="flex items-center justify-center gap-6 pt-1">
              {/* Skip Back 10s */}
              <button
                onClick={() => seekTo(currentTime - 10)}
                className="p-2.5 rounded-full text-[#FAF8F5]/70 hover:text-[#D4AF37] hover:bg-[#162136] transition-all cursor-pointer"
                title="Rewind 10 seconds"
                aria-label="Rewind 10 seconds"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              {/* Master Circular Play / Pause Button */}
              <button
                onClick={togglePlay}
                className="relative p-5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF0A5] to-[#C59B35] text-[#0B1325] shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer group"
                title={isPlaying ? 'Pause MP3' : 'Play MP3'}
                aria-label={isPlaying ? 'Pause Celebration MP3' : 'Play Celebration MP3'}
              >
                {/* Glow ring */}
                <span className="absolute inset-0 rounded-full border border-white/40 pointer-events-none" />
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-[#0B1325]" />
                ) : (
                  <Play className="w-7 h-7 fill-[#0B1325] ml-1" />
                )}
              </button>

              {/* Skip Forward 10s */}
              <button
                onClick={() => seekTo(currentTime + 10)}
                className="p-2.5 rounded-full text-[#FAF8F5]/70 hover:text-[#D4AF37] hover:bg-[#162136] transition-all cursor-pointer"
                title="Forward 10 seconds"
                aria-label="Forward 10 seconds"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Row: Volume Slider & Optional MP3 File Selector */}
            <div className="pt-3 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              {/* Volume Slider */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={toggleMute}
                  className="text-[#D4AF37] hover:text-[#FFF3B0] transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-24 h-1 bg-[#1C283E] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                  title="Volume"
                />
                <span className="text-[10px] text-[#FAF8F5]/60 font-montserrat w-7 text-right">
                  {isMuted ? '0%' : `${volume}%`}
                </span>
              </div>

              {/* Choose / Replace with Local MP3 File */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="audio/mp3,audio/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#142038] hover:bg-[#1C2C4E] border border-[#D4AF37]/35 text-[#D4AF37] text-[11px] font-cinzel transition-all cursor-pointer"
                  title="Choose local MP3 file from your device"
                >
                  {customFileName ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="truncate max-w-[130px]">MP3 Loaded</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Use Own MP3</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
