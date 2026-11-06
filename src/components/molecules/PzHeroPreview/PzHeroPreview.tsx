"use client";

import { AnimatePresence } from "motion/react";
import DiagramBox from "@/components/atoms/DiagramBox/DiagramBox";
import DiagramLabel from "@/components/atoms/DiagramLabel/DiagramLabel";
import { PZ_COPY, PZ_HERO, PZ_HERO_BOX } from "@/constant/personalization";
import { BOX_VARIANT, LABEL_TONE, LABEL_VARIANT } from "@/types/diagram";
import type { Lang } from "@/types/i18n";
import { HERO_STATE, type HeroState } from "@/types/personalization";

type PzHeroPreviewProps = {
  heroState: HeroState;
  lang: Lang;
};

const CTA_W = 150;

/** Preview del Hero de la landing: vacío, contenido por defecto o variante. */
export default function PzHeroPreview({ heroState, lang }: PzHeroPreviewProps) {
  const copy = PZ_COPY[lang];
  const { x, y, w, h } = PZ_HERO_BOX;
  const isVariant = heroState === HERO_STATE.variant;
  const content = heroState === HERO_STATE.idle ? null : PZ_HERO[heroState];

  return (
    <g>
      <DiagramBox variant={BOX_VARIANT.inset} x={x} y={y} width={w} height={h} rx={12} active={isVariant} />

      {isVariant && (
        <DiagramBox
          key="hero-flash"
          variant={BOX_VARIANT.flash}
          x={x}
          y={y}
          width={w}
          height={h}
          rx={12}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
        />
      )}

      <DiagramLabel variant={LABEL_VARIANT.codeXs} tone={LABEL_TONE.muted} x={x + 14} y={y + 22}>
        {"<Hero />"}
      </DiagramLabel>

      <AnimatePresence mode="wait">
        <DiagramLabel
          key={heroState}
          variant={LABEL_VARIANT.codeXs}
          tone={isVariant ? LABEL_TONE.accent : LABEL_TONE.muted}
          textAnchor="end"
          x={x + w - 14}
          y={y + 22}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {copy.tags[heroState]}
        </DiagramLabel>
      </AnimatePresence>

      {content === null ? (
        <>
          <DiagramBox variant={BOX_VARIANT.dashed} x={x + 14} y={y + 40} width={120} height={10} rx={5} />
          <DiagramBox variant={BOX_VARIANT.dashed} x={x + 14} y={y + 66} width={96} height={26} rx={13} />
        </>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <DiagramLabel
              key={`title-${heroState}`}
              variant={LABEL_VARIANT.name}
              x={x + 14}
              y={y + 56}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {content.title}
            </DiagramLabel>
          </AnimatePresence>

          <DiagramBox variant={BOX_VARIANT.inset} x={x + 14} y={y + 66} width={CTA_W} height={26} rx={13} />
          <DiagramBox
            variant={BOX_VARIANT.flash}
            x={x + 14}
            y={y + 66}
            width={CTA_W}
            height={26}
            rx={13}
            initial={false}
            animate={{ opacity: isVariant ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
          <AnimatePresence mode="wait">
            <DiagramLabel
              key={`cta-${heroState}`}
              tone={isVariant ? LABEL_TONE.onAccent : LABEL_TONE.base}
              textAnchor="middle"
              x={x + 14 + CTA_W / 2}
              y={y + 83}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {content.cta}
            </DiagramLabel>
          </AnimatePresence>
        </>
      )}
    </g>
  );
}
