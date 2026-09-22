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
import * as H from "./generators3";

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
  /* ═══════════════ Math 3 ═══════════════ */
  {
    id: "multBy10",
    title: "Multiplying by 10 and 100",
    gen: H.multBy10,
    teach: [
      idea(
        "The Zero Trick",
        "Multiplying by 10 moves every digit one place to the left. On paper that looks like simply adding a zero.",
        { kind: "place", n: 40, ask: "tens" },
        "× 10 adds one zero. × 100 adds two."
      ),
      check("4 ones become 4 tens.", "4 × 10 = ?", { kind: "place", n: 40, ask: "tens" }, ["40", "14", "4"], 0, "Four tens — forty!"),
      check("Two zeros this time.", "7 × 100 = ?", { kind: "expr", parts: [{ text: "7" }, { text: "00", hot: true }] }, ["700", "70", "7100"], 0, "Seven hundreds — seven hundred!"),
    ],
  },
  {
    id: "divRemainder",
    title: "Division with Remainders",
    gen: H.divRemainder,
    teach: [
      idea(
        "The Leftovers",
        "Not everything shares out evenly. Whatever can't make another full group is called the REMAINDER.",
        { kind: "groups", total: 12, per: 5, emoji: "🍪" },
        "Make full groups. What's left is the remainder."
      ),
      check("Two full groups of 5, and some left over.", "13 ÷ 5 = ?", { kind: "groups", total: 10, per: 5, emoji: "🍪" }, ["2 r 3", "3 r 2", "2 r 5"], 0, "Two full groups use 10, leaving 3 behind — 2 remainder 3!"),
    ],
  },
  {
    id: "add3digit",
    title: "Adding to 1,000",
    gen: H.add3Digit,
    teach: [
      idea(
        "Same Recipe, Bigger Numbers",
        "Three-digit adding uses the exact rule you already know: hundreds with hundreds, tens with tens, ones with ones.",
        { kind: "expr", parts: [{ text: "300+40+5" }, { text: "+" }, { text: "200+10+2" }] },
        "Match each place with its own kind."
      ),
      check("Add the hundreds column first.", "300 + 200 = ?", { kind: "expr", parts: [{ text: "3" }, { text: "+" }, { text: "2" }, { text: "hundreds", hot: true }] }, ["500", "50", "320"], 0, "Three hundreds plus two hundreds is five hundreds!"),
    ],
  },
  {
    id: "sub3digit",
    title: "Subtracting to 1,000",
    gen: H.sub3Digit,
    teach: [
      idea(
        "Find the Gap",
        "Subtraction is the distance between two numbers. For big numbers, counting up in friendly jumps beats borrowing every time.",
        { kind: "numberline", from: 280, to: 430, step: 50 },
        "Jump up from the small number to the big one."
      ),
      check("Count the jumps from 280 up to 430.", "430 − 280 = ?", { kind: "numberline", from: 280, to: 430, step: 50 }, ["150", "250", "110"], 0, "Three jumps of fifty — a hundred and fifty!"),
    ],
  },
  {
    id: "fracLine",
    title: "Fractions on a Number Line",
    gen: H.fracNumberline,
    teach: [
      idea(
        "Fractions Are Numbers Too",
        "Fractions aren't only pieces of pizza — they sit on the number line, in the gaps between the whole numbers.",
        { kind: "fraction", bars: [{ num: 1, den: 4, label: "1/4" }, { num: 2, den: 4, label: "2/4" }, { num: 3, den: 4, label: "3/4" }] },
        "Between 0 and 1 there are infinitely many fractions."
      ),
      { kind: "shade", text: "Shade 3 pieces out of 4.", n: 4, shade: 3, label: "3/4" },
      check("Count the shaded pieces, then all the pieces.", "What fraction is this?", { kind: "fraction", bars: [{ num: 3, den: 4, label: "?" }] }, ["3/4", "4/3", "3/7"], 0, "Three out of four — three fourths!"),
    ],
  },
  {
    id: "quadrilateral",
    title: "Quadrilaterals",
    gen: () => H.quadrilateralQ(),
    teach: [
      idea(
        "The Four-Sided Family",
        "Any shape with 4 sides is a quadrilateral. Squares, rectangles, rhombuses and trapezoids are all cousins in that family.",
        { kind: "rect", w: 4, h: 3, mode: "perimeter" },
        "QUAD means four. All of them have 4 sides."
      ),
      {
        kind: "cards",
        text: "Tap each member of the family!",
        cards: [
          { front: "square", back: "4 equal sides, 4 right angles", say: "A square! Four equal sides and four square corners." },
          { front: "rectangle", back: "2 long, 2 short, 4 right angles", say: "A rectangle! Two long sides, two short sides." },
          { front: "rhombus", back: "4 equal sides, slanted corners", say: "A rhombus! Like a square that got pushed over." },
          { front: "trapezoid", back: "one pair of parallel sides", say: "A trapezoid! Just one pair of parallel sides." },
        ],
      },
    ],
  },
  {
    id: "angleType",
    title: "Kinds of Angles",
    gen: () => H.angleTypeQ(),
    teach: [
      idea(
        "Measuring Corners",
        "An angle measures how far something turns. The corner of a book is exactly 90 degrees — a RIGHT angle. Everything else is judged against it.",
        { kind: "angle", deg: 90, label: "a right angle = 90°" },
        "Less than 90 = acute. More than 90 = obtuse."
      ),
      check("This one is sharper than a book corner.", "What kind of angle?", { kind: "angle", deg: 45 }, ["acute", "right", "obtuse"], 0, "Sharper and smaller than 90° — that's ACUTE!"),
      check("This one is wider than a book corner.", "What kind of angle?", { kind: "angle", deg: 135 }, ["obtuse", "acute", "right"], 0, "Wider than 90° — that's OBTUSE!"),
    ],
  },
  {
    id: "unitChoice",
    title: "Choosing the Right Unit",
    gen: () => H.unitChoiceQ(),
    teach: [
      idea(
        "Match the Unit to the Job",
        "You wouldn't measure a road in inches or milk in pounds. Length, weight and liquid each have their own units.",
        undefined,
        "Length: inches, feet, miles · Weight: ounces, pounds · Liquid: cups, gallons"
      ),
      {
        kind: "cards",
        text: "Tap each measuring job!",
        cards: [
          { front: "how LONG", back: "inches · feet · yards · miles", say: "Length uses inches, feet, yards and miles." },
          { front: "how HEAVY", back: "ounces · pounds · tons", say: "Weight uses ounces, pounds and tons." },
          { front: "how much LIQUID", back: "cups · pints · quarts · gallons", say: "Liquid uses cups, pints, quarts and gallons." },
          { front: "how LONG in time", back: "seconds · minutes · hours", say: "Time uses seconds, minutes and hours." },
        ],
      },
    ],
  },
  {
    id: "functionTable",
    title: "Rule Machines",
    gen: H.functionTableQ,
    teach: [
      idea(
        "Every Machine Has One Rule",
        "A number goes in, something happens to it, a number comes out. Your job is to spot the rule — and it's the SAME rule every time.",
        { kind: "expr", parts: [{ text: "in" }, { text: "→ rule →", hot: true }, { text: "out" }] },
        "Find what happens to every input."
      ),
      check("1 becomes 4, 2 becomes 5, 3 becomes 6.", "What's the rule?", { kind: "expr", parts: [{ text: "1→4  2→5  3→6" }, { text: "+ 3", hot: true }] }, ["add 3", "times 3", "add 4"], 0, "Every number gained 3 — the rule is add 3!"),
    ],
  },
  {
    id: "timeMinute",
    title: "Time to the Minute",
    gen: H.timeMinuteQ,
    teach: [
      idea(
        "Every Little Mark",
        "Between the big numbers are tiny marks, and each one is a single minute. Count by fives to the nearest number, then count the little marks.",
        { kind: "clock", h: 4, m: 23 },
        "Fives to the number, then ones to the mark."
      ),
      check("Hour hand past the 4, minute hand at 23.", "What time is it?", { kind: "clock", h: 4, m: 23 }, ["4:23", "23:04", "5:23"], 0, "The hour is the number it has PASSED — four twenty-three!"),
    ],
  },
  {
    id: "roundHundred",
    title: "Rounding to Hundreds",
    gen: () => H.roundHundredQ(),
    teach: [
      idea(
        "Which Hundred Is Closer?",
        "Rounding to the nearest hundred works exactly like rounding to tens — you just look one place further over.",
        { kind: "numberline", from: 300, to: 400, step: 50 },
        "Look at the TENS digit to round hundreds."
      ),
      check("The tens digit decides it.", "Round 347 to the nearest 100", { kind: "expr", parts: [{ text: "3" }, { text: "4", hot: true }, { text: "7" }] }, ["300", "400", "350"], 0, "The tens digit is 4, less than 5 — round DOWN to 300!"),
    ],
  },
  {
    id: "equivFrac",
    title: "Equal Fractions",
    gen: MATH_GENERATORS.equiv,
    teach: [
      idea(
        "Same Amount, Different Slices",
        "Cut a pizza into more pieces and each piece is smaller — but the amount you hold can stay exactly the same.",
        { kind: "fraction", bars: [{ num: 1, den: 3, label: "1/3" }, { num: 2, den: 6, label: "2/6" }] },
        "1/3 and 2/6 cover the same length."
      ),
      { kind: "shade", text: "Shade 1 piece out of 3.", n: 3, shade: 1, label: "1/3" },
      { kind: "shade", text: "Now shade 2 out of 6. Same length?", n: 6, shade: 2, label: "2/6" },
      check("Both bars cover the same amount.", "1/3 is the same as…", { kind: "fraction", bars: [{ num: 1, den: 3, label: "1/3" }, { num: 2, den: 6, label: "?" }] }, ["2/6", "1/6", "3/6"], 0, "Double the top AND the bottom: 2/6!"),
    ],
  },

  /* ═══════════════ Math 4 ═══════════════ */
  {
    id: "placeMillions",
    title: "Big Place Value",
    gen: () => H.placeMillionsQ(),
    teach: [
      idea(
        "The Places Keep Going",
        "After hundreds come thousands, then ten thousands, hundred thousands, and millions. The pattern of ones-tens-hundreds just repeats.",
        { kind: "expr", parts: [{ text: "millions" }, { text: "thousands" }, { text: "ones", hot: true }] },
        "Every group of three repeats: ones, tens, hundreds."
      ),
      check("Places run right to left.", "4th place from the right?", { kind: "expr", parts: [{ text: "thousands", hot: true }, { text: "hundreds" }, { text: "tens" }, { text: "ones" }] }, ["thousands", "hundreds", "millions"], 0, "Ones, tens, hundreds, then THOUSANDS!"),
    ],
  },
  {
    id: "factors",
    title: "Factors",
    gen: H.factorsQ,
    teach: [
      idea(
        "Numbers That Fit Exactly",
        "A factor divides a number into equal groups with NOTHING left over. Factors always come in pairs.",
        { kind: "groups", total: 12, per: 3, emoji: "🔵" },
        "3 is a factor of 12 because 12 ÷ 3 leaves nothing."
      ),
      check("Four equal groups, nothing left over.", "Is 3 a factor of 12?", { kind: "groups", total: 12, per: 3, emoji: "🔵" }, ["yes", "no"], 0, "12 ÷ 3 = 4 exactly, with nothing left — yes!"),
    ],
  },
  {
    id: "primeComposite",
    title: "Prime & Composite",
    gen: () => H.primeCompositeQ(),
    teach: [
      idea(
        "Numbers With No Options",
        "A PRIME number can only be built one way: 1 times itself. A COMPOSITE number can be built more than one way.",
        { kind: "array", rows: 1, cols: 7, emoji: "🔵" },
        "Prime = only 1 × itself. Composite = more ways."
      ),
      check("7 only makes one rectangle: 1 by 7.", "Is 7 prime or composite?", { kind: "array", rows: 1, cols: 7, emoji: "🔵" }, ["prime", "composite"], 0, "Nothing else divides 7 evenly — it's PRIME!"),
      check("12 makes several rectangles.", "Is 12 prime or composite?", { kind: "array", rows: 3, cols: 4, emoji: "🔵" }, ["composite", "prime"], 0, "12 can be 3×4, 2×6, 1×12 — more than one way, so COMPOSITE!"),
    ],
  },
  {
    id: "mixedNumber",
    title: "Mixed Numbers",
    gen: H.mixedNumberQ,
    teach: [
      idea(
        "More Than One Whole",
        "When you have more pieces than fill one whole, you can write it two ways: as a mixed number, or as one big top-heavy fraction.",
        { kind: "fraction", bars: [{ num: 4, den: 4, label: "4/4 = 1 whole" }, { num: 1, den: 4, label: "plus 1/4" }] },
        "5/4 is the same as 1 and 1/4."
      ),
      check("One full bar plus one extra piece.", "5/4 as a mixed number", { kind: "fraction", bars: [{ num: 4, den: 4, label: "1 whole" }, { num: 1, den: 4, label: "+ 1/4" }] }, ["1 and 1/4", "5 and 1/4", "4 and 1/5"], 0, "Four fourths make one whole, with one fourth left over!"),
    ],
  },
  {
    id: "fracSub",
    title: "Subtracting Fractions",
    gen: H.fracSubQ,
    teach: [
      idea(
        "Take Away Slices",
        "When the slices are the same size, subtracting is just counting slices away. The slice size never changes.",
        { kind: "fraction", bars: [{ num: 5, den: 8, label: "5/8" }] },
        "Subtract the tops. The bottom stays put."
      ),
      { kind: "shade", text: "Shade 5 slices out of 8.", n: 8, shade: 5, label: "5/8" },
      check("Take 2 slices away from the 5.", "5/8 − 2/8 = ?", { kind: "fraction", bars: [{ num: 3, den: 8, label: "?" }] }, ["3/8", "3/16", "7/8"], 0, "Five slices take away two leaves three — still eighths!"),
    ],
  },
  {
    id: "fracAdd",
    title: "Adding Fractions",
    gen: MATH_GENERATORS.fracadd,
    teach: [
      idea(
        "Add Same-Size Slices",
        "Same-size slices add easily: count them up. The bottom number is the slice SIZE, so it never changes.",
        { kind: "fraction", bars: [{ num: 5, den: 8, label: "2/8 + 3/8" }] },
        "Add the tops. NEVER add the bottoms."
      ),
      { kind: "shade", text: "Shade 2 slices out of 8.", n: 8, shade: 2, label: "2/8" },
      { kind: "shade", text: "Now 3 more slices.", n: 8, shade: 3, pre: 2, label: "3/8 more" },
      check("Count every shaded slice.", "2/8 + 3/8 = ?", { kind: "fraction", bars: [{ num: 5, den: 8, label: "?" }] }, ["5/8", "5/16", "6/8"], 0, "Two slices plus three is five — still eighths!"),
    ],
  },
  {
    id: "decimalPlace",
    title: "Tenths & Hundredths",
    gen: H.decimalPlaceQ,
    teach: [
      idea(
        "Places After the Dot",
        "The dot separates whole things from parts of things. First spot after it is TENTHS, second is HUNDREDTHS.",
        { kind: "decgrid", shaded: 37, label: "0.37 = 37 hundredths" },
        "One digit = tenths. Two digits = hundredths."
      ),
      check("37 of the 100 squares are shaded.", "Write this as a decimal", { kind: "decgrid", shaded: 37, label: "?" }, ["0.37", "3.7", "0.037"], 0, "Thirty-seven hundredths — 0.37!"),
    ],
  },
  {
    id: "decimalCompare",
    title: "Comparing Decimals",
    gen: () => H.decimalCompareQ(),
    teach: [
      idea(
        "Line Up the Dots",
        "To compare decimals, line up the dots and check place by place, left to right. More digits does NOT mean bigger.",
        { kind: "decgrid", shaded: 60, label: "0.6" },
        "0.6 is bigger than 0.59 — check the tenths first."
      ),
      check("0.6 shades 60 squares. 0.59 shades 59.", "Which is bigger?", { kind: "decgrid", shaded: 60, label: "0.6" }, ["0.6", "0.59"], 0, "Six tenths beats five tenths — longer doesn't mean bigger!"),
    ],
  },
  {
    id: "convertUnits",
    title: "Converting Units",
    gen: H.convertUnitsQ,
    teach: [
      idea(
        "Trading Big for Small",
        "Going from a bigger unit to a smaller one means you'll need MORE of them — so you multiply.",
        { kind: "expr", parts: [{ text: "1 foot" }, { text: "=" }, { text: "12 inches", hot: true }] },
        "Big → small: multiply. Small → big: divide."
      ),
      {
        kind: "cards",
        text: "Tap each conversion to hear it!",
        cards: [
          { front: "1 foot", back: "= 12 inches", say: "One foot is twelve inches." },
          { front: "1 yard", back: "= 3 feet", say: "One yard is three feet." },
          { front: "1 meter", back: "= 100 centimeters", say: "One meter is one hundred centimeters." },
          { front: "1 pound", back: "= 16 ounces", say: "One pound is sixteen ounces." },
        ],
      },
      check("Each foot holds 12 inches.", "3 feet = ? inches", { kind: "expr", parts: [{ text: "3 × 12" }, { text: "= ?", hot: true }] }, ["36", "15", "312"], 0, "Three twelves — thirty-six inches!"),
    ],
  },
  {
    id: "areaFormula",
    title: "Area & Perimeter Formulas",
    gen: H.areaFormulaQ,
    teach: [
      idea(
        "Two Formulas, Two Jobs",
        "AREA = length × width, and it's measured in SQUARE units. PERIMETER adds up all four sides, in plain units.",
        { kind: "rect", w: 5, h: 3, mode: "area" },
        "Area multiplies. Perimeter adds."
      ),
      check("Count the tiles inside.", "Area of a 5 × 3 rectangle", { kind: "rect", w: 5, h: 3, mode: "area" }, ["15", "16", "8"], 0, "Five rows of three tiles — fifteen square units!"),
      check("Walk all four sides: 5 + 3 + 5 + 3.", "Perimeter of the same one", { kind: "rect", w: 5, h: 3, mode: "perimeter" }, ["16", "15", "8"], 0, "Two fives and two threes — sixteen units!"),
    ],
  },
  {
    id: "bigmult",
    title: "Multi-Digit Multiplication",
    gen: MATH_GENERATORS.bigmult,
    teach: [
      idea(
        "Multiply the Pieces",
        "You already know your facts. Split the big number into tens and ones, multiply each piece, then add the answers.",
        { kind: "split", a: 23, b: 4, op: "x" },
        "Split · multiply each piece · add."
      ),
      check("The tens piece first.", "20 × 4 = ?", { kind: "split", a: 23, b: 4, op: "x" }, ["80", "60", "24"], 0, "2 × 4 is 8, so 20 × 4 is eighty!"),
      check("Now the ones piece.", "3 × 4 = ?", { kind: "array", rows: 3, cols: 4, emoji: "🔵" }, ["12", "7", "16"], 0, "Three rows of four — twelve!"),
      check("Add the two pieces.", "80 + 12 = ?", { kind: "expr", parts: [{ text: "80 + 12" }, { text: "= ?", hot: true }] }, ["92", "82", "812"], 0, "Ninety-two — and that's 23 × 4!"),
    ],
  },
  {
    id: "longdiv",
    title: "Long Division",
    gen: MATH_GENERATORS.longdiv,
    teach: [
      idea(
        "Take Away Friendly Chunks",
        "Big division doesn't need one perfect guess. Take away chunks you know — ten at a time — until nothing is left, then count the chunks.",
        { kind: "expr", parts: [{ text: "84 ÷ 7" }, { text: "= 10 chunks + 2 chunks", hot: true }] },
        "Chunk it down, then count the chunks."
      ),
      check("Start with ten 7s.", "7 × 10 = ?", { kind: "expr", parts: [{ text: "7 × 10" }, { text: "= ?", hot: true }] }, ["70", "17", "77"], 0, "Times ten just adds a zero — seventy!"),
      check("See what's left of the 84.", "84 − 70 = ?", { kind: "expr", parts: [{ text: "84 − 70" }, { text: "= ?", hot: true }] }, ["14", "24", "10"], 0, "Fourteen left over!"),
      check("Share that 14 into 7s.", "14 ÷ 7 = ?", { kind: "groups", total: 14, per: 7, emoji: "🔵" }, ["2", "3", "7"], 0, "Two groups of seven — so 10 + 2 = 12 altogether!"),
    ],
  },

  /* ═══════════════ Math 5 ═══════════════ */
  {
    id: "fracMult",
    title: "Multiplying Fractions",
    gen: H.fracMultQ,
    teach: [
      idea(
        "A Part of a Part",
        "Multiplying fractions makes things SMALLER, because you're taking a piece of a piece. Half of a half is a quarter.",
        { kind: "fraction", bars: [{ num: 1, den: 2, label: "1/2" }, { num: 1, den: 4, label: "half of that = 1/4" }] },
        "Tops times tops, bottoms times bottoms."
      ),
      check("Half of one half.", "1/2 × 1/2 = ?", { kind: "fraction", bars: [{ num: 1, den: 4, label: "?" }] }, ["1/4", "2/4", "1/2"], 0, "1×1 over 2×2 — one fourth. Smaller than you started!"),
    ],
  },
  {
    id: "fracDiv",
    title: "Dividing Fractions",
    gen: () => H.fracDivQ(),
    teach: [
      idea(
        "Splitting a Piece Further",
        "Dividing a fraction by a whole number cuts each piece into even more pieces — so the bottom number gets bigger.",
        { kind: "fraction", bars: [{ num: 1, den: 2, label: "1/2" }, { num: 1, den: 6, label: "split 3 ways = 1/6" }] },
        "Split a piece and the pieces shrink."
      ),
      check("One half, cut three ways.", "1/2 ÷ 3 = ?", { kind: "fraction", bars: [{ num: 1, den: 6, label: "?" }] }, ["1/6", "3/2", "1/5"], 0, "Half split three ways gives sixths — 1/6!"),
    ],
  },
  {
    id: "decimalMult",
    title: "Multiplying Decimals",
    gen: H.decimalMultQ,
    teach: [
      idea(
        "Ignore the Dot, Then Put It Back",
        "Multiply as if the dots weren't there. Then count how many digits sat after the dots, and put the dot back that many places.",
        { kind: "expr", parts: [{ text: "0.4 × 3" }, { text: "→ 4 × 3 = 12 → 1.2", hot: true }] },
        "Count the decimal places, then replace the dot."
      ),
      check("4 × 3 = 12, and one digit was after a dot.", "0.4 × 3 = ?", { kind: "decgrid", shaded: 100, label: "1.2 (more than one whole)" }, ["1.2", "12", "0.12"], 0, "One decimal place, so the dot moves in once — 1.2!"),
    ],
  },
  {
    id: "decimalDiv",
    title: "Dividing Decimals",
    gen: () => H.decimalDivQ(),
    teach: [
      idea(
        "Keep the Dot Lined Up",
        "Dividing a decimal works just like normal division — as long as the dot in your answer stays directly above the dot inside.",
        { kind: "decgrid", shaded: 60, label: "0.6 shared 3 ways" },
        "Divide as usual. Keep the dot in line."
      ),
      check("0.6 shared into 3 equal parts.", "0.6 ÷ 3 = ?", { kind: "decgrid", shaded: 20, label: "0.2 each" }, ["0.2", "2", "0.02"], 0, "Six tenths split three ways is two tenths — 0.2!"),
    ],
  },
  {
    id: "percent",
    title: "Percents",
    gen: H.percentQ,
    teach: [
      idea(
        "Out of a Hundred",
        "Percent literally means 'per hundred'. 25% is 25 squares out of a hundred-square grid.",
        { kind: "decgrid", shaded: 25, label: "25%" },
        "% = out of 100."
      ),
      check("Half the grid is shaded.", "What percent is this?", { kind: "decgrid", shaded: 50, label: "?" }, ["50%", "5%", "500%"], 0, "Fifty out of a hundred — 50%!"),
      check("10% means 10 out of every 100.", "10% of 80 = ?", { kind: "decgrid", shaded: 10, label: "10%" }, ["8", "10", "80"], 0, "Ten percent is one tenth — 80 ÷ 10 = 8!"),
    ],
  },
  {
    id: "fdpConvert",
    title: "Fractions, Decimals & Percents",
    gen: () => H.fdpConvertQ(),
    teach: [
      idea(
        "Three Names, One Amount",
        "1/2, 0.5 and 50% are the SAME amount wearing three different outfits. Learning to swap between them is a superpower.",
        { kind: "decgrid", shaded: 50, label: "1/2 = 0.5 = 50%" },
        "Same size, different clothes."
      ),
      {
        kind: "cards",
        text: "Tap each one to hear all three names!",
        cards: [
          { front: "1/2", back: "0.5 · 50%", say: "One half is zero point five, or fifty percent." },
          { front: "1/4", back: "0.25 · 25%", say: "One fourth is zero point two five, or twenty five percent." },
          { front: "3/4", back: "0.75 · 75%", say: "Three fourths is zero point seven five, or seventy five percent." },
          { front: "1/10", back: "0.1 · 10%", say: "One tenth is zero point one, or ten percent." },
        ],
      },
      check("A quarter of the grid.", "1/4 as a percent", { kind: "decgrid", shaded: 25, label: "1/4" }, ["25%", "14%", "4%"], 0, "Twenty-five squares out of a hundred — 25%!"),
    ],
  },
  {
    id: "exponent",
    title: "Exponents",
    gen: H.exponentQ,
    teach: [
      idea(
        "A Shortcut for Repeated Multiplying",
        "The little raised number says how many times to MULTIPLY the number by itself. It is not how many times to add it.",
        { kind: "array", rows: 4, cols: 4, emoji: "🔵" },
        "4² means 4 × 4, not 4 + 4."
      ),
      check("Four rows of four tiles.", "4² = ?", { kind: "array", rows: 4, cols: 4, emoji: "🔵" }, ["16", "8", "44"], 0, "4 × 4 = 16. The trap is answering 8 — that's adding!"),
      check("Now three dimensions.", "2³ = ?", { kind: "solid", w: 2, h: 2, d: 2 }, ["8", "6", "23"], 0, "2 × 2 × 2 = 8 little cubes!"),
    ],
  },
  {
    id: "squareRoot",
    title: "Square Roots",
    gen: () => H.squareRootQ(),
    teach: [
      idea(
        "Working Backwards from a Square",
        "A square root asks the reverse question: what number times ITSELF makes this? It's the side length of a perfect square.",
        { kind: "array", rows: 5, cols: 5, emoji: "🟦" },
        "√25 = 5, because 5 × 5 = 25."
      ),
      check("25 tiles make a perfect square.", "√25 = ?", { kind: "array", rows: 5, cols: 5, emoji: "🟦" }, ["5", "12", "25"], 0, "Each side is 5 tiles long — that's the square root!"),
    ],
  },
  {
    id: "coord",
    title: "The Coordinate Plane",
    gen: () => H.coordQ(),
    teach: [
      idea(
        "Across, Then Up",
        "Coordinates give a point an exact address. The first number is how far ACROSS, the second is how far UP. Always that order.",
        { kind: "coord", points: [{ x: 3, y: 4, label: "(3, 4)" }] },
        "(across, up) — x always comes first."
      ),
      check("Three across, four up.", "Name this point", { kind: "coord", points: [{ x: 3, y: 4 }] }, ["(3, 4)", "(4, 3)", "(3, 3)"], 0, "Across 3, up 4 — that's (3, 4). Swapping lands somewhere else!"),
    ],
  },
  {
    id: "negative",
    title: "Negative Numbers",
    gen: H.negativeQ,
    teach: [
      idea(
        "Below Zero",
        "The number line doesn't stop at zero — it keeps going the other way. Those are negative numbers, like temperatures below freezing.",
        { kind: "negline", from: -6, to: 6, mark: -4 },
        "Further LEFT is always smaller."
      ),
      check("Which one sits further left?", "Colder: −4° or −1°?", { kind: "negline", from: -6, to: 6, mark: -4 }, ["−4°", "−1°"], 0, "−4 is further left, so it's colder. With negatives, bigger digits mean SMALLER!"),
    ],
  },
  {
    id: "volume",
    title: "Volume",
    gen: H.volumeQ,
    teach: [
      idea(
        "Filling the Inside",
        "Area covers a flat surface. VOLUME fills a solid — it counts the unit cubes that fit inside a box.",
        { kind: "solid", w: 4, h: 3, d: 2 },
        "Volume = length × height × depth."
      ),
      check("Count the cubes filling the box.", "4 × 3 × 2 = ?", { kind: "solid", w: 4, h: 3, d: 2 }, ["24", "9", "12"], 0, "Twenty-four cubes fit inside — that's the volume!"),
    ],
  },
  {
    id: "circle",
    title: "Parts of a Circle",
    gen: () => H.circleQ(),
    teach: [
      idea(
        "Radius and Diameter",
        "The RADIUS runs from the centre to the edge. The DIAMETER runs all the way across, through the centre — always exactly double.",
        { kind: "circle", r: 5, show: "radius" },
        "Diameter = 2 × radius."
      ),
      check("All the way across, through the middle.", "Radius 5 — what's the diameter?", { kind: "circle", r: 5, show: "diameter" }, ["10", "5", "25"], 0, "Double the radius — ten!"),
    ],
  },
  {
    id: "probability",
    title: "Probability",
    gen: () => H.probabilityQ(),
    teach: [
      idea(
        "How Likely Is It?",
        "Probability is a fraction: the outcomes you WANT, over ALL the possible outcomes.",
        { kind: "fraction", bars: [{ num: 3, den: 5, label: "3 red out of 5" }] },
        "what you want ÷ everything there is"
      ),
      check("3 of the 5 marbles are red.", "Chance of pulling red?", { kind: "fraction", bars: [{ num: 3, den: 5, label: "?" }] }, ["3/5", "3/2", "5/3"], 0, "Three reds out of five total — 3/5!"),
    ],
  },
  {
    id: "distributive",
    title: "The Distributive Property",
    gen: () => H.distributiveQ(),
    teach: [
      idea(
        "Split the Rectangle",
        "A group of (something plus something) can be split into two smaller groups. It's why breaking big numbers apart works at all.",
        { kind: "array", rows: 3, cols: 7, emoji: "🟦" },
        "3 × (4 + 3) = 3×4 + 3×3"
      ),
      check("Split the rows into 4 and 3.", "3 × (4 + 3) = ?", { kind: "array", rows: 3, cols: 7, emoji: "🟦" }, ["21", "10", "12"], 0, "3×4 is 12, 3×3 is 9, and 12 + 9 = 21. Same as 3 × 7!"),
    ],
  },
  {
    id: "algebra",
    title: "Solving for X",
    gen: H.algebraQ,
    teach: [
      idea(
        "The Balanced Scale",
        "An equation is a balanced scale. To find x, undo whatever was done to it — and do the SAME thing to both sides so it stays balanced.",
        { kind: "addObjects", emoji: "🔵", a: 5, b: 3, showTotal: true },
        "Undo the operation. Both sides. Every time."
      ),
      check("x and 3 together make 8.", "x + 3 = 8. x = ?", { kind: "addObjects", emoji: "🔵", a: 5, b: 3, showTotal: true }, ["5", "11", "8"], 0, "Take 3 off both sides: 8 − 3 = 5!"),
      check("4 equal groups make 12.", "4x = 12. x = ?", { kind: "groups", total: 12, per: 3, emoji: "🔵" }, ["3", "8", "48"], 0, "Split 12 into 4 equal groups — each is 3!"),
    ],
  },
  {
    id: "decimals",
    title: "Adding & Subtracting Decimals",
    gen: MATH_GENERATORS.decimals,
    teach: [
      idea(
        "Line Up the Dots",
        "Decimals add and subtract just like whole numbers — with one rule on top: the dots must line up, so tenths meet tenths and hundredths meet hundredths.",
        { kind: "decgrid", shaded: 40, label: "0.4" },
        "Dots under dots. Always."
      ),
      check("0.4 shaded, then 3 more tenths.", "0.4 + 0.3 = ?", { kind: "decgrid", shaded: 70, label: "?" }, ["0.7", "0.12", "7"], 0, "Four tenths plus three tenths is seven tenths — 0.7!"),
      check("Now take 2 tenths back off.", "0.7 − 0.2 = ?", { kind: "decgrid", shaded: 50, label: "?" }, ["0.5", "0.9", "5"], 0, "Seven tenths take away two tenths leaves five tenths — 0.5!"),
    ],
  },
  {
    id: "orderops",
    title: "Order of Operations",
    gen: MATH_GENERATORS.orderops,
    teach: [
      idea(
        "Some Jobs Go First",
        "When a sum mixes + and ×, the × always happens first. Without that rule, two people would get two different answers.",
        { kind: "expr", parts: [{ text: "5 +" }, { text: "2 × 3", hot: true }] },
        "Brackets → × and ÷ → + and −"
      ),
      check("The highlighted part goes first.", "5 + 2 × 3 = ?", { kind: "expr", parts: [{ text: "5 +" }, { text: "6", hot: true }] }, ["11", "21", "18"], 0, "2 × 3 is 6 first, then 5 + 6 = 11!"),
      check("Brackets beat everything.", "(4 + 2) × 3 = ?", { kind: "expr", parts: [{ text: "6", hot: true }, { text: "× 3" }] }, ["18", "10", "24"], 0, "Brackets make 6, then 6 × 3 = 18!"),
    ],
  },
];

export const SKILLS: Record<string, CourseSkill> = Object.fromEntries(
  SKILL_LIST.map((sk) => [sk.id, sk])
);

export const skillById = (id: string): CourseSkill | undefined => SKILLS[id];
