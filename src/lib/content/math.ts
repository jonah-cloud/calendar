import type { LevelDef, Question } from "../types";
import type { WorkStep } from "../viz";
import { numQ, pick, rnd, shuffle } from "../rand";

const OBJECTS = ["🍎", "⭐", "🐶", "🌸", "🎈", "🦋", "🍪", "⚽"];

/** Attach a visual worked example to a question. */
function withWork(q: Question, work: WorkStep[]): Question {
  q.work = work;
  return q;
}

const countUp = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i).join(", ");

function countingQ(d: number): Question {
  const max = d < 0.5 ? 6 : 10;
  const n = rnd(1, max);
  const emoji = pick(OBJECTS);
  return withWork(
    numQ(`How many ${emoji} do you see?`, n, emoji.repeat(n), undefined, [
      `Put your paw on each ${emoji} and count out loud: ${countUp(1, n)}.`,
      "Touch each one exactly ONCE — no double-tapping, no skipping!",
      `The last number you say is how many there are: ${n}!`,
    ]),
    [
      { text: "Touch each one and count out loud.", viz: { kind: "count", emoji, n } },
      { text: `The LAST number you say is the answer: ${n}!`, viz: { kind: "count", emoji, n } },
    ]
  );
}

function compareQ(d: number): Question {
  const max = d < 0.5 ? 10 : 30;
  let a = rnd(0, max);
  let b = rnd(0, max);
  while (a === b) b = rnd(0, max);
  const bigger = Math.max(a, b);
  const smaller = Math.min(a, b);
  const choices = shuffle([String(a), String(b)]);
  return {
    prompt: `Which number is BIGGER?`,
    visual: `${a}   or   ${b}`,
    choices,
    answer: choices.indexOf(String(bigger)),
    work: [
      { text: "Numbers get bigger as we run along the track.", viz: { kind: "numberline", from: smaller, to: bigger, step: Math.max(1, bigger - smaller) } },
      { text: `We reach ${bigger} LAST — so ${bigger} is bigger!`, viz: { kind: "expr", parts: [{ text: String(bigger), hot: true }, { text: "beats" }, { text: String(smaller) }] } },
    ],
    steps: [
      `Picture a number line — numbers get bigger as you run along it (my favorite part).`,
      `Counting up, you say ${smaller} FIRST and ${bigger} LATER.`,
      `The one you reach last is bigger: ${bigger} beats ${smaller}!`,
    ],
  };
}

function addTo5(d: number): Question {
  const a = rnd(0, d < 0.5 ? 3 : 5);
  const b = rnd(0, 5 - a);
  const emoji = pick(OBJECTS);
  const q = numQ(
    `${a} + ${b} = ?`,
    a + b,
    `${emoji.repeat(Math.max(a, 0))} ${b > 0 ? "+ " + emoji.repeat(b) : ""}`,
    undefined,
    [
      `Hold up ${a} finger${a === 1 ? "" : "s"} on one hand.`,
      b > 0
        ? `Now count on ${b} more: ${a === 0 ? countUp(1, b) : countUp(a + 1, a + b)}.`
        : `Adding zero means adding NOTHING — sneaky, right? The pile stays the same.`,
      `All together: ${a + b}!`,
    ]
  );
  return withWork(q, [
    { text: `Start with ${a}, then bring in ${b} more.`, viz: { kind: "addObjects", emoji, a, b } },
    { text: `Count them all: ${a + b}!`, viz: { kind: "addObjects", emoji, a, b, showTotal: true } },
  ]);
}

const SHAPE_FACTS: Record<string, string[]> = {
  circle: ["A circle is perfectly round — no corners, no sides.", "It rolls! Squares do NOT roll. (I tested. Loudly.)"],
  square: ["Count the sides: 1, 2, 3, 4 — all exactly the same length.", "Four equal sides + four corners = square!"],
  triangle: ["Count the sides: 1, 2, 3. TRI means THREE!", "Three sides, three pointy corners — triangle!"],
  rectangle: ["Four sides, but two are long and two are short.", "It's like a square that did a big stretch!"],
  star: ["Count the points: 1, 2, 3, 4, 5!", "Five points shining out — that's a star!"],
  heart: ["Two round bumps on top, one point at the bottom.", "That's a heart — the shape of how much I love snacks!"],
};

function shapesQ(): Question {
  const shapes: [string, string][] = [
    ["circle", "⚪"],
    ["square", "🟦"],
    ["triangle", "🔺"],
    ["rectangle", "▭"],
    ["star", "⭐"],
    ["heart", "❤️"],
  ];
  const [name, glyph] = pick(shapes);
  const wrong = shuffle(shapes.filter(([n]) => n !== name)).slice(0, 3);
  const choices = shuffle([name, ...wrong.map(([n]) => n)]);
  return {
    prompt: `What shape is this?`,
    visual: glyph,
    choices,
    answer: choices.indexOf(name),
    steps: [...SHAPE_FACTS[name]],
  };
}

