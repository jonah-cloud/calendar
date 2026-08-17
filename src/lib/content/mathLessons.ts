/**
 * Dash the Cheetah's concept lessons (shown before a new math skill) and the
 * mission themes that turn each round into a race/quest instead of a quiz.
 */

export interface MissionTheme {
  title: string;
  start: string; // emoji at the start of the track
  goal: string; // emoji at the finish
  go: string; // one-liner shown at mission start
  win: string; // shown on mission complete
  almost: string; // shown when the mission isn't complete yet
}

export const MISSION_THEMES: MissionTheme[] = [
  {
    title: "Rocket Launch",
    start: "🚀",
    goal: "🌕",
    go: "Fuel the rocket with right answers — fast answers are TURBO fuel! To the moon!",
    win: "TOUCHDOWN ON THE MOON! The moon cheese is ours! 🧀",
    almost: "The rocket wobbled back to the launchpad. One more countdown — I believe in us!",
  },
  {
    title: "Treasure Dash",
    start: "🏃‍♀️",
    goal: "💎",
    go: "The treasure map says: answer fast, run faster! Race me to the gems!",
    win: "TREASURE FOUND! Diamonds, rubies, and one very shiny pebble I'm keeping.",
    almost: "So close to the treasure I could SMELL it. (It smells like victory.) Again?",
  },
  {
    title: "Snack Truck Chase",
    start: "🐆",
    goal: "🚚",
    go: "The snack truck is getting away! Every right answer = one giant cheetah leap!",
    win: "WE CAUGHT THE SNACK TRUCK! Churros for everyone! 🥨",
    almost: "The truck turned a corner… but I memorized its route. Rematch!",
  },
  {
    title: "Volcano Escape",
    start: "🌋",
    goal: "🏝️",
    go: "The lava is (slowly, politely) coming! Answer quick and hop to the safe island!",
    win: "SAFE ON THE ISLAND! The volcano is very embarrassed. 🌺",
    almost: "We got splashed by a warm puddle. Shake it off — escape route round two!",
  },
  {
    title: "Castle Quest",
    start: "🐎",
    goal: "🏰",
    go: "The castle drawbridge closes at sundown! Gallop through these questions!",
    win: "WELCOME TO THE CASTLE! They're throwing us a feast! 👑",
    almost: "The drawbridge went up… but I know the knight. One more charge!",
  },
  {
    title: "Deep Sea Dive",
    start: "🤿",
    goal: "🐙",
    go: "Professor Octopus is waiting at the bottom with a prize! Dive, dive, dive!",
    win: "You found Professor Octopus! Eight high-fives at once! 🖐️",
    almost: "We came up for air a little early. Big breath — dive again!",
  },
];

/** Pick a stable theme per unit so each skill keeps its own mission. */
export function themeForUnit(unitKey: string): MissionTheme {
  let h = 0;
  for (const c of unitKey) h = (h * 31 + c.charCodeAt(0)) % 997;
  return MISSION_THEMES[h % MISSION_THEMES.length];
}

