import type { LevelDef, Question, StaticQ, UnitDef } from "../types";
import { numQ, pick, shuffle } from "../rand";

function bUnit(id: string, title: string, emoji: string, bank: StaticQ[]): UnitDef {
  return { id, title, emoji, bank };
}

const INSTRUMENT_FAMILIES: StaticQ[] = [
  { p: "Which family does the 🎻 violin belong to?", a: "strings", w: ["brass", "percussion", "woodwinds"] },
  { p: "Which family does the 🎺 trumpet belong to?", a: "brass", w: ["strings", "percussion", "woodwinds"] },
  { p: "Which family does the 🥁 drum belong to?", a: "percussion", w: ["strings", "brass", "woodwinds"] },
  { p: "Which family does the 🪈 flute belong to?", a: "woodwinds", w: ["strings", "brass", "percussion"] },
  { p: "Which instrument do you play by pressing black and white keys?", a: "piano 🎹", w: ["guitar 🎸", "trumpet 🎺", "drums 🥁"] },
  { p: "Which instrument has 6 strings you strum?", a: "guitar 🎸", w: ["flute 🪈", "piano 🎹", "tuba"] },
  { p: "Which of these do you HIT to make a sound?", a: "xylophone", w: ["violin", "clarinet", "trumpet"] },
  { p: "Which instrument is the BIGGEST string instrument?", a: "double bass", w: ["violin", "viola", "ukulele"] },
];

const LOUD_SOFT: StaticQ[] = [
  { p: `In music, "forte" (f) means play…`, a: "loud", w: ["soft", "fast", "slow"] },
  { p: `In music, "piano" (p) means play…`, a: "soft", w: ["loud", "fast", "bouncy"] },
  { p: "A lullaby for a sleeping baby should be…", a: "soft (piano)", w: ["loud (forte)", "shouting", "banging"] },
  { p: "A marching band at a parade sounds…", a: "loud (forte)", w: ["soft (piano)", "silent", "whispering"] },
  { p: `"Crescendo" means the music gets…`, a: "louder and louder", w: ["softer and softer", "faster only", "higher only"] },
  { p: "Which animal sound is HIGH pitched?", a: "a little bird tweet 🐦", w: ["a lion roar 🦁", "a cow moo 🐄", "thunder ⛈️"] },
  { p: "Which sound is LOW pitched?", a: "a big bear growl 🐻", w: ["a mouse squeak 🐭", "a whistle", "a tiny bell"] },
  { p: `"Decrescendo" means the music gets…`, a: "softer and softer", w: ["louder and louder", "taller", "sillier"] },
];

const TEMPO: StaticQ[] = [
  { p: `"Tempo" in music means the…`, a: "speed of the music", w: ["loudness", "instrument", "singer's name"] },
  { p: `"Allegro" means play…`, a: "fast and lively", w: ["slow and sleepy", "very soft", "backwards"] },
  { p: `"Adagio" means play…`, a: "slow", w: ["fast", "loud", "twice"] },
  { p: "A race-car song would have a ___ tempo.", a: "fast", w: ["slow", "sleepy", "frozen"] },
  { p: "A goodnight song would have a ___ tempo.", a: "slow", w: ["super fast", "racing", "jumpy"] },
  { p: "The steady heartbeat of a song is called the…", a: "beat", w: ["melody", "title", "echo"] },
  { p: "When you clap along with a song, you are clapping the…", a: "beat", w: ["words", "color", "harmony"] },
];

const NOTE_NAMES: StaticQ[] = [
  { p: "Music notes are named after which letters?", a: "A B C D E F G", w: ["A B C D E F G H", "Do Re Mi only", "1 2 3 4 5 6 7"] },
  { p: "What letter comes after G in the music alphabet?", a: "A (it starts over!)", w: ["H", "I", "Z"] },
  { p: "How many different letter names do music notes use?", a: "7", w: ["26", "10", "5"] },
  { p: "What comes next: C, D, E, ___?", a: "F", w: ["G", "H", "A"] },
  { p: "What comes next: F, G, A, ___?", a: "B", w: ["H", "C", "E"] },
  { p: "Which note name does NOT exist in music?", a: "H", w: ["A", "F", "G"] },
];

