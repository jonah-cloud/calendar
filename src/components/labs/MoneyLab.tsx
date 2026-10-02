import { useMemo, useState } from "react";
import { BigButton } from "../Ui";
import { LabFrame, Verdict, useDragToTray } from "./dragkit";
import { pick, rnd } from "../../lib/rand";
import { speak } from "../../lib/speech";
import { coachFor } from "../../lib/coaches";

const VOICE = coachFor("math").voice;

const COLOR = "#16a34a";
const SOFT = "#f0fdf4";

type CoinId = "penny" | "nickel" | "dime" | "quarter";
const COINS: { id: CoinId; label: string; value: number; face: string; name: string }[] = [
  { id: "penny", label: "1¢", value: 1, face: "🟤", name: "penny" },
  { id: "nickel", label: "5¢", value: 5, face: "⚪", name: "nickel" },
  { id: "dime", label: "10¢", value: 10, face: "⚫", name: "dime" },
  { id: "quarter", label: "25¢", value: 25, face: "🔘", name: "quarter" },
];
const coinById = (id: CoinId) => COINS.find((c) => c.id === id)!;
const cents = (n: number) => `${n}¢`;

/** The shared coin tray: tap or drag coins in, tap a coin to take it back out. */
function CoinTray({
  tray,
  setTray,
  trayRef,
  start,
  label = "Your coins",
}: {
  tray: CoinId[];
  setTray: (f: (t: CoinId[]) => CoinId[]) => void;
  trayRef: React.MutableRefObject<HTMLDivElement | null>;
  start: (e: React.PointerEvent, id: CoinId, face: string) => void;
  label?: string;
}) {
  const total = tray.reduce((n, id) => n + coinById(id).value, 0);
  return (
    <>
      {/* the bank you take coins from */}
      <div className="flex flex-wrap justify-center gap-2">
        {COINS.map((c) => (
          <button
            key={c.id}
            onPointerDown={(e) => start(e, c.id, c.face)}
            className="touch-none rounded-2xl px-3 py-2 bg-white btn-soft flex flex-col items-center"
            style={{ border: `3px solid ${COLOR}44`, minWidth: 74 }}
          >
            <span className="text-3xl leading-none">{c.face}</span>
            <span className="font-black text-sm mt-0.5" style={{ color: COLOR }}>{c.label}</span>
            <span className="text-[10px] font-bold text-gray-400">{c.name}</span>
          </button>
        ))}
      </div>
      <div className="text-center text-xs font-black text-gray-400 mt-2">tap a coin, or drag it down ↓</div>

      {/* the tray itself */}
      <div
        ref={trayRef}
        className="mt-2 rounded-3xl p-3 min-h-[104px] bg-white flex flex-wrap items-start justify-center gap-1.5 content-start"
        style={{ border: `4px dashed ${COLOR}55` }}
      >
        {tray.length === 0 && (
          <div className="text-gray-300 font-black self-center py-6">{label} go here</div>
        )}
        {tray.map((id, i) => {
          const c = coinById(id);
          return (
            <button
              key={i}
              onClick={() => setTray((t) => t.filter((_, j) => j !== i))}
              className="rounded-xl px-1.5 py-1 flex flex-col items-center active:scale-90 transition-transform"
              style={{ background: SOFT }}
            >
              <span className="text-3xl leading-none">{c.face}</span>
              <span className="text-[10px] font-black" style={{ color: COLOR }}>{c.label}</span>
            </button>
          );
        })}
      </div>

      <div className="text-center mt-2">
        <span className="font-black text-2xl" style={{ color: COLOR }}>
          {label}: {cents(total)}
        </span>
        {tray.length > 0 && (
          <button onClick={() => setTray(() => [])} className="ml-3 font-black text-sm text-gray-400">
            clear
          </button>
        )}
      </div>
    </>
  );
}

/* ═══════════ Level 1 · make an exact amount ═══════════ */
function MakeAmount({ onScore }: { onScore: (ok: boolean) => void }) {
  const [goal, setGoal] = useState(() => rnd(2, 9) * 5);
  const [tray, setTray] = useState<CoinId[]>([]);
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const { start, trayRef, Ghost } = useDragToTray<CoinId>((id) => {
    setTray((t) => [...t, id]);
    setState("idle");
  });
  const total = tray.reduce((n, id) => n + coinById(id).value, 0);

  const check = () => {
    const ok = total === goal;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(ok ? `That's exactly ${goal} cents!` : total > goal ? `That's ${total}. A bit too much.` : `That's ${total}. You need ${goal - total} more.`, VOICE);
    if (ok) setTimeout(() => { setGoal(rnd(2, 9) * 5); setTray([]); setState("idle"); }, 1400);
  };

  return (
    <LabFrame
      title={`Make ${cents(goal)}`}
      sub="Put coins in the tray until they add up exactly."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict state={state} right={`${cents(goal)} exactly!`} wrong={`You have ${cents(total)} — try again.`} />
          <BigButton onClick={check} color={COLOR} className="w-full mt-3" disabled={tray.length === 0}>
            Check my coins 🪙
          </BigButton>
        </>
      }
    >
      <Ghost />
      <CoinTray tray={tray} setTray={setTray} trayRef={trayRef} start={(e, id, face) => start(e, id, face)} />
    </LabFrame>
  );
}

