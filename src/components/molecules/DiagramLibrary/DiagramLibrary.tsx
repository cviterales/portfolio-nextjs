"use client";

import DiagramBox from "@/components/atoms/DiagramBox/DiagramBox";
import DiagramLabel from "@/components/atoms/DiagramLabel/DiagramLabel";
import DiagramBadge from "@/components/molecules/DiagramBadge/DiagramBadge";
import DiagramPanel from "@/components/molecules/DiagramPanel/DiagramPanel";
import {
  BOX_VARIANT,
  LABEL_TONE,
  LABEL_VARIANT,
  type Box,
} from "@/types/diagram";

type DiagramLibraryProps = {
  box: Box;
  title: string;
  subtitle: string;
  /** Artefactos que genera el build (por ejemplo `dist: esm, cjs`). */
  output: string;
  version: string;
  /** Ciclo actual: reinicia la barra de build. */
  cycle: number;
  inView: boolean;
  active?: boolean;
  /** Segundos que tarda en llenarse la barra de build. */
  buildDuration?: number;
};

/** Panel de una librería: versión y barra de build que se llena cada ciclo. */
export default function DiagramLibrary({
  box,
  title,
  subtitle,
  output,
  version,
  cycle,
  inView,
  active = false,
  buildDuration = 1.6,
}: DiagramLibraryProps) {
  const { x, y, w } = box;

  return (
    <DiagramPanel
      box={box}
      title={title}
      subtitle={subtitle}
      inView={inView}
      enter={{ y: -12 }}
      active={active}
      divider={false}
    >
      <DiagramBadge x={x + w - 104} y={y + 18} value={version} tone={LABEL_TONE.accent} />

      <DiagramBox variant={BOX_VARIANT.inset} x={x + 24} y={y + 70} width={w - 48} height={8} rx={4} />
      <DiagramBox
        key={cycle}
        variant={BOX_VARIANT.flash}
        x={x + 24}
        y={y + 70}
        height={8}
        rx={4}
        initial={{ width: 0 }}
        animate={{ width: inView ? w - 48 : 0 }}
        transition={{ duration: buildDuration, ease: "easeInOut" }}
      />

      <DiagramLabel variant={LABEL_VARIANT.codeXs} tone={LABEL_TONE.muted} x={x + 24} y={y + 99}>
        {output}
      </DiagramLabel>
    </DiagramPanel>
  );
}
