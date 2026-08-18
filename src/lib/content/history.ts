import type { LevelDef, StaticQ, UnitDef } from "../types";

function bUnit(id: string, title: string, emoji: string, bank: StaticQ[]): UnitDef {
  return { id, title, emoji, bank };
}

// ---------- L1: Time Travelers ----------

const LONG_AGO: StaticQ[] = [
  { p: "\"History\" means…", a: "the story of what happened before now", w: ["what will happen tomorrow", "a kind of math", "a country"] },
  { p: "Which happened LONGEST ago?", a: "dinosaurs 🦕", w: ["your birthday", "yesterday's dinner", "last summer"] },
  { p: "Long ago, before cars, people traveled by…", a: "horse and wagon 🐴", w: ["airplane", "rocket", "electric scooter"] },
  { p: "Before phones, how did people send messages far away?", a: "letters carried by horse or ship ✉️", w: ["text message", "video call", "email"] },
  { p: "Before refrigerators, how did people keep food cold?", a: "with blocks of ice in an icebox", w: ["with a freezer app", "they didn't eat food", "with air conditioning"] },
  { p: "Which is a way we learn about long ago?", a: "old photos, letters, and stories", w: ["guessing", "watching cartoons", "making it up"] },
];

const PAST_PRESENT: StaticQ[] = [
  { p: "Which word means RIGHT NOW?", a: "present", w: ["past", "future", "ancient"] },
  { p: "Which word means what already happened?", a: "past", w: ["present", "future", "tomorrow"] },
  { p: "Which word means what hasn't happened yet?", a: "future", w: ["past", "present", "history"] },
  { p: "Which of these is from the PAST?", a: "a horse-drawn carriage", w: ["a smartphone", "a laptop", "an electric car"] },
  { p: "Grandma's childhood was in the…", a: "past", w: ["future", "present", "next year"] },
  { p: "A line that shows events in order is a…", a: "timeline", w: ["circle", "map", "recipe"] },
];

const FAMILY_HIST: StaticQ[] = [
  { p: "Your mom's mom is your…", a: "grandma", w: ["aunt", "cousin", "sister"] },
  { p: "Your grandma's mom is your…", a: "great-grandma", w: ["grandma", "aunt", "niece"] },
  { p: "Stories passed down in a family are called…", a: "family history", w: ["fairy tales", "homework", "gossip"] },
  { p: "A family tree shows…", a: "how relatives are connected", w: ["how to plant trees", "the weather", "your grades"] },
  { p: "Which is a good way to learn family history?", a: "ask your grandparents questions", w: ["guess quietly", "read a math book", "watch TV"] },
  { p: "An old family photo is a kind of…", a: "primary source — real evidence!", w: ["fairy tale", "prediction", "map"] },
];

const HOLIDAYS: StaticQ[] = [
  { p: "The Fourth of July celebrates…", a: "America's birthday 🎆", w: ["the first snow", "the end of school", "Columbus"] },
  { p: "Thanksgiving is a holiday about…", a: "being thankful and sharing a meal 🦃", w: ["scary costumes", "fireworks", "presents from Santa"] },
  { p: "Which holiday honors people who served in the military?", a: "Veterans Day", w: ["Halloween", "Valentine's Day", "April Fools"] },
  { p: "Martin Luther King Jr. Day honors a leader who worked for…", a: "fairness and equal rights", w: ["fast cars", "the moon landing", "inventing pizza"] },
  { p: "Presidents' Day honors…", a: "the presidents of the USA", w: ["all teachers", "explorers", "pirates"] },
  { p: "Why do we have holidays about history?", a: "to remember important people and events", w: ["to skip school only", "to make calendars longer", "no reason"] },
];

// ---------- L2: Long Ago Explorers ----------

