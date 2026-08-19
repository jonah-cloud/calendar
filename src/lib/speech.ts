/**
 * Natural-sounding speech for the coaches and buddies.
 *
 * Three things make the browser's speech engine sound robotic, and we fix all
 * three here:
 *  1. The DEFAULT voice is usually the worst one installed. We score every
 *     available voice and prefer the neural / natural ones.
 *  2. One long monotone utterance. We split into phrases and speak them as a
 *     queue, with small pitch/rate variation per phrase so it breathes.
 *  3. Extreme pitch shifting. We keep pitch in a natural band and get character
 *     from choosing genuinely DIFFERENT voices per animal instead.
 */

export interface VoiceStyle {
  pitch: number;
  rate: number;
  /** Preferred voice character — picks a distinct real system voice. */
  timbre?: Timbre;
}

export type Timbre = "bright" | "warm" | "deep" | "silly" | "gentle" | "crisp" | "young";

const MUTE_KEY = "spark-academy-muted";

let muted = false;
try {
  muted = localStorage.getItem(MUTE_KEY) === "1";
} catch {
  /* no storage */
}

export const isMuted = () => muted;

export function setMuted(m: boolean) {
  muted = m;
  try {
    localStorage.setItem(MUTE_KEY, m ? "1" : "0");
  } catch {
    /* ignore */
  }
  if (m) stopSpeaking();
}

/* ------------------------------------------------------------------ *
 * Speaking state — components subscribe so mouths move in sync.
 * ------------------------------------------------------------------ */

type Listener = () => void;
const listeners = new Set<Listener>();
let speaking = false;
/** Bumps on every spoken word so mouths can flap per syllable. */
let pulse = 0;

function setSpeaking(v: boolean) {
  if (speaking === v) return;
  speaking = v;
  listeners.forEach((l) => l());
}
function bumpPulse() {
  pulse++;
  listeners.forEach((l) => l());
}

export const isSpeaking = () => speaking;
export const speechPulse = () => pulse;
export function subscribeSpeech(l: Listener) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function stopSpeaking() {
  try {
    window.speechSynthesis?.cancel();
  } catch {
    /* ignore */
  }
  setSpeaking(false);
}

/* ------------------------------------------------------------------ *
 * Voice selection
 * ------------------------------------------------------------------ */

/** Voices that actually sound like people, best first. */
const GREAT_VOICE_HINTS = [
  "natural", "neural", "premium", "enhanced", "google",
  "samantha", "ava", "allison", "serena", "moira", "tessa", "karen", "fiona",
  "aria", "jenny", "michelle", "guy", "eric", "libby", "sonia",
  "zira", "hazel", "susan", "daniel",
];
/** Voices to avoid — the classic robotic ones. */
const POOR_VOICE_HINTS = ["espeak", "festival", "pico", "compact", "novelty", "albert", "bad news", "bells", "zarvox", "trinoids", "whisper", "bahh", "boing", "jester", "organ", "cellos", "wobble", "superstar"];

function scoreVoice(v: SpeechSynthesisVoice): number {
  const n = `${v.name} ${v.voiceURI}`.toLowerCase();
  let s = 0;
  if (POOR_VOICE_HINTS.some((h) => n.includes(h))) return -100;
  GREAT_VOICE_HINTS.forEach((h, i) => {
    if (n.includes(h)) s += 40 - i; // earlier hints score higher
  });
  if (v.localService === false) s += 12; // cloud voices are usually the good ones
  if (v.lang === "en-US") s += 8;
  else if (v.lang.startsWith("en")) s += 4;
  if (v.default) s += 2;
  return s;
}

let englishVoices: SpeechSynthesisVoice[] = [];
let voicesReady = false;

function loadVoices() {
  try {
    const all = window.speechSynthesis?.getVoices() ?? [];
    if (!all.length) return false;
    englishVoices = all
      .filter((v) => v.lang.toLowerCase().startsWith("en"))
      .map((v) => ({ v, s: scoreVoice(v) }))
      .filter((x) => x.s > -50)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.v);
    if (!englishVoices.length) englishVoices = all.slice(0, 1);
    voicesReady = englishVoices.length > 0;
    return voicesReady;
  } catch {
    return false;
  }
}

try {
  loadVoices();
  window.speechSynthesis?.addEventListener?.("voiceschanged", () => loadVoices());
} catch {
  /* ignore */
}

/**
 * Give each timbre its own real voice so the animals genuinely sound like
 * different characters, not one voice pitched up and down.
 */
/** Ordered so the most-used subjects claim unique voices first when few exist. */
const TIMBRE_ORDER: Timbre[] = ["bright", "gentle", "silly", "warm", "crisp", "deep", "young"];

/** Names that tend to match a character — checked before falling back to rank. */
const TIMBRE_NAME_HINTS: Partial<Record<Timbre, string[]>> = {
  deep: ["daniel", "guy", "alex", "david", "eric", "fred", "mark", "rishi", "george", "james"],
  gentle: ["samantha", "serena", "moira", "karen", "libby", "sonia", "jenny"],
  young: ["ava", "allison", "michelle", "aria", "zira"],
};

