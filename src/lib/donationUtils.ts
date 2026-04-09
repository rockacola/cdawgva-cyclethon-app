import COUNTRY_NAMES_JP from '@/lib/countryNamesJp';
import type { Donation, DonorTotal } from '@/lib/types';

// Each entry: [ISO 3166-1 alpha-3 code, ...patterns to match (case-insensitive, word-boundary)]
// Patterns are tested in order; first match wins. More specific aliases go before shorter ones
// to avoid false positives (e.g. "iran" before "iraq").
const COUNTRY_PATTERNS: [string, RegExp][] = (
  [
    // Prioritise multi-word or easily-confused names first
    [
      'USA',
      /\b(united\s+states(?:\s+of\s+america)?|u\.s\.a\.?|u\.s\.|usa|murica|america[n]?|states)\b/,
    ],
    [
      'GBR',
      /\b(united\s+kingdom|great\s+britain|england|scotland|wales|northern\s+ireland|britain|uk|u\.k\.)\b/,
    ],
    ['AUS', /\b(australia[n]?|aussie[s]?|oz)\b/],
    ['NZL', /\b(new\s+zealand|kiwi[s]?|nz)\b/],
    ['CAN', /\b(canada[n]?|canuck[s]?)\b/],
    ['ZAF', /\b(south\s+africa[n]?|s\.a\.|rsa)\b/],
    ['KOR', /\b(south\s+korea[n]?|republic\s+of\s+korea)\b/],
    ['PRK', /\b(north\s+korea[n]?)\b/],
    ['SAU', /\b(saudi\s+arabia[n]?|ksa)\b/],
    ['UAE', /\b(united\s+arab\s+emirates|u\.a\.e\.?|emirates)\b/],
    ['COD', /\b(democratic\s+republic\s+of\s+(?:the\s+)?congo|dr\s+congo|drc)\b/],
    ['COG', /\b(republic\s+of\s+(?:the\s+)?congo|congo(?!\s*,\s*dr))\b/],
    ['CIV', /\b(ivory\s+coast|c[oô]te\s+d'ivoire)\b/],
    ['SRB', /\b(serbia[n]?)\b/],
    ['BIH', /\b(bosnia(?:\s+and\s+herzegovina)?|bosnian)\b/],
    ['MKD', /\b(north\s+macedonia[n]?|macedonia[n]?)\b/],
    ['TTO', /\b(trinidad\s+(?:and\s+)?tobago)\b/],
    ['PNG', /\b(papua\s+new\s+guinea)\b/],
    ['SLV', /\b(el\s+salvador(?:an)?)\b/],
    ['CRI', /\b(costa\s+rica[n]?)\b/],
    ['DOM', /\b(dominican\s+republic)\b/],
    ['PRY', /\b(paraguay(?:an)?)\b/],
    ['URY', /\b(uruguay(?:an)?)\b/],
    ['GTM', /\b(guatemala[n]?)\b/],
    ['HND', /\b(honduras|honduran)\b/],
    ['NIC', /\b(nicaragua[n]?)\b/],
    ['PAN', /\b(panama(?:nian)?)\b/],
    ['ECU', /\b(ecuador(?:ian)?)\b/],
    ['BOL', /\b(bolivia[n]?)\b/],
    ['VEN', /\b(venezuela[n]?)\b/],
    ['COL', /\b(colombia[n]?)\b/],
    ['PER', /\b(per[uú](?:vian)?)\b/],
    ['CHL', /\b(chile(?:an)?)\b/],
    ['ARG', /\b(argentin[ae](?:an)?)\b/],
    ['BRA', /\b(brazil(?:ian)?|brasil)\b/],
    ['MEX', /\b(mexico|mexican|méx(?:ico)?)\b/],
    ['CUB', /\b(cuba[n]?)\b/],
    ['JAM', /\b(jamaica[n]?)\b/],
    ['HTI', /\b(haiti(?:an)?)\b/],
    ['FRA', /\b(france|french)\b/],
    ['DEU', /\b(german[y]?|deutschland)\b/],
    ['ITA', /\b(ital[y]?(?:ian)?)\b/],
    ['ESP', /\b(spain|spanish|españa)\b/],
    ['PRT', /\b(portug(?:al|uese))\b/],
    ['NLD', /\b(netherlands|dutch|holland)\b/],
    ['BEL', /\b(belgi(?:um|an|que))\b/],
    ['CHE', /\b(switzerland|swiss|schweiz|suisse)\b/],
    ['AUT', /\b(austria[n]?|österreich)\b/],
    ['SWE', /\b(swed(?:en|ish|e))\b/],
    ['NOR', /\b(norwa[y]?(?:egian)?)\b/],
    ['DNK', /\b(denm(?:ark|arks)|danish)\b/],
    ['FIN', /\b(finland|finnish|suomi)\b/],
    ['POL', /\b(polan[d]?|polish)\b/],
    ['CZE', /\b(czech(?:\s+republic)?|czechia)\b/],
    ['SVK', /\b(slovakia[n]?)\b/],
    ['HUN', /\b(hungar[y]?(?:ian)?)\b/],
    ['ROU', /\b(romani[a]?(?:an)?)\b/],
    ['BGR', /\b(bulgari[a]?(?:an)?)\b/],
    ['HRV', /\b(croatia[n]?|hrvatska)\b/],
    ['GRC', /\b(greece|greek|hellas)\b/],
    ['TUR', /\b(turke[y]?(?:ish)?|türkiye)\b/],
    ['RUS', /\b(russia[n]?|россия)\b/],
    ['UKR', /\b(ukrain[e]?(?:ian)?)\b/],
    ['BLR', /\b(belarus(?:ian)?|belorussia)\b/],
    ['ISR', /\b(isra(?:el|eli))\b/],
    ['IRN', /\b(ira[n]?(?:ian)?|persia[n]?)\b/],
    ['IRQ', /\b(ira[q](?:i)?)\b/],
    ['SYR', /\b(syr(?:ia|ian))\b/],
    ['JOR', /\b(jorda[n]?(?:ian)?)\b/],
    ['LBN', /\b(leban(?:on|ese))\b/],
    ['PSE', /\b(palestin(?:e|ian))\b/],
    ['EGY', /\b(egypt(?:ian)?)\b/],
    ['LBY', /\b(liby[a]?(?:an)?)\b/],
    ['TUN', /\b(tunisi[a]?(?:an)?)\b/],
    ['DZA', /\b(algeri[a]?(?:an)?)\b/],
    ['MAR', /\b(morocc(?:o|an))\b/],
    ['ETH', /\b(ethiopi[a]?(?:an)?)\b/],
    ['KEN', /\b(keny[a]?(?:an)?)\b/],
    ['TZA', /\b(tanzani[a]?(?:an)?)\b/],
    ['NGA', /\b(nigeri[a]?(?:an)?)\b/],
    ['GHA', /\b(ghan[a]?(?:aian)?)\b/],
    ['UGA', /\b(ugand[a]?(?:an)?)\b/],
    ['ZWE', /\b(zimbabw[e]?(?:an)?)\b/],
    ['ZMB', /\b(zambi[a]?(?:an)?)\b/],
    ['MOZ', /\b(mozambiqu[e]?(?:an)?)\b/],
    ['AGO', /\b(angol[a]?(?:an)?)\b/],
    ['CMR', /\b(cameroo[n]?(?:ian)?)\b/],
    ['SEN', /\b(senega[l]?(?:ese)?)\b/],
    ['IND', /\b(indi[a]?(?:an)?|hindustan)\b/],
    ['PAK', /\b(pakista[n]?(?:i)?)\b/],
    ['BGD', /\b(banglades[h]?(?:i)?)\b/],
    ['LKA', /\b(sri\s+lanka[n]?|ceylon)\b/],
    ['NPL', /\b(nepa[l]?(?:ese|i)?)\b/],
    ['MMR', /\b(myanmar|burma(?:ese)?)\b/],
    ['THA', /\b(thailand|thai)\b/],
    ['VNM', /\b(vietna(?:m|mese))\b/],
    ['KHM', /\b(cambodia[n]?|khmer)\b/],
    ['LAO', /\b(laos?(?:tian)?)\b/],
    ['MYS', /\b(malaysia[n]?)\b/],
    ['SGP', /\b(singapore(?:an)?)\b/],
    ['IDN', /\b(indonesi[a]?(?:an)?)\b/],
    ['PHL', /\b(philippine[s]?|filipino|pilipino)\b/],
    ['CHN', /\b(chin[a]?(?:ese)?|prc|中国)\b/],
    ['TWN', /\b(taiwan(?:ese)?|r\.o\.c\.?)\b/],
    ['HKG', /\b(hong\s+kong(?:er)?)\b/],
    ['JPN', /\b(japa[n]?(?:ese)?|nippon)\b/],
    ['MNG', /\b(mongoli[a]?(?:an)?)\b/],
    ['KAZ', /\b(kazakhsta[n]?(?:i)?)\b/],
    ['UZB', /\b(uzbekista[n]?(?:i)?)\b/],
    ['AFG', /\b(afghani(?:stan)?)\b/],
    ['IRE', /\b(irelan[d]?|irish|éire)\b/],
    ['ISL', /\b(icelan[d]?(?:ic|er)?)\b/],
    ['LUX', /\b(luxembourg(?:er)?)\b/],
    ['MLT', /\b(malt[a]?(?:ese)?)\b/],
    ['CYP', /\b(cypru[s]?(?:iot)?)\b/],
    // Baltic states
    ['EST', /\b(estonia[n]?)\b/],
    ['LVA', /\b(latvia[n]?)\b/],
    ['LTU', /\b(lithuania[n]?)\b/],
    // Balkans & Southeast Europe
    ['SVN', /\b(slovenia[n]?)\b/],
    ['ALB', /\b(albania[n]?)\b/],
    ['MNE', /\b(montenegr(?:o|in))\b/],
    ['XKX', /\b(kosovo|kosovar)\b/],
    ['MDA', /\b(moldov[a]?(?:an)?)\b/],
    // Caucasus
    ['GEO', /\b(georgi[a]?(?:an)?)\b/],
    ['ARM', /\b(armeni[a]?(?:an)?)\b/],
    ['AZE', /\b(azerbaija[n]?(?:i)?)\b/],
    // Central Asia
    ['TKM', /\b(turkmenista[n]?(?:i)?)\b/],
    ['TJK', /\b(tajikista[n]?(?:i)?)\b/],
    ['KGZ', /\b(kyrgyzsta[n]?(?:i)?|kirghiz)\b/],
    // Middle East
    ['OMN', /\b(oma[n]?(?:i)?)\b/],
    ['QAT', /\b(qatar(?:i)?)\b/],
    ['BHR', /\b(bahrain(?:i)?)\b/],
    ['KWT', /\b(kuwait(?:i)?)\b/],
    ['YEM', /\b(yeme[n]?(?:i)?)\b/],
    // South & Southeast Asia
    ['BTN', /\b(bhutan(?:ese)?)\b/],
    ['MDV', /\b(maldiv(?:es|ian))\b/],
    ['BRN', /\b(brunei(?:an)?)\b/],
    ['TLS', /\b(timor[- ]leste|east\s+timor(?:ese)?)\b/],
    // East Asia
    ['MAC', /\b(maca[ou](?:nese)?)\b/],
    // Pacific Islands
    ['FJI', /\b(fiji(?:an)?)\b/],
    ['WSM', /\b(samo[a]?(?:n)?)\b/],
    ['TON', /\b(tonga[n]?)\b/],
    ['VUT', /\b(vanuatu)\b/],
    ['SLB', /\b(solomon\s+islands)\b/],
    ['PLW', /\b(palau(?:an)?)\b/],
    ['MHL', /\b(marshall\s+islands|marshallese)\b/],
    ['FSM', /\b(micronesi[a]?(?:an)?)\b/],
    ['KIR', /\b(kiribati)\b/],
    ['TUV', /\b(tuvalu(?:an)?)\b/],
    ['NRU', /\b(nauru(?:an)?)\b/],
    // Caribbean
    ['BHS', /\b(bahama[s]?(?:ian)?)\b/],
    ['BRB', /\b(barbad(?:os|ian))\b/],
    ['BLZ', /\b(beliz[e]?(?:an)?)\b/],
    ['GUY', /\b(guyan[a]?(?:ese)?)\b/],
    ['SUR', /\b(surinam[e]?(?:se)?)\b/],
    ['ATG', /\b(antigua(?:\s+and\s+barbuda)?)\b/],
    ['DMA', /\b(dominica[n]?)\b/],
    ['GRD', /\b(grenad[a]?(?:ian)?)\b/],
    ['KNA', /\b(saint\s+kitts(?:\s+and\s+nevis)?|st\.?\s+kitts)\b/],
    ['LCA', /\b(saint\s+lucia[n]?|st\.?\s+lucia)\b/],
    ['VCT', /\b(saint\s+vincent|st\.?\s+vincent)\b/],
    // Africa
    ['SDN', /\b(suda[n]?(?:ese)?)\b/],
    ['SSD', /\b(south\s+suda[n]?(?:ese)?)\b/],
    ['SOM', /\b(somali[a]?(?:an)?)\b/],
    ['ERI', /\b(eritre[a]?(?:an)?)\b/],
    ['DJI', /\b(djibouti(?:an)?)\b/],
    ['MDG', /\b(madagascar|malagasy)\b/],
    ['MUS', /\b(mauritiu[s]?(?:an)?)\b/],
    ['RWA', /\b(rwand[a]?(?:an)?)\b/],
    ['BDI', /\b(burund[i]?(?:an)?)\b/],
    ['MWI', /\b(malaw[i]?(?:an)?)\b/],
    ['BWA', /\b(botswan[a]?(?:an)?)\b/],
    ['NAM', /\b(namibi[a]?(?:an)?)\b/],
    ['SWZ', /\b(eswatini|swaziland)\b/],
    ['LSO', /\b(lesotho)\b/],
    ['TGO', /\b(togo(?:lese)?)\b/],
    ['BEN', /\b(benin(?:ese)?)\b/],
    ['BFA', /\b(burkina\s+faso|burkinab[eé])\b/],
    ['NER', /\b(niger(?:ien)?)\b/],
    ['TCD', /\b(chad(?:ian)?)\b/],
    ['MLI', /\b(mali(?:an)?)\b/],
    ['MRT', /\b(mauritani[a]?(?:an)?)\b/],
    ['GMB', /\b(gambi[a]?(?:an)?)\b/],
    ['GNB', /\b(guinea[- ]bissau)\b/],
    ['GIN', /\b(guinea(?:n)?)\b/],
    ['SLE', /\b(sierra\s+leone(?:an)?)\b/],
    ['LBR', /\b(liberi[a]?(?:an)?)\b/],
    ['CPV', /\b(cape\s+verde|cabo\s+verde)\b/],
    ['STP', /\b(s[aã]o\s+tom[eé](?:\s+and\s+pr[ií]ncipe)?)\b/],
    ['GNQ', /\b(equatorial\s+guinea)\b/],
    ['GAB', /\b(gabon(?:ese)?)\b/],
    ['CAF', /\b(central\s+african\s+republic)\b/],
    ['COM', /\b(comoros|comorian)\b/],
    ['SYC', /\b(seychell(?:es|ois))\b/],
    // North Africa already covered (EGY, LBY, TUN, DZA, MAR)
    // Additional notable territories
    ['PRI', /\b(puerto\s+ric(?:o|an))\b/],
    ['GLP', /\b(guadeloupe(?:an)?)\b/],
    ['MTQ', /\b(martiniq(?:ue|uais))\b/],
    ['REU', /\b(r[eé]union(?:nais)?)\b/],
    ['NCL', /\b(new\s+caledoni[a]?(?:an)?)\b/],
    ['PYF', /\b(french\s+polynesi[a]?(?:an)?|tahiti(?:an)?)\b/],
    ['GUM', /\b(guam(?:anian)?)\b/],
    ['VAT', /\b(vatican(?:\s+city)?|holy\s+see)\b/],
  ] as [string, RegExp][]
).map(([code, pattern]) => [code, new RegExp(pattern.source, 'i')] as [string, RegExp]);

/**
 * Scans a donor comment for a country mention and returns the ISO 3166-1 alpha-3
 * country code, or null if no country (or more than one distinct country) is found.
 */
export function detectCountryFromComment(comment: string | null | undefined): string | null {
  if (!comment) {
    return null;
  }

  let firstCode: string | null = null;
  let firstIndex = Infinity;
  for (const [code, pattern] of COUNTRY_PATTERNS) {
    const match = pattern.exec(comment);
    if (match && match.index < firstIndex) {
      firstIndex = match.index;
      firstCode = code;
    }
  }
  return firstCode;
}

const COUNTRY_NAMES: Record<string, string> = {
  AFG: 'Afghanistan',
  AGO: 'Angola',
  ALB: 'Albania',
  ARG: 'Argentina',
  ARM: 'Armenia',
  ATG: 'Antigua and Barbuda',
  AUS: 'Australia',
  AUT: 'Austria',
  AZE: 'Azerbaijan',
  BDI: 'Burundi',
  BEL: 'Belgium',
  BEN: 'Benin',
  BFA: 'Burkina Faso',
  BGD: 'Bangladesh',
  BGR: 'Bulgaria',
  BHR: 'Bahrain',
  BHS: 'Bahamas',
  BIH: 'Bosnia and Herzegovina',
  BLR: 'Belarus',
  BLZ: 'Belize',
  BOL: 'Bolivia',
  BRA: 'Brazil',
  BRB: 'Barbados',
  BRN: 'Brunei',
  BTN: 'Bhutan',
  BWA: 'Botswana',
  CAF: 'Central African Republic',
  CAN: 'Canada',
  CHE: 'Switzerland',
  CHL: 'Chile',
  CHN: 'China',
  CIV: "Côte d'Ivoire",
  CMR: 'Cameroon',
  COD: 'DR Congo',
  COG: 'Republic of the Congo',
  COL: 'Colombia',
  COM: 'Comoros',
  CPV: 'Cape Verde',
  CRI: 'Costa Rica',
  CUB: 'Cuba',
  CYP: 'Cyprus',
  CZE: 'Czechia',
  DEU: 'Germany',
  DJI: 'Djibouti',
  DMA: 'Dominica',
  DNK: 'Denmark',
  DOM: 'Dominican Republic',
  DZA: 'Algeria',
  ECU: 'Ecuador',
  EGY: 'Egypt',
  ERI: 'Eritrea',
  ESP: 'Spain',
  EST: 'Estonia',
  ETH: 'Ethiopia',
  FIN: 'Finland',
  FJI: 'Fiji',
  FRA: 'France',
  FSM: 'Micronesia',
  GAB: 'Gabon',
  GBR: 'United Kingdom',
  GEO: 'Georgia',
  GHA: 'Ghana',
  GIN: 'Guinea',
  GLP: 'Guadeloupe',
  GMB: 'Gambia',
  GNB: 'Guinea-Bissau',
  GNQ: 'Equatorial Guinea',
  GRC: 'Greece',
  GRD: 'Grenada',
  GTM: 'Guatemala',
  GUM: 'Guam',
  GUY: 'Guyana',
  HKG: 'Hong Kong',
  HND: 'Honduras',
  HRV: 'Croatia',
  HTI: 'Haiti',
  HUN: 'Hungary',
  IDN: 'Indonesia',
  IND: 'India',
  IRE: 'Ireland',
  IRN: 'Iran',
  IRQ: 'Iraq',
  ISL: 'Iceland',
  ISR: 'Israel',
  ITA: 'Italy',
  JAM: 'Jamaica',
  JOR: 'Jordan',
  JPN: 'Japan',
  KAZ: 'Kazakhstan',
  KEN: 'Kenya',
  KGZ: 'Kyrgyzstan',
  KHM: 'Cambodia',
  KIR: 'Kiribati',
  KNA: 'Saint Kitts and Nevis',
  KOR: 'South Korea',
  KWT: 'Kuwait',
  LAO: 'Laos',
  LBN: 'Lebanon',
  LBR: 'Liberia',
  LBY: 'Libya',
  LCA: 'Saint Lucia',
  LKA: 'Sri Lanka',
  LSO: 'Lesotho',
  LTU: 'Lithuania',
  LUX: 'Luxembourg',
  LVA: 'Latvia',
  MAC: 'Macau',
  MAR: 'Morocco',
  MDA: 'Moldova',
  MDG: 'Madagascar',
  MDV: 'Maldives',
  MEX: 'Mexico',
  MHL: 'Marshall Islands',
  MKD: 'North Macedonia',
  MLI: 'Mali',
  MLT: 'Malta',
  MMR: 'Myanmar',
  MNE: 'Montenegro',
  MNG: 'Mongolia',
  MOZ: 'Mozambique',
  MRT: 'Mauritania',
  MTQ: 'Martinique',
  MUS: 'Mauritius',
  MWI: 'Malawi',
  MYS: 'Malaysia',
  NAM: 'Namibia',
  NCL: 'New Caledonia',
  NER: 'Niger',
  NGA: 'Nigeria',
  NIC: 'Nicaragua',
  NLD: 'Netherlands',
  NOR: 'Norway',
  NPL: 'Nepal',
  NRU: 'Nauru',
  NZL: 'New Zealand',
  OMN: 'Oman',
  PAK: 'Pakistan',
  PAN: 'Panama',
  PER: 'Peru',
  PHL: 'Philippines',
  PLW: 'Palau',
  PNG: 'Papua New Guinea',
  POL: 'Poland',
  PRK: 'North Korea',
  PRI: 'Puerto Rico',
  PRY: 'Paraguay',
  PRT: 'Portugal',
  PSE: 'Palestine',
  PYF: 'French Polynesia',
  QAT: 'Qatar',
  REU: 'Réunion',
  ROU: 'Romania',
  RUS: 'Russia',
  RWA: 'Rwanda',
  SAU: 'Saudi Arabia',
  SDN: 'Sudan',
  SEN: 'Senegal',
  SGP: 'Singapore',
  SLB: 'Solomon Islands',
  SLE: 'Sierra Leone',
  SLV: 'El Salvador',
  SOM: 'Somalia',
  SRB: 'Serbia',
  SSD: 'South Sudan',
  STP: 'São Tomé and Príncipe',
  SUR: 'Suriname',
  SVK: 'Slovakia',
  SVN: 'Slovenia',
  SWE: 'Sweden',
  SWZ: 'Eswatini',
  SYC: 'Seychelles',
  SYR: 'Syria',
  TCD: 'Chad',
  TGO: 'Togo',
  THA: 'Thailand',
  TJK: 'Tajikistan',
  TKM: 'Turkmenistan',
  TLS: 'Timor-Leste',
  TON: 'Tonga',
  TTO: 'Trinidad and Tobago',
  TUN: 'Tunisia',
  TUR: 'Turkey',
  TUV: 'Tuvalu',
  TWN: 'Taiwan',
  TZA: 'Tanzania',
  UAE: 'United Arab Emirates',
  UGA: 'Uganda',
  UKR: 'Ukraine',
  URY: 'Uruguay',
  USA: 'United States',
  UZB: 'Uzbekistan',
  VAT: 'Vatican City',
  VCT: 'Saint Vincent and the Grenadines',
  VEN: 'Venezuela',
  VNM: 'Vietnam',
  VUT: 'Vanuatu',
  WSM: 'Samoa',
  XKX: 'Kosovo',
  YEM: 'Yemen',
  ZAF: 'South Africa',
  ZMB: 'Zambia',
  ZWE: 'Zimbabwe',
};

export function countryCodeToName(code: string, locale: string = 'EN'): string {
  if (locale === 'JP') {
    return COUNTRY_NAMES_JP[code] ?? COUNTRY_NAMES[code] ?? code;
  }
  return COUNTRY_NAMES[code] ?? code;
}

const TRACKED_CURRENCY = 'USD';

export function aggregateByDonor(donations: Donation[]): DonorTotal[] {
  const map = new Map<string, DonorTotal>();
  for (const d of donations) {
    const existing = map.get(d.donor_name);
    if (existing) {
      existing.amount_cent += d.amount_cent;
      existing.count += 1;
    } else {
      map.set(d.donor_name, {
        amount_cent: d.amount_cent,
        amount_currency: d.amount_currency,
        count: 1,
        donor_name: d.donor_name,
      });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.amount_cent - a.amount_cent);
}

export function topByTransaction(donations: Donation[]): Donation[] {
  return [...donations].sort((a, b) => b.amount_cent - a.amount_cent);
}

export function getTopDonationsForDay(
  donations: Donation[],
  start: number,
  end: number
): Donation[] {
  return donations
    .filter((d) => d.completed_at >= start && d.completed_at < end)
    .sort((a, b) => b.amount_cent - a.amount_cent)
    .slice(0, 10);
}

export function filterAndWarnCurrency(donations: Donation[]): Donation[] {
  const otherCurrencies = [
    ...new Set(donations.map((d) => d.amount_currency).filter((c) => c !== TRACKED_CURRENCY)),
  ];
  if (otherCurrencies.length > 0) {
    console.warn(
      '[TopDonors] Non-USD currencies detected — rankings only reflect USD donations. ' +
        'Multi-currency support needed for: ' +
        otherCurrencies.join(', ')
    );
  }
  return donations.filter((d) => d.amount_currency === TRACKED_CURRENCY);
}

const numberFormat = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatCents(amountCent: number): string {
  return numberFormat.format(amountCent / 100);
}

export function formatAmount(d: Pick<Donation, 'amount_cent' | 'amount_currency'>): string {
  const value = formatCents(d.amount_cent);
  if (d.amount_currency === 'USD') {
    return `$${value}`;
  }
  return `${d.amount_currency} ${value}`;
}

export function formatAmountParts(d: Pick<Donation, 'amount_cent' | 'amount_currency'>): {
  whole: string;
  cents: string;
} {
  const value = formatCents(d.amount_cent);
  const dotIndex = value.lastIndexOf('.');
  const intPart = value.slice(0, dotIndex);
  const centsPart = value.slice(dotIndex + 1);
  const whole = d.amount_currency === 'USD' ? `$${intPart}` : `${d.amount_currency} ${intPart}`;
  return { whole, cents: `.${centsPart}` };
}

export function isAnonymous(name: string): boolean {
  return name.toLowerCase() === 'anonymous';
}

const DONATION_AGE_HOT_MS = 10_000;
const DONATION_AGE_NEW_MS = 30_000;

export function getDonationBoxShadow(
  completedAtSeconds: number,
  nowMs: number,
  insetWidth: number
): string | undefined {
  const ageMs = nowMs - completedAtSeconds * 1000;
  if (ageMs < DONATION_AGE_HOT_MS) {
    return `inset ${insetWidth}px 0 0 0 var(--chakra-colors-orange-400)`;
  }
  if (ageMs <= DONATION_AGE_NEW_MS) {
    return `inset ${insetWidth}px 0 0 0 var(--chakra-colors-orange-200)`;
  }
  return undefined;
}

export function formatCurrency(cents: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
