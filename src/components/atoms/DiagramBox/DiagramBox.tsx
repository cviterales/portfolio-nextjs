"use client";

import type { ComponentProps, CSSProperties } from "react";
import { motion } from "motion/react";
import { DIAGRAM_COLOR } from "@/constant/diagramTheme";
import { BOX_VARIANT, type BoxVariant } from "@/types/diagram";

type DiagramBoxProps = ComponentProps<typeof motion.rect> & {
  variant?: BoxVariant;
  /** Resalta el borde con el color de acento. */
  active?: boolean;
};

interface VariantStyle {
  fill: string;
  stroke: string;
  strokeWidth: number;
  strokeDasharray?: string;
  fillOpacity?: number;
  strokeOpacity?: number;
  /** Los destellos y pulsos no deben capturar el mouse. */
  passive?: boolean;
  /** Escala desde el centro de la propia caja (pulse). */
  centered?: boolean;
}

function variantStyle(variant: BoxVariant): VariantStyle {
  switch (variant) {
    case BOX_VARIANT.inset:
      return { fill: DIAGRAM_COLOR.surface2, stroke: DIAGRAM_COLOR.border, strokeWidth: 1 };
    case BOX_VARIANT.ghost:
      return { fill: "none", stroke: DIAGRAM_COLOR.idle, strokeWidth: 1.5, strokeDasharray: "5 5" };
    case BOX_VARIANT.dashed:
      return { fill: "none", stroke: DIAGRAM_COLOR.idle, strokeWidth: 1, strokeDasharray: "4 4" };
    case BOX_VARIANT.slot:
      return {
        fill: DIAGRAM_COLOR.accent,
        fillOpacity: 0.08,
        stroke: DIAGRAM_COLOR.accent,
        strokeOpacity: 0.7,
        strokeWidth: 1,
        strokeDasharray: "4 3",
      };
    case BOX_VARIANT.flash:
      return { fill: DIAGRAM_COLOR.accent, stroke: "none", strokeWidth: 0, passive: true };
    case BOX_VARIANT.pulse:
      return { fill: "none", stroke: DIAGRAM_COLOR.accent, strokeWidth: 2, passive: true, centered: true };
    default:
      return { fill: DIAGRAM_COLOR.surface, stroke: DIAGRAM_COLOR.border, strokeWidth: 1.5 };
  }
}

const CENTERED: CSSProperties = { transformBox: "fill-box", transformOrigin: "center" };

/** Rect base de un diagrama, con variantes y borde activable. */
export default function DiagramBox({
  variant = BOX_VARIANT.solid,
  active = false,
  style,
  ...rest
}: DiagramBoxProps) {
  const v = variantStyle(variant);

  return (
    <motion.rect
      fill={v.fill}
      fillOpacity={v.fillOpacity}
      stroke={active ? DIAGRAM_COLOR.accent : v.stroke}
      strokeOpacity={v.strokeOpacity}
      strokeWidth={v.strokeWidth}
      strokeDasharray={v.strokeDasharray}
      pointerEvents={v.passive ? "none" : undefined}
      style={v.centered ? { ...CENTERED, ...style } : style}
      {...rest}
    />
  );
}
