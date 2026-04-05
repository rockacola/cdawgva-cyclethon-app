// Base URL for the Cloudflare R2 public bucket serving donation data
const R2_BASE_URL = process.env.NEXT_PUBLIC_R2_BASE_URL;

// Filename of the donations JSON file hosted on R2
export const DONATIONS_FILE = 'donations-latest-100.json';
export const DONATIONS_FULL_FILE = 'donations-full.json';
export const DONATIONS_STATS_FILE = 'donations-stats.json';

export const DONATIONS_URL = `${R2_BASE_URL}/${DONATIONS_FILE}`;
export const DONATIONS_FULL_URL = `${R2_BASE_URL}/${DONATIONS_FULL_FILE}`;
export const DONATIONS_STATS_URL = `${R2_BASE_URL}/${DONATIONS_STATS_FILE}`;

// Server-side revalidation window in seconds (minimal cache)
export const FETCH_CACHE_REVALIDATE = 10;

// Client-side polling interval in milliseconds
export const DONATION_REFETCH_INTERVAL = 30_000;

// Page size options and default for the donation feed
export const DONATION_PAGE_SIZES = [30, 60, 100] as const;
export const DONATION_PAGE_SIZE_DEFAULT = 30;

// Appearance mode options
export const APPEARANCE_MODES = ['Light', 'Dark', 'System'] as const;
export type AppearanceMode = (typeof APPEARANCE_MODES)[number];
export const APPEARANCE_MODE_DEFAULT: AppearanceMode = 'System';

// Timezone options
export const TIMEZONE_MODES = ['JST', 'UTC', 'Local'] as const;
export type TimezoneMode = (typeof TIMEZONE_MODES)[number];
export const TIMEZONE_MODE_DEFAULT: TimezoneMode = 'JST';

// localStorage keys
export const STORAGE_KEYS = {
  DONATION_PAGE_SIZE: 'donation_page_size',
  TIMEZONE: 'timezone',
} as const;
export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
