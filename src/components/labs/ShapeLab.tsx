import { useMemo, useState } from "react";
import { BigButton } from "../Ui";
import { LabFrame, Verdict } from "./dragkit";
import { coachFor } from "../../lib/coaches";
import { pick, rnd, shuffle } from "../../lib/rand";
import { speak } from "../../lib/speech";

const COLOR = "#d946ef";
const SOFT = "#fdf4ff";
const VOICE = coachFor("math").voice;

/* ───────────────────────── flat shapes ───────────────────────── */

type ShapeName =
  | "circle" | "triangle" | "square" | "rectangle" | "pentagon"
  | "hexagon" | "octagon" | "rhombus" | "trapezoid" | "oval";

interface ShapeDef {
  name: ShapeName;
  sides: number;
  corners: number;
  /** a true line of symmetry exists */
  symmetric: boolean;
  blurb: string;
}

const SHAPES: ShapeDef[] = [
  { name: "circle", sides: 0, corners: 0, symmetric: true, blurb: "perfectly round, no sides and no corners" },
  { name: "triangle", sides: 3, corners: 3, symmetric: true, blurb: "three sides and three corners" },
  { name: "square", sides: 4, corners: 4, symmetric: true, blurb: "four EQUAL sides and four square corners" },
  { name: "rectangle", sides: 4, corners: 4, symmetric: true, blurb: "four sides, two long and two short" },
  { name: "pentagon", sides: 5, corners: 5, symmetric: true, blurb: "five sides — penta means five" },
  { name: "hexagon", sides: 6, corners: 6, symmetric: true, blurb: "six sides — hexa means six" },
  { name: "octagon", sides: 8, corners: 8, symmetric: true, blurb: "eight sides, like a stop sign" },
  { name: "rhombus", sides: 4, corners: 4, symmetric: true, blurb: "four equal sides, but pushed over" },
  { name: "trapezoid", sides: 4, corners: 4, symmetric: true, blurb: "four sides with just one pair parallel" },
  { name: "oval", sides: 0, corners: 0, symmetric: true, blurb: "a stretched circle, still no corners" },
];

/** Regular polygon points, drawn upright inside a box. */
function polyPoints(n: number, c: number, r: number, rotate = 0): [number, number][] {
  return Array.from({ length: n }, (_, i) => {
    const a = ((i * 360) / n - 90 + rotate) * (Math.PI / 180);
    return [c + r * Math.cos(a), c + r * Math.sin(a)] as [number, number];
  });
}

function shapeGeometry(name: ShapeName, size: number) {
  const c = size / 2;
  const r = size * 0.42;
  switch (name) {
    case "circle":
      return { kind: "circle" as const, cx: c, cy: c, r };
    case "oval":
      return { kind: "ellipse" as const, cx: c, cy: c, rx: r, ry: r * 0.66 };
    case "square":
      return { kind: "poly" as const, pts: [[c - r, c - r], [c + r, c - r], [c + r, c + r], [c - r, c + r]] as [number, number][] };
    case "rectangle":
      return { kind: "poly" as const, pts: [[c - r, c - r * 0.6], [c + r, c - r * 0.6], [c + r, c + r * 0.6], [c - r, c + r * 0.6]] as [number, number][] };
    case "rhombus":
      return { kind: "poly" as const, pts: [[c, c - r], [c + r * 0.72, c], [c, c + r], [c - r * 0.72, c]] as [number, number][] };
    case "trapezoid":
      return { kind: "poly" as const, pts: [[c - r * 0.5, c - r * 0.6], [c + r * 0.5, c - r * 0.6], [c + r, c + r * 0.6], [c - r, c + r * 0.6]] as [number, number][] };
    case "triangle":
      return { kind: "poly" as const, pts: polyPoints(3, c, r) };
    case "pentagon":
      return { kind: "poly" as const, pts: polyPoints(5, c, r) };
    case "hexagon":
      return { kind: "poly" as const, pts: polyPoints(6, c, r, 30) };
    case "octagon":
      return { kind: "poly" as const, pts: polyPoints(8, c, r, 22.5) };
  }
}

