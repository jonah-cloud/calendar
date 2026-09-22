/**
 * Teaching quality gate.
 *  1. every lesson opens with a `concept` card (introduce before you drill)
 *  2. no numeric question is ever text-only — it must carry a picture
 *  3. every lesson's skill exists and every course lesson maps to a skill
 */
import { SKILLS } from "../src/lib/content/course/skills.ts";
import { COURSE_LESSONS } from "../src/lib/content/course/lessons.ts";
import { MATH_INTERACTIVE } from "../src/lib/content/mathInteractive.ts";

let bad = 0;
const fail = (m) => { console.log("  ✗ " + m); bad++; };

const hasNumbers = (s) => /\d/.test(s ?? "");

function auditSteps(label, steps) {
  if (!steps?.length) return fail(`${label}: no teaching steps`);
  if (steps[0].kind !== "concept") fail(`${label}: does not open with a concept card (opens with "${steps[0].kind}")`);
  steps.forEach((st, i) => {
    if (st.kind !== "pick") return;
    const numeric = hasNumbers(st.ask) || hasNumbers(st.text);
    const pictured = !!st.viz || !!st.visual;
    if (numeric && !pictured) fail(`${label} step ${i + 1}: numeric question with NO picture — "${st.ask ?? st.text}"`);
    const q = st.ask ?? st.text;
    if (q.length > 70) fail(`${label} step ${i + 1}: question line too long for a 6-year-old (${q.length} chars)`);
  });
}

console.log("— course skills —");
for (const [id, sk] of Object.entries(SKILLS)) auditSteps(`skill:${id}`, sk.teach);

console.log("— original lesson bank —");
for (const [id, steps] of Object.entries(MATH_INTERACTIVE)) auditSteps(`bank:${id}`, steps);

console.log("— course lessons —");
let n = 0;
for (const [book, lessons] of Object.entries(COURSE_LESSONS)) {
  n += lessons.length;
  for (const l of lessons) {
    if (!SKILLS[l.skill]) fail(`${book} L${l.n} "${l.title}": unknown skill "${l.skill}"`);
    for (const r of l.review) if (!SKILLS[r]) fail(`${book} L${l.n}: unknown review skill "${r}"`);
  }
}

console.log(`\n${n} lessons · ${Object.keys(SKILLS).length} skills · ${Object.keys(MATH_INTERACTIVE).length} bank lessons`);
console.log(bad ? `\n❌ ${bad} problem(s)` : "\n✅ all teaching passes");
process.exit(bad ? 1 : 0);
