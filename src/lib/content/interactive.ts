import { sample } from "../rand";
import type { SubjectId, UnitDef } from "../types";
import { MATH_INTERACTIVE, type IStep } from "./mathInteractive";
import { READING_INTERACTIVE } from "./readingInteractive";
import { SPANISH_INTERACTIVE } from "./spanishInteractive";
import { MUSIC_INTERACTIVE } from "./musicInteractive";
import { SCIENCE_INTERACTIVE } from "./scienceInteractive";
import { HISTORY_INTERACTIVE } from "./historyInteractive";
import { GEOGRAPHY_INTERACTIVE } from "./geographyInteractive";
import { SPANISH_VOCAB } from "./spanish";

const LESSONS: Record<SubjectId, Record<string, IStep[]>> = {
  math: MATH_INTERACTIVE,
  reading: READING_INTERACTIVE,
  spanish: SPANISH_INTERACTIVE,
  music: MUSIC_INTERACTIVE,
  science: SCIENCE_INTERACTIVE,
  history: HISTORY_INTERACTIVE,
  geography: GEOGRAPHY_INTERACTIVE,
};

/**
 * Interactive concept lessons for every subject. Each unit has a hand-authored
 * explore stage; if one is ever missing we fall back to auto-built study cards
 * so no unit is left without a lesson.
 */
export function interactiveFor(subject: SubjectId, unit: UnitDef): IStep[] | null {
  const authored = LESSONS[subject]?.[unit.id];
  if (authored) return authored;

  // --- fallbacks ---
  if (subject === "spanish") {
    const vocab = SPANISH_VOCAB[unit.id];
    if (vocab) {
      const cards = sample(vocab, Math.min(6, vocab.length)).map(([es, en]) => ({
        front: es,
        back: en,
        say: `${es}. ${es}!`,
        lang: "es-ES",
      }));
      return [
        { kind: "say", text: `¡Hola mi amor! New words today: ${unit.title}! First we LISTEN — tap every card to hear me say it. I say everything twice, it's my thing. Repeat after me with FEELING!` },
        { kind: "cards", text: "Tap each card — say it out loud after me, twice!", cards },
      ];
    }
  }

  if (!unit.bank?.length) return null;
  const cards = sample(unit.bank, Math.min(5, unit.bank.length)).map((q) => ({
    front: q.p,
    back: q.a,
    say: q.a,
  }));
  return [
    { kind: "say", text: `Let's study ${unit.title} before we practice! Tap each card, read it, and say the answer out loud.` },
    { kind: "cards", text: "Study each card!", cards },
  ];
}