const NATIVE: StaticQ[] = [
  { p: "Who lived in America FIRST, long before anyone sailed here?", a: "Native American peoples", w: ["the Pilgrims", "the Vikings only", "nobody"] },
  { p: "Native nations like the Dakota and Ojibwe have lived in which state for a very long time?", a: "Minnesota", w: ["Hawaii", "Florida", "Maine"] },
  { p: "Many Native peoples of the plains followed which animal for food and supplies?", a: "the bison (buffalo) 🦬", w: ["penguins", "camels", "kangaroos"] },
  { p: "A birchbark canoe was used for…", a: "traveling on lakes and rivers 🛶", w: ["flying", "farming", "cooking"] },
  { p: "Native peoples passed down history through…", a: "spoken stories from elders", w: ["television", "newspapers", "the internet"] },
  { p: "How many different Native nations are there in the USA today?", a: "hundreds — each with its own culture", w: ["exactly one", "none", "three"] },
];

const EXPLORERS: StaticQ[] = [
  { p: "In 1492, Christopher Columbus sailed across which ocean?", a: "the Atlantic", w: ["the Pacific", "the Arctic", "the Indian"] },
  { p: "Columbus was actually trying to find a new route to…", a: "Asia", w: ["Antarctica", "the moon", "Australia"] },
  { p: "Explorers traveled in…", a: "wooden sailing ships ⛵", w: ["submarines", "airplanes", "trains"] },
  { p: "Which explorers reached North America about 500 years BEFORE Columbus?", a: "the Vikings", w: ["the Romans", "the Egyptians", "the Aztecs"] },
  { p: "Sailors used the stars and a compass to…", a: "find their way at sea", w: ["catch fish", "make maps of the moon", "tell jokes"] },
  { p: "Long ocean voyages were dangerous because of…", a: "storms, sickness, and running out of food", w: ["traffic jams", "loud neighbors", "airport delays"] },
];

const PILGRIMS: StaticQ[] = [
  { p: "The Pilgrims sailed to America on a ship called the…", a: "Mayflower", w: ["Titanic", "Santa Maria", "Rose"] },
  { p: "The Pilgrims came to America looking for…", a: "freedom to worship their own way", w: ["gold only", "warm weather", "a vacation"] },
  { p: "The Pilgrims' first winter was…", a: "very hard — many people got sick", w: ["easy and warm", "a big party", "spent indoors watching TV"] },
  { p: "Which Native man helped the Pilgrims learn to grow corn?", a: "Squanto (Tisquantum)", w: ["Paul Revere", "George Washington", "Columbus"] },
  { p: "The first Thanksgiving was a…", a: "harvest feast shared with the Wampanoag", w: ["birthday party", "battle", "boat race"] },
  { p: "The Pilgrims landed in what is now which state?", a: "Massachusetts", w: ["Minnesota", "Texas", "California"] },
];

const COLONIAL: StaticQ[] = [
  { p: "Colonial kids often went to a school with…", a: "one room and all the grades together", w: ["computers in every desk", "a swimming pool", "school buses"] },
  { p: "Colonial families made their own…", a: "clothes, candles, and soap", w: ["video games", "cereal boxes", "electricity"] },
  { p: "Colonial homes were lit at night by…", a: "candles and fireplaces 🕯️", w: ["light bulbs", "flashlights", "neon signs"] },
  { p: "A blacksmith was someone who…", a: "made things out of iron", w: ["painted portraits", "baked bread", "sailed ships"] },
  { p: "Colonial children helped by…", a: "doing chores like fetching water and feeding animals", w: ["driving cars", "doing nothing", "going to the mall"] },
  { p: "How did colonial people get water?", a: "from a well or a stream", w: ["from a faucet", "delivered in bottles", "from a vending machine"] },
];

// ---------- L3: A New Country ----------

const REVOLUTION: StaticQ[] = [
  { p: "Before it was its own country, America was ruled by…", a: "England (Great Britain)", w: ["France", "Spain", "Canada"] },
  { p: "The colonists were angry about paying taxes without…", a: "having a say in the government", w: ["getting receipts", "free shipping", "enough tea"] },
  { p: "At the Boston Tea Party, colonists dumped tea into…", a: "Boston Harbor 🫖", w: ["the Mississippi River", "a giant teapot", "the ocean in England"] },
  { p: "Who rode at night to warn 'the British are coming'?", a: "Paul Revere 🐎", w: ["George Washington", "Ben Franklin", "Betsy Ross"] },
  { p: "The Declaration of Independence was signed in…", a: "1776", w: ["1492", "1620", "1865"] },
  { p: "The Fourth of July celebrates the day America declared…", a: "independence", w: ["war on winter", "a new king", "the first Thanksgiving"] },
];

