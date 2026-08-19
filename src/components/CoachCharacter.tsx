import { useEffect, useState, type ReactNode } from "react";
import type { SubjectId } from "../lib/types";
import { isSpeaking, subscribeSpeech } from "../lib/speech";

export type CoachMood = "idle" | "happy" | "oops" | "excited";

/** True while the speech engine is actually talking. */
export function useSpeaking(): boolean {
  const [v, setV] = useState(() => isSpeaking());
  useEffect(() => {
    const un = subscribeSpeech(() => setV(isSpeaking()));
    return () => {
      un();
    };
  }, []);
  return v;
}

/**
 * Big animated animal coaches, drawn as SVG so they can actually blink, bob and
 * lip-sync while the speech engine talks. One face per subject.
 */
export default function CoachCharacter({
  subject,
  size = 130,
  mood = "idle",
  talking,
}: {
  subject: SubjectId;
  size?: number;
  mood?: CoachMood;
  /** Override auto lip-sync (defaults to "whenever speech is playing"). */
  talking?: boolean;
}) {
  const auto = useSpeaking();
  const isTalking = talking ?? auto;
  const Face = FACES[subject];

  return (
    <div className="relative inline-block shrink-0" style={{ width: size, height: size }}>
      {isTalking && <SoundWaves />}
      <div className={isTalking ? "coach-talk-bob" : mood === "excited" ? "coach-excited" : "coach-idle"}>
        <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true">
          <Face talking={isTalking} mood={mood} />
        </svg>
      </div>
    </div>
  );
}

function SoundWaves() {
  return (
    <div className="absolute -right-1 top-2 flex items-end gap-[3px] h-6 z-10">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-current opacity-70 sound-bar"
          style={{ animationDelay: `${i * 0.12}s`, height: 8 + i * 4 }}
        />
      ))}
    </div>
  );
}

/* ---------------- shared face parts ---------------- */

interface FaceProps {
  talking: boolean;
  mood: CoachMood;
}

/** Eyes that blink, squint when happy, and go wide when surprised. */
function Eyes({ x1 = 44, x2 = 76, y = 54, r = 8, mood }: { x1?: number; x2?: number; y?: number; r?: number; mood: CoachMood }) {
  if (mood === "happy" || mood === "excited") {
    return (
      <g stroke="#1f2937" strokeWidth={3.4} fill="none" strokeLinecap="round">
        <path d={`M${x1 - 7} ${y + 2} q7 -9 14 0`} />
        <path d={`M${x2 - 7} ${y + 2} q7 -9 14 0`} />
      </g>
    );
  }
  return (
    <g className="coach-blink" style={{ transformOrigin: `60px ${y}px` }}>
      <circle cx={x1} cy={y} r={r} fill="#1f2937" />
      <circle cx={x2} cy={y} r={r} fill="#1f2937" />
      <circle cx={x1 + r * 0.35} cy={y - r * 0.35} r={r * 0.32} fill="#fff" />
      <circle cx={x2 + r * 0.35} cy={y - r * 0.35} r={r * 0.32} fill="#fff" />
    </g>
  );
}

/** A mouth that flaps open and shut while the character speaks. */
function Mouth({
  talking,
  mood,
  cx = 60,
  cy = 76,
  w = 16,
  fill = "#7f1d1d",
}: {
  talking: boolean;
  mood: CoachMood;
  cx?: number;
  cy?: number;
  w?: number;
  fill?: string;
}) {
  if (talking) {
    return (
      <g className="coach-mouth" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <ellipse cx={cx} cy={cy} rx={w * 0.5} ry={w * 0.42} fill={fill} />
        <ellipse cx={cx} cy={cy + w * 0.16} rx={w * 0.3} ry={w * 0.18} fill="#f9a8d4" />
      </g>
    );
  }
  if (mood === "oops") return <path d={`M${cx - w * 0.4} ${cy + 3} q${w * 0.4} -6 ${w * 0.8} 0`} stroke={fill} strokeWidth={3} fill="none" strokeLinecap="round" />;
  if (mood === "happy" || mood === "excited")
    return <path d={`M${cx - w * 0.5} ${cy - 3} q${w * 0.5} ${w * 0.75} ${w} 0 z`} fill={fill} />;
  return <path d={`M${cx - w * 0.4} ${cy - 2} q${w * 0.4} ${w * 0.4} ${w * 0.8} 0`} stroke={fill} strokeWidth={3} fill="none" strokeLinecap="round" />;
}

