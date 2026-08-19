import type { View } from "../App";
import BuddyAvatar from "../components/BuddyAvatar";
import { useStore } from "../lib/store";
import { todayISO } from "../lib/rand";

export default function KidPicker({ go }: { go: (v: View) => void }) {
  const { state } = useStore();
  const today = todayISO();

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-400 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {[
        { s: 260, t: "-8%", l: "-10%" },
        { s: 200, t: "70%", l: "80%" },
        { s: 150, t: "12%", l: "84%" },
      ].map((b, i) => (
        <span key={i} className="blob" style={{ width: b.s, height: b.s, top: b.t, left: b.l, background: "#fff", opacity: 0.15, animationDelay: `${i}s` }} />
      ))}
      <div className="text-8xl mb-1 animate-pop">⚡</div>
      <h1 className="text-5xl font-black text-white drop-shadow-lg mb-1">Spark Academy</h1>
      <p className="text-white/90 mb-8 font-bold text-lg">Who's learning today?</p>
      <div className="flex flex-wrap justify-center gap-6 max-w-2xl">
        {state.kids.map((kid) => {
          const day = kid.days[today];
          const done = day?.blocks ?? 0;
          return (
            <button
              key={kid.id}
              onClick={() => go({ name: "kid", kidId: kid.id })}
              className="card-pop w-48 p-6 flex flex-col items-center btn-soft animate-pop"
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
              <div className="font-black text-2xl text-gray-800">{kid.name}</div>
              <div className="flex gap-1 mt-2">
                {Array.from({ length: state.settings.blocksPerDay }, (_, i) => (
                  <span key={i} className="w-3.5 h-3.5 rounded-full" style={{ background: i < done ? kid.color : kid.color + "33" }} />
                ))}
              </div>
              <div className="text-sm font-bold text-gray-400 mt-1">
                {done >= state.settings.blocksPerDay ? "✅ All done!" : `${done}/${state.settings.blocksPerDay} blocks`}
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
        className="mt-10 text-white font-black bg-white/25 rounded-2xl px-6 py-4 backdrop-blur btn-soft text-lg"
      >
        🧭 Guide Dashboard (grown-ups)
      </button>
    </div>
  );
}
