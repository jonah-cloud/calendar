import { useEffect, useState, type ReactNode } from "react";
import type { BuddyConfig } from "../lib/types";

export type BuddyMood = "idle" | "cheer" | "concerned" | "proud";

/*
 * The kid-built buddy: every body area (head, body, arms, legs, feet, ears,
 * hair) has 20 selectable variants, plus 8 eye styles and multi-select
 * accessories. Rendered as an animated SVG — idle bob, blinking, and a mouth
 * that moves while the speech engine talks.
 *
 * Canvas: 140 × 170. Head center ≈ (70,46); body center ≈ (70,106).
 */

export const PART_COUNTS = { head: 20, body: 20, arms: 20, legs: 20, feet: 20, ears: 20, hair: 20, eyes: 8 } as const;

export default function BuddyAvatar({
  buddy,
  size = 120,
  mood = "idle",
  still = false,
}: {
  buddy: BuddyConfig;
  size?: number;
  mood?: BuddyMood;
  /** static render (option galleries) — no talking poll, no animation classes */
  still?: boolean;
}) {
  const [talking, setTalking] = useState(false);
  useEffect(() => {
    if (still) return;
    const t = setInterval(() => {
      try {
        setTalking(!!window.speechSynthesis?.speaking);
      } catch {
        setTalking(false);
      }
    }, 160);
    return () => clearInterval(t);
  }, [still]);

  const c = buddy.color;
  const a = buddy.accent;
  const dark = shade(c, -30);
  const headTop = HEADS[idx(buddy.head, 20)].top;

  return (
    <div
      className={still ? "" : mood === "cheer" || mood === "proud" ? "buddy-cheer" : "buddy-bob"}
      style={{ width: size, height: size * (170 / 140) }}
    >
      <svg viewBox="0 0 140 170" width={size} height={size * (170 / 140)}>
        {/* behind-body: legs then feet */}
        <Legs v={idx(buddy.legs, 20)} c={c} dark={dark} />
        <Feet v={idx(buddy.feet, 20)} c={c} a={a} dark={dark} />
        {/* body + belly */}
        <Body v={idx(buddy.body, 20)} c={c} a={a} />
        {/* arms */}
        <Arms v={idx(buddy.arms, 20)} c={c} a={a} mood={mood} />
        {/* ears behind head */}
        <Ears v={idx(buddy.ears, 20)} c={c} a={a} top={headTop} />
        {/* head */}
        <Head v={idx(buddy.head, 20)} c={c} />
        {/* hair */}
        <Hair v={idx(buddy.hair, 20)} c={c} a={a} dark={dark} top={headTop} />
        {/* face */}
        <circle cx="48" cy="56" r="5.5" fill="#f472b6" opacity="0.3" />
        <circle cx="92" cy="56" r="5.5" fill="#f472b6" opacity="0.3" />
        <g className={still ? undefined : "buddy-eyes"}>
          <Eyes v={idx(buddy.eyes, 8)} mood={mood} />
        </g>
        <Mouth talking={talking && !still} mood={mood} />
        {/* accessories (multi) */}
        {buddy.accessories.map((id) => (
          <Accessory key={id} id={id} a={a} top={headTop} />
        ))}
      </svg>
    </div>
  );
}

const idx = (n: number, max: number) => Math.max(0, Math.min(max - 1, Math.floor(n || 0)));

/* ================= HEADS (20) ================= */

type HeadDef = { top: number; el: (c: string) => ReactNode };

const headEllipse = (rx: number, ry: number): HeadDef => ({
  top: 46 - ry,
  el: (c) => <ellipse cx="70" cy="46" rx={rx} ry={ry} fill={c} />,
});
const headRect = (w: number, h: number, r: number): HeadDef => ({
  top: 46 - h / 2,
  el: (c) => <rect x={70 - w / 2} y={46 - h / 2} width={w} height={h} rx={r} fill={c} />,
});
const headPath = (top: number, d: string): HeadDef => ({ top, el: (c) => <path d={d} fill={c} /> });

const HEADS: HeadDef[] = [
  headEllipse(30, 30), // classic round
  headEllipse(27, 34), // tall
  headEllipse(35, 26), // wide
  headEllipse(32, 30), // chunky
  headEllipse(25, 28), // small
  headRect(58, 54, 16), // squircle
  headRect(64, 46, 22), // wide squircle
  headRect(48, 58, 20), // tall squircle
  headRect(56, 52, 8), // boxy robot
  headEllipse(33, 33), // extra round
  headPath(16, "M70 16 C88 16 100 32 100 48 C100 64 88 74 70 74 C52 74 40 64 40 48 C40 32 52 16 70 16 Z"), // egg
  headPath(20, "M70 74 C50 62 40 50 40 38 C40 26 50 20 58 24 C64 26 68 30 70 34 C72 30 76 26 82 24 C90 20 100 26 100 38 C100 50 90 62 70 74 Z"), // heart
  headPath(20, "M70 20 L98 46 L70 72 L42 46 Z"), // diamond
  headPath(18, "M52 18 L88 18 L102 46 L88 74 L52 74 L38 46 Z"), // hexagon
  headPath(22, "M70 22 C92 22 102 40 98 56 C95 68 84 74 70 74 C56 74 45 68 42 56 C38 40 48 22 70 22 Z"), // pear
  headPath(24, "M44 58 C36 46 42 30 56 26 C60 16 80 16 84 26 C98 30 104 46 96 58 C92 68 84 72 70 72 C56 72 48 68 44 58 Z"), // cloud
  headPath(20, "M70 20 L78 36 L96 38 L84 50 L88 68 L70 60 L52 68 L56 50 L44 38 L62 36 Z"), // star
  headPath(22, "M70 22 L100 70 C80 76 60 76 40 70 Z"), // triangle
  headPath(18, "M70 18 C86 18 96 30 94 44 C104 48 102 62 92 66 C84 74 56 74 48 66 C38 62 36 48 46 44 C44 30 54 18 70 18 Z"), // blobby
  headEllipse(29, 24), // squished
];

function Head({ v, c }: { v: number; c: string }) {
  return <>{HEADS[v].el(c)}</>;
}

