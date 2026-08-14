import type { LevelDef, StaticQ, UnitDef } from "../types";

function bUnit(id: string, title: string, emoji: string, bank: StaticQ[]): UnitDef {
  return { id, title, emoji, bank };
}

const SENSES: StaticQ[] = [
  { p: "Which body part do you use to SEE?", a: "eyes 👀", w: ["ears 👂", "nose 👃", "hands ✋"] },
  { p: "Which body part do you use to HEAR?", a: "ears 👂", w: ["eyes 👀", "tongue 👅", "feet 🦶"] },
  { p: "Which sense tells you a cookie is sweet?", a: "taste 👅", w: ["hearing 👂", "sight 👀", "smell for colors"] },
  { p: "How many senses do people have?", a: "5", w: ["2", "3", "10"] },
  { p: "Which sense do you use to feel a soft blanket?", a: "touch ✋", w: ["taste 👅", "hearing 👂", "sight 👀"] },
  { p: "Which animal is famous for its amazing sense of smell?", a: "dog 🐶", w: ["fish 🐟", "worm 🪱", "snail 🐌"] },
];

const ANIMALS_SCI: StaticQ[] = [
  { p: "Which animal is a baby cow?", a: "calf", w: ["cub", "kitten", "foal"] },
  { p: "A baby dog is called a…", a: "puppy", w: ["kitten", "chick", "cub"] },
  { p: "Which animal hatches from an egg?", a: "chicken 🐣", w: ["cow 🐄", "dog 🐶", "horse 🐴"] },
  { p: "Which animal lives in water its whole life?", a: "fish 🐟", w: ["frog 🐸", "duck 🦆", "turtle 🐢"] },
  { p: "What do cows eat?", a: "grass", w: ["fish", "bugs", "candy"] },
  { p: "Which animal sleeps all winter (hibernates)?", a: "bear 🐻", w: ["dog 🐶", "cow 🐄", "chicken 🐔"] },
  { p: "Birds are covered in…", a: "feathers", w: ["fur", "scales", "wool"] },
  { p: "Fish are covered in…", a: "scales", w: ["feathers", "fur", "leaves"] },
];

const WEATHER_SCI: StaticQ[] = [
  { p: "What falls from clouds when it rains?", a: "water drops 💧", w: ["leaves 🍃", "rocks 🪨", "sand"] },
  { p: "What do you see in the sky on a sunny day?", a: "the sun ☀️", w: ["stars only", "the moon only", "lightning"] },
  { p: "Snow falls when the air is very…", a: "cold ❄️", w: ["hot 🔥", "sticky", "loud"] },
  { p: "A rainbow appears when there is sun and…", a: "rain", w: ["snow", "wind", "fog only"] },
  { p: "What tool tells us how hot or cold it is?", a: "thermometer 🌡️", w: ["telescope 🔭", "ruler 📏", "clock 🕐"] },
  { p: "Big gray clouds usually mean…", a: "rain is coming", w: ["it will be sunny", "snow in summer", "nothing"] },
];

const PLANTS: StaticQ[] = [
  { p: "What do plants need to grow?", a: "sun, water, and soil", w: ["candy and juice", "only darkness", "wind only"] },
  { p: "Which part of the plant drinks water from the soil?", a: "roots", w: ["flower", "leaves", "petals"] },
  { p: "Which part of the plant makes food from sunlight?", a: "leaves 🍃", w: ["roots", "stem only", "dirt"] },
  { p: "A plant starts its life as a…", a: "seed 🌱", w: ["flower", "fruit", "leaf"] },
  { p: "Which part holds the plant up tall?", a: "stem", w: ["petal", "seed", "root hair"] },
  { p: "Apples grow on…", a: "trees 🌳", w: ["vines underground", "bushes underwater", "clouds"] },
];

