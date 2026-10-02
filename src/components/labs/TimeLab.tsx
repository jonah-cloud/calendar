import { useRef, useState } from "react";
import { BigButton } from "../Ui";
import { LabFrame, Verdict } from "./dragkit";
import { coachFor } from "../../lib/coaches";
import { pick, rnd, shuffle } from "../../lib/rand";
import { speak } from "../../lib/speech";

const COLOR = "#0284c7";
const SOFT = "#f0f9ff";
const VOICE = coachFor("math").voice;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS_IN = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const hhmm = (t: number) => {
  const h = Math.floor(t / 60) % 12 || 12;
  const m = t % 60;
  return `${h}:${String(m).padStart(2, "0")}`;
};

/**
 * A real clock face. The hands can be dragged, and dragging teaches the thing
 * a printed worksheet cannot: the hour hand creeps forward as the minute hand
 * goes round, which is why it sits between two numbers most of the time.
 */
function ClockFace({
  minutes,
  onChange,
  size = 250,
}: {
  minutes: number;
  onChange?: (m: number) => void;
  size?: number;
}) {
  const C = size / 2;
  const R = C - 30;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const dragging = useRef<"hour" | "minute" | null>(null);

  const minAngle = (minutes % 60) * 6;
  const hourAngle = ((minutes % 720) / 60) * 30;
  const hand = (angle: number, len: number, w: number) => {
    const a = ((angle - 90) * Math.PI) / 180;
    return { x: C + len * Math.cos(a), y: C + len * Math.sin(a), w };
  };
  const mh = hand(minAngle, R * 0.82, 5);
  const hh = hand(hourAngle, R * 0.52, 8);

  const angleFrom = (e: React.PointerEvent | PointerEvent) => {
    const el = svgRef.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    return (Math.atan2(dy, dx) * 180) / Math.PI + 90;
  };

  const apply = (e: React.PointerEvent | PointerEvent) => {
    if (!onChange || !dragging.current) return;
    const deg = ((angleFrom(e) % 360) + 360) % 360;
    if (dragging.current === "minute") {
      const m = Math.round(deg / 6) % 60;
      const hour = Math.floor(minutes / 60);
      onChange(hour * 60 + m);
    } else {
      const h = Math.round(deg / 30) % 12;
      onChange(h * 60 + (minutes % 60));
    }
  };

  const grab = (which: "hour" | "minute") => (e: React.PointerEvent) => {
    if (!onChange) return;
    dragging.current = which;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    apply(e);
  };

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="mx-auto touch-none select-none"
      onPointerMove={(e) => dragging.current && apply(e)}
      onPointerUp={() => (dragging.current = null)}
      onPointerLeave={() => (dragging.current = null)}
    >
      <circle cx={C} cy={C} r={R} fill="#fff" stroke={COLOR} strokeWidth="6" />
      {/* minute ticks */}
      {Array.from({ length: 60 }, (_, i) => {
        const a = ((i * 6 - 90) * Math.PI) / 180;
        const big = i % 5 === 0;
        const r1 = R - (big ? 13 : 7);
        return (
          <line
            key={i}
            x1={C + r1 * Math.cos(a)}
            y1={C + r1 * Math.sin(a)}
            x2={C + (R - 3) * Math.cos(a)}
            y2={C + (R - 3) * Math.sin(a)}
            stroke={big ? COLOR : "#cbd5e1"}
            strokeWidth={big ? 4 : 2}
            strokeLinecap="round"
          />
        );
      })}
      {/* the hour numbers, plus the minute count outside them */}
      {Array.from({ length: 12 }, (_, i) => {
        const n = i + 1;
        const a = ((n * 30 - 90) * Math.PI) / 180;
        return (
          <g key={n}>
            <text
              x={C + R * 0.74 * Math.cos(a)}
              y={C + R * 0.74 * Math.sin(a) + 8}
              textAnchor="middle"
              fontSize={size * 0.1}
              fontWeight="900"
              fill="#1f2937"
            >
              {n}
            </text>
            <text
              x={C + (R + 16) * Math.cos(a)}
              y={C + (R + 16) * Math.sin(a) + 4}
              textAnchor="middle"
              fontSize={size * 0.05}
              fontWeight="800"
              fill={COLOR}
              opacity="0.55"
            >
              {(n * 5) % 60}
            </text>
          </g>
        );
      })}
      {/* hands — the minute hand is longer, which is how you tell them apart */}
      <line x1={C} y1={C} x2={hh.x} y2={hh.y} stroke="#1f2937" strokeWidth={hh.w} strokeLinecap="round" />
      <line x1={C} y1={C} x2={mh.x} y2={mh.y} stroke={COLOR} strokeWidth={mh.w} strokeLinecap="round" />
      <circle cx={C} cy={C} r="8" fill="#1f2937" />
      {onChange && (
        <>
          <circle cx={hh.x} cy={hh.y} r="15" fill="#1f2937" opacity="0.14" onPointerDown={grab("hour")} style={{ cursor: "grab" }} />
          <circle cx={mh.x} cy={mh.y} r="15" fill={COLOR} opacity="0.22" onPointerDown={grab("minute")} style={{ cursor: "grab" }} />
        </>
      )}
    </svg>
  );
}

