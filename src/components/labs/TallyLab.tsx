import { useState } from "react";
import { BigButton } from "../Ui";
import { LabFrame, Verdict } from "./dragkit";
import { coachFor } from "../../lib/coaches";
import { pick, rnd } from "../../lib/rand";
import { speak } from "../../lib/speech";

const COLOR = "#7c3aed";
const SOFT = "#f5f3ff";
const VOICE = coachFor("math").voice;

/**
 * Draws tally marks the way they are actually written: four uprights, then a
 * fifth laid diagonally across the bundle. Counting by fives is the whole
 * point of the notation, so the bundles are drawn with gaps between them.
 */
export function Tallies({ n, size = 54 }: { n: number; size?: number }) {
  const bundles = Math.floor(n / 5);
  const rest = n % 5;
  const h = size;
  const w = size * 0.74;
  const Bundle = ({ count, slash }: { count: number; slash: boolean }) => (
    <svg width={w} height={h} viewBox="0 0 40 54" className="shrink-0">
      {Array.from({ length: count }, (_, i) => (
        <line
          key={i}
          x1={6 + i * 8}
          y1={5}
          x2={6 + i * 8}
          y2={49}
          stroke={COLOR}
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}
      {slash && <line x1={2} y1={47} x2={38} y2={7} stroke={COLOR} strokeWidth="4" strokeLinecap="round" />}
    </svg>
  );
  return (
    <div className="flex flex-wrap items-end justify-center gap-x-4 gap-y-2">
      {Array.from({ length: bundles }, (_, i) => (
        <div key={i} className="flex flex-col items-center">
          <Bundle count={4} slash />
          <span className="text-xs font-black" style={{ color: COLOR }}>{(i + 1) * 5}</span>
        </div>
      ))}
      {rest > 0 && (
        <div className="flex flex-col items-center">
          <Bundle count={rest} slash={false} />
          <span className="text-xs font-black" style={{ color: COLOR }}>{bundles * 5 + rest}</span>
        </div>
      )}
      {n === 0 && <span className="text-gray-300 font-black py-6">no marks yet</span>}
    </div>
  );
}

/* ═══════════ Level 1 · read the tallies ═══════════ */
function ReadTallies({ onScore }: { onScore: (ok: boolean) => void }) {
  const [n, setN] = useState(() => rnd(3, 23));
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const check = () => {
    const ok = parseInt(answer, 10) === n;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(ok ? `Yes, ${n}!` : `Count the bundles by five, then add the extras.`, VOICE);
    if (ok) setTimeout(() => { setN(rnd(3, 23)); setAnswer(""); setState("idle"); }, 1300);
  };
  return (
    <LabFrame
      title="How many?"
      sub="Each bundle with a slash is five. Count the bundles by 5s, then add the leftovers."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict state={state} right={`${n} — exactly!`} wrong="Count the bundles by fives first." />
          <div className="flex gap-2 mt-3">
            <input
              value={answer}
              onChange={(e) => { setAnswer(e.target.value.replace(/\D/g, "").slice(0, 2)); setState("idle"); }}
              onKeyDown={(e) => e.key === "Enter" && answer && check()}
              inputMode="numeric"
              placeholder="how many?"
              className="flex-1 text-center text-2xl font-black rounded-2xl px-4 py-3 outline-none"
              style={{ border: `4px solid ${COLOR}44` }}
            />
            <BigButton onClick={check} color={COLOR} disabled={!answer}>Check</BigButton>
          </div>
        </>
      }
    >
      <Tallies n={n} />
    </LabFrame>
  );
}

/* ═══════════ Level 2 · make the tallies ═══════════ */
function MakeTallies({ onScore }: { onScore: (ok: boolean) => void }) {
  const [goal, setGoal] = useState(() => rnd(4, 22));
  const [n, setN] = useState(0);
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const check = () => {
    const ok = n === goal;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(ok ? `Perfect, ${goal} marks.` : `You made ${n}. You need ${goal}.`, VOICE);
    if (ok) setTimeout(() => { setGoal(rnd(4, 22)); setN(0); setState("idle"); }, 1300);
  };
  return (
    <LabFrame
      title={`Tally ${goal}`}
      sub="Tap to add a mark. Every fifth one lies across the bundle."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict state={state} right={`${goal} marks — just right!`} wrong={`You have ${n}. Keep going or take one off.`} />
          <div className="grid grid-cols-2 gap-2 mt-3">
            <BigButton onClick={() => { setN((x) => x + 1); setState("idle"); }} color={COLOR}>
              ➕ Add a mark
            </BigButton>
            <BigButton onClick={() => { setN((x) => Math.max(0, x - 1)); setState("idle"); }} color="#6b7280">
              ➖ Take one off
            </BigButton>
          </div>
          <BigButton onClick={check} color={COLOR} className="w-full mt-2" disabled={n === 0}>
            Check my tallies ✏️
          </BigButton>
        </>
      }
    >
      <Tallies n={n} />
      <div className="text-center font-black text-lg mt-2" style={{ color: COLOR }}>
        {n} mark{n === 1 ? "" : "s"}
      </div>
    </LabFrame>
  );
}

