import { useState } from "react";
import type { View } from "../App";
import CoachCharacter from "../components/CoachCharacter";
import { KidBg } from "../components/Ui";
import { MONEY_LEVELS } from "../components/labs/MoneyLab";
import { TALLY_LEVELS } from "../components/labs/TallyLab";
import { MEASURE_LEVELS } from "../components/labs/MeasureLab";
import { TIME_LEVELS } from "../components/labs/TimeLab";
import { HALF_HOUR_LEVELS } from "../components/labs/HalfHourLab";
import { SHAPE_LEVELS } from "../components/labs/ShapeLab";
import type { Kid } from "../lib/types";

/**
 * Hands-on math: the activities a kid does with their fingers rather than by
 * picking A, B or C. Each lab has levels that build, and every level is the
 * same shape — a thing on screen you can tap or drag, and a check button.
 */
const LABS = [
  {
    id: "money" as const,
    title: "Counting Money",
    emoji: "🪙",
    color: "#16a34a",
    soft: "#f0fdf4",
    blurb: "Coins, prices and change",
    levels: MONEY_LEVELS,
  },
  {
    id: "tally" as const,
    title: "Tally Marks",
    emoji: "✏️",
    color: "#7c3aed",
    soft: "#f5f3ff",
    blurb: "Counting in bundles of five",
    levels: TALLY_LEVELS,
  },
  {
    id: "halfhour" as const,
    title: "O'Clock & Half Past",
    emoji: "🕐",
    color: "#f59e0b",
    soft: "#fffbeb",
    blurb: "Telling time to the hour and the half hour",
    levels: HALF_HOUR_LEVELS,
  },
  {
    id: "time" as const,
    title: "Clocks & Calendar",
    emoji: "🕐",
    color: "#0284c7",
    soft: "#f0f9ff",
    blurb: "Time to five minutes, plus days, weeks and years",
    levels: TIME_LEVELS,
  },
  {
    id: "shapes" as const,
    title: "Shapes & Fractions",
    emoji: "🔷",
    color: "#d946ef",
    soft: "#fdf4ff",
    blurb: "Naming shapes, then cutting them into equal parts",
    levels: SHAPE_LEVELS,
  },
  {
    id: "measure" as const,
    title: "Measuring",
    emoji: "📏",
    color: "#ea580c",
    soft: "#fff7ed",
    blurb: "Longer, shorter, and how to measure properly",
    levels: MEASURE_LEVELS,
  },
];

export default function MathLab({ kid, go }: { kid: Kid; go: (v: View) => void }) {
  const [labId, setLabId] = useState<string | null>(null);
  const [levelId, setLevelId] = useState<string | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0 });

  const lab = LABS.find((l) => l.id === labId);
  const level = lab?.levels.find((lv) => lv.id === levelId);

  const onScore = (ok: boolean) =>
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), total: s.total + 1 }));

  /* ---------- playing a level ---------- */
  if (lab && level) {
    const Comp = level.Comp;
    return (
      <KidBg from={lab.color} className="p-4 pb-16">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => { setLevelId(null); setScore({ right: 0, total: 0 }); }}
              className="w-11 h-11 rounded-2xl bg-white/90 text-xl btn-soft shrink-0"
            >
              ⬅️
            </button>
            <div className="flex-1 min-w-0">
              <div className="font-black text-[13px] uppercase tracking-wide" style={{ color: lab.color }}>
                {lab.emoji} {lab.title}
              </div>
              <div className="font-black text-xl text-gray-800 leading-tight truncate">{level.title}</div>
            </div>
            {score.total > 0 && (
              <div className="rounded-2xl px-3 py-2 bg-white/90 font-black text-sm shrink-0" style={{ color: lab.color }}>
                ⭐ {score.right}/{score.total}
              </div>
            )}
          </div>
          <div className="mt-4">
            <Comp onScore={onScore} />
          </div>
        </div>
      </KidBg>
    );
  }

  /* ---------- choosing a level ---------- */
  if (lab) {
    return (
      <KidBg from={lab.color} className="p-4 pb-16">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-3 pt-2">
            <button onClick={() => setLabId(null)} className="w-11 h-11 rounded-2xl bg-white/90 text-xl btn-soft shrink-0">
              ⬅️
            </button>
            <h1 className="font-black text-2xl text-gray-800">
              {lab.emoji} {lab.title}
            </h1>
          </div>
          <p className="font-bold text-gray-500 text-sm mt-2 ml-14">{lab.blurb}</p>

          <div className="space-y-3 mt-5">
            {lab.levels.map((lv, i) => (
              <button
                key={lv.id}
                onClick={() => { setLevelId(lv.id); setScore({ right: 0, total: 0 }); }}
                className="w-full card p-4 btn-soft flex items-center gap-3 text-left"
              >
                <span
                  className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: lab.soft }}
                >
                  {lv.emoji}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-black text-[11px] uppercase tracking-wide" style={{ color: lab.color }}>
                    Level {i + 1}
                  </span>
                  <span className="block font-black text-lg text-gray-800 leading-tight">{lv.title}</span>
                  <span className="block text-sm font-bold text-gray-500">{lv.blurb}</span>
                </span>
                <span className="font-black text-xl shrink-0" style={{ color: lab.color }}>›</span>
              </button>
            ))}
          </div>
        </div>
      </KidBg>
    );
  }

  /* ---------- the hub ---------- */
  return (
    <KidBg from="#6366f1" className="p-4 pb-16">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-3 pt-2">
          <button onClick={() => go({ name: "kid", kidId: kid.id })} className="w-11 h-11 rounded-2xl bg-white/90 text-xl btn-soft shrink-0">
            ⬅️
          </button>
          <h1 className="font-black text-2xl text-gray-800">🧪 Math Labs</h1>
        </div>
        <p className="font-bold text-gray-500 text-sm mt-2 ml-14">
          Hands-on math — tap and drag things around instead of picking answers.
        </p>

        <div className="space-y-3 mt-5">
          {LABS.map((l) => (
            <button key={l.id} onClick={() => setLabId(l.id)} className="w-full card p-5 btn-soft flex items-center gap-4 text-left">
              <span className="shrink-0 w-16 h-16 rounded-3xl flex items-center justify-center text-3xl" style={{ background: l.soft }}>
                {l.emoji}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-black text-xl text-gray-800 leading-tight">{l.title}</span>
                <span className="block text-sm font-bold text-gray-500">{l.blurb}</span>
                <span className="block text-[12px] font-black mt-1" style={{ color: l.color }}>
                  {l.levels.length} levels
                </span>
              </span>
              <span className="font-black text-xl shrink-0" style={{ color: l.color }}>›</span>
            </button>
          ))}
        </div>

        <div className="card p-4 mt-5 flex items-center gap-3">
          <CoachCharacter subject="math" size={72} />
          <p className="font-bold text-gray-600 text-sm">
            These are the ones you do with your hands. Move the coins, lay the paperclips, draw the
            tallies — then check your answer.
          </p>
        </div>
      </div>
    </KidBg>
  );
}