function addSub20(d: number): Question {
  const sub = Math.random() < 0.5;
  if (sub) {
    const a = rnd(d < 0.5 ? 5 : 10, 20);
    const b = rnd(1, a);
    const diff = a - b;
    return withWork(
      numQ(`${a} − ${b} = ?`, diff, undefined, undefined, [
        `Subtraction trick: count UP from the small number to the big one.`,
        `Start at ${b} and hop to ${a}: ${diff <= 8 ? countUp(b + 1, a) : `that's ${diff} hops`}.`,
        `You made ${diff} hop${diff === 1 ? "" : "s"}, so ${a} − ${b} = ${diff}!`,
      ]),
      [
        { text: `Don't count backwards — hop UP from ${b} to ${a}.`, viz: { kind: "numberline", from: b, to: a, step: 1 } },
        { text: `That's ${diff} hop${diff === 1 ? "" : "s"} — the answer is ${diff}!`, viz: { kind: "expr", parts: [{ text: `${a} − ${b}` }, { text: "=" }, { text: String(diff), hot: true }] } },
      ]
    );
  }
  const a = rnd(1, d < 0.5 ? 10 : 15);
  const b = rnd(1, 20 - a);
  const sum = a + b;
  const steps =
    a + b > 10 && a < 10 && b < 10
      ? [
          `Make-a-TEN trick — the fastest move in math!`,
          `Start at ${a}. It needs ${10 - a} more to reach 10. Take ${10 - a} from ${b}.`,
          `Now it's 10 + ${b - (10 - a)} = ${sum}. Tens make everything easy!`,
        ]
      : [
          `Start with the BIGGER number, ${Math.max(a, b)} — never count from the small one, that's the slow lane!`,
          `Count on ${Math.min(a, b)} more: ${countUp(Math.max(a, b) + 1, sum)}.`,
          `${a} + ${b} = ${sum}!`,
        ];
  const work: WorkStep[] =
    a + b > 10 && a < 10 && b < 10
      ? [
          { text: `Start with ${a} in the ten-frame.`, viz: { kind: "tenframe", filled: a } },
          { text: `It needs ${10 - a} more to fill up — borrow ${10 - a} from the ${b}.`, viz: { kind: "tenframe", filled: a, moving: 10 - a, extra: b - (10 - a) } },
          { text: `Now it's easy: 10 + ${b - (10 - a)} = ${sum}!`, viz: { kind: "expr", parts: [{ text: "10 +" }, { text: String(b - (10 - a)) }, { text: "=" }, { text: String(sum), hot: true }] } },
        ]
      : [
          { text: `Start at the bigger number, ${Math.max(a, b)}, and hop on ${Math.min(a, b)}.`, viz: { kind: "numberline", from: Math.max(a, b), to: sum, step: 1 } },
          { text: `${a} + ${b} = ${sum}!`, viz: { kind: "expr", parts: [{ text: `${a} + ${b}` }, { text: "=" }, { text: String(sum), hot: true }] } },
        ];
  return withWork(numQ(`${a} + ${b} = ?`, sum, undefined, undefined, steps), work);
}

function missingNum(d: number): Question {
  const a = rnd(1, d < 0.5 ? 8 : 12);
  const total = a + rnd(1, d < 0.5 ? 8 : 12);
  const miss = total - a;
  return withWork(
    numQ(`${a} + ❓ = ${total}.  What is ❓?`, miss, undefined, undefined, [
    `The mystery box asks: "${a} plus WHAT makes ${total}?"`,
    `Count up from ${a} to ${total}: ${miss <= 8 ? countUp(a + 1, total) : `that's ${miss} counts`}.`,
      `It took ${miss} steps — so ❓ = ${miss}!`,
    ]),
    [
      { text: `We start at ${a} and need to reach ${total}.`, viz: { kind: "numberline", from: a, to: total, step: 1 } },
      { text: `That took ${miss} hop${miss === 1 ? "" : "s"} — the mystery number is ${miss}!`, viz: { kind: "expr", parts: [{ text: `${a} +` }, { text: String(miss), hot: true }, { text: `= ${total}` }] } },
    ]
  );
}