/* ═══════════ Level 3 · tally a survey ═══════════ */
const SURVEYS = [
  { q: "Favourite fruit", items: [["🍎", "apples"], ["🍌", "bananas"], ["🍇", "grapes"]] },
  { q: "Favourite pet", items: [["🐶", "dogs"], ["🐱", "cats"], ["🐠", "fish"]] },
  { q: "Favourite colour", items: [["🔴", "red"], ["🔵", "blue"], ["🟢", "green"]] },
  { q: "Weather this week", items: [["☀️", "sunny"], ["🌧️", "rainy"], ["☁️", "cloudy"]] },
] as const;

function TallySurvey({ onScore }: { onScore: (ok: boolean) => void }) {
  const make = () => {
    const s = pick(SURVEYS as unknown as (typeof SURVEYS)[number][]);
    const counts = s.items.map(() => rnd(2, 12));
    return { s, counts };
  };
  const [{ s, counts }, setRound] = useState(make);
  const [qi] = useState(() => rnd(0, 2));
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");

  // ask either a row total or a "how many more" comparison
  const compareMode = qi === 2;
  const a = 0;
  const b = 1;
  const correct = compareMode ? Math.abs(counts[a] - counts[b]) : counts[qi];
  const question = compareMode
    ? `How many MORE ${s.items[counts[a] >= counts[b] ? a : b][1]} than ${s.items[counts[a] >= counts[b] ? b : a][1]}?`
    : `How many ${s.items[qi][1]}?`;

  const check = () => {
    const ok = parseInt(answer, 10) === correct;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(ok ? "That's it!" : compareMode ? "How many more means subtract." : "Count that row by fives.", VOICE);
    if (ok) setTimeout(() => { setRound(make()); setAnswer(""); setState("idle"); }, 1500);
  };

  return (
    <LabFrame
      title={s.q}
      sub="A tally chart turns counting into a picture you can read at a glance."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict state={state} right={`${correct} — nice reading!`} wrong={compareMode ? "Subtract the smaller row from the bigger one." : "Count that row by fives."} />
          <div className="font-black text-gray-700 mt-3">{question}</div>
          <div className="flex gap-2 mt-2">
            <input
              value={answer}
              onChange={(e) => { setAnswer(e.target.value.replace(/\D/g, "").slice(0, 2)); setState("idle"); }}
              onKeyDown={(e) => e.key === "Enter" && answer && check()}
              inputMode="numeric"
              placeholder="answer"
              className="flex-1 text-center text-2xl font-black rounded-2xl px-4 py-3 outline-none"
              style={{ border: `4px solid ${COLOR}44` }}
            />
            <BigButton onClick={check} color={COLOR} disabled={!answer}>Check</BigButton>
          </div>
        </>
      }
    >
      <div className="space-y-2">
        {s.items.map(([emoji, name], i) => (
          <div key={name} className="rounded-2xl bg-white p-2.5 flex items-center gap-3" style={{ border: `3px solid ${COLOR}22` }}>
            <div className="w-24 shrink-0 flex items-center gap-1.5">
              <span className="text-2xl">{emoji}</span>
              <span className="font-black text-xs text-gray-600 capitalize">{name}</span>
            </div>
            <div className="flex-1 min-w-0 overflow-x-auto">
              <Tallies n={counts[i]} size={34} />
            </div>
          </div>
        ))}
      </div>
    </LabFrame>
  );
}

export const TALLY_LEVELS = [
  { id: "read", title: "Read the Tallies", emoji: "👀", blurb: "Count bundles of five", Comp: ReadTallies },
  { id: "make", title: "Make the Tallies", emoji: "✏️", blurb: "Tap to draw the marks yourself", Comp: MakeTallies },
  { id: "survey", title: "Tally Chart", emoji: "📊", blurb: "Read a real tally chart", Comp: TallySurvey },
];
