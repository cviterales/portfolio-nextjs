"use client";

import DiagramLibrary from "@/components/molecules/DiagramLibrary/DiagramLibrary";
import { LPD_LIB, LPD_COPY, lpdVersion } from "@/constant/libraryPipeline";
import type { Lang } from "@/types/i18n";

type PipelineLibraryProps = {
  inView: boolean;
  building: boolean;
  version: number;
  cycle: number;
  lang: Lang;
};

/** Panel de la librería del pipeline: build con Rollup y versión. */
export default function PipelineLibrary({
  inView,
  building,
  version,
  cycle,
  lang,
}: PipelineLibraryProps) {
  const copy = LPD_COPY[lang];

  return (
    <DiagramLibrary
      box={LPD_LIB}
      title={copy.library}
      subtitle={copy.librarySub}
      output={copy.libraryOut}
      version={lpdVersion(version)}
      cycle={cycle}
      inView={inView}
      active={building}
    />
  );
}
