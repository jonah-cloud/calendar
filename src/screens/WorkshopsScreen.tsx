import type { View } from "../App";
import { WORKSHOPS } from "../lib/content/workshops";
import { todayISO } from "../lib/rand";
import { useStore } from "../lib/store";
import type { Kid } from "../lib/types";

export default function WorkshopsScreen({ kid, go }: { kid: Kid; go: (v: View) => void }) {
  const { state, dispatch } = useStore();
  const fresh = state.kids.find((k) => k.id === kid.id)!;
  const today = todayISO();

  const statusFor = (id: string) => {
    const w = fresh.workshops.find((x) => x.id === id && (x.date === today || x.status === "pending"));
    return w?.status;
  };

  return (
    <div className="min-h-screen p-4 pb-16 bg-gradient-to-b from-emerald-100 to-violet-50">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 pt-2">
          <button onClick={() => go({ name: "kid", kidId: kid.id })} className="text-2xl p-1 active:scale-90">
            ⬅️
          </button>
          <h1 className="font-extrabold text-2xl text-gray-800">🏕️ Afternoon Workshops</h1>
        </div>
        <p className="text-sm text-gray-500 mt-1 ml-12">
          Real-world quests — just like Alpha kids spend their afternoons. Finish one, mark it done,
          and a grown-up approves your Bucks!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {WORKSHOPS.map((w) => {
            const status = statusFor(w.id);
            return (
              <div key={w.id} className="card p-5">
                <div className="flex items-start gap-3">
                  <div className="text-4xl">{w.emoji}</div>
                  <div className="flex-1">
                    <div className="font-extrabold text-gray-800 leading-tight">{w.title}</div>
                    <div className="text-[10px] font-bold uppercase tracking-wide text-emerald-600 mt-0.5">
                      {w.category} · ⚡{w.bucks}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2 min-h-[40px]">{w.desc}</p>
                {status === "pending" ? (
                  <div className="mt-3 text-center text-sm font-bold text-amber-600 bg-amber-50 rounded-xl py-2">
                    ⏳ Waiting for a grown-up to approve
                  </div>
                ) : status === "approved" ? (
                  <div className="mt-3 text-center text-sm font-bold text-green-600 bg-green-50 rounded-xl py-2">
                    ✅ Done — Bucks earned!
                  </div>
                ) : (
                  <button
                    onClick={() => dispatch({ type: "WORKSHOP_DONE", kidId: kid.id, workshopId: w.id, bucks: w.bucks, title: w.title })}
                    className="btn-big w-full mt-3 py-2.5 text-base bg-emerald-500 text-white"
                  >
                    I did this! 🙌
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