const FOUNDERS: StaticQ[] = [
  { p: "Who was the FIRST president of the United States?", a: "George Washington", w: ["Abraham Lincoln", "Thomas Jefferson", "Ben Franklin"] },
  { p: "Who mainly wrote the Declaration of Independence?", a: "Thomas Jefferson", w: ["Paul Revere", "John Adams", "Betsy Ross"] },
  { p: "Which founder flew a kite in a storm to study lightning?", a: "Benjamin Franklin ⚡", w: ["George Washington", "Thomas Jefferson", "Sam Adams"] },
  { p: "Ben Franklin also invented…", a: "bifocal glasses and the lightning rod", w: ["the telephone", "the airplane", "the light bulb"] },
  { p: "Who is said to have sewn an early American flag?", a: "Betsy Ross", w: ["Martha Washington", "Abigail Adams", "Harriet Tubman"] },
  { p: "Abigail Adams famously told her husband to \"remember the…\"", a: "ladies", w: ["horses", "taxes", "tea"] },
];

const CONSTITUTION: StaticQ[] = [
  { p: "The Constitution is…", a: "the rulebook for how our government works", w: ["a treasure map", "a song", "a type of ship"] },
  { p: "The first 10 amendments are called the…", a: "Bill of Rights", w: ["Top Ten List", "Ten Commandments", "First Draft"] },
  { p: "The Constitution starts with which famous words?", a: "\"We the People…\"", w: ["\"Once upon a time…\"", "\"Dear America…\"", "\"In the beginning…\""] },
  { p: "Voting is how citizens…", a: "choose their leaders 🗳️", w: ["pay taxes", "get a passport", "join the army"] },
  { p: "Our government has three branches so that…", a: "no one part gets too much power", w: ["it looks like a tree", "there are more jobs", "it's harder to understand"] },
  { p: "Freedom of speech means you can…", a: "share your ideas and opinions", w: ["say anything with no consequences ever", "never be quiet", "skip school"] },
];

const PIONEERS: StaticQ[] = [
  { p: "Pioneers traveled west in…", a: "covered wagons 🐂", w: ["airplanes", "submarines", "school buses"] },
  { p: "The Oregon Trail was…", a: "a long wagon route west", w: ["a running race", "a river", "a railroad only"] },
  { p: "Pioneer families on the prairie sometimes built houses out of…", a: "sod (grass and dirt bricks)", w: ["glass", "concrete", "steel"] },
  { p: "The transcontinental railroad connected…", a: "the east and west of the country 🚂", w: ["America and Europe", "two cities in Texas", "Canada and Mexico"] },
  { p: "Which famous author wrote 'Little House on the Prairie' about pioneer life?", a: "Laura Ingalls Wilder", w: ["Beverly Cleary", "Dr. Seuss", "E.B. White"] },
  { p: "Pioneer trips west took…", a: "many months", w: ["a few hours", "one day", "ten years"] },
];

// ---------- L4: Changing America ----------

const SLAVERY_WAR: StaticQ[] = [
  { p: "Slavery meant that people were…", a: "forced to work and treated as property — it was deeply wrong", w: ["paid fairly", "on vacation", "in charge"] },
  { p: "Who was president during the Civil War?", a: "Abraham Lincoln", w: ["George Washington", "Thomas Jefferson", "Teddy Roosevelt"] },
  { p: "The Civil War was fought between…", a: "the northern and southern states", w: ["America and England", "Canada and Mexico", "two other countries"] },
  { p: "The Emancipation Proclamation declared…", a: "freedom for enslaved people", w: ["a new holiday", "the end of taxes", "war on Britain"] },
  { p: "Harriet Tubman is famous for…", a: "leading people to freedom on the Underground Railroad", w: ["inventing the train", "being a president", "writing the Constitution"] },
  { p: "The Underground Railroad was…", a: "a secret network of people and safe houses", w: ["a subway", "a real train under the ground", "a tunnel to Canada"] },
];

