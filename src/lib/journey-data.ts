export interface VideoLink {
  platform: 'Twitch' | 'YouTube';
  url: string;
  label?: string;
}

export interface RedditLink {
  url: string;
  label?: string;
}

export interface DayContent {
  startPoint: string;
  destination: string;
  landmarks?: string[];
  mapUrl?: string;
  redditLinks?: RedditLink[];
  videoLinks?: VideoLink[];
}

export const journeyData: Partial<Record<string, DayContent>> = {
  'day-1': {
    startPoint: '',
    destination: '',
    landmarks: [],
    mapUrl: '',
    redditLinks: [],
    videoLinks: [],
  },
  'day-2': {
    startPoint: '',
    destination: '',
  },
  'day-3': {
    startPoint: '',
    destination: '',
  },
  'day-4': {
    startPoint: '',
    destination: '',
  },
  'day-5': {
    startPoint: '',
    destination: '',
  },
  'day-6': {
    startPoint: '',
    destination: '',
  },
  'day-7': {
    startPoint: '',
    destination: '',
  },
  'day-8': {
    startPoint: '',
    destination: '',
  },
  'day-9': {
    startPoint: '',
    destination: '',
  },
  'day-10': {
    startPoint: '',
    destination: '',
  },
  'day-11': {
    startPoint: '',
    destination: '',
  },
  'day-12': {
    startPoint: '',
    destination: '',
  },
  'day-13': {
    startPoint: '',
    destination: '',
  },
  'day-14': {
    startPoint: '',
    destination: '',
  },
  'day-15': {
    startPoint: '',
    destination: '',
  },
};
