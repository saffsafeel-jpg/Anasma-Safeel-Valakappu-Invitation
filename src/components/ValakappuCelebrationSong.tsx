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
      className="relative w-full py-12 px-5 bg-gradient-to-b from-[#FAF5EE] via-[#F6ECE0] to-[#EFE4D6] text-[#2E1E14] overflow-hidden"
    >
      {/* Ambient background gold/peach glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(226,149,120,0.18)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-[440px] mx-auto space-y-6 text-center">
        {/* Header Pill */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F5E6D8] border border-[#E8CDB5] text-[#8C4E3A] text-[11px] font-cinzel tracking-widest uppercase shadow-sm font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#D97D64]" />
          <span>Celebration Music &amp; Audio</span>
        </div>

        {/* Section Heading */}
        <div className="space-y-1">
          <h2 className="font-cursive text-4xl sm:text-5xl gold-gradient-text py-0.5">
            Azhagu Kutti Chellam
          </h2>
          <p className="font-serif italic text-sm text-[#8C5835] tracking-wide font-medium">
            {songArtist}
          </p>
        </div>

        {/* ================= PURE AUDIO PLAYER CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full rounded-3xl p-[1px] bg-gradient-to-b from-[#E2A694]/60 via-[#E8C7B8]/40 to-[#E2A694]/30 shadow-[0_16px_40px_rgba(100,60,40,0.08)]"
        >
          <div className="relative w-full rounded-3xl bg-[#FFFDF9] border border-[#E8DACB] p-6 space-y-6">
            {/* Centerpiece: Golden Vinyl Record & Concentric Audio Grooves */}
            <div className="relative flex flex-col items-center justify-center pt-2">
              <div
                className={`relative w-40 h-40 sm:w-44 sm:h-44 rounded-full flex items-center justify-center p-3 bg-gradient-to-br from-[#EADCC9] via-[#D8C2AA] to-[#CBB096] border-2 border-[#D4A373]/60 shadow-[0_4px_25px_rgba(217,125,100,0.2)] transition-transform duration-1000 ${
                  isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''
                }`}
              >
                {/* Concentric Grooves */}
                <div className="absolute inset-3 rounded-full border border-[#8C5835]/15 pointer-events-none" />
                <div className="absolute inset-6 rounded-full border border-[#8C5835]/10 pointer-events-none" />
                <div className="absolute inset-9 rounded-full border border-[#8C5835]/15 pointer-events-none" />

                {/* Center Label Spindle */}
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#D97D64] via-[#F7D6C8] to-[#C86D58] flex flex-col items-center justify-center shadow-md border border-white/60 text-[#2E1E14]">
                  <Disc3 className="w-6 h-6 text-[#2E1E14]" />
                  <span className="text-[7px] font-cinzel font-bold tracking-tighter uppercase mt-0.5 text-[#2E1E14]">
                    A &amp; S 2026
                  </span>
                  <div className="absolute w-2 h-2 rounded-full bg-white border border-[#2E1E14]/30" />
                </div>
              </div>

              {/* Live Dancing Equalizer Waveform */}
              <div className="flex items-end justify-center gap-1.5 h-7 mt-5 px-4 w-full">
                {[1, 2, 3, 4, 1, 3, 2, 4, 2, 1, 4, 3, 1, 2, 4, 3, 1, 2, 3, 4].map((variant, i) => (
                  <span
                    key={i}
                    className={`w-1 h-6 rounded-full bg-gradient-to-t from-[#D97D64] via-[#E29578] to-[#C59B27] ${
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
                <Music className="w-4 h-4 text-[#D97D64]" />
                <span className="font-cinzel text-base font-bold text-[#2E1E14] tracking-wider">
                  {customFileName ? customFileName.replace(/\.[^/.]+$/, '') : songTitle}
                </span>
              </div>
              <p className="font-montserrat text-xs text-[#8C5835] font-medium">
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
                  className="w-full h-1.5 bg-[#EAE0D3] rounded-lg appearance-none cursor-pointer accent-[#D97D64]"
                />
              </div>
              <div className="flex justify-between items-center text-[11px] font-montserrat text-[#6E5448] font-medium px-0.5">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Primary Controls */}
            <div className="flex items-center justify-center gap-5 pt-1">
              {/* Skip backward 10s */}
              <button
                onClick={() => seekTo(Math.max(0, currentTime - 10))}
                className="p-2.5 rounded-full bg-[#F5E6D8] border border-[#E8CDB5] text-[#8C5835] hover:text-[#2E1E14] active:scale-95 transition-all cursor-pointer shadow-sm"
                title="Rewind 10 seconds"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Master Play / Pause Button */}
              <button
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#D97D64] to-[#C86D58] text-white flex items-center justify-center shadow-[0_6px_25px_rgba(217,125,100,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#FFF0E6]"
                title={isPlaying ? 'Pause celebration music' : 'Play celebration music'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-white text-white" />
                ) : (
                  <Play className="w-6 h-6 fill-white text-white ml-0.5" />
                )}
              </button>

              {/* Skip forward 10s */}
              <button
                onClick={() => seekTo(Math.min(duration, currentTime + 10))}
                className="p-2.5 rounded-full bg-[#F5E6D8] border border-[#E8CDB5] text-[#8C5835] hover:text-[#2E1E14] active:scale-95 transition-all cursor-pointer shadow-sm"
                title="Fast forward 10 seconds"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            {/* Volume & Custom Audio Controls Bar */}
            <div className="pt-2 border-t border-[#E8DACB] flex items-center justify-between text-xs px-1">
              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="text-[#8C5835] hover:text-[#D97D64] transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-red-500" />
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
                  className="w-24 h-1 bg-[#EAE0D3] rounded-lg appearance-none cursor-pointer accent-[#D97D64]"
                  title="Volume"
                />
                <span className="text-[10px] text-[#6E5448] font-montserrat w-7 text-right font-medium">
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5E6D8] hover:bg-[#EFE0CE] border border-[#E8CDB5] text-[#8C5835] text-[11px] font-cinzel transition-all cursor-pointer font-semibold shadow-sm"
                  title="Choose local MP3 file from your device"
                >
                  {customFileName ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="truncate max-w-[130px]">MP3 Loaded</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5 text-[#D97D64]" />
                      <span>Use Own MP3</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Link to Official Music Track */}
            <div className="pt-1 text-center">
              <a
                href="https://www.youtube.com/watch?v=vSJN0JFF0yo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] text-[#8C5835] hover:text-[#D97D64] transition-colors underline underline-offset-4 decoration-[#D97D64]/40 font-medium"
              >
                <span>Listen to Full Original Track on YouTube</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
