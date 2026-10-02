import { useEffect, useMemo, useRef, useState } from "react";
import type { View } from "../App";
import CoachCharacter from "../components/CoachCharacter";
import { BigButton, Confetti, KidBg } from "../components/Ui";
import { coachFor } from "../lib/coaches";
import {
  GRADES,
  PASSAGES,
  gradeDef,
  nextGrade,
  passageAt,
  seasonOf,
  wcpmTarget,
  weeksIn,
  type GradeId,
  type Passage,
} from "../lib/content/fluency";
import { todayISO } from "../lib/rand";
import { speak, stopSpeaking } from "../lib/speech";
import { READS_PER_DAY, useStore } from "../lib/store";
import type { FluencyAttempt, Kid } from "../lib/types";

const fmt = (ms: number) => {
  const s = ms / 1000;
  return s < 60 ? `${s.toFixed(1)}s` : `${Math.floor(s / 60)}:${(s % 60).toFixed(1).padStart(4, "0")}`;
};
const wcpmOf = (p: Passage, ms: number) => (ms > 0 ? Math.round(p.wordCount / (ms / 60000)) : 0);

/** Highlights the week's word-bank words wherever they appear in the passage. */
function PassageText({ p, color, soft }: { p: Passage; color: string; soft: string }) {
  const targets = useMemo(
    () => new Set([...p.phonicsWords, ...p.sightWords].map((w) => w.toLowerCase().replace(/[^a-z']/g, ""))),
    [p]
  );
  return (
    <div className="space-y-3">
      {p.lines.map((line, li) => (
        <div key={li} className="flex items-start gap-3">
          <p className="flex-1 text-[25px] sm:text-[29px] leading-[1.55] font-bold text-gray-800">
            {line.split(/(\s+)/).map((tok, ti) => {
              if (/^\s+$/.test(tok)) return tok;
              const bare = tok.toLowerCase().replace(/[^a-z']/g, "");
              if (!targets.has(bare)) return <span key={ti}>{tok}</span>;
              return (
                <span key={ti} className="rounded-lg px-0.5" style={{ background: soft, boxShadow: `0 2px 0 ${color}44` }}>
                  {tok}
                </span>
              );
            })}
          </p>
          {/* the running word count, exactly like the printed passages */}
          <span className="shrink-0 w-9 text-right text-sm font-black tabular-nums pt-2 text-gray-300">
            {p.cum[li]}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ReadingScreen({ kid, go }: { kid: Kid; go: (v: View) => void }) {
  const { dispatch } = useStore();
  const coach = coachFor("reading");

  const prog = kid.fluency;
  const today = todayISO();
  const [grade, setGrade] = useState<GradeId>((prog?.grade as GradeId) ?? "K");
  const [week, setWeek] = useState(prog?.week ?? 1);

  const def = gradeDef(grade);
  const color = def.color;
  const soft = def.soft;
  const total = weeksIn(grade);
  const p = passageAt(grade, Math.min(week, total)) ?? PASSAGES[grade][0];
  const target = wcpmTarget(def, p.week);

  const [mode, setMode] = useState<"home" | "reading" | "result">("home");
  const [elapsed, setElapsed] = useState(0);
  const [lastMs, setLastMs] = useState<number | null>(null);
  const [prevReads, setPrevReads] = useState<FluencyAttempt[]>([]);
  const startRef = useRef(0);

  const todaysAll = prog?.days[today] ?? [];
  const reads = todaysAll.filter((a) => a.grade === grade && a.week === p.week);
  const doneToday = reads.length >= READS_PER_DAY;

  useEffect(() => () => stopSpeaking(), []);
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
    dispatch({
      type: "FLUENCY_READ",
      kidId: kid.id,
      grade,
      week: p.week,
      ms,
      words: p.wordCount,
      lastWeek: p.week >= total,
      nextGrade: nextGrade(grade),
    });
    const prev = before[before.length - 1];
    const score = wcpmOf(p, ms);
    if (prev && ms < prev.ms) speak(`${score} words a minute! Faster than last time.`, coach.voice);
    else if (before.length + 1 >= READS_PER_DAY) speak(`All three reads done. Wonderful work.`, coach.voice);
    else speak(`${score} words a minute. Have another go and see if you can beat it.`, coach.voice);
    setMode("result");
  };

  /* ---------------- grade picker (first time only) ---------------- */
  if (!prog?.placed && mode === "home") {
    return (
      <KidBg from={color} className="p-4">
        <div className="max-w-md mx-auto card p-6 mt-8 text-center animate-pop">
          <CoachCharacter subject="reading" size={110} />
          <h1 className="font-black text-2xl text-gray-800 mt-2">Which grade are we reading at?</h1>
          <p className="font-bold text-gray-500 text-sm mt-1">
            Pick the one that feels right. You can change it any time — the goal is for the passage to
            feel like a stretch, not a struggle.
          </p>
          <div className="space-y-2 mt-5">
            {GRADES.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  dispatch({ type: "FLUENCY_PLACE", kidId: kid.id, grade: g.id, week: 1 });
                  setGrade(g.id);
                  setWeek(1);
                }}
                className="w-full rounded-2xl p-3 btn-soft flex items-center gap-3 text-left"
                style={{ background: g.soft, border: `3px solid ${g.color}44` }}
              >
                <span className="text-2xl">{g.emoji}</span>
                <span className="flex-1 min-w-0">
                  <span className="block font-black text-gray-800">{g.label}</span>
                  <span className="block text-xs font-bold" style={{ color: g.color }}>
                    {weeksIn(g.id)} weeks · goal {g.wcpm.fall}–{g.wcpm.spring} words per minute
                  </span>
                </span>
                <span className="font-black" style={{ color: g.color }}>›</span>
              </button>
            ))}
          </div>
        </div>
      </KidBg>
    );
  }

  /* ---------------- reading, with the live clock ---------------- */
  if (mode === "reading") {
    return (
      <div className="min-h-screen bg-white p-4 pb-44">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between pt-1">
            <div className="font-black text-sm" style={{ color }}>
              Read #{reads.length + 1} of {READS_PER_DAY}
            </div>
            <div className="font-black text-sm text-gray-400">{p.wordCount} words</div>
          </div>
          <h1 className="font-black text-3xl text-gray-800 mt-2 mb-5">{p.skill}</h1>
          <PassageText p={p} color={color} soft={soft} />
        </div>
        <div className="fixed bottom-0 inset-x-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
          <div className="max-w-2xl mx-auto">
            <div className="rounded-3xl p-3 text-center mb-3" style={{ background: soft, border: `3px solid ${color}33` }}>
              <div className="text-[13px] font-black uppercase tracking-widest" style={{ color }}>
                ⏱️ reading time
              </div>
              <div className="text-5xl font-black tabular-nums" style={{ color }}>
                {fmt(elapsed)}
              </div>
              <div className="text-sm font-black text-gray-500 mt-0.5">
                {reads.length > 0
                  ? `beat ${fmt(Math.min(...reads.map((r) => r.ms)))} to go faster!`
                  : `${target} words a minute hits the ${def.label} goal`}
              </div>
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
    const nowReads = reads;
    const best = Math.min(...nowReads.map((r) => r.ms));
    const prev = prevReads[prevReads.length - 1];
    const faster = prev ? prev.ms - lastMs : 0;
    const allDone = nowReads.length >= READS_PER_DAY;
    const score = wcpmOf(p, lastMs);
    const bestScore = wcpmOf(p, best);
    const hit = bestScore >= target;
    return (
      <KidBg from={color} className="p-4">
        {allDone && <Confetti />}
        <div className="max-w-md mx-auto card p-6 mt-6 text-center animate-pop">
          <CoachCharacter subject="reading" size={100} mood={allDone ? "excited" : "idle"} />
          <div className="text-5xl font-black tabular-nums mt-2" style={{ color }}>
            {fmt(lastMs)}
          </div>
          <div className="font-black text-xl text-gray-700">{score} words per minute</div>
          {prev ? (
            faster > 0 ? (
              <div className="font-black text-lg text-green-600 mt-1">🔥 {fmt(faster)} faster than last time!</div>
            ) : (
              <div className="font-black text-lg text-gray-500 mt-1">Close one — {fmt(-faster)} off your last time.</div>
            )
          ) : (
            <div className="font-black text-lg text-gray-500 mt-1">That's your time to beat!</div>
          )}

          <div className="flex gap-2 mt-5">
            {Array.from({ length: READS_PER_DAY }, (_, i) => {
              const r = nowReads[i];
              const isBest = r && r.ms === best && nowReads.length > 1;
              return (
                <div key={i} className="flex-1 rounded-2xl p-3" style={{ background: r ? soft : "#f9fafb", border: `3px solid ${r ? color : "#e5e7eb"}` }}>
                  <div className="text-[11px] font-black uppercase" style={{ color: r ? color : "#9ca3af" }}>try {i + 1}</div>
                  <div className="font-black text-lg tabular-nums" style={{ color: r ? "#1f2937" : "#d1d5db" }}>
                    {r ? fmt(r.ms) : "—"}
                  </div>
                  {isBest && <div className="text-[11px] font-black text-amber-500">⭐ best</div>}
                </div>
              );
            })}
          </div>

          {/* where this sits against the grade goal */}
          <div className="mt-4 rounded-2xl p-3" style={{ background: hit ? "#dcfce7" : soft }}>
            <div className="font-black text-sm" style={{ color: hit ? "#15803d" : color }}>
              {hit ? "🎯 On track for " : "🎯 Goal for "} {def.label} week {p.week}: {target} wpm
            </div>
            <div className="text-xs font-bold text-gray-500">
              your best today is {bestScore} wpm
            </div>
          </div>

          {allDone ? (
            <>
              <div className="font-black text-xl text-gray-800 mt-4">🎉 All {READS_PER_DAY} reads done!</div>
              <BigButton onClick={() => go({ name: "kid", kidId: kid.id })} color={color} className="w-full mt-3">
                Done for today ✨
              </BigButton>
            </>
          ) : (
            <BigButton onClick={begin} color={color} className="w-full mt-4">
              🔁 Read it again — go faster!
            </BigButton>
          )}
          <button onClick={() => { setMode("home"); setLastMs(null); }} className="mt-3 font-black text-sm" style={{ color }}>
            back to the list
          </button>
        </div>
      </KidBg>
    );
  }

  /* ---------------- home ---------------- */
  const doneSet = new Set(prog?.done ?? []);
  const pct = Math.round(((p.week - 1) / total) * 100);
  const bestToday = reads.length ? wcpmOf(p, Math.min(...reads.map((r) => r.ms))) : 0;

  return (
    <KidBg from={color} className="p-4 pb-16">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 pt-2">
          <button onClick={() => go({ name: "kid", kidId: kid.id })} className="w-11 h-11 rounded-2xl bg-white/90 text-xl btn-soft shrink-0">
            ⬅️
          </button>
          <h1 className="font-black text-2xl text-gray-800">📖 Daily Reading</h1>
        </div>

        {/* grade switcher */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1 -mx-1 px-1">
          {GRADES.map((g) => {
            const active = g.id === grade;
            const gDone = PASSAGES[g.id].filter((x) => doneSet.has(`${g.id}:${x.week}`)).length;
            return (
              <button
                key={g.id}
                onClick={() => { setGrade(g.id); setWeek(prog?.grade === g.id ? prog.week : 1); }}
                className="shrink-0 rounded-2xl px-4 py-2.5 btn-soft text-left"
                style={{ background: active ? g.color : "#fff", color: active ? "#fff" : "#6b7280", border: `3px solid ${active ? g.color : "#e5e7eb"}` }}
              >
                <div className="font-black text-[15px] whitespace-nowrap">{g.emoji} {g.label}</div>
                <div className="text-[11px] font-bold opacity-80">{gDone}/{weeksIn(g.id)} done</div>
              </button>
            );
          })}
        </div>

        {/* where they are, right now */}
        <div className="card mt-4 overflow-hidden">
          <div className="px-5 py-2 text-white font-black text-xs uppercase tracking-widest" style={{ background: color }}>
            ⭐ you are here
          </div>
          <div className="p-5">
            <div className="flex items-center gap-3">
              <CoachCharacter subject="reading" size={82} />
              <div className="min-w-0">
                <div className="font-black text-[13px] uppercase tracking-wide" style={{ color }}>
                  {def.label} · Unit {p.unit} · Week {p.weekInUnit}
                </div>
                <div className="font-black text-2xl text-gray-800 leading-tight">{p.skill}</div>
                <div className="text-sm font-bold text-gray-500">
                  {p.unitTitle} · {p.wordCount} words
                </div>
              </div>
            </div>

            {/* progress THROUGH the grade */}
            <div className="mt-4">
              <div className="flex justify-between text-xs font-black mb-1" style={{ color }}>
                <span>Week {p.week} of {total} · {seasonOf(def, p.week)}</span>
                <span>{pct}% through {def.label}</span>
              </div>
              <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full rounded-full bar-shine transition-all duration-700" style={{ width: `${Math.max(pct, 2)}%`, background: color }} />
              </div>
            </div>

            {/* the reading-speed goal for this exact week */}
            <div className="mt-3 rounded-2xl p-3 flex items-center gap-3" style={{ background: soft }}>
              <div className="text-3xl">🎯</div>
              <div className="flex-1 min-w-0">
                <div className="font-black text-sm" style={{ color }}>
                  {def.label} goal: {target} words per minute
                </div>
                <div className="text-xs font-bold text-gray-500">
                  {bestToday
                    ? bestToday >= target
                      ? `Best today: ${bestToday} wpm — at grade level! 🎉`
                      : `Best today: ${bestToday} wpm — ${target - bestToday} to go`
                    : "Read it three times to see your speed"}
                </div>
              </div>
            </div>

            {/* the three reads */}
            <div className="flex gap-2 mt-4">
              {Array.from({ length: READS_PER_DAY }, (_, i) => {
                const r = reads[i];
                return (
                  <div key={i} className="flex-1 rounded-2xl p-3 text-center" style={{ background: r ? soft : "#f9fafb", border: `3px solid ${r ? color : "#e5e7eb"}` }}>
                    <div className="text-xl">{r ? "✅" : "⬜"}</div>
                    <div className="text-[11px] font-black uppercase mt-0.5" style={{ color: r ? color : "#9ca3af" }}>try {i + 1}</div>
                    <div className="font-black tabular-nums text-gray-700 text-sm">{r ? fmt(r.ms) : "—"}</div>
                  </div>
                );
              })}
            </div>

            {/* the week's word bank, split the way the printed sheet splits it */}
            <div className="mt-4 rounded-2xl p-3" style={{ background: soft }}>
              <div className="font-black text-xs uppercase tracking-wide" style={{ color }}>
                🔊 this week's words — tap to hear
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {p.phonicsWords.map((w) => (
                  <button key={w} onClick={() => speak(w, coach.voice)} className="rounded-xl px-3 py-1.5 font-black bg-white btn-soft" style={{ color, border: `2px solid ${color}55` }}>
                    {w}
                  </button>
                ))}
              </div>
              <div className="text-[11px] font-black uppercase tracking-wide text-gray-400 mt-2">high-frequency words</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {p.sightWords.map((w) => (
                  <button key={w} onClick={() => speak(w, coach.voice)} className="rounded-xl px-3 py-1.5 font-black bg-white btn-soft text-gray-600 border-2 border-gray-200">
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {doneToday ? (
              <div className="mt-4 rounded-2xl p-4 text-center" style={{ background: "#dcfce7" }}>
                <div className="font-black text-green-700 text-lg">🎉 All done for today!</div>
                <div className="font-bold text-green-600 text-sm">
                  Best: {fmt(Math.min(...reads.map((r) => r.ms)))} · {bestToday} wpm
                </div>
              </div>
            ) : (
              <BigButton onClick={begin} color={color} className="w-full mt-4">
                {reads.length === 0 ? "▶ Start reading" : `🔁 Read #${reads.length + 1} — beat ${fmt(Math.min(...reads.map((r) => r.ms)))}`}
              </BigButton>
            )}
          </div>
        </div>

        {/* the whole grade, unit by unit */}
        <h2 className="font-black text-lg text-gray-700 mt-6 mb-2">{def.label}, week by week</h2>
        <div className="space-y-4">
          {Array.from(new Set(PASSAGES[grade].map((x) => x.unit))).map((unitN) => {
            const inUnit = PASSAGES[grade].filter((x) => x.unit === unitN);
            const dc = inUnit.filter((x) => doneSet.has(`${grade}:${x.week}`)).length;
            return (
              <div key={unitN} className="card p-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-gray-800">Unit {unitN} · {inUnit[0].unitTitle}</div>
                    <div className="text-xs font-bold text-gray-400">Weeks {inUnit[0].week}–{inUnit[inUnit.length - 1].week}</div>
                  </div>
                  <div className="font-black text-sm" style={{ color: dc === inUnit.length ? "#16a34a" : color }}>
                    {dc === inUnit.length ? "✅" : `${dc}/${inUnit.length}`}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                  {inUnit.map((x) => {
                    const isDone = doneSet.has(`${grade}:${x.week}`);
                    const isCurrent = x.week === p.week;
                    return (
                      <button
                        key={x.week}
                        onClick={() => { setWeek(x.week); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="rounded-2xl p-2.5 text-left btn-soft flex items-start gap-2"
                        style={{ background: isCurrent ? soft : "#fff", border: `3px solid ${isCurrent ? color : isDone ? "#bbf7d0" : "#eef0f4"}` }}
                      >
                        <span className="shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black text-white" style={{ background: isDone ? "#22c55e" : isCurrent ? color : "#cbd5e1" }}>
                          {isDone ? "✓" : x.week}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-black text-[13px] text-gray-800 leading-tight">{x.skill}</span>
                          <span className="block text-[11px] font-bold text-gray-400">{x.wordCount} words</span>
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
