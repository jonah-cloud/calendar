import type { LevelDef, Question, StaticQ, UnitDef } from "../types";
import { pick, sample, shuffle } from "../rand";

function bUnit(id: string, title: string, emoji: string, bank: StaticQ[]): UnitDef {
  return { id, title, emoji, bank };
}

// ---------- Level 1: letters & sounds ----------

const LETTER_SOUNDS: [string, string[]][] = [
  // [target word, words with same starting sound] — distractors from other rows
  ["ball 🏀", ["bear", "banana", "boat"]],
  ["cat 🐱", ["car", "cake", "corn"]],
  ["dog 🐶", ["door", "duck", "dance"]],
  ["sun ☀️", ["sock", "soup", "sand"]],
  ["fish 🐟", ["fan", "fox", "foot"]],
  ["moon 🌙", ["mouse", "milk", "map"]],
  ["pig 🐷", ["pan", "pizza", "pear"]],
  ["tree 🌳", ["turtle", "table", "toe"]],
];

function startSoundQ(): Question {
  const [word, matches] = pick(LETTER_SOUNDS);
  const correct = pick(matches);
  const others = LETTER_SOUNDS.filter(([w]) => w !== word);
  const wrong = sample(others, 3).map(([, m]) => pick(m));
  const choices = shuffle([correct, ...wrong]);
  return {
    prompt: `Which word starts with the same sound as "${word}"?`,
    choices,
    answer: choices.indexOf(correct),
  };
}

const RHYME_FAMILIES: string[][] = [
  ["cat", "hat", "bat", "mat"],
  ["dog", "log", "frog", "fog"],
  ["sun", "run", "fun", "bun"],
  ["cake", "lake", "snake", "rake"],
  ["ball", "tall", "wall", "fall"],
  ["night", "light", "kite", "bright"],
  ["bee", "tree", "sea", "key"],
  ["car", "star", "far", "jar"],
];

function rhymeQ(): Question {
  const fam = pick(RHYME_FAMILIES);
  const word = fam[0];
  const correct = pick(fam.slice(1));
  const wrong = sample(
    RHYME_FAMILIES.filter((f) => f !== fam).map((f) => pick(f)),
    3
  );
  const choices = shuffle([correct, ...wrong]);
  return {
    prompt: `Which word RHYMES with "${word}"?`,
    choices,
    answer: choices.indexOf(correct),
  };
}

function caseQ(): Question {
  const letters = "abdefghqrtn".split("");
  const l = pick(letters);
  const correct = l.toUpperCase();
  const wrong = sample(letters.filter((x) => x !== l).map((x) => x.toUpperCase()), 3);
  const choices = shuffle([correct, ...wrong]);
  return {
    prompt: `Which is the UPPERCASE of the letter below?`,
    visual: l,
    choices,
    answer: choices.indexOf(correct),
  };
}

const CVC: StaticQ[] = [
  { p: "Which word names this? 🐱", a: "cat", w: ["cot", "cut", "cap"] },
  { p: "Which word names this? ☀️", a: "sun", w: ["son", "sin", "san"] },
  { p: "Which word names this? 🐷", a: "pig", w: ["peg", "pug", "pag"] },
  { p: "Which word names this? 🛏️", a: "bed", w: ["bad", "bud", "bid"] },
  { p: "Which word names this? 🐕", a: "dog", w: ["dig", "dug", "dag"] },
  { p: "Which word names this? 🎩", a: "hat", w: ["hot", "hit", "hut"] },
  { p: "Which word names this? 🥤", a: "cup", w: ["cap", "cop", "kip"] },
  { p: "Which word names this? 🚌", a: "bus", w: ["bas", "bos", "biss"] },
];

// ---------- Level 2: sight words & word building ----------

