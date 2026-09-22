/**
 * Question generators for the higher course books — Math 3, 4 and 5.
 *
 * Same contract as the Math 1/2 generators: every question carries a `work`
 * array of picture-plus-sentence steps, so a wrong answer gets the visual
 * walkthrough instead of a wall of text.
 */
import { pick, rnd, shuffle } from "../../rand";
import type { Question } from "../../types";
import type { WorkStep } from "../../viz";

function wq(q: Question, work: WorkStep[]): Question {
  q.work = work;
  return q;
}

/** numQ only builds numeric, non-negative choices — this one takes anything. */
function choiceQ(prompt: string, answer: string, wrongs: string[], steps?: string[]): Question {
  const choices = shuffle([answer, ...wrongs.slice(0, 3)]);
  return { prompt, choices, answer: choices.indexOf(answer), steps };
}

/** numeric answer that may be negative or decimal */
function nq(prompt: string, answer: number, wrongs: number[], steps?: string[]): Question {
  const fmt = (n: number) => (Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100));
  return choiceQ(prompt, fmt(answer), wrongs.map(fmt), steps);
}

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

/* ══════════════════ Math 3 ══════════════════ */

export function multBy10(d: number): Question {
  const a = rnd(2, 9);
  const p = d < 0.5 ? 10 : pick([10, 100]);
  const ans = a * p;
  return wq(
    nq(`${a} × ${p} = ?`, ans, [a * p * 10, a + p, ans / 2], [
      `${a} × ${p / 10 === 1 ? 1 : 10} first, then the zeros.`,
      `Multiplying by ${p} just adds ${String(p).length - 1} zero${p === 10 ? "" : "s"}.`,
    ]),
    [
      { text: `${a} times ${p} is ${a} tens${p === 100 ? " of tens" : ""}.`, viz: { kind: "place", n: Math.min(ans, 99) || 10, ask: "tens" } },
      { text: `Write the ${a}, then bring down the zero${p === 100 ? "s" : ""} — ${ans}.`, viz: { kind: "expr", parts: [{ text: String(a) }, { text: "×" }, { text: String(p) }, { text: `= ${ans}`, hot: true }] } },
    ]
  );
}

export function divRemainder(d: number): Question {
  const per = rnd(3, d < 0.5 ? 5 : 9);
  const groups = rnd(2, 6);
  const rem = rnd(1, per - 1);
  const total = per * groups + rem;
  return wq(
    choiceQ(`${total} ÷ ${per} = ?`, `${groups} r ${rem}`, [`${groups + 1} r ${rem}`, `${groups} r ${per - rem}`, `${groups - 1} r ${rem}`], [
      `Make groups of ${per} until you can't make another.`,
      `${groups} whole groups use up ${per * groups}, leaving ${rem} behind.`,
    ]),
    [
      { text: `Share ${total} into groups of ${per}.`, viz: { kind: "groups", total: per * groups, per, emoji: "🔵" } },
      { text: `That's ${groups} full groups — and ${rem} left over that can't make another group.`, viz: { kind: "expr", parts: [{ text: `${groups} groups` }, { text: "+" }, { text: `${rem} left`, hot: true }] } },
    ]
  );
}

export function add3Digit(d: number): Question {
  const a = rnd(120, 480);
  const b = rnd(110, d < 0.5 ? 200 : 460);
  const ans = a + b;
  return wq(
    nq(`${a} + ${b} = ?`, ans, [ans + 10, ans - 100, ans + 1], [
      `Break ${b} into ${Math.floor(b / 100) * 100} + ${Math.floor((b % 100) / 10) * 10} + ${b % 10}.`,
      `Add the hundreds, then the tens, then the ones.`,
    ]),
    [
      { text: `Break both numbers into their places.`, viz: { kind: "expr", parts: [{ text: `${Math.floor(a / 100) * 100}+${Math.floor((a % 100) / 10) * 10}+${a % 10}` }, { text: "and" }, { text: `${Math.floor(b / 100) * 100}+${Math.floor((b % 100) / 10) * 10}+${b % 10}` }] } },
      { text: `Add each place, then put it back together: ${ans}.`, viz: { kind: "expr", parts: [{ text: `${a} + ${b}` }, { text: `= ${ans}`, hot: true }] } },
    ]
  );
}

export function sub3Digit(d: number): Question {
  const ans = rnd(80, 400);
  const b = rnd(50, d < 0.5 ? 150 : 350);
  const a = ans + b;
  return wq(
    nq(`${a} − ${b} = ?`, ans, [ans + 10, ans - 10, ans + 100], [
      `Count UP from ${b} to ${a} — that's the gap.`,
      `Or take away the hundreds first, then the tens, then the ones.`,
    ]),
    [
      { text: `Subtracting is finding the gap between the two numbers.`, viz: { kind: "numberline", from: b, to: a, step: Math.max(1, Math.round((a - b) / 3)) } },
      { text: `The gap is ${ans}.`, viz: { kind: "expr", parts: [{ text: `${a} − ${b}` }, { text: `= ${ans}`, hot: true }] } },
    ]
  );
}

