import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { View } from "../App";
import { MASTERY_PCT, subjectById } from "../lib/content";
import { lessonForUnit, themeForUnit, type MissionTheme } from "../lib/content/mathLessons";
import { coachFor, randomOops, randomPraise, randomZoom } from "../lib/coaches";
import {
  buildPlacement,
  buildReviewRound,
  buildRound,
  nextUnit,
  scorePlacement,
  unitKey,
} from "../lib/engine";
import { useStore } from "../lib/store";
import type { Kid, Question, SubjectId } from "../lib/types";

interface Props {
  kid: Kid;
  subject: SubjectId;
  mode: "learn" | "review" | "placement";
  go: (v: View) => void;
}

/** Answers faster than this (ms) count as "lightning" for the speed meter. */
const FAST_MS = 6000;

export default function SessionScreen({ kid, subject, mode, go }: Props) {
  const { state, dispatch } = useStore();
  const def = subjectById(subject);
  const coach = coachFor(subject);
  const isMathGame = subject === "math";

  // Build the round once
  const round = useMemo(() => {
    if (mode === "placement") {
      const p = buildPlacement(subject);
      return { questions: p.questions, levels: p.levels, unitLabel: "Placement Adventure", reviewUnits: [] as string[], key: "placement", unitId: null as string | null };
    }
    if (mode === "review") {
      const r = buildReviewRound(kid, subject);
      return { questions: r.questions, levels: [], unitLabel: "Review Round", reviewUnits: r.units, key: "review", unitId: null };
    }
    const nu = nextUnit(kid, subject);
    if (!nu) return { questions: [] as Question[], levels: [], unitLabel: "All done!", reviewUnits: [], key: "done", unitId: null };
    return {
      questions: buildRound(nu.unit, false),
      levels: [],
      unitLabel: `${nu.unit.emoji} ${nu.unit.title}`,
      reviewUnits: [],
      key: unitKey(nu.level, nu.unit.id),
      unitId: nu.unit.id,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme: MissionTheme = useMemo(() => themeForUnit(round.key), [round.key]);
  const lesson = useMemo(
    () => (isMathGame && mode === "learn" && round.unitId ? lessonForUnit(round.unitId) : null),
    [isMathGame, mode, round.unitId]
  );

  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [fastFlags, setFastFlags] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);
  const [coachLine, setCoachLine] = useState("");
  const [showLesson, setShowLesson] = useState(() => !!lesson);
  const [lessonPage, setLessonPage] = useState(0);

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

  const q = round.questions[idx];
  const total = round.questions.length;

  const choose = (i: number) => {
    if (chosen !== null || !q) return;
    const ms = Date.now() - qStartRef.current;
    timesRef.current.push(ms);
    const right = i === q.answer;
    const fast = right && ms < FAST_MS;
    setChosen(i);
    setCoachLine(right ? (fast ? randomZoom(subject) : randomPraise(subject)) : randomOops(subject));
    setAnswers((a) => [...a, right]);
    setFastFlags((f) => [...f, fast]);
  };

  const next = () => {
    if (idx + 1 >= total) {
      finish([...answers]);
    } else {
      setIdx(idx + 1);
      setChosen(null);
      setCoachLine("");
      qStartRef.current = Date.now();
    }
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
      dispatch({
        type: "ROUND_DONE",
        kidId: kid.id,
        subject,
        unitKey: "placement",
        correct,
        total: finalAnswers.length,
        minutes,
        mode,
        avgMs,
      });
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

  // ----- lesson overlay (math concept teaching) -----
  if (showLesson && lesson) {
    const last = lessonPage >= lesson.length - 1;
    return (
      <Screen def={def}>
        <div className="max-w-xl mx-auto mt-10 animate-pop">
          <div className="card p-6">
            <div className="flex items-center gap-3">
              <div className="text-5xl">{coach.emoji}</div>
              <div>
                <div className="font-extrabold text-gray-800">{coach.name} teaches: {round.unitLabel}</div>
                <div className="text-xs text-gray-400">{coach.title}</div>
              </div>
            </div>
            <div
              className="mt-4 rounded-2xl p-5 text-lg font-semibold text-gray-700 leading-relaxed"
              style={{ background: def.soft }}
              key={lessonPage}
            >
              <span className="animate-pop inline-block">{lesson[lessonPage]}</span>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-1.5">
                {lesson.map((_, i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: i <= lessonPage ? def.color : "#e5e7eb" }}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowLesson(false)} className="btn-big py-2 text-sm bg-gray-100 text-gray-500">
                  Skip
                </button>
                <button
                  onClick={() => (last ? setShowLesson(false) : setLessonPage(lessonPage + 1))}
                  className="btn-big py-2 text-sm text-white"
                  style={{ background: def.color }}
                >
                  {last ? `Start the ${theme.title}! ${theme.start}` : "Next →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Screen>
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
            <div className="text-6xl mb-2">{mastered ? theme.goal : coach.emoji}</div>
            {mastered ? (
              <>
                <div className="font-extrabold text-2xl text-gray-800">MISSION COMPLETE!</div>
                <div className="text-3xl mt-2">{"🌟".repeat(stars)}{"☆".repeat(3 - stars)}</div>
                <p className="text-gray-600 mt-3 font-semibold">{theme.win}</p>
                <p className="text-sm text-gray-500 mt-2">
                  ⚡ {fastCount} lightning answer{fastCount === 1 ? "" : "s"}!{" "}
                  {stars < 3 && "Answer even faster next time for 3 stars — that's how facts become automatic!"}
                </p>
              </>
            ) : (
              <>
                <div className="font-extrabold text-2xl text-gray-800">Sooo close!</div>
                <p className="text-gray-600 mt-3 font-semibold">{theme.almost}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {coach.name} says: every champion runs the track twice. Let's go again — I'll teach you the tricky ones!
                </p>
              </>
            )}
            <div className="flex gap-3 mt-6">
              {mode === "learn" && !mastered && (
                <button
                  onClick={() => go({ name: "session", kidId: kid.id, subject, mode: "learn" })}
                  className="btn-big flex-1 text-white"
                  style={{ background: def.color }}
                >
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
              {coach.emoji} {coach.name} will start {def.name} right at your level — not too easy, not
              too hard.
            </p>
          )}
          <div className="flex gap-3 mt-6">
            {mode === "learn" && !mastered && (
              <button
                onClick={() => go({ name: "session", kidId: kid.id, subject, mode: "learn" })}
                className="btn-big flex-1 text-white"
                style={{ background: def.color }}
              >
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
        <div className="flex items-center gap-3 pt-2">
          <button onClick={() => go({ name: "kid", kidId: kid.id })} className="text-2xl p-1 active:scale-90">
            ✖️
          </button>
          <div className="flex-1">
            <div className="h-4 bg-white/60 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%`, background: def.color }}
              />
            </div>
          </div>
          {lesson && (
            <button
              onClick={() => {
                setLessonPage(0);
                setShowLesson(true);
              }}
              className="font-bold text-sm px-3 py-1 rounded-full bg-white/70"
              style={{ color: def.color }}
              title="Teach me again"
            >
              🎓 Teach me
            </button>
          )}
          <div className="font-bold text-sm px-3 py-1 rounded-full bg-white/70" style={{ color: def.color }}>
            {mins}:{secs.toString().padStart(2, "0")} ⏱️
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
              <span>
                {theme.title} · {round.unitLabel}
              </span>
              <span className="text-amber-500">⚡ ×{fastCount}</span>
            </div>
            <div className="relative h-10 mt-1">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-gray-100" />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full transition-all duration-500"
                style={{ width: `${missionPct}%`, background: def.color, opacity: 0.3 }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 text-2xl transition-all duration-500"
                style={{ left: `calc(${Math.min(missionPct, 92)}% )` }}
              >
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

        {/* question card */}
        <div className="card p-6 mt-3 animate-pop" key={idx}>
          {q.visual && <div className="visual-block text-center text-4xl mb-4">{q.visual}</div>}
          <div className="text-xl font-extrabold text-gray-800 text-center">{q.prompt}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {q.choices.map((c, i) => {
              const isAnswer = i === q.answer;
              const isChosen = chosen === i;
              let cls = "bg-gray-50 border-2 border-gray-200 text-gray-800";
              if (chosen !== null) {
                if (isAnswer) cls = "bg-green-100 border-2 border-green-500 text-green-800";
                else if (isChosen) cls = "bg-red-100 border-2 border-red-400 text-red-700";
                else cls = "bg-gray-50 border-2 border-gray-100 text-gray-400";
              }
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  className={`btn-big text-base py-4 ${cls} ${chosen === null ? "hover:border-violet-400" : ""}`}
                >
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
                      <div className="font-extrabold text-sm" style={{ color: def.color }}>
                        {coach.name} says:
                      </div>
                      <div className="text-sm font-semibold text-gray-700 mt-0.5">{coachLine}</div>
                      {q.steps ? (
                        <ol className="mt-2 space-y-1.5">
                          {q.steps.map((s, i) => (
                            <li key={i} className="flex gap-2 text-sm text-gray-700">
                              <span
                                className="shrink-0 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center mt-0.5"
                                style={{ background: def.color }}
                              >
                                {i + 1}
                              </span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <div className="text-sm text-gray-700 mt-2">
                          {q.explain ?? coach.reveal(q.choices[q.answer])}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="font-extrabold text-lg text-green-600">
                    {coach.emoji} {coachLine}
                  </div>
                  {q.explain && !isMathGame && <div className="text-sm text-gray-500 mt-1">💡 {q.explain}</div>}
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
            {answers.filter(Boolean).length} ✅ · {answers.filter((a) => !a).length} ❌ · mastery needs{" "}
            {Math.round(MASTERY_PCT * 100)}%
          </div>
        )}
      </div>
    </Screen>
  );
}

function Screen({ def, children }: { def: ReturnType<typeof subjectById>; children: ReactNode }) {
  return (
    <div className="min-h-screen p-4 pb-12" style={{ background: `linear-gradient(160deg, ${def.soft}, #f5f3ff 60%)` }}>
      {children}
    </div>
  );
}
