import type { Box, Link } from "@/types/diagram";
import type { Localized } from "@/types/i18n";
import {
  HERO_STATE,
  type HeroContentState,
  type HeroCopy,
  type HeroState,
} from "@/types/personalization";

export const PZ_VIEWBOX = { w: 1000, h: 450 };

export const PZ_CONSOLE: Box = { x: 30, y: 20, w: 940, h: 64 };

const NODE = { y: 112, w: 240, h: 310 };
export const PZ_CMS: Box = { x: 30, ...NODE };
export const PZ_LANDING: Box = { x: 380, ...NODE };
export const PZ_SCRIPT: Box = { x: 730, ...NODE };

/** Preview del Hero dentro de la landing. */
export const PZ_HERO_BOX: Box = {
  x: PZ_LANDING.x + 24,
  y: PZ_LANDING.y + 106,
  w: PZ_LANDING.w - 48,
  h: 104,
};

const LINK_Y = NODE.y + NODE.h / 2;

function straight(x0: number, x1: number): Link {
  return { x0, y0: LINK_Y, xm: (x0 + x1) / 2, x1, y1: LINK_Y };
}

/** CMS -> Landing. */
export const PZ_CONTENT_LINK = straight(PZ_CMS.x + PZ_CMS.w, PZ_LANDING.x);
/** Landing <-> Script. */
export const PZ_EVENT_LINK = straight(PZ_LANDING.x + PZ_LANDING.w, PZ_SCRIPT.x);

/** Variantes del Hero cargadas en el CMS. */
export const PZ_VARIANTS: readonly string[] = ["default", "returning", "campaign"];
/** La variante que decide el script. */
export const PZ_CHOSEN = "returning";
export const PZ_SIGNALS: readonly string[] = [
  "returning visitor",
  "utm: spring-sale",
  "device: mobile",
];
export const PZ_EVENT_NAME = "personalization:variant";

export const PZ_HERO: Record<HeroContentState, HeroCopy> = {
  default: { title: "Summer collection", cta: "Shop now" },
  variant: { title: "Welcome back", cta: "Continue shopping" },
};

/** Fases del flujo. */
export const PZ_STEP = {
  build: 0,
  isr: 1,
  default: 2,
  load: 3,
  detect: 4,
  event: 5,
  personalize: 6,
} as const;

export const PZ_STEP_COUNT = 7;

/** Comando de la consola por fase (es código, no se traduce). */
export const PZ_COMMANDS: readonly string[] = [
  "GET /cms/hero?variants=all",
  'revalidate("/landing")',
  'render(<Hero variant="default" />)',
  '<script async src="tool.js">',
  `detect(user) -> "${PZ_CHOSEN}"`,
  `dispatchEvent("${PZ_EVENT_NAME}")`,
  `render(<Hero variant="${PZ_CHOSEN}" />)`,
];

interface PzCopy {
  cms: string;
  cmsSub: string;
  component: string;
  publish: string;
  landing: string;
  landingSub: string;
  content: string;
  listener: string;
  script: string;
  scriptSub: string;
  signals: string;
  decision: string;
  tags: Record<HeroState, string>;
  console: string;
  linkContent: string;
  linkEvents: string;
  steps: readonly string[];
  captions: readonly string[];
}

export const PZ_COPY: Localized<PzCopy> = {
  en: {
    cms: "CMS",
    cmsSub: "Content and variants",
    component: "Hero component",
    publish: "Editor publishes",
    landing: "Landing",
    landingSub: "Static page with ISR",
    content: "cms content",
    listener: "addEventListener",
    script: "Script",
    scriptSub: "Third-party, the brain",
    signals: "Detected user",
    decision: "Decision",
    tags: {
      [HERO_STATE.idle]: "waiting",
      [HERO_STATE.default]: "default",
      [HERO_STATE.variant]: PZ_CHOSEN,
    },
    console: "Current step",
    linkContent: "build + ISR",
    linkEvents: "browser events",
    steps: ["Build", "ISR", "Default", "Load", "Detect", "Event", "Personalize"],
    captions: [
      "At build time the landing requests the hero content and all of its variants from the CMS.",
      "When an editor publishes, ISR refreshes the page in the background. No deploy needed.",
      "A visitor arrives. The landing renders the default content right away.",
      "The landing loads the third-party script, the brain of the personalization.",
      "The script detects who the visitor is and decides which variant fits best.",
      "It tells the landing which variant to show with a browser event.",
      "The landing swaps the default content for the variant made for this user.",
    ],
  },
  es: {
    cms: "CMS",
    cmsSub: "Contenido y variantes",
    component: "Componente Hero",
    publish: "El editor publica",
    landing: "Landing",
    landingSub: "Página estática con ISR",
    content: "contenido cms",
    listener: "addEventListener",
    script: "Script",
    scriptSub: "De terceros, el cerebro",
    signals: "Usuario detectado",
    decision: "Decisión",
    tags: {
      [HERO_STATE.idle]: "en espera",
      [HERO_STATE.default]: "default",
      [HERO_STATE.variant]: PZ_CHOSEN,
    },
    console: "Paso actual",
    linkContent: "build + ISR",
    linkEvents: "eventos del browser",
    steps: ["Build", "ISR", "Default", "Carga", "Detecta", "Evento", "Personaliza"],
    captions: [
      "En build time la landing le pide al CMS el contenido del hero y todas sus variantes.",
      "Cuando un editor publica, ISR refresca la página en segundo plano. Sin deploy.",
      "Llega un visitante. La landing renderiza al instante el contenido por defecto.",
      "La landing carga el script de terceros, el cerebro de la personalización.",
      "El script detecta quién es el visitante y decide qué variante le corresponde.",
      "Le avisa a la landing qué variante mostrar mediante un evento del navegador.",
      "La landing reemplaza el contenido por defecto por la variante pensada para este usuario.",
    ],
  },
};
