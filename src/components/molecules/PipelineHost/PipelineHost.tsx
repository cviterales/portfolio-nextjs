"use client";

import { motion } from "motion/react";
import DiagramBox from "@/components/atoms/DiagramBox/DiagramBox";
import DiagramLabel from "@/components/atoms/DiagramLabel/DiagramLabel";
import DiagramRow from "@/components/molecules/DiagramRow/DiagramRow";
import { DIAGRAM_COLOR } from "@/constant/diagramTheme";
import {
  LPD_HOST,
  LPD_PACKAGE,
  LPD_COMPONENTS,
  LPD_COPY,
  lpdVersion,
} from "@/constant/libraryPipeline";
import { BOX_VARIANT, LABEL_TONE, LABEL_VARIANT } from "@/types/diagram";
import type { Lang } from "@/types/i18n";

type PipelineHostProps = {
  inView: boolean;
  installing: boolean;
  version: number;
  tick: number;
  lang: Lang;
};

/** Panel del host: paquete instalado y componentes expuestos en runtime. */
export default function PipelineHost({
  inView,
  installing,
  version,
  tick,
  lang,
}: PipelineHostProps) {
  const copy = LPD_COPY[lang];

  return (
    <motion.g
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
    >
      <DiagramBox x={LPD_HOST.x} y={LPD_HOST.y} width={LPD_HOST.w} height={LPD_HOST.h} rx={18} active={installing} />

      {installing && (
        <DiagramBox
          key={`pulse-${tick}`}
          variant={BOX_VARIANT.pulse}
          x={LPD_HOST.x}
          y={LPD_HOST.y}
          width={LPD_HOST.w}
          height={LPD_HOST.h}
          rx={18}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      )}

      <DiagramLabel variant={LABEL_VARIANT.title} x={LPD_HOST.x + 24} y={LPD_HOST.y + 36}>
        {copy.host}
      </DiagramLabel>
      <DiagramLabel tone={LABEL_TONE.muted} x={LPD_HOST.x + 24} y={LPD_HOST.y + 56}>
        {copy.hostSub}
      </DiagramLabel>
      <line
        x1={LPD_HOST.x + 24}
        x2={LPD_HOST.x + LPD_HOST.w - 24}
        y1={LPD_HOST.y + 74}
        y2={LPD_HOST.y + 74}
        stroke={DIAGRAM_COLOR.border}
      />

      <DiagramLabel tone={LABEL_TONE.muted} x={LPD_HOST.x + 24} y={LPD_HOST.y + 96}>
        {copy.installed}
      </DiagramLabel>
      <DiagramRow
        x={LPD_HOST.x + 24}
        y={LPD_HOST.y + 106}
        width={LPD_HOST.w - 48}
        height={32}
        label={LPD_PACKAGE}
        highlighted={installing}
        tag={lpdVersion(version)}
      />

      <DiagramLabel tone={LABEL_TONE.muted} x={LPD_HOST.x + 24} y={LPD_HOST.y + 164}>
        {copy.exposed}
      </DiagramLabel>
      {LPD_COMPONENTS.map((name, i) => (
        <DiagramRow
          key={name}
          x={LPD_HOST.x + 24}
          y={LPD_HOST.y + 174 + i * 36}
          width={LPD_HOST.w - 48}
          height={30}
          name={name}
          highlighted={installing}
        />
      ))}
    </motion.g>
  );
}
