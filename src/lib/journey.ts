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

/**
 * Returns the event day label for a given unix epoch (seconds).
 * "Pre" if before the event, "Day N" during, "Post" if after.
 */
export function getEventDayLabel(epochSeconds: number): string {
  const startMs = JOURNEY_START.getTime();
  const endMs = startMs + JOURNEY_TOTAL_DAYS * 86_400_000;
  const ts = epochSeconds * 1000;

  if (ts < startMs) {
    return 'Pre';
  }
  if (ts >= endMs) {
    return 'Post';
  }
  const day = Math.floor((ts - startMs) / 86_400_000) + 1;
  return `Day ${day}`;
}