function tensOnes(d: number): Question {
  const n = rnd(11, d < 0.5 ? 59 : 99);
  const askTens = Math.random() < 0.5;
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  const ans = askTens ? tens : ones;
  const q = numQ(
    `In the number ${n}, what digit is in the ${askTens ? "TENS" : "ONES"} place?`,
    ans,
    undefined,
    undefined,
    [
      `Every two-digit number is a team: the LEFT digit counts bundles of ten, the RIGHT digit counts loose ones.`,
      `${n} = ${tens} bundle${tens === 1 ? "" : "s"} of ten (${tens}0) and ${ones} loose one${ones === 1 ? "" : "s"}.`,
      `So the ${askTens ? "TENS" : "ONES"} digit is ${ans}!`,
    ]
  );
  return withWork(q, [
    { text: `${n} is ${tens} bundle${tens === 1 ? "" : "s"} of ten and ${ones} loose one${ones === 1 ? "" : "s"}.`, viz: { kind: "place", n } },
    { text: `We want the ${askTens ? "TENS" : "ONES"} — that's ${ans}!`, viz: { kind: "place", n, ask: askTens ? "tens" : "ones" } },
  ]);
}

function skipCount(d: number): Question {
  const step = pick(d < 0.5 ? [2, 5, 10] : [2, 3, 4, 5, 10]);
  const start = step * rnd(1, 5);
  const seq = [start, start + step, start + step * 2];
  const ans = start + step * 3;
  return withWork(
    numQ(`Skip counting: ${seq.join(", ")}, ❓`, ans, undefined, undefined, [
    `These numbers are jumping by ${step}s — like a kangaroo who skips numbers!`,
    `Check: ${seq[0]} ➜ ${seq[1]} ➜ ${seq[2]}… each jump adds ${step}.`,
      `One more jump: ${seq[2]} + ${step} = ${ans}!`,
    ]),
    [
      { text: `Each jump adds ${step}.`, viz: { kind: "numberline", from: start, to: seq[2], step } },
      { text: `One more jump lands on ${ans}!`, viz: { kind: "numberline", from: start, to: ans, step } },
    ]
  );
}

function addSub100(d: number): Question {
  const sub = Math.random() < 0.5;
  if (sub) {
    const a = rnd(d < 0.5 ? 20 : 40, 99);
    const b = rnd(10, a);
    const diff = a - b;
    const bt = Math.floor(b / 10) * 10;
    return withWork(
      numQ(`${a} − ${b} = ?`, diff, undefined, undefined, [
        `Take it apart! ${b} = ${bt} + ${b - bt}.`,
      `First subtract the tens: ${a} − ${bt} = ${a - bt}.`,
        `Then the ones: ${a - bt} − ${b - bt} = ${diff}. Done!`,
      ]),
      [
        { text: `Break ${b} into ${bt} and ${b - bt}.`, viz: { kind: "expr", parts: [{ text: String(b) }, { text: "=" }, { text: String(bt), hot: true }, { text: "+" }, { text: String(b - bt), hot: true }] } },
        { text: `Take away the tens: ${a} − ${bt} = ${a - bt}.`, viz: { kind: "expr", parts: [{ text: `${a} − ${bt}` }, { text: "=" }, { text: String(a - bt), hot: true }] } },
        { text: `Then the ones: ${a - bt} − ${b - bt} = ${diff}!`, viz: { kind: "expr", parts: [{ text: `${a - bt} − ${b - bt}` }, { text: "=" }, { text: String(diff), hot: true }] } },
      ]
    );
  }
  const a = rnd(10, d < 0.5 ? 40 : 60);
  const b = rnd(10, 99 - a);
  const sum = a + b;
  const bt = Math.floor(b / 10) * 10;
  return withWork(
    numQ(`${a} + ${b} = ?`, sum, undefined, undefined, [
      `Big numbers? Break them into tens and ones! ${b} = ${bt} + ${b - bt}.`,
    `Add the tens first: ${a} + ${bt} = ${a + bt}.`,
      `Now the ones: ${a + bt} + ${b - bt} = ${sum}!`,
    ]),
    [
      { text: `Break ${b} apart into ${bt} and ${b - bt}.`, viz: { kind: "expr", parts: [{ text: String(b) }, { text: "=" }, { text: String(bt), hot: true }, { text: "+" }, { text: String(b - bt), hot: true }] } },
      { text: `Add the tens: ${a} + ${bt} = ${a + bt}.`, viz: { kind: "expr", parts: [{ text: `${a} + ${bt}` }, { text: "=" }, { text: String(a + bt), hot: true }] } },
      { text: `Then the ones: ${a + bt} + ${b - bt} = ${sum}!`, viz: { kind: "expr", parts: [{ text: `${a + bt} + ${b - bt}` }, { text: "=" }, { text: String(sum), hot: true }] } },
    ]
  );
}

