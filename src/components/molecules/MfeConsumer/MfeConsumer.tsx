"use client";

import { motion } from "motion/react";
import DiagramBox from "@/components/atoms/DiagramBox/DiagramBox";
import DiagramDot from "@/components/atoms/DiagramDot/DiagramDot";
import DiagramLabel from "@/components/atoms/DiagramLabel/DiagramLabel";
import {
  MFE_CONSUMER_X,
  MFE_CONSUMER_W,
  MFE_UPDATED_COMPONENT,
  MFE_COPY,
  mfeConsumerSub,
  mfeVersion,
} from "@/constant/microfrontend";
import {
  BOX_VARIANT,
  LABEL_TONE,
  LABEL_VARIANT,
  type ConsumerNode,
} from "@/types/diagram";
import type { Lang } from "@/types/i18n";

type MfeConsumerProps = {
  consumer: ConsumerNode;
  index: number;
  inView: boolean;
  phase: number;
  consumerVersion: number;
  lang: Lang;
};

/** Panel de un consumer (o el ghost "Consumer N") con el slot remoto. */
export default function MfeConsumer({
  consumer,
  index,
  inView,
  phase,
  consumerVersion,
  lang,
}: MfeConsumerProps) {
  const copy = MFE_COPY[lang];
  const { y, h, ghost } = consumer;

  return (
    <motion.g
      initial={{ opacity: 0, x: 16 }}
      animate={inView ? { opacity: ghost ? 0.55 : 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.1, ease: "easeOut" }}
    >
      <DiagramBox
        variant={ghost ? BOX_VARIANT.ghost : BOX_VARIANT.solid}
        x={MFE_CONSUMER_X}
        y={y}
        width={MFE_CONSUMER_W}
        height={h}
        rx={16}
      />

      {ghost ? (
        <>
          <DiagramLabel variant={LABEL_VARIANT.name} x={664} y={y + 30}>
            {copy.ghost}
          </DiagramLabel>
          <DiagramLabel tone={LABEL_TONE.muted} x={664} y={y + 50}>
            {copy.ghostSub}
          </DiagramLabel>
        </>
      ) : (
        <>
          <DiagramLabel variant={LABEL_VARIANT.name} x={664} y={y + 34}>
            {consumer.name}
          </DiagramLabel>
          <DiagramLabel tone={LABEL_TONE.muted} x={664} y={y + 54}>
            {mfeConsumerSub(consumer.repo, consumer.infra)}
          </DiagramLabel>

          <DiagramDot
            cx={936}
            cy={y + 30}
            r={4}
            active={phase === 1}
            animate={{ scale: phase === 1 ? [1, 1.8, 1] : 1 }}
            transition={{ duration: 0.6, delay: index * 0.12 + 1.1 }}
          />

          <motion.g
            key={`${consumer.id}-${consumerVersion}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: consumerVersion === 0 ? 0.8 + index * 0.1 : index * 0.12 + 1.2 }}
          >
            <DiagramBox variant={BOX_VARIANT.slot} x={664} y={y + 68} width={272} height={30} rx={8} />
            <DiagramBox
              variant={BOX_VARIANT.flash}
              x={664}
              y={y + 68}
              width={272}
              height={30}
              rx={8}
              initial={{ opacity: consumerVersion === 0 ? 0 : 0.6 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1, delay: index * 0.12 + 1.2 }}
            />
            <DiagramLabel variant={LABEL_VARIANT.codeSm} x={678} y={y + 88}>
              {`<${MFE_UPDATED_COMPONENT} />`}
            </DiagramLabel>
            <DiagramLabel
              variant={LABEL_VARIANT.codeSm}
              tone={LABEL_TONE.accent}
              textAnchor="end"
              x={922}
              y={y + 88}
            >
              {mfeVersion(consumerVersion)}
            </DiagramLabel>
          </motion.g>
        </>
      )}
    </motion.g>
  );
}
