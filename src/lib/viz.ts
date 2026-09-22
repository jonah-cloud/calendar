/**
 * Visual explanations for math. A wrong answer shouldn't dump three lines of
 * text at a kid — it should SHOW the maths, one picture at a time.
 */

export type Viz =
  /** count objects, numbered 1..n */
  | { kind: "count"; emoji: string; n: number; highlight?: number }
  /** two piles joining into one */
  | { kind: "addObjects"; emoji: string; a: number; b: number; showTotal?: boolean }
  /** a ten-frame, optionally with extras waiting outside it */
  | { kind: "tenframe"; filled: number; moving?: number; extra?: number }
  /** number line with hops from -> to */
  | { kind: "numberline"; from: number; to: number; step: number; start?: number }
  /** place value: bundles of ten + loose ones */
  | { kind: "place"; n: number; ask?: "tens" | "ones" }
  /** rows x cols grid */
  | { kind: "array"; rows: number; cols: number; emoji: string }
  /** total split into equal groups */
  | { kind: "groups"; total: number; per: number; emoji: string }
  /** break a number into tens + ones, then operate */
  | { kind: "split"; a: number; b: number; op: "+" | "-" | "x" }
  /** one or two fraction bars */
  | { kind: "fraction"; bars: { num: number; den: number; label: string }[] }
  /** rectangle for area / perimeter */
  | { kind: "rect"; w: number; h: number; mode: "area" | "perimeter" }
  /** coins adding up */
  | { kind: "coins"; values: number[] }
  /** a clock face */
  | { kind: "clock"; h: number; m: number }
  /** big expression, optionally with one part highlighted */
  | { kind: "expr"; parts: { text: string; hot?: boolean }[] }
  /* ---- the higher course books ---- */
  /** a measured angle, drawn to scale */
  | { kind: "angle"; deg: number; label?: string }
  /** a coordinate grid with plotted points */
  | { kind: "coord"; size?: number; points: { x: number; y: number; label?: string }[] }
  /** a box of unit cubes, for volume */
  | { kind: "solid"; w: number; h: number; d: number }
  /** a circle with radius / diameter / circumference called out */
  | { kind: "circle"; r: number; show: "radius" | "diameter" | "circumference" }
  /** a 10x10 hundred grid, for decimals and percents */
  | { kind: "decgrid"; shaded: number; label?: string }
  /** a number line that runs through zero into the negatives */
  | { kind: "negline"; from: number; to: number; mark?: number };

/** One step of a worked example: a picture plus a short line of narration. */
export interface WorkStep {
  text: string;
  viz?: Viz;
}
