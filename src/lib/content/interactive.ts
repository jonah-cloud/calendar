import { sample } from "../rand";
import type { SubjectId, UnitDef } from "../types";
import { MATH_INTERACTIVE, type IStep } from "./mathInteractive";
import { READING_INTERACTIVE } from "./readingInteractive";
import { SPANISH_VOCAB } from "./spanish";

/**
 * Interactive concept lessons across all subjects.
 *  - math:    hand-built manipulative lessons (MATH_INTERACTIVE)
 *  - reading: hand-built lessons starting from letter recognition
 *  - spanish: listen-first flip cards auto-built from each unit's vocabulary —
 *             Lola speaks the Spanish out loud
 *  - music/science: study-cards auto-built from the unit's question bank
 */
export function interactiveFor(subject: SubjectId, unit: UnitDef): IStep[] | null {
  if (subject === "math") return MATH_INTERACTIVE[unit.id] ?? null;
  if (subject === "reading") return READING_INTERACTIVE[unit.id] ?? null;

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
        {
          kind: "say",
          text: `¡Hola mi amor! New words today: ${unit.title}! First we LISTEN — tap every card to hear me say it (I say everything twice, it's my thing). Flip it to see what it means. Repeat after me with FEELING!`,
        },
        { kind: "cards", text: "Tap each card — say it out loud after me, twice!", cards },
        {
          kind: "say",
          text: "¡Fantástico! You sound wonderful. Now let's see what stuck — no rush, I'm right here with my dramatic hints.",
        },
      ];
    }
    if (unit.bank?.length) {
      const cards = sample(unit.bank, Math.min(5, unit.bank.length)).map((q) => ({
        front: q.p,
        back: q.a,
        say: `${q.a}`,
      }));
      return [
        {
          kind: "say",
          text: `¡Momentito! Before we quiz, we STUDY — like the telenovela stars study their lines. Tap each card, read it, flip it, say the answer out loud. Twice, obviamente.`,
        },
        { kind: "cards", text: "Study your lines, mi estrella!", cards },
      ];
    }
    return null;
  }

  // music & science: study cards from the bank
  if (!unit.bank?.length) return null;
  const cards = sample(unit.bank, Math.min(5, unit.bank.length)).map((q) => ({
    front: q.p,
    back: q.a,
    say: q.a,
  }));
  if (subject === "music") {
    return [
      {
        kind: "say",
        text: `Ah, ${unit.title} — one of my favorite subjects, dahling. A maestro always rehearses BEFORE the performance. Tap each card to study it, flip for the answer, and say it with flair.`,
      },
      { kind: "cards", text: "Rehearse, my student, rehearse!", cards },
      { kind: "say", text: "Bravo, the rehearsal is complete. Now — the performance! No stage fright; I knocked the metronome off the table so nothing can rush you." },
    ];
  }
  return [
    {
      kind: "say",
      text: `Lab briefing time! Today's experiment: ${unit.title}. Step one: study the facts — real scientists read the manual first. (I usually don't. It usually explodes.) Tap each card!`,
    },
    { kind: "cards", text: "Study the lab manual — tap and flip each card!", cards },
    { kind: "say", text: "Briefing complete! Goggles on. Let's test that big brain of yours — and remember, wrong guesses are just experiments with extra steps." },
  ];
}
