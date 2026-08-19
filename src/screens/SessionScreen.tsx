import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { View } from "../App";
import BuddyAvatar from "../components/BuddyAvatar";
import CoachCharacter from "../components/CoachCharacter";
import { AnswerTile, BigButton, Confetti, KidBg } from "../components/Ui";
import WorkedExample from "../components/WorkedExample";
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
  /** showing the visual walkthrough for the current question */
  const [walkthrough, setWalkthrough] = useState(false);
  /** questions whose result is already recorded (so a retry doesn't double-count) */
  const recordedRef = useRef<Set<number>>(new Set());
  /** questions that already got a walkthrough — never trap a kid in a loop */
  const walkedRef = useRef<Set<number>>(new Set());

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

    // Only the FIRST attempt at a question counts — a retry after the coach's
    // walkthrough is practice, not a second score.
    const firstAttempt = !recordedRef.current.has(idx);
    if (firstAttempt) {
      recordedRef.current.add(idx);
      setAnswers((a) => [...a, right]);
      setFastFlags((f) => [...f, fast]);
    }
    // Only first attempts feed the struggle tracker — a guided retry is
    // practice, and shouldn't count as another miss.
    const moment = firstAttempt
      ? trackAnswer(trackerRef.current, right, ms, mode === "learn")
      : null;
    setBuddyMoment(moment && moment.kind !== "intervene" ? moment : null);

    // A wrong answer with a visual explanation opens the walkthrough — but only
    // once per question (so nobody gets stuck in a loop), and never when the
    // buddy is stepping in with a huddle, which takes priority.
    if (!right && q.work?.length && !walkedRef.current.has(idx) && moment?.kind !== "intervene") {
      walkedRef.current.add(idx);
      setWalkthrough(true);
    }

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
      } else if (q.work?.length) {
        speak(line, coach.voice);
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
    setWalkthrough(false);
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
          <BigButton onClick={() => go({ name: "kid", kidId: kid.id })} color={def.color} className="mt-6 w-full">
            Back home
          </BigButton>
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
          <div className="card-pop p-8 text-center max-w-md mx-auto mt-12 animate-pop">
            {mastered && <Confetti />}
            <div className="flex justify-center items-end gap-2" style={{ color: def.color }}>
              <CoachCharacter subject={subject} size={mastered ? 132 : 108} mood={mastered ? "excited" : "oops"} />
              <BuddyAvatar buddy={buddy} size={72} mood={mastered ? "cheer" : "concerned"} />
            </div>
            {mastered ? (
              <>
                <div className="font-black text-3xl text-gray-800 mt-3">MISSION COMPLETE!</div>
                <div className="flex justify-center gap-1 mt-3">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className={`text-5xl ${i < stars ? "animate-star" : "opacity-25"}`} style={{ animationDelay: `${i * 0.18}s` }}>
                      {i < stars ? "🌟" : "☆"}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mt-3 font-bold text-lg">{theme.win}</p>
                <div className="mt-3 inline-block px-4 py-2 rounded-2xl bg-amber-100 font-black text-amber-600">
                  ⚡ {fastCount} lightning answers
                </div>
                {stars < 3 && <p className="text-sm text-gray-400 mt-2 font-semibold">Even faster next time for 3 stars!</p>}
              </>
            ) : (
              <>
                <div className="font-black text-3xl text-gray-800 mt-3">Sooo close!</div>
                <p className="text-gray-600 mt-3 font-bold text-lg">{theme.almost}</p>
                <p className="text-sm text-gray-500 mt-2 font-semibold">
                  {buddy.name} says: every champion runs the track twice. You worked hard on the
                  tricky ones — that's exactly how it's supposed to feel!
                </p>
              </>
            )}
            <div className="flex gap-3 mt-6">
              {mode === "learn" && !mastered && (
                <BigButton onClick={() => go({ name: "session", kidId: kid.id, subject, mode: "learn" })} color={def.color} className="flex-1">
                  Again! 🔁
                </BigButton>
              )}
              {mode === "learn" && !mastered ? (
                <button onClick={() => go({ name: "kid", kidId: kid.id })} className="btn-soft flex-1 bg-gray-100 text-gray-600 px-6 py-4 text-xl">
                  Home
                </button>
              ) : (
                <BigButton onClick={() => go({ name: "kid", kidId: kid.id })} color={def.color} className="flex-1">
                  Next mission! 🚀
                </BigButton>
              )}
            </div>
          </div>
        </Screen>
      );
    }

    return (
      <Screen def={def}>
        <div className="card-pop p-8 text-center max-w-md mx-auto mt-12 animate-pop">
          {mastered && <Confetti />}
          <div className="flex justify-center" style={{ color: def.color }}>
            <CoachCharacter subject={subject} size={mastered ? 132 : 112} mood={mastered ? "excited" : pct >= 0.7 ? "happy" : "idle"} />
          </div>
          <div className="text-5xl my-1">
            {mode === "placement" ? "🧭" : mastered ? "🌟" : pct >= 0.7 ? "💪" : "🌱"}
          </div>
          <div className="font-black text-3xl text-gray-800">
            {mode === "placement"
              ? `You're starting at Level ${placedLevel}!`
              : mastered
                ? "MASTERED!"
                : pct >= 0.7
                  ? "So close!"
                  : "Good practice!"}
          </div>
          {mode !== "placement" && !isMathGame && (
            <div className="flex justify-center gap-1.5 mt-4 flex-wrap">
              {answers.map((a, i) => (
                <span key={i} className={`w-8 h-8 rounded-xl flex items-center justify-center text-lg font-black ${a ? "bg-green-100" : "bg-red-100"}`}>
                  {a ? "✓" : "✕"}
                </span>
              ))}
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
              {coach.name} will start {def.name} right at your level — not too easy,
              not too hard.
            </p>
          )}
          <div className="flex gap-3 mt-6">
            {mode === "learn" && !mastered && (
              <BigButton onClick={() => go({ name: "session", kidId: kid.id, subject, mode: "learn" })} color={def.color} className="flex-1">
                Try again 🔁
              </BigButton>
            )}
            {mode === "learn" && !mastered ? (
              <button onClick={() => go({ name: "kid", kidId: kid.id })} className="btn-soft flex-1 bg-gray-100 text-gray-600 px-6 py-4 text-xl">
                Home
              </button>
            ) : (
              <BigButton onClick={() => go({ name: "kid", kidId: kid.id })} color={def.color} className="flex-1">
                {mastered ? "Next! 🚀" : "Home"}
              </BigButton>
            )}
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
          <button onClick={() => go({ name: "kid", kidId: kid.id })} className="w-11 h-11 rounded-2xl bg-white/90 text-xl btn-soft shrink-0">✖️</button>
          <div className="flex-1">
            <div className="h-5 bg-white/70 rounded-full overflow-hidden border-2 border-white">
              <div className="h-full rounded-full transition-all duration-500 bar-shine" style={{ width: `${Math.max(progressPct, 4)}%`, background: def.color }} />
            </div>
          </div>
          {interactive && (
            <button
              onClick={() => setShowLesson(true)}
              className="font-extrabold text-sm px-3 py-2 rounded-2xl bg-white/90 btn-soft"
              style={{ color: def.color }}
            >
              🎓 Teach me
            </button>
          )}
          <button onClick={toggleMute} className="w-11 h-11 rounded-2xl bg-white/90 text-lg btn-soft shrink-0">
            {muted ? "🔇" : "🔊"}
          </button>
          <div className="font-extrabold text-sm px-3 py-2 rounded-2xl bg-white/90" style={{ color: def.color }}>
            {mins}:{secs.toString().padStart(2, "0")}
          </div>
        </div>
        {/* focus meter */}
        <div className="mt-1 h-1.5 bg-white/40 rounded-full overflow-hidden">
          <div className="h-full bg-amber-400 transition-all" style={{ width: `${timePct}%` }} />
        </div>

        {/* mission track (math) or unit label */}
        {isMathGame && mode !== "placement" ? (
          <div className="card mt-3 px-5 py-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-black text-base" style={{ color: def.color }}>{theme.title}</span>
              <span className="font-black text-base px-3 py-1 rounded-2xl bg-amber-100 text-amber-600">⚡ {fastCount}</span>
            </div>
            <div className="relative h-14">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-4 rounded-full" style={{ background: def.soft }} />
              <div className="absolute top-1/2 -translate-y-1/2 h-4 rounded-full transition-all duration-500" style={{ width: `${missionPct}%`, background: def.color, opacity: 0.45 }} />
              {Array.from({ length: total }, (_, i) => (
                <span key={i} className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                  style={{ left: `${(i / (total - 1)) * 92 + 4}%`, background: i < answeredRight ? def.color : "#fff", border: `2px solid ${def.color}55` }} />
              ))}
              <div className="absolute top-1/2 -translate-y-1/2 text-4xl transition-all duration-700" style={{ left: `calc(${Math.min(missionPct, 88)}%)` }}>
                {theme.start}
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-4xl">{theme.goal}</div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="font-black text-base px-4 py-2 rounded-2xl bg-white/90" style={{ color: def.color }}>
              {round.unitLabel}
            </span>
            <span className="font-black text-base px-3 py-2 rounded-2xl bg-white/70 text-gray-500">
              {idx + 1}/{total}
            </span>
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
        <div className="card p-5 sm:p-6 mt-3 animate-pop" key={idx}>
          {/* the coach asks the question */}
          <div className="flex items-start gap-2" style={{ color: def.color }}>
            <CoachCharacter subject={subject} size={92} mood={chosen === null ? "idle" : wrong ? "oops" : "happy"} />
            <button
              onClick={() => speak(q!.prompt, coach.voice)}
              className="bubble flex-1 min-w-0 text-left p-4 mt-2 active:scale-[0.99] transition-transform"
              style={{ background: def.soft, border: `4px solid ${def.color}22` }}
              title="Read it to me!"
            >
              <div className="flex items-start gap-2">
                <span className="text-[21px] sm:text-[23px] font-black text-gray-800 leading-snug flex-1">{q!.prompt}</span>
                <span className="shrink-0 text-lg w-9 h-9 rounded-2xl bg-white/80 flex items-center justify-center">🔊</span>
              </div>
            </button>
          </div>
          {q!.visual && (
            <div className="visual-block text-center text-[54px] leading-tight mt-4 mb-1 py-3 rounded-3xl" style={{ background: "#fafaff" }}>
              {q!.visual}
            </div>
          )}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 ${
              wrong && walkthrough && q!.work?.length ? "hidden" : ""
            }`}
          >
            {q!.choices.map((c, i) => {
              const isAnswer = i === q!.answer;
              const isChosen = chosen === i;
              const state = chosen === null ? "idle" : isAnswer ? "right" : isChosen ? "wrong" : "dim";
              return <AnswerTile key={i} label={c} index={i} state={state} color={def.color} onClick={() => choose(i)} />;
            })}
          </div>

          {/* feedback */}
          {chosen !== null && (
            <div className="mt-4 animate-pop">
              {wrong && walkthrough && q!.work?.length ? (
                <WorkedExample
                  subject={subject}
                  coach={coach}
                  def={def}
                  steps={q!.work!}
                  onRetry={() => {
                    setWalkthrough(false);
                    setChosen(null);
                    setCoachLine("");
                    qStartRef.current = Date.now();
                  }}
                />
              ) : wrong ? (
                <div className="rounded-2xl p-4" style={{ background: def.soft }}>
                  <div className="flex items-start gap-3">
                    <div style={{ color: def.color }}><CoachCharacter subject={subject} size={84} mood="oops" /></div>
                    <div className="flex-1">
                      <div className="font-black text-sm uppercase tracking-wide" style={{ color: def.color }}>{coach.name} says:</div>
                      <div className="text-[17px] font-bold text-gray-700 mt-0.5">{coachLine}</div>
                      {q!.steps ? (
                        <ol className="mt-2 space-y-1.5">
                          {q!.steps.map((s, i) => (
                            <li key={i} className="flex gap-2.5 text-[16px] font-semibold text-gray-700">
                              <span className="shrink-0 w-7 h-7 rounded-xl text-white text-sm font-black flex items-center justify-center" style={{ background: def.color }}>
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
                <div className="flex items-center justify-center gap-3">
                  <div style={{ color: def.color }}><CoachCharacter subject={subject} size={76} mood="excited" /></div>
                  <div className="font-black text-2xl text-green-600">{coachLine}</div>
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

              {!(wrong && walkthrough && q!.work?.length) && (
                <BigButton onClick={next} color={def.color} className="mt-4 w-full">
                  {idx + 1 >= total
                    ? isMathGame && mode !== "placement"
                      ? "Finish the mission! 🏁"
                      : "See results ✨"
                    : wrong
                      ? "Got it — next! ➡️"
                      : "Next ➡️"}
                </BigButton>
              )}
            </div>
          )}
        </div>

        {/* running score — hidden for math (missions show the track instead) */}
        {!isMathGame && answers.length > 0 && (
          <div className="flex justify-center gap-1.5 mt-4">
            {answers.map((a, i) => (
              <span
                key={i}
                className="w-7 h-7 rounded-xl flex items-center justify-center text-sm font-black"
                style={{ background: a ? "#dcfce7" : "#fee2e2", color: a ? "#16a34a" : "#ef4444" }}
              >
                {a ? "✓" : "✕"}
              </span>
            ))}
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
            <button onClick={() => resolveIntervention("breathe")} className="btn-soft w-full py-4 text-lg bg-sky-100 text-sky-800">
              {INTERVENE_CHOICES.breathe}
            </button>
            {interactive && (
              <button onClick={() => resolveIntervention("reteach")} className="btn-soft w-full py-4 text-lg bg-amber-100 text-amber-800">
                {INTERVENE_CHOICES.reteach}
              </button>
            )}
            <BigButton onClick={() => resolveIntervention("push")} color={def.color} className="w-full text-lg">
              {INTERVENE_CHOICES.push}
            </BigButton>
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
        <BigButton onClick={onDone} color={color} className="mt-6 animate-pop">
          I feel better — let's go! 💪
        </BigButton>
      ) : (
        <div className="text-white/60 font-bold mt-6 text-sm">four big breaths…</div>
      )}
    </div>
  );
}

function Screen({ def, children }: { def: ReturnType<typeof subjectById>; children: ReactNode }) {
  return (
    <KidBg from={def.color} className="p-4 pb-12">
      {children}
    </KidBg>
  );
}
