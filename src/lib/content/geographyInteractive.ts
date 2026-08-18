import type { IStep } from "./mathInteractive";

/** Amelia the Goose's flyover tours — she's honked over all of it. */
export const GEOGRAPHY_INTERACTIVE: Record<string, IStep[]> = {
  // L1
  landwater: [
    { kind: "say", text: "HONK! Amelia here, navigator of the flock. From up in the sky, Earth is simple: blue parts are water, green and brown parts are land. And there is FAR more blue than you'd guess." },
    { kind: "cards", text: "Tap each thing I fly over!", cards: [
      { front: "🌊 Ocean", back: "huge SALTY water", say: "The ocean! Enormous and salty. Never drink it. I learned that the hard way." },
      { front: "🏝️ Island", back: "land with water all around", say: "An island! Land completely surrounded by water. Excellent landing spots." },
      { front: "💧 Lake", back: "water with land all around", say: "A lake! Water surrounded by land. The opposite of an island. My favorite nap spot." },
      { front: "🏞️ River", back: "moving water heading to the sea", say: "A river! Moving water flowing all the way to the sea. Great for following!" },
    ] },
    { kind: "pick", text: "On a map, what does BLUE usually mean?", tiles: ["water", "mountains", "cities"], correct: 0, hint: "Blue is always water — oceans, lakes, and rivers!" },
    { kind: "pick", text: "Is Earth mostly land or mostly water?", tiles: ["mostly water", "mostly land", "exactly half"], correct: 0, hint: "About 7 out of 10 parts are water! That's why we call it the blue planet." },
  ],
  mapglobe: [
    { kind: "say", text: "Maps and globes! A globe is round like the real Earth. A map is flat like a poster. Both show the same world — one just fits in your backpack. Honk!" },
    { kind: "cards", text: "Tap to compare!", cards: [
      { front: "🌍 Globe", back: "round — shaped like real Earth", say: "A globe is round, exactly like the real Earth. The most accurate kind!" },
      { front: "🗺️ Map", back: "flat — easy to fold and carry", say: "A map is flat. Easy to carry, easy to fold, easy to spread on a table." },
      { front: "Both show", back: "land, water, and places", say: "Both show land, water, countries, and cities. Different shapes, same world!" },
    ] },
    { kind: "pick", text: "Which is shaped like the REAL Earth?", tiles: ["a globe", "a map", "a poster"], correct: 0, hint: "Earth is a sphere, so the globe is the honest one!" },
    { kind: "pick", text: "Why do explorers use maps?", tiles: ["to find where things are", "for coloring", "to check the time"], correct: 0, hint: "Maps answer the question 'where?' — the most important question in navigation!" },
  ],
  directions: [
    { kind: "say", text: "Navigation lesson one! Four main directions: north, south, east, west. Here's a trick my flock uses — start at the top and go clockwise: Never Eat Soggy Waffles. North, East, South, West!" },
    { kind: "cards", text: "Tap each direction!", cards: [
      { front: "⬆️ North", back: "top of the map", say: "North! Almost always the top of the map. And very cold, up where I migrate from." },
      { front: "⬇️ South", back: "bottom of the map", say: "South! The bottom of the map. Where geese fly for winter. Smart birds." },
      { front: "➡️ East", back: "right — where the sun RISES", say: "East! The right side. The sun rises in the east every single morning." },
      { front: "⬅️ West", back: "left — where the sun SETS", say: "West! The left side. The sun sets in the west every evening." },
    ] },
    { kind: "pick", text: "Which direction does the sun RISE?", tiles: ["east", "west", "north"], correct: 0, hint: "Always east! Watch a sunrise and you're facing east. Free compass, honk!" },
    { kind: "pick", text: "The tool whose needle always points north is a…", tiles: ["🧭 compass", "clock", "telescope"], correct: 0, hint: "A compass! Its magnetic needle always swings north. Never gets lost." },
  ],
  myplace: [
    { kind: "say", text: "Let's zoom out from YOU! Your house sits in a city, the city sits in a state, the state sits in a country, the country sits on a continent, and that sits on planet Earth. Nested like eggs!" },
    { kind: "cards", text: "Tap to zoom out, step by step!", cards: [
      { front: "🏠 Your house", back: "your address", say: "Your house! The smallest circle. It has an address so mail can find you." },
      { front: "🏙️ Your city", back: "Minneapolis!", say: "Your city! Lots of houses, streets, and people together." },
      { front: "❄️ Your state", back: "Minnesota", say: "Your state! Minnesota. It has its own capital and its own laws." },
      { front: "🇺🇸 Your country", back: "the United States", say: "Your country! The United States of America. Fifty states together." },
      { front: "🌍 Your planet", back: "Earth — the only one we've got", say: "And your planet, Earth! The only one with geese, so clearly the best one." },
    ] },
    { kind: "pick", text: "Which is BIGGEST?", tiles: ["your country", "your city", "your house"], correct: 0, hint: "Country! It holds all the states, which hold all the cities." },
    { kind: "pick", text: "Put them small to big:", tiles: ["house → city → state → country", "country → city → house → state", "state → house → country → city"], correct: 0, hint: "Each one nests inside the next — house, city, state, country!" },
  ],
  // L2
  continents: [
    { kind: "say", text: "Seven continents — I've flown over ALL of them. Well, six. Antarctica is very cold and I have standards. Let's take the grand tour!" },
    { kind: "cards", text: "Tap each continent to fly over it!", cards: [
      { front: "🌎 North America", back: "WE live here!", say: "North America! That's us. Canada, the United States, and Mexico." },
      { front: "🌎 South America", back: "the Amazon rainforest", say: "South America! Home of the Amazon rainforest and the Andes mountains." },
      { front: "🦁 Africa", back: "the Sahara, lions, elephants", say: "Africa! The Sahara desert, lions, elephants. Enormous and beautiful." },
      { front: "🏰 Europe", back: "small but packed with countries", say: "Europe! Small, but crowded with countries — France, Italy, Norway." },
      { front: "🐼 Asia", back: "the BIGGEST — China, India, Japan", say: "Asia! The biggest continent with the most people. China, India, Japan." },
      { front: "🦘 Australia", back: "a continent AND a country!", say: "Australia! It's a continent and a country at the same time. Show off." },
      { front: "🐧 Antarctica", back: "frozen — penguins only", say: "Antarctica! Frozen solid. Penguins live there. No cities at all." },
    ] },
    { kind: "pick", text: "Which continent do WE live on?", tiles: ["North America", "Europe", "Asia"], correct: 0, hint: "North America — Minnesota is right in the middle of it!" },
    { kind: "pick", text: "Which continent is ALSO one whole country?", tiles: ["Australia", "Asia", "Africa"], correct: 0, hint: "Australia! Every other continent has many countries." },
  ],
  oceans: [
    { kind: "say", text: "Five oceans, and they're all connected — one giant world ocean, really, that we've politely divided into five. I've flown over four. The fifth had weather. Honk." },
    { kind: "cards", text: "Tap each ocean!", cards: [
      { front: "🌊 Pacific", back: "BIGGEST & deepest", say: "The Pacific! The biggest and deepest ocean. It touches California." },
      { front: "🚢 Atlantic", back: "between America & Europe", say: "The Atlantic! Between the Americas and Europe. Columbus crossed this one." },
      { front: "🧊 Arctic", back: "smallest, at the TOP, icy", say: "The Arctic! The smallest and coldest, way up at the top of the world." },
      { front: "🐠 Indian", back: "warm, near Africa & Asia", say: "The Indian Ocean! Warm waters between Africa, Asia, and Australia." },
      { front: "🐧 Southern", back: "circles Antarctica", say: "The Southern Ocean! It circles all the way around Antarctica." },
    ] },
    { kind: "pick", text: "Which ocean is the BIGGEST?", tiles: ["the Pacific", "the Atlantic", "the Arctic"], correct: 0, hint: "The Pacific! You could fit every continent inside it." },
    { kind: "pick", text: "Which ocean would you cross flying from New York to England?", tiles: ["the Atlantic", "the Pacific", "the Indian"], correct: 0, hint: "The Atlantic sits between North America and Europe!" },
  ],
  compass: [
    { kind: "say", text: "Compass mastery! Between the four main directions sit four MORE: northeast, southeast, southwest, northwest. Eight directions total. Navigators like me use all of them constantly." },
    { kind: "pick", text: "You face north. What's on your RIGHT?", tiles: ["east", "west", "south"], correct: 0, hint: "Face north, east is right, west is left, south is behind. Spin around and try it!" },
    { kind: "pick", text: "Between north and east is…", tiles: ["northeast", "southwest", "eastnorth"], correct: 0, hint: "Northeast! Always say the north-south part first." },
    { kind: "pick", text: "Where do geese like me fly for winter?", tiles: ["south — toward warmth", "north — toward ice", "straight up"], correct: 0, hint: "South! Warmer weather and better snacks. That's migration!" },
  ],
  landforms: [
    { kind: "say", text: "Landform tour! From up high I see Earth's shapes: mountains poking up, valleys sinking down, rivers snaking through. Every shape has a name — let's learn them." },
    { kind: "cards", text: "Tap each landform!", cards: [
      { front: "🏔️ Mountain", back: "very tall and rocky", say: "A mountain! Tall and rocky. Terrible for landing, wonderful for views." },
      { front: "🏞️ Valley", back: "low land between mountains", say: "A valley! The low land between mountains. Rivers love valleys." },
      { front: "🏝️ Island", back: "land surrounded by water", say: "An island! Land with water all around it." },
      { front: "🏖️ Beach", back: "sandy edge where land meets sea", say: "A beach! Where the land meets the sea. Sandy and excellent." },
    ] },
    { kind: "pick", text: "Low land BETWEEN two mountains is a…", tiles: ["valley", "peak", "island"], correct: 0, hint: "A valley! Mountains up, valleys down." },
    { kind: "pick", text: "A small mountain is called a…", tiles: ["hill", "cliff", "canyon"], correct: 0, hint: "A hill! Easier to climb, easier to land on." },
  ],
  // L3
  usa: [
    { kind: "say", text: "The United States — fifty states stitched together! And the flag tells its story: fifty stars for today's states, thirteen stripes for the original colonies. A history lesson you can fly!" },
    { kind: "cards", text: "Tap each USA fact!", cards: [
      { front: "⭐ 50 stars", back: "one for each state", say: "Fifty stars on the flag — one for every state!" },
      { front: "🟥 13 stripes", back: "the original 13 colonies", say: "Thirteen stripes for the thirteen original colonies. The flag remembers!" },
      { front: "🏛️ Washington, D.C.", back: "the capital — not a state!", say: "Washington D C is the capital. It's a district, not a state!" },
      { front: "🏠 The White House", back: "where the president lives", say: "The president lives and works in the White House." },
    ] },
    { kind: "pick", text: "How many states are in the USA?", tiles: ["50", "13", "100"], correct: 0, hint: "Fifty — count the stars on the flag!" },
    { kind: "pick", text: "What is the capital of the United States?", tiles: ["Washington, D.C.", "New York City", "Los Angeles"], correct: 0, hint: "Washington D.C.! Bigger cities exist, but that's where the government sits." },
  ],
  minnesota: [
    { kind: "say", text: "MINNESOTA — your home! And my favorite migration stop, honestly. Ten thousand lakes means ten thousand landing pads. Land of nice people and truly aggressive winters." },
    { kind: "cards", text: "Tap each Minnesota fact!", cards: [
      { front: "💧 10,000 lakes", back: "actually 11,842!", say: "Land of ten thousand lakes! There are really almost twelve thousand. They undersold it." },
      { front: "🏛️ St. Paul", back: "the CAPITAL (not Minneapolis!)", say: "Saint Paul is the capital! Minneapolis is bigger, but Saint Paul governs." },
      { front: "👯 Twin Cities", back: "Minneapolis + St. Paul", say: "Minneapolis and Saint Paul sit side by side. Together, the Twin Cities!" },
      { front: "🏞️ Mississippi", back: "starts here at Lake Itasca!", say: "The mighty Mississippi begins right here in Minnesota, at Lake Itasca!" },
    ] },
    { kind: "pick", text: "What is the CAPITAL of Minnesota?", tiles: ["St. Paul", "Minneapolis", "Duluth"], correct: 0, hint: "St. Paul! The classic trick question — Minneapolis is bigger but not the capital." },
    { kind: "pick", text: "Which great river STARTS in Minnesota?", tiles: ["the Mississippi", "the Nile", "the Colorado"], correct: 0, hint: "The Mississippi! At Lake Itasca you can step across it." },
  ],
  mapkeys: [
    { kind: "say", text: "Reading a map like a navigator! Maps use tiny symbols, and the KEY (or legend) is the decoder box that explains them. Without the key you're just looking at pretty squiggles." },
    { kind: "cards", text: "Tap each map symbol!", cards: [
      { front: "⭐ Star", back: "the capital city", say: "A star marks the capital city! Look for it on any state map." },
      { front: "🔵 Blue squiggle", back: "a river", say: "Wiggly blue lines are rivers. Straight blue shapes are lakes!" },
      { front: "➖ Dotted line", back: "a border between places", say: "Dotted or solid lines mark borders between states and countries." },
      { front: "🧭 Compass rose", back: "shows which way is north", say: "The compass rose shows directions. Always check it before you set off!" },
    ] },
    { kind: "pick", text: "On a map, a ⭐ usually marks the…", tiles: ["capital city", "playground", "mountain"], correct: 0, hint: "Capital city! A dot means a regular city, a star means the capital." },
    { kind: "pick", text: "The box explaining a map's symbols is the…", tiles: ["map key (legend)", "compass", "title"], correct: 0, hint: "The key! Always read it first — it's the decoder ring for the whole map." },
  ],
  landforms2: [
    { kind: "say", text: "Wild landforms! Now the dramatic ones — deserts, canyons, glaciers, peninsulas. Earth got creative. I've flown over all of these, mostly on purpose." },
    { kind: "cards", text: "Tap each wild landform!", cards: [
      { front: "🏜️ Desert", back: "very dry, barely rains", say: "A desert! Extremely dry. Some go years between rainfalls." },
      { front: "🏜️ Canyon", back: "deep crack carved by a river", say: "A canyon! A deep crack carved slowly by a river over millions of years." },
      { front: "🧊 Glacier", back: "a slow river of ICE", say: "A glacier! A river of ice creeping downhill. They carved Minnesota's lakes!" },
      { front: "🗺️ Peninsula", back: "land poking into water (Florida!)", say: "A peninsula! Land almost surrounded by water. Florida is a famous one." },
    ] },
    { kind: "pick", text: "Land almost surrounded by water — like Florida — is a…", tiles: ["peninsula", "island", "canyon"], correct: 0, hint: "A peninsula! Still attached to the mainland on one side." },
    { kind: "pick", text: "What carved the Grand Canyon?", tiles: ["a river, over millions of years", "an earthquake", "people digging"], correct: 0, hint: "The Colorado River! Patience plus water beats solid rock." },
  ],
  // L4
  continents2: [
    { kind: "say", text: "Continent safari! Each continent has creatures and places found NOWHERE else. Kangaroos only in Australia. Wild pandas only in Asia. Nature scattered its treasures deliberately." },
    { kind: "cards", text: "Tap each continent's treasure!", cards: [
      { front: "🌴 South America", back: "the Amazon — biggest rainforest", say: "The Amazon rainforest! So big it makes its own rain and weather." },
      { front: "🏜️ Africa", back: "the Sahara — biggest hot desert", say: "The Sahara desert! Nearly as big as the whole United States." },
      { front: "🦘 Australia", back: "kangaroos & koalas — found nowhere else", say: "Kangaroos and koalas live wild ONLY in Australia!" },
      { front: "🐼 Asia", back: "wild pandas & Mount Everest", say: "Wild pandas live only in China, and Mount Everest sits in Asia too!" },
    ] },
    { kind: "pick", text: "Which continent has NO permanent residents?", tiles: ["Antarctica", "Australia", "Africa"], correct: 0, hint: "Antarctica! Only scientists visit temporarily. And penguins, who never leave." },
    { kind: "pick", text: "Wild kangaroos live only in…", tiles: ["Australia", "Africa", "South America"], correct: 0, hint: "Australia! Isolated for millions of years, so it evolved unique animals." },
  ],
  landmarks: [
    { kind: "say", text: "Landmark flyover! Famous places you could spot from the sky. I've circled every one of these — the Eiffel Tower twice, because the first time I got distracted by a bakery." },
    { kind: "cards", text: "Tap each landmark!", cards: [
      { front: "🗼 Eiffel Tower", back: "Paris, France", say: "The Eiffel Tower in Paris, France! Made of iron, built in eighteen eighty-nine." },
      { front: "🔺 Pyramids", back: "Egypt — 4,500 years old!", say: "The pyramids of Egypt! Built about four thousand five hundred years ago." },
      { front: "🧱 Great Wall", back: "China — thousands of miles long", say: "The Great Wall of China! It stretches thousands of miles." },
      { front: "🗽 Statue of Liberty", back: "New York, USA", say: "The Statue of Liberty in New York Harbor — a gift from France!" },
    ] },
    { kind: "pick", text: "The Eiffel Tower is in…", tiles: ["Paris, France", "London, England", "Rome, Italy"], correct: 0, hint: "Paris! The most photographed landmark in the world." },
    { kind: "pick", text: "The Great Wall was built in…", tiles: ["China", "Japan", "Egypt"], correct: 0, hint: "China! Built to protect against invaders — and visible over enormous distances." },
  ],
  climates: [
    { kind: "say", text: "Climate zones! Weather is what's happening today; CLIMATE is what usually happens. Minnesota's climate: four dramatic seasons. The Amazon's climate: rain, rain, more rain." },
    { kind: "cards", text: "Tap each climate zone!", cards: [
      { front: "🌴 Rainforest", back: "hot & rainy nearly every day", say: "Rainforest! Hot and rainy almost every single day. Incredibly full of life." },
      { front: "🏜️ Desert", back: "very dry, hot days cold nights", say: "Desert! Barely any rain. Scorching days, surprisingly cold nights." },
      { front: "🦁 Savanna", back: "grassland — lions & zebras", say: "Savanna! African grasslands with wet and dry seasons. Lions live here." },
      { front: "🧊 Tundra", back: "frozen ground, tiny plants", say: "Tundra! The ground stays frozen. Only small tough plants survive." },
    ] },
    { kind: "pick", text: "The closer you get to the equator, the ___ it usually is.", tiles: ["hotter", "colder", "windier"], correct: 0, hint: "Hotter! The equator gets the most direct sunlight all year." },
    { kind: "pick", text: "Minnesota has how many seasons?", tiles: ["4", "2", "1"], correct: 0, hint: "Four! Winter, spring, summer, fall — and Minnesotans joke about a fifth: construction." },
  ],
  oceans2: [
    { kind: "say", text: "Ocean deep! Here's a fact that ruffles my feathers: we have better maps of MARS than of our own ocean floor. Most of the deep sea has never been seen by anyone." },
    { kind: "cards", text: "Tap each deep-ocean fact!", cards: [
      { front: "🕳️ Mariana Trench", back: "deepest spot — 7 miles down!", say: "The Mariana Trench! Almost seven miles deep. Everest would vanish inside it." },
      { front: "🐠 Great Barrier Reef", back: "biggest living structure — Australia", say: "The Great Barrier Reef! The biggest living structure on Earth, built by tiny coral." },
      { front: "🗺️ Unexplored", back: "most of the ocean floor is unmapped", say: "Most of the ocean floor has never been explored. The last great frontier!" },
      { front: "🌊 One ocean", back: "all 5 are connected!", say: "All five oceans are really one connected body of water. I've flown the seams!" },
    ] },
    { kind: "pick", text: "The deepest known spot in the ocean is the…", tiles: ["Mariana Trench", "Grand Canyon", "Blue Hole"], correct: 0, hint: "The Mariana Trench — deeper than Mount Everest is tall!" },
    { kind: "pick", text: "The Great Barrier Reef is near…", tiles: ["Australia", "England", "Canada"], correct: 0, hint: "Australia! And it's built entirely by tiny living coral animals." },
  ],
  // L5
  states: [
    { kind: "say", text: "State tour! Fifty states, each with a capital city, a flag, and fierce local pride. Some are enormous, some tiny. Alaska could swallow Rhode Island four hundred times. HONK, that's big!" },
    { kind: "cards", text: "Tap each state fact!", cards: [
      { front: "🏔️ Alaska", back: "BIGGEST state by far", say: "Alaska! The biggest state. Twice the size of Texas, which Texans hate hearing." },
      { front: "🦞 Rhode Island", back: "smallest state", say: "Rhode Island! The smallest state. You can drive across it in under an hour." },
      { front: "🌺 Hawaii", back: "islands in the Pacific", say: "Hawaii! A chain of volcanic islands out in the Pacific Ocean." },
      { front: "🧀 Wisconsin", back: "borders Minnesota!", say: "Wisconsin borders Minnesota, just across the Saint Croix River." },
    ] },
    { kind: "pick", text: "The BIGGEST state by land is…", tiles: ["Alaska", "Texas", "California"], correct: 0, hint: "Alaska! More than twice Texas's size." },
    { kind: "pick", text: "Which state borders Minnesota?", tiles: ["Wisconsin", "Florida", "Oregon"], correct: 0, hint: "Wisconsin to the east! Also Iowa, North Dakota, and South Dakota." },
  ],
  countries: [
    { kind: "say", text: "Country tour! Nearly two hundred countries, each with its own flag, language, and government. I've honked at customs officials on four continents. They rarely honk back." },
    { kind: "cards", text: "Tap each country!", cards: [
      { front: "🍁 Canada", back: "north of the USA — 2nd biggest country", say: "Canada! Directly north of us, and the second biggest country in the world." },
      { front: "🌮 Mexico", back: "south of the USA", say: "Mexico! Directly south. Where Spanish and delicious food come from." },
      { front: "🗾 Japan", back: "island country in Asia", say: "Japan! A chain of islands in Asia. Mount Fuji and sushi!" },
      { front: "🇷🇺 Russia", back: "biggest country in the world", say: "Russia! The biggest country by land, stretching across two continents." },
    ] },
    { kind: "pick", text: "Which country is directly NORTH of the USA?", tiles: ["Canada", "Mexico", "Brazil"], correct: 0, hint: "Canada! And the border is the longest in the world." },
    { kind: "pick", text: "The BIGGEST country by land is…", tiles: ["Russia", "China", "USA"], correct: 0, hint: "Russia! So wide it spans eleven time zones." },
  ],
  riversmtns: [
    { kind: "say", text: "Earth's giants! The tallest mountain, the longest river — the record-holders. I have personally attempted Everest. I got roughly one third of the way and reconsidered my life choices." },
    { kind: "cards", text: "Tap each record-holder!", cards: [
      { front: "🏔️ Mount Everest", back: "tallest — 29,032 feet, in Asia", say: "Mount Everest! The tallest mountain on Earth, over twenty-nine thousand feet." },
      { front: "🏞️ The Nile", back: "longest river — in Africa", say: "The Nile! Usually called the longest river in the world, flowing through Africa." },
      { front: "🌴 The Amazon", back: "carries the MOST water", say: "The Amazon! Not the longest, but it carries far more water than any other river." },
      { front: "🇺🇸 The Mississippi", back: "runs down the middle of the USA", say: "The Mississippi! It starts in Minnesota and runs all the way to the Gulf of Mexico." },
    ] },
    { kind: "pick", text: "The tallest mountain on Earth is…", tiles: ["Mount Everest", "Kilimanjaro", "Pikes Peak"], correct: 0, hint: "Everest, in the Himalayas of Asia — 29,032 feet!" },
    { kind: "pick", text: "Which river carries the MOST water?", tiles: ["the Amazon", "the Nile", "the Mississippi"], correct: 0, hint: "The Amazon! It pours more water into the ocean than the next seven rivers combined." },
  ],
  equator: [
    { kind: "say", text: "The equator! An imaginary belt around Earth's middle, splitting it into northern and southern halves. Cross it and the seasons FLIP — it's summer in Australia when you're shoveling snow." },
    { kind: "cards", text: "Tap each globe line!", cards: [
      { front: "🌐 Equator", back: "the middle line — 0° latitude", say: "The equator! The imaginary line around Earth's middle. Hottest place on the globe." },
      { front: "⬆️ Northern Hemisphere", back: "our half — USA is here", say: "The Northern Hemisphere! Everything above the equator. That's us." },
      { front: "⬇️ Southern Hemisphere", back: "Australia, most of Africa & S. America", say: "The Southern Hemisphere! Below the equator. Their seasons are flipped from ours." },
      { front: "🧊 The Poles", back: "very top & bottom — freezing", say: "The North and South Poles! The top and bottom points of Earth. Frozen solid." },
    ] },
    { kind: "pick", text: "Places NEAR the equator are usually…", tiles: ["hot", "freezing", "always dark"], correct: 0, hint: "Hot! Direct sunlight all year round." },
    { kind: "pick", text: "When it's winter in Minnesota, in Australia it's…", tiles: ["summer!", "also winter", "spring"], correct: 0, hint: "Summer! Opposite hemispheres have opposite seasons. Christmas at the beach!" },
  ],
  // L6
  coordinates: [
    { kind: "say", text: "Navigator training, top level! Latitude and longitude — the world's address system. Two numbers can pinpoint ANY spot on Earth. It's how pilots, ships, and phones find their way." },
    { kind: "cards", text: "Tap each navigation tool!", cards: [
      { front: "↔️ Latitude", back: "side-to-side lines (like ladder rungs)", say: "Latitude! Lines going side to side, like rungs on a ladder. LAT is FLAT!" },
      { front: "↕️ Longitude", back: "top-to-bottom lines", say: "Longitude! Lines running top to bottom, from pole to pole." },
      { front: "0️⃣ Equator", back: "latitude 0°", say: "The equator sits at zero degrees latitude — the starting line!" },
      { front: "📏 Map scale", back: "tells you REAL distances", say: "The map scale! It tells you how far distances really are. One inch might mean ten miles." },
    ] },
    { kind: "pick", text: "Which lines run side-to-side (like ladder rungs)?", tiles: ["latitude", "longitude"], correct: 0, hint: "Latitude — remember: LAT is FLAT!" },
    { kind: "pick", text: "Map scale says 1 inch = 10 miles. How far is 3 inches?", tiles: ["30 miles", "3 miles", "13 miles"], correct: 0, hint: "3 × 10 = 30 miles! Math and geography, teaming up." },
  ],
  capitals: [
    { kind: "say", text: "World capitals! Every country has one city where the government sits. And beware — the biggest city is often NOT the capital. This trips up grown-ups constantly. Honk of superiority!" },
    { kind: "cards", text: "Tap each world capital!", cards: [
      { front: "🇫🇷 France", back: "Paris", say: "France! The capital is Paris." },
      { front: "🇬🇧 England", back: "London", say: "England! The capital is London. Big Ben lives there." },
      { front: "🇯🇵 Japan", back: "Tokyo", say: "Japan! The capital is Tokyo, one of the biggest cities on Earth." },
      { front: "🍁 Canada", back: "Ottawa — NOT Toronto!", say: "Canada! The capital is Ottawa, not Toronto. Classic trick question!" },
    ] },
    { kind: "pick", text: "The capital of Canada is…", tiles: ["Ottawa", "Toronto", "Vancouver"], correct: 0, hint: "Ottawa! Toronto is bigger, but Ottawa governs. Same trick as St. Paul!" },
    { kind: "pick", text: "The capital of Japan is…", tiles: ["Tokyo", "Beijing", "Seoul"], correct: 0, hint: "Tokyo! Beijing is China's and Seoul is South Korea's." },
  ],
  wonders: [
    { kind: "say", text: "Natural wonders! No people built these — Earth made them all by itself. And one of the very best is visible from YOUR backyard on a clear cold night. Keep reading." },
    { kind: "cards", text: "Tap each natural wonder!", cards: [
      { front: "🏜️ Grand Canyon", back: "Arizona — a mile deep!", say: "The Grand Canyon! A mile deep, carved by the Colorado River." },
      { front: "💦 Niagara Falls", back: "USA–Canada border", say: "Niagara Falls! Thundering water right on the border between the USA and Canada." },
      { front: "🌌 Northern Lights", back: "visible from Minnesota!", say: "The Northern Lights! Green and purple curtains in the sky. You can see them from Minnesota!" },
      { front: "⛲ Old Faithful", back: "Yellowstone geyser, erupts on schedule", say: "Old Faithful! A geyser in Yellowstone that erupts about every ninety minutes." },
    ] },
    { kind: "pick", text: "Which wonder can you sometimes see from MINNESOTA?", tiles: ["the Northern Lights", "the Grand Canyon", "Uluru"], correct: 0, hint: "The Northern Lights! On clear dark winter nights, look north. Worth the cold!" },
    { kind: "pick", text: "Old Faithful is a geyser in…", tiles: ["Yellowstone", "the Grand Canyon", "Hawaii"], correct: 0, hint: "Yellowstone National Park — it erupts almost on schedule!" },
  ],
  cultures: [
    { kind: "say", text: "Final lesson, navigator. Geography isn't only mountains and rivers — it's PEOPLE. Every place has its own languages, food, music, and celebrations. That's culture, and it's the best part of traveling." },
    { kind: "cards", text: "Tap each culture!", cards: [
      { front: "🇲🇽 Mexico", back: "Spanish, piñatas, tacos", say: "Mexico! Spanish is spoken, and celebrations often include piñatas." },
      { front: "🇯🇵 Japan", back: "sushi, cherry blossoms, bowing", say: "Japan! Famous for sushi, cherry blossom season, and bowing as a greeting." },
      { front: "🇮🇹 Italy", back: "pizza, pasta, ancient Rome", say: "Italy! Home of pizza, pasta, and the ruins of ancient Rome." },
      { front: "❄️ Scandinavia", back: "Norway & Sweden — many MN families!", say: "Scandinavia! Many Minnesota families trace their roots to Norway and Sweden." },
    ] },
    { kind: "pick", text: "Many Minnesotans have family roots in…", tiles: ["Scandinavia (Norway & Sweden)", "Antarctica", "the Sahara"], correct: 0, hint: "Scandinavia! The cold lakes and forests reminded immigrants of home." },
    { kind: "pick", text: "A country's food, music, language, and holidays make up its…", tiles: ["culture", "climate", "capital"], correct: 0, hint: "Culture! Places are made of people, not just land. That's my favorite fact of all. HONK!" },
  ],
};
