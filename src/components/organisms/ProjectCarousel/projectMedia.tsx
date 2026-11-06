import type { ReactNode } from "react";
import MicrofrontendDiagram from "@/components/organisms/MicrofrontendDiagram/MicrofrontendDiagram";
import LibraryPipelineDiagram from "@/components/organisms/LibraryPipelineDiagram/LibraryPipelineDiagram";
import AuthSsoDiagram from "@/components/organisms/AuthSsoDiagram/AuthSsoDiagram";
import PersonalizationDiagram from "@/components/organisms/PersonalizationDiagram/PersonalizationDiagram";
import ProjectImage from "@/components/molecules/ProjectImage/ProjectImage";
import { PROJECT_MEDIA, type ProjectContent } from "@/types/project";

/**
 * Resuelve la media de un proyecto. `animate` solo aplica a la captura de
 * imagen: en el modal recorre la página, en la tarjeta queda fija.
 */
export function renderProjectMedia(project: ProjectContent, animate = false): ReactNode {
  switch (project.media) {
    case PROJECT_MEDIA.microfrontend:
      return <MicrofrontendDiagram />;
    case PROJECT_MEDIA.libraryPipeline:
      return <LibraryPipelineDiagram />;
    case PROJECT_MEDIA.personalization:
      return <PersonalizationDiagram />;
    case PROJECT_MEDIA.authSso:
      return <AuthSsoDiagram />;
    case PROJECT_MEDIA.image:
      return project.image ? (
        <ProjectImage image={project.image} animate={animate} />
      ) : null;
    default:
      return null;
  }
}
