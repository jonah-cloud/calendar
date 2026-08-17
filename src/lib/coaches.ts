import type { SubjectId } from "./types";
import { pick } from "./rand";

export interface Coach {
  name: string;
  emoji: string;
  title: string;
  /** Funny lines that open a wrong-answer walkthrough. */
  oops: string[];
  /** Praise for correct answers. */
  praise: string[];
  /** Extra-hype praise for FAST correct answers (math especially). */
  zoom: string[];
  /** What the coach says when there are no steps to teach — before revealing the answer. */
  reveal: (answer: string) => string;
}

export const COACHES: Record<SubjectId, Coach> = {
  math: {
    name: "Dash",
    emoji: "🐆",
    title: "Dash the Cheetah · Math Mission Chief",
    oops: [
      "WHOA, speed bump! Even cheetahs trip on their shoelaces. (I don't wear shoes. Long story.) Watch this:",
      "Eek — wrong turn! Happens to me when I'm thinking about snacks. Let me show you the fast lane:",
      "Hold your zoomies! That one was sneaky. Here's my cheetah trick:",
      "Pffft, that question thinks it's clever. NOBODY out-clevers us. Check it out:",
      "My tail says that's not it — and my tail is never wrong. Here's how it really goes:",
      "Brakes ON! 🛑 Quick pit stop with Coach Dash:",
    ],
    praise: ["That's the stuff!", "Zoomy brain!", "Correct-o-matic!", "You make it look easy!", "My whiskers are tingling — nice one!"],
    zoom: [
      "⚡ LIGHTNING PAWS! That was FAST!",
      "⚡ ZOOOOOM! Did you even blink?!",
      "⚡ Faster than me chasing a snack truck!",
      "⚡ Speedy AND right?! Show-off. I love it.",
      "⚡ That answer broke the sound barrier!",
    ],
    reveal: (a) => `The answer was ${a}. Say it out loud in your best cheetah voice — RAWR, that's how it sticks!`,
  },
  reading: {
    name: "Olive",
    emoji: "🦉",
    title: "Olive the Owl · Head Book-Whooo-rarian",
    oops: [
      "Whooo, not quite! Don't worry — I once read a whole book upside down. Here's the secret:",
      "Hmm-hoo! My feathers are ruffled — that word is a tricky one. Let me shine my book-light on it:",
      "Not that one, my little bookworm! Even owls need two looks. Watch:",
      "Whoopsie-whooo! That answer flew the wrong way. Here's the map:",
      "Great guess, wrong branch! Scooch over, story time:",
    ],
    praise: ["Whooo's brilliant? YOU are!", "A+ plumage!", "That was owl-standing!", "You read that like a champion!", "My glasses just fogged up with pride!"],
    zoom: ["Whoo-hoo! Quick as a page turn!", "Speedy reader alert!", "You didn't even need my glasses!"],
    reveal: (a) => `The answer was "${a}". Whisper it three times like an owl secret — whooo, whooo, whooo — now it's yours forever!`,
  },
  spanish: {
    name: "Lola",
    emoji: "🦜",
    title: "Lola the Parrot · Directora of Dramatic Spanish",
    oops: [
      "¡Ay, no no no! *dramatic feather flip* — it's okay mi amor, even I once said 'gato' to a dog. Listen:",
      "¡Uy! Wrong word, right heart. Lola will fix it. Repeat after me, TWICE, because I always say it twice:",
      "*gasp* ¡Qué drama! But every telenovela has a twist. Here comes ours:",
      "No exactamente, corazón! Lean in, this is the juicy part:",
      "¡Momentito! My beak demands we practice this one properly:",
    ],
    praise: ["¡Perfecto, perfecto!", "¡Fantástico, mi estrella!", "¡Sí señorita, THAT'S it!", "¡Bravo! *throws confetti with wings*", "¡Excelente! You sound muy fancy!"],
    zoom: ["¡Rapidísimo! So fast, so fabulous!", "¡Andale! Lightning español!", "You answered before I finished my dramatic pause!"],
    reveal: (a) => `It's "${a}", mi amor. Say it twice with feeling — "${a}"… "${a}"! Now blow a kiss. That's how parrots remember EVERYTHING.`,
  },
  music: {
    name: "Meowzart",
    emoji: "🐱",
    title: "Meowzart · World-Famous Composer Cat",
    oops: [
      "Meow-NO! *dramatic piano slam* …forgive me, I am an ARTIST. Now, listen closely, my student:",
      "Hisss — that note was flat! Even my ninth symphony had a wrong meow in it. Observe:",
      "Purr-don me, but no. Let me conduct you through it, one whisker-wave at a time:",
      "*knocks metronome off table* Ahem. As I meant to do. Now — the correct way:",
      "That answer was more 'cat on the keyboard' than concerto. Lucky for you, I teach both:",
    ],
    praise: ["Meow-nificent!", "Purr-fect pitch!", "Bravo! Encore! ENCORE!", "You have the paws of a maestro!", "*slow claps with paws* Exquisite."],
    zoom: ["Presto! So fast!", "Allegro fingers!", "You played that answer at lightning tempo!"],
    reveal: (a) => `The answer is "${a}". Sing it to me on your best la-la-laaa — music you SING is music you never forget, dahling.`,
  },
  science: {
    name: "Newton",
    emoji: "🦝",
    title: "Newton the Raccoon · Chief of Messy Experiments",
    oops: [
      "KABOOM — wrong beaker! No worries, 90% of my experiments explode too. Here's what ACTUALLY happens:",
      "Hmm, my trash-panda senses say nope! Let's dig through the facts together (I love digging):",
      "Negative, lab partner! I once tried to wash cotton candy. We all learn. Look:",
      "*adjusts tiny goggles* Fascinating guess! Incorrect, but fascinating. The real scoop:",
      "Whoops — that hypothesis needs a do-over. Science is 99% do-overs! Watch:",
    ],
    praise: ["Hypothesis CONFIRMED!", "Big brain energy!", "That's science, baby!", "Nobel Prize vibes!", "*happy raccoon chittering* Correct!"],
    zoom: ["Faster than a chemical reaction!", "Instant results — my favorite kind!", "You answered at the speed of light! (299,792,458 m/s. I checked.)"],
    reveal: (a) => `The answer is "${a}". Scientists repeat their experiments — so say it once, wiggle your fingers like a mad scientist, and say it again!`,
  },
};

export const coachFor = (s: SubjectId) => COACHES[s];
export const randomOops = (s: SubjectId) => pick(COACHES[s].oops);
export const randomPraise = (s: SubjectId) => pick(COACHES[s].praise);
export const randomZoom = (s: SubjectId) => pick(COACHES[s].zoom);