/* ═══════════ Level 2 · count a pile ═══════════ */
function CountPile({ onScore }: { onScore: (ok: boolean) => void }) {
  const make = () => {
    const n = rnd(3, 6);
    return Array.from({ length: n }, () => pick(COINS).id as CoinId);
  };
  const [pile, setPile] = useState<CoinId[]>(make);
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");

  // biggest coins first — that is how you actually count a pile
  const sorted = useMemo(() => [...pile].sort((a, b) => coinById(b).value - coinById(a).value), [pile]);
  const total = pile.reduce((n, id) => n + coinById(id).value, 0);

  const check = () => {
    const ok = parseInt(answer, 10) === total;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(ok ? `Yes! ${total} cents.` : `Not quite. Start with the biggest coin and count on.`, VOICE);
    if (ok) setTimeout(() => { setPile(make()); setAnswer(""); setState("idle"); }, 1400);
  };

  let running = 0;
  return (
    <LabFrame
      title="How much is this?"
      sub="Start with the biggest coin and count on. The running total is under each one."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict state={state} right={`${cents(total)} — exactly right!`} wrong="Count again, biggest coin first." />
          <div className="flex gap-2 mt-3">
            <input
              value={answer}
              onChange={(e) => { setAnswer(e.target.value.replace(/\D/g, "").slice(0, 3)); setState("idle"); }}
              onKeyDown={(e) => e.key === "Enter" && answer && check()}
              inputMode="numeric"
              placeholder="total in ¢"
              className="flex-1 text-center text-2xl font-black rounded-2xl px-4 py-3 outline-none"
              style={{ border: `4px solid ${COLOR}44` }}
            />
            <BigButton onClick={check} color={COLOR} disabled={!answer}>
              Check
            </BigButton>
          </div>
        </>
      }
    >
      <div className="flex flex-wrap justify-center gap-2">
        {sorted.map((id, i) => {
          const c = coinById(id);
          running += c.value;
          return (
            <button
              key={i}
              onClick={() => speak(`${c.name}, ${c.value} cents`, VOICE)}
              className="rounded-2xl px-2.5 py-2 bg-white flex flex-col items-center btn-soft"
              style={{ border: `3px solid ${COLOR}33` }}
            >
              <span className="text-4xl leading-none">{c.face}</span>
              <span className="font-black text-xs mt-0.5" style={{ color: COLOR }}>{c.label}</span>
              <span className="font-black text-sm text-gray-400">{running}</span>
            </button>
          );
        })}
      </div>
    </LabFrame>
  );
}

/* ═══════════ Level 3 · can you afford it? ═══════════ */
const SHOP: { name: string; emoji: string; price: number }[] = [
  { name: "sticker", emoji: "⭐", price: 12 },
  { name: "pencil", emoji: "✏️", price: 25 },
  { name: "eraser", emoji: "🧽", price: 18 },
  { name: "apple", emoji: "🍎", price: 35 },
  { name: "cookie", emoji: "🍪", price: 45 },
  { name: "bouncy ball", emoji: "⚽", price: 30 },
  { name: "ribbon", emoji: "🎀", price: 22 },
  { name: "lollipop", emoji: "🍭", price: 15 },
];