function noteMathQ(d: number): Question {
  const notes: [string, number][] = d < 0.5
    ? [["quarter note ♩", 1], ["half note", 2], ["whole note", 4]]
    : [["quarter note ♩", 1], ["half note", 2], ["whole note", 4], ["eighth note ♪", 0.5], ["dotted half note", 3]];
  const [n1, v1] = pick(notes);
  const [n2, v2] = pick(notes);
  const total = v1 + v2;
  const label = (x: number) => (Number.isInteger(x) ? String(x) : x === 0.5 ? "half" : x === 1.5 ? "1 and a half" : x === 2.5 ? "2 and a half" : x === 3.5 ? "3 and a half" : String(x));
  const correct = label(total);
  const wrongPool = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6].map(label).filter((c) => c !== correct);
  const choices = shuffle([correct, ...shuffle(wrongPool).slice(0, 3)]);
  return {
    prompt: `A ${n1} + a ${n2} = how many beats?`,
    visual: "🎵",
    choices,
    answer: choices.indexOf(correct),
  };
}

const RHYTHM: StaticQ[] = [
  { p: "How many beats does a quarter note ♩ get?", a: "1", w: ["2", "4", "half"] },
  { p: "How many beats does a half note get?", a: "2", w: ["1", "4", "3"] },
  { p: "How many beats does a whole note get?", a: "4", w: ["1", "2", "8"] },
  { p: "How many beats does an eighth note ♪ get?", a: "half a beat", w: ["1 beat", "8 beats", "2 beats"] },
  { p: "Two eighth notes ♫ together equal…", a: "1 beat", w: ["2 beats", "8 beats", "half a beat"] },
  { p: "A rest in music means…", a: "silence — don't play!", w: ["play louder", "play faster", "stand up"] },
];

const TREBLE: StaticQ[] = [
  { p: "The 5 lines music is written on are called the…", a: "staff", w: ["ladder", "fence", "grid"] },
  { p: "The swirly symbol 𝄞 at the start of the staff is the…", a: "treble clef", w: ["bass clef", "time signature", "note"] },
  { p: "The treble clef LINE notes (bottom to top) are E-G-B-D-F. A trick to remember:", a: "Every Good Bird Does Fly", w: ["All Cows Eat Grass", "FACE", "Good Bears Dance Fast"] },
  { p: "The treble clef SPACE notes (bottom to top) spell…", a: "FACE", w: ["EGBDF", "ABCD", "GFED"] },
  { p: "In 4/4 time, how many beats are in each measure?", a: "4", w: ["3", "2", "8"] },
  { p: "The vertical lines that divide the staff into measures are called…", a: "bar lines", w: ["fences", "rest lines", "clefs"] },
  { p: "In 3/4 time (like a waltz), how many beats per measure?", a: "3", w: ["4", "2", "6"] },
];

const SOLFEGE: StaticQ[] = [
  { p: "The solfège scale goes: Do, Re, Mi, ___, Sol, La, Ti, Do", a: "Fa", w: ["Fo", "Ma", "So"] },
  { p: "What comes after Sol in solfège?", a: "La", w: ["Ti", "Fa", "Do"] },
  { p: "The first and last note of the solfège scale is…", a: "Do", w: ["Re", "Ti", "La"] },
  { p: "In 'Do-Re-Mi' from The Sound of Music, 'Mi' is…", a: "a name I call myself", w: ["a drop of golden sun", "a long long way to run", "a deer"] },
  { p: "Singing up the scale Do→Do, the notes get…", a: "higher", w: ["lower", "louder", "slower"] },
  { p: "How many notes are in a major scale (counting Do to Do)?", a: "8", w: ["5", "7", "10"] },
];

const INTERVALS: StaticQ[] = [
  { p: "Moving from one note to the very next note (C to D) is a…", a: "step", w: ["skip", "leap", "hop"] },
  { p: "Jumping over a note (C to E) is a…", a: "skip", w: ["step", "slide", "rest"] },
  { p: "C to C (same note, higher) is called an…", a: "octave", w: ["step", "skip", "echo"] },
  { p: "A melody is…", a: "the tune you can sing", w: ["the drum beat", "the volume", "the instrument's name"] },
  { p: "Harmony is when…", a: "different notes sound good together", w: ["everyone sings the same note", "music stops", "you clap"] },
  { p: "Which is a repeating pattern in music?", a: "ostinato (like a loop!)", w: ["crescendo", "fermata", "solo"] },
];

