"use client";

import { AnimatePresence } from "motion/react";
import DiagramBox from "@/components/atoms/DiagramBox/DiagramBox";
import DiagramLabel from "@/components/atoms/DiagramLabel/DiagramLabel";
import {
  BOX_VARIANT,
  LABEL_TONE,
  LABEL_VARIANT,
  type Box,
  type LabelTone,
} from "@/types/diagram";

type DiagramConsoleProps = {
  box: Box;
  title: string;
  /** Comando de la fase actual. */
  command: string;
  /** Cambia con la fase: dispara la transición del comando. */
  stepKey: number;
  tone?: LabelTone;
  /** Desplazamiento vertical del título respecto del borde superior. */
  titleOffset?: number;
  /** Desplazamiento vertical del comando; por defecto, cerca del borde inferior. */
  commandOffset?: number;
};

/** Consola que muestra el comando de la fase actual. */
export default function DiagramConsole({
  box,
  title,
  command,
  stepKey,
  tone = LABEL_TONE.accent,
  titleOffset = 34,
  commandOffset = box.h - 32,
}: DiagramConsoleProps) {
  const y = box.y + commandOffset;

  return (
    <>
      <DiagramBox variant={BOX_VARIANT.inset} x={box.x} y={box.y} width={box.w} height={box.h} rx={16} />
      <DiagramLabel tone={LABEL_TONE.muted} x={box.x + 24} y={box.y + titleOffset}>
        {title}
      </DiagramLabel>
      <AnimatePresence mode="wait">
        <DiagramLabel
          key={stepKey}
          variant={LABEL_VARIANT.code}
          tone={tone}
          x={box.x + 24}
          y={y}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {command}
        </DiagramLabel>
      </AnimatePresence>
    </>
  );
}
