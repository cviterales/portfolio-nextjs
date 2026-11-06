"use client";

import { motion } from "motion/react";
import TravelDot from "@/components/atoms/TravelDot/TravelDot";
import DiagramDot from "@/components/atoms/DiagramDot/DiagramDot";
import DiagramLabel from "@/components/atoms/DiagramLabel/DiagramLabel";
import { linkPath } from "@/utils/bezier";
import { DIAGRAM_COLOR } from "@/constant/diagramTheme";
import {
  LABEL_PLACEMENT,
  LABEL_TONE,
  LABEL_VARIANT,
  LINK_TONE,
  type LabelPlacement,
  type LabelTone,
  type Link,
  type LinkFlow,
  type LinkTone,
} from "@/types/diagram";

type DiagramLinkProps = {
  link: Link;
  index?: number;
  inView: boolean;
  /** Color del trazo y de la etiqueta. */
  tone?: LinkTone;
  /** Un flujo de puntos por cada elemento. */
  flows?: readonly LinkFlow[];
  label?: string;
  labelPlacement?: LabelPlacement;
  ghost?: boolean;
};

/** Delays del punto principal y su cola. */
const STREAM = [0, 0.22];

const STROKE: Record<LinkTone, string> = {
  [LINK_TONE.idle]: DIAGRAM_COLOR.idle,
  [LINK_TONE.accent]: DIAGRAM_COLOR.accent,
  [LINK_TONE.request]: DIAGRAM_COLOR.request,
};

const LABEL: Record<LinkTone, LabelTone> = {
  [LINK_TONE.idle]: LABEL_TONE.muted,
  [LINK_TONE.accent]: LABEL_TONE.accent,
  [LINK_TONE.request]: LABEL_TONE.request,
};

/** Conexión con puertos, etiqueta y puntos viajeros en uno o ambos sentidos. */
export default function DiagramLink({
  link,
  index = 0,
  inView,
  tone = LINK_TONE.idle,
  flows = [],
  label,
  labelPlacement = LABEL_PLACEMENT.start,
  ghost = false,
}: DiagramLinkProps) {
  const base = index * 0.12;
  const above = labelPlacement === LABEL_PLACEMENT.above;

  return (
    <g opacity={ghost ? 0.55 : 1}>
      <motion.path
        d={linkPath(link)}
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0, stroke: DIAGRAM_COLOR.idle }}
        animate={{ pathLength: inView ? 1 : 0, stroke: STROKE[tone] }}
        transition={{
          pathLength: { duration: 1.1, delay: 0.5 + base, ease: "easeOut" },
          stroke: { duration: 0.4 },
        }}
      />

      {flows.map((flow, i) =>
        STREAM.map((d, k) => (
          <TravelDot
            key={`${i}-${k}`}
            link={link}
            tone={flow.tone}
            reverse={flow.reverse}
            active={flow.active}
            delay={(flow.delay ?? base) + d}
            duration={flow.duration}
            r={k === 0 ? 5 : 3}
          />
        )),
      )}

      <DiagramDot port cx={link.x0} cy={link.y0} r={4} />
      <DiagramDot port cx={link.x1} cy={link.y1} r={4} />

      {label && (
        <DiagramLabel
          variant={LABEL_VARIANT.codeXs}
          tone={LABEL[tone]}
          textAnchor={above ? "middle" : undefined}
          x={above ? (link.x0 + link.x1) / 2 : link.x0 + 16}
          y={above ? link.y0 - 14 : (link.y0 + link.y1) / 2 + 4}
        >
          {label}
        </DiagramLabel>
      )}
    </g>
  );
}