/* ═══════════ Level 1 · how long is that? ═══════════ */
const UNIT_FACTS: [string, number, string][] = [
  ["seconds in a minute", 60, "A minute is 60 seconds — about as long as it takes to brush one row of teeth."],
  ["minutes in an hour", 60, "An hour is 60 minutes — about one episode of a show."],
  ["hours in a day", 24, "A day is 24 hours — one whole spin of the Earth."],
  ["days in a week", 7, "A week is 7 days, Sunday through Saturday."],
  ["months in a year", 12, "A year is 12 months — one trip around the sun."],
  ["days in a year", 365, "A year is 365 days, and 366 in a leap year."],
  ["weeks in a year", 52, "A year is about 52 weeks."],
  ["minutes in half an hour", 30, "Half an hour is 30 minutes — the minute hand goes halfway round."],
  ["minutes in a quarter hour", 15, "A quarter hour is 15 minutes — the minute hand goes a quarter of the way."],
];

function TimeUnits({ onScore }: { onScore: (ok: boolean) => void }) {
  const [q, setQ] = useState(() => pick(UNIT_FACTS));
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const check = () => {
    const ok = parseInt(answer, 10) === q[1];
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(ok ? q[2] : "Not quite — look at the ladder.", VOICE);
    if (ok) setTimeout(() => { setQ(pick(UNIT_FACTS)); setAnswer(""); setState("idle"); }, 1800);
  };
  const LADDER: [string, string][] = [
    ["1 minute", "60 seconds"],
    ["1 hour", "60 minutes"],
    ["1 day", "24 hours"],
    ["1 week", "7 days"],
    ["1 month", "about 4 weeks"],
    ["1 year", "12 months · 365 days"],
  ];
  return (
    <LabFrame
      title="How long is that?"
      sub="Every unit of time is built from the one below it. This is the ladder."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict state={state} right={q[2]} wrong="Check the ladder and try again." />
          <div className="font-black text-gray-700 mt-3">How many {q[0]}?</div>
          <div className="flex gap-2 mt-2">
            <input
              value={answer}
              onChange={(e) => { setAnswer(e.target.value.replace(/\D/g, "").slice(0, 3)); setState("idle"); }}
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
      <div className="space-y-1.5">
        {LADDER.map(([a, b], i) => (
          <button
            key={a}
            onClick={() => speak(`${a} is ${b}`, VOICE)}
            className="w-full rounded-2xl bg-white px-3 py-2 flex items-center gap-3 btn-soft"
            style={{ border: `3px solid ${COLOR}22`, marginLeft: i * 8, width: `calc(100% - ${i * 8}px)` }}
          >
            <span className="font-black text-gray-800 w-24 text-left shrink-0">{a}</span>
            <span className="font-black text-gray-300">=</span>
            <span className="font-black" style={{ color: COLOR }}>{b}</span>
          </button>
        ))}
      </div>
    </LabFrame>
  );
}

