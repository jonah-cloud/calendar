import type { Viz } from "../lib/viz";

/** Renders a math idea as a picture a five-year-old can read. */
export default function MathViz({ viz, color, soft }: { viz: Viz; color: string; soft: string }) {
  switch (viz.kind) {
    case "count":
      return <CountViz viz={viz} color={color} />;
    case "addObjects":
      return <AddViz viz={viz} color={color} soft={soft} />;
    case "tenframe":
      return <TenFrameViz viz={viz} color={color} soft={soft} />;
    case "numberline":
      return <NumberLineViz viz={viz} color={color} />;
    case "place":
      return <PlaceViz viz={viz} color={color} soft={soft} />;
    case "array":
      return <ArrayViz viz={viz} color={color} />;
    case "groups":
      return <GroupsViz viz={viz} color={color} soft={soft} />;
    case "split":
      return <SplitViz viz={viz} color={color} soft={soft} />;
    case "fraction":
      return <FractionViz viz={viz} color={color} />;
    case "rect":
      return <RectViz viz={viz} color={color} soft={soft} />;
    case "coins":
      return <CoinsViz viz={viz} color={color} soft={soft} />;
    case "clock":
      return <ClockViz viz={viz} color={color} />;
    case "expr":
      return <ExprViz viz={viz} color={color} soft={soft} />;
  }
}

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full flex flex-col items-center justify-center gap-2 py-2">{children}</div>
);

/* -------- counting: objects with their count number underneath -------- */
function CountViz({ viz, color }: { viz: Extract<Viz, { kind: "count" }>; color: string }) {
  return (
    <Box>
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: viz.n }, (_, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-4xl leading-none">{viz.emoji}</span>
            <span className="text-sm font-black mt-0.5" style={{ color }}>
              {i + 1}
            </span>
          </div>
        ))}
      </div>
      <div className="text-3xl font-black" style={{ color }}>
        = {viz.n}
      </div>
    </Box>
  );
}

/* -------- addition: two piles + a total -------- */
function AddViz({ viz, color, soft }: { viz: Extract<Viz, { kind: "addObjects" }>; color: string; soft: string }) {
  const Pile = ({ n, tint }: { n: number; tint: string }) => (
    <div className="rounded-2xl px-3 py-2 flex flex-wrap justify-center gap-1 max-w-[200px]" style={{ background: tint }}>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="text-3xl leading-none">
          {viz.emoji}
        </span>
      ))}
      {n === 0 && <span className="text-2xl font-black text-gray-300">nothing</span>}
    </div>
  );
  return (
    <Box>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <Pile n={viz.a} tint={soft} />
        <span className="text-4xl font-black" style={{ color }}>
          +
        </span>
        <Pile n={viz.b} tint="#fef3c7" />
      </div>
      {viz.showTotal && (
        <div className="text-3xl font-black mt-1" style={{ color }}>
          = {viz.a + viz.b}
        </div>
      )}
    </Box>
  );
}

/* -------- ten frame: the make-a-ten strategy -------- */
function TenFrameViz({ viz, color, soft }: { viz: Extract<Viz, { kind: "tenframe" }>; color: string; soft: string }) {
  const moving = viz.moving ?? 0;
  return (
    <Box>
      <div className="grid grid-cols-5 gap-1.5 p-2 rounded-2xl" style={{ background: soft }}>
        {Array.from({ length: 10 }, (_, i) => {
          const filled = i < viz.filled;
          const isMoving = !filled && i < viz.filled + moving;
          return (
            <div
              key={i}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: filled ? color : isMoving ? "#fbbf24" : "#fff",
                border: `3px solid ${isMoving ? "#f59e0b" : color + "44"}`,
              }}
            >
              {isMoving && <span className="text-white text-lg font-black">+</span>}
            </div>
          );
        })}
      </div>
      <div className="font-black text-lg" style={{ color }}>
        {viz.filled + moving === 10 ? "a full TEN! 🎉" : `${viz.filled} in the frame`}
      </div>
      {!!viz.extra && (
        <div className="flex items-center gap-2 mt-1">
          <span className="font-black text-gray-500">left over:</span>
          <div className="flex gap-1">
            {Array.from({ length: viz.extra }, (_, i) => (
              <span key={i} className="w-8 h-8 rounded-xl bg-amber-400 border-[3px] border-amber-500" />
            ))}
          </div>
          <span className="text-2xl font-black" style={{ color }}>
            {viz.extra}
          </span>
        </div>
      )}
    </Box>
  );
}

