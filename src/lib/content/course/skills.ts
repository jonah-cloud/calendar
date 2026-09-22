/**
 * The skill library behind the course-book track.
 *
 * Every skill teaches itself the same way, and the order is deliberate:
 *   1. CONCEPT  — name the idea, say it in one plain sentence, SHOW it.
 *   2. DO IT    — the kid moves/taps/counts the idea with their own hands.
 *   3. CHECK IT — a question whose picture is still on the screen.
 *
 * Rule for this file: a question may never be text alone. If a kid would have
 * to hold numbers in their head to know what is being asked, it gets a picture.
 */
import type { IStep } from "../mathInteractive";
import type { Viz } from "../../viz";
import type { Question } from "../../types";
import { MATH_GENERATORS } from "../math";
import * as G from "./generators";

export interface CourseSkill {
  id: string;
  title: string;
  /** Dash's interactive teaching for this concept. */
  teach: IStep[];
  gen: (d: number) => Question;
}

/* ---- authoring helpers, so every lesson has the same shape ---- */

/** The big-idea card that opens every lesson. */
const idea = (title: string, big: string, viz?: Viz, takeaway?: string): IStep => ({
  kind: "concept",
  title,
  big,
  viz,
  takeaway,
});

const say = (text: string): IStep => ({ kind: "say", text });

/** A question that always carries its picture. `ask` is the short maths line. */
const check = (
  text: string,
  ask: string,
  viz: Viz | undefined,
  tiles: string[],
  correct: number,
  hint: string
): IStep => ({ kind: "pick", text, ask, viz, tiles, correct, hint });

