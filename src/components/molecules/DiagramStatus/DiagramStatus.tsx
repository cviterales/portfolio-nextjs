"use client";

import { AnimatePresence } from "motion/react";
import DiagramBox from "@/components/atoms/DiagramBox/DiagramBox";
import DiagramDot from "@/components/atoms/DiagramDot/DiagramDot";
import DiagramLabel from "@/components/atoms/DiagramLabel/DiagramLabel";
import { BOX_VARIANT, LABEL_TONE, LABEL_VARIANT } from "@/types/diagram";

type DiagramStatusProps = {
  x: number;
  y: number;
  on: boolean;
  onText: string;
  offText: string;
};

/** Pastilla de estado encendido/apagado con un texto para cada caso. */
export default function DiagramStatus({ x, y, on, onText, offText }: DiagramStatusProps) {
  return (
    <g>
      <DiagramBox variant={BOX_VARIANT.inset} x={x} y={y} width={100} height={24} rx={12} />
      <DiagramDot cx={x + 14} cy={y + 12} r={3.5} active={on} />
      <AnimatePresence mode="wait">
        <DiagramLabel
          key={on ? "on" : "off"}
          variant={LABEL_VARIANT.codeXs}
          tone={on ? LABEL_TONE.accent : LABEL_TONE.muted}
          x={x + 26}
          y={y + 16}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {on ? onText : offText}
        </DiagramLabel>
      </AnimatePresence>
    </g>
  );
}