export function fracNumberline(d: number): Question {
  const den = pick(d < 0.5 ? [2, 4] : [3, 4, 6, 8]);
  const num = rnd(1, den - 1);
  return wq(
    choiceQ(`The bar is cut into ${den} equal pieces and ${num} are shaded. What fraction is that?`, `${num}/${den}`, [`${den}/${num}`, `${num}/${den + 1}`, `${num + 1}/${den}`], [
      `The BOTTOM number is how many equal pieces the whole was cut into: ${den}.`,
      `The TOP number is how many are shaded: ${num}.`,
    ]),
    [
      { text: `The whole is cut into ${den} equal pieces.`, viz: { kind: "fraction", bars: [{ num, den, label: "?" }] } },
      { text: `${num} shaded out of ${den} pieces is ${num}/${den}.`, viz: { kind: "fraction", bars: [{ num, den, label: `${num}/${den}` }] } },
    ]
  );
}

export function quadrilateralQ(): Question {
  const opts: [string, string][] = [
    ["4 equal sides and 4 right angles", "square"],
    ["2 long sides, 2 short sides, 4 right angles", "rectangle"],
    ["exactly one pair of parallel sides", "trapezoid"],
    ["4 equal sides but slanted corners", "rhombus"],
  ];
  const [clue, name] = pick(opts);
  return wq(
    choiceQ(`A four-sided shape has ${clue}. What is it?`, name, opts.filter((o) => o[1] !== name).map((o) => o[1]), [
      "All four of these are quadrilaterals — shapes with 4 sides.",
      `The one with ${clue} is a ${name}.`,
    ]),
    [
      { text: "Every one of these has exactly 4 sides and 4 corners.", viz: { kind: "count", emoji: "🔹", n: 4 } },
      { text: `${clue} means it's a ${name}.`, viz: { kind: "rect", w: 4, h: name === "square" || name === "rhombus" ? 4 : 2, mode: "perimeter" } },
    ]
  );
}

export function angleTypeQ(): Question {
  const deg = pick([30, 45, 60, 90, 110, 135, 160]);
  const name = deg === 90 ? "right" : deg < 90 ? "acute" : "obtuse";
  return wq(
    choiceQ(`An angle measures ${deg}°. What kind of angle is it?`, name, ["acute", "right", "obtuse"].filter((x) => x !== name), [
      "A right angle is exactly 90° — the corner of a book.",
      `${deg}° is ${deg === 90 ? "exactly 90" : deg < 90 ? "less than 90, so it's a sharp ACUTE angle" : "more than 90, so it's a wide OBTUSE angle"}.`,
    ]),
    [
      { text: `Here is a ${deg}° angle.`, viz: { kind: "angle", deg, label: `${deg}°` } },
      { text: `Compare it to a right angle — 90° exactly.`, viz: { kind: "angle", deg: 90, label: "a right angle = 90°" } },
    ]
  );
}

export function unitChoiceQ(): Question {
  const opts: [string, string, string[]][] = [
    ["how tall your bedroom door is", "feet", ["pounds", "cups", "degrees"]],
    ["how heavy a watermelon is", "pounds", ["inches", "cups", "minutes"]],
    ["how much milk fits in a jug", "cups", ["feet", "pounds", "inches"]],
    ["how long a pencil is", "inches", ["miles", "pounds", "cups"]],
    ["how far away the next town is", "miles", ["inches", "cups", "ounces"]],
  ];
  const [what, unit, wrong] = pick(opts);
  return wq(
    choiceQ(`Which unit would you use to measure ${what}?`, unit, wrong, [
      "Length uses inches, feet and miles. Weight uses ounces and pounds. Liquid uses cups, pints and gallons.",
      `For ${what} you'd use ${unit}.`,
    ]),
    [
      { text: "Match the unit to the JOB: length, weight, or liquid.", viz: { kind: "count", emoji: "📏", n: 3 } },
      { text: `${what} is measured in ${unit}.`, viz: { kind: "expr", parts: [{ text: unit, hot: true }] } },
    ]
  );
}

