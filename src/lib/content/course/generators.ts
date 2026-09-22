/**
 * Question generators for the course-book track, covering the Good & Beautiful
 * Math 1 and Math 2 scope. These complement the generators already used by the
 * speed missions (exported from ../math).
 */
import { numQ, pick, rnd, shuffle } from "../../rand";
import type { Question } from "../../types";
import type { WorkStep } from "../../viz";

const OBJ = ["🍎", "⭐", "🐶", "🌸", "🎈", "🦋", "🍪", "⚽", "🐞", "🌻"];

function wq(q: Question, work: WorkStep[]): Question {
  q.work = work;
  return q;
}

const seq = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

/* ---------------- counting & number sense ---------------- */

export function countSequence(d: number): Question {
  const max = d < 0.4 ? 20 : d < 0.7 ? 60 : 110;
  const start = rnd(1, max - 4);
  const run = seq(start, start + 2);
  const ans = start + 3;
  return wq(
    numQ(`Keep counting: ${run.join(", ")}, ❓`, ans, undefined, undefined, [
      `Say them out loud: ${run.join(", ")}…`,
      `The next number is always one MORE. ${run[2]} + 1 = ${ans}.`,
    ]),
    [
      { text: "Counting means adding one more each time.", viz: { kind: "numberline", from: start, to: ans, step: 1 } },
      { text: `So after ${run[2]} comes ${ans}!`, viz: { kind: "expr", parts: [{ text: `${run[2]} + 1` }, { text: "=" }, { text: String(ans), hot: true }] } },
    ]
  );
}

export function countBack(d: number): Question {
  const max = d < 0.5 ? 20 : 50;
  const start = rnd(5, max);
  const run = [start, start - 1, start - 2];
  const ans = start - 3;
  return wq(
    numQ(`Counting backwards: ${run.join(", ")}, ❓`, ans, undefined, undefined, [
      `Going backwards means one LESS each time.`,
      `${run[2]} − 1 = ${ans}.`,
    ]),
    [{ text: "Backwards means one less each hop.", viz: { kind: "numberline", from: ans, to: start, step: 1 } }]
  );
}

export function ordinalQ(): Question {
  const words = ["first", "second", "third", "fourth", "fifth", "sixth"];
  const n = rnd(0, 5);
  const emoji = pick(OBJ);
  const row = Array.from({ length: 6 }, (_, i) => (i === n ? "⬇️" : "　")).join("");
  const choices = shuffle(words.slice(0, 6)).slice(0, 4);
  if (!choices.includes(words[n])) choices[0] = words[n];
  const shuffled = shuffle(choices);
  return {
    prompt: `Which one is the arrow pointing to?`,
    visual: `${row}\n${emoji.repeat(6)}`,
    choices: shuffled,
    answer: shuffled.indexOf(words[n]),
    steps: [
      "Ordinal words tell you the POSITION in a line.",
      `Count from the left: ${words.slice(0, n + 1).join(", ")}.`,
    ],
    work: [
      { text: `Count along from the left: ${words.slice(0, n + 1).join(", ")}.`, viz: { kind: "count", emoji, n: n + 1 } },
      { text: `The arrow points at the ${words[n]} one!`, viz: { kind: "expr", parts: [{ text: words[n], hot: true }] } },
    ],
  };
}

export function oddEvenQ(d: number): Question {
  const n = rnd(1, d < 0.5 ? 20 : 99);
  const even = n % 2 === 0;
  const choices = ["even", "odd"];
  return {
    prompt: `Is ${n} odd or even?`,
    choices,
    answer: choices.indexOf(even ? "even" : "odd"),
    steps: [
      "Even numbers can split into two equal teams. Odd numbers always have one left over.",
      `Look at the LAST digit: ${n % 10}. 0, 2, 4, 6, 8 are even — 1, 3, 5, 7, 9 are odd.`,
      `${n} ends in ${n % 10}, so it is ${even ? "even" : "odd"}.`,
    ],
    work: [
      { text: `Try to make two equal teams out of ${Math.min(n, 12)}.`, viz: { kind: "groups", total: even ? Math.min(n, 12) : Math.min(n, 11) + 1, per: 2, emoji: "🔵" } },
      { text: `Only the last digit matters. ${n} ends in ${n % 10} → ${even ? "EVEN" : "ODD"}.`, viz: { kind: "expr", parts: [{ text: String(n) }, { text: "is" }, { text: even ? "even" : "odd", hot: true }] } },
    ],
  };
}