/** Draws a shape, optionally with its corners dotted or its sides numbered. */
function ShapeSvg({
  name,
  size = 160,
  showCorners,
  tappedCorners,
  onTapCorner,
  foldLine,
}: {
  name: ShapeName;
  size?: number;
  showCorners?: boolean;
  tappedCorners?: Set<number>;
  onTapCorner?: (i: number) => void;
  foldLine?: "vertical" | "horizontal" | "diagonal" | null;
}) {
  const g = shapeGeometry(name, size);
  const c = size / 2;
  const fill = `${COLOR}33`;
  const stroke = COLOR;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto touch-none">
      {g.kind === "circle" && <circle cx={g.cx} cy={g.cy} r={g.r} fill={fill} stroke={stroke} strokeWidth="5" />}
      {g.kind === "ellipse" && <ellipse cx={g.cx} cy={g.cy} rx={g.rx} ry={g.ry} fill={fill} stroke={stroke} strokeWidth="5" />}
      {g.kind === "poly" && (
        <polygon points={g.pts.map(([x, y]) => `${x},${y}`).join(" ")} fill={fill} stroke={stroke} strokeWidth="5" strokeLinejoin="round" />
      )}

      {foldLine && (
        <line
          x1={foldLine === "horizontal" ? 6 : foldLine === "vertical" ? c : 10}
          y1={foldLine === "horizontal" ? c : foldLine === "vertical" ? 6 : 10}
          x2={foldLine === "horizontal" ? size - 6 : foldLine === "vertical" ? c : size - 10}
          y2={foldLine === "horizontal" ? c : foldLine === "vertical" ? size - 6 : size - 10}
          stroke="#111827"
          strokeWidth="3"
          strokeDasharray="8 6"
        />
      )}

      {showCorners && g.kind === "poly" &&
        g.pts.map(([x, y], i) => {
          const hit = tappedCorners?.has(i);
          return (
            <g key={i} onPointerDown={() => onTapCorner?.(i)} style={{ cursor: onTapCorner ? "pointer" : "default" }}>
              <circle cx={x} cy={y} r="13" fill="transparent" />
              <circle cx={x} cy={y} r="9" fill={hit ? "#16a34a" : "#fff"} stroke={hit ? "#16a34a" : stroke} strokeWidth="3.5" />
              {hit && (
                <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="900" fill="#fff">
                  {[...(tappedCorners ?? [])].indexOf(i) + 1}
                </text>
              )}
            </g>
          );
        })}
    </svg>
  );
}

/* ───────────────────────── fraction shapes ───────────────────────── */

