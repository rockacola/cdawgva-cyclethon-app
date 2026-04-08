export interface MapLocationSocial {
  platform: string;
  url: string;
}

export type MapLocationCategory =
  | 'Dining'
  | 'Event'
  | 'Landmark'
  | 'Rest Stop'
  | 'Terminal'
  | 'Tour';

export interface MapLocation {
  category: MapLocationCategory;
  googleMapsUrl?: string;
  id: string;
  socials?: MapLocationSocial[];
  title: string;
  websiteUrl?: string;
}

export interface TwitchClip {
  embedUrl?: string;
  id: string;
  thumbnailUrl?: string;
  title?: string;
}

export interface DonationWarEntry {
  endTimestamp: number;
  startTimestamp: number;
  title: string;
  type: 'anime' | 'country';
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
  donationWars?: DonationWarEntry[];
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
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=16479926693861552529',
        id: 'd1-loc-1',
        title: 'Maguro Monument (Tuna Statue of Honshu North Edge)',
        websiteUrl: 'https://oma-wide.net/menu/omazaki/',
      },
      {
        category: 'Landmark',
        googleMapsUrl: 'https://maps.google.com/?cid=13450471678049929364',
        id: 'd1-loc-2',
        title: 'Kuwabatadai Mutsu Hamanasu Line Stone Monument',
        websiteUrl:
          'https://www.bousai.go.jp/jishin/nihonkaiko_chishima/hokkaido/pdf/chishima_manga.pdf',
      },
      {
        category: 'Dining',
        googleMapsUrl: 'https://maps.google.com/?cid=2378892243340516275',
        id: 'd1-loc-3',
        title: 'Ushitora Coffee',
        websiteUrl: 'http://ushitoracoffee.com/',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=15781784636915904652',
        id: 'd1-loc-4',
        title: 'Lawson Mutsu Yanagimachi 1-chome',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=8935616282557506387',
        id: 'd1-loc-5',
        title: 'Lawson Mutsu Okunai Shop',
      },
      {
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=17825440544961928775',
        id: 'd1-loc-6',
        title: 'Mutsu-Yokohama Station',
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
    mapLocations: [
      {
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=17825440544961928775',
        id: 'd2-loc-1',
        title: 'Mutsu-Yokohama Station',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=5259525789346455091',
        id: 'd2-loc-2',
        title: 'Hamanasu Roadside Café',
      },
      {
        category: 'Event',
        googleMapsUrl: 'https://www.google.com.au/maps/place/40°55\'02.4"N+141°11\'25.2"E/',
        id: 'd2-loc-3',
        title: 'Quick stop to diagnose bike issue',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=9940405137050285818',
        id: 'd2-loc-4',
        title: 'Lawson Noheji Tanabumichi',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=7993017785954344840',
        id: 'd2-loc-5',
        title: 'Lawson Hiranai Kominato',
      },
      {
        category: 'Landmark',
        googleMapsUrl: 'https://maps.google.com/?cid=11906412819564480605',
        id: 'd2-loc-6',
        title: 'Hotate Ohashi',
        websiteUrl:
          'http://www.thr.mlit.go.jp/aomori/syutu/aokoku/aokoku-sisetu/hotate/hotate_oohashi.html',
      },
      {
        category: 'Dining',
        googleMapsUrl: 'https://maps.google.com/?cid=13816311655652063301',
        id: 'd2-loc-7',
        socials: [{ platform: 'Instagram', url: 'https://www.instagram.com/isamu_sato777/?hl=ja' }],
        title: 'Tsurukameya Shokudo',
      },
      {
        category: 'Event',
        googleMapsUrl: 'https://www.google.com.au/maps/place/40°49\'36.2"N+140°48\'48.7"E',
        id: 'd2-loc-8',
        title: 'Stop to take a car ride to Koyasan Aomoribetsuin',
      },
      {
        category: 'Tour',
        googleMapsUrl: 'https://maps.google.com/?cid=14918925083774958918',
        id: 'd2-loc-9',
        title: 'Koyasan Aomoribetsuin',
        websiteUrl:
          'http://showa-daibutu.com/guide/%E9%AB%98%E9%87%8E%E5%B1%B1%E9%9D%92%E6%A3%AE%E5%88%A5%E9%99%A2/',
      },
      {
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=8427433769269076318',
        id: 'd2-loc-10',
        title: 'Aomori Station',
      },
    ],
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
    mapLocations: [
      {
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=8427433769269076318',
        id: 'd3-loc-1',
        title: 'Aomori Station',
      },
      {
        category: 'Tour',
        googleMapsUrl: 'https://maps.google.com/?cid=14282572961377107010',
        id: 'd3-loc-2',
        title: 'Nebuta Museum WA RASSE',
        websiteUrl: 'http://www.nebuta.jp/warasse/',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=5939235032055357764',
        id: 'd3-loc-3',
        title: 'FamilyMart Aomori Daishaka-nishi',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=8598372354747298628',
        id: 'd3-loc-4',
        title: 'Lawson Tsuruta Kizutsu Store',
      },
      {
        category: 'Dining',
        googleMapsUrl: 'https://maps.google.com/?cid=13564023784280791504',
        id: 'd3-loc-5',
        title: 'Ramen shop',
      },
      {
        category: 'Event',
        googleMapsUrl:
          "https://www.google.com/maps/place/40%C2%B045'02.0%22N+140%C2%B008'40.7%22E/@40.7505556,140.1420586,17z/",
        id: 'd3-loc-6',
        title: 'Technical Stop',
      },
      {
        category: 'Event',
        googleMapsUrl: 'https://www.google.com/maps/dir//40.75213888888889,140.14669444444445',
        id: 'd3-loc-7',
        title: 'Flat Tire',
      },
      {
        category: 'Event',
        googleMapsUrl: 'https://www.google.com/maps/dir//40.75055555555556,140.1446388888889',
        id: 'd3-loc-8',
        title: 'Emergency Stop',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=2511115448289044863',
        id: 'd3-loc-9',
        title: 'FamilyMart Fukaura Seki',
      },
      {
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=14806150503861375762',
        id: 'd3-loc-10',
        title: 'Fukaura Station',
      },
    ],
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
  {
    dayKey: 'day-4',
    destination: 'Okubo Station',
    amountRaised: 50979,
    amountRaisedCurrency: 'USD',
    totalAmountRaised: 306095,
    avgTempCelsius: 8.49,
    caloriesBurnt: 5685,
    distanceKm: 105.5,
    donationWars: [
      {
        endTimestamp: 1775628180,
        startTimestamp: 1775626440,
        title: 'Donation War - by Country',
        type: 'country',
      },
    ],
    mapEmbedUrl: 'https://www.google.com/maps/d/embed?mid=1Dc53gX_3CWG6RlWrb1NcYAN1rA1ns3o',
    mapLocations: [
      {
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=14806150503861375762',
        id: 'd4-loc-1',
        title: 'Fukaura Station',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=16945426892651169587',
        id: 'd4-loc-2',
        title: 'Jūniko Station',
      },
      {
        category: 'Dining',
        googleMapsUrl: 'https://maps.google.com/?cid=109651786732343566',
        id: 'd4-loc-3',
        title: 'Ikoi no Lodge resthouse',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=11119227074632662490',
        id: 'd4-loc-4',
        title: 'Lawson Noshiro Ochiai',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=9071523953498329836',
        id: 'd4-loc-5',
        title: 'Lawson Mitane Town Kado Shop',
      },
      {
        category: 'Event',
        googleMapsUrl: 'https://maps.google.com/?cid=5601088048703282514',
        id: 'd4-loc-6',
        title: 'Pit In Masaka',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=16433241975714706565',
        id: 'd4-loc-7',
        title: 'Lawson Ikawa Sakura Station',
      },
      {
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=13918436445634512470',
        id: 'd4-loc-8',
        title: 'Ōkubo Station',
      },
    ],
    mapUrl: 'https://www.google.com/maps/d/u/1/edit?mid=1Dc53gX_3CWG6RlWrb1NcYAN1rA1ns3o',
    redditAuthor: 'fatalzan',
    redditLabel: 'Day 4 Cyclethon 5 Infographics',
    redditUrl: 'https://old.reddit.com/r/CDawgVA/comments/1sfouvd/day_4_cyclethon_5_infographics/',
    startPoint: 'Fukaura Station',
    timeCycling: 356,
    twitchUrl: 'https://www.twitch.tv/videos/2742572727',
    windSpeedMs: 17.9,
    youtubeUrl: 'https://www.youtube.com/watch?v=HPX5H9F4yug',
  },
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
