import { buildStories, type FluencyStory } from "./types";
import { STAGES_1_4 } from "./stories1";
import { STAGES_5_8 } from "./stories2";

export * from "./types";

export const FLUENCY_STAGES = [...STAGES_1_4, ...STAGES_5_8];
export const FLUENCY_STORIES: FluencyStory[] = buildStories(FLUENCY_STAGES);

export const storyByNumber = (n: number): FluencyStory | undefined =>
  FLUENCY_STORIES.find((s) => s.n === n);

export const TOTAL_STORIES = FLUENCY_STORIES.length;
