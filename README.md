# ⚡ Spark Academy

A **2-Hour-Learning-style home school app** for the girls — inspired by everything we could find
about **Alpha School** (Austin, TX) and co-founder **MacKenzie Price**'s "2 Hour Learning" model.

Five subjects — **Math · Reading · Spanish · Music · Science** — each with 6 levels × 4 skills,
a mastery engine, spaced review, Spark Bucks, rings, streaks, a rewards store, afternoon
life-skill workshops, and a parent "Guide" dashboard.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

No backend, no accounts — everything is saved in the browser's `localStorage` on the device you
use it on (great for a family tablet). To deploy: push to Vercel/Netlify, framework = Vite.

## How Alpha School works → what this app does

Everything below came from Alpha School's own materials, founder interviews, and independent
reviews (sources at the bottom).

| Alpha School | Spark Academy |
| --- | --- |
| 2 hours of academics/day: four ~25-min **Pomodoro** blocks (math, reading, language, science) | Daily plan of 4 focus blocks (length adjustable 5–25 min for younger kids), one subject each |
| **Mastery-based**: 90%+ accuracy required before new material unlocks | Every skill needs **9/10 (90%)** on a round to master; levels unlock only when all skills are mastered |
| Kids **placed at learning level, not age/grade** ("a 2nd grader ready for 5th-grade math gets 5th-grade math") | A placement ladder quiz per subject sets each girl's starting level; sisters can be at different levels per subject |
| Lessons tuned to the **80–85% success zone** (zone of proximal development) | Question difficulty ramps within each round; retry loops keep kids in the challenge zone |
| Diagnostics find **knowledge gaps** and fill them first; spaced practice | Mastered skills return on a **spaced review schedule** (2 → 4 → 8 → … days); failed reviews come back the next day |
| **No teachers — "Guides"** who only motivate and support | The Guide Dashboard tells parents exactly that: your job is motivation; the app does instruction |
| **Alpha Bucks** token economy: kids earn currency for hitting daily "minimums," spend on real rewards | **Spark Bucks**: +1/correct, +10 mastery, +25 level-up, +20 all-rings, streak bonuses; parent-managed rewards store with approvals |
| Apple-Watch-style **progress rings** close when a Pomodoro is finished at mastery | Daily rings close as blocks complete; all-rings bonus + 🔥 streaks |
| Afternoons = **life-skills workshops**: public speaking ("Street Speak"), entrepreneurship (K-1 lemonade stand → TED talk), financial literacy, grit (Rubik's-cube/juggle/run triathlon) | 15 afternoon **workshop quests** (lemonade stand boss, dinner-table TED talk, star reporter, Spark triathlon, grocery math mission…) with parent approval and big Buck payouts |
| Standards: Common Core K–8 via adaptive apps (IXL ≈80% of work, Math Academy, Khan Academy, Newsela, Alpha's own apps), routed by their "Dash"/Timeback platform | Original question banks + procedural generators aligned to the same K–5 skill ladder (counting → fractions/decimals; phonics → figurative language; etc.) |
| Results claimed: 2.4–2.6× growth on NWEA MAP, top 1–2% nationally | Guide dashboard tracks minutes, 7-day accuracy, skills mastered, and level progress per subject |

**The honest caveat** from independent reviews: the "2 hours" is really ~2.5–3.5 hours in
practice, and the apps alone aren't the magic — *the structure, the incentive economy, and an
adult cheering them on* are what make it work. The app builds in the structure; you bring the
cheering.

## The girls' daily flow

1. Pick your face on the home screen 👧👧
2. First time in each subject: **placement adventure** finds your level
3. Close your rings: 4 focus blocks (Math, Reading, Spanish + Music/Science rotating)
4. 90% = ⭐ mastered → Bucks → level up
5. Review rounds keep old skills strong 🔁
6. Afternoon: pick a workshop quest 🏕️
7. Spend Bucks in the Spark Store (grown-up approves) 🎁

## Sources

- [Alpha School — The Program](https://alpha.school/the-program/)
- [What is 2 Hour Learning?](https://alpha.school/2-hour-learning/)
- [MacKenzie Price — 2 Hour Learning founder](https://2hourlearning.com/founder/)
- [How AI and Gamification Transform Learning at Alpha School](https://alpha.school/blog/how-ai-and-gamification-transform-learning-at-alpha-school/)
- [The Two-Hour School Day](https://alpha.school/blog/the-two-hour-school-day-how-ai-tutors-are-redefining-learning-efficiency/)
- [Learning at the Speed of Thought — AI tutors](https://alpha.school/blog/learning-at-the-speed-of-thought-how-ai-tutors-make-every-lesson-personal/)
- [Life Skills Workshops at Alpha School](https://alpha.school/blog/life-skills-workshops-at-alpha-school-creating-future-ready-students/)
- [Alpha School — Wikipedia](https://en.wikipedia.org/wiki/Alpha_School)
- [Scott Alexander — "Your Review: Alpha School" (independent deep-dive)](https://www.astralcodexten.com/p/your-review-alpha-school)
- [Austin Scholar — The Alpha App Stack](https://austinscholar.substack.com/p/austin-scholar-177-the-alpha-app)
- [2-Sigma in 2 Hours (Cognitive Revolution)](https://www.cognitiverevolution.ai/2-sigma-in-2-hours-how-alpha-schools-are-using-ai-to-revolutionize-education/)
- [Forbes — Alpha School: Using AI To Unleash Students](https://www.forbes.com/sites/rayravaglia/2025/02/10/alpha-school-using-ai-to-unleash-students-and-transform-teaching/)
- [The Hunt Institute — AI Tutoring in Schools](https://hunt-institute.org/resources/2025/06/ai-tutoring-alpha-school-personalized-learning-technology-k-12-education/)
- [Future of Education — 4 (Controversial) Motivation Systems](https://futureofeducation.substack.com/p/4-controversial-motivation-systems)

Spark Academy is an original, independent project inspired by publicly reported ideas — it is not
affiliated with Alpha School or 2 Hour Learning.
