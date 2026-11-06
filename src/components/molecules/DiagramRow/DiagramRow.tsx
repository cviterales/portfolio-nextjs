"use client";

import { motion, AnimatePresence } from "motion/react";
import DiagramBox from "@/components/atoms/DiagramBox/DiagramBox";
import DiagramDot from "@/components/atoms/DiagramDot/DiagramDot";
import DiagramLabel from "@/components/atoms/DiagramLabel/DiagramLabel";
import { DIAGRAM_COLOR } from "@/constant/diagramTheme";
import {
  BOX_VARIANT,
  LABEL_TONE,
  LABEL_VARIANT,
  type LabelTone,
} from "@/types/diagram";

type DiagramRowProps = {
  x: number;
  y: number;
  width: number;
  height?: number;
  /** Nombre de componente: se muestra como `<Name />`. */
  name?: string;
  /** Texto libre, alternativo a `name`. */
  label?: string;
  highlighted?: boolean;
  /** Texto corto a la derecha (versión, estado, token). */
  tag?: string;
  tagTone?: LabelTone;
  /** Segundos de espera antes de resaltarse (escalona filas). */
  delay?: number;
};

/** Fila con un componente o etiqueta, con resaltado y tag opcionales. */
export default function DiagramRow({
  x,
  y,
  width,
  height = 40,
  name,
  label,
  highlighted = false,
  tag,
  tagTone = LABEL_TONE.accent,
  delay = 0,
}: DiagramRowProps) {
  const cy = y + height / 2;
  const rx = Math.min(10, height / 2);

  return (
    <g>
      <DiagramBox variant={BOX_VARIANT.inset} x={x} y={y} width={width} height={height} rx={rx} />
      <motion.rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={rx}
        fill={DIAGRAM_COLOR.accent}
        stroke={DIAGRAM_COLOR.accent}
        initial={{ fillOpacity: 0, strokeOpacity: 0 }}
        animate={{ fillOpacity: highlighted ? 0.16 : 0, strokeOpacity: highlighted ? 1 : 0 }}
        transition={{ duration: 0.4, delay: highlighted ? delay : 0 }}
      />
      <DiagramDot cx={x + 20} cy={cy} r={4} active={highlighted} fillDelay={delay} />
      <DiagramLabel variant={LABEL_VARIANT.code} x={x + 36} y={cy + 5}>
        {label ?? `<${name} />`}
      </DiagramLabel>
      {tag && (
        <AnimatePresence mode="wait">
          <DiagramLabel
            key={tag}
            variant={LABEL_VARIANT.codeXs}
            tone={tagTone}
            textAnchor="end"
            x={x + width - 16}
            y={cy + 5}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {tag}
          </DiagramLabel>
        </AnimatePresence>
      )}
    </g>
  );
}
