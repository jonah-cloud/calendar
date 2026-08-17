// ---------- Content model ----------

export type SubjectId = "math" | "reading" | "spanish" | "music" | "science";

export interface Question {
  prompt: string;
  /** Optional big visual line above the prompt (emoji art, notes, etc.) */
  visual?: string;
  choices: string[];
  answer: number; // index into choices
  explain?: string;
  /** Step-by-step walkthrough the animal coach gives after a wrong answer. */
  steps?: string[];
}

/** A static authored question: prompt, correct answer, wrong answers. */
export interface StaticQ {
  p: string;
  v?: string;
  a: string;
  w: string[];
  x?: string;
}

export interface UnitDef {
  id: string;
  title: string;
  emoji: string;
  /** Procedural generator (math etc). difficulty 0..1 within the unit. */
  gen?: (difficulty: number) => Question;
  /** Authored bank; questions are sampled + choices shuffled. */
  bank?: StaticQ[];
}

export interface LevelDef {
  n: number; // 1-based level number
  name: string; // "Level 2 · Explorer"
  units: UnitDef[];
}

export interface SubjectDef {
  id: SubjectId;
  name: string;
  emoji: string;
  /** tailwind-ish hues used inline */
  color: string; // main hex
  soft: string; // soft bg hex
  levels: LevelDef[];
}

// ---------- Progress / persistence model ----------

export interface RoundResult {
  date: string; // ISO date
  subject: SubjectId;
  unitKey: string; // "L2:animals" or "placement" / "review"
  correct: number;
  total: number;
  mastered: boolean;
  minutes: number;
  mode: "learn" | "review" | "placement";
  /** Average ms per answer — used to track math-fact fluency. */
  avgMs?: number;
}

export interface SubjectProgress {
  level: number; // current working level (1-based)
  placed: boolean; // has taken placement
  mastered: string[]; // unit keys "L1:counting"
  /** spaced repetition: unitKey -> { due: ISO date, interval: days } */
  review: Record<string, { due: string; interval: number }>;
  history: RoundResult[];
}

export interface DayLog {
  blocks: number; // completed focus blocks today
  masteredBlocks: number; // blocks completed at >=90%
  minutes: number;
  bucksEarned: number;
}

export interface LedgerEntry {
  date: string;
  label: string;
  amount: number; // + earn, - spend
}

export interface Redemption {
  id: string;
  date: string;
  rewardId: string;
  label: string;
  cost: number;
  status: "pending" | "approved" | "denied";
}

export interface WorkshopDone {
  id: string;
  date: string;
  status: "pending" | "approved";
}

export interface Kid {
  id: string;
  name: string;
  emoji: string;
  color: string; // hex
  born?: number; // birth year, used for initial level guess
  bucks: number;
  ledger: LedgerEntry[];
  streak: { count: number; last: string };
  subjects: Record<SubjectId, SubjectProgress>;
  days: Record<string, DayLog>;
  redemptions: Redemption[];
  workshops: WorkshopDone[];
}

export interface Reward {
  id: string;
  label: string;
  emoji: string;
  cost: number;
}

export interface Settings {
  blockMinutes: number; // focus block length
  blocksPerDay: number; // rings to close per day
  pin: string | null; // guide dashboard pin
  rewards: Reward[];
}

export interface AppState {
  version: number;
  kids: Kid[];
  settings: Settings;
}
