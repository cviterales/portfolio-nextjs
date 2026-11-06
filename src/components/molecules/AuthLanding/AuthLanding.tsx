"use client";

import { motion } from "motion/react";
import DiagramBox from "@/components/atoms/DiagramBox/DiagramBox";
import DiagramLabel from "@/components/atoms/DiagramLabel/DiagramLabel";
import DiagramRow from "@/components/molecules/DiagramRow/DiagramRow";
import DiagramStatus from "@/components/molecules/DiagramStatus/DiagramStatus";
import { AUTH_COPY } from "@/constant/auth";
import type { AuthLandingNode } from "@/types/auth";
import { BOX_VARIANT, LABEL_TONE, LABEL_VARIANT } from "@/types/diagram";
import type { Lang } from "@/types/i18n";
import { formatVersion } from "@/utils/version";

type AuthLandingProps = {
  landing: AuthLandingNode;
  index: number;
  inView: boolean;
  /** Borde encendido: hay request o respuesta en curso. */
  active: boolean;
  installing: boolean;
  /** Método de la librería que usa en este paso. */
  method?: string;
  /** Segundos de espera del resaltado del método (llega con el punto). */
  methodDelay: number;
  loggedIn: boolean;
  token: string;
  /** Versión de la librería instalada en esta landing. */
  version: number;
  lang: Lang;
};

/** Una landing (o el ghost "Landing N") con su estado de sesión y la lib. */
export default function AuthLanding({
  landing,
  index,
  inView,
  active,
  installing,
  method,
  methodDelay,
  loggedIn,
  token,
  version,
  lang,
}: AuthLandingProps) {
  const copy = AUTH_COPY[lang];
  const { x, y, w, h, ghost } = landing;

  return (
    <motion.g
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: ghost ? 0.55 : 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.1, ease: "easeOut" }}
    >
      <DiagramBox
        variant={ghost ? BOX_VARIANT.ghost : BOX_VARIANT.solid}
        x={x}
        y={y}
        width={w}
        height={h}
        rx={16}
        active={active}
      />

      {ghost ? (
        <>
          <DiagramLabel variant={LABEL_VARIANT.name} x={x + 24} y={y + 28}>
            {landing.name}
          </DiagramLabel>
          <DiagramLabel tone={LABEL_TONE.muted} x={x + 24} y={y + 48}>
            {copy.ghostSub}
          </DiagramLabel>
        </>
      ) : (
        <>
          <DiagramLabel variant={LABEL_VARIANT.name} x={x + 24} y={y + 34}>
            {landing.name}
          </DiagramLabel>
          <DiagramLabel variant={LABEL_VARIANT.codeXs} tone={LABEL_TONE.muted} x={x + 24} y={y + 54}>
            {landing.domain}
          </DiagramLabel>

          <DiagramStatus
            x={x + w - 124}
            y={y + 16}
            on={loggedIn}
            onText={copy.loggedIn}
            offText={copy.loggedOut}
          />

          <DiagramRow
            x={x + 24}
            y={y + 72}
            width={w - 48}
            height={30}
            label="auth-lib"
            highlighted={installing}
            delay={1.6}
            tag={formatVersion(version)}
          />
          <DiagramRow
            x={x + 24}
            y={y + 110}
            width={w - 48}
            height={30}
            label={method ?? "idle"}
            highlighted={Boolean(method)}
            delay={methodDelay}
            tag={loggedIn ? token : undefined}
            tagTone={LABEL_TONE.muted}
          />
        </>
      )}
    </motion.g>
  );
}
