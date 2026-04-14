import type { DonationWarType } from './types';

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
  titleJp?: string;
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
  titleJp?: string;
  type: DonationWarType;
}

export interface DayEntry {
  // identity
  dayKey: string;

  // route
  destination: string;
  destinationJp?: string;
  startPoint: string;
  startPointJp?: string;

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
    destinationJp: 'むつ横浜',
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
        titleJp: 'まぐろ一本釣の町おおま石像',
        websiteUrl: 'https://oma-wide.net/menu/omazaki/',
      },
      {
        category: 'Landmark',
        googleMapsUrl: 'https://maps.google.com/?cid=13450471678049929364',
        id: 'd1-loc-2',
        title: 'Kuwabatadai Mutsu Hamanasu Line Stone Monument',
        titleJp: '桑畑台 むつはまなすライン 石碑',
        websiteUrl:
          'https://www.bousai.go.jp/jishin/nihonkaiko_chishima/hokkaido/pdf/chishima_manga.pdf',
      },
      {
        category: 'Dining',
        googleMapsUrl: 'https://maps.google.com/?cid=2378892243340516275',
        id: 'd1-loc-3',
        title: 'Ushitora Coffee',
        titleJp: '艮珈琲店',
        websiteUrl: 'http://ushitoracoffee.com/',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=15781784636915904652',
        id: 'd1-loc-4',
        title: 'Lawson Mutsu Yanagimachi 1-chome',
        titleJp: 'ローソン むつ柳町一丁目店',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=8935616282557506387',
        id: 'd1-loc-5',
        title: 'Lawson Mutsu Okunai Shop',
        titleJp: 'ローソン むつ奥内店',
      },
      {
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=17825440544961928775',
        id: 'd1-loc-6',
        title: 'Mutsu-Yokohama Station',
        titleJp: '陸奥横浜駅',
      },
    ],
    mapUrl: 'https://www.google.com/maps/d/viewer?mid=1Dc53gX_3CWG6RlWrb1NcYAN1rA1ns3o',
    redditAuthor: 'fatalzan',
    redditLabel: 'Day 1 Cyclethon 5 Infographics',
    redditUrl: 'https://old.reddit.com/r/CDawgVA/comments/1sd4vzm/day_1_cyclethon_5_infographics/',
    startPoint: 'Cape Oma',
    startPointJp: '大間崎',
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
    destinationJp: '青森駅',
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
        titleJp: '陸奥横浜駅',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=5259525789346455091',
        id: 'd2-loc-2',
        title: 'Hamanasu Roadside Café',
        titleJp: 'はまなすドライブイン',
      },
      {
        category: 'Event',
        googleMapsUrl: 'https://www.google.com.au/maps/place/40°55\'02.4"N+141°11\'25.2"E/',
        id: 'd2-loc-3',
        title: 'Short stop to fix a bike issue',
        titleJp: '自転車トラブル確認',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=9940405137050285818',
        id: 'd2-loc-4',
        title: 'Lawson Noheji Tanabumichi',
        titleJp: 'ローソン 野辺地田名部道店',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=7993017785954344840',
        id: 'd2-loc-5',
        title: 'Lawson Hiranai Kominato',
        titleJp: 'ローソン 平内小湊店',
      },
      {
        category: 'Landmark',
        googleMapsUrl: 'https://maps.google.com/?cid=11906412819564480605',
        id: 'd2-loc-6',
        title: 'Hotate Brdge',
        titleJp: 'ほたて大橋',
        websiteUrl:
          'http://www.thr.mlit.go.jp/aomori/syutu/aokoku/aokoku-sisetu/hotate/hotate_oohashi.html',
      },
      {
        category: 'Dining',
        googleMapsUrl: 'https://maps.google.com/?cid=13816311655652063301',
        id: 'd2-loc-7',
        socials: [{ platform: 'Instagram', url: 'https://www.instagram.com/isamu_sato777/?hl=ja' }],
        title: 'Tsurukameya Shokudo',
        titleJp: '鶴亀屋食堂',
      },
      {
        category: 'Event',
        googleMapsUrl: 'https://www.google.com.au/maps/place/40°49\'36.2"N+140°48\'48.7"E',
        id: 'd2-loc-8',
        title: 'Car transfer to Koyasan Aomoribetsuin',
        titleJp: '高野山青森別院への車移動',
      },
      {
        category: 'Tour',
        googleMapsUrl: 'https://maps.google.com/?cid=14918925083774958918',
        id: 'd2-loc-9',
        title: 'Koyasan Aomoribetsuin',
        titleJp: '高野山 青森別院',
        websiteUrl:
          'http://showa-daibutu.com/guide/%E9%AB%98%E9%87%8E%E5%B1%B1%E9%9D%92%E6%A3%AE%E5%88%A5%E9%99%A2/',
      },
      {
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=8427433769269076318',
        id: 'd2-loc-10',
        title: 'Aomori Station',
        titleJp: '青森駅',
      },
    ],
    mapUrl: 'https://www.google.com/maps/d/u/1/edit?mid=1Dc53gX_3CWG6RlWrb1NcYAN1rA1ns3o',
    redditAuthor: 'fatalzan',
    redditLabel: 'Day 2 Cyclethon 5 Infographics',
    redditUrl: 'https://old.reddit.com/r/CDawgVA/comments/1sdtr6z/day_2_cyclethon_5_infographics/',
    startPoint: 'Mutsu-Yokohama',
    startPointJp: 'むつ横浜',
    timeCycling: 233,
    twitchUrl: 'https://www.twitch.tv/videos/2740993163',
    windSpeedMs: 14.8,
    youtubeUrl: 'https://www.youtube.com/watch?v=QKokuTTh_58',
  },
  {
    dayKey: 'day-3',
    destination: 'Fukaura Station',
    destinationJp: '深浦駅',
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
        titleJp: '青森駅',
      },
      {
        category: 'Tour',
        googleMapsUrl: 'https://maps.google.com/?cid=14282572961377107010',
        id: 'd3-loc-2',
        title: 'Nebuta Museum WA RASSE',
        titleJp: 'ねぶたの家 ワ･ラッセ',
        websiteUrl: 'http://www.nebuta.jp/warasse/',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=5939235032055357764',
        id: 'd3-loc-3',
        title: 'FamilyMart Aomori Daishaka-nishi',
        titleJp: 'ファミリーマート 青森大釈迦西店',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=8598372354747298628',
        id: 'd3-loc-4',
        title: 'Lawson Tsuruta Kizutsu Store',
        titleJp: 'ローソン 鶴田木筒店',
      },
      {
        category: 'Dining',
        googleMapsUrl: 'https://maps.google.com/?cid=13564023784280791504',
        id: 'd3-loc-5',
        title: 'Ramen shop',
        titleJp: 'ラーメンショップ森田店',
      },
      {
        category: 'Event',
        googleMapsUrl:
          "https://www.google.com/maps/place/40%C2%B045'02.0%22N+140%C2%B008'40.7%22E/@40.7505556,140.1420586,17z/",
        id: 'd3-loc-6',
        title: 'Technical Stop',
        titleJp: '機材確認のための停止',
      },
      {
        category: 'Event',
        googleMapsUrl: 'https://www.google.com/maps/dir//40.75213888888889,140.14669444444445',
        id: 'd3-loc-7',
        title: 'Flat Tire',
        titleJp: 'パンク',
      },
      {
        category: 'Event',
        googleMapsUrl: 'https://www.google.com/maps/dir//40.75055555555556,140.1446388888889',
        id: 'd3-loc-8',
        title: 'Emergency Stop',
        titleJp: '緊急停止',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=2511115448289044863',
        id: 'd3-loc-9',
        title: 'FamilyMart Fukaura Seki',
        titleJp: 'ファミリーマート 深浦関店',
      },
      {
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=14806150503861375762',
        id: 'd3-loc-10',
        title: 'Fukaura Station',
        titleJp: '深浦駅',
      },
    ],
    mapUrl: 'https://www.google.com/maps/d/u/1/edit?mid=1Dc53gX_3CWG6RlWrb1NcYAN1rA1ns3o',
    redditAuthor: 'fatalzan',
    redditLabel: 'Day 3 Cyclethon 5 Infographics',
    redditUrl: 'https://old.reddit.com/r/CDawgVA/comments/1sev03w/day_3_cyclethon_5_infographics/',
    startPoint: 'Aomori Station',
    startPointJp: '青森駅',
    timeCycling: 391,
    twitchUrl: 'https://bingobaker.com/#67fad5a4f7be3f0b',
    windSpeedMs: 26.91,
    youtubeUrl: 'https://youtu.be/wo9rOMyJ0fM?si=7B4fSmk5d0ZVHz8Y',
  },
  {
    dayKey: 'day-4',
    destination: 'Okubo Station',
    destinationJp: '大久保駅',
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
        titleJp: '寄付対決（国別）',
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
        titleJp: '深浦駅',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=16945426892651169587',
        id: 'd4-loc-2',
        title: 'Jūniko Station',
        titleJp: '十二湖駅',
      },
      {
        category: 'Dining',
        googleMapsUrl: 'https://maps.google.com/?cid=109651786732343566',
        id: 'd4-loc-3',
        title: 'Ikoi no Lodge resthouse',
        titleJp: 'レストハウス・いこいのロッヂ',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=11119227074632662490',
        id: 'd4-loc-4',
        title: 'Lawson Noshiro Ochiai',
        titleJp: 'ローソン 能代落合店',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=9071523953498329836',
        id: 'd4-loc-5',
        title: 'Lawson Mitane Town Kado Shop',
        titleJp: 'ローソン 三種町鹿渡店',
      },
      {
        category: 'Event',
        googleMapsUrl: 'https://maps.google.com/?cid=5601088048703282514',
        id: 'd4-loc-6',
        title: 'Pit In Masaka',
        titleJp: 'ピットイン真坂',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=16433241975714706565',
        id: 'd4-loc-7',
        title: 'Lawson Ikawa Sakura Station',
        titleJp: 'ローソン 井川さくら駅前店',
      },
      {
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=13918436445634512470',
        id: 'd4-loc-8',
        title: 'Ōkubo Station',
        titleJp: '大久保駅',
      },
    ],
    mapUrl: 'https://www.google.com/maps/d/u/1/edit?mid=1Dc53gX_3CWG6RlWrb1NcYAN1rA1ns3o',
    redditAuthor: 'fatalzan',
    redditLabel: 'Day 4 Cyclethon 5 Infographics',
    redditUrl: 'https://old.reddit.com/r/CDawgVA/comments/1sfouvd/day_4_cyclethon_5_infographics/',
    startPoint: 'Fukaura Station',
    startPointJp: '深浦駅',
    timeCycling: 356,
    twitchUrl: 'https://www.twitch.tv/videos/2742572727',
    windSpeedMs: 17.9,
    youtubeUrl: 'https://www.youtube.com/watch?v=HPX5H9F4yug',
  },
  {
    amountRaised: 47756,
    amountRaisedCurrency: 'USD',
    avgTempCelsius: 13.93,
    caloriesBurnt: 5716,
    dayKey: 'day-5',
    destination: 'Kisakata Station',
    destinationJp: '象潟駅',
    distanceKm: 86.1,
    donationWars: [
      {
        endTimestamp: 1775712240,
        startTimestamp: 1775707200,
        title: 'Donation War - by Anime',
        titleJp: '寄付対決（アニメ別）',
        type: 'anime',
      },
    ],
    mapEmbedUrl: 'https://www.google.com/maps/d/embed?mid=1Ji6KbdKTivj14EPpP2MB0-NNfRj-9s8',
    mapLocations: [
      {
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=13918436445634512470',
        id: 'd5-loc-1',
        title: 'Ōkubo Station',
        titleJp: '大久保駅',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=14239258970418660475',
        id: 'd5-loc-2',
        title: 'Akita City Port Tower Selion',
        titleJp: '道の駅 あきた港 ポートタワー セリオン',
        websiteUrl: 'http://www.selion-akita.com/',
      },
      {
        category: 'Dining',
        googleMapsUrl: 'https://maps.google.com/?cid=1153065054667740169',
        id: 'd5-loc-3',
        title: 'GajRaaj',
        titleJp: 'ガジュラージュ',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=296905126825903912',
        id: 'd5-loc-4',
        title: 'FamilyMart Yurihonjo Iwaki',
        titleJp: 'ファミリーマート 由利本荘岩城店',
      },
      {
        category: 'Event',
        googleMapsUrl:
          'https://www.google.com/maps/place/Kamibayashi-4-21+Konoura,+Nikaho,+Akita+018-0311,+Japan/@39.2603469,139.9169477,17z/',
        id: 'd5-loc-5',
        title: 'Sakura Viewing',
        titleJp: '花見',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=296905126825903912',
        id: 'd5-loc-6',
        title: 'Lawson Honjo Ishiwaki',
        titleJp: 'ローソン 本荘石脇店',
      },
      {
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=15549417925211908634',
        id: 'd5-loc-7',
        title: 'Kisakata Station',
        titleJp: '象潟駅',
      },
    ],
    mapUrl: 'https://www.google.com/maps/d/u/1/edit?mid=1Ji6KbdKTivj14EPpP2MB0-NNfRj-9s8',
    redditAuthor: 'fatalzan',
    redditLabel: 'Day 5 Cyclethon 5 Infographics',
    redditUrl: 'https://old.reddit.com/r/CDawgVA/comments/1sgrwik/day_5_cyclethon_5_infographics/',
    startPoint: 'Ōkubo Station',
    startPointJp: '大久保駅',
    timeCycling: 319,
    totalAmountRaised: 353851,
    twitchUrl: 'https://www.twitch.tv/videos/2743372346',
    windSpeedMs: 3.25,
    youtubeUrl: 'https://www.youtube.com/watch?v=w1XIP_krp7A',
  },
  {
    amountRaised: 58154,
    amountRaisedCurrency: 'USD',
    avgTempCelsius: 13.5,
    caloriesBurnt: 6359,
    dayKey: 'day-6',
    destination: 'Nezugaseki Station',
    destinationJp: '鼠ケ関駅',
    distanceKm: 96.6,
    mapEmbedUrl: 'https://www.google.com/maps/d/embed?mid=1Ji6KbdKTivj14EPpP2MB0-NNfRj-9s8',
    mapLocations: [
      {
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=15549417925211908634',
        id: 'd6-loc-1',
        title: 'Kisakata Station',
        titleJp: '象潟駅',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=3214446260909574137',
        id: 'd6-loc-2',
        title: 'Jūroku Rakan Iwa',
        titleJp: '十六羅漢岩供養石仏群',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=8893054556107304039',
        id: 'd6-loc-3',
        title: 'FamilyMart Sugasato',
        titleJp: 'ファミリーマート 遊佐西浜店',
      },
      {
        category: 'Event',
        googleMapsUrl: 'https://maps.google.com/?cid=15317150591066531973',
        id: 'd6-loc-4',
        socials: [{ platform: 'instagram', url: 'https://www.instagram.com/uenoyama_jitensha/' }],
        title: 'Kaminoyama Bicycle Shop',
        titleJp: '上ノ山自転車',
        websiteUrl: 'https://uenoyama.exblog.jp/',
      },
      {
        category: 'Dining',
        googleMapsUrl: 'https://maps.google.com/?cid=12773557873819450085',
        id: 'd6-loc-5',
        title: 'Cafe Gelato Moare',
        titleJp: 'カフェ e ジェラート モアレ',
        websiteUrl: 'https://gelatomoire.net/',
      },
      {
        category: 'Event',
        googleMapsUrl: 'https://maps.google.com/?cid=7355840718083781796',
        id: 'd6-loc-6',
        title: '7-Eleven (Natsuki Appearance)',
        titleJp: 'セブン-イレブン 酒田宮野浦店 (ナツキ登場)',
      },
      {
        category: 'Tour',
        googleMapsUrl: 'https://maps.google.com/?cid=5568327751054857591',
        id: 'd6-loc-7',
        title: 'Kamo Aquarium',
        titleJp: '鶴岡市立加茂水族館',
        websiteUrl: 'https://kamo-kurage.jp/',
      },
      {
        category: 'Event',
        googleMapsUrl: 'https://www.google.com/maps/place/38°45\'24.9"N+139°43\'10.5"E/',
        id: 'd6-loc-8',
        title: 'Roadblock',
        titleJp: '通行止め',
      },
      {
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=4716328829492959641',
        id: 'd6-loc-9',
        title: 'Nezugaseki Station',
        titleJp: '鼠ケ関駅',
      },
    ],
    mapUrl: 'https://www.google.com/maps/d/u/1/edit?mid=1Ji6KbdKTivj14EPpP2MB0-NNfRj-9s8',
    redditAuthor: 'fatalzan',
    redditLabel: 'Day 6 Cyclethon 5 Infographics',
    redditUrl: 'https://old.reddit.com/r/CDawgVA/comments/1shlepb/day_6_cyclethon_5_infographics/',
    startPoint: 'Kisakata Station',
    startPointJp: '象潟駅',
    timeCycling: 334,
    totalAmountRaised: 412005,
    twitchUrl: 'https://www.twitch.tv/videos/2744168220',
    windSpeedMs: 6.61,
    youtubeUrl: 'https://www.youtube.com/watch?v=fuArgEt8X-o',
  },
  {
    amountRaised: 67358,
    amountRaisedCurrency: 'USD',
    avgTempCelsius: 13.1,
    caloriesBurnt: 5186,
    dayKey: 'day-7',
    destination: 'Niigata Station',
    destinationJp: '新潟駅',
    distanceKm: 100,
    donationWars: [
      {
        endTimestamp: 1775874840,
        startTimestamp: 1775873040,
        title: 'Donation War - by Sanrio Characters',
        titleJp: '寄付対決（サンリオキャラクターズ）',
        type: 'sanrio',
      },
      {
        endTimestamp: 1775892600,
        startTimestamp: 1775890000,
        title: 'Donation War - by Pokemon (Gen 1)',
        titleJp: '寄付対決（ポケモン 初代）',
        type: 'pokemon',
      },
    ],
    mapEmbedUrl: 'https://www.google.com/maps/d/embed?mid=1Ji6KbdKTivj14EPpP2MB0-NNfRj-9s8',
    mapLocations: [
      {
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=4716328829492959641',
        id: 'd7-loc-1',
        title: 'Nezugaseki Station',
        titleJp: '鼠ケ関駅',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://www.google.com/maps/place/38°24\'32.3"N+139°28\'00.0"E/',
        id: 'd7-loc-2',
        title: 'Break Area',
        titleJp: '休憩ポイント',
      },
      {
        category: 'Dining',
        googleMapsUrl: 'https://maps.google.com/?cid=15917184753182133068',
        id: 'd7-loc-3',
        title: 'STRING FIELD',
        titleJp: 'ストリングフィールド',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=3162704922559726878',
        id: 'd7-loc-4',
        title: '7-Eleven; Shiunji Fujituskahama',
        titleJp: 'セブン-イレブン 紫雲寺藤塚浜店',
      },
      {
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=4259721950822769642',
        id: 'd7-loc-5',
        title: 'Niigata Station',
        titleJp: '新潟駅',
      },
    ],
    mapUrl: 'https://www.google.com/maps/d/u/1/edit?mid=1Ji6KbdKTivj14EPpP2MB0-NNfRj-9s8',
    redditAuthor: 'fatalzan',
    redditLabel: 'Day 7 Cyclethon 5',
    redditUrl: 'https://old.reddit.com/r/CDawgVA/comments/1siee37/day_7_cyclethon_5/',
    startPoint: 'Nezugaseki Station',
    startPointJp: '鼠ケ関駅',
    timeCycling: 355,
    totalAmountRaised: 479363,
    twitchUrl: 'https://www.twitch.tv/videos/2744984082',
    windSpeedMs: 12.22,
    youtubeUrl: 'https://www.youtube.com/watch?v=UHilz9HZ7q8',
  },
  {
    amountRaised: 57059,
    amountRaisedCurrency: 'USD',
    avgTempCelsius: 11.9,
    caloriesBurnt: 4166,
    dayKey: 'day-8',
    destination: 'Kashiwazaki Station',
    destinationJp: '柏崎駅',
    distanceKm: 88,
    donationWars: [
      {
        endTimestamp: 1775964120,
        startTimestamp: 1775962020,
        title: 'Donation War - by Gacha Game',
        titleJp: '寄付対決（ガチャゲーム）',
        type: 'gacha',
      },
      {
        endTimestamp: 1775979000,
        startTimestamp: 1775977200,
        title: 'Donation War - by Pizza Topping',
        titleJp: '寄付対決（ピザのトッピング）',
        type: 'pizza',
      },
    ],
    mapEmbedUrl: 'https://www.google.com/maps/d/embed?mid=1Ji6KbdKTivj14EPpP2MB0-NNfRj-9s8',
    mapLocations: [
      {
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=15719574154284170546',
        id: 'd8-loc-1',
        title: 'Hotel Sunroute Niigata',
        titleJp: 'ホテルサンルート新潟',
        websiteUrl: 'https://sotetsu-hotels.com/sunroute/niigata/',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=17312527673822777344',
        id: 'd8-loc-2',
        title: '7-Eleven; Makigata-higashi Interchange',
        titleJp: 'セブン-イレブン 巻潟東インター店',
      },
      {
        category: 'Dining',
        googleMapsUrl: 'https://maps.google.com/?cid=8940724211290631168',
        id: 'd8-loc-3',
        title: 'Chinese restaurant',
        titleJp: '中国料理家和',
      },
      {
        category: 'Tour',
        googleMapsUrl: 'https://maps.google.com/?cid=11013057086364400029',
        id: 'd8-loc-4',
        title: 'Izumozaki Retro Museum',
        titleJp: '出雲崎レトロミュージアム',
        websiteUrl: 'https://retromuseum.co.jp/',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=12368237862513353107',
        id: 'd8-loc-5',
        title: 'Familymart Izumozaki Kawanishi Shop',
        titleJp: 'ファミリーマート 出雲崎川西店',
      },
      {
        category: 'Event',
        googleMapsUrl: 'https://www.google.com/maps/place/37°22\'13.0"N+138°34\'40.3"E/',
        id: 'd8-loc-6',
        title: 'Supporter Stop',
        titleJp: '応援交流',
      },
      {
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=12806925985442738745',
        id: 'd8-loc-7',
        title: 'Kashiwazaki Station',
        titleJp: '柏崎駅',
      },
    ],
    mapUrl: 'https://www.google.com/maps/d/u/1/edit?mid=1Ji6KbdKTivj14EPpP2MB0-NNfRj-9s8',
    redditAuthor: 'fatalzan',
    redditLabel: 'Day 8 Cyclethon 5',
    redditUrl: 'https://old.reddit.com/r/CDawgVA/comments/1sjc33p/day_8_cyclethon_5/',
    startPoint: 'Niigata Station',
    startPointJp: '新潟駅',
    timeCycling: 267,
    totalAmountRaised: 536422,
    twitchUrl: 'https://www.twitch.tv/videos/2745861959',
    windSpeedMs: 3.56,
    youtubeUrl: 'https://www.youtube.com/watch?v=QGHqV2J3uYU',
  },
  {
    amountRaised: 57059,
    amountRaisedCurrency: 'USD',
    avgTempCelsius: 11.9,
    caloriesBurnt: 4166,
    dayKey: 'day-9',
    destination: 'Itoigawa Station',
    destinationJp: '糸魚川駅',
    distanceKm: 88,
    donationWars: [
      {
        endTimestamp: 1776062400,
        startTimestamp: 1776060600,
        title: 'Donation War - by Country',
        titleJp: '寄付対決（国別）',
        type: 'country',
      },
      {
        endTimestamp: 1776069600,
        startTimestamp: 1776067800,
        title: 'Donation War - by Computer Game',
        titleJp: '寄付対決（ゲーム）',
        type: 'game',
      },
    ],
    mapEmbedUrl: 'https://www.google.com/maps/d/embed?mid=1JGjsCq08o__adfFb7ur9a3lqna18al8',
    mapLocations: [
      {
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=826089075759497644',
        id: 'd9-loc-1',
        title: 'Hotel New KASHIWAZAKI',
        titleJp: 'ホテル ニューグリーン柏崎',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=14804618825472714344',
        id: 'd9-loc-2',
        title: '7-Eleven Joetsu Kakizaki Interchange',
        titleJp: 'セブン-イレブン 上越柿崎インター店',
      },
      {
        category: 'Dining',
        googleMapsUrl: 'https://maps.google.com/?cid=15216063604210570461',
        id: 'd9-loc-3',
        title: 'Gusto Café Restaurant',
        titleJp: 'Caféレストラン ガスト 上越店',
      },
      {
        category: 'Tour',
        googleMapsUrl: 'https://maps.google.com/?cid=7425402579530262405',
        id: 'd9-loc-4',
        title: 'Takada Castle Site Park',
        titleJp: '高田城址公園',
        websiteUrl:
          'https://www.city.joetsu.niigata.jp/soshiki/toshiseibi/takada-castle-site-park.html',
      },
      {
        category: 'Rest Stop',
        googleMapsUrl: 'https://maps.google.com/?cid=758261300187716529',
        id: 'd9-loc-5',
        title: 'Roadside Station Marine Dream Nou',
        titleJp: '道の駅 マリンドリーム能生',
        websiteUrl: 'http://www.marine-dream.net/',
      },
      {
        category: 'Tour',
        googleMapsUrl: 'https://maps.google.com/?cid=2307125089587057809',
        id: 'd9-loc-6',
        title: 'Nou Lighthouse',
        titleJp: '能生港灯台',
        websiteUrl: 'https://romance-toudai.uminohi.jp/toudai/noko.html',
      },
      {
        category: 'Terminal',
        googleMapsUrl: 'https://maps.google.com/?cid=9412296373492469507',
        id: 'd9-loc-7',
        title: 'Itoigawa Station',
        titleJp: '糸魚川駅',
      },
    ],
    mapUrl: 'https://www.google.com/maps/d/viewer?mid=1JGjsCq08o__adfFb7ur9a3lqna18al8',
    redditAuthor: 'fatalzan',
    redditLabel: 'Day 9 Cyclethon 5',
    redditUrl: 'https://old.reddit.com/r/CDawgVA/comments/1sk5p1a/day_9_cyclethon_5/',
    startPoint: 'Kashiwazaki Station',
    startPointJp: '柏崎駅',
    timeCycling: 267,
    totalAmountRaised: 593481,
    twitchUrl: 'https://www.twitch.tv/videos/2746723068',
    windSpeedMs: 3.56,
    youtubeUrl: 'https://www.youtube.com/watch?v=Vxrzfe0rGZM',
  },
  { dayKey: 'day-10', destination: '', startPoint: '' },
  { dayKey: 'day-11', destination: '', startPoint: '' },
  { dayKey: 'day-12', destination: '', startPoint: '' },
  { dayKey: 'day-13', destination: '', startPoint: '' },
  { dayKey: 'day-14', destination: '', startPoint: '' },
  { dayKey: 'day-15', destination: '', startPoint: '' },
];