const LIVING: StaticQ[] = [
  { p: "Which of these is LIVING?", a: "a tree 🌳", w: ["a rock 🪨", "a chair 🪑", "a spoon 🥄"] },
  { p: "Which of these is NOT living?", a: "a bicycle 🚲", w: ["a mushroom 🍄", "a bird 🐦", "moss"] },
  { p: "All living things need…", a: "food, water, and air", w: ["batteries", "wheels", "paint"] },
  { p: "Which of these GROWS?", a: "a puppy 🐶", w: ["a pencil ✏️", "a cup", "a coin 🪙"] },
  { p: "Living things can make…", a: "more of their own kind (babies/seeds)", w: ["electricity", "metal", "plastic"] },
  { p: "Is fire alive?", a: "No — it doesn't grow from food like living things", w: ["Yes, it eats wood", "Yes, it moves", "Yes, it's warm"] },
];

const HABITATS: StaticQ[] = [
  { p: "Where does a camel live?", a: "desert 🏜️", w: ["ocean 🌊", "arctic ❄️", "rainforest 🌴"] },
  { p: "Where does a polar bear live?", a: "arctic ❄️", w: ["desert 🏜️", "jungle 🌴", "pond"] },
  { p: "Where does a shark live?", a: "ocean 🌊", w: ["forest 🌲", "desert 🏜️", "meadow 🌼"] },
  { p: "Where would you find a monkey swinging on vines?", a: "rainforest 🌴", w: ["arctic ❄️", "desert 🏜️", "your backyard"] },
  { p: "A frog's home near water is called a…", a: "pond 🐸", w: ["cave", "volcano", "nest in a tree"] },
  { p: "An animal's home and neighborhood is called its…", a: "habitat", w: ["habit", "hotel", "herd"] },
];

const SEASONS: StaticQ[] = [
  { p: "In which season do leaves change color and fall?", a: "fall 🍂", w: ["summer ☀️", "spring 🌷", "winter ❄️"] },
  { p: "In which season do flowers start to bloom?", a: "spring 🌷", w: ["winter ❄️", "fall 🍂", "never"] },
  { p: "Which season is usually the hottest?", a: "summer ☀️", w: ["winter ❄️", "fall 🍂", "spring 🌷"] },
  { p: "How many seasons are there?", a: "4", w: ["2", "6", "12"] },
  { p: "In winter, many trees…", a: "have bare branches", w: ["grow apples", "bloom flowers", "turn purple"] },
  { p: "What do many birds do when winter comes?", a: "fly somewhere warm (migrate)", w: ["hibernate in caves", "swim south", "build snow nests"] },
];

const LIFE_CYCLES: StaticQ[] = [
  { p: "What does a caterpillar turn into?", a: "butterfly 🦋", w: ["bee 🐝", "bird 🐦", "beetle"] },
  { p: "Put in order: egg → caterpillar → chrysalis → ?", a: "butterfly", w: ["tadpole", "egg again first", "moth caterpillar"] },
  { p: "A tadpole grows up to be a…", a: "frog 🐸", w: ["fish 🐟", "lizard 🦎", "duck 🦆"] },
  { p: "What comes FIRST in a chicken's life cycle?", a: "egg 🥚", w: ["chick 🐤", "hen 🐔", "feather"] },
  { p: "A seed sprouts, grows into a plant, then makes…", a: "flowers and new seeds", w: ["rocks", "rain", "roots only"] },
  { p: "The changes a butterfly goes through are called…", a: "metamorphosis", w: ["hibernation", "migration", "camouflage"] },
];

const MATTER: StaticQ[] = [
  { p: "Ice is water in which state?", a: "solid", w: ["liquid", "gas", "plasma"] },
  { p: "Steam from a kettle is water as a…", a: "gas", w: ["solid", "liquid", "rock"] },
  { p: "Milk and juice are…", a: "liquids", w: ["solids", "gases", "powders"] },
  { p: "What happens to ice in the warm sun?", a: "it melts into liquid water", w: ["it freezes harder", "it turns to steam instantly", "nothing"] },
  { p: "What happens to a puddle on a hot day?", a: "it evaporates into the air", w: ["it freezes", "it grows bigger", "it turns to milk"] },
  { p: "Which is a SOLID?", a: "a wooden block 🧱", w: ["orange juice", "steam", "wind"] },
];

