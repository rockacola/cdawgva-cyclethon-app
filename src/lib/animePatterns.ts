const ANIME_PATTERNS: [string, string, RegExp][] = [
  ['steel-ball-run', 'Steel Ball Run', /\b(Steel\s+Ball\s+Run|jojo|jjba)\b/i],
  ['fullmetal-alchemist', 'Fullmetal Alchemist', /\b(Fullmetal\s+Alchemist|fmab|fma)\b/i],
  [
    'sousou-no-frieren',
    "Frieren: Beyond Journey's End",
    /\b(beyond\s+journey.?s\s+end|Sousou\s+no\s+Frieren|Frieren)\b/i,
  ],
  [
    'shingeki-no-kyojin',
    'Attack on Titan',
    /\b(Shingeki\s+no\s+Kyojin|Attack\s+on\s+Titan|aot|snk)\b/i,
  ],
  ['hunter-x-hunter', 'Hunter x Hunter', /\b(Hunter\s+x\s+Hunter|hxh)\b/i],
  [
    'ginga-eiyuu-densetsu',
    'Legend of the Galactic Heroes',
    /\b(Legend\s+of\s+the\s+Galactic\s+Heroes|Ginga\s+Eiyuu\s+Densetsu)\b/i,
  ],
  ['bleach', 'Bleach', /\b(Bleach|tybw)\b/i],
  ['fruits-basket', 'Fruits Basket', /\b(Fruits\s+Basket|furuba)\b/i],
  ['clannad', 'Clannad', /\b(Clannad)\b/i],
  [
    'koe-no-katachi',
    'A Silent Voice',
    /\b(Koe\s+no\s+Katachi|A\s+Silent\s+Voice|silent\s+voice)\b/i,
  ],
  ['code-geass', 'Code Geass', /\b(Code\s+Geass|lelouch)\b/i],
  [
    'kusuriya-no-hitorigoto',
    'The Apothecary Diaries',
    /\b(Kusuriya\s+no\s+Hitorigoto|The\s+Apothecary\s+Diaries|apothecary\s+diaries)\b/i,
  ],
  [
    '3-gatsu-no-lion',
    'March Comes In Like a Lion',
    /\b(March\s+Comes\s+In\s+Like\s+a\s+Lion|3-gatsu\s+no\s+Lion)\b/i,
  ],
  [
    're-zero-kara-hajimeru-isekai-seikatsu',
    'Re:Zero',
    /\b(Re:ZERO\s+-Starting\s+Life\s+in\s+Another\s+World|Re:Zero\s+kara\s+Hajimeru\s+Isekai\s+Seikatsu|re\s*:\s*zero|re\s+zero|rezero)\b/i,
  ],
  ['violet-evergarden', 'Violet Evergarden', /\b(Violet\s+Evergarden)\b/i],
  ['kimi-no-na-wa', 'Your Name', /\b(Kimi\s+no\s+Na\s+wa|Your\s+Name)\b/i],
  ['vinland-saga', 'Vinland Saga', /\b(Vinland\s+Saga|vinland)\b/i],
  ['hajime-no-ippo', 'Fighting Spirit', /\b(Hajime\s+no\s+Ippo|Fighting\s+Spirit|ippo)\b/i],
  ['mob-psycho', 'Mob Psycho', /\b(Mob\s+Psycho)\b/i],
  ['cowboy-bebop', 'Cowboy Bebop', /\b(Cowboy\s+Bebop|bebop)\b/i],
  ['hibike-euphonium', 'Sound! Euphonium', /\b(Hibike!\s+Euphonium|Sound!\s+Euphonium)\b/i],
  ['one-piece', 'One Piece', /\b(One\s+Piece)\b/i],
  ['oshi-no-ko', '[Oshi No Ko]', /\b(\[Oshi\s+no\s+Ko\]|oshi\s+no\s+ko)\b/i],
  ['mushishi-zoku-shou', 'Mushi-shi', /\b(Mushishi\s+Zoku\s+Shou|Mushi-shi)\b/i],
  ['jujutsu-kaisen', 'Jujutsu Kaisen', /\b(Jujutsu\s+Kaisen|jjk)\b/i],
  ['kimetsu-no-yaiba', 'Demon Slayer', /\b(Kimetsu\s+no\s+Yaiba|Demon\s+Slayer|kimetsu)\b/i],
  ['great-teacher-onizuka', 'Great Teacher Onizuka', /\b(Great\s+Teacher\s+Onizuka|gto)\b/i],
  ['tu-bian-yingxiong-x', 'To Be Hero X', /\b(Tu\s+Bian\s+Yingxiong\s+X|To\s+Be\s+Hero\s+X)\b/i],
  ['mononoke-hime', 'Princess Mononoke', /\b(Princess\s+Mononoke|Mononoke\s+Hime|mononoke)\b/i],
  ['uma-musume', 'Umamusume', /\b(Uma\s+Musume|Umamusume)\b/i],
  ['mushishi', 'Mushi-Shi', /\b(Mushi-Shi|Mushishi)\b/i],
  [
    'shigatsu-wa-kimi-no-uso',
    'Your Lie in April',
    /\b(Shigatsu\s+wa\s+Kimi\s+no\s+Uso|Your\s+Lie\s+in\s+April)\b/i,
  ],
  [
    'tengen-toppa-gurren-lagann',
    'Gurren Lagann',
    /\b(Tengen\s+Toppa\s+Gurren\s+Lagann|Gurren\s+Lagann|ttgl)\b/i,
  ],
  ['fate-stay-night', 'Fate/stay night', /\b(Fate[/\s]*stay\s+night)\b/i],
  ['ping-pong-the-animation', 'Ping Pong the Animation', /\b(Ping\s+Pong\s+the\s+Animation)\b/i],
  ['cyberpunk', 'Cyberpunk', /\b(edgerunners|Cyberpunk)\b/i],
  ['death-note', 'Death Note', /\b(Death\s+Note)\b/i],
  ['made-in-abyss', 'Made in Abyss', /\b(Made\s+in\s+Abyss)\b/i],
  ['dandadan', 'Dan Da Dan', /\b(Dan\s+Da\s+Dan|Dandadan)\b/i],
  ['mushoku-tensei', 'Mushoku Tensei', /\b(jobless\s+reincarnation|Mushoku\s+Tensei)\b/i],
  ['kenpuu-denki-berserk', 'Berserk', /\b(Kenpuu\s+Denki\s+Berserk|Berserk)\b/i],
  ['dungeon-meshi', 'Delicious in Dungeon', /\b(Delicious\s+in\s+Dungeon|Dungeon\s+Meshi)\b/i],
  [
    'suzumiya-haruhi-no-shoushitsu',
    'The Disappearance of Haruhi Suzumiya',
    /\b(The\s+Disappearance\s+of\s+Haruhi\s+Suzumiya|Suzumiya\s+Haruhi\s+no\s+Shoushitsu|melancholy\s+of\s+haruhi|haruhi\s+suzumiya|suzumiya\s+haruhi)\b/i,
  ],
  ['shin-evangelion', 'Evangelion', /\b(Shin\s+Evangelion|neon\s+genesis|Evangelion|nge|eva)\b/i],
  [
    'shinseiki-evangelion',
    'Neon Genesis Evangelion',
    /\b(Neon\s+Genesis\s+Evangelion|Shinseiki\s+Evangelion)\b/i,
  ],
  ['gintama', 'Gintama', /\b(Gintama)\b/i],
  ['steins-gate', 'Steins;Gate', /\b(steins[;\s]?gate|Steins;Gate)\b/i],
  [
    'koukaku-kidoutai',
    'Ghost in the Shell',
    /\b(Ghost\s+in\s+the\s+Shell|Koukaku\s+Kidoutai|gits)\b/i,
  ],
  ['lycoris-recoil', 'Lycoris Recoil', /\b(Lycoris\s+Recoil|lycoris)\b/i],
  [
    'nhk-ni-youkoso',
    'Welcome to the N.H.K',
    /\b(Welcome\s+to\s+the\s+N\.H\.K|NHK\s+ni\s+Youkoso)\b/i,
  ],
  ['sword-art-online', 'Sword Art Online', /\b(Sword\s+Art\s+Online|sao)\b/i],
  ['hellsing-ultimate', 'Hellsing Ultimate', /\b(Hellsing\s+Ultimate)\b/i],
  ['yofukashi-no-uta', 'Call of the Night', /\b(Call\s+of\s+the\s+Night|Yofukashi\s+no\s+Uta)\b/i],
  [
    'tensei-shitara-slime-datta-ken',
    'That Time I Got Reincarnated as a Slime',
    /\b(That\s+Time\s+I\s+Got\s+Reincarnated\s+as\s+a\s+Slime|Tensei\s+shitara\s+Slime\s+Datta\s+Ken|reincarnated\s+as\s+a\s+slime|slime\s+isekai|tensura)\b/i,
  ],
  ['psycho-pass', 'Psycho-Pass', /\b(Psycho-Pass)\b/i],
  ['douluo-dalu', 'Soul Land', /\b(Douluo\s+Dalu|Soul\s+Land)\b/i],
  ['yuuyuuhakusho', 'Yu Yu Hakusho', /\b(Yu\s+Yu\s+Hakusho|Yuu☆Yuu☆Hakusho)\b/i],
  ['banana-fish', 'Banana Fish', /\b(Banana\s+Fish)\b/i],
  ['golden-kamuy', 'Golden Kamuy', /\b(Golden\s+Kamuy)\b/i],
  [
    'kono-subarashii-sekai-ni-shukufuku-wo',
    'KonoSuba',
    /\b(Kono\s+Subarashii\s+Sekai\s+ni\s+Shukufuku\s+wo|KonoSuba)\b/i,
  ],
  [
    'houseki-no-kuni',
    'Land of the Lustrous',
    /\b(Land\s+of\s+the\s+Lustrous|Houseki\s+no\s+Kuni)\b/i,
  ],
  ['trigun', 'Trigun', /\b(Trigun)\b/i],
  ['serial-experiments-lain', 'Serial Experiments Lain', /\b(Serial\s+Experiments\s+Lain)\b/i],
  ['dragon-ball-super', 'Dragon Ball Super', /\b(Dragon\s+Ball\s+Super|dbs)\b/i],
  ['dragon-ball-z', 'Dragon Ball Z', /\b(Dragon\s+Ball\s+Z|dbz)\b/i],
  ['dragon-ball', 'Dragon Ball', /\b(Dragon\s+Ball|dragon\s*ball)\b/i],
  ['berserk', 'Berserk', /\b(Berserk)\b/i],
  ['overlord', 'Overlord', /\b(Overlord)\b/i],
  ['angel-beats', 'Angel Beats', /\b(Angel\s+Beats)\b/i],
  ['death-parade', 'Death Parade', /\b(Death\s+Parade)\b/i],
  ['hyouka', 'Hyouka', /\b(Hyouka)\b/i],
  [
    'koukyoushihen-eureka-seven',
    'Eureka Seven',
    /\b(Koukyoushihen\s+Eureka\s+Seven|Eureka\s+Seven)\b/i,
  ],
  [
    'ookami-to-koushinryou',
    'Spice and Wolf',
    /\b(Ookami\s+to\s+Koushinryou|Spice\s+and\s+Wolf)\b/i,
  ],
  [
    'ano-hi-mita-hana-no-namae-wo-bokutachi-wa-mada-shiranai',
    'Anohana',
    /\b(Ano\s+Hi\s+Mita\s+Hana\s+no\s+Namae\s+wo\s+Bokutachi\s+wa\s+Mada\s+Shiranai|ano\s+hana|Anohana)\b/i,
  ],
  ['beck', 'Beck', /\b(Beck)\b/i],
  ['kuroko-no-basket', "Kuroko's Basketball", /\b(Kuroko's\s+Basketball|Kuroko\s+no\s+Basket)\b/i],
  ['naruto', 'Naruto Shippuden', /\b(Naruto\s+Shippuden|shippuden|Naruto)\b/i],
  ['k-on', 'K-ON', /\b(k[-\s]?on|K-On)\b/i],
  ['yuri-on-ice', 'Yuri!!! On ICE', /\b(Yuri!!!\s+on\s+Ice|yuri!*\s+on\s+ice)\b/i],
  ['maison-ikkoku', 'Maison Ikkoku', /\b(Maison\s+Ikkoku)\b/i],
  ['chihayafuru', 'Chihayafuru', /\b(Chihayafuru)\b/i],
  ['no-game-no-life', 'No Game, No Life', /\b(No\s+Game,\s+No\s+Life|No\s+Game\s+No\s+Life)\b/i],
  [
    'kara-no-kyoukai',
    'The Garden of Sinners Chapter',
    /\b(The\s+Garden\s+of\s+Sinners\s+Chapter|Kara\s+no\s+Kyoukai)\b/i,
  ],
  ['samurai-champloo', 'Samurai Champloo', /\b(Samurai\s+Champloo)\b/i],
  [
    'initial-d-first-stage',
    'Initial D First Stage',
    /\b(Initial\s+D\s+First\s+Stage|initial\s+d)\b/i,
  ],
  ['planetes', 'Planetes', /\b(Planetes)\b/i],
  ['durarara', 'Durarara', /\b(Durarara)\b/i],
  ['haibane-renmei', 'Haibane Renmei', /\b(Haibane\s+Renmei)\b/i],
  [
    'yakusoku-no-neverland',
    'The Promised Neverland',
    /\b(The\s+Promised\s+Neverland|Yakusoku\s+no\s+Neverland)\b/i,
  ],
  ['hikaru-no-go', 'Hikaru no Go', /\b(Hikaru\s+no\s+Go)\b/i],
  ['kimi-ni-todoke', 'Kimi ni Todoke', /\b(Kimi\s+ni\s+Todoke)\b/i],
  [
    'sora-yori-mo-tooi-basho',
    'A Place Further Than The Universe',
    /\b(a\s+place\s+further\s+th[ae]n\s+the\s+universe|A\s+Place\s+Further\s+Than\s+The\s+Universe|Sora\s+yori\s+mo\s+Tooi\s+Basho|sora\s+yori|yorimoi)\b/i,
  ],
  ['kino-no-tabi', "Kino's Journey", /\b(Kino\s+no\s+Tabi|Kino's\s+Journey)\b/i],
  ['gin-no-saji', 'Silver Spoon', /\b(Gin\s+no\s+Saji|Silver\s+Spoon)\b/i],
  [
    'fumetsu-no-anata-e',
    'To Your Eternity',
    /\b(Fumetsu\s+no\s+Anata\s+e|To\s+Your\s+Eternity)\b/i,
  ],
  ['enen-no-shouboutai', 'Fire Force', /\b(Enen\s+no\s+Shouboutai|Fire\s+Force)\b/i],
  ['black-lagoon', 'Black Lagoon', /\b(Black\s+Lagoon)\b/i],
  ['kidou-keisatsu-patlabor', 'Patlabor', /\b(Kidou\s+Keisatsu\s+Patlabor|Patlabor)\b/i],
  ['mawaru-penguindrum', 'Penguindrum', /\b(Mawaru\s+Penguindrum|Penguindrum)\b/i],
  [
    'kimi-wa-houkago-insomnia',
    'Insomniacs After School',
    /\b(Kimi\s+wa\s+Houkago\s+Insomnia|Insomniacs\s+After\s+School)\b/i,
  ],
  ['make-heroine-ga-oosugiru', 'Makeine', /\b(Make\s+Heroine\s+ga\s+Oosugiru|Makeine)\b/i],
  ['flcl', 'FLCL', /\b(FLCL)\b/i],
  ['katekyou-hitman-reborn', 'Reborn', /\b(Katekyou\s+Hitman\s+Reborn|Reborn)\b/i],
  [
    'yojouhan-shinwa-taikei',
    'The Tatami Galaxy',
    /\b(Yojouhan\s+Shinwa\s+Taikei|The\s+Tatami\s+Galaxy)\b/i,
  ],
  [
    'macross',
    'Super Dimension Fortress Macross',
    /\b(Super\s+Dimension\s+Fortress\s+Macross|Macross)\b/i,
  ],
  ['princess-tutu', 'Princess Tutu', /\b(Princess\s+Tutu)\b/i],
  [
    'honzuki-no-gekokujou',
    'Ascendance of a Bookworm',
    /\b(Ascendance\s+of\s+a\s+Bookworm|Honzuki\s+no\s+Gekokujou)\b/i,
  ],
  ['detroit-metal-city', 'Detroit Metal City', /\b(Detroit\s+Metal\s+City)\b/i],
  ['boku-dake-ga-inai-machi', 'Erased', /\b(Boku\s+dake\s+ga\s+Inai\s+Machi)\b/i],
  [
    'seishun-buta-yarou-wa-yumemiru-shoujo-no-yume-wo-minai',
    'Rascal Does Not Dream',
    /\b(Seishun\s+Buta\s+Yarou\s+wa\s+Yumemiru\s+Shoujo\s+no\s+Yume\s+wo\s+Minai|Rascal\s+Does\s+Not\s+Dream\s+of\s+a\s+Dreaming\s+Girl|rascal\s+does\s+not\s+dream|seishun\s+buta\s+yarou|bunny\s+girl\s+senpai|aobuta)\b/i,
  ],
  ['cardcaptor-sakura', 'Cardcaptor Sakura', /\b(Cardcaptor\s+Sakura)\b/i],
  ['akira', 'Akira', /\b(Akira)\b/i],
  ['paprika', 'Paprika', /\b(Paprika)\b/i],
  ['summer-wars', 'Summer Wars', /\b(Summer\s+Wars)\b/i],
  [
    'kono-sekai-no-katasumi-ni',
    'In This Corner of the World',
    /\b(In\s+This\s+Corner\s+of\s+the\s+World|Kono\s+Sekai\s+no\s+Katasumi\s+ni)\b/i,
  ],
  ['rurouni-kenshin', 'Samurai X', /\b(Rurouni\s+Kenshin|Samurai\s+X)\b/i],
  [
    'hokuto-no-ken',
    'Fist of the North Star',
    /\b(Fist\s+of\s+the\s+North\s+Star|Hokuto\s+no\s+Ken)\b/i,
  ],
  ['sailor-moon', 'Sailor Moon', /\b(sailor\s+moon|bishoujo\s+senshi\s+sailor\s+moon)\b/i],
  [
    'doupo-cangqiong',
    'Battle Through the Heavens',
    /\b(Battle\s+Through\s+the\s+Heavens|Doupo\s+Cangqiong)\b/i,
  ],
  ['baccano', 'Baccano', /\b(Baccano)\b/i],
  ['youjo-senki', 'Saga of Tanya the Evil', /\b(Saga\s+of\s+Tanya\s+the\s+Evil|Youjo\s+Senki)\b/i],
  ['eden-of-the-east', 'Eden of the East', /\b(eden\s+of\s+the\s+east|higashi\s+no\s+eden)\b/i],
  ['yosuga-no-sora', 'Yosuga no Sora', /\b(yosuga\s+no\s+sora)\b/i],
  ['boku-no-pico', 'Boku no Pico', /\b(boku\s+no\s+pico|bocu\s+no\s+pico)\b/i],
  ['eighty-six', '86', /\b(86\s+eighty[-\s]?six|eighty[-\s]?six|86)\b/i],
  ['bible-black', 'Bible Black', /\b(bible\s+black)\b/i],
  ['monster-musume', 'Monster Musume', /\b(monster\s+musume|mon\s+musu)\b/i],
  ['juuni-kokuki', 'Twelve Kingdoms', /\b(twelve\s+kingdoms|juuni\s+kokuki)\b/i],
  ['eromanga-sensei', 'Eromanga Sensei', /\b(eromanga\s+sensei)\b/i],
  ['cory-in-the-house', 'Cory in the House', /\b(cory\s+in\s+the\s+house)\b/i],
  ['redo-of-healer', 'Redo of Healer', /\b(redo\s+of\s+healer|kaiyari)\b/i],
  [
    'detective-conan',
    'Detective Conan',
    /\b(detective\s+conan|case\s+closed|meitantei\s+conan)\b/i,
  ],
  [
    'kaze-ga-tsuyoku-fuiteiru',
    'Run with the Wind',
    /\b(Kaze\s+ga\s+Tsuyoku\s+Fuiteiru|Run\s+with\s+the\s+Wind)\b/i,
  ],
  [
    'yubisaki-to-renren',
    'A Sign of Affection',
    /\b(A\s+Sign\s+of\s+Affection|Yubisaki\s+to\s+Renren)\b/i,
  ],
  ['guimi-zhi-zhu', 'Lord of Mysteries', /\b(Lord\s+of\s+Mysteries|Guimi\s+Zhi\s+Zhu)\b/i],
  ['sasaki-to-miyano', 'Sasaki and Miyano', /\b(Sasaki\s+and\s+Miyano|Sasaki\s+to\s+Miyano)\b/i],
  ['bang-dream', 'BanG Dream', /\b(BanG\s+Dream)\b/i],
  ['shigokuraku', "Hell's Paradise", /\b(Hell's\s+Paradise|Jigokuraku)\b/i],
  ['girls-band-cry', 'Girls Band Cry', /\b(Girls\s+Band\s+Cry)\b/i],
  ['vivy', "Vivy -Fluorite Eye's Song", /\b(Vivy\s+-Fluorite\s+Eye's\s+Song|Vivy)\b/i],
  ['megalo-box', 'Megalobox', /\b(Megalo\s+Box|Megalobox)\b/i],
  ['phantom', 'Phantom', /\b(Phantom)\b/i],
];

export function detectAnimeFromComment(comment: string | null | undefined): string | null {
  if (!comment) {
    return null;
  }

  let firstId: string | null = null;
  let firstIndex = Infinity;
  for (const [id, , pattern] of ANIME_PATTERNS) {
    const match = pattern.exec(comment);
    if (match && match.index < firstIndex) {
      firstIndex = match.index;
      firstId = id;
    }
  }
  return firstId;
}

const ANIME_NAMES: Record<string, string> = Object.fromEntries(
  ANIME_PATTERNS.map(([id, canonical]) => [id, canonical])
);

export function animeIdToName(id: string): string {
  return ANIME_NAMES[id] ?? id;
}
