"use client";

import DiagramFigure from "@/components/atoms/DiagramFigure/DiagramFigure";
import AuthLanding from "@/components/molecules/AuthLanding/AuthLanding";
import AuthOidc from "@/components/molecules/AuthOidc/AuthOidc";
import DiagramConsole from "@/components/molecules/DiagramConsole/DiagramConsole";
import DiagramLibrary from "@/components/molecules/DiagramLibrary/DiagramLibrary";
import DiagramLink from "@/components/molecules/DiagramLink/DiagramLink";
import DiagramRegistry from "@/components/molecules/DiagramRegistry/DiagramRegistry";
import DiagramSteps from "@/components/molecules/DiagramSteps/DiagramSteps";
import { useDelayed } from "@/hooks/useDelayed";
import { useDiagramPhase } from "@/hooks/useDiagramPhase";
import {
  AUTH_COMMANDS,
  AUTH_CONSOLE,
  AUTH_COPY,
  AUTH_FLOWS,
  AUTH_JFROG,
  AUTH_LANDINGS,
  AUTH_LIB,
  AUTH_METHODS,
  AUTH_PACKAGE,
  AUTH_PUBLISH_LINK,
  AUTH_REQUEST_STEPS,
  AUTH_STEP,
  AUTH_STEP_COUNT,
  AUTH_VIEWBOX,
  AUTH_WIRE,
} from "@/constant/auth";
import { LABEL_TONE, LINK_TONE, TRAVEL_TONE, type LinkTone } from "@/types/diagram";
import { LANG, type Lang } from "@/types/i18n";
import { formatVersion } from "@/utils/version";

type AuthSsoDiagramProps = {
  lang?: Lang;
  /** Milisegundos entre fases del ciclo. */
  interval?: number;
};

const DESCRIPTION: Record<Lang, string> = {
  en: "Several landings on different domains share one login. An auth library, built with Rollup and published to JFrog, implements OIDC login, SSO, refresh and logout against a single identity provider.",
  es: "Varias landings en dominios distintos comparten un único login. Una librería de auth, buildeada con Rollup y publicada en JFrog, implementa login OIDC, SSO, refresh y logout contra un único proveedor de identidad.",
};

