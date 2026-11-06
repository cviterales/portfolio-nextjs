/** Qué contenido muestra el Hero de la landing. */
export const HERO_STATE = {
  idle: "idle",
  default: "default",
  variant: "variant",
} as const;

export type HeroState = (typeof HERO_STATE)[keyof typeof HERO_STATE];

/** Estados en los que el Hero ya muestra contenido. */
export type HeroContentState = Exclude<HeroState, typeof HERO_STATE.idle>;

export interface HeroCopy {
  title: string;
  cta: string;
}