function moneyQ(d: number): Question {
  const coins: [string, number][] = [
    ["penny 🪙", 1],
    ["nickel", 5],
    ["dime", 10],
    ["quarter", 25],
  ];
  if (d < 0.5) {
    const [name, val] = pick(coins);
    return withWork(numQ(`How many cents is a ${name} worth?`, val, undefined, undefined, [
      `Coin cheat-sheet: penny = 1¢, nickel = 5¢, dime = 10¢, quarter = 25¢.`,
      `Fun trick: the dime is the SMALLEST coin but worth more than the big nickel. Money is weird!`,
      `A ${name} = ${val}¢.`,
    ]), [{ text: `A ${name} is worth ${val} cents.`, viz: { kind: "coins", values: [val] } }]);
  }
  const picks = [pick(coins), pick(coins)];
  const total = picks[0][1] + picks[1][1];
  return withWork(
    numQ(`A ${picks[0][0]} plus a ${picks[1][0]} = how many cents?`, total, undefined, undefined, [
    `First remember each coin: ${picks[0][0]} = ${picks[0][1]}¢ and ${picks[1][0]} = ${picks[1][1]}¢.`,
    `Start at the bigger one, ${Math.max(picks[0][1], picks[1][1])}¢, and count on the other.`,
      `${picks[0][1]}¢ + ${picks[1][1]}¢ = ${total}¢!`,
    ]),
    [{ text: "Count on from the bigger coin.", viz: { kind: "coins", values: [Math.max(picks[0][1], picks[1][1]), Math.min(picks[0][1], picks[1][1])] } }]
  );
}

function clockQ(d: number): Question {
  const h = rnd(1, 12);
  if (d < 0.5) {
    return withWork(
      numQ(`The clock shows ${h}:00. What hour is it?`, h, undefined, undefined, [
        `When the minutes say :00, the little hour hand points RIGHT at the number.`,
        `${h}:00 means it's exactly ${h} o'clock — snack time, probably.`,
      ]),
      [{ text: `The short hand points at ${h} — so it's ${h} o'clock.`, viz: { kind: "clock", h, m: 0 } }]
    );
  }
  const mins = pick([15, 30, 45]);
  const label = mins === 15 ? "quarter past" : mins === 30 ? "half past" : "quarter to";
  const ansHour = mins === 45 ? (h % 12) + 1 : h;
  const correct = `${label} ${mins === 45 ? ansHour : h}`;
  const wrongs = shuffle([
    `half past ${(h % 12) + 1}`,
    `quarter past ${(h % 12) + 1}`,
    `quarter to ${h}`,
    `half past ${h === 1 ? 12 : h - 1}`,
  ])
    .filter((w) => w !== correct)
    .slice(0, 3);
  const choices = shuffle([correct, ...wrongs]);
  return {
    prompt: `The clock shows ${h}:${mins}. What time is that?`,
    visual: "🕒",
    choices,
    answer: choices.indexOf(correct),
    work: [
      { text: "Look where the long hand points.", viz: { kind: "clock", h, m: mins } },
      { text: `That's ${correct}!`, viz: { kind: "clock", h, m: mins } },
    ],
    steps: [
      `Think of the clock as a cookie 🍪 (I always do).`,
      `:15 = a quarter of the cookie eaten → "quarter past". :30 = half eaten → "half past". :45 = only a quarter LEFT → "quarter to" the NEXT hour.`,
      `${h}:${mins} → ${correct}!`,
    ],
  };
}

function skipList(b: number, times: number) {
  return Array.from({ length: times }, (_, i) => b * (i + 1)).join(", ");
}

function multFacts(d: number): Question {
  const a = rnd(2, d < 0.5 ? 6 : 10);
  const b = rnd(2, d < 0.5 ? 6 : 10);
  const emoji = pick(OBJECTS);
  return withWork(
    numQ(`${a} × ${b} = ?`, a * b, undefined, undefined, [
      `${a} × ${b} means ${a} groups of ${b} — like ${a} bowls with ${b} snacks each. (Focus, Dash. FOCUS.)`,
    `Skip count by ${b}, ${a} times: ${skipList(b, a)}.`,
      `Land on ${a * b}. The more you race these, the faster your brain gets — that's the whole game!`,
    ]),
    [
      { text: `${a} × ${b} means ${a} rows of ${b}.`, viz: { kind: "array", rows: a, cols: b, emoji } },
      { text: `Skip count by ${b}: ${skipList(b, a)}.`, viz: { kind: "numberline", from: b, to: a * b, step: b } },
      { text: `So ${a} × ${b} = ${a * b}!`, viz: { kind: "expr", parts: [{ text: `${a} × ${b}` }, { text: "=" }, { text: String(a * b), hot: true }] } },
    ]
  );
}