export function numberBondQ(d: number): Question {
  const total = d < 0.5 ? pick([5, 6, 7, 8, 9, 10]) : pick([10, 12, 15, 20]);
  const a = rnd(1, total - 1);
  const b = total - a;
  return wq(
    numQ(`${a} and ❓ make ${total}. What is ❓?`, b, undefined, undefined, [
      `A number bond shows the two parts that build a whole.`,
      `The whole is ${total}. One part is ${a}.`,
      `${total} − ${a} = ${b}, so the missing part is ${b}.`,
    ]),
    [
      { text: `${total} splits into two parts.`, viz: { kind: "addObjects", emoji: "🔵", a, b } },
      { text: `${a} and ${b} make ${total}!`, viz: { kind: "expr", parts: [{ text: `${a} +` }, { text: String(b), hot: true }, { text: `= ${total}` }] } },
    ]
  );
}

export function doublesQ(d: number): Question {
  const n = rnd(1, d < 0.5 ? 6 : 12);
  const near = d > 0.6 && Math.random() < 0.5;
  if (near) {
    return wq(
      numQ(`${n} + ${n + 1} = ?`, n + n + 1, undefined, undefined, [
        `This is a near-double! You already know ${n} + ${n} = ${n * 2}.`,
        `${n + 1} is just one more, so add one: ${n * 2} + 1 = ${n * 2 + 1}.`,
      ]),
      [
        { text: `Start with the double you know: ${n} + ${n} = ${n * 2}.`, viz: { kind: "addObjects", emoji: "🔵", a: n, b: n, showTotal: true } },
        { text: `One more makes ${n * 2 + 1}!`, viz: { kind: "expr", parts: [{ text: `${n * 2} + 1` }, { text: "=" }, { text: String(n * 2 + 1), hot: true }] } },
      ]
    );
  }
  return wq(
    numQ(`${n} + ${n} = ?`, n * 2, undefined, undefined, [
      `Doubles are twins — the same number twice!`,
      `${n} and another ${n} makes ${n * 2}.`,
    ]),
    [{ text: `Two equal groups of ${n}.`, viz: { kind: "addObjects", emoji: "🔵", a: n, b: n, showTotal: true } }]
  );
}

export function factFamilyQ(d: number): Question {
  const a = rnd(2, d < 0.5 ? 6 : 12);
  const b = rnd(2, d < 0.5 ? 6 : 12);
  const total = a + b;
  const correct = `${total} − ${a} = ${b}`;
  const wrongs = [`${total} + ${a} = ${b}`, `${a} − ${b} = ${total}`, `${total} − ${b} = ${a + 1}`];
  const choices = shuffle([correct, ...wrongs]);
  return {
    prompt: `You know ${a} + ${b} = ${total}. Which fact is in the SAME family?`,
    choices,
    answer: choices.indexOf(correct),
    steps: [
      `A fact family uses the same three numbers: ${a}, ${b} and ${total}.`,
      `Addition undone is subtraction: ${total} − ${a} = ${b}.`,
    ],
    work: [
      { text: `The family is built from ${a}, ${b} and ${total}.`, viz: { kind: "addObjects", emoji: "🔵", a, b, showTotal: true } },
      { text: `Take one part away and the other part is left.`, viz: { kind: "expr", parts: [{ text: `${total} − ${a}` }, { text: "=" }, { text: String(b), hot: true }] } },
    ],
  };
}

export function tenMoreLessQ(d: number): Question {
  const n = rnd(10, d < 0.5 ? 60 : 89);
  const more = Math.random() < 0.5;
  const ans = more ? n + 10 : n - 10;
  return wq(
    numQ(`What is 10 ${more ? "MORE" : "LESS"} than ${n}?`, ans, undefined, undefined, [
      `Adding or taking ten only changes the TENS digit.`,
      `${n} → ${ans}. The ones digit stays ${n % 10}!`,
    ]),
    [
      { text: `${n} is ${Math.floor(n / 10)} tens and ${n % 10} ones.`, viz: { kind: "place", n } },
      { text: `${more ? "Add" : "Take away"} one ten — the ones never change.`, viz: { kind: "place", n: ans, ask: "tens" } },
    ]
  );
}