const SIGHT_SENTENCES: StaticQ[] = [
  { p: `Fill in: "I ___ a big dog." `, a: "see", w: ["sea", "saẃ", "sew"] },
  { p: `Fill in: "We went ___ the park."`, a: "to", w: ["two", "too", "tow"] },
  { p: `Fill in: "___ you like pizza?"`, a: "Do", w: ["Does it", "Done", "Dew"] },
  { p: `Fill in: "She has ___ apples."`, a: "two", w: ["to", "too", "tow"] },
  { p: `Fill in: "The cat is ___ the table."`, a: "under", w: ["blue", "eat", "run"] },
  { p: `Fill in: "___ are my friend."`, a: "You", w: ["Yew", "Ewe", "Yo"] },
  { p: `Fill in: "I want to go ___."`, a: "there", w: ["their", "they're", "the"] },
  { p: `Fill in: "This book is ___."`, a: "mine", w: ["mind", "mane", "mean"] },
];

const PLURALS: StaticQ[] = [
  { p: "One cat, two ___", a: "cats", w: ["cates", "caties", "cat"] },
  { p: "One box, two ___", a: "boxes", w: ["boxs", "boxies", "box"] },
  { p: "One bunny, two ___", a: "bunnies", w: ["bunnys", "bunnyes", "bunny"] },
  { p: "One child, two ___", a: "children", w: ["childs", "childes", "childrens"] },
  { p: "One foot, two ___", a: "feet", w: ["foots", "feets", "footes"] },
  { p: "One mouse, two ___", a: "mice", w: ["mouses", "mousies", "mices"] },
  { p: "One wish, two ___", a: "wishes", w: ["wishs", "wishies", "wish"] },
  { p: "One leaf, two ___", a: "leaves", w: ["leafs", "leafes", "leavies"] },
];

const WORD_BUILD: StaticQ[] = [
  { p: `Which two words make "rainbow"?`, a: "rain + bow", w: ["rai + nbow", "ra + inbow", "rain + bows"] },
  { p: `Which two words make "cupcake"?`, a: "cup + cake", w: ["cupc + ake", "cu + pcake", "cup + cakes"] },
  { p: `"Sunflower" is made of…`, a: "sun + flower", w: ["sunf + lower", "su + nflower", "sun + flow"] },
  { p: `Which is a compound word (two words stuck together)?`, a: "butterfly", w: ["happy", "jumping", "purple"] },
  { p: `How many syllables (claps) in "elephant"?`, a: "3", w: ["1", "2", "4"] },
  { p: `How many syllables (claps) in "dog"?`, a: "1", w: ["2", "3", "4"] },
  { p: `How many syllables (claps) in "watermelon"?`, a: "4", w: ["2", "3", "5"] },
];

// ---------- Level 3: vocabulary & sentences ----------

const SYNONYMS: StaticQ[] = [
  { p: `Which word means the same as "big"?`, a: "huge", w: ["tiny", "fast", "loud"] },
  { p: `Which word means the same as "happy"?`, a: "glad", w: ["angry", "sleepy", "hungry"] },
  { p: `Which word means the same as "fast"?`, a: "quick", w: ["slow", "tall", "quiet"] },
  { p: `Which word means the same as "smart"?`, a: "clever", w: ["silly", "sleepy", "loud"] },
  { p: `Which word means the same as "cold"?`, a: "chilly", w: ["warm", "wet", "bright"] },
  { p: `Which word means the same as "yell"?`, a: "shout", w: ["whisper", "giggle", "sleep"] },
  { p: `Which word means the same as "pretty"?`, a: "beautiful", w: ["messy", "grumpy", "heavy"] },
  { p: `Which word means the same as "small"?`, a: "tiny", w: ["giant", "wide", "round"] },
];

const PUNCTUATION: StaticQ[] = [
  { p: `Which mark ends a question?`, a: "?", w: [".", "!", ","] },
  { p: `Which mark ends an excited sentence like "We won"?`, a: "!", w: ["?", ",", ";"] },
  { p: `Which sentence is written correctly?`, a: "My name is Ruby.", w: ["my name is ruby", "My Name Is Ruby", "my Name is ruby."] },
  { p: `Where does the comma go? "I like apples bananas and grapes."`, a: "I like apples, bananas, and grapes.", w: ["I, like apples bananas and grapes.", "I like, apples bananas, and grapes.", "I like apples bananas, and, grapes."] },
  { p: `Which word needs a capital letter? "on monday we swim."`, a: "monday", w: ["we", "swim", "on (only)"] },
  { p: `A telling sentence ends with a…`, a: "period .", w: ["question mark ?", "comma ,", "smiley :)"] },
  { p: `"dont" is missing an apostrophe. Which is right?`, a: "don't", w: ["do'nt", "dont'", "d'ont"] },
];

