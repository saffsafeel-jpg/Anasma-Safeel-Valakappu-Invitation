import React from 'react';
import { useMusic } from '../context/MusicContext';
import { Disc3, Play, Pause } from 'lucide-react';

export const ValakappuMusicPlayer: React.FC = () => {
  const { isPlaying, togglePlay, songTitle } = useMusic();

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none">
      <button
        onClick={togglePlay}
        className={`group flex items-center gap-3 px-4 py-2.5 rounded-full border shadow-[0_8px_30px_rgba(120,60,30,0.18)] backdrop-blur-md transition-all duration-300 cursor-pointer ${
          isPlaying
            ? 'bg-gradient-to-r from-[#D97D64] via-[#E29578] to-[#C86D58] text-white border-[#FFF0E6] scale-100 hover:scale-[1.03] active:scale-[0.98]'
            : 'bg-white/95 text-[#8C5835] border-[#E8DACB] hover:bg-[#FAF5EE] hover:border-[#D97D64]/60'
        }`}
        title={isPlaying ? 'Pause Azhagu Kutti Chellam' : 'Play Azhagu Kutti Chellam'}
        aria-label="Toggle Azhagu Kutti Chellam celebration music"
      >
        {/* Left Icon: Vinyl Disc */}
        <div className="relative flex items-center justify-center">
          <Disc3
            className={`w-6 h-6 transition-transform duration-700 ${
              isPlaying ? 'animate-[spin_4s_linear_infinite] text-white' : 'text-[#D97D64]'
            }`}
          />
        </div>

        {/* Center Labels & Live Dancing Equalizer */}
        <div className="flex flex-col text-left pr-1">
          <div className="flex items-center gap-2">
            <span
              className={`font-cinzel text-xs font-bold tracking-[0.16em] uppercase ${
                isPlaying ? 'text-white' : 'text-[#2E1E14]'
              }`}
            >
              {isPlaying ? 'Music Playing' : 'Play Music'}
            </span>

            {/* Dancing Equalizer Bars */}
            {isPlaying && (
              <span className="flex items-end gap-[2px] h-3.5 pb-0.5">
                <span className="w-[2.5px] bg-white rounded-full animate-[bounce_0.8s_infinite] h-2.5" />
                <span className="w-[2.5px] bg-white rounded-full animate-[bounce_1.2s_infinite] h-3.5" />
                <span className="w-[2.5px] bg-white rounded-full animate-[bounce_0.6s_infinite] h-2" />
              </span>
            )}
          </div>

          <span
            className={`text-[10px] font-montserrat truncate max-w-[140px] font-medium ${
              isPlaying ? 'text-white/90' : 'text-[#6E5448]'
            }`}
          >
            {songTitle}
          </span>
        </div>

        {/* Right Action Button Pill */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isPlaying
              ? 'bg-white/20 text-white hover:bg-white/30'
              : 'bg-[#F5E6D8] text-[#D97D64] hover:bg-[#EFE0CE]'
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
