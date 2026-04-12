interface AnimePattern {
  id: string;
  name: string;
  pattern: RegExp;
}

const ANIME_PATTERNS: AnimePattern[] = [
  { id: 'oshi-no-ko', name: '[Oshi No Ko]', pattern: /\b(\[Oshi\s+no\s+Ko\]|oshi\s+no\s+ko)\b/i },
  { id: 'eighty-six', name: '86', pattern: /\b(86\s+eighty[-\s]?six|eighty[-\s]?six|86)\b/i },
  {
    id: 'sora-yori-mo-tooi-basho',
    name: 'A Place Further Than The Universe',
    pattern:
      /\b(a\s+place\s+further\s+th[ae]n\s+the\s+universe|A\s+Place\s+Further\s+Than\s+The\s+Universe|Sora\s+yori\s+mo\s+Tooi\s+Basho|sora\s+yori|yorimoi)\b/i,
  },
  {
    id: 'yubisaki-to-renren',
    name: 'A Sign of Affection',
    pattern: /\b(A\s+Sign\s+of\s+Affection|Yubisaki\s+to\s+Renren)\b/i,
  },
  {
    id: 'koe-no-katachi',
    name: 'A Silent Voice',
    pattern: /\b(Koe\s+no\s+Katachi|A\s+Silent\s+Voice|silent\s+voice)\b/i,
  },
  { id: 'akira', name: 'Akira', pattern: /\b(Akira)\b/i },
  { id: 'angel-beats', name: 'Angel Beats', pattern: /\b(Angel\s+Beats)\b/i },
  {
    id: 'ano-hi-mita-hana-no-namae-wo-bokutachi-wa-mada-shiranai',
    name: 'Anohana',
    pattern:
      /\b(Ano\s+Hi\s+Mita\s+Hana\s+no\s+Namae\s+wo\s+Bokutachi\s+wa\s+Mada\s+Shiranai|ano\s+hana|Anohana)\b/i,
  },
  {
    id: 'honzuki-no-gekokujou',
    name: 'Ascendance of a Bookworm',
    pattern: /\b(Ascendance\s+of\s+a\s+Bookworm|Honzuki\s+no\s+Gekokujou)\b/i,
  },
  {
    id: 'shingeki-no-kyojin',
    name: 'Attack on Titan',
    pattern: /\b(Shingeki\s+no\s+Kyojin|Attack\s+on\s+Titan|aot|snk)\b/i,
  },
  { id: 'baccano', name: 'Baccano', pattern: /\b(Baccano)\b/i },
  { id: 'banana-fish', name: 'Banana Fish', pattern: /\b(Banana\s+Fish)\b/i },
  { id: 'bang-dream', name: 'BanG Dream', pattern: /\b(BanG\s+Dream)\b/i },
  {
    id: 'doupo-cangqiong',
    name: 'Battle Through the Heavens',
    pattern: /\b(Battle\s+Through\s+the\s+Heavens|Doupo\s+Cangqiong)\b/i,
  },
  { id: 'beck', name: 'Beck', pattern: /\b(Beck)\b/i },
  { id: 'berserk', name: 'Berserk', pattern: /\b(Berserk)\b/i },
  {
    id: 'kenpuu-denki-berserk',
    name: 'Berserk',
    pattern: /\b(Kenpuu\s+Denki\s+Berserk|Berserk)\b/i,
  },
  { id: 'bible-black', name: 'Bible Black', pattern: /\b(bible\s+black)\b/i },
  { id: 'black-lagoon', name: 'Black Lagoon', pattern: /\b(Black\s+Lagoon)\b/i },
  { id: 'bleach', name: 'Bleach', pattern: /\b(Bleach|tybw)\b/i },
  { id: 'boku-no-pico', name: 'Boku no Pico', pattern: /\b(boku\s+no\s+pico|bocu\s+no\s+pico)\b/i },
  {
    id: 'yofukashi-no-uta',
    name: 'Call of the Night',
    pattern: /\b(Call\s+of\s+the\s+Night|Yofukashi\s+no\s+Uta)\b/i,
  },
  { id: 'cardcaptor-sakura', name: 'Cardcaptor Sakura', pattern: /\b(Cardcaptor\s+Sakura)\b/i },
  { id: 'chihayafuru', name: 'Chihayafuru', pattern: /\b(Chihayafuru)\b/i },
  { id: 'clannad', name: 'Clannad', pattern: /\b(Clannad)\b/i },
  { id: 'code-geass', name: 'Code Geass', pattern: /\b(Code\s+Geass|lelouch)\b/i },
  { id: 'cory-in-the-house', name: 'Cory in the House', pattern: /\b(cory\s+in\s+the\s+house)\b/i },
  { id: 'cowboy-bebop', name: 'Cowboy Bebop', pattern: /\b(Cowboy\s+Bebop|bebop)\b/i },
  { id: 'cyberpunk', name: 'Cyberpunk', pattern: /\b(edgerunners|Cyberpunk)\b/i },
  { id: 'dandadan', name: 'Dan Da Dan', pattern: /\b(Dan\s+Da\s+Dan|Dandadan)\b/i },
  { id: 'death-note', name: 'Death Note', pattern: /\b(Death\s+Note)\b/i },
  { id: 'death-parade', name: 'Death Parade', pattern: /\b(Death\s+Parade)\b/i },
  {
    id: 'dungeon-meshi',
    name: 'Delicious in Dungeon',
    pattern: /\b(Delicious\s+in\s+Dungeon|Dungeon\s+Meshi)\b/i,
  },
  {
    id: 'kimetsu-no-yaiba',
    name: 'Demon Slayer',
    pattern: /\b(Kimetsu\s+no\s+Yaiba|Demon\s+Slayer|kimetsu)\b/i,
  },
  {
    id: 'detective-conan',
    name: 'Detective Conan',
    pattern: /\b(detective\s+conan|case\s+closed|meitantei\s+conan)\b/i,
  },
  {
    id: 'detroit-metal-city',
    name: 'Detroit Metal City',
    pattern: /\b(Detroit\s+Metal\s+City)\b/i,
  },
  { id: 'dragon-ball', name: 'Dragon Ball', pattern: /\b(Dragon\s+Ball|dragon\s*ball)\b/i },
  {
    id: 'dragon-ball-super',
    name: 'Dragon Ball Super',
    pattern: /\b(Dragon\s+Ball\s+Super|dbs)\b/i,
  },
  { id: 'dragon-ball-z', name: 'Dragon Ball Z', pattern: /\b(Dragon\s+Ball\s+Z|dbz)\b/i },
  { id: 'durarara', name: 'Durarara', pattern: /\b(Durarara)\b/i },
  {
    id: 'eden-of-the-east',
    name: 'Eden of the East',
    pattern: /\b(eden\s+of\s+the\s+east|higashi\s+no\s+eden)\b/i,
  },
  {
    id: 'boku-dake-ga-inai-machi',
    name: 'Erased',
    pattern: /\b(Boku\s+dake\s+ga\s+Inai\s+Machi)\b/i,
  },
  { id: 'eromanga-sensei', name: 'Eromanga Sensei', pattern: /\b(eromanga\s+sensei)\b/i },
  {
    id: 'koukyoushihen-eureka-seven',
    name: 'Eureka Seven',
    pattern: /\b(Koukyoushihen\s+Eureka\s+Seven|Eureka\s+Seven)\b/i,
  },
  {
    id: 'shin-evangelion',
    name: 'Evangelion',
    pattern: /\b(Shin\s+Evangelion|neon\s+genesis|Evangelion|nge|eva)\b/i,
  },
  { id: 'fate-stay-night', name: 'Fate/stay night', pattern: /\b(Fate[/\s]*stay\s+night)\b/i },
  {
    id: 'hajime-no-ippo',
    name: 'Fighting Spirit',
    pattern: /\b(Hajime\s+no\s+Ippo|Fighting\s+Spirit|ippo)\b/i,
  },
  {
    id: 'enen-no-shouboutai',
    name: 'Fire Force',
    pattern: /\b(Enen\s+no\s+Shouboutai|Fire\s+Force)\b/i,
  },
  {
    id: 'hokuto-no-ken',
    name: 'Fist of the North Star',
    pattern: /\b(Fist\s+of\s+the\s+North\s+Star|Hokuto\s+no\s+Ken)\b/i,
  },
  { id: 'flcl', name: 'FLCL', pattern: /\b(FLCL)\b/i },
  {
    id: 'sousou-no-frieren',
    name: "Frieren: Beyond Journey's End",
    pattern: /\b(beyond\s+journey.?s\s+end|Sousou\s+no\s+Frieren|Frieren)\b/i,
  },
  { id: 'fruits-basket', name: 'Fruits Basket', pattern: /\b(Fruits\s+Basket|furuba)\b/i },
  {
    id: 'fullmetal-alchemist',
    name: 'Fullmetal Alchemist',
    pattern: /\b(Fullmetal\s+Alchemist|fmab|fma)\b/i,
  },
  {
    id: 'koukaku-kidoutai',
    name: 'Ghost in the Shell',
    pattern: /\b(Ghost\s+in\s+the\s+Shell|Koukaku\s+Kidoutai|gits)\b/i,
  },
  { id: 'gintama', name: 'Gintama', pattern: /\b(Gintama)\b/i },
  { id: 'girls-band-cry', name: 'Girls Band Cry', pattern: /\b(Girls\s+Band\s+Cry)\b/i },
  { id: 'golden-kamuy', name: 'Golden Kamuy', pattern: /\b(Golden\s+Kamuy)\b/i },
  {
    id: 'great-teacher-onizuka',
    name: 'Great Teacher Onizuka',
    pattern: /\b(Great\s+Teacher\s+Onizuka|gto)\b/i,
  },
  {
    id: 'tengen-toppa-gurren-lagann',
    name: 'Gurren Lagann',
    pattern: /\b(Tengen\s+Toppa\s+Gurren\s+Lagann|Gurren\s+Lagann|ttgl)\b/i,
  },
  { id: 'haibane-renmei', name: 'Haibane Renmei', pattern: /\b(Haibane\s+Renmei)\b/i },
  { id: 'shigokuraku', name: "Hell's Paradise", pattern: /\b(Hell's\s+Paradise|Jigokuraku)\b/i },
  { id: 'hellsing-ultimate', name: 'Hellsing Ultimate', pattern: /\b(Hellsing\s+Ultimate)\b/i },
  { id: 'hikaru-no-go', name: 'Hikaru no Go', pattern: /\b(Hikaru\s+no\s+Go)\b/i },
  { id: 'hunter-x-hunter', name: 'Hunter x Hunter', pattern: /\b(Hunter\s+x\s+Hunter|hxh)\b/i },
  { id: 'hyouka', name: 'Hyouka', pattern: /\b(Hyouka)\b/i },
  {
    id: 'kono-sekai-no-katasumi-ni',
    name: 'In This Corner of the World',
    pattern: /\b(In\s+This\s+Corner\s+of\s+the\s+World|Kono\s+Sekai\s+no\s+Katasumi\s+ni)\b/i,
  },
  {
    id: 'initial-d-first-stage',
    name: 'Initial D First Stage',
    pattern: /\b(Initial\s+D\s+First\s+Stage|initial\s+d)\b/i,
  },
  {
    id: 'kimi-wa-houkago-insomnia',
    name: 'Insomniacs After School',
    pattern: /\b(Kimi\s+wa\s+Houkago\s+Insomnia|Insomniacs\s+After\s+School)\b/i,
  },
  { id: 'jujutsu-kaisen', name: 'Jujutsu Kaisen', pattern: /\b(Jujutsu\s+Kaisen|jjk)\b/i },
  { id: 'k-on', name: 'K-ON', pattern: /\b(k[-\s]?on|K-On)\b/i },
  { id: 'kimi-ni-todoke', name: 'Kimi ni Todoke', pattern: /\b(Kimi\s+ni\s+Todoke)\b/i },
  {
    id: 'kino-no-tabi',
    name: "Kino's Journey",
    pattern: /\b(Kino\s+no\s+Tabi|Kino's\s+Journey)\b/i,
  },
  {
    id: 'kono-subarashii-sekai-ni-shukufuku-wo',
    name: 'KonoSuba',
    pattern: /\b(Kono\s+Subarashii\s+Sekai\s+ni\s+Shukufuku\s+wo|KonoSuba)\b/i,
  },
  {
    id: 'kuroko-no-basket',
    name: "Kuroko's Basketball",
    pattern: /\b(Kuroko's\s+Basketball|Kuroko\s+no\s+Basket)\b/i,
  },
  {
    id: 'houseki-no-kuni',
    name: 'Land of the Lustrous',
    pattern: /\b(Land\s+of\s+the\s+Lustrous|Houseki\s+no\s+Kuni)\b/i,
  },
  {
    id: 'ginga-eiyuu-densetsu',
    name: 'Legend of the Galactic Heroes',
    pattern: /\b(Legend\s+of\s+the\s+Galactic\s+Heroes|Ginga\s+Eiyuu\s+Densetsu)\b/i,
  },
  {
    id: 'guimi-zhi-zhu',
    name: 'Lord of Mysteries',
    pattern: /\b(Lord\s+of\s+Mysteries|Guimi\s+Zhi\s+Zhu)\b/i,
  },
  { id: 'lycoris-recoil', name: 'Lycoris Recoil', pattern: /\b(Lycoris\s+Recoil|lycoris)\b/i },
  { id: 'made-in-abyss', name: 'Made in Abyss', pattern: /\b(Made\s+in\s+Abyss)\b/i },
  { id: 'maison-ikkoku', name: 'Maison Ikkoku', pattern: /\b(Maison\s+Ikkoku)\b/i },
  {
    id: 'make-heroine-ga-oosugiru',
    name: 'Makeine',
    pattern: /\b(Make\s+Heroine\s+ga\s+Oosugiru|Makeine)\b/i,
  },
  {
    id: '3-gatsu-no-lion',
    name: 'March Comes In Like a Lion',
    pattern: /\b(March\s+Comes\s+In\s+Like\s+a\s+Lion|3-gatsu\s+no\s+Lion)\b/i,
  },
  { id: 'megalo-box', name: 'Megalobox', pattern: /\b(Megalo\s+Box|Megalobox)\b/i },
  { id: 'mob-psycho', name: 'Mob Psycho', pattern: /\b(Mob\s+Psycho)\b/i },
  { id: 'monster-musume', name: 'Monster Musume', pattern: /\b(monster\s+musume|mon\s+musu)\b/i },
  { id: 'mushishi', name: 'Mushi-Shi', pattern: /\b(Mushi-Shi|Mushishi)\b/i },
  {
    id: 'mushishi-zoku-shou',
    name: 'Mushi-shi',
    pattern: /\b(Mushishi\s+Zoku\s+Shou|Mushi-shi)\b/i,
  },
  {
    id: 'mushoku-tensei',
    name: 'Mushoku Tensei',
    pattern: /\b(jobless\s+reincarnation|Mushoku\s+Tensei)\b/i,
  },
  { id: 'naruto', name: 'Naruto Shippuden', pattern: /\b(Naruto\s+Shippuden|shippuden|Naruto)\b/i },
  {
    id: 'shinseiki-evangelion',
    name: 'Neon Genesis Evangelion',
    pattern: /\b(Neon\s+Genesis\s+Evangelion|Shinseiki\s+Evangelion)\b/i,
  },
  {
    id: 'no-game-no-life',
    name: 'No Game, No Life',
    pattern: /\b(No\s+Game,\s+No\s+Life|No\s+Game\s+No\s+Life)\b/i,
  },
  { id: 'one-piece', name: 'One Piece', pattern: /\b(One\s+Piece)\b/i },
  { id: 'overlord', name: 'Overlord', pattern: /\b(Overlord)\b/i },
  { id: 'paprika', name: 'Paprika', pattern: /\b(Paprika)\b/i },
  {
    id: 'kidou-keisatsu-patlabor',
    name: 'Patlabor',
    pattern: /\b(Kidou\s+Keisatsu\s+Patlabor|Patlabor)\b/i,
  },
  {
    id: 'mawaru-penguindrum',
    name: 'Penguindrum',
    pattern: /\b(Mawaru\s+Penguindrum|Penguindrum)\b/i,
  },
  { id: 'phantom', name: 'Phantom', pattern: /\b(Phantom)\b/i },
  {
    id: 'ping-pong-the-animation',
    name: 'Ping Pong the Animation',
    pattern: /\b(Ping\s+Pong\s+the\s+Animation)\b/i,
  },
  { id: 'planetes', name: 'Planetes', pattern: /\b(Planetes)\b/i },
  {
    id: 'mononoke-hime',
    name: 'Princess Mononoke',
    pattern: /\b(Princess\s+Mononoke|Mononoke\s+Hime|mononoke)\b/i,
  },
  { id: 'princess-tutu', name: 'Princess Tutu', pattern: /\b(Princess\s+Tutu)\b/i },
  { id: 'psycho-pass', name: 'Psycho-Pass', pattern: /\b(Psycho-Pass)\b/i },
  {
    id: 'seishun-buta-yarou-wa-yumemiru-shoujo-no-yume-wo-minai',
    name: 'Rascal Does Not Dream',
    pattern:
      /\b(Seishun\s+Buta\s+Yarou\s+wa\s+Yumemiru\s+Shoujo\s+no\s+Yume\s+wo\s+Minai|Rascal\s+Does\s+Not\s+Dream\s+of\s+a\s+Dreaming\s+Girl|rascal\s+does\s+not\s+dream|seishun\s+buta\s+yarou|bunny\s+girl\s+senpai|aobuta)\b/i,
  },
  {
    id: 're-zero-kara-hajimeru-isekai-seikatsu',
    name: 'Re:Zero',
    pattern:
      /\b(Re:ZERO\s+-Starting\s+Life\s+in\s+Another\s+World|Re:Zero\s+kara\s+Hajimeru\s+Isekai\s+Seikatsu|re\s*:\s*zero|re\s+zero|rezero)\b/i,
  },
  {
    id: 'katekyou-hitman-reborn',
    name: 'Reborn',
    pattern: /\b(Katekyou\s+Hitman\s+Reborn|Reborn)\b/i,
  },
  { id: 'redo-of-healer', name: 'Redo of Healer', pattern: /\b(redo\s+of\s+healer|kaiyari)\b/i },
  {
    id: 'kaze-ga-tsuyoku-fuiteiru',
    name: 'Run with the Wind',
    pattern: /\b(Kaze\s+ga\s+Tsuyoku\s+Fuiteiru|Run\s+with\s+the\s+Wind)\b/i,
  },
  {
    id: 'youjo-senki',
    name: 'Saga of Tanya the Evil',
    pattern: /\b(Saga\s+of\s+Tanya\s+the\s+Evil|Youjo\s+Senki)\b/i,
  },
  {
    id: 'sailor-moon',
    name: 'Sailor Moon',
    pattern: /\b(sailor\s+moon|bishoujo\s+senshi\s+sailor\s+moon)\b/i,
  },
  { id: 'samurai-champloo', name: 'Samurai Champloo', pattern: /\b(Samurai\s+Champloo)\b/i },
  { id: 'rurouni-kenshin', name: 'Samurai X', pattern: /\b(Rurouni\s+Kenshin|Samurai\s+X)\b/i },
  {
    id: 'sasaki-to-miyano',
    name: 'Sasaki and Miyano',
    pattern: /\b(Sasaki\s+and\s+Miyano|Sasaki\s+to\s+Miyano)\b/i,
  },
  {
    id: 'serial-experiments-lain',
    name: 'Serial Experiments Lain',
    pattern: /\b(Serial\s+Experiments\s+Lain)\b/i,
  },
  { id: 'gin-no-saji', name: 'Silver Spoon', pattern: /\b(Gin\s+no\s+Saji|Silver\s+Spoon)\b/i },
  {
    id: 'hibike-euphonium',
    name: 'Sound! Euphonium',
    pattern: /\b(Hibike!\s+Euphonium|Sound!\s+Euphonium)\b/i,
  },
  { id: 'douluo-dalu', name: 'Soul Land', pattern: /\b(Douluo\s+Dalu|Soul\s+Land)\b/i },
  {
    id: 'ookami-to-koushinryou',
    name: 'Spice and Wolf',
    pattern: /\b(Ookami\s+to\s+Koushinryou|Spice\s+and\s+Wolf)\b/i,
  },
  { id: 'steel-ball-run', name: 'Steel Ball Run', pattern: /\b(Steel\s+Ball\s+Run|jojo|jjba)\b/i },
  { id: 'steins-gate', name: 'Steins;Gate', pattern: /\b(steins[;\s]?gate|Steins;Gate)\b/i },
  { id: 'summer-wars', name: 'Summer Wars', pattern: /\b(Summer\s+Wars)\b/i },
  {
    id: 'macross',
    name: 'Super Dimension Fortress Macross',
    pattern: /\b(Super\s+Dimension\s+Fortress\s+Macross|Macross)\b/i,
  },
  { id: 'sword-art-online', name: 'Sword Art Online', pattern: /\b(Sword\s+Art\s+Online|sao)\b/i },
  {
    id: 'kusuriya-no-hitorigoto',
    name: 'The Apothecary Diaries',
    pattern: /\b(Kusuriya\s+no\s+Hitorigoto|The\s+Apothecary\s+Diaries|apothecary\s+diaries)\b/i,
  },
  {
    id: 'suzumiya-haruhi-no-shoushitsu',
    name: 'The Disappearance of Haruhi Suzumiya',
    pattern:
      /\b(The\s+Disappearance\s+of\s+Haruhi\s+Suzumiya|Suzumiya\s+Haruhi\s+no\s+Shoushitsu|melancholy\s+of\s+haruhi|haruhi\s+suzumiya|suzumiya\s+haruhi)\b/i,
  },
  {
    id: 'kara-no-kyoukai',
    name: 'The Garden of Sinners Chapter',
    pattern: /\b(The\s+Garden\s+of\s+Sinners\s+Chapter|Kara\s+no\s+Kyoukai)\b/i,
  },
  {
    id: 'yakusoku-no-neverland',
    name: 'The Promised Neverland',
    pattern: /\b(The\s+Promised\s+Neverland|Yakusoku\s+no\s+Neverland)\b/i,
  },
  {
    id: 'yojouhan-shinwa-taikei',
    name: 'The Tatami Galaxy',
    pattern: /\b(Yojouhan\s+Shinwa\s+Taikei|The\s+Tatami\s+Galaxy)\b/i,
  },
  {
    id: 'tensei-shitara-slime-datta-ken',
    name: 'That Time I Got Reincarnated as a Slime',
    pattern:
      /\b(That\s+Time\s+I\s+Got\s+Reincarnated\s+as\s+a\s+Slime|Tensei\s+shitara\s+Slime\s+Datta\s+Ken|reincarnated\s+as\s+a\s+slime|slime\s+isekai|tensura)\b/i,
  },
  {
    id: 'tu-bian-yingxiong-x',
    name: 'To Be Hero X',
    pattern: /\b(Tu\s+Bian\s+Yingxiong\s+X|To\s+Be\s+Hero\s+X)\b/i,
  },
  {
    id: 'fumetsu-no-anata-e',
    name: 'To Your Eternity',
    pattern: /\b(Fumetsu\s+no\s+Anata\s+e|To\s+Your\s+Eternity)\b/i,
  },
  { id: 'trigun', name: 'Trigun', pattern: /\b(Trigun)\b/i },
  {
    id: 'juuni-kokuki',
    name: 'Twelve Kingdoms',
    pattern: /\b(twelve\s+kingdoms|juuni\s+kokuki)\b/i,
  },
  { id: 'uma-musume', name: 'Umamusume', pattern: /\b(Uma\s+Musume|Umamusume)\b/i },
  { id: 'vinland-saga', name: 'Vinland Saga', pattern: /\b(Vinland\s+Saga|vinland)\b/i },
  { id: 'violet-evergarden', name: 'Violet Evergarden', pattern: /\b(Violet\s+Evergarden)\b/i },
  {
    id: 'vivy',
    name: "Vivy -Fluorite Eye's Song",
    pattern: /\b(Vivy\s+-Fluorite\s+Eye's\s+Song|Vivy)\b/i,
  },
  {
    id: 'nhk-ni-youkoso',
    name: 'Welcome to the N.H.K',
    pattern: /\b(Welcome\s+to\s+the\s+N\.H\.K|NHK\s+ni\s+Youkoso)\b/i,
  },
  { id: 'yosuga-no-sora', name: 'Yosuga no Sora', pattern: /\b(yosuga\s+no\s+sora)\b/i },
  {
    id: 'shigatsu-wa-kimi-no-uso',
    name: 'Your Lie in April',
    pattern: /\b(Shigatsu\s+wa\s+Kimi\s+no\s+Uso|Your\s+Lie\s+in\s+April)\b/i,
  },
  { id: 'kimi-no-na-wa', name: 'Your Name', pattern: /\b(Kimi\s+no\s+Na\s+wa|Your\s+Name)\b/i },
  {
    id: 'yuuyuuhakusho',
    name: 'Yu Yu Hakusho',
    pattern: /\b(Yu\s+Yu\s+Hakusho|Yuu☆Yuu☆Hakusho)\b/i,
  },
  {
    id: 'yuri-on-ice',
    name: 'Yuri!!! On ICE',
    pattern: /\b(Yuri!!!\s+on\s+Ice|yuri!*\s+on\s+ice)\b/i,
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

export function animeIdToName(id: string): string {
  const matchedAnime = ANIME_PATTERNS.find((anime) => anime.id === id);
  return matchedAnime?.name ?? id;
}