const SKILL_LIST: CourseSkill[] = [
  /* ═══════════════ counting & number sense ═══════════════ */
  {
    id: "count10",
    title: "Counting to 10",
    gen: MATH_GENERATORS.counting,
    teach: [
      idea(
        "Counting",
        "Counting means touching each thing ONE time and saying ONE number. The last number you say is how many there are.",
        { kind: "count", emoji: "🍎", n: 5 },
        "The last number you say = how many."
      ),
      { kind: "count", text: "Your turn! Tap each apple exactly once.", emoji: "🍎", n: 5 },
      { kind: "count", text: "Bigger pile — don't skip any!", emoji: "⭐", n: 8 },
      check(
        "Here's my cookie stash. Count them.",
        "How many cookies?",
        { kind: "count", emoji: "🍪", n: 7 },
        ["6", "7", "8"],
        1,
        "The number under the last cookie is the answer — seven!"
      ),
    ],
  },
  {
    id: "countSeq",
    title: "The Counting Order",
    gen: G.countSequence,
    teach: [
      idea(
        "Numbers Have an Order",
        "Numbers always come in the same order, and each one is exactly ONE more than the one before it.",
        { kind: "numberline", from: 1, to: 6, step: 1 },
        "Each step forward adds 1."
      ),
      { kind: "hop", text: "Tap the next number as we count up!", start: 1, step: 1, hops: 5 },
      check(
        "Look at the line. One number is missing from the end.",
        "5, 6, 7, ?",
        { kind: "numberline", from: 5, to: 8, step: 1 },
        ["8", "6", "9"],
        0,
        "Seven, then one more step — eight!"
      ),
    ],
  },
  {
    id: "countBack",
    title: "Counting Backwards",
    gen: G.countBack,
    teach: [
      idea(
        "Counting Backwards",
        "Going backwards means ONE LESS each time. It's how rockets blast off: ten, nine, eight…",
        { kind: "numberline", from: 6, to: 10, step: 1 },
        "Forwards adds 1. Backwards takes 1 away."
      ),
      { kind: "hop", text: "We're at 10. Tap each number as we count DOWN.", start: 10, step: -1, hops: 4 },
      check(
        "Walk backwards down the line.",
        "What comes just before 6?",
        { kind: "numberline", from: 4, to: 7, step: 1 },
        ["5", "7", "4"],
        0,
        "6 is one step past 5 — so 5 comes just before it!"
      ),
    ],
  },
  {
    id: "compare",
    title: "More, Less & Equal",
    gen: MATH_GENERATORS.compare,
    teach: [
      idea(
        "Bigger and Smaller",
        "Numbers live on a track. The FURTHER along the track a number sits, the bigger it is.",
        { kind: "numberline", from: 1, to: 9, step: 1 },
        "Further along the track = bigger."
      ),
      { kind: "hop", text: "Walk the track with me — tap each number.", start: 1, step: 1, hops: 5 },
      check(
        "Both numbers are on the track. One is further along.",
        "Which is BIGGER: 5 or 8?",
        { kind: "numberline", from: 5, to: 8, step: 1 },
        ["8", "5"],
        0,
        "You pass 5 and keep walking to 8. The one you reach LAST is bigger!"
      ),
      check(
        "Now the other direction.",
        "Which is LESS: 3 or 9?",
        { kind: "numberline", from: 3, to: 9, step: 1 },
        ["3", "9"],
        0,
        "You reach 3 first, so 3 is less!"
      ),
    ],
  },
  {
    id: "ordinal",
    title: "First, Second, Third",
    gen: () => G.ordinalQ(),
    teach: [
      idea(
        "Position Words",
        "Sometimes we don't care HOW MANY — we care WHICH ONE. First, second, third and fourth tell you a spot in line.",
        { kind: "count", emoji: "🦆", n: 4 },
        "Counting says how many. Ordinals say which one."
      ),
      {
        kind: "cards",
        text: "Tap each position word to hear it!",
        cards: [
          { front: "1st", back: "first — the front of the line", say: "First! The very front of the line." },
          { front: "2nd", back: "second — right behind first", say: "Second! Right behind first." },
          { front: "3rd", back: "third — behind second", say: "Third! Behind second." },
          { front: "4th", back: "fourth — then fifth, sixth…", say: "Fourth! Then fifth, sixth, and so on." },
        ],
      },
      check(
        "Here's a line of ducks. The number under each one is its spot.",
        "Which word means duck number 1?",
        { kind: "count", emoji: "🦆", n: 4 },
        ["first", "third", "last"],
        0,
        "Spot number one is always FIRST!"
      ),
    ],
  },
  {
    id: "oddEven",
    title: "Odd & Even",
    gen: G.oddEvenQ,
    teach: [
      idea(
        "Odd and Even",
        "Even numbers split into pairs with nobody left over. Odd numbers ALWAYS have one lonely leftover.",
        { kind: "groups", total: 6, per: 2, emoji: "🔵" },
        "Splits into pairs = even. One left over = odd."
      ),
      say("Look at that — 6 made three perfect pairs with nobody left out. That makes 6 EVEN."),
      check(
        "Now try 8. Every circle found a partner.",
        "Is 8 odd or even?",
        { kind: "groups", total: 8, per: 2, emoji: "🔵" },
        ["even", "odd"],
        0,
        "Four perfect pairs and nobody left over — 8 is EVEN!"
      ),
      idea(
        "The Shortcut",
        "You don't have to make pairs every time. Only the LAST digit matters. Ends in 0, 2, 4, 6 or 8? Even. Ends in 1, 3, 5, 7 or 9? Odd.",
        { kind: "expr", parts: [{ text: "2" }, { text: "7", hot: true }] },
        "Only the last digit decides."
      ),
      check(
        "Look at the last digit only.",
        "Is 27 odd or even?",
        { kind: "expr", parts: [{ text: "2" }, { text: "7", hot: true }] },
        ["odd", "even"],
        0,
        "It ends in 7, and 7 is odd — so 27 is odd!"
      ),
    ],
  },

  /* ═══════════════ addition & subtraction ═══════════════ */
  {
    id: "add5",
    title: "Adding to 5",
    gen: MATH_GENERATORS.add5,
    teach: [
      idea(
        "Adding",
        "Adding means pushing two piles together to make one bigger pile. Then you count the whole thing.",
        { kind: "addObjects", emoji: "🍎", a: 2, b: 3, showTotal: false },
        "Two piles pushed together = one bigger pile."
      ),
      {
        kind: "move",
        text: "There are 2 apples in the bowl. Tap 3 more to add them in!",
        emoji: "🍎",
        startIn: 2,
        add: 3,
        sourceLabel: "Apples to add",
        targetLabel: "The bowl",
      },
      check(
        "Both piles are in the bowl now. Count everything.",
        "2 + 3 = ?",
        { kind: "addObjects", emoji: "🍎", a: 2, b: 3 },
        ["5", "4", "6"],
        0,
        "Count every apple: 1, 2, 3, 4, 5!"
      ),
    ],
  },
  {
    id: "numberBond",
    title: "Number Bonds",
    gen: G.numberBondQ,
    teach: [
      idea(
        "Parts and Wholes",
        "Every number is secretly made of smaller parts. 5 is made of 2 and 3. This is the biggest idea in all of early maths.",
        { kind: "addObjects", emoji: "🔵", a: 2, b: 3, showTotal: true },
        "2 and 3 are the PARTS. 5 is the WHOLE."
      ),
      say("And it works backwards too! If you know 2 and 3 make 5, then you also know 5 take away 3 leaves 2. One fact, two answers."),
      {
        kind: "move",
        text: "We need 10 in the frame. Tap to fill it up!",
        emoji: "⭐",
        startIn: 4,
        add: 6,
        capacity: 10,
        sourceLabel: "Stars",
        targetLabel: "Ten-frame",
      },
      check(
        "The frame started with 4 and you filled it to 10. Count the ones you added.",
        "4 + ? = 10",
        { kind: "tenframe", filled: 4, moving: 6 },
        ["6", "5", "14"],
        0,
        "Four were already in. You tapped 6 more to fill the ten!"
      ),
    ],
  },
  {
    id: "doubles",
    title: "Doubles",
    gen: G.doublesQ,
    teach: [
      idea(
        "Doubles",
        "Doubles are twins — the same number added to itself. Memorise these and everything else gets faster.",
        { kind: "addObjects", emoji: "🟠", a: 4, b: 4, showTotal: true },
        "Same number + same number = a double."
      ),
      {
        kind: "cards",
        text: "Tap each double to hear it!",
        cards: [
          { front: "2 + 2", back: "= 4", say: "Two plus two is four." },
          { front: "3 + 3", back: "= 6", say: "Three plus three is six." },
          { front: "4 + 4", back: "= 8", say: "Four plus four is eight." },
          { front: "5 + 5", back: "= 10", say: "Five plus five is ten!" },
        ],
      },
      idea(
        "Near Doubles",
        "Here's the bonus trick. If you know 4 + 4 = 8, then 4 + 5 is just ONE more. You never have to start over.",
        { kind: "addObjects", emoji: "🟠", a: 4, b: 5, showTotal: false },
        "Near double = the double, plus 1."
      ),
      check(
        "The second pile has one extra.",
        "4 + 5 = ?",
        { kind: "addObjects", emoji: "🟠", a: 4, b: 5 },
        ["9", "8", "10"],
        0,
        "The double 4 + 4 is 8. One more makes 9!"
      ),
    ],
  },
  {
    id: "addsub20",
    title: "Adding & Subtracting to 20",
    gen: MATH_GENERATORS.addsub20,
    teach: [
      idea(
        "Make a Ten",
        "Tens are the easiest numbers to add. So when a sum gets past ten, we FILL THE TEN first — then the rest is easy.",
        { kind: "tenframe", filled: 8, moving: 2, extra: 3 },
        "Fill the ten, then count what's left over."
      ),
      {
        kind: "move",
        text: "We're adding 8 + 5. Tap stars to fill the frame to ten!",
        emoji: "⭐",
        startIn: 8,
        add: 2,
        sourceCount: 5,
        capacity: 10,
        sourceLabel: "Star pile (5)",
        targetLabel: "Ten-frame",
      },
      say("You borrowed 2 stars to finish the ten, so the pile of 5 has 3 left. Now it's just ten plus three."),
      check(
        "The frame is FULL and 3 stars are left over.",
        "10 + 3 = ?",
        { kind: "tenframe", filled: 10, extra: 3 },
        ["12", "13", "14"],
        1,
        "Ten and three more — just say it out loud: thir-TEEN!"
      ),
      idea(
        "Subtract by Counting Up",
        "Taking away big numbers is slow. Instead, start at the small number and count UP. The hops are your answer.",
        { kind: "numberline", from: 9, to: 12, step: 1 },
        "Count up from the small number. Count the hops."
      ),
      { kind: "hop", text: "12 − 9. Start at 9 and hop up to 12. Tap each landing!", start: 9, step: 1, hops: 3 },
      check(
        "Count the hops you made, not the numbers.",
        "12 − 9 = ?",
        { kind: "numberline", from: 9, to: 12, step: 1 },
        ["2", "3", "4"],
        1,
        "Three hops: 10, 11, 12. The answer is the HOPS!"
      ),
    ],
  },
  {
    id: "missing",
    title: "Missing Numbers",
    gen: MATH_GENERATORS.missing,
    teach: [
      idea(
        "The Missing Number",
        "Sometimes a number hides in a box. To catch it, start at the number you have and count UP to the total.",
        { kind: "numberline", from: 4, to: 7, step: 1 },
        "Count up from what you have to what you need."
      ),
      {
        kind: "move",
        text: "The plate has 4 cookies. Tap until there are 7 — count how many you add!",
        emoji: "🍪",
        startIn: 4,
        add: 3,
        sourceLabel: "Cookie jar",
        targetLabel: "The plate",
      },
      check(
        "You went from 4 up to 7. Count your hops.",
        "4 + ? = 7",
        { kind: "numberline", from: 4, to: 7, step: 1 },
        ["3", "2", "4"],
        0,
        "Three hops from 4 to 7 — the mystery number is 3!"
      ),
    ],
  },
  {
    id: "factFamily",
    title: "Fact Families",
    gen: G.factFamilyQ,
    teach: [
      idea(
        "Fact Families",
        "Three numbers that belong together make a family. Learn ONE fact and you get FOUR for free.",
        { kind: "addObjects", emoji: "🟣", a: 3, b: 4, showTotal: true },
        "3, 4 and 7 live together. That's a family."
      ),
      {
        kind: "cards",
        text: "Here's the whole family of 3, 4 and 7. Tap each one!",
        cards: [
          { front: "3 + 4", back: "= 7", say: "Three plus four is seven." },
          { front: "4 + 3", back: "= 7", say: "Four plus three is also seven. Order never matters when you add." },
          { front: "7 − 4", back: "= 3", say: "Seven take away four is three." },
          { front: "7 − 3", back: "= 4", say: "Seven take away three is four." },
        ],
      },
      check(
        "The whole is 7. One part is 5. The other part is hiding.",
        "7 − 5 = ?",
        { kind: "addObjects", emoji: "🟣", a: 5, b: 2, showTotal: true },
        ["2", "5", "12"],
        0,
        "Take one part away and the OTHER part is what's left — 2!"
      ),
    ],
  },

  /* ═══════════════ place value ═══════════════ */
  {
    id: "teenPlace",
    title: "Teen Numbers",
    gen: () => G.teenPlaceQ(),
    teach: [
      idea(
        "Teen Numbers Are Ten + Some",
        "Teen numbers SOUND backwards, but every single one is just a full ten plus a few extras.",
        { kind: "tenframe", filled: 10, extra: 4 },
        "A full ten + extras = a teen number."
      ),
      {
        kind: "move",
        text: "Fill the ten-frame all the way to ten first!",
        emoji: "⭐",
        startIn: 7,
        add: 3,
        capacity: 10,
        sourceLabel: "Stars",
        targetLabel: "Ten-frame",
      },
      check(
        "Full frame, plus 3 waiting outside.",
        "10 + 3 = ?",
        { kind: "tenframe", filled: 10, extra: 3 },
        ["13", "30", "103"],
        0,
        "Ten and three — thir-TEEN!"
      ),
      check(
        "Another one. Count the frame, then the extras.",
        "10 + 6 = ?",
        { kind: "tenframe", filled: 10, extra: 6 },
        ["16", "60", "106"],
        0,
        "Ten and six — six-TEEN!"
      ),
    ],
  },
  {
    id: "tensones",
    title: "Tens & Ones",
    gen: MATH_GENERATORS.tensones,
    teach: [
      idea(
        "Two Digits, Two Jobs",
        "In a two-digit number, the left digit counts BUNDLES of ten and the right digit counts loose ones.",
        { kind: "place", n: 34 },
        "Left digit = bundles of ten. Right digit = loose ones."
      ),
      check(
        "Count the tall bars, then the little squares.",
        "How many is this?",
        { kind: "place", n: 34 },
        ["34", "43", "304"],
        0,
        "Three tall tens and four loose ones — thirty-four!"
      ),
      idea(
        "Why Position Matters",
        "In 72 the 7 isn't really seven. It's sitting in the tens seat, so it's carrying SEVENTY.",
        { kind: "place", n: 72, ask: "tens" },
        "A digit's seat gives it its size."
      ),
      check(
        "The tens box is highlighted.",
        "In 58, what is the 5 worth?",
        { kind: "place", n: 58, ask: "tens" },
        ["50", "5", "58"],
        0,
        "Five bundles of ten — that's fifty!"
      ),
    ],
  },
  {
    id: "tenMoreLess",
    title: "10 More, 10 Less",
    gen: G.tenMoreLessQ,
    teach: [
      idea(
        "Adding Ten Is a Shortcut",
        "Adding ten just adds ONE MORE BUNDLE. The loose ones never change — so only the tens digit moves.",
        { kind: "place", n: 43, ask: "tens" },
        "+10 changes the tens digit only."
      ),
      { kind: "hop", text: "Jump by tens with me — tap each landing!", start: 20, step: 10, hops: 4 },
      check(
        "43 has 4 bundles and 3 loose. Add one more bundle.",
        "43 + 10 = ?",
        { kind: "place", n: 53, ask: "tens" },
        ["53", "44", "43"],
        0,
        "Four bundles became five. The 3 loose ones never moved!"
      ),
    ],
  },
  {
    id: "count100",
    title: "Counting to 100",
    gen: (d) => G.countSequence(Math.max(0.6, d)),
    teach: [
      idea(
        "A Hundred Is Ten Tens",
        "One hundred sounds enormous, but it's only ten bundles of ten. And the counting pattern repeats the whole way.",
        { kind: "numberline", from: 10, to: 60, step: 10 },
        "100 = ten tens."
      ),
      { kind: "hop", text: "Count by tens — tap each one!", start: 10, step: 10, hops: 5 },
      say("Listen to the pattern: twenty-ONE, twenty-TWO, twenty-THREE… then thirty-ONE, thirty-TWO. Same ones, brand new ten. It never changes."),
      check(
        "39 is the last of the thirties. What happens next?",
        "What comes after 39?",
        { kind: "place", n: 40, ask: "tens" },
        ["40", "30", "391"],
        0,
        "The ones run out, so we bundle a new ten — forty!"
      ),
    ],
  },
  {
    id: "place100",
    title: "Hundreds, Tens & Ones",
    gen: G.place100Q,
    teach: [
      idea(
        "A Third Seat",
        "Three-digit numbers add a HUNDREDS seat on the left. The order never changes: hundreds, tens, ones.",
        { kind: "expr", parts: [{ text: "4", hot: true }, { text: "2" }, { text: "6" }] },
        "Hundreds · Tens · Ones — always in that order."
      ),
      check(
        "The highlighted digit is on the far left.",
        "In 426, which digit is the hundreds?",
        { kind: "expr", parts: [{ text: "4", hot: true }, { text: "2" }, { text: "6" }] },
        ["4", "2", "6"],
        0,
        "The leftmost seat is hundreds — the 4 is worth four hundred!"
      ),
      idea(
        "Breaking It Apart",
        "Any big number comes apart into its seats. 426 is 400 and 20 and 6. Broken apart, it stops being scary.",
        { kind: "expr", parts: [{ text: "400" }, { text: "+" }, { text: "20" }, { text: "+" }, { text: "6" }] },
        "Every number = hundreds + tens + ones."
      ),
      check(
        "Push the pieces back together.",
        "300 + 50 + 7 = ?",
        { kind: "expr", parts: [{ text: "300" }, { text: "+" }, { text: "50" }, { text: "+" }, { text: "7" }] },
        ["357", "3507", "375"],
        0,
        "Three hundreds, five tens, seven ones — 357!"
      ),
    ],
  },

  /* ═══════════════ skip counting & multiplication ═══════════════ */
  {
    id: "skip",
    title: "Skip Counting",
    gen: MATH_GENERATORS.skip,
    teach: [
      idea(
        "Jumping Instead of Counting",
        "Why touch every number when you can JUMP over them? Skip counting is counting at top speed.",
        { kind: "numberline", from: 2, to: 10, step: 2 },
        "Same-size jumps get you there faster."
      ),
      { kind: "hop", text: "Jump by 2s! Tap each landing spot.", start: 2, step: 2, hops: 4 },
      { kind: "hop", text: "Now the mighty 5s — this one sounds like a drumbeat!", start: 5, step: 5, hops: 4 },
      check(
        "These jumps are all the same size. Look at the label on the arc.",
        "10, 20, 30, ?",
        { kind: "numberline", from: 10, to: 40, step: 10 },
        ["35", "40", "50"],
        1,
        "We're jumping by ten each time — 30 plus 10 is 40!"
      ),
    ],
  },
  {
    id: "repeatedAdd",
    title: "Equal Groups",
    gen: G.repeatedAddQ,
    teach: [
      idea(
        "Groups of the Same Size",
        "When every group holds the SAME amount, you don't have to count one by one. You can jump group by group.",
        { kind: "groups", total: 12, per: 4, emoji: "🍬" },
        "Equal groups can be skip-counted."
      ),
      { kind: "hop", text: "3 bowls with 4 sweets each. Skip count one jump per bowl!", start: 4, step: 4, hops: 2 },
      idea(
        "The Short Way to Write It",
        "Writing 4 + 4 + 4 gets tiring. So we write 3 × 4 instead. That × symbol just means 'groups of'.",
        { kind: "expr", parts: [{ text: "4 + 4 + 4" }, { text: "=" }, { text: "3 × 4", hot: true }] },
        "× means 'groups of'."
      ),
      check(
        "Count the boxes, then count what's inside one box.",
        "How many groups of 5?",
        { kind: "groups", total: 10, per: 5, emoji: "🍬" },
        ["2 × 5", "2 + 5", "5 − 2"],
        0,
        "Two groups of five — that's 2 × 5 = 10!"
      ),
    ],
  },
  {
    id: "mult",
    title: "Multiplication Facts",
    gen: MATH_GENERATORS.mult,
    teach: [
      idea(
        "Multiplication Is Rows",
        "3 × 4 means 3 rows with 4 in each row. Count the end of each row and you're skip counting.",
        { kind: "array", rows: 3, cols: 4, emoji: "🍪" },
        "rows × how-many-in-a-row = the total."
      ),
      { kind: "hop", text: "Skip count by 4, one jump per row. Tap each landing!", start: 4, step: 4, hops: 2 },
      check(
        "The number beside each row is the running total.",
        "3 × 4 = ?",
        { kind: "array", rows: 3, cols: 4, emoji: "🍪" },
        ["12", "7", "16"],
        0,
        "Three jumps of four: 4, 8, 12!"
      ),
      say("The real goal is for these to pop into your head instantly, with no counting at all. That's what the speed races are for!"),
    ],
  },
  {
    id: "arrays",
    title: "Arrays",
    gen: MATH_GENERATORS.arrays,
    teach: [
      idea(
        "Neat Rows and Columns",
        "An array is things lined up in tidy rows — like an egg box, or my trophy shelf.",
        { kind: "array", rows: 3, cols: 5, emoji: "🍓" },
        "Count one row, then count the rows."
      ),
      { kind: "count", text: "Tap ONE row of strawberries. How long is a row?", emoji: "🍓", n: 5, cols: 5 },
      check(
        "Three rows, five in each.",
        "Which matches this picture?",
        { kind: "array", rows: 3, cols: 5, emoji: "🍓" },
        ["3 × 5", "3 + 5", "5 − 3"],
        0,
        "Rows TIMES how many in a row — 3 × 5!"
      ),
      idea(
        "Turn It Sideways",
        "Tip the array over and it becomes 5 rows of 3 — the same 15 berries. Multiplication doesn't care about order.",
        { kind: "array", rows: 5, cols: 3, emoji: "🍓" },
        "3 × 5 and 5 × 3 are the same total."
      ),
    ],
  },
  {
    id: "shareEqually",
    title: "Sharing Equally",
    gen: G.shareEquallyQ,
    teach: [
      idea(
        "Fair Sharing",
        "Division is dealing things out fairly, one at a time, like cards — until they're all gone.",
        { kind: "groups", total: 6, per: 3, emoji: "🍪" },
        "6 shared between 2 friends = 3 each."
      ),
      {
        kind: "move",
        text: "Share 6 cookies between 2 friends. Tap to deal them out!",
        emoji: "🍪",
        startIn: 0,
        add: 6,
        sourceLabel: "Cookies to share",
        targetLabel: "Dealt out fairly",
      },
      check(
        "Two piles, shared fairly. Look inside one pile.",
        "10 shared between 2 = ?",
        { kind: "groups", total: 10, per: 5, emoji: "🍪" },
        ["5", "2", "10"],
        0,
        "Deal them out one at a time and each friend ends up with five!"
      ),
    ],
  },
  {
    id: "div",
    title: "Division Facts",
    gen: MATH_GENERATORS.div,
    teach: [
      idea(
        "How Many Fit Inside?",
        "12 ÷ 3 is asking: how many 3s fit inside 12? Jump by 3 and count your jumps.",
        { kind: "numberline", from: 3, to: 12, step: 3 },
        "Count the JUMPS, not the numbers."
      ),
      { kind: "hop", text: "Hunt the 3s! Jump by 3 until you land on 12.", start: 3, step: 3, hops: 3 },
      check(
        "The label under the line counts your hops.",
        "12 ÷ 3 = ?",
        { kind: "numberline", from: 3, to: 12, step: 3 },
        ["4", "3", "5"],
        0,
        "3, 6, 9, 12 — four jumps!"
      ),
      say("Here's the bargain: if you know your times tables, division comes free. Two skills for the price of one."),
    ],
  },

  /* ═══════════════ bigger computation ═══════════════ */
  {
    id: "add2digit",
    title: "Adding Bigger Numbers",
    gen: G.add2DigitQ,
    teach: [
      idea(
        "Break It Apart",
        "Big numbers are just small numbers in a trench coat. Split off the tens, add those, then add the ones.",
        { kind: "split", a: 34, b: 25, op: "+" },
        "Tens first, then ones, then push them together."
      ),
      check(
        "The picture shows the tens on the left.",
        "30 + 20 = ?",
        { kind: "place", n: 50, ask: "tens" },
        ["50", "40", "60"],
        0,
        "Three bundles plus two bundles is five bundles — fifty!"
      ),
      check(
        "Now the loose ones.",
        "4 + 5 = ?",
        { kind: "addObjects", emoji: "🔵", a: 4, b: 5 },
        ["9", "8", "10"],
        0,
        "Count on from four: 5, 6, 7, 8, 9!"
      ),
      check(
        "Push the two pieces back together.",
        "50 + 9 = ?",
        { kind: "place", n: 59 },
        ["59", "509", "149"],
        0,
        "Five bundles and nine loose ones — fifty-nine!"
      ),
    ],
  },
  {
    id: "sub2digit",
    title: "Subtracting Bigger Numbers",
    gen: G.sub2DigitQ,
    teach: [
      idea(
        "Peel Off the Tens",
        "Same trick going down. Take away the tens first, then take away the ones.",
        { kind: "split", a: 47, b: 23, op: "-" },
        "Take the tens away first, then the ones."
      ),
      check(
        "Take two whole bundles away from 47.",
        "47 − 20 = ?",
        { kind: "place", n: 27, ask: "tens" },
        ["27", "24", "37"],
        0,
        "Four bundles minus two bundles leaves two — twenty-seven!"
      ),
      check(
        "Now take away the 3 loose ones.",
        "27 − 3 = ?",
        { kind: "place", n: 24, ask: "ones" },
        ["24", "23", "30"],
        0,
        "Seven loose ones take away three leaves four — twenty-four!"
      ),
    ],
  },
  {
    id: "addsub100",
    title: "Adding & Subtracting to 100",
    gen: MATH_GENERATORS.addsub100,
    teach: [
      idea(
        "The Same Recipe Every Time",
        "Break apart. Do the tens. Do the ones. Push together. It never changes, no matter how big the numbers get.",
        { kind: "split", a: 34, b: 25, op: "+" },
        "Break apart · tens · ones · push together."
      ),
      check(
        "Step one: the bundles.",
        "30 + 20 = ?",
        { kind: "place", n: 50, ask: "tens" },
        ["50", "40", "60"],
        0,
        "Three bundles plus two is five bundles — fifty!"
      ),
      check(
        "Step two: the loose ones.",
        "4 + 5 = ?",
        { kind: "addObjects", emoji: "🔵", a: 4, b: 5 },
        ["9", "8", "10"],
        0,
        "Four plus five is nine!"
      ),
    ],
  },
  {
    id: "round",
    title: "Rounding",
    gen: G.roundQ,
    teach: [
      idea(
        "Finding the Closest Friendly Number",
        "Rounding means sliding a number to the nearest ten. It's how you check whether an answer makes sense.",
        { kind: "numberline", from: 40, to: 50, step: 5 },
        "Slide to whichever ten is closer."
      ),
      say("47 sits between 40 and 50 — but it's much nearer to 50. So 47 rounds UP to 50."),
      idea(
        "The 5 Rule",
        "You don't need the line every time. Look at the ones digit. Five or more rounds UP. Four or less rounds DOWN.",
        { kind: "expr", parts: [{ text: "6" }, { text: "2", hot: true }] },
        "5 or more → up. 4 or less → down."
      ),
      check(
        "The ones digit is highlighted.",
        "Round 62 to the nearest ten",
        { kind: "expr", parts: [{ text: "6" }, { text: "2", hot: true }] },
        ["60", "70", "62"],
        0,
        "2 is less than 5, so we slide DOWN to 60!"
      ),
    ],
  },

  /* ═══════════════ fractions ═══════════════ */
  {
    id: "fractionName",
    title: "Naming Fractions",
    gen: G.fractionNameQ,
    teach: [
      idea(
        "Equal Pieces",
        "A fraction is a piece of a whole — but the pieces must be EQUAL. Uneven pieces don't count.",
        { kind: "fraction", bars: [{ num: 1, den: 4, label: "1/4" }] },
        "Bottom = how many pieces. Top = how many you took."
      ),
      { kind: "shade", text: "This bar is cut into 4 equal pieces. Shade 1 of them.", n: 4, shade: 1, label: "1/4" },
      { kind: "shade", text: "Now shade 3 pieces out of 4!", n: 4, shade: 3, label: "3/4" },
      check(
        "Count the shaded pieces, then count all the pieces.",
        "What fraction is shaded?",
        { kind: "fraction", bars: [{ num: 3, den: 4, label: "?" }] },
        ["3/4", "4/3", "3/7"],
        0,
        "Three pieces shaded out of four pieces total — three fourths!"
      ),
    ],
  },
  {
    id: "fraccomp",
    title: "Comparing Fractions",
    gen: MATH_GENERATORS.fraccomp,
    teach: [
      idea(
        "More Friends, Smaller Slices",
        "The bottom number is how many friends share the pizza. MORE friends means SMALLER slices for everyone.",
        { kind: "fraction", bars: [{ num: 1, den: 4, label: "1/4" }, { num: 1, den: 8, label: "1/8" }] },
        "Bigger bottom number = smaller pieces."
      ),
      { kind: "shade", text: "A pizza cut for 4 friends. Shade your slice!", n: 4, shade: 1, label: "1/4" },
      { kind: "shade", text: "Now one cut for 8 friends. Shade your slice.", n: 8, shade: 1, label: "1/8" },
      check(
        "Look at the two shaded pieces side by side.",
        "Which is BIGGER?",
        { kind: "fraction", bars: [{ num: 1, den: 4, label: "1/4" }, { num: 1, den: 8, label: "1/8" }] },
        ["1/4", "1/8"],
        0,
        "Four friends sharing beats eight — the 1/4 piece is clearly longer!"
      ),
    ],
  },
  {
    id: "fractionOfSet",
    title: "Fractions of a Group",
    gen: G.fractionOfSetQ,
    teach: [
      idea(
        "Splitting a Group",
        "Fractions don't only cut up pizzas. Half of a GROUP means split it into 2 equal piles and take one.",
        { kind: "groups", total: 6, per: 3, emoji: "🍎" },
        "Half = 2 equal piles. Third = 3 equal piles."
      ),
      {
        kind: "move",
        text: "Share 6 apples into 2 equal groups. Tap to deal them out!",
        emoji: "🍎",
        startIn: 0,
        add: 6,
        sourceLabel: "6 apples",
        targetLabel: "Two equal groups",
      },
      check(
        "Two equal piles. Look inside one pile.",
        "Half of 10 = ?",
        { kind: "groups", total: 10, per: 5, emoji: "🍎" },
        ["5", "2", "20"],
        0,
        "Split ten into two equal piles — five in each!"
      ),
    ],
  },

  /* ═══════════════ measurement, time, money ═══════════════ */
  {
    id: "measure",
    title: "Measuring Length",
    gen: G.measureQ,
    teach: [
      idea(
        "Units End to End",
        "To measure, you line units up end to end with no gaps and no overlaps — then count them.",
        { kind: "count", emoji: "📎", n: 6 },
        "No gaps, no overlaps, then count."
      ),
      { kind: "count", text: "Count the paperclips along the pencil!", emoji: "📎", n: 6 },
      say("Rulers do the same job with inches. The golden rule: always start at ZERO, not at the edge of the ruler. That's the mistake everybody makes once."),
      check(
        "A ruler is one foot long. Count the inch marks.",
        "Inches in one foot?",
        { kind: "numberline", from: 0, to: 12, step: 6 },
        ["12", "10", "100"],
        0,
        "Twelve inches make one foot!"
      ),
    ],
  },
  {
    id: "timeHour",
    title: "Telling Time: Hours",
    gen: (d) => MATH_GENERATORS.time(Math.min(d, 0.4)),
    teach: [
      idea(
        "Two Hands, Two Jobs",
        "The SHORT hand points at the hour. The LONG hand points at the minutes. When the long hand is straight up at 12, it's o'clock.",
        { kind: "clock", h: 3, m: 0 },
        "Short hand = hour. Long hand = minutes."
      ),
      check(
        "Look where the short hand points.",
        "What time is this?",
        { kind: "clock", h: 3, m: 0 },
        ["3 o'clock", "12 o'clock", "3:12"],
        0,
        "Short hand on the 3, long hand straight up — three o'clock!"
      ),
      idea(
        "Half Past",
        "When the long hand points straight DOWN at the 6, half the hour is gone. We say 'half past'.",
        { kind: "clock", h: 3, m: 30 },
        "Long hand down at 6 = half past."
      ),
      check(
        "The long hand is pointing straight down.",
        "What time is this?",
        { kind: "clock", h: 7, m: 30 },
        ["half past 7", "7 o'clock", "half past 6"],
        0,
        "Long hand down means half past, and the short hand has passed the 7 — half past seven!"
      ),
    ],
  },
  {
    id: "timeFiveMin",
    title: "Telling Time: Minutes",
    gen: G.timeFiveMinQ,
    teach: [
      idea(
        "Each Number Is Worth Five",
        "Here's the secret of the long hand: each number on the clock face is worth FIVE minutes, not one.",
        { kind: "numberline", from: 5, to: 30, step: 5 },
        "Count the clock numbers by fives."
      ),
      { kind: "hop", text: "Count around the clock by 5s — tap each one!", start: 5, step: 5, hops: 5 },
      check(
        "The long hand is on the 3. Count by fives to get there.",
        "How many minutes?",
        { kind: "clock", h: 2, m: 15 },
        ["15", "3", "45"],
        0,
        "Three numbers around: 5, 10, 15 — quarter past!"
      ),
    ],
  },
  {
    id: "elapsed",
    title: "Time That Passes",
    gen: G.elapsedQ,
    teach: [
      idea(
        "Counting Time Forward",
        "To find how much time goes by, just count forward on the clock — the same way you count on a number line.",
        { kind: "numberline", from: 2, to: 5, step: 1 },
        "Count forward one hour at a time."
      ),
      { kind: "hop", text: "It's 2 o'clock. Count forward 3 hours!", start: 2, step: 1, hops: 3 },
      check(
        "Start at 4 and count on two hours.",
        "2 hours after 4 o'clock",
        { kind: "clock", h: 6, m: 0 },
        ["6 o'clock", "2 o'clock", "8 o'clock"],
        0,
        "Five, six — six o'clock!"
      ),
    ],
  },
  {
    id: "money",
    title: "Coins",
    gen: MATH_GENERATORS.money,
    teach: [
      idea(
        "Every Coin Has a Value",
        "Penny is 1 cent, nickel is 5, dime is 10, quarter is 25. Size doesn't tell you the value — the tiny dime beats the fat nickel!",
        { kind: "coins", values: [25, 10, 5, 1] },
        "1¢ penny · 5¢ nickel · 10¢ dime · 25¢ quarter"
      ),
      {
        kind: "cards",
        text: "Tap each coin to learn its value!",
        cards: [
          { front: "penny", back: "1¢ — copper coloured", say: "A penny is one cent." },
          { front: "nickel", back: "5¢ — fat and silver", say: "A nickel is five cents." },
          { front: "dime", back: "10¢ — the tiny one!", say: "A dime is ten cents. It's the smallest coin but worth more than a nickel." },
          { front: "quarter", back: "25¢ — the big one", say: "A quarter is twenty five cents." },
        ],
      },
      check(
        "Compare what each one is worth, not how big it is.",
        "Which is worth MORE?",
        { kind: "coins", values: [10, 5] },
        ["dime", "nickel"],
        0,
        "The dime! Tiny coin, ten cents. Size doesn't equal value."
      ),
    ],
  },
  {
    id: "coinCount",
    title: "Counting Money",
    gen: G.coinCountQ,
    teach: [
      idea(
        "Biggest Coin First",
        "To count a pile of coins, always start with the BIGGEST one and count on from there. Big to small, every time.",
        { kind: "coins", values: [25, 10, 10] },
        "Start big, then count on."
      ),
      { kind: "hop", text: "A quarter then two dimes. Start at 25 and count on by tens!", start: 25, step: 10, hops: 2 },
      check(
        "The running total sits under each coin.",
        "How much altogether?",
        { kind: "coins", values: [25, 5] },
        ["30¢", "26¢", "20¢"],
        0,
        "Start at 25, count on five — thirty cents!"
      ),
    ],
  },
  {
    id: "makeChange",
    title: "Making Change",
    gen: G.makeChangeQ,
    teach: [
      idea(
        "Change Is Counting Up",
        "Change is what you get back when you pay more than the price. Don't subtract — count UP from the price to what you paid.",
        { kind: "numberline", from: 15, to: 25, step: 5 },
        "Count up from the price to what you paid."
      ),
      { kind: "hop", text: "It costs 15¢ and you pay 25¢. Count up from 15!", start: 15, step: 5, hops: 2 },
      check(
        "Count the hops from the price up to what you paid.",
        "Your change?",
        { kind: "numberline", from: 15, to: 25, step: 5 },
        ["10¢", "15¢", "40¢"],
        0,
        "Two hops of five — ten cents back!"
      ),
    ],
  },

  /* ═══════════════ geometry, patterns, data ═══════════════ */
  {
    id: "shapes",
    title: "Flat Shapes",
    gen: MATH_GENERATORS.shapes,
    teach: [
      idea(
        "Count the Sides",
        "The secret to naming any flat shape is counting its straight sides. Three sides: triangle. Four equal sides: square. No sides at all: circle.",
        undefined,
        "Name a shape by counting its sides."
      ),
      {
        kind: "pick",
        text: "Tap the shape with exactly 3 sides.",
        visual: "🔺 🟦 ⚪",
        tiles: ["🔺", "🟦", "⚪"],
        correct: 0,
        hint: "TRI means three — count the pointy corners!",
      },
      {
        kind: "pick",
        text: "Tap the shape with NO sides and NO corners.",
        visual: "🔺 🟦 ⚪",
        tiles: ["⚪", "🟦", "🔺"],
        correct: 0,
        hint: "A circle is perfectly round — that's why it rolls!",
      },
    ],
  },
  {
    id: "sidesVertices",
    title: "Sides & Corners",
    gen: () => G.sidesVerticesQ(),
    teach: [
      idea(
        "Sides and Corners Always Match",
        "Sides are the straight edges. Vertices are the pointy corners. Here's the magic: a flat shape always has the same number of each.",
        { kind: "count", emoji: "🔹", n: 4 },
        "Sides = corners, every time."
      ),
      { kind: "count", text: "Count the corners of a square!", emoji: "🔹", n: 4 },
      check(
        "A hexagon has 6 sides. Use the rule.",
        "How many corners?",
        { kind: "count", emoji: "🔹", n: 6 },
        ["6", "3", "12"],
        0,
        "Sides and corners always match — six and six!"
      ),
    ],
  },
  {
    id: "shape3d",
    title: "Solid Shapes",
    gen: () => G.shape3dQ(),
    teach: [
      idea(
        "Shapes You Can Pick Up",
        "Flat shapes live on paper. SOLID shapes are things you can actually hold — balls, boxes, cans and cones.",
        undefined,
        "Flat = on paper. Solid = you can hold it."
      ),
      {
        kind: "cards",
        text: "Tap each solid shape!",
        cards: [
          { front: "sphere ⚽", back: "perfectly round, like a ball", say: "A sphere! Perfectly round, like a ball." },
          { front: "cube 🎲", back: "6 square faces, like a dice", say: "A cube! Six square faces, like a dice." },
          { front: "cone 🍦", back: "circle bottom, one point", say: "A cone! Round at the bottom and pointy on top." },
          { front: "cylinder 🥫", back: "two circle ends, like a can", say: "A cylinder! Two circle ends, like a soup can." },
        ],
      },
      {
        kind: "pick",
        text: "A soup can has two flat circle ends and a curved side.",
        visual: "🥫",
        tiles: ["cylinder", "cube", "sphere"],
        correct: 0,
        hint: "Two circle ends and a curve around — that's a cylinder!",
      },
    ],
  },
  {
    id: "symmetry",
    title: "Symmetry",
    gen: () => G.symmetryQ(),
    teach: [
      idea(
        "The Folding Test",
        "A shape has symmetry if you can FOLD it so both halves land exactly on top of each other. Butterflies are the famous example.",
        undefined,
        "Fold it. If both halves match, it's symmetrical."
      ),
      {
        kind: "pick",
        text: "Try folding a heart straight down the middle.",
        visual: "❤️",
        tiles: ["yes, it matches", "no, it doesn't"],
        correct: 0,
        hint: "Fold down the middle and the two halves land perfectly on each other!",
      },
      say("But try the letter R. No matter where you fold it, the halves never match up. So R has no symmetry at all."),
    ],
  },
  {
    id: "pattern",
    title: "Patterns",
    gen: G.patternQ,
    teach: [
      idea(
        "Find the Repeat",
        "A pattern is something that REPEATS. Find the part that repeats and you can predict what comes next — forever.",
        undefined,
        "Spot the repeating part, then keep it going."
      ),
      {
        kind: "pick",
        text: "The repeating part here is triangle-square.",
        visual: "🔺🟦🔺🟦🔺 ❓",
        tiles: ["🟦", "🔺", "⚪"],
        correct: 0,
        hint: "After a triangle always comes a square!",
      },
      idea(
        "Number Patterns",
        "Numbers make patterns too. Look for the JUMP between them — once you find the jump, you've cracked it.",
        { kind: "numberline", from: 5, to: 20, step: 5 },
        "Find the jump between the numbers."
      ),
      check(
        "Look at the label on each arc.",
        "5, 10, 15, ?",
        { kind: "numberline", from: 5, to: 20, step: 5 },
        ["20", "16", "25"],
        0,
        "Each jump is five — 15 plus 5 is 20!"
      ),
    ],
  },
  {
    id: "graph",
    title: "Reading Graphs",
    gen: G.pictographQ,
    teach: [
      idea(
        "A Picture of Information",
        "A graph turns a list of numbers into a picture, so you can just LOOK and see the answer. Longest row wins.",
        { kind: "array", rows: 2, cols: 5, emoji: "🍎" },
        "Longest row = most. Shortest = least."
      ),
      say("And when a question asks how many MORE one row has than another, that's a subtraction hiding in a picture."),
      check(
        "Apples got 5 votes. Bananas got 3.",
        "How many MORE for 🍎?",
        { kind: "addObjects", emoji: "🍎", a: 3, b: 2 },
        ["2", "8", "5"],
        0,
        "'How many more' means subtract: 5 take away 3 is 2!"
      ),
    ],
  },
  {
    id: "calendar",
    title: "The Calendar",
    gen: () => G.calendarQ(),
    teach: [
      idea(
        "How We Organise Time",
        "Seven days make a week. About four weeks make a month. Twelve months make a year.",
        undefined,
        "7 days · 12 months · 365 days in a year"
      ),
      {
        kind: "cards",
        text: "Tap to learn the calendar!",
        cards: [
          { front: "7", back: "days in a week", say: "Seven days in a week." },
          { front: "12", back: "months in a year", say: "Twelve months in a year." },
          { front: "365", back: "days in a year", say: "Three hundred sixty five days in a year!" },
          { front: "52", back: "weeks in a year", say: "Fifty two weeks in a year." },
        ],
      },
      {
        kind: "pick",
        text: "Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday.",
        visual: "📅",
        tiles: ["7", "12", "30"],
        correct: 0,
        hint: "Count the day names — there are seven!",
      },
    ],
  },
  {
    id: "perim",
    title: "Perimeter & Area",
    gen: MATH_GENERATORS.perim,
    teach: [
      idea(
        "Around vs Inside",
        "PERIMETER is walking all the way around the edge. AREA is counting the tiles that cover the inside.",
        { kind: "rect", w: 4, h: 3, mode: "perimeter" },
        "Perimeter goes around. Area fills the inside."
      ),
      check(
        "The highlighted path goes around the outside.",
        "Fence around a garden — which?",
        { kind: "rect", w: 4, h: 3, mode: "perimeter" },
        ["perimeter", "area"],
        0,
        "A fence goes AROUND the edge — that's perimeter!"
      ),
      check(
        "Now the tiles inside are highlighted.",
        "Carpet inside a room — which?",
        { kind: "rect", w: 4, h: 3, mode: "area" },
        ["area", "perimeter"],
        0,
        "Carpet COVERS the inside — that's area!"
      ),
    ],
  },

  /* ═══════════════ word problems ═══════════════ */
  {
    id: "storyProblem",
    title: "Story Problems",
    gen: G.storyProblemQ,
    teach: [
      idea(
        "Hunt for Clue Words",
        "Story problems hide the maths inside words. Certain words always tell you what to do.",
        undefined,
        "'in all' → add · 'left' → subtract"
      ),
      {
        kind: "cards",
        text: "Tap each clue word!",
        cards: [
          { front: "in all · altogether", back: "➕ ADD", say: "In all, altogether, total — these mean add!" },
          { front: "found more · got more", back: "➕ ADD", say: "Found more, got more — add!" },
          { front: "left · gave away", back: "➖ SUBTRACT", say: "How many left, gave away — subtract!" },
          { front: "how many more", back: "➖ SUBTRACT", say: "How many MORE than — that's comparing, so subtract!" },
        ],
      },
      check(
        "Mia had 6 apples and ate 2. How many are LEFT?",
        "Add or subtract?",
        { kind: "addObjects", emoji: "🍎", a: 4, b: 2 },
        ["subtract", "add"],
        0,
        "'Left' after eating some means we take away — subtract!"
      ),
    ],
  },
  {
    id: "twoStep",
    title: "Two-Step Problems",
    gen: G.twoStepQ,
    teach: [
      idea(
        "Do One Step at a Time",
        "Some problems need TWO steps. Never try to do both at once — finish step one, write the answer down, then start step two.",
        { kind: "expr", parts: [{ text: "10 + 5" }, { text: "= 15", hot: true }, { text: "− 3" }] },
        "Finish step one before starting step two."
      ),
      say("Listen carefully: she had 10 stickers, earned 5 more, then gave 3 away. Step one is add the 5. Step two is subtract the 3."),
      check(
        "Step one gave us 15. Now she gives 3 away.",
        "15 − 3 = ?",
        { kind: "expr", parts: [{ text: "15", hot: true }, { text: "−" }, { text: "3" }] },
        ["12", "18", "13"],
        0,
        "Fifteen take away three is twelve!"
      ),
    ],
  },
];

export const SKILLS: Record<string, CourseSkill> = Object.fromEntries(
  SKILL_LIST.map((sk) => [sk.id, sk])
);

export const skillById = (id: string): CourseSkill | undefined => SKILLS[id];
