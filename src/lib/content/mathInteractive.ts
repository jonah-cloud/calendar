/**
 * Interactive concept lessons — the "Explore" stage where kids manipulate
 * things on screen before building understanding and then racing for fluency.
 *
 * Step kinds:
 *  - concept: the big idea, stated plainly with a picture (opens every lesson)
 *  - say:   Dash talks (spoken aloud), kid taps next
 *  - count: tap every object once; the counter grows with each tap
 *  - move:  tap objects from a pile to move them into a target zone
 *  - hop:   number-line skip counting — tap the next landing number
 *  - shade: tap tiles to shade a fraction of a whole
 *  - pick:  big tappable answer tiles with a spoken hint on mistakes
 *  - cards: flip cards — tap to hear it spoken, flip to see the meaning
 */

import type { Viz } from "../viz";

export type IStep =
  /**
   * concept: the BIG IDEA card. Every lesson opens with one. A title, one
   * plain sentence, and a picture that shows the idea before any activity.
   */
  | {
      kind: "concept";
      title: string;
      big: string;
      viz?: Viz;
      /** spoken version, if it should differ from `big` */
      say?: string;
      /** the one-line takeaway pinned under the picture */
      takeaway?: string;
    }
  | { kind: "say"; text: string }
  | { kind: "count"; text: string; emoji: string; n: number; cols?: number }
  | {
      kind: "move";
      text: string;
      emoji: string;
      startIn: number;
      add: number;
      targetLabel: string;
      sourceLabel: string;
      /** capacity renders empty slots in the target (e.g. a ten-frame) */
      capacity?: number;
      /** how many items sit in the source pile (defaults to `add`) */
      sourceCount?: number;
    }
  | { kind: "hop"; text: string; start: number; step: number; hops: number }
  | { kind: "shade"; text: string; n: number; shade: number; label: string; pre?: number }
  | {
      kind: "pick";
      text: string;
      /** emoji strip (legacy, fine for shape/emoji questions) */
      visual?: string;
      /** a REAL picture — the maths stays on screen while they answer */
      viz?: Viz;
      /** short label pinned above the tiles, e.g. "8 + 5 = ?" */
      ask?: string;
      tiles: string[];
      correct: number;
      hint: string;
    }
  | {
      kind: "cards";
      text: string;
      cards: { front: string; back: string; say?: string; lang?: string }[];
    };

import { SKILLS } from "./course/skills";

/* ------------------------------------------------------------------ *
 * The concept lessons for the original mastery-map units.
 *
 * Most map straight onto a course skill, so the teaching lives in exactly
 * ONE place — fix a lesson there and both tracks get the fix. The advanced
 * units below (Math 3–5 territory) are authored here.
 *
 * Every lesson in this file obeys the same two rules, enforced by
 * scripts/lint-teaching.mjs:
 *   1. it opens with a `concept` card — introduce the idea before drilling it
 *   2. no numeric question is ever text alone — the picture stays on screen
 * ------------------------------------------------------------------ */

const t = (id: string): IStep[] => SKILLS[id].teach;

