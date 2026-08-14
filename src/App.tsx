import { useState } from "react";
import { useStore } from "./lib/store";
import type { SubjectId } from "./lib/types";
import Onboarding from "./screens/Onboarding";
import KidPicker from "./screens/KidPicker";
import KidHome from "./screens/KidHome";
import SessionScreen from "./screens/SessionScreen";
import MasteryMap from "./screens/MasteryMap";
import RewardsStore from "./screens/RewardsStore";
import WorkshopsScreen from "./screens/WorkshopsScreen";
import GuideDashboard from "./screens/GuideDashboard";

export type View =
  | { name: "picker" }
  | { name: "kid"; kidId: string }
  | { name: "session"; kidId: string; subject: SubjectId; mode: "learn" | "review" | "placement" }
  | { name: "map"; kidId: string; subject: SubjectId }
  | { name: "store"; kidId: string }
  | { name: "workshops"; kidId: string }
  | { name: "guide" };

export default function App() {
  const { state } = useStore();
  const [view, setView] = useState<View>({ name: "picker" });

  if (state.kids.length === 0) return <Onboarding />;

  const kid = "kidId" in view ? state.kids.find((k) => k.id === view.kidId) : undefined;
  if ("kidId" in view && !kid) {
    // kid was deleted; bounce home
    setTimeout(() => setView({ name: "picker" }), 0);
    return null;
  }

  switch (view.name) {
    case "picker":
      return <KidPicker go={setView} />;
    case "kid":
      return <KidHome kid={kid!} go={setView} />;
    case "session":
      return <SessionScreen kid={kid!} subject={view.subject} mode={view.mode} go={setView} />;
    case "map":
      return <MasteryMap kid={kid!} subject={view.subject} go={setView} />;
    case "store":
      return <RewardsStore kid={kid!} go={setView} />;
    case "workshops":
      return <WorkshopsScreen kid={kid!} go={setView} />;
    case "guide":
      return <GuideDashboard go={setView} />;
  }
}
