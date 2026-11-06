"use client";

import DiagramLink from "@/components/molecules/DiagramLink/DiagramLink";
import { LINK_TONE, TRAVEL_TONE, type ConsumerNode, type LinkTone } from "@/types/diagram";

type MfeConnectionProps = {
  consumer: ConsumerNode;
  index: number;
  phase: number;
  inView: boolean;
  animating: boolean;
};

function linkTone(phase: number): LinkTone {
  if (phase === 0) return LINK_TONE.request;
  if (phase === 1) return LINK_TONE.accent;
  return LINK_TONE.idle;
}

/** Curva host <-> consumer con los puntos de request y response. */
export default function MfeConnection({
  consumer,
  index,
  phase,
  inView,
  animating,
}: MfeConnectionProps) {
  return (
    <DiagramLink
      link={consumer.link}
      index={index}
      inView={inView}
      ghost={consumer.ghost}
      tone={linkTone(phase)}
      flows={[
        { tone: TRAVEL_TONE.request, reverse: true, active: animating && phase === 0 },
        { tone: TRAVEL_TONE.accent, active: animating && phase === 1 },
      ]}
    />
  );
}
