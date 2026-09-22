/**
 * The course-book lesson sequences. Two books, ~120 lessons each, walked in
 * order — so the girls can always see exactly which lesson they are on.
 *
 * Each lesson is [title, skillId, difficulty]. Difficulty (0-1) feeds the same
 * question generators the rest of the app uses, so a lesson early in Math 1 and
 * a lesson late in Math 2 can share a skill but feel completely different.
 */

export type LessonRow = [title: string, skill: string, d: number, review?: string[]];

export interface CourseUnit {
  title: string;
  emoji: string;
  rows: LessonRow[];
}

export interface CourseLesson {
  n: number;
  title: string;
  skill: string;
  d: number;
  review: string[];
  unit: number;
  unitTitle: string;
  unitEmoji: string;
}

export interface CourseBook {
  id: "math1" | "math2";
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  soft: string;
  units: CourseUnit[];
}

const MATH1: CourseBook = {
  id: "math1",
  title: "Math 1",
  subtitle: "Numbers, adding, subtracting & the world around us",
  emoji: "1️⃣",
  color: "#f97316",
  soft: "#fff7ed",
  units: [
    {
      title: "Numbers to 10",
      emoji: "🔢",
      rows: [
        ["Counting to 5", "count10", 0.1],
        ["Writing Numbers 1–5", "count10", 0.15],
        ["Counting to 10", "count10", 0.2],
        ["Writing Numbers 6–10", "count10", 0.25],
        ["The Number Line", "countSeq", 0.15],
        ["What Comes Next?", "countSeq", 0.2],
        ["Counting Backwards", "countBack", 0.2],
        ["More or Less", "compare", 0.15],
        ["Comparing Groups", "compare", 0.2],
        ["Equal Groups", "compare", 0.25],
        ["First, Second, Third", "ordinal", 0.2],
        ["Unit 1 Review", "count10", 0.3, ["countSeq", "compare", "ordinal"]],
      ],
    },
    {
      title: "Adding to 10",
      emoji: "➕",
      rows: [
        ["Putting Groups Together", "add5", 0.15],
        ["Adding 1", "add5", 0.15],
        ["Adding 2", "add5", 0.2],
        ["Adding to 5", "add5", 0.25],
        ["Number Bonds to 5", "numberBond", 0.2],
        ["Order Doesn't Matter", "add5", 0.3],
        ["Adding 0", "add5", 0.2],
        ["Doubles to 10", "doubles", 0.2],
        ["Number Bonds to 10", "numberBond", 0.35],
        ["Making 10", "numberBond", 0.4],
        ["Adding to 10", "add5", 0.4],
        ["Near Doubles", "doubles", 0.35],
        ["Addition Story Problems", "storyProblem", 0.2],
        ["Unit 2 Review", "numberBond", 0.4, ["add5", "doubles"]],
      ],
    },
    {
      title: "Subtracting to 10",
      emoji: "➖",
      rows: [
        ["Taking Away", "addsub20", 0.15],
        ["Subtracting 1", "addsub20", 0.15],
        ["Subtracting 2", "addsub20", 0.2],
        ["Subtracting from 5", "addsub20", 0.2],
        ["Subtracting 0 and All", "addsub20", 0.2],
        ["Subtracting from 10", "addsub20", 0.3],
        ["Missing Parts", "missing", 0.2],
        ["Fact Families to 10", "factFamily", 0.25],
        ["Add or Subtract?", "storyProblem", 0.3],
        ["Subtraction Story Problems", "storyProblem", 0.3],
        ["Fact Family Practice", "factFamily", 0.35],
        ["Unit 3 Review", "factFamily", 0.4, ["addsub20", "missing"]],
      ],
    },
    {
      title: "Shapes & Patterns",
      emoji: "🔷",
      rows: [
        ["Circles, Squares, Triangles", "shapes", 0.15],
        ["Rectangles and More", "shapes", 0.25],
        ["Sides and Corners", "sidesVertices", 0.2],
        ["Solid Shapes", "shape3d", 0.2],
        ["Shapes All Around Us", "shape3d", 0.3],
        ["Symmetry", "symmetry", 0.2],
        ["Shape Patterns", "pattern", 0.2],
        ["Color and Size Patterns", "pattern", 0.25],
        ["Number Patterns", "pattern", 0.35],
        ["Unit 4 Review", "shapes", 0.35, ["sidesVertices", "pattern"]],
      ],
    },
    {
      title: "Teen Numbers & Place Value",
      emoji: "📦",
      rows: [
        ["Ten and Some More", "teenPlace", 0.2],
        ["Teen Numbers 11–15", "teenPlace", 0.25],
        ["Teen Numbers 16–20", "teenPlace", 0.3],
        ["Tens and Ones", "tensones", 0.2],
        ["Counting by Tens", "skip", 0.2],
        ["Counting to 50", "count100", 0.3],
        ["Counting to 100", "count100", 0.4],
        ["The Hundred Chart", "count100", 0.45],
        ["10 More, 10 Less", "tenMoreLess", 0.3],
        ["Comparing 2-Digit Numbers", "compare", 0.4],
        ["Odd and Even", "oddEven", 0.25],
        ["Unit 5 Review", "tensones", 0.4, ["teenPlace", "count100"]],
      ],
    },
    {
      title: "Adding & Subtracting to 20",
      emoji: "⚡",
      rows: [
        ["Adding Teen Numbers", "addsub20", 0.35],
        ["Counting On", "addsub20", 0.35],
        ["Make a Ten to Add", "addsub20", 0.45],
        ["Doubles to 20", "doubles", 0.45],
        ["Near Doubles to 20", "doubles", 0.5],
        ["Adding Three Numbers", "addsub20", 0.5],
        ["Counting Back to Subtract", "addsub20", 0.4],
        ["Subtracting Teen Numbers", "addsub20", 0.45],
        ["Fact Families to 20", "factFamily", 0.45],
        ["Missing Addends", "missing", 0.4],
        ["Story Problems to 20", "storyProblem", 0.4],
        ["Speed Practice: Sums to 10", "add5", 0.5],
        ["Speed Practice: Sums to 20", "addsub20", 0.55],
        ["Unit 6 Review", "addsub20", 0.5, ["factFamily", "missing"]],
      ],
    },
    {
      title: "Measurement & Time",
      emoji: "📏",
      rows: [
        ["Longer and Shorter", "measure", 0.15],
        ["Measuring with Objects", "measure", 0.25],
        ["Inches and Feet", "measure", 0.35],
        ["Heavier and Lighter", "measure", 0.3],
        ["Telling Time: O'Clock", "timeHour", 0.2],
        ["Telling Time: Half Past", "timeHour", 0.3],
        ["Days of the Week", "calendar", 0.2],
        ["Months of the Year", "calendar", 0.25],
        ["Reading a Calendar", "calendar", 0.35],
        ["Morning, Noon and Night", "timeHour", 0.3],
        ["Time Practice", "timeHour", 0.4],
        ["Unit 7 Review", "measure", 0.4, ["timeHour", "calendar"]],
      ],
    },
    {
      title: "Money & Graphs",
      emoji: "🪙",
      rows: [
        ["Pennies and Nickels", "money", 0.2],
        ["Dimes and Quarters", "money", 0.3],
        ["Counting Pennies", "coinCount", 0.25],
        ["Counting Nickels and Dimes", "coinCount", 0.35],
        ["Mixed Coins", "coinCount", 0.45],
        ["Tally Marks", "graph", 0.2],
        ["Picture Graphs", "graph", 0.3],
        ["Bar Graphs", "graph", 0.35],
        ["Graph Story Problems", "graph", 0.4],
        ["Unit 8 Review", "coinCount", 0.45, ["money", "graph"]],
      ],
    },
    {
      title: "Skip Counting & Sharing",
      emoji: "🦘",
      rows: [
        ["Skip Counting by 2s", "skip", 0.25],
        ["Skip Counting by 5s", "skip", 0.3],
        ["Skip Counting by 10s", "skip", 0.3],
        ["Equal Groups", "repeatedAdd", 0.3],
        ["Sharing Equally", "shareEqually", 0.25],
        ["Halves", "fractionName", 0.2],
        ["Fourths", "fractionName", 0.3],
        ["Thirds", "fractionName", 0.35],
        ["Comparing Fractions", "fraccomp", 0.35],
        ["Half of a Group", "fractionOfSet", 0.3],
        ["Adding Tens", "tenMoreLess", 0.4],
        ["Unit 9 Review", "skip", 0.4, ["fractionName", "shareEqually"]],
      ],
    },
    {
      title: "Putting It All Together",
      emoji: "🏆",
      rows: [
        ["Two-Digit Addition", "add2digit", 0.35],
        ["Two-Digit Subtraction", "sub2digit", 0.35],
        ["Story Problems", "storyProblem", 0.45],
        ["Choosing the Operation", "storyProblem", 0.5],
        ["Two-Step Problems", "twoStep", 0.35],
        ["Fact Fluency Challenge", "addsub20", 0.6],
        ["Place Value Challenge", "tensones", 0.5],
        ["Measurement Challenge", "measure", 0.5],
        ["Money Challenge", "coinCount", 0.5],
        ["Math 1 Celebration", "addsub20", 0.6, ["tensones", "factFamily", "coinCount"]],
      ],
    },
  ],
};