export function teenPlaceQ(): Question {
  const n = rnd(11, 19);
  return wq(
    numQ(`${n} is 10 and how many more?`, n - 10, undefined, undefined, [
      `Every teen number is a full ten plus some ones.`,
      `${n} = 10 + ${n - 10}.`,
    ]),
    [
      { text: `Fill a ten first, then count the extras.`, viz: { kind: "tenframe", filled: 10, extra: n - 10 } },
      { text: `${n} is 10 and ${n - 10}!`, viz: { kind: "expr", parts: [{ text: "10 +" }, { text: String(n - 10), hot: true }, { text: `= ${n}` }] } },
    ]
  );
}

/* ---------------- patterns, graphs, calendar ---------------- */

export function patternQ(d: number): Question {
  const useShapes = Math.random() < 0.5;
  if (useShapes) {
    const a = pick(["🔺", "⭐", "🔵", "❤️"]);
    let b = pick(["🟦", "🌸", "🟡", "🍀"]);
    const core = d < 0.5 ? [a, b] : [a, a, b];
    const shown = [...core, ...core, ...core].slice(0, 6);
    const ans = [...core, ...core, ...core][6];
    const choices = shuffle([a, b, "🟣", "⬛"]).slice(0, 3);
    if (!choices.includes(ans)) choices[0] = ans;
    const sh = shuffle(choices);
    return {
      prompt: `What comes next in the pattern?`,
      visual: shown.join(" ") + " ❓",
      choices: sh,
      answer: sh.indexOf(ans),
      steps: [`Find the part that repeats: ${core.join(" ")}.`, `Say it out loud over and over — the next one is ${ans}.`],
      work: [{ text: `The repeating part is ${core.join(" ")}.`, viz: { kind: "expr", parts: core.map((c) => ({ text: c, hot: true })) } }],
    };
  }
  const step = pick([2, 5, 10, 3]);
  const start = step * rnd(1, 4);
  const shown = [start, start + step, start + step * 2];
  return wq(
    numQ(`What comes next: ${shown.join(", ")}, ❓`, start + step * 3, undefined, undefined, [
      `Look at the jump between numbers: it is ${step} each time.`,
      `${shown[2]} + ${step} = ${start + step * 3}.`,
    ]),
    [{ text: `Each jump adds ${step}.`, viz: { kind: "numberline", from: start, to: start + step * 3, step } }]
  );
}

export function pictographQ(d: number): Question {
  const items: [string, number][] = [
    ["🍎", rnd(2, 7)],
    ["🍌", rnd(2, 7)],
    ["🍇", rnd(2, 7)],
  ];
  const mode = Math.random();
  const most = items.reduce((m, x) => (x[1] > m[1] ? x : m));
  const least = items.reduce((m, x) => (x[1] < m[1] ? x : m));
  const visual = items.map(([e, n]) => `${e}  ${"🟩".repeat(n)}  ${n}`).join("\n");
  if (mode < 0.4) {
    const choices = shuffle(items.map(([e]) => e));
    return {
      prompt: `Which fruit got the MOST votes?`,
      visual,
      choices,
      answer: choices.indexOf(most[0]),
      steps: ["Find the longest row — that is the most.", `${most[0]} has ${most[1]}, which is the biggest number.`],
    };
  }
  if (mode < 0.7) {
    const target = pick(items);
    return wq(
      numQ(`How many votes did ${target[0]} get?`, target[1], visual, undefined, [
        `Count the squares in that row.`,
        `${target[0]} has ${target[1]}.`,
      ]),
      [{ text: "Count along that row.", viz: { kind: "count", emoji: "🟩", n: target[1] } }]
    );
  }
  const diff = most[1] - least[1];
  return wq(
    numQ(`How many MORE votes did ${most[0]} get than ${least[0]}?`, diff, visual, undefined, [
      `${most[0]} has ${most[1]} and ${least[0]} has ${least[1]}.`,
      `"How many more" means subtract: ${most[1]} − ${least[1]} = ${diff}.`,
    ]),
    [{ text: `Compare the two rows: ${most[1]} versus ${least[1]}.`, viz: { kind: "numberline", from: least[1], to: most[1], step: 1 } }]
  );
}