const SENTENCE_FIX: StaticQ[] = [
  { p: `Which sentence makes sense?`, a: "The dog ran to the park.", w: ["Park the ran dog to.", "Ran park dog the to the.", "To the the dog park ran."] },
  { p: `Which sentence makes sense?`, a: "We baked cookies for Grandma.", w: ["Cookies we Grandma for baked.", "Baked Grandma cookies we for.", "For we cookies baked Grandma."] },
  { p: `Pick the COMPLETE sentence:`, a: "The bird sings in the morning.", w: ["The bird.", "Sings in the.", "In the morning the."] },
  { p: `Pick the COMPLETE sentence:`, a: "My sister loves to dance.", w: ["Loves to dance.", "My sister.", "To dance my."] },
  { p: `Which word is the ACTION in "The frog jumps high"?`, a: "jumps", w: ["frog", "high", "the"] },
  { p: `Which word is the ACTION in "Mom reads a book"?`, a: "reads", w: ["Mom", "book", "a"] },
  { p: `Which word is a NAMING word (noun) in "The cake was sweet"?`, a: "cake", w: ["was", "sweet", "the"] },
];

// ---------- Level 4: prefixes, antonyms, short passages ----------

const ANTONYMS: StaticQ[] = [
  { p: `Which word is the OPPOSITE of "hot"?`, a: "cold", w: ["warm", "wet", "spicy"] },
  { p: `Which word is the OPPOSITE of "open"?`, a: "closed", w: ["wide", "empty", "big"] },
  { p: `Which word is the OPPOSITE of "brave"?`, a: "scared", w: ["strong", "kind", "loud"] },
  { p: `Which word is the OPPOSITE of "always"?`, a: "never", w: ["sometimes", "forever", "often"] },
  { p: `Which word is the OPPOSITE of "whisper"?`, a: "shout", w: ["talk", "hum", "sing"] },
  { p: `Which word is the OPPOSITE of "empty"?`, a: "full", w: ["hollow", "open", "light"] },
  { p: `Which word is the OPPOSITE of "begin"?`, a: "finish", w: ["start", "continue", "try"] },
];

const AFFIXES: StaticQ[] = [
  { p: `"Un-" in "unhappy" means…`, a: "not (not happy)", w: ["very", "again", "before"] },
  { p: `"Re-" in "reread" means…`, a: "again (read again)", w: ["not", "never", "under"] },
  { p: `"-ful" in "joyful" means…`, a: "full of (full of joy)", w: ["without", "small", "again"] },
  { p: `"-less" in "fearless" means…`, a: "without (without fear)", w: ["full of", "more", "very"] },
  { p: `What does "preheat" mean?`, a: "heat before", w: ["heat again", "not heat", "heat a lot"] },
  { p: `What does "disagree" mean?`, a: "to NOT agree", w: ["to agree a lot", "to agree again", "to agree first"] },
  { p: `Add an ending: "teach" + ___ = a person who teaches`, a: "-er (teacher)", w: ["-ful (teachful)", "-less (teachless)", "-est (teachest)"] },
];

const PASSAGES_1: StaticQ[] = [
  { p: `"Mia planted a seed. She watered it every day. Soon a green sprout appeared." What appeared?`, a: "a green sprout", w: ["a bird", "a puddle", "a worm"] },
  { p: `"Sam lost his red mitten. He looked under the bed and found it in his boot." Where was the mitten?`, a: "in his boot", w: ["under the bed", "in the car", "at school"] },
  { p: `"The wind blew hard. Leaves danced across the yard. Ava zipped up her coat." What season is it probably?`, a: "fall", w: ["summer", "her birthday", "bedtime"] },
  { p: `"Leo fed his fish twice a day. He cleaned the tank on Saturdays." What does Leo have?`, a: "a pet fish", w: ["a pet cat", "a garden", "a bike"] },
  { p: `"First we mixed the batter. Then we poured it in the pan. Last we ate warm pancakes." What did they make?`, a: "pancakes", w: ["cookies", "soup", "toast"] },
  { p: `"Nora practiced piano every night. At the recital, she didn't miss a note!" Why did Nora do well?`, a: "she practiced every night", w: ["she was lucky", "the song was easy", "she skipped the recital"] },
];

