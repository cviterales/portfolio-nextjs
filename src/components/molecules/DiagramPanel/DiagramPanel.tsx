"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import DiagramBox from "@/components/atoms/DiagramBox/DiagramBox";
import DiagramLabel from "@/components/atoms/DiagramLabel/DiagramLabel";
import { DIAGRAM_COLOR } from "@/constant/diagramTheme";
import { BOX_VARIANT, LABEL_TONE, LABEL_VARIANT, type Box } from "@/types/diagram";

type DiagramPanelProps = {
  box: Box;
  title: string;
  subtitle: string;
  inView: boolean;
  /** Desplazamiento desde el que entra el panel. */
  enter?: { x?: number; y?: number };
  /** Segundos de espera antes de la entrada. */
  delay?: number;
  /** Opacidad una vez en pantalla (un panel inactivo puede quedar atenuado). */
  opacity?: number;
  active?: boolean;
  /** Si está definido, dibuja el pulso; cambiarlo lo reinicia. */
  pulseKey?: string | number;
  /** Línea bajo el encabezado. Se apaga si el panel usa ese espacio. */
  divider?: boolean;
  children?: ReactNode;
};

/** Panel de un diagrama: caja, título, subtítulo, divisor y pulso opcional. */
export default function DiagramPanel({
  box,
  title,
  subtitle,
  inView,
  enter,
  delay = 0,
  opacity = 1,
  active = false,
  pulseKey,
  divider = true,
  children,
}: DiagramPanelProps) {
  return (
    <motion.g
      initial={{ opacity: 0, x: enter?.x ?? 0, y: enter?.y ?? 0 }}
      animate={inView ? { opacity, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      <DiagramBox x={box.x} y={box.y} width={box.w} height={box.h} rx={18} active={active} />

      {pulseKey !== undefined && (
        <DiagramBox
          key={`pulse-${pulseKey}`}
          variant={BOX_VARIANT.pulse}
          x={box.x}
          y={box.y}
          width={box.w}
          height={box.h}
          rx={18}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      )}

      <DiagramLabel variant={LABEL_VARIANT.title} x={box.x + 24} y={box.y + 36}>
        {title}
      </DiagramLabel>
      <DiagramLabel tone={LABEL_TONE.muted} x={box.x + 24} y={box.y + 56}>
        {subtitle}
      </DiagramLabel>
      {divider && (
        <line
          x1={box.x + 24}
          x2={box.x + box.w - 24}
          y1={box.y + 74}
          y2={box.y + 74}
          stroke={DIAGRAM_COLOR.border}
        />
      )}

      {children}
    </motion.g>
  );
}
