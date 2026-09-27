// Photo storage service: manages permanent static couple photos and local caching
import { CouplePhoto } from '../types';

export const STATIC_COUPLE_PHOTO = '/assets/couple_photo.jpg';

export const DEFAULT_PHOTOS: CouplePhoto[] = [
  {
    id: 'cover',
    title: 'Valakappu Invitation Cover',
    subtitle: 'Anasma & Safeel',
    caption: 'Celebrating new beginnings & honoring parents-to-be on Sunday, 04th October 2026.',
    url: '/assets/couple_photo.jpg',
    defaultVisual: 'couple_cover',
  },
  {
    id: 'hero',
    title: 'Anasma & Safeel',
    subtitle: 'The Parents-To-Be',
    caption: 'Celebrating new beginnings & the sweetest blessing on the way.',
    url: '/assets/couple_photo.jpg',
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

const LOCAL_STORAGE_KEY = 'valakappu_custom_photos_v2';
const LISTENERS: Array<() => void> = [];

// Pre-populated static in-memory photos: ZERO network latency on initial render
const MEMORY_PHOTOS: Record<string, string> = {
  cover: '/assets/couple_photo.jpg',
  hero: '/assets/couple_photo.jpg',
  ritual: '/assets/ritual.jpg',
  felicitation: '/assets/felicitation.jpg',
  dusk: '/assets/dusk.jpg',
  venue: '/assets/venue.jpg',
};

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
        if (!v.startsWith('data:image/') || v.length < 80000) {
          safeData[k] = v;
        }
      }
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(safeData));
  } catch {
    // ignore
  }
}

// Zero-latency synchronous initialization: reads local storage if present, no API blocking
export function initPhotosSync(): Promise<Record<string, string>> {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const localData = JSON.parse(raw);
      Object.assign(MEMORY_PHOTOS, localData);
    }
  } catch {
    // ignore
  }
  return Promise.resolve({ ...MEMORY_PHOTOS });
}

export function getCustomPhoto(photoId: string): string {
  // 1. Check in-memory store
  if (MEMORY_PHOTOS[photoId]) {
    return MEMORY_PHOTOS[photoId];
  }

  // 2. Check localStorage
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
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

  // 3. Fallback to static local asset
  const defaultItem = DEFAULT_PHOTOS.find((p) => p.id === photoId);
  return defaultItem?.url || '/assets/couple_photo.jpg';
}

export async function saveCustomPhoto(photoId: string, photoDataUrl: string): Promise<boolean> {
  try {
    MEMORY_PHOTOS[photoId] = photoDataUrl;
    notifyListeners();

    let current: Record<string, string> = {};
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        current = JSON.parse(raw);
      }
    } catch {
      current = {};
    }
    current[photoId] = photoDataUrl;
    safeSetLocalStorage(current);

    return true;
  } catch (e) {
    console.error('Failed to save photo:', e);
    return true;
  }
}

export async function resetCustomPhotos(): Promise<boolean> {
  try {
    Object.keys(MEMORY_PHOTOS).forEach((k) => delete MEMORY_PHOTOS[k]);
    MEMORY_PHOTOS['cover'] = '/assets/couple_photo.jpg';
    MEMORY_PHOTOS['hero'] = '/assets/couple_photo.jpg';
    MEMORY_PHOTOS['ritual'] = '/assets/ritual.jpg';
    MEMORY_PHOTOS['felicitation'] = '/assets/felicitation.jpg';
    MEMORY_PHOTOS['dusk'] = '/assets/dusk.jpg';
    MEMORY_PHOTOS['venue'] = '/assets/venue.jpg';

    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // ignore
    }
    notifyListeners();
    return true;
  } catch {
    return false;
  }
}