export function functionTableQ(d: number): Question {
  const rule = rnd(2, d < 0.5 ? 5 : 9);
  const op = d < 0.6 ? "+" : "×";
  const input = rnd(2, 9);
  const ans = op === "+" ? input + rule : input * rule;
  const show = [1, 2, 3].map((i) => `${i} → ${op === "+" ? i + rule : i * rule}`);
  return wq(
    nq(`The machine follows one rule: ${show.join(", ")}. What does ${input} come out as?`, ans, [ans + 1, ans - 1, ans + rule], [
      `Look at what happens to each number: the rule is ${op} ${rule}.`,
      `So ${input} ${op} ${rule} = ${ans}.`,
    ]),
    [
      { text: `Every input changes the same way — that's the rule.`, viz: { kind: "expr", parts: [{ text: `in ${op} ${rule}`, hot: true }, { text: "= out" }] } },
      { text: `${input} ${op} ${rule} = ${ans}.`, viz: { kind: "expr", parts: [{ text: `${input} ${op} ${rule}` }, { text: `= ${ans}`, hot: true }] } },
    ]
  );
}

export function timeMinuteQ(d: number): Question {
  const h = rnd(1, 12);
  const m = d < 0.5 ? pick([5, 10, 20, 25, 35, 40, 50, 55]) : rnd(1, 59);
  const s = String(m).padStart(2, "0");
  return wq(
    choiceQ(`The hour hand is just past ${h} and the minute hand shows ${m} minutes. What time is it?`, `${h}:${s}`, [`${h}:${String((m + 5) % 60).padStart(2, "0")}`, `${m}:${String(h).padStart(2, "0")}`, `${(h % 12) + 1}:${s}`], [
      "The HOUR is the number the short hand has already passed.",
      `Short hand past ${h}, minute hand at ${m} — that's ${h}:${s}.`,
    ]),
    [
      { text: `Read the hour first, then the minutes.`, viz: { kind: "clock", h, m } },
      { text: `That's ${h}:${s}.`, viz: { kind: "expr", parts: [{ text: `${h}:${s}`, hot: true }] } },
    ]
  );
}

export function roundHundredQ(): Question {
  const n = rnd(110, 980);
  const ans = Math.round(n / 100) * 100;
  const tens = Math.floor((n % 100) / 10);
  return wq(
    nq(`Round ${n} to the nearest hundred.`, ans, [ans + 100, ans - 100, Math.round(n / 10) * 10], [
      `Look at the TENS digit: ${tens}.`,
      `${tens} is ${tens >= 5 ? "5 or more, so round UP" : "less than 5, so round DOWN"} → ${ans}.`,
    ]),
    [
      { text: `To round to the nearest hundred, look at the tens digit.`, viz: { kind: "expr", parts: [{ text: String(Math.floor(n / 100)) }, { text: String(tens), hot: true }, { text: String(n % 10) }] } },
      { text: `${tens} ${tens >= 5 ? "rounds up" : "rounds down"} — so ${n} becomes ${ans}.`, viz: { kind: "numberline", from: Math.floor(n / 100) * 100, to: Math.floor(n / 100) * 100 + 100, step: 50 } },
    ]
  );
}

/* ══════════════════ Math 4 ══════════════════ */

export function placeMillionsQ(): Question {
  const names = ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands", "millions"];
  const idx = rnd(3, 6);
  const digits = Array.from({ length: 7 }, () => rnd(1, 9));
  const n = Number(digits.join(""));
  const digit = digits[6 - idx];
  return wq(
    choiceQ(`In ${n.toLocaleString("en-US")}, which place is the digit ${digit} in (counting from the right, position ${idx + 1})?`, names[idx], names.filter((x) => x !== names[idx]).slice(0, 3), [
      "Places go right to left: ones, tens, hundreds, thousands…",
      `Position ${idx + 1} from the right is the ${names[idx]} place.`,
    ]),
    [
      { text: "Places always run right to left, in the same order.", viz: { kind: "expr", parts: names.slice(0, 4).reverse().map((t) => ({ text: t })) } },
      { text: `So that digit sits in the ${names[idx]} place.`, viz: { kind: "expr", parts: [{ text: names[idx], hot: true }] } },
    ]
  );
}

export function factorsQ(d: number): Question {
  const n = pick(d < 0.5 ? [12, 16, 18, 20, 24] : [28, 30, 36, 42, 48]);
  const facs = Array.from({ length: n }, (_, i) => i + 1).filter((f) => n % f === 0);
  const yes = pick(facs.filter((f) => f > 1 && f < n));
  const no = pick(Array.from({ length: n }, (_, i) => i + 2).filter((f) => n % f !== 0));
  return wq(
    choiceQ(`Which of these is a factor of ${n}?`, String(yes), [String(no), String(no + 1 === yes ? no + 2 : no + 1), String(n + 1)], [
      `A factor divides evenly with NOTHING left over.`,
      `${n} ÷ ${yes} = ${n / yes} exactly, so ${yes} is a factor.`,
    ]),
    [
      { text: `${yes} divides ${n} into equal groups with nothing left over.`, viz: { kind: "groups", total: n, per: yes, emoji: "🔵" } },
      { text: `${n} ÷ ${yes} = ${n / yes}, so ${yes} is a factor of ${n}.`, viz: { kind: "expr", parts: [{ text: `${n} ÷ ${yes} = ${n / yes}`, hot: true }] } },
    ]
  );
}

