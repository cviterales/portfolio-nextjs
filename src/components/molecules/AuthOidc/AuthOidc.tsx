"use client";

import DiagramLabel from "@/components/atoms/DiagramLabel/DiagramLabel";
import DiagramPanel from "@/components/molecules/DiagramPanel/DiagramPanel";
import DiagramRow from "@/components/molecules/DiagramRow/DiagramRow";
import { AUTH_COPY, AUTH_OIDC, AUTH_STEP } from "@/constant/auth";
import { LABEL_TONE } from "@/types/diagram";
import type { Lang } from "@/types/i18n";

type AuthOidcProps = {
  inView: boolean;
  animating: boolean;
  phase: number;
  tick: number;
  /** La sesión SSO ya existe en el proveedor (llega con el punto). */
  sessionActive: boolean;
  lang: Lang;
};

/** El request tarda en llegar: el resaltado espera este tiempo (segundos). */
const ARRIVE = 0.9;

/** Panel del proveedor OIDC: sesión SSO, endpoints y login hosteado. */
export default function AuthOidc({
  inView,
  animating,
  phase,
  tick,
  sessionActive,
  lang,
}: AuthOidcProps) {
  const copy = AUTH_COPY[lang];
  const { x, y, w } = AUTH_OIDC;
  const on = (...steps: number[]): boolean => animating && steps.includes(phase);

  return (
    <DiagramPanel
      box={AUTH_OIDC}
      title={copy.oidc}
      subtitle={copy.oidcSub}
      inView={inView}
      enter={{ x: 16 }}
      delay={0.3}
      active={animating && phase !== AUTH_STEP.install}
      pulseKey={on(AUTH_STEP.signin, AUTH_STEP.logout) ? tick : undefined}
    >
      <DiagramLabel tone={LABEL_TONE.muted} x={x + 24} y={y + 96}>
        {copy.session}
      </DiagramLabel>
      <DiagramRow
        x={x + 24}
        y={y + 106}
        width={w - 48}
        height={32}
        label={copy.sessionRow}
        highlighted={on(AUTH_STEP.signin, AUTH_STEP.session, AUTH_STEP.logout, AUTH_STEP.check)}
        delay={ARRIVE}
        tag={sessionActive ? copy.active : copy.none}
        tagTone={sessionActive ? LABEL_TONE.accent : LABEL_TONE.muted}
      />

      <DiagramLabel tone={LABEL_TONE.muted} x={x + 24} y={y + 162}>
        {copy.endpoints}
      </DiagramLabel>
      <DiagramRow
        x={x + 24}
        y={y + 172}
        width={w - 48}
        height={30}
        label="/authorize"
        highlighted={on(AUTH_STEP.login, AUTH_STEP.sso, AUTH_STEP.session, AUTH_STEP.check)}
        delay={phase === AUTH_STEP.session ? 0 : ARRIVE}
      />
      <DiagramRow
        x={x + 24}
        y={y + 208}
        width={w - 48}
        height={30}
        label="/token"
        highlighted={on(AUTH_STEP.callback, AUTH_STEP.refresh)}
        delay={phase === AUTH_STEP.callback ? 1.3 : ARRIVE}
      />
      <DiagramRow
        x={x + 24}
        y={y + 244}
        width={w - 48}
        height={30}
        label="/end_session"
        highlighted={on(AUTH_STEP.logout)}
        delay={ARRIVE}
      />

      <DiagramLabel tone={LABEL_TONE.muted} x={x + 24} y={y + 298}>
        {copy.hosted}
      </DiagramLabel>
      <DiagramRow
        x={x + 24}
        y={y + 308}
        width={w - 48}
        height={32}
        label={copy.signIn}
        highlighted={on(AUTH_STEP.signin)}
      />
    </DiagramPanel>
  );
}