function divFacts(d: number): Question {
  const b = rnd(2, d < 0.5 ? 6 : 10);
  const q = rnd(2, d < 0.5 ? 6 : 10);
  const emoji = pick(OBJECTS);
  return withWork(
    numQ(`${b * q} ÷ ${b} = ?`, q, undefined, undefined, [
      `Division asks: "how many ${b}s hide inside ${b * q}?"`,
    `Skip count by ${b} until you hit ${b * q}: ${skipList(b, q)}.`,
      `That took ${q} jumps — so ${b * q} ÷ ${b} = ${q}. Division is just multiplication in reverse gear!`,
    ]),
    [
      { text: `Share ${b * q} into groups of ${b}.`, viz: { kind: "groups", total: b * q, per: b, emoji } },
      { text: `That makes ${q} groups — the answer is ${q}!`, viz: { kind: "expr", parts: [{ text: `${b * q} ÷ ${b}` }, { text: "=" }, { text: String(q), hot: true }] } },
    ]
  );
}

function arraysQ(d: number): Question {
  const rows = rnd(2, d < 0.5 ? 3 : 5);
  const cols = rnd(2, d < 0.5 ? 4 : 6);
  const emoji = pick(OBJECTS);
  const visual = Array.from({ length: rows }, () => emoji.repeat(cols)).join("\n");
  return withWork(
    numQ(`${rows} rows of ${cols} — how many in all?`, rows * cols, visual, undefined, [
    `Rows and columns make a grid — count one row: ${cols}.`,
    `There are ${rows} rows, so skip count: ${skipList(cols, rows)}.`,
      `${rows} rows of ${cols} = ${rows} × ${cols} = ${rows * cols}!`,
    ]),
    [
      { text: `Count along the rows: ${skipList(cols, rows)}.`, viz: { kind: "array", rows, cols, emoji } },
      { text: `${rows} × ${cols} = ${rows * cols}!`, viz: { kind: "expr", parts: [{ text: `${rows} × ${cols}` }, { text: "=" }, { text: String(rows * cols), hot: true }] } },
    ]
  );
}

function multiDigitMult(d: number): Question {
  const a = rnd(d < 0.5 ? 11 : 12, d < 0.5 ? 25 : 99);
  const b = rnd(2, d < 0.5 ? 5 : 9);
  const tens = Math.floor(a / 10) * 10;
  const ones = a % 10;
  return withWork(
    numQ(`${a} × ${b} = ?`, a * b, undefined, undefined, [
      `Split the big number! ${a} = ${tens} + ${ones}.`,
    `Multiply each part: ${tens} × ${b} = ${tens * b}, and ${ones} × ${b} = ${ones * b}.`,
      `Add them back together: ${tens * b} + ${ones * b} = ${a * b}. Split, zap, add!`,
    ]),
    [
      { text: `Split ${a} into ${tens} and ${ones}, then multiply each piece.`, viz: { kind: "split", a, b, op: "x" } },
      { text: `Add the two answers: ${tens * b} + ${ones * b} = ${a * b}!`, viz: { kind: "expr", parts: [{ text: `${tens * b} + ${ones * b}` }, { text: "=" }, { text: String(a * b), hot: true }] } },
    ]
  );
}

function longDiv(d: number): Question {
  const b = rnd(2, d < 0.5 ? 6 : 9);
  const q = rnd(d < 0.5 ? 5 : 10, d < 0.5 ? 12 : 25);
  return numQ(`${b * q} ÷ ${b} = ?`, q, undefined, undefined, [
    `Think times-table in reverse: "${b} × WHAT = ${b * q}?"`,
    `Try a smart guess: ${b} × 10 = ${b * 10}. ${b * 10 <= b * q ? "Keep going up from there!" : "Whoa, too big — come down!"}`,
    `${b} × ${q} = ${b * q}, so the answer is ${q}!`,
  ]);
}

