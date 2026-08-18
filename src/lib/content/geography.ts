import type { LevelDef, StaticQ, UnitDef } from "../types";

function bUnit(id: string, title: string, emoji: string, bank: StaticQ[]): UnitDef {
  return { id, title, emoji, bank };
}

// ---------- L1: Little Explorers ----------

const LAND_WATER: StaticQ[] = [
  { p: "On a map, what does the BLUE usually show?", a: "water 🌊", w: ["mountains", "cities", "forests"] },
  { p: "On a map, green and brown usually show…", a: "land", w: ["water", "clouds", "the moon"] },
  { p: "Is Earth mostly land or mostly water?", a: "mostly water", w: ["mostly land", "half and half exactly", "mostly ice"], x: "About 7 out of every 10 parts of Earth are water!" },
  { p: "Which of these is a big body of SALT water?", a: "the ocean", w: ["a puddle", "a swimming pool", "a bathtub"] },
  { p: "Which of these is LAND completely surrounded by water?", a: "an island 🏝️", w: ["a lake", "a river", "a cloud"] },
  { p: "Which of these is WATER surrounded by land?", a: "a lake", w: ["an island", "a hill", "a beach"] },
];

const MAP_GLOBE: StaticQ[] = [
  { p: "What is a globe?", a: "a round model of Earth 🌍", w: ["a flat drawing of a town", "a kind of balloon", "a telescope"] },
  { p: "What is a map?", a: "a flat drawing of a place", w: ["a round ball", "a photo of the sky", "a book of stories"] },
  { p: "Which one is shaped like the real Earth?", a: "a globe", w: ["a map", "a poster", "a ruler"] },
  { p: "Why do explorers use maps?", a: "to find where things are", w: ["to stay lost", "for coloring only", "to check the weather"] },
  { p: "A map of your bedroom would show…", a: "your bed and toys from above", w: ["the whole country", "the ocean floor", "outer space"] },
  { p: "Which is TRUE?", a: "Maps can show big places or small places", w: ["Maps only show countries", "Maps are always wrong", "Globes are flat"] },
];

const DIRECTIONS: StaticQ[] = [
  { p: "On most maps, which direction is at the TOP?", a: "north", w: ["south", "east", "west"] },
  { p: "On most maps, which direction is at the BOTTOM?", a: "south", w: ["north", "east", "west"] },
  { p: "Which direction does the sun RISE?", a: "east", w: ["west", "north", "south"] },
  { p: "Which direction does the sun SET?", a: "west", w: ["east", "north", "south"] },
  { p: "The tool with a needle that always points north is a…", a: "compass 🧭", w: ["clock", "thermometer", "telescope"] },
  { p: "The 4 main directions are north, south, east, and…", a: "west", w: ["up", "left", "middle"] },
];

const MY_PLACE: StaticQ[] = [
  { p: "Which is the BIGGEST?", a: "your country", w: ["your city", "your street", "your house"] },
  { p: "Put them in order from small to big:", a: "house → city → state → country", w: ["country → house → city → state", "city → house → country → state", "state → country → city → house"] },
  { p: "What planet do we all live on?", a: "Earth 🌍", w: ["Mars", "the moon", "Jupiter"] },
  { p: "A city is…", a: "a place where lots of people live", w: ["a kind of ocean", "one single house", "a mountain"] },
  { p: "Your address tells people…", a: "where your home is", w: ["your favorite color", "how old you are", "what you ate today"] },
  { p: "The United States is a…", a: "country", w: ["city", "continent", "planet"] },
];

// ---------- L2: Map Scouts ----------

