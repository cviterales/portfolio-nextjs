"use client";

import DiagramDot from "@/components/atoms/DiagramDot/DiagramDot";
import DiagramLabel from "@/components/atoms/DiagramLabel/DiagramLabel";
import DiagramPanel from "@/components/molecules/DiagramPanel/DiagramPanel";
import DiagramRow from "@/components/molecules/DiagramRow/DiagramRow";
import {
  PZ_CHOSEN,
  PZ_COPY,
  PZ_SCRIPT,
  PZ_SIGNALS,
} from "@/constant/personalization";
import { LABEL_TONE } from "@/types/diagram";
import type { Lang } from "@/types/i18n";

type PzScriptProps = {
  inView: boolean;
  /** Borde encendido (carga, detección o evento). */
  active: boolean;
  /** El script ya se cargó en la página. */
  loaded: boolean;
  loading: boolean;
  detecting: boolean;
  /** Ya decidió qué variante mostrar. */
  decided: boolean;
  /** Está decidiendo o avisando la decisión. */
  deciding: boolean;
  tick: number;
  lang: Lang;
};

/** Panel del script de terceros: señales del usuario y decisión. */
export default function PzScript({
  inView,
  active,
  loaded,
  loading,
  detecting,
  decided,
  deciding,
  tick,
  lang,
}: PzScriptProps) {
  const copy = PZ_COPY[lang];
  const { x, y, w } = PZ_SCRIPT;

  return (
    <DiagramPanel
      box={PZ_SCRIPT}
      title={copy.script}
      subtitle={copy.scriptSub}
      inView={inView}
      enter={{ x: 16 }}
      delay={0.3}
      opacity={loaded ? 1 : 0.55}
      active={active}
      pulseKey={loading ? tick : undefined}
    >
      <DiagramDot cx={x + w - 24} cy={y + 30} r={4} active={loaded} />

      <DiagramLabel tone={LABEL_TONE.muted} x={x + 24} y={y + 96}>
        {copy.signals}
      </DiagramLabel>
      {PZ_SIGNALS.map((signal, i) => (
        <DiagramRow
          key={signal}
          x={x + 24}
          y={y + 106 + i * 36}
          width={w - 48}
          height={30}
          label={signal}
          highlighted={detecting}
          delay={i * 0.35}
        />
      ))}

      <DiagramLabel tone={LABEL_TONE.muted} x={x + 24} y={y + 232}>
        {copy.decision}
      </DiagramLabel>
      <DiagramRow
        x={x + 24}
        y={y + 242}
        width={w - 48}
        height={34}
        label={decided ? `variant: ${PZ_CHOSEN}` : "variant: ?"}
        highlighted={deciding}
        delay={1.1}
      />
    </DiagramPanel>
  );
}
