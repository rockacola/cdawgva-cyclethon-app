interface SanrioPattern {
  id: string;
  name: string;
  nameJa: string;
  pattern: RegExp;
}

const SANRIO_PATTERNS: SanrioPattern[] = [
  {
    id: 'adorozatorumary',
    name: 'Adorozatorumary',
    nameJa: 'アドローザトルマリィ',
    pattern: /(adorozatorumary)/i,
  },
  {
    id: 'retsuko',
    name: 'Aggretsuko',
    nameJa: 'アグレッシブ烈子',
    pattern: /(aggretsuko|retsuko)/i,
  },
  {
    id: 'badtz-maru',
    name: 'Badtz-Maru',
    nameJa: 'バッドばつ丸',
    pattern: /(badtz\s?maru)/i,
  },
  {
    id: 'charmmy-kitty',
    name: 'Charmmy Kitty',
    nameJa: 'チャーミーキティ',
    pattern: /(charmmy\s?kitty)/i,
  },
  {
    id: 'chococat',
    name: 'Chococat',
    nameJa: 'チョコキャット',
    pattern: /(chococat)/i,
  },
  {
    id: 'cinnamoroll',
    name: 'Cinnamoroll',
    nameJa: 'シナモロール',
    pattern: /(cinnamoroll|cinnamon\s?roll)/i,
  },
  {
    id: 'cogimyun',
    name: 'Cogimyun',
    nameJa: 'こぎみゅん',
    pattern: /(cogimyun)/i,
  },
  {
    id: 'dear-daniel',
    name: 'Dear Daniel',
    nameJa: 'ディアダニエル',
    pattern: /(dear\s?daniel)/i,
  },
  {
    id: 'gudetama',
    name: 'Gudetama',
    nameJa: 'ぐでたま',
    pattern: /(gudetama)/i,
  },
  {
    id: 'hanamaruobake',
    name: 'Hanamaruobake',
    nameJa: 'はなまるおばけ',
    pattern: /(hanamaruobake)/i,
  },
  {
    id: 'hangyodon',
    name: 'Hangyodon',
    nameJa: 'ハンギョドン',
    pattern: /(hangyodon)/i,
  },
  {
    id: 'hello-kitty',
    name: 'Hello Kitty',
    nameJa: 'ハローキティ',
    pattern: /(hello\s?kitty)/i,
  },
  {
    id: 'keroppi',
    name: 'Keroppi',
    nameJa: 'けろけろけろっぴ',
    pattern: /(keroppi)/i,
  },
  {
    id: 'kirimi-chan',
    name: 'Kirimi-chan',
    nameJa: 'KIRIMIちゃん.',
    pattern: /(kirimi-?chan)/i,
  },
  {
    id: 'kuromi',
    name: 'Kuromi',
    nameJa: 'クロミ',
    pattern: /(kuromi)/i,
  },
  {
    id: 'little-twin-stars',
    name: 'Little Twin Stars',
    nameJa: 'リトルツインスターズ',
    pattern: /(little\s?twin\s?stars|kiki\s?and\s?lala)/i,
  },
  {
    id: 'marumofubiyori',
    name: 'Marumofubiyori',
    nameJa: 'まるもふびより',
    pattern: /(marumofubiyori)/i,
  },
  {
    id: 'my-melody',
    name: 'My Melody',
    nameJa: 'マイメロディ',
    pattern: /(my\s?melody)/i,
  },
  {
    id: 'pompompurin',
    name: 'Pompompurin',
    nameJa: 'ポムポムプリン',
    pattern: /(pompompurin|pom\s?pom\s?purin)/i,
  },
  {
    id: 'pochacco',
    name: 'Pochacco',
    nameJa: 'ポチャッコ',
    pattern: /(pochacco)/i,
  },
  {
    id: 'shinkansen',
    name: 'Shinkansen',
    nameJa: 'しんかんせん',
    pattern: /(shinkansen)/i,
  },
  {
    id: 'tuxedosam',
    name: 'Tuxedosam',
    nameJa: 'タキシードサム',
    pattern: /(tuxedo\s?sam)/i,
  },
  {
    id: 'usahana',
    name: 'Usahana',
    nameJa: 'ウサハナ',
    pattern: /(usahana)/i,
  },
  {
    id: 'wish-me-mell',
    name: 'Wish me mell',
    nameJa: 'ウィッシュミーメル',
    pattern: /(wish\s?me\s?mell)/i,
  },
];

export function detectSanrioCharacterFromComment(
  comment: string | null | undefined
): string | null {
  if (!comment) {
    return null;
  }

  let firstId: string | null = null;
  let firstIndex = Infinity;
  for (const { id, pattern } of SANRIO_PATTERNS) {
    const match = pattern.exec(comment);
    if (match && match.index < firstIndex) {
      firstIndex = match.index;
      firstId = id;
    }
  }
  return firstId;
}

export function sanrioCharacterIdToName(id: string, locale: string = 'EN'): string {
  const entry = SANRIO_PATTERNS.find((a) => a.id === id);
  if (!entry) {
    return id;
  }
  return locale === 'JP' && !!entry.nameJa ? entry.nameJa : entry.name;
}
