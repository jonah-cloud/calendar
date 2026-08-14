import React, { createContext, useContext, useEffect, useReducer } from "react";
import type { AppState, Kid, Redemption, Reward, RoundResult, SubjectId } from "./types";
import { SUBJECTS } from "./content";
import { addDays, todayISO, uid } from "./rand";
import { isMastery } from "./engine";

const KEY = "spark-academy-v1";

export const KID_THEMES = [
  { emoji: "🦄", color: "#ec4899" },
  { emoji: "🦋", color: "#8b5cf6" },
  { emoji: "🌟", color: "#f59e0b" },
  { emoji: "🐬", color: "#06b6d4" },
  { emoji: "🌈", color: "#10b981" },
  { emoji: "🍓", color: "#ef4444" },
];

export function newKid(name: string, born: number | undefined, idx: number): Kid {
  const theme = KID_THEMES[idx % KID_THEMES.length];
  const subjects = {} as Kid["subjects"];
  for (const s of SUBJECTS) {
    subjects[s.id] = { level: 1, placed: false, mastered: [], review: {}, history: [] };
  }
  return {
    id: uid(),
    name,
    emoji: theme.emoji,
    color: theme.color,
    born,
    bucks: 0,
    ledger: [],
    streak: { count: 0, last: "" },
    subjects,
    days: {},
    redemptions: [],
    workshops: [],
  };
}

const DEFAULT_REWARDS: Reward[] = [
  { id: "r1", label: "Pick what's for dinner", emoji: "🍝", cost: 60 },
  { id: "r2", label: "Stay up 30 minutes late", emoji: "🌙", cost: 75 },
  { id: "r3", label: "Ice cream trip", emoji: "🍦", cost: 100 },
  { id: "r4", label: "Movie night (your pick!)", emoji: "🎬", cost: 150 },
  { id: "r5", label: "$5 spending money", emoji: "💵", cost: 250 },
  { id: "r6", label: "Special day out with Mom or Dad", emoji: "🎡", cost: 400 },
];

const initialState: AppState = {
  version: 1,
  kids: [],
  settings: { blockMinutes: 15, blocksPerDay: 4, pin: null, rewards: DEFAULT_REWARDS },
};

function load(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as AppState;
    if (!parsed.kids) return initialState;
    // ensure any newly added subjects exist on old saves
    for (const kid of parsed.kids) {
      for (const s of SUBJECTS) {
        if (!kid.subjects[s.id]) {
          kid.subjects[s.id] = { level: 1, placed: false, mastered: [], review: {}, history: [] };
        }
      }
    }
    return parsed;
  } catch {
    return initialState;
  }
}

// ---------- Actions ----------

export type Action =
  | { type: "ADD_KID"; name: string; born?: number }
  | { type: "RENAME_KID"; kidId: string; name: string }
  | { type: "REMOVE_KID"; kidId: string }
  | { type: "SET_SETTINGS"; patch: Partial<AppState["settings"]> }
  | { type: "ADD_REWARD"; reward: Reward }
  | { type: "REMOVE_REWARD"; rewardId: string }
  | { type: "SET_PLACED"; kidId: string; subject: SubjectId; level: number }
  | {
      type: "ROUND_DONE";
      kidId: string;
      subject: SubjectId;
      unitKey: string; // "L2:animals" | "review" | "placement"
      correct: number;
      total: number;
      minutes: number;
      mode: "learn" | "review" | "placement";
      reviewedUnits?: string[];
    }
  | { type: "REDEEM"; kidId: string; rewardId: string }
  | { type: "RESOLVE_REDEMPTION"; kidId: string; redemptionId: string; approve: boolean }
  | { type: "WORKSHOP_DONE"; kidId: string; workshopId: string; bucks: number; title: string }
  | { type: "WORKSHOP_APPROVE"; kidId: string; workshopId: string; bucks: number; title: string }
  | { type: "RESET_ALL" };

