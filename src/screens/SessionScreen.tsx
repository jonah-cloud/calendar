import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { View } from "../App";
import BuddyAvatar, { type BuddyMood } from "../components/BuddyAvatar";
import LessonFlow from "../components/LessonFlow";
import { MASTERY_PCT, subjectById } from "../lib/content";
import { interactiveFor } from "../lib/content/interactive";
import { themeForUnit, type MissionTheme } from "../lib/content/mathLessons";
import { coachFor, randomOops, randomPraise, randomZoom } from "../lib/coaches";
import {
  AFTER_BREATHE,
  AFTER_PUSH,
  BREATHE_SCRIPT,
  DEFAULT_BUDDY,
  INTERVENE_CHOICES,
  buddyVoice,
  checkinLine,
  newTracker,
  trackAnswer,
  type BuddyMoment,
} from "../lib/buddy";
import {
  buildPlacement,
  buildReviewRound,
  buildRound,
  nextUnit,
  scorePlacement,
  unitKey,
} from "../lib/engine";
import { pick } from "../lib/rand";
import { isMuted, setMuted, speak, speakLines, stopSpeaking } from "../lib/speech";
import { useStore } from "../lib/store";
import type { Kid, Question, SubjectId, UnitDef } from "../lib/types";

interface Props {
  kid: Kid;
  subject: SubjectId;
  mode: "learn" | "review" | "placement";
  go: (v: View) => void;
}

/** Answers faster than this (ms) count as "lightning" for the speed meter. */
const FAST_MS = 6000;
/** Stalled this long with no answer → buddy checks in. */
const STALL_MS = 25000;

