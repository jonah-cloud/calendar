import type { SubjectId } from "./types";
import { pick } from "./rand";

export interface Coach {
  name: string;
  emoji: string;
  title: string;
  /** Voice character for the speech engine. */
  voice: { pitch: number; rate: number };
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
    voice: { pitch: 1.35, rate: 1.12 },
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
    voice: { pitch: 0.85, rate: 0.9 },
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
    voice: { pitch: 1.45, rate: 1.0 },
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
    voice: { pitch: 1.15, rate: 0.92 },
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
    voice: { pitch: 1.0, rate: 1.08 },
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
  history: {
    name: "Barnaby",
    emoji: "🐢",
    title: "Barnaby the Tortoise · 512-Year-Old History Keeper",
    voice: { pitch: 0.8, rate: 0.85 },
    oops: [
      "Hmm, not quite, young sprout. And I should know — I was THERE. (I was napping, but I was there.) Let me tell you how it really went:",
      "Ah ah ah, hold your horses! And I've held actual horses. The true story goes like this:",
      "Not that one, my dear. History is tricky — even I mix up the 1600s and the 1700s. (Wild centuries, both of them.) Here's the scoop:",
      "Oops-a-shell! No worries — I've had 512 years to learn this stuff and you've had, what, seven? Gather 'round:",
      "Close, but my wrinkles say otherwise! Let old Barnaby paint you the picture:",
    ],
    praise: ["Splendid, young historian!", "Correct! Just like I remember it!", "You'd have made a fine explorer!", "My shell is tingling — well done!", "History will remember THAT answer!"],
    zoom: ["Great galloping centuries, that was fast!", "Faster than the Pony Express!", "You answered quicker than I blink! (I blink very slowly.)"],
    reveal: (a) => `The answer is "${a}". Say it slowly, like a story around a campfire — that's how history sticks to your shell.`,
  },
  geography: {
    name: "Amelia",
    emoji: "🪿",
    title: "Amelia the Goose · Round-the-World Navigator",
    voice: { pitch: 1.25, rate: 1.0 },
    oops: [
      "HONK — wrong turn! Happens to the best of us. I once flew to the wrong continent. (Don't tell the flock.) Here's the route:",
      "Whoopsie, that's off the map! Lucky for you I've flown over this EXACT spot. Wings up, look here:",
      "Not that way, little navigator! Even my GPS is just me squinting at rivers. Let me show you:",
      "HONK HONK — recalculating! No biggie, every great explorer takes a wrong turn or two. The real path:",
      "Hmm, my compass feathers say no. Here's the lay of the land:",
    ],
    praise: ["HONK of approval!", "Navigator-level correct!", "You could lead the flock!", "My wings are applauding!", "That answer flew straight and true!"],
    zoom: ["Faster than a tailwind!", "You answered at migration speed!", "Zoom! That was supersonic, honk!"],
    reveal: (a) => `The answer is "${a}". Trace it in the air like you're drawing a map — flap, I mean, hands up — "${a}"! Now it's on YOUR map forever.`,
  },
};

export const coachFor = (s: SubjectId) => COACHES[s];
export const randomOops = (s: SubjectId) => pick(COACHES[s].oops);
export const randomPraise = (s: SubjectId) => pick(COACHES[s].praise);
export const randomZoom = (s: SubjectId) => pick(COACHES[s].zoom);
