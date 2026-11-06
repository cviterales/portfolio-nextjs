"use client";

import DiagramPanel from "@/components/molecules/DiagramPanel/DiagramPanel";
import DiagramRow from "@/components/molecules/DiagramRow/DiagramRow";
import type { Box } from "@/types/diagram";

type DiagramRegistryProps = {
  box: Box;
  title: string;
  subtitle: string;
  packageName: string;
  version: string;
  inView: boolean;
  /** Se acaba de publicar: resalta panel y fila. */
  publishing?: boolean;
  /** Segundos de espera de la entrada del panel. */
  delay?: number;
  rowHeight?: number;
  /** Segundos de espera del resaltado de la fila. */
  rowDelay?: number;
};

/** Panel de un registry de paquetes con el paquete publicado y su versión. */
export default function DiagramRegistry({
  box,
  title,
  subtitle,
  packageName,
  version,
  inView,
  publishing = false,
  delay = 0.1,
  rowHeight = 32,
  rowDelay = 0,
}: DiagramRegistryProps) {
  return (
    <DiagramPanel
      box={box}
      title={title}
      subtitle={subtitle}
      inView={inView}
      enter={{ y: -12 }}
      delay={delay}
      active={publishing}
      divider={false}
    >
      <DiagramRow
        x={box.x + 24}
        y={box.y + 64}
        width={box.w - 48}
        height={rowHeight}
        label={packageName}
        highlighted={publishing}
        delay={rowDelay}
        tag={version}
      />
    </DiagramPanel>
  );
}
