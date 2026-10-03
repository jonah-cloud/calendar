import { useRef } from "react";

/**
 * A real clock face, shared by every time activity.
 *
 * The hands can be dragged, and dragging teaches the thing a printed
 * worksheet cannot: the hour hand creeps forward as the minute hand goes
 * round. That is why it sits BETWEEN two numbers at half past — which is
 * exactly where children read 3:30 as "half past four".
 */
export function ClockFace({
  minutes,
  onChange,
  size = 250,
  color = "#0284c7",
  /** shade the part of the hour the minute hand has already swept */
  sweep = false,
  /** snap the minute hand to this many minutes (30 = half hours only) */
  snapMinutes = 1,
  /** hide the small minute numbers printed outside the dial */
  hideMinuteNumbers = false,
  /** draw the hour hand only — used when teaching which hour it is */
  hourHandOnly = false,
}: {
  minutes: number;
  onChange?: (m: number) => void;
  size?: number;
  color?: string;
  sweep?: boolean;
  snapMinutes?: number;
  hideMinuteNumbers?: boolean;
  hourHandOnly?: boolean;
}) {
  const C = size / 2;
  const R = C - 30;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const dragging = useRef<"hour" | "minute" | null>(null);

  const minAngle = (minutes % 60) * 6;
  const hourAngle = ((minutes % 720) / 60) * 30;
  const hand = (angle: number, len: number) => {
    const a = ((angle - 90) * Math.PI) / 180;
    return { x: C + len * Math.cos(a), y: C + len * Math.sin(a) };
  };
  const mh = hand(minAngle, R * 0.82);
  const hh = hand(hourAngle, R * 0.52);

  const angleFrom = (e: React.PointerEvent | PointerEvent) => {
    const el = svgRef.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    return (Math.atan2(dy, dx) * 180) / Math.PI + 90;
  };

  const apply = (e: React.PointerEvent | PointerEvent) => {
    if (!onChange || !dragging.current) return;
    const deg = ((angleFrom(e) % 360) + 360) % 360;
    if (dragging.current === "minute") {
      const raw = deg / 6;
      const m = (Math.round(raw / snapMinutes) * snapMinutes) % 60;
      onChange(Math.floor(minutes / 60) * 60 + m);
    } else {
      const h = Math.round(deg / 30) % 12;
      onChange(h * 60 + (minutes % 60));
    }
  };

  const grab = (which: "hour" | "minute") => (e: React.PointerEvent) => {
    if (!onChange) return;
    dragging.current = which;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    apply(e);
  };

  // the wedge the minute hand has swept since the top of the hour
  const sweepPath = () => {
    const m = minutes % 60;
    if (m === 0) return null;
    const a1 = ((m * 6 - 90) * Math.PI) / 180;
    const large = m * 6 > 180 ? 1 : 0;
    return `M ${C} ${C} L ${C} ${C - R} A ${R} ${R} 0 ${large} 1 ${C + R * Math.cos(a1)} ${C + R * Math.sin(a1)} Z`;
  };

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="mx-auto touch-none select-none"
      onPointerMove={(e) => dragging.current && apply(e)}
      onPointerUp={() => (dragging.current = null)}
      onPointerLeave={() => (dragging.current = null)}
    >
      <circle cx={C} cy={C} r={R} fill="#fff" stroke={color} strokeWidth="6" />
      {sweep && sweepPath() && <path d={sweepPath()!} fill={color} opacity="0.17" />}

      {Array.from({ length: 60 }, (_, i) => {
        const a = ((i * 6 - 90) * Math.PI) / 180;
        const big = i % 5 === 0;
        const r1 = R - (big ? 13 : 7);
        return (
          <line
            key={i}
            x1={C + r1 * Math.cos(a)}
            y1={C + r1 * Math.sin(a)}
            x2={C + (R - 3) * Math.cos(a)}
            y2={C + (R - 3) * Math.sin(a)}
            stroke={big ? color : "#cbd5e1"}
            strokeWidth={big ? 4 : 2}
            strokeLinecap="round"
          />
        );
      })}

      {Array.from({ length: 12 }, (_, i) => {
        const n = i + 1;
        const a = ((n * 30 - 90) * Math.PI) / 180;
        return (
          <g key={n}>
            <text
              x={C + R * 0.74 * Math.cos(a)}
              y={C + R * 0.74 * Math.sin(a) + 8}
              textAnchor="middle"
              fontSize={size * 0.1}
              fontWeight="900"
              fill="#1f2937"
            >
              {n}
            </text>
            {!hideMinuteNumbers && (
              <text
                x={C + (R + 16) * Math.cos(a)}
                y={C + (R + 16) * Math.sin(a) + 4}
                textAnchor="middle"
                fontSize={size * 0.05}
                fontWeight="800"
                fill={color}
                opacity="0.55"
              >
                {(n * 5) % 60}
              </text>
            )}
          </g>
        );
      })}

      <line x1={C} y1={C} x2={hh.x} y2={hh.y} stroke="#1f2937" strokeWidth="8" strokeLinecap="round" />
      {!hourHandOnly && <line x1={C} y1={C} x2={mh.x} y2={mh.y} stroke={color} strokeWidth="5" strokeLinecap="round" />}
      <circle cx={C} cy={C} r="8" fill="#1f2937" />

      {onChange && (
        <>
          <circle cx={hh.x} cy={hh.y} r="16" fill="#1f2937" opacity="0.14" onPointerDown={grab("hour")} style={{ cursor: "grab" }} />
          {!hourHandOnly && (
            <circle cx={mh.x} cy={mh.y} r="16" fill={color} opacity="0.22" onPointerDown={grab("minute")} style={{ cursor: "grab" }} />
          )}
        </>
      )}
    </svg>
  );
}

export const hhmm = (t: number) => {
  const h = Math.floor(t / 60) % 12 || 12;
  const m = t % 60;
  return `${h}:${String(m).padStart(2, "0")}`;
};

/** "3 o'clock" / "half past 3" — how a child says it before they write it. */
export const spokenTime = (t: number) => {
  const h = Math.floor(t / 60) % 12 || 12;
  const m = t % 60;
  if (m === 0) return `${h} o'clock`;
  if (m === 30) return `half past ${h}`;
  return `${h}:${String(m).padStart(2, "0")}`;
};