function fracCompare(d: number): Question {
  if (d < 0.5) {
    const den = pick([2, 3, 4, 6, 8]);
    const denB = pick([2, 3, 4, 6, 8].filter((x) => x !== den));
    const bigger = den < denB ? den : denB;
    const fa = `1/${den}`;
    const fb = `1/${denB}`;
    const choices = shuffle([fa, fb]);
    return {
      prompt: `Which fraction is BIGGER?`,
      visual: `${fa}   or   ${fb}`,
      choices,
      answer: choices.indexOf(`1/${bigger}`),
      work: [
        { text: `One whole cut into ${den}, another cut into ${denB}.`, viz: { kind: "fraction", bars: [{ num: 1, den, label: `1/${den}` }, { num: 1, den: denB, label: `1/${denB}` }] } },
        { text: `Fewer pieces means BIGGER pieces — 1/${bigger} wins!`, viz: { kind: "fraction", bars: [{ num: 1, den: bigger, label: `1/${bigger} is bigger` }] } },
      ],
      steps: [
        `Imagine one pizza 🍕 cut for ${den} friends, and another cut for ${denB} friends.`,
        `MORE friends = SMALLER slices. Fewer friends = BIGGER slices!`,
        `So 1/${bigger} is the bigger slice. (Always sit at the table with fewer friends. Math says so.)`,
      ],
    };
  }
  const den = pick([4, 6, 8, 10, 12]);
  const a = rnd(1, den - 1);
  let b = rnd(1, den - 1);
  while (b === a) b = rnd(1, den - 1);
  const choices = shuffle([`${a}/${den}`, `${b}/${den}`]);
  return {
    prompt: `Which fraction is BIGGER?`,
    visual: `${a}/${den}   or   ${b}/${den}`,
    choices,
    answer: choices.indexOf(`${Math.max(a, b)}/${den}`),
    work: [
      { text: "Same bottom number means same size pieces.", viz: { kind: "fraction", bars: [{ num: a, den, label: `${a}/${den}` }, { num: b, den, label: `${b}/${den}` }] } },
      { text: `So just count the pieces — ${Math.max(a, b)}/${den} is bigger!`, viz: { kind: "fraction", bars: [{ num: Math.max(a, b), den, label: `${Math.max(a, b)}/${den}` }] } },
    ],
    steps: [
      `Same bottom number (${den}) = the slices are the SAME size.`,
      `So just compare how many slices you get: ${a} vs ${b}.`,
      `${Math.max(a, b)} slices beats ${Math.min(a, b)} — so ${Math.max(a, b)}/${den} wins!`,
    ],
  };
}

function equivFrac(d: number): Question {
  const base: [number, number] = pick([
    [1, 2],
    [1, 3],
    [2, 3],
    [1, 4],
    [3, 4],
  ]);
  const k = rnd(2, d < 0.5 ? 3 : 5);
  const target = `${base[0] * k}/${base[1] * k}`;
  const wrongs = [
    `${base[0] * k + 1}/${base[1] * k}`,
    `${base[0]}/${base[1] * k}`,
    `${base[0] * k}/${base[1] * k + 2}`,
  ];
  const choices = shuffle([target, ...wrongs]);
  return {
    prompt: `Which fraction is EQUAL to ${base[0]}/${base[1]}?`,
    choices,
    answer: choices.indexOf(target),
    work: [
      { text: "Both bars shade the same amount — just cut differently!", viz: { kind: "fraction", bars: [{ num: base[0], den: base[1], label: `${base[0]}/${base[1]}` }, { num: base[0] * k, den: base[1] * k, label: target }] } },
      { text: `Multiply top and bottom by ${k} to get ${target}.`, viz: { kind: "expr", parts: [{ text: `${base[0]}/${base[1]}` }, { text: `× ${k}/${k}` }, { text: "=" }, { text: target, hot: true }] } },
    ],
    steps: [
      `Equal fractions are the same pizza cut into more pieces — same amount of pizza!`,
      `Whatever you do to the top you MUST do to the bottom. Multiply both by ${k}:`,
      `${base[0]} × ${k} = ${base[0] * k}, and ${base[1]} × ${k} = ${base[1] * k} → ${target}!`,
    ],
  };
}

function fracAdd(d: number): Question {
  const den = pick(d < 0.5 ? [4, 6, 8] : [5, 8, 10, 12]);
  const a = rnd(1, den - 2);
  const b = rnd(1, den - a - 1);
  const correct = `${a + b}/${den}`;
  const wrongs = [`${a + b}/${den * 2}`, `${a + b + 1}/${den}`, `${Math.max(1, a + b - 1)}/${den}`].filter(
    (w) => w !== correct
  );
  const choices = shuffle([correct, ...wrongs.slice(0, 3)]);
  return {
    prompt: `${a}/${den} + ${b}/${den} = ?`,
    choices,
    answer: choices.indexOf(correct),
    work: [
      { text: `Shade ${a} pieces, then ${b} more.`, viz: { kind: "fraction", bars: [{ num: a + b, den, label: `${a}/${den} + ${b}/${den}` }] } },
      { text: `That's ${a + b} pieces out of ${den} — the bottom never changes!`, viz: { kind: "fraction", bars: [{ num: a + b, den, label: correct }] } },
    ],
    steps: [
      `Same bottom number? The slices are the SAME, so just ADD THE TOPS.`,
      `${a} slices + ${b} slices = ${a + b} slices.`,
      `The bottom stays ${den} (the slice size never changed!) → ${correct}.`,
    ],
  };
}

