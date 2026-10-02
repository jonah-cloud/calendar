/**
 * Daily fluency stories.
 *
 * These are DECODABLE texts: every story is written so a child can sound out
 * almost every word using the phonics patterns taught up to that point, plus a
 * small, slowly growing set of high-frequency words. That is what makes
 * repeated reading work — the child is practising speed on words they can
 * already decode, not guessing at words they have never been taught.
 */

export interface FluencyStory {
  /** lesson number, 1-based across the whole programme */
  n: number;
  title: string;
  /** the grapheme(s) this story drills, e.g. "sh" or "a_e" */
  focus: string;
  /** what to call it out loud, e.g. "the /sh/ sound" */
  focusLabel: string;
  /** the target words — highlighted in the text and previewed first */
  words: string[];
  /** the story, one sentence per line */
  lines: string[];
  stage: number;
  stageTitle: string;
  stageEmoji: string;
  /** computed */
  wordCount: number;
}

export interface FluencyStage {
  title: string;
  emoji: string;
  color: string;
  soft: string;
  /** [title, focus, focusLabel, words, lines] */
  rows: [string, string, string, string[], string[]][];
}

export function buildStories(stages: FluencyStage[]): FluencyStory[] {
  const out: FluencyStory[] = [];
  let n = 0;
  stages.forEach((st, si) => {
    for (const [title, focus, focusLabel, words, lines] of st.rows) {
      n += 1;
      out.push({
        n,
        title,
        focus,
        focusLabel,
        words,
        lines,
        stage: si + 1,
        stageTitle: st.title,
        stageEmoji: st.emoji,
        wordCount: lines.join(" ").split(/\s+/).filter(Boolean).length,
      });
    }
  });
  return out;
}
