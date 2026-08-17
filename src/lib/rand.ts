import type { Question, StaticQ } from "./types";

export const rnd = (a: number, b: number) =>
  Math.floor(Math.random() * (b - a + 1)) + a;

export function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sample<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

/** Build a multiple-choice question from a numeric answer with nearby distractors. */
export function numQ(
  prompt: string,
  answer: number,
  visual?: string,
  explain?: string,
  steps?: string[]
): Question {
  const wrong = new Set<number>();
  const spread = Math.max(2, Math.round(Math.abs(answer) * 0.25));
  let guard = 0;
  while (wrong.size < 3 && guard++ < 50) {
    const w = answer + (rnd(0, 1) ? 1 : -1) * rnd(1, spread);
    if (w !== answer && w >= 0) wrong.add(w);
  }
  // fallback fillers
  let f = answer + 1;
  while (wrong.size < 3) {
    if (f !== answer && f >= 0) wrong.add(f);
    f += 2;
  }
  const choices = shuffle([answer, ...wrong]).map(String);
  return { prompt, visual, choices, answer: choices.indexOf(String(answer)), explain, steps };
}

/** Turn a StaticQ into a shuffled Question. */
export function staticQ(q: StaticQ): Question {
  const wrong = sample(q.w, 3);
  const choices = shuffle([q.a, ...wrong]);
  return {
    prompt: q.p,
    visual: q.v,
    choices,
    answer: choices.indexOf(q.a),
    explain: q.x,
  };
}

/**
 * Build a vocab question from a term list: asks term->meaning or meaning->term,
 * with distractors drawn from the same list.
 */
export function vocabQ(
  pairs: [string, string][],
  promptFwd: (term: string) => string,
  promptBack: (meaning: string) => string
): Question {
  const [term, meaning] = pick(pairs);
  const fwd = Math.random() < 0.5;
  const pool = pairs.filter(([t]) => t !== term);
  if (fwd) {
    const wrong = sample(pool.map(([, m]) => m).filter((m) => m !== meaning), 3);
    const choices = shuffle([meaning, ...wrong]);
    return { prompt: promptFwd(term), choices, answer: choices.indexOf(meaning) };
  }
  const wrong = sample(pool.map(([t]) => t).filter((t) => t !== term), 3);
  const choices = shuffle([term, ...wrong]);
  return { prompt: promptBack(meaning), choices, answer: choices.indexOf(term) };
}

export const uid = () => Math.random().toString(36).slice(2, 10);

export const todayISO = () => new Date().toISOString().slice(0, 10);

export function addDays(iso: string, days: number): string {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