/** Dash's short concept lessons, keyed by unit id. 3–4 fun cards that teach the trick. */
export const MATH_LESSONS: Record<string, string[]> = {
  counting: [
    "Counting is my SLOWEST sport, and I still love it. Here's the rule: touch each thing ONE time while you say ONE number.",
    "The last number you say is the how-many! If I count 🍪 1, 2, 3… there are 3 cookies. (Were 3 cookies. I got hungry.)",
    "Watch out for the double-tap trap — count each thing exactly once. Ready to count like a champion?",
  ],
  compare: [
    "Numbers live on a racetrack called the number line. The further along a number lives, the BIGGER it is!",
    "When you count 1, 2, 3, 4… whichever number you say LAST is the winner of the bigger contest.",
    "8 vs 5? Counting up, you pass 5 and keep going to 8 — so 8 is bigger. Easy peasy, lemon speedy!",
  ],
  add5: [
    "Adding is just putting piles together! 2 + 1 means a pile of 2 and a pile of 1 join the same party.",
    "Use your fingers — they're the original math tools. Hold up 2, count on 1 more: 3!",
    "Adding ZERO is my favorite joke: you add… nothing! The pile doesn't change at all. 4 + 0 = 4. Ha!",
  ],
  shapes: [
    "Shapes are everywhere — your snack crackers are squares, wheels are circles, pizza slices are triangles!",
    "The secret is COUNTING SIDES: 3 sides = triangle (TRI = three!), 4 equal sides = square, round with no sides = circle.",
    "A rectangle is just a square that did a biiiig morning stretch. Two long sides, two short sides!",
  ],
  addsub20: [
    "Time for my two FAVORITE speed tricks. Trick 1: always start from the BIGGER number and count on. 3 + 9? Start at 9!",
    "Trick 2 is the legendary MAKE-A-TEN. For 8 + 5: give 8 what it needs to be 10 (that's 2), then add the leftover 3. 10 + 3 = 13!",
    "For take-aways, count UP! 12 − 9? Hop from 9 to 12: that's 3 hops. Answer: 3. Hopping beats counting backwards every time!",
  ],
  missing: [
    "Mystery boxes! ❓ is a number wearing a disguise. Our job: unmask it!",
    "4 + ❓ = 7 asks: '4 plus WHAT makes 7?' Count up from 4 to 7: 5, 6, 7 — three hops!",
    "So ❓ = 3. You're basically a detective now. A very fast one.",
  ],
  tensones: [
    "Big numbers are a TEAM: the left digit is bundles of TEN, the right digit is loose ONES.",
    "47 = 4 bundles of ten (that's 40!) plus 7 loose ones. The 4 is secretly worth forty!",
    "That's why 91 beats 19 even though they use the same digits — position is POWER!",
  ],
  skip: [
    "Skip counting is counting with kangaroo jumps — you skip right over the boring numbers!",
    "By 2s: 2, 4, 6, 8. By 5s: 5, 10, 15, 20. By 10s: 10, 20, 30 — the speediest of all!",
    "Find the jump size, then make one more jump. This is secretly how multiplication starts. Shhh!",
  ],
  addsub100: [
    "Big numbers? Don't panic — BREAK them! 34 + 25 becomes tens (30+20) and ones (4+5).",
    "Tens first: 30 + 20 = 50. Ones next: 4 + 5 = 9. Stick them together: 59!",
    "Subtraction works the same: peel off the tens, then the ones. Big numbers are just small numbers in a trench coat.",
  ],
  money: [
    "Money time! Penny = 1¢, nickel = 5¢, dime = 10¢, quarter = 25¢. That's the whole cheat code.",
    "Plot twist: the dime is the TINIEST coin but beats the chunky nickel. Size isn't everything!",
    "To add coins, start with the biggest value and count on. Quarter + dime? 25… 35¢!",
  ],
  time: [
    "Clocks are cookies. 🍪 Stay with me. The minute hand eats the cookie as the hour goes by!",
    ":15 = quarter past (a quarter eaten). :30 = half past (half gone!). :45 = quarter TO the next hour (only a quarter left!).",
    "So 3:30 is 'half past 3' and 3:45 is 'quarter to 4'. Now you can never miss snack time.",
  ],
  skip2: ["Same kangaroo jumps — but now we go FAST. 3s and 4s join the party: 3, 6, 9, 12… 4, 8, 12, 16!", "Feel the rhythm — skip counting is a drumbeat: THREE-six-NINE-twelve!", "Speedy skip counting is the launchpad for times tables. You're almost a Titan!"],
  mult: [
    "Multiplication is GROUPS. 3 × 4 = 3 bowls with 4 snacks each. How many snacks? That's the question!",
    "Skip count to the answer: 4, 8, 12. Three jumps of 4 lands on 12!",
    "Here's the real mission: we practice these until your brain answers INSTANTLY — no counting, just ZAP. That's what our speed races are for!",
  ],
  div: [
    "Division is multiplication driving in reverse. 12 ÷ 3 asks: how many 3s fit inside 12?",
    "Skip count by 3 till you hit 12: 3, 6, 9, 12 — four jumps. So 12 ÷ 3 = 4!",
    "Know your times tables and division is FREE. Two skills for the price of one — best deal in math!",
  ],
  arrays: [
    "An array is stuff lined up in rows — like eggs in a carton or my trophy shelf. 😎",
    "2 rows of 6 eggs? Count one row (6), then skip count for each row: 6, 12!",
    "Rows × columns = total. Arrays turn counting into multiplying — instant upgrade!",
  ],
  perim: [
    "Two rectangle superpowers! PERIMETER = the walk AROUND the edge. AREA = the tiles INSIDE.",
    "Perimeter: add all four sides — or be slick: 2 × (width + height).",
    "Area: it's a grid! Width × height counts every tile at once. Fences go around, carpets go inside!",
  ],
  bigmult: [
    "Big multiplication = SPLIT, ZAP, ADD. Split 23 × 4 into (20 × 4) and (3 × 4).",
    "Zap each part: 20 × 4 = 80, and 3 × 4 = 12.",
    "Add them: 80 + 12 = 92. You just did big-kid math with little-kid pieces!",
  ],
  longdiv: [
    "Big division is a guessing game for smart cats. 84 ÷ 7? Ask: 7 × WHAT gets to 84?",
    "Start at a friendly guess: 7 × 10 = 70. Getting close! 7 × 12 = 84. Boom!",
    "Guess, check, adjust — that's not cheating, that's STRATEGY.",
  ],
  fraccomp: [
    "Fractions are pizza math. 🍕 The bottom number = how many friends are sharing.",
    "MORE friends sharing = SMALLER slices! So 1/8 is smaller than 1/4. Choose your pizza party wisely.",
    "Same bottom number? Slices are equal — just compare how many slices you get. 5/8 beats 3/8!",
  ],
  equiv: [
    "Twin fractions! 1/2 and 2/4 LOOK different but are the same amount of pizza. Sneaky!",
    "The rule: whatever you do to the top, do to the bottom. Multiply both by 2: 1/2 → 2/4!",
    "It's the same pizza, just cut into more pieces. The pizza doesn't care. The pizza is at peace.",
  ],
  fracadd: [
    "Adding fractions with the same bottom is the easiest trick in the book: ADD THE TOPS!",
    "2/8 + 3/8 = 5/8. Two slices plus three slices is five slices!",
    "The bottom number NEVER changes — the slice size stayed the same. Don't add the bottoms, that's the classic trap!",
  ],
  decimals: [
    "Decimals are fractions in disguise — the dot splits WHOLES from PIECES.",
    "3.7 = 3 whole pizzas and 7 tenths of another one. The first spot after the dot is always tenths!",
    "To add decimals, line up the dots like soldiers, then add pieces to pieces and wholes to wholes.",
  ],
  orderops: [
    "When an equation has lots going on, there's a RULE about who goes first — like a lunch line.",
    "Parentheses are VIPs — always first! Then multiplication and division. Adding and subtracting go LAST.",
    "5 + 2 × 3? The × eats first: 2 × 3 = 6, then 5 + 6 = 11. If you add first, you fall in the trap (21). Not us!",
  ],
  geometry: [
    "Final geometry mission — perimeter AND area, bigger numbers, same superpowers.",
    "Around the edge? Add the sides (2 × (w + h)). Filling the inside? Multiply w × h.",
    "Ask yourself: fence or carpet? Fence = perimeter. Carpet = area. Let's roll!",
  ],
};

export function lessonForUnit(unitId: string): string[] | null {
  return MATH_LESSONS[unitId] ?? null;
}
