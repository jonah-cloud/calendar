import { useEffect, useRef } from "react";
import type { View } from "../App";
import BuddyAvatar from "../components/BuddyAvatar";
import CoachCharacter from "../components/CoachCharacter";
import { KidBg } from "../components/Ui";
import { buddyVoice } from "../lib/buddy";
import { coachFor } from "../lib/coaches";
import { SUBJECTS, subjectById } from "../lib/content";
import { dueReviews, nextUnit, todaysPlan, totalDueReviews } from "../lib/engine";
import { pick, todayISO } from "../lib/rand";
import { speak } from "../lib/speech";
import { useStore } from "../lib/store";
import type { Kid } from "../lib/types";

const GREETINGS = [
  (n: string) => `Hi ${n}! I missed you! Ready to close some rings?`,
  (n: string) => `${n}! My favorite human! Let's learn something amazing today!`,
  (n: string) => `There she is! Okay ${n}, which mission are we crushing first?`,
  (n: string) => `Good to see you, ${n}! Your brain is looking extra strong today!`,
];

function Ring({ filled, color }: { filled: boolean; color: string }) {
  return (
    <div
      className={`w-12 h-12 rounded-full border-[5px] flex items-center justify-center text-lg font-black transition-all ${filled ? "" : "glow-pulse"}`}
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

  // buddy greets her by name (once per visit)
  const greeted = useRef(false);
  useEffect(() => {
    if (kid.buddy && !greeted.current) {
      greeted.current = true;
      speak(pick(GREETINGS)(kid.name), buddyVoice(kid.buddy));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <KidBg from={kid.color} className="p-5 pb-16">
      {/* header */}
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        <button onClick={() => go({ name: "picker" })} className="w-12 h-12 rounded-2xl bg-white/90 text-xl btn-soft shrink-0">
          ⬅️
        </button>
        <div className="flex items-center gap-3">
          {kid.buddy ? (
            <button onClick={() => go({ name: "buddy", kidId: kid.id })} title="Edit your buddy">
              <BuddyAvatar buddy={kid.buddy} size={58} mood="idle" />
            </button>
          ) : (
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              style={{ background: kid.color + "22", border: `3px solid ${kid.color}` }}
            >
              {kid.emoji}
            </div>
          )}
          <div>
            <div className="font-black text-2xl text-gray-800">Hi, {kid.name}!</div>
            {kid.streak.count > 1 && (
              <div className="text-xs font-bold text-orange-500">🔥 {kid.streak.count}-day streak</div>
            )}
          </div>
        </div>
        <button
          onClick={() => go({ name: "store", kidId: kid.id })}
          className="btn-chunky bg-amber-400 px-5 py-3 text-xl text-amber-900"
          style={{ ["--btn-shadow" as string]: "#d97706" }}
        >
          ⚡ {kid.bucks}
        </button>
      </div>

      {/* rings */}
      <div className="card max-w-3xl mx-auto mt-5 p-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <div className="font-black text-gray-800 text-2xl">
              {allDone ? "🎉 Done — go play!" : "Close your rings!"}
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              <span className="text-sm font-black px-3 py-1.5 rounded-2xl bg-violet-100 text-violet-700">⏱️ {Math.round(day.minutes)} min</span>
              <span className="text-sm font-black px-3 py-1.5 rounded-2xl bg-amber-100 text-amber-700">⚡ {day.bucksEarned} today</span>
            </div>
          </div>
          <div className="flex gap-2.5">
            {Array.from({ length: target }, (_, i) => (
              <Ring key={i} filled={i < day.blocks} color={kid.color} />
            ))}
          </div>
        </div>
      </div>

      {/* build-your-buddy CTA */}
      {!kid.buddy && (
        <button
          onClick={() => go({ name: "buddy", kidId: kid.id })}
          className="card max-w-3xl mx-auto mt-4 p-5 w-full flex items-center justify-between btn-soft block"
          style={{ border: "4px dashed #a78bfa" }}
        >
          <div className="text-left">
            <div className="font-black text-violet-700 text-xl">🛠️ Build your buddy!</div>
            <div className="text-sm font-semibold text-gray-500">
              Make your very own coach — they talk and cheer you on!
            </div>
          </div>
          <span className="text-5xl">🧸</span>
        </button>
      )}

      {/* review nudge */}
      {reviewsDue > 0 && (
        <div className="max-w-3xl mx-auto mt-4 bg-sky-100 border-4 border-sky-200 rounded-[26px] p-4">
          <div className="font-black text-sky-800 text-lg">
            🔁 {reviewsDue} skill{reviewsDue > 1 ? "s" : ""} ready for review!
          </div>
        </div>
      )}

      {/* today's plan */}
      <div className="max-w-3xl mx-auto mt-6">
        <h2 className="font-black text-gray-700 text-2xl mb-3">Today's Plan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SUBJECTS.map((s) => {
            const prog = kid.subjects[s.id];
            const next = nextUnit(kid, s.id);
            const inPlan = plan.includes(s.id);
            const due = dueReviews(kid, s.id).length;
            const lvl = s.levels[prog.level - 1];
            return (
              <div key={s.id} className="card p-4 relative overflow-hidden" style={{ borderTop: `8px solid ${s.color}` }}>
                {inPlan && !allDone && (
                  <span className="absolute top-3 right-3 text-[11px] font-black px-2.5 py-1 rounded-xl" style={{ background: s.soft, color: s.color }}>
                    TODAY
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <div style={{ color: s.color }}><CoachCharacter subject={s.id} size={72} /></div>
                  <div className="min-w-0">
                    <div className="font-black text-gray-800 text-xl leading-tight">{s.name}</div>
                    <div className="text-xs font-bold" style={{ color: s.color }}>with {coachFor(s.id).name}</div>
                    <div className="mt-1 inline-block text-[11px] font-black px-2 py-0.5 rounded-lg" style={{ background: s.soft, color: s.color }}>
                      LEVEL {prog.level}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-bold text-gray-600 mt-2 min-h-[20px]">
                  {!prog.placed
                    ? "🧭 First: find your level!"
                    : next
                      ? `Next: ${next.unit.emoji} ${next.unit.title}`
                      : "🏆 Top level mastered!"}
                </div>
                <div className="flex gap-2 mt-3">
                  {!prog.placed ? (
                    <button
                      onClick={() => go({ name: "session", kidId: kid.id, subject: s.id, mode: "placement" })}
                      className="flex-1 btn-chunky py-3 text-base"
                      style={{ background: s.color, ["--btn-shadow" as string]: s.color + "aa" }}
                    >
                      Find my level
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => go({ name: "session", kidId: kid.id, subject: s.id, mode: "learn" })}
                        className="flex-1 btn-chunky py-3 text-base"
                        style={{ background: s.color, ["--btn-shadow" as string]: s.color + "aa" }}
                      >
                        {s.id === "math" ? "Mission! 🚀" : "Learn ▶"}
                      </button>
                      {due > 0 && (
                        <button
                          onClick={() => go({ name: "session", kidId: kid.id, subject: s.id, mode: "review" })}
                          className="btn-soft py-3 px-4 text-base"
                          style={{ background: s.soft, color: s.color }}
                        >
                          🔁 {due}
                        </button>
                      )}
                    </>
                  )}
                  <button
                    onClick={() => go({ name: "map", kidId: kid.id, subject: s.id })}
                    className="btn-soft py-3 px-4 text-base bg-gray-100 text-gray-500"
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
          className="card w-full p-5 flex items-center justify-between btn-soft"
        >
          <div className="text-left">
            <div className="font-black text-gray-800 text-xl">🏕️ Afternoon Quests</div>
            <div className="text-sm font-semibold text-gray-500">
              Lemonade stands, TED talks, kindness missions…
            </div>
          </div>
          <span className="text-4xl">➡️</span>
        </button>
      </div>
    </KidBg>
  );
}
