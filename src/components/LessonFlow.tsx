import { useEffect, useMemo, useRef, useState } from "react";
import type { Coach } from "../lib/coaches";
import type { IStep } from "../lib/content/mathInteractive";
import { pick as randPick, staticQ } from "../lib/rand";
import { isMuted, setMuted, speak, speakLines, stopSpeaking } from "../lib/speech";
import type { Question, SubjectDef, UnitDef } from "../lib/types";

interface Props {
  def: SubjectDef;
  coach: Coach;
  unit: UnitDef;
  unitLabel: string;
  steps: IStep[];
  missionTitle: string;
  /** true = math speed mission follows; false = normal practice round */
  fluency: boolean;
  /** auto-read questions aloud (pre-readers) */
  autoRead?: boolean;
  onDone: () => void;
  onExit: () => void;
}

const TAP_CHEERS = ["Nice!", "Yes!", "Keep going!", "That's it!", "Beautiful!"];

/**
 * The 3-stage concept lesson: Explore (tap manipulatives) → Understand
 * (untimed guided questions) → hands off to the speed mission.
 */
export default function LessonFlow({ def, coach, unit, unitLabel, steps, missionTitle, fluency, autoRead, onDone, onExit }: Props) {
  const [stage, setStage] = useState<"explore" | "understand" | "ready">("explore");
  const [stepIdx, setStepIdx] = useState(0);
  const [muted, setMutedState] = useState(isMuted());

  const toggleMute = () => {
    const m = !muted;
    setMuted(m);
    setMutedState(m);
  };

  useEffect(() => () => stopSpeaking(), []);

  const step = steps[stepIdx];
  const advance = () => {
    if (stepIdx + 1 < steps.length) setStepIdx(stepIdx + 1);
    else setStage("understand");
  };

  const stageLabel =
    stage === "explore" ? "🎮 Explore" : stage === "understand" ? "💡 Understand" : "⚡ Ready!";

  return (
    <div className="min-h-screen p-4 pb-12" style={{ background: `linear-gradient(160deg, ${def.soft}, #f5f3ff 60%)` }}>
      <div className="max-w-2xl mx-auto">
        {/* header */}
        <div className="flex items-center gap-3 pt-2">
          <button onClick={onExit} className="text-2xl p-1 active:scale-90">✖️</button>
          <div className="flex-1 text-center">
            <span className="font-extrabold text-sm px-3 py-1.5 rounded-full bg-white/80" style={{ color: def.color }}>
              {unitLabel} · {stageLabel}
            </span>
          </div>
          <button
            onClick={toggleMute}
            className="text-xl p-2 rounded-full bg-white/80 active:scale-90"
            title={muted ? "Turn voice on" : "Turn voice off"}
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </div>

        {/* stage dots */}
        <div className="flex justify-center gap-2 mt-3">
          {(["explore", "understand", "ready"] as const).map((s) => (
            <div
              key={s}
              className="h-2 rounded-full transition-all"
              style={{
                width: s === stage ? 28 : 10,
                background: s === stage || (s === "explore" && stage !== "explore") || (s === "understand" && stage === "ready")
                  ? def.color
                  : "#e5e7eb",
              }}
            />
          ))}
        </div>

        {stage === "explore" && step && (
          <ExploreStep key={stepIdx} step={step} coach={coach} def={def} onDone={advance} />
        )}
        {stage === "understand" && (
          <Understand def={def} coach={coach} unit={unit} autoRead={autoRead} onDone={() => setStage("ready")} />
        )}
        {stage === "ready" && (
          <ReadyCard def={def} coach={coach} missionTitle={missionTitle} fluency={fluency} onDone={onDone} />
        )}
      </div>
    </div>
  );
}

/* ---------------- coach bubble ---------------- */