function updateKid(state: AppState, kidId: string, fn: (k: Kid) => Kid): AppState {
  return { ...state, kids: state.kids.map((k) => (k.id === kidId ? fn(k) : k)) };
}

function earn(kid: Kid, amount: number, label: string): Kid {
  if (amount === 0) return kid;
  return {
    ...kid,
    bucks: kid.bucks + amount,
    ledger: [{ date: todayISO(), label, amount }, ...kid.ledger].slice(0, 200),
  };
}

function bumpStreak(kid: Kid): Kid {
  const today = todayISO();
  if (kid.streak.last === today) return kid;
  const yesterday = addDays(today, -1);
  const count = kid.streak.last === yesterday ? kid.streak.count + 1 : 1;
  let k = { ...kid, streak: { count, last: today } };
  if (count > 0 && count % 5 === 0) {
    k = earn(k, 25, `🔥 ${count}-day streak bonus!`);
  }
  return k;
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "ADD_KID":
      return { ...state, kids: [...state.kids, newKid(action.name, action.born, state.kids.length)] };
    case "RENAME_KID":
      return updateKid(state, action.kidId, (k) => ({ ...k, name: action.name }));
    case "REMOVE_KID":
      return { ...state, kids: state.kids.filter((k) => k.id !== action.kidId) };
    case "SET_SETTINGS":
      return { ...state, settings: { ...state.settings, ...action.patch } };
    case "ADD_REWARD":
      return { ...state, settings: { ...state.settings, rewards: [...state.settings.rewards, action.reward] } };
    case "REMOVE_REWARD":
      return {
        ...state,
        settings: { ...state.settings, rewards: state.settings.rewards.filter((r) => r.id !== action.rewardId) },
      };
    case "SET_PLACED":
      return updateKid(state, action.kidId, (k) => ({
        ...k,
        subjects: {
          ...k.subjects,
          [action.subject]: { ...k.subjects[action.subject], placed: true, level: action.level },
        },
      }));
    case "ROUND_DONE": {
      return updateKid(state, action.kidId, (kid) => {
        const prog = kid.subjects[action.subject];
        const mastered = isMastery(action.correct, action.total);
        const result: RoundResult = {
          date: todayISO(),
          subject: action.subject,
          unitKey: action.unitKey,
          correct: action.correct,
          total: action.total,
          mastered,
          minutes: action.minutes,
          mode: action.mode,
        };
        let newProg = { ...prog, history: [...prog.history, result].slice(-500) };

        let bucksEarned = action.correct; // 1 buck per correct answer
        let label = `${action.subject}: ${action.correct}/${action.total} correct`;

        if (action.mode === "learn" && mastered && action.unitKey !== "review") {
          if (!newProg.mastered.includes(action.unitKey)) {
            newProg = {
              ...newProg,
              mastered: [...newProg.mastered, action.unitKey],
              review: {
                ...newProg.review,
                [action.unitKey]: { due: addDays(todayISO(), 2), interval: 2 },
              },
            };
            bucksEarned += 10;
            label = `⭐ Mastered a ${action.subject} unit! +10 bonus`;
          }
          // level up when all units at this level are mastered
          const lvlUnits = (SUBJECTS.find((s) => s.id === action.subject)!.levels[newProg.level - 1] ?? { units: [] }).units;
          const allDone = lvlUnits.every((u) => newProg.mastered.includes(`L${newProg.level}:${u.id}`));
          const maxLvl = SUBJECTS.find((s) => s.id === action.subject)!.levels.length;
          if (allDone && newProg.level < maxLvl) {
            newProg = { ...newProg, level: newProg.level + 1 };
            bucksEarned += 25;
            label = `🎉 LEVEL UP in ${action.subject}! +25 bonus`;
          }
        }

        if (action.mode === "review" && action.reviewedUnits) {
          const pass = action.total > 0 && action.correct / action.total >= 0.8;
          const review = { ...newProg.review };
          for (const uk of action.reviewedUnits) {
            const r = review[uk];
            if (!r) continue;
            review[uk] = pass
              ? { due: addDays(todayISO(), r.interval * 2), interval: Math.min(60, r.interval * 2) }
              : { due: addDays(todayISO(), 1), interval: 2 };
          }
          newProg = { ...newProg, review };
          if (pass) {
            bucksEarned += 5;
            label = `🔁 Review complete in ${action.subject}! +5 bonus`;
          }
        }

        // day log
        const today = todayISO();
        const day = kid.days[today] ?? { blocks: 0, masteredBlocks: 0, minutes: 0, bucksEarned: 0 };
        const isBlock = action.mode !== "placement";
        const newDay = {
          blocks: day.blocks + (isBlock ? 1 : 0),
          masteredBlocks: day.masteredBlocks + (isBlock && mastered ? 1 : 0),
          minutes: day.minutes + action.minutes,
          bucksEarned: day.bucksEarned + bucksEarned,
        };

        let k: Kid = {
          ...kid,
          subjects: { ...kid.subjects, [action.subject]: newProg },
          days: { ...kid.days, [today]: newDay },
        };
        k = earn(k, bucksEarned, label);

        // all-rings bonus
        const target = state.settings.blocksPerDay;
        if (isBlock && day.blocks + 1 === target) {
          k = earn(k, 20, "💍 All rings closed today! +20");
        }
        if (isBlock) k = bumpStreak(k);
        return k;
      });
    }
    case "REDEEM": {
      const reward = state.settings.rewards.find((r) => r.id === action.rewardId);
      if (!reward) return state;
      return updateKid(state, action.kidId, (kid) => {
        if (kid.bucks < reward.cost) return kid;
        const redemption: Redemption = {
          id: uid(),
          date: todayISO(),
          rewardId: reward.id,
          label: `${reward.emoji} ${reward.label}`,
          cost: reward.cost,
          status: "pending",
        };
        return {
          ...earn(kid, -reward.cost, `🎁 ${reward.label}`),
          redemptions: [redemption, ...kid.redemptions],
        };
      });
    }
    case "RESOLVE_REDEMPTION":
      return updateKid(state, action.kidId, (kid) => {
        const r = kid.redemptions.find((x) => x.id === action.redemptionId);
        if (!r) return kid;
        let k: Kid = {
          ...kid,
          redemptions: kid.redemptions.map((x) =>
            x.id === action.redemptionId ? { ...x, status: action.approve ? "approved" as const : "denied" as const } : x
          ),
        };
        if (!action.approve) k = earn(k, r.cost, `↩️ Refund: ${r.label}`);
        return k;
      });
    case "WORKSHOP_DONE":
      return updateKid(state, action.kidId, (kid) => {
        if (kid.workshops.some((w) => w.id === action.workshopId && w.date === todayISO())) return kid;
        return {
          ...kid,
          workshops: [{ id: action.workshopId, date: todayISO(), status: "pending" }, ...kid.workshops],
        };
      });
    case "WORKSHOP_APPROVE":
      return updateKid(state, action.kidId, (kid) => {
        const w = kid.workshops.find((x) => x.id === action.workshopId && x.status === "pending");
        if (!w) return kid;
        const wk = kid.workshops.map((x) => (x === w ? { ...x, status: "approved" as const } : x));
        return { ...earn(kid, action.bucks ?? 0, `🏕️ Workshop: ${action.title}`), workshops: wk };
      });
    case "RESET_ALL":
      return initialState;
    default:
      return state;
  }
}

// ---------- Context ----------

const StoreCtx = createContext<{ state: AppState; dispatch: React.Dispatch<Action> }>({
  state: initialState,
  dispatch: () => {},
});

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage full or unavailable */
    }
  }, [state]);
  return <StoreCtx.Provider value={{ state, dispatch }}>{children}</StoreCtx.Provider>;
}

export const useStore = () => useContext(StoreCtx);