function Blush({ y = 66, color = "#fb7185" }: { y?: number; color?: string }) {
  return (
    <>
      <ellipse cx="32" cy={y} rx="8" ry="5" fill={color} opacity="0.3" />
      <ellipse cx="88" cy={y} rx="8" ry="5" fill={color} opacity="0.3" />
    </>
  );
}

function Whiskers({ y = 74, color = "#94a3b8" }: { y?: number; color?: string }) {
  return (
    <g stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.85">
      <line x1="26" y1={y - 4} x2="8" y2={y - 8} />
      <line x1="26" y1={y + 1} x2="6" y2={y + 2} />
      <line x1="94" y1={y - 4} x2="112" y2={y - 8} />
      <line x1="94" y1={y + 1} x2="114" y2={y + 2} />
    </g>
  );
}

/* ---------------- the seven coaches ---------------- */

/** Dash the Cheetah — speed goggles, spots, permanent grin. */
function DashFace({ talking, mood }: FaceProps) {
  return (
    <>
      <g className="coach-ear-l"><ellipse cx="28" cy="30" rx="14" ry="15" fill="#f59e0b" /><ellipse cx="28" cy="31" rx="7" ry="8" fill="#fbbf24" /></g>
      <g className="coach-ear-r"><ellipse cx="92" cy="30" rx="14" ry="15" fill="#f59e0b" /><ellipse cx="92" cy="31" rx="7" ry="8" fill="#fbbf24" /></g>
      <ellipse cx="60" cy="62" rx="42" ry="40" fill="#fbbf24" />
      <ellipse cx="60" cy="76" rx="26" ry="22" fill="#fef3c7" />
      {[[30, 44], [88, 44], [26, 60], [94, 60], [36, 30], [84, 30]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="4" ry="5" fill="#78350f" opacity="0.75" />
      ))}
      {/* racing goggles */}
      <rect x="18" y="44" width="84" height="6" rx="3" fill="#0ea5e9" opacity="0.9" />
      <Eyes mood={mood} y={54} r={9} />
      {/* tear lines — the cheetah signature */}
      <path d="M44 62 q-3 8 -1 13" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M76 62 q3 8 1 13" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="68" rx="6" ry="4.5" fill="#78350f" />
      <Mouth talking={talking} mood={mood} cy={78} w={18} />
      <Whiskers y={72} color="#a16207" />
      <Blush y={70} />
    </>
  );
}

/** Olive the Owl — giant eye discs, reading glasses, feather tufts. */
function OliveFace({ talking, mood }: FaceProps) {
  return (
    <>
      <g className="coach-ear-l"><path d="M26 28 L34 6 L46 26 Z" fill="#78350f" /></g>
      <g className="coach-ear-r"><path d="M94 28 L86 6 L74 26 Z" fill="#78350f" /></g>
      <ellipse cx="60" cy="64" rx="44" ry="42" fill="#a16207" />
      <ellipse cx="60" cy="74" rx="30" ry="26" fill="#d97706" opacity="0.55" />
      {/* eye discs */}
      <circle cx="42" cy="54" r="19" fill="#fef3c7" />
      <circle cx="78" cy="54" r="19" fill="#fef3c7" />
      <Eyes mood={mood} x1={42} x2={78} y={54} r={10} />
      {/* spectacles */}
      <g stroke="#334155" strokeWidth="2.5" fill="none" opacity="0.85">
        <circle cx="42" cy="54" r="15" />
        <circle cx="78" cy="54" r="15" />
        <line x1="57" y1="54" x2="63" y2="54" />
      </g>
      <path d="M60 64 L53 74 L67 74 Z" fill="#f59e0b" />
      <Mouth talking={talking} mood={mood} cy={82} w={14} fill="#b45309" />
      {/* chest feathers */}
      <g stroke="#78350f" strokeWidth="2" opacity="0.4" fill="none">
        <path d="M44 92 q6 6 12 0" /><path d="M64 92 q6 6 12 0" />
      </g>
    </>
  );
}