export default function AuthSsoDiagram({
  lang = LANG.en,
  interval = 2600,
}: AuthSsoDiagramProps) {
  // En reposo (reduced motion) quedan ambas landings logueadas.
  const { ref, inView, animating, phase, tick, cycle } = useDiagramPhase(
    interval,
    AUTH_STEP_COUNT,
    AUTH_STEP.session,
  );
  const copy = AUTH_COPY[lang];

  const on = (...steps: number[]): boolean => animating && steps.includes(phase);
  const ms = (n: number): number => (animating ? n : 0);

  // Cada cambio de estado se muestra cuando llega el punto correspondiente.
  const aIn = useDelayed(
    phase >= AUTH_STEP.callback && phase <= AUTH_STEP.refresh,
    ms(1300),
    ms(2300),
  );
  const bIn = useDelayed(
    phase >= AUTH_STEP.session && phase <= AUTH_STEP.logout,
    ms(1300),
    ms(2300),
  );
  const sessionActive = useDelayed(
    phase >= AUTH_STEP.signin && phase <= AUTH_STEP.refresh,
    ms(900),
    ms(1300),
  );
  const tokenA = useDelayed(
    phase >= AUTH_STEP.refresh ? 2 * cycle + 2 : 2 * cycle + 1,
    ms(2300),
  );

  // La versión de la lib nace en el build y llega a cada eslabón con el punto.
  const libRev = cycle + 1;
  const jfrogRev = useDelayed(libRev, ms(1300));
  const landingRev = useDelayed(libRev, ms(2300));

  const loggedIn: Record<string, boolean> = { a: aIn, b: bIn };
  const token: Record<string, string> = { a: `tk-${tokenA}`, b: `tk-${cycle + 1}` };

  const installing = on(AUTH_STEP.install);

  return (
    <DiagramFigure
      svgRef={ref}
      viewBox={`0 0 ${AUTH_VIEWBOX.w} ${AUTH_VIEWBOX.h}`}
      ariaLabel={DESCRIPTION[lang]}
      footer={<DiagramSteps steps={copy.steps} captions={copy.captions} phase={phase} />}
    >
      <DiagramConsole
        box={AUTH_CONSOLE}
        title={copy.console}
        command={AUTH_COMMANDS[phase]}
        stepKey={phase}
        tone={AUTH_REQUEST_STEPS.includes(phase) ? LABEL_TONE.request : LABEL_TONE.accent}
        titleOffset={26}
        commandOffset={50}
      />

      {/* Supply chain: la lib se publica y cada landing la instala. */}
      <DiagramLink
        link={AUTH_PUBLISH_LINK}
        label={copy.publish}
        inView={inView}
        tone={installing ? LINK_TONE.accent : LINK_TONE.idle}
        flows={[{ tone: TRAVEL_TONE.accent, active: installing, delay: 0.6, duration: 0.7 }]}
      />
      {AUTH_LANDINGS.map((landing, i) => (
        <DiagramLink
          key={`install-${landing.id}`}
          link={landing.installLink}
          index={i + 1}
          ghost={landing.ghost}
          inView={inView}
          tone={installing ? LINK_TONE.accent : LINK_TONE.idle}
          flows={[{ tone: TRAVEL_TONE.accent, active: installing, delay: 1.2, duration: 1.1 }]}
        />
      ))}

      {/* Landings <-> OIDC. */}
      {AUTH_LANDINGS.map((landing, i) => {
        if (landing.ghost) {
          return (
            <DiagramLink
              key={`oidc-${landing.id}`}
              link={landing.oidcLink}
              index={i + 4}
              ghost
              inView={inView}
            />
          );
        }

        const flow = AUTH_FLOWS[landing.id];
        const requesting = on(...flow.request);
        const responding = on(...flow.response);
        const responseOnly = phase === flow.responseOnly;
        const tone: LinkTone =
          responding && responseOnly
            ? LINK_TONE.accent
            : requesting
              ? LINK_TONE.request
              : LINK_TONE.idle;

        return (
          <DiagramLink
            key={`oidc-${landing.id}`}
            link={landing.oidcLink}
            index={i + 4}
            inView={inView}
            label={animating ? AUTH_WIRE[landing.id][phase] : undefined}
            tone={tone}
            flows={[
              { tone: TRAVEL_TONE.request, active: requesting, delay: 0 },
              {
                tone: TRAVEL_TONE.accent,
                reverse: true,
                active: responding,
                delay: responseOnly ? 0 : 1,
              },
            ]}
          />
        );
      })}

      <DiagramLibrary
        box={AUTH_LIB}
        title={copy.library}
        subtitle={copy.librarySub}
        output={copy.libraryOut}
        version={formatVersion(libRev)}
        cycle={cycle}
        inView={inView}
        active={installing}
        buildDuration={1.2}
      />
      <DiagramRegistry
        box={AUTH_JFROG}
        title={copy.registry}
        subtitle={copy.registrySub}
        packageName={AUTH_PACKAGE}
        version={formatVersion(jfrogRev)}
        inView={inView}
        publishing={installing}
        rowHeight={26}
        rowDelay={0.9}
      />

      {AUTH_LANDINGS.map((landing, i) => {
        const flow = landing.ghost ? undefined : AUTH_FLOWS[landing.id];
        const method = animating ? AUTH_METHODS[landing.id]?.[phase] : undefined;
        const arrivesWithDot = phase === AUTH_STEP.callback || phase === AUTH_STEP.session;

        return (
          <AuthLanding
            key={landing.id}
            landing={landing}
            index={i}
            inView={inView}
            active={flow ? on(...flow.request, ...flow.response) : false}
            installing={installing}
            method={method}
            methodDelay={arrivesWithDot ? 1.3 : 0}
            loggedIn={loggedIn[landing.id] ?? false}
            token={token[landing.id] ?? ""}
            version={landingRev}
            lang={lang}
          />
        );
      })}

      <AuthOidc
        inView={inView}
        animating={animating}
        phase={phase}
        tick={tick}
        sessionActive={sessionActive}
        lang={lang}
      />
    </DiagramFigure>
  );
}
