// LAB_EXPERIMENTS — safe for client components (no fs dependency)

export interface LabExperiment {
  id: number;
  title: string;
  status: "active" | "completed" | "paused";
  week?: string;
  description: string;
  link?: string;
}

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: 1,
    title: "LinkedIn Visibility Sprint",
    status: "active",
    week: "Week 2 of 4",
    description:
      "Testing whether a structured 4-week posting cadence — one AI post, one Bitcoin post, one personal take — meaningfully lifts profile impressions and newsletter subscribers. Tracking weekly deltas in a shared doc.",
  },
  {
    id: 2,
    title: "Enterprise Agent Self-Learning Loop",
    status: "active",
    description:
      "An agent that reviews its own past outputs, identifies recurring failure patterns, and rewrites its system prompt accordingly. No human intervention after the initial setup. Measuring output quality degradation or improvement over 30 iterations.",
  },
  {
    id: 3,
    title: "R&D Council",
    status: "active",
    description:
      "A multi-agent council that convenes twice daily to evaluate content strategy, research directions, and site experiments. Three AI models debate: one proposes, one challenges, one synthesizes.",
    link: "/council",
  },
];
