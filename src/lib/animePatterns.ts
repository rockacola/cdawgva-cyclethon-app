interface AnimePattern {
  id: string;
  name: string;
  nameJa: string;
  pattern: RegExp;
}

const ANIME_PATTERNS: AnimePattern[] = [
  {
    id: 'oshi-no-ko',
    name: '[Oshi No Ko]',
    nameJa: '【推しの子】',
    pattern: /\b(\[Oshi\s+no\s+Ko\]|oshi\s+no\s+ko)\b/i,
  },
  {
    id: 'eighty-six',
    name: '86',
    nameJa: '86―エイティシックス―',
    pattern: /\b(86\s+eighty[-\s]?six|eighty[-\s]?six|86)\b/i,
  },
  {
    id: 'sora-yori-mo-tooi-basho',
    name: 'A Place Further Than The Universe',
    nameJa: '宇宙よりも遠い場所',
    pattern:
      /\b(a\s+place\s+further\s+th[ae]n\s+the\s+universe|A\s+Place\s+Further\s+Than\s+The\s+Universe|Sora\s+yori\s+mo\s+Tooi\s+Basho|sora\s+yori|yorimoi)\b/i,
  },
  {
    id: 'yubisaki-to-renren',
    name: 'A Sign of Affection',
    nameJa: 'ゆびさきと恋々',
    pattern: /\b(A\s+Sign\s+of\s+Affection|Yubisaki\s+to\s+Renren)\b/i,
  },
  {
    id: 'koe-no-katachi',
    name: 'A Silent Voice',
    nameJa: '聲の形',
    pattern: /\b(Koe\s+no\s+Katachi|A\s+Silent\s+Voice|silent\s+voice)\b/i,
  },
  { id: 'akira', name: 'Akira', nameJa: 'AKIRA', pattern: /\b(Akira)\b/i },
  {
    id: 'angel-beats',
    name: 'Angel Beats',
    nameJa: 'Angel Beats!',
    pattern: /\b(Angel\s+Beats)\b/i,
  },
  {
    id: 'ano-hi-mita-hana-no-namae-wo-bokutachi-wa-mada-shiranai',
    name: 'Anohana',
    nameJa: 'あの日見た花の名前を僕達はまだ知らない。',
    pattern:
      /\b(Ano\s+Hi\s+Mita\s+Hana\s+no\s+Namae\s+wo\s+Bokutachi\s+wa\s+Mada\s+Shiranai|ano\s+hana|Anohana)\b/i,
  },
  {
    id: 'honzuki-no-gekokujou',
    name: 'Ascendance of a Bookworm',
    nameJa: '本好きの下剋上',
    pattern: /\b(Ascendance\s+of\s+a\s+Bookworm|Honzuki\s+no\s+Gekokujou)\b/i,
  },
  {
    id: 'shingeki-no-kyojin',
    name: 'Attack on Titan',
    nameJa: '進撃の巨人',
    pattern: /\b(Shingeki\s+no\s+Kyojin|Attack\s+on\s+Titan|aot|snk)\b/i,
  },
  { id: 'baccano', name: 'Baccano', nameJa: 'バッカーノ！', pattern: /\b(Baccano)\b/i },
  {
    id: 'banana-fish',
    name: 'Banana Fish',
    nameJa: 'BANANA FISH',
    pattern: /\b(Banana\s+Fish)\b/i,
  },
  { id: 'bang-dream', name: 'BanG Dream', nameJa: 'BanG Dream!', pattern: /\b(BanG\s+Dream)\b/i },
  {
    id: 'doupo-cangqiong',
    name: 'Battle Through the Heavens',
    nameJa: '斗破苍穹',
    pattern: /\b(Battle\s+Through\s+the\s+Heavens|Doupo\s+Cangqiong)\b/i,
  },
  { id: 'beck', name: 'Beck', nameJa: 'BECK', pattern: /\b(Beck)\b/i },
  { id: 'berserk', name: 'Berserk', nameJa: 'ベルセルク', pattern: /\b(Berserk)\b/i },
  {
    id: 'kenpuu-denki-berserk',
    name: 'Berserk',
    nameJa: '剣風伝奇ベルセルク',
    pattern: /\b(Kenpuu\s+Denki\s+Berserk|Berserk)\b/i,
  },
  {
    id: 'bible-black',
    name: 'Bible Black',
    nameJa: 'Bible Black',
    pattern: /\b(bible\s+black)\b/i,
  },
  {
    id: 'black-lagoon',
    name: 'Black Lagoon',
    nameJa: 'BLACK LAGOON',
    pattern: /\b(Black\s+Lagoon)\b/i,
  },
  { id: 'bleach', name: 'Bleach', nameJa: 'BLEACH', pattern: /\b(Bleach|tybw)\b/i },
  {
    id: 'boku-no-pico',
    name: 'Boku no Pico',
    nameJa: 'ぼくのぴこ',
    pattern: /\b(boku\s+no\s+pico|bocu\s+no\s+pico)\b/i,
  },
  {
    id: 'yofukashi-no-uta',
    name: 'Call of the Night',
    nameJa: 'よふかしのうた',
    pattern: /\b(Call\s+of\s+the\s+Night|Yofukashi\s+no\s+Uta)\b/i,
  },
  {
    id: 'cardcaptor-sakura',
    name: 'Cardcaptor Sakura',
    nameJa: 'カードキャプターさくら',
    pattern: /\b(Cardcaptor\s+Sakura)\b/i,
  },
  { id: 'chihayafuru', name: 'Chihayafuru', nameJa: 'ちはやふる', pattern: /\b(Chihayafuru)\b/i },
  { id: 'clannad', name: 'Clannad', nameJa: 'CLANNAD', pattern: /\b(Clannad)\b/i },
  {
    id: 'code-geass',
    name: 'Code Geass',
    nameJa: 'コードギアス 反逆のルルーシュ',
    pattern: /\b(Code\s+Geass|lelouch)\b/i,
  },
  {
    id: 'cowboy-bebop',
    name: 'Cowboy Bebop',
    nameJa: 'カウボーイビバップ',
    pattern: /\b(Cowboy\s+Bebop|bebop)\b/i,
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    nameJa: 'サイバーパンク エッジランナーズ',
    pattern: /\b(edgerunners|Cyberpunk)\b/i,
  },
  {
    id: 'dandadan',
    name: 'Dan Da Dan',
    nameJa: 'ダンダダン',
    pattern: /\b(Dan\s+Da\s+Dan|Dandadan)\b/i,
  },
  { id: 'death-note', name: 'Death Note', nameJa: 'DEATH NOTE', pattern: /\b(Death\s+Note)\b/i },
  {
    id: 'death-parade',
    name: 'Death Parade',
    nameJa: 'デス・パレード',
    pattern: /\b(Death\s+Parade)\b/i,
  },
  {
    id: 'dungeon-meshi',
    name: 'Delicious in Dungeon',
    nameJa: 'ダンジョン飯',
    pattern: /\b(Delicious\s+in\s+Dungeon|Dungeon\s+Meshi)\b/i,
  },
  {
    id: 'kimetsu-no-yaiba',
    name: 'Demon Slayer',
    nameJa: '鬼滅の刃',
    pattern: /\b(Kimetsu\s+no\s+Yaiba|Demon\s+Slayer|kimetsu)\b/i,
  },
  {
    id: 'detective-conan',
    name: 'Detective Conan',
    nameJa: '名探偵コナン',
    pattern: /\b(detective\s+conan|case\s+closed|meitantei\s+conan)\b/i,
  },
  {
    id: 'detroit-metal-city',
    name: 'Detroit Metal City',
    nameJa: 'デトロイト・メタル・シティ',
    pattern: /\b(Detroit\s+Metal\s+City)\b/i,
  },
  {
    id: 'dragon-ball',
    name: 'Dragon Ball',
    nameJa: 'ドラゴンボール',
    pattern: /\b(Dragon\s+Ball|dragon\s*ball)\b/i,
  },
  {
    id: 'dragon-ball-super',
    name: 'Dragon Ball Super',
    nameJa: 'ドラゴンボール超',
    pattern: /\b(Dragon\s+Ball\s+Super|dbs)\b/i,
  },
  {
    id: 'dragon-ball-z',
    name: 'Dragon Ball Z',
    nameJa: 'ドラゴンボールZ',
    pattern: /\b(Dragon\s+Ball\s+Z|dbz)\b/i,
  },
  { id: 'durarara', name: 'Durarara', nameJa: 'デュラララ!!', pattern: /\b(Durarara)\b/i },
  {
    id: 'eden-of-the-east',
    name: 'Eden of the East',
    nameJa: '東のエデン',
    pattern: /\b(eden\s+of\s+the\s+east|higashi\s+no\s+eden)\b/i,
  },
  {
    id: 'boku-dake-ga-inai-machi',
    name: 'Erased',
    nameJa: '僕だけがいない街',
    pattern: /\b(Boku\s+dake\s+ga\s+Inai\s+Machi)\b/i,
  },
  {
    id: 'eromanga-sensei',
    name: 'Eromanga Sensei',
    nameJa: 'エロマンガ先生',
    pattern: /\b(eromanga\s+sensei)\b/i,
  },
  {
    id: 'koukyoushihen-eureka-seven',
    name: 'Eureka Seven',
    nameJa: '交響詩篇エウレカセブン',
    pattern: /\b(Koukyoushihen\s+Eureka\s+Seven|Eureka\s+Seven)\b/i,
  },
  {
    id: 'shin-evangelion',
    name: 'Evangelion',
    nameJa: 'シン・エヴァンゲリオン劇場版',
    pattern: /\b(Shin\s+Evangelion|neon\s+genesis|Evangelion|nge|eva)\b/i,
  },
  {
    id: 'fate-stay-night',
    name: 'Fate/stay night',
    nameJa: 'Fate/stay night',
    pattern: /\b(Fate[/\s]*stay\s+night)\b/i,
  },
  {
    id: 'hajime-no-ippo',
    name: 'Fighting Spirit',
    nameJa: 'はじめの一歩',
    pattern: /\b(Hajime\s+no\s+Ippo|Fighting\s+Spirit|ippo)\b/i,
  },
  {
    id: 'enen-no-shouboutai',
    name: 'Fire Force',
    nameJa: '炎炎ノ消防隊',
    pattern: /\b(Enen\s+no\s+Shouboutai|Fire\s+Force)\b/i,
  },
  {
    id: 'hokuto-no-ken',
    name: 'Fist of the North Star',
    nameJa: '北斗の拳',
    pattern: /\b(Fist\s+of\s+the\s+North\s+Star|Hokuto\s+no\s+Ken)\b/i,
  },
  { id: 'flcl', name: 'FLCL', nameJa: 'フリクリ', pattern: /\b(FLCL)\b/i },
  {
    id: 'sousou-no-frieren',
    name: "Frieren: Beyond Journey's End",
    nameJa: '葬送のフリーレン',
    pattern: /\b(beyond\s+journey.?s\s+end|Sousou\s+no\s+Frieren|Frieren)\b/i,
  },
  {
    id: 'fruits-basket',
    name: 'Fruits Basket',
    nameJa: 'フルーツバスケット',
    pattern: /\b(Fruits\s+Basket|furuba)\b/i,
  },
  {
    id: 'fullmetal-alchemist',
    name: 'Fullmetal Alchemist',
    nameJa: '鋼の錬金術師',
    pattern: /\b(Fullmetal\s+Alchemist|fmab|fma)\b/i,
  },
  {
    id: 'koukaku-kidoutai',
    name: 'Ghost in the Shell',
    nameJa: '攻殻機動隊',
    pattern: /\b(Ghost\s+in\s+the\s+Shell|Koukaku\s+Kidoutai|gits)\b/i,
  },
  { id: 'gintama', name: 'Gintama', nameJa: '銀魂', pattern: /\b(Gintama)\b/i },
  {
    id: 'girls-band-cry',
    name: 'Girls Band Cry',
    nameJa: 'ガールズバンドクライ',
    pattern: /\b(Girls\s+Band\s+Cry)\b/i,
  },
  {
    id: 'golden-kamuy',
    name: 'Golden Kamuy',
    nameJa: 'ゴールデンカムイ',
    pattern: /\b(Golden\s+Kamuy)\b/i,
  },
  {
    id: 'great-teacher-onizuka',
    name: 'Great Teacher Onizuka',
    nameJa: 'GTO',
    pattern: /\b(Great\s+Teacher\s+Onizuka|gto)\b/i,
  },
  {
    id: 'tengen-toppa-gurren-lagann',
    name: 'Gurren Lagann',
    nameJa: '天元突破グレンラガン',
    pattern: /\b(Tengen\s+Toppa\s+Gurren\s+Lagann|Gurren\s+Lagann|ttgl)\b/i,
  },
  {
    id: 'haibane-renmei',
    name: 'Haibane Renmei',
    nameJa: '灰羽連盟',
    pattern: /\b(Haibane\s+Renmei)\b/i,
  },
  {
    id: 'shigokuraku',
    name: "Hell's Paradise",
    nameJa: '地獄楽',
    pattern: /\b(Hell's\s+Paradise|Jigokuraku)\b/i,
  },
  {
    id: 'hellsing-ultimate',
    name: 'Hellsing Ultimate',
    nameJa: 'HELLSING OVA',
    pattern: /\b(Hellsing\s+Ultimate)\b/i,
  },
  {
    id: 'hikaru-no-go',
    name: 'Hikaru no Go',
    nameJa: 'ヒカルの碁',
    pattern: /\b(Hikaru\s+no\s+Go)\b/i,
  },
  {
    id: 'hunter-x-hunter',
    name: 'Hunter x Hunter',
    nameJa: 'HUNTER×HUNTER',
    pattern: /\b(Hunter\s+x\s+Hunter|hxh)\b/i,
  },
  { id: 'hyouka', name: 'Hyouka', nameJa: '氷菓', pattern: /\b(Hyouka)\b/i },
  {
    id: 'kono-sekai-no-katasumi-ni',
    name: 'In This Corner of the World',
    nameJa: 'この世界の片隅に',
    pattern: /\b(In\s+This\s+Corner\s+of\s+the\s+World|Kono\s+Sekai\s+no\s+Katasumi\s+ni)\b/i,
  },
  {
    id: 'initial-d-first-stage',
    name: 'Initial D First Stage',
    nameJa: '頭文字D',
    pattern: /\b(Initial\s+D\s+First\s+Stage|initial\s+d)\b/i,
  },
  {
    id: 'kimi-wa-houkago-insomnia',
    name: 'Insomniacs After School',
    nameJa: '君は放課後インソムニア',
    pattern: /\b(Kimi\s+wa\s+Houkago\s+Insomnia|Insomniacs\s+After\s+School)\b/i,
  },
  {
    id: 'jujutsu-kaisen',
    name: 'Jujutsu Kaisen',
    nameJa: '呪術廻戦',
    pattern: /\b(Jujutsu\s+Kaisen|jjk)\b/i,
  },
  { id: 'k-on', name: 'K-ON', nameJa: 'けいおん！', pattern: /\b(k[-\s]?on|K-On)\b/i },
  {
    id: 'kimi-ni-todoke',
    name: 'Kimi ni Todoke',
    nameJa: '君に届け',
    pattern: /\b(Kimi\s+ni\s+Todoke)\b/i,
  },
  {
    id: 'kino-no-tabi',
    name: "Kino's Journey",
    nameJa: 'キノの旅',
    pattern: /\b(Kino\s+no\s+Tabi|Kino's\s+Journey)\b/i,
  },
  {
    id: 'kono-subarashii-sekai-ni-shukufuku-wo',
    name: 'KonoSuba',
    nameJa: 'この素晴らしい世界に祝福を！',
    pattern: /\b(Kono\s+Subarashii\s+Sekai\s+ni\s+Shukufuku\s+wo|KonoSuba)\b/i,
  },
  {
    id: 'kuroko-no-basket',
    name: "Kuroko's Basketball",
    nameJa: '黒子のバスケ',
    pattern: /\b(Kuroko's\s+Basketball|Kuroko\s+no\s+Basket)\b/i,
  },
  {
    id: 'houseki-no-kuni',
    name: 'Land of the Lustrous',
    nameJa: '宝石の国',
    pattern: /\b(Land\s+of\s+the\s+Lustrous|Houseki\s+no\s+Kuni)\b/i,
  },
  {
    id: 'ginga-eiyuu-densetsu',
    name: 'Legend of the Galactic Heroes',
    nameJa: '銀河英雄伝説',
    pattern: /\b(Legend\s+of\s+the\s+Galactic\s+Heroes|Ginga\s+Eiyuu\s+Densetsu)\b/i,
  },
  {
    id: 'guimi-zhi-zhu',
    name: 'Lord of Mysteries',
    nameJa: '诡秘之主',
    pattern: /\b(Lord\s+of\s+Mysteries|Guimi\s+Zhi\s+Zhu)\b/i,
  },
  {
    id: 'lycoris-recoil',
    name: 'Lycoris Recoil',
    nameJa: 'リコリス・リコイル',
    pattern: /\b(Lycoris\s+Recoil|lycoris)\b/i,
  },
  {
    id: 'made-in-abyss',
    name: 'Made in Abyss',
    nameJa: 'メイドインアビス',
    pattern: /\b(Made\s+in\s+Abyss)\b/i,
  },
  {
    id: 'maison-ikkoku',
    name: 'Maison Ikkoku',
    nameJa: 'めぞん一刻',
    pattern: /\b(Maison\s+Ikkoku)\b/i,
  },
  {
    id: 'make-heroine-ga-oosugiru',
    name: 'Makeine',
    nameJa: '負けヒロインが多すぎる！',
    pattern: /\b(Make\s+Heroine\s+ga\s+Oosugiru|Makeine)\b/i,
  },
  {
    id: '3-gatsu-no-lion',
    name: 'March Comes In Like a Lion',
    nameJa: '3月のライオン',
    pattern: /\b(March\s+Comes\s+In\s+Like\s+a\s+Lion|3-gatsu\s+no\s+Lion)\b/i,
  },
  {
    id: 'megalo-box',
    name: 'Megalobox',
    nameJa: 'メガロボクス',
    pattern: /\b(Megalo\s+Box|Megalobox)\b/i,
  },
  {
    id: 'mob-psycho',
    name: 'Mob Psycho',
    nameJa: 'モブサイコ100',
    pattern: /\b(Mob\s+Psycho)\b/i,
  },
  {
    id: 'monster-musume',
    name: 'Monster Musume',
    nameJa: 'モンスター娘のいる日常',
    pattern: /\b(monster\s+musume|mon\s+musu)\b/i,
  },
  {
    id: 'mushishi',
    name: 'Mushi-Shi',
    nameJa: '蟲師',
    pattern: /\b(Mushi-Shi|Mushishi)\b/i,
  },
  {
    id: 'mushishi-zoku-shou',
    name: 'Mushi-shi',
    nameJa: '蟲師 続章',
    pattern: /\b(Mushishi\s+Zoku\s+Shou|Mushi-shi)\b/i,
  },
  {
    id: 'mushoku-tensei',
    name: 'Mushoku Tensei',
    nameJa: '無職転生',
    pattern: /\b(jobless\s+reincarnation|Mushoku\s+Tensei)\b/i,
  },
  {
    id: 'naruto',
    name: 'Naruto Shippuden',
    nameJa: 'NARUTO -ナルト- 疾風伝',
    pattern: /\b(Naruto\s+Shippuden|shippuden|Naruto)\b/i,
  },
  {
    id: 'shinseiki-evangelion',
    name: 'Neon Genesis Evangelion',
    nameJa: '新世紀エヴァンゲリオン',
    pattern: /\b(Neon\s+Genesis\s+Evangelion|Shinseiki\s+Evangelion)\b/i,
  },
  {
    id: 'no-game-no-life',
    name: 'No Game, No Life',
    nameJa: 'ノーゲーム・ノーライフ',
    pattern: /\b(No\s+Game,\s+No\s+Life|No\s+Game\s+No\s+Life)\b/i,
  },
  { id: 'one-piece', name: 'One Piece', nameJa: 'ONE PIECE', pattern: /\b(One\s+Piece)\b/i },
  { id: 'overlord', name: 'Overlord', nameJa: 'オーバーロード', pattern: /\b(Overlord)\b/i },
  { id: 'paprika', name: 'Paprika', nameJa: 'パプリカ', pattern: /\b(Paprika)\b/i },
  {
    id: 'kidou-keisatsu-patlabor',
    name: 'Patlabor',
    nameJa: '機動警察パトレイバー',
    pattern: /\b(Kidou\s+Keisatsu\s+Patlabor|Patlabor)\b/i,
  },
  {
    id: 'mawaru-penguindrum',
    name: 'Penguindrum',
    nameJa: '輪るピングドラム',
    pattern: /\b(Mawaru\s+Penguindrum|Penguindrum)\b/i,
  },
  { id: 'phantom', name: 'Phantom', nameJa: 'Phantom', pattern: /\b(Phantom)\b/i },
  {
    id: 'ping-pong-the-animation',
    name: 'Ping Pong the Animation',
    nameJa: 'ピンポン THE ANIMATION',
    pattern: /\b(Ping\s+Pong\s+the\s+Animation)\b/i,
  },
  { id: 'planetes', name: 'Planetes', nameJa: 'プラネテス', pattern: /\b(Planetes)\b/i },
  {
    id: 'mononoke-hime',
    name: 'Princess Mononoke',
    nameJa: 'もののけ姫',
    pattern: /\b(Princess\s+Mononoke|Mononoke\s+Hime|mononoke)\b/i,
  },
  {
    id: 'princess-tutu',
    name: 'Princess Tutu',
    nameJa: 'プリンセスチュチュ',
    pattern: /\b(Princess\s+Tutu)\b/i,
  },
  {
    id: 'psycho-pass',
    name: 'Psycho-Pass',
    nameJa: 'PSYCHO-PASS サイコパス',
    pattern: /\b(Psycho-Pass)\b/i,
  },
  {
    id: 'seishun-buta-yarou-wa-yumemiru-shoujo-no-yume-wo-minai',
    name: 'Rascal Does Not Dream',
    nameJa: '青春ブタ野郎はゆめみる少女の夢を見ない',
    pattern:
      /\b(Seishun\s+Buta\s+Yarou\s+wa\s+Yumemiru\s+Shoujo\s+no\s+Yume\s+wo\s+Minai|rascal\s+does\s+not\s+dream|seishun\s+buta\s+yarou|bunny\s+girl\s+senpai|aobuta)\b/i,
  },
  {
    id: 're-zero-kara-hajimeru-isekai-seikatsu',
    name: 'Re:Zero',
    nameJa: 'Re:ゼロから始める異世界生活',
    pattern: /\b(re\s*:\s*zero|rezero)\b/i,
  },
  {
    id: 'katekyou-hitman-reborn',
    name: 'Reborn',
    nameJa: '家庭教師ヒットマンREBORN!',
    pattern: /\b(Katekyou\s+Hitman\s+Reborn|Reborn)\b/i,
  },
  {
    id: 'redo-of-healer',
    name: 'Redo of Healer',
    nameJa: '回復術士のやり直し',
    pattern: /\b(redo\s+of\s+healer|kaiyari)\b/i,
  },
  {
    id: 'kaze-ga-tsuyoku-fuiteiru',
    name: 'Run with the Wind',
    nameJa: '風が強く吹いている',
    pattern: /\b(Kaze\s+ga\s+Tsuyoku\s+Fuiteiru|Run\s+with\s+the\s+Wind)\b/i,
  },
  {
    id: 'youjo-senki',
    name: 'Saga of Tanya the Evil',
    nameJa: '幼女戦記',
    pattern: /\b(Saga\s+of\s+Tanya\s+the\s+Evil|Youjo\s+Senki)\b/i,
  },
  {
    id: 'sailor-moon',
    name: 'Sailor Moon',
    nameJa: '美少女戦士セーラームーン',
    pattern: /\b(sailor\s+moon|bishoujo\s+senshi\s+sailor\s+moon)\b/i,
  },
  {
    id: 'samurai-champloo',
    name: 'Samurai Champloo',
    nameJa: 'サムライチャンプルー',
    pattern: /\b(Samurai\s+Champloo)\b/i,
  },
  {
    id: 'rurouni-kenshin',
    name: 'Samurai X',
    nameJa: 'るろうに剣心',
    pattern: /\b(Rurouni\s+Kenshin|Samurai\s+X)\b/i,
  },
  {
    id: 'sasaki-to-miyano',
    name: 'Sasaki and Miyano',
    nameJa: '佐々木と宮野',
    pattern: /\b(Sasaki\s+and\s+Miyano|Sasaki\s+to\s+Miyano)\b/i,
  },
  {
    id: 'serial-experiments-lain',
    name: 'Serial Experiments Lain',
    nameJa: 'serial experiments lain',
    pattern: /\b(Serial\s+Experiments\s+Lain)\b/i,
  },
  {
    id: 'gin-no-saji',
    name: 'Silver Spoon',
    nameJa: '銀の匙',
    pattern: /\b(Gin\s+no\s+Saji|Silver\s+Spoon)\b/i,
  },
  {
    id: 'hibike-euphonium',
    name: 'Sound! Euphonium',
    nameJa: '響け！ユーフォニアム',
    pattern: /\b(Hibike!\s+Euphonium|Sound!\s+Euphonium)\b/i,
  },
  {
    id: 'douluo-dalu',
    name: 'Soul Land',
    nameJa: '斗罗大陆',
    pattern: /\b(Douluo\s+Dalu|Soul\s+Land)\b/i,
  },
  {
    id: 'ookami-to-koushinryou',
    name: 'Spice and Wolf',
    nameJa: '狼と香辛料',
    pattern: /\b(Ookami\s+to\s+Koushinryou|Spice\s+and\s+Wolf)\b/i,
  },
  {
    id: 'steel-ball-run',
    name: 'Steel Ball Run',
    nameJa: 'スティール・ボール・ラン',
    pattern: /\b(Steel\s+Ball\s+Run|jojo|jjba)\b/i,
  },
  {
    id: 'steins-gate',
    name: 'Steins;Gate',
    nameJa: 'STEINS;GATE',
    pattern: /\b(steins[;\s]?gate)\b/i,
  },
  {
    id: 'summer-wars',
    name: 'Summer Wars',
    nameJa: 'サマーウォーズ',
    pattern: /\b(Summer\s+Wars)\b/i,
  },
  {
    id: 'macross',
    name: 'Super Dimension Fortress Macross',
    nameJa: '超時空要塞マクロス',
    pattern: /\b(Macross)\b/i,
  },
  {
    id: 'sword-art-online',
    name: 'Sword Art Online',
    nameJa: 'ソードアート・オンライン',
    pattern: /\b(Sword\s+Art\s+Online|sao)\b/i,
  },
  {
    id: 'kusuriya-no-hitorigoto',
    name: 'The Apothecary Diaries',
    nameJa: '薬屋のひとりごと',
    pattern: /\b(Kusuriya\s+no\s+Hitorigoto|apothecary\s+diaries)\b/i,
  },
  {
    id: 'suzumiya-haruhi-no-shoushitsu',
    name: 'The Disappearance of Haruhi Suzumiya',
    nameJa: '涼宮ハルヒの消失',
    pattern: /\b(haruhi\s+suzumiya)\b/i,
  },
  {
    id: 'kara-no-kyoukai',
    name: 'The Garden of Sinners Chapter',
    nameJa: '空の境界',
    pattern: /\b(Kara\s+no\s+Kyoukai)\b/i,
  },
  {
    id: 'yakusoku-no-neverland',
    name: 'The Promised Neverland',
    nameJa: '約束のネバーランド',
    pattern: /\b(The\s+Promised\s+Neverland)\b/i,
  },
  {
    id: 'yojouhan-shinwa-taikei',
    name: 'The Tatami Galaxy',
    nameJa: '四畳半神話大系',
    pattern: /\b(The\s+Tatami\s+Galaxy)\b/i,
  },
  {
    id: 'tensei-shitara-slime-datta-ken',
    name: 'That Time I Got Reincarnated as a Slime',
    nameJa: '転生したらスライムだった件',
    pattern: /\b(slime\s+isekai|tensura)\b/i,
  },
  {
    id: 'tu-bian-yingxiong-x',
    name: 'To Be Hero X',
    nameJa: '凸变英雄X',
    pattern: /\b(To\s+Be\s+Hero\s+X)\b/i,
  },
  {
    id: 'fumetsu-no-anata-e',
    name: 'To Your Eternity',
    nameJa: '不滅のあなたへ',
    pattern: /\b(To\s+Your\s+Eternity)\b/i,
  },
  { id: 'trigun', name: 'Trigun', nameJa: 'トライガン', pattern: /\b(Trigun)\b/i },
  {
    id: 'juuni-kokuki',
    name: 'Twelve Kingdoms',
    nameJa: '十二国記',
    pattern: /\b(twelve\s+kingdoms)\b/i,
  },
  {
    id: 'uma-musume',
    name: 'Umamusume',
    nameJa: 'ウマ娘 プリティーダービー',
    pattern: /\b(Umamusume)\b/i,
  },
  {
    id: 'vinland-saga',
    name: 'Vinland Saga',
    nameJa: 'ヴィンランド・サガ',
    pattern: /\b(Vinland\s+Saga)\b/i,
  },
  {
    id: 'violet-evergarden',
    name: 'Violet Evergarden',
    nameJa: 'ヴァイオレット・エヴァーガーデン',
    pattern: /\b(Violet\s+Evergarden)\b/i,
  },
  {
    id: 'vivy',
    name: "Vivy -Fluorite Eye's Song",
    nameJa: 'Vivy -Fluorite Eye’s Song-',
    pattern: /\b(Vivy)\b/i,
  },
  {
    id: 'nhk-ni-youkoso',
    name: 'Welcome to the N.H.K',
    nameJa: 'NHKにようこそ！',
    pattern: /\b(NHK\s+ni\s+Youkoso)\b/i,
  },
  {
    id: 'yosuga-no-sora',
    name: 'Yosuga no Sora',
    nameJa: 'ヨスガノソラ',
    pattern: /\b(yosuga\s+no\s+sora)\b/i,
  },
  {
    id: 'shigatsu-wa-kimi-no-uso',
    name: 'Your Lie in April',
    nameJa: '四月は君の嘘',
    pattern: /\b(Your\s+Lie\s+in\s+April)\b/i,
  },
  {
    id: 'kimi-no-na-wa',
    name: 'Your Name',
    nameJa: '君の名は。',
    pattern: /\b(Kimi\s+no\s+Na\s+wa|Your\s+Name)\b/i,
  },
  {
    id: 'yuuyuuhakusho',
    name: 'Yu Yu Hakusho',
    nameJa: '幽☆遊☆白書',
    pattern: /\b(Yu\s+Yu\s+Hakusho)\b/i,
  },
  {
    id: 'yuri-on-ice',
    name: 'Yuri!!! On ICE',
    nameJa: 'ユーリ!!! on ICE',
    pattern: /\b(Yuri!!!\s+on\s+Ice)\b/i,
  },
];

export function detectAnimeFromComment(comment: string | null | undefined): string | null {
  if (!comment) {
    return null;
  }

  let firstId: string | null = null;
  let firstIndex = Infinity;
  for (const { id, pattern } of ANIME_PATTERNS) {
    const match = pattern.exec(comment);
    if (match && match.index < firstIndex) {
      firstIndex = match.index;
      firstId = id;
    }
  }
  return firstId;
}

export function animeIdToName(id: string, locale: string = 'EN'): string {
  // const matchedAnime = ANIME_PATTERNS.find((anime) => anime.id === id);
  // return matchedAnime?.name ?? id;

  const entry = ANIME_PATTERNS.find((a) => a.id === id);
  if (!entry) {
    return id;
  }
  return locale === 'JP' ? entry.nameJa : entry.name;
}
