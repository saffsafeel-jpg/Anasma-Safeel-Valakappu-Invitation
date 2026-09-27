import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

const YOUTUBE_VIDEO_ID = 'vSJN0JFF0yo';
export const SONG_TITLE = 'Azhagu Kutti Chellam';
export const SONG_ARTIST = 'Ved Shanker · Shakthisree Gopalan';
export const TOTAL_DURATION_SEC = 225;

interface MusicContextType {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  songTitle: string;
  songArtist: string;
  customFileName: string | null;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  seekTo: (sec: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  setCustomFile: (file: File) => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

export const MusicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolumeState] = useState(90);
  const [isMuted, setIsMuted] = useState(false);
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);
  const [customFileName, setCustomFileName] = useState<string | null>(null);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressTimerRef = useRef<number | null>(null);
  const hasUserInteracted = useRef(false);

  // Send command to hidden YouTube iframe
  const sendYouTubeCommand = (func: string, args: string | number = '') => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func, args }),
          '*'
        );
      } catch {
        // safe postMessage
      }
    }
  };

  const play = () => {
    hasUserInteracted.current = true;
    setIsPlaying(true);

    if (customAudioUrl && audioRef.current) {
      audioRef.current.play().catch(() => {});
    } else {
      sendYouTubeCommand('playVideo');
      sendYouTubeCommand('unMute');
      sendYouTubeCommand('setVolume', isMuted ? 0 : volume);
    }
  };

  const pause = () => {
    setIsPlaying(false);

    if (audioRef.current) {
      audioRef.current.pause();
    }
    sendYouTubeCommand('pauseVideo');
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const seekTo = (newSeconds: number) => {
    const clamped = Math.max(0, Math.min(newSeconds, TOTAL_DURATION_SEC));
    setCurrentTime(clamped);

    if (customAudioUrl && audioRef.current) {
      audioRef.current.currentTime = clamped;
    } else {
      sendYouTubeCommand('seekTo', clamped);
    }
  };

  const setVolume = (newVol: number) => {
    setVolumeState(newVol);
    setIsMuted(newVol === 0);

    if (customAudioUrl && audioRef.current) {
      audioRef.current.volume = newVol / 100;
      audioRef.current.muted = newVol === 0;
    } else {
      sendYouTubeCommand('setVolume', newVol);
      if (newVol === 0) {
        sendYouTubeCommand('mute');
      } else {
        sendYouTubeCommand('unMute');
      }
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(volume || 80);
    } else {
      setIsMuted(true);
      if (customAudioUrl && audioRef.current) {
        audioRef.current.muted = true;
      } else {
        sendYouTubeCommand('mute');
      }
    }
  };

  const setCustomFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setCustomAudioUrl(url);
    setCustomFileName(file.name);
    sendYouTubeCommand('pauseVideo');

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 200);
  };

  // Progress timer for UI scrub bar
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => (prev >= TOTAL_DURATION_SEC ? 0 : prev + 1));
      }, 1000);
    } else {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    }

    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [isPlaying]);

  // ================= AUTOMATIC PLAYBACK FROM COVER PAGE =================
  useEffect(() => {
    // 1. Immediately attempt autoplay on load
    const timer = setTimeout(() => {
      play();
    }, 400);

    // 2. Mobile/Browser Autoplay Safeguard:
    // Many mobile browsers (iOS Safari, Android Chrome) block unmuted audio until the user touches or clicks anywhere.
    // We register one-time listeners so music starts smoothly on the very first touch/click anywhere on the cover page!
    const handleGesture = () => {
      play();
      cleanupGestures();
    };

    const cleanupGestures = () => {
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('pointerdown', handleGesture);
      window.removeEventListener('scroll', handleGesture);
    };

    window.addEventListener('click', handleGesture, { passive: true });
    window.addEventListener('touchstart', handleGesture, { passive: true });
    window.addEventListener('pointerdown', handleGesture, { passive: true });
    window.addEventListener('scroll', handleGesture, { passive: true });

    return () => {
      clearTimeout(timer);
      cleanupGestures();
    };
  }, []);

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        currentTime,
        duration: TOTAL_DURATION_SEC,
        volume,
        isMuted,
        songTitle: SONG_TITLE,
        songArtist: SONG_ARTIST,
        customFileName,
        play,
        pause,
        togglePlay,
        seekTo,
        setVolume,
        toggleMute,
        setCustomFile,
      }}
    >
      {/* Hidden YouTube audio player (ZERO VIDEO DISPLAYED, pure background audio) */}
      <iframe
        ref={iframeRef}
        id="global-valakappu-audio-iframe"
        src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&autoplay=1&playsinline=1&rel=0&modestbranding=1&controls=0&origin=${
          typeof window !== 'undefined' ? window.location.origin : ''
        }`}
        title="Background Audio Stream"
        allow="autoplay; encrypted-media"
        className="pointer-events-none opacity-0 fixed -top-[9999px] -left-[9999px] w-1 h-1"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* HTML5 Audio element for custom uploaded MP3 */}
      {customAudioUrl && (
        <audio
          ref={audioRef}
          src={customAudioUrl}
          onEnded={() => setIsPlaying(false)}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
            }
          }}
          className="hidden"
        />
      )}

      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error('useMusic must be used within MusicProvider');
  }
  return ctx;
};
