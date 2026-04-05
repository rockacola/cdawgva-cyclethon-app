// Typed key-value store backed by localStorage.
// Swap the driver functions below to migrate to remote storage later.

export const STORAGE_KEYS = {
  DONATION_PAGE_SIZE: 'donation_page_size',
  APPEARANCE: 'appearance',
  TIMEZONE: 'timezone',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

function get<T>(key: StorageKey, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback;
  }
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function set<T>(key: StorageKey, value: T): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silently ignore quota/security errors.
  }
}

function remove(key: StorageKey): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem(key);
}

export const storage = { get, set, remove };
