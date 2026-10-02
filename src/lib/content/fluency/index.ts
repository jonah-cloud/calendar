import { buildGrade, weeksInGrade, type GradeDef, type GradeId, type Passage } from "./types";
import { GRADE_K } from "./gradeK";
import { GRADE_1 } from "./grade1";
import { GRADE_2 } from "./grade2";
import { GRADE_3 } from "./grade3";
import { GRADE_4, GRADE_5 } from "./grade45";

export * from "./types";

export const GRADES: GradeDef[] = [GRADE_K, GRADE_1, GRADE_2, GRADE_3, GRADE_4, GRADE_5];

export const GRADE_BY_ID: Record<GradeId, GradeDef> = Object.fromEntries(
  GRADES.map((g) => [g.id, g])
) as Record<GradeId, GradeDef>;

export const PASSAGES: Record<GradeId, Passage[]> = Object.fromEntries(
  GRADES.map((g) => [g.id, buildGrade(g)])
) as Record<GradeId, Passage[]>;

export const gradeDef = (id: GradeId): GradeDef => GRADE_BY_ID[id];

export const passageAt = (grade: GradeId, week: number): Passage | undefined =>
  PASSAGES[grade]?.find((p) => p.week === week);

export const weeksIn = (grade: GradeId): number => weeksInGrade(GRADE_BY_ID[grade]);

/** The grade that follows this one, or null at the end of the programme. */
export function nextGrade(grade: GradeId): GradeId | null {
  const i = GRADES.findIndex((g) => g.id === grade);
  return i >= 0 && i + 1 < GRADES.length ? GRADES[i + 1].id : null;
}

/** How far through a grade a week sits, as a percentage. */
export const percentThroughGrade = (grade: GradeId, week: number): number =>
  Math.min(100, Math.round(((week - 1) / weeksIn(grade)) * 100));

export const TOTAL_PASSAGES = GRADES.reduce((n, g) => n + weeksInGrade(g), 0);
