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

export interface DayEntry {
  // identity
  dayKey: string;

  // route
  destination: string;
  startPoint: string;

  // stats
  amountRaised?: number;
  amountRaisedCurrency?: string;
  totalAmountRaised?: number;
  avgTempCelsius?: number;
  caloriesBurnt?: number;
  distanceKm?: number;
  timeCycling?: number;
  windSpeedMs?: number;

  // map
  mapEmbedUrl?: string;
  mapUrl?: string;

  // reddit source
  redditAuthor?: string;
  redditLabel?: string;
  redditUrl?: string;

  // video links
  twitchUrl?: string;
  youtubeUrl?: string;

  // complex lists
  landmarks?: string[];
  mapLocations?: MapLocation[];
  twitchClips?: TwitchClip[];
}

export const journeyData: DayEntry[] = [
  {
    dayKey: 'day-1',
    destination: 'Mutsu-Yokohama',
    amountRaised: 119155,
    amountRaisedCurrency: 'USD',
    avgTempCelsius: 18.8,
    caloriesBurnt: 4313,
    distanceKm: 75.8,
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
    redditLabel: 'Day 1 Cyclethon 5 Infographics',
    redditUrl: 'https://old.reddit.com/r/CDawgVA/comments/1sd4vzm/day_1_cyclethon_5_infographics/',
    startPoint: 'Cape Oma',
    timeCycling: 418,
    twitchClips: [
      { id: 'clip-placeholder-1' },
      { id: 'clip-placeholder-2' },
      { id: 'clip-placeholder-3' },
      { id: 'clip-placeholder-4' },
    ],
    twitchUrl: 'https://www.twitch.tv/videos/2740154602',
    youtubeUrl: 'https://www.youtube.com/watch?v=MbzOfE_6dqM',
  },
  {
    dayKey: 'day-2',
    destination: 'Aomori Station',
    amountRaised: 51799,
    amountRaisedCurrency: 'USD',
    totalAmountRaised: 170659,
    avgTempCelsius: 7.8,
    caloriesBurnt: 3709,
    distanceKm: 74.1,
    mapEmbedUrl: 'https://www.google.com/maps/d/embed?mid=1Dc53gX_3CWG6RlWrb1NcYAN1rA1ns3o',
    mapUrl: 'https://www.google.com/maps/d/u/1/edit?mid=1Dc53gX_3CWG6RlWrb1NcYAN1rA1ns3o',
    redditAuthor: 'fatalzan',
    redditLabel: 'Day 2 Cyclethon 5 Infographics',
    redditUrl: 'https://old.reddit.com/r/CDawgVA/comments/1sdtr6z/day_2_cyclethon_5_infographics/',
    startPoint: 'Mutsu-Yokohama',
    timeCycling: 233,
    twitchUrl: 'https://www.twitch.tv/videos/2740993163',
    windSpeedMs: 14.8,
    youtubeUrl: 'https://www.youtube.com/watch?v=QKokuTTh_58',
  },
  {
    dayKey: 'day-3',
    destination: 'Fukaura Station',
    amountRaised: 84457,
    amountRaisedCurrency: 'USD',
    totalAmountRaised: 255116,
    avgTempCelsius: 7.2,
    caloriesBurnt: 4758,
    distanceKm: 90.95,
    mapEmbedUrl: 'https://www.google.com/maps/d/embed?mid=1Dc53gX_3CWG6RlWrb1NcYAN1rA1ns3o',
    mapUrl: 'https://www.google.com/maps/d/u/1/edit?mid=1Dc53gX_3CWG6RlWrb1NcYAN1rA1ns3o',
    redditAuthor: 'fatalzan',
    redditLabel: 'Day 3 Cyclethon 5 Infographics',
    redditUrl: 'https://old.reddit.com/r/CDawgVA/comments/1sev03w/day_3_cyclethon_5_infographics/',
    startPoint: 'Aomori Station',
    timeCycling: 391,
    twitchUrl: 'https://bingobaker.com/#67fad5a4f7be3f0b',
    windSpeedMs: 26.91,
    youtubeUrl: 'https://youtu.be/wo9rOMyJ0fM?si=7B4fSmk5d0ZVHz8Y',
  },
  { dayKey: 'day-4', destination: '', startPoint: '' },
  { dayKey: 'day-5', destination: '', startPoint: '' },
  { dayKey: 'day-6', destination: '', startPoint: '' },
  { dayKey: 'day-7', destination: '', startPoint: '' },
  { dayKey: 'day-8', destination: '', startPoint: '' },
  { dayKey: 'day-9', destination: '', startPoint: '' },
  { dayKey: 'day-10', destination: '', startPoint: '' },
  { dayKey: 'day-11', destination: '', startPoint: '' },
  { dayKey: 'day-12', destination: '', startPoint: '' },
  { dayKey: 'day-13', destination: '', startPoint: '' },
  { dayKey: 'day-14', destination: '', startPoint: '' },
  { dayKey: 'day-15', destination: '', startPoint: '' },
];