const INVENTIONS: StaticQ[] = [
  { p: "Thomas Edison helped invent the…", a: "light bulb 💡", w: ["telephone", "airplane", "car"] },
  { p: "Alexander Graham Bell invented the…", a: "telephone ☎️", w: ["light bulb", "radio", "camera"] },
  { p: "The Wright brothers were first to fly a…", a: "powered airplane ✈️", w: ["hot air balloon", "helicopter", "rocket"] },
  { p: "Henry Ford made cars affordable using the…", a: "assembly line", w: ["horse and buggy", "internet", "steam engine"] },
  { p: "Before electricity, homes were lit with…", a: "candles and oil lamps", w: ["LED strips", "flashlights", "neon"] },
  { p: "The first airplane flight lasted about…", a: "12 seconds!", w: ["3 hours", "a whole day", "45 minutes"] },
];

const RIGHTS: StaticQ[] = [
  { p: "For a long time in America, women could not…", a: "vote", w: ["read", "own pets", "cook"] },
  { p: "Women won the right to vote in…", a: "1920", w: ["1776", "1865", "1990"] },
  { p: "Susan B. Anthony fought for…", a: "women's right to vote", w: ["free candy", "shorter school days", "faster trains"] },
  { p: "Rosa Parks became famous for…", a: "refusing to give up her bus seat", w: ["driving a bus", "inventing the bus", "walking to school"] },
  { p: "Martin Luther King Jr. gave a famous speech called…", a: "\"I Have a Dream\"", w: ["\"Four Score\"", "\"We the People\"", "\"Give Me Liberty\""] },
  { p: "The Civil Rights Movement worked to…", a: "end unfair treatment based on skin color", w: ["build more roads", "start the Olympics", "explore space"] },
];

const IMMIGRATION: StaticQ[] = [
  { p: "An immigrant is someone who…", a: "moves to a new country to live", w: ["visits for a day", "was born there", "sells maps"] },
  { p: "Many immigrants arriving by ship were welcomed at…", a: "Ellis Island 🗽", w: ["Rhode Island", "Long Island", "Coney Island"] },
  { p: "The Statue of Liberty was a gift from…", a: "France", w: ["England", "Spain", "Canada"] },
  { p: "People immigrate for reasons like…", a: "safety, jobs, and a better life", w: ["only for the food", "to get lost", "because it's required"] },
  { p: "Many Scandinavian immigrants settled in which state?", a: "Minnesota", w: ["Hawaii", "Arizona", "Georgia"] },
  { p: "Immigrants bring with them their…", a: "language, food, and traditions", w: ["nothing at all", "only suitcases", "new weather"] },
];

// ---------- L5: The Modern World ----------

const WORLD_WARS: StaticQ[] = [
  { p: "How many world wars were there in the 1900s?", a: "2", w: ["1", "5", "10"] },
  { p: "World War II ended in…", a: "1945", w: ["1918", "1960", "1929"] },
  { p: "During WWII, many women worked in factories, symbolized by…", a: "Rosie the Riveter 💪", w: ["Wonder Woman", "Betsy Ross", "Amelia Earhart"] },
  { p: "The Great Depression was a time when…", a: "many people lost jobs and money", w: ["everyone got rich", "it rained constantly", "school was canceled"] },
  { p: "After WWII, countries formed the ___ to work for peace.", a: "United Nations", w: ["Olympics", "European Tour", "World Cup"] },
  { p: "Anne Frank is remembered for…", a: "her diary written while hiding during WWII", w: ["flying a plane", "inventing radar", "leading an army"] },
];

const SPACE_RACE: StaticQ[] = [
  { p: "Who was the first person to walk on the moon?", a: "Neil Armstrong 🌕", w: ["Buzz Aldrin", "John Glenn", "Yuri Gagarin"] },
  { p: "The first moon landing happened in…", a: "1969", w: ["1945", "1985", "2001"] },
  { p: "Neil Armstrong said: 'That's one small step for man, one giant leap for…'", a: "mankind", w: ["the moon", "science", "America"] },
  { p: "Which country launched the first satellite, Sputnik?", a: "the Soviet Union (Russia)", w: ["the USA", "France", "China"] },
  { p: "NASA is the American agency for…", a: "space exploration 🚀", w: ["farming", "railroads", "weather forecasting only"] },
  { p: "Katherine Johnson was a mathematician who…", a: "calculated flight paths for NASA astronauts", w: ["flew the first rocket", "built the moon buggy", "invented the telescope"] },
];

