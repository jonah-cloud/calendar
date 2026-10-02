import { useState } from "react";
import { BigButton } from "../Ui";
import { LabFrame, Verdict, useDragToTray } from "./dragkit";
import { coachFor } from "../../lib/coaches";
import { pick, rnd } from "../../lib/rand";
import { speak } from "../../lib/speech";

const COLOR = "#ea580c";
const SOFT = "#fff7ed";
const VOICE = coachFor("math").voice;

/** Non-standard units, the kind you lay end to end along an object. */
const UNITS = [
  { id: "clip", emoji: "📎", name: "paperclips", w: 30 },
  { id: "cube", emoji: "🟦", name: "cubes", w: 28 },
  { id: "bear", emoji: "🧸", name: "bears", w: 32 },
] as const;

const THINGS = [
  { emoji: "✏️", name: "pencil" },
  { emoji: "🖍️", name: "crayon" },
  { emoji: "🥕", name: "carrot" },
  { emoji: "🔑", name: "key" },
  { emoji: "🪥", name: "toothbrush" },
  { emoji: "🥄", name: "spoon" },
] as const;

const TALL_THINGS = [
  { emoji: "🏰", name: "sandcastle" },
  { emoji: "🌻", name: "sunflower" },
  { emoji: "🧍", name: "person" },
  { emoji: "🌲", name: "tree" },
  { emoji: "🏠", name: "house" },
] as const;

/* ═══════════ Level 1 · longer, shorter, taller ═══════════ */
function CompareTwo({ onScore }: { onScore: (ok: boolean) => void }) {
  const make = () => {
    const tall = Math.random() < 0.5;
    const pool = tall ? TALL_THINGS : THINGS;
    const a = pick(pool as unknown as { emoji: string; name: string }[]);
    let b = pick(pool as unknown as { emoji: string; name: string }[]);
    while (b.name === a.name) b = pick(pool as unknown as { emoji: string; name: string }[]);
    const sizeA = rnd(50, 130);
    let sizeB = rnd(50, 130);
    while (Math.abs(sizeB - sizeA) < 22) sizeB = rnd(50, 130);
    // ask for the bigger one about half the time
    const askBigger = Math.random() < 0.5;
    return { tall, a, b, sizeA, sizeB, askBigger };
  };
  const [r, setR] = useState(make);
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");

  const word = r.tall ? (r.askBigger ? "taller" : "shorter") : r.askBigger ? "longer" : "shorter";
  const winner = r.askBigger ? (r.sizeA > r.sizeB ? "a" : "b") : r.sizeA < r.sizeB ? "a" : "b";

  const answer = (which: "a" | "b") => {
    const ok = which === winner;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(ok ? "That's right!" : `Look again — which one is ${word}?`, VOICE);
    if (ok) setTimeout(() => { setR(make()); setState("idle"); }, 1300);
  };

  const Item = ({ it, size, tag, onClick }: { it: { emoji: string; name: string }; size: number; tag: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="flex-1 rounded-2xl bg-white p-3 btn-soft flex flex-col items-center justify-end"
      style={{ border: `3px solid ${COLOR}33`, minHeight: 170 }}
    >
      <span style={{ fontSize: size }} className="leading-none">{it.emoji}</span>
      <span className="font-black text-sm mt-2" style={{ color: COLOR }}>{tag}</span>
      <span className="text-xs font-bold text-gray-400 capitalize">{it.name}</span>
    </button>
  );

  return (
    <LabFrame
      title={`Which is ${word}?`}
      sub={r.tall ? "Taller means it covers more height." : "Longer means it covers more distance."}
      color={COLOR}
      soft={SOFT}
      footer={<Verdict state={state} right="Exactly right!" wrong={`Compare them again — which covers ${r.askBigger ? "more" : "less"}?`} />}
    >
      <div className="flex gap-3 items-end">
        <Item it={r.a} size={r.sizeA} tag="A" onClick={() => answer("a")} />
        <Item it={r.b} size={r.sizeB} tag="B" onClick={() => answer("b")} />
      </div>
      <div className="text-center text-xs font-black text-gray-400 mt-2">tap the one that is {word}</div>
    </LabFrame>
  );
}

/* ═══════════ Level 2 · lay the units end to end ═══════════ */
function LayUnits({ onScore }: { onScore: (ok: boolean) => void }) {
  const make = () => ({
    unit: pick(UNITS as unknown as (typeof UNITS)[number][]),
    thing: pick(THINGS as unknown as { emoji: string; name: string }[]),
    len: rnd(3, 8),
  });
  const [r, setR] = useState(make);
  const [laid, setLaid] = useState(0);
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const { start, trayRef, Ghost } = useDragToTray<number>(() => {
    setLaid((n) => n + 1);
    setState("idle");
  });

  const barW = r.len * r.unit.w;

  const check = () => {
    const ok = laid === r.len;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(
      ok
        ? `Yes! The ${r.thing.name} is ${r.len} ${r.unit.name} long.`
        : laid > r.len
        ? "Too many — they must stop at the end of the object."
        : "Keep going until you reach the other end.",
      VOICE
    );
    if (ok) setTimeout(() => { setR(make()); setLaid(0); setState("idle"); }, 1700);
  };

  return (
    <LabFrame
      title={`How long is the ${r.thing.name}?`}
      sub={`Lay ${r.unit.name} end to end with no gaps, from one end to the other. Then count them.`}
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict
            state={state}
            right={`${r.len} ${r.unit.name} long!`}
            wrong={laid > r.len ? "You went past the end — take some off." : "Not all the way to the end yet."}
          />
          <div className="grid grid-cols-2 gap-2 mt-3">
            <BigButton onClick={() => { setLaid((n) => n + 1); setState("idle"); }} color={COLOR}>
              ➕ Lay one down
            </BigButton>
            <BigButton onClick={() => { setLaid((n) => Math.max(0, n - 1)); setState("idle"); }} color="#6b7280">
              ➖ Take one off
            </BigButton>
          </div>
          <BigButton onClick={check} color={COLOR} className="w-full mt-2" disabled={laid === 0}>
            It is {laid} {r.unit.name} 📏
          </BigButton>
        </>
      }
    >
      <Ghost />
      {/* the object, drawn to the length it actually is */}
      <div className="rounded-2xl bg-white p-3" style={{ border: `3px solid ${COLOR}33` }}>
        <div className="relative mx-auto" style={{ width: barW }}>
          <div className="flex items-center justify-center rounded-xl" style={{ height: 52, background: `${COLOR}22`, border: `3px solid ${COLOR}66` }}>
            <span style={{ fontSize: 34 }}>{r.thing.emoji}</span>
          </div>
          {/* end markers, so "start at one end and stop at the other" is visible */}
          <div className="absolute -left-1 -top-2 bottom-[-8px] w-1 rounded" style={{ background: COLOR }} />
          <div className="absolute -right-1 -top-2 bottom-[-8px] w-1 rounded" style={{ background: COLOR }} />
        </div>

        {/* the units the kid has laid down, butted up against each other */}
        <div ref={trayRef} className="mx-auto mt-3 flex items-center" style={{ width: barW, minHeight: 42 }}>
          {Array.from({ length: laid }, (_, i) => (
            <span
              key={i}
              className="flex items-center justify-center shrink-0"
              style={{ width: r.unit.w, fontSize: r.unit.w * 0.82 }}
            >
              {r.unit.emoji}
            </span>
          ))}
          {laid === 0 && <span className="text-gray-300 font-black text-sm w-full text-center">lay them along here</span>}
        </div>
        <div className="text-center font-black mt-1" style={{ color: COLOR }}>
          {laid} {r.unit.name}
        </div>
      </div>

      {/* the pile you take units from */}
      <div className="flex justify-center mt-3">
        <button
          onPointerDown={(e) => start(e, 1, r.unit.emoji)}
          className="touch-none rounded-2xl px-5 py-3 bg-white btn-soft flex items-center gap-2"
          style={{ border: `3px solid ${COLOR}44` }}
        >
          <span className="text-3xl">{r.unit.emoji}</span>
          <span className="font-black text-sm" style={{ color: COLOR }}>tap or drag a {r.unit.name.replace(/s$/, "")}</span>
        </button>
      </div>
    </LabFrame>
  );
}

