import type { BuddyConfig } from "./types";
import { pick } from "./rand";
import type { VoiceStyle } from "./speech";

/**
 * Struggle detection + intervention engine, based on intelligent-tutoring-system
 * research:
 *  - repeated incorrect attempts → frustration risk → scaffold + encourage
 *  - too-fast wrong answers → "gaming/guessing" → slow-down prompt (Baker et al.)
 *  - long stalls → disengagement → gentle check-in
 *  - recovery after errors → celebrate the comeback (effort, not smartness — Dweck)
 * All buddy language praises EFFORT and STRATEGY, normalizes mistakes, and uses
 * "yet". It never praises being smart.
 */

export interface StruggleTracker {
  wrongStreak: number;
  fastWrongs: number; // consecutive wrong answers under GUESS_MS
  hadStruggle: boolean; // 2+ wrong streak happened (arms the comeback)
  intervened: boolean; // only run the big intervention once per round
}

export const newTracker = (): StruggleTracker => ({
  wrongStreak: 0,
  fastWrongs: 0,
  hadStruggle: false,
  intervened: false,
});

const GUESS_MS = 2500;

export type BuddyMomentKind = "encourage" | "guessing" | "comeback" | "intervene";

export interface BuddyMoment {
  kind: BuddyMomentKind;
  line: string;
  /** speak the line aloud (false when the coach is already talking) */
  spoken: boolean;
}

const ENCOURAGE = [
  "Hey — mistakes mean your brain is literally growing right now. Keep going!",
  "You don't have it YET. Yet is my favorite word in the whole world!",
  "Tricky one! I love that you're still trying — that's the muscle that matters most.",
  "Scientists mess up all day long. That's how they find the good stuff!",
  "Wobbles are part of learning to ride. You're doing the hard part right now!",
];

const GUESSING = [
  "Whoa whoa, speedy! I think we're guessing. Take one big breath and read it slowly with me — slow is smart.",
  "Zoom zoom — but wait! Guessing fast doesn't grow the brain. Let's read this one out loud together.",
  "Pause, friend! Racing without reading is like running with your eyes closed. Slow down — you've got this.",
];

const COMEBACK = [
  "THAT'S the comeback!! You got knocked down and came right back — that's my favorite thing you do!",
  "SEE?! You stuck with it and BOOM! That feeling? That's your brain getting stronger!",
  "You didn't quit and look what happened! I'm doing a happy dance right now!",
  "That was hard, and you did it ANYWAY. That's the whole secret of everything!",
];

const CHECKIN = [
  "Still with me? This one's a chewy one. Try reading it out loud — it really helps!",
  "Take your time! Big thinkers think slow. Want to whisper the question to yourself?",
  "You're okay! Stuck just means your brain is stretching. Look at the answers one at a time.",
];

const INTERVENE_OPEN = [
  "Hey, hey — come here for a second. This is a HARD one, and feeling stuck is totally normal. It means we're at the edge of what we know — and that's exactly where growing happens. What do you want to do?",
  "Okay, huddle time! That was a tough stretch. Guess what: your brain grows the MOST right at this exact frustrated feeling. We just need a plan. Pick one:",
];

export const INTERVENE_CHOICES = {
  breathe: "🎈 Balloon breaths (20 seconds)",
  reteach: "🎓 Learn it again with the coach",
  push: "💪 Keep going — I've got this!",
} as const;

export const BREATHE_SCRIPT =
  "Balloon breaths! Breathe IN slowly while the balloon grows… and OUT while it shrinks. Let's do four together. In… and out… You're doing great.";

export const AFTER_BREATHE = [
  "Ahhh, better! Fresh brain, fresh start. These questions don't stand a chance now.",
];

export const AFTER_PUSH = [
  "THAT'S the spirit! Brave choice. Let's take it one step at a time — I'm right here.",
];

/** Feed each answer into the tracker; returns a buddy moment when one triggers. */
export function trackAnswer(t: StruggleTracker, right: boolean, ms: number, canIntervene: boolean): BuddyMoment | null {
  if (right) {
    const hadStreak = t.wrongStreak >= 2 || (t.hadStruggle && t.wrongStreak >= 1);
    t.wrongStreak = 0;
    t.fastWrongs = 0;
    if (hadStreak) {
      t.hadStruggle = false;
      return { kind: "comeback", line: pick(COMEBACK), spoken: true };
    }
    return null;
  }
  // wrong
  t.wrongStreak++;
  t.fastWrongs = ms < GUESS_MS ? t.fastWrongs + 1 : 0;
  if (t.wrongStreak >= 2) t.hadStruggle = true;

  if (t.fastWrongs >= 2) {
    t.fastWrongs = 0;
    return { kind: "guessing", line: pick(GUESSING), spoken: true };
  }
  if (t.wrongStreak >= 3 && canIntervene && !t.intervened) {
    t.intervened = true;
    return { kind: "intervene", line: pick(INTERVENE_OPEN), spoken: true };
  }
  if (t.wrongStreak === 2) {
    // coach is explaining the problem aloud — buddy shows support silently
    return { kind: "encourage", line: pick(ENCOURAGE), spoken: false };
  }
  return null;
}

export const checkinLine = () => pick(CHECKIN);

export const buddyVoice = (b: BuddyConfig): VoiceStyle => ({ pitch: b.pitch, rate: 1.05 });

export const DEFAULT_BUDDY: BuddyConfig = {
  name: "Sunny",
  color: "#8b5cf6",
  accent: "#fde68a",
  ears: "round",
  eyes: "happy",
  accessory: "bow",
  pitch: 1.3,
};
