"use client";

import type { ComponentProps, ReactNode } from "react";
import { motion } from "motion/react";
import { DIAGRAM_COLOR, DIAGRAM_FONT } from "@/constant/diagramTheme";
import {
  LABEL_TONE,
  LABEL_VARIANT,
  type LabelTone,
  type LabelVariant,
} from "@/types/diagram";

type DiagramLabelProps = ComponentProps<typeof motion.text> & {
  variant?: LabelVariant;
  tone?: LabelTone;
  children: ReactNode;
};

interface VariantStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight?: number;
}

function variantStyle(variant: LabelVariant): VariantStyle {
  switch (variant) {
    case LABEL_VARIANT.title:
      return { fontFamily: DIAGRAM_FONT.sans, fontSize: 20, fontWeight: 600 };
    case LABEL_VARIANT.name:
      return { fontFamily: DIAGRAM_FONT.sans, fontSize: 16, fontWeight: 600 };
    case LABEL_VARIANT.button:
      return { fontFamily: DIAGRAM_FONT.sans, fontSize: 13, fontWeight: 600 };
    case LABEL_VARIANT.code:
      return { fontFamily: DIAGRAM_FONT.mono, fontSize: 13 };
    case LABEL_VARIANT.codeSm:
      return { fontFamily: DIAGRAM_FONT.mono, fontSize: 12 };
    case LABEL_VARIANT.codeXs:
      return { fontFamily: DIAGRAM_FONT.mono, fontSize: 11 };
    default:
      return { fontFamily: DIAGRAM_FONT.sans, fontSize: 12 };
  }
}

function toneColor(tone: LabelTone): string {
  switch (tone) {
    case LABEL_TONE.muted:
      return DIAGRAM_COLOR.muted;
    case LABEL_TONE.accent:
      return DIAGRAM_COLOR.accent;
    case LABEL_TONE.request:
      return DIAGRAM_COLOR.request;
    case LABEL_TONE.onAccent:
      return DIAGRAM_COLOR.ink;
    default:
      return DIAGRAM_COLOR.text;
  }
}

/** Texto base de un diagrama, con variantes de tamaño y tono. */
export default function DiagramLabel({
  variant = LABEL_VARIANT.body,
  tone = LABEL_TONE.base,
  children,
  ...rest
}: DiagramLabelProps) {
  const style = variantStyle(variant);

  return (
    <motion.text
      fontFamily={style.fontFamily}
      fontSize={style.fontSize}
      fontWeight={style.fontWeight}
      fill={toneColor(tone)}
      {...rest}
    >
      {children}
    </motion.text>
  );
}
