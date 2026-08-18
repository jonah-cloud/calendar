import type { IStep } from "./mathInteractive";

/** Newton the Raccoon's hands-on lab briefings for every science skill. */
export const SCIENCE_INTERACTIVE: Record<string, IStep[]> = {
  // L1
  senses: [
    { kind: "say", text: "Lab partner! Today's equipment: YOUR BODY. You have five senses — five tools for collecting data. I use all five on garbage cans. Professionally." },
    { kind: "cards", text: "Tap each sense to test it out!", cards: [
      { front: "👀 Sight", back: "eyes — look around the room!", say: "Sight! Your eyes collect light. Look around right now!" },
      { front: "👂 Hearing", back: "ears — what do you hear?", say: "Hearing! Close your eyes and listen. What sounds are hiding?" },
      { front: "👃 Smell", back: "nose — sniff the air!", say: "Smell! Take a big sniff. My favorite sense, obviously." },
      { front: "👅 Taste", back: "tongue — sweet, salty, sour!", say: "Taste! Your tongue knows sweet, salty, sour, and bitter." },
      { front: "✋ Touch", back: "skin — soft, rough, cold!", say: "Touch! Your skin feels soft, rough, hot, and cold." },
    ] },
    { kind: "pick", text: "Experiment! Which sense tells you a cookie is SWEET?", tiles: ["👅 taste", "👂 hearing", "👀 sight"], correct: 0, hint: "Your tongue is the sweetness detector! Sight only tells you it LOOKS good." },
    { kind: "pick", text: "You hear thunder but see nothing. Which sense found it?", tiles: ["👂 hearing", "👅 taste", "✋ touch"], correct: 0, hint: "Ears catch sounds even when your eyes see nothing — great backup system!" },
  ],
  animals: [
    { kind: "say", text: "Animal field study! Every animal has a body built for its life — feathers for flying, scales for swimming, fur for staying warm. Nature is the best engineer. Second best. I'm first." },
    { kind: "cards", text: "Tap each animal to learn its gear!", cards: [
      { front: "🐦 Birds", back: "feathers + wings = flying!", say: "Birds have feathers and wings. Feathers keep them warm AND help them fly!" },
      { front: "🐟 Fish", back: "scales + gills = underwater!", say: "Fish have scales and gills. Gills let them breathe underwater!" },
      { front: "🐻 Bears", back: "thick fur = warm in winter", say: "Bears have thick fur and they hibernate — a long winter nap!" },
      { front: "🐣 Chicks", back: "hatch from eggs!", say: "Chickens hatch from eggs. So do birds, fish, and turtles!" },
    ] },
    { kind: "pick", text: "Which animal hatches from an EGG?", tiles: ["🐣 chicken", "🐄 cow", "🐶 dog"], correct: 0, hint: "Birds lay eggs! Cows and dogs are born as live babies." },
    { kind: "pick", text: "Data check: what covers a FISH?", tiles: ["scales", "feathers", "fur"], correct: 0, hint: "Scales — smooth and slippery for zooming through water!" },
  ],
  weather: [
    { kind: "say", text: "Weather station, activate! Weather is just what the air is doing right now — and it changes constantly, like my attention span. Ooh, a shiny thing. Where was I? Weather!" },
    { kind: "cards", text: "Tap each weather type!", cards: [
      { front: "☀️ Sunny", back: "clear sky, warm sun", say: "Sunny! The sun is out, the sky is clear. Sunglasses weather!" },
      { front: "🌧️ Rainy", back: "clouds drop water", say: "Rainy! Clouds get heavy with water and drop it on us." },
      { front: "❄️ Snowy", back: "freezing! water turns to ice crystals", say: "Snowy! When it's cold enough, rain freezes into snowflakes." },
      { front: "🌪️ Windy", back: "moving air pushes things", say: "Windy! Air on the move. It can knock over my garbage cans. Rude." },
    ] },
    { kind: "pick", text: "Big gray clouds are rolling in. Predict the weather!", tiles: ["rain is coming", "it will be sunny", "snow in July"], correct: 0, hint: "Gray heavy clouds are full of water — rain incoming! That's a real prediction, scientist." },
    { kind: "pick", text: "Which tool measures how hot or cold it is?", tiles: ["🌡️ thermometer", "🔭 telescope", "📏 ruler"], correct: 0, hint: "A thermometer! The red line climbs when it's hot." },
  ],
  plants: [
    { kind: "say", text: "Plant lab! Plants are wild — they MAKE THEIR OWN FOOD out of sunlight. Imagine if I could do that. I'd still eat garbage, but out of choice." },
    { kind: "cards", text: "Tap each plant part to learn its job!", cards: [
      { front: "🌱 Roots", back: "drink water from the soil", say: "Roots! They grab water and hold the plant in the ground." },
      { front: "Stem", back: "holds the plant up, moves water", say: "The stem! It holds the plant up tall and carries water upward." },
      { front: "🍃 Leaves", back: "catch sunlight to make food!", say: "Leaves! They catch sunlight and turn it into food. Amazing." },
      { front: "🌸 Flower", back: "makes seeds for new plants", say: "Flowers! They make the seeds that grow into brand-new plants." },
    ] },
    { kind: "pick", text: "Which part DRINKS the water?", tiles: ["roots", "flower", "leaves"], correct: 0, hint: "Roots reach into the soil and slurp up water — nature's straws!" },
    { kind: "pick", text: "Experiment: a plant in a dark closet with water will…", tiles: ["get weak and pale", "grow twice as fast", "turn into a rock"], correct: 0, hint: "No sunlight means no food-making. Plants need light AND water AND soil!" },
  ],
  // L2
  living: [
    { kind: "say", text: "Classification lab! Big question: what makes something ALIVE? Three tests — does it grow, does it need food and water, and can it make more of itself?" },
    { kind: "pick", text: "Test it: does a TREE grow?", tiles: ["yes — it gets taller", "no, trees are frozen"], correct: 0, hint: "Trees grow taller and wider every year — one test passed already!" },
    { kind: "pick", text: "Which is LIVING?", tiles: ["🌳 a tree", "🪨 a rock", "🪑 a chair"], correct: 0, hint: "Trees grow, drink water, and make seeds. Rocks just… sit there. Rudely." },
    { kind: "pick", text: "Trick question, lab partner: is FIRE alive? It moves and grows!", tiles: ["No — it doesn't eat or make babies", "Yes — it moves!"], correct: 0, hint: "Fire moves and grows, but it can't make baby fires or eat food. Not alive — great try though!" },
  ],
  habitats: [
    { kind: "say", text: "Habitat expedition! A habitat is an animal's neighborhood — it has the food, water, and shelter that animal needs. Wrong habitat, wrong animal. You'd never find a polar bear in a desert!" },
    { kind: "cards", text: "Tap each habitat to explore it!", cards: [
      { front: "🏜️ Desert", back: "hot & dry — camels, lizards", say: "Desert! Very dry, very hot. Camels store water for long trips." },
      { front: "❄️ Arctic", back: "freezing — polar bears, seals", say: "Arctic! Freezing cold. Polar bears have thick fur and fat to stay warm." },
      { front: "🌊 Ocean", back: "salt water — sharks, whales", say: "Ocean! Salty water. Sharks and whales live their whole lives here." },
      { front: "🌴 Rainforest", back: "hot & rainy — monkeys, frogs", say: "Rainforest! Hot and rainy every day. Monkeys swing through the trees." },
    ] },
    { kind: "pick", text: "Where does a POLAR BEAR belong?", tiles: ["❄️ arctic", "🏜️ desert", "🌴 rainforest"], correct: 0, hint: "Thick white fur + blubber = built for freezing! It would overheat anywhere else." },
    { kind: "pick", text: "A camel stores fat in its hump to survive…", tiles: ["long trips without food", "cold winters", "swimming"], correct: 0, hint: "Deserts have little food and water — the hump is a snack backpack!" },
  ],
  seasons: [
    { kind: "say", text: "Seasons study — perfect for Minnesota, where we get ALL FOUR, dramatically. Earth is tilted, so different parts lean toward the sun at different times. That tilt makes seasons!" },
    { kind: "cards", text: "Tap each season!", cards: [
      { front: "🌷 Spring", back: "flowers bloom, animals wake", say: "Spring! Flowers bloom, baby animals are born, everything wakes up." },
      { front: "☀️ Summer", back: "hottest, longest days", say: "Summer! The hottest season with the longest days. Swimming weather!" },
      { front: "🍂 Fall", back: "leaves change and drop", say: "Fall! Leaves turn red and orange, then drop. Birds fly south." },
      { front: "❄️ Winter", back: "coldest, snow, bare trees", say: "Winter! Coldest and darkest. Some animals hibernate through it." },
    ] },
    { kind: "pick", text: "It's cold, leaves are falling, birds are flying south. Which season?", tiles: ["🍂 fall", "🌷 spring", "☀️ summer"], correct: 0, hint: "Falling leaves — that's literally why it's called FALL!" },
    { kind: "pick", text: "Why do some animals hibernate in winter?", tiles: ["food is hard to find", "they get bored", "it's too bright"], correct: 0, hint: "No bugs, no berries, no leaves — sleeping saves energy until spring!" },
  ],
  animals2: [
    { kind: "say", text: "Advanced animal lab! Time to sort creatures by their features — the same thing real scientists do. It's called classification, and I'm suspiciously good at it." },
    { kind: "pick", text: "Sort it: which animal is covered in FEATHERS?", tiles: ["🦆 duck", "🐟 fish", "🐴 horse"], correct: 0, hint: "Ducks are birds — feathers, wings, and eggs!" },
    { kind: "pick", text: "Which animal is a MAMMAL (fur + milk for babies)?", tiles: ["🐻 bear", "🐍 snake", "🐸 frog"], correct: 0, hint: "Fur plus feeding babies milk equals mammal. You're a mammal too!" },
    { kind: "pick", text: "What do we call an animal that eats ONLY plants?", tiles: ["herbivore", "carnivore", "raccoon"], correct: 0, hint: "Herbivore! Cows and rabbits are herbivores. I am an omnivore. Very proudly." },
  ],
  // L3
  cycles: [
    { kind: "say", text: "Life cycle lab! Some animals completely REBUILD themselves as they grow. A caterpillar turns into soup inside a chrysalis and rebuilds as a butterfly. Nature is metal." },
    { kind: "cards", text: "Tap through the butterfly's life cycle in order!", cards: [
      { front: "1. 🥚 Egg", back: "tiny egg on a leaf", say: "Stage one: a tiny egg on a leaf." },
      { front: "2. 🐛 Caterpillar", back: "eats and eats and eats!", say: "Stage two: a caterpillar. Its whole job is eating. Relatable." },
      { front: "3. 🛡️ Chrysalis", back: "hidden, rebuilding inside", say: "Stage three: the chrysalis. Inside, it completely rebuilds itself!" },
      { front: "4. 🦋 Butterfly", back: "wings! flies away", say: "Stage four: a butterfly with wings. Same creature — brand new body!" },
    ] },
    { kind: "pick", text: "What comes right after the caterpillar stage?", tiles: ["chrysalis", "egg", "butterfly"], correct: 0, hint: "Caterpillar → chrysalis → butterfly. The rebuild happens in the chrysalis!" },
    { kind: "pick", text: "A tadpole grows up to become a…", tiles: ["🐸 frog", "🐟 fish", "🦆 duck"], correct: 0, hint: "Tadpoles grow legs, lose their tails, and hop out as frogs!" },
  ],
  matter: [
    { kind: "say", text: "Matter lab — my favorite, because it involves melting things. Everything is a solid, a liquid, or a gas, and HEAT is the magic switch between them." },
    { kind: "cards", text: "Tap each state of matter!", cards: [
      { front: "🧊 Solid", back: "holds its shape — ice, blocks", say: "Solid! It holds its own shape. Ice, rocks, your shoes." },
      { front: "💧 Liquid", back: "takes the shape of its cup", say: "Liquid! It flows and takes the shape of whatever holds it." },
      { front: "☁️ Gas", back: "spreads out everywhere — steam, air", say: "Gas! It spreads out to fill all the space it can. Like steam!" },
    ] },
    { kind: "pick", text: "Experiment: leave ice in the warm sun. What happens?", tiles: ["it melts into liquid water", "it freezes harder", "it becomes a rock"], correct: 0, hint: "Heat turns solid into liquid — that's melting!" },
    { kind: "pick", text: "Keep heating that water until it boils. It becomes…", tiles: ["☁️ steam (a gas)", "🧊 ice", "a solid"], correct: 0, hint: "More heat turns liquid into gas — evaporation! Solid → liquid → gas, all with heat." },
  ],
  body: [
    { kind: "say", text: "Anatomy lab! Your body is a team of organs, each with one big job. Also you can hear your own heart if you're quiet. Try it. I'll wait. Isn't that WILD?" },
    { kind: "cards", text: "Tap each organ to learn its job!", cards: [
      { front: "❤️ Heart", back: "pumps blood everywhere", say: "The heart! It pumps blood to every part of your body, all day, forever." },
      { front: "🧠 Brain", back: "thinks, remembers, controls", say: "The brain! It thinks, remembers, and bosses the whole body around." },
      { front: "🫁 Lungs", back: "breathe air in and out", say: "The lungs! They fill with air so your body gets oxygen." },
      { front: "🦴 Bones", back: "the frame that holds you up", say: "Bones! Two hundred and six of them, holding you up like a frame." },
    ] },
    { kind: "pick", text: "Put your hand on your chest and feel the thump. Which organ is that?", tiles: ["❤️ heart", "🧠 brain", "🦴 bones"], correct: 0, hint: "That thump-thump is your heart pumping blood — about 100,000 times a day!" },
    { kind: "pick", text: "Run in place for 10 seconds. Why do you breathe harder?", tiles: ["muscles need more oxygen", "your lungs get bored", "to cool your hair"], correct: 0, hint: "Working muscles burn oxygen fast, so your lungs work harder to refill you!" },
  ],
  plants2: [
    { kind: "say", text: "Advanced botany! Time for the big word: PHOTOSYNTHESIS. Plants take sunlight, water, and air, and make food plus the oxygen we breathe. Plants are keeping us alive right now." },
    { kind: "pick", text: "Plants need three things to make food. Which is NOT one?", tiles: ["candy", "sunlight", "water"], correct: 0, hint: "Sunlight, water, and air! No candy required — a real shame." },
    { kind: "pick", text: "What do plants give OFF that we need to breathe?", tiles: ["oxygen", "smoke", "sugar"], correct: 0, hint: "Plants release oxygen. Thank a tree today, seriously!" },
    { kind: "pick", text: "A seed needs what to sprout?", tiles: ["water and warmth", "electricity", "loud music"], correct: 0, hint: "Water and warmth wake a sleeping seed up. Music optional. I play music anyway." },
  ],
  // L4
  chains: [
    { kind: "say", text: "Food chain investigation! Energy moves like a relay race: the SUN feeds plants, plants feed plant-eaters, plant-eaters feed meat-eaters. Follow the energy!" },
    { kind: "cards", text: "Tap along the food chain!", cards: [
      { front: "☀️ Sun", back: "the start of all energy", say: "The sun! All energy on Earth starts right here." },
      { front: "🌱 Grass", back: "producer — makes food from sun", say: "Grass is a producer. It makes its own food from sunlight!" },
      { front: "🐰 Rabbit", back: "herbivore — eats the grass", say: "The rabbit eats the grass. It's a herbivore, and it's prey." },
      { front: "🦊 Fox", back: "predator — eats the rabbit", say: "The fox eats the rabbit. It's the predator at the top of this chain." },
    ] },
    { kind: "pick", text: "In grass → rabbit → fox, who is the PREDATOR?", tiles: ["🦊 fox", "🐰 rabbit", "🌱 grass"], correct: 0, hint: "The fox does the hunting — predators hunt, prey get hunted." },
    { kind: "pick", text: "Uh oh — what if ALL the grass disappeared?", tiles: ["rabbits starve, then foxes do too", "nothing changes", "foxes eat rocks"], correct: 0, hint: "Break one link and the whole chain suffers. Everything is connected!" },
  ],
  forces: [
    { kind: "say", text: "Physics lab! Forces are pushes and pulls. Drop something right now — go on, something unbreakable — and gravity pulls it down every single time. Reliable little force." },
    { kind: "cards", text: "Tap each force!", cards: [
      { front: "🌍 Gravity", back: "pulls everything DOWN", say: "Gravity! It pulls everything toward the ground. Always." },
      { front: "🧲 Magnetism", back: "pulls iron and steel", say: "Magnetism! Magnets grab iron and steel — but not wood or plastic." },
      { front: "🔥 Friction", back: "slows things down, makes heat", say: "Friction! It slows things down. Rub your hands fast — feel the heat?" },
      { front: "💨 Push & Pull", back: "every force is one or the other", say: "Every force is a push or a pull. That's the whole list!" },
    ] },
    { kind: "pick", text: "Test it: a magnet is near a plastic spoon. What happens?", tiles: ["nothing — plastic isn't magnetic", "it sticks hard", "the spoon melts"], correct: 0, hint: "Magnets only grab iron and steel — plastic, wood, and paper are ignored!" },
    { kind: "pick", text: "A sled goes FASTEST on which surface?", tiles: ["smooth ice", "bumpy grass", "sticky mud"], correct: 0, hint: "Less friction means more speed — ice is the slipperiest!" },
  ],
  space: [
    { kind: "say", text: "Space lab! Here's the mind-bender: the ground under you is SPINNING right now, about 1,000 miles an hour. That spin is what makes day and night. Hold on to something." },
    { kind: "cards", text: "Tap each space fact!", cards: [
      { front: "🌍 Earth spins", back: "one spin = one day (24 hrs)", say: "Earth spins around once every twenty-four hours. That's a day!" },
      { front: "🌞 Earth orbits sun", back: "one lap = one year", say: "Earth travels all the way around the sun once a year!" },
      { front: "🌙 Moon orbits Earth", back: "one lap ≈ one month", say: "The moon circles Earth about once a month." },
      { front: "⭐ The sun", back: "is actually a STAR!", say: "The sun is a star! It just looks huge because it's the closest one." },
    ] },
    { kind: "pick", text: "Why does the sun 'rise' and 'set'?", tiles: ["Earth is spinning", "the sun runs around us", "clouds move it"], correct: 0, hint: "The sun stays put — WE spin! Sunrise is really Earth turning toward it." },
    { kind: "pick", text: "Which planet has spectacular rings?", tiles: ["🪐 Saturn", "Mars", "Earth"], correct: 0, hint: "Saturn's rings are made of billions of chunks of ice and rock!" },
  ],
  cycles2: [
    { kind: "say", text: "Life cycle master class! Every living thing has a cycle — and cycles repeat forever. That's why they're circles, not lines. Circle of life! (I'm not singing it. Don't ask.)" },
    { kind: "pick", text: "The changes a caterpillar goes through are called…", tiles: ["metamorphosis", "hibernation", "migration"], correct: 0, hint: "Metamorphosis — a complete body rebuild! Big word, bigger deal." },
    { kind: "pick", text: "A plant's cycle: seed → sprout → plant → ?", tiles: ["flowers and new seeds", "a rock", "backwards to seed"], correct: 0, hint: "Grown plants make flowers, flowers make seeds, and the cycle starts again!" },
    { kind: "pick", text: "Why is it called a life CYCLE and not a life line?", tiles: ["it repeats over and over", "it's shaped like a bike", "scientists like circles"], correct: 0, hint: "Because it goes around forever — each generation starts it again!" },
  ],
  // L5
  eco: [
    { kind: "say", text: "Ecosystem lab! An ecosystem is EVERYTHING in a place — living and nonliving — all connected. Poke one part and the whole web wiggles. I test this constantly, usually by accident." },
    { kind: "cards", text: "Tap each job in the ecosystem!", cards: [
      { front: "🌱 Producers", back: "plants — make their own food", say: "Producers! Plants make their own food from sunlight." },
      { front: "🐰 Consumers", back: "animals — eat other things", say: "Consumers! Animals that eat plants or other animals." },
      { front: "🍄 Decomposers", back: "mushrooms, worms — recycle dead stuff", say: "Decomposers! Mushrooms and worms break down dead things into soil." },
      { front: "🐝 Pollinators", back: "bees — help plants make seeds", say: "Pollinators! Bees carry pollen so plants can make new seeds." },
    ] },
    { kind: "pick", text: "Without DECOMPOSERS, what would happen?", tiles: ["dead stuff would pile up forever", "plants would grow faster", "nothing"], correct: 0, hint: "Decomposers are nature's cleanup crew — they turn dead things back into soil!" },
    { kind: "pick", text: "Why do farmers WANT bees near their crops?", tiles: ["bees pollinate — more fruit!", "bees scare pests", "bees are cute"], correct: 0, hint: "No pollination, no fruit. About a third of our food depends on pollinators!" },
  ],
  matter2: [
    { kind: "say", text: "Advanced matter lab! Water is a shapeshifter with THREE forms and it changes with heat. Bonus: it can shift back. Nothing is lost. Science calls this conservation. I call it magic." },
    { kind: "pick", text: "Name the change: liquid water → ice", tiles: ["freezing", "melting", "evaporating"], correct: 0, hint: "Take heat AWAY and liquid freezes into solid!" },
    { kind: "pick", text: "Name the change: a puddle disappears on a hot day", tiles: ["evaporation", "freezing", "melting"], correct: 0, hint: "The water became invisible gas in the air — evaporation!" },
    { kind: "pick", text: "Where does the evaporated water GO?", tiles: ["up to form clouds — then rain!", "it's destroyed", "underground"], correct: 0, hint: "That's the water cycle! Evaporate, form clouds, rain down, repeat forever." },
  ],
  space2: [
    { kind: "say", text: "Solar system tour! Eight planets circling one star. Handy memory trick: My Very Excellent Mother Just Served Us Nachos. Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. NACHOS!" },
    { kind: "cards", text: "Tap the planets in order from the sun!", cards: [
      { front: "1–2", back: "Mercury (closest, roasting) · Venus", say: "Mercury is closest to the sun. Then Venus, the hottest planet!" },
      { front: "3–4", back: "🌍 Earth (us!) · Mars (red)", say: "Earth is third — that's us. Then Mars, the red planet!" },
      { front: "5–6", back: "Jupiter (biggest) · 🪐 Saturn (rings)", say: "Jupiter is the biggest planet. Saturn has the famous rings!" },
      { front: "7–8", back: "Uranus (tilted!) · Neptune (windy)", say: "Uranus spins on its side. Neptune is the windiest planet!" },
    ] },
    { kind: "pick", text: "Which planet is BIGGEST?", tiles: ["Jupiter", "Earth", "Mercury"], correct: 0, hint: "Jupiter is so big all the other planets could fit inside it!" },
    { kind: "pick", text: "How many planets are in our solar system?", tiles: ["8", "9", "12"], correct: 0, hint: "Eight! Pluto got reclassified as a dwarf planet in 2006. Still cool though." },
  ],
  body2: [
    { kind: "say", text: "Body systems lab! Your organs don't work alone — they work in TEAMS called systems. Lungs plus heart plus blood equals one delivery service for oxygen." },
    { kind: "pick", text: "Which team delivers oxygen around your body?", tiles: ["heart + blood + lungs", "bones + hair", "teeth + nose"], correct: 0, hint: "Lungs grab oxygen, blood carries it, the heart pumps it. Perfect teamwork!" },
    { kind: "pick", text: "Which system lets you move and lift things?", tiles: ["muscles + bones", "lungs + nose", "stomach + tongue"], correct: 0, hint: "Muscles pull on bones like ropes on levers — that's how you move!" },
    { kind: "pick", text: "How does your brain talk to your toes?", tiles: ["through nerves — like body wires", "by shouting", "through your blood only"], correct: 0, hint: "Nerves carry lightning-fast messages. Wiggle a toe — that message just traveled your whole body!" },
  ],
  // L6
  method: [
    { kind: "say", text: "Welcome to real science, lab partner. The scientific method is just a fancy name for: wonder, guess, test, look, learn. I do this daily. Results vary. Explosions happen." },
    { kind: "cards", text: "Tap each step of the scientific method!", cards: [
      { front: "1. Question", back: "What do I wonder about?", say: "Step one: ask a question. What do you wonder about?" },
      { front: "2. Hypothesis", back: "my smart guess", say: "Step two: make a hypothesis — your best smart guess." },
      { front: "3. Experiment", back: "test it fairly!", say: "Step three: run an experiment. Test it fairly — change only one thing!" },
      { front: "4. Observe", back: "write down what happens", say: "Step four: observe and record. Write down exactly what happened." },
      { front: "5. Conclude", back: "was my guess right?", say: "Step five: conclude. Was your guess right? Either answer teaches you something!" },
    ] },
    { kind: "pick", text: "You test which paper airplane flies farthest. What must stay the SAME?", tiles: ["how hard you throw each one", "the plane designs", "nothing"], correct: 0, hint: "Change only ONE thing (the design) — keep everything else identical. That's a fair test!" },
    { kind: "pick", text: "Your hypothesis turned out WRONG. What does a real scientist do?", tiles: ["learn from it and test again", "hide the results", "quit science forever"], correct: 0, hint: "Wrong hypotheses are data too! Most discoveries came from surprising results." },
  ],
  energy: [
    { kind: "say", text: "Energy lab! Energy is the ability to make things happen — light, heat, sound, motion. It never disappears; it just changes costume. Very theatrical, energy." },
    { kind: "cards", text: "Tap each kind of energy!", cards: [
      { front: "☀️ Light", back: "from the sun and bulbs", say: "Light energy! From the sun, from lamps, from fire." },
      { front: "🔥 Heat", back: "makes things warm", say: "Heat energy! It moves from hot things to cold things." },
      { front: "🔊 Sound", back: "made by vibrations", say: "Sound energy! Made when something vibrates. Hum and feel your throat!" },
      { front: "⚡ Electricity", back: "powers our lights and devices", say: "Electrical energy! It flows through wires to power everything." },
    ] },
    { kind: "pick", text: "Hum and touch your throat. Why do you feel a buzz?", tiles: ["vibrations make sound", "your throat is warm", "electricity"], correct: 0, hint: "Sound IS vibration! Your vocal cords are shaking the air." },
    { kind: "pick", text: "A stretched rubber band is holding…", tiles: ["stored energy, ready to snap", "no energy at all", "light energy"], correct: 0, hint: "Stored energy! Let go and it converts to motion. Costume change complete." },
  ],
  eco2: [
    { kind: "say", text: "Ecosystem guardian training! Humans change ecosystems — sometimes badly, sometimes beautifully. The good news: we can fix things too. Even a raccoon knows not to trash the woods. (I only trash cans.)" },
    { kind: "pick", text: "Which helps protect habitats?", tiles: ["picking up trash & recycling", "littering by the lake", "cutting every tree"], correct: 0, hint: "Trash hurts animals — cleanup and recycling protect their homes!" },
    { kind: "pick", text: "An animal with very few left in the world is called…", tiles: ["endangered", "extinct", "invasive"], correct: 0, hint: "Endangered means at risk. Extinct means gone forever — that's why we act early!" },
    { kind: "pick", text: "Planting native flowers in your yard helps…", tiles: ["bees and butterflies", "nothing at all", "only your yard look nice"], correct: 0, hint: "Native plants feed local pollinators — a tiny yard can be a real habitat!" },
  ],
  chains2: [
    { kind: "say", text: "Food WEB mastery! Real nature isn't one chain — it's a giant tangled web where everything eats everything. Pull one strand and the whole web shivers. Final experiment: let's trace it." },
    { kind: "pick", text: "Why is a food WEB more accurate than a food chain?", tiles: ["most animals eat many things", "webs look cooler", "chains are too short"], correct: 0, hint: "A fox eats rabbits AND mice AND berries. Real diets are messy — like mine!" },
    { kind: "pick", text: "Remove ALL the foxes. What likely happens to rabbits?", tiles: ["too many rabbits, grass gets eaten up", "rabbits vanish", "nothing changes"], correct: 0, hint: "Predators keep prey numbers balanced. Remove them and the population explodes!" },
    { kind: "pick", text: "Energy in a food web always starts with…", tiles: ["☀️ the sun", "🦊 the top predator", "🍄 decomposers"], correct: 0, hint: "Always the sun! Plants capture it, and it travels up through every eater." },
  ],
};