export function calendarQ(): Question {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const mode = Math.random();
  if (mode < 0.4) {
    const i = rnd(0, 6);
    const choices = shuffle(days).slice(0, 4);
    if (!choices.includes(days[(i + 1) % 7])) choices[0] = days[(i + 1) % 7];
    const sh = shuffle(choices);
    return {
      prompt: `What day comes after ${days[i]}?`,
      choices: sh,
      answer: sh.indexOf(days[(i + 1) % 7]),
      steps: ["The week always goes in the same order.", days.join(", ") + " — then it starts over."],
    };
  }
  if (mode < 0.7) {
    const i = rnd(0, 11);
    const choices = shuffle(months).slice(0, 4);
    if (!choices.includes(months[(i + 1) % 12])) choices[0] = months[(i + 1) % 12];
    const sh = shuffle(choices);
    return {
      prompt: `Which month comes after ${months[i]}?`,
      choices: sh,
      answer: sh.indexOf(months[(i + 1) % 12]),
      steps: ["There are 12 months in a year, always in the same order."],
    };
  }
  return wq(numQ(`How many days are in one week?`, 7, undefined, undefined, ["Count them: " + days.join(", "), "That is 7 days."]), [
    { text: "Count the days of the week.", viz: { kind: "count", emoji: "📅", n: 7 } },
  ]);
}

/* ---------------- measurement, time, money ---------------- */

export function measureQ(d: number): Question {
  if (d < 0.45) {
    const units = rnd(3, 9);
    return wq(
      numQ(`How many paperclips long is the pencil?`, units, `✏️${"▬".repeat(0)}\n${"📎".repeat(units)}`, undefined, [
        "Line the paperclips up end to end with no gaps.",
        `Count them: that is ${units} paperclips.`,
      ]),
      [{ text: "Count the units end to end.", viz: { kind: "count", emoji: "📎", n: units } }]
    );
  }
  const inches = rnd(2, 11);
  const askFeet = d > 0.75 && Math.random() < 0.4;
  if (askFeet) {
    return wq(
      numQ(`How many inches are in 1 foot?`, 12, "📏", undefined, ["A ruler is one foot long.", "One foot = 12 inches."]),
      [{ text: "One foot is twelve inches.", viz: { kind: "expr", parts: [{ text: "1 foot" }, { text: "=" }, { text: "12 inches", hot: true }] } }]
    );
  }
  return wq(
    numQ(`The ribbon reaches the ${inches} mark on the ruler. How long is it?`, inches, "📏", undefined, [
      "Always start measuring at 0, not at the end of the ruler.",
      `It stops at ${inches}, so it is ${inches} inches long.`,
    ]),
    [{ text: `Start at zero and read where it stops.`, viz: { kind: "numberline", from: 0, to: inches, step: Math.max(1, Math.floor(inches / 4)) } }]
  );
}

export function timeFiveMinQ(d: number): Question {
  const h = rnd(1, 12);
  const m = pick(d < 0.5 ? [0, 15, 30, 45] : [5, 10, 20, 25, 35, 40, 50, 55]);
  const correct = `${h}:${String(m).padStart(2, "0")}`;
  const wrongs = [
    `${h}:${String((m + 5) % 60).padStart(2, "0")}`,
    `${(h % 12) + 1}:${String(m).padStart(2, "0")}`,
    `${h}:${String((m + 30) % 60).padStart(2, "0")}`,
  ].filter((x) => x !== correct);
  const choices = shuffle([correct, ...wrongs.slice(0, 3)]);
  return {
    prompt: `What time does the clock show?`,
    choices,
    answer: choices.indexOf(correct),
    steps: [
      "The SHORT hand gives the hour. The LONG hand gives the minutes.",
      "Count the minutes by 5s around the clock.",
      `This clock says ${correct}.`,
    ],
    work: [
      { text: "Short hand = hour, long hand = minutes.", viz: { kind: "clock", h, m } },
      { text: `Counting by fives lands on ${m} minutes → ${correct}.`, viz: { kind: "clock", h, m } },
    ],
  };
}

