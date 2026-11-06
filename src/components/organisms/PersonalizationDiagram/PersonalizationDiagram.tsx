"use client";

import DiagramFigure from "@/components/atoms/DiagramFigure/DiagramFigure";
import DiagramConsole from "@/components/molecules/DiagramConsole/DiagramConsole";
import DiagramLink from "@/components/molecules/DiagramLink/DiagramLink";
import DiagramSteps from "@/components/molecules/DiagramSteps/DiagramSteps";
import PzCms from "@/components/molecules/PzCms/PzCms";
import PzLanding from "@/components/molecules/PzLanding/PzLanding";
import PzScript from "@/components/molecules/PzScript/PzScript";
import { useDiagramPhase } from "@/hooks/useDiagramPhase";
import {
  PZ_COMMANDS,
  PZ_CONSOLE,
  PZ_CONTENT_LINK,
  PZ_COPY,
  PZ_EVENT_LINK,
  PZ_STEP,
  PZ_STEP_COUNT,
  PZ_VIEWBOX,
} from "@/constant/personalization";
import {
  LABEL_PLACEMENT,
  LABEL_TONE,
  LINK_TONE,
  TRAVEL_TONE,
} from "@/types/diagram";
import { LANG, type Lang } from "@/types/i18n";
import { HERO_STATE, type HeroState } from "@/types/personalization";

type PersonalizationDiagramProps = {
  lang?: Lang;
  /** Milisegundos entre fases del ciclo. */
  interval?: number;
};

const DESCRIPTION: Record<Lang, string> = {
  en: "Personalization flow: a CMS provides content and variants to a landing at build time and through ISR. A third-party script detects the user and tells the landing which variant to show using browser events.",
  es: "Flujo de personalización: un CMS entrega contenido y variantes a una landing en build time y mediante ISR. Un script de terceros detecta al usuario y le indica a la landing qué variante mostrar con eventos del navegador.",
};

function heroStateFor(phase: number): HeroState {
  if (phase >= PZ_STEP.personalize) return HERO_STATE.variant;
  if (phase >= PZ_STEP.default) return HERO_STATE.default;
  return HERO_STATE.idle;
}

export default function PersonalizationDiagram({
  lang = LANG.en,
  interval = 2600,
}: PersonalizationDiagramProps) {
  const { ref, inView, animating, phase, tick, cycle } = useDiagramPhase(
    interval,
    PZ_STEP_COUNT,
    PZ_STEP.personalize,
  );
  const copy = PZ_COPY[lang];

  const on = (...steps: number[]): boolean => animating && steps.includes(phase);

  // El CMS publica en el paso ISR; la landing recibe esa versión en el siguiente.
  const cmsVersion = cycle + (phase >= PZ_STEP.isr ? 1 : 0);
  const landingVersion = cycle + (phase >= PZ_STEP.default ? 1 : 0);

  const contentFlowing = on(PZ_STEP.build, PZ_STEP.isr);
  const eventsFlowing = on(PZ_STEP.load, PZ_STEP.event);
  const isCommandRequest = phase === PZ_STEP.load || phase === PZ_STEP.event;

  return (
    <DiagramFigure
      svgRef={ref}
      viewBox={`0 0 ${PZ_VIEWBOX.w} ${PZ_VIEWBOX.h}`}
      ariaLabel={DESCRIPTION[lang]}
      footer={<DiagramSteps steps={copy.steps} captions={copy.captions} phase={phase} />}
    >
      <DiagramConsole
        box={PZ_CONSOLE}
        title={copy.console}
        command={PZ_COMMANDS[phase]}
        stepKey={phase}
        tone={isCommandRequest ? LABEL_TONE.request : LABEL_TONE.accent}
        titleOffset={26}
        commandOffset={50}
      />

      <DiagramLink
        link={PZ_CONTENT_LINK}
        label={copy.linkContent}
        labelPlacement={LABEL_PLACEMENT.above}
        index={0}
        inView={inView}
        tone={contentFlowing ? LINK_TONE.accent : LINK_TONE.idle}
        flows={[{ tone: TRAVEL_TONE.accent, active: contentFlowing }]}
      />
      <DiagramLink
        link={PZ_EVENT_LINK}
        label={copy.linkEvents}
        labelPlacement={LABEL_PLACEMENT.above}
        index={1}
        inView={inView}
        tone={eventsFlowing ? LINK_TONE.request : LINK_TONE.idle}
        flows={[
          // La landing carga el script.
          { tone: TRAVEL_TONE.request, active: on(PZ_STEP.load) },
          // El script avisa a la landing.
          { tone: TRAVEL_TONE.request, reverse: true, active: on(PZ_STEP.event) },
        ]}
      />

      <PzCms
        inView={inView}
        active={contentFlowing}
        building={on(PZ_STEP.build)}
        publishing={on(PZ_STEP.isr)}
        version={cmsVersion}
        tick={tick}
        lang={lang}
      />
      <PzLanding
        inView={inView}
        active={on(PZ_STEP.default, PZ_STEP.event, PZ_STEP.personalize)}
        heroState={heroStateFor(phase)}
        refreshing={on(PZ_STEP.isr)}
        listening={on(PZ_STEP.event)}
        version={landingVersion}
        lang={lang}
      />
      <PzScript
        inView={inView}
        active={on(PZ_STEP.load, PZ_STEP.detect, PZ_STEP.event)}
        loaded={phase >= PZ_STEP.load}
        loading={on(PZ_STEP.load)}
        detecting={on(PZ_STEP.detect)}
        decided={phase >= PZ_STEP.detect}
        deciding={on(PZ_STEP.detect, PZ_STEP.event)}
        tick={tick}
        lang={lang}
      />
    </DiagramFigure>
  );
}