const CONTINENTS: StaticQ[] = [
  { p: "How many continents are there?", a: "7", w: ["5", "9", "50"] },
  { p: "Which continent do WE live on?", a: "North America", w: ["Africa", "Asia", "Australia"] },
  { p: "Which is the BIGGEST continent?", a: "Asia", w: ["North America", "Europe", "Australia"] },
  { p: "Which continent is the frozen one at the bottom of the world?", a: "Antarctica 🐧", w: ["Africa", "Australia", "Europe"] },
  { p: "Which continent is famous for lions, elephants, and the Sahara?", a: "Africa 🦁", w: ["Europe", "South America", "Antarctica"] },
  { p: "Which continent is ALSO one whole country?", a: "Australia 🦘", w: ["Asia", "Africa", "Europe"] },
  { p: "A continent is…", a: "a giant piece of land", w: ["a big ocean", "a country's flag", "a tall mountain"] },
];

const OCEANS: StaticQ[] = [
  { p: "How many oceans are there?", a: "5", w: ["3", "7", "12"] },
  { p: "Which is the BIGGEST ocean?", a: "the Pacific", w: ["the Atlantic", "the Arctic", "the Indian"] },
  { p: "Which icy ocean is at the TOP of the world?", a: "the Arctic 🧊", w: ["the Pacific", "the Indian", "the Southern"] },
  { p: "Ocean water tastes…", a: "salty", w: ["sweet", "sour", "like juice"] },
  { p: "Which ocean is between North America and Europe?", a: "the Atlantic", w: ["the Pacific", "the Arctic", "the Indian"] },
  { p: "The ocean around Antarctica is called the…", a: "Southern Ocean", w: ["Bottom Ocean", "Penguin Ocean", "Cold Sea"] },
];

const COMPASS: StaticQ[] = [
  { p: "You're facing north. What's behind you?", a: "south", w: ["east", "west", "up"] },
  { p: "You're facing north. What's on your RIGHT?", a: "east", w: ["west", "south", "left"] },
  { p: "Between north and east on a compass is…", a: "northeast", w: ["eastnorth", "southwest", "middle-east"] },
  { p: "Birds flying to warm places in winter go mostly…", a: "south", w: ["north", "up forever", "in circles"] },
  { p: "Santa's workshop is said to be at the…", a: "North Pole", w: ["South Pole", "equator", "east coast"] },
  { p: "The needle of a compass always points…", a: "north", w: ["to your house", "west", "at the sun"] },
];

const LANDFORMS: StaticQ[] = [
  { p: "A very tall rocky landform is a…", a: "mountain 🏔️", w: ["valley", "lake", "beach"] },
  { p: "Moving water that flows to the sea is a…", a: "river", w: ["lake", "puddle", "hill"] },
  { p: "A small mountain is called a…", a: "hill", w: ["cliff", "cave", "canyon"] },
  { p: "Land surrounded by water on ALL sides is an…", a: "island", w: ["ocean", "valley", "iceberg"] },
  { p: "The low land BETWEEN mountains is a…", a: "valley", w: ["peak", "island", "wave"] },
  { p: "The sandy land where the ocean meets the shore is a…", a: "beach 🏖️", w: ["forest", "mountain", "swamp"] },
];

// ---------- L3: Home Country ----------

const USA: StaticQ[] = [
  { p: "How many states are in the United States?", a: "50", w: ["13", "48", "100"] },
  { p: "What is the capital of the United States?", a: "Washington, D.C.", w: ["New York City", "Los Angeles", "Chicago"] },
  { p: "How many stars are on the US flag?", a: "50 — one for each state!", w: ["13", "100", "76"] },
  { p: "How many stripes are on the US flag?", a: "13 — for the first 13 colonies", w: ["50", "10", "26"] },
  { p: "Which of these is a US state?", a: "Texas", w: ["Paris", "Canada", "Africa"] },
  { p: "The president of the United States lives in…", a: "the White House", w: ["a castle", "the Empire State Building", "a log cabin"] },
];