const ADVANCED: Record<string, IStep[]> = {
  skip2: [
    {
      kind: "concept",
      title: "Bigger Jumps",
      big: "Threes and fours jump further than twos. Same idea — same-size jumps — just a longer stride.",
      viz: { kind: "numberline", from: 3, to: 15, step: 3 },
      takeaway: "Every jump is the same size.",
    },
    { kind: "hop", text: "Jump by 3s! Tap each landing.", start: 3, step: 3, hops: 4 },
    { kind: "hop", text: "Now by 4s — the times-table warm-up jump!", start: 4, step: 4, hops: 4 },
    {
      kind: "pick",
      text: "Look at the label on each arc to find the jump size.",
      ask: "6, 12, 18, ?",
      viz: { kind: "numberline", from: 6, to: 24, step: 6 },
      tiles: ["22", "24", "26"],
      correct: 1,
      hint: "We're jumping by sixes — 18 plus 6 is 24!",
    },
  ],

  bigmult: [
    {
      kind: "concept",
      title: "Multiply the Pieces",
      big: "You already know your facts. For a big number, SPLIT it into tens and ones, multiply each piece, then add the two answers.",
      viz: { kind: "split", a: 23, b: 4, op: "x" },
      takeaway: "Split · multiply each piece · add.",
    },
    {
      kind: "pick",
      text: "The tens piece is on the left of the picture.",
      ask: "20 × 4 = ?",
      viz: { kind: "split", a: 23, b: 4, op: "x" },
      tiles: ["80", "60", "24"],
      correct: 0,
      hint: "2 × 4 is 8, so 20 × 4 is ten times bigger — eighty!",
    },
    {
      kind: "pick",
      text: "Now the ones piece, on the right.",
      ask: "3 × 4 = ?",
      viz: { kind: "array", rows: 3, cols: 4, emoji: "🔵" },
      tiles: ["12", "7", "16"],
      correct: 0,
      hint: "Three rows of four — count the rows: 4, 8, 12!",
    },
    {
      kind: "pick",
      text: "Last step: add your two pieces together.",
      ask: "80 + 12 = ?",
      viz: { kind: "expr", parts: [{ text: "80" }, { text: "+" }, { text: "12" }, { text: "= ?", hot: true }] },
      tiles: ["92", "82", "812"],
      correct: 0,
      hint: "Eighty plus twelve is ninety-two — and that's 23 × 4!",
    },
  ],

  longdiv: [
    {
      kind: "concept",
      title: "Chunking",
      big: "Big division doesn't need one giant guess. Take away friendly CHUNKS — ten at a time — until nothing is left.",
      viz: { kind: "numberline", from: 0, to: 84, step: 42 },
      takeaway: "Take away chunks, then count the chunks.",
    },
    {
      kind: "pick",
      text: "84 ÷ 7. Start with a friendly chunk of ten 7s.",
      ask: "7 × 10 = ?",
      viz: { kind: "expr", parts: [{ text: "7 × 10" }, { text: "= ?", hot: true }] },
      tiles: ["70", "17", "77"],
      correct: 0,
      hint: "Times ten just adds a zero — seventy!",
    },
    {
      kind: "pick",
      text: "You've used 70 of the 84. See what's left.",
      ask: "84 − 70 = ?",
      viz: { kind: "expr", parts: [{ text: "84" }, { text: "−" }, { text: "70" }, { text: "= ?", hot: true }] },
      tiles: ["14", "24", "10"],
      correct: 0,
      hint: "Eighty-four take away seventy leaves fourteen!",
    },
    {
      kind: "pick",
      text: "Now share that leftover 14 into groups of 7.",
      ask: "14 ÷ 7 = ?",
      viz: { kind: "groups", total: 14, per: 7, emoji: "🔵" },
      tiles: ["2", "3", "7"],
      correct: 0,
      hint: "Count the boxes — two groups of seven!",
    },
    {
      kind: "pick",
      text: "Add your chunks: ten sevens, then two more sevens.",
      ask: "10 + 2 = ?",
      viz: { kind: "expr", parts: [{ text: "10 chunks" }, { text: "+" }, { text: "2 chunks" }, { text: "= ?", hot: true }] },
      tiles: ["12", "14", "20"],
      correct: 0,
      hint: "Twelve sevens make 84 — so 84 ÷ 7 = 12!",
    },
  ],

  equiv: [
    {
      kind: "concept",
      title: "Same Amount, Different Slices",
      big: "Cut a pizza into more pieces and each piece gets smaller — but the AMOUNT you have can stay exactly the same.",
      viz: { kind: "fraction", bars: [{ num: 1, den: 3, label: "1/3" }, { num: 2, den: 6, label: "2/6" }] },
      takeaway: "1/3 and 2/6 are the same amount.",
    },
    { kind: "shade", text: "Shade 1 piece out of 3.", n: 3, shade: 1, label: "1/3" },
    { kind: "shade", text: "Now shade 2 pieces out of 6. Same length?", n: 6, shade: 2, label: "2/6" },
    {
      kind: "concept",
      title: "The Twin Rule",
      big: "To make an equal fraction, multiply the top AND the bottom by the same number. Whatever you do to one, do to the other.",
      viz: { kind: "fraction", bars: [{ num: 1, den: 3, label: "1/3 ×2" }, { num: 2, den: 6, label: "2/6" }] },
      takeaway: "Top and bottom get the same treatment.",
    },
    {
      kind: "pick",
      text: "Both bars cover the same length.",
      ask: "1/3 is the same as…",
      viz: { kind: "fraction", bars: [{ num: 1, den: 3, label: "1/3" }, { num: 2, den: 6, label: "?" }] },
      tiles: ["2/6", "1/6", "3/6"],
      correct: 0,
      hint: "Double the top and double the bottom: 1×2 over 3×2 is 2/6!",
    },
  ],

  fracadd: [
    {
      kind: "concept",
      title: "Adding Same-Size Slices",
      big: "When slices are the same size, adding is easy: count the slices. The slice SIZE never changes.",
      viz: { kind: "fraction", bars: [{ num: 5, den: 8, label: "2/8 + 3/8" }] },
      takeaway: "Add the tops. The bottom stays put.",
    },
    { kind: "shade", text: "Shade 2 slices out of 8.", n: 8, shade: 2, label: "2/8" },
    { kind: "shade", text: "Now shade 3 more slices.", n: 8, shade: 3, pre: 2, label: "3/8 more" },
    {
      kind: "pick",
      text: "Count all the shaded slices in the bar.",
      ask: "2/8 + 3/8 = ?",
      viz: { kind: "fraction", bars: [{ num: 5, den: 8, label: "?" }] },
      tiles: ["5/8", "5/16", "6/8"],
      correct: 0,
      hint: "Two slices plus three slices is five slices — still eighths!",
    },
    {
      kind: "concept",
      title: "Why the Bottom Stays",
      big: "The bottom number is the slice SIZE, not a count. Eating more slices doesn't make each slice smaller!",
      viz: { kind: "fraction", bars: [{ num: 5, den: 8, label: "still eighths" }] },
      takeaway: "Never add the bottom numbers.",
    },
  ],

  decimals: [
    {
      kind: "concept",
      title: "Tenths",
      big: "Cut one whole into 10 equal strips and each strip is a TENTH. We write that with a dot: 0.1",
      viz: { kind: "fraction", bars: [{ num: 1, den: 10, label: "1/10 = 0.1" }] },
      takeaway: "One strip out of ten = 0.1",
    },
    { kind: "shade", text: "Shade 7 strips out of 10.", n: 10, shade: 7, label: "0.7" },
    {
      kind: "pick",
      text: "Seven strips out of ten are shaded.",
      ask: "How do we write this?",
      viz: { kind: "fraction", bars: [{ num: 7, den: 10, label: "?" }] },
      tiles: ["0.7", "7.0", "0.07"],
      correct: 0,
      hint: "Seven tenths — the 7 sits just after the dot: 0.7!",
    },
    {
      kind: "pick",
      text: "Shade 4 strips, then 3 more. Count them all.",
      ask: "0.4 + 0.3 = ?",
      viz: { kind: "fraction", bars: [{ num: 7, den: 10, label: "0.4 + 0.3" }] },
      tiles: ["0.7", "0.12", "7"],
      correct: 0,
      hint: "Four tenths plus three tenths is seven tenths — 0.7!",
    },
  ],

  orderops: [
    {
      kind: "concept",
      title: "Some Jobs Go First",
      big: "When one sum has both + and ×, the × ALWAYS happens first. Otherwise two people would get two different answers.",
      viz: { kind: "expr", parts: [{ text: "5 +" }, { text: "2 × 3", hot: true }] },
      takeaway: "× and ÷ go before + and −.",
    },
    {
      kind: "pick",
      text: "The highlighted part is the one that goes first.",
      ask: "5 + 2 × 3 — what first?",
      viz: { kind: "expr", parts: [{ text: "5 +" }, { text: "2 × 3", hot: true }] },
      tiles: ["2 × 3", "5 + 2"],
      correct: 0,
      hint: "Times always goes before plus — do 2 × 3 first!",
    },
    {
      kind: "pick",
      text: "2 × 3 made 6. Now finish the sum.",
      ask: "5 + 6 = ?",
      viz: { kind: "expr", parts: [{ text: "5 +" }, { text: "6", hot: true }, { text: "= ?" }] },
      tiles: ["11", "21", "18"],
      correct: 0,
      hint: "Five plus six is eleven!",
    },
    {
      kind: "concept",
      title: "Brackets Jump the Queue",
      big: "Brackets beat everything. Whatever is inside them goes first, even a plus.",
      viz: { kind: "expr", parts: [{ text: "(4 + 2)", hot: true }, { text: "× 3" }] },
      takeaway: "Brackets first, then × and ÷, then + and −.",
    },
    {
      kind: "pick",
      text: "The brackets are highlighted — they go first.",
      ask: "(4 + 2) × 3 = ?",
      viz: { kind: "expr", parts: [{ text: "6", hot: true }, { text: "× 3" }] },
      tiles: ["18", "10", "24"],
      correct: 0,
      hint: "Brackets make 6, then 6 × 3 is eighteen!",
    },
  ],

  geometry: [
    {
      kind: "concept",
      title: "Carpet or Fence?",
      big: "Every shape question is one of two things. AREA is the carpet covering the inside. PERIMETER is the fence around the edge.",
      viz: { kind: "rect", w: 6, h: 4, mode: "area" },
      takeaway: "Inside = area. Around = perimeter.",
    },
    {
      kind: "pick",
      text: "Painting a whole wall covers the inside.",
      ask: "Paint a 6 × 4 wall — which?",
      viz: { kind: "rect", w: 6, h: 4, mode: "area" },
      tiles: ["carpet (area)", "fence (perimeter)"],
      correct: 0,
      hint: "Paint covers the whole inside — that's area!",
    },
    {
      kind: "pick",
      text: "Area is rows times columns. Count the tiles.",
      ask: "6 × 4 = ?",
      viz: { kind: "rect", w: 6, h: 4, mode: "area" },
      tiles: ["24", "20", "10"],
      correct: 0,
      hint: "Six rows of four tiles — twenty-four!",
    },
    {
      kind: "pick",
      text: "Ribbon goes around the outside edge.",
      ask: "Ribbon round a 5 × 2 box — which?",
      viz: { kind: "rect", w: 5, h: 2, mode: "perimeter" },
      tiles: ["fence (perimeter)", "carpet (area)"],
      correct: 0,
      hint: "Ribbon wraps AROUND — that's perimeter!",
    },
    {
      kind: "pick",
      text: "Walk all four sides: 5 + 2 + 5 + 2.",
      ask: "Perimeter = ?",
      viz: { kind: "rect", w: 5, h: 2, mode: "perimeter" },
      tiles: ["14", "10", "12"],
      correct: 0,
      hint: "Five and two is seven, and there are two of each side — fourteen!",
    },
  ],
};

export const MATH_INTERACTIVE: Record<string, IStep[]> = {
  /* shared with the course-book track — one source of truth */
  counting: t("count10"),
  compare: t("compare"),
  add5: t("add5"),
  shapes: t("shapes"),
  addsub20: t("addsub20"),
  missing: t("missing"),
  tensones: t("tensones"),
  skip: t("skip"),
  addsub100: t("addsub100"),
  money: t("money"),
  time: t("timeHour"),
  mult: t("mult"),
  arrays: t("arrays"),
  div: t("div"),
  fraccomp: t("fraccomp"),
  perim: t("perim"),
  /* advanced units, authored above */
  ...ADVANCED,
};
