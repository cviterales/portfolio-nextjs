export const LANG = {
  en: "en",
  es: "es",
} as const;

export type Lang = (typeof LANG)[keyof typeof LANG];

/** Diccionario de un contenido en los idiomas soportados. */
export type Localized<T> = Record<Lang, T>;