export function primeCompositeQ(): Question {
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
  const n = pick([...primes, 4, 6, 8, 9, 12, 15, 16, 18, 20, 21, 24, 25]);
  const isPrime = primes.includes(n);
  return wq(
    choiceQ(`Is ${n} prime or composite?`, isPrime ? "prime" : "composite", [isPrime ? "composite" : "prime", "neither"], [
      "PRIME means it can only be made by 1 × itself.",
      isPrime ? `Nothing else divides ${n} evenly, so it's prime.` : `${n} can be split other ways, so it's composite.`,
    ]),
    [
      { text: isPrime ? `${n} can only be made one way: 1 × ${n}.` : `${n} can be split into equal groups more than one way.`, viz: isPrime ? { kind: "array", rows: 1, cols: Math.min(n, 12), emoji: "🔵" } : { kind: "groups", total: n, per: n % 2 === 0 ? 2 : 3, emoji: "🔵" } },
      { text: isPrime ? "Only 1 and itself — that's PRIME." : "More than one way — that's COMPOSITE.", viz: { kind: "expr", parts: [{ text: isPrime ? "prime" : "composite", hot: true }] } },
    ]
  );
}

export function mixedNumberQ(d: number): Question {
  const den = pick([2, 3, 4, 5, 8]);
  const whole = rnd(1, 3);
  const num = rnd(1, den - 1);
  const improper = whole * den + num;
  const askImproper = d > 0.5;
  return wq(
    askImproper
      ? choiceQ(`Write ${whole} and ${num}/${den} as an improper fraction.`, `${improper}/${den}`, [`${whole + num}/${den}`, `${improper}/${den + 1}`, `${improper + 1}/${den}`], [
          `Each whole is ${den}/${den}. ${whole} wholes = ${whole * den}/${den}.`,
          `Add the extra ${num}/${den}: ${improper}/${den}.`,
        ])
      : choiceQ(`Write ${improper}/${den} as a mixed number.`, `${whole} and ${num}/${den}`, [`${whole} and ${den}/${num}`, `${whole + 1} and ${num}/${den}`, `${num} and ${whole}/${den}`], [
          `How many whole ${den}s fit into ${improper}? ${whole}.`,
          `That leaves ${num}/${den} over.`,
        ]),
    [
      { text: `One whole is ${den} pieces out of ${den}.`, viz: { kind: "fraction", bars: [{ num: den, den, label: `${den}/${den} = 1 whole` }] } },
      { text: `${whole} wholes and ${num} extra pieces = ${improper}/${den}.`, viz: { kind: "fraction", bars: [{ num, den, label: `the extra ${num}/${den}` }] } },
    ]
  );
}

export function fracSubQ(d: number): Question {
  const den = pick(d < 0.5 ? [4, 6, 8] : [5, 8, 10, 12]);
  const a = rnd(3, den);
  const b = rnd(1, a - 1);
  const ans = a - b;
  return wq(
    choiceQ(`${a}/${den} − ${b}/${den} = ?`, `${ans}/${den}`, [`${ans}/${den - b > 0 ? den - b : den + b}`, `${a - b + 1}/${den}`, `${ans}/${den * 2}`], [
      "The slices are all the same size, so just subtract the TOP numbers.",
      `${a} slices take away ${b} slices leaves ${ans} slices — still ${den}ths.`,
    ]),
    [
      { text: `Start with ${a} slices out of ${den}.`, viz: { kind: "fraction", bars: [{ num: a, den, label: `${a}/${den}` }] } },
      { text: `Take ${b} away and ${ans} are left. The slice size never changes.`, viz: { kind: "fraction", bars: [{ num: ans, den, label: `${ans}/${den}` }] } },
    ]
  );
}

export function decimalPlaceQ(d: number): Question {
  const t = rnd(1, 9);
  const h = rnd(1, 9);
  const asHundredths = d > 0.45;
  const val = asHundredths ? t * 10 + h : t * 10;
  return wq(
    choiceQ(
      asHundredths ? `What is 0.${t}${h} as a fraction?` : `What is 0.${t} as a fraction?`,
      asHundredths ? `${val}/100` : `${t}/10`,
      asHundredths ? [`${t}${h}/10`, `${val}/1000`, `${t}/100`] : [`${t}/100`, `${t}/1`, `10/${t}`],
      [
        "The first spot after the dot is TENTHS. The second is HUNDREDTHS.",
        asHundredths ? `Two digits after the dot means hundredths: ${val}/100.` : `One digit after the dot means tenths: ${t}/10.`,
      ]
    ),
    [
      { text: "A whole cut into 100 equal squares — each one is a hundredth.", viz: { kind: "decgrid", shaded: val, label: asHundredths ? `0.${t}${h}` : `0.${t}` } },
      { text: `So that's ${asHundredths ? `${val}/100` : `${t}/10`}.`, viz: { kind: "expr", parts: [{ text: asHundredths ? `${val}/100` : `${t}/10`, hot: true }] } },
    ]
  );
}

