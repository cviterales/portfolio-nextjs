"use client";

import { useId } from "react";
import DiagramFigure from "@/components/atoms/DiagramFigure/DiagramFigure";
import DiagramDots from "@/components/atoms/DiagramDots/DiagramDots";
import DiagramLink from "@/components/molecules/DiagramLink/DiagramLink";
import DiagramConsole from "@/components/molecules/DiagramConsole/DiagramConsole";
import DiagramSteps from "@/components/molecules/DiagramSteps/DiagramSteps";
import PipelineLibrary from "@/components/molecules/PipelineLibrary/PipelineLibrary";
import PipelineRegistry from "@/components/molecules/PipelineRegistry/PipelineRegistry";
import PipelineHost from "@/components/molecules/PipelineHost/PipelineHost";
import PipelineConsumer from "@/components/molecules/PipelineConsumer/PipelineConsumer";
import { useDiagramPhase } from "@/hooks/useDiagramPhase";
import {
  LPD_VIEWBOX,
  LPD_CONSOLE,
  LPD_STEP,
  LPD_STEP_COUNT,
  LPD_PUBLISH_LINK,
  LPD_INSTALL_LINK,
  LPD_CONSUMERS,
  LPD_COPY,
} from "@/constant/libraryPipeline";
import { LABEL_TONE, LINK_TONE, TRAVEL_TONE, type LinkTone } from "@/types/diagram";
import { LANG, type Lang } from "@/types/i18n";

type LibraryPipelineDiagramProps = {
  lang?: Lang;
  /** Milisegundos entre fases del ciclo. */
  interval?: number;
};

const DESCRIPTION: Record<Lang, string> = {
  en: "A UI library is built with Rollup, published to JFrog Artifactory and installed by the host, which exposes its components at runtime to many consumers.",
  es: "Una librería de UI se buildea con Rollup, se publica en JFrog Artifactory y la instala el host, que expone sus componentes en runtime a muchos consumers.",
};

export default function LibraryPipelineDiagram({
  lang = LANG.en,
  interval = 2800,
}: LibraryPipelineDiagramProps) {
  const { ref, inView, animating, phase, tick, cycle } = useDiagramPhase(
    interval,
    LPD_STEP_COUNT,
    LPD_STEP.response,
  );
  const copy = LPD_COPY[lang];
  const dotsId = `lpdDots${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  const on = (step: number): boolean => animating && phase === step;

  // Cada eslabón sube de versión en su paso; hasta entonces sigue en el anterior.
  const libVersion = cycle + 1;
  const jfrogVersion = cycle + (phase >= LPD_STEP.publish ? 1 : 0);
  const hostVersion = cycle + (phase >= LPD_STEP.install ? 1 : 0);
  const consumerVersion = cycle + (phase >= LPD_STEP.response ? 1 : 0);

  const consumerTone: LinkTone =
    phase === LPD_STEP.request
      ? LINK_TONE.request
      : phase === LPD_STEP.response
        ? LINK_TONE.accent
        : LINK_TONE.idle;

  return (
    <DiagramFigure
      svgRef={ref}
      viewBox={`0 0 ${LPD_VIEWBOX.w} ${LPD_VIEWBOX.h}`}
      ariaLabel={DESCRIPTION[lang]}
      footer={<DiagramSteps steps={copy.steps} captions={copy.captions} phase={phase} />}
    >
      <DiagramDots id={dotsId} width={LPD_VIEWBOX.w} height={LPD_VIEWBOX.h} />

      <DiagramLink
        link={LPD_PUBLISH_LINK}
        label={copy.publish}
        index={0}
        inView={inView}
        tone={on(LPD_STEP.publish) ? LINK_TONE.accent : LINK_TONE.idle}
        flows={[{ tone: TRAVEL_TONE.accent, active: on(LPD_STEP.publish) }]}
      />
      <DiagramLink
        link={LPD_INSTALL_LINK}
        label={copy.install}
        index={1}
        inView={inView}
        tone={on(LPD_STEP.install) ? LINK_TONE.accent : LINK_TONE.idle}
        flows={[{ tone: TRAVEL_TONE.accent, active: on(LPD_STEP.install) }]}
      />
      {LPD_CONSUMERS.map((consumer, i) => (
        <DiagramLink
          key={consumer.id}
          link={consumer.link}
          index={i}
          ghost={consumer.ghost}
          inView={inView}
          tone={consumerTone}
          flows={[
            { tone: TRAVEL_TONE.request, reverse: true, active: on(LPD_STEP.request) },
            { tone: TRAVEL_TONE.accent, active: on(LPD_STEP.response) },
          ]}
        />
      ))}

      <PipelineLibrary inView={inView} building={on(LPD_STEP.build)} version={libVersion} cycle={cycle} lang={lang} />
      <PipelineRegistry inView={inView} publishing={on(LPD_STEP.publish)} version={jfrogVersion} lang={lang} />
      <PipelineHost inView={inView} installing={on(LPD_STEP.install)} version={hostVersion} tick={tick} lang={lang} />

      <DiagramConsole
        box={LPD_CONSOLE}
        title={copy.console}
        command={copy.commands[phase]}
        stepKey={phase}
        tone={phase === LPD_STEP.request ? LABEL_TONE.request : LABEL_TONE.accent}
      />

      {LPD_CONSUMERS.map((consumer, i) => (
        <PipelineConsumer
          key={consumer.id}
          consumer={consumer}
          index={i}
          inView={inView}
          phase={phase}
          version={consumerVersion}
          lang={lang}
        />
      ))}
    </DiagramFigure>
  );
}
