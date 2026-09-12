// One entry per Cyclethon. Bookkeeping for which years exist, which are
// live, and which presentation tier each uses — see
// .ai/tasks/active/year-scoped-editions.md for the architecture this
// supports.
export type TemplateTier = 'full-2026' | 'legacy-stats';

export interface Edition {
  dayCount: number;
  editionNumber: number;
  isLive: boolean;
  templateTier: TemplateTier;
  // Unconfirmed for past editions; only set where verified (see MAIN_DONATION_URL).
  tiltifyUrl?: string;
  year: number;
}

export const EDITIONS: Edition[] = [
  { dayCount: 8, editionNumber: 1, isLive: false, templateTier: 'legacy-stats', year: 2022 },
  { dayCount: 9, editionNumber: 2, isLive: false, templateTier: 'legacy-stats', year: 2023 },
  { dayCount: 14, editionNumber: 3, isLive: false, templateTier: 'legacy-stats', year: 2024 },
  { dayCount: 15, editionNumber: 4, isLive: false, templateTier: 'legacy-stats', year: 2025 },
  {
    dayCount: 15,
    editionNumber: 5,
    isLive: true,
    templateTier: 'full-2026',
    tiltifyUrl: 'https://tiltify.com/@cdawgva/cyclethon-5',
    year: 2026,
  },
];

export const CURRENT_EDITION: Edition =
  EDITIONS.find((edition) => edition.isLive) ?? EDITIONS[EDITIONS.length - 1];

export function getEdition(year: number): Edition | undefined {
  return EDITIONS.find((edition) => edition.year === year);
}