// ---------- Level 5: main idea & inference ----------

const MAIN_IDEA: StaticQ[] = [
  { p: `"Bees visit flowers. They carry pollen from plant to plant. This helps new seeds grow." The main idea is…`, a: "bees help plants grow", w: ["bees are yellow", "flowers smell nice", "seeds are small"] },
  { p: `"Octopuses can change color. They can squeeze into tiny cracks. They can even use tools!" The main idea is…`, a: "octopuses are amazing animals", w: ["the ocean is big", "tools are useful", "cracks are small"] },
  { p: `"Wash your hands before eating. Cover your cough. Get plenty of sleep." This is mostly about…`, a: "staying healthy", w: ["cooking dinner", "doing chores", "playing outside"] },
  { p: `"Libraries lend books for free. They have story time for kids. Many also lend movies and games." The main idea is…`, a: "libraries offer lots for everyone", w: ["books cost money", "movies are fun", "kids like stories"] },
  { p: `"Pack a water bottle. Wear sturdy shoes. Stay on the trail." These are tips for…`, a: "a hike", w: ["a birthday party", "a bath", "a piano lesson"] },
  { p: `A good title for a story about a dog who saves a kitten from a tree:`, a: "Rex to the Rescue", w: ["All About Trees", "How to Bake Bread", "The History of Hats"] },
];

const INFERENCE: StaticQ[] = [
  { p: `"Maya grabbed her umbrella and boots before leaving." What is the weather probably like?`, a: "rainy", w: ["sunny", "snowy", "windy"] },
  { p: `"Dad yawned and turned off the lamp." What will Dad probably do next?`, a: "go to sleep", w: ["make lunch", "go running", "wash the car"] },
  { p: `"Everyone cheered as Jo crossed the line first." What happened?`, a: "Jo won a race", w: ["Jo lost a shoe", "Jo drew a line", "Jo fell asleep"] },
  { p: `"The waiting room was full of barking and meowing." Where is this?`, a: "a vet's office", w: ["a library", "a bakery", "a school"] },
  { p: `"Lily's teeth chattered and she hugged her arms." How does Lily feel?`, a: "cold", w: ["hot", "hungry", "proud"] },
  { p: `"The cookie jar was empty and crumbs led to Max's room." What probably happened?`, a: "Max ate the cookies", w: ["the jar broke", "Mom baked more", "the dog ran away"] },
];

const HOMOPHONES: StaticQ[] = [
  { p: `Fill in: "The bear has brown ___." (fur/for)`, a: "fur", w: ["for", "fore", "four"] },
  { p: `Fill in: "We ___ going to win!" (are/our)`, a: "are", w: ["our", "hour", "or"] },
  { p: `Fill in: "I can ___ the ocean." (see/sea)`, a: "see", w: ["sea", "saw", "sew"] },
  { p: `Fill in: "___ house is on the corner." (Their/There)`, a: "Their", w: ["There", "They're", "Theirs'"] },
  { p: `Fill in: "The knight ___ a dragon." (knew/new)`, a: "knew", w: ["new", "gnu", "know"] },
  { p: `Fill in: "May I have a ___ of cake?" (piece/peace)`, a: "piece", w: ["peace", "peas", "pace"] },
  { p: `Fill in: "The ___ blew my hat off." (wind)`, a: "wind", w: ["whined", "wined", "wend"] },
];

// ---------- Level 6: figurative language & grammar ----------

const FIGURATIVE: StaticQ[] = [
  { p: `"The classroom was a zoo." This means…`, a: "it was wild and noisy", w: ["there were real lions", "it smelled like animals", "it was closed"] },
  { p: `"Her smile was as bright as the sun" is a…`, a: "simile", w: ["metaphor", "fact", "question"] },
  { p: `"The wind whispered through the trees." The wind can't really whisper — this is…`, a: "personification", w: ["a lie", "a rhyme", "alliteration"] },
  { p: `"I'm so hungry I could eat a horse!" is…`, a: "an exaggeration (hyperbole)", w: ["a true fact", "a simile", "a recipe"] },
  { p: `"Peter Piper picked a peck of peppers" repeats the P sound. That's called…`, a: "alliteration", w: ["personification", "a metaphor", "an antonym"] },
  { p: `"Time is money" is a…`, a: "metaphor", w: ["simile", "fact", "rhyme"] },
  { p: `"Boom! Crash! Splash!" — words that sound like sounds are…`, a: "onomatopoeia", w: ["synonyms", "pronouns", "prefixes"] },
];