/** Lola the Parrot — crest feathers, big curved beak, telenovela lashes. */
function LolaFace({ talking, mood }: FaceProps) {
  return (
    <>
      <g className="coach-crest">
        <path d="M46 26 q4 -22 12 -20 q-2 10 2 18 Z" fill="#ef4444" />
        <path d="M58 22 q6 -22 14 -18 q-6 10 -4 18 Z" fill="#f59e0b" />
        <path d="M70 26 q10 -18 16 -12 q-8 8 -8 16 Z" fill="#facc15" />
      </g>
      <ellipse cx="60" cy="62" rx="41" ry="40" fill="#22c55e" />
      <ellipse cx="60" cy="72" rx="27" ry="24" fill="#4ade80" opacity="0.7" />
      <circle cx="43" cy="52" r="14" fill="#fefce8" />
      <circle cx="77" cy="52" r="14" fill="#fefce8" />
      <Eyes mood={mood} x1={43} x2={77} y={52} r={8} />
      {/* dramatic lashes */}
      <g stroke="#1f2937" strokeWidth="2" strokeLinecap="round">
        <line x1="33" y1="44" x2="29" y2="39" /><line x1="39" y1="41" x2="37" y2="35" />
        <line x1="87" y1="44" x2="91" y2="39" /><line x1="81" y1="41" x2="83" y2="35" />
      </g>
      {/* curved beak */}
      <path d="M52 66 q8 -4 16 0 q2 14 -8 20 q-10 -6 -8 -20 Z" fill="#f97316" />
      <path d="M52 72 q8 3 16 0" stroke="#c2410c" strokeWidth="2" fill="none" />
      <Mouth talking={talking} mood={mood} cy={80} w={11} fill="#9a3412" />
      <Blush y={64} color="#f472b6" />
    </>
  );
}

/** Meowzart the Cat — powdered wig, bow tie, aristocratic whiskers. */
function MeowzartFace({ talking, mood }: FaceProps) {
  return (
    <>
      <g className="coach-ear-l"><path d="M24 34 L30 8 L50 26 Z" fill="#94a3b8" /><path d="M31 31 L34 17 L44 27 Z" fill="#f9a8d4" /></g>
      <g className="coach-ear-r"><path d="M96 34 L90 8 L70 26 Z" fill="#94a3b8" /><path d="M89 31 L86 17 L76 27 Z" fill="#f9a8d4" /></g>
      {/* powdered wig curls */}
      <circle cx="24" cy="52" r="12" fill="#f8fafc" />
      <circle cx="96" cy="52" r="12" fill="#f8fafc" />
      <circle cx="26" cy="66" r="10" fill="#f1f5f9" />
      <circle cx="94" cy="66" r="10" fill="#f1f5f9" />
      <ellipse cx="60" cy="60" rx="40" ry="38" fill="#cbd5e1" />
      <ellipse cx="60" cy="72" rx="24" ry="20" fill="#f1f5f9" />
      <Eyes mood={mood} y={52} r={9} />
      <path d="M55 66 q5 -3 10 0 q-5 6 -10 0 Z" fill="#f472b6" />
      <path d="M60 70 v4" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
      <Mouth talking={talking} mood={mood} cy={80} w={15} fill="#831843" />
      <Whiskers y={74} />
      {/* bow tie */}
      <g>
        <path d="M50 104 L60 110 L50 116 Z" fill="#7c3aed" />
        <path d="M70 104 L60 110 L70 116 Z" fill="#7c3aed" />
        <circle cx="60" cy="110" r="3.5" fill="#5b21b6" />
      </g>
    </>
  );
}

/** Newton the Raccoon — bandit mask, lab goggles pushed up, wild grin. */
function NewtonFace({ talking, mood }: FaceProps) {
  return (
    <>
      <g className="coach-ear-l"><circle cx="26" cy="30" r="14" fill="#64748b" /><circle cx="26" cy="31" r="7" fill="#94a3b8" /></g>
      <g className="coach-ear-r"><circle cx="94" cy="30" r="14" fill="#64748b" /><circle cx="94" cy="31" r="7" fill="#94a3b8" /></g>
      <ellipse cx="60" cy="62" rx="42" ry="40" fill="#94a3b8" />
      {/* bandit mask */}
      <path d="M20 50 q18 -12 40 -6 q22 -6 40 6 q-4 18 -22 20 q-12 2 -18 -4 q-6 6 -18 4 q-18 -2 -22 -20 Z" fill="#334155" />
      <ellipse cx="60" cy="80" rx="22" ry="16" fill="#e2e8f0" />
      <Eyes mood={mood} y={54} r={8} />
      {/* goggles pushed up on forehead */}
      <g opacity="0.95">
        <rect x="22" y="26" width="76" height="7" rx="3.5" fill="#f59e0b" />
        <circle cx="42" cy="30" r="10" fill="#a7f3d0" stroke="#0f766e" strokeWidth="3" />
        <circle cx="78" cy="30" r="10" fill="#a7f3d0" stroke="#0f766e" strokeWidth="3" />
      </g>
      <ellipse cx="60" cy="72" rx="6" ry="4.5" fill="#1f2937" />
      <Mouth talking={talking} mood={mood} cy={84} w={16} />
      <Whiskers y={78} color="#cbd5e1" />
    </>
  );
}

