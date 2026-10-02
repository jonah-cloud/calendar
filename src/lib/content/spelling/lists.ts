/**
 * Weekly spelling lists.
 *
 * A list is PASSED only after it has been spelled perfectly TWICE — one lucky
 * run isn't mastery. The lists are grouped into levels so the wall chart shows
 * a term's worth of weeks at a time, and the patterns build on each other in
 * the same order as the reading programme.
 */

export interface SpellingList {
  /** week number, 1-based across the whole programme */
  n: number;
  title: string;
  /** the spelling pattern this week drills */
  pattern: string;
  words: string[];
  level: number;
  levelTitle: string;
  levelEmoji: string;
}

export interface SpellingLevel {
  title: string;
  emoji: string;
  color: string;
  soft: string;
  /** [title, pattern, ten words] */
  rows: [string, string, string[]][];
}

export const SPELLING_LEVELS: SpellingLevel[] = [
  {
    title: "Level 1 · Sounds",
    emoji: "🌱",
    color: "#f97316",
    soft: "#fff7ed",
    rows: [
      ["Short a", "the short a sound", ["at", "cat", "hat", "map", "bag", "can", "dad", "had", "ran", "sat"]],
      ["Short i", "the short i sound", ["in", "it", "big", "did", "him", "pig", "sit", "win", "fix", "his"]],
      ["Short o", "the short o sound", ["on", "hot", "dog", "got", "box", "top", "not", "job", "mom", "pop"]],
      ["Short u", "the short u sound", ["up", "bus", "cup", "fun", "run", "but", "cut", "mud", "sun", "bug"]],
      ["Short e", "the short e sound", ["bed", "red", "ten", "get", "let", "men", "pen", "yes", "leg", "net"]],
      ["Short Vowel Review", "all five short vowels", ["cat", "pig", "dog", "bus", "bed", "the", "and", "was", "you", "said"]],
      ["The ck Ending", "ck after a short vowel", ["back", "duck", "kick", "lock", "sock", "pick", "rock", "sick", "pack", "luck"]],
      ["The sh Sound", "sh at the start and end", ["ship", "shop", "shut", "fish", "dish", "wish", "rush", "cash", "shed", "shell"]],
      ["The ch Sound", "ch at the start and end", ["chip", "chop", "chin", "much", "such", "rich", "chat", "chest", "lunch", "bench"]],
      ["The th Sound", "both th sounds", ["this", "that", "then", "them", "with", "bath", "path", "thin", "think", "thank"]],
      ["wh and ng", "wh at the start, ng at the end", ["when", "what", "which", "while", "white", "song", "long", "ring", "king", "thing"]],
      ["Double Enders", "ll, ss, ff and zz", ["bell", "tell", "well", "will", "miss", "kiss", "less", "off", "puff", "buzz"]],
    ],
  },
  {
    title: "Level 2 · Blends & Magic E",
    emoji: "✨",
    color: "#8b5cf6",
    soft: "#f5f3ff",
    rows: [
      ["s-Blends", "blends that start with s", ["stop", "step", "spin", "spot", "skip", "skin", "snap", "slip", "swim", "stand"]],
      ["l-Blends", "blends that end with l", ["black", "block", "clap", "class", "flag", "flat", "glad", "glass", "plan", "plus"]],
      ["r-Blends", "blends that end with r", ["brag", "bring", "crab", "cross", "drop", "dress", "frog", "from", "grass", "trip"]],
      ["Ending Blends", "nd, nt, mp and st", ["and", "hand", "land", "sand", "went", "tent", "jump", "lamp", "best", "must"]],
      ["More Ending Blends", "lk, lt, sk and ft", ["milk", "silk", "belt", "melt", "desk", "mask", "left", "gift", "soft", "lift"]],
      ["Three-Letter Blends", "scr, spl, spr, str and thr", ["split", "splash", "spring", "strong", "string", "scrap", "scratch", "three", "throw", "shred"]],
      ["Magic E: a", "a with silent e", ["cake", "make", "take", "name", "game", "late", "gate", "same", "came", "made"]],
      ["Magic E: i", "i with silent e", ["bike", "like", "time", "nine", "ride", "side", "line", "mile", "fine", "white"]],
      ["Magic E: o", "o with silent e", ["home", "hope", "note", "rose", "nose", "bone", "stone", "those", "broke", "close"]],
      ["Magic E: u", "u with silent e", ["cute", "huge", "June", "rule", "tube", "cube", "use", "mule", "tune", "flute"]],
      ["Magic E Mix", "silent e review", ["place", "brave", "shine", "drive", "smoke", "whole", "these", "stove", "grade", "slide"]],
      ["Level 2 Review", "blends and magic e", ["stop", "black", "frog", "hand", "milk", "cake", "bike", "home", "cute", "shine"]],
    ],
  },
  {
    title: "Level 3 · Vowel Teams",
    emoji: "👯",
    color: "#10b981",
    soft: "#ecfdf5",
    rows: [
      ["ai and ay", "two ways to say long a", ["rain", "train", "pain", "wait", "paint", "play", "day", "way", "say", "stay"]],
      ["The ee Team", "ee says long e", ["tree", "free", "green", "sleep", "three", "feet", "week", "need", "keep", "seen"]],
      ["The ea Team", "ea says long e", ["eat", "each", "read", "team", "clean", "dream", "beach", "teach", "leaf", "sea"]],
      ["oa and ow", "two ways to say long o", ["boat", "coat", "road", "soap", "toast", "snow", "slow", "grow", "show", "blow"]],
      ["igh and ie", "two ways to say long i", ["high", "light", "night", "right", "might", "bright", "pie", "tie", "lie", "fries"]],
      ["Both oo Sounds", "moon oo and book oo", ["moon", "soon", "food", "room", "pool", "book", "look", "good", "foot", "wood"]],
      ["ue, ew and oo", "more ways to say /oo/", ["blue", "true", "glue", "new", "few", "grew", "knew", "threw", "chew", "drew"]],
      ["Bossy ar", "when r bosses the a", ["car", "far", "star", "park", "hard", "dark", "farm", "barn", "yard", "start"]],
      ["Bossy or", "or and ore", ["for", "corn", "born", "short", "storm", "more", "store", "score", "before", "shore"]],
      ["er, ir and ur", "three spellings, one sound", ["her", "over", "under", "water", "bird", "girl", "first", "shirt", "turn", "hurt"]],
      ["air, are and ear", "the /air/ and /ear/ sounds", ["air", "hair", "chair", "pair", "care", "share", "year", "hear", "near", "clear"]],
      ["Level 3 Review", "vowel teams and bossy r", ["rain", "green", "beach", "boat", "night", "moon", "blue", "star", "store", "girl"]],
    ],
  },
  {
    title: "Level 4 · Tricky Spellings",
    emoji: "🌀",
    color: "#a855f7",
    soft: "#faf5ff",
    rows: [
      ["The ou Sound", "ou says /ow/", ["out", "loud", "sound", "found", "round", "house", "mouse", "about", "count", "our"]],
      ["The ow Sound", "when ow says /ow/", ["cow", "how", "now", "down", "town", "brown", "owl", "crowd", "flower", "power"]],
      ["oi and oy", "two ways to say /oy/", ["oil", "coin", "join", "point", "soil", "boy", "toy", "joy", "enjoy", "royal"]],
      ["au and aw", "two ways to say /aw/", ["because", "author", "caught", "taught", "saw", "draw", "law", "paw", "crawl", "yawn"]],
      ["all, alk and alt", "when a sounds like /aw/", ["all", "ball", "call", "fall", "tall", "wall", "small", "walk", "talk", "salt"]],
      ["The Letter y", "y as long i and long e", ["my", "by", "try", "fly", "why", "sky", "happy", "funny", "baby", "carry"]],
      ["Soft c", "when c says /s/", ["ice", "nice", "rice", "city", "race", "place", "cent", "circle", "dance", "since"]],
      ["Soft g", "when g says /j/", ["age", "page", "cage", "huge", "large", "giant", "magic", "change", "gentle", "bridge"]],
      ["tch and dge", "after a short vowel", ["catch", "match", "watch", "pitch", "kitchen", "badge", "edge", "judge", "fudge", "hedge"]],
      ["Silent Letters", "kn, wr, gn and mb", ["know", "knee", "knife", "knock", "write", "wrong", "wrap", "sign", "comb", "thumb"]],
      ["ph and gh", "letters that say /f/", ["phone", "photo", "graph", "phrase", "laugh", "cough", "tough", "enough", "rough", "elephant"]],
      ["Level 4 Review", "tricky spellings", ["house", "brown", "point", "because", "small", "happy", "nice", "change", "watch", "know"]],
    ],
  },
  {
    title: "Level 5 · Word Building",
    emoji: "🏔️",
    color: "#0891b2",
    soft: "#ecfeff",
    rows: [
      ["The -le Ending", "consonant plus le", ["little", "table", "apple", "simple", "middle", "candle", "handle", "bottle", "puzzle", "purple"]],
      ["-tion and -sion", "endings that say /shun/", ["action", "nation", "station", "motion", "question", "vision", "mission", "section", "fiction", "mention"]],
      ["Prefixes", "un, re, pre, dis and mis", ["unlock", "unhappy", "redo", "return", "review", "preview", "prepare", "disagree", "dislike", "mistake"]],
      ["Adding -ed and -ing", "when to double or drop", ["jumped", "played", "stopped", "running", "swimming", "making", "writing", "hoping", "carried", "studied"]],
      ["Adding -er and -est", "comparing words", ["bigger", "biggest", "faster", "fastest", "happier", "happiest", "nicer", "nicest", "hotter", "hottest"]],
      ["-ful, -less and -ly", "endings that change meaning", ["helpful", "careful", "beautiful", "careless", "hopeless", "endless", "quickly", "slowly", "really", "finally"]],
      ["Tricky Plurals", "more than one", ["boxes", "dishes", "foxes", "babies", "cities", "leaves", "knives", "wolves", "children", "women"]],
      ["Homophones 1", "sound the same, spelled differently", ["there", "their", "they're", "to", "too", "two", "your", "you're", "its", "it's"]],
      ["Homophones 2", "more sound-alikes", ["here", "hear", "know", "no", "right", "write", "new", "knew", "one", "won"]],
      ["Words We Mix Up", "the ones everybody misspells", ["because", "friend", "people", "said", "were", "where", "which", "would", "could", "should"]],
      ["Big Words", "three syllables and more", ["important", "remember", "together", "different", "another", "beautiful", "favorite", "probably", "especially", "experience"]],
      ["The Final Challenge", "the hardest words of all", ["necessary", "separate", "definitely", "receive", "believe", "through", "thought", "enough", "business", "February"]],
    ],
  },
];

function flatten(): SpellingList[] {
  const out: SpellingList[] = [];
  let n = 0;
  SPELLING_LEVELS.forEach((lv, li) => {
    for (const [title, pattern, words] of lv.rows) {
      n += 1;
      out.push({
        n,
        title,
        pattern,
        words,
        level: li + 1,
        levelTitle: lv.title,
        levelEmoji: lv.emoji,
      });
    }
  });
  return out;
}

export const SPELLING_LISTS: SpellingList[] = flatten();
export const TOTAL_LISTS = SPELLING_LISTS.length;
export const listByNumber = (n: number): SpellingList | undefined =>
  SPELLING_LISTS.find((l) => l.n === n);
/** a list is passed once it has been spelled perfectly this many times */
export const PASSES_NEEDED = 2;
