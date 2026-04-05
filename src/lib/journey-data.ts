export interface VideoLink {
  label?: string;
  platform: 'Twitch' | 'YouTube';
  url: string;
}

export interface RedditLink {
  label?: string;
  url: string;
}

export interface DayStats {
  amountRaised: number;
  amountRaisedCurrency: string;
  avgSpeedKmh: number;
  avgTempCelsius: number;
  caloriesBurnt: number;
  distanceKm: number;
  timeCycling: string;
}

export interface MapLocationSocial {
  platform: string;
  url: string;
}

export interface MapLocation {
  address?: string;
  blurb: string;
  googleMapsUrl?: string;
  id: string;
  imageUrl?: string;
  socials?: MapLocationSocial[];
  title: string;
  twitchTimestampUrl?: string;
  websiteUrl?: string;
}

export interface TwitchClip {
  embedUrl?: string;
  id: string;
  thumbnailUrl?: string;
  title?: string;
}

export interface DayContent {
  destination: string;
  landmarks?: string[];
  mapEmbedUrl?: string;
  mapLocations?: MapLocation[];
  mapUrl?: string;
  redditAuthor?: string;
  redditLinks?: RedditLink[];
  startPoint: string;
  stats?: DayStats;
  twitchClips?: TwitchClip[];
  videoLinks?: VideoLink[];
}

export const journeyData: Partial<Record<string, DayContent>> = {
  'day-1': {
    destination: 'Mutsu-Yokohama',
    mapEmbedUrl: 'https://www.google.com/maps/d/embed?mid=1Dc53gX_3CWG6RlWrb1NcYAN1rA1ns3o',
    mapLocations: [
      {
        address: 'Oma, Shimokita District, Aomori, Japan',
        blurb:
          'The dramatic starting point of Day 1. Cape Oma (大間崎) sits at the very northernmost tip of Honshū island, jutting into the Tsugaru Strait just 17.5 km from Hokkaido. The region is world-renowned for its premium bluefin tuna (o-maguro), hauled from the fast, cold currents where the Pacific Ocean meets the Sea of Japan.',
        googleMapsUrl: 'https://maps.google.com/?q=Cape+Oma+Aomori+Japan',
        id: 'cape-oma',
        title: 'Cape Oma (大間崎)',
      },
      {
        address: 'Oma, Shimokita District, Aomori 039-4601, Japan',
        blurb:
          "Oma Town lives and breathes tuna. Its fishermen are famous for landing some of the world's largest bluefin tuna — record catches that regularly fetch tens of millions of yen at Tokyo's Toyosu Market. The town celebrates its prized fish with a giant tuna statue, dedicated restaurants, and a bold tuna-themed manhole cover.",
        googleMapsUrl: 'https://maps.google.com/?q=Oma+Town+Aomori+Japan',
        id: 'oma-town',
        title: 'Oma Town (大間町)',
      },
      {
        address: 'Yokohama, Kamikita District, Aomori, Japan',
        blurb:
          'The colourful finish line for Day 1. Mutsu-Yokohama is nicknamed "Nanohana Town" for its sweeping rapeseed fields that erupt in brilliant yellow every spring. Spanning over 220 hectares, it is Japan\'s largest canola-producing municipality — a spectacular sight when rolling through on a bike.',
        googleMapsUrl: 'https://maps.google.com/?q=Mutsu+Yokohama+Aomori+Japan',
        id: 'mutsu-yokohama',
        title: 'Mutsu-Yokohama (横浜町)',
      },
    ],
    mapUrl: 'https://www.google.com/maps/d/viewer?mid=1Dc53gX_3CWG6RlWrb1NcYAN1rA1ns3o',
    redditAuthor: 'fatalzan',
    redditLinks: [
      {
        label: 'Day 1 Cyclethon 5 Infographics',
        url: 'https://old.reddit.com/r/CDawgVA/comments/1sd4vzm/day_1_cyclethon_5_infographics/',
      },
    ],
    startPoint: 'Cape Oma',
    stats: {
      amountRaised: 119155,
      amountRaisedCurrency: 'USD',
      avgSpeedKmh: 20.13,
      avgTempCelsius: 18.8,
      caloriesBurnt: 4313,
      distanceKm: 75.8,
      timeCycling: '6h 58m',
    },
    twitchClips: [
      { id: 'clip-placeholder-1' },
      { id: 'clip-placeholder-2' },
      { id: 'clip-placeholder-3' },
      { id: 'clip-placeholder-4' },
    ],
    videoLinks: [],
  },
  'day-2': {
    destination: '',
    startPoint: '',
  },
  'day-3': {
    destination: '',
    startPoint: '',
  },
  'day-4': {
    destination: '',
    startPoint: '',
  },
  'day-5': {
    destination: '',
    startPoint: '',
  },
  'day-6': {
    destination: '',
    startPoint: '',
  },
  'day-7': {
    destination: '',
    startPoint: '',
  },
  'day-8': {
    destination: '',
    startPoint: '',
  },
  'day-9': {
    destination: '',
    startPoint: '',
  },
  'day-10': {
    destination: '',
    startPoint: '',
  },
  'day-11': {
    destination: '',
    startPoint: '',
  },
  'day-12': {
    destination: '',
    startPoint: '',
  },
  'day-13': {
    destination: '',
    startPoint: '',
  },
  'day-14': {
    destination: '',
    startPoint: '',
  },
  'day-15': {
    destination: '',
    startPoint: '',
  },
};