/* -------- number line with hops -------- */
function NumberLineViz({ viz, color }: { viz: Extract<Viz, { kind: "numberline" }>; color: string }) {
  const first = viz.start ?? viz.from;
  const stops: number[] = [];
  for (let v = first; v <= viz.to; v += viz.step) stops.push(v);
  if (stops[stops.length - 1] !== viz.to) stops.push(viz.to);
  return (
    <Box>
      <div className="w-full overflow-x-auto">
        <div className="flex items-end justify-center gap-0 min-w-min px-2">
          {stops.map((v, i) => (
            <div key={v} className="flex items-end">
              {i > 0 && (
                <div className="flex flex-col items-center justify-end pb-3 px-0.5">
                  <span className="text-xs font-black mb-0.5" style={{ color }}>
                    +{viz.step}
                  </span>
                  <svg width="34" height="16" viewBox="0 0 34 16">
                    <path d="M2 14 Q17 -6 32 14" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
              )}
              <div className="flex flex-col items-center">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-lg font-black"
                  style={{
                    background: v === viz.to ? color : "#fff",
                    color: v === viz.to ? "#fff" : color,
                    border: `3px solid ${color}`,
                  }}
                >
                  {v}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="font-black" style={{ color }}>
        {stops.length - 1} hop{stops.length - 1 === 1 ? "" : "s"} of {viz.step}
      </div>
    </Box>
  );
}

/* -------- place value: bundles of ten + loose ones -------- */
function PlaceViz({ viz, color, soft }: { viz: Extract<Viz, { kind: "place" }>; color: string; soft: string }) {
  const tens = Math.floor(viz.n / 10);
  const ones = viz.n % 10;
  return (
    <Box>
      <div className="flex items-start justify-center gap-4 flex-wrap">
        <div className="rounded-2xl p-3 text-center" style={{ background: viz.ask === "tens" ? "#fef3c7" : soft }}>
          <div className="text-xs font-black uppercase mb-1" style={{ color }}>
            tens
          </div>
          <div className="flex gap-1 justify-center">
            {Array.from({ length: tens }, (_, i) => (
              <div key={i} className="w-4 h-14 rounded-md" style={{ background: color }} />
            ))}
          </div>
          <div className="text-2xl font-black mt-1" style={{ color }}>
            {tens} × 10 = {tens * 10}
          </div>
        </div>
        <div className="rounded-2xl p-3 text-center" style={{ background: viz.ask === "ones" ? "#fef3c7" : soft }}>
          <div className="text-xs font-black uppercase mb-1" style={{ color }}>
            ones
          </div>
          <div className="grid grid-cols-5 gap-1 justify-center">
            {Array.from({ length: ones }, (_, i) => (
              <div key={i} className="w-4 h-4 rounded" style={{ background: color }} />
            ))}
            {ones === 0 && <span className="col-span-5 text-gray-300 font-black">0</span>}
          </div>
          <div className="text-2xl font-black mt-1" style={{ color }}>
            {ones}
          </div>
        </div>
      </div>
      <div className="text-3xl font-black" style={{ color }}>
        {tens * 10} + {ones} = {viz.n}
      </div>
    </Box>
  );
}

/* -------- array grid for multiplication -------- */
function ArrayViz({ viz, color }: { viz: Extract<Viz, { kind: "array" }>; color: string }) {
  return (
    <Box>
      <div className="flex flex-col gap-1.5">
        {Array.from({ length: viz.rows }, (_, r) => (
          <div key={r} className="flex items-center gap-1.5">
            {Array.from({ length: viz.cols }, (_, c) => (
              <span key={c} className="text-3xl leading-none">
                {viz.emoji}
              </span>
            ))}
            <span className="ml-2 text-sm font-black" style={{ color }}>
              {(r + 1) * viz.cols}
            </span>
          </div>
        ))}
      </div>
      <div className="text-2xl font-black" style={{ color }}>
        {viz.rows} rows × {viz.cols} = {viz.rows * viz.cols}
      </div>
    </Box>
  );
}

/* -------- division: total shared into groups -------- */
function GroupsViz({ viz, color, soft }: { viz: Extract<Viz, { kind: "groups" }>; color: string; soft: string }) {
  const groups = Math.round(viz.total / viz.per);
  return (
    <Box>
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: groups }, (_, g) => (
          <div key={g} className="rounded-2xl px-2 py-1.5 flex gap-0.5" style={{ background: soft, border: `3px solid ${color}44` }}>
            {Array.from({ length: viz.per }, (_, i) => (
              <span key={i} className="text-2xl leading-none">
                {viz.emoji}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="text-2xl font-black" style={{ color }}>
        {groups} group{groups === 1 ? "" : "s"} of {viz.per}
      </div>
    </Box>
  );
}

/* -------- split a big number into tens and ones -------- */
function SplitViz({ viz, color, soft }: { viz: Extract<Viz, { kind: "split" }>; color: string; soft: string }) {
  const t = Math.floor(viz.a / 10) * 10;
  const o = viz.a % 10;
  const sym = viz.op === "x" ? "×" : viz.op;
  const partA = viz.op === "+" ? t + viz.b : viz.op === "-" ? t - viz.b : t * viz.b;
  return (
    <Box>
      <div className="text-3xl font-black" style={{ color }}>
        {viz.a} {sym} {viz.b}
      </div>
      <div className="text-2xl">⬇️</div>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <div className="rounded-2xl px-4 py-2 font-black text-xl" style={{ background: soft, color }}>
          {t} {sym} {viz.b} = {partA}
        </div>
        <span className="text-2xl font-black text-gray-400">and</span>
        <div className="rounded-2xl px-4 py-2 font-black text-xl" style={{ background: "#fef3c7", color: "#b45309" }}>
          {o} {sym} {viz.b} = {viz.op === "x" ? o * viz.b : o}
        </div>
      </div>
    </Box>
  );
}

/* -------- fraction bars -------- */
function FractionViz({ viz, color }: { viz: Extract<Viz, { kind: "fraction" }>; color: string }) {
  return (
    <Box>
      {viz.bars.map((b, bi) => (
        <div key={bi} className="w-full max-w-[330px]">
          <div className="flex gap-1">
            {Array.from({ length: b.den }, (_, i) => (
              <div
                key={i}
                className="flex-1 h-12 rounded-lg"
                style={{ background: i < b.num ? color : "#fff", border: `3px solid ${color}` }}
              />
            ))}
          </div>
          <div className="text-center font-black text-xl mt-1" style={{ color }}>
            {b.label}
          </div>
        </div>
      ))}
    </Box>
  );
}

/* -------- rectangle: area vs perimeter -------- */
function RectViz({ viz, color, soft }: { viz: Extract<Viz, { kind: "rect" }>; color: string; soft: string }) {
  const cell = Math.min(30, Math.floor(260 / Math.max(viz.w, 1)));
  return (
    <Box>
      <div className="flex flex-col gap-0.5 p-1 rounded-lg" style={{ border: viz.mode === "perimeter" ? `6px solid ${color}` : "none" }}>
        {Array.from({ length: viz.h }, (_, r) => (
          <div key={r} className="flex gap-0.5">
            {Array.from({ length: viz.w }, (_, c) => (
              <div
                key={c}
                style={{
                  width: cell,
                  height: cell,
                  background: viz.mode === "area" ? color : soft,
                  borderRadius: 4,
                  opacity: viz.mode === "area" ? 0.85 : 1,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="text-xl font-black" style={{ color }}>
        {viz.mode === "area"
          ? `${viz.w} × ${viz.h} = ${viz.w * viz.h} squares inside`
          : `${viz.w} + ${viz.h} + ${viz.w} + ${viz.h} = ${2 * (viz.w + viz.h)} around`}
      </div>
    </Box>
  );
}

/* -------- coins -------- */
const COIN_LOOK: Record<number, { label: string; size: number; tint: string }> = {
  1: { label: "1¢", size: 40, tint: "#d97706" },
  5: { label: "5¢", size: 48, tint: "#94a3b8" },
  10: { label: "10¢", size: 36, tint: "#94a3b8" },
  25: { label: "25¢", size: 54, tint: "#64748b" },
};
function CoinsViz({ viz, color, soft }: { viz: Extract<Viz, { kind: "coins" }>; color: string; soft: string }) {
  let running = 0;
  return (
    <Box>
      <div className="flex items-end justify-center gap-3 flex-wrap">
        {viz.values.map((v, i) => {
          running += v;
          const look = COIN_LOOK[v] ?? { label: `${v}¢`, size: 44, tint: "#94a3b8" };
          return (
            <div key={i} className="flex flex-col items-center">
              <div
                className="rounded-full flex items-center justify-center font-black text-white"
                style={{ width: look.size, height: look.size, background: look.tint, border: "3px solid #fff", boxShadow: "0 3px 0 rgba(0,0,0,.15)" }}
              >
                {look.label}
              </div>
              <span className="text-sm font-black mt-1" style={{ color }}>
                {running}¢
              </span>
            </div>
          );
        })}
      </div>
      <div className="text-2xl font-black px-4 py-1.5 rounded-2xl" style={{ background: soft, color }}>
        total = {viz.values.reduce((a, b) => a + b, 0)}¢
      </div>
    </Box>
  );
}

/* -------- clock -------- */
function ClockViz({ viz, color }: { viz: Extract<Viz, { kind: "clock" }>; color: string }) {
  const minAngle = (viz.m / 60) * 360;
  const hourAngle = ((viz.h % 12) / 12) * 360 + (viz.m / 60) * 30;
  return (
    <Box>
      <svg viewBox="0 0 120 120" width="150" height="150">
        <circle cx="60" cy="60" r="54" fill="#fff" stroke={color} strokeWidth="6" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = ((i + 1) / 12) * 2 * Math.PI - Math.PI / 2;
          return (
            <text
              key={i}
              x={60 + Math.cos(a) * 42}
              y={60 + Math.sin(a) * 42 + 5}
              textAnchor="middle"
              fontSize="12"
              fontWeight="900"
              fill="#475569"
            >
              {i + 1}
            </text>
          );
        })}
        <line x1="60" y1="60" x2="60" y2="32" stroke={color} strokeWidth="7" strokeLinecap="round" transform={`rotate(${hourAngle} 60 60)`} />
        <line x1="60" y1="60" x2="60" y2="20" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" transform={`rotate(${minAngle} 60 60)`} />
        <circle cx="60" cy="60" r="5" fill={color} />
      </svg>
      <div className="text-2xl font-black" style={{ color }}>
        {viz.h}:{String(viz.m).padStart(2, "0")}
      </div>
    </Box>
  );
}

/* -------- plain expression with a highlighted part -------- */
function ExprViz({ viz, color, soft }: { viz: Extract<Viz, { kind: "expr" }>; color: string; soft: string }) {
  return (
    <Box>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {viz.parts.map((p, i) => (
          <span
            key={i}
            className="text-3xl font-black px-3 py-1.5 rounded-2xl"
            style={p.hot ? { background: "#fef3c7", color: "#b45309" } : { background: soft, color }}
          >
            {p.text}
          </span>
        ))}
      </div>
    </Box>
  );
}
