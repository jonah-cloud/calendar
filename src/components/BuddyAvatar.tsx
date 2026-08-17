import { useEffect, useState } from "react";
import type { BuddyConfig } from "../lib/types";

export type BuddyMood = "idle" | "cheer" | "concerned" | "proud";

/**
 * The kid-built buddy, rendered as an animated SVG: idle bobbing, blinking,
 * and a mouth that actually moves while the speech engine is talking.
 */
export default function BuddyAvatar({
  buddy,
  size = 120,
  mood = "idle",
}: {
  buddy: BuddyConfig;
  size?: number;
  mood?: BuddyMood;
}) {
  const [talking, setTalking] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      try {
        setTalking(!!window.speechSynthesis?.speaking);
      } catch {
        setTalking(false);
      }
    }, 160);
    return () => clearInterval(t);
  }, []);

  const { color, accent } = buddy;
  const dark = shade(color, -30);

  return (
    <div
      className={mood === "cheer" ? "buddy-cheer" : mood === "proud" ? "buddy-cheer" : "buddy-bob"}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 120 130" width={size} height={size * (130 / 120)}>
        {/* ears */}
        <Ears kind={buddy.ears} color={color} accent={accent} />
        {/* body blob */}
        <circle cx="60" cy="70" r="44" fill={color} />
        <ellipse cx="60" cy="86" rx="26" ry="20" fill={accent} opacity="0.9" />
        {/* arms */}
        <ellipse cx="16" cy="78" rx="9" ry="14" fill={color} transform={mood === "cheer" ? "rotate(-40 16 78)" : "rotate(15 16 78)"} className="buddy-arm" />
        <ellipse cx="104" cy="78" rx="9" ry="14" fill={color} transform={mood === "cheer" ? "rotate(40 104 78)" : "rotate(-15 104 78)"} className="buddy-arm" />
        {/* feet */}
        <ellipse cx="42" cy="116" rx="12" ry="8" fill={dark} />
        <ellipse cx="78" cy="116" rx="12" ry="8" fill={dark} />
        {/* blush */}
        <circle cx="34" cy="72" r="6" fill="#f472b6" opacity="0.35" />
        <circle cx="86" cy="72" r="6" fill="#f472b6" opacity="0.35" />
        {/* eyes */}
        <g className="buddy-eyes">
          <Eyes kind={buddy.eyes} mood={mood} />
        </g>
        {/* mouth */}
        <Mouth talking={talking} mood={mood} />
        {/* accessory */}
        <Accessory kind={buddy.accessory} accent={accent} />
      </svg>
    </div>
  );
}

function Ears({ kind, color, accent }: { kind: BuddyConfig["ears"]; color: string; accent: string }) {
  switch (kind) {
    case "round":
      return (
        <>
          <circle cx="30" cy="32" r="14" fill={color} />
          <circle cx="90" cy="32" r="14" fill={color} />
          <circle cx="30" cy="32" r="7" fill={accent} opacity="0.8" />
          <circle cx="90" cy="32" r="7" fill={accent} opacity="0.8" />
        </>
      );
    case "pointy":
      return (
        <>
          <polygon points="18,44 30,10 46,36" fill={color} />
          <polygon points="102,44 90,10 74,36" fill={color} />
          <polygon points="25,38 30,20 39,34" fill={accent} opacity="0.8" />
          <polygon points="95,38 90,20 81,34" fill={accent} opacity="0.8" />
        </>
      );
    case "floppy":
      return (
        <>
          <ellipse cx="24" cy="46" rx="10" ry="22" fill={color} transform="rotate(20 24 46)" />
          <ellipse cx="96" cy="46" rx="10" ry="22" fill={color} transform="rotate(-20 96 46)" />
        </>
      );
    case "antenna":
      return (
        <>
          <line x1="44" y1="30" x2="36" y2="8" stroke={color} strokeWidth="4" strokeLinecap="round" />
          <line x1="76" y1="30" x2="84" y2="8" stroke={color} strokeWidth="4" strokeLinecap="round" />
          <circle cx="36" cy="7" r="6" fill={accent} className="buddy-twinkle" />
          <circle cx="84" cy="7" r="6" fill={accent} className="buddy-twinkle" />
        </>
      );
  }
}

