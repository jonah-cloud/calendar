import type { LevelDef, Question } from "../types";
import { numQ, pick, rnd, shuffle } from "../rand";

const OBJECTS = ["🍎", "⭐", "🐶", "🌸", "🎈", "🦋", "🍪", "⚽"];

function countingQ(d: number): Question {
  const max = d < 0.5 ? 6 : 10;
  const n = rnd(1, max);
  const emoji = pick(OBJECTS);
  return numQ(`How many ${emoji} do you see?`, n, emoji.repeat(n));
}

function compareQ(d: number): Question {
  const max = d < 0.5 ? 10 : 30;
  let a = rnd(0, max);
  let b = rnd(0, max);
  while (a === b) b = rnd(0, max);
  const bigger = Math.max(a, b);
  const choices = shuffle([String(a), String(b)]);
  return {
    prompt: `Which number is BIGGER?`,
    visual: `${a}   or   ${b}`,
    choices,
    answer: choices.indexOf(String(bigger)),
  };
}

function addTo5(d: number): Question {
  const a = rnd(0, d < 0.5 ? 3 : 5);
  const b = rnd(0, 5 - a);
  const emoji = pick(OBJECTS);
  return numQ(
    `${a} + ${b} = ?`,
    a + b,
    `${emoji.repeat(Math.max(a, 0))} ${b > 0 ? "+ " + emoji.repeat(b) : ""}`
  );
}

function shapesQ(): Question {
  const shapes: [string, string, number][] = [
    ["circle", "⚪", 0],
    ["square", "🟦", 4],
    ["triangle", "🔺", 3],
    ["rectangle", "▭", 4],
    ["star", "⭐", 5],
    ["heart", "❤️", 0],
  ];
  const [name, glyph] = pick(shapes);
  const wrong = shuffle(shapes.filter(([n]) => n !== name)).slice(0, 3);
  const choices = shuffle([name, ...wrong.map(([n]) => n)]);
  return {
    prompt: `What shape is this?`,
    visual: glyph,
    choices,
    answer: choices.indexOf(name),
  };
}

function addSub20(d: number): Question {
  const sub = Math.random() < 0.5;
  if (sub) {
    const a = rnd(d < 0.5 ? 5 : 10, 20);
    const b = rnd(1, a);
    return numQ(`${a} − ${b} = ?`, a - b);
  }
  const a = rnd(1, d < 0.5 ? 10 : 15);
  const b = rnd(1, 20 - a);
  return numQ(`${a} + ${b} = ?`, a + b);
}

function missingNum(d: number): Question {
  const a = rnd(1, d < 0.5 ? 8 : 12);
  const total = a + rnd(1, d < 0.5 ? 8 : 12);
  return numQ(`${a} + ❓ = ${total}.  What is ❓?`, total - a);
}

function tensOnes(d: number): Question {
  const n = rnd(11, d < 0.5 ? 59 : 99);
  const askTens = Math.random() < 0.5;
  const ans = askTens ? Math.floor(n / 10) : n % 10;
  return numQ(
    `In the number ${n}, what digit is in the ${askTens ? "TENS" : "ONES"} place?`,
    ans
  );
}

function skipCount(d: number): Question {
  const step = pick(d < 0.5 ? [2, 5, 10] : [2, 3, 4, 5, 10]);
  const start = step * rnd(1, 5);
  const seq = [start, start + step, start + step * 2];
  return numQ(`Skip counting: ${seq.join(", ")}, ❓`, start + step * 3);
}

function addSub100(d: number): Question {
  const sub = Math.random() < 0.5;
  if (sub) {
    const a = rnd(d < 0.5 ? 20 : 40, 99);
    const b = rnd(10, a);
    return numQ(`${a} − ${b} = ?`, a - b);
  }
  const a = rnd(10, d < 0.5 ? 40 : 60);
  const b = rnd(10, 99 - a);
  return numQ(`${a} + ${b} = ?`, a + b);
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
    return numQ(`How many cents is a ${name} worth?`, val);
  }
  const picks = [pick(coins), pick(coins)];
  const total = picks[0][1] + picks[1][1];
  return numQ(`A ${picks[0][0]} plus a ${picks[1][0]} = how many cents?`, total);
}

function clockQ(d: number): Question {
  const h = rnd(1, 12);
  if (d < 0.5) {
    return {
      ...numQ(`The clock shows ${h}:00. What hour is it?`, h, "🕒"),
    };
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
  ]).filter((w) => w !== correct).slice(0, 3);
  const choices = shuffle([correct, ...wrongs]);
  return {
    prompt: `The clock shows ${h}:${mins}. What time is that?`,
    visual: "🕒",
    choices,
    answer: choices.indexOf(correct),
  };
}