/** A circle or bar cut into equal parts; tapping a part shades it. */
function FractionShape({
  kind,
  parts,
  shaded,
  onToggle,
  size = 170,
  label,
}: {
  kind: "circle" | "bar";
  parts: number;
  shaded: Set<number>;
  onToggle?: (i: number) => void;
  size?: number;
  label?: string;
}) {
  const c = size / 2;
  const r = size * 0.44;
  const sector = (i: number) => {
    const a0 = ((i * 360) / parts - 90) * (Math.PI / 180);
    const a1 = (((i + 1) * 360) / parts - 90) * (Math.PI / 180);
    const large = 360 / parts > 180 ? 1 : 0;
    if (parts === 1) return `M ${c} ${c - r} A ${r} ${r} 0 1 1 ${c - 0.01} ${c - r} Z`;
    return `M ${c} ${c} L ${c + r * Math.cos(a0)} ${c + r * Math.sin(a0)} A ${r} ${r} 0 ${large} 1 ${c + r * Math.cos(a1)} ${c + r * Math.sin(a1)} Z`;
  };

  if (kind === "circle") {
    return (
      <div className="flex flex-col items-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="touch-none">
          {Array.from({ length: parts }, (_, i) => (
            <path
              key={i}
              d={sector(i)}
              fill={shaded.has(i) ? COLOR : "#fff"}
              stroke={COLOR}
              strokeWidth="3"
              onPointerDown={() => onToggle?.(i)}
              style={{ cursor: onToggle ? "pointer" : "default" }}
            />
          ))}
        </svg>
        {label && <div className="font-black text-lg" style={{ color: COLOR }}>{label}</div>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex w-full max-w-[300px] rounded-xl overflow-hidden touch-none" style={{ border: `3px solid ${COLOR}` }}>
        {Array.from({ length: parts }, (_, i) => (
          <div
            key={i}
            onPointerDown={() => onToggle?.(i)}
            className="flex-1"
            style={{
              height: 62,
              background: shaded.has(i) ? COLOR : "#fff",
              borderRight: i < parts - 1 ? `3px solid ${COLOR}` : undefined,
              cursor: onToggle ? "pointer" : "default",
            }}
          />
        ))}
      </div>
      {label && <div className="font-black text-lg mt-1" style={{ color: COLOR }}>{label}</div>}
    </div>
  );
}

/* ═══════════ Level 1 · name the shape ═══════════ */
function NameShape({ onScore }: { onScore: (ok: boolean) => void }) {
  const make = () => {
    const target = pick(SHAPES);
    const others = shuffle(SHAPES.filter((s) => s.name !== target.name)).slice(0, 3);
    return { target, options: shuffle([target, ...others]) };
  };
  const [r, setR] = useState(make);
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");

  const answer = (name: ShapeName) => {
    const ok = name === r.target.name;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(ok ? `Yes, a ${r.target.name} — ${r.target.blurb}.` : `Count the sides again.`, VOICE);
    if (ok) setTimeout(() => { setR(make()); setState("idle"); }, 1500);
  };

  return (
    <LabFrame
      title="What shape is this?"
      sub="Count the straight sides. The number of sides gives the shape its name."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict state={state} right={`A ${r.target.name} — ${r.target.blurb}.`} wrong="Count the straight sides one at a time." />
          <div className="grid grid-cols-2 gap-2 mt-3">
            {r.options.map((o) => (
              <BigButton key={o.name} onClick={() => answer(o.name)} color={COLOR}>
                {o.name}
              </BigButton>
            ))}
          </div>
        </>
      }
    >
      <ShapeSvg name={r.target.name} />
    </LabFrame>
  );
}

/* ═══════════ Level 2 · count the corners ═══════════ */
function CountCorners({ onScore }: { onScore: (ok: boolean) => void }) {
  const make = () => pick(SHAPES.filter((s) => s.corners > 0));
  const [shape, setShape] = useState(make);
  const [tapped, setTapped] = useState<Set<number>>(new Set());
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");

  const tap = (i: number) => {
    if (tapped.has(i)) return;
    const next = new Set(tapped);
    next.add(i);
    setTapped(next);
    speak(String(next.size), VOICE);
    if (next.size === shape.corners) {
      setState("right");
      onScore(true);
      speak(`${shape.corners} corners, and a ${shape.name} has ${shape.sides} sides too. They always match!`, VOICE);
      setTimeout(() => { setShape(make()); setTapped(new Set()); setState("idle"); }, 2200);
    }
  };

  return (
    <LabFrame
      title={`Tap every corner of the ${shape.name}`}
      sub="Here is the secret: a flat shape always has the same number of corners as sides."
      color={COLOR}
      soft={SOFT}
      footer={
        <Verdict
          state={state}
          right={`${shape.corners} corners and ${shape.sides} sides — they always match.`}
          wrong="Keep tapping — you haven't got them all."
        />
      }
    >
      <ShapeSvg name={shape.name} size={190} showCorners tappedCorners={tapped} onTapCorner={tap} />
      <div className="text-center font-black text-xl" style={{ color: COLOR }}>
        {tapped.size} of {shape.corners} corners
      </div>
    </LabFrame>
  );
}

/* ═══════════ Level 3 · solid shapes ═══════════ */
const SOLIDS = [
  { name: "cube", emoji: "🎲", faces: 6, blurb: "six square faces, like a dice", real: ["🎁", "🧊", "📦"] },
  { name: "sphere", emoji: "⚽", faces: 0, blurb: "perfectly round all over, like a ball", real: ["🏀", "🌍", "🍊"] },
  { name: "cone", emoji: "🍦", faces: 1, blurb: "a circle at the bottom and one point on top", real: ["🎉", "🌲", "🚧"] },
  { name: "cylinder", emoji: "🥫", faces: 2, blurb: "two circle ends and a curved side", real: ["🪣", "🥁", "🧻"] },
  { name: "pyramid", emoji: "🔺", faces: 5, blurb: "a square base and four triangle sides", real: ["⛺", "🏔️"] },
];

function SolidShapes({ onScore }: { onScore: (ok: boolean) => void }) {
  const make = () => {
    const target = pick(SOLIDS);
    const others = shuffle(SOLIDS.filter((s) => s.name !== target.name)).slice(0, 3);
    return { target, real: pick(target.real), options: shuffle([target, ...others]) };
  };
  const [r, setR] = useState(make);
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const answer = (name: string) => {
    const ok = name === r.target.name;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(ok ? `Yes! A ${r.target.name} has ${r.target.blurb}.` : "Look at the shape of it again.", VOICE);
    if (ok) setTimeout(() => { setR(make()); setState("idle"); }, 1800);
  };
  return (
    <LabFrame
      title="Which solid shape is this?"
      sub="Flat shapes live on paper. Solid shapes are things you can pick up."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict state={state} right={`A ${r.target.name} — ${r.target.blurb}.`} wrong="Think about what it would feel like to hold." />
          <div className="grid grid-cols-2 gap-2 mt-3">
            {r.options.map((o) => (
              <BigButton key={o.name} onClick={() => answer(o.name)} color={COLOR}>
                {o.name}
              </BigButton>
            ))}
          </div>
        </>
      }
    >
      <div className="text-center">
        <div style={{ fontSize: 96 }} className="leading-none">{r.real}</div>
        <div className="font-black text-gray-500 text-sm mt-2">what shape is this object?</div>
      </div>
    </LabFrame>
  );
}

