import { useState } from "react";
import { useStore } from "../lib/store";

export default function Onboarding() {
  const { dispatch } = useStore();
  const [names, setNames] = useState<{ name: string; born: string }[]>([
    { name: "", born: "" },
    { name: "", born: "" },
  ]);

  const start = () => {
    const valid = names.filter((n) => n.name.trim());
    if (!valid.length) return;
    for (const n of valid) {
      dispatch({
        type: "ADD_KID",
        name: n.name.trim(),
        born: n.born ? parseInt(n.born) : undefined,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-400">
      <div className="card max-w-lg w-full p-8 animate-pop">
        <div className="text-6xl text-center mb-2">⚡</div>
        <h1 className="text-3xl font-extrabold text-center text-violet-700">Spark Academy</h1>
        <p className="text-center text-gray-500 mt-2 mb-6">
          Crush the learning in about <b>2 hours</b>, then go live your life.
          <br />
          Mastery first · work at <i>your</i> level · earn Spark Bucks.
        </p>
        <div className="space-y-4">
          {names.map((n, i) => (
            <div key={i} className="flex gap-3">
              <input
                className="flex-1 border-2 border-violet-200 rounded-2xl px-4 py-3 text-lg focus:outline-none focus:border-violet-500"
                placeholder={`Learner ${i + 1} name`}
                value={n.name}
                onChange={(e) =>
                  setNames(names.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))
                }
              />
              <input
                className="w-32 border-2 border-violet-200 rounded-2xl px-4 py-3 text-lg focus:outline-none focus:border-violet-500"
                placeholder="Birth yr"
                inputMode="numeric"
                value={n.born}
                onChange={(e) =>
                  setNames(names.map((x, j) => (j === i ? { ...x, born: e.target.value.replace(/\D/g, "").slice(0, 4) } : x)))
                }
              />
            </div>
          ))}
        </div>
        <button
          className="text-violet-500 font-semibold mt-3 text-sm"
          onClick={() => setNames([...names, { name: "", born: "" }])}
        >
          + add another learner
        </button>
        <button
          onClick={start}
          disabled={!names.some((n) => n.name.trim())}
          className="btn-big w-full mt-6 bg-violet-600 text-white disabled:opacity-40"
        >
          Let's go! 🚀
        </button>
        <p className="text-xs text-gray-400 text-center mt-4">
          Birth year just sets a starting guess — a quick placement round in each subject finds each
          girl's true level, Alpha-style.
        </p>
      </div>
    </div>
  );
}
