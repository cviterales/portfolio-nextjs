"use client";

import DiagramPanel from "@/components/molecules/DiagramPanel/DiagramPanel";
import DiagramRow from "@/components/molecules/DiagramRow/DiagramRow";
import PzHeroPreview from "@/components/molecules/PzHeroPreview/PzHeroPreview";
import { PZ_COPY, PZ_LANDING } from "@/constant/personalization";
import type { Lang } from "@/types/i18n";
import type { HeroState } from "@/types/personalization";
import { formatVersion } from "@/utils/version";

type PzLandingProps = {
  inView: boolean;
  active: boolean;
  heroState: HeroState;
  /** Recibe contenido nuevo del CMS por ISR. */
  refreshing: boolean;
  /** Recibe el evento del script. */
  listening: boolean;
  version: number;
  lang: Lang;
};

/** Panel de la landing: preview del Hero, contenido del CMS y listener. */
export default function PzLanding({
  inView,
  active,
  heroState,
  refreshing,
  listening,
  version,
  lang,
}: PzLandingProps) {
  const copy = PZ_COPY[lang];
  const { x, y, w } = PZ_LANDING;

  return (
    <DiagramPanel
      box={PZ_LANDING}
      title={copy.landing}
      subtitle={copy.landingSub}
      inView={inView}
      enter={{ y: 12 }}
      delay={0.15}
      active={active}
    >
      <PzHeroPreview heroState={heroState} lang={lang} />

      <DiagramRow
        x={x + 24}
        y={y + 224}
        width={w - 48}
        height={30}
        label={copy.content}
        highlighted={refreshing}
        delay={0.9}
        tag={formatVersion(version)}
      />
      <DiagramRow
        x={x + 24}
        y={y + 260}
        width={w - 48}
        height={30}
        label={copy.listener}
        highlighted={listening}
        delay={0.9}
      />
    </DiagramPanel>
  );
}