const TECH_AGE: StaticQ[] = [
  { p: "The internet became common in homes during the…", a: "1990s", w: ["1920s", "1950s", "1800s"] },
  { p: "Before the internet, people looked up facts in…", a: "encyclopedias and libraries 📚", w: ["search engines", "smart speakers", "apps"] },
  { p: "The first cell phones were…", a: "huge and very expensive", w: ["tiny and free", "made of glass", "invented in 1800"] },
  { p: "Before streaming, families watched movies on…", a: "VHS tapes and DVDs 📼", w: ["phones", "tablets", "smart TVs"] },
  { p: "Computers used to be…", a: "as big as an entire room!", w: ["always pocket-sized", "made of wood", "powered by horses"] },
  { p: "Which of these is the NEWEST invention?", a: "the smartphone", w: ["the telephone", "the television", "the radio"] },
];

const MN_HISTORY: StaticQ[] = [
  { p: "Minnesota became a state in…", a: "1858", w: ["1776", "1900", "1620"] },
  { p: "Minnesota's early industries included…", a: "logging, flour milling, and iron mining", w: ["surfing and oranges", "oil drilling", "diamond mining"] },
  { p: "Minneapolis was once known as the ___ Capital of the World.", a: "Flour Milling", w: ["Gold", "Movie", "Auto"] },
  { p: "The iron ore from Minnesota's Iron Range helped build…", a: "American steel — cars, buildings, and ships", w: ["paper", "candy", "clothing"] },
  { p: "Which mighty river begins in Minnesota at Lake Itasca?", a: "the Mississippi", w: ["the Missouri", "the Ohio", "the Red"] },
  { p: "Minnesota's name comes from a Dakota word meaning…", a: "sky-tinted water", w: ["cold land", "many trees", "big lake"] },
];

// ---------- L6: Thinking Like a Historian ----------

const SOURCES: StaticQ[] = [
  { p: "A PRIMARY source is…", a: "made by someone who was actually there", w: ["a textbook written later", "a movie about it", "a rumor"] },
  { p: "Which is a primary source about the Civil War?", a: "a soldier's letter home", w: ["a 2020 documentary", "a school report", "a novel"] },
  { p: "A SECONDARY source is…", a: "made later by someone studying the event", w: ["a diary from that day", "a photograph from the scene", "an old coin"] },
  { p: "Which is a secondary source?", a: "a history textbook", w: ["a diary", "an old newspaper from that day", "a video of the event"] },
  { p: "Scientists who dig up artifacts to study the past are…", a: "archaeologists", w: ["astronauts", "meteorologists", "veterinarians"] },
  { p: "Why do historians use MANY sources?", a: "to check facts and get the full story", w: ["to fill more pages", "because one is boring", "to confuse people"] },
];

const CAUSE_EFFECT: StaticQ[] = [
  { p: "Taxes without representation CAUSED colonists to…", a: "protest and start a revolution", w: ["move to France", "throw a parade", "build more ships"] },
  { p: "The invention of the car led to…", a: "more roads and faster travel", w: ["fewer roads", "the end of cities", "slower travel"] },
  { p: "The transcontinental railroad caused the west to be…", a: "settled much faster", w: ["abandoned", "underwater", "given away"] },
  { p: "Why did people move west during the Gold Rush?", a: "they hoped to strike it rich", w: ["they hated the ocean", "the government made them", "for the weather"] },
  { p: "The printing press caused…", a: "books and ideas to spread widely", w: ["books to disappear", "fewer readers", "the end of writing"] },
  { p: "Studying history helps us…", a: "learn from mistakes and understand today", w: ["predict lottery numbers", "change the past", "avoid reading"] },
];