export function elapsedQ(d: number): Question {
  const h = rnd(1, 10);
  const add = pick([1, 2, 3]);
  return wq(
    numQ(`It is ${h} o'clock. What time will it be in ${add} hour${add > 1 ? "s" : ""}?`, ((h + add - 1) % 12) + 1, undefined, undefined, [
      "Count forward on the clock, one hour at a time.",
      `${h} + ${add} = ${((h + add - 1) % 12) + 1} o'clock.`,
    ]),
    [
      { text: `Start at ${h} o'clock.`, viz: { kind: "clock", h, m: 0 } },
      { text: `${add} hour${add > 1 ? "s" : ""} later.`, viz: { kind: "clock", h: ((h + add - 1) % 12) + 1, m: 0 } },
    ]
  );
}

export function coinCountQ(d: number): Question {
  const pool = d < 0.5 ? [10, 5, 1] : [25, 10, 5, 1];
  const n = d < 0.5 ? rnd(2, 3) : rnd(3, 4);
  const values = Array.from({ length: n }, () => pick(pool)).sort((a, b) => b - a);
  const total = values.reduce((a, b) => a + b, 0);
  return wq(
    numQ(`How much money is this?`, total, undefined, undefined, [
      "Start with the biggest coin and count on.",
      `That makes ${total} cents.`,
    ]),
    [{ text: "Start big, then count on.", viz: { kind: "coins", values } }]
  );
}

export function makeChangeQ(d: number): Question {
  const price = rnd(2, d < 0.5 ? 9 : 24) * (d < 0.5 ? 5 : 1);
  const paid = price <= 25 ? 25 : 50;
  const change = paid - price;
  return wq(
    numQ(`A sticker costs ${price}¢. You pay ${paid}¢. How much change?`, change, undefined, undefined, [
      "Change is what's left over after you pay.",
      `Count up from ${price} to ${paid}.`,
      `${paid} − ${price} = ${change}¢.`,
    ]),
    [
      { text: `Count up from the price to what you paid.`, viz: { kind: "numberline", from: price, to: paid, step: Math.max(1, Math.round(change / 4)) } },
      { text: `That is ${change}¢ change.`, viz: { kind: "expr", parts: [{ text: `${paid} − ${price}` }, { text: "=" }, { text: `${change}¢`, hot: true }] } },
    ]
  );
}

/* ---------------- 2- and 3-digit computation ---------------- */

export function add2DigitQ(d: number): Question {
  const regroup = d > 0.5;
  let a: number, b: number;
  if (regroup) {
    a = rnd(15, 78);
    b = rnd(10, 90 - a > 9 ? 90 - a : 15);
    if ((a % 10) + (b % 10) < 10) b += 10 - ((a % 10) + (b % 10));
  } else {
    a = rnd(11, 44);
    b = rnd(11, 44);
    if ((a % 10) + (b % 10) > 9) b -= (a % 10) + (b % 10) - 9;
  }
  const sum = a + b;
  const bt = Math.floor(b / 10) * 10;
  return wq(
    numQ(`${a} + ${b} = ?`, sum, undefined, undefined, [
      `Break ${b} into ${bt} and ${b - bt}.`,
      `Add the tens: ${a} + ${bt} = ${a + bt}.`,
      `Then the ones: ${a + bt} + ${b - bt} = ${sum}.`,
    ]),
    [
      { text: `${a} is ${Math.floor(a / 10)} tens and ${a % 10} ones.`, viz: { kind: "place", n: a } },
      { text: `Add the tens first: ${a} + ${bt} = ${a + bt}.`, viz: { kind: "expr", parts: [{ text: `${a} + ${bt}` }, { text: "=" }, { text: String(a + bt), hot: true }] } },
      { text: `Now the ones: ${a + bt} + ${b - bt} = ${sum}.`, viz: { kind: "expr", parts: [{ text: `${a + bt} + ${b - bt}` }, { text: "=" }, { text: String(sum), hot: true }] } },
    ]
  );
}