function voiceFor(timbre?: Timbre): SpeechSynthesisVoice | null {
  if (!voicesReady) loadVoices();
  if (!englishVoices.length) return null;
  if (!timbre) return englishVoices[0];

  // 1) a voice whose name suits this character
  const hints = TIMBRE_NAME_HINTS[timbre];
  if (hints) {
    const match = englishVoices.find((v) => hints.some((h) => v.name.toLowerCase().includes(h)));
    if (match) return match;
  }
  // 2) otherwise spread characters across the best voices, wrapping if few exist
  const idx = TIMBRE_ORDER.indexOf(timbre);
  return englishVoices[idx % englishVoices.length] ?? englishVoices[0];
}

function voiceForLang(lang: string): SpeechSynthesisVoice | null {
  try {
    const all = window.speechSynthesis?.getVoices() ?? [];
    const base = lang.split("-")[0].toLowerCase();
    const matches = all
      .filter((v) => v.lang.toLowerCase().startsWith(base))
      .map((v) => ({ v, s: scoreVoice(v) }))
      .sort((a, b) => b.s - a.s);
    return matches[0]?.v ?? null;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ *
 * Text preparation
 * ------------------------------------------------------------------ */

/** Strip emoji/markup so the voice reads only words. */
function cleanForSpeech(text: string): string {
  return text
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}\u{2B00}-\u{2BFF}\u{1F1E6}-\u{1F1FF}]/gu, " ")
    .replace(/[*_#`]/g, "")
    .replace(/·/g, ",")
    .replace(/(\d)\s*[–—-]\s*(\d)/g, "$1 to $2")
    .replace(/×/g, " times ")
    .replace(/÷/g, " divided by ")
    .replace(/−/g, " minus ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Split into speakable phrases. Short phrases with natural pauses between them
 * are the single biggest win for sounding human — and they dodge the Chrome
 * bug that truncates long utterances.
 */
function toPhrases(text: string): string[] {
  const clean = cleanForSpeech(text);
  if (!clean) return [];
  const rough = clean
    .split(/(?<=[.!?])\s+|(?<=[,;:])\s+(?=\w{4,})|\s+—\s+/g)
    .map((s) => s.trim())
    .filter(Boolean);
  // Recombine very short fragments so we don't stutter.
  const out: string[] = [];
  for (const piece of rough) {
    const last = out[out.length - 1];
    if (last && (last.length < 18 || piece.length < 12)) out[out.length - 1] = `${last} ${piece}`;
    else out.push(piece);
  }
  return out.length ? out : [clean];
}

/** Small deterministic-ish wobble so repeated lines aren't identical robots. */
let wobbleSeed = 0;
function wobble(amount: number): number {
  wobbleSeed = (wobbleSeed * 9301 + 49297) % 233280;
  return 1 + ((wobbleSeed / 233280) * 2 - 1) * amount;
}

/* ------------------------------------------------------------------ *
 * Speaking
 * ------------------------------------------------------------------ */

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function enqueue(phrases: string[], style: VoiceStyle, lang?: string) {
  const synth = window.speechSynthesis;
  if (!synth) return;
  const voice = lang ? voiceForLang(lang) : voiceFor(style.timbre);
  // Keep pitch in a human band — extreme values are what sound synthetic.
  const basePitch = clamp(style.pitch, 0.72, 1.5);
  const baseRate = clamp(style.rate, 0.72, 1.28);

  phrases.forEach((phrase, i) => {
    const u = new SpeechSynthesisUtterance(phrase);
    // Ease into the first phrase and vary each one a touch.
    u.pitch = clamp(basePitch * wobble(0.05), 0.5, 2);
    u.rate = clamp(baseRate * wobble(0.04) * (i === 0 ? 0.97 : 1), 0.5, 2);
    u.volume = 1;
    if (voice) u.voice = voice;
    if (lang) u.lang = lang;
    else if (voice) u.lang = voice.lang;

    if (i === 0) u.onstart = () => setSpeaking(true);
    u.onboundary = () => bumpPulse();
    if (i === phrases.length - 1) {
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
    }
    synth.speak(u);
  });
}

/** Speak a line in a character's voice. Cancels anything already speaking. */
export function speak(text: string, style: VoiceStyle, opts?: { lang?: string }) {
  if (muted) return;
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    setSpeaking(false);
    const phrases = toPhrases(text);
    if (!phrases.length) return;
    enqueue(phrases, style, opts?.lang);
  } catch {
    /* speech unavailable — fail silent */
  }
}

/** Speak several lines back to back (e.g. a coach's walkthrough steps). */
export function speakLines(lines: string[], style: VoiceStyle) {
  if (muted) return;
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    setSpeaking(false);
    const phrases = lines.flatMap((l) => toPhrases(l));
    if (!phrases.length) return;
    enqueue(phrases, style);
  } catch {
    /* ignore */
  }
}