/* ═══════════ Level 3 · correct or incorrect ═══════════ */
function CorrectOrNot({ onScore }: { onScore: (ok: boolean) => void }) {
  const make = () => {
    const unit = pick(UNITS as unknown as (typeof UNITS)[number][]);
    const thing = pick(THINGS as unknown as { emoji: string; name: string }[]);
    const len = rnd(4, 7);
    const fault = pick(["gap", "overlap", "late", "none"] as const);
    return { unit, thing, len, fault };
  };
  const [r, setR] = useState(make);
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const isCorrect = r.fault === "none";
  const barW = r.len * r.unit.w;

  const why: Record<typeof r.fault, string> = {
    gap: "There are gaps between the units — they must touch.",
    overlap: "The units overlap each other — each one needs its own space.",
    late: "It does not start at the end of the object.",
    none: "No gaps, no overlaps, and it starts right at the end.",
  };

  const answer = (said: boolean) => {
    const ok = said === isCorrect;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(ok ? why[r.fault] : `Look closely. ${why[r.fault]}`, VOICE);
    if (ok) setTimeout(() => { setR(make()); setState("idle"); }, 2000);
  };

  // the three faults are shown by shifting the units
  const gapPx = r.fault === "gap" ? 9 : r.fault === "overlap" ? -9 : 0;
  const offset = r.fault === "late" ? 22 : 0;

  return (
    <LabFrame
      title="Measured correctly?"
      sub="Units must start at one end, touch each other, and stop at the other end."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict state={state} right={why[r.fault]} wrong={why[r.fault]} />
          <div className="grid grid-cols-2 gap-2 mt-3">
            <BigButton onClick={() => answer(true)} color="#16a34a">✅ Correct</BigButton>
            <BigButton onClick={() => answer(false)} color="#ef4444">❌ Not right</BigButton>
          </div>
        </>
      }
    >
      <div className="rounded-2xl bg-white p-3 overflow-x-auto" style={{ border: `3px solid ${COLOR}33` }}>
        <div className="relative mx-auto" style={{ width: barW + 40 }}>
          <div
            className="flex items-center justify-center rounded-xl"
            style={{ height: 52, width: barW, background: `${COLOR}22`, border: `3px solid ${COLOR}66` }}
          >
            <span style={{ fontSize: 34 }}>{r.thing.emoji}</span>
          </div>
          <div className="flex items-center mt-2" style={{ marginLeft: offset }}>
            {Array.from({ length: r.len }, (_, i) => (
              <span
                key={i}
                className="flex items-center justify-center shrink-0"
                style={{ width: r.unit.w, marginLeft: i === 0 ? 0 : gapPx, fontSize: r.unit.w * 0.82 }}
              >
                {r.unit.emoji}
              </span>
            ))}
          </div>
        </div>
      </div>
    </LabFrame>
  );
}

