import type { View } from "../App";
import { useStore } from "../lib/store";
import type { Kid } from "../lib/types";

export default function RewardsStore({ kid, go }: { kid: Kid; go: (v: View) => void }) {
  const { state, dispatch } = useStore();
  const fresh = state.kids.find((k) => k.id === kid.id)!;

  return (
    <div className="min-h-screen p-4 pb-16 bg-gradient-to-b from-amber-100 to-violet-50">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 pt-2">
          <button onClick={() => go({ name: "kid", kidId: kid.id })} className="text-2xl p-1 active:scale-90">
            ⬅️
          </button>
          <h1 className="font-extrabold text-2xl text-gray-800">🎁 Spark Store</h1>
          <div className="ml-auto bg-amber-400 rounded-2xl px-4 py-2 font-extrabold text-amber-900">
            ⚡ {fresh.bucks}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1 ml-12">
          Earn Spark Bucks by learning. Spend them on real rewards — a grown-up approves each one!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {state.settings.rewards.map((r) => {
            const afford = fresh.bucks >= r.cost;
            return (
              <div key={r.id} className="card p-5 flex items-center gap-4">
                <div className="text-4xl">{r.emoji}</div>
                <div className="flex-1">
                  <div className="font-extrabold text-gray-800">{r.label}</div>
                  <div className="text-sm font-bold text-amber-600">⚡ {r.cost}</div>
                </div>
                <button
                  disabled={!afford}
                  onClick={() => dispatch({ type: "REDEEM", kidId: kid.id, rewardId: r.id })}
                  className="btn-big py-2 text-sm text-white disabled:opacity-30 bg-violet-600"
                >
                  Get it!
                </button>
              </div>
            );
          })}
        </div>

        {fresh.redemptions.length > 0 && (
          <div className="card p-5 mt-6">
            <div className="font-extrabold text-gray-800 mb-3">My Rewards</div>
            <div className="space-y-2">
              {fresh.redemptions.slice(0, 10).map((r) => (
                <div key={r.id} className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-gray-700">{r.label}</span>
                  <span
                    className={`font-bold text-xs px-2 py-1 rounded-full ${
                      r.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : r.status === "denied"
                          ? "bg-red-100 text-red-600"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {r.status === "pending" ? "waiting for grown-up" : r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="card p-5 mt-6">
          <div className="font-extrabold text-gray-800 mb-2">How to earn ⚡</div>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✅ +1 per correct answer</li>
            <li>⭐ +10 for mastering a skill (90%+)</li>
            <li>🎉 +25 for leveling up</li>
            <li>💍 +20 for closing all your rings</li>
            <li>🔁 +5 for finishing a review round</li>
            <li>🔥 +25 every 5-day streak</li>
            <li>🏕️ Big bucks for afternoon workshops!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
