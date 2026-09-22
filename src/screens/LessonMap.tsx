import { useEffect, useMemo, useRef, useState } from "react";
import type { View } from "../App";
import { BOOKS, COURSE_LESSONS, bookById } from "../lib/content/course/lessons";
import { SKILLS } from "../lib/content/course/skills";
import { useStore } from "../lib/store";
import { BigButton, KidBg } from "../components/Ui";
import CoachCharacter from "../components/CoachCharacter";
import type { CourseBookId, Kid } from "../lib/types";

/**
 * The course map: the girls' answer to "what lesson am I on?".
 *
 * The current lesson is the loudest thing on the screen — a hero card with the
 * number, the title, the unit it belongs to and one button that starts it.
 * Below it the whole book is laid out unit by unit so they can see how far
 * they've come and what's coming next.
 */
export default function LessonMap({ kid, go }: { kid: Kid; go: (v: View) => void }) {
  const { dispatch } = useStore();
  const course = kid.course;
  const [book, setBook] = useState<CourseBookId>(course?.book ?? "math1");
  const currentRef = useRef<HTMLButtonElement>(null);

  const lessons = COURSE_LESSONS[book];
  const def = bookById(book);
  const done = useMemo(() => new Set(course?.done ?? []), [course?.done]);

  // the lesson they're on — only meaningful in the book they're actually in
  const onThisBook = course?.book === book;
  const currentN = onThisBook ? course!.lesson : null;
  const current = currentN ? lessons.find((l) => l.n === currentN) : null;

  const doneInBook = lessons.filter((l) => done.has(`${book}:${l.n}`)).length;
  const pct = Math.round((doneInBook / lessons.length) * 100);

  // scroll the current lesson into view on open
  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [book]);

  const startLesson = (n: number) => {
    dispatch({ type: "COURSE_GOTO", kidId: kid.id, book, lesson: n });
    go({ name: "courseLesson", kidId: kid.id, book, lesson: n });
  };

  // group lessons by unit for display
  const units = useMemo(() => {
    const out: { n: number; title: string; emoji: string; lessons: typeof lessons }[] = [];
    for (const l of lessons) {
      let u = out.find((x) => x.n === l.unit);
      if (!u) {
        u = { n: l.unit, title: l.unitTitle, emoji: l.unitEmoji, lessons: [] };
        out.push(u);
      }
      u.lessons.push(l);
    }
    return out;
  }, [lessons]);

  return (
    <KidBg from={def.color} className="p-4 pb-20">
      <div className="max-w-2xl mx-auto">
        {/* header */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => go({ name: "kid", kidId: kid.id })}
            className="w-11 h-11 rounded-2xl bg-white/90 text-xl btn-soft shrink-0"
          >
            ⬅️
          </button>
          <h1 className="font-black text-2xl text-gray-800">📘 Math Course</h1>
        </div>

        {/* book picker */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1 -mx-1 px-1">
          {BOOKS.map((b) => {
            const active = b.id === book;
            const bDone = COURSE_LESSONS[b.id].filter((l) => done.has(`${b.id}:${l.n}`)).length;
            return (
              <button
                key={b.id}
                onClick={() => setBook(b.id)}
                className="shrink-0 rounded-2xl px-4 py-2.5 btn-soft text-left"
                style={{
                  background: active ? b.color : "#fff",
                  color: active ? "#fff" : "#6b7280",
                  border: `3px solid ${active ? b.color : "#e5e7eb"}`,
                }}
              >
                <div className="font-black text-[15px] whitespace-nowrap">
                  {b.emoji} {b.title}
                </div>
                <div className="text-[11px] font-bold opacity-80">
                  {bDone}/{COURSE_LESSONS[b.id].length} done
                </div>
              </button>
            );
          })}
        </div>

        {/* YOU ARE HERE */}
        {current ? (
          <div className="card mt-4 overflow-hidden animate-pop">
            <div
              className="px-5 py-2 text-white font-black text-xs uppercase tracking-widest"
              style={{ background: def.color }}
            >
              ⭐ You are here
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3">
                <CoachCharacter subject="math" size={86} mood="idle" />
                <div className="min-w-0">
                  <div className="font-black text-[13px] uppercase tracking-wide" style={{ color: def.color }}>
                    Lesson {current.n} of {lessons.length}
                  </div>
                  <div className="font-black text-2xl text-gray-800 leading-tight">{current.title}</div>
                  <div className="text-sm font-bold text-gray-500 mt-0.5">
                    {current.unitEmoji} Unit {current.unit} · {current.unitTitle}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs font-black mb-1" style={{ color: def.color }}>
                  <span>{def.title} progress</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bar-shine transition-all duration-700"
                    style={{ width: `${Math.max(pct, 2)}%`, background: def.color }}
                  />
                </div>
              </div>

              <BigButton onClick={() => startLesson(current.n)} color={def.color} className="w-full mt-4">
                Start Lesson {current.n} ▶
              </BigButton>
            </div>
          </div>
        ) : (
          <div className="card mt-4 p-5 text-center">
            <div className="text-4xl">{def.emoji}</div>
            <div className="font-black text-xl text-gray-800 mt-1">{def.title}</div>
            <div className="text-sm font-bold text-gray-500 mt-1">{def.subtitle}</div>
            <BigButton onClick={() => startLesson(1)} color={def.color} className="w-full mt-4">
              Start at Lesson 1 ▶
            </BigButton>
          </div>
        )}

        {/* the whole book, unit by unit */}
        <div className="mt-6 space-y-4">
          {units.map((u) => {
            const uDone = u.lessons.filter((l) => done.has(`${book}:${l.n}`)).length;
            const complete = uDone === u.lessons.length;
            return (
              <div key={u.n} className="card p-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{u.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-gray-800 leading-tight">
                      Unit {u.n} · {u.title}
                    </div>
                    <div className="text-xs font-bold text-gray-400">
                      Lessons {u.lessons[0].n}–{u.lessons[u.lessons.length - 1].n}
                    </div>
                  </div>
                  <div className="text-sm font-black shrink-0" style={{ color: complete ? "#16a34a" : def.color }}>
                    {complete ? "✅" : `${uDone}/${u.lessons.length}`}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                  {u.lessons.map((l) => {
                    const isDone = done.has(`${book}:${l.n}`);
                    const isCurrent = l.n === currentN;
                    const skill = SKILLS[l.skill];
                    return (
                      <button
                        key={l.n}
                        ref={isCurrent ? currentRef : undefined}
                        onClick={() => startLesson(l.n)}
                        className="rounded-2xl p-2.5 text-left btn-soft flex items-start gap-2"
                        style={{
                          background: isCurrent ? def.soft : "#fff",
                          border: `3px solid ${isCurrent ? def.color : isDone ? "#bbf7d0" : "#eef0f4"}`,
                          boxShadow: isCurrent ? `0 5px 0 ${def.color}55` : undefined,
                        }}
                      >
                        <span
                          className="shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black text-white"
                          style={{ background: isDone ? "#22c55e" : isCurrent ? def.color : "#cbd5e1" }}
                        >
                          {isDone ? "✓" : l.n}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-black text-[13px] text-gray-800 leading-tight">
                            {l.title}
                          </span>
                          {isCurrent && (
                            <span className="block text-[11px] font-black mt-0.5" style={{ color: def.color }}>
                              ⭐ you're here
                            </span>
                          )}
                          {!isCurrent && skill && (
                            <span className="block text-[11px] font-bold text-gray-400 truncate">
                              {skill.title}
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </KidBg>
  );
}