export function decimalCompareQ(): Question {
  const a = rnd(10, 99) / 100;
  let b = rnd(10, 99) / 100;
  while (b === a) b = rnd(10, 99) / 100;
  const bigger = Math.max(a, b);
  return wq(
    choiceQ(`Which is bigger: ${a} or ${b}?`, String(bigger), [String(Math.min(a, b)), "they are equal"], [
      "Line up the decimal points and compare place by place.",
      `${bigger} covers more of the whole.`,
    ]),
    [
      { text: `${a} shades this much of the whole.`, viz: { kind: "decgrid", shaded: Math.round(a * 100), label: String(a) } },
      { text: `${b} shades this much. The bigger shaded part wins: ${bigger}.`, viz: { kind: "decgrid", shaded: Math.round(b * 100), label: String(b) } },
    ]
  );
}

export function convertUnitsQ(d: number): Question {
  const table: [string, string, number][] = [
    ["feet", "inches", 12],
    ["yards", "feet", 3],
    ["meters", "centimeters", 100],
    ["kilometers", "meters", 1000],
    ["pounds", "ounces", 16],
    ["hours", "minutes", 60],
  ];
  const [big, small, f] = pick(d < 0.5 ? table.slice(0, 3) : table);
  const n = rnd(2, 8);
  const ans = n * f;
  return wq(
    nq(`How many ${small} are in ${n} ${big}?`, ans, [ans + f, n + f, ans / 2], [
      `1 ${big.replace(/s$/, "")} = ${f} ${small}.`,
      `So ${n} × ${f} = ${ans}.`,
    ]),
    [
      { text: `One ${big.replace(/s$/, "")} holds ${f} ${small}.`, viz: { kind: "expr", parts: [{ text: `1 ${big.replace(/s$/, "")}` }, { text: "=" }, { text: `${f} ${small}`, hot: true }] } },
      { text: `${n} of them is ${n} × ${f} = ${ans}.`, viz: { kind: "expr", parts: [{ text: `${n} × ${f}` }, { text: `= ${ans}`, hot: true }] } },
    ]
  );
}

export function areaFormulaQ(d: number): Question {
  const w = rnd(3, d < 0.5 ? 7 : 12);
  const h = rnd(2, d < 0.5 ? 6 : 10);
  const wantArea = Math.random() < 0.5;
  const area = w * h;
  const perim = 2 * (w + h);
  return wq(
    wantArea
      ? nq(`A rectangle is ${w} by ${h}. What is its AREA?`, area, [perim, area + w, area - h], ["Area = length × width.", `${w} × ${h} = ${area} square units.`])
      : nq(`A rectangle is ${w} by ${h}. What is its PERIMETER?`, perim, [area, perim + 2, w + h], ["Perimeter = all four sides added up.", `${w} + ${h} + ${w} + ${h} = ${perim}.`]),
    [
      { text: wantArea ? "Area counts the tiles INSIDE." : "Perimeter walks AROUND the edge.", viz: { kind: "rect", w, h, mode: wantArea ? "area" : "perimeter" } },
      { text: wantArea ? `${w} × ${h} = ${area} square units.` : `2 × (${w} + ${h}) = ${perim} units.`, viz: { kind: "expr", parts: [{ text: wantArea ? `${w} × ${h} = ${area}` : `2 × (${w} + ${h}) = ${perim}`, hot: true }] } },
    ]
  );
}

/* ══════════════════ Math 5 ══════════════════ */

export function fracMultQ(d: number): Question {
  const a = rnd(1, 3);
  const b = pick([2, 3, 4]);
  const c = rnd(1, 3);
  const e = pick([2, 3, 4, 5]);
  const n = a * c;
  const den = b * e;
  const g = gcd(n, den);
  const ans = `${n / g}/${den / g}`;
  return wq(
    choiceQ(`${a}/${b} × ${c}/${e} = ?`, ans, [`${a + c}/${b + e}`, `${n}/${b}`, `${den}/${n}`], [
      "To multiply fractions: tops times tops, bottoms times bottoms.",
      `${a}×${c} = ${n} and ${b}×${e} = ${den}, giving ${n}/${den}${g > 1 ? ` which simplifies to ${ans}` : ""}.`,
    ]),
    [
      { text: "Multiplying fractions makes a SMALLER piece — a part of a part.", viz: { kind: "fraction", bars: [{ num: a, den: b, label: `${a}/${b}` }, { num: c, den: e, label: `${c}/${e}` }] } },
      { text: `Tops times tops, bottoms times bottoms: ${ans}.`, viz: { kind: "expr", parts: [{ text: `${a}×${c}` }, { text: "over" }, { text: `${b}×${e}` }, { text: `= ${ans}`, hot: true }] } },
    ]
  );
}