function CanIAfford({ onScore }: { onScore: (ok: boolean) => void }) {
  const make = () => {
    const item = pick(SHOP);
    const n = rnd(2, 5);
    const purse = Array.from({ length: n }, () => pick(COINS).id as CoinId);
    return { item, purse };
  };
  const [{ item, purse }, setRound] = useState(make);
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const total = purse.reduce((n, id) => n + coinById(id).value, 0);
  const canAfford = total >= item.price;

  const answer = (said: boolean) => {
    const ok = said === canAfford;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(
      ok
        ? canAfford
          ? `Yes! You have ${total} and it costs ${item.price}. You can buy it.`
          : `Right — ${total} is not enough for ${item.price} cents.`
        : `Look again. You have ${total} cents and it costs ${item.price}.`,
      VOICE
    );
    if (ok) setTimeout(() => { setRound(make()); setState("idle"); }, 1700);
  };

  let running = 0;
  return (
    <LabFrame
      title="Can you buy it?"
      sub="Count your coins, then compare them to the price."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict
            state={state}
            right={canAfford ? `You have ${cents(total)} — enough!` : `${cents(total)} is not enough.`}
            wrong={`You have ${cents(total)} and it costs ${cents(item.price)}.`}
          />
          <div className="grid grid-cols-2 gap-2 mt-3">
            <BigButton onClick={() => answer(true)} color={COLOR}>✅ Yes, I can</BigButton>
            <BigButton onClick={() => answer(false)} color="#6b7280">❌ Not enough</BigButton>
          </div>
        </>
      }
    >
      <div className="rounded-2xl bg-white p-3 text-center" style={{ border: `3px solid ${COLOR}33` }}>
        <div className="text-5xl">{item.emoji}</div>
        <div className="font-black text-gray-700 capitalize">{item.name}</div>
        <div className="font-black text-2xl" style={{ color: COLOR }}>{cents(item.price)}</div>
      </div>
      <div className="font-black text-xs uppercase tracking-wide text-gray-400 mt-3 text-center">your purse</div>
      <div className="flex flex-wrap justify-center gap-2 mt-1">
        {[...purse].sort((a, b) => coinById(b).value - coinById(a).value).map((id, i) => {
          const c = coinById(id);
          running += c.value;
          return (
            <div key={i} className="rounded-xl px-2 py-1.5 bg-white flex flex-col items-center" style={{ border: `3px solid ${COLOR}22` }}>
              <span className="text-3xl leading-none">{c.face}</span>
              <span className="font-black text-sm text-gray-400">{running}</span>
            </div>
          );
        })}
      </div>
    </LabFrame>
  );
}

/* ═══════════ Level 4 · make change ═══════════ */
function MakeChange({ onScore }: { onScore: (ok: boolean) => void }) {
  const make = () => {
    const price = rnd(3, 19) * (Math.random() < 0.5 ? 1 : 1);
    const paid = pick([20, 25, 50, 100].filter((p) => p > price));
    return { price, paid };
  };
  const [{ price, paid }, setRound] = useState(make);
  const [tray, setTray] = useState<CoinId[]>([]);
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const { start, trayRef, Ghost } = useDragToTray<CoinId>((id) => {
    setTray((t) => [...t, id]);
    setState("idle");
  });
  const change = paid - price;
  const given = tray.reduce((n, id) => n + coinById(id).value, 0);

  const check = () => {
    const ok = given === change;
    setState(ok ? "right" : "wrong");
    onScore(ok);
    speak(
      ok
        ? `Perfect. ${price} up to ${paid} is ${change} cents change.`
        : given > change
        ? `That's ${given}. That's more change than they should get.`
        : `That's ${given}. They need ${change - given} more.`,
      VOICE
    );
    if (ok) setTimeout(() => { setRound(make()); setTray([]); setState("idle"); }, 1700);
  };

  return (
    <LabFrame
      title="Give the right change"
      sub="Count UP from the price to what they paid — that gap is the change."
      color={COLOR}
      soft={SOFT}
      footer={
        <>
          <Verdict state={state} right={`${cents(change)} change — spot on!`} wrong={`You gave ${cents(given)}. Count up from ${cents(price)}.`} />
          <BigButton onClick={check} color={COLOR} className="w-full mt-3" disabled={tray.length === 0}>
            Give the change 🪙
          </BigButton>
        </>
      }
    >
      <Ghost />
      <div className="rounded-2xl bg-white p-3 text-center mb-3" style={{ border: `3px solid ${COLOR}33` }}>
        <div className="font-black text-gray-500 text-sm">The item costs</div>
        <div className="font-black text-3xl text-gray-800">{cents(price)}</div>
        <div className="font-black text-gray-500 text-sm mt-1">They paid with</div>
        <div className="font-black text-3xl" style={{ color: COLOR }}>{cents(paid)}</div>
        {/* counting up, drawn out */}
        <div className="flex items-center justify-center gap-1.5 mt-3 flex-wrap">
          <span className="rounded-xl px-2.5 py-1 font-black text-white" style={{ background: "#9ca3af" }}>{price}</span>
          <span className="font-black text-gray-400">→ count up →</span>
          <span className="rounded-xl px-2.5 py-1 font-black text-white" style={{ background: COLOR }}>{paid}</span>
        </div>
      </div>
      <CoinTray tray={tray} setTray={setTray} trayRef={trayRef} start={(e, id, face) => start(e, id, face)} label="Change" />
    </LabFrame>
  );
}

export const MONEY_LEVELS = [
  { id: "make", title: "Make the Amount", emoji: "🪙", blurb: "Tap or drag coins to hit an exact amount", Comp: MakeAmount },
  { id: "count", title: "Count the Pile", emoji: "🧮", blurb: "Add up mixed coins, biggest first", Comp: CountPile },
  { id: "afford", title: "Can You Buy It?", emoji: "🛒", blurb: "Do your coins cover the price?", Comp: CanIAfford },
  { id: "change", title: "Make Change", emoji: "💵", blurb: "Pay 20¢ for a 17¢ item — what comes back?", Comp: MakeChange },
];
