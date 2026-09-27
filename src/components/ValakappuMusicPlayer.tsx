import React from 'react';
import { useMusic } from '../context/MusicContext';
import { Disc3, Play, Pause } from 'lucide-react';

export const ValakappuMusicPlayer: React.FC = () => {
  const { isPlaying, togglePlay, songTitle } = useMusic();

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none">
      <button
        onClick={togglePlay}
        className={`group flex items-center gap-3 px-4 py-2.5 rounded-full border shadow-[0_8px_30px_rgba(212,175,55,0.45)] backdrop-blur-md transition-all duration-300 cursor-pointer ${
          isPlaying
            ? 'bg-gradient-to-r from-[#E5C365] via-[#FBF5B7] to-[#C59B35] text-[#0B1325] border-[#FFF3B0] scale-100 hover:scale-[1.03] active:scale-[0.98]'
            : 'bg-[#0E1626]/95 text-[#D4AF37] border-[#D4AF37]/50 hover:bg-[#142038] hover:border-[#D4AF37]'
        }`}
        title={isPlaying ? 'Pause Azhagu Kutti Chellam' : 'Play Azhagu Kutti Chellam'}
        aria-label="Toggle Azhagu Kutti Chellam celebration music"
      >
        {/* Left Icon: Vinyl Disc or Radio Icon */}
        <div className="relative flex items-center justify-center">
          <Disc3
            className={`w-6 h-6 transition-transform duration-700 ${
              isPlaying ? 'animate-[spin_4s_linear_infinite] text-[#0B1325]' : 'text-[#D4AF37]'
            }`}
          />
        </div>

        {/* Center Labels & Live Dancing Equalizer */}
        <div className="flex flex-col text-left pr-1">
          <div className="flex items-center gap-2">
            <span
              className={`font-cinzel text-xs font-black tracking-[0.16em] uppercase ${
                isPlaying ? 'text-[#0B1325]' : 'text-[#D4AF37]'
              }`}
            >
              {isPlaying ? 'Music Playing' : 'Play Music'}
            </span>

            {/* Dancing Equalizer Bars */}
            {isPlaying && (
              <span className="flex items-end gap-[2px] h-3.5 pb-0.5">
                <span className="w-[2.5px] bg-[#0B1325] rounded-full animate-[bounce_0.8s_infinite] h-2.5" />
                <span className="w-[2.5px] bg-[#0B1325] rounded-full animate-[bounce_1.2s_infinite] h-3.5" />
                <span className="w-[2.5px] bg-[#0B1325] rounded-full animate-[bounce_0.6s_infinite] h-2" />
              </span>
            )}
          </div>

          <span
            className={`text-[10px] font-montserrat truncate max-w-[140px] ${
              isPlaying ? 'text-[#0B1325]/85 font-medium' : 'text-[#FAF8F5]/70'
            }`}
          >
            {songTitle}
          </span>
        </div>

        {/* Right Action Button Pill */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isPlaying
              ? 'bg-[#0B1325]/20 text-[#0B1325] hover:bg-[#0B1325]/30'
              : 'bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/35'
          }`}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </div>
      </button>
    </div>
  );
};