const KEYS_SHARPS: StaticQ[] = [
  { p: "A sharp (♯) makes a note sound a tiny bit…", a: "higher", w: ["lower", "louder", "longer"] },
  { p: "A flat (♭) makes a note sound a tiny bit…", a: "lower", w: ["higher", "softer", "shorter"] },
  { p: "The C major scale uses…", a: "no sharps or flats", w: ["all sharps", "all flats", "2 sharps"] },
  { p: "On a piano, the black keys play…", a: "sharps and flats", w: ["only loud notes", "broken notes", "rests"] },
  { p: "The pattern of a major scale is…", a: "whole-whole-half-whole-whole-whole-half", w: ["all whole steps", "all half steps", "half-half-whole"] },
  { p: "A natural sign (♮) means…", a: "play the plain note (no sharp/flat)", w: ["play louder", "skip the note", "hold it longer"] },
];

const CHORDS: StaticQ[] = [
  { p: "A chord is…", a: "3 or more notes played together", w: ["one note alone", "a type of drum", "a rest"] },
  { p: "The C major chord is made of C, E and…", a: "G", w: ["B", "D", "A"] },
  { p: "Chords that sound happy are usually…", a: "major", w: ["minor", "broken", "flat"] },
  { p: "Chords that sound sad or spooky are usually…", a: "minor", w: ["major", "loud", "fast"] },
  { p: "A person who writes music is called a…", a: "composer", w: ["conductor", "audience", "janitor"] },
  { p: "The person who waves a baton to lead the orchestra is the…", a: "conductor", w: ["composer", "drummer", "singer"] },
  { p: "Beethoven and Mozart were famous…", a: "composers", w: ["painters", "presidents", "astronauts"] },
];

export const MUSIC_LEVELS: LevelDef[] = [
  {
    n: 1,
    name: "Little Listeners",
    units: [
      bUnit("families", "Meet the Instruments", "🎻", INSTRUMENT_FAMILIES),
      bUnit("loudsoft", "Loud & Soft", "🔊", LOUD_SOFT),
      bUnit("tempo", "Fast & Slow", "🐢", TEMPO),
      bUnit("notenames", "The Music Alphabet", "🔤", NOTE_NAMES),
    ],
  },
  {
    n: 2,
    name: "Beat Buddies",
    units: [
      bUnit("rhythm", "Note Values", "🎵", RHYTHM),
      { id: "notemath", title: "Rhythm Math", emoji: "➕", gen: noteMathQ },
      bUnit("tempo2", "Tempo Words", "🏃", TEMPO),
      bUnit("families2", "Instrument Expert", "🎺", INSTRUMENT_FAMILIES),
    ],
  },
  {
    n: 3,
    name: "Staff Stars",
    units: [
      bUnit("treble", "Reading the Staff", "𝄞", TREBLE),
      bUnit("rhythm2", "Rhythm Champs", "🥁", RHYTHM),
      { id: "notemath2", title: "Harder Rhythm Math", emoji: "🧮", gen: (d) => noteMathQ(Math.min(1, d + 0.5)) },
      bUnit("notenames2", "Note Name Ninja", "🎼", NOTE_NAMES),
    ],
  },
  {
    n: 4,
    name: "Solfège Singers",
    units: [
      bUnit("solfege", "Do Re Mi", "🎤", SOLFEGE),
      bUnit("intervals", "Steps & Skips", "🪜", INTERVALS),
      bUnit("treble2", "Staff Reading II", "📖", TREBLE),
      bUnit("loudsoft2", "Dynamics Master", "📣", LOUD_SOFT),
    ],
  },
  {
    n: 5,
    name: "Scale Scholars",
    units: [
      bUnit("sharps", "Sharps & Flats", "♯", KEYS_SHARPS),
      bUnit("solfege2", "Solfège II", "🎙️", SOLFEGE),
      bUnit("intervals2", "Melody & Harmony", "🎶", INTERVALS),
      { id: "notemath3", title: "Dotted Rhythm Math", emoji: "🎯", gen: (d) => noteMathQ(1) },
    ],
  },
  {
    n: 6,
    name: "Young Composers",
    units: [
      bUnit("chords", "Chords & Composers", "🎹", CHORDS),
      bUnit("sharps2", "Key Signatures", "🗝️", KEYS_SHARPS),
      bUnit("treble3", "Staff Master", "🏆", TREBLE),
      bUnit("chords2", "Composer Challenge", "🎩", CHORDS),
    ],
  },
];
