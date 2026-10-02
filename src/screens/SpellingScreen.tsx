import { useEffect, useRef, useState } from "react";
import type { View } from "../App";
import CoachCharacter from "../components/CoachCharacter";
import { BigButton, Confetti, KidBg } from "../components/Ui";
import { coachFor } from "../lib/coaches";
import {
  PASSES_NEEDED,
  SPELLING_LEVELS,
  SPELLING_LISTS,
  TOTAL_LISTS,
  listByNumber,
} from "../lib/content/spelling/lists";
import { shuffle } from "../lib/rand";
import { speak, stopSpeaking } from "../lib/speech";
import { useStore } from "../lib/store";
import type { Kid } from "../lib/types";

const COLOR = "#7c3aed";
const SOFT = "#f5f3ff";

export default function SpellingScreen({ kid, go }: { kid: Kid; go: (v: View) => void }) {
  const { dispatch } = useStore();
  const coach = coachFor("reading");

  const sp = kid.spelling;
  const [listN, setListN] = useState(sp?.list ?? 1);
  const list = listByNumber(Math.min(listN, TOTAL_LISTS)) ?? SPELLING_LISTS[0];

  const [mode, setMode] = useState<"home" | "test" | "result">("home");
  const [queue, setQueue] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [missed, setMissed] = useState<string[]>([]);
  const [shown, setShown] = useState<"none" | "right" | "wrong">("none");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => stopSpeaking(), []);

  const passes = sp?.passes[list.n] ?? 0;
  const isPassed = (sp?.passed ?? []).includes(list.n);

  const say = (w: string) => speak(`${w}. ${w}.`, coach.voice);

  const start = () => {
    const q = shuffle([...list.words]);
    setQueue(q);
    setIdx(0);
    setTyped("");
    setMissed([]);
    setShown("none");
    setMode("test");
    setTimeout(() => { say(q[0]); inputRef.current?.focus(); }, 350);
  };

  const submit = () => {
    if (shown !== "none") return;
    const want = queue[idx];
    const got = typed.trim();
    const right = got.toLowerCase() === want.toLowerCase();
    if (!right) setMissed((m) => [...m, want]);
    setShown(right ? "right" : "wrong");
    speak(right ? "Yes!" : `Not quite. ${want} is spelled ${want.split("").join(", ")}.`, coach.voice);
    setTimeout(
      () => {
        const next = idx + 1;
        if (next >= queue.length) {
          const missedNow = right ? missed : [...missed, want];
          dispatch({
            type: "SPELLING_RUN",
            kidId: kid.id,
            list: list.n,
            correct: queue.length - missedNow.length,
            total: queue.length,
            missed: missedNow,
          });
          setMode("result");
          return;
        }
        setIdx(next);
        setTyped("");
        setShown("none");
        say(queue[next]);
        inputRef.current?.focus();
      },
      right ? 700 : 2600
    );
  };

  /* ---------------- the test ---------------- */
  if (mode === "test") {
    const want = queue[idx];
    return (
      <KidBg from={COLOR} className="p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between pt-2">
            <button onClick={() => setMode("home")} className="w-11 h-11 rounded-2xl bg-white/90 text-xl btn-soft">
              ✖️
            </button>
            <div className="font-black text-white bg-black/20 rounded-2xl px-4 py-2">
              Word {idx + 1} of {queue.length}
            </div>
          </div>

          <div className="card p-6 mt-5 text-center">
            <CoachCharacter subject="reading" size={100} mood={shown === "right" ? "excited" : "idle"} />
            <button
              onClick={() => say(want)}
              className="mt-2 rounded-2xl px-5 py-3 font-black text-lg btn-soft"
              style={{ background: SOFT, color: COLOR }}
            >
              🔊 Say it again
            </button>

            <input
              ref={inputRef}
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              disabled={shown !== "none"}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              placeholder="type the word"
              className="w-full mt-5 text-center text-3xl font-black rounded-2xl px-4 py-4 outline-none"
              style={{
                border: `4px solid ${shown === "right" ? "#22c55e" : shown === "wrong" ? "#ef4444" : COLOR + "44"}`,
                background: shown === "right" ? "#dcfce7" : shown === "wrong" ? "#fee2e2" : "#fff",
              }}
            />

            {shown === "wrong" && (
              <div className="mt-3 animate-pop">
                <div className="font-black text-red-500">It's spelled</div>
                <div className="font-black text-3xl tracking-[0.2em] text-gray-800">{want}</div>
              </div>
            )}
            {shown === "right" && <div className="mt-3 font-black text-2xl text-green-600 animate-pop">✅ Yes!</div>}

            {shown === "none" && (
              <BigButton onClick={submit} color={COLOR} className="w-full mt-4" disabled={!typed.trim()}>
                Check it ✏️
              </BigButton>
            )}
          </div>

          {/* dots for the ten words */}
          <div className="flex justify-center gap-1.5 mt-4 flex-wrap">
            {queue.map((_, i) => (
              <span
                key={i}
                className="w-3 h-3 rounded-full"
                style={{
                  background:
                    i < idx || (i === idx && shown !== "none")
                      ? missed.includes(queue[i])
                        ? "#ef4444"
                        : "#22c55e"
                      : "#ffffff66",
                }}
              />
            ))}
          </div>
        </div>
      </KidBg>
    );
  }

  /* ---------------- result ---------------- */
  if (mode === "result") {
    const correct = list.words.length - missed.length;
    const perfect = missed.length === 0;
    const nowPasses = sp?.passes[list.n] ?? 0;
    const justPassed = (sp?.passed ?? []).includes(list.n);
    return (
      <KidBg from={COLOR} className="p-4">
        {perfect && <Confetti />}
        <div className="max-w-md mx-auto card p-6 mt-8 text-center animate-pop">
          <CoachCharacter subject="reading" size={110} mood={perfect ? "excited" : "idle"} />
          <div className="font-black text-2xl text-gray-800 mt-2">
            {correct} out of {list.words.length}
          </div>

          {perfect ? (
            <div className="font-black text-lg text-green-600 mt-1">⭐ Perfect spelling!</div>
          ) : (
            <div className="font-black text-gray-500 mt-1">So close — try it again!</div>
          )}

          {/* the two stars a list needs */}
          <div className="flex justify-center gap-3 mt-4">
            {Array.from({ length: PASSES_NEEDED }, (_, i) => (
              <div
                key={i}
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{
                  background: i < nowPasses ? "#fef3c7" : "#f9fafb",
                  border: `3px solid ${i < nowPasses ? "#f59e0b" : "#e5e7eb"}`,
                }}
              >
                {i < nowPasses ? "⭐" : "☆"}
              </div>
            ))}
          </div>
          <div className="font-bold text-sm text-gray-500 mt-2">
            {justPassed
              ? `🎉 Week ${list.n} passed! Two perfect runs.`
              : `${nowPasses} of ${PASSES_NEEDED} perfect runs — spell them all right ${PASSES_NEEDED - nowPasses} more time${PASSES_NEEDED - nowPasses === 1 ? "" : "s"} to pass.`}
          </div>

          {missed.length > 0 && (
            <div className="mt-4 rounded-2xl p-3 text-left" style={{ background: "#fef2f2" }}>
              <div className="font-black text-xs uppercase tracking-wide text-red-500">practise these</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {missed.map((w) => (
                  <button
                    key={w}
                    onClick={() => say(w)}
                    className="rounded-xl px-3 py-1.5 font-black bg-white btn-soft text-red-600 border-2 border-red-200"
                  >
                    🔊 {w}
                  </button>
                ))}
              </div>
            </div>
          )}

          <BigButton onClick={start} color={COLOR} className="w-full mt-5">
            {justPassed ? "🔁 Try it again anyway" : "✏️ Try the list again"}
          </BigButton>
          <button onClick={() => setMode("home")} className="mt-3 font-black text-sm" style={{ color: COLOR }}>
            back to the chart
          </button>
        </div>
      </KidBg>
    );
  }

  /* ---------------- home: this week + the wall chart ---------------- */
  const passedSet = new Set(sp?.passed ?? []);
  return (
    <KidBg from={COLOR} className="p-4 pb-16">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => go({ name: "kid", kidId: kid.id })}
            className="w-11 h-11 rounded-2xl bg-white/90 text-xl btn-soft shrink-0"
          >
            ⬅️
          </button>
          <h1 className="font-black text-2xl text-gray-800">✏️ Spelling</h1>
        </div>

        {/* this week */}
        <div className="card mt-4 overflow-hidden">
          <div className="px-5 py-2 text-white font-black text-xs uppercase tracking-widest" style={{ background: COLOR }}>
            ⭐ this week
          </div>
          <div className="p-5">
            <div className="font-black text-[13px] uppercase tracking-wide" style={{ color: COLOR }}>
              Week {list.n} of {TOTAL_LISTS} · {list.levelEmoji} {list.levelTitle}
            </div>
            <div className="font-black text-2xl text-gray-800 leading-tight">{list.title}</div>
            <div className="text-sm font-bold text-gray-500">learning {list.pattern}</div>

            <div className="flex flex-wrap gap-2 mt-3">
              {list.words.map((w) => (
                <button
                  key={w}
                  onClick={() => say(w)}
                  className="rounded-xl px-3 py-1.5 font-black bg-white btn-soft"
                  style={{ color: COLOR, border: `2px solid ${COLOR}33` }}
                >
                  🔊 {w}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-4 rounded-2xl p-3" style={{ background: SOFT }}>
              <div className="flex gap-2">
                {Array.from({ length: PASSES_NEEDED }, (_, i) => (
                  <span key={i} className="text-3xl">
                    {i < passes ? "⭐" : "☆"}
                  </span>
                ))}
              </div>
              <div className="text-sm font-black" style={{ color: COLOR }}>
                {isPassed
                  ? "Passed! Both runs perfect."
                  : `Spell all 10 right ${PASSES_NEEDED - passes} more time${PASSES_NEEDED - passes === 1 ? "" : "s"} to pass.`}
              </div>
            </div>

            <BigButton onClick={start} color={COLOR} className="w-full mt-4">
              {passes === 0 ? "▶ Start the test" : isPassed ? "🔁 Practise again" : "✏️ Go for the next star"}
            </BigButton>
          </div>
        </div>

        {/* the wall chart */}
        <h2 className="font-black text-lg text-gray-700 mt-6 mb-1">My wall chart</h2>
        <p className="text-sm font-bold text-gray-500 mb-3">
          {passedSet.size} of {TOTAL_LISTS} weeks passed — check them all off!
        </p>
        <div className="space-y-4">
          {SPELLING_LEVELS.map((lv, li) => {
            const inLevel = SPELLING_LISTS.filter((l) => l.level === li + 1);
            const doneCount = inLevel.filter((l) => passedSet.has(l.n)).length;
            return (
              <div key={lv.title} className="card p-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{lv.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-gray-800">{lv.title}</div>
                    <div className="text-xs font-bold text-gray-400">
                      Weeks {inLevel[0].n}–{inLevel[inLevel.length - 1].n}
                    </div>
                  </div>
                  <div
                    className="font-black text-sm"
                    style={{ color: doneCount === inLevel.length ? "#16a34a" : lv.color }}
                  >
                    {doneCount === inLevel.length ? "✅ all done" : `${doneCount}/${inLevel.length}`}
                  </div>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3">
                  {inLevel.map((l) => {
                    const done = passedSet.has(l.n);
                    const stars = sp?.passes[l.n] ?? 0;
                    const isCurrent = l.n === list.n;
                    return (
                      <button
                        key={l.n}
                        onClick={() => { setListN(l.n); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="rounded-2xl p-2.5 text-center btn-soft"
                        style={{
                          background: done ? "#f0fdf4" : isCurrent ? lv.soft : "#fff",
                          border: `3px solid ${done ? "#86efac" : isCurrent ? lv.color : "#eef0f4"}`,
                        }}
                      >
                        <div className="text-2xl leading-none">{done ? "✅" : stars === 1 ? "⭐" : "⬜"}</div>
                        <div className="font-black text-[12px] text-gray-700 mt-1">Week {l.n}</div>
                        <div className="text-[10px] font-bold text-gray-400 leading-tight truncate">{l.title}</div>
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
