export const STEPS = [
  "intro",
  "rationality",
  "extraversion",
  "hypothesis",
  "statics",
  "positivism",
  "process",
  "synthesis",
  "base",
  "creative",
  "result",
] as const;

export type StepId = (typeof STEPS)[number];
