import { journeyData } from '@/lib/journey-data';
import type { DonationWarType } from '@/lib/types';

export interface MapLocationSocial {
  platform: string;
  url: string;
}

export type MapLocationCategory =
  | 'Dining'
  | 'Event'
  | 'Landmark'
  | 'Rest Stop'
  | 'Terminal'
  | 'Tour';

export interface MapLocation {
  category: MapLocationCategory;
  googleMapsUrl?: string;
  id: string;
  socials?: MapLocationSocial[];
  title: string;
  titleJa?: string;
  websiteUrl?: string;
}

export interface GuestCyclist {
  handler: string;
  imageUrl?: string;
  name: string;
  nameJa: string;
  twitchUrl?: string;
  youtubeUrl?: string;
}

export interface DonationWarEntry {
  endTimestamp: number;
  startTimestamp: number;
  title: string;
  titleJa?: string;
  type: DonationWarType;
}

export interface DayEntry {
  // identity
  dayKey: string;

  // route
  destination: string;
  destinationJa?: string;
  startPoint: string;
  startPointJa?: string;

  // stats
  amountRaised?: number;
  amountRaisedCurrency?: string;
  totalAmountRaised?: number;
  avgTempCelsius?: number;
  caloriesBurnt?: number;
  distanceKm?: number;
  timeCycling?: number;
  windSpeedMs?: number;

  // map
  mapEmbedUrl?: string;
  mapUrl?: string;

  // reddit source
  redditAuthor?: string;
  redditLabel?: string;
  redditUrl?: string;

  // video links
  twitchUrl?: string;
  youtubeUrl?: string;

  // complex lists
  donationWars?: DonationWarEntry[];
  guests?: GuestCyclist[];
  landmarks?: string[];
  mapLocations?: MapLocation[];
  twitchClips?: TwitchClip[];
}

export function getCompletedDays(): (DayEntry & { distanceKm: number })[] {
  return (journeyData as DayEntry[]).filter(
    (d): d is DayEntry & { distanceKm: number } => d.distanceKm !== undefined
  );
}

export function getTotalDistanceKm(): number {
  return Math.round(getCompletedDays().reduce((sum, d) => sum + d.distanceKm, 0));
}

const JOURNEY_START = new Date('2026-04-05');
const JOURNEY_TOTAL_DAYS = 15;

export interface JourneyDay {
  day: number;
  slug: string;
  date: Date;
  label: string;
}

export function getJourneyDays(): JourneyDay[] {
  return Array.from({ length: JOURNEY_TOTAL_DAYS }, (_, i) => {
    const day = i + 1;
    const date = new Date(JOURNEY_START);
    date.setUTCDate(date.getUTCDate() + i);
    return {
      day,
      slug: `day-${day}`,
      date,
      label: `Day ${day}`,
    };
  });
}

export function getJourneyDay(slug: string): JourneyDay | undefined {
  return getJourneyDays().find((d) => d.slug === slug);
}

export type EventDayInfo = { type: 'pre' } | { type: 'post' } | { type: 'day'; day: number };

/**
 * Returns structured event day info for a given unix epoch (seconds).
 */
export function getEventDayInfo(epochSeconds: number): EventDayInfo {
  const startMs = JOURNEY_START.getTime();
  const endMs = startMs + JOURNEY_TOTAL_DAYS * 86_400_000;
  const ts = epochSeconds * 1000;

  if (ts < startMs) {
    return { type: 'pre' };
  }
  if (ts >= endMs) {
    return { type: 'post' };
  }
  const day = Math.floor((ts - startMs) / 86_400_000) + 1;
  return { type: 'day', day };
}
