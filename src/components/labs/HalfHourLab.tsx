import { useState } from "react";
import { BigButton } from "../Ui";
import { LabFrame, Verdict } from "./dragkit";
import { ClockFace, spokenTime } from "./ClockFace";
import { coachFor } from "../../lib/coaches";
import { pick, rnd, shuffle } from "../../lib/rand";
import { speak } from "../../lib/speech";

const COLOR = "#f59e0b";
const SOFT = "#fffbeb";
const VOICE = coachFor("math").voice;

const hourOf = (t: number) => Math.floor(t / 60) % 12 || 12;

/* ═══════════ Level 1 · o'clock ═══════════ */
function OClock({ onScore }: { onScore: (ok: boolean) => void }) {
  const make = () => (rnd(1, 12) % 12) * 60;
  const [t, setT] = useState(make);
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const h = hourOf(t);
  const options = shuffle([h, ...shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter((x) => x !== h)).slice(0, 2)]);

  const answer = (v: number) => {
    const ok = v === h;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(ok ? `${h} o'clock!` : "Look at the SHORT hand. That one tells the hour.", VOICE);
    if (ok) setTimeout(() => { setT(make()); setState("idle"); }, 1400);
  };

  return (
    <LabFrame
      title="What o'clock is it?"
      sub="When the long hand points straight UP at the 12, we say o'clock. The short hand tells you which one."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict state={state} right={`${h} o'clock — the short hand points right at the ${h}.`} wrong="Follow the SHORT hand. Which number is it pointing to?" />
          <div className="grid grid-cols-3 gap-2 mt-3">
            {options.map((o) => (
              <BigButton key={o} onClick={() => answer(o)} color={COLOR}>{o} o'clock</BigButton>
            ))}
          </div>
        </>
      }
    >
      <ClockFace minutes={t} color={COLOR} hideMinuteNumbers />
      <div className="text-center font-black text-sm text-gray-500">
        long hand straight up ⬆️ = o'clock
      </div>
    </LabFrame>
  );
}

/* ═══════════ Level 2 · what half past means ═══════════ */
function WhatIsHalfPast({ onScore }: { onScore: (ok: boolean) => void }) {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  // the minute hand sweeps from 12 round to 6 as they step through
  const sweepMinutes = [0, 15, 30][Math.min(step, 2)];
  const t = 3 * 60 + sweepMinutes;

  const QUESTIONS = [
    { q: "The long hand starts straight up. How many minutes have gone by?", a: "0", opts: ["0", "30", "60"] },
    { q: "Now it has gone a quarter of the way round. How many minutes?", a: "15", opts: ["15", "3", "30"] },
    { q: "Now it points straight DOWN at the 6. How many minutes?", a: "30", opts: ["30", "6", "60"] },
  ];
  const cur = QUESTIONS[Math.min(step, 2)];

  const answer = (v: string) => {
    const ok = v === cur.a;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    if (ok) {
      speak(
        step < 2
          ? `${v} minutes. Keep going.`
          : "30 minutes is HALF of an hour. That is why we say half past!",
        VOICE
      );
      setTimeout(() => { setStep((s) => (s + 1) % 3); setState("idle"); }, step === 2 ? 2600 : 1300);
    } else {
      speak("Count round the clock by fives.", VOICE);
    }
  };

  return (
    <LabFrame
      title="What does half past mean?"
      sub="A whole hour is one full trip round the clock. Half past is halfway round."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict
            state={state}
            right={step === 2 ? "30 minutes is HALF an hour — that's why it's called half past!" : "That's it — keep the hand moving."}
            wrong="Count round the clock face by fives."
          />
          <div className="font-black text-gray-700 mt-3">{cur.q}</div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {cur.opts.map((o) => (
              <BigButton key={o} onClick={() => answer(o)} color={COLOR}>{o}</BigButton>
            ))}
          </div>
        </>
      }
    >
      <ClockFace minutes={t} color={COLOR} sweep />
      <div className="text-center font-black" style={{ color: COLOR }}>
        {sweepMinutes} minutes of the hour have gone
      </div>
      <div className="flex justify-center gap-1.5 mt-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-3 h-3 rounded-full" style={{ background: i <= Math.min(step, 2) ? COLOR : "#e5e7eb" }} />
        ))}
      </div>
    </LabFrame>
  );
}