export function sub2DigitQ(d: number): Question {
  const a = rnd(d < 0.5 ? 25 : 40, 99);
  const b = rnd(10, a - 5);
  const diff = a - b;
  const bt = Math.floor(b / 10) * 10;
  return wq(
    numQ(`${a} − ${b} = ?`, diff, undefined, undefined, [
      `Take away the tens first: ${a} − ${bt} = ${a - bt}.`,
      `Then take away the ones: ${a - bt} − ${b - bt} = ${diff}.`,
    ]),
    [
      { text: `Break ${b} into ${bt} and ${b - bt}.`, viz: { kind: "expr", parts: [{ text: String(b) }, { text: "=" }, { text: String(bt), hot: true }, { text: "+" }, { text: String(b - bt), hot: true }] } },
      { text: `Tens first: ${a} − ${bt} = ${a - bt}.`, viz: { kind: "expr", parts: [{ text: `${a} − ${bt}` }, { text: "=" }, { text: String(a - bt), hot: true }] } },
      { text: `Then the ones → ${diff}.`, viz: { kind: "expr", parts: [{ text: `${a - bt} − ${b - bt}` }, { text: "=" }, { text: String(diff), hot: true }] } },
    ]
  );
}

export function place100Q(d: number): Question {
  const n = rnd(101, 989);
  const which = pick(["hundreds", "tens", "ones"] as const);
  const digit = which === "hundreds" ? Math.floor(n / 100) : which === "tens" ? Math.floor((n / 10) % 10) : n % 10;
  return wq(
    numQ(`In ${n}, which digit is in the ${which.toUpperCase()} place?`, digit, undefined, undefined, [
      `Read the number in three parts: hundreds, tens, ones.`,
      `${n} = ${Math.floor(n / 100)} hundreds, ${Math.floor((n / 10) % 10)} tens, ${n % 10} ones.`,
    ]),
    [
      { text: `${n} = ${Math.floor(n / 100)} hundreds + ${Math.floor((n / 10) % 10)} tens + ${n % 10} ones.`, viz: { kind: "expr", parts: [{ text: `${Math.floor(n / 100)}00` }, { text: "+" }, { text: `${Math.floor((n / 10) % 10)}0` }, { text: "+" }, { text: String(n % 10) }] } },
      { text: `The ${which} digit is ${digit}.`, viz: { kind: "expr", parts: [{ text: String(digit), hot: true }] } },
    ]
  );
}

export function roundQ(d: number): Question {
  const n = rnd(11, d < 0.5 ? 99 : 989);
  const toTen = d < 0.5 || n < 100;
  const ans = toTen ? Math.round(n / 10) * 10 : Math.round(n / 100) * 100;
  const look = toTen ? n % 10 : Math.floor((n / 10) % 10);
  return wq(
    numQ(`Round ${n} to the nearest ${toTen ? "TEN" : "HUNDRED"}.`, ans, undefined, undefined, [
      `Look at the digit to the right: ${look}.`,
      `5 or more rounds UP, 4 or less rounds DOWN.`,
      `So ${n} rounds to ${ans}.`,
    ]),
    [
      { text: `Which ${toTen ? "ten" : "hundred"} is ${n} closest to?`, viz: { kind: "numberline", from: toTen ? Math.floor(n / 10) * 10 : Math.floor(n / 100) * 100, to: toTen ? Math.ceil(n / 10) * 10 : Math.ceil(n / 100) * 100, step: toTen ? 5 : 50 } },
      { text: `${look} means round ${look >= 5 ? "UP" : "DOWN"} → ${ans}.`, viz: { kind: "expr", parts: [{ text: String(n) }, { text: "→" }, { text: String(ans), hot: true }] } },
    ]
  );
}

/* ---------------- multiplication & division intro ---------------- */

export function repeatedAddQ(d: number): Question {
  const groups = rnd(2, d < 0.5 ? 4 : 6);
  const per = rnd(2, d < 0.5 ? 5 : 9);
  const emoji = pick(OBJ);
  return wq(
    numQ(`${groups} groups of ${per} — how many altogether?`, groups * per, undefined, undefined, [
      `Equal groups can be added: ${Array(groups).fill(per).join(" + ")}.`,
      `That is the same as ${groups} × ${per} = ${groups * per}.`,
    ]),
    [
      { text: `${groups} equal groups of ${per}.`, viz: { kind: "groups", total: groups * per, per, emoji } },
      { text: `Adding them up: ${Array(groups).fill(per).join(" + ")} = ${groups * per}.`, viz: { kind: "array", rows: groups, cols: per, emoji } },
      { text: `The fast way to write it: ${groups} × ${per} = ${groups * per}.`, viz: { kind: "expr", parts: [{ text: `${groups} × ${per}` }, { text: "=" }, { text: String(groups * per), hot: true }] } },
    ]
  );
}

