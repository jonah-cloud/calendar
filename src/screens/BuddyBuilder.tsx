import { useState, type ReactNode } from "react";
import type { View } from "../App";
import BuddyAvatar, { ACCESSORY_OPTIONS, PART_COUNTS } from "../components/BuddyAvatar";
import { DEFAULT_BUDDY, VOICE_PRESETS } from "../lib/buddy";
import { speak } from "../lib/speech";
import { useStore } from "../lib/store";
import type { BuddyConfig, Kid } from "../lib/types";

const COLORS = [
  "#8b5cf6", "#a78bfa", "#ec4899", "#f472b6", "#ef4444", "#f97316", "#f59e0b", "#fbbf24",
  "#84cc16", "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#38bdf8", "#3b82f6", "#6366f1",
  "#a855f7", "#d946ef", "#78716c", "#64748b",
];
const ACCENTS = [
  "#fde68a", "#fef3c7", "#fbcfe8", "#fce7f3", "#fecaca", "#fed7aa", "#d9f99d", "#bbf7d0",
  "#99f6e4", "#bae6fd", "#bfdbfe", "#c7d2fe", "#e9d5ff", "#f5d0fe", "#e7e5e4", "#ffffff",
  "#fca5a5", "#86efac", "#7dd3fc", "#fcd34d",
];

const PART_LABELS: { key: keyof typeof PART_COUNTS; label: string; emoji: string }[] = [
  { key: "head", label: "Head shape", emoji: "🙂" },
  { key: "body", label: "Body shape", emoji: "🫃" },
  { key: "arms", label: "Arms", emoji: "💪" },
  { key: "legs", label: "Legs", emoji: "🦵" },
  { key: "feet", label: "Feet", emoji: "🦶" },
  { key: "ears", label: "Ears", emoji: "👂" },
  { key: "hair", label: "Hair", emoji: "💇" },
  { key: "eyes", label: "Eyes", emoji: "👀" },
];