const MINNESOTA: StaticQ[] = [
  { p: "What state do the Traaseths live in?", a: "Minnesota!", w: ["Florida", "Texas", "California"] },
  { p: "Minnesota's nickname is the Land of 10,000…", a: "Lakes", w: ["Snowmen", "Trees", "Mosquitoes"] },
  { p: "What is the capital of Minnesota?", a: "St. Paul", w: ["Minneapolis", "Duluth", "Rochester"], x: "Tricky! Minneapolis is bigger, but St. Paul is the capital. Together they're the Twin Cities!" },
  { p: "Minneapolis and St. Paul together are called the…", a: "Twin Cities", w: ["Double Towns", "Sister Cities", "Big Pair"] },
  { p: "Which mighty river STARTS in Minnesota?", a: "the Mississippi", w: ["the Nile", "the Amazon", "the Colorado"] },
  { p: "Minnesota winters are famous for being…", a: "very cold and snowy ❄️", w: ["hot and sunny", "rainy all year", "windy but warm"] },
];

const MAP_KEYS: StaticQ[] = [
  { p: "The box that explains a map's symbols is the…", a: "map key (legend)", w: ["treasure chest", "compass", "title"] },
  { p: "On a map, a star ⭐ usually marks a…", a: "capital city", w: ["playground", "mountain", "farm"] },
  { p: "On a map, a wiggly blue line is usually a…", a: "river", w: ["road", "border", "fence"] },
  { p: "The lines between states or countries are called…", a: "borders", w: ["rivers", "roads", "ropes"] },
  { p: "A map's compass rose shows…", a: "directions (N, S, E, W)", w: ["flowers", "the weather", "distances"] },
  { p: "Little tree symbols 🌲🌲 on a map usually mean a…", a: "forest", w: ["city", "desert", "beach"] },
];

const LANDFORMS2: StaticQ[] = [
  { p: "A super dry land with very little rain is a…", a: "desert 🏜️", w: ["rainforest", "swamp", "tundra"] },
  { p: "Land almost surrounded by water — but connected — is a…", a: "peninsula", w: ["island", "canyon", "plateau"], x: "Florida is a famous one — it sticks out into the ocean!" },
  { p: "A deep crack in the earth carved by a river is a…", a: "canyon", w: ["hill", "beach", "geyser"] },
  { p: "Big flat grassy land is called a…", a: "plain", w: ["mountain", "island", "cave"] },
  { p: "Where a river pours off a cliff you get a…", a: "waterfall 💦", w: ["lake", "pond", "glacier"] },
  { p: "A huge slow-moving river of ICE is a…", a: "glacier", w: ["blizzard", "iceberg", "puddle"] },
];

// ---------- L4: World Travelers ----------

const CONTINENTS2: StaticQ[] = [
  { p: "The giant rainforest in South America is the…", a: "Amazon", w: ["Sahara", "Outback", "Everglades"] },
  { p: "The biggest desert in Africa is the…", a: "Sahara", w: ["Amazon", "Gobi", "Mojave"] },
  { p: "Which continent has NO people living there permanently?", a: "Antarctica", w: ["Australia", "Africa", "Europe"] },
  { p: "Kangaroos and koalas live wild only in…", a: "Australia", w: ["Africa", "Asia", "South America"] },
  { p: "Pandas live wild only in which continent?", a: "Asia (China)", w: ["Africa", "North America", "Europe"] },
  { p: "Penguins mostly live near the…", a: "South Pole ❄️", w: ["North Pole", "equator", "desert"] },
];

const LANDMARKS: StaticQ[] = [
  { p: "The Eiffel Tower is in…", a: "Paris, France 🗼", w: ["London, England", "New York, USA", "Rome, Italy"] },
  { p: "The great pyramids are in…", a: "Egypt", w: ["Mexico", "China", "Greece"] },
  { p: "The Great Wall — so long you could walk it for months — is in…", a: "China", w: ["Japan", "India", "Egypt"] },
  { p: "The Statue of Liberty stands in…", a: "New York 🗽", w: ["Washington D.C.", "Paris", "Boston"] },
  { p: "Big Ben, the famous clock tower, is in…", a: "London, England", w: ["Paris, France", "Dublin, Ireland", "Sydney, Australia"] },
  { p: "The Sydney Opera House — shaped like sails — is in…", a: "Australia", w: ["Austria", "England", "Brazil"] },
];

