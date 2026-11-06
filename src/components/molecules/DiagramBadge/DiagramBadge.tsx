"use client";

import { AnimatePresence } from "motion/react";
import DiagramBox from "@/components/atoms/DiagramBox/DiagramBox";
import DiagramLabel from "@/components/atoms/DiagramLabel/DiagramLabel";
import { BOX_VARIANT, LABEL_TONE, LABEL_VARIANT, type LabelTone } from "@/types/diagram";

type DiagramBadgeProps = {
  x: number;
  y: number;
  value: string;
  tone?: LabelTone;
};

/** Badge con un valor (versión) que transiciona en vertical al cambiar. */
export default function DiagramBadge({
  x,
  y,
  value,
  tone = LABEL_TONE.muted,
}: DiagramBadgeProps) {
  const ty = y + 17;

  return (
    <g>
      <DiagramBox variant={BOX_VARIANT.inset} x={x} y={y} width={80} height={26} rx={13} />
      <AnimatePresence mode="wait">
        <DiagramLabel
          key={value}
          variant={LABEL_VARIANT.codeSm}
          tone={tone}
          textAnchor="middle"
          x={x + 40}
          y={ty}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {value}
        </DiagramLabel>
      </AnimatePresence>
    </g>
  );
}
