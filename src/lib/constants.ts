// Base URL for the Cloudflare R2 public bucket serving donation data
const R2_BASE_URL = process.env.NEXT_PUBLIC_R2_BASE_URL;

// Filename of the donations JSON file hosted on R2
export const DONATIONS_FILE = 'donations-latest-100.json';

export const DONATIONS_URL = `${R2_BASE_URL}/${DONATIONS_FILE}`;

// Server-side revalidation window in seconds (minimal cache)
export const FETCH_CACHE_REVALIDATE = 10;

// Client-side polling interval in milliseconds
export const DONATION_REFETCH_INTERVAL = 10_000;

// Page size options and default for the donation feed
export const DONATION_PAGE_SIZES = [30, 60, 100] as const;
export const DONATION_PAGE_SIZE_DEFAULT = 30;