/** Barnaby the Tortoise — shell dome, wrinkles, half-moon spectacles. */
function BarnabyFace({ talking, mood }: FaceProps) {
  return (
    <>
      {/* shell dome */}
      <path d="M12 66 q48 -58 96 0 Z" fill="#166534" />
      <path d="M12 66 q48 -58 96 0 Z" fill="none" stroke="#14532d" strokeWidth="3" />
      <g stroke="#14532d" strokeWidth="2.5" fill="none" opacity="0.8">
        <path d="M32 58 q10 -14 0 -26" /><path d="M60 46 v-22" /><path d="M88 58 q-10 -14 0 -26" />
        <path d="M26 66 q34 -16 68 0" />
      </g>
      <ellipse cx="60" cy="76" rx="34" ry="30" fill="#4ade80" />
      {/* wrinkles */}
      <g stroke="#16a34a" strokeWidth="2" fill="none" opacity="0.8" strokeLinecap="round">
        <path d="M30 84 q8 3 14 1" /><path d="M76 85 q8 2 14 -1" />
      </g>
      <Eyes mood={mood} x1={47} x2={73} y={72} r={7} />
      {/* half-moon spectacles */}
      <g stroke="#a16207" strokeWidth="2.5" fill="none">
        <path d="M37 74 a10 8 0 0 0 20 0" /><path d="M63 74 a10 8 0 0 0 20 0" />
        <line x1="57" y1="72" x2="63" y2="72" />
      </g>
      <ellipse cx="60" cy="84" rx="4" ry="3" fill="#166534" />
      <Mouth talking={talking} mood={mood} cy={94} w={16} fill="#14532d" />
      <Blush y={88} color="#4ade80" />
    </>
  );
}

/** Amelia the Goose — aviator cap, flight goggles, big orange bill. */
function AmeliaFace({ talking, mood }: FaceProps) {
  return (
    <>
      <ellipse cx="60" cy="62" rx="40" ry="41" fill="#f8fafc" />
      {/* aviator cap */}
      <path d="M20 52 q40 -46 80 0 q-8 -12 -40 -12 q-32 0 -40 12 Z" fill="#92400e" />
      <path d="M18 50 q42 -40 84 0 v6 q-42 -30 -84 0 Z" fill="#b45309" />
      <path d="M22 52 q-8 14 4 22 q6 -10 4 -20 Z" fill="#92400e" />
      <path d="M98 52 q8 14 -4 22 q-6 -10 -4 -20 Z" fill="#92400e" />
      {/* goggles */}
      <g>
        <rect x="20" y="44" width="80" height="8" rx="4" fill="#78350f" />
        <circle cx="42" cy="49" r="12" fill="#bae6fd" stroke="#78350f" strokeWidth="4" />
        <circle cx="78" cy="49" r="12" fill="#bae6fd" stroke="#78350f" strokeWidth="4" />
        <circle cx="38" cy="45" r="3.5" fill="#fff" opacity="0.9" />
        <circle cx="74" cy="45" r="3.5" fill="#fff" opacity="0.9" />
      </g>
      <Eyes mood={mood} x1={42} x2={78} y={49} r={6} />
      {/* bill */}
      <ellipse cx="60" cy="80" rx="19" ry="12" fill="#f97316" />
      <path d="M41 80 q19 8 38 0" stroke="#c2410c" strokeWidth="2.5" fill="none" />
      <Mouth talking={talking} mood={mood} cy={84} w={16} fill="#9a3412" />
      <Blush y={72} color="#fb923c" />
    </>
  );
}

const FACES: Record<SubjectId, (p: FaceProps) => ReactNode> = {
  math: DashFace,
  reading: OliveFace,
  spanish: LolaFace,
  music: MeowzartFace,
  science: NewtonFace,
  history: BarnabyFace,
  geography: AmeliaFace,
};
