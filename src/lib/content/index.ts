import type { SubjectDef, SubjectId } from "../types";
import { MATH_LEVELS } from "./math";
import { READING_LEVELS } from "./reading";
import { SPANISH_LEVELS } from "./spanish";
import { MUSIC_LEVELS } from "./music";
import { SCIENCE_LEVELS } from "./science";

export const SUBJECTS: SubjectDef[] = [
  { id: "math", name: "Math", emoji: "🔢", color: "#2563eb", soft: "#dbeafe", levels: MATH_LEVELS },
  { id: "reading", name: "Reading", emoji: "📚", color: "#db2777", soft: "#fce7f3", levels: READING_LEVELS },
  { id: "spanish", name: "Spanish", emoji: "🌮", color: "#ea580c", soft: "#ffedd5", levels: SPANISH_LEVELS },
  { id: "music", name: "Music", emoji: "🎵", color: "#7c3aed", soft: "#ede9fe", levels: MUSIC_LEVELS },
  { id: "science", name: "Science", emoji: "🔬", color: "#059669", soft: "#d1fae5", levels: SCIENCE_LEVELS },
];

export const subjectById = (id: SubjectId): SubjectDef =>
  SUBJECTS.find((s) => s.id === id)!;

export const MASTERY_PCT = 0.9; // Alpha-style: 90% to master
export const REVIEW_PASS_PCT = 0.8;
export const ROUND_SIZE = 10; // 10 questions; 9/10 = mastery