/* ================= BODIES (20) ================= */

const BODIES: ((c: string, a: string) => ReactNode)[] = [
  bodyE(34, 30), bodyE(28, 34), bodyE(38, 26), bodyE(30, 28), bodyE(36, 32),
  bodyR(64, 58, 20), bodyR(56, 62, 26), bodyR(70, 50, 24), bodyR(58, 56, 10),
  // pear
  (c, a) => withBelly(a, <path d="M70 76 C84 76 98 96 98 116 C98 132 86 138 70 138 C54 138 42 132 42 116 C42 96 56 76 70 76 Z" fill={c} />),
  // bean
  (c, a) => withBelly(a, <path d="M50 80 C70 70 96 82 98 104 C100 124 88 138 68 138 C50 138 40 126 44 110 C46 100 44 88 50 80 Z" fill={c} />),
  // dress / triangle
  (c, a) => withBelly(a, <path d="M70 76 L102 134 C82 142 58 142 38 134 Z" fill={c} />),
  // egg
  (c, a) => withBelly(a, <path d="M70 74 C88 74 98 94 98 112 C98 130 86 140 70 140 C54 140 42 130 42 112 C42 94 52 74 70 74 Z" fill={c} />),
  // star-ish
  (c, a) => withBelly(a, <path d="M70 76 L82 96 L104 100 L88 114 L94 136 L70 126 L46 136 L52 114 L36 100 L58 96 Z" fill={c} />),
  // heart body
  (c, a) => withBelly(a, <path d="M70 140 C52 128 40 116 40 102 C40 90 50 84 58 88 C64 90 68 94 70 98 C72 94 76 90 82 88 C90 84 100 90 100 102 C100 116 88 128 70 140 Z" fill={c} />),
  bodyE(26, 26), bodyE(40, 34),
  // hexagon
  (c, a) => withBelly(a, <path d="M54 78 L86 78 L100 106 L86 136 L54 136 L40 106 Z" fill={c} />),
  // cloud puff
  (c, a) => withBelly(a, <path d="M46 120 C36 112 40 96 52 92 C54 82 86 82 88 92 C100 96 104 112 94 120 C92 130 84 136 70 136 C56 136 48 130 46 120 Z" fill={c} />),
  // diamond
  (c, a) => withBelly(a, <path d="M70 76 L100 106 L70 138 L40 106 Z" fill={c} />),
];

function bodyE(rx: number, ry: number) {
  return (c: string, a: string) => withBelly(a, <ellipse cx="70" cy="106" rx={rx} ry={ry} fill={c} />);
}
function bodyR(w: number, h: number, r: number) {
  return (c: string, a: string) =>
    withBelly(a, <rect x={70 - w / 2} y={106 - h / 2} width={w} height={h} rx={r} fill={c} />);
}
function withBelly(a: string, shape: ReactNode) {
  return (
    <>
      {shape}
      <ellipse cx="70" cy="112" rx="19" ry="15" fill={a} opacity="0.9" />
    </>
  );
}

function Body({ v, c, a }: { v: number; c: string; a: string }) {
  return <>{BODIES[v](c, a)}</>;
}

/* ================= ARMS (20) ================= */

function armPair(rx: number, ry: number, y: number, angle: number, upAngle?: number) {
  return (c: string, _a: string, mood: BuddyMood) => {
    const ang = mood === "cheer" && upAngle !== undefined ? upAngle : angle;
    return (
      <>
        <ellipse cx="34" cy={y} rx={rx} ry={ry} fill={c} transform={`rotate(${ang} 34 ${y})`} />
        <ellipse cx="106" cy={y} rx={rx} ry={ry} fill={c} transform={`rotate(${-ang} 106 ${y})`} />
      </>
    );
  };
}

