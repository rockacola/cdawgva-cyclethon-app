// Typed key-value store backed by localStorage.
// Swap the driver functions below to migrate to remote storage later.

export const STORAGE_KEYS = {
  DONATION_PAGE_SIZE: 'donation_page_size',
  TIMEZONE: 'timezone',
} as const;