const MATH2: CourseBook = {
  id: "math2",
  title: "Math 2",
  subtitle: "Bigger numbers, regrouping, multiplication & fractions",
  emoji: "2️⃣",
  color: "#0ea5e9",
  soft: "#f0f9ff",
  units: [
    {
      title: "Review & Place Value",
      emoji: "🔁",
      rows: [
        ["Numbers to 100", "count100", 0.4],
        ["Tens and Ones Review", "tensones", 0.4],
        ["Comparing Numbers", "compare", 0.45],
        ["Odd and Even", "oddEven", 0.4],
        ["Addition Facts Review", "add5", 0.5],
        ["Subtraction Facts Review", "addsub20", 0.5],
        ["Fact Families", "factFamily", 0.5],
        ["Doubles and Near Doubles", "doubles", 0.5],
        ["Making Ten", "numberBond", 0.5],
        ["10 More, 10 Less", "tenMoreLess", 0.4],
        ["Skip Counting Review", "skip", 0.4],
        ["Unit 1 Review", "tensones", 0.5, ["factFamily", "addsub20"]],
      ],
    },
    {
      title: "Two-Digit Addition",
      emoji: "➕",
      rows: [
        ["Adding Tens", "tenMoreLess", 0.45],
        ["Adding Tens and Ones", "add2digit", 0.3],
        ["Two-Digit Plus One-Digit", "add2digit", 0.35],
        ["Two-Digit Plus Two-Digit", "add2digit", 0.45],
        ["Breaking Numbers Apart", "add2digit", 0.5],
        ["Regrouping Ones into Tens", "add2digit", 0.55],
        ["Adding with Regrouping", "add2digit", 0.6],
        ["Regrouping Practice", "add2digit", 0.65],
        ["Adding Three Numbers", "addsub100", 0.6],
        ["Estimating Sums", "round", 0.4],
        ["Addition Story Problems", "storyProblem", 0.5],
        ["Checking Your Work", "add2digit", 0.6],
        ["Addition Speed Practice", "addsub100", 0.6],
        ["Unit 2 Review", "add2digit", 0.6, ["addsub100", "round"]],
      ],
    },
    {
      title: "Two-Digit Subtraction",
      emoji: "➖",
      rows: [
        ["Subtracting Tens", "tenMoreLess", 0.5],
        ["Two-Digit Minus One-Digit", "sub2digit", 0.3],
        ["Two-Digit Minus Two-Digit", "sub2digit", 0.45],
        ["Breaking Apart to Subtract", "sub2digit", 0.5],
        ["Regrouping a Ten", "sub2digit", 0.55],
        ["Subtracting with Regrouping", "sub2digit", 0.6],
        ["Regrouping Practice", "sub2digit", 0.65],
        ["Subtracting Across Zero", "sub2digit", 0.7],
        ["Checking with Addition", "factFamily", 0.55],
        ["Estimating Differences", "round", 0.45],
        ["Subtraction Story Problems", "storyProblem", 0.55],
        ["How Many More?", "storyProblem", 0.6],
        ["Subtraction Speed Practice", "addsub100", 0.65],
        ["Unit 3 Review", "sub2digit", 0.65, ["addsub100", "storyProblem"]],
      ],
    },
    {
      title: "Numbers to 1,000",
      emoji: "💯",
      rows: [
        ["Counting by Hundreds", "place100", 0.3],
        ["Hundreds, Tens and Ones", "place100", 0.4],
        ["Reading Three-Digit Numbers", "place100", 0.45],
        ["Expanded Form", "place100", 0.5],
        ["Comparing Three-Digit Numbers", "compare", 0.55],
        ["Ordering Numbers", "compare", 0.6],
        ["100 More, 100 Less", "place100", 0.55],
        ["Rounding to the Nearest Ten", "round", 0.45],
        ["Rounding to the Nearest Hundred", "round", 0.6],
        ["Adding Three-Digit Numbers", "addsub100", 0.6],
        ["Subtracting Three-Digit Numbers", "addsub100", 0.65],
        ["Unit 4 Review", "place100", 0.6, ["round", "compare"]],
      ],
    },
    {
      title: "Time",
      emoji: "🕐",
      rows: [
        ["Telling Time to the Hour", "timeHour", 0.35],
        ["Telling Time to the Half Hour", "timeHour", 0.45],
        ["Counting by Fives on the Clock", "timeFiveMin", 0.35],
        ["Telling Time to Five Minutes", "timeFiveMin", 0.5],
        ["Quarter Past and Quarter To", "timeFiveMin", 0.55],
        ["A.M. and P.M.", "timeHour", 0.5],
        ["Elapsed Time in Hours", "elapsed", 0.35],
        ["Elapsed Time in Minutes", "elapsed", 0.55],
        ["Calendars and Schedules", "calendar", 0.45],
        ["Unit 5 Review", "timeFiveMin", 0.55, ["elapsed", "calendar"]],
      ],
    },
    {
      title: "Money",
      emoji: "💵",
      rows: [
        ["Coin Review", "money", 0.4],
        ["Counting Coins", "coinCount", 0.45],
        ["Counting Mixed Coins", "coinCount", 0.55],
        ["Dollars and Cents", "coinCount", 0.6],
        ["Writing Money Amounts", "coinCount", 0.6],
        ["Comparing Money", "compare", 0.5],
        ["Adding Money", "addsub100", 0.55],
        ["Making Change", "makeChange", 0.4],
        ["Making Change Practice", "makeChange", 0.55],
        ["Money Story Problems", "storyProblem", 0.55],
        ["Shopping Challenge", "makeChange", 0.6],
        ["Unit 6 Review", "coinCount", 0.6, ["makeChange", "money"]],
      ],
    },
    {
      title: "Multiplication",
      emoji: "✖️",
      rows: [
        ["Equal Groups", "repeatedAdd", 0.35],
        ["Repeated Addition", "repeatedAdd", 0.45],
        ["Skip Counting by 2s and 5s", "skip", 0.45],
        ["Skip Counting by 3s and 4s", "skip", 0.55],
        ["What Is Multiplication?", "mult", 0.2],
        ["Arrays", "arrays", 0.3],
        ["Multiplying by 2", "mult", 0.3],
        ["Multiplying by 5", "mult", 0.35],
        ["Multiplying by 10", "mult", 0.35],
        ["Multiplying by 3", "mult", 0.45],
        ["Multiplying by 4", "mult", 0.5],
        ["Order Doesn't Matter", "arrays", 0.5],
        ["Multiplication Speed Practice", "mult", 0.6],
        ["Unit 7 Review", "mult", 0.55, ["arrays", "repeatedAdd"]],
      ],
    },
    {
      title: "Division & Fractions",
      emoji: "🍕",
      rows: [
        ["Sharing Equally", "shareEqually", 0.35],
        ["Making Equal Groups", "shareEqually", 0.5],
        ["What Is Division?", "div", 0.25],
        ["Dividing by 2", "div", 0.3],
        ["Dividing by 5 and 10", "div", 0.45],
        ["Multiplication and Division Families", "factFamily", 0.6],
        ["Halves, Thirds and Fourths", "fractionName", 0.4],
        ["Naming Fractions", "fractionName", 0.55],
        ["Comparing Fractions", "fraccomp", 0.5],
        ["Equal Fractions", "fraccomp", 0.6],
        ["Fractions of a Group", "fractionOfSet", 0.5],
        ["Unit 8 Review", "div", 0.55, ["fractionName", "shareEqually"]],
      ],
    },
    {
      title: "Measurement & Geometry",
      emoji: "📐",
      rows: [
        ["Measuring in Inches", "measure", 0.4],
        ["Inches, Feet and Yards", "measure", 0.55],
        ["Centimeters and Meters", "measure", 0.6],
        ["Estimating Length", "measure", 0.5],
        ["Perimeter", "perim", 0.35],
        ["Area", "perim", 0.5],
        ["Flat Shapes Review", "shapes", 0.45],
        ["Sides, Corners and Angles", "sidesVertices", 0.45],
        ["Solid Shapes", "shape3d", 0.45],
        ["Symmetry", "symmetry", 0.4],
        ["Shape Patterns", "pattern", 0.5],
        ["Unit 9 Review", "perim", 0.55, ["measure", "shapes"]],
      ],
    },
    {
      title: "Problem Solving",
      emoji: "🏆",
      rows: [
        ["Reading Graphs", "graph", 0.45],
        ["Bar Graphs and Line Plots", "graph", 0.55],
        ["One-Step Story Problems", "storyProblem", 0.6],
        ["Two-Step Story Problems", "twoStep", 0.45],
        ["Choosing the Operation", "twoStep", 0.6],
        ["Multi-Step Challenge", "twoStep", 0.7],
        ["Fact Fluency Challenge", "mult", 0.7],
        ["Math 2 Celebration", "addsub100", 0.7, ["mult", "place100", "storyProblem"]],
      ],
    },
  ],
};

export const BOOKS: CourseBook[] = [MATH1, MATH2];

function flatten(book: CourseBook): CourseLesson[] {
  const out: CourseLesson[] = [];
  let n = 0;
  book.units.forEach((u, ui) => {
    for (const row of u.rows) {
      n += 1;
      out.push({
        n,
        title: row[0],
        skill: row[1],
        d: row[2],
        review: row[3] ?? [],
        unit: ui + 1,
        unitTitle: u.title,
        unitEmoji: u.emoji,
      });
    }
  });
  return out;
}

export const COURSE_LESSONS: Record<"math1" | "math2", CourseLesson[]> = {
  math1: flatten(MATH1),
  math2: flatten(MATH2),
};

export const bookById = (id: "math1" | "math2"): CourseBook =>
  BOOKS.find((b) => b.id === id)!;
