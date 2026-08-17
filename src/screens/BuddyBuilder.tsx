import { useState, type ReactNode } from "react";
import type { View } from "../App";
import BuddyAvatar from "../components/BuddyAvatar";
import { DEFAULT_BUDDY } from "../lib/buddy";
import { speak } from "../lib/speech";
import { useStore } from "../lib/store";
import type { BuddyConfig, Kid } from "../lib/types";

const COLORS = ["#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#14b8a6", "#a3e635"];
const ACCENTS = ["#fde68a", "#fbcfe8", "#bfdbfe", "#bbf7d0", "#fed7aa", "#e9d5ff", "#ffffff"];
const EARS: { v: BuddyConfig["ears"]; label: string }[] = [
  { v: "round", label: "🐻 Round" },
  { v: "pointy", label: "🐱 Pointy" },
  { v: "floppy", label: "🐰 Floppy" },
  { v: "antenna", label: "👾 Antenna" },
];
const EYES: { v: BuddyConfig["eyes"]; label: string }[] = [
  { v: "happy", label: "😊 Happy" },
  { v: "big", label: "🥺 Big" },
  { v: "star", label: "🤩 Starry" },
  { v: "sleepy", label: "😌 Cozy" },
];
const ACCESSORIES: { v: BuddyConfig["accessory"]; label: string }[] = [
  { v: "bow", label: "🎀 Bow" },
  { v: "crown", label: "👑 Crown" },
  { v: "glasses", label: "🤓 Glasses" },
  { v: "flower", label: "🌸 Flower" },
  { v: "cap", label: "🧢 Cap" },
  { v: "none", label: "✨ Nothing" },
];

export default function BuddyBuilder({ kid, go }: { kid: Kid; go: (v: View) => void }) {
  const { dispatch } = useStore();
  const [b, setB] = useState<BuddyConfig>(kid.buddy ?? { ...DEFAULT_BUDDY, name: "" });

  const set = (patch: Partial<BuddyConfig>) => setB({ ...b, ...patch });

  const hear = () =>
    speak(
      `Hi ${kid.name}! I'm ${b.name || "your buddy"}! I'll be cheering for you every single day. We're going to be GREAT together!`,
      { pitch: b.pitch, rate: 1.05 }
    );

  const save = () => {
    if (!b.name.trim()) return;
    dispatch({ type: "SET_BUDDY", kidId: kid.id, buddy: { ...b, name: b.name.trim() } });
    speak(`Yes! I'm ${b.name}, YOUR buddy! Let's go learn something amazing!`, { pitch: b.pitch, rate: 1.05 });
    go({ name: "kid", kidId: kid.id });
  };

  return (
    <div className="min-h-screen p-4 pb-16 bg-gradient-to-br from-violet-200 via-fuchsia-100 to-amber-100">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 pt-2">
          <button onClick={() => go({ name: "kid", kidId: kid.id })} className="text-2xl p-1 active:scale-90">
            ⬅️
          </button>
          <h1 className="font-extrabold text-2xl text-gray-800">🛠️ Build Your Buddy!</h1>
        </div>
        <p className="text-sm text-gray-500 mt-1 ml-12">
          This is YOUR coach and biggest fan, {kid.name}. Make them exactly how you want!
        </p>

        {/* preview */}
        <div className="card p-6 mt-5 flex flex-col items-center">
          <BuddyAvatar buddy={b} size={170} mood="idle" />
          <input
            value={b.name}
            onChange={(e) => set({ name: e.target.value.slice(0, 14) })}
            placeholder="Name your buddy…"
            className="mt-3 text-center text-xl font-extrabold border-2 border-violet-200 rounded-2xl px-4 py-2 focus:outline-none focus:border-violet-500 w-64"
          />
          <button onClick={hear} className="mt-3 btn-big py-2 text-sm bg-violet-100 text-violet-700">
            🔊 Hear my voice!
          </button>
        </div>

        {/* options */}
        <div className="card p-5 mt-4 space-y-4">
          <OptionRow label="Body color">
            {COLORS.map((c) => (
              <Swatch key={c} color={c} active={b.color === c} onClick={() => set({ color: c })} />
            ))}
          </OptionRow>
          <OptionRow label="Belly color">
            {ACCENTS.map((c) => (
              <Swatch key={c} color={c} active={b.accent === c} onClick={() => set({ accent: c })} />
            ))}
          </OptionRow>
          <OptionRow label="Ears">
            {EARS.map((o) => (
              <Chip key={o.v} label={o.label} active={b.ears === o.v} onClick={() => set({ ears: o.v })} />
            ))}
          </OptionRow>
          <OptionRow label="Eyes">
            {EYES.map((o) => (
              <Chip key={o.v} label={o.label} active={b.eyes === o.v} onClick={() => set({ eyes: o.v })} />
            ))}
          </OptionRow>
          <OptionRow label="Something special">
            {ACCESSORIES.map((o) => (
              <Chip key={o.v} label={o.label} active={b.accessory === o.v} onClick={() => set({ accessory: o.v })} />
            ))}
          </OptionRow>
          <div>
            <div className="text-xs font-extrabold uppercase tracking-wide text-gray-400 mb-2">Voice</div>
            <div className="flex items-center gap-3">
              <span className="text-lg">🐻</span>
              <input
                type="range"
                min={0.7}
                max={1.8}
                step={0.05}
                value={b.pitch}
                onChange={(e) => set({ pitch: parseFloat(e.target.value) })}
                className="flex-1"
              />
              <span className="text-lg">🐭</span>
              <button onClick={hear} className="btn-big py-1.5 px-3 text-sm bg-gray-100 text-gray-600">
                Test
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={save}
          disabled={!b.name.trim()}
          className="btn-big w-full mt-5 bg-violet-600 text-white text-xl disabled:opacity-40"
        >
          {b.name.trim() ? `Meet ${b.name.trim()}! 🎉` : "Give your buddy a name!"}
        </button>
      </div>
    </div>
  );
}

function OptionRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="text-xs font-extrabold uppercase tracking-wide text-gray-400 mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Swatch({ color, active, onClick }: { color: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-full active:scale-90 transition-transform"
      style={{ background: color, border: active ? "4px solid #1f2937" : "3px solid white", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }}
    />
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl px-4 py-2 font-bold text-sm active:scale-95 transition-transform ${
        active ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-600"
      }`}
    >
      {label}
    </button>
  );
}
