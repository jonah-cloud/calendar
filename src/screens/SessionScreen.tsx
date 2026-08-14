import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { View } from "../App";
import { MASTERY_PCT, subjectById } from "../lib/content";
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

const CHEERS = ["Yes!", "Nailed it!", "¡Excelente!", "Brilliant!", "You rock!", "Boom!", "Sparkly!"];
const OOPS = ["Almost!", "Good try!", "Keep going!", "You'll get it!"];

export default function SessionScreen({ kid, subject, mode, go }: Props) {
  const { state, dispatch } = useStore();
  const def = subjectById(subject);

  // Build the round once
  const round = useMemo(() => {
    if (mode === "placement") {
      const p = buildPlacement(subject);
      return { questions: p.questions, levels: p.levels, unitLabel: "Placement Adventure", reviewUnits: [] as string[], key: "placement" };
    }
    if (mode === "review") {
      const r = buildReviewRound(kid, subject);
      return { questions: r.questions, levels: [], unitLabel: "Review Round", reviewUnits: r.units, key: "review" };
    }
    const nu = nextUnit(kid, subject);
    if (!nu) return { questions: [] as Question[], levels: [], unitLabel: "All done!", reviewUnits: [], key: "done" };
    return {
      questions: buildRound(nu.unit, false),
      levels: [],
      unitLabel: `${nu.unit.emoji} ${nu.unit.title}`,
      reviewUnits: [],
      key: unitKey(nu.level, nu.unit.id),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<string>("");

  // timer
  const startRef = useRef(Date.now());
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
    const right = i === q.answer;
    setChosen(i);
    setFeedback(right ? CHEERS[Math.floor(Math.random() * CHEERS.length)] : OOPS[Math.floor(Math.random() * OOPS.length)]);
    setAnswers((a) => [...a, right]);
  };

  const next = () => {
    if (idx + 1 >= total) {
      finish([...answers]);
    } else {
      setIdx(idx + 1);
      setChosen(null);
      setFeedback("");
    }
  };

  const finish = (finalAnswers: boolean[]) => {
    const correct = finalAnswers.filter(Boolean).length;
    const minutes = Math.max(1, Math.round((Date.now() - startRef.current) / 60000));
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
      });
    }
    setFinished(true);
  };

  // ----- empty round guard -----
  if (!q && !finished) {
    return (
      <Screen def={def} kidColor={kid.color}>
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
    const freshKid = state.kids.find((k) => k.id === kid.id)!;
    const placedLevel = freshKid.subjects[subject].level;
    return (
      <Screen def={def} kidColor={kid.color}>
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
          <div className="text-lg text-gray-600 mt-2">
            {correct} / {answers.length} correct ({Math.round(pct * 100)}%)
          </div>
          {mode === "learn" && !mastered && (
            <p className="text-sm text-gray-500 mt-2">
              You need {Math.round(MASTERY_PCT * 100)}% to master a skill — just like the real Alpha
              kids. Try the same skill again, you've got this!
            </p>
          )}
          {mode === "placement" && (
            <p className="text-sm text-gray-500 mt-2">
              {def.name} will start right at your level — not too easy, not too hard.
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
  const progressPct = (idx / total) * 100;
  const timePct = Math.min(100, (elapsed / blockSecs) * 100);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;

  return (
    <Screen def={def} kidColor={kid.color}>
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
          <div className="font-bold text-sm px-3 py-1 rounded-full bg-white/70" style={{ color: def.color }}>
            {mins}:{secs.toString().padStart(2, "0")} ⏱️
          </div>
        </div>
        {/* focus meter */}
        <div className="mt-1 h-1.5 bg-white/40 rounded-full overflow-hidden">
          <div className="h-full bg-amber-400 transition-all" style={{ width: `${timePct}%` }} />
        </div>

        <div className="text-center mt-3 font-bold text-sm" style={{ color: def.color }}>
          {def.emoji} {round.unitLabel} · Question {idx + 1} of {total}
        </div>

        {/* question card */}
        <div className="card p-6 mt-3 animate-pop" key={idx}>
          {q.visual && (
            <div className="visual-block text-center text-4xl mb-4">{q.visual}</div>
          )}
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
          {chosen !== null && (
            <div className="mt-4 text-center animate-pop">
              <div className={`font-extrabold text-lg ${answers[answers.length - 1] ? "text-green-600" : "text-orange-500"}`}>
                {feedback}
              </div>
              {q.explain && <div className="text-sm text-gray-500 mt-1">💡 {q.explain}</div>}
              <button
                onClick={next}
                className="btn-big mt-3 w-full text-white"
                style={{ background: def.color }}
              >
                {idx + 1 >= total ? "See results ✨" : "Next ➡️"}
              </button>
            </div>
          )}
        </div>

        {/* running score */}
        <div className="text-center mt-4 text-sm font-bold text-gray-500">
          {answers.filter(Boolean).length} ✅ · {answers.filter((a) => !a).length} ❌ · mastery needs{" "}
          {Math.round(MASTERY_PCT * 100)}%
        </div>
      </div>
    </Screen>
  );
}

function Screen({ def, kidColor, children }: { def: ReturnType<typeof subjectById>; kidColor: string; children: ReactNode }) {
  return (
    <div
      className="min-h-screen p-4 pb-12"
      style={{ background: `linear-gradient(160deg, ${def.soft}, #f5f3ff 60%)` }}
    >
      {children}
    </div>
  );
}
