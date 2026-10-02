import { useEffect, useMemo, useRef, useState } from "react";
import type { View } from "../App";
import CoachCharacter from "../components/CoachCharacter";
import { BigButton, Confetti, KidBg } from "../components/Ui";
import { coachFor } from "../lib/coaches";
import { FLUENCY_STORIES, TOTAL_STORIES, storyByNumber, type FluencyStory } from "../lib/content/fluency";
import { todayISO } from "../lib/rand";
import { speak, stopSpeaking } from "../lib/speech";
import { READS_PER_DAY, useStore } from "../lib/store";
import type { FluencyAttempt, Kid } from "../lib/types";

const fmt = (ms: number) => {
  const s = ms / 1000;
  return s < 60 ? `${s.toFixed(1)}s` : `${Math.floor(s / 60)}:${(s % 60).toFixed(1).padStart(4, "0")}`;
};

/** Highlight the target words inside the story, and the focus letters inside them. */
function StoryText({ story, color, soft }: { story: FluencyStory; color: string; soft: string }) {
  const targets = useMemo(
    () => new Set(story.words.map((w) => w.toLowerCase().replace(/[^a-z']/g, ""))),
    [story]
  );
  // "a_e", "mixed", "sh ch th" etc. can't be highlighted as a plain substring
  const simpleFocus = /^[a-z]+$/.test(story.focus) ? story.focus : null;

  return (
    <div className="space-y-3">
      {story.lines.map((line, li) => (
        <p key={li} className="text-[27px] sm:text-[31px] leading-[1.6] font-bold text-gray-800">
          {line.split(/(\s+)/).map((tok, ti) => {
            if (/^\s+$/.test(tok)) return tok;
            const bare = tok.toLowerCase().replace(/[^a-z']/g, "");
            if (!targets.has(bare)) return <span key={ti}>{tok}</span>;
            const at = simpleFocus ? tok.toLowerCase().indexOf(simpleFocus) : -1;
            return (
              <span
                key={ti}
                className="rounded-lg px-0.5"
                style={{ background: soft, boxShadow: `0 2px 0 ${color}44` }}
              >
                {at >= 0 ? (
                  <>
                    {tok.slice(0, at)}
                    <span style={{ color }}>{tok.slice(at, at + simpleFocus!.length)}</span>
                    {tok.slice(at + simpleFocus!.length)}
                  </>
                ) : (
                  tok
                )}
              </span>
            );
          })}
        </p>
      ))}
    </div>
  );
}

export default function ReadingScreen({ kid, go }: { kid: Kid; go: (v: View) => void }) {
  const { dispatch } = useStore();
  const coach = coachFor("reading");
  const color = "#0d9488";
  const soft = "#f0fdfa";

  const prog = kid.fluency;
  const today = todayISO();
  const [storyN, setStoryN] = useState(prog?.story ?? 1);
  const story = storyByNumber(Math.min(storyN, TOTAL_STORIES)) ?? FLUENCY_STORIES[0];

  const [mode, setMode] = useState<"home" | "reading" | "result">("home");
  const [elapsed, setElapsed] = useState(0);
  const [lastMs, setLastMs] = useState<number | null>(null);
  /**
   * The reads as they were BEFORE this one was recorded. The dispatch updates
   * `kid` synchronously, so by the time the result screen renders, `reads`
   * already contains the new attempt — appending it again would double-count it
   * and compare the read against itself.
   */
  const [prevReads, setPrevReads] = useState<FluencyAttempt[]>([]);
  const startRef = useRef(0);

  // today's reads of THIS story
  const todaysAll = prog?.days[today] ?? [];
  const reads = todaysAll.filter((a) => a.story === story.n);
  const doneToday = reads.length >= READS_PER_DAY;

  useEffect(() => () => stopSpeaking(), []);

  // the live clock
  useEffect(() => {
    if (mode !== "reading") return;
    const t = setInterval(() => setElapsed(Date.now() - startRef.current), 100);
    return () => clearInterval(t);
  }, [mode]);

  const begin = () => {
    stopSpeaking();
    startRef.current = Date.now();
    setElapsed(0);
    setMode("reading");
  };

  const finish = () => {
    const ms = Date.now() - startRef.current;
    const before = reads;
    setLastMs(ms);
    setPrevReads(before);
    dispatch({ type: "FLUENCY_READ", kidId: kid.id, story: story.n, ms, words: story.wordCount });
    const prev = before[before.length - 1];
    const n = before.length + 1;
    if (prev && ms < prev.ms) {
      speak(`${fmt(ms)}! That was faster than last time. Brilliant.`, coach.voice);
    } else if (n >= READS_PER_DAY) {
      speak(`All three reads done! Wonderful work today.`, coach.voice);
    } else {
      speak(`${fmt(ms)}. Nice reading. Have another go and see if you can beat it.`, coach.voice);
    }
    setMode("result");
  };

  /* ---------------- the reading view: story + live clock ---------------- */
  if (mode === "reading") {
    return (
      <div className="min-h-screen bg-white p-4 pb-40">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between pt-1">
            <div className="font-black text-sm" style={{ color }}>
              Read #{reads.length + 1} of {READS_PER_DAY}
            </div>
            <div className="font-black text-sm text-gray-400">{story.wordCount} words</div>
          </div>
          <h1 className="font-black text-3xl text-gray-800 mt-2 mb-5">{story.title}</h1>
          <StoryText story={story} color={color} soft={soft} />
        </div>

        {/* the clock sits above the thumb, always visible while reading */}
        <div className="fixed bottom-0 inset-x-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
          <div className="max-w-2xl mx-auto">
            <div
              className="rounded-3xl p-3 text-center mb-3"
              style={{ background: soft, border: `3px solid ${color}33` }}
            >
              <div className="text-[13px] font-black uppercase tracking-widest" style={{ color }}>
                ⏱️ reading time
              </div>
              <div className="text-5xl font-black tabular-nums" style={{ color }}>
                {fmt(elapsed)}
              </div>
              {reads.length > 0 && (
                <div className="text-sm font-black text-gray-500 mt-0.5">
                  beat {fmt(Math.min(...reads.map((r) => r.ms)))} to go faster!
                </div>
              )}
            </div>
            <BigButton onClick={finish} color={color} className="w-full">
              ✅ I finished reading!
            </BigButton>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- after a read ---------------- */
  if (mode === "result" && lastMs !== null) {
    // `reads` already includes the read we just finished
    const nowReads = reads;
    const best = Math.min(...nowReads.map((r) => r.ms));
    const prev = prevReads[prevReads.length - 1];
    const faster = prev ? prev.ms - lastMs : 0;
    const allDone = nowReads.length >= READS_PER_DAY;
    return (
      <KidBg from={color} className="p-4">
        {allDone && <Confetti />}
        <div className="max-w-md mx-auto card p-6 mt-8 text-center animate-pop">
          <CoachCharacter subject="reading" size={110} mood={allDone ? "excited" : "idle"} />
          <div className="text-5xl font-black tabular-nums mt-2" style={{ color }}>
            {fmt(lastMs)}
          </div>
          {prev ? (
            faster > 0 ? (
              <div className="font-black text-lg text-green-600 mt-1">
                🔥 {fmt(faster)} faster than last time!
              </div>
            ) : (
              <div className="font-black text-lg text-gray-500 mt-1">
                Close one — {fmt(-faster)} off your last time.
              </div>
            )
          ) : (
            <div className="font-black text-lg text-gray-500 mt-1">That's your time to beat!</div>
          )}

          {/* every try, side by side */}
          <div className="flex gap-2 mt-5">
            {Array.from({ length: READS_PER_DAY }, (_, i) => {
              const r = nowReads[i];
              const isBest = r && r.ms === best && nowReads.length > 1;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-2xl p-3"
                  style={{
                    background: r ? soft : "#f9fafb",
                    border: `3px solid ${r ? color : "#e5e7eb"}`,
                  }}
                >
                  <div className="text-[11px] font-black uppercase" style={{ color: r ? color : "#9ca3af" }}>
                    try {i + 1}
                  </div>
                  <div className="font-black text-lg tabular-nums" style={{ color: r ? "#1f2937" : "#d1d5db" }}>
                    {r ? fmt(r.ms) : "—"}
                  </div>
                  {isBest && <div className="text-[11px] font-black text-amber-500">⭐ best</div>}
                </div>
              );
            })}
          </div>

          {allDone ? (
            <>
              <div className="font-black text-xl text-gray-800 mt-5">
                🎉 All {READS_PER_DAY} reads done!
              </div>
              <p className="font-bold text-gray-500 text-sm mt-1">
                Story {story.n} is finished. Tomorrow you unlock story {story.n + 1}.
              </p>
              <BigButton onClick={() => go({ name: "kid", kidId: kid.id })} color={color} className="w-full mt-4">
                Done for today ✨
              </BigButton>
            </>
          ) : (
            <BigButton onClick={begin} color={color} className="w-full mt-5">
              🔁 Read it again — go faster!
            </BigButton>
          )}
          <button
            onClick={() => { setMode("home"); setLastMs(null); }}
            className="mt-3 font-black text-sm"
            style={{ color }}
          >
            back to the story list
          </button>
        </div>
      </KidBg>
    );
  }

  /* ---------------- home: today's goal + the story ---------------- */
  const doneSet = new Set(prog?.done ?? []);
  return (
    <KidBg from={color} className="p-4 pb-16">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => go({ name: "kid", kidId: kid.id })}
            className="w-11 h-11 rounded-2xl bg-white/90 text-xl btn-soft shrink-0"
          >
            ⬅️
          </button>
          <h1 className="font-black text-2xl text-gray-800">📖 Daily Reading</h1>
        </div>

        {/* today's card */}
        <div className="card mt-4 overflow-hidden">
          <div
            className="px-5 py-2 text-white font-black text-xs uppercase tracking-widest"
            style={{ background: color }}
          >
            ⏱️ today's goal · {READS_PER_DAY} reads
          </div>
          <div className="p-5">
            <div className="flex items-center gap-3">
              <CoachCharacter subject="reading" size={86} />
              <div className="min-w-0">
                <div className="font-black text-[13px] uppercase tracking-wide" style={{ color }}>
                  Story {story.n} of {TOTAL_STORIES} · {story.stageEmoji} {story.stageTitle}
                </div>
                <div className="font-black text-2xl text-gray-800 leading-tight">{story.title}</div>
                <div className="text-sm font-bold text-gray-500">
                  {story.wordCount} words · learning {story.focusLabel}
                </div>
              </div>
            </div>

            {/* the three reads */}
            <div className="flex gap-2 mt-4">
              {Array.from({ length: READS_PER_DAY }, (_, i) => {
                const r = reads[i];
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-2xl p-3 text-center"
                    style={{ background: r ? soft : "#f9fafb", border: `3px solid ${r ? color : "#e5e7eb"}` }}
                  >
                    <div className="text-xl">{r ? "✅" : "⬜"}</div>
                    <div className="text-[11px] font-black uppercase mt-0.5" style={{ color: r ? color : "#9ca3af" }}>
                      try {i + 1}
                    </div>
                    <div className="font-black tabular-nums text-gray-700">{r ? fmt(r.ms) : "—"}</div>
                  </div>
                );
              })}
            </div>

            {/* new sounds to listen for */}
            <div className="mt-4 rounded-2xl p-3" style={{ background: soft }}>
              <div className="font-black text-xs uppercase tracking-wide" style={{ color }}>
                🔊 new words — tap to hear
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {story.words.map((w) => (
                  <button
                    key={w}
                    onClick={() => speak(w, coach.voice)}
                    className="rounded-xl px-3 py-1.5 font-black bg-white btn-soft"
                    style={{ color, border: `2px solid ${color}44` }}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {doneToday ? (
              <div className="mt-4 rounded-2xl p-4 text-center" style={{ background: "#dcfce7" }}>
                <div className="font-black text-green-700 text-lg">🎉 All done for today!</div>
                <div className="font-bold text-green-600 text-sm">
                  Best time: {fmt(Math.min(...reads.map((r) => r.ms)))}
                </div>
              </div>
            ) : (
              <BigButton onClick={begin} color={color} className="w-full mt-4">
                {reads.length === 0 ? "▶ Start reading" : `🔁 Read #${reads.length + 1} — beat ${fmt(Math.min(...reads.map((r) => r.ms)))}`}
              </BigButton>
            )}
          </div>
        </div>

        {/* every story */}
        <h2 className="font-black text-lg text-gray-700 mt-6 mb-2">All the stories</h2>
        <div className="space-y-4">
          {Array.from(new Set(FLUENCY_STORIES.map((s) => s.stage))).map((stageN) => {
            const inStage = FLUENCY_STORIES.filter((s) => s.stage === stageN);
            const doneCount = inStage.filter((s) => doneSet.has(s.n)).length;
            return (
              <div key={stageN} className="card p-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{inStage[0].stageEmoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-gray-800">{inStage[0].stageTitle}</div>
                    <div className="text-xs font-bold text-gray-400">
                      Stories {inStage[0].n}–{inStage[inStage.length - 1].n}
                    </div>
                  </div>
                  <div className="font-black text-sm" style={{ color: doneCount === inStage.length ? "#16a34a" : color }}>
                    {doneCount === inStage.length ? "✅" : `${doneCount}/${inStage.length}`}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {inStage.map((s) => {
                    const isDone = doneSet.has(s.n);
                    const isCurrent = s.n === story.n;
                    return (
                      <button
                        key={s.n}
                        onClick={() => { setStoryN(s.n); setMode("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="rounded-2xl p-2.5 text-left btn-soft flex items-start gap-2"
                        style={{
                          background: isCurrent ? soft : "#fff",
                          border: `3px solid ${isCurrent ? color : isDone ? "#bbf7d0" : "#eef0f4"}`,
                        }}
                      >
                        <span
                          className="shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black text-white"
                          style={{ background: isDone ? "#22c55e" : isCurrent ? color : "#cbd5e1" }}
                        >
                          {isDone ? "✓" : s.n}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-black text-[13px] text-gray-800 leading-tight">{s.title}</span>
                          <span className="block text-[11px] font-bold text-gray-400">{s.focusLabel}</span>
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
