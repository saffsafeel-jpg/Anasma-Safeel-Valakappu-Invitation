// Photo storage service: manages permanent couple photos and user custom uploads
import { CouplePhoto } from '../types';

export const STATIC_COVER_PHOTO = '/assets/cover.jpg';
export const STATIC_HERO_PHOTO = '/assets/hero.jpg';

export const DEFAULT_PHOTOS: CouplePhoto[] = [
  {
    id: 'cover',
    title: 'Valakappu Invitation Cover',
    subtitle: 'Anasma & Safeel',
    caption: 'Celebrating new beginnings & honoring parents-to-be on Sunday, 04th October 2026.',
    url: '/assets/cover.jpg',
    defaultVisual: 'couple_cover',
  },
  {
    id: 'hero',
    title: 'Anasma & Safeel',
    subtitle: 'The Parents-To-Be',
    caption: 'Celebrating new beginnings & the sweetest blessing on the way.',
    url: '/assets/hero.jpg',
    defaultVisual: 'couple_hero',
  },
  {
    id: 'ritual',
    title: 'Sacred Valakappu Ritual',
    subtitle: 'Bangles of Blessing & Protection',
    caption: 'Adorning the mother-to-be with auspicious bangles for health, protection and joy.',
    url: '/assets/ritual.jpg',
    defaultVisual: 'bangles_ritual',
  },
  {
    id: 'felicitation',
    title: 'Joy & Felicitations',
    subtitle: 'Cherished Memories',
    caption: 'Smiling hearts, warm embraces, and endless blessings from family and friends.',
    url: '/assets/felicitation.jpg',
    defaultVisual: 'felicitation',
  },
  {
    id: 'dusk',
    title: 'Sunset Into Dusk',
    subtitle: 'A Lifetime of Love',
    caption: 'Two hearts beating in harmony under the golden evening sky, awaiting our little miracle.',
    url: '/assets/dusk.jpg',
    defaultVisual: 'dusk_embrace',
  },
  {
    id: 'venue',
    title: 'Udaya Resort, Palakkad',
    subtitle: 'West Yakkara, Kerala',
    caption: 'A serene and elegant resort backdrop for this sacred celebration.',
    url: '/assets/venue.jpg',
    defaultVisual: 'venue',
  },
];

const STORAGE_KEYS = [
  'valakappu_custom_photos_v1',
  'valakappu_custom_photos_v2',
  'valakappu_custom_photos',
];
const PRIMARY_KEY = 'valakappu_custom_photos_v1';
const LISTENERS: Array<() => void> = [];

// Pre-populated in-memory photos: EXACT images as configured, ZERO network latency
const MEMORY_PHOTOS: Record<string, string> = {
  cover: '/assets/cover.jpg',
  hero: '/assets/hero.jpg',
  ritual: '/assets/ritual.jpg',
  felicitation: '/assets/felicitation.jpg',
  dusk: '/assets/dusk.jpg',
  venue: '/assets/venue.jpg',
};

// Check all storage versions on startup
function readFromAllStorage() {
  if (typeof window === 'undefined') return;
  for (const k of STORAGE_KEYS) {
    try {
      const raw = localStorage.getItem(k);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          Object.assign(MEMORY_PHOTOS, parsed);
        }
      }
    } catch {
      // ignore
    }
  }
}

// Read storage immediately on script load
readFromAllStorage();

export function subscribeToPhotos(callback: () => void) {
  LISTENERS.push(callback);
  return () => {
    const idx = LISTENERS.indexOf(callback);
    if (idx !== -1) LISTENERS.splice(idx, 1);
  };
}

function notifyListeners() {
  LISTENERS.forEach((fn) => {
    try {
      fn();
    } catch (e) {
      console.error(e);
    }
  });
}

function safeSetLocalStorage(data: Record<string, string>) {
  try {
    const safeData: Record<string, string> = {};
    for (const [k, v] of Object.entries(data)) {
      if (typeof v === 'string') {
        if (!v.startsWith('data:image/') || v.length < 500000) {
          safeData[k] = v;
        }
      }
    }
    const jsonStr = JSON.stringify(safeData);
    STORAGE_KEYS.forEach((k) => {
      try {
        localStorage.setItem(k, jsonStr);
      } catch {
        // ignore
      }
    });
  } catch {
    // ignore
  }
}

// Background sync: never blocks initial paint
export function initPhotosSync(): Promise<Record<string, string>> {
  readFromAllStorage();

  // Background fetch from server photos without blocking
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      fetch('/api/photos')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.photos && typeof data.photos === 'object') {
            let hasNew = false;
            for (const [k, v] of Object.entries(data.photos)) {
              if (v && typeof v === 'string' && MEMORY_PHOTOS[k] !== v) {
                MEMORY_PHOTOS[k] = v;
                hasNew = true;
              }
            }
            if (hasNew) {
              notifyListeners();
            }
          }
        })
        .catch(() => {});
    }, 1000);
  }

  return Promise.resolve({ ...MEMORY_PHOTOS });
}

export function getCustomPhoto(photoId: string): string {
  // 1. Check in-memory store
  if (MEMORY_PHOTOS[photoId]) {
    return MEMORY_PHOTOS[photoId];
  }

  // 2. Check localStorage keys
  for (const k of STORAGE_KEYS) {
    try {
      const raw = localStorage.getItem(k);
      if (raw) {
        const obj = JSON.parse(raw);
        if (obj[photoId]) {
          MEMORY_PHOTOS[photoId] = obj[photoId];
          return obj[photoId];
        }
      }
    } catch {
      // ignore
    }
  }

  // 3. Fallback to default
  const defaultItem = DEFAULT_PHOTOS.find((p) => p.id === photoId);
  return defaultItem?.url || (photoId === 'cover' ? '/assets/cover.jpg' : '/assets/hero.jpg');
}

export async function saveCustomPhoto(photoId: string, photoDataUrl: string): Promise<boolean> {
  try {
    MEMORY_PHOTOS[photoId] = photoDataUrl;
    notifyListeners();

    let current: Record<string, string> = {};
    try {
      const raw = localStorage.getItem(PRIMARY_KEY);
      if (raw) {
        current = JSON.parse(raw);
      }
    } catch {
      current = {};
    }
    current[photoId] = photoDataUrl;
    safeSetLocalStorage(current);

    // Also persist to server in background
    fetch('/api/photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photoId, photoData: photoDataUrl }),
    }).catch(() => {});

    return true;
  } catch (e) {
    console.error('Failed to save photo:', e);
    return true;
  }
}

export async function resetCustomPhotos(): Promise<boolean> {
  try {
    Object.keys(MEMORY_PHOTOS).forEach((k) => delete MEMORY_PHOTOS[k]);
    MEMORY_PHOTOS['cover'] = '/assets/cover.jpg';
    MEMORY_PHOTOS['hero'] = '/assets/hero.jpg';
    MEMORY_PHOTOS['ritual'] = '/assets/ritual.jpg';
    MEMORY_PHOTOS['felicitation'] = '/assets/felicitation.jpg';
    MEMORY_PHOTOS['dusk'] = '/assets/dusk.jpg';
    MEMORY_PHOTOS['venue'] = '/assets/venue.jpg';

    STORAGE_KEYS.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch {
        // ignore
      }
    });

    fetch('/api/photos', { method: 'DELETE' }).catch(() => {});
    notifyListeners();
    return true;
  } catch {
    return false;
  }
}