/* ═══════════ Level 2 · read the clock ═══════════ */
function ReadClock({ onScore }: { onScore: (ok: boolean) => void }) {
  const make = (d: number) => {
    const h = rnd(1, 12);
    const m = d < 0.4 ? pick([0, 30]) : pick([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
    return (h % 12) * 60 + m;
  };
  const [t, setT] = useState(() => make(0.3));
  const [round, setRound] = useState(0);
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");

  const check = () => {
    const ok = answer.replace(/\s/g, "") === hhmm(t);
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(ok ? `Yes, ${hhmm(t)}.` : "The short hand tells the hour. Count the long hand by fives.", VOICE);
    if (ok) setTimeout(() => { setRound((r) => r + 1); setT(make(Math.min(0.9, 0.3 + round * 0.12))); setAnswer(""); setState("idle"); }, 1400);
  };

  return (
    <LabFrame
      title="What time is it?"
      sub="Short hand = the hour it has passed. Long hand = minutes, counted by fives."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict state={state} right={`${hhmm(t)} — exactly!`} wrong="The hour is the number the SHORT hand has already gone past." />
          <div className="flex gap-2 mt-3">
            <input
              value={answer}
              onChange={(e) => { setAnswer(e.target.value.replace(/[^\d:]/g, "").slice(0, 5)); setState("idle"); }}
              onKeyDown={(e) => e.key === "Enter" && answer && check()}
              placeholder="like 3:45"
              inputMode="numeric"
              className="flex-1 text-center text-2xl font-black rounded-2xl px-4 py-3 outline-none"
              style={{ border: `4px solid ${COLOR}44` }}
            />
            <BigButton onClick={check} color={COLOR} disabled={!answer}>Check</BigButton>
          </div>
        </>
      }
    >
      <ClockFace minutes={t} />
    </LabFrame>
  );
}

/* ═══════════ Level 3 · set the clock ═══════════ */
function SetClock({ onScore }: { onScore: (ok: boolean) => void }) {
  const make = () => (rnd(1, 12) % 12) * 60 + pick([0, 15, 30, 45, 5, 10, 20, 25, 35, 40, 50, 55]);
  const [target, setTarget] = useState(make);
  const [t, setT] = useState(0);
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const check = () => {
    const ok = t % 720 === target % 720;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(ok ? "Perfect!" : `You set ${hhmm(t)}. We wanted ${hhmm(target)}.`, VOICE);
    if (ok) setTimeout(() => { setTarget(make()); setT(0); setState("idle"); }, 1500);
  };
  return (
    <LabFrame
      title={`Set the clock to ${hhmm(target)}`}
      sub="Drag the hands. Watch how the short hand creeps along as you move the long one."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict state={state} right={`${hhmm(target)} — spot on!`} wrong={`You set ${hhmm(t)}. Try again.`} />
          <BigButton onClick={check} color={COLOR} className="w-full mt-3">Check the clock 🕐</BigButton>
        </>
      }
    >
      <ClockFace minutes={t} onChange={(m) => { setT(m); setState("idle"); }} />
      <div className="text-center font-black text-2xl mt-1" style={{ color: COLOR }}>
        you set {hhmm(t)}
      </div>
      <div className="text-center text-xs font-black text-gray-400">drag either hand</div>
    </LabFrame>
  );
}