/* ═══════════ Level 4 · symmetry ═══════════ */
const SYM_ITEMS: { emoji: string; name: string; symmetric: boolean }[] = [
  { emoji: "🦋", name: "butterfly", symmetric: true },
  { emoji: "❤️", name: "heart", symmetric: true },
  { emoji: "⭐", name: "star", symmetric: true },
  { emoji: "🌳", name: "tree", symmetric: true },
  { emoji: "🏠", name: "house", symmetric: true },
  { emoji: "🧦", name: "sock", symmetric: false },
  { emoji: "🍕", name: "pizza slice", symmetric: false },
  { emoji: "🐟", name: "fish", symmetric: false },
  { emoji: "🖐️", name: "hand", symmetric: false },
  { emoji: "🎸", name: "guitar", symmetric: false },
];

function Symmetry({ onScore }: { onScore: (ok: boolean) => void }) {
  const [item, setItem] = useState(() => pick(SYM_ITEMS));
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const answer = (said: boolean) => {
    const ok = said === item.symmetric;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(
      ok
        ? item.symmetric
          ? "Yes! Fold it down the middle and both halves match."
          : "Right — no matter where you fold it, the halves never match."
        : "Imagine folding it along the dotted line.",
      VOICE
    );
    if (ok) setTimeout(() => { setItem(pick(SYM_ITEMS)); setState("idle"); }, 1800);
  };
  return (
    <LabFrame
      title="Can you fold it in half?"
      sub="A shape has a line of symmetry if folding it makes both halves land exactly on top of each other."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict
            state={state}
            right={item.symmetric ? "Both halves match exactly." : "The halves never match — no line of symmetry."}
            wrong="Picture the fold along the dotted line."
          />
          <div className="grid grid-cols-2 gap-2 mt-3">
            <BigButton onClick={() => answer(true)} color="#16a34a">✅ Both halves match</BigButton>
            <BigButton onClick={() => answer(false)} color="#6b7280">❌ They don't match</BigButton>
          </div>
        </>
      }
    >
      <div className="relative text-center">
        <div style={{ fontSize: 110 }} className="leading-none">{item.emoji}</div>
        <div className="absolute inset-y-0 left-1/2 border-l-[3px] border-dashed border-gray-800" />
        <div className="font-black text-gray-500 text-sm mt-2 capitalize">{item.name}</div>
      </div>
    </LabFrame>
  );
}

/* ═══════════ Level 5 · equal parts ═══════════ */
function EqualParts({ onScore }: { onScore: (ok: boolean) => void }) {
  const make = () => ({
    kind: pick(["circle", "bar"] as const),
    parts: pick([2, 3, 4, 6, 8]),
  });
  const [r, setR] = useState(make);
  const [cuts, setCuts] = useState(1);
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const names: Record<number, string> = { 2: "halves", 3: "thirds", 4: "fourths", 6: "sixths", 8: "eighths" };

  const check = () => {
    const ok = cuts === r.parts;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(ok ? `${r.parts} equal parts. Each one is called a ${names[r.parts].replace(/s$/, "")}.` : `You made ${cuts}. We need ${r.parts}.`, VOICE);
    if (ok) setTimeout(() => { setR(make()); setCuts(1); setState("idle"); }, 2000);
  };

  return (
    <LabFrame
      title={`Cut it into ${r.parts} equal parts`}
      sub="Fractions only work when every piece is exactly the same size."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict
            state={state}
            right={`${r.parts} equal parts — these are ${names[r.parts]}.`}
            wrong={`You made ${cuts} part${cuts === 1 ? "" : "s"}. Try again.`}
          />
          <div className="grid grid-cols-2 gap-2 mt-3">
            <BigButton onClick={() => { setCuts((n) => Math.min(12, n + 1)); setState("idle"); }} color={COLOR}>
              ✂️ Cut again
            </BigButton>
            <BigButton onClick={() => { setCuts((n) => Math.max(1, n - 1)); setState("idle"); }} color="#6b7280">
              ↩️ Undo a cut
            </BigButton>
          </div>
          <BigButton onClick={check} color={COLOR} className="w-full mt-2">
            Check my {cuts} part{cuts === 1 ? "" : "s"} 🔍
          </BigButton>
        </>
      }
    >
      <FractionShape kind={r.kind} parts={cuts} shaded={new Set()} label={`${cuts} equal part${cuts === 1 ? "" : "s"}`} />
    </LabFrame>
  );
}

