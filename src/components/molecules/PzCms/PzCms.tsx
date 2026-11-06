"use client";

import DiagramBox from "@/components/atoms/DiagramBox/DiagramBox";
import DiagramLabel from "@/components/atoms/DiagramLabel/DiagramLabel";
import DiagramBadge from "@/components/molecules/DiagramBadge/DiagramBadge";
import DiagramPanel from "@/components/molecules/DiagramPanel/DiagramPanel";
import DiagramRow from "@/components/molecules/DiagramRow/DiagramRow";
import { PZ_CMS, PZ_COPY, PZ_VARIANTS } from "@/constant/personalization";
import { BOX_VARIANT, LABEL_TONE, LABEL_VARIANT } from "@/types/diagram";
import type { Lang } from "@/types/i18n";
import { formatVersion } from "@/utils/version";

type PzCmsProps = {
  inView: boolean;
  /** Borde encendido (build o ISR en curso). */
  active: boolean;
  building: boolean;
  publishing: boolean;
  version: number;
  tick: number;
  lang: Lang;
};

const PUBLISH_Y = 238;

/** Panel del CMS: variantes del Hero y botón de publicar. */
export default function PzCms({
  inView,
  active,
  building,
  publishing,
  version,
  tick,
  lang,
}: PzCmsProps) {
  const copy = PZ_COPY[lang];
  const { x, y, w } = PZ_CMS;

  return (
    <DiagramPanel
      box={PZ_CMS}
      title={copy.cms}
      subtitle={copy.cmsSub}
      inView={inView}
      enter={{ x: -16 }}
      active={active}
      pulseKey={publishing ? tick : undefined}
    >
      <DiagramBadge
        x={x + w - 104}
        y={y + 18}
        value={formatVersion(version)}
        tone={version === 0 ? LABEL_TONE.muted : LABEL_TONE.accent}
      />

      <DiagramLabel tone={LABEL_TONE.muted} x={x + 24} y={y + 96}>
        {copy.component}
      </DiagramLabel>
      {PZ_VARIANTS.map((name, i) => (
        <DiagramRow
          key={name}
          x={x + 24}
          y={y + 106 + i * 36}
          width={w - 48}
          height={30}
          label={name}
          highlighted={building || (name === "default" && publishing)}
        />
      ))}

      <DiagramBox variant={BOX_VARIANT.inset} x={x + 24} y={y + PUBLISH_Y} width={w - 48} height={40} rx={20} />
      <DiagramBox
        variant={BOX_VARIANT.flash}
        x={x + 24}
        y={y + PUBLISH_Y}
        width={w - 48}
        height={40}
        rx={20}
        initial={false}
        animate={{ opacity: publishing ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
      <DiagramLabel
        variant={LABEL_VARIANT.button}
        tone={publishing ? LABEL_TONE.onAccent : LABEL_TONE.muted}
        textAnchor="middle"
        x={x + w / 2}
        y={y + PUBLISH_Y + 25}
      >
        {copy.publish}
      </DiagramLabel>
    </DiagramPanel>
  );
}
