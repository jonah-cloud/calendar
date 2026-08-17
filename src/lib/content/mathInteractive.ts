/**
 * Interactive concept lessons — the "Explore" stage where kids manipulate
 * things on screen before building understanding and then racing for fluency.
 *
 * Step kinds:
 *  - say:   Dash talks (spoken aloud), kid taps next
 *  - count: tap every object once; the counter grows with each tap
 *  - move:  tap objects from a pile to move them into a target zone
 *  - hop:   number-line skip counting — tap the next landing number
 *  - shade: tap tiles to shade a fraction of a whole
 *  - pick:  big tappable answer tiles with a spoken hint on mistakes
 *  - cards: flip cards — tap to hear it spoken, flip to see the meaning
 */

export type IStep =
  | { kind: "say"; text: string }
  | { kind: "count"; text: string; emoji: string; n: number; cols?: number }
  | {
      kind: "move";
      text: string;
      emoji: string;
      startIn: number;
      add: number;
      targetLabel: string;
      sourceLabel: string;
      /** capacity renders empty slots in the target (e.g. a ten-frame) */
      capacity?: number;
      /** how many items sit in the source pile (defaults to `add`) */
      sourceCount?: number;
    }
  | { kind: "hop"; text: string; start: number; step: number; hops: number }
  | { kind: "shade"; text: string; n: number; shade: number; label: string; pre?: number }
  | { kind: "pick"; text: string; visual?: string; tiles: string[]; correct: number; hint: string }
  | {
      kind: "cards";
      text: string;
      cards: { front: string; back: string; say?: string; lang?: string }[];
    };