const BODY_SCI: StaticQ[] = [
  { p: "Which organ pumps blood around your body?", a: "heart ❤️", w: ["brain 🧠", "stomach", "lungs"] },
  { p: "Which organ do you think with?", a: "brain 🧠", w: ["heart ❤️", "bones", "ears"] },
  { p: "What do your lungs help you do?", a: "breathe", w: ["jump", "see", "digest food"] },
  { p: "What holds your body up like a frame?", a: "bones (skeleton) 🦴", w: ["skin", "hair", "muscles only"] },
  { p: "What should you do to keep your teeth healthy?", a: "brush twice a day 🪥", w: ["eat more candy", "never open your mouth", "chew rocks"] },
  { p: "About how many bones does a grown-up have?", a: "206", w: ["10", "1,000", "42"] },
];

const FOOD_CHAINS: StaticQ[] = [
  { p: "In a food chain, energy starts with the…", a: "sun ☀️", w: ["lion 🦁", "mushroom 🍄", "moon 🌙"] },
  { p: "Grass → rabbit → fox. The fox is the…", a: "predator", w: ["plant", "prey", "sunlight"] },
  { p: "Grass → rabbit → fox. The rabbit is the fox's…", a: "prey", w: ["predator", "pet", "plant"] },
  { p: "Animals that eat ONLY plants are called…", a: "herbivores", w: ["carnivores", "omnivores", "dinosaurs"] },
  { p: "Animals that eat ONLY meat are called…", a: "carnivores", w: ["herbivores", "omnivores", "vegetarians"] },
  { p: "People who eat plants AND meat are called…", a: "omnivores", w: ["herbivores", "carnivores", "unicorns"] },
];

const FORCES: StaticQ[] = [
  { p: "What pulls a dropped ball down to the ground?", a: "gravity", w: ["magnetism", "wind", "electricity"] },
  { p: "A magnet sticks to things made of…", a: "iron or steel", w: ["wood", "plastic", "paper"] },
  { p: "A push or a pull is called a…", a: "force", w: ["field", "sound", "shadow"] },
  { p: "Rubbing your hands together fast makes them warm because of…", a: "friction", w: ["gravity", "magnets", "moonlight"] },
  { p: "Which surface makes a sled go FASTEST?", a: "smooth slippery ice", w: ["bumpy grass", "sticky mud", "sand"] },
  { p: "Two magnets can push away from each other. That's called…", a: "repelling", w: ["attracting", "melting", "bouncing"] },
];

const SPACE: StaticQ[] = [
  { p: "What does Earth travel around once a year?", a: "the sun ☀️", w: ["the moon 🌙", "Mars", "a comet"] },
  { p: "What travels around the Earth about once a month?", a: "the moon 🌙", w: ["the sun ☀️", "Jupiter", "the stars"] },
  { p: "Why do we have day and night?", a: "Earth spins around", w: ["the sun turns off", "clouds block the sun", "the moon glows"] },
  { p: "Which planet do we live on?", a: "Earth 🌍", w: ["Mars", "Venus", "Neptune"] },
  { p: "The red planet is…", a: "Mars", w: ["Venus", "Saturn", "Mercury"] },
  { p: "Which planet has beautiful rings?", a: "Saturn 🪐", w: ["Earth", "Mars", "Mercury"] },
  { p: "How many planets are in our solar system?", a: "8", w: ["5", "12", "100"] },
  { p: "The sun is actually a…", a: "star ⭐", w: ["planet", "moon", "comet"] },
];

const ECOSYSTEMS: StaticQ[] = [
  { p: "All the living and nonliving things in a place make up an…", a: "ecosystem", w: ["equation", "elevator", "experiment"] },
  { p: "Worms and mushrooms that break down dead leaves are called…", a: "decomposers", w: ["producers", "predators", "pollinators"] },
  { p: "Plants are called PRODUCERS because they…", a: "make their own food from sunlight", w: ["eat other plants", "produce noise", "build nests"] },
  { p: "Bees carrying pollen between flowers are…", a: "pollinators 🐝", w: ["decomposers", "predators", "parasites"] },
  { p: "What happens if all the plants in a food chain die?", a: "the animals lose their food", w: ["nothing changes", "animals eat rocks", "more rain falls"] },
  { p: "Recycling and picking up trash helps protect…", a: "habitats and animals", w: ["nothing", "only people", "the moon"] },
];