const GRAMMAR2: StaticQ[] = [
  { p: `Which word is an ADJECTIVE in "The fluffy cat slept"?`, a: "fluffy", w: ["cat", "slept", "the"] },
  { p: `Which word is an ADVERB in "She ran quickly"?`, a: "quickly", w: ["she", "ran", "a"] },
  { p: `Choose the right verb: "Yesterday we ___ to the zoo."`, a: "went", w: ["go", "goes", "going"] },
  { p: `Choose the right verb: "She ___ three books last week."`, a: "read", w: ["reads", "reading", "will read"] },
  { p: `Which pronoun replaces "Maria" in "Maria loves art"?`, a: "She", w: ["Him", "It", "They (for one girl)"] },
  { p: `Which sentence is in the PAST tense?`, a: "We baked bread.", w: ["We bake bread.", "We will bake bread.", "We are baking bread."] },
  { p: `Choose the correct word: "There are ___ cookies than yesterday."`, a: "fewer", w: ["less", "littler", "fewest"] },
];

export const READING_LEVELS: LevelDef[] = [
  {
    n: 1,
    name: "Letter Detectives",
    units: [
      { id: "sounds", title: "Starting Sounds", emoji: "🔤", gen: () => startSoundQ() },
      { id: "rhymes", title: "Rhyme Time", emoji: "🎶", gen: () => rhymeQ() },
      { id: "case", title: "Big & Small Letters", emoji: "🅰️", gen: () => caseQ() },
      bUnit("cvc", "Sound-It-Out Words", "🐱", CVC),
    ],
  },
  {
    n: 2,
    name: "Word Wizards",
    units: [
      bUnit("sight", "Sight Words", "👀", SIGHT_SENTENCES),
      bUnit("plurals", "One & Many", "🐑", PLURALS),
      bUnit("build", "Word Building", "🧱", WORD_BUILD),
      { id: "rhymes2", title: "Rhyme Master", emoji: "🎤", gen: () => rhymeQ() },
    ],
  },
  {
    n: 3,
    name: "Sentence Squad",
    units: [
      bUnit("syn", "Words That Match", "🤝", SYNONYMS),
      bUnit("punct", "Punctuation Power", "❗", PUNCTUATION),
      bUnit("sentfix", "Super Sentences", "🛠️", SENTENCE_FIX),
      bUnit("sight2", "Trickier Sight Words", "🔎", SIGHT_SENTENCES),
    ],
  },
  {
    n: 4,
    name: "Story Explorers",
    units: [
      bUnit("ant", "Opposites", "↔️", ANTONYMS),
      bUnit("affix", "Prefixes & Suffixes", "🧩", AFFIXES),
      bUnit("passage1", "Story Questions", "📖", PASSAGES_1),
      bUnit("syn2", "Vocabulary Boost", "🚀", SYNONYMS),
    ],
  },
  {
    n: 5,
    name: "Meaning Masters",
    units: [
      bUnit("mainidea", "Main Idea", "💡", MAIN_IDEA),
      bUnit("infer", "Reading Detective", "🕵️", INFERENCE),
      bUnit("homo", "Tricky Twin Words", "👯", HOMOPHONES),
      bUnit("passage2", "Deeper Stories", "📚", PASSAGES_1),
    ],
  },
  {
    n: 6,
    name: "Author's Apprentice",
    units: [
      bUnit("fig", "Figurative Language", "🌈", FIGURATIVE),
      bUnit("grammar2", "Grammar Pro", "✏️", GRAMMAR2),
      bUnit("infer2", "Master Detective", "🔍", INFERENCE),
      bUnit("mainidea2", "Main Idea Master", "🏆", MAIN_IDEA),
    ],
  },
];