/* ═══════════ Level 6 · name the fraction ═══════════ */
function NameFraction({ onScore }: { onScore: (ok: boolean) => void }) {
  const make = () => {
    const parts = pick([2, 3, 4, 5, 6, 8]);
    return { kind: pick(["circle", "bar"] as const), parts, want: rnd(1, parts - 1) };
  };
  const [r, setR] = useState(make);
  const [shaded, setShaded] = useState<Set<number>>(new Set());
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");

  const toggle = (i: number) => {
    const next = new Set(shaded);
    next.has(i) ? next.delete(i) : next.add(i);
    setShaded(next);
    setState("idle");
  };
  const check = () => {
    const ok = shaded.size === r.want;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(ok ? `${r.want} out of ${r.parts}. That is ${r.want} ${r.parts === 2 ? "half" : r.parts === 4 ? "fourth" : "part"}s.` : `You shaded ${shaded.size}. We need ${r.want}.`, VOICE);
    if (ok) setTimeout(() => { setR(make()); setShaded(new Set()); setState("idle"); }, 1800);
  };

  return (
    <LabFrame
      title={`Shade ${r.want}/${r.parts}`}
      sub="The bottom number is how many equal pieces. The top number is how many you colour in."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict state={state} right={`${r.want} out of ${r.parts} — that's ${r.want}/${r.parts}.`} wrong={`You shaded ${shaded.size} of ${r.parts}.`} />
          <BigButton onClick={check} color={COLOR} className="w-full mt-3">Check it 🎨</BigButton>
        </>
      }
    >
      <div className="text-center mb-2">
        <span className="inline-block rounded-2xl px-4 py-2 font-black text-2xl text-white" style={{ background: COLOR }}>
          {r.want}/{r.parts}
        </span>
      </div>
      <FractionShape kind={r.kind} parts={r.parts} shaded={shaded} onToggle={toggle} label={`${shaded.size}/${r.parts} shaded`} />
      <div className="text-center text-xs font-black text-gray-400 mt-1">tap the pieces to colour them</div>
    </LabFrame>
  );
}

/* ═══════════ Level 7 · compare fractions ═══════════ */
function CompareFractions({ onScore }: { onScore: (ok: boolean) => void }) {
  const make = () => {
    let a = { n: rnd(1, 5), d: pick([2, 3, 4, 5, 6, 8]) };
    let b = { n: rnd(1, 5), d: pick([2, 3, 4, 5, 6, 8]) };
    let guard = 0;
    while ((a.n >= a.d || b.n >= b.d || a.n / a.d === b.n / b.d) && guard++ < 40) {
      a = { n: rnd(1, 5), d: pick([2, 3, 4, 5, 6, 8]) };
      b = { n: rnd(1, 5), d: pick([2, 3, 4, 5, 6, 8]) };
    }
    return { a, b };
  };
  const [{ a, b }, setR] = useState(make);
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const bigger = a.n / a.d > b.n / b.d ? "a" : "b";
  const sameBottom = a.d === b.d;

  const answer = (which: "a" | "b") => {
    const ok = which === bigger;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(
      ok
        ? sameBottom
          ? "Same size pieces, so more pieces wins."
          : "Look at how much of each bar is coloured in."
        : "Compare how much is coloured, not the numbers.",
      VOICE
    );
    if (ok) setTimeout(() => { setR(make()); setState("idle"); }, 1700);
  };

  const Side = ({ f, tag }: { f: { n: number; d: number }; tag: "a" | "b" }) => (
    <button onClick={() => answer(tag)} className="flex-1 rounded-2xl bg-white p-3 btn-soft" style={{ border: `3px solid ${COLOR}33` }}>
      <div className="font-black text-2xl mb-1" style={{ color: COLOR }}>{f.n}/{f.d}</div>
      <FractionShape kind="bar" parts={f.d} shaded={new Set(Array.from({ length: f.n }, (_, i) => i))} size={120} />
    </button>
  );

  return (
    <LabFrame
      title="Which is bigger?"
      sub={sameBottom ? "Same size pieces — so more pieces means more." : "More pieces does NOT always mean more. Look at how much is coloured."}
      color={COLOR}
      soft={SOFT}
      footer={
        <Verdict
          state={state}
          right={`${bigger === "a" ? `${a.n}/${a.d}` : `${b.n}/${b.d}`} covers more.`}
          wrong="Compare the coloured parts, not the numbers."
        />
      }
    >
      <div className="flex gap-3">
        <Side f={a} tag="a" />
        <Side f={b} tag="b" />
      </div>
      <div className="text-center text-xs font-black text-gray-400 mt-2">tap the bigger one</div>
    </LabFrame>
  );
}

