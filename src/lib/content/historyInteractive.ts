import type { IStep } from "./mathInteractive";

/** Barnaby the Tortoise's story-time lessons — he claims he was at all of them. */
export const HISTORY_INTERACTIVE: Record<string, IStep[]> = {
  // L1
  longago: [
    { kind: "say", text: "Gather round, young sprout. I am Barnaby, five hundred and twelve years old, and history is simply everything that happened before right now. I was there for most of it. Napping, but there." },
    { kind: "cards", text: "Tap each card to see how life CHANGED!", cards: [
      { front: "Travel", back: "then: 🐴 horse & wagon → now: 🚗 car", say: "Long ago, people traveled by horse and wagon. It took days to go where a car goes in an hour!" },
      { front: "Messages", back: "then: ✉️ letters by ship → now: 📱 instant", say: "Long ago, a letter across the ocean took weeks. Now you press a button. Witchcraft!" },
      { front: "Light", back: "then: 🕯️ candles → now: 💡 light switch", say: "Long ago, when the sun went down, you lit a candle. That was it. Bedtime came early!" },
      { front: "Food", back: "then: 🧊 icebox → now: ❄️ refrigerator", say: "Before refrigerators, people put actual blocks of ice in a box. The iceman delivered it!" },
    ] },
    { kind: "pick", text: "Before cars, how did most people travel far?", tiles: ["🐴 horse and wagon", "✈️ airplane", "🛴 scooter"], correct: 0, hint: "Horses! A trip that takes you one hour today took a whole day back then." },
    { kind: "pick", text: "How do we KNOW about life long ago?", tiles: ["old photos, letters, and stories", "we guess", "we make it up"], correct: 0, hint: "Real evidence — the things people left behind. That's how history works!" },
  ],
  pastpresent: [
    { kind: "say", text: "Three little words rule all of history: PAST, PRESENT, FUTURE. Past is done. Present is happening this very second. Future hasn't arrived. At my speed, I experience mostly past." },
    { kind: "cards", text: "Tap each one!", cards: [
      { front: "⏪ Past", back: "already happened — yesterday, 1776", say: "The past! Everything that already happened. Yesterday is past. So is 1776." },
      { front: "⏺️ Present", back: "right now — this second!", say: "The present! Right now, this very moment, you tapping this card." },
      { front: "⏩ Future", back: "hasn't happened yet — tomorrow", say: "The future! Everything still to come. Tomorrow, next year, when you grow up." },
    ] },
    { kind: "pick", text: "Your breakfast this morning is in the…", tiles: ["past", "present", "future"], correct: 0, hint: "Already eaten, already done — that's the past!" },
    { kind: "pick", text: "A line that shows events in the order they happened is a…", tiles: ["timeline", "circle", "map"], correct: 0, hint: "A timeline! Oldest on the left, newest on the right. Historians adore them." },
  ],
  family: [
    { kind: "say", text: "Your OWN history, young sprout! Every family has stories, and your grandparents are living history books. Ask them what their childhood was like. Best homework ever assigned." },
    { kind: "cards", text: "Tap each branch of a family tree!", cards: [
      { front: "You", back: "the newest branch! 🌱", say: "That's you! The newest branch on your family tree." },
      { front: "Parents", back: "mom and dad", say: "Your parents. They were kids once too. Ask them about it!" },
      { front: "Grandparents", back: "your parents' parents", say: "Your grandparents! They remember a world before smartphones." },
      { front: "Great-grandparents", back: "your grandparents' parents", say: "Great grandparents! Their world had no computers at all." },
    ] },
    { kind: "pick", text: "Your grandma's mom is your…", tiles: ["great-grandma", "aunt", "cousin"], correct: 0, hint: "Add 'great' for each generation further back!" },
    { kind: "pick", text: "The best way to learn your family history is…", tiles: ["ask your grandparents questions", "guess", "look it up in a textbook"], correct: 0, hint: "Interview them! Real people who were THERE are the best sources." },
  ],
  holidays: [
    { kind: "say", text: "Holidays are how we remember. Every one is a birthday candle for an important event or person. Some are joyful, some solemn — all worth understanding." },
    { kind: "cards", text: "Tap each holiday!", cards: [
      { front: "🎆 Fourth of July", back: "America's birthday, 1776", say: "The Fourth of July! America declared independence in seventeen seventy-six." },
      { front: "🦃 Thanksgiving", back: "harvest feast & gratitude", say: "Thanksgiving! A harvest feast, remembering the Pilgrims and Wampanoag sharing food." },
      { front: "🎖️ Veterans Day", back: "honors those who served", say: "Veterans Day honors everyone who served in the military." },
      { front: "✊ MLK Jr. Day", back: "honors a leader for fairness", say: "Martin Luther King Junior Day honors a great leader who fought for fairness." },
    ] },
    { kind: "pick", text: "The Fourth of July celebrates…", tiles: ["America declaring independence", "the first snowfall", "the end of school"], correct: 0, hint: "The birthday of the country — 1776!" },
    { kind: "pick", text: "Why do we have holidays about history at all?", tiles: ["to remember important people and events", "just for days off", "no reason"], correct: 0, hint: "Remembering keeps the lessons alive. A country that forgets repeats its mistakes!" },
  ],
  // L2
  native: [
    { kind: "say", text: "Now, an important truth: America's story does NOT begin with explorers arriving. Native peoples had lived here for thousands of years — hundreds of nations, each with its own language, government, and traditions. Still here today." },
    { kind: "cards", text: "Tap to learn about First Peoples!", cards: [
      { front: "First here", back: "thousands of years before explorers", say: "Native peoples lived here for thousands of years before any ship arrived." },
      { front: "🪶 Many nations", back: "hundreds — each unique", say: "Not one group! Hundreds of different nations, each with its own language and ways." },
      { front: "In Minnesota", back: "Dakota & Ojibwe homelands", say: "In Minnesota, the Dakota and Ojibwe nations have lived here a very long time." },
      { front: "🛶 Living with the land", back: "canoes, wild rice, bison", say: "They traveled by birchbark canoe, harvested wild rice, and followed the bison." },
    ] },
    { kind: "pick", text: "Who lived in America FIRST?", tiles: ["Native American peoples", "the Pilgrims", "explorers from Spain"], correct: 0, hint: "Thousands of years before any ship crossed the ocean!" },
    { kind: "pick", text: "How did Native peoples pass down their history?", tiles: ["spoken stories from elders", "newspapers", "the internet"], correct: 0, hint: "Oral tradition — elders telling stories to children, generation after generation." },
  ],
  explorers: [
    { kind: "say", text: "The age of sail! Imagine climbing into a wooden ship, pointing at the horizon, and having absolutely no idea what's out there. Brave? Yes. Slightly foolish? Also yes. I'd have stayed home." },
    { kind: "cards", text: "Tap each explorer fact!", cards: [
      { front: "1492", back: "Columbus sailed the Atlantic", say: "In fourteen ninety-two, Columbus sailed across the Atlantic Ocean." },
      { front: "Looking for…", back: "a shortcut to ASIA!", say: "He was trying to reach Asia! He bumped into the Americas by accident." },
      { front: "🛶 The Vikings", back: "got here ~500 years earlier!", say: "The Vikings reached North America about five hundred years before Columbus!" },
      { front: "⭐ Navigation", back: "stars, sun, and compass", say: "Sailors found their way using the stars, the sun, and a compass. No maps of what lay ahead!" },
    ] },
    { kind: "pick", text: "Columbus was actually trying to reach…", tiles: ["Asia", "Antarctica", "the moon"], correct: 0, hint: "He wanted a shortcut to Asia's spices and silk — and landed somewhere else entirely!" },
    { kind: "pick", text: "Which group reached North America ~500 years BEFORE Columbus?", tiles: ["the Vikings", "the Romans", "the Egyptians"], correct: 0, hint: "Leif Erikson and the Norse! They reached Newfoundland around the year 1000." },
  ],
  pilgrims: [
    { kind: "say", text: "The Mayflower story! One hundred and two people crammed into a ship the size of a tennis court, for sixty-six days, in the stormy Atlantic. I get seasick in a puddle. Extraordinary courage." },
    { kind: "cards", text: "Tap through the Pilgrim story!", cards: [
      { front: "⛵ The Mayflower", back: "66 days at sea, 1620", say: "The Mayflower! Sixty-six days crossing the Atlantic in sixteen twenty." },
      { front: "Why they left", back: "freedom to worship their own way", say: "They left England seeking freedom to worship in their own way." },
      { front: "❄️ First winter", back: "brutally hard — many died", say: "The first winter was terrible. Cold, hunger, sickness. About half did not survive." },
      { front: "🌽 Squanto's help", back: "taught them to grow corn", say: "Squanto, a Wampanoag man who spoke English, taught them to plant corn and catch fish." },
    ] },
    { kind: "pick", text: "What was the Pilgrims' ship called?", tiles: ["the Mayflower", "the Titanic", "the Santa Maria"], correct: 0, hint: "The Mayflower! Columbus had the Santa Maria — different century entirely." },
    { kind: "pick", text: "The first Thanksgiving was…", tiles: ["a harvest feast shared with the Wampanoag", "a battle", "a birthday party"], correct: 0, hint: "A three-day harvest celebration shared between the Pilgrims and the Wampanoag people." },
  ],
  colonial: [
    { kind: "say", text: "Colonial life! No stores, no electricity, no plumbing. If you wanted a candle, you MADE the candle. Children worked before breakfast. You'd have been very good at it, I suspect." },
    { kind: "cards", text: "Tap to compare colonial life to yours!", cards: [
      { front: "🏫 School", back: "one room, all ages together", say: "One-room schoolhouses! Every age learned together with a single teacher." },
      { front: "🕯️ Light", back: "candles they made themselves", say: "Families made their own candles from animal fat. Smelly work!" },
      { front: "💧 Water", back: "hauled from a well by hand", say: "No faucets. You carried every bucket from the well yourself." },
      { front: "🧒 Kids' chores", back: "feed animals, fetch water, garden", say: "Children had real jobs before breakfast — feeding animals, fetching water, working the garden." },
    ] },
    { kind: "pick", text: "How did colonial families get light at night?", tiles: ["candles and firelight", "light bulbs", "flashlights"], correct: 0, hint: "Candles and the fireplace — which is why everyone went to bed so early!" },
    { kind: "pick", text: "A blacksmith made things out of…", tiles: ["iron", "bread", "paper"], correct: 0, hint: "Iron! Horseshoes, nails, tools, pots — the village blacksmith made it all." },
  ],
  // L3
  revolution: [
    { kind: "say", text: "The Revolution! America was ruled by England, taxed by England, with NO say in England's government. The colonists' complaint fit on a bumper sticker: no taxation without representation." },
    { kind: "cards", text: "Tap through the road to revolution!", cards: [
      { front: "The problem", back: "taxes with no say in government", say: "England taxed the colonies, but colonists had no vote in Parliament. Deeply unfair!" },
      { front: "🫖 Boston Tea Party", back: "1773 — tea dumped in the harbor", say: "In seventeen seventy-three, colonists dumped three hundred and forty chests of tea into Boston Harbor!" },
      { front: "🐎 Paul Revere", back: "1775 — 'The British are coming!'", say: "Paul Revere rode through the night warning that British soldiers were on the march!" },
      { front: "📜 July 4, 1776", back: "Declaration of Independence", say: "July fourth, seventeen seventy-six. The Declaration of Independence. A brand new country!" },
    ] },
    { kind: "pick", text: "At the Boston Tea Party, colonists dumped tea into…", tiles: ["Boston Harbor", "the Mississippi River", "a giant teapot"], correct: 0, hint: "Right into the harbor! A protest against the tea tax." },
    { kind: "pick", text: "The Declaration of Independence was signed in…", tiles: ["1776", "1492", "1865"], correct: 0, hint: "Seventeen seventy-six — that's why the Fourth of July is America's birthday!" },
  ],
  founders: [
    { kind: "say", text: "The founders! A collection of farmers, lawyers, printers, and one gentleman who flew a kite in a thunderstorm on purpose. I met Franklin. Odd fellow. Brilliant, but odd." },
    { kind: "cards", text: "Tap each founder!", cards: [
      { front: "George Washington", back: "1st president, led the army", say: "George Washington! He led the army and became the first president." },
      { front: "Thomas Jefferson", back: "wrote the Declaration", say: "Thomas Jefferson wrote most of the Declaration of Independence at age thirty-three!" },
      { front: "⚡ Ben Franklin", back: "inventor, printer, kite-flyer", say: "Benjamin Franklin! Printer, inventor, diplomat. He invented bifocals and the lightning rod." },
      { front: "Abigail Adams", back: "'Remember the ladies'", say: "Abigail Adams wrote to her husband John: remember the ladies! She argued for women's rights early." },
    ] },
    { kind: "pick", text: "Who was the FIRST president?", tiles: ["George Washington", "Abraham Lincoln", "Ben Franklin"], correct: 0, hint: "Washington! He could have been king and famously refused." },
    { kind: "pick", text: "Who flew a kite in a storm to study lightning?", tiles: ["Ben Franklin", "Paul Revere", "Thomas Jefferson"], correct: 0, hint: "Franklin! Please do NOT recreate this experiment. Ever." },
  ],
  constitution: [
    { kind: "say", text: "The Constitution — the rulebook of the whole country, and it opens with three magnificent words: WE THE PEOPLE. Not 'we the king'. That was the revolutionary part." },
    { kind: "cards", text: "Tap each piece of the rulebook!", cards: [
      { front: "📜 The Constitution", back: "the rules for our government", say: "The Constitution! It explains how the government works and what it may not do." },
      { front: "'We the People'", back: "power comes from citizens", say: "We the People! Power comes from the citizens, not from a king." },
      { front: "🗽 Bill of Rights", back: "first 10 amendments — your freedoms", say: "The Bill of Rights — the first ten amendments, protecting freedoms like speech and religion." },
      { front: "🏛️ Three branches", back: "so no one gets too much power", say: "Three branches of government, each watching the others. No one gets too powerful!" },
    ] },
    { kind: "pick", text: "The first 10 amendments are called the…", tiles: ["Bill of Rights", "Top Ten", "First Draft"], correct: 0, hint: "The Bill of Rights — free speech, freedom of religion, and more!" },
    { kind: "pick", text: "Why THREE branches of government?", tiles: ["so no one part gets too much power", "it looks nice", "there were three founders"], correct: 0, hint: "Checks and balances! They'd just escaped a king — they weren't making another one." },
  ],
  pioneers: [
    { kind: "say", text: "Westward! Families packed everything into a wagon the size of a small bedroom and walked — WALKED — two thousand miles. Took five months. Honestly? That's about my pace. I respect it." },
    { kind: "cards", text: "Tap through the pioneer journey!", cards: [
      { front: "🐂 Covered wagons", back: "walked beside them, 2,000 miles", say: "Covered wagons! Most people walked beside them the entire way. Five long months." },
      { front: "🛤️ Oregon Trail", back: "the great route west", say: "The Oregon Trail! Thousands of families followed it west, wagon after wagon." },
      { front: "🏠 Sod houses", back: "built from dirt and grass bricks", say: "On the treeless prairie, families built houses out of sod — bricks of dirt and grass!" },
      { front: "🚂 The railroad", back: "1869 — connected coast to coast", say: "In eighteen sixty-nine, the transcontinental railroad connected east to west. Months became days!" },
    ] },
    { kind: "pick", text: "Pioneers traveled west in…", tiles: ["covered wagons", "airplanes", "submarines"], correct: 0, hint: "Covered wagons pulled by oxen — and most people walked alongside!" },
    { kind: "pick", text: "The transcontinental railroad changed travel by…", tiles: ["making months-long trips take days", "making it slower", "only carrying mail"], correct: 0, hint: "Five months by wagon became about one week by train. Astonishing!" },
  ],
  // L4
  civilwar: [
    { kind: "say", text: "Now a hard chapter, young sprout — but an important one. For much of America's early history, millions of Black people were enslaved: forced to work, bought and sold, denied freedom. It was deeply, terribly wrong, and America went to war over it." },
    { kind: "cards", text: "Tap through this chapter carefully.", cards: [
      { front: "Slavery", back: "people forced to work, treated as property", say: "Slavery meant human beings were forced to work and treated as property. It was a great wrong." },
      { front: "⚔️ Civil War", back: "1861–1865, North vs. South", say: "The Civil War, eighteen sixty-one to eighteen sixty-five. Northern states against southern states." },
      { front: "Abraham Lincoln", back: "president during the war", say: "Abraham Lincoln was president. He issued the Emancipation Proclamation declaring freedom." },
      { front: "🕊️ Harriet Tubman", back: "led people to freedom", say: "Harriet Tubman escaped slavery, then returned again and again to lead others to freedom." },
    ] },
    { kind: "pick", text: "Who was president during the Civil War?", tiles: ["Abraham Lincoln", "George Washington", "Thomas Jefferson"], correct: 0, hint: "Lincoln! He led the country through its hardest years." },
    { kind: "pick", text: "The Underground Railroad was…", tiles: ["a secret network of people and safe houses", "a real train underground", "a subway"], correct: 0, hint: "Not a real railroad at all! Brave people hiding and guiding others to freedom." },
  ],
  inventions: [
    { kind: "say", text: "The great inventing age! In one human lifetime, the world went from candles and horses to light bulbs, telephones, and flying machines. I watched it happen. Slowly, obviously." },
    { kind: "cards", text: "Tap each world-changing invention!", cards: [
      { front: "💡 Light bulb", back: "Edison, 1879 — night became usable!", say: "Edison's light bulb! Suddenly night time was usable time. Everything changed." },
      { front: "☎️ Telephone", back: "Bell, 1876 — talk across distance", say: "Alexander Graham Bell's telephone! Voices could travel across cities instantly." },
      { front: "✈️ Airplane", back: "Wright brothers, 1903 — 12 seconds!", say: "The Wright brothers flew in nineteen oh three. That first flight lasted twelve seconds!" },
      { front: "🚗 Model T", back: "Ford — cars for regular families", say: "Henry Ford's assembly line made cars cheap enough for ordinary families." },
    ] },
    { kind: "pick", text: "The Wright brothers' first flight lasted about…", tiles: ["12 seconds", "3 hours", "a whole day"], correct: 0, hint: "Twelve seconds and 120 feet! Sixty-six years later we landed on the moon." },
    { kind: "pick", text: "Ford made cars affordable using the…", tiles: ["assembly line", "steam engine", "internet"], correct: 0, hint: "The assembly line — each worker did one job as cars moved past. Fast and cheap!" },
  ],
  rights: [
    { kind: "say", text: "The fight for fairness. Here's a truth worth carrying: rights were never simply given. Ordinary, courageous people had to demand them — and it often took generations. That's how progress actually works." },
    { kind: "cards", text: "Tap each fighter for fairness!", cards: [
      { front: "🗳️ Women's vote", back: "won in 1920 — after 70+ years!", say: "Women won the vote in nineteen twenty, after more than seventy years of campaigning!" },
      { front: "Susan B. Anthony", back: "led the fight to vote", say: "Susan B. Anthony spent her life fighting for women's right to vote. She never got to vote herself." },
      { front: "🚌 Rosa Parks", back: "refused to give up her seat, 1955", say: "Rosa Parks refused to give up her bus seat in nineteen fifty-five, sparking a movement." },
      { front: "✊ MLK Jr.", back: "'I Have a Dream', 1963", say: "Martin Luther King Junior gave the I Have a Dream speech to a crowd of two hundred fifty thousand." },
    ] },
    { kind: "pick", text: "Women in America won the right to vote in…", tiles: ["1920", "1776", "1990"], correct: 0, hint: "1920 — the 19th Amendment. Your great-great-grandma may have been alive for it!" },
    { kind: "pick", text: "Rosa Parks became famous for…", tiles: ["refusing to give up her bus seat", "driving a bus", "inventing the bus"], correct: 0, hint: "One quiet act of courage that helped launch the Civil Rights Movement." },
  ],
  immigration: [
    { kind: "say", text: "Nearly everyone in America came from somewhere else, or descends from someone who did. Millions sailed past the Statue of Liberty into New York Harbor, seasick and hopeful. Quite a sight." },
    { kind: "cards", text: "Tap each part of the immigrant story!", cards: [
      { front: "🗽 Ellis Island", back: "12 million arrived here, 1892–1954", say: "Ellis Island! About twelve million immigrants were welcomed through its doors." },
      { front: "Why come?", back: "safety, jobs, freedom, family", say: "People came seeking safety, work, freedom, and a better life for their children." },
      { front: "🎁 Lady Liberty", back: "a gift from France, 1886", say: "The Statue of Liberty was a gift from France — the first thing arriving families saw!" },
      { front: "❄️ To Minnesota", back: "many Norwegians, Swedes, Germans", say: "Many Scandinavian and German families settled in Minnesota — the land reminded them of home." },
    ] },
    { kind: "pick", text: "The Statue of Liberty was a gift from…", tiles: ["France", "England", "Canada"], correct: 0, hint: "France! A gift of friendship, and the first sight for millions arriving by ship." },
    { kind: "pick", text: "What do immigrants bring with them?", tiles: ["their language, food, and traditions", "nothing", "only suitcases"], correct: 0, hint: "Culture travels with people — that's why America has pizza, tacos, and lefse!" },
  ],
  // L5
  wars: [
    { kind: "say", text: "The twentieth century brought two world wars — the largest conflicts in human history. Difficult history, but we study it precisely so it isn't repeated. That is the entire point of remembering." },
    { kind: "cards", text: "Tap each fact, thoughtfully.", cards: [
      { front: "Two world wars", back: "WWI 1914–18 · WWII 1939–45", say: "Two world wars in one century. The first from nineteen fourteen, the second ending in nineteen forty-five." },
      { front: "💪 Rosie the Riveter", back: "women ran the factories", say: "With men at war, women filled the factories. Rosie the Riveter became their symbol!" },
      { front: "📔 Anne Frank", back: "a girl's diary from hiding", say: "Anne Frank, a young girl, wrote a diary while hiding during the war. Millions have read her words." },
      { front: "🕊️ United Nations", back: "formed after WWII for peace", say: "After the war, nations formed the United Nations to work together for peace." },
    ] },
    { kind: "pick", text: "World War II ended in…", tiles: ["1945", "1918", "1960"], correct: 0, hint: "1945. Your great-grandparents' generation lived it." },
    { kind: "pick", text: "Why do we still study difficult history?", tiles: ["to learn from it and not repeat it", "to feel bad", "to fill textbooks"], correct: 0, hint: "Exactly right. Remembering is how we do better. That's why old tortoises tell stories." },
  ],
  space: [
    { kind: "say", text: "The space race! In nineteen sixty-nine, humans walked on the MOON. I remember watching on a fuzzy television. Six hundred million people watched at once. The whole world held its breath together." },
    { kind: "cards", text: "Tap each step to the moon!", cards: [
      { front: "🛰️ Sputnik, 1957", back: "first satellite (Soviet Union)", say: "Sputnik! The Soviet Union launched the first satellite in nineteen fifty-seven. The race began." },
      { front: "🚀 NASA", back: "America's space agency", say: "America created NASA to compete — and to explore." },
      { front: "🌕 July 20, 1969", back: "Neil Armstrong walks on the moon", say: "July twentieth, nineteen sixty-nine. Neil Armstrong stepped onto the moon!" },
      { front: "🧮 Katherine Johnson", back: "her math got them there & back", say: "Katherine Johnson calculated the flight paths by hand. Astronauts trusted her math above computers!" },
    ] },
    { kind: "pick", text: "Who was first to walk on the moon?", tiles: ["Neil Armstrong", "Buzz Aldrin", "John Glenn"], correct: 0, hint: "Armstrong first, Aldrin about 20 minutes later. Collins stayed in orbit!" },
    { kind: "pick", text: "Katherine Johnson was a mathematician who…", tiles: ["calculated flight paths for NASA", "flew the rocket", "built the moon buggy"], correct: 0, hint: "Her calculations sent astronauts up and brought them home safely." },
  ],
  tech: [
    { kind: "say", text: "The tech age — which happened so FAST it makes my shell spin. Your parents grew up without smartphones. Your grandparents grew up without color television. You've grown up with the world in your pocket." },
    { kind: "cards", text: "Tap each leap forward!", cards: [
      { front: "🖥️ Early computers", back: "as big as an entire ROOM", say: "The first computers filled entire rooms and were weaker than a modern calculator!" },
      { front: "🌐 The internet", back: "reached homes in the 1990s", say: "The internet reached ordinary homes in the nineteen nineties. It changed everything." },
      { front: "📼 Before streaming", back: "VHS tapes, then DVDs", say: "Before streaming, you rented movies on tape from a store — and had to rewind them!" },
      { front: "📱 Smartphones", back: "2007 — the world in a pocket", say: "The smartphone arrived in two thousand seven. Phone, camera, map, library — all in one." },
    ] },
    { kind: "pick", text: "The first computers were…", tiles: ["as big as a room", "pocket-sized", "made of wood"], correct: 0, hint: "Room-sized! Your tablet is millions of times more powerful." },
    { kind: "pick", text: "How did people look up facts before the internet?", tiles: ["encyclopedias and libraries", "search engines", "voice assistants"], correct: 0, hint: "Whole shelves of encyclopedias — and a trip to the library!" },
  ],
  minnesota: [
    { kind: "say", text: "Minnesota's story — YOUR state, young sprout! Land of ten thousand lakes, born from glaciers, home to Dakota and Ojibwe nations, then loggers, millers, and miners. And extremely cold winters." },
    { kind: "cards", text: "Tap each chapter of Minnesota's story!", cards: [
      { front: "🪶 First peoples", back: "Dakota & Ojibwe homelands", say: "The Dakota and Ojibwe nations have lived in this land for a very long time." },
      { front: "📅 Statehood, 1858", back: "the 32nd state", say: "Minnesota became the thirty-second state in eighteen fifty-eight." },
      { front: "🌾 Flour milling", back: "Minneapolis: Flour Capital of the World", say: "Minneapolis milled so much flour it was called the Flour Milling Capital of the World!" },
      { front: "⛏️ Iron Range", back: "iron ore built American steel", say: "Iron ore from northern Minnesota built America's cars, ships, and skyscrapers." },
    ] },
    { kind: "pick", text: "Minnesota's name comes from a Dakota word meaning…", tiles: ["sky-tinted water", "cold land", "many trees"], correct: 0, hint: "Sky-tinted water — describing the lakes and rivers. Rather beautiful!" },
    { kind: "pick", text: "Which mighty river BEGINS in Minnesota?", tiles: ["the Mississippi", "the Nile", "the Colorado"], correct: 0, hint: "At Lake Itasca you can walk across the Mississippi in a few steps!" },
  ],
  // L6
  sources: [
    { kind: "say", text: "Now you learn to think like a real historian. The key question is always: how do we KNOW? Evidence comes in two kinds, and telling them apart is the whole craft." },
    { kind: "cards", text: "Tap each type of evidence!", cards: [
      { front: "📜 Primary source", back: "made BY someone who was there", say: "A primary source! A diary, a letter, a photograph — made by someone who was actually there." },
      { front: "📘 Secondary source", back: "made LATER by someone studying it", say: "A secondary source! A textbook or documentary made later by people studying the event." },
      { front: "🏺 Artifacts", back: "real objects from the past", say: "Artifacts! Real objects — tools, coins, pottery — dug up and studied by archaeologists." },
      { front: "🔍 Check many sources", back: "one view is never the whole story", say: "Always check several sources. One person's view is never the whole story!" },
    ] },
    { kind: "pick", text: "Which is a PRIMARY source about the Civil War?", tiles: ["a soldier's letter home", "a 2020 documentary", "a school report"], correct: 0, hint: "The letter — written by someone who was actually there!" },
    { kind: "pick", text: "Why do historians check MANY sources?", tiles: ["to check facts and get the full story", "to fill pages", "because one is boring"], correct: 0, hint: "Every person sees an event differently. Many views get you closer to the truth." },
  ],
  causeeffect: [
    { kind: "say", text: "Cause and effect — history's chain reaction. Nothing simply happens; everything is pushed by something before it. Find the causes and history stops being a list of dates and becomes a story." },
    { kind: "pick", text: "CAUSE: taxes without representation. EFFECT?", tiles: ["colonists revolted", "colonists moved to France", "nothing"], correct: 0, hint: "Unfair taxes pushed the colonies toward revolution — a chain reaction!" },
    { kind: "pick", text: "CAUSE: the railroad connects east to west. EFFECT?", tiles: ["the West settled much faster", "the West emptied out", "travel got slower"], correct: 0, hint: "Fast cheap travel meant towns sprang up all along the tracks." },
    { kind: "pick", text: "Why does studying history matter?", tiles: ["to learn from mistakes and understand today", "to predict lottery numbers", "to change the past"], correct: 0, hint: "The past explains the present. That's the whole reason I keep talking, young sprout." },
  ],
  timelines: [
    { kind: "say", text: "Timelines and centuries! Here's the tricky bit that confuses everyone: the sixteen hundreds are the SEVENTEENTH century, because the first hundred years were century number one. Blame the Romans." },
    { kind: "cards", text: "Tap each unit of historical time!", cards: [
      { front: "Decade", back: "10 years", say: "A decade! Ten years." },
      { front: "Century", back: "100 years", say: "A century! One hundred years. I've seen five of them." },
      { front: "Millennium", back: "1,000 years", say: "A millennium! One thousand years." },
      { front: "BC / AD", back: "before & after year 1 — BC counts backwards", say: "B C dates count backwards before year one. A D dates count forward." },
    ] },
    { kind: "pick", text: "Which came FIRST?", tiles: ["the Pilgrims (1620)", "the Revolution (1776)", "the moon landing (1969)"], correct: 0, hint: "Smaller year equals earlier — 1620 comes first!" },
    { kind: "pick", text: "The 1900s are also called the…", tiles: ["20th century", "19th century", "21st century"], correct: 0, hint: "The 20th! Because the years 1–100 were the 1st century. Confusing but true." },
  ],
  ancient: [
    { kind: "say", text: "Ancient civilizations — thousands of years before America existed. Egyptians building pyramids, Greeks inventing the Olympics, Romans building roads still used today. Even I wasn't there. Barely." },
    { kind: "cards", text: "Tap each ancient civilization!", cards: [
      { front: "🔺 Egypt", back: "pyramids & hieroglyphics", say: "Ancient Egypt! Pyramids, pharaohs, and picture-writing called hieroglyphics." },
      { front: "🏅 Greece", back: "the Olympics, democracy, philosophy", say: "Ancient Greece gave us the Olympics, democracy, and a great deal of thinking." },
      { front: "🏛️ Rome", back: "roads, aqueducts, the Colosseum", say: "Ancient Rome! Roads and aqueducts so well built some are still standing." },
      { front: "🧱 China", back: "the Great Wall, paper, silk", say: "Ancient China built the Great Wall and invented paper, silk, and the compass!" },
    ] },
    { kind: "pick", text: "Egyptian picture-writing is called…", tiles: ["hieroglyphics", "cursive", "emoji"], correct: 0, hint: "Hieroglyphics! Though 'ancient emoji' isn't entirely wrong, cheeky sprout." },
    { kind: "pick", text: "Which ancient civilization started the Olympics?", tiles: ["Greece", "Egypt", "Rome"], correct: 0, hint: "Greece — nearly 3,000 years ago, and we still hold them!" },
  ],
};