const CLIMATES: StaticQ[] = [
  { p: "A rainforest is…", a: "hot and very rainy 🌧️", w: ["cold and dry", "hot and dry", "frozen"] },
  { p: "A desert is…", a: "very dry", w: ["very rainy", "always cold", "underwater"] },
  { p: "The icy far north where polar bears live is the…", a: "Arctic", w: ["tropics", "savanna", "prairie"] },
  { p: "The closer you get to the equator, the ___ it usually gets.", a: "hotter", w: ["colder", "windier", "darker"] },
  { p: "African grasslands full of zebras and lions are called…", a: "savanna", w: ["tundra", "taiga", "swamp"] },
  { p: "Minnesota has ___ seasons.", a: "4 — winter, spring, summer, fall", w: ["1", "2", "12"] },
];

const OCEANS2: StaticQ[] = [
  { p: "The DEEPEST ocean is the…", a: "Pacific", w: ["Atlantic", "Arctic", "Indian"] },
  { p: "The deepest known spot in the ocean is called the…", a: "Mariana Trench", w: ["Grand Canyon", "Deep Ditch", "Blue Hole"] },
  { p: "Which ocean touches the west coast of the USA?", a: "the Pacific", w: ["the Atlantic", "the Indian", "the Arctic"] },
  { p: "Which ocean touches the EAST coast of the USA?", a: "the Atlantic", w: ["the Pacific", "the Southern", "the Arctic"] },
  { p: "The Great Barrier Reef — the world's biggest coral reef — is near…", a: "Australia 🐠", w: ["England", "Egypt", "Canada"] },
  { p: "Most of the ocean floor has been explored. True or false?", a: "False — most is still unexplored!", w: ["True — every inch is mapped", "True — robots finished it", "False — there is no ocean floor"] },
];

// ---------- L5: Globe Masters ----------

const STATES: StaticQ[] = [
  { p: "The capital of Texas is…", a: "Austin", w: ["Dallas", "Houston", "San Antonio"] },
  { p: "The biggest state (by land) is…", a: "Alaska", w: ["Texas", "California", "Montana"] },
  { p: "The smallest state is…", a: "Rhode Island", w: ["Delaware", "Hawaii", "New Jersey"] },
  { p: "Which state is a chain of islands in the Pacific?", a: "Hawaii 🌺", w: ["Florida", "Alaska", "Maine"] },
  { p: "Which state borders Minnesota?", a: "Wisconsin", w: ["Florida", "Texas", "Oregon"] },
  { p: "Disney World is in which sunny state?", a: "Florida", w: ["Minnesota", "Ohio", "Kansas"] },
];

const COUNTRIES: StaticQ[] = [
  { p: "Which country is directly NORTH of the USA?", a: "Canada 🍁", w: ["Mexico", "England", "Brazil"] },
  { p: "Which country is directly SOUTH of the USA?", a: "Mexico 🌮", w: ["Canada", "Spain", "Peru"] },
  { p: "Which island country is famous for sushi and Mount Fuji?", a: "Japan 🗾", w: ["China", "Australia", "Ireland"] },
  { p: "The biggest country in South America is…", a: "Brazil", w: ["Argentina", "Peru", "Chile"] },
  { p: "Which country has the MOST people?", a: "India", w: ["USA", "Canada", "Australia"] },
  { p: "The biggest country in the world (by land) is…", a: "Russia", w: ["China", "USA", "Brazil"] },
];