export function shareEquallyQ(d: number): Question {
  const groups = rnd(2, d < 0.5 ? 4 : 6);
  const per = rnd(2, d < 0.5 ? 5 : 8);
  const emoji = pick(OBJ);
  return wq(
    numQ(`Share ${groups * per} ${emoji} equally between ${groups} friends. How many each?`, per, undefined, undefined, [
      `Deal them out one at a time, like cards.`,
      `${groups * per} shared into ${groups} groups gives ${per} each.`,
    ]),
    [
      { text: `Deal them into ${groups} equal groups.`, viz: { kind: "groups", total: groups * per, per, emoji } },
      { text: `Each friend gets ${per}.`, viz: { kind: "expr", parts: [{ text: `${groups * per} ÷ ${groups}` }, { text: "=" }, { text: String(per), hot: true }] } },
    ]
  );
}

/* ---------------- fractions & geometry ---------------- */

export function fractionNameQ(d: number): Question {
  const den = pick(d < 0.5 ? [2, 4] : [2, 3, 4, 6, 8]);
  const num = rnd(1, den - 1);
  const names: Record<number, string> = { 2: "half", 3: "third", 4: "fourth", 6: "sixth", 8: "eighth" };
  const correct = `${num}/${den}`;
  const wrongs = [`${den}/${num}`, `${num}/${den + 1}`, `${num + 1}/${den}`].filter((x) => x !== correct);
  const choices = shuffle([correct, ...wrongs.slice(0, 3)]);
  return {
    prompt: `What fraction is shaded?`,
    choices,
    answer: choices.indexOf(correct),
    steps: [
      `The BOTTOM number is how many equal pieces the whole was cut into: ${den}.`,
      `The TOP number is how many are shaded: ${num}.`,
      `So it is ${num} ${names[den]}${num > 1 ? "s" : ""} — ${correct}.`,
    ],
    work: [
      { text: `The whole is cut into ${den} equal pieces.`, viz: { kind: "fraction", bars: [{ num, den, label: `${num} of ${den} shaded` }] } },
      { text: `${num} shaded out of ${den} → ${correct}.`, viz: { kind: "expr", parts: [{ text: correct, hot: true }] } },
    ],
  };
}

export function fractionOfSetQ(d: number): Question {
  const den = pick([2, 3, 4]);
  const per = rnd(2, d < 0.5 ? 4 : 6);
  const total = den * per;
  const emoji = pick(OBJ);
  return wq(
    numQ(`What is 1/${den} of ${total} ${emoji}?`, per, undefined, undefined, [
      `1/${den} means split into ${den} equal groups and take ONE group.`,
      `${total} split into ${den} groups is ${per} each.`,
    ]),
    [
      { text: `Split ${total} into ${den} equal groups.`, viz: { kind: "groups", total, per, emoji } },
      { text: `One group is ${per}.`, viz: { kind: "expr", parts: [{ text: `1/${den} of ${total}` }, { text: "=" }, { text: String(per), hot: true }] } },
    ]
  );
}

export function shape3dQ(): Question {
  const shapes: [string, string, string][] = [
    ["sphere", "⚽", "perfectly round, like a ball"],
    ["cube", "🎲", "6 square faces, like a dice"],
    ["cone", "🍦", "a circle bottom and one point"],
    ["cylinder", "🥫", "two circle ends, like a can"],
  ];
  const [name, glyph, hint] = pick(shapes);
  const choices = shuffle(shapes.map(([n]) => n)).slice(0, 4);
  if (!choices.includes(name)) choices[0] = name;
  const sh = shuffle(choices);
  return {
    prompt: `What 3D shape is this?`,
    visual: glyph,
    choices: sh,
    answer: sh.indexOf(name),
    steps: [`A ${name} is ${hint}.`, "3D shapes are solid — you can hold them!"],
  };
}

