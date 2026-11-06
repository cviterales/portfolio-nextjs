import type { ProcessStepContent } from "@/types/process";

export const PROCESS_STEPS: readonly ProcessStepContent[] = [
  { id: "discovery", label: "Discovery & Alignment" },
  { id: "analysis", label: "Technical Analysis" },
  { id: "planning", label: "Planning & Estimation" },
  { id: "poc", label: "POC & Validation" },
  { id: "mvp", label: "Build & QA" },
  { id: "support", label: "Support & Evolution" },
];