const RIVERS_MTNS: StaticQ[] = [
  { p: "The tallest mountain on Earth is…", a: "Mount Everest 🏔️", w: ["Mount Rushmore", "Pikes Peak", "Kilimanjaro"] },
  { p: "The longest river in the world is usually said to be the…", a: "Nile", w: ["Mississippi", "Amazon", "Colorado"] },
  { p: "The river that carries the MOST water is the…", a: "Amazon", w: ["Nile", "Thames", "Rio Grande"] },
  { p: "The great river that runs down the middle of the USA is the…", a: "Mississippi", w: ["Amazon", "Hudson", "Snake"] },
  { p: "Mount Everest is on which continent?", a: "Asia", w: ["Africa", "Europe", "South America"] },
  { p: "The Grand Canyon was carved by which river?", a: "the Colorado River", w: ["the Mississippi", "the Nile", "the Missouri"] },
];

const EQUATOR: StaticQ[] = [
  { p: "The imaginary line around Earth's middle is the…", a: "equator", w: ["border", "horizon", "timeline"] },
  { p: "Places near the equator are usually…", a: "hot 🥵", w: ["freezing", "snowy", "dark"] },
  { p: "The equator splits Earth into the northern and southern…", a: "hemispheres", w: ["continents", "oceans", "time zones"] },
  { p: "\"Hemisphere\" means…", a: "half of a sphere (half the Earth)", w: ["a type of map", "a mountain range", "a big circle"] },
  { p: "The USA is in which hemisphere?", a: "the Northern Hemisphere", w: ["the Southern Hemisphere", "the equator", "the Eastern Pole"] },
  { p: "The very top and bottom points of Earth are the…", a: "poles", w: ["corners", "edges", "caps"] },
];

// ---------- L6: Navigators ----------

const COORDINATES: StaticQ[] = [
  { p: "Map grids use letters and numbers so you can…", a: "find an exact spot", w: ["color faster", "count the pages", "fold the map"] },
  { p: "The lines running side-to-side around Earth measure…", a: "latitude", w: ["longitude", "attitude", "altitude"] },
  { p: "The lines running top-to-bottom on Earth measure…", a: "longitude", w: ["latitude", "gravity", "temperature"] },
  { p: "The equator is at which latitude?", a: "0 degrees", w: ["100 degrees", "50 degrees", "12 degrees"] },
  { p: "A map scale tells you…", a: "how far distances really are", w: ["how heavy the map is", "what the weather is", "who made the map"] },
  { p: "If 1 inch on the map = 10 miles, then 3 inches = …", a: "30 miles", w: ["3 miles", "13 miles", "100 miles"] },
];

const CAPITALS: StaticQ[] = [
  { p: "The capital of France is…", a: "Paris", w: ["London", "Rome", "Madrid"] },
  { p: "The capital of England is…", a: "London", w: ["Paris", "Dublin", "Berlin"] },
  { p: "The capital of Japan is…", a: "Tokyo", w: ["Beijing", "Seoul", "Kyoto"] },
  { p: "The capital of Canada is…", a: "Ottawa", w: ["Toronto", "Montreal", "Vancouver"], x: "Tricky — Toronto is bigger, but Ottawa is the capital!" },
  { p: "The capital of Mexico is…", a: "Mexico City", w: ["Cancun", "Guadalajara", "Tijuana"] },
  { p: "The capital of Italy — home of the Colosseum — is…", a: "Rome", w: ["Venice", "Milan", "Naples"] },
];

const WONDERS: StaticQ[] = [
  { p: "The giant colorful canyon in Arizona is the…", a: "Grand Canyon", w: ["Big Ditch", "Royal Gorge", "Death Valley"] },
  { p: "The huge waterfall between the USA and Canada is…", a: "Niagara Falls", w: ["Angel Falls", "Victoria Falls", "Old Faithful"] },
  { p: "The dancing colored lights in northern skies — visible from Minnesota! — are the…", a: "Northern Lights (aurora)", w: ["fireworks", "rainbows", "shooting stars"] },
  { p: "The geyser in Yellowstone that erupts on schedule is…", a: "Old Faithful", w: ["Big Squirt", "Steamy Pete", "Mount Fuji"] },
  { p: "The world's biggest living structure — made by tiny sea creatures — is…", a: "the Great Barrier Reef", w: ["the Great Wall", "the Amazon", "Everest"] },
  { p: "Uluru — the giant red rock — rises from the middle of…", a: "Australia", w: ["Arizona", "Africa", "Asia"] },
];