/* ═══════════ Level 3 · which hour is it? (the trap) ═══════════ */
function WhichHour({ onScore }: { onScore: (ok: boolean) => void }) {
  const make = () => (rnd(1, 12) % 12) * 60 + 30;
  const [t, setT] = useState(make);
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const h = hourOf(t);
  const nextH = (h % 12) + 1;

  const answer = (v: number) => {
    const ok = v === h;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(
      ok
        ? `Half past ${h}. The short hand has passed the ${h} but has not reached the ${nextH} yet.`
        : `Careful! The short hand is between the ${h} and the ${nextH}. We use the one it has already PASSED.`,
      VOICE
    );
    if (ok) setTimeout(() => { setT(make()); setState("idle"); }, 2300);
  };

  return (
    <LabFrame
      title="Which hour is it half past?"
      sub="At half past, the short hand sits BETWEEN two numbers. We always use the one it has already gone past."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict
            state={state}
            right={`Half past ${h} — it has passed the ${h}, but it hasn't got to the ${nextH} yet.`}
            wrong={`It's between ${h} and ${nextH}. Use the number it has ALREADY passed.`}
          />
          <div className="grid grid-cols-2 gap-2 mt-3">
            <BigButton onClick={() => answer(h)} color={COLOR}>half past {h}</BigButton>
            <BigButton onClick={() => answer(nextH)} color={COLOR}>half past {nextH}</BigButton>
          </div>
        </>
      }
    >
      {/* the minute hand is hidden so nothing distracts from where the hour hand sits */}
      <ClockFace minutes={t} color={COLOR} hideMinuteNumbers hourHandOnly />
      <div className="text-center font-black text-sm text-gray-500 mt-1">
        the short hand is between two numbers
      </div>
      <div className="mt-2 rounded-2xl bg-white p-3 text-center" style={{ border: `3px solid ${COLOR}44` }}>
        <span className="font-black text-gray-700">
          It has passed the <span style={{ color: COLOR }}>{h}</span>.
          It has not reached the <span className="text-gray-400">{nextH}</span> yet.
        </span>
      </div>
    </LabFrame>
  );
}

/* ═══════════ Level 4 · o'clock or half past? ═══════════ */
function OClockOrHalfPast({ onScore }: { onScore: (ok: boolean) => void }) {
  const make = () => (rnd(1, 12) % 12) * 60 + pick([0, 30]);
  const [t, setT] = useState(make);
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const correct = spokenTime(t);
  const h = hourOf(t);
  const nextH = (h % 12) + 1;
  const wrongOnes = t % 60 === 0
    ? [`half past ${h}`, `${nextH} o'clock`]
    : [`${h} o'clock`, `half past ${nextH}`];
  const options = shuffle([correct, ...wrongOnes]);

  const answer = (v: string) => {
    const ok = v === correct;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(ok ? `Yes, ${correct}.` : "Check the long hand first: straight up is o'clock, straight down is half past.", VOICE);
    if (ok) setTimeout(() => { setT(make()); setState("idle"); }, 1500);
  };

  return (
    <LabFrame
      title="Read the clock"
      sub="Long hand straight UP means o'clock. Long hand straight DOWN means half past."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict state={state} right={`${correct} — exactly right.`} wrong="Look at the long hand first, then the short one." />
          <div className="space-y-2 mt-3">
            {options.map((o) => (
              <BigButton key={o} onClick={() => answer(o)} color={COLOR} className="w-full">{o}</BigButton>
            ))}
          </div>
        </>
      }
    >
      <ClockFace minutes={t} color={COLOR} sweep hideMinuteNumbers />
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="rounded-xl bg-white p-2 text-center font-black text-xs text-gray-600" style={{ border: `2px solid ${COLOR}33` }}>
          ⬆️ straight up = o'clock
        </div>
        <div className="rounded-xl bg-white p-2 text-center font-black text-xs text-gray-600" style={{ border: `2px solid ${COLOR}33` }}>
          ⬇️ straight down = half past
        </div>
      </div>
    </LabFrame>
  );
}

/* ═══════════ Level 5 · set the clock ═══════════ */
function SetHalfHour({ onScore }: { onScore: (ok: boolean) => void }) {
  const make = () => (rnd(1, 12) % 12) * 60 + pick([0, 30]);
  const [target, setTarget] = useState(make);
  const [t, setT] = useState(0);
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");

  const check = () => {
    const ok = t % 720 === target % 720;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(ok ? "Perfect!" : `You set ${spokenTime(t)}. We wanted ${spokenTime(target)}.`, VOICE);
    if (ok) setTimeout(() => { setTarget(make()); setT(0); setState("idle"); }, 1600);
  };

  return (
    <LabFrame
      title={`Show ${spokenTime(target)}`}
      sub="Drag the hands. The long hand will only stop straight up or straight down."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict state={state} right={`${spokenTime(target)} — spot on!`} wrong={`You set ${spokenTime(t)}. Have another go.`} />
          <BigButton onClick={check} color={COLOR} className="w-full mt-3">Check the clock 🕐</BigButton>
        </>
      }
    >
      {/* snapMinutes 30 keeps the minute hand on o'clock or half past only */}
      <ClockFace minutes={t} onChange={(m) => { setT(m); setState("idle"); }} color={COLOR} snapMinutes={30} sweep hideMinuteNumbers />
      <div className="text-center font-black text-2xl" style={{ color: COLOR }}>
        you set {spokenTime(t)}
      </div>
      <div className="text-center text-xs font-black text-gray-400">drag either hand</div>
    </LabFrame>
  );
}

export const HALF_HOUR_LEVELS = [
  { id: "oclock", title: "O'Clock", emoji: "🕐", blurb: "Long hand straight up — read the hour", Comp: OClock },
  { id: "what", title: "What Is Half Past?", emoji: "🌗", blurb: "Halfway round the clock is 30 minutes", Comp: WhatIsHalfPast },
  { id: "which", title: "Which Hour?", emoji: "🧐", blurb: "At half past, the short hand hides between two numbers", Comp: WhichHour },
  { id: "read", title: "O'Clock or Half Past?", emoji: "⏰", blurb: "Read either one", Comp: OClockOrHalfPast },
  { id: "set", title: "Show the Time", emoji: "🤏", blurb: "Drag the hands to half past", Comp: SetHalfHour },
];