function Eyes({ kind, mood }: { kind: BuddyConfig["eyes"]; mood: BuddyMood }) {
  if (mood === "concerned") {
    return (
      <>
        <circle cx="45" cy="58" r="5.5" fill="#1f2937" />
        <circle cx="75" cy="58" r="5.5" fill="#1f2937" />
        <circle cx="47" cy="56" r="2" fill="white" />
        <circle cx="77" cy="56" r="2" fill="white" />
        <path d="M37 48 q8 -4 14 1" stroke="#1f2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M83 48 q-8 -4 -14 1" stroke="#1f2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </>
    );
  }
  switch (kind) {
    case "happy":
      return (
        <>
          <path d="M38 58 q7 -9 14 0" stroke="#1f2937" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M68 58 q7 -9 14 0" stroke="#1f2937" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </>
      );
    case "big":
      return (
        <>
          <circle cx="45" cy="57" r="8" fill="#1f2937" />
          <circle cx="75" cy="57" r="8" fill="#1f2937" />
          <circle cx="48" cy="54" r="3" fill="white" />
          <circle cx="78" cy="54" r="3" fill="white" />
        </>
      );
    case "star":
      return (
        <>
          <text x="45" y="63" textAnchor="middle" fontSize="17" fill="#1f2937">✦</text>
          <text x="75" y="63" textAnchor="middle" fontSize="17" fill="#1f2937">✦</text>
        </>
      );
    case "sleepy":
      return (
        <>
          <path d="M38 57 q7 5 14 0" stroke="#1f2937" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M68 57 q7 5 14 0" stroke="#1f2937" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </>
      );
  }
}

function Mouth({ talking, mood }: { talking: boolean; mood: BuddyMood }) {
  if (talking) {
    return <ellipse cx="60" cy="76" rx="8" ry="6" fill="#7c2d12" className="buddy-talk" />;
  }
  if (mood === "concerned") {
    return <path d="M52 78 q8 -5 16 0" stroke="#7c2d12" strokeWidth="3" fill="none" strokeLinecap="round" />;
  }
  if (mood === "cheer" || mood === "proud") {
    return <path d="M48 74 q12 14 24 0 z" fill="#7c2d12" />;
  }
  return <path d="M50 75 q10 9 20 0" stroke="#7c2d12" strokeWidth="3.5" fill="none" strokeLinecap="round" />;
}

function Accessory({ kind, accent }: { kind: BuddyConfig["accessory"]; accent: string }) {
  switch (kind) {
    case "none":
      return null;
    case "bow":
      return (
        <g>
          <polygon points="45,22 60,28 45,34" fill="#ec4899" />
          <polygon points="75,22 60,28 75,34" fill="#ec4899" />
          <circle cx="60" cy="28" r="4" fill="#be185d" />
        </g>
      );
    case "glasses":
      return (
        <g>
          <circle cx="45" cy="57" r="12" fill="none" stroke="#1f2937" strokeWidth="2.5" />
          <circle cx="75" cy="57" r="12" fill="none" stroke="#1f2937" strokeWidth="2.5" />
          <line x1="57" y1="57" x2="63" y2="57" stroke="#1f2937" strokeWidth="2.5" />
        </g>
      );
    case "crown":
      return (
        <g>
          <polygon points="42,26 48,12 56,24 60,10 64,24 72,12 78,26" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
          <rect x="42" y="24" width="36" height="6" rx="2" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
        </g>
      );
    case "flower":
      return (
        <g transform="translate(84 24)">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy="-7" rx="4.5" ry="7" fill="#f9a8d4" transform={`rotate(${a})`} />
          ))}
          <circle r="4.5" fill="#fbbf24" />
        </g>
      );
    case "cap":
      return (
        <g>
          <path d="M38 30 a22 18 0 0 1 44 0 z" fill="#3b82f6" />
          <rect x="58" y="10" width="24" height="6" rx="3" fill="#2563eb" />
          <circle cx="60" cy="14" r="3.5" fill={accent} />
        </g>
      );
  }
}

/** Darken/lighten a hex color. */
function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (n >> 16) + amt));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + amt));
  const b = Math.max(0, Math.min(255, (n & 0xff) + amt));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
