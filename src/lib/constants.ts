// Base URL for the Cloudflare R2 public bucket serving donation data
const R2_BASE_URL = process.env.NEXT_PUBLIC_R2_BASE_URL;

// Filename of the donations JSON file hosted on R2
export const DONATIONS_FILE = 'donations-latest-100.json';

export const DONATIONS_URL = `${R2_BASE_URL}/${DONATIONS_FILE}`;