const SCI_METHOD: StaticQ[] = [
  { p: "A scientist's smart guess before an experiment is a…", a: "hypothesis", w: ["hippopotamus", "answer key", "law"] },
  { p: "What should you do FIRST in an experiment?", a: "ask a question", w: ["tell everyone the answer", "clean up", "celebrate"] },
  { p: "To find out which paper airplane flies farthest, you should…", a: "test them the same way and measure", w: ["pick your favorite color", "guess once", "only throw one"] },
  { p: "Scientists write down what happens in an experiment. These notes are called…", a: "observations/data", w: ["stories", "wishes", "secrets"] },
  { p: "If your experiment doesn't work, a good scientist will…", a: "learn from it and try again", w: ["give up forever", "hide the results", "cry and quit"] },
  { p: "Which tool would you use to look at something TINY?", a: "microscope 🔬", w: ["telescope 🔭", "hammer 🔨", "compass 🧭"] },
];

const ENERGY: StaticQ[] = [
  { p: "Which gives us light AND heat?", a: "the sun ☀️", w: ["the moon", "a mirror", "a shadow"] },
  { p: "What makes a lamp turn on?", a: "electricity", w: ["gravity", "wind inside it", "magic"] },
  { p: "Sound is made when something…", a: "vibrates (wiggles fast)", w: ["freezes", "melts", "glows"] },
  { p: "Solar panels turn sunlight into…", a: "electricity", w: ["water", "wind", "plants"] },
  { p: "Which is a way to SAVE energy?", a: "turn off lights when you leave", w: ["leave the fridge open", "run water all day", "keep every light on"] },
  { p: "A stretched rubber band stores…", a: "energy (ready to snap back!)", w: ["water", "sound", "light"] },
];

export const SCIENCE_LEVELS: LevelDef[] = [
  {
    n: 1,
    name: "Curious Cubs",
    units: [
      bUnit("senses", "My Five Senses", "👀", SENSES),
      bUnit("animals", "Amazing Animals", "🐾", ANIMALS_SCI),
      bUnit("weather", "Watching Weather", "🌦️", WEATHER_SCI),
      bUnit("plants", "Growing Plants", "🌱", PLANTS),
    ],
  },
  {
    n: 2,
    name: "Nature Scouts",
    units: [
      bUnit("living", "Living or Not?", "🌳", LIVING),
      bUnit("habitats", "Animal Homes", "🏜️", HABITATS),
      bUnit("seasons", "The Four Seasons", "🍂", SEASONS),
      bUnit("animals2", "Animal Expert", "🦁", ANIMALS_SCI),
    ],
  },
  {
    n: 3,
    name: "Junior Biologists",
    units: [
      bUnit("cycles", "Life Cycles", "🦋", LIFE_CYCLES),
      bUnit("matter", "Solid, Liquid, Gas", "🧊", MATTER),
      bUnit("body", "My Amazing Body", "🫀", BODY_SCI),
      bUnit("plants2", "Plant Scientist", "🌻", PLANTS),
    ],
  },
  {
    n: 4,
    name: "Earth Explorers",
    units: [
      bUnit("chains", "Food Chains", "🦊", FOOD_CHAINS),
      bUnit("forces", "Forces & Magnets", "🧲", FORCES),
      bUnit("space", "Earth & Sky", "🌍", SPACE),
      bUnit("cycles2", "Life Cycle Pro", "🐸", LIFE_CYCLES),
    ],
  },
  {
    n: 5,
    name: "System Scientists",
    units: [
      bUnit("eco", "Ecosystems", "🐝", ECOSYSTEMS),
      bUnit("matter2", "Changing Matter", "💧", MATTER),
      bUnit("space2", "Solar System", "🪐", SPACE),
      bUnit("body2", "Body Systems", "🦴", BODY_SCI),
    ],
  },
  {
    n: 6,
    name: "Lab Legends",
    units: [
      bUnit("method", "Think Like a Scientist", "🔬", SCI_METHOD),
      bUnit("energy", "Energy Everywhere", "⚡", ENERGY),
      bUnit("eco2", "Ecosystem Guardian", "🌎", ECOSYSTEMS),
      bUnit("chains2", "Food Web Master", "🕸️", FOOD_CHAINS),
    ],
  },
];
