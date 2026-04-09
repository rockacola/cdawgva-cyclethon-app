/**
 * Reads /public/top-anime.json and generates /src/lib/animePatterns.ts
 *
 * Strategy:
 * - Group all entries by franchise (strip season/part/movie/OVA suffixes)
 * - For each franchise, match on: base romaji title, base english title, manual aliases
 * - Don't match on season-specific subtitles — donors write "Attack on Titan" not
 *   "Shingeki no Kyojin Season 3 Part 2"
 * - Skip titles shorter than 4 chars or too generic to match safely
 *
 * Run: npx tsx scripts/generate-anime-patterns.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface AnimeEntry {
  mal_id: number;
  rank: number;
  title: string;
  title_english: string | null;
  score: number;
}

// ── helpers ──────────────────────────────────────────────────────────────────

function toId(s: string): string {
  return s
    .toLowerCase()
    .replace(/[''☆★]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Strip season / part / movie / OVA / subtitle suffixes to get the franchise
 * base name. Applied iteratively until stable.
 */
function franchiseBase(title: string): string {
  let prev = '';
  let result = title;
  while (result !== prev) {
    prev = result;
    result = result
      // Remove parenthesised suffixes like (2011), (TV), (OVA)
      .replace(/\s*\([^)]*\)\s*$/g, '')
      // Remove subtitles after ": " or " – " (space required after colon
      // to avoid stripping "Re:Zero", "Steins;Gate" etc)
      .replace(/\s*[\u2013\u2014].*$/g, '')
      .replace(/\s*:\s+.*$/g, '')
      // Remove trailing season/part/movie/OVA/2nd Season etc
      .replace(
        /\s*(?:(?:the\s+)?(?:movie|ova|ona|special|recap|summary).*|(?:\d+(?:st|nd|rd|th)\s+)?(?:season|cour|part)\s*\d*|season\s*\d+|part\s*\d+|\d+(?:st|nd|rd|th)\s+season|the\s+(?:very\s+)?(?:final|semi-final)|\d+nd\s+season|\d+rd\s+season)\s*$/i,
        ''
      )
      // Remove trailing numeric suffixes like "2", "II"
      .replace(/\s+(?:\d+|I{2,}V?|VI*)\s*$/g, '')
      // Remove trailing punctuation artefacts: °, ', ., !, -
      .replace(/[\s°'.:!\-]+$/g, '')
      .trim();
  }
  return result;
}

/** Escape regex special chars */
function esc(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Convert a title into a regex alternative string.
 * Handles special chars like ; / × ! and collapses whitespace.
 */
function titleToRegexAlt(title: string): string {
  let p = esc(title);
  p = p.replace(/\\;/g, '[;\\s]?');
  p = p.replace(/\\\//g, '[/\\s]*');
  p = p.replace(/\//g, '[/\\s]*');
  p = p.replace(/×/g, '[x×]');
  p = p.replace(/\\!/g, '!?');
  p = p.replace(/\s+/g, '\\s+');
  return p;
}

// Titles too generic/short to safely match as standalone words in a comment
const SKIP_WORDS = new Set([
  'idol',
  'monster',
  'erased',
  'another',
  'air',
  'angel',
  'shelter',
  'colors',
  'free',
  'gate',
  'working',
  'given',
  'days',
  'run',
  'skip',
  'wave',
  'dive',
  'hero',
  'blue',
  'black',
  'orange',
  'banana',
  'hand',
  'alive',
  'island',
  'pet',
  'stars',
  'wonder',
  'stone',
  'race',
  'pure',
  'bar',
  'wish',
  'link',
  'lost',
  'kingdom',
  'love',
  'night',
  'key',
  'switch',
  'smile',
  'flag',
  'chain',
  'glass',
  'bridge',
  'crown',
  'prince',
  'brave',
  'soul',
  'place',
  'land',
  'blade',
  'ring',
  'blood',
  'break',
  'dawn',
  'burn',
  'after',
  'before',
  'spiral',
  'alien',
  'the brave',
  'the wind',
  'look back',
  'the first',
  'gotcha',
  'road of naruto',
  'dramaturgy',
  'tot musica',
  'love me',
  'yuusha',
]);

/** Franchise IDs to skip — music videos, PVs, CMs, shorts that aren't real shows */
const SKIP_IDS = new Set([
  'alien-stage',
  'road-of-naruto',
  'yoru-ni-kakeru',
  'kawaki-wo-ameku',
  'milg-am',
  'bleach-20th-pv',
  'tot-musica',
  'violet-evergarden-cms',
  'hololive-alternative',
  'yuusha',
  'dramaturgy',
  'love-me',
  'one-piece-fan-letter',
  'shelter',
]);

/**
 * Well-known abbreviations and aliases that can't be derived from official titles.
 * Keyed by franchise ID.
 */
/**
 * Well-known abbreviations and aliases keyed by the generated franchise ID.
 * Run the script once with empty aliases, check the IDs, then fill these in.
 */
const MANUAL_ALIASES: Record<string, string[]> = {
  // Major shonen / action
  'shingeki-no-kyojin': ['aot', 'snk', 'attack\\s+on\\s+titan'],
  'boku-no-hero-academia': ['mha', 'bnha', 'my\\s+hero\\s+academia'],
  'jujutsu-kaisen': ['jjk'],
  'fullmetal-alchemist': ['fma', 'fmab'],
  'hunter-x-hunter': ['hxh'],
  'sword-art-online': ['sao'],
  'one-punch-man': ['opm'],
  'chainsaw-man': ['csm'],
  'kimetsu-no-yaiba': ['demon\\s+slayer', 'kimetsu'],
  'steel-ball-run': ['jojo', 'jjba', 'steel\\s+ball\\s+run'],
  'dragon-ball-z': ['dbz'],
  'dragon-ball-super': ['dbs'],
  'dragon-ball': ['dragon\\s*ball'],
  bleach: ['tybw'],
  'one-piece': ['one\\s+piece'],
  naruto: ['naruto', 'shippuden'],
  'black-clover': ['black\\s+clover'],
  'blue-lock': ['blue\\s+lock'],
  dandadan: ['dandadan'],

  // Evangelion (franchise base from MAL is "Shin Evangelion")
  'shin-evangelion': ['nge', 'evangelion', 'eva', 'neon\\s+genesis'],

  // Isekai / fantasy
  're-zero-kara-hajimeru-isekai-seikatsu': ['rezero', 're\\s*:\\s*zero', 're\\s+zero'],
  'kono-subarashii-sekai-ni-shukufuku-wo': ['konosuba'],
  'tate-no-yuusha-no-nariagari': ['shield\\s+hero'],
  'mushoku-tensei': ['jobless\\s+reincarnation', 'mushoku\\s+tensei'],
  'tensei-shitara-slime-datta-ken': [
    'tensura',
    'slime\\s+isekai',
    'reincarnated\\s+as\\s+a\\s+slime',
  ],
  'ore-dake-level-up-na-ken': ['solo\\s+leveling'],

  // Romance / drama / SoL
  'kaguya-sama-wa-kokurasetai': ['kaguya-?sama', 'love\\s+is\\s+war'],
  'sono-bisque-doll-wa-koi-wo-suru': ['dress-?up\\s+darling', 'bisque\\s+doll'],
  'spy-x-family': ['spy\\s*[x×]\\s*family'],
  'bocchi-the-rock': ['bocchi'],
  horimiya: ['horimiya'],
  toradora: ['toradora'],
  clannad: ['clannad'],
  'fruits-basket': ['furuba'],
  'violet-evergarden': ['violet\\s+evergarden'],

  // Sci-fi / thriller
  'steins-gate': ['steins[;\\s]?gate'],
  'code-geass': ['code\\s+geass', 'lelouch'],
  'death-note': ['death\\s+note'],
  'mob-psycho': ['mob\\s+psycho'],
  'cowboy-bebop': ['bebop'],
  cyberpunk: ['edgerunners', 'cyberpunk'],

  // Films
  'koe-no-katachi': ['silent\\s+voice'],
  'kimi-no-na-wa': ['your\\s+name', 'kimi\\s+no\\s+na\\s+wa'],
  'sen-to-chihiro-no-kamikakushi': ['spirited\\s+away'],
  'howl-no-ugoku-shiro': ['howl.?s\\s+moving\\s+castle'],
  'mononoke-hime': ['princess\\s+mononoke', 'mononoke'],
  'hotaru-no-haka': ['grave\\s+of\\s+the\\s+fireflies'],
  'perfect-blue': ['perfect\\s+blue'],

  // Sports
  'haikyuu-karasuno-koukou-vs-shiratorizawa-gakuen-koukou': ['haikyu+!*', 'haikyuu'],
  'the-first-slam-dunk': ['slam\\s+dunk'],

  // Other popular
  'oshi-no-ko': ['oshi\\s+no\\s+ko'],
  gintama: ['gintama'],
  'vinland-saga': ['vinland'],
  'made-in-abyss': ['made\\s+in\\s+abyss'],
  'odd-taxi': ['odd\\s+taxi'],
  'lycoris-recoil': ['lycoris\\s+recoil', 'lycoris'],
  'ousama-ranking': ['ranking\\s+of\\s+kings'],
  'dungeon-meshi': ['delicious\\s+in\\s+dungeon', 'dungeon\\s+meshi'],
  'kusuriya-no-hitorigoto': ['apothecary\\s+diaries'],
  'sousou-no-frieren': ['frieren'],
  'shangri-la-frontier': ['shangri-?la\\s+frontier'],
  'tengoku-daimakyou': ['heavenly\\s+delusion'],
  'kill-la-kill': ['kill\\s+la\\s+kill'],
  'tengen-toppa-gurren-lagann': ['gurren\\s+lagann', 'ttgl'],
  'k-on': ['k[-\\s]?on'],
  'great-teacher-onizuka': ['gto', 'great\\s+teacher\\s+onizuka'],
  'koukaku-kidoutai': ['ghost\\s+in\\s+the\\s+shell', 'gits'],
  'kenpuu-denki-berserk': ['berserk'],
  'initial-d-first-stage': ['initial\\s+d'],
  'hajime-no-ippo': ['hajime\\s+no\\s+ippo', 'ippo'],
  trigun: ['trigun'],
  'samurai-champloo': ['samurai\\s+champloo'],
  vivy: ['vivy'],
};

/**
 * Anime not in the top-1000 JSON that still show up in donation comments.
 * These are injected directly as pattern entries.
 */
const MANUAL_ENTRIES: { id: string; canonical: string; alts: string[] }[] = [
  {
    id: 'redo-of-healer',
    canonical: 'Redo of Healer',
    alts: ['redo\\s+of\\s+healer', 'kaiyari'],
  },
  {
    id: 'eden-of-the-east',
    canonical: 'Eden of the East',
    alts: ['eden\\s+of\\s+the\\s+east', 'higashi\\s+no\\s+eden'],
  },
  {
    id: 'detective-conan',
    canonical: 'Detective Conan',
    alts: ['detective\\s+conan', 'case\\s+closed', 'meitantei\\s+conan'],
  },
  {
    id: 'yosuga-no-sora',
    canonical: 'Yosuga no Sora',
    alts: ['yosuga\\s+no\\s+sora'],
  },
];

// ── main ─────────────────────────────────────────────────────────────────────

const root = join(__dirname, '..');
const raw: { fetched_at: string; anime: AnimeEntry[] } = JSON.parse(
  readFileSync(join(root, 'public', 'top-anime.json'), 'utf-8')
);

// 1. Group entries by franchise base
interface Franchise {
  id: string;
  canonical: string;
  romajiBase: string;
  englishBase: string | null;
  bestRank: number;
}

const franchises = new Map<string, Franchise>();

for (const entry of raw.anime) {
  const rBase = franchiseBase(entry.title);
  const baseId = toId(rBase);
  if (!baseId || baseId.length < 3) {
    continue;
  }

  const eBase = entry.title_english ? franchiseBase(entry.title_english) : null;

  if (SKIP_IDS.has(baseId)) {
    continue;
  }

  const existing = franchises.get(baseId);
  if (existing) {
    if (entry.rank < existing.bestRank) {
      existing.bestRank = entry.rank;
      existing.canonical = eBase ?? rBase;
      existing.romajiBase = rBase;
      existing.englishBase = eBase;
    }
  } else {
    franchises.set(baseId, {
      bestRank: entry.rank,
      canonical: eBase ?? rBase,
      englishBase: eBase,
      id: baseId,
      romajiBase: rBase,
    });
  }
}

// 2. Build pattern entries
interface PatternEntry {
  id: string;
  canonical: string;
  regex: string;
  rank: number;
}

const entries: PatternEntry[] = [];

for (const [id, franchise] of franchises) {
  const alts: string[] = [];

  // Add romaji base title
  const rAlt = titleToRegexAlt(franchise.romajiBase);
  if (rAlt && !SKIP_WORDS.has(franchise.romajiBase.toLowerCase())) {
    alts.push(rAlt);
  }

  // Add english base title (if different from romaji)
  if (
    franchise.englishBase &&
    franchise.englishBase.toLowerCase() !== franchise.romajiBase.toLowerCase() &&
    !SKIP_WORDS.has(franchise.englishBase.toLowerCase())
  ) {
    const eAlt = titleToRegexAlt(franchise.englishBase);
    if (eAlt) {
      alts.push(eAlt);
    }
  }

  // Add manual aliases
  const manualAliases = MANUAL_ALIASES[id];
  if (manualAliases) {
    alts.push(...manualAliases);
  }

  // Deduplicate case-insensitive
  const seen = new Set<string>();
  const deduped = alts.filter((a) => {
    const lower = a.toLowerCase();
    if (seen.has(lower)) {
      return false;
    }
    seen.add(lower);
    return true;
  });

  // Sort longest first
  deduped.sort((a, b) => b.length - a.length);

  if (deduped.length === 0) {
    continue;
  }

  entries.push({
    canonical: franchise.canonical,
    id,
    rank: franchise.bestRank,
    regex: `\\b(${deduped.join('|')})\\b`,
  });
}

// Inject manual entries (anime not in the JSON)
for (const manual of MANUAL_ENTRIES) {
  entries.push({
    canonical: manual.canonical,
    id: manual.id,
    rank: 9999,
    regex: `\\b(${manual.alts.join('|')})\\b`,
  });
}

// Sort by rank (most popular first)
entries.sort((a, b) => a.rank - b.rank);

// 3. Write output
const lines: string[] = [];
lines.push('// Auto-generated by scripts/generate-anime-patterns.ts');
lines.push('// Do not edit manually — re-run the script to update.');
lines.push(`export const ANIME_DATA_FETCHED_AT = '${raw.fetched_at}';`);
lines.push('');
lines.push('const ANIME_PATTERNS: [string, string, RegExp][] = [');

for (const entry of entries) {
  const escapedCanonical = entry.canonical.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  lines.push(`  ['${entry.id}', '${escapedCanonical}', /${entry.regex}/i],`);
}

lines.push('];');
lines.push('');
lines.push(
  'export function detectAnimeFromComment(comment: string | null | undefined): string | null {'
);
lines.push('  if (!comment) {');
lines.push('    return null;');
lines.push('  }');
lines.push('');
lines.push('  let firstId: string | null = null;');
lines.push('  let firstIndex = Infinity;');
lines.push('  for (const [id, , pattern] of ANIME_PATTERNS) {');
lines.push('    const match = pattern.exec(comment);');
lines.push('    if (match && match.index < firstIndex) {');
lines.push('      firstIndex = match.index;');
lines.push('      firstId = id;');
lines.push('    }');
lines.push('  }');
lines.push('  return firstId;');
lines.push('}');
lines.push('');
lines.push('const ANIME_NAMES: Record<string, string> = Object.fromEntries(');
lines.push('  ANIME_PATTERNS.map(([id, canonical]) => [id, canonical])');
lines.push(');');
lines.push('');
lines.push('export function animeIdToName(id: string): string {');
lines.push('  return ANIME_NAMES[id] ?? id;');
lines.push('}');
lines.push('');

const outPath = join(root, 'src', 'lib', 'animePatterns.ts');
writeFileSync(outPath, lines.join('\n'));
console.log(`Wrote ${entries.length} franchise patterns to ${outPath}`);