function multFacts(d: number): Question {
  const a = rnd(2, d < 0.5 ? 6 : 10);
  const b = rnd(2, d < 0.5 ? 6 : 10);
  return numQ(`${a} × ${b} = ?`, a * b);
}

function divFacts(d: number): Question {
  const b = rnd(2, d < 0.5 ? 6 : 10);
  const q = rnd(2, d < 0.5 ? 6 : 10);
  return numQ(`${b * q} ÷ ${b} = ?`, q);
}

function arraysQ(d: number): Question {
  const rows = rnd(2, d < 0.5 ? 3 : 5);
  const cols = rnd(2, d < 0.5 ? 4 : 6);
  const emoji = pick(OBJECTS);
  const visual = Array.from({ length: rows }, () => emoji.repeat(cols)).join("\n");
  return numQ(`${rows} rows of ${cols} — how many in all?`, rows * cols, visual);
}

function multiDigitMult(d: number): Question {
  const a = rnd(d < 0.5 ? 11 : 12, d < 0.5 ? 25 : 99);
  const b = rnd(2, d < 0.5 ? 5 : 9);
  return numQ(`${a} × ${b} = ?`, a * b);
}

function longDiv(d: number): Question {
  const b = rnd(2, d < 0.5 ? 6 : 9);
  const q = rnd(d < 0.5 ? 5 : 10, d < 0.5 ? 12 : 25);
  return numQ(`${b * q} ÷ ${b} = ?`, q);
}

function fracCompare(d: number): Question {
  if (d < 0.5) {
    const den = pick([2, 3, 4, 6, 8]);
    const pairA: [number, number] = [1, den];
    const pairB: [number, number] = [1, pick([2, 3, 4, 6, 8].filter((x) => x !== den))];
    const bigger = 1 / pairA[1] > 1 / pairB[1] ? pairA : pairB;
    const fa = `${pairA[0]}/${pairA[1]}`;
    const fb = `${pairB[0]}/${pairB[1]}`;
    const choices = shuffle([fa, fb]);
    return {
      prompt: `Which fraction is BIGGER?`,
      visual: `${fa}   or   ${fb}`,
      choices,
      answer: choices.indexOf(`${bigger[0]}/${bigger[1]}`),
      explain: "Smaller bottom number = bigger pieces!",
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
    explain: `Multiply top and bottom by ${k}.`,
  };
}

function fracAdd(d: number): Question {
  const den = pick(d < 0.5 ? [4, 6, 8] : [5, 8, 10, 12]);
  const a = rnd(1, den - 2);
  const b = rnd(1, den - a - 1);
  const correct = `${a + b}/${den}`;
  const wrongs = [`${a + b}/${den * 2}`, `${a + b + 1}/${den}`, `${Math.max(1, a + b - 1)}/${den}`];
  const choices = shuffle([correct, ...wrongs.filter((w) => w !== correct).slice(0, 3)]);
  return {
    prompt: `${a}/${den} + ${b}/${den} = ?`,
    choices,
    answer: choices.indexOf(correct),
    explain: "Same bottom number: just add the tops!",
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
    };
  }
  const a = rnd(1, 89) / 10;
  const b = rnd(1, 89) / 10;
  const ans = Math.round((a + b) * 10) / 10;
  const correct = ans.toFixed(1);
  const wrongs = [(ans + 0.1).toFixed(1), (Math.max(0.1, ans - 0.1)).toFixed(1), (ans + 1).toFixed(1)];
  const choices = shuffle([correct, ...wrongs]);
  return {
    prompt: `${a.toFixed(1)} + ${b.toFixed(1)} = ?`,
    choices,
    answer: choices.indexOf(correct),
  };
}

function orderOps(d: number): Question {
  const a = rnd(2, 6);
  const b = rnd(2, 6);
  const c = rnd(2, 9);
  if (d < 0.5) {
    return numQ(`${c} + ${a} × ${b} = ?`, c + a * b, undefined, "Multiply first, then add!");
  }
  return numQ(`(${c} + ${a}) × ${b} = ?`, (c + a) * b, undefined, "Parentheses first!");
}

function perimeterArea(d: number): Question {
  const w = rnd(2, d < 0.5 ? 6 : 9);
  const h = rnd(2, d < 0.5 ? 6 : 9);
  const area = Math.random() < 0.5;
  return numQ(
    `A rectangle is ${w} wide and ${h} tall. What is its ${area ? "AREA" : "PERIMETER"}?`,
    area ? w * h : 2 * (w + h),
    "▭",
    area ? "Area = width × height" : "Perimeter = add up all 4 sides"
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
