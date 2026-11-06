// @ts-check
/**
 * Fuente única de verdad de la paleta. Desde aquí se generan los tokens CSS
 * (`npm run tokens`) y se derivan los colores literales que usan los SVG
 * animados con motion. No edites `colors.css` ni `diagram.css` a mano: son
 * archivos generados.
 */

/** Primitivos: los únicos hex del proyecto. */
export const PRIMITIVES = {
  "black-950": "#09090b",
  "black-900": "#0f0f12",
  "black-800": "#16161a",
  "black-700": "#1f1f25",
  "gray-500": "#6b6b76",
  "gray-300": "#a1a1ad",
  "gray-100": "#e4e4ea",
  white: "#ffffff",
  "orange-600": "#fd4b19",
  "orange-500": "#fd7a19",
  "orange-400": "#ffa24d",
  "orange-300": "#f5a04f",
  "red-500": "#ff5252",
  // Colores propios de los diagramas.
  "diagram-surface": "#111114",
  "diagram-surface-2": "#17171b",
  "diagram-border": "#2a2a31",
  "diagram-idle": "#3a3a43",
  "diagram-muted": "#9aa3b8",
  "diagram-request": "#8ea8ff",
  "diagram-ink": "#1a0d04",
};

/**
 * Tokens semánticos. Un valor `{ ref }` apunta a un primitivo; un `{ raw }` es
 * un valor literal (gradientes, rgba, sombras).
 */
export const SEMANTIC = {
  // Fondos
  "bg-surface": { ref: "black-950" },
  "bg-surface-alt": { ref: "black-900" },
  "bg-panel": { ref: "black-800" },
  "bg-surface-glass": { raw: "rgba(9, 9, 11, 0.8)" },

  // Acciones
  "action-primary": { ref: "orange-500" },
  "action-secondary": { ref: "orange-400" },
  "action-danger": { ref: "red-500" },
  "action-gradient": {
    raw: "linear-gradient(135deg, var(--color-orange-400) 0%, var(--color-orange-600) 100%)",
  },
  "action-gradient-hover": {
    raw: "linear-gradient(135deg, var(--color-orange-400) 0%, var(--color-orange-500) 100%)",
  },

  // Texto
  "text-base": { ref: "gray-100" },
  "text-muted": { ref: "gray-300" },
  "text-title": { ref: "white" },
  "text-label": { ref: "orange-400" },
  "text-on-action": { ref: "white" },

  // Bordes
  "border-default": { ref: "black-700" },
  "border-primary": { ref: "orange-500" },
  "border-active": { ref: "orange-400" },

  // Efectos
  "shadow-elevation": { raw: "0 10px 30px -10px rgba(0, 0, 0, 0.7)" },
  "glow-primary": { raw: "0 0 20px rgba(253, 122, 25, 0.35)" },
  "focus-ring": { raw: "0 0 0 2px var(--color-orange-400)" },

  // Diagramas (consumidos como var() por los CSS Modules de los diagramas)
  "diagram-bg": { ref: "black-950" },
  "diagram-surface": { ref: "diagram-surface" },
  "diagram-surface-2": { ref: "diagram-surface-2" },
  "diagram-border": { ref: "diagram-border" },
  "diagram-idle": { ref: "diagram-idle" },
  "diagram-accent": { ref: "orange-500" },
  "diagram-accent-deep": { ref: "orange-600" },
  "diagram-request": { ref: "diagram-request" },
  "diagram-ink": { ref: "diagram-ink" },
  "diagram-muted": { ref: "diagram-muted" },
};

/**
 * Colores literales que necesitan los SVG animados. Cada clave resuelve a un
 * hex de `PRIMITIVES`, así motion recibe el valor directo (no una var()).
 * @satisfies {Record<string, keyof typeof PRIMITIVES>}
 */
export const DIAGRAM_PALETTE = {
  bg: "black-950",
  surface: "diagram-surface",
  surface2: "diagram-surface-2",
  border: "diagram-border",
  idle: "diagram-idle",
  text: "white",
  muted: "diagram-muted",
  accent: "orange-500",
  accentLight: "orange-300",
  accentDeep: "orange-600",
  request: "diagram-request",
  ink: "diagram-ink",
};

/** @typedef {keyof typeof PRIMITIVES} PrimitiveKey */

/**
 * Resuelve la clave de un primitivo a su valor hex.
 * @param {PrimitiveKey} key
 * @returns {string}
 */
export function primitive(key) {
  const value = PRIMITIVES[key];
  if (value === undefined) {
    throw new Error(`Unknown primitive color: ${key}`);
  }
  return value;
}
