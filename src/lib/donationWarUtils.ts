import { ANIME_PATTERNS } from './animePatterns';
import { COUNTRY_PATTERNS } from './countryPatterns';
import { GACHA_PATTERNS } from './gachaPatterns';
import { GAME_PATTERNS } from './gamePatterns';
import { IRONMOUSE_PATTERNS } from './ironmousePatterns';
import { PIZZA_PATTERNS } from './pizzaPatterns';
import { POKEMON_PATTERNS } from './pokemonPatterns';
import { SANRIO_PATTERNS } from './sanrioPattern';
import type { DataPattern, DonationWarType } from './types';
import { UMAMUSUME_PATTERNS } from './umamusumePatterns';

const DATA_SOURCE_MAP: Record<DonationWarType, DataPattern[]> = {
  anime: ANIME_PATTERNS,
  country: COUNTRY_PATTERNS,
  gacha: GACHA_PATTERNS,
  game: GAME_PATTERNS,
  ironmouse: IRONMOUSE_PATTERNS,
  pizza: PIZZA_PATTERNS,
  pokemon: POKEMON_PATTERNS,
  sanrio: SANRIO_PATTERNS,
  umamusume: UMAMUSUME_PATTERNS,
};

function getDataSource(type: DonationWarType) {
  const dataSource = DATA_SOURCE_MAP[type];
  if (!dataSource) {
    throw new Error(`Unknown data source type: ${type}`);
  }

  return dataSource;
}

export function detectItemIdFromComment(
  type: DonationWarType,
  comment: string | null | undefined
): string | null {
  if (!comment) {
    return null;
  }

  const dataSource = getDataSource(type);

  let firstId: string | null = null;
  let firstIndex = Infinity;
  for (const { id, pattern } of dataSource) {
    const match = pattern.exec(comment);
    if (match && match.index < firstIndex) {
      firstIndex = match.index;
      firstId = id;
    }
  }
  return firstId;
}

export function itemIdToName(type: DonationWarType, id: string, locale: string = 'EN'): string {
  const dataSource = getDataSource(type);
  const entry = dataSource.find((item) => item.id === id);
  if (!entry) {
    return id;
  }

  return locale === 'JP' ? entry.nameJa : entry.name;
}