export const MATH_INTERACTIVE: Record<string, IStep[]> = {
  counting: [
    { kind: "say", text: "Hi, it's Dash! Today we count like champions. The rule: touch each thing ONE time, and say ONE number. Ready? Tap everything you see!" },
    { kind: "count", text: "Tap each puppy to count them — every puppy gets exactly one boop!", emoji: "🐶", n: 5 },
    { kind: "count", text: "More! Tap each star. Don't double-tap — stars hate that.", emoji: "⭐", n: 8 },
    { kind: "pick", text: "Last one: my cookie stash. How many cookies?", visual: "🍪🍪🍪🍪🍪🍪🍪", tiles: ["6", "7", "8"], correct: 1, hint: "Tap-count them in your head — the last number you say is the answer!" },
  ],
  compare: [
    { kind: "say", text: "Numbers live on a racetrack! The farther a number is along the track, the bigger it is. Let's race!" },
    { kind: "hop", text: "Walk the track! Tap the NEXT number as we count up from 1.", start: 1, step: 1, hops: 4 },
    { kind: "pick", text: "You passed 3 on the way to 5 — so which is bigger?", tiles: ["3", "5"], correct: 1, hint: "The number you reach LAST when counting up is bigger!" },
    { kind: "pick", text: "Big-kid round: which is bigger?", tiles: ["12", "9"], correct: 0, hint: "Counting up, you pass 9 and keep going to 12!" },
  ],
  add5: [
    { kind: "say", text: "Adding means joining piles together into one big party pile! Let's throw a party." },
    { kind: "move", text: "There are 2 apples in the bowl. Tap 3 more apples to add them in!", emoji: "🍎", startIn: 2, add: 3, sourceLabel: "Apples to add", targetLabel: "The bowl" },
    { kind: "pick", text: "2 apples plus 3 apples — how many in the bowl now?", tiles: ["4", "5", "6"], correct: 1, hint: "Count everything in the bowl: 1, 2, 3, 4, 5!" },
    { kind: "move", text: "Again! 1 balloon at the party. Tap 4 more to invite them!", emoji: "🎈", startIn: 1, add: 4, sourceLabel: "Balloons", targetLabel: "The party" },
    { kind: "pick", text: "1 + 4 = ?", tiles: ["5", "4", "6"], correct: 0, hint: "Start at 1 and count on: 2, 3, 4, 5!" },
  ],
  shapes: [
    { kind: "say", text: "Shape safari! The secret is counting SIDES. Three sides: triangle. Four equal sides: square. Round with zero sides: circle!" },
    { kind: "pick", text: "Tap the TRIANGLE — the one with 3 sides!", tiles: ["⚪", "🔺", "🟦"], correct: 1, hint: "TRI means three — count the pointy corners!" },
    { kind: "pick", text: "Tap the shape with 4 EQUAL sides!", tiles: ["🟦", "🔺", "⚪"], correct: 0, hint: "A square has 4 sides that are all the same length!" },
    { kind: "pick", text: "Which shape can ROLL?", tiles: ["🔺", "🟦", "⚪"], correct: 2, hint: "No corners, no sides — circles roll! Squares just flop." },
  ],
  addsub20: [
    { kind: "say", text: "Time to learn my most famous move: MAKE-A-TEN! Tens are super easy to add, so we build one first." },
    { kind: "move", text: "We're adding 8 + 5. The ten-frame has 8 stars, and the pile has 5. Tap stars to FILL the frame up to ten!", emoji: "⭐", startIn: 8, add: 2, sourceCount: 5, capacity: 10, sourceLabel: "Star pile", targetLabel: "Ten-frame" },
    { kind: "say", text: "BOOM — a full ten! We borrowed 2 stars, so the pile of 5 has 3 left. And ten plus three is EASY…" },
    { kind: "pick", text: "So 8 + 5 = 10 + 3 = ?", tiles: ["12", "13", "14"], correct: 1, hint: "Ten plus three — just say it: thir-TEEN!" },
    { kind: "hop", text: "Subtraction trick: count UP! 12 minus 9: start at 9 and hop to 12. Tap each hop!", start: 9, step: 1, hops: 3 },
    { kind: "pick", text: "You hopped 3 times — so 12 − 9 = ?", tiles: ["2", "3", "4"], correct: 1, hint: "Count the hops: 10, 11, 12 — three hops!" },
  ],
  missing: [
    { kind: "say", text: "Mystery number time! A number is hiding in a box wearing a tiny disguise. We'll catch it by counting up!" },
    { kind: "move", text: "The plate has 4 cookies. Tap cookies until there are 7 — count how many you add!", emoji: "🍪", startIn: 4, add: 3, sourceLabel: "Cookie jar", targetLabel: "The plate" },
    { kind: "pick", text: "You added the mystery number! 4 + ❓ = 7. What was ❓?", tiles: ["2", "3", "4"], correct: 1, hint: "You tapped 3 cookies onto the plate — that's the mystery number!" },
    { kind: "pick", text: "No cookies this time, just brains: 6 + ❓ = 10", tiles: ["3", "4", "5"], correct: 1, hint: "Count up from 6 to 10: seven, eight, nine, ten — four counts!" },
  ],
  tensones: [
    { kind: "say", text: "Big numbers are a team! The LEFT digit carries big boxes of TEN. The RIGHT digit carries loose ones. Left is boxes, right is loose!" },
    { kind: "pick", text: "Which picture shows 34?", tiles: ["📦📦📦 ▪▪▪▪", "📦📦📦📦 ▪▪▪"], correct: 0, hint: "34 = THREE boxes of ten and FOUR loose ones!" },
    { kind: "pick", text: "In the number 72, what is the 7 really worth?", tiles: ["7", "70", "72"], correct: 1, hint: "The 7 sits in the tens place — it's carrying seven boxes of ten. Seventy!" },
    { kind: "pick", text: "Which number is 5 boxes of ten and 9 loose ones?", tiles: ["95", "59", "509"], correct: 1, hint: "Five tens then nine ones: 5 then 9 — fifty-nine!" },
  ],
  skip: [
    { kind: "say", text: "Why count every number when you can JUMP over them like a kangaroo? Skip counting is counting at cheetah speed!" },
    { kind: "hop", text: "Jump by 2s! Tap the next landing spot each time.", start: 2, step: 2, hops: 4 },
    { kind: "hop", text: "Now the mighty 5s — this one sounds like a drumbeat!", start: 5, step: 5, hops: 4 },
    { kind: "pick", text: "10, 20, 30… what comes next?", tiles: ["35", "40", "50"], correct: 1, hint: "We're jumping by tens — 30 plus one more ten is 40!" },
  ],
  addsub100: [
    { kind: "say", text: "Big numbers look scary but they're just small numbers in a trench coat! We BREAK them into tens and ones, then add the pieces." },
    { kind: "pick", text: "Let's do 34 + 25. First break 25 apart. 25 = ?", tiles: ["20 + 5", "2 + 5", "25 + 0"], correct: 0, hint: "25 is two tens (20) and five ones!" },
    { kind: "pick", text: "Tens first! 30 + 20 = ?", tiles: ["40", "50", "60"], correct: 1, hint: "3 tens plus 2 tens is 5 tens — fifty!" },
    { kind: "pick", text: "Now the ones: 4 + 5 = ?", tiles: ["9", "8", "10"], correct: 0, hint: "Four plus five — count on: 5, 6, 7, 8, 9!" },
    { kind: "pick", text: "Stick the pieces together: 50 + 9 = ?", tiles: ["59", "49", "509"], correct: 0, hint: "Five tens and nine ones — fifty-nine!" },
  ],
  money: [
    { kind: "say", text: "Money math! Penny is 1 cent, nickel is 5, dime is 10, quarter is 25. Fun fact: the tiny dime beats the chunky nickel. Money is weird and I love it." },
    { kind: "pick", text: "Tap the value of a DIME!", tiles: ["5¢", "10¢", "25¢"], correct: 1, hint: "Tiny coin, big value — a dime is ten cents!" },
    { kind: "move", text: "Let's make 30 cents with dimes! Each dime is 10¢ — tap dimes into the piggy bank until we have 30¢. That's 3 dimes!", emoji: "🪙", startIn: 0, add: 3, sourceLabel: "Dimes (10¢ each)", targetLabel: "Piggy bank 🐷" },
    { kind: "pick", text: "A quarter (25¢) plus a nickel (5¢) = ?", tiles: ["30¢", "35¢", "26¢"], correct: 0, hint: "Start at 25 and count on 5: twenty-six, twenty-seven… thirty!" },
  ],
  time: [
    { kind: "say", text: "Clocks are cookies! Stay with me: at 15 minutes a quarter of the cookie is eaten, at 30 it's HALF eaten, at 45 there's only a quarter left!" },
    { kind: "pick", text: "The clock says 3:30. Half the cookie is gone! What do we say?", tiles: ["half past 3", "quarter past 3", "quarter to 3"], correct: 0, hint: "30 minutes = half the hour is eaten — HALF PAST three!" },
    { kind: "pick", text: "The clock says 7:15. What do we say?", tiles: ["half past 7", "quarter past 7", "quarter to 8"], correct: 1, hint: "15 minutes past the hour — a QUARTER PAST seven!" },
    { kind: "pick", text: "Tricky one! 4:45 — only a quarter of the cookie is LEFT before 5. What do we say?", tiles: ["quarter past 4", "half past 4", "quarter to 5"], correct: 2, hint: "45 minutes gone means 15 left — quarter TO the NEXT hour: quarter to five!" },
  ],
  skip2: [
    { kind: "say", text: "Kangaroo jumps, turbo edition! Threes and fours have a rhythm — feel the drumbeat: THREE, six, NINE, twelve!" },
    { kind: "hop", text: "Jump by 3s! Tap each landing.", start: 3, step: 3, hops: 4 },
    { kind: "hop", text: "Now by 4s — the times-table warm-up jump!", start: 4, step: 4, hops: 4 },
    { kind: "pick", text: "Speed check: 6, 12, 18, … ?", tiles: ["22", "24", "26"], correct: 1, hint: "Jumping by sixes — 18 plus 6 is 24!" },
  ],
  mult: [
    { kind: "say", text: "Multiplication is GROUPS! 3 times 4 means 3 bowls with 4 snacks in each. Let's build one and count it the fast way." },
    { kind: "count", text: "Here's 3 rows of 4 cookies. Tap along the FIRST row only — count 4!", emoji: "🍪", n: 4, cols: 4 },
    { kind: "hop", text: "Now skip count one jump per ROW: 4… 8… 12! Tap the landings.", start: 4, step: 4, hops: 2 },
    { kind: "pick", text: "So 3 × 4 = ?", tiles: ["7", "12", "16"], correct: 1, hint: "Three jumps of four: 4, 8, 12!" },
    { kind: "pick", text: "Your turn, no cookies: 2 × 5 = ?", tiles: ["10", "7", "12"], correct: 0, hint: "Two jumps of five: 5, 10!" },
  ],
  div: [
    { kind: "say", text: "Division is multiplication in reverse gear! 12 divided by 3 asks: how many 3s hide inside 12? We hunt them with jumps!" },
    { kind: "hop", text: "Hunt the 3s! Jump by 3 until you land on 12 — count your jumps!", start: 3, step: 3, hops: 3 },
    { kind: "pick", text: "How many jumps did it take to reach 12?", tiles: ["3", "4", "5"], correct: 1, hint: "3, 6, 9, 12 — that's FOUR landings!" },
    { kind: "pick", text: "So 12 ÷ 3 = ?", tiles: ["4", "3", "6"], correct: 0, hint: "Four 3s hide inside 12!" },
  ],
  arrays: [
    { kind: "say", text: "An array is stuff in neat rows and columns — like an egg carton! Rows times columns counts EVERYTHING at once." },
    { kind: "count", text: "Tap one full row of these strawberries. How long is a row?", emoji: "🍓", n: 5, cols: 5 },
    { kind: "pick", text: "There are 3 rows of 5. Which math sentence matches?", tiles: ["3 × 5", "3 + 5", "5 − 3"], correct: 0, hint: "Rows TIMES columns — 3 rows of 5 is 3 × 5!" },
    { kind: "pick", text: "3 × 5 = ?", tiles: ["8", "15", "20"], correct: 1, hint: "Skip count by 5 three times: 5, 10, 15!" },
  ],
  perim: [
    { kind: "say", text: "Rectangle superpowers! PERIMETER is walking around the fence. AREA is counting the carpet tiles inside. Fence around, carpet inside!" },
    { kind: "pick", text: "A garden is 4 wide and 3 tall. Walk the fence: 4 + 3 + 4 + 3 = ?", tiles: ["12", "14", "7"], correct: 1, hint: "Two 4s and two 3s: 8 plus 6 is 14!" },
    { kind: "count", text: "Now the carpet! This rug is 4 tiles wide and 3 tall. Tap one ROW of tiles.", emoji: "🟪", n: 4, cols: 4 },
    { kind: "pick", text: "3 rows of 4 tiles — the AREA is…", tiles: ["12", "14", "7"], correct: 0, hint: "4, 8, 12 — twelve tiles of carpet!" },
    { kind: "pick", text: "Quick! Building a FENCE around a yard — perimeter or area?", tiles: ["perimeter", "area"], correct: 0, hint: "Fences go AROUND — that's perimeter!" },
  ],
  bigmult: [
    { kind: "say", text: "Big multiplication: SPLIT, ZAP, ADD! Split the big number into tens and ones, zap each piece, add them back. Watch 23 × 4 fall apart!" },
    { kind: "pick", text: "SPLIT: 23 = ?", tiles: ["20 + 3", "2 + 3", "23 + 4"], correct: 0, hint: "Two tens and three ones: twenty plus three!" },
    { kind: "pick", text: "ZAP the tens: 20 × 4 = ?", tiles: ["60", "80", "24"], correct: 1, hint: "2 × 4 is 8, so 20 × 4 is 80!" },
    { kind: "pick", text: "ZAP the ones: 3 × 4 = ?", tiles: ["12", "7", "9"], correct: 0, hint: "Three jumps of four: 4, 8, 12!" },
    { kind: "pick", text: "ADD: 80 + 12 = ?", tiles: ["92", "82", "102"], correct: 0, hint: "80 plus 10 is 90, plus 2 more is 92!" },
  ],
  longdiv: [
    { kind: "say", text: "Big division is a guessing game for geniuses: guess, check, adjust! 84 divided by 7 — let's hunt it down together." },
    { kind: "pick", text: "Friendly first guess: 7 × 10 = ?", tiles: ["70", "77", "17"], correct: 0, hint: "Anything times 10 just gets a zero: seventy!" },
    { kind: "pick", text: "70 is close to 84 but not there. How much is left over? 84 − 70 = ?", tiles: ["10", "14", "24"], correct: 1, hint: "70 plus 14 gets you to 84!" },
    { kind: "pick", text: "How many 7s fit in that leftover 14?", tiles: ["1", "2", "3"], correct: 1, hint: "7, 14 — two jumps!" },
    { kind: "pick", text: "So 84 ÷ 7 = 10 + 2 = ?", tiles: ["12", "11", "13"], correct: 0, hint: "Ten 7s plus two 7s — twelve!" },
  ],
  fraccomp: [
    { kind: "say", text: "Pizza math! The bottom number of a fraction is how many friends share the pizza. More friends means smaller slices. Choose your party wisely!" },
    { kind: "shade", text: "This pizza is cut for 4 friends. Tap 1 slice to shade YOUR piece — that's one fourth!", n: 4, shade: 1, label: "1/4" },
    { kind: "shade", text: "This pizza is cut for 8 friends. Tap your 1 slice — one eighth!", n: 8, shade: 1, label: "1/8" },
    { kind: "pick", text: "Which slice was BIGGER?", tiles: ["1/4", "1/8"], correct: 0, hint: "Four friends sharing means bigger pieces than eight friends sharing!" },
    { kind: "shade", text: "Same pizza now: 8 slices. Shade 5 of them!", n: 8, shade: 5, label: "5/8" },
    { kind: "pick", text: "Which is more of the pizza: 5/8 or 3/8?", tiles: ["5/8", "3/8"], correct: 0, hint: "Same size slices — five slices beats three!" },
  ],
  equiv: [
    { kind: "say", text: "Twin fractions! Two fractions can LOOK different but be the exact same amount of pizza. Let me blow your mind." },
    { kind: "shade", text: "This pizza has 2 giant slices. Shade 1 — that's one half!", n: 2, shade: 1, label: "1/2" },
    { kind: "shade", text: "Same size pizza, cut into 4. Shade 2 slices!", n: 4, shade: 2, label: "2/4" },
    { kind: "pick", text: "Look at both pizzas — who shaded MORE?", tiles: ["1/2 pizza", "2/4 pizza", "Same amount!"], correct: 2, hint: "Half the pizza is shaded both times — twins in disguise!" },
    { kind: "pick", text: "The twin rule: multiply top AND bottom by the same number. 1/3 = ?", tiles: ["2/6", "2/3", "1/6"], correct: 0, hint: "Top times 2 is 2, bottom times 2 is 6 — two sixths!" },
  ],
  fracadd: [
    { kind: "say", text: "Adding fractions with the same bottom number is the easiest trick in math: just add the TOPS. The slice size never changes!" },
    { kind: "shade", text: "The pizza has 8 slices. Shade 2 for lunch!", n: 8, shade: 2, label: "2/8" },
    { kind: "shade", text: "Still hungry — shade 3 MORE for dinner! (Your lunch slices are already shaded.)", n: 8, shade: 5, pre: 2, label: "2/8 + 3/8" },
    { kind: "pick", text: "2 slices + 3 slices — how much pizza did we eat?", tiles: ["5/8", "5/16", "6/8"], correct: 0, hint: "Add the tops: 2 + 3 = 5. The bottom STAYS 8 — the slices didn't change size!" },
    { kind: "pick", text: "Trap check! Why does the bottom stay 8?", tiles: ["The slice size didn't change", "Because 8 is lucky", "The pizza got bigger"], correct: 0, hint: "The bottom just says how the pizza was cut — and it was cut into 8 the whole time!" },
  ],
  decimals: [
    { kind: "say", text: "Decimals are fractions wearing sunglasses. The dot splits WHOLE pizzas from PIECES. First spot after the dot is always tenths!" },
    { kind: "shade", text: "This chocolate bar has 10 squares. Shade 7 — that's seven tenths!", n: 10, shade: 7, label: "0.7" },
    { kind: "pick", text: "How do we write 3 whole bars and 7 tenths?", tiles: ["3.7", "7.3", "37"], correct: 0, hint: "Wholes before the dot, tenths after: three point seven!" },
    { kind: "pick", text: "Which is BIGGER?", tiles: ["2.9", "2.4"], correct: 0, hint: "Same wholes — compare the tenths: 9 tenths beats 4 tenths!" },
    { kind: "pick", text: "Add the tenths: 0.4 + 0.3 = ?", tiles: ["0.7", "0.12", "7"], correct: 0, hint: "4 tenths plus 3 tenths is 7 tenths — zero point seven!" },
  ],
  orderops: [
    { kind: "say", text: "When an equation is crowded, there's a line order — like lunch line rules! Parentheses are VIPs and go first. Multiplication eats before addition. Always!" },
    { kind: "pick", text: "5 + 2 × 3 — tap what happens FIRST!", tiles: ["5 + 2", "2 × 3"], correct: 1, hint: "Multiplication always eats first — no cutting, addition!" },
    { kind: "pick", text: "So 2 × 3 = 6. Now finish: 5 + 6 = ?", tiles: ["11", "21", "16"], correct: 0, hint: "Five plus six — eleven! (People who add first get 21 — the classic trap!)" },
    { kind: "pick", text: "New one: (4 + 2) × 3. What goes first?", tiles: ["4 + 2, it's in the VIP room", "2 × 3, multiplication rules"], correct: 0, hint: "Parentheses are VIPs — whatever's inside goes first, even before multiplication!" },
    { kind: "pick", text: "(4 + 2) × 3 = 6 × 3 = ?", tiles: ["18", "12", "10"], correct: 0, hint: "Six threes: 3, 6, 9, 12, 15, 18!" },
  ],
  geometry: [
    { kind: "say", text: "Final geometry mission — the fence-or-carpet game with bigger numbers. Ask yourself every time: around the edge, or filling the inside?" },
    { kind: "pick", text: "Painting a whole wall that's 6 wide and 4 tall. Fence or carpet?", tiles: ["Carpet — area!", "Fence — perimeter!"], correct: 0, hint: "Paint COVERS the inside — that's area!" },
    { kind: "pick", text: "So the paint covers 6 × 4 = ?", tiles: ["24", "20", "10"], correct: 0, hint: "Six rows of four: 4, 8, 12, 16, 20, 24!" },
    { kind: "pick", text: "Putting ribbon around a 5-by-2 present. Fence or carpet?", tiles: ["Fence — perimeter!", "Carpet — area!"], correct: 0, hint: "Ribbon wraps AROUND the edge — perimeter!" },
    { kind: "pick", text: "Ribbon needed: 2 × (5 + 2) = ?", tiles: ["14", "10", "7"], correct: 0, hint: "5 plus 2 is 7, doubled is 14!" },
  ],
};

export function interactiveForUnit(unitId: string): IStep[] | null {
  return MATH_INTERACTIVE[unitId] ?? null;
}
