"use client";

import DiagramRegistry from "@/components/molecules/DiagramRegistry/DiagramRegistry";
import {
  LPD_JFROG,
  LPD_PACKAGE,
  LPD_COPY,
  lpdVersion,
} from "@/constant/libraryPipeline";
import type { Lang } from "@/types/i18n";

type PipelineRegistryProps = {
  inView: boolean;
  publishing: boolean;
  version: number;
  lang: Lang;
};

/** Panel del registry (JFrog) del pipeline con el paquete publicado. */
export default function PipelineRegistry({
  inView,
  publishing,
  version,
  lang,
}: PipelineRegistryProps) {
  const copy = LPD_COPY[lang];

  return (
    <DiagramRegistry
      box={LPD_JFROG}
      title={copy.registry}
      subtitle={copy.registrySub}
      packageName={LPD_PACKAGE}
      version={lpdVersion(version)}
      inView={inView}
      publishing={publishing}
    />
  );
}