/* ═══════════ Level 8 · equivalent fractions ═══════════ */
function Equivalent({ onScore }: { onScore: (ok: boolean) => void }) {
  const PAIRS: [number, number, number][] = [
    [1, 2, 4], [1, 2, 6], [1, 2, 8], [1, 3, 6], [2, 3, 6],
    [1, 4, 8], [3, 4, 8], [2, 4, 8], [1, 2, 10], [3, 5, 10],
  ];
  const make = () => {
    const [n, d, bigD] = pick(PAIRS);
    return { n, d, bigD, want: (n * bigD) / d };
  };
  const [r, setR] = useState(make);
  const [shaded, setShaded] = useState<Set<number>>(new Set());
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");

  const toggle = (i: number) => {
    const next = new Set(shaded);
    next.has(i) ? next.delete(i) : next.add(i);
    setShaded(next);
    setState("idle");
  };
  const check = () => {
    const ok = shaded.size === r.want;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(
      ok
        ? `${r.n} out of ${r.d} is the same amount as ${r.want} out of ${r.bigD}.`
        : "Match the length of the top bar exactly.",
      VOICE
    );
    if (ok) setTimeout(() => { setR(make()); setShaded(new Set()); setState("idle"); }, 2200);
  };

  return (
    <LabFrame
      title="Make the same amount"
      sub="More pieces does not mean more pie. Smaller pieces just means you need more of them."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict
            state={state}
            right={`${r.n}/${r.d} = ${r.want}/${r.bigD} — exactly the same amount.`}
            wrong={`You shaded ${shaded.size}. Match the top bar's length.`}
          />
          <BigButton onClick={check} color={COLOR} className="w-full mt-3">Check the match 🎯</BigButton>
        </>
      }
    >
      <div className="font-black text-xs uppercase tracking-wide text-gray-400 text-center">this much</div>
      <FractionShape kind="bar" parts={r.d} shaded={new Set(Array.from({ length: r.n }, (_, i) => i))} label={`${r.n}/${r.d}`} />
      <div className="text-center text-2xl my-1">⬇️</div>
      <div className="font-black text-xs uppercase tracking-wide text-gray-400 text-center">
        now shade the same amount with {r.bigD} pieces
      </div>
      <FractionShape kind="bar" parts={r.bigD} shaded={shaded} onToggle={toggle} label={`${shaded.size}/${r.bigD}`} />
    </LabFrame>
  );
}

export const SHAPE_LEVELS = [
  { id: "name", title: "Name the Shape", emoji: "🔷", blurb: "Count the sides to name it", Comp: NameShape },
  { id: "corners", title: "Count the Corners", emoji: "📍", blurb: "Tap every corner — sides and corners match", Comp: CountCorners },
  { id: "solids", title: "Solid Shapes", emoji: "🎲", blurb: "Cubes, spheres, cones and cylinders", Comp: SolidShapes },
  { id: "symmetry", title: "Symmetry", emoji: "🦋", blurb: "Fold it — do both halves match?", Comp: Symmetry },
  { id: "equal", title: "Equal Parts", emoji: "✂️", blurb: "Cut a shape into fair pieces", Comp: EqualParts },
  { id: "name-frac", title: "Name the Fraction", emoji: "🎨", blurb: "Shade the pieces to match", Comp: NameFraction },
  { id: "compare", title: "Which Is Bigger?", emoji: "⚖️", blurb: "Compare two fractions by eye", Comp: CompareFractions },
  { id: "equiv", title: "Same Amount", emoji: "🎯", blurb: "Equivalent fractions, side by side", Comp: Equivalent },
];
