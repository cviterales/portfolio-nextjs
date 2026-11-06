export interface Point {
  x: number;
  y: number;
}

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Curva de conexión entre dos puertos. `xm` es el control horizontal. */
export interface Link {
  x0: number;
  y0: number;
  xm: number;
  x1: number;
  y1: number;
}

export interface ConsumerNode {
  id: string;
  name: string;
  repo: string;
  infra: string;
  ghost: boolean;
  y: number;
  h: number;
  port: number;
  link: Link;
}

/** Variantes visuales del rect base de un diagrama (`DiagramBox`). */
export const BOX_VARIANT = {
  solid: "solid",
  inset: "inset",
  ghost: "ghost",
  slot: "slot",
  dashed: "dashed",
  /** Relleno de acento para destellos; se anima con opacity. */
  flash: "flash",
  /** Contorno de acento que se expande y se desvanece. */
  pulse: "pulse",
} as const;

export type BoxVariant = (typeof BOX_VARIANT)[keyof typeof BOX_VARIANT];

/** Variantes de texto de un diagrama (`DiagramLabel`). */
export const LABEL_VARIANT = {
  body: "body",
  title: "title",
  name: "name",
  button: "button",
  code: "code",
  codeSm: "codeSm",
  codeXs: "codeXs",
} as const;

export type LabelVariant = (typeof LABEL_VARIANT)[keyof typeof LABEL_VARIANT];

/** Tono de color de un texto de diagrama. */
export const LABEL_TONE = {
  base: "base",
  muted: "muted",
  accent: "accent",
  request: "request",
  /** Texto oscuro para ir sobre un relleno de acento. */
  onAccent: "onAccent",
} as const;

export type LabelTone = (typeof LABEL_TONE)[keyof typeof LABEL_TONE];

/** Color de un punto que viaja por una curva. */
export const TRAVEL_TONE = {
  accent: "accent",
  request: "request",
} as const;

export type TravelTone = (typeof TRAVEL_TONE)[keyof typeof TRAVEL_TONE];

/** Un flujo de puntos sobre una conexión. */
export interface LinkFlow {
  tone: TravelTone;
  /** Recorre la curva de destino a origen. */
  reverse?: boolean;
  active: boolean;
  /** Segundos de espera. Si se omite, se escalona según el índice del link. */
  delay?: number;
  /** Segundos que tarda el punto en recorrer la curva. */
  duration?: number;
}

/** Color del trazo de una conexión. */
export const LINK_TONE = {
  idle: "idle",
  accent: "accent",
  request: "request",
} as const;

export type LinkTone = (typeof LINK_TONE)[keyof typeof LINK_TONE];

/** Dónde va la etiqueta de una conexión. */
export const LABEL_PLACEMENT = {
  /** Junto al origen, a media altura (conexiones verticales). */
  start: "start",
  /** Centrada sobre la línea (conexiones horizontales). */
  above: "above",
} as const;

export type LabelPlacement =
  (typeof LABEL_PLACEMENT)[keyof typeof LABEL_PLACEMENT];
