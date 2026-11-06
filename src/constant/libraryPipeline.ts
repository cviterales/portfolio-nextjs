import type { Box, ConsumerNode } from "@/types/diagram";
import type { Localized } from "@/types/i18n";

export const LPD_VIEWBOX = { w: 1000, h: 660 };

export const LPD_LIB: Box = { x: 40, y: 30, w: 300, h: 112 };
export const LPD_JFROG: Box = { x: 40, y: 182, w: 300, h: 104 };
export const LPD_HOST: Box = { x: 40, y: 326, w: 300, h: 300 };
export const LPD_CONSOLE: Box = { x: 640, y: 36, w: 320, h: 104 };

export const LPD_PACKAGE = "@org/ui-library";
export const LPD_COMPONENTS: readonly string[] = ["Navbar", "Button", "Modal"];
export const LPD_REMOTE_COMPONENT = "Button";

/** Fases del pipeline. */
export const LPD_STEP = {
  build: 0,
  publish: 1,
  install: 2,
  request: 3,
  response: 4,
} as const;

export const LPD_STEP_COUNT = 5;

export { formatVersion as lpdVersion } from "@/utils/version";

export function lpdConsumerSub(repo: string, infra: string): string {
  return `${repo}, ${infra}`;
}

/** Control horizontal de las curvas host -> consumers. */
const CONTROL_X = 490;
const COL_X = LPD_LIB.x + LPD_LIB.w / 2;

/** Eslabones verticales de un solo sentido de la columna izquierda. */
export const LPD_PUBLISH_LINK = {
  x0: COL_X,
  y0: LPD_LIB.y + LPD_LIB.h,
  xm: COL_X,
  x1: COL_X,
  y1: LPD_JFROG.y,
};

export const LPD_INSTALL_LINK = {
  x0: COL_X,
  y0: LPD_JFROG.y + LPD_JFROG.h,
  xm: COL_X,
  x1: COL_X,
  y1: LPD_HOST.y,
};

export const LPD_CONSUMER_X = 640;
export const LPD_CONSUMER_W = 320;

interface ConsumerSeed {
  id: string;
  name: string;
  repo: string;
  infra: string;
  ghost: boolean;
  y: number;
  h: number;
  port: number;
}

const CONSUMER_SEEDS: readonly ConsumerSeed[] = [
  { id: "a", name: "Consumer A", repo: "repo-a", infra: "Infra B", ghost: false, y: 176, h: 112, port: 392 },
  { id: "b", name: "Consumer B", repo: "repo-b", infra: "Infra C", ghost: false, y: 306, h: 112, port: 452 },
  { id: "c", name: "Consumer C", repo: "repo-c", infra: "Infra D", ghost: false, y: 436, h: 112, port: 512 },
  { id: "n", name: "Consumer N", repo: "", infra: "", ghost: true, y: 562, h: 64, port: 572 },
];

export const LPD_CONSUMERS: readonly ConsumerNode[] = CONSUMER_SEEDS.map((c) => ({
  ...c,
  link: {
    x0: LPD_HOST.x + LPD_HOST.w,
    y0: c.port,
    xm: CONTROL_X,
    x1: LPD_CONSUMER_X,
    y1: c.y + c.h / 2,
  },
}));

interface LpdCopy {
  library: string;
  librarySub: string;
  libraryOut: string;
  registry: string;
  registrySub: string;
  host: string;
  hostSub: string;
  installed: string;
  exposed: string;
  ghost: string;
  ghostSub: string;
  console: string;
  publish: string;
  install: string;
  /** Comando que muestra la consola por fase. */
  commands: readonly string[];
  steps: readonly string[];
  captions: readonly string[];
}

export const LPD_COPY: Localized<LpdCopy> = {
  en: {
    library: "UI Library",
    librarySub: "Own repo, built with Rollup",
    libraryOut: "dist: esm, cjs, types",
    registry: "JFrog Artifactory",
    registrySub: "Private npm registry",
    host: "Host",
    hostSub: "Shared components, Infra A",
    installed: "Installed from JFrog",
    exposed: "Exposed via remoteEntry.js",
    ghost: "Consumer N",
    ghostSub: "any number of apps",
    console: "Current step",
    publish: "npm publish",
    install: "npm install",
    commands: [
      "$ rollup -c",
      "$ npm publish",
      `$ npm install ${LPD_PACKAGE}`,
      "GET /remoteEntry.js",
      "200 OK, latest bundle",
    ],
    steps: ["Build", "Publish", "Install", "Request", "Response"],
    captions: [
      "The library is its own project. Rollup builds it into a new versioned package.",
      "The new version is published to the private registry on JFrog.",
      "The host installs it locally, exposes its components and ships a new remote bundle.",
      "Consumers ask the host for components at runtime, as they always do.",
      "The host answers with the new bundle. Consumers render it with no changes or deploys.",
    ],
  },
  es: {
    library: "UI Library",
    librarySub: "Repo propio, build con Rollup",
    libraryOut: "dist: esm, cjs, types",
    registry: "JFrog Artifactory",
    registrySub: "Registry npm privado",
    host: "Host",
    hostSub: "Componentes compartidos, Infra A",
    installed: "Instalada desde JFrog",
    exposed: "Expuestos vía remoteEntry.js",
    ghost: "Consumer N",
    ghostSub: "cualquier cantidad de apps",
    console: "Paso actual",
    publish: "npm publish",
    install: "npm install",
    commands: [
      "$ rollup -c",
      "$ npm publish",
      `$ npm install ${LPD_PACKAGE}`,
      "GET /remoteEntry.js",
      "200 OK, último bundle",
    ],
    steps: ["Build", "Publish", "Install", "Request", "Response"],
    captions: [
      "La librería es un proyecto aparte. Rollup la buildea en un paquete nuevo con versión.",
      "La nueva versión se publica en el registry privado de JFrog.",
      "El host la instala localmente, expone sus componentes y publica un nuevo bundle remoto.",
      "Los consumers le piden los componentes al host en runtime, como siempre.",
      "El host responde con el bundle nuevo. Los consumers lo renderizan sin cambios ni deploys.",
    ],
  },
};
