import type { View } from "../App";
import { subjectById } from "../lib/content";
import { unitKey } from "../lib/engine";
import { todayISO } from "../lib/rand";
import type { Kid, SubjectId } from "../lib/types";

export default function MasteryMap({ kid, subject, go }: { kid: Kid; subject: SubjectId; go: (v: View) => void }) {
  const def = subjectById(subject);
  const prog = kid.subjects[subject];
  const today = todayISO();

  return (
    <div className="min-h-screen p-4 pb-16" style={{ background: `linear-gradient(160deg, ${def.soft}, #f5f3ff 60%)` }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 pt-2">
          <button onClick={() => go({ name: "kid", kidId: kid.id })} className="text-2xl p-1 active:scale-90">
            ⬅️
          </button>
          <h1 className="font-extrabold text-2xl text-gray-800">
            {def.emoji} {def.name} Map
          </h1>
        </div>
        <p className="text-sm text-gray-500 mt-1 ml-12">
          Master every skill (90%+) to level up. Mastered skills come back for review so they stick!
        </p>

        <div className="mt-6 space-y-6">
          {def.levels.map((lvl) => {
            const isCurrent = lvl.n === prog.level;
            const isPast = lvl.n < prog.level;
            const locked = lvl.n > prog.level;
            return (
              <div
                key={lvl.n}
                className={`card p-5 ${locked ? "opacity-50" : ""}`}
                style={isCurrent ? { border: `3px solid ${def.color}` } : {}}
              >
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-gray-800">
                    Level {lvl.n} · {lvl.name}
                  </div>
                  <div className="text-sm font-bold" style={{ color: def.color }}>
                    {isPast ? "✅ Complete" : isCurrent ? "⭐ You are here" : "🔒 Locked"}
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                  {lvl.units.map((u) => {
                    const key = unitKey(lvl.n, u.id);
                    const done = prog.mastered.includes(key);
                    const review = prog.review[key];
                    const due = review && review.due <= today;
                    return (
                      <div
                        key={u.id}
                        className="rounded-2xl p-3 text-center"
                        style={{
                          background: done ? def.soft : "#f9fafb",
                          border: `2px solid ${done ? def.color : "#e5e7eb"}`,
                        }}
                      >
                        <div className="text-2xl">{u.emoji}</div>
                        <div className="text-xs font-bold text-gray-700 mt-1 leading-tight">{u.title}</div>
                        <div className="text-[10px] mt-1 font-bold" style={{ color: done ? def.color : "#9ca3af" }}>
                          {done ? (due ? "🔁 review due" : "⭐ mastered") : locked ? "" : "not yet"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
