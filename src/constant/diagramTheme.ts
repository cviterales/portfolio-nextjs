import { DIAGRAM_PALETTE, primitive } from "@/styles/palette.mjs";

type DiagramColorName = keyof typeof DIAGRAM_PALETTE;

/**
 * Colores literales de los diagramas SVG, derivados de la paleta única
 * (`src/styles/palette.mjs`). motion necesita el hex directo, no una var().
 */
export const DIAGRAM_COLOR = Object.fromEntries(
  (Object.keys(DIAGRAM_PALETTE) as DiagramColorName[]).map((name) => [
    name,
    primitive(DIAGRAM_PALETTE[name]),
  ]),
) as Record<DiagramColorName, string>;

export const DIAGRAM_FONT = {
  mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  sans: "inherit",
} as const;