function CoachBubble({ coach, def, text }: { coach: Coach; def: SubjectDef; text: string }) {
  useEffect(() => {
    speak(text, coach.voice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);
  return (
    <div className="flex items-start gap-3">
      <div className="text-5xl shrink-0 animate-wiggle">{coach.emoji}</div>
      <div className="relative flex-1 rounded-2xl p-4 bg-white shadow" style={{ border: `2px solid ${def.color}33` }}>
        <div className="absolute -left-2 top-5 w-4 h-4 bg-white rotate-45" style={{ borderLeft: `2px solid ${def.color}33`, borderBottom: `2px solid ${def.color}33` }} />
        <div className="font-bold text-gray-700 leading-relaxed">{text}</div>
      </div>
    </div>
  );
}

/* ---------------- explore steps ---------------- */

function ExploreStep({ step, coach, def, onDone }: { step: IStep; coach: Coach; def: SubjectDef; onDone: () => void }) {
  switch (step.kind) {
    case "say":
      return (
        <div className="mt-6 animate-pop">
          <CoachBubble coach={coach} def={def} text={step.text} />
          <button onClick={onDone} className="btn-big w-full mt-5 text-white" style={{ background: def.color }}>
            Let's go! ➡️
          </button>
        </div>
      );
    case "count":
      return <CountStep step={step} coach={coach} def={def} onDone={onDone} />;
    case "move":
      return <MoveStep step={step} coach={coach} def={def} onDone={onDone} />;
    case "hop":
      return <HopStep step={step} coach={coach} def={def} onDone={onDone} />;
    case "shade":
      return <ShadeStep step={step} coach={coach} def={def} onDone={onDone} />;
    case "pick":
      return <PickStep step={step} coach={coach} def={def} onDone={onDone} />;
    case "cards":
      return <CardsStep step={step} coach={coach} def={def} onDone={onDone} />;
  }
}

function CardsStep({ step, coach, def, onDone }: { step: Extract<IStep, { kind: "cards" }>; coach: Coach; def: SubjectDef; onDone: () => void }) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const allFlipped = flipped.size >= step.cards.length;
  const tap = (i: number) => {
    const card = step.cards[i];
    speak(card.say ?? card.front, coach.voice, card.lang ? { lang: card.lang } : undefined);
    if (!flipped.has(i)) {
      const next = new Set(flipped);
      next.add(i);
      setFlipped(next);
    }
  };
  return (
    <div className="mt-6 animate-pop">
      <CoachBubble coach={coach} def={def} text={step.text} />
      <div className={`grid gap-3 mt-4 ${step.cards.length > 4 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"}`}>
        {step.cards.map((c, i) => {
          const isFlipped = flipped.has(i);
          return (
            <button
              key={i}
              onClick={() => tap(i)}
              className="card p-4 min-h-[110px] flex flex-col items-center justify-center text-center active:scale-95 transition-all"
              style={{ border: isFlipped ? `3px solid ${def.color}` : "3px solid transparent" }}
            >
              <div className="font-extrabold text-lg text-gray-800 leading-snug">{c.front}</div>
              {isFlipped ? (
                <div className="mt-2 text-sm font-bold animate-pop" style={{ color: def.color }}>
                  {c.back}
                </div>
              ) : (
                <div className="mt-2 text-xs font-bold text-gray-300">tap to hear! 🔊</div>
              )}
            </button>
          );
        })}
      </div>
      <div className="text-center text-xs font-bold text-gray-400 mt-3">
        {flipped.size}/{step.cards.length} cards studied
      </div>
      {allFlipped && <DoneBanner def={def} onDone={onDone} label="I know them! ➡️" />}
    </div>
  );
}

function DoneBanner({ def, onDone, label }: { def: SubjectDef; onDone: () => void; label?: string }) {
  return (
    <button onClick={onDone} className="btn-big w-full mt-4 text-white animate-pop" style={{ background: def.color }}>
      {label ?? "Next ➡️"}
    </button>
  );
}

function CountStep({ step, coach, def, onDone }: { step: Extract<IStep, { kind: "count" }>; coach: Coach; def: SubjectDef; onDone: () => void }) {
  const [tapped, setTapped] = useState<Set<number>>(new Set());
  const complete = tapped.size >= step.n;
  const cols = step.cols ?? Math.min(step.n, 5);
  // arrays lesson renders extra rows for context but only row one is tappable
  const tap = (i: number) => {
    if (tapped.has(i) || complete) return;
    const next = new Set(tapped);
    next.add(i);
    setTapped(next);
    speak(next.size >= step.n ? `${next.size}! ${randPick(TAP_CHEERS)}` : String(next.size), coach.voice);
  };
  return (
    <div className="mt-6 animate-pop">
      <CoachBubble coach={coach} def={def} text={step.text} />
      <div className="card p-6 mt-4 text-center">
        <div className="text-6xl font-extrabold" style={{ color: def.color }}>
          {tapped.size}
        </div>
        <div className="grid gap-3 mt-4 justify-center" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 64px))` }}>
          {Array.from({ length: step.n }, (_, i) => (
            <button
              key={i}
              onClick={() => tap(i)}
              className={`text-5xl transition-all active:scale-90 ${tapped.has(i) ? "opacity-40 scale-90" : "hover:scale-110"}`}
              style={tapped.has(i) ? { filter: "grayscale(0.5)" } : {}}
            >
              {step.emoji}
            </button>
          ))}
        </div>
        {complete && <div className="mt-3 font-extrabold text-green-600 animate-pop">🎉 {step.n}! You counted every single one!</div>}
      </div>
      {complete && <DoneBanner def={def} onDone={onDone} />}
    </div>
  );
}

function MoveStep({ step, coach, def, onDone }: { step: Extract<IStep, { kind: "move" }>; coach: Coach; def: SubjectDef; onDone: () => void }) {
  const [moved, setMoved] = useState(0);
  const sourceCount = step.sourceCount ?? step.add;
  const complete = moved >= step.add;
  const inTarget = step.startIn + moved;
  const capacity = step.capacity ?? step.startIn + step.add;
  const move = () => {
    if (complete) return;
    const m = moved + 1;
    setMoved(m);
    speak(m >= step.add ? `${step.startIn + m}! ${randPick(TAP_CHEERS)}` : String(step.startIn + m), coach.voice);
  };
  return (
    <div className="mt-6 animate-pop">
      <CoachBubble coach={coach} def={def} text={step.text} />
      <div className="card p-5 mt-4">
        {/* target zone */}
        <div className="rounded-2xl p-4 text-center" style={{ background: def.soft, border: `3px dashed ${def.color}` }}>
          <div className="text-xs font-extrabold uppercase tracking-wide mb-2" style={{ color: def.color }}>
            {step.targetLabel} · {inTarget}
          </div>
          <div className="text-3xl leading-relaxed break-words">
            {step.emoji.repeat(inTarget)}
            {Array.from({ length: Math.max(0, capacity - inTarget) }, (_, i) => (
              <span key={i} className="opacity-20">⬜</span>
            ))}
          </div>
        </div>
        {/* source pile */}
        <div className="mt-4 text-center">
          <div className="text-xs font-extrabold uppercase tracking-wide text-gray-400 mb-2">
            {step.sourceLabel} — tap to move!
          </div>
          <div className="flex justify-center gap-2 flex-wrap">
            {Array.from({ length: sourceCount - moved }, (_, i) => (
              <button key={i} onClick={move} className="text-4xl hover:scale-110 active:scale-75 transition-transform animate-pop">
                {step.emoji}
              </button>
            ))}
            {sourceCount - moved === 0 && <span className="text-gray-300 font-bold">empty!</span>}
          </div>
        </div>
        {complete && (
          <div className="mt-3 text-center font-extrabold text-green-600 animate-pop">
            🎉 {step.startIn} + {step.add} = {inTarget}!
          </div>
        )}
      </div>
      {complete && <DoneBanner def={def} onDone={onDone} />}
    </div>
  );
}

function HopStep({ step, coach, def, onDone }: { step: Extract<IStep, { kind: "hop" }>; coach: Coach; def: SubjectDef; onDone: () => void }) {
  const [landed, setLanded] = useState<number[]>([step.start]);
  const [wrongFlash, setWrongFlash] = useState<number | null>(null);
  const complete = landed.length > step.hops;
  const nextVal = landed[landed.length - 1] + step.step;

  const options = useMemo(() => {
    const wrongs = new Set<number>();
    while (wrongs.size < 2) {
      const w = nextVal + randPick([-step.step, step.step, -1, 1, 2, -2]);
      if (w !== nextVal && w > 0) wrongs.add(w);
    }
    return [nextVal, ...wrongs].sort((a, b) => a - b);
  }, [nextVal]);

  const choose = (v: number) => {
    if (complete) return;
    if (v === nextVal) {
      setLanded([...landed, v]);
      setWrongFlash(null);
      speak(landed.length + 1 > step.hops ? `${v}! ${randPick(TAP_CHEERS)}` : String(v), coach.voice);
    } else {
      setWrongFlash(v);
      speak(`Almost! We're jumping by ${step.step}. What is ${landed[landed.length - 1]} plus ${step.step}?`, coach.voice);
    }
  };

  return (
    <div className="mt-6 animate-pop">
      <CoachBubble coach={coach} def={def} text={step.text} />
      <div className="card p-6 mt-4 text-center">
        <div className="text-2xl font-extrabold tracking-wide" style={{ color: def.color }}>
          {landed.join(" → ")}
          {!complete && <span className="text-gray-300"> → ❓</span>}
        </div>
        <div className="text-3xl mt-1">{"🦘".repeat(Math.max(0, landed.length - 1))}</div>
        {!complete ? (
          <div className="flex justify-center gap-3 mt-4">
            {options.map((v) => (
              <button
                key={v}
                onClick={() => choose(v)}
                className={`btn-big text-xl px-8 ${wrongFlash === v ? "bg-red-100 border-2 border-red-300 text-red-500 animate-wiggle" : "bg-gray-50 border-2 border-gray-200 text-gray-800"}`}
              >
                {v}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-3 font-extrabold text-green-600 animate-pop">🎉 Perfect jumps, kangaroo-style!</div>
        )}
      </div>
      {complete && <DoneBanner def={def} onDone={onDone} />}
    </div>
  );
}

function ShadeStep({ step, coach, def, onDone }: { step: Extract<IStep, { kind: "shade" }>; coach: Coach; def: SubjectDef; onDone: () => void }) {
  const pre = step.pre ?? 0;
  const [shaded, setShaded] = useState<Set<number>>(() => new Set(Array.from({ length: pre }, (_, i) => i)));
  const complete = shaded.size === step.shade;
  const toggle = (i: number) => {
    if (i < pre) return; // locked pre-shaded slices
    const next = new Set(shaded);
    if (next.has(i)) next.delete(i);
    else if (next.size < step.shade) next.add(i);
    setShaded(next);
    if (next.size === step.shade) speak(`${step.label}! ${randPick(TAP_CHEERS)}`, coach.voice);
    else if (next.has(i)) speak(String(next.size), coach.voice);
  };
  const cols = step.n <= 4 ? step.n : step.n <= 8 ? 4 : 5;
  return (
    <div className="mt-6 animate-pop">
      <CoachBubble coach={coach} def={def} text={step.text} />
      <div className="card p-6 mt-4 text-center">
        <div className="text-4xl font-extrabold" style={{ color: def.color }}>
          {shaded.size}/{step.n}
        </div>
        <div className="grid gap-2 mt-4 justify-center" style={{ gridTemplateColumns: `repeat(${cols}, 56px)` }}>
          {Array.from({ length: step.n }, (_, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className="h-14 rounded-xl border-2 transition-all active:scale-90"
              style={{
                background: shaded.has(i) ? def.color : "white",
                borderColor: shaded.has(i) ? def.color : "#d1d5db",
                opacity: i < pre ? 0.85 : 1,
              }}
            />
          ))}
        </div>
        {complete && (
          <div className="mt-3 font-extrabold text-green-600 animate-pop">🎉 That's {step.label}!</div>
        )}
      </div>
      {complete && <DoneBanner def={def} onDone={onDone} />}
    </div>
  );
}

function PickStep({ step, coach, def, onDone }: { step: Extract<IStep, { kind: "pick" }>; coach: Coach; def: SubjectDef; onDone: () => void }) {
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);
  const [gotIt, setGotIt] = useState(false);
  const choose = (i: number) => {
    if (gotIt) return;
    if (i === step.correct) {
      setGotIt(true);
      speak(randPick(coach.praise), coach.voice);
    } else {
      setWrongIdx(i);
      speak(step.hint, coach.voice);
    }
  };
  return (
    <div className="mt-6 animate-pop">
      <CoachBubble coach={coach} def={def} text={step.text} />
      <div className="card p-6 mt-4 text-center">
        {step.visual && <div className="visual-block text-4xl mb-4">{step.visual}</div>}
        <div className={`grid gap-3 ${step.tiles.length > 2 ? "sm:grid-cols-3 grid-cols-1" : "grid-cols-2"}`}>
          {step.tiles.map((t, i) => {
            let cls = "bg-gray-50 border-2 border-gray-200 text-gray-800";
            if (gotIt && i === step.correct) cls = "bg-green-100 border-2 border-green-500 text-green-800";
            else if (wrongIdx === i) cls = "bg-red-100 border-2 border-red-300 text-red-500";
            return (
              <button key={i} onClick={() => choose(i)} className={`btn-big text-lg py-5 ${cls} ${wrongIdx === i ? "animate-wiggle" : ""}`}>
                {t}
              </button>
            );
          })}
        </div>
        {wrongIdx !== null && !gotIt && (
          <div className="mt-3 text-sm font-bold text-gray-600 animate-pop">
            {coach.emoji} {step.hint}
          </div>
        )}
        {gotIt && <div className="mt-3 font-extrabold text-green-600 animate-pop">🎉 Exactly right!</div>}
      </div>
      {gotIt && <DoneBanner def={def} onDone={onDone} />}
    </div>
  );
}

/* ---------------- understand stage ---------------- */

const NEEDED = 3;

function Understand({ def, coach, unit, autoRead, onDone }: { def: SubjectDef; coach: Coach; unit: UnitDef; autoRead?: boolean; onDone: () => void }) {
  const makeQ = (): Question => {
    if (unit.gen) return unit.gen(0.4);
    if (unit.bank?.length) return staticQ(unit.bank[Math.floor(Math.random() * unit.bank.length)]);
    return { prompt: "", choices: [""], answer: 0 };
  };
  const [q, setQ] = useState<Question>(makeQ);
  const [gotCount, setGotCount] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const introSpoken = useRef(false);

  useEffect(() => {
    if (!introSpoken.current) {
      introSpoken.current = true;
      speak(
        `Now YOU try! No timer, no rush — get ${NEEDED} right and we unlock the speed mission. I'll help if you get stuck!`,
        coach.voice
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // read the question aloud for pre-readers
  useEffect(() => {
    if (autoRead && q.prompt) {
      const t = setTimeout(() => speak(q.prompt, coach.voice), 700);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const right = chosen !== null && chosen === q.answer;
  const wrong = chosen !== null && chosen !== q.answer;

  const choose = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === q.answer) {
      setGotCount(gotCount + 1);
      speak(randPick(coach.praise), coach.voice);
    } else {
      setShowSteps(true);
      if (q.steps) speakLines([randPick(coach.oops), ...q.steps], coach.voice);
      else speak(`${randPick(coach.oops)} ${q.explain ?? coach.reveal(q.choices[q.answer])}`, coach.voice);
    }
  };

  const nextQ = () => {
    if (right && gotCount >= NEEDED) {
      onDone();
      return;
    }
    setQ(makeQ());
    setChosen(null);
    setShowSteps(false);
  };

  const tryAgain = () => {
    setChosen(null);
    // keep steps visible so she can follow them while retrying
  };

  return (
    <div className="mt-6 animate-pop">
      <div className="flex items-center justify-between">
        <CoachBubble coach={coach} def={def} text={`Your turn — no timer! ${gotCount}/${NEEDED} stars earned.`} />
      </div>
      <div className="flex justify-center gap-2 mt-3">
        {Array.from({ length: NEEDED }, (_, i) => (
          <span key={i} className={`text-2xl ${i < gotCount ? "" : "opacity-25"}`}>⭐</span>
        ))}
      </div>
      <div className="card p-6 mt-3">
        {q.visual && <div className="visual-block text-center text-4xl mb-4">{q.visual}</div>}
        <div className="flex items-center justify-center gap-2">
          <div className="text-xl font-extrabold text-gray-800 text-center">{q.prompt}</div>
          <button
            onClick={() => speak(q.prompt, coach.voice)}
            className="shrink-0 text-lg p-1.5 rounded-full active:scale-90"
            style={{ background: def.soft }}
            title="Read it to me!"
          >
            🔊
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          {q.choices.map((c, i) => {
            let cls = "bg-gray-50 border-2 border-gray-200 text-gray-800";
            if (chosen !== null) {
              if (i === q.answer && right) cls = "bg-green-100 border-2 border-green-500 text-green-800";
              else if (i === chosen) cls = "bg-red-100 border-2 border-red-400 text-red-700";
              else cls = "bg-gray-50 border-2 border-gray-100 text-gray-400";
            }
            return (
              <button key={i} onClick={() => choose(i)} className={`btn-big text-base py-4 ${cls}`}>
                {c}
              </button>
            );
          })}
        </div>

        {(showSteps || wrong) && (
          <div className="mt-4 rounded-2xl p-4 animate-pop" style={{ background: def.soft }}>
            <div className="flex items-start gap-3">
              <div className="text-3xl">{coach.emoji}</div>
              <div className="flex-1">
                <div className="font-extrabold text-sm" style={{ color: def.color }}>
                  {coach.name} walks you through it:
                </div>
                {q.steps ? (
                  <ol className="mt-1.5 space-y-1.5">
                    {q.steps.map((s, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-700">
                        <span className="shrink-0 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center mt-0.5" style={{ background: def.color }}>
                          {i + 1}
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <div className="text-sm text-gray-700 mt-1">{q.explain ?? coach.reveal(q.choices[q.answer])}</div>
                )}
              </div>
            </div>
          </div>
        )}

        {right && (
          <button onClick={nextQ} className="btn-big w-full mt-4 text-white animate-pop" style={{ background: def.color }}>
            {gotCount >= NEEDED ? "⭐⭐⭐ Unlock the mission!" : "Next one! ➡️"}
          </button>
        )}
        {wrong && (
          <button onClick={tryAgain} className="btn-big w-full mt-4 text-white animate-pop" style={{ background: def.color }}>
            Follow the steps — try again! 💪
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------------- ready handoff ---------------- */

function ReadyCard({ def, coach, missionTitle, fluency, onDone }: { def: SubjectDef; coach: Coach; missionTitle: string; fluency: boolean; onDone: () => void }) {
  useEffect(() => {
    speak(
      fluency
        ? `You LEARNED it. You UNDERSTAND it. Now we make it automatic — fast answers, no counting on fingers! Ready for the ${missionTitle}? Three, two, one…`
        : `You learned it AND you understand it. Now show me what you've got — a real round, and I'll be right here cheering. Ready? Let's go!`,
      coach.voice
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="card p-8 mt-6 text-center animate-pop">
      <div className="text-6xl animate-wiggle">{coach.emoji}</div>
      <div className="font-extrabold text-2xl text-gray-800 mt-3">
        {fluency ? "Stage 3: FLUENCY! ⚡" : "Stage 3: SHOW WHAT YOU KNOW! 🌟"}
      </div>
      <p className="text-gray-600 font-semibold mt-2">
        {fluency ? (
          <>You learned it. You understand it. Now we make it <b>automatic</b> — that's when math facts pop into your head faster than I chase snack trucks!</>
        ) : (
          <>You learned it. You understand it. Now let's make it <b>stick</b> — a real round, with {coach.name} cheering you on!</>
        )}
      </p>
      <button onClick={onDone} className="btn-big w-full mt-6 text-white text-xl" style={{ background: def.color }}>
        {fluency ? `Start the ${missionTitle}! 🏁` : "Start the round! 🌟"}
      </button>
    </div>
  );
}
