export const PROJECT_MEDIA = {
  microfrontend: "microfrontend",
  libraryPipeline: "libraryPipeline",
  personalization: "personalization",
  authSso: "authSso",
  /** Captura de una página que se recorre con auto-scroll en el modal. */
  image: "image",
} as const;

export type ProjectMedia = (typeof PROJECT_MEDIA)[keyof typeof PROJECT_MEDIA];

/** Captura larga para los proyectos con media de tipo imagen. */
export interface ProjectImageContent {
  src: string;
  alt: string;
}

export interface ProjectContent {
  id: string;
  title: string;
  summary: string;
  tags: readonly string[];
  /** Diagrama animado o captura que ilustra la solución. */
  media: ProjectMedia;
  /** Requerido cuando `media` es `image`: la captura a recorrer. */
  image?: ProjectImageContent;
}
