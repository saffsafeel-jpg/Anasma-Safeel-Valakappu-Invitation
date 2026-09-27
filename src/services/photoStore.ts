// Photo storage service: manages custom uploaded couple photos with server persistence and local caching
import { CouplePhoto } from '../types';

export const DEFAULT_PHOTOS: CouplePhoto[] = [
  {
    id: 'cover',
    title: 'Valakappu Invitation Cover',
    subtitle: 'Anasma & Safeel',
    caption: 'Celebrating new beginnings & honoring parents-to-be on Sunday, 04th October 2026.',
    url: 'https://i.pinimg.com/736x/d1/0a/0a/d10a0a2ea93b0b9b586ba735814113c4.jpg?nii=t',
    defaultVisual: 'couple_cover',
  },
  {
    id: 'hero',
    title: 'Anasma & Safeel',
    subtitle: 'The Parents-To-Be',
    caption: 'Celebrating new beginnings & the sweetest blessing on the way.',
    url: 'https://i.pinimg.com/736x/83/86/dc/8386dcfd42c06165cce0b58a809f6049.jpg?nii=t',
    defaultVisual: 'couple_hero',
  },
  {
    id: 'ritual',
    title: 'Sacred Valakappu Ritual',
    subtitle: 'Bangles of Blessing & Protection',
    caption: 'Adorning the mother-to-be with auspicious bangles for health, protection and joy.',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    defaultVisual: 'bangles_ritual',
  },
  {
    id: 'felicitation',
    title: 'Joy & Felicitations',
    subtitle: 'Cherished Memories',
    caption: 'Smiling hearts, warm embraces, and endless blessings from family and friends.',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    defaultVisual: 'felicitation',
  },
  {
    id: 'dusk',
    title: 'Sunset Into Dusk',
    subtitle: 'A Lifetime of Love',
    caption: 'Two hearts beating in harmony under the golden evening sky, awaiting our little miracle.',
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80',
    defaultVisual: 'dusk_embrace',
  },
  {
    id: 'venue',
    title: 'Udaya Resort, Palakkad',
    subtitle: 'West Yakkara, Kerala',
    caption: 'A serene and elegant resort backdrop for this sacred celebration.',
    url: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80',
    defaultVisual: 'venue',
  },
];

const LOCAL_STORAGE_KEY = 'valakappu_custom_photos_v1';
const LISTENERS: Array<() => void> = [];
const MEMORY_PHOTOS: Record<string, string> = {};

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

// Safely save to localStorage without throwing QuotaExceededError
function safeSetLocalStorage(data: Record<string, string>) {
  try {
    const safeData: Record<string, string> = {};
    for (const [k, v] of Object.entries(data)) {
      if (typeof v === 'string') {
        // Only keep URLs or small thumbnails in localStorage (< 80KB)
        if (!v.startsWith('data:image/') || v.length < 80000) {
          safeData[k] = v;
        }
      }
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(safeData));
  } catch (quotaError) {
    console.warn('localStorage quota warning, continuing in memory:', quotaError);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}

// Fetch photos from server & sync
export async function initPhotosSync(): Promise<Record<string, string>> {
  let localData: Record<string, string> = {};
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      localData = JSON.parse(raw);
      Object.assign(MEMORY_PHOTOS, localData);
    }
  } catch (e) {
    console.warn('Could not read photos from localStorage', e);
  }

  try {
    const res = await fetch('/api/photos');
    if (res.ok) {
      const data = await res.json();
      if (data.photos && Object.keys(data.photos).length > 0) {
        const merged = { ...localData, ...data.photos };
        Object.assign(MEMORY_PHOTOS, merged);
        safeSetLocalStorage(merged);
        notifyListeners();
        return merged;
      }
    }
  } catch (e) {
    console.warn('Could not fetch photos from server', e);
  }

  return { ...MEMORY_PHOTOS };
}

export function getCustomPhoto(photoId: string): string | null {
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
  } catch (e) {
    console.warn(e);
  }

  // 3. Check default photos
  const defaultItem = DEFAULT_PHOTOS.find((p) => p.id === photoId);
  return defaultItem?.url || null;
}

export async function saveCustomPhoto(photoId: string, photoDataUrl: string): Promise<boolean> {
  try {
    // 1. Always update in-memory cache and notify UI immediately
    MEMORY_PHOTOS[photoId] = photoDataUrl;
    notifyListeners();

    // 2. Safely attempt local storage persistence
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

    // 3. Persist to server (handles large data and survives browser cache clear)
    try {
      await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoId, photoData: photoDataUrl }),
      });
    } catch (err) {
      console.warn('Server photo sync failed:', err);
    }

    return true;
  } catch (e) {
    console.error('Failed to save photo:', e);
    // Since in-memory was updated, still return true to keep user flow smooth
    return true;
  }
}

export async function resetCustomPhotos(): Promise<boolean> {
  try {
    Object.keys(MEMORY_PHOTOS).forEach((k) => delete MEMORY_PHOTOS[k]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // ignore
    }
    notifyListeners();

    fetch('/api/photos', { method: 'DELETE' }).catch((err) =>
      console.warn('Server photo reset failed:', err)
    );
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