const ARMS: ((c: string, a: string, mood: BuddyMood) => ReactNode)[] = [
  armPair(8, 14, 100, 15, -140), // classic stubs
  armPair(7, 18, 100, 35, -130), // out
  armPair(6, 20, 102, 5, -160), // long down
  armPair(9, 11, 98, 25, -140), // tiny t-rex
  armPair(7, 16, 96, 60, -110), // airplane out
  armPair(10, 18, 100, 20, -135), // strong
  armPair(5, 14, 98, 30, -140), // skinny
  armPair(8, 22, 104, 10, -150), // extra long
  // raised cheer arms always
  (c) => (
    <>
      <ellipse cx="34" cy="88" rx="7" ry="16" fill={c} transform="rotate(-140 34 88)" />
      <ellipse cx="106" cy="88" rx="7" ry="16" fill={c} transform="rotate(140 106 88)" />
    </>
  ),
  // one up one down (wave)
  (c) => (
    <>
      <ellipse cx="34" cy="88" rx="7" ry="16" fill={c} transform="rotate(-140 34 88)" />
      <ellipse cx="106" cy="102" rx="7" ry="16" fill={c} transform="rotate(-15 106 102)" />
    </>
  ),
  // wings
  (c, a) => (
    <>
      <path d="M40 92 C24 84 14 92 16 106 C18 116 30 118 42 112 Z" fill={c} />
      <path d="M100 92 C116 84 126 92 124 106 C122 116 110 118 98 112 Z" fill={c} />
      <path d="M36 98 C28 96 24 100 25 106" stroke={a} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M104 98 C112 96 116 100 115 106" stroke={a} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  ),
  // robot
  (c, _a) => (
    <>
      <rect x="22" y="92" width="12" height="26" rx="4" fill={c} />
      <rect x="106" y="92" width="12" height="26" rx="4" fill={c} />
      <circle cx="28" cy="122" r="6" fill={shade(c, -30)} />
      <circle cx="112" cy="122" r="6" fill={shade(c, -30)} />
    </>
  ),
  // noodle waves
  (c) => (
    <>
      <path d="M38 94 C26 98 28 110 20 114 C14 118 12 124 16 128" stroke={c} strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M102 94 C114 98 112 110 120 114 C126 118 128 124 124 128" stroke={c} strokeWidth="9" fill="none" strokeLinecap="round" />
    </>
  ),
  // tentacle curls
  (c) => (
    <>
      <path d="M38 96 C24 100 20 112 28 118 C34 122 38 118 36 114" stroke={c} strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M102 96 C116 100 120 112 112 118 C106 122 102 118 104 114" stroke={c} strokeWidth="8" fill="none" strokeLinecap="round" />
    </>
  ),
  // mitten paws
  (c, a) => (
    <>
      <ellipse cx="32" cy="104" rx="7" ry="14" fill={c} transform="rotate(20 32 104)" />
      <ellipse cx="108" cy="104" rx="7" ry="14" fill={c} transform="rotate(-20 108 104)" />
      <circle cx="28" cy="115" r="7" fill={a} />
      <circle cx="112" cy="115" r="7" fill={a} />
    </>
  ),
  // star hands
  (c, a) => (
    <>
      <ellipse cx="34" cy="100" rx="6" ry="13" fill={c} transform="rotate(25 34 100)" />
      <ellipse cx="106" cy="100" rx="6" ry="13" fill={c} transform="rotate(-25 106 100)" />
      <text x="27" y="118" fontSize="14" fill={a}>⭐</text>
      <text x="99" y="118" fontSize="14" fill={a}>⭐</text>
    </>
  ),
  // heart hug arms (curved inward)
  (c) => (
    <>
      <path d="M40 96 C26 102 26 116 40 120" stroke={c} strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M100 96 C114 102 114 116 100 120" stroke={c} strokeWidth="9" fill="none" strokeLinecap="round" />
    </>
  ),
  // flippers
  (c) => (
    <>
      <ellipse cx="30" cy="104" rx="12" ry="7" fill={c} transform="rotate(35 30 104)" />
      <ellipse cx="110" cy="104" rx="12" ry="7" fill={c} transform="rotate(-35 110 104)" />
    </>
  ),
  // stick arms with round hands
  (c) => (
    <>
      <line x1="40" y1="98" x2="24" y2="114" stroke={c} strokeWidth="5" strokeLinecap="round" />
      <line x1="100" y1="98" x2="116" y2="114" stroke={c} strokeWidth="5" strokeLinecap="round" />
      <circle cx="22" cy="116" r="6" fill={c} />
      <circle cx="118" cy="116" r="6" fill={c} />
    </>
  ),
  // no arms
  () => null,
];

function Arms({ v, c, a, mood }: { v: number; c: string; a: string; mood: BuddyMood }) {
  return <>{ARMS[v](c, a, mood)}</>;
}

/* ================= LEGS (20) ================= */

function legPair(w: number, len: number, spread: number) {
  return (c: string) => (
    <>
      <rect x={70 - spread - w / 2} y={128} width={w} height={len} rx={w / 2} fill={c} />
      <rect x={70 + spread - w / 2} y={128} width={w} height={len} rx={w / 2} fill={c} />
    </>
  );
}

const LEGS: ((c: string, dark: string) => ReactNode)[] = [
  legPair(10, 24, 14), legPair(10, 30, 14), legPair(8, 20, 12), legPair(8, 34, 16),
  legPair(13, 22, 15), legPair(13, 30, 17), legPair(6, 26, 12), legPair(6, 34, 18),
  legPair(10, 16, 13), legPair(12, 26, 20), legPair(9, 28, 10), legPair(15, 20, 16),
  legPair(7, 30, 20), legPair(11, 34, 14), legPair(9, 22, 18), legPair(14, 26, 15),
  // springs
  (c) => (
    <>
      <path d="M56 130 l10 4 l-10 5 l10 4 l-10 5 l8 4" stroke={c} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M84 130 l-10 4 l10 5 l-10 4 l10 5 l-8 4" stroke={c} strokeWidth="5" fill="none" strokeLinecap="round" />
    </>
  ),
  // chicken legs
  (c) => (
    <>
      <line x1="58" y1="128" x2="56" y2="150" stroke={c} strokeWidth="4" strokeLinecap="round" />
      <line x1="82" y1="128" x2="84" y2="150" stroke={c} strokeWidth="4" strokeLinecap="round" />
      <circle cx="57" cy="139" r="4" fill={c} />
      <circle cx="83" cy="139" r="4" fill={c} />
    </>
  ),
  // one wheel (unicycle!)
  (c, dark) => (
    <>
      <rect x="66" y="126" width="8" height="16" fill={c} />
      <circle cx="70" cy="150" r="12" fill="none" stroke={dark} strokeWidth="5" />
      <circle cx="70" cy="150" r="3" fill={dark} />
    </>
  ),
  // no legs (hover blob)
  () => null,
];

function Legs({ v, c, dark }: { v: number; c: string; dark: string }) {
  return <>{LEGS[v](c, dark)}</>;
}

/* ================= FEET (20) ================= */

function feetE(rx: number, ry: number, spread: number) {
  return (c: string) => (
    <>
      <ellipse cx={70 - spread} cy="154" rx={rx} ry={ry} fill={shade(c, -30)} />
      <ellipse cx={70 + spread} cy="154" rx={rx} ry={ry} fill={shade(c, -30)} />
    </>
  );
}

const FEET: ((c: string, a: string, dark: string) => ReactNode)[] = [
  feetE(12, 7, 16), feetE(15, 7, 18), feetE(9, 6, 14), feetE(12, 9, 16), feetE(17, 6, 20),
  // boots
  (c, a, dark) => (
    <>
      <path d="M50 144 h12 v10 h8 a4 4 0 0 1 0 8 h-20 Z" fill={dark} />
      <path d="M70 144 h12 v10 h8 a4 4 0 0 1 0 8 h-20 Z" fill={dark} />
    </>
  ),
  // paws with toes
  (c, a, dark) => (
    <>
      <ellipse cx="54" cy="154" rx="12" ry="8" fill={dark} />
      <ellipse cx="86" cy="154" rx="12" ry="8" fill={dark} />
      {[46, 54, 62].map((x) => <circle key={x} cx={x} cy="150" r="2.5" fill={a} />)}
      {[78, 86, 94].map((x) => <circle key={x} cx={x} cy="150" r="2.5" fill={a} />)}
    </>
  ),
  // duck feet
  (c, a) => (
    <>
      <path d="M42 158 L58 148 L60 160 Z" fill="#f59e0b" />
      <path d="M98 158 L82 148 L80 160 Z" fill="#f59e0b" />
    </>
  ),
  // ballet points
  (c, a, dark) => (
    <>
      <ellipse cx="55" cy="154" rx="10" ry="5" fill="#f9a8d4" transform="rotate(-15 55 154)" />
      <ellipse cx="85" cy="154" rx="10" ry="5" fill="#f9a8d4" transform="rotate(15 85 154)" />
    </>
  ),
  // sneakers (two-tone)
  (c, a, dark) => (
    <>
      <path d="M44 148 h20 v6 a5 5 0 0 1 -5 5 h-15 a4 4 0 0 1 0 -8 Z" fill="white" stroke={dark} strokeWidth="2" />
      <path d="M76 148 h20 v6 a5 5 0 0 1 -5 5 h-15 a4 4 0 0 1 0 -8 Z" fill="white" stroke={dark} strokeWidth="2" />
      <line x1="48" y1="152" x2="58" y2="152" stroke={a} strokeWidth="2" />
      <line x1="80" y1="152" x2="90" y2="152" stroke={a} strokeWidth="2" />
    </>
  ),
  // star feet
  (c, a) => (
    <>
      <text x="44" y="162" fontSize="16">⭐</text>
      <text x="76" y="162" fontSize="16">⭐</text>
    </>
  ),
  // heart feet
  () => (
    <>
      <text x="44" y="162" fontSize="16">💗</text>
      <text x="76" y="162" fontSize="16">💗</text>
    </>
  ),
  // roller skates
  (c, a, dark) => (
    <>
      <rect x="44" y="146" width="22" height="9" rx="4" fill={a} />
      <rect x="74" y="146" width="22" height="9" rx="4" fill={a} />
      {[50, 60, 80, 90].map((x) => <circle key={x} cx={x} cy="158" r="3.5" fill={dark} />)}
    </>
  ),
  // hooves
  (c, a, dark) => (
    <>
      <path d="M48 146 h14 v8 a3 3 0 0 1 -3 3 h-8 a3 3 0 0 1 -3 -3 Z" fill={dark} />
      <path d="M78 146 h14 v8 a3 3 0 0 1 -3 3 h-8 a3 3 0 0 1 -3 -3 Z" fill={dark} />
    </>
  ),
  // bunny feet (long forward)
  (c, a, dark) => (
    <>
      <ellipse cx="56" cy="156" rx="14" ry="6" fill={dark} />
      <ellipse cx="84" cy="156" rx="14" ry="6" fill={dark} />
      <ellipse cx="62" cy="155" rx="4" ry="2.5" fill={a} />
      <ellipse cx="90" cy="155" rx="4" ry="2.5" fill={a} />
    </>
  ),
  // robot squares
  (c, a, dark) => (
    <>
      <rect x="46" y="148" width="16" height="10" rx="2" fill={dark} />
      <rect x="78" y="148" width="16" height="10" rx="2" fill={dark} />
    </>
  ),
  // flippers
  (c) => (
    <>
      <ellipse cx="52" cy="156" rx="16" ry="5" fill={shade(c, -20)} transform="rotate(-8 52 156)" />
      <ellipse cx="88" cy="156" rx="16" ry="5" fill={shade(c, -20)} transform="rotate(8 88 156)" />
    </>
  ),
  // elf curls
  (c, a, dark) => (
    <>
      <path d="M46 158 C42 150 48 146 52 150 C50 154 54 158 60 156 L60 158 Z" fill={dark} />
      <path d="M94 158 C98 150 92 146 88 150 C90 154 86 158 80 156 L80 158 Z" fill={dark} />
    </>
  ),
  // clown shoes
  (c, a, dark) => (
    <>
      <ellipse cx="50" cy="155" rx="18" ry="7" fill="#ef4444" />
      <ellipse cx="90" cy="155" rx="18" ry="7" fill="#ef4444" />
    </>
  ),
  // no feet
  () => null,
];

function Feet({ v, c, a, dark }: { v: number; c: string; a: string; dark: string }) {
  return <>{FEET[v](c, a, dark)}</>;
}

/* ================= EARS (20) ================= */

const EARS: ((c: string, a: string, top: number) => ReactNode)[] = [
  () => null, // none
  (c, a, t) => ( // round bear
    <>
      <circle cx="44" cy={t + 4} r="13" fill={c} />
      <circle cx="96" cy={t + 4} r="13" fill={c} />
      <circle cx="44" cy={t + 4} r="6.5" fill={a} opacity="0.85" />
      <circle cx="96" cy={t + 4} r="6.5" fill={a} opacity="0.85" />
    </>
  ),
  (c, a, t) => ( // big mouse
    <>
      <circle cx="40" cy={t + 2} r="17" fill={c} />
      <circle cx="100" cy={t + 2} r="17" fill={c} />
      <circle cx="40" cy={t + 2} r="9" fill={a} opacity="0.85" />
      <circle cx="100" cy={t + 2} r="9" fill={a} opacity="0.85" />
    </>
  ),
  (c, a, t) => ( // pointy cat
    <>
      <polygon points={`${34},${t + 16} ${44},${t - 12} ${58},${t + 8}`} fill={c} />
      <polygon points={`${106},${t + 16} ${96},${t - 12} ${82},${t + 8}`} fill={c} />
      <polygon points={`${40},${t + 10} ${45},${t - 4} ${52},${t + 6}`} fill={a} opacity="0.85" />
      <polygon points={`${100},${t + 10} ${95},${t - 4} ${88},${t + 6}`} fill={a} opacity="0.85" />
    </>
  ),
  (c, a, t) => ( // tall bunny
    <>
      <ellipse cx="52" cy={t - 14} rx="8" ry="22" fill={c} transform={`rotate(-8 52 ${t - 14})`} />
      <ellipse cx="88" cy={t - 14} rx="8" ry="22" fill={c} transform={`rotate(8 88 ${t - 14})`} />
      <ellipse cx="52" cy={t - 12} rx="4" ry="15" fill={a} opacity="0.85" transform={`rotate(-8 52 ${t - 12})`} />
      <ellipse cx="88" cy={t - 12} rx="4" ry="15" fill={a} opacity="0.85" transform={`rotate(8 88 ${t - 12})`} />
    </>
  ),
  (c, a, t) => ( // floppy dog
    <>
      <ellipse cx="38" cy={t + 20} rx="10" ry="22" fill={c} transform={`rotate(18 38 ${t + 20})`} />
      <ellipse cx="102" cy={t + 20} rx="10" ry="22" fill={c} transform={`rotate(-18 102 ${t + 20})`} />
    </>
  ),
  (c, a, t) => ( // antennae
    <>
      <line x1="54" y1={t + 4} x2="46" y2={t - 16} stroke={c} strokeWidth="4" strokeLinecap="round" />
      <line x1="86" y1={t + 4} x2="94" y2={t - 16} stroke={c} strokeWidth="4" strokeLinecap="round" />
      <circle cx="45" cy={t - 18} r="6" fill={a} className="buddy-twinkle" />
      <circle cx="95" cy={t - 18} r="6" fill={a} className="buddy-twinkle" />
    </>
  ),
  (c, a, t) => ( // unicorn horn
    <polygon points={`70,${t - 22} 63,${t + 4} 77,${t + 4}`} fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
  ),
  (c, a, t) => ( // little horns
    <>
      <path d={`M50 ${t + 6} C46 ${t - 4} 50 ${t - 12} 58 ${t - 10} C56 ${t - 2} 56 ${t + 2} 58 ${t + 8} Z`} fill={a} />
      <path d={`M90 ${t + 6} C94 ${t - 4} 90 ${t - 12} 82 ${t - 10} C84 ${t - 2} 84 ${t + 2} 82 ${t + 8} Z`} fill={a} />
    </>
  ),
  (c, a, t) => ( // elf side ears
    <>
      <polygon points={`36,${t + 24} 20,${t + 14} 40,${t + 34}`} fill={c} />
      <polygon points={`104,${t + 24} 120,${t + 14} 100,${t + 34}`} fill={c} />
    </>
  ),
  (c, a, t) => ( // ram curls
    <>
      <path d={`M46 ${t + 8} C34 ${t + 2} 34 ${t - 12} 46 ${t - 12} C54 ${t - 12} 54 ${t - 2} 48 ${t - 2}`} stroke={c} strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d={`M94 ${t + 8} C106 ${t + 2} 106 ${t - 12} 94 ${t - 12} C86 ${t - 12} 86 ${t - 2} 92 ${t - 2}`} stroke={c} strokeWidth="7" fill="none" strokeLinecap="round" />
    </>
  ),
  (c, a, t) => ( // butterfly antennae (curled)
    <>
      <path d={`M56 ${t + 2} C50 ${t - 10} 42 ${t - 14} 38 ${t - 8}`} stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d={`M84 ${t + 2} C90 ${t - 10} 98 ${t - 14} 102 ${t - 8}`} stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="37" cy={t - 8} r="4" fill={a} />
      <circle cx="103" cy={t - 8} r="4" fill={a} />
    </>
  ),
  (c, a, t) => ( // leaf ears
    <>
      <path d={`M46 ${t + 6} C38 ${t - 8} 46 ${t - 18} 56 ${t - 8} C56 ${t - 2} 52 ${t + 4} 46 ${t + 6} Z`} fill="#22c55e" />
      <path d={`M94 ${t + 6} C102 ${t - 8} 94 ${t - 18} 84 ${t - 8} C84 ${t - 2} 88 ${t + 4} 94 ${t + 6} Z`} fill="#22c55e" />
    </>
  ),
  (c, a, t) => ( // robot squares
    <>
      <rect x="30" y={t + 8} width="12" height="16" rx="3" fill={c} />
      <rect x="98" y={t + 8} width="12" height="16" rx="3" fill={c} />
      <circle cx="36" cy={t + 16} r="3" fill={a} />
      <circle cx="104" cy={t + 16} r="3" fill={a} />
    </>
  ),
  (c, a, t) => ( // tiny dots
    <>
      <circle cx="48" cy={t + 2} r="6" fill={c} />
      <circle cx="92" cy={t + 2} r="6" fill={c} />
    </>
  ),
  (c, a, t) => ( // elephant
    <>
      <ellipse cx="34" cy={t + 18} rx="16" ry="20" fill={c} />
      <ellipse cx="106" cy={t + 18} rx="16" ry="20" fill={c} />
      <ellipse cx="36" cy={t + 18} rx="9" ry="13" fill={a} opacity="0.8" />
      <ellipse cx="104" cy={t + 18} rx="9" ry="13" fill={a} opacity="0.8" />
    </>
  ),
  (c, a, t) => ( // fox tall
    <>
      <polygon points={`38,${t + 18} 42,${t - 18} 60,${t + 6}`} fill={c} />
      <polygon points={`102,${t + 18} 98,${t - 18} 80,${t + 6}`} fill={c} />
      <polygon points={`44,${t + 10} 46,${t - 8} 55,${t + 4}`} fill="white" opacity="0.85" />
      <polygon points={`96,${t + 10} 94,${t - 8} 85,${t + 4}`} fill="white" opacity="0.85" />
    </>
  ),
  (c, a, t) => ( // panda low round
    <>
      <circle cx="46" cy={t + 10} r="11" fill="#1f2937" />
      <circle cx="94" cy={t + 10} r="11" fill="#1f2937" />
    </>
  ),
  (c, a, t) => ( // heart ears
    <>
      <text x="36" y={t + 8} fontSize="18">💗</text>
      <text x="86" y={t + 8} fontSize="18">💗</text>
    </>
  ),
  (c, a, t) => ( // star ears
    <>
      <text x="36" y={t + 8} fontSize="18">⭐</text>
      <text x="86" y={t + 8} fontSize="18">⭐</text>
    </>
  ),
];

function Ears({ v, c, a, top }: { v: number; c: string; a: string; top: number }) {
  return <>{EARS[v](c, a, top)}</>;
}

/* ================= HAIR (20) ================= */

const HAIR: ((c: string, a: string, dark: string, top: number) => ReactNode)[] = [
  () => null, // none
  (c, a, dark, t) => <path d={`M70 ${t + 2} C66 ${t - 10} 74 ${t - 14} 78 ${t - 8} C80 ${t - 4} 76 ${t} 72 ${t}`} stroke={dark} strokeWidth="4" fill="none" strokeLinecap="round" />, // curl
  (c, a, dark, t) => ( // three spikes
    <>
      <polygon points={`58,${t + 4} 62,${t - 12} 68,${t + 2}`} fill={dark} />
      <polygon points={`66,${t + 2} 70,${t - 16} 76,${t + 2}`} fill={dark} />
      <polygon points={`74,${t + 2} 80,${t - 12} 84,${t + 4}`} fill={dark} />
    </>
  ),
  (c, a, dark, t) => <rect x="62" y={t - 14} width="16" height="18" rx="6" fill={dark} />, // mohawk
  (c, a, dark, t) => <path d={`M52 ${t + 6} C56 ${t - 8} 76 ${t - 12} 90 ${t - 2} C80 ${t - 4} 62 ${t - 2} 52 ${t + 6} Z`} fill={dark} />, // side swoosh
  (c, a, dark, t) => ( // curly mop
    <>
      {[52, 62, 72, 82].map((x, i) => (
        <circle key={x} cx={x + 3} cy={t + (i % 2 ? -6 : -2)} r="8" fill={dark} />
      ))}
    </>
  ),
  (c, a, dark, t) => ( // pigtails
    <>
      <circle cx="36" cy={t + 12} r="10" fill={dark} />
      <circle cx="104" cy={t + 12} r="10" fill={dark} />
      <circle cx="36" cy={t + 12} r="3" fill={a} />
      <circle cx="104" cy={t + 12} r="3" fill={a} />
    </>
  ),
  (c, a, dark, t) => ( // bun
    <>
      <circle cx="70" cy={t - 8} r="9" fill={dark} />
      <rect x="63" y={t - 2} width="14" height="4" rx="2" fill={a} />
    </>
  ),
  (c, a, dark, t) => ( // long flowing sides
    <>
      <path d={`M44 ${t + 8} C40 ${t + 28} 42 ${t + 44} 48 ${t + 52} L56 ${t + 48} C50 ${t + 36} 50 ${t + 20} 52 ${t + 8} Z`} fill={dark} />
      <path d={`M96 ${t + 8} C100 ${t + 28} 98 ${t + 44} 92 ${t + 52} L84 ${t + 48} C90 ${t + 36} 90 ${t + 20} 88 ${t + 8} Z`} fill={dark} />
      <path d={`M52 ${t + 6} C58 ${t - 6} 82 ${t - 6} 88 ${t + 6}`} stroke={dark} strokeWidth="8" fill="none" strokeLinecap="round" />
    </>
  ),
  (c, a, dark, t) => <path d={`M50 ${t + 8} C54 ${t - 2} 60 ${t + 6} 64 ${t} C68 ${t + 6} 72 ${t} 76 ${t + 6} C80 ${t} 86 ${t + 6} 90 ${t + 8}`} stroke={dark} strokeWidth="6" fill="none" strokeLinecap="round" />, // bangs fringe
  (c, a, dark, t) => <circle cx="70" cy={t - 2} r="16" fill={dark} />, // afro poof
  (c, a, dark, t) => ( // rainbow mane
    <>
      <path d={`M50 ${t + 6} C56 ${t - 8} 84 ${t - 8} 90 ${t + 6}`} stroke="#f472b6" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d={`M52 ${t + 10} C58 ${t - 3} 82 ${t - 3} 88 ${t + 10}`} stroke="#a78bfa" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d={`M55 ${t + 14} C60 ${t + 2} 80 ${t + 2} 85 ${t + 14}`} stroke="#38bdf8" strokeWidth="5" fill="none" strokeLinecap="round" />
    </>
  ),
  (c, a, dark, t) => ( // grass tuft
    <>
      <path d={`M64 ${t + 2} C62 ${t - 8} 58 ${t - 10} 56 ${t - 8}`} stroke="#22c55e" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d={`M70 ${t} C70 ${t - 12} 68 ${t - 14} 66 ${t - 12}`} stroke="#22c55e" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d={`M76 ${t + 2} C78 ${t - 8} 82 ${t - 10} 84 ${t - 8}`} stroke="#22c55e" strokeWidth="4" fill="none" strokeLinecap="round" />
    </>
  ),
  (c, a, dark, t) => <polygon points={`64,${t + 2} 78,${t - 14} 72,${t - 2} 82,${t - 6} 68,${t + 6}`} fill="#fbbf24" />, // lightning
  (c, a, dark, t) => ( // two curls
    <>
      <path d={`M58 ${t + 2} C54 ${t - 10} 62 ${t - 12} 64 ${t - 6}`} stroke={dark} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d={`M82 ${t + 2} C86 ${t - 10} 78 ${t - 12} 76 ${t - 6}`} stroke={dark} strokeWidth="4" fill="none" strokeLinecap="round" />
    </>
  ),
  (c, a, dark, t) => ( // fauxhawk brush
    <>
      {[60, 66, 72, 78].map((x) => (
        <line key={x} x1={x} y1={t + 2} x2={x} y2={t - 10} stroke={dark} strokeWidth="4" strokeLinecap="round" />
      ))}
    </>
  ),
  (c, a, dark, t) => <path d={`M48 ${t + 10} Q54 ${t - 6} 62 ${t + 4} Q68 ${t - 10} 76 ${t + 2} Q84 ${t - 6} 92 ${t + 10}`} fill={dark} />, // wavy crown
  (c, a, dark, t) => ( // broccoli poof
    <>
      <circle cx="62" cy={t - 4} r="7" fill={dark} />
      <circle cx="72" cy={t - 8} r="8" fill={dark} />
      <circle cx="80" cy={t - 2} r="6" fill={dark} />
    </>
  ),
  (c, a, dark, t) => ( // flame hair
    <>
      <path d={`M60 ${t + 4} C58 ${t - 6} 64 ${t - 8} 63 ${t - 16} C70 ${t - 10} 68 ${t - 4} 70 ${t + 2}`} fill="#f97316" />
      <path d={`M70 ${t + 2} C70 ${t - 8} 76 ${t - 10} 75 ${t - 18} C82 ${t - 10} 78 ${t - 2} 80 ${t + 4}`} fill="#fbbf24" />
    </>
  ),
  (c, a, dark, t) => ( // snow cap tuft
    <>
      <path d={`M54 ${t + 4} C60 ${t - 6} 80 ${t - 6} 86 ${t + 4} Z`} fill="white" />
      <circle cx="70" cy={t - 6} r="4" fill="white" />
    </>
  ),
];

function Hair({ v, c, a, dark, top }: { v: number; c: string; a: string; dark: string; top: number }) {
  return <>{HAIR[v](c, a, dark, top)}</>;
}

/* ================= EYES (8) ================= */

function Eyes({ v, mood }: { v: number; mood: BuddyMood }) {
  if (mood === "concerned") {
    return (
      <>
        <circle cx="56" cy="44" r="5" fill="#1f2937" />
        <circle cx="84" cy="44" r="5" fill="#1f2937" />
        <circle cx="58" cy="42" r="1.8" fill="white" />
        <circle cx="86" cy="42" r="1.8" fill="white" />
        <path d="M48 35 q8 -4 13 1" stroke="#1f2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M92 35 q-8 -4 -13 1" stroke="#1f2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </>
    );
  }
  switch (v) {
    case 0: // happy arcs
      return (
        <>
          <path d="M49 46 q7 -9 14 0" stroke="#1f2937" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M77 46 q7 -9 14 0" stroke="#1f2937" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </>
      );
    case 1: // big round
      return (
        <>
          <circle cx="56" cy="44" r="7.5" fill="#1f2937" />
          <circle cx="84" cy="44" r="7.5" fill="#1f2937" />
          <circle cx="59" cy="41" r="2.8" fill="white" />
          <circle cx="87" cy="41" r="2.8" fill="white" />
        </>
      );
    case 2: // starry
      return (
        <>
          <text x="56" y="50" textAnchor="middle" fontSize="16" fill="#1f2937">✦</text>
          <text x="84" y="50" textAnchor="middle" fontSize="16" fill="#1f2937">✦</text>
        </>
      );
    case 3: // sleepy
      return (
        <>
          <path d="M49 44 q7 5 14 0" stroke="#1f2937" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M77 44 q7 5 14 0" stroke="#1f2937" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </>
      );
    case 4: // wink
      return (
        <>
          <circle cx="56" cy="44" r="6.5" fill="#1f2937" />
          <circle cx="58" cy="41.5" r="2.4" fill="white" />
          <path d="M77 44 q7 -7 14 0" stroke="#1f2937" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </>
      );
    case 5: // hearts
      return (
        <>
          <text x="56" y="50" textAnchor="middle" fontSize="15">💗</text>
          <text x="84" y="50" textAnchor="middle" fontSize="15">💗</text>
        </>
      );
    case 6: // sparkle
      return (
        <>
          <circle cx="56" cy="44" r="8" fill="#1f2937" />
          <circle cx="84" cy="44" r="8" fill="#1f2937" />
          <circle cx="59" cy="41" r="3" fill="white" />
          <circle cx="87" cy="41" r="3" fill="white" />
          <circle cx="53" cy="47" r="1.5" fill="white" />
          <circle cx="81" cy="47" r="1.5" fill="white" />
        </>
      );
    default: // surprised
      return (
        <>
          <circle cx="56" cy="44" r="4" fill="#1f2937" />
          <circle cx="84" cy="44" r="4" fill="#1f2937" />
          <path d="M48 34 h14" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
          <path d="M78 34 h14" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
        </>
      );
  }
}

function Mouth({ talking, mood }: { talking: boolean; mood: BuddyMood }) {
  if (talking) {
    return <ellipse cx="70" cy="62" rx="8" ry="6" fill="#7c2d12" className="buddy-talk" />;
  }
  if (mood === "concerned") {
    return <path d="M62 64 q8 -5 16 0" stroke="#7c2d12" strokeWidth="3" fill="none" strokeLinecap="round" />;
  }
  if (mood === "cheer" || mood === "proud") {
    return <path d="M58 60 q12 14 24 0 z" fill="#7c2d12" />;
  }
  return <path d="M60 61 q10 9 20 0" stroke="#7c2d12" strokeWidth="3.5" fill="none" strokeLinecap="round" />;
}

/* ================= ACCESSORIES (20, multi) ================= */

export const ACCESSORY_OPTIONS: { id: string; label: string; emoji: string }[] = [
  { id: "bow", label: "Bow", emoji: "🎀" },
  { id: "crown", label: "Crown", emoji: "👑" },
  { id: "cap", label: "Cap", emoji: "🧢" },
  { id: "flower", label: "Flower", emoji: "🌸" },
  { id: "glasses", label: "Glasses", emoji: "👓" },
  { id: "sunglasses", label: "Sunglasses", emoji: "🕶️" },
  { id: "halo", label: "Halo", emoji: "😇" },
  { id: "headphones", label: "Headphones", emoji: "🎧" },
  { id: "scarf", label: "Scarf", emoji: "🧣" },
  { id: "cape", label: "Cape", emoji: "🦸" },
  { id: "necklace", label: "Necklace", emoji: "📿" },
  { id: "bowtie", label: "Bow tie", emoji: "🎩" },
  { id: "balloon", label: "Balloon", emoji: "🎈" },
  { id: "wand", label: "Magic wand", emoji: "🪄" },
  { id: "flag", label: "Team flag", emoji: "🚩" },
  { id: "mask", label: "Hero mask", emoji: "🦹" },
  { id: "mustache", label: "Mustache", emoji: "👨" },
  { id: "earrings", label: "Earrings", emoji: "💎" },
  { id: "tutu", label: "Tutu", emoji: "🩰" },
  { id: "backpack", label: "Backpack", emoji: "🎒" },
];

function Accessory({ id, a, top }: { id: string; a: string; top: number }) {
  const t = top;
  switch (id) {
    case "bow":
      return (
        <g>
          <polygon points={`55,${t - 4} 70,${t + 2} 55,${t + 8}`} fill="#ec4899" />
          <polygon points={`85,${t - 4} 70,${t + 2} 85,${t + 8}`} fill="#ec4899" />
          <circle cx="70" cy={t + 2} r="4" fill="#be185d" />
        </g>
      );
    case "crown":
      return (
        <g>
          <polygon points={`52,${t + 2} 58,${t - 12} 66,${t} 70,${t - 14} 74,${t} 82,${t - 12} 88,${t + 2}`} fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
          <rect x="52" y={t} width="36" height="6" rx="2" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
        </g>
      );
    case "cap":
      return (
        <g>
          <path d={`M48 ${t + 6} a22 16 0 0 1 44 0 z`} fill="#3b82f6" />
          <rect x="68" y={t - 12} width="26" height="6" rx="3" fill="#2563eb" />
          <circle cx="70" cy={t - 8} r="3.5" fill={a} />
        </g>
      );
    case "flower":
      return (
        <g transform={`translate(94 ${t + 2})`}>
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse key={deg} cx="0" cy="-7" rx="4.5" ry="7" fill="#f9a8d4" transform={`rotate(${deg})`} />
          ))}
          <circle r="4.5" fill="#fbbf24" />
        </g>
      );
    case "glasses":
      return (
        <g>
          <circle cx="56" cy="44" r="11" fill="none" stroke="#1f2937" strokeWidth="2.5" />
          <circle cx="84" cy="44" r="11" fill="none" stroke="#1f2937" strokeWidth="2.5" />
          <line x1="67" y1="44" x2="73" y2="44" stroke="#1f2937" strokeWidth="2.5" />
        </g>
      );
    case "sunglasses":
      return (
        <g>
          <rect x="46" y="38" width="20" height="12" rx="5" fill="#1f2937" />
          <rect x="74" y="38" width="20" height="12" rx="5" fill="#1f2937" />
          <line x1="66" y1="43" x2="74" y2="43" stroke="#1f2937" strokeWidth="3" />
        </g>
      );
    case "halo":
      return <ellipse cx="70" cy={t - 12} rx="18" ry="5" fill="none" stroke="#fbbf24" strokeWidth="3.5" />;
    case "headphones":
      return (
        <g>
          <path d={`M48 46 C48 ${t - 2} 92 ${t - 2} 92 46`} stroke="#7c3aed" strokeWidth="4" fill="none" />
          <rect x="42" y="40" width="10" height="16" rx="4" fill="#7c3aed" />
          <rect x="88" y="40" width="10" height="16" rx="4" fill="#7c3aed" />
        </g>
      );
    case "scarf":
      return (
        <g>
          <rect x="52" y="72" width="36" height="9" rx="4.5" fill="#ef4444" />
          <rect x="76" y="78" width="9" height="20" rx="4" fill="#ef4444" />
        </g>
      );
    case "cape":
      return <path d="M44 80 C30 100 32 126 40 140 L52 132 C46 116 48 96 54 82 Z" fill="#ef4444" />;
    case "necklace":
      return (
        <g>
          <path d="M56 76 C62 84 78 84 84 76" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
          <circle cx="70" cy="83" r="3.5" fill="#f59e0b" />
        </g>
      );
    case "bowtie":
      return (
        <g>
          <polygon points="58,72 70,78 58,84" fill="#7c3aed" />
          <polygon points="82,72 70,78 82,84" fill="#7c3aed" />
          <circle cx="70" cy="78" r="3" fill="#5b21b6" />
        </g>
      );
    case "balloon":
      return (
        <g>
          <line x1="116" y1="100" x2="112" y2="66" stroke="#9ca3af" strokeWidth="1.5" />
          <ellipse cx="112" cy="56" rx="10" ry="12" fill="#ef4444" />
          <polygon points="112,67 109,72 115,72" fill="#ef4444" />
        </g>
      );
    case "wand":
      return (
        <g>
          <line x1="112" y1="118" x2="126" y2="90" stroke="#a16207" strokeWidth="3.5" strokeLinecap="round" />
          <text x="119" y="92" fontSize="14">✨</text>
        </g>
      );
    case "flag":
      return (
        <g>
          <line x1="24" y1="118" x2="24" y2="80" stroke="#a16207" strokeWidth="3" strokeLinecap="round" />
          <polygon points="24,80 48,86 24,94" fill={a} stroke="#1f2937" strokeWidth="1" />
        </g>
      );
    case "mask":
      return (
        <g>
          <path d="M44 40 C52 34 62 36 66 42 C69 40 71 40 74 42 C78 36 88 34 96 40 C96 50 88 54 82 52 C78 50 76 48 70 48 C64 48 62 50 58 52 C52 54 44 50 44 40 Z" fill="#7c3aed" opacity="0.9" />
          <circle cx="56" cy="44" r="5" fill="white" />
          <circle cx="84" cy="44" r="5" fill="white" />
        </g>
      );
    case "mustache":
      return <path d="M56 58 C60 54 66 55 70 58 C74 55 80 54 84 58 C80 62 74 62 70 60 C66 62 60 62 56 58 Z" fill="#4b5563" />;
    case "earrings":
      return (
        <g>
          <circle cx="42" cy="58" r="3" fill="#fbbf24" />
          <circle cx="98" cy="58" r="3" fill="#fbbf24" />
        </g>
      );
    case "tutu":
      return (
        <g>
          {[46, 56, 66, 76, 86].map((x) => (
            <ellipse key={x} cx={x + 2} cy="126" rx="9" ry="6" fill="#f9a8d4" opacity="0.85" />
          ))}
        </g>
      );
    case "backpack":
      return (
        <g>
          <path d="M46 90 C40 90 38 96 38 104 C38 112 42 116 48 116" stroke="#16a34a" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M94 90 C100 90 102 96 102 104 C102 112 98 116 92 116" stroke="#16a34a" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      );
    default:
      return null;
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
