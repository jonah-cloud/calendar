/**
 * Grade-levelled fluency passages, in the Benchmark Advance shape:
 * a unit/week slot, a weekly phonics skill, a ten-word bank (five phonics
 * words + five high-frequency words), and a passage whose lines carry a
 * RUNNING word count — which is how oral reading fluency is actually scored.
 *
 * Each grade runs 10 units × 3 weeks = 30 weeks, so a child's position inside
 * a grade is meaningful: weeks 1–10 are fall, 11–20 winter, 21–30 spring, and
 * the words-correct-per-minute target moves with them.
 */

export type GradeId = "K" | "1" | "2" | "3" | "4" | "5";

/** [skill, phonicsWords(5), sightWords(5), lines] */
export type PassageRow = [string, string[], string[], string[]];

export interface GradeUnit {
  title: string;
  weeks: PassageRow[];
}

export interface GradeDef {
  id: GradeId;
  label: string;
  emoji: string;
  color: string;
  soft: string;
  /**
   * Words-correct-per-minute targets (Hasbrouck & Tindal oral reading fluency
   * norms, 50th percentile). Kindergarten is not normed on WCPM, so its
   * numbers are gentle decodable-text goals rather than a published benchmark.
   */
  wcpm: { fall: number; winter: number; spring: number };
  units: GradeUnit[];
}

export interface Passage {
  grade: GradeId;
  gradeLabel: string;
  /** 1..30 within the grade */
  week: number;
  unit: number;
  unitTitle: string;
  /** 1..3 within the unit */
  weekInUnit: number;
  skill: string;
  phonicsWords: string[];
  sightWords: string[];
  lines: string[];
  /** running total after each line, exactly like the printed passages */
  cum: number[];
  wordCount: number;
}

const countWords = (s: string) => s.split(/\s+/).filter(Boolean).length;

export function buildGrade(def: GradeDef): Passage[] {
  const out: Passage[] = [];
  let week = 0;
  def.units.forEach((unit, ui) => {
    unit.weeks.forEach((row, wi) => {
      week += 1;
      const [skill, phonicsWords, sightWords, lines] = row;
      const cum: number[] = [];
      let total = 0;
      for (const line of lines) {
        total += countWords(line);
        cum.push(total);
      }
      out.push({
        grade: def.id,
        gradeLabel: def.label,
        week,
        unit: ui + 1,
        unitTitle: unit.title,
        weekInUnit: wi + 1,
        skill,
        phonicsWords,
        sightWords,
        lines,
        cum,
        wordCount: total,
      });
    });
  });
  return out;
}

/** How many weeks a grade contains (3 per unit). */
export const weeksInGrade = (def: GradeDef): number => def.units.length * 3;

/**
 * The WCPM goal for a given week of a grade. The fall, winter and spring
 * benchmarks sit at the start, middle and end of the grade, and the target is
 * interpolated between them so it climbs week by week instead of jumping three
 * times a year.
 */
export function wcpmTarget(def: GradeDef, week: number): number {
  const total = weeksInGrade(def);
  const w = Math.max(1, Math.min(total, week));
  const { fall, winter, spring } = def.wcpm;
  // position through the grade, 0 at the first week and 1 at the last
  const t = total > 1 ? (w - 1) / (total - 1) : 0;
  if (t <= 0.5) return Math.round(fall + (winter - fall) * (t / 0.5));
  return Math.round(winter + (spring - winter) * ((t - 0.5) / 0.5));
}

/** Which part of the school year a week sits in, as a fraction of the grade. */
export function seasonOf(def: GradeDef, week: number): "Fall" | "Winter" | "Spring" {
  const total = weeksInGrade(def);
  const t = (week - 1) / Math.max(1, total - 1);
  return t < 1 / 3 ? "Fall" : t < 2 / 3 ? "Winter" : "Spring";
}
