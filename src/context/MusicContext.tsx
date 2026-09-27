import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

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

  const ytPlayerRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressTimerRef = useRef<number | null>(null);
  const pendingPlayRef = useRef(false);

  // Initialize YouTube IFrame Player
  useEffect(() => {
    let checkInterval: number | null = null;

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return false;
      const targetEl = document.getElementById('valakappu-youtube-player-instance');
      if (!targetEl) return false;

      try {
        ytPlayerRef.current = new window.YT.Player('valakappu-youtube-player-instance', {
          videoId: YOUTUBE_VIDEO_ID,
          width: '280',
          height: '160',
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            origin: typeof window !== 'undefined' ? window.location.origin : '',
          },
          events: {
            onReady: (event: any) => {
              ytPlayerRef.current = event.target;
              if (pendingPlayRef.current) {
                pendingPlayRef.current = false;
                try {
                  event.target.unMute();
                  event.target.setVolume(volume);
                  event.target.playVideo();
                } catch {
                  // ignore
                }
              }
            },
            onStateChange: (event: any) => {
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
              if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2 || event.data === 0) {
                setIsPlaying(false);
              }
            },
            onError: (err: any) => {
              console.warn('YT Player notice:', err);
            },
          },
        });
        return true;
      } catch (err) {
        console.warn('Error creating YT player:', err);
        return false;
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevCallback === 'function') prevCallback();
        initPlayer();
      };

      // Fallback check in case script loaded before callback assignment
      checkInterval = window.setInterval(() => {
        if (window.YT && window.YT.Player && !ytPlayerRef.current) {
          if (initPlayer() && checkInterval) {
            clearInterval(checkInterval);
          }
        }
      }, 300);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, []);

  const play = () => {
    setIsPlaying(true);

    if (customAudioUrl && audioRef.current) {
      audioRef.current.play().catch(() => {});
      return;
    }

    if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
      try {
        ytPlayerRef.current.unMute();
        ytPlayerRef.current.setVolume(isMuted ? 0 : volume);
        ytPlayerRef.current.playVideo();
      } catch {
        // safe play
      }
    } else {
      pendingPlayRef.current = true;
    }
  };

  const pause = () => {
    setIsPlaying(false);
    pendingPlayRef.current = false;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
      try {
        ytPlayerRef.current.pauseVideo();
      } catch {
        // safe pause
      }
    }
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
    } else if (ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === 'function') {
      try {
        ytPlayerRef.current.seekTo(clamped, true);
      } catch {
        // safe seek
      }
    }
  };

  const setVolume = (newVol: number) => {
    setVolumeState(newVol);
    setIsMuted(newVol === 0);

    if (customAudioUrl && audioRef.current) {
      audioRef.current.volume = newVol / 100;
      audioRef.current.muted = newVol === 0;
    } else if (ytPlayerRef.current) {
      try {
        ytPlayerRef.current.setVolume(newVol);
        if (newVol === 0) {
          ytPlayerRef.current.mute();
        } else {
          ytPlayerRef.current.unMute();
        }
      } catch {
        // safe volume
      }
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(volume || 80);
      if (ytPlayerRef.current && typeof ytPlayerRef.current.unMute === 'function') {
        try {
          ytPlayerRef.current.unMute();
        } catch {}
      }
    } else {
      setIsMuted(true);
      if (customAudioUrl && audioRef.current) {
        audioRef.current.muted = true;
      }
      if (ytPlayerRef.current && typeof ytPlayerRef.current.mute === 'function') {
        try {
          ytPlayerRef.current.mute();
        } catch {}
      }
    }
  };

  const setCustomFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setCustomAudioUrl(url);
    setCustomFileName(file.name);

    if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
      try {
        ytPlayerRef.current.pauseVideo();
      } catch {}
    }

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 200);
  };

  // Sync real-time progress from YT player or HTML5 audio
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = window.setInterval(() => {
        if (customAudioUrl && audioRef.current) {
          setCurrentTime(Math.floor(audioRef.current.currentTime));
        } else if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === 'function') {
          try {
            const t = Math.floor(ytPlayerRef.current.getCurrentTime());
            if (!isNaN(t) && t >= 0) {
              setCurrentTime(t);
            }
          } catch {
            // ignore
          }
        } else {
          setCurrentTime((prev) => (prev >= TOTAL_DURATION_SEC ? 0 : prev + 1));
        }
      }, 800);
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
  }, [isPlaying, customAudioUrl]);

  // One-time gesture trigger to satisfy mobile browser autoplay policies
  useEffect(() => {
    const handleGesture = () => {
      play();
      cleanupGestures();
    };

    const cleanupGestures = () => {
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
    };

    window.addEventListener('click', handleGesture, { passive: true, once: true });
    window.addEventListener('touchstart', handleGesture, { passive: true, once: true });

    return () => cleanupGestures();
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
      {/* 
        Official YouTube IFrame Player Instance
        Rendered with real dimensions (280x160) and 0.01 opacity so browsers never throttle/suspend audio,
        pinned off-viewport and non-interactive to user clicks.
      */}
      <div
        className="fixed -bottom-4 -left-4 pointer-events-none overflow-hidden z-0"
        style={{ width: '280px', height: '160px', opacity: 0.01 }}
        aria-hidden="true"
      >
        <div id="valakappu-youtube-player-instance" />
      </div>

      {/* HTML5 Audio element for custom uploaded MP3 files */}
      {customAudioUrl && (
        <audio
          ref={audioRef}
          src={customAudioUrl}
          preload="auto"
          onEnded={() => setIsPlaying(false)}
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
