import type { View } from "../App";
import BuddyAvatar from "../components/BuddyAvatar";
import { useStore } from "../lib/store";
import { todayISO } from "../lib/rand";

export default function KidPicker({ go }: { go: (v: View) => void }) {
  const { state } = useStore();
  const today = todayISO();

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-400 flex flex-col items-center justify-center p-6">
      <div className="text-7xl mb-2">⚡</div>
      <h1 className="text-4xl font-extrabold text-white drop-shadow mb-1">Spark Academy</h1>
      <p className="text-white/80 mb-8 font-medium">Who's learning today?</p>
      <div className="flex flex-wrap justify-center gap-6 max-w-2xl">
        {state.kids.map((kid) => {
          const day = kid.days[today];
          const done = day?.blocks ?? 0;
          return (
            <button
              key={kid.id}
              onClick={() => go({ name: "kid", kidId: kid.id })}
              className="card w-44 p-6 flex flex-col items-center active:scale-95 transition-transform animate-pop"
            >
              {kid.buddy ? (
                <div className="mb-2">
                  <BuddyAvatar buddy={kid.buddy} size={78} still />
                </div>
              ) : (
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-3"
                  style={{ background: kid.color + "22", border: `3px solid ${kid.color}` }}
                >
                  {kid.emoji}
                </div>
              )}
              <div className="font-extrabold text-xl text-gray-800">{kid.name}</div>
              <div className="text-sm text-gray-500 mt-1">
                {done >= state.settings.blocksPerDay
                  ? "✅ Done today!"
                  : `${done}/${state.settings.blocksPerDay} blocks`}
              </div>
              {kid.streak.count > 1 && (
                <div className="text-xs mt-1 font-bold text-orange-500">🔥 {kid.streak.count}-day streak</div>
              )}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => go({ name: "guide" })}
        className="mt-10 text-white/90 font-semibold bg-white/20 rounded-2xl px-6 py-3 backdrop-blur active:scale-95"
      >
        🧭 Guide Dashboard (grown-ups)
      </button>
    </div>
  );
}
