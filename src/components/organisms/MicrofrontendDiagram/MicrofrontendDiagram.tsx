"use client";

import { motion, AnimatePresence } from "motion/react";
import DiagramFigure from "@/components/atoms/DiagramFigure/DiagramFigure";
import DiagramDots from "@/components/atoms/DiagramDots/DiagramDots";
import DiagramSteps from "@/components/molecules/DiagramSteps/DiagramSteps";
import MfeHost from "@/components/molecules/MfeHost/MfeHost";
import MfeConsumer from "@/components/molecules/MfeConsumer/MfeConsumer";
import MfeConnection from "@/components/molecules/MfeConnection/MfeConnection";
import { useDiagramPhase } from "@/hooks/useDiagramPhase";
import { DIAGRAM_COLOR, DIAGRAM_FONT } from "@/constant/diagramTheme";
import { MFE_CONSUMERS, MFE_COPY } from "@/constant/microfrontend";
import { LANG, type Lang } from "@/types/i18n";

type MicrofrontendDiagramProps = {
  lang?: Lang;
  /** Milisegundos entre fases del ciclo. */
  interval?: number;
};

const STEP_COUNT = 3;

const DESCRIPTION: Record<Lang, string> = {
  en: "Microfrontend architecture: one host shares components at runtime with many consumers, each in its own repo and infrastructure.",
  es: "Arquitectura de microfrontends: un host comparte componentes en runtime con muchos consumers, cada uno en su propio repo e infraestructura.",
};

export default function MicrofrontendDiagram({
  lang = LANG.en,
  interval = 2800,
}: MicrofrontendDiagramProps) {
  const { ref, inView, animating, phase, tick, cycle } = useDiagramPhase(interval, STEP_COUNT);
  const copy = MFE_COPY[lang];

  // Versiones derivadas de la fase: el host sube en update, el consumer en response.
  const hostVersion = cycle + (phase >= 2 ? 1 : 0);
  const consumerVersion = Math.max(0, cycle - (phase < 1 ? 1 : 0));
  const updating = phase === 2 && animating;

  return (
    <DiagramFigure
      svgRef={ref}
      viewBox="0 0 1000 560"
      ariaLabel={DESCRIPTION[lang]}
      defs={
        <defs>
          <linearGradient id="mfeOrange" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={DIAGRAM_COLOR.accentLight} />
            <stop offset="100%" stopColor={DIAGRAM_COLOR.accentDeep} />
          </linearGradient>
        </defs>
      }
      footer={<DiagramSteps steps={copy.steps} captions={copy.captions} phase={phase} />}
    >
      <DiagramDots id="mfeDots" width={1000} height={560} />

      <AnimatePresence mode="wait">
        <motion.text
          key={phase}
          x={490}
          y={30}
          textAnchor="middle"
          fontFamily={DIAGRAM_FONT.mono}
          fontSize={12}
          fill={phase === 0 ? DIAGRAM_COLOR.request : DIAGRAM_COLOR.accent}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {copy.wire[phase]}
        </motion.text>
      </AnimatePresence>

      {MFE_CONSUMERS.map((consumer, i) => (
        <MfeConnection
          key={`link-${consumer.id}`}
          consumer={consumer}
          index={i}
          phase={phase}
          inView={inView}
          animating={animating}
        />
      ))}

      <MfeHost inView={inView} updating={updating} hostVersion={hostVersion} tick={tick} lang={lang} />

      {MFE_CONSUMERS.map((consumer, i) => (
        <MfeConsumer
          key={consumer.id}
          consumer={consumer}
          index={i}
          inView={inView}
          phase={phase}
          consumerVersion={consumerVersion}
          lang={lang}
        />
      ))}
    </DiagramFigure>
  );
}
