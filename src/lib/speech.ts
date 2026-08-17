/**
 * Animal voices via the browser's built-in speech engine (works offline).
 * Each coach gets a distinct pitch/rate so the animals sound different.
 */

export interface VoiceStyle {
  pitch: number; // 0..2
  rate: number; // 0.1..10
}

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

export function stopSpeaking() {
  try {
    window.speechSynthesis?.cancel();
  } catch {
    /* ignore */
  }
}

/** Remove emoji & markup so the voice reads only words. */
function cleanForSpeech(text: string): string {
  return text
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}\u{2B00}-\u{2BFF}]/gu, " ")
    .replace(/[*_#`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

let cachedVoice: SpeechSynthesisVoice | null = null;

function pickVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice) return cachedVoice;
  try {
    const voices = window.speechSynthesis?.getVoices() ?? [];
    if (!voices.length) return null;
    const en = voices.filter((v) => v.lang.startsWith("en"));
    // Prefer friendly-sounding named voices when present
    const preferred =
      en.find((v) => /samantha|karen|zira|jenny|aria|natural/i.test(v.name)) ??
      en.find((v) => v.default) ??
      en[0] ??
      voices[0];
    cachedVoice = preferred ?? null;
    return cachedVoice;
  } catch {
    return null;
  }
}

// voices load async in some browsers
try {
  window.speechSynthesis?.addEventListener?.("voiceschanged", () => {
    cachedVoice = null;
    pickVoice();
  });
} catch {
  /* ignore */
}

/** Speak a line in a coach's voice. Cancels anything currently speaking. */
export function speak(text: string, style: VoiceStyle, opts?: { lang?: string }) {
  if (muted) return;
  const clean = cleanForSpeech(text);
  if (!clean) return;
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(clean);
    u.pitch = style.pitch;
    u.rate = style.rate;
    if (opts?.lang) u.lang = opts.lang;
    const v = pickVoice();
    if (v && !opts?.lang) u.voice = v;
    synth.speak(u);
  } catch {
    /* speech unavailable — fail silent */
  }
}

/** Speak several lines in sequence (e.g. coach steps). */
export function speakLines(lines: string[], style: VoiceStyle) {
  if (muted) return;
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    for (const line of lines) {
      const clean = cleanForSpeech(line);
      if (!clean) continue;
      const u = new SpeechSynthesisUtterance(clean);
      u.pitch = style.pitch;
      u.rate = style.rate;
      const v = pickVoice();
      if (v) u.voice = v;
      synth.speak(u);
    }
  } catch {
    /* ignore */
  }
}
