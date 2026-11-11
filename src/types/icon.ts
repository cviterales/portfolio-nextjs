export const ICON_NAME = {
  linkedin: "linkedin",
  github: "github",
  mail: "mail",
  pin: "pin",
  flagAr: "flagAr",
  arrowRight: "arrowRight",
  ia: "ia"
} as const;

export type IconName = (typeof ICON_NAME)[keyof typeof ICON_NAME];