/* ═══════════ Level 4 · read a ruler ═══════════ */
function ReadRuler({ onScore }: { onScore: (ok: boolean) => void }) {
  const make = () => ({
    thing: pick(THINGS as unknown as { emoji: string; name: string }[]),
    len: rnd(2, 10),
    // the classic trap: sometimes the object does not start at zero
    offset: Math.random() < 0.3 ? rnd(1, 2) : 0,
  });
  const [r, setR] = useState(make);
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const PX = 30;

  const check = () => {
    const ok = parseInt(answer, 10) === r.len;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(
      ok
        ? `Yes, ${r.len} inches.`
        : r.offset
        ? "Careful — it does not start at zero. Count the marks it actually covers."
        : "Count the inch marks from where it starts to where it ends.",
      VOICE
    );
    if (ok) setTimeout(() => { setR(make()); setAnswer(""); setState("idle"); }, 1700);
  };

  return (
    <LabFrame
      title={`How long is the ${r.thing.name}?`}
      sub={r.offset ? "Careful — this one does not start at zero!" : "Read where the object starts and where it ends."}
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict
            state={state}
            right={`${r.len} inches!`}
            wrong={r.offset ? "It doesn't start at 0 — count only the inches it covers." : "Count the inches from end to end."}
          />
          <div className="flex gap-2 mt-3">
            <input
              value={answer}
              onChange={(e) => { setAnswer(e.target.value.replace(/\D/g, "").slice(0, 2)); setState("idle"); }}
              onKeyDown={(e) => e.key === "Enter" && answer && check()}
              inputMode="numeric"
              placeholder="inches"
              className="flex-1 text-center text-2xl font-black rounded-2xl px-4 py-3 outline-none"
              style={{ border: `4px solid ${COLOR}44` }}
            />
            <BigButton onClick={check} color={COLOR} disabled={!answer}>Check</BigButton>
          </div>
        </>
      }
    >
      <div className="overflow-x-auto">
        <div className="relative mx-auto" style={{ width: 12 * PX + 20, paddingTop: 54 }}>
          {/* the object, sitting above the ruler */}
          <div
            className="absolute flex items-center justify-center rounded-xl"
            style={{
              left: 10 + r.offset * PX,
              top: 0,
              width: r.len * PX,
              height: 46,
              background: `${COLOR}22`,
              border: `3px solid ${COLOR}66`,
            }}
          >
            <span style={{ fontSize: 30 }}>{r.thing.emoji}</span>
          </div>
          {/* the ruler */}
          <div className="relative rounded-lg" style={{ height: 56, background: "#fde68a", border: "3px solid #d97706" }}>
            {Array.from({ length: 13 }, (_, i) => (
              <div key={i} className="absolute" style={{ left: 10 + i * PX - 1, top: 0 }}>
                <div style={{ width: 2, height: i % 1 === 0 ? 18 : 10, background: "#92400e" }} />
                <div className="text-[11px] font-black" style={{ color: "#92400e", transform: "translateX(-40%)" }}>{i}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LabFrame>
  );
}

export const MEASURE_LEVELS = [
  { id: "compare", title: "Longer or Shorter?", emoji: "📐", blurb: "Compare two things by eye", Comp: CompareTwo },
  { id: "lay", title: "Lay the Units", emoji: "📎", blurb: "Drag paperclips end to end and count", Comp: LayUnits },
  { id: "check", title: "Correct or Not?", emoji: "🔍", blurb: "Spot the gaps and overlaps", Comp: CorrectOrNot },
  { id: "ruler", title: "Read the Ruler", emoji: "📏", blurb: "Inches — and always start at zero", Comp: ReadRuler },
];
