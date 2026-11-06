import type { Link } from "@/types/diagram";

/** Una landing (o el ghost "Landing N") del diagrama de auth. */
export interface AuthLandingNode {
  id: string;
  name: string;
  domain: string;
  ghost: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  /** JFrog -> landing: instalación de la librería. */
  installLink: Link;
  /** Landing <-> OIDC. */
  oidcLink: Link;
}

/** En qué pasos una landing manda requests y recibe respuestas del OIDC. */
export interface AuthFlow {
  request: readonly number[];
  response: readonly number[];
  /** Paso en el que solo hay respuesta (sin request previo). */
  responseOnly: number;
}
