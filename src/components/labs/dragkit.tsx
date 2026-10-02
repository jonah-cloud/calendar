import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Tap-or-drag, built for tablets.
 *
 * Both gestures do the same thing, because a six-year-old on an iPad will try
 * both: a tap sends the item straight to the tray, and a drag carries a ghost
 * under the finger and drops it when released over the tray. Pointer events
 * cover mouse, touch and pen with one code path, and `touch-none` on the
 * handles stops the browser scrolling the page mid-drag.
 */
export function useDragToTray<T>(onDrop: (payload: T) => void) {
  const [ghost, setGhost] = useState<{ x: number; y: number; label: string } | null>(null);
  const trayRef = useRef<HTMLDivElement | null>(null);
  const payloadRef = useRef<T | null>(null);
  const movedRef = useRef(false);

  const overTray = (x: number, y: number) => {
    const el = trayRef.current;
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  };

  const start = useCallback(
    (e: React.PointerEvent, payload: T, label: string) => {
      payloadRef.current = payload;
      movedRef.current = false;
      setGhost({ x: e.clientX, y: e.clientY, label });
      (e.target as Element).setPointerCapture?.(e.pointerId);
    },
    []
  );

  useEffect(() => {
    if (!ghost) return;
    const move = (e: PointerEvent) => {
      movedRef.current = true;
      setGhost((g) => (g ? { ...g, x: e.clientX, y: e.clientY } : g));
    };
    const up = (e: PointerEvent) => {
      // a tap counts as a drop too — kids tap far more often than they drag
      if (payloadRef.current !== null && (!movedRef.current || overTray(e.clientX, e.clientY))) {
        onDrop(payloadRef.current);
      }
      payloadRef.current = null;
      setGhost(null);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [ghost, onDrop]);

  const Ghost = () =>
    ghost ? (
      <div
        className="fixed z-50 pointer-events-none text-4xl drop-shadow-lg"
        style={{ left: ghost.x, top: ghost.y, transform: "translate(-50%, -50%) scale(1.15)" }}
      >
        {ghost.label}
      </div>
    ) : null;

  return { start, trayRef, Ghost, dragging: !!ghost };
}

/** The shared shell every lab activity sits in. */
export function LabFrame({
  title,
  sub,
  color,
  soft,
  children,
  footer,
}: {
  title: string;
  sub?: string;
  color: string;
  soft: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="card p-5">
      <div className="font-black text-xl text-gray-800 leading-tight">{title}</div>
      {sub && <div className="text-sm font-bold text-gray-500 mt-0.5">{sub}</div>}
      <div className="mt-4 rounded-3xl p-4" style={{ background: soft, border: `3px solid ${color}22` }}>
        {children}
      </div>
      {footer}
    </div>
  );
}

/** Big friendly feedback line used by every lab. */
export function Verdict({ state, right, wrong }: { state: "idle" | "right" | "wrong"; right: string; wrong: string }) {
  if (state === "idle") return null;
  return (
    <div
      className={`mt-3 rounded-2xl p-3 text-center font-black animate-pop ${
        state === "right" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
      }`}
    >
      {state === "right" ? `✅ ${right}` : `💭 ${wrong}`}
    </div>
  );
}