/* ═══════════ Level 4 · the calendar ═══════════ */
function Calendar({ onScore }: { onScore: (ok: boolean) => void }) {
  const makeOrder = () => shuffle(MONTHS.map((_, i) => i)).slice(0, 4).sort(() => Math.random() - 0.5);
  const [mode, setMode] = useState<"order" | "days" | "fact">("order");
  const [tiles, setTiles] = useState<number[]>(makeOrder);
  const [picked, setPicked] = useState<number[]>([]);
  const [monthQ, setMonthQ] = useState(() => rnd(0, 11));
  const [factQ, setFactQ] = useState(() => pick([
    ["How many days in a week?", 7],
    ["How many months in a year?", 12],
    ["How many days in a year?", 365],
    ["How many hours in a day?", 24],
    ["How many weeks in a year?", 52],
  ] as [string, number][]));
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");

  const nextRound = () => {
    const m = pick(["order", "days", "fact"] as const);
    setMode(m);
    setTiles(makeOrder());
    setPicked([]);
    setMonthQ(rnd(0, 11));
    setFactQ(pick([
      ["How many days in a week?", 7],
      ["How many months in a year?", 12],
      ["How many days in a year?", 365],
      ["How many hours in a day?", 24],
      ["How many weeks in a year?", 52],
    ] as [string, number][]));
    setAnswer("");
    setState("idle");
  };

  const tapMonth = (m: number) => {
    const want = [...tiles].sort((a, b) => a - b)[picked.length];
    if (m === want) {
      const next = [...picked, m];
      setPicked(next);
      speak(MONTHS[m], VOICE);
      if (next.length === tiles.length) {
        setState("right");
        onScore(true);
        setTimeout(nextRound, 1500);
      }
    } else {
      setState("wrong");
      onScore(false);
      speak(`Not yet. Which comes first?`, VOICE);
    }
  };

  const checkNumber = (want: number) => {
    const ok = parseInt(answer, 10) === want;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(ok ? "That's right!" : "Have another look.", VOICE);
    if (ok) setTimeout(nextRound, 1500);
  };

  return (
    <LabFrame
      title={mode === "order" ? "Put the months in order" : mode === "days" ? `Days in ${MONTHS[monthQ]}` : "Calendar facts"}
      sub={
        mode === "order"
          ? "Tap them earliest first."
          : mode === "days"
          ? "Thirty days has September, April, June and November. All the rest have thirty-one — except February."
          : "The pieces of a year."
      }
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict
            state={state}
            right="Exactly right!"
            wrong={mode === "order" ? "Think about which month comes first in the year." : "Try again."}
          />
          {mode !== "order" && (
            <div className="flex gap-2 mt-3">
              <input
                value={answer}
                onChange={(e) => { setAnswer(e.target.value.replace(/\D/g, "").slice(0, 3)); setState("idle"); }}
                onKeyDown={(e) => e.key === "Enter" && answer && checkNumber(mode === "days" ? DAYS_IN[monthQ] : factQ[1])}
                inputMode="numeric"
                placeholder="how many?"
                className="flex-1 text-center text-2xl font-black rounded-2xl px-4 py-3 outline-none"
                style={{ border: `4px solid ${COLOR}44` }}
              />
              <BigButton onClick={() => checkNumber(mode === "days" ? DAYS_IN[monthQ] : factQ[1])} color={COLOR} disabled={!answer}>
                Check
              </BigButton>
            </div>
          )}
        </>
      }
    >
      {mode === "order" && (
        <>
          <div className="flex flex-wrap justify-center gap-2 min-h-[44px] mb-3">
            {picked.map((m, i) => (
              <span key={i} className="rounded-xl px-3 py-1.5 font-black text-white" style={{ background: COLOR }}>
                {i + 1}. {MONTHS[m]}
              </span>
            ))}
            {picked.length === 0 && <span className="text-gray-300 font-black">tap the earliest month first</span>}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {tiles.filter((m) => !picked.includes(m)).map((m) => (
              <button
                key={m}
                onClick={() => tapMonth(m)}
                className="rounded-2xl bg-white p-3 font-black text-gray-800 btn-soft"
                style={{ border: `3px solid ${COLOR}33` }}
              >
                {MONTHS[m]}
              </button>
            ))}
          </div>
        </>
      )}

      {mode === "days" && (
        <div className="grid grid-cols-3 gap-1.5">
          {MONTHS.map((m, i) => (
            <div
              key={m}
              className="rounded-xl p-2 text-center"
              style={{
                background: i === monthQ ? COLOR : "#fff",
                color: i === monthQ ? "#fff" : "#374151",
                border: `3px solid ${i === monthQ ? COLOR : "#e5e7eb"}`,
              }}
            >
              <div className="font-black text-[11px]">{m.slice(0, 3)}</div>
              <div className="font-black text-lg">{i === monthQ ? "?" : DAYS_IN[i]}</div>
            </div>
          ))}
        </div>
      )}

      {mode === "fact" && (
        <>
          <div className="font-black text-xl text-center text-gray-800 mb-3">{factQ[0]}</div>
          <div className="grid grid-cols-7 gap-1">
            {WEEKDAYS.map((d) => (
              <div key={d} className="rounded-lg bg-white p-1.5 text-center font-black text-[10px] text-gray-600" style={{ border: `2px solid ${COLOR}22` }}>
                {d.slice(0, 3)}
              </div>
            ))}
          </div>
          <div className="text-center text-xs font-black text-gray-400 mt-2">
            7 days make a week · 4 weeks make a month · 12 months make a year
          </div>
        </>
      )}
    </LabFrame>
  );
}

