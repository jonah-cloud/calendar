import { useMemo, useState } from "react";
import type { View } from "../App";
import LessonFlow from "../components/LessonFlow";
import { Confetti, BigButton, KidBg } from "../components/Ui";
import CoachCharacter from "../components/CoachCharacter";
import { coachFor } from "../lib/coaches";
import { subjectById } from "../lib/content";
import { COURSE_LESSONS, bookById } from "../lib/content/course/lessons";
import { SKILLS } from "../lib/content/course/skills";
import { speak } from "../lib/speech";
import { useStore } from "../lib/store";
import type { CourseBookId, Kid, UnitDef } from "../lib/types";

/**
 * One course-book lesson: Dash introduces the concept, they work through the
 * interactive activity, practise it, then mark it done and move to the next.
 * The whole thing runs on the shared LessonFlow, so course lessons and the
 * mastery-map lessons teach identically.
 */
export default function CourseLessonScreen({
  kid,
  book,
  lesson,
  go,
}: {
  kid: Kid;
  book: CourseBookId;
  lesson: number;
  go: (v: View) => void;
}) {
  const { dispatch } = useStore();
  const [finished, setFinished] = useState(false);

  const def = subjectById("math");
  const coach = coachFor("math");
  const bookDef = bookById(book);
  const l = COURSE_LESSONS[book].find((x) => x.n === lesson);
  const skill = l ? SKILLS[l.skill] : undefined;
  const total = COURSE_LESSONS[book].length;

  // a synthetic unit so LessonFlow can generate practice at this lesson's level
  const unit: UnitDef | undefined = useMemo(
    () =>
      l && skill
        ? { id: `${book}:${l.n}`, title: l.title, emoji: l.unitEmoji, gen: () => skill.gen(l.d) }
        : undefined,
    [book, l, skill]
  );

  if (!l || !skill || !unit) {
    return (
      <KidBg from={bookDef.color} className="p-6">
        <div className="max-w-md mx-auto card p-6 text-center mt-10">
          <div className="text-5xl">🤔</div>
          <p className="font-black text-gray-700 mt-2">That lesson isn't ready yet.</p>
          <BigButton onClick={() => go({ name: "course", kidId: kid.id })} color={bookDef.color} className="w-full mt-4">
            Back to the map
          </BigButton>
        </div>
      </KidBg>
    );
  }

  const isLast = lesson >= total;
  const nextLesson = () => {
    if (isLast) go({ name: "course", kidId: kid.id });
    else go({ name: "courseLesson", kidId: kid.id, book, lesson: lesson + 1 });
  };

  if (finished) {
    return (
      <KidBg from={bookDef.color} className="p-4">
        <Confetti />
        <div className="max-w-md mx-auto card p-6 text-center mt-10 animate-pop">
          <CoachCharacter subject="math" size={120} mood="excited" />
          <div className="font-black text-xs uppercase tracking-widest mt-2" style={{ color: bookDef.color }}>
            {bookDef.title} · Lesson {l.n} complete
          </div>
          <h2 className="font-black text-2xl text-gray-800 mt-1">{l.title}</h2>
          <p className="font-bold text-gray-500 mt-2">
            {isLast
              ? `That's the whole of ${bookDef.title}. Incredible work!`
              : `Next up: Lesson ${l.n + 1}`}
          </p>
          <BigButton onClick={nextLesson} color={bookDef.color} className="w-full mt-5">
            {isLast ? "🎉 See the map" : `Lesson ${l.n + 1} ▶`}
          </BigButton>
          <button
            onClick={() => go({ name: "course", kidId: kid.id })}
            className="mt-3 font-black text-sm"
            style={{ color: bookDef.color }}
          >
            back to the map 🗺️
          </button>
        </div>
      </KidBg>
    );
  }

  return (
    <LessonFlow
      def={{ ...def, color: bookDef.color, soft: bookDef.soft }}
      coach={coach}
      unit={unit}
      unitLabel={`${bookDef.title} · Lesson ${l.n} of ${total}`}
      steps={skill.teach}
      missionTitle={l.title}
      fluency={false}
      onDone={() => {
        dispatch({ type: "COURSE_LESSON_DONE", kidId: kid.id, book, lesson });
        speak(`Lesson ${l.n} complete! ${l.title}. Nice work.`, coach.voice);
        setFinished(true);
      }}
      onExit={() => go({ name: "course", kidId: kid.id })}
    />
  );
}