export default function BuddyBuilder({ kid, go }: { kid: Kid; go: (v: View) => void }) {
  const { dispatch } = useStore();
  const [b, setB] = useState<BuddyConfig>(kid.buddy ?? { ...DEFAULT_BUDDY, name: "" });

  const set = (patch: Partial<BuddyConfig>) => setB((prev) => ({ ...prev, ...patch }));

  const voiceStyle = (id: string) => (VOICE_PRESETS.find((v) => v.id === id) ?? VOICE_PRESETS[1]).style;

  const hear = (voiceId?: string) =>
    speak(
      `Hi ${kid.name}! I'm ${b.name || "your buddy"}, and I sound like this! We're going to be GREAT together!`,
      voiceStyle(voiceId ?? b.voice)
    );

  const toggleAccessory = (id: string) => {
    set({
      accessories: b.accessories.includes(id)
        ? b.accessories.filter((x) => x !== id)
        : [...b.accessories, id],
    });
  };

  const save = () => {
    if (!b.name.trim()) return;
    dispatch({ type: "SET_BUDDY", kidId: kid.id, buddy: { ...b, name: b.name.trim() } });
    speak(`Yes! I'm ${b.name}, YOUR buddy! Let's go learn something amazing!`, voiceStyle(b.voice));
    go({ name: "kid", kidId: kid.id });
  };

  return (
    <div className="min-h-screen p-4 pb-40 bg-gradient-to-br from-violet-200 via-fuchsia-100 to-amber-100">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 pt-2">
          <button onClick={() => go({ name: "kid", kidId: kid.id })} className="text-2xl p-1 active:scale-90">
            ⬅️
          </button>
          <h1 className="font-extrabold text-2xl text-gray-800">🛠️ Build Your Buddy!</h1>
        </div>
        <p className="text-sm text-gray-500 mt-1 ml-12">
          This is YOUR coach and biggest fan, {kid.name}. Design every single part!
        </p>

        {/* live preview — sticky so you always see your buddy while scrolling */}
        <div className="sticky top-2 z-40 mt-4">
          <div className="card p-4 flex items-center gap-4 shadow-xl">
            <BuddyAvatar buddy={b} size={110} mood="idle" />
            <div className="flex-1">
              <input
                value={b.name}
                onChange={(e) => set({ name: e.target.value.slice(0, 14) })}
                placeholder="Name your buddy…"
                className="w-full text-xl font-extrabold border-2 border-violet-200 rounded-2xl px-4 py-2 focus:outline-none focus:border-violet-500"
              />
              <button onClick={() => hear()} className="mt-2 btn-big py-1.5 px-4 text-sm bg-violet-100 text-violet-700">
                🔊 Hear my voice
              </button>
            </div>
          </div>
        </div>

        {/* voices — 8 named characters */}
        <Section title="Voice" emoji="🗣️">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {VOICE_PRESETS.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  set({ voice: v.id });
                  hear(v.id);
                }}
                className={`rounded-2xl p-3 text-center active:scale-95 transition-transform ${
                  b.voice === v.id ? "bg-violet-600 text-white" : "bg-white text-gray-700"
                }`}
              >
                <div className="text-2xl">{v.emoji}</div>
                <div className="font-extrabold text-sm mt-0.5">{v.label}</div>
                <div className={`text-[10px] font-bold ${b.voice === v.id ? "text-violet-200" : "text-gray-400"}`}>
                  {v.blurb}
                </div>
              </button>
            ))}
          </div>
        </Section>

        {/* colors */}
        <Section title="Body color" emoji="🎨">
          <div className="flex flex-wrap gap-2">
            {COLORS.map((c) => (
              <Swatch key={c} color={c} active={b.color === c} onClick={() => set({ color: c })} />
            ))}
          </div>
        </Section>
        <Section title="Belly color" emoji="🤍">
          <div className="flex flex-wrap gap-2">
            {ACCENTS.map((c) => (
              <Swatch key={c} color={c} active={b.accent === c} onClick={() => set({ accent: c })} />
            ))}
          </div>
        </Section>

        {/* body part galleries — 20 visual options each */}
        {PART_LABELS.map(({ key, label, emoji }) => (
          <Section key={key} title={label} emoji={emoji}>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {Array.from({ length: PART_COUNTS[key] }, (_, i) => (
                <button
                  key={i}
                  onClick={() => set({ [key]: i } as Partial<BuddyConfig>)}
                  className="shrink-0 rounded-2xl p-1 bg-white active:scale-95 transition-transform"
                  style={{
                    border: b[key] === i ? "3px solid #7c3aed" : "3px solid transparent",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  }}
                >
                  <BuddyAvatar buddy={{ ...b, [key]: i }} size={62} still />
                </button>
              ))}
            </div>
          </Section>
        ))}

        {/* accessories — pick as many as you want! */}
        <Section title="Accessories — pick ALL your favorites!" emoji="✨">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ACCESSORY_OPTIONS.map((acc) => {
              const on = b.accessories.includes(acc.id);
              return (
                <button
                  key={acc.id}
                  onClick={() => toggleAccessory(acc.id)}
                  className={`rounded-2xl px-3 py-2.5 font-bold text-sm text-left active:scale-95 transition-transform flex items-center gap-2 ${
                    on ? "bg-violet-600 text-white" : "bg-white text-gray-600"
                  }`}
                >
                  <span className="text-xl">{acc.emoji}</span>
                  <span>{acc.label}</span>
                  {on && <span className="ml-auto">✓</span>}
                </button>
              );
            })}
          </div>
        </Section>

        {/* save bar */}
        <div className="fixed bottom-0 inset-x-0 p-4 bg-gradient-to-t from-white via-white/95 to-transparent z-40">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={save}
              disabled={!b.name.trim()}
              className="btn-big w-full bg-violet-600 text-white text-xl disabled:opacity-40 shadow-xl"
            >
              {b.name.trim() ? `Meet ${b.name.trim()}! 🎉` : "Give your buddy a name!"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, emoji, children }: { title: string; emoji: string; children: ReactNode }) {
  return (
    <div className="card p-4 mt-4">
      <div className="text-xs font-extrabold uppercase tracking-wide text-gray-400 mb-3">
        {emoji} {title}
      </div>
      {children}
    </div>
  );
}

function Swatch({ color, active, onClick }: { color: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 rounded-full active:scale-90 transition-transform"
      style={{
        background: color,
        border: active ? "3.5px solid #1f2937" : "3px solid white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
      }}
    />
  );
}