export default function SessionScreen({ kid, subject, mode, go }: Props) {
  const { state, dispatch } = useStore();
  const def = subjectById(subject);
  const coach = coachFor(subject);
  const buddy = kid.buddy ?? DEFAULT_BUDDY;
  const isMathGame = subject === "math";

  // Build the round once
  const round = useMemo(() => {
    if (mode === "placement") {
      const p = buildPlacement(subject);
      return { questions: p.questions, levels: p.levels, unitLabel: "Placement Adventure", reviewUnits: [] as string[], key: "placement", unit: null as UnitDef | null };
    }
    if (mode === "review") {
      const r = buildReviewRound(kid, subject);
      return { questions: r.questions, levels: [], unitLabel: "Review Round", reviewUnits: r.units, key: "review", unit: null };
    }
    const nu = nextUnit(kid, subject);
    if (!nu) return { questions: [] as Question[], levels: [], unitLabel: "All done!", reviewUnits: [], key: "done", unit: null };
    return {
      questions: buildRound(nu.unit, false),
      levels: [],
      unitLabel: `${nu.unit.emoji} ${nu.unit.title}`,
      reviewUnits: [],
      key: unitKey(nu.level, nu.unit.id),
      unit: nu.unit,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme: MissionTheme = useMemo(() => themeForUnit(round.key), [round.key]);
  const interactive = useMemo(
    () => (mode === "learn" && round.unit ? interactiveFor(subject, round.unit) : null),
    [mode, round.unit, subject]
  );
  const lessonAlreadyDone = (kid.subjects[subject].lessons ?? []).includes(round.key);
  /** read questions aloud automatically for pre-readers */
  const autoRead = subject === "reading" && kid.subjects.reading.level <= 2;

  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [fastFlags, setFastFlags] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);
  const [coachLine, setCoachLine] = useState("");
  const [showLesson, setShowLesson] = useState(() => !!interactive && !lessonAlreadyDone);
  const [muted, setMutedState] = useState(isMuted());
  const [buddyMoment, setBuddyMoment] = useState<BuddyMoment | null>(null);
  const [overlay, setOverlay] = useState<"none" | "intervene" | "breathe">("none");
  const [easyOverrides, setEasyOverrides] = useState<Record<number, Question>>({});
  const [checkin, setCheckin] = useState<string | null>(null);

  const trackerRef = useRef(newTracker());

  // timers
  const startRef = useRef(Date.now());
  const qStartRef = useRef(Date.now());
  const timesRef = useRef<number[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const blockSecs = state.settings.blockMinutes * 60;
  useEffect(() => {
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - startRef.current) / 1000)), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => () => stopSpeaking(), []);

  // auto-read the question for pre-readers
  useEffect(() => {
    if (autoRead && !finished && !showLesson && chosen === null) {
      const current = easyOverrides[idx] ?? round.questions[idx];
      if (current?.prompt) {
        const t = setTimeout(() => speak(current.prompt, coach.voice), 600);
        return () => clearTimeout(t);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, showLesson, finished]);

  // stall check-in: buddy gently pings if a question sits unanswered
  useEffect(() => {
    if (finished || showLesson || chosen !== null || overlay !== "none") return;
    const t = setTimeout(() => {
      const line = checkinLine();
      setCheckin(line);
      speak(line, buddyVoice(buddy));
    }, STALL_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, chosen, finished, showLesson, overlay]);

  const toggleMute = () => {
    const m = !muted;
    setMuted(m);
    setMutedState(m);
  };

  const q: Question | undefined = easyOverrides[idx] ?? round.questions[idx];
  const total = round.questions.length;

  const choose = (i: number) => {
    if (chosen !== null || !q) return;
    const ms = Date.now() - qStartRef.current;
    timesRef.current.push(ms);
    const right = i === q.answer;
    const fast = right && ms < FAST_MS;
    setChosen(i);
    setCheckin(null);
    setAnswers((a) => [...a, right]);
    setFastFlags((f) => [...f, fast]);

    const moment = trackAnswer(trackerRef.current, right, ms, mode === "learn");
    setBuddyMoment(moment && moment.kind !== "intervene" ? moment : null);

    if (right) {
      const line = fast ? randomZoom(subject) : randomPraise(subject);
      setCoachLine(line);
      if (moment?.kind === "comeback") speak(moment.line, buddyVoice(buddy));
      else speak(line, coach.voice);
    } else {
      const line = randomOops(subject);
      setCoachLine(line);
      if (moment?.kind === "guessing") {
        // she's rushing, not confused — buddy handles it, coach box still shows steps
        speak(moment.line, buddyVoice(buddy));
      } else if (q.steps) {
        speakLines([line, ...q.steps], coach.voice);
      } else {
        speak(`${line} ${q.explain ?? coach.reveal(q.choices[q.answer])}`, coach.voice);
      }
      if (moment?.kind === "intervene") {
        // big intervention opens after she reads the walkthrough and taps next
        setBuddyMoment(moment);
      }
    }
  };

  const next = () => {
    if (buddyMoment?.kind === "intervene" && overlay === "none") {
      setOverlay("intervene");
      speak(buddyMoment.line, buddyVoice(buddy));
      return;
    }
    reallyNext();
  };

  const reallyNext = () => {
    setBuddyMoment(null);
    if (idx + 1 >= total) {
      finish([...answers]);
    } else {
      setIdx(idx + 1);
      setChosen(null);
      setCoachLine("");
      setCheckin(null);
      qStartRef.current = Date.now();
    }
  };

  /** After the intervention, serve gentler questions to rebuild confidence. */
  const easeRemaining = () => {
    if (!round.unit?.gen) return;
    const overrides: Record<number, Question> = { ...easyOverrides };
    for (let i = idx + 1; i < total; i++) overrides[i] = round.unit.gen(0.2);
    setEasyOverrides(overrides);
  };

  const resolveIntervention = (choice: keyof typeof INTERVENE_CHOICES) => {
    if (choice === "breathe") {
      setOverlay("breathe");
      speak(BREATHE_SCRIPT, buddyVoice(buddy));
      easeRemaining();
      return;
    }
    if (choice === "reteach" && interactive) {
      setOverlay("none");
      setBuddyMoment(null);
      easeRemaining();
      setShowLesson(true);
      return;
    }
    setOverlay("none");
    speak(pick(AFTER_PUSH), buddyVoice(buddy));
    easeRemaining();
    reallyNext();
  };

  const finish = (finalAnswers: boolean[]) => {
    const correct = finalAnswers.filter(Boolean).length;
    const minutes = Math.max(1, Math.round((Date.now() - startRef.current) / 60000));
    const avgMs = timesRef.current.length
      ? Math.round(timesRef.current.reduce((a, b) => a + b, 0) / timesRef.current.length)
      : undefined;
    if (mode === "placement") {
      const placedLevel = scorePlacement(subject, round.levels, finalAnswers);
      dispatch({ type: "SET_PLACED", kidId: kid.id, subject, level: placedLevel });
      dispatch({ type: "ROUND_DONE", kidId: kid.id, subject, unitKey: "placement", correct, total: finalAnswers.length, minutes, mode, avgMs });
    } else {
      dispatch({
        type: "ROUND_DONE",
        kidId: kid.id,
        subject,
        unitKey: round.key,
        correct,
        total: finalAnswers.length,
        minutes,
        mode,
        reviewedUnits: round.reviewUnits,
        avgMs,
      });
    }
    setFinished(true);
  };

  // ----- interactive concept lesson (explore → understand → fluency handoff) -----
  if (showLesson && interactive && round.unit) {
    return (
      <LessonFlow
        def={def}
        coach={coach}
        unit={round.unit}
        unitLabel={round.unitLabel}
        steps={interactive}
        missionTitle={theme.title}
        fluency={isMathGame}
        autoRead={autoRead}
        onDone={() => {
          dispatch({ type: "LESSON_DONE", kidId: kid.id, subject, unitKey: round.key });
          setShowLesson(false);
          qStartRef.current = Date.now();
        }}
        onExit={() => go({ name: "kid", kidId: kid.id })}
      />
    );
  }

  // ----- empty round guard -----
  if (!q && !finished) {
    return (
      <Screen def={def}>
        <div className="card p-8 text-center max-w-md mx-auto mt-16">
          <div className="text-5xl mb-3">🏆</div>
          <div className="font-extrabold text-xl text-gray-800">Nothing to do here right now!</div>
          <p className="text-gray-500 mt-2">
            {mode === "review" ? "No reviews are due. Amazing memory!" : "You've mastered everything available!"}
          </p>
          <button onClick={() => go({ name: "kid", kidId: kid.id })} className="btn-big mt-6 text-white w-full" style={{ background: def.color }}>
            Back home
          </button>
        </div>
      </Screen>
    );
  }

  // ----- results -----
  if (finished) {
    const correct = answers.filter(Boolean).length;
    const pct = answers.length ? correct / answers.length : 0;
    const mastered = pct >= MASTERY_PCT;
    const fastCount = fastFlags.filter(Boolean).length;
    const stars = fastCount >= 8 ? 3 : fastCount >= 5 ? 2 : 1;
    const freshKid = state.kids.find((k) => k.id === kid.id)!;
    const placedLevel = freshKid.subjects[subject].level;

    if (isMathGame && mode !== "placement") {
      return (
        <Screen def={def}>
          <div className="card p-8 text-center max-w-md mx-auto mt-16 animate-pop">
            <div className="flex justify-center">
              <BuddyAvatar buddy={buddy} size={90} mood={mastered ? "cheer" : "concerned"} />
            </div>
            {mastered ? (
              <>
                <div className="font-extrabold text-2xl text-gray-800 mt-2">MISSION COMPLETE!</div>
                <div className="text-3xl mt-2">{"🌟".repeat(stars)}{"☆".repeat(3 - stars)}</div>
                <p className="text-gray-600 mt-3 font-semibold">{theme.win}</p>
                <p className="text-sm text-gray-500 mt-2">
                  ⚡ {fastCount} lightning answer{fastCount === 1 ? "" : "s"}!{" "}
                  {stars < 3 && "Even faster next time — that's how facts become automatic!"}
                </p>
              </>
            ) : (
              <>
                <div className="font-extrabold text-2xl text-gray-800 mt-2">Sooo close!</div>
                <p className="text-gray-600 mt-3 font-semibold">{theme.almost}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {buddy.name} says: every champion runs the track twice. You worked hard on the
                  tricky ones — that's exactly how it's supposed to feel!
                </p>
              </>
            )}
            <div className="flex gap-3 mt-6">
              {mode === "learn" && !mastered && (
                <button onClick={() => go({ name: "session", kidId: kid.id, subject, mode: "learn" })} className="btn-big flex-1 text-white" style={{ background: def.color }}>
                  Run it again! 🐆
                </button>
              )}
              <button
                onClick={() => go({ name: "kid", kidId: kid.id })}
                className={`btn-big flex-1 ${mode === "learn" && !mastered ? "bg-gray-100 text-gray-600" : "text-white"}`}
                style={mode === "learn" && !mastered ? {} : { background: def.color }}
              >
                {mastered ? "Next mission! 🚀" : "Home"}
              </button>
            </div>
          </div>
        </Screen>
      );
    }

    return (
      <Screen def={def}>
        <div className="card p-8 text-center max-w-md mx-auto mt-16 animate-pop">
          <div className="text-6xl mb-3">
            {mode === "placement" ? "🧭" : mastered ? "🌟" : pct >= 0.7 ? "💪" : "🌱"}
          </div>
          <div className="font-extrabold text-2xl text-gray-800">
            {mode === "placement"
              ? `You're starting at Level ${placedLevel}!`
              : mastered
                ? "MASTERED!"
                : pct >= 0.7
                  ? "So close!"
                  : "Good practice!"}
          </div>
          {mode !== "placement" && !isMathGame && (
            <div className="text-lg text-gray-600 mt-2">
              {correct} / {answers.length} correct ({Math.round(pct * 100)}%)
            </div>
          )}
          {mode === "learn" && !mastered && (
            <p className="text-sm text-gray-500 mt-2">
              {coach.name} says: you need {Math.round(MASTERY_PCT * 100)}% to master a skill — just
              like the real Alpha kids. One more try, I'll help!
            </p>
          )}
          {mode === "placement" && (
            <p className="text-sm text-gray-500 mt-2">
              {coach.emoji} {coach.name} will start {def.name} right at your level — not too easy,
              not too hard.
            </p>
          )}
          <div className="flex gap-3 mt-6">
            {mode === "learn" && !mastered && (
              <button onClick={() => go({ name: "session", kidId: kid.id, subject, mode: "learn" })} className="btn-big flex-1 text-white" style={{ background: def.color }}>
                Try again 🔁
              </button>
            )}
            <button
              onClick={() => go({ name: "kid", kidId: kid.id })}
              className={`btn-big flex-1 ${mode === "learn" && !mastered ? "bg-gray-100 text-gray-600" : "text-white"}`}
              style={mode === "learn" && !mastered ? {} : { background: def.color }}
            >
              {mastered ? "Next! 🚀" : "Home"}
            </button>
          </div>
        </div>
      </Screen>
    );
  }

  // ----- question view -----
  const answeredRight = answers.filter(Boolean).length;
  const missionPct = (answeredRight / total) * 100;
  const progressPct = (idx / total) * 100;
  const timePct = Math.min(100, (elapsed / blockSecs) * 100);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const fastCount = fastFlags.filter(Boolean).length;
  const wrong = chosen !== null && !answers[answers.length - 1];

  return (
    <Screen def={def}>
      <div className="max-w-2xl mx-auto">
        {/* top bar */}
        <div className="flex items-center gap-2 pt-2">
          <button onClick={() => go({ name: "kid", kidId: kid.id })} className="text-2xl p-1 active:scale-90">✖️</button>
          <div className="flex-1">
            <div className="h-4 bg-white/60 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progressPct}%`, background: def.color }} />
            </div>
          </div>
          {interactive && (
            <button
              onClick={() => setShowLesson(true)}
              className="font-bold text-sm px-3 py-1 rounded-full bg-white/70"
              style={{ color: def.color }}
            >
              🎓 Teach me
            </button>
          )}
          <button onClick={toggleMute} className="text-lg p-1.5 rounded-full bg-white/70 active:scale-90">
            {muted ? "🔇" : "🔊"}
          </button>
          <div className="font-bold text-sm px-3 py-1 rounded-full bg-white/70" style={{ color: def.color }}>
            {mins}:{secs.toString().padStart(2, "0")}
          </div>
        </div>
        {/* focus meter */}
        <div className="mt-1 h-1.5 bg-white/40 rounded-full overflow-hidden">
          <div className="h-full bg-amber-400 transition-all" style={{ width: `${timePct}%` }} />
        </div>

        {/* mission track (math) or unit label */}
        {isMathGame && mode !== "placement" ? (
          <div className="card mt-3 px-4 py-3">
            <div className="flex items-center justify-between text-xs font-extrabold" style={{ color: def.color }}>
              <span>{theme.title} · {round.unitLabel}</span>
              <span className="text-amber-500">⚡ ×{fastCount}</span>
            </div>
            <div className="relative h-10 mt-1">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-gray-100" />
              <div className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full transition-all duration-500" style={{ width: `${missionPct}%`, background: def.color, opacity: 0.3 }} />
              <div className="absolute top-1/2 -translate-y-1/2 text-2xl transition-all duration-500" style={{ left: `calc(${Math.min(missionPct, 92)}% )` }}>
                {theme.start}
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl">{theme.goal}</div>
            </div>
          </div>
        ) : (
          <div className="text-center mt-3 font-bold text-sm" style={{ color: def.color }}>
            {def.emoji} {round.unitLabel} · Question {idx + 1} of {total}
          </div>
        )}

        {/* buddy check-in bubble */}
        {checkin && chosen === null && (
          <div className="flex items-center gap-2 mt-3 animate-pop">
            <BuddyAvatar buddy={buddy} size={54} mood="idle" />
            <div className="flex-1 bg-white rounded-2xl px-4 py-2.5 text-sm font-bold text-gray-600 shadow">
              {checkin}
            </div>
          </div>
        )}

        {/* question card */}
        <div className="card p-6 mt-3 animate-pop" key={idx}>
          {q!.visual && <div className="visual-block text-center text-4xl mb-4">{q!.visual}</div>}
          <div className="flex items-center justify-center gap-2">
            <div className="text-xl font-extrabold text-gray-800 text-center">{q!.prompt}</div>
            <button
              onClick={() => speak(q!.prompt, coach.voice)}
              className="shrink-0 text-lg p-1.5 rounded-full active:scale-90"
              style={{ background: def.soft }}
              title="Read it to me!"
            >
              🔊
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {q!.choices.map((c, i) => {
              const isAnswer = i === q!.answer;
              const isChosen = chosen === i;
              let cls = "bg-gray-50 border-2 border-gray-200 text-gray-800";
              if (chosen !== null) {
                if (isAnswer) cls = "bg-green-100 border-2 border-green-500 text-green-800";
                else if (isChosen) cls = "bg-red-100 border-2 border-red-400 text-red-700";
                else cls = "bg-gray-50 border-2 border-gray-100 text-gray-400";
              }
              return (
                <button key={i} onClick={() => choose(i)} className={`btn-big text-base py-4 ${cls} ${chosen === null ? "hover:border-violet-400" : ""}`}>
                  {c}
                </button>
              );
            })}
          </div>

          {/* feedback */}
          {chosen !== null && (
            <div className="mt-4 animate-pop">
              {wrong ? (
                <div className="rounded-2xl p-4" style={{ background: def.soft }}>
                  <div className="flex items-start gap-3">
                    <div className="text-4xl animate-wiggle">{coach.emoji}</div>
                    <div className="flex-1">
                      <div className="font-extrabold text-sm" style={{ color: def.color }}>{coach.name} says:</div>
                      <div className="text-sm font-semibold text-gray-700 mt-0.5">{coachLine}</div>
                      {q!.steps ? (
                        <ol className="mt-2 space-y-1.5">
                          {q!.steps.map((s, i) => (
                            <li key={i} className="flex gap-2 text-sm text-gray-700">
                              <span className="shrink-0 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center mt-0.5" style={{ background: def.color }}>
                                {i + 1}
                              </span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <div className="text-sm text-gray-700 mt-2">{q!.explain ?? coach.reveal(q!.choices[q!.answer])}</div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="font-extrabold text-lg text-green-600">{coach.emoji} {coachLine}</div>
                  {q!.explain && !isMathGame && <div className="text-sm text-gray-500 mt-1">💡 {q!.explain}</div>}
                </div>
              )}

              {/* buddy support bubble (encourage/guessing/comeback) */}
              {buddyMoment && buddyMoment.kind !== "intervene" && (
                <div className="flex items-center gap-2 mt-3 animate-pop">
                  <BuddyAvatar buddy={buddy} size={54} mood={buddyMoment.kind === "comeback" ? "cheer" : "idle"} />
                  <div className="flex-1 bg-violet-50 border-2 border-violet-200 rounded-2xl px-4 py-2.5 text-sm font-bold text-violet-800">
                    {buddy.name}: {buddyMoment.line}
                  </div>
                </div>
              )}

              <button onClick={next} className="btn-big mt-3 w-full text-white" style={{ background: def.color }}>
                {idx + 1 >= total ? (isMathGame && mode !== "placement" ? "Finish the mission! 🏁" : "See results ✨") : wrong ? "Got it — next! ➡️" : "Next ➡️"}
              </button>
            </div>
          )}
        </div>

        {/* running score — hidden for math (missions show the track instead) */}
        {!isMathGame && (
          <div className="text-center mt-4 text-sm font-bold text-gray-500">
            {answers.filter(Boolean).length} ✅ · {answers.filter((a) => !a).length} ❌ · mastery needs {Math.round(MASTERY_PCT * 100)}%
          </div>
        )}
      </div>

      {/* --- struggle intervention overlay --- */}
      {overlay === "intervene" && buddyMoment?.kind === "intervene" && (
        <Overlay>
          <div className="flex justify-center">
            <BuddyAvatar buddy={buddy} size={130} mood="concerned" />
          </div>
          <div className="font-extrabold text-xl text-gray-800 text-center mt-2">{buddy.name} calls a huddle!</div>
          <p className="text-gray-600 font-semibold text-center mt-2 text-sm leading-relaxed">{buddyMoment.line}</p>
          <div className="space-y-2.5 mt-5">
            <button onClick={() => resolveIntervention("breathe")} className="btn-big w-full py-3 text-base bg-sky-100 text-sky-800">
              {INTERVENE_CHOICES.breathe}
            </button>
            {interactive && (
              <button onClick={() => resolveIntervention("reteach")} className="btn-big w-full py-3 text-base bg-amber-100 text-amber-800">
                {INTERVENE_CHOICES.reteach}
              </button>
            )}
            <button onClick={() => resolveIntervention("push")} className="btn-big w-full py-3 text-base text-white" style={{ background: def.color }}>
              {INTERVENE_CHOICES.push}
            </button>
          </div>
        </Overlay>
      )}

      {/* --- balloon breathing overlay --- */}
      {overlay === "breathe" && (
        <BreatheOverlay
          buddy={buddy}
          color={def.color}
          onDone={() => {
            setOverlay("none");
            setBuddyMoment(null);
            speak(pick(AFTER_BREATHE), buddyVoice(buddy));
            reallyNext();
          }}
        />
      )}
    </Screen>
  );
}

function Overlay({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className="card max-w-sm w-full p-6 animate-pop">{children}</div>
    </div>
  );
}

function BreatheOverlay({ buddy, color, onDone }: { buddy: Kid["buddy"] & object; color: string; onDone: () => void }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 20000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="fixed inset-0 bg-sky-900/80 backdrop-blur flex flex-col items-center justify-center p-6 z-50">
      <div className="balloon-breathe text-[9rem] leading-none select-none">🎈</div>
      <div className="text-white font-extrabold text-xl mt-6 text-center">
        Breathe in as the balloon grows…
        <br />
        out as it shrinks 🌬️
      </div>
      <div className="mt-4">
        <BuddyAvatar buddy={buddy} size={80} mood="idle" />
      </div>
      {ready ? (
        <button onClick={onDone} className="btn-big mt-6 text-white animate-pop" style={{ background: color }}>
          I feel better — let's go! 💪
        </button>
      ) : (
        <div className="text-white/60 font-bold mt-6 text-sm">four big breaths…</div>
      )}
    </div>
  );
}

function Screen({ def, children }: { def: ReturnType<typeof subjectById>; children: ReactNode }) {
  return (
    <div className="min-h-screen p-4 pb-12" style={{ background: `linear-gradient(160deg, ${def.soft}, #f5f3ff 60%)` }}>
      {children}
    </div>
  );
}
