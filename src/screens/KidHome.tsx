import type { View } from "../App";
import { coachFor } from "../lib/coaches";
import { SUBJECTS, subjectById } from "../lib/content";
import { dueReviews, nextUnit, todaysPlan, totalDueReviews } from "../lib/engine";
import { todayISO } from "../lib/rand";
import { useStore } from "../lib/store";
import type { Kid } from "../lib/types";

function Ring({ filled, color }: { filled: boolean; color: string }) {
  return (
    <div
      className="w-9 h-9 rounded-full border-4 flex items-center justify-center text-sm font-bold transition-all"
      style={{
        borderColor: color,
        background: filled ? color : "transparent",
        color: filled ? "white" : color,
      }}
    >
      {filled ? "✓" : ""}
    </div>
  );
}

export default function KidHome({ kid, go }: { kid: Kid; go: (v: View) => void }) {
  const { state } = useStore();
  const today = todayISO();
  const day = kid.days[today] ?? { blocks: 0, masteredBlocks: 0, minutes: 0, bucksEarned: 0 };
  const target = state.settings.blocksPerDay;
  const plan = todaysPlan(kid, target);
  const reviewsDue = totalDueReviews(kid);
  const allDone = day.blocks >= target;

  return (
    <div
      className="min-h-screen p-5 pb-16"
      style={{ background: `linear-gradient(160deg, ${kid.color}18, #f5f3ff 40%)` }}
    >
      {/* header */}
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        <button onClick={() => go({ name: "picker" })} className="text-2xl p-2 active:scale-90">
          ⬅️
        </button>
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ background: kid.color + "22", border: `3px solid ${kid.color}` }}
          >
            {kid.emoji}
          </div>
          <div>
            <div className="font-extrabold text-xl text-gray-800">Hi, {kid.name}!</div>
            {kid.streak.count > 1 && (
              <div className="text-xs font-bold text-orange-500">🔥 {kid.streak.count}-day streak</div>
            )}
          </div>
        </div>
        <button
          onClick={() => go({ name: "store", kidId: kid.id })}
          className="bg-amber-400 rounded-2xl px-4 py-2 font-extrabold text-amber-900 active:scale-95 shadow"
        >
          ⚡ {kid.bucks}
        </button>
      </div>

      {/* rings */}
      <div className="card max-w-3xl mx-auto mt-5 p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-extrabold text-gray-800 text-lg">
              {allDone ? "🎉 School's done — go play!" : "Close your rings!"}
            </div>
            <div className="text-sm text-gray-500">
              {day.blocks}/{target} focus blocks · {Math.round(day.minutes)} min ·{" "}
              ⚡{day.bucksEarned} earned today
            </div>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: target }, (_, i) => (
              <Ring key={i} filled={i < day.blocks} color={kid.color} />
            ))}
          </div>
        </div>
      </div>

      {/* review nudge */}
      {reviewsDue > 0 && (
        <div className="max-w-3xl mx-auto mt-4 bg-sky-100 border-2 border-sky-300 rounded-3xl p-4 flex items-center justify-between">
          <div className="font-bold text-sky-800">
            🔁 {reviewsDue} skill{reviewsDue > 1 ? "s" : ""} ready for review — keep them strong!
          </div>
        </div>
      )}

      {/* today's plan */}
      <div className="max-w-3xl mx-auto mt-6">
        <h2 className="font-extrabold text-gray-700 text-lg mb-3">Today's 2-Hour Plan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SUBJECTS.map((s) => {
            const prog = kid.subjects[s.id];
            const next = nextUnit(kid, s.id);
            const inPlan = plan.includes(s.id);
            const due = dueReviews(kid, s.id).length;
            const lvl = s.levels[prog.level - 1];
            return (
              <div key={s.id} className="card p-4" style={{ borderTop: `6px solid ${s.color}` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{coachFor(s.id).emoji}</span>
                    <div>
                      <div className="font-extrabold text-gray-800">
                        {s.name} <span className="text-xs font-bold text-gray-400">with {coachFor(s.id).name}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Level {prog.level} · {lvl?.name}
                      </div>
                    </div>
                  </div>
                  {inPlan && !allDone && (
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: s.soft, color: s.color }}>
                      TODAY
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-2 min-h-[20px]">
                  {!prog.placed
                    ? "🧭 First: a quick placement adventure!"
                    : next
                      ? `Next: ${next.unit.emoji} ${next.unit.title}`
                      : "🏆 Top level mastered!"}
                </div>
                <div className="flex gap-2 mt-3">
                  {!prog.placed ? (
                    <button
                      onClick={() => go({ name: "session", kidId: kid.id, subject: s.id, mode: "placement" })}
                      className="flex-1 btn-big py-2.5 text-base text-white"
                      style={{ background: s.color }}
                    >
                      Find my level
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => go({ name: "session", kidId: kid.id, subject: s.id, mode: "learn" })}
                        className="flex-1 btn-big py-2.5 text-base text-white"
                        style={{ background: s.color }}
                      >
                        {s.id === "math" ? "Mission! 🐆" : "Learn ▶"}
                      </button>
                      {due > 0 && (
                        <button
                          onClick={() => go({ name: "session", kidId: kid.id, subject: s.id, mode: "review" })}
                          className="btn-big py-2.5 text-base"
                          style={{ background: s.soft, color: s.color }}
                        >
                          🔁 {due}
                        </button>
                      )}
                    </>
                  )}
                  <button
                    onClick={() => go({ name: "map", kidId: kid.id, subject: s.id })}
                    className="btn-big py-2.5 text-base bg-gray-100 text-gray-500"
                  >
                    🗺️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* afternoon */}
      <div className="max-w-3xl mx-auto mt-6">
        <button
          onClick={() => go({ name: "workshops", kidId: kid.id })}
          className="card w-full p-5 flex items-center justify-between active:scale-[0.98]"
        >
          <div className="text-left">
            <div className="font-extrabold text-gray-800 text-lg">🏕️ Afternoon Workshops</div>
            <div className="text-sm text-gray-500">
              Life-skill quests: lemonade stands, TED talks, kindness missions…
            </div>
          </div>
          <span className="text-3xl">➡️</span>
        </button>
      </div>
    </div>
  );
}
