import type { ProcessStepContent } from "@/types/process";

export const PROCESS_STEPS: readonly ProcessStepContent[] = [
  {
    id: "discovery",
    label: "Discovery & Alignment",
    description:
      "I understand the problem, the business and who will use it before touching any code.",
    iconPaths: ["M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z", "M20 20l-4.5-4.5"],
  },
  {
    id: "analysis",
    label: "Technical Analysis",
    description:
      "I review architecture, integrations and risks to choose the right approach.",
    iconPaths: ["M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"],
  },
  {
    id: "planning",
    label: "Planning & Estimation",
    description:
      "I split the work into milestones and estimate with ranges, not promises.",
    iconPaths: [
      "M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1zM8 6H6a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-2M9 12h6M9 16h4",
    ],
  },
  {
    id: "poc",
    label: "POC & Validation",
    description:
      "I test the riskiest part first, with something small that works end to end.",
    iconPaths: [
      "M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M7.5 15h9",
    ],
  },
  {
    id: "mvp",
    label: "Build & QA",
    description: "I build with automated tests and continuous reviews.",
    iconPaths: ["M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z", "M8 12l3 3 5-6"],
  },
  {
    id: "support",
    label: "Support & Evolution",
    description:
      "I monitor production and keep improving what is already running.",
    iconPaths: ["M21 12a9 9 0 1 1-3-6.7M21 4v5h-5"],
  },
];

/** Geometría del diagrama (px). */
export const PROCESS_NODE_SIZE = 150;
export const PROCESS_PITCH = 185;
export const PROCESS_DROP = 100;

/** Segundos entre el encendido de un paso y el siguiente en la cascada. */
export const PROCESS_CASCADE_DELAY = 0.5;