/* ═══════════ Level 5 · elapsed time ═══════════ */
function Elapsed({ onScore }: { onScore: (ok: boolean) => void }) {
  const make = () => {
    const start = (rnd(1, 11) % 12) * 60 + pick([0, 15, 30, 45]);
    const gapMin = pick([30, 45, 60, 90, 120, 15]);
    return { start, gapMin };
  };
  const [{ start, gapMin }, setRound] = useState(make);
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const end = (start + gapMin) % 720;

  const check = () => {
    const ok = answer.replace(/\s/g, "") === hhmm(end);
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(ok ? `Right, ${hhmm(end)}.` : "Count the hours first, then the extra minutes.", VOICE);
    if (ok) setTimeout(() => { setRound(make()); setAnswer(""); setState("idle"); }, 1600);
  };

  const hrs = Math.floor(gapMin / 60);
  const mins = gapMin % 60;
  const gapText = [hrs ? `${hrs} hour${hrs > 1 ? "s" : ""}` : "", mins ? `${mins} minutes` : ""].filter(Boolean).join(" and ");

  return (
    <LabFrame
      title={`What time will it be in ${gapText}?`}
      sub="Jump the whole hours first, then count on the leftover minutes."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict state={state} right={`${hhmm(end)} — nice work!`} wrong={`Start at ${hhmm(start)} and add ${gapText}.`} />
          <div className="flex gap-2 mt-3">
            <input
              value={answer}
              onChange={(e) => { setAnswer(e.target.value.replace(/[^\d:]/g, "").slice(0, 5)); setState("idle"); }}
              onKeyDown={(e) => e.key === "Enter" && answer && check()}
              placeholder="like 4:15"
              inputMode="numeric"
              className="flex-1 text-center text-2xl font-black rounded-2xl px-4 py-3 outline-none"
              style={{ border: `4px solid ${COLOR}44` }}
            />
            <BigButton onClick={check} color={COLOR} disabled={!answer}>Check</BigButton>
          </div>
        </>
      }
    >
      <div className="text-center font-black text-sm uppercase tracking-wide" style={{ color: COLOR }}>it is now</div>
      <ClockFace minutes={start} size={200} />
      <div className="text-center font-black text-2xl text-gray-800">{hhmm(start)}</div>
      <div className="flex items-center justify-center gap-2 mt-2">
        <span className="rounded-xl px-3 py-1.5 font-black text-white" style={{ background: COLOR }}>
          + {gapText}
        </span>
      </div>
    </LabFrame>
  );
}

export const TIME_LEVELS = [
  { id: "units", title: "How Long Is That?", emoji: "⏳", blurb: "Seconds, minutes, hours, days, years", Comp: TimeUnits },
  { id: "read", title: "Read the Clock", emoji: "🕐", blurb: "Short hand, long hand, count by fives", Comp: ReadClock },
  { id: "set", title: "Set the Clock", emoji: "🤏", blurb: "Drag the hands to show a time", Comp: SetClock },
  { id: "calendar", title: "The Calendar", emoji: "📅", blurb: "Months in order, days in each one", Comp: Calendar },
  { id: "elapsed", title: "Time That Passes", emoji: "⏭️", blurb: "What time will it be in 90 minutes?", Comp: Elapsed },
];
