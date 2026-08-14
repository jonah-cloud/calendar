import { useState } from "react";
import type { View } from "../App";
import { SUBJECTS } from "../lib/content";
import { WORKSHOPS } from "../lib/content/workshops";
import { accuracyLastNDays, subjectCompletion } from "../lib/engine";
import { todayISO, uid } from "../lib/rand";
import { useStore } from "../lib/store";

export default function GuideDashboard({ go }: { go: (v: View) => void }) {
  const { state, dispatch } = useStore();
  const [unlocked, setUnlocked] = useState(!state.settings.pin);
  const [pinInput, setPinInput] = useState("");
  const [tab, setTab] = useState<"progress" | "approvals" | "rewards" | "settings" | "playbook">("progress");
  const today = todayISO();

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-violet-100 p-6">
        <div className="card p-8 max-w-sm w-full text-center">
          <div className="text-4xl mb-2">🔒</div>
          <div className="font-extrabold text-xl text-gray-800 mb-4">Guide PIN</div>
          <input
            type="password"
            inputMode="numeric"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            className="border-2 border-violet-200 rounded-2xl px-4 py-3 text-center text-2xl tracking-widest w-full focus:outline-none focus:border-violet-500"
            placeholder="••••"
          />
          <button
            onClick={() => pinInput === state.settings.pin && setUnlocked(true)}
            className="btn-big w-full mt-4 bg-violet-600 text-white"
          >
            Unlock
          </button>
          <button onClick={() => go({ name: "picker" })} className="text-sm text-gray-400 mt-3">
            back
          </button>
        </div>
      </div>
    );
  }

  const pendingCount = state.kids.reduce(
    (n, k) =>
      n +
      k.redemptions.filter((r) => r.status === "pending").length +
      k.workshops.filter((w) => w.status === "pending").length,
    0
  );

  return (
    <div className="min-h-screen bg-violet-50 p-4 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 pt-2">
          <button onClick={() => go({ name: "picker" })} className="text-2xl p-1 active:scale-90">
            ⬅️
          </button>
          <h1 className="font-extrabold text-2xl text-gray-800">🧭 Guide Dashboard</h1>
        </div>
        <p className="text-sm text-gray-500 mt-1 ml-12">
          Your job (says Alpha School): motivation and encouragement. The app handles the lessons.
        </p>

        {/* tabs */}
        <div className="flex gap-2 mt-5 flex-wrap">
          {(
            [
              ["progress", "📊 Progress"],
              ["approvals", `✅ Approvals${pendingCount ? ` (${pendingCount})` : ""}`],
              ["rewards", "🎁 Rewards"],
              ["settings", "⚙️ Settings"],
              ["playbook", "📖 Playbook"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`rounded-2xl px-4 py-2 font-bold text-sm ${
                tab === key ? "bg-violet-600 text-white" : "bg-white text-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* PROGRESS */}
        {tab === "progress" && (
          <div className="mt-5 space-y-5">
            {state.kids.map((kid) => {
              const day = kid.days[today];
              const week = Object.entries(kid.days)
                .filter(([d]) => d >= addDaysISO(today, -6))
                .reduce((n, [, v]) => n + v.minutes, 0);
              return (
                <div key={kid.id} className="card p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                      style={{ background: kid.color + "22", border: `3px solid ${kid.color}` }}
                    >
                      {kid.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="font-extrabold text-lg text-gray-800">{kid.name}</div>
                      <div className="text-xs text-gray-500">
                        Today: {day?.blocks ?? 0}/{state.settings.blocksPerDay} blocks ·{" "}
                        {Math.round(day?.minutes ?? 0)} min · This week: {Math.round(week)} min ·
                        🔥 {kid.streak.count} streak · ⚡{kid.bucks}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                    {SUBJECTS.map((s) => {
                      const prog = kid.subjects[s.id];
                      const acc = accuracyLastNDays(prog, 7);
                      const comp = subjectCompletion(kid, s.id);
                      return (
                        <div key={s.id} className="rounded-2xl p-3" style={{ background: s.soft }}>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-sm" style={{ color: s.color }}>
                              {s.emoji} {s.name}
                            </span>
                            <span className="text-xs font-bold text-gray-600">
                              {prog.placed ? `Level ${prog.level}` : "not placed yet"}
                            </span>
                          </div>
                          <div className="h-2 bg-white/70 rounded-full mt-2 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${comp * 100}%`, background: s.color }} />
                          </div>
                          <div className="text-[11px] text-gray-600 mt-1">
                            {prog.mastered.length} skills mastered
                            {acc !== null && ` · ${Math.round(acc * 100)}% accuracy (7d)`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* APPROVALS */}
        {tab === "approvals" && (
          <div className="mt-5 space-y-4">
            {pendingCount === 0 && (
              <div className="card p-8 text-center text-gray-500">Nothing waiting. 🎉</div>
            )}
            {state.kids.map((kid) => (
              <div key={kid.id}>
                {kid.redemptions
                  .filter((r) => r.status === "pending")
                  .map((r) => (
                    <div key={r.id} className="card p-4 flex items-center gap-3 mb-3">
                      <div className="text-2xl">{kid.emoji}</div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-800">
                          {kid.name} wants: {r.label}
                        </div>
                        <div className="text-xs text-gray-500">⚡{r.cost} · {r.date}</div>
                      </div>
                      <button
                        onClick={() => dispatch({ type: "RESOLVE_REDEMPTION", kidId: kid.id, redemptionId: r.id, approve: true })}
                        className="btn-big py-2 text-sm bg-green-500 text-white"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => dispatch({ type: "RESOLVE_REDEMPTION", kidId: kid.id, redemptionId: r.id, approve: false })}
                        className="btn-big py-2 text-sm bg-gray-200 text-gray-600"
                      >
                        Refund
                      </button>
                    </div>
                  ))}
                {kid.workshops
                  .filter((w) => w.status === "pending")
                  .map((w) => {
                    const def = WORKSHOPS.find((x) => x.id === w.id);
                    if (!def) return null;
                    return (
                      <div key={w.id + w.date} className="card p-4 flex items-center gap-3 mb-3">
                        <div className="text-2xl">{def.emoji}</div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-800">
                            {kid.name} finished: {def.title}
                          </div>
                          <div className="text-xs text-gray-500">⚡{def.bucks} · {w.date}</div>
                        </div>
                        <button
                          onClick={() =>
                            dispatch({ type: "WORKSHOP_APPROVE", kidId: kid.id, workshopId: w.id, bucks: def.bucks, title: def.title })
                          }
                          className="btn-big py-2 text-sm bg-green-500 text-white"
                        >
                          Approve ⚡{def.bucks}
                        </button>
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        )}

        {/* REWARDS */}
        {tab === "rewards" && <RewardsEditor />}

        {/* SETTINGS */}
        {tab === "settings" && <SettingsPanel />}

        {/* PLAYBOOK */}
        {tab === "playbook" && <Playbook />}
      </div>
    </div>
  );
}

function addDaysISO(iso: string, days: number): string {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function RewardsEditor() {
  const { state, dispatch } = useStore();
  const [label, setLabel] = useState("");
  const [emoji, setEmoji] = useState("🎁");
  const [cost, setCost] = useState("100");
  return (
    <div className="mt-5 space-y-3">
      {state.settings.rewards.map((r) => (
        <div key={r.id} className="card p-4 flex items-center gap-3">
          <div className="text-2xl">{r.emoji}</div>
          <div className="flex-1 font-bold text-gray-800">{r.label}</div>
          <div className="font-bold text-amber-600">⚡{r.cost}</div>
          <button
            onClick={() => dispatch({ type: "REMOVE_REWARD", rewardId: r.id })}
            className="text-red-400 font-bold px-2"
          >
            ✖
          </button>
        </div>
      ))}
      <div className="card p-4 flex flex-wrap items-center gap-3">
        <input
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          className="w-14 border-2 border-violet-200 rounded-xl px-2 py-2 text-center text-xl"
        />
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="New reward…"
          className="flex-1 min-w-[140px] border-2 border-violet-200 rounded-xl px-3 py-2"
        />
        <input
          value={cost}
          onChange={(e) => setCost(e.target.value.replace(/\D/g, ""))}
          inputMode="numeric"
          className="w-20 border-2 border-violet-200 rounded-xl px-3 py-2 text-center"
        />
        <button
          onClick={() => {
            if (!label.trim() || !cost) return;
            dispatch({ type: "ADD_REWARD", reward: { id: uid(), label: label.trim(), emoji: emoji || "🎁", cost: parseInt(cost) } });
            setLabel("");
          }}
          className="btn-big py-2 text-sm bg-violet-600 text-white"
        >
          Add
        </button>
      </div>
    </div>
  );
}

function SettingsPanel() {
  const { state, dispatch } = useStore();
  const [newName, setNewName] = useState("");
  const [newBorn, setNewBorn] = useState("");
  const [pin, setPin] = useState(state.settings.pin ?? "");
  return (
    <div className="mt-5 space-y-4">
      <div className="card p-5">
        <div className="font-extrabold text-gray-800 mb-3">Focus blocks</div>
        <label className="block text-sm font-bold text-gray-600 mb-1">
          Block length: {state.settings.blockMinutes} minutes
        </label>
        <input
          type="range"
          min={5}
          max={25}
          step={5}
          value={state.settings.blockMinutes}
          onChange={(e) => dispatch({ type: "SET_SETTINGS", patch: { blockMinutes: parseInt(e.target.value) } })}
          className="w-full"
        />
        <label className="block text-sm font-bold text-gray-600 mb-1 mt-4">
          Blocks per day (rings): {state.settings.blocksPerDay}
        </label>
        <input
          type="range"
          min={2}
          max={6}
          value={state.settings.blocksPerDay}
          onChange={(e) => dispatch({ type: "SET_SETTINGS", patch: { blocksPerDay: parseInt(e.target.value) } })}
          className="w-full"
        />
        <p className="text-xs text-gray-400 mt-2">
          Alpha uses four ~25-minute Pomodoros. Younger kids do great with 10–15 minute blocks.
        </p>
      </div>

      <div className="card p-5">
        <div className="font-extrabold text-gray-800 mb-3">Learners</div>
        {state.kids.map((k) => (
          <div key={k.id} className="flex items-center gap-3 mb-2">
            <span className="text-xl">{k.emoji}</span>
            <input
              defaultValue={k.name}
              onBlur={(e) => e.target.value.trim() && dispatch({ type: "RENAME_KID", kidId: k.id, name: e.target.value.trim() })}
              className="flex-1 border-2 border-violet-100 rounded-xl px-3 py-2"
            />
            <button
              onClick={() => confirm(`Remove ${k.name} and all progress?`) && dispatch({ type: "REMOVE_KID", kidId: k.id })}
              className="text-red-400 font-bold px-2"
            >
              ✖
            </button>
          </div>
        ))}
        <div className="flex items-center gap-2 mt-3">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Add learner…"
            className="flex-1 border-2 border-violet-200 rounded-xl px-3 py-2"
          />
          <input
            value={newBorn}
            onChange={(e) => setNewBorn(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="Birth yr"
            inputMode="numeric"
            className="w-24 border-2 border-violet-200 rounded-xl px-3 py-2"
          />
          <button
            onClick={() => {
              if (!newName.trim()) return;
              dispatch({ type: "ADD_KID", name: newName.trim(), born: newBorn ? parseInt(newBorn) : undefined });
              setNewName("");
              setNewBorn("");
            }}
            className="btn-big py-2 text-sm bg-violet-600 text-white"
          >
            Add
          </button>
        </div>
      </div>

      <div className="card p-5">
        <div className="font-extrabold text-gray-800 mb-2">Guide PIN (optional)</div>
        <div className="flex gap-2">
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="4-digit PIN"
            inputMode="numeric"
            className="flex-1 border-2 border-violet-200 rounded-xl px-3 py-2"
          />
          <button
            onClick={() => dispatch({ type: "SET_SETTINGS", patch: { pin: pin || null } })}
            className="btn-big py-2 text-sm bg-violet-600 text-white"
          >
            Save
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">Keeps kids out of the dashboard. Leave blank for no PIN.</p>
      </div>

      <div className="card p-5">
        <div className="font-extrabold text-red-500 mb-2">Danger zone</div>
        <button
          onClick={() => confirm("Erase EVERYTHING (all girls, all progress)?") && dispatch({ type: "RESET_ALL" })}
          className="btn-big py-2 text-sm bg-red-100 text-red-600"
        >
          Reset all data
        </button>
      </div>
    </div>
  );
}

function Playbook() {
  return (
    <div className="mt-5 card p-6 text-gray-700 space-y-4 text-sm leading-relaxed">
      <h2 className="font-extrabold text-lg text-gray-800">📖 The Playbook — how to run this at home</h2>
      <p>
        This app is modeled on <b>Alpha School's "2 Hour Learning"</b> system (MacKenzie Price,
        Austin TX). What their research and results say matters most:
      </p>
      <ol className="list-decimal ml-5 space-y-2">
        <li>
          <b>Mastery beats seat time.</b> Kids must hit <b>90%</b> before moving on — no gaps, no
          boredom. The app enforces this on every skill.
        </li>
        <li>
          <b>Work at their level, not their age.</b> The placement round puts each girl exactly
          where she should be, per subject. It's normal for levels to differ across subjects!
        </li>
        <li>
          <b>Short focused blocks.</b> Alpha runs four ~25-min Pomodoros before lunch. Set the
          block length to your girls' attention span and aim to close all rings by lunchtime.
        </li>
        <li>
          <b>Your role = Guide, not teacher.</b> Alpha's adults don't lecture — they motivate,
          celebrate, and keep energy high. Sit nearby, cheer the rings, never do the questions for
          them.
        </li>
        <li>
          <b>Engineered motivation works.</b> Bucks, streaks, and rings are the "why" that gets
          kids started; mastery and confidence become the "why" that keeps them going. Approve
          rewards fast — trust in the economy is everything.
        </li>
        <li>
          <b>Reviews make it stick.</b> Mastered skills come back on a spaced schedule (2, 4, 8…
          days). Don't skip review rounds — that's the difference between learning and cramming.
        </li>
        <li>
          <b>Afternoons are the point.</b> The whole promise of 2-hour learning is giving kids
          their time back for real life: workshops, sports, dance, building things. Guard that
          time!
        </li>
      </ol>
      <p className="text-xs text-gray-400">
        Honest note from families who've tried it: the apps alone aren't magic — the daily
        structure, the sibling energy, and a cheering guide are what make it work. That's you. 💪
      </p>
    </div>
  );
}