function decimalsQ(d: number): Question {
  if (d < 0.5) {
    const whole = rnd(0, 5);
    const tenths = rnd(1, 9);
    const correct = `${whole}.${tenths}`;
    const wrongs = [`${whole}.${(tenths + 1) % 10}`, `${tenths}.${whole}`, `${whole + 1}.${tenths}`];
    const choices = shuffle([correct, ...wrongs]);
    return {
      prompt: `How do you write "${whole} and ${tenths} tenths" as a decimal?`,
      choices,
      answer: choices.indexOf(correct),
      work: [
        { text: `${tenths} tenths shaded out of ten.`, viz: { kind: "fraction", bars: [{ num: tenths, den: 10, label: `${tenths}/10 = 0.${tenths}` }] } },
        { text: `With ${whole} whole${whole === 1 ? "" : "s"} in front: ${correct}`, viz: { kind: "expr", parts: [{ text: String(whole) }, { text: "and" }, { text: `${tenths}/10` }, { text: "=" }, { text: correct, hot: true }] } },
      ],
      steps: [
        `The dot splits wholes from pieces: WHOLES.PIECES`,
        `${whole} wholes go before the dot; ${tenths} tenths go right after it.`,
        `"${whole} and ${tenths} tenths" = ${correct}!`,
      ],
    };
  }
  const a = rnd(1, 89) / 10;
  const b = rnd(1, 89) / 10;
  const ans = Math.round((a + b) * 10) / 10;
  const correct = ans.toFixed(1);
  const wrongs = [(ans + 0.1).toFixed(1), Math.max(0.1, ans - 0.1).toFixed(1), (ans + 1).toFixed(1)];
  const choices = shuffle([correct, ...wrongs]);
  return {
    prompt: `${a.toFixed(1)} + ${b.toFixed(1)} = ?`,
    choices,
    answer: choices.indexOf(correct),
    steps: [
      `Line up the dots! Add tenths to tenths, wholes to wholes.`,
      `Tenths: ${Math.round((a % 1) * 10)} + ${Math.round((b % 1) * 10)} = ${Math.round((a % 1) * 10) + Math.round((b % 1) * 10)} tenths${Math.round((a % 1) * 10) + Math.round((b % 1) * 10) >= 10 ? " — that's more than 10, so one whole carries over!" : "."}`,
      `Total: ${correct}!`,
    ],
  };
}

function orderOps(d: number): Question {
  const a = rnd(2, 6);
  const b = rnd(2, 6);
  const c = rnd(2, 9);
  if (d < 0.5) {
    return withWork(
      numQ(`${c} + ${a} × ${b} = ?`, c + a * b, undefined, undefined, [
        `Rule of the jungle: MULTIPLY before you ADD — × always eats first!`,
      `${a} × ${b} = ${a * b}.`,
        `Now add: ${c} + ${a * b} = ${c + a * b}. (If you add first you get ${(c + a) * b} — the trap!)`,
      ]),
      [
        { text: "Multiplication always goes FIRST.", viz: { kind: "expr", parts: [{ text: `${c} +` }, { text: `${a} × ${b}`, hot: true }] } },
        { text: `${a} × ${b} = ${a * b}, then add ${c} → ${c + a * b}!`, viz: { kind: "expr", parts: [{ text: `${c} + ${a * b}` }, { text: "=" }, { text: String(c + a * b), hot: true }] } },
      ]
    );
  }
  return withWork(
    numQ(`(${c} + ${a}) × ${b} = ?`, (c + a) * b, undefined, undefined, [
      `Parentheses are a VIP room — whatever's inside goes FIRST.`,
    `Inside: ${c} + ${a} = ${c + a}.`,
      `Then multiply: ${c + a} × ${b} = ${(c + a) * b}!`,
    ]),
    [
      { text: "Whatever's inside the brackets goes FIRST.", viz: { kind: "expr", parts: [{ text: `(${c} + ${a})`, hot: true }, { text: `× ${b}` }] } },
      { text: `${c} + ${a} = ${c + a}, then × ${b} = ${(c + a) * b}!`, viz: { kind: "expr", parts: [{ text: `${c + a} × ${b}` }, { text: "=" }, { text: String((c + a) * b), hot: true }] } },
    ]
  );
}