export function sidesVerticesQ(): Question {
  const shapes: [string, string, number][] = [
    ["triangle", "🔺", 3],
    ["square", "🟦", 4],
    ["rectangle", "▭", 4],
    ["pentagon", "⬠", 5],
    ["hexagon", "⬡", 6],
  ];
  const [name, glyph, sides] = pick(shapes);
  const askVertices = Math.random() < 0.5;
  return wq(
    numQ(`How many ${askVertices ? "corners (vertices)" : "sides"} does a ${name} have?`, sides, glyph, undefined, [
      `Count carefully around the shape.`,
      `A ${name} has ${sides} sides AND ${sides} corners — they always match!`,
    ]),
    [{ text: `Count around the ${name}.`, viz: { kind: "count", emoji: "🔹", n: sides } }]
  );
}

export function symmetryQ(): Question {
  const symmetric: [string, string][] = [["❤️", "heart"], ["🦋", "butterfly"], ["⭐", "star"], ["🟦", "square"]];
  const notSym: [string, string][] = [["🦶", "footprint"], ["🎸", "guitar"], ["🍕", "pizza slice"], ["🐌", "snail"]];
  const useSym = Math.random() < 0.5;
  const [glyph, name] = useSym ? pick(symmetric) : pick(notSym);
  const choices = ["yes, it has a line of symmetry", "no, it does not"];
  return {
    prompt: `Can you fold this ${name} so both halves match exactly?`,
    visual: glyph,
    choices,
    answer: useSym ? 0 : 1,
    steps: [
      "A line of symmetry folds a shape into two matching halves.",
      useSym ? `A ${name} folds perfectly down the middle.` : `A ${name} does not match up when you fold it.`,
    ],
  };
}

/* ---------------- word problems ---------------- */

const NAMES = ["Hallie", "Scarlette", "Mia", "Ava", "Leo", "Sam"];

export function storyProblemQ(d: number): Question {
  const name = pick(NAMES);
  const emoji = pick(OBJ);
  const add = Math.random() < 0.5;
  const a = rnd(2, d < 0.5 ? 9 : 40);
  const b = rnd(1, d < 0.5 ? 9 : 30);
  if (add) {
    return wq(
      numQ(`${name} had ${a} ${emoji}. She found ${b} more. How many now?`, a + b, undefined, undefined, [
        `"More" means we ADD.`,
        `${a} + ${b} = ${a + b}.`,
      ]),
      [
        { text: `She starts with ${a} and gains ${b}.`, viz: { kind: "addObjects", emoji, a: Math.min(a, 10), b: Math.min(b, 10) } },
        { text: `${a} + ${b} = ${a + b}.`, viz: { kind: "expr", parts: [{ text: `${a} + ${b}` }, { text: "=" }, { text: String(a + b), hot: true }] } },
      ]
    );
  }
  const big = Math.max(a, b) + rnd(1, 5);
  const small = Math.min(a, b);
  return wq(
    numQ(`${name} had ${big} ${emoji}. She gave away ${small}. How many are left?`, big - small, undefined, undefined, [
      `"Gave away" and "left" mean we SUBTRACT.`,
      `${big} − ${small} = ${big - small}.`,
    ]),
    [
      { text: `Start at ${small} and count up to ${big}.`, viz: { kind: "numberline", from: small, to: big, step: 1 } },
      { text: `${big} − ${small} = ${big - small}.`, viz: { kind: "expr", parts: [{ text: `${big} − ${small}` }, { text: "=" }, { text: String(big - small), hot: true }] } },
    ]
  );
}

export function twoStepQ(d: number): Question {
  const name = pick(NAMES);
  const a = rnd(10, 40);
  const b = rnd(5, 20);
  const c = rnd(2, 10);
  const ans = a + b - c;
  return wq(
    numQ(`${name} had ${a} stickers. She earned ${b} more, then gave ${c} away. How many now?`, ans, undefined, undefined, [
      `Two-step problems need TWO calculations, in order.`,
      `Step 1: ${a} + ${b} = ${a + b}.`,
      `Step 2: ${a + b} − ${c} = ${ans}.`,
    ]),
    [
      { text: `Step 1 — she earns more: ${a} + ${b} = ${a + b}.`, viz: { kind: "expr", parts: [{ text: `${a} + ${b}` }, { text: "=" }, { text: String(a + b), hot: true }] } },
      { text: `Step 2 — she gives some away: ${a + b} − ${c} = ${ans}.`, viz: { kind: "expr", parts: [{ text: `${a + b} − ${c}` }, { text: "=" }, { text: String(ans), hot: true }] } },
    ]
  );
}
