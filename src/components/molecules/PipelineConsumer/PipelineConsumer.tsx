"use client";

import { motion } from "motion/react";
import DiagramBox from "@/components/atoms/DiagramBox/DiagramBox";
import DiagramDot from "@/components/atoms/DiagramDot/DiagramDot";
import DiagramLabel from "@/components/atoms/DiagramLabel/DiagramLabel";
import {
  LPD_CONSUMER_X,
  LPD_CONSUMER_W,
  LPD_REMOTE_COMPONENT,
  LPD_STEP,
  LPD_COPY,
  lpdConsumerSub,
  lpdVersion,
} from "@/constant/libraryPipeline";
import {
  BOX_VARIANT,
  LABEL_TONE,
  LABEL_VARIANT,
  type ConsumerNode,
} from "@/types/diagram";
import type { Lang } from "@/types/i18n";

type PipelineConsumerProps = {
  consumer: ConsumerNode;
  index: number;
  inView: boolean;
  phase: number;
  version: number;
  lang: Lang;
};

/** Panel de un consumer (o el ghost) con el slot del componente remoto. */
export default function PipelineConsumer({
  consumer,
  index,
  inView,
  phase,
  version,
  lang,
}: PipelineConsumerProps) {
  const copy = LPD_COPY[lang];
  const { y, h, ghost } = consumer;
  const receiving = phase === LPD_STEP.response;
  const receiveDelay = index * 0.12 + 1.1;

  return (
    <motion.g
      initial={{ opacity: 0, x: 16 }}
      animate={inView ? { opacity: ghost ? 0.55 : 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.1, ease: "easeOut" }}
    >
      <DiagramBox
        variant={ghost ? BOX_VARIANT.ghost : BOX_VARIANT.solid}
        x={LPD_CONSUMER_X}
        y={y}
        width={LPD_CONSUMER_W}
        height={h}
        rx={16}
      />

      {ghost ? (
        <>
          <DiagramLabel variant={LABEL_VARIANT.name} x={LPD_CONSUMER_X + 24} y={y + 30}>
            {copy.ghost}
          </DiagramLabel>
          <DiagramLabel tone={LABEL_TONE.muted} x={LPD_CONSUMER_X + 24} y={y + 50}>
            {copy.ghostSub}
          </DiagramLabel>
        </>
      ) : (
        <>
          <DiagramLabel variant={LABEL_VARIANT.name} x={LPD_CONSUMER_X + 24} y={y + 34}>
            {consumer.name}
          </DiagramLabel>
          <DiagramLabel tone={LABEL_TONE.muted} x={LPD_CONSUMER_X + 24} y={y + 54}>
            {lpdConsumerSub(consumer.repo, consumer.infra)}
          </DiagramLabel>

          <DiagramDot
            cx={LPD_CONSUMER_X + LPD_CONSUMER_W - 24}
            cy={y + 30}
            r={4}
            active={receiving}
            animate={{ scale: receiving ? [1, 1.8, 1] : 1 }}
            transition={{ duration: 0.6, delay: receiveDelay }}
          />

          <motion.g
            key={`${consumer.id}-${version}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: version === 0 ? 0.8 + index * 0.1 : index * 0.12 + 1.2 }}
          >
            <DiagramBox
              variant={BOX_VARIANT.slot}
              x={LPD_CONSUMER_X + 24}
              y={y + 68}
              width={LPD_CONSUMER_W - 48}
              height={30}
              rx={8}
            />
            <DiagramBox
              variant={BOX_VARIANT.flash}
              x={LPD_CONSUMER_X + 24}
              y={y + 68}
              width={LPD_CONSUMER_W - 48}
              height={30}
              rx={8}
              initial={{ opacity: version === 0 ? 0 : 0.6 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1, delay: index * 0.12 + 1.2 }}
            />
            <DiagramLabel variant={LABEL_VARIANT.codeSm} x={LPD_CONSUMER_X + 38} y={y + 88}>
              {`<${LPD_REMOTE_COMPONENT} />`}
            </DiagramLabel>
            <DiagramLabel
              variant={LABEL_VARIANT.codeSm}
              tone={LABEL_TONE.accent}
              textAnchor="end"
              x={LPD_CONSUMER_X + LPD_CONSUMER_W - 38}
              y={y + 88}
            >
              {lpdVersion(version)}
            </DiagramLabel>
          </motion.g>
        </>
      )}
    </motion.g>
  );
}