export function fracDivQ(): Question {
  const a = rnd(1, 3);
  const b = pick([2, 3, 4]);
  const c = rnd(2, 5);
  const n = a;
  const den = b * c;
  const g = gcd(n, den);
  const ans = `${n / g}/${den / g}`;
  return wq(
    choiceQ(`${a}/${b} ÷ ${c} = ?`, ans, [`${a * c}/${b}`, `${a}/${b + c}`, `${b}/${a * c}`], [
      "Dividing by a whole number cuts each piece into MORE pieces.",
      `${a}/${b} split ${c} ways gives ${n}/${den}${g > 1 ? ` = ${ans}` : ""}.`,
    ]),
    [
      { text: `Start with ${a}/${b}.`, viz: { kind: "fraction", bars: [{ num: a, den: b, label: `${a}/${b}` }] } },
      { text: `Split it ${c} ways — the pieces get ${c} times smaller: ${ans}.`, viz: { kind: "fraction", bars: [{ num: n, den, label: ans }] } },
    ]
  );
}

export function decimalMultQ(d: number): Question {
  const a = rnd(2, 9) / 10;
  const b = d < 0.5 ? rnd(2, 9) : rnd(2, 9) / 10;
  const ans = Math.round(a * b * 100) / 100;
  return wq(
    nq(`${a} × ${b} = ?`, ans, [ans * 10, ans / 10, Math.round(a * b * 100) / 100 + 0.1], [
      "Multiply as if there were no dots at all.",
      `Then count the digits after the dots — ${String(a).split(".")[1].length + (String(b).split(".")[1]?.length ?? 0)} — and put the dot back that many places in.`,
    ]),
    [
      { text: "Ignore the dots and multiply the plain numbers first.", viz: { kind: "expr", parts: [{ text: `${a * 10} × ${Number.isInteger(b) ? b : b * 10}`, hot: true }] } },
      { text: `Now count the decimal places and put the dot back: ${ans}.`, viz: { kind: "decgrid", shaded: Math.min(100, Math.round(ans * 100)), label: String(ans) } },
    ]
  );
}

export function decimalDivQ(): Question {
  const ans = rnd(2, 9) / 10;
  const b = rnd(2, 9);
  const a = Math.round(ans * b * 100) / 100;
  return wq(
    nq(`${a} ÷ ${b} = ?`, ans, [ans * 10, ans / 10, ans + 0.1], [
      `Divide as normal, keeping the dot lined up.`,
      `${a} split ${b} ways is ${ans}.`,
    ]),
    [
      { text: `Share ${a} into ${b} equal parts.`, viz: { kind: "decgrid", shaded: Math.min(100, Math.round(a * 100)), label: String(a) } },
      { text: `Each part is ${ans}.`, viz: { kind: "decgrid", shaded: Math.min(100, Math.round(ans * 100)), label: String(ans) } },
    ]
  );
}

export function percentQ(d: number): Question {
  const pct = pick(d < 0.5 ? [10, 25, 50] : [20, 30, 40, 60, 75]);
  const base = pick([20, 40, 50, 60, 80, 100, 200]);
  const ans = (pct / 100) * base;
  return wq(
    nq(`What is ${pct}% of ${base}?`, ans, [ans * 2, ans / 2, base - ans], [
      `Percent means "out of 100", so ${pct}% is ${pct}/100.`,
      `${pct}/100 of ${base} = ${ans}.`,
    ]),
    [
      { text: `${pct}% means ${pct} squares out of 100.`, viz: { kind: "decgrid", shaded: pct, label: `${pct}%` } },
      { text: `${pct}% of ${base} is ${ans}.`, viz: { kind: "expr", parts: [{ text: `${pct}% × ${base}` }, { text: `= ${ans}`, hot: true }] } },
    ]
  );
}

