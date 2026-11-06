"use client";

import type { ComponentProps } from "react";
import { motion } from "motion/react";
import { DIAGRAM_COLOR } from "@/constant/diagramTheme";

type DiagramDotProps = ComponentProps<typeof motion.circle> & {
  /** Puerto: círculo hueco sobre el borde de una caja. */
  port?: boolean;
  /** Encendido con el color de acento. */
  active?: boolean;
  /** Segundos de espera antes de encenderse (escalona filas). */
  fillDelay?: number;
};

/** Círculo de estado o puerto de conexión de un diagrama. */
export default function DiagramDot({
  port = false,
  active = false,
  fillDelay = 0,
  style,
  ...rest
}: DiagramDotProps) {
  if (port) {
    return (
      <motion.circle
        fill={DIAGRAM_COLOR.surface}
        stroke={DIAGRAM_COLOR.idle}
        strokeWidth={1.5}
        {...rest}
      />
    );
  }

  return (
    <motion.circle
      fill={active ? DIAGRAM_COLOR.accent : DIAGRAM_COLOR.idle}
      style={{
        transformBox: "fill-box",
        transformOrigin: "center",
        transition: "fill 0.4s ease",
        transitionDelay: active ? `${fillDelay}s` : "0s",
        ...style,
      }}
      {...rest}
    />
  );
}
