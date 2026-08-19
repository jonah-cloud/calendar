import { useEffect, useMemo, type ReactNode } from "react";
import CoachCharacter, { useSpeaking, type CoachMood } from "./CoachCharacter";
import type { Coach } from "../lib/coaches";
import { speak } from "../lib/speech";
import type { SubjectDef, SubjectId } from "../lib/types";

/** Playful page background: soft gradient + floating blobs. */
export function KidBg({
  from,
  via = "#f5f3ff",
  children,
  className = "",
}: {
  from: string;
  via?: string;
  children: ReactNode;
  className?: string;
}) {
  const blobs = useMemo(
    () => [
      { size: 190, top: "6%", left: "-7%", color: from, delay: "0s" },
      { size: 130, top: "62%", left: "-5%", color: from, delay: "1.4s" },
      { size: 220, top: "18%", left: "82%", color: from, delay: "0.7s" },
      { size: 110, top: "78%", left: "86%", color: from, delay: "2.1s" },
    ],
    [from]
  );
  return (
    <div
      className={`kid-bg ${className}`}
      style={{ background: `linear-gradient(165deg, ${from}55 0%, ${via} 55%, ${via} 100%)` }}
    >
      {blobs.map((b, i) => (
        <span
          key={i}
          className="blob"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: b.color,
            opacity: 0.22,
            animationDelay: b.delay,
          }}
        />
      ))}
      {children}
    </div>
  );
}

/** Celebration confetti burst. */
export function Confetti({ count = 34 }: { count?: number }) {
  const colors = ["#f472b6", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#fb923c"];
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 97) % 100}%`,
        color: colors[i % colors.length],
        delay: `${(i % 9) * 0.09}s`,
        dur: `${1.3 + ((i * 7) % 9) / 10}s`,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{ left: p.left, background: p.color, animationDelay: p.delay, animationDuration: p.dur }}
        />
      ))}
    </div>
  );
}

/**
 * The animated coach talking to the kid. Speaks its line on mount and lip-syncs
 * while the audio plays.
 */
export function CoachSays({
  subject,
  coach,
  def,
  text,
  mood = "idle",
  size = 118,
  say = true,
  lang,
}: {
  subject: SubjectId;
  coach: Coach;
  def: SubjectDef;
  text: string;
  mood?: CoachMood;
  size?: number;
  /** speak the text aloud on mount */
  say?: boolean;
  lang?: string;
}) {
  const talking = useSpeaking();
  useEffect(() => {
    if (say) speak(text, coach.voice, lang ? { lang } : undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <div className="flex items-start gap-2" style={{ color: def.color }}>
      <CoachCharacter subject={subject} size={size} mood={mood} />
      <div className="flex-1 min-w-0 pt-2">
        <button
          onClick={() => speak(text, coach.voice, lang ? { lang } : undefined)}
          className="bubble bg-white text-left w-full p-4 active:scale-[0.99] transition-transform"
          style={{ border: `4px solid ${def.color}33`, boxShadow: `0 6px 0 ${def.color}1f` }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <span className="font-black text-xs uppercase tracking-wide" style={{ color: def.color }}>
              {coach.name}
            </span>
            <span className="text-xs">{talking ? "🔊" : "👆 tap to replay"}</span>
          </div>
          <div className="font-bold text-gray-700 leading-snug text-[17px]">{text}</div>
        </button>
      </div>
    </div>
  );
}

/** Big, chunky, kid-tappable answer tile with an A/B/C/D badge. */
export function AnswerTile({
  label,
  index,
  state,
  color,
  onClick,
}: {
  label: string;
  index: number;
  state: "idle" | "right" | "wrong" | "dim";
  color: string;
  onClick: () => void;
}) {
  const badge = ["A", "B", "C", "D", "E"][index] ?? String(index + 1);
  const cls =
    state === "right" ? "tile tile-right tile-locked" : state === "wrong" ? "tile tile-wrong tile-locked" : state === "dim" ? "tile tile-dim tile-locked" : "tile";
  const short = label.length <= 6;
  return (
    <button
      onClick={onClick}
      className={cls}
      style={state === "idle" ? { borderColor: `${color}33` } : undefined}
    >
      <span
        className="tile-badge"
        style={{ background: state === "right" ? "#16a34a" : state === "wrong" ? "#ef4444" : color }}
      >
        {state === "right" ? "✓" : state === "wrong" ? "✕" : badge}
      </span>
      <span className={`${short ? "text-[30px]" : "text-[19px]"} leading-tight text-gray-800 break-words`}>{label}</span>
    </button>
  );
}

/** Chunky primary button in a subject's color. */
export function BigButton({
  children,
  onClick,
  color,
  className = "",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  color: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn-chunky px-6 py-4 text-xl ${className}`}
      style={{ background: color, ["--btn-shadow" as string]: shade(color, -38) }}
    >
      {children}
    </button>
  );
}

export function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (n >> 16) + amt));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + amt));
  const b = Math.max(0, Math.min(255, (n & 0xff) + amt));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