function perimeterArea(d: number): Question {
  const w = rnd(2, d < 0.5 ? 6 : 9);
  const h = rnd(2, d < 0.5 ? 6 : 9);
  const area = Math.random() < 0.5;
  const q = numQ(
    `A rectangle is ${w} wide and ${h} tall. What is its ${area ? "AREA" : "PERIMETER"}?`,
    area ? w * h : 2 * (w + h),
    undefined,
    undefined,
    area
      ? [
          `AREA = the space INSIDE — like counting the tiles on a floor.`,
          `It's a grid: ${h} rows of ${w} tiles → ${w} × ${h}.`,
          `${w} × ${h} = ${w * h} square units!`,
        ]
      : [
          `PERIMETER = walking all the way AROUND the edge (I do laps like this every morning).`,
          `The walk: ${w} + ${h} + ${w} + ${h} — two widths and two heights.`,
          `That's 2 × (${w} + ${h}) = ${2 * (w + h)}!`,
        ]
  );
  return withWork(
    q,
    area
      ? [
          { text: "AREA is the squares INSIDE — count the tiles.", viz: { kind: "rect", w, h, mode: "area" } },
          { text: `${w} × ${h} = ${w * h}!`, viz: { kind: "expr", parts: [{ text: `${w} × ${h}` }, { text: "=" }, { text: String(w * h), hot: true }] } },
        ]
      : [
          { text: "PERIMETER is the walk AROUND the edge.", viz: { kind: "rect", w, h, mode: "perimeter" } },
          { text: `${w} + ${h} + ${w} + ${h} = ${2 * (w + h)}!`, viz: { kind: "expr", parts: [{ text: `2 × (${w} + ${h})` }, { text: "=" }, { text: String(2 * (w + h)), hot: true }] } },
        ]
  );
}

export const MATH_LEVELS: LevelDef[] = [
  {
    n: 1,
    name: "Counting Camp",
    units: [
      { id: "counting", title: "Counting 1–10", emoji: "🔢", gen: countingQ },
      { id: "compare", title: "Bigger & Smaller", emoji: "⚖️", gen: compareQ },
      { id: "add5", title: "Adding to 5", emoji: "➕", gen: addTo5 },
      { id: "shapes", title: "Shapes", emoji: "🔷", gen: () => shapesQ() },
    ],
  },
  {
    n: 2,
    name: "Number Ninjas",
    units: [
      { id: "addsub20", title: "Add & Subtract to 20", emoji: "🥷", gen: addSub20 },
      { id: "missing", title: "Missing Numbers", emoji: "❓", gen: missingNum },
      { id: "tensones", title: "Tens & Ones", emoji: "🧮", gen: tensOnes },
      { id: "skip", title: "Skip Counting", emoji: "🦘", gen: skipCount },
    ],
  },
  {
    n: 3,
    name: "Hundred Heroes",
    units: [
      { id: "addsub100", title: "Add & Subtract to 100", emoji: "💯", gen: addSub100 },
      { id: "money", title: "Money", emoji: "💰", gen: moneyQ },
      { id: "time", title: "Telling Time", emoji: "🕒", gen: clockQ },
      { id: "skip2", title: "Fast Skip Counting", emoji: "⚡", gen: (d) => skipCount(Math.min(1, d + 0.5)) },
    ],
  },
  {
    n: 4,
    name: "Times Table Titans",
    units: [
      { id: "mult", title: "Multiplication Facts", emoji: "✖️", gen: multFacts },
      { id: "div", title: "Division Facts", emoji: "➗", gen: divFacts },
      { id: "arrays", title: "Arrays & Groups", emoji: "🍱", gen: arraysQ },
      { id: "perim", title: "Perimeter & Area", emoji: "📐", gen: perimeterArea },
    ],
  },
  {
    n: 5,
    name: "Fraction Force",
    units: [
      { id: "bigmult", title: "Big Multiplication", emoji: "🚀", gen: multiDigitMult },
      { id: "longdiv", title: "Bigger Division", emoji: "🧩", gen: longDiv },
      { id: "fraccomp", title: "Comparing Fractions", emoji: "🍕", gen: fracCompare },
      { id: "equiv", title: "Equal Fractions", emoji: "🪞", gen: equivFrac },
    ],
  },
  {
    n: 6,
    name: "Decimal Dynamos",
    units: [
      { id: "fracadd", title: "Adding Fractions", emoji: "🍰", gen: fracAdd },
      { id: "decimals", title: "Decimals", emoji: "🔟", gen: decimalsQ },
      { id: "orderops", title: "Order of Operations", emoji: "🎯", gen: orderOps },
      { id: "geometry", title: "Geometry Challenge", emoji: "📏", gen: (d) => perimeterArea(Math.min(1, d + 0.5)) },
    ],
  },
];
