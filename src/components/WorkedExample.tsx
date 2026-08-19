import { useEffect, useState } from "react";
import CoachCharacter from "./CoachCharacter";
import MathViz from "./MathViz";
import { BigButton } from "./Ui";
import type { Coach } from "../lib/coaches";
import { speak } from "../lib/speech";
import type { SubjectDef, SubjectId } from "../lib/types";
import type { WorkStep } from "../lib/viz";

/**
 * A wrong answer opens this: the coach walks through the problem ONE PICTURE AT
 * A TIME, then hands it back so the kid answers the same question themselves.
 */
export default function WorkedExample({
  subject,
  coach,
  def,
  steps,
  onRetry,
}: {
  subject: SubjectId;
  coach: Coach;
  def: SubjectDef;
  steps: WorkStep[];
  onRetry: () => void;
}) {
  const [i, setI] = useState(0);
  const step = steps[Math.min(i, steps.length - 1)];
  const last = i >= steps.length - 1;

  // narrate each step as it appears
  useEffect(() => {
    speak(step.text, coach.voice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  return (
    <div className="rounded-[26px] p-4 animate-pop" style={{ background: def.soft }}>
      {/* who's talking */}
      <div className="flex items-start gap-2" style={{ color: def.color }}>
        <CoachCharacter subject={subject} size={80} mood="oops" />
        <button
          onClick={() => speak(step.text, coach.voice)}
          className="bubble flex-1 min-w-0 bg-white text-left p-3 mt-1"
          style={{ border: `4px solid ${def.color}22` }}
        >
          <div className="font-black text-[11px] uppercase tracking-wide" style={{ color: def.color }}>
            {coach.name} shows you
          </div>
          <div className="font-bold text-gray-700 text-[17px] leading-snug">{step.text}</div>
        </button>
      </div>

      {/* the picture */}
      {step.viz && (
        <div className="bg-white rounded-3xl mt-3 p-3 overflow-x-auto" key={i}>
          <div className="animate-pop min-w-min">
            <MathViz viz={step.viz} color={def.color} soft={def.soft} />
          </div>
        </div>
      )}

      {/* step dots + advance */}
      <div className="flex items-center gap-3 mt-3">
        <div className="flex gap-1.5">
          {steps.map((_, s) => (
            <span
              key={s}
              className="rounded-full transition-all"
              style={{
                width: s === i ? 26 : 10,
                height: 10,
                background: s <= i ? def.color : "#ffffffcc",
              }}
            />
          ))}
        </div>
        <div className="flex-1" />
        {last ? (
          <BigButton onClick={onRetry} color={def.color} className="text-lg py-3">
            Now you try! 💪
          </BigButton>
        ) : (
          <BigButton onClick={() => setI(i + 1)} color={def.color} className="text-lg py-3">
            Show me →
          </BigButton>
        )}
      </div>
    </div>
  );
}