const TIMELINES: StaticQ[] = [
  { p: "Put these in order — which came FIRST?", a: "the Pilgrims (1620)", w: ["the Revolution (1776)", "the Civil War (1861)", "the moon landing (1969)"] },
  { p: "Which came LAST?", a: "the moon landing (1969)", w: ["the Civil War", "the Declaration of Independence", "Columbus's voyage"] },
  { p: "A century is…", a: "100 years", w: ["10 years", "50 years", "1,000 years"] },
  { p: "A decade is…", a: "10 years", w: ["100 years", "5 years", "2 years"] },
  { p: "The 1900s are also called the…", a: "20th century", w: ["19th century", "21st century", "10th century"] },
  { p: "BC/BCE dates count…", a: "backwards, before year 1", w: ["forwards from today", "in months", "only in Egypt"] },
];

const ANCIENT: StaticQ[] = [
  { p: "The ancient Egyptians are famous for building…", a: "pyramids 🔺", w: ["skyscrapers", "castles", "igloos"] },
  { p: "Egyptian picture-writing is called…", a: "hieroglyphics", w: ["cursive", "Morse code", "emoji"] },
  { p: "The ancient Greeks started which sporting event?", a: "the Olympics 🏅", w: ["the Super Bowl", "the World Cup", "NASCAR"] },
  { p: "The Romans were famous for building roads and…", a: "aqueducts that carried water", w: ["airplanes", "the internet", "submarines"] },
  { p: "The Great Wall was built to…", a: "protect China from invaders", w: ["hold back the ocean", "mark a race track", "block the wind"] },
  { p: "Ancient people wrote on…", a: "clay tablets, papyrus, and stone", w: ["notebooks", "tablets with apps", "whiteboards"] },
];

export const HISTORY_LEVELS: LevelDef[] = [
  {
    n: 1,
    name: "Time Travelers",
    units: [
      bUnit("longago", "Life Long Ago", "⏳", LONG_AGO),
      bUnit("pastpresent", "Past, Present, Future", "📅", PAST_PRESENT),
      bUnit("family", "My Family's History", "👨‍👩‍👧‍👧", FAMILY_HIST),
      bUnit("holidays", "Holidays We Remember", "🎆", HOLIDAYS),
    ],
  },
  {
    n: 2,
    name: "Long Ago Explorers",
    units: [
      bUnit("native", "First Peoples", "🪶", NATIVE),
      bUnit("explorers", "Explorers & Ships", "⛵", EXPLORERS),
      bUnit("pilgrims", "Pilgrims & Thanksgiving", "🦃", PILGRIMS),
      bUnit("colonial", "Colonial Life", "🕯️", COLONIAL),
    ],
  },
  {
    n: 3,
    name: "A New Country",
    units: [
      bUnit("revolution", "The Revolution", "🎺", REVOLUTION),
      bUnit("founders", "The Founders", "🖋️", FOUNDERS),
      bUnit("constitution", "Constitution & Rights", "📜", CONSTITUTION),
      bUnit("pioneers", "Pioneers Head West", "🐂", PIONEERS),
    ],
  },
  {
    n: 4,
    name: "Changing America",
    units: [
      bUnit("civilwar", "Civil War & Freedom", "🕊️", SLAVERY_WAR),
      bUnit("inventions", "Great Inventions", "💡", INVENTIONS),
      bUnit("rights", "Fighting for Fairness", "✊", RIGHTS),
      bUnit("immigration", "Coming to America", "🗽", IMMIGRATION),
    ],
  },
  {
    n: 5,
    name: "The Modern World",
    units: [
      bUnit("wars", "The World Wars", "🌍", WORLD_WARS),
      bUnit("space", "The Space Race", "🚀", SPACE_RACE),
      bUnit("tech", "The Tech Age", "💻", TECH_AGE),
      bUnit("minnesota", "Minnesota's Story", "❄️", MN_HISTORY),
    ],
  },
  {
    n: 6,
    name: "Thinking Like a Historian",
    units: [
      bUnit("sources", "Primary Sources", "🔍", SOURCES),
      bUnit("causeeffect", "Cause & Effect", "⛓️", CAUSE_EFFECT),
      bUnit("timelines", "Timelines & Centuries", "📆", TIMELINES),
      bUnit("ancient", "Ancient Civilizations", "🏺", ANCIENT),
    ],
  },
];