const CULTURES: StaticQ[] = [
  { p: "The language spoken in Mexico is mostly…", a: "Spanish", w: ["French", "German", "Latin"] },
  { p: "Which country celebrates with piñatas?", a: "Mexico 🪅", w: ["Norway", "Japan", "Egypt"] },
  { p: "Sushi comes from…", a: "Japan 🍣", w: ["Italy", "Mexico", "Greece"] },
  { p: "Pizza and pasta were born in…", a: "Italy 🍝", w: ["France", "Spain", "USA"] },
  { p: "Many Minnesotans have family roots in which region?", a: "Scandinavia (Norway & Sweden)", w: ["Antarctica", "the Amazon", "the Sahara"] },
  { p: "A country's special flag, foods, music, and holidays make up its…", a: "culture", w: ["climate", "border", "capital"] },
];

export const GEOGRAPHY_LEVELS: LevelDef[] = [
  {
    n: 1,
    name: "Little Explorers",
    units: [
      bUnit("landwater", "Land & Water", "🌊", LAND_WATER),
      bUnit("mapglobe", "Maps & Globes", "🗺️", MAP_GLOBE),
      bUnit("directions", "Which Way?", "🧭", DIRECTIONS),
      bUnit("myplace", "My Place in the World", "🏠", MY_PLACE),
    ],
  },
  {
    n: 2,
    name: "Map Scouts",
    units: [
      bUnit("continents", "The 7 Continents", "🌍", CONTINENTS),
      bUnit("oceans", "The 5 Oceans", "🐋", OCEANS),
      bUnit("compass", "Compass Power", "🧭", COMPASS),
      bUnit("landforms", "Landforms", "🏔️", LANDFORMS),
    ],
  },
  {
    n: 3,
    name: "Home Country",
    units: [
      bUnit("usa", "The USA", "🇺🇸", USA),
      bUnit("minnesota", "Minnesota!", "❄️", MINNESOTA),
      bUnit("mapkeys", "Reading Map Keys", "🔑", MAP_KEYS),
      bUnit("landforms2", "Wild Landforms", "🏜️", LANDFORMS2),
    ],
  },
  {
    n: 4,
    name: "World Travelers",
    units: [
      bUnit("continents2", "Continent Safari", "🦁", CONTINENTS2),
      bUnit("landmarks", "Famous Landmarks", "🗼", LANDMARKS),
      bUnit("climates", "Climates & Biomes", "🌦️", CLIMATES),
      bUnit("oceans2", "Ocean Deep", "🐠", OCEANS2),
    ],
  },
  {
    n: 5,
    name: "Globe Masters",
    units: [
      bUnit("states", "States & Capitals", "⭐", STATES),
      bUnit("countries", "Countries of the World", "🌎", COUNTRIES),
      bUnit("riversmtns", "Great Rivers & Mountains", "⛰️", RIVERS_MTNS),
      bUnit("equator", "Equator & Hemispheres", "🌐", EQUATOR),
    ],
  },
  {
    n: 6,
    name: "Navigators",
    units: [
      bUnit("coordinates", "Grids & Coordinates", "📐", COORDINATES),
      bUnit("capitals", "World Capitals", "🏛️", CAPITALS),
      bUnit("wonders", "Natural Wonders", "🌈", WONDERS),
      bUnit("cultures", "Cultures Around the World", "🎎", CULTURES),
    ],
  },
];