export function fdpConvertQ(): Question {
  const set: [string, string, string, number][] = [
    ["1/2", "0.5", "50%", 50],
    ["1/4", "0.25", "25%", 25],
    ["3/4", "0.75", "75%", 75],
    ["1/5", "0.2", "20%", 20],
    ["1/10", "0.1", "10%", 10],
    ["1/1", "1.0", "100%", 100],
  ];
  const [frac, dec, pct, shaded] = pick(set);
  const askPct = Math.random() < 0.5;
  return wq(
    askPct
      ? choiceQ(`Write ${frac} as a percent.`, pct, set.filter((s) => s[2] !== pct).slice(0, 3).map((s) => s[2]), ["Percent means out of 100.", `${frac} = ${dec} = ${pct}.`])
      : choiceQ(`Write ${pct} as a decimal.`, dec, set.filter((s) => s[1] !== dec).slice(0, 3).map((s) => s[1]), ["To go from percent to decimal, divide by 100.", `${pct} = ${dec}.`]),
    [
      { text: `All three are the same amount, written three ways.`, viz: { kind: "decgrid", shaded, label: `${frac} = ${dec} = ${pct}` } },
      { text: `Fraction → decimal → percent. Same size, different clothes.`, viz: { kind: "expr", parts: [{ text: frac }, { text: "=" }, { text: dec }, { text: "=" }, { text: pct, hot: true }] } },
    ]
  );
}

export function exponentQ(d: number): Question {
  const base = rnd(2, d < 0.5 ? 5 : 9);
  const exp = rnd(2, d < 0.5 ? 2 : 3);
  const ans = Math.pow(base, exp);
  return wq(
    nq(`${base}^${exp} = ?`, ans, [base * exp, ans + base, ans - base], [
      `The little number says how many times to MULTIPLY, not add.`,
      `${Array(exp).fill(base).join(" × ")} = ${ans}.`,
    ]),
    [
      { text: `${base}^${exp} means ${base} multiplied by itself ${exp} times.`, viz: { kind: "expr", parts: [{ text: Array(exp).fill(base).join(" × "), hot: true }] } },
      { text: `That comes to ${ans}. (It is NOT ${base} × ${exp}!)`, viz: exp === 2 ? { kind: "array", rows: base, cols: base, emoji: "🔵" } : { kind: "solid", w: base, h: base, d: base } },
    ]
  );
}

export function squareRootQ(): Question {
  const r = rnd(2, 12);
  const n = r * r;
  return wq(
    nq(`What is the square root of ${n}?`, r, [r + 1, r - 1, n / 2], [
      "A square root asks: what number times ITSELF makes this?",
      `${r} × ${r} = ${n}, so the square root of ${n} is ${r}.`,
    ]),
    [
      { text: `${n} tiles make a perfect square.`, viz: { kind: "array", rows: r, cols: r, emoji: "🟦" } },
      { text: `Each side is ${r} long — that's the square root.`, viz: { kind: "expr", parts: [{ text: `${r} × ${r} = ${n}`, hot: true }] } },
    ]
  );
}

export function coordQ(): Question {
  const x = rnd(1, 6);
  const y = rnd(1, 6);
  return wq(
    choiceQ(`A point sits ${x} across and ${y} up. What are its coordinates?`, `(${x}, ${y})`, [`(${y}, ${x})`, `(${x}, ${y + 1})`, `(${x + 1}, ${y})`], [
      "Coordinates are always (across, up) — x first, then y.",
      `${x} across and ${y} up is (${x}, ${y}).`,
    ]),
    [
      { text: "Walk ACROSS first, then UP. Always in that order.", viz: { kind: "coord", points: [{ x, y }] } },
      { text: `So the point is (${x}, ${y}). Swapping them lands somewhere else entirely!`, viz: { kind: "coord", points: [{ x, y, label: `(${x}, ${y})` }] } },
    ]
  );
}

export function negativeQ(d: number): Question {
  const a = rnd(-9, -1);
  const b = rnd(1, 9);
  const addMode = d > 0.5;
  const ans = addMode ? a + b : Math.max(a, -b);
  return wq(
    addMode
      ? nq(`${a} + ${b} = ?`, a + b, [a - b, b - a + 1, a + b + 1], [`Start at ${a} and move ${b} steps to the RIGHT.`, `You land on ${a + b}.`])
      : choiceQ(`Which is colder: ${a}° or ${-b}°?`, String(Math.min(a, -b)), [String(Math.max(a, -b)), "the same"], ["On a number line, further LEFT is smaller.", `${Math.min(a, -b)} is further left, so it's colder.`]),
    [
      { text: "Negative numbers live to the LEFT of zero.", viz: { kind: "negline", from: -9, to: 5, mark: a } },
      { text: addMode ? `Move ${b} right from ${a} and you land on ${a + b}.` : `Further left means smaller.`, viz: { kind: "negline", from: -9, to: 5, mark: addMode ? a + b : Math.min(a, -b) } },
    ]
  );
}

