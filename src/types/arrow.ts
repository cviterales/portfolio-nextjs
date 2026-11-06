export const ARROW_DIRECTION = {
  down: "down",
  up: "up",
} as const;

export type ArrowDirection =
  (typeof ARROW_DIRECTION)[keyof typeof ARROW_DIRECTION];
