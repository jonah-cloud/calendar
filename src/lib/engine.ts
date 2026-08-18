import { MASTERY_PCT, ROUND_SIZE, subjectById } from "./content";
import { sample, shuffle, staticQ, todayISO } from "./rand";
import type { Kid, LevelDef, Question, SubjectId, SubjectProgress, UnitDef } from "./types";

export const unitKey = (level: number, unitId: string) => `L${level}:${unitId}`;

export function levelOf(subject: SubjectId, n: number): LevelDef {
  const levels = subjectById(subject).levels;
  return levels[Math.min(Math.max(n, 1), levels.length) - 1];
}

export function maxLevel(subject: SubjectId): number {
  return subjectById(subject).levels.length;
}

/** The next unmastered unit at the kid's current level, or null if level is complete. */
export function nextUnit(kid: Kid, subject: SubjectId): { unit: UnitDef; level: number } | null {
  const prog = kid.subjects[subject];
  const lvl = levelOf(subject, prog.level);
  const unit = lvl.units.find((u) => !prog.mastered.includes(unitKey(lvl.n, u.id)));
  if (unit) return { unit, level: lvl.n };
  return null;
}

/** How far through the whole subject (all levels' units) the kid is, 0..1 */
export function subjectCompletion(kid: Kid, subject: SubjectId): number {
  const levels = subjectById(subject).levels;
  const total = levels.reduce((n, l) => n + l.units.length, 0);
  return kid.subjects[subject].mastered.length / total;
}

/** Generate a full round of questions for a unit. */
export function buildRound(unit: UnitDef, masteredBefore: boolean): Question[] {
  const difficulty = masteredBefore ? 0.8 : 0.45;
  const qs: Question[] = [];
  if (unit.gen) {
    for (let i = 0; i < ROUND_SIZE; i++) {
      // ramp difficulty through the round — keeps the ~80-85% success zone
      qs.push(unit.gen(Math.min(1, difficulty + (i / ROUND_SIZE) * 0.4)));
    }
    return qs;
  }
  const bank = unit.bank ?? [];
  const picked = [...sample(bank, Math.min(bank.length, ROUND_SIZE))];
  while (picked.length < ROUND_SIZE && bank.length > 0) {
    picked.push(...sample(bank, Math.min(bank.length, ROUND_SIZE - picked.length)));
  }
  return picked.slice(0, ROUND_SIZE).map(staticQ);
}

/** Units due for spaced review today. */
export function dueReviews(kid: Kid, subject: SubjectId): string[] {
  const prog = kid.subjects[subject];
  const today = todayISO();
  return Object.entries(prog.review)
    .filter(([, r]) => r.due <= today)
    .map(([k]) => k);
}

export function totalDueReviews(kid: Kid): number {
  return (Object.keys(kid.subjects) as SubjectId[]).reduce(
    (n, s) => n + dueReviews(kid, s).length,
    0
  );
}

/** Build a mixed review round from due units. */
export function buildReviewRound(kid: Kid, subject: SubjectId): { questions: Question[]; units: string[] } {
  const due = dueReviews(kid, subject);
  const subjectDef = subjectById(subject);
  const units: UnitDef[] = [];
  for (const key of due) {
    const [lStr, uid] = key.split(":");
    const lvl = subjectDef.levels[parseInt(lStr.slice(1)) - 1];
    const u = lvl?.units.find((x) => x.id === uid);
    if (u) units.push(u);
  }
  if (units.length === 0) return { questions: [], units: [] };
  const questions: Question[] = [];
  let i = 0;
  while (questions.length < ROUND_SIZE) {
    const u = units[i % units.length];
    if (u.gen) questions.push(u.gen(0.7));
    else if (u.bank && u.bank.length) questions.push(staticQ(u.bank[Math.floor(Math.random() * u.bank.length)]));
    i++;
    if (i > 100) break;
  }
  return { questions: shuffle(questions).slice(0, ROUND_SIZE), units: due };
}

/** Placement ladder: 2 questions per level, climbing until they miss. */
export function buildPlacement(subject: SubjectId): { questions: Question[]; levels: number[] } {
  const def = subjectById(subject);
  const questions: Question[] = [];
  const levels: number[] = [];
  for (const lvl of def.levels) {
    for (let i = 0; i < 2; i++) {
      const u = lvl.units[i % lvl.units.length];
      const q = u.gen ? u.gen(0.5) : u.bank && u.bank.length ? staticQ(u.bank[Math.floor(Math.random() * u.bank.length)]) : null;
      if (q) {
        questions.push(q);
        levels.push(lvl.n);
      }
    }
  }
  return { questions, levels };
}

/**
 * Score a placement run: highest level where the kid got both questions right,
 * plus one if they did well above. Returns 1..maxLevel.
 */
export function scorePlacement(subject: SubjectId, levels: number[], correct: boolean[]): number {
  let placed = 1;
  const byLevel = new Map<number, boolean[]>();
  levels.forEach((l, i) => {
    byLevel.set(l, [...(byLevel.get(l) ?? []), correct[i]]);
  });
  for (const [lvl, results] of [...byLevel.entries()].sort((a, b) => a[0] - b[0])) {
    const right = results.filter(Boolean).length;
    if (right === results.length) placed = lvl;
    else if (right >= results.length / 2 && placed === lvl - 1) placed = lvl;
    else break;
  }
  return Math.min(placed, maxLevel(subject));
}

/** Age → starting level guess (before placement): K≈5yo → L1 … 10yo → L6 */
export function guessLevelFromAge(born?: number): number {
  if (!born) return 1;
  const age = new Date().getFullYear() - born;
  return Math.min(6, Math.max(1, age - 4));
}

export const isMastery = (correct: number, total: number) =>
  total > 0 && correct / total >= MASTERY_PCT;

/**
 * Suggested plan for today's blocks. Math and reading run every day (Alpha's
 * core); the remaining slots rotate through the other subjects by day of week
 * so every subject comes around regularly.
 */
export function todaysPlan(kid: Kid, blocks: number): SubjectId[] {
  const daily: SubjectId[] = ["math", "reading"];
  const rotating: SubjectId[] = ["spanish", "science", "history", "geography", "music"];
  const day = new Date().getDay();
  const spun = [...rotating.slice(day % rotating.length), ...rotating.slice(0, day % rotating.length)];
  return [...daily, ...spun].slice(0, Math.max(blocks, daily.length));
}

export function accuracyLastNDays(prog: SubjectProgress, days: number): number | null {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cut = cutoff.toISOString().slice(0, 10);
  const rounds = prog.history.filter((r) => r.date >= cut);
  const total = rounds.reduce((n, r) => n + r.total, 0);
  if (!total) return null;
  return rounds.reduce((n, r) => n + r.correct, 0) / total;
}