export function volumeQ(d: number): Question {
  const w = rnd(2, d < 0.5 ? 4 : 6);
  const h = rnd(2, 4);
  const dd = rnd(2, 4);
  const ans = w * h * dd;
  return wq(
    nq(`A box is ${w} long, ${h} tall and ${dd} deep. What is its volume?`, ans, [w + h + dd, 2 * (w * h + h * dd + w * dd), w * h], [
      "Volume counts the CUBES that fill the inside.",
      `${w} × ${h} × ${dd} = ${ans} cubic units.`,
    ]),
    [
      { text: "Volume is how many unit cubes fit inside.", viz: { kind: "solid", w, h, d: dd } },
      { text: `Length × height × depth: ${w} × ${h} × ${dd} = ${ans}.`, viz: { kind: "expr", parts: [{ text: `${w} × ${h} × ${dd}` }, { text: `= ${ans}`, hot: true }] } },
    ]
  );
}

export function circleQ(): Question {
  const r = rnd(2, 9);
  const askD = Math.random() < 0.5;
  return wq(
    askD
      ? nq(`A circle has a radius of ${r}. What is its diameter?`, r * 2, [r, r * 4, r + 2], ["The diameter goes all the way across, through the centre.", `Diameter = 2 × radius = ${r * 2}.`])
      : nq(`A circle has a diameter of ${r * 2}. What is its radius?`, r, [r * 2, r * 4, r + 1], ["The radius is only HALF way — centre to edge.", `Radius = diameter ÷ 2 = ${r}.`]),
    [
      { text: "The radius runs from the centre to the edge.", viz: { kind: "circle", r, show: "radius" } },
      { text: "The diameter runs all the way across — always double the radius.", viz: { kind: "circle", r, show: "diameter" } },
    ]
  );
}

export function probabilityQ(): Question {
  const red = rnd(1, 5);
  const blue = rnd(1, 5);
  const total = red + blue;
  const g = gcd(red, total);
  const ans = `${red / g}/${total / g}`;
  return wq(
    choiceQ(`A bag holds ${red} red marbles and ${blue} blue. What is the chance of pulling a RED one?`, ans, [`${red}/${blue}`, `${blue}/${total}`, `${total}/${red}`], [
      "Probability is: the ones you WANT, over ALL of them.",
      `${red} red out of ${total} marbles = ${ans}.`,
    ]),
    [
      { text: `There are ${total} marbles in total, and ${red} of them are red.`, viz: { kind: "fraction", bars: [{ num: red, den: total, label: `${red} of ${total}` }] } },
      { text: `Chance = what you want ÷ everything = ${ans}.`, viz: { kind: "expr", parts: [{ text: `${red} red` }, { text: "over" }, { text: `${total} total` }, { text: `= ${ans}`, hot: true }] } },
    ]
  );
}

export function distributiveQ(): Question {
  const a = rnd(2, 9);
  const b = rnd(2, 9);
  const c = rnd(2, 9);
  const ans = a * (b + c);
  return wq(
    nq(`${a} × (${b} + ${c}) = ?`, ans, [a * b + c, a + b + c, a * b * c], [
      "You can add inside the brackets first, OR multiply each part separately.",
      `${a}×${b} + ${a}×${c} = ${a * b} + ${a * c} = ${ans}.`,
    ]),
    [
      { text: `Split the rectangle: ${a} rows of ${b}, plus ${a} rows of ${c}.`, viz: { kind: "array", rows: a, cols: b + c, emoji: "🟦" } },
      { text: `${a}×${b} + ${a}×${c} = ${a * b} + ${a * c} = ${ans}. Same answer either way.`, viz: { kind: "expr", parts: [{ text: `${a * b} + ${a * c}` }, { text: `= ${ans}`, hot: true }] } },
    ]
  );
}

export function algebraQ(d: number): Question {
  const x = rnd(2, d < 0.5 ? 9 : 15);
  const b = rnd(2, 12);
  const plus = d < 0.6;
  const total = plus ? x + b : x * b;
  return wq(
    nq(plus ? `x + ${b} = ${total}. What is x?` : `${b}x = ${total}. What is x?`, x, [x + 1, x - 1, total], [
      plus ? `Whatever is done to x, UNDO it on both sides.` : `x is being multiplied by ${b}, so divide both sides by ${b}.`,
      plus ? `${total} − ${b} = ${x}.` : `${total} ÷ ${b} = ${x}.`,
    ]),
    [
      { text: plus ? `x and ${b} together make ${total}.` : `${b} groups of x make ${total}.`, viz: plus ? { kind: "addObjects", emoji: "🔵", a: x, b, showTotal: true } : { kind: "groups", total, per: x, emoji: "🔵" } },
      { text: plus ? `Take ${b} off both sides: x = ${x}.` : `Split ${total} into ${b} equal groups: x = ${x}.`, viz: { kind: "expr", parts: [{ text: `x = ${x}`, hot: true }] } },
    ]
  );
}
