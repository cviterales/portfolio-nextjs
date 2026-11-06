"use client";

import { motion } from "motion/react";
import DiagramBox from "@/components/atoms/DiagramBox/DiagramBox";
import DiagramLabel from "@/components/atoms/DiagramLabel/DiagramLabel";
import DiagramBadge from "@/components/molecules/DiagramBadge/DiagramBadge";
import DiagramRow from "@/components/molecules/DiagramRow/DiagramRow";
import { DIAGRAM_COLOR } from "@/constant/diagramTheme";
import {
  MFE_HOST,
  MFE_REGISTRY,
  MFE_UPDATED_COMPONENT,
  MFE_COPY,
  mfeVersion,
} from "@/constant/microfrontend";
import { BOX_VARIANT, LABEL_TONE, LABEL_VARIANT } from "@/types/diagram";
import type { Lang } from "@/types/i18n";

type MfeHostProps = {
  inView: boolean;
  updating: boolean;
  hostVersion: number;
  tick: number;
  lang: Lang;
};

/** Panel del host: registry de componentes, badge de versión y deploy. */
export default function MfeHost({ inView, updating, hostVersion, tick, lang }: MfeHostProps) {
  const copy = MFE_COPY[lang];

  return (
    <motion.g
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <DiagramBox
        x={MFE_HOST.x}
        y={MFE_HOST.y}
        width={MFE_HOST.w}
        height={MFE_HOST.h}
        rx={18}
        active={updating}
      />

      {updating && (
        <DiagramBox
          key={`pulse-${tick}`}
          variant={BOX_VARIANT.pulse}
          x={MFE_HOST.x}
          y={MFE_HOST.y}
          width={MFE_HOST.w}
          height={MFE_HOST.h}
          rx={18}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      )}

      <DiagramLabel variant={LABEL_VARIANT.title} x={64} y={90}>
        {copy.host}
      </DiagramLabel>
      <DiagramLabel tone={LABEL_TONE.muted} x={64} y={111}>
        {copy.hostSub}
      </DiagramLabel>

      <DiagramBadge x={236} y={72} value={mfeVersion(hostVersion)} tone={hostVersion === 0 ? LABEL_TONE.muted : LABEL_TONE.accent} />

      <line x1={64} x2={316} y1={134} y2={134} stroke={DIAGRAM_COLOR.border} />
      <DiagramLabel tone={LABEL_TONE.muted} x={64} y={158}>
        {copy.registry}
      </DiagramLabel>

      {MFE_REGISTRY.map((name, i) => (
        <DiagramRow
          key={name}
          x={64}
          y={172 + i * 50}
          width={252}
          name={name}
          highlighted={updating && name === MFE_UPDATED_COMPONENT}
          tag={name === MFE_UPDATED_COMPONENT ? mfeVersion(hostVersion) : undefined}
        />
      ))}

      <DiagramBox variant={BOX_VARIANT.solid} x={64} y={382} width={252} height={50} rx={10} fill="none" stroke={DIAGRAM_COLOR.idle} strokeDasharray="4 4" />
      <DiagramLabel variant={LABEL_VARIANT.code} x={80} y={403}>
        remoteEntry.js
      </DiagramLabel>
      <DiagramLabel variant={LABEL_VARIANT.codeXs} tone={LABEL_TONE.muted} x={80} y={422}>
        {copy.served}
      </DiagramLabel>

      {/* Gradiente fijo debajo; el rect sólido de encima baja su opacidad. */}
      <rect x={64} y={450} width={252} height={44} rx={22} fill="url(#mfeOrange)" />
      <motion.rect
        x={64}
        y={450}
        width={252}
        height={44}
        rx={22}
        fill={DIAGRAM_COLOR.surface2}
        animate={{
          fillOpacity: updating ? 0 : 1,
          stroke: updating ? DIAGRAM_COLOR.accent : DIAGRAM_COLOR.border,
        }}
        transition={{ duration: 0.4 }}
      />
      <motion.text
        x={190}
        y={477}
        textAnchor="middle"
        fontFamily="inherit"
        fontSize={13}
        fontWeight={600}
        animate={{ fill: updating ? DIAGRAM_COLOR.ink : DIAGRAM_COLOR.muted }}
        transition={{ duration: 0.4 }}
      >
        {copy.deploy}
      </motion.text>
    </motion.g>
  );
}
