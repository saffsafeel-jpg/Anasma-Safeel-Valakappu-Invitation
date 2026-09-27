export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  iconName: 'sparkles' | 'ring' | 'glass' | 'utensils';
}

export interface RSVPFormData {
  fullName: string;
  attendance: 'accept' | 'decline';
  guestsCount: number;
  dietary?: string;
  wishes?: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export type PhotoVisualType =
  | 'couple_cover'
  | 'couple_hero'
  | 'bangles_ritual'
  | 'dusk_embrace'
  | 'felicitation'
  | 'feast'
  | 'venue';

export interface CouplePhoto {
  id: string;
  title: string;
  subtitle: string;
  caption: string;
  url: string;
  defaultVisual: PhotoVisualType;
}

