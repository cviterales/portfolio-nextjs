import type { Box, ConsumerNode } from "@/types/diagram";
import type { Localized } from "@/types/i18n";

export const MFE_HOST: Box = { x: 40, y: 50, w: 300, h: 472 };

export const MFE_CONSUMER_X = 640;
export const MFE_CONSUMER_W = 320;

/** Punto de control horizontal compartido por las curvas de conexión. */
const CONTROL_X = 490;

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
  { id: "a", name: "Consumer A", repo: "repo-a", infra: "Infra B", ghost: false, y: 50, h: 112, port: 140 },
  { id: "b", name: "Consumer B", repo: "repo-b", infra: "Infra C", ghost: false, y: 184, h: 112, port: 230 },
  { id: "c", name: "Consumer C", repo: "repo-c", infra: "Infra D", ghost: false, y: 318, h: 112, port: 320 },
  { id: "n", name: "Consumer N", repo: "", infra: "", ghost: true, y: 452, h: 70, port: 410 },
];

export const MFE_CONSUMERS: readonly ConsumerNode[] = CONSUMER_SEEDS.map((c) => ({
  ...c,
  link: {
    x0: MFE_HOST.x + MFE_HOST.w,
    y0: c.port,
    xm: CONTROL_X,
    x1: MFE_CONSUMER_X,
    y1: c.y + c.h / 2,
  },
}));

export const MFE_REGISTRY: readonly string[] = ["Navbar", "DataTable", "Button", "Modal"];
export const MFE_UPDATED_COMPONENT = "Button";

export { formatVersion as mfeVersion } from "@/utils/version";

export function mfeConsumerSub(repo: string, infra: string): string {
  return `${repo}, ${infra}`;
}

interface MfeCopy {
  host: string;
  hostSub: string;
  registry: string;
  served: string;
  deploy: string;
  ghost: string;
  ghostSub: string;
  /** Texto del cable por fase: 0 request, 1 response, 2 update. */
  wire: readonly string[];
  steps: readonly string[];
  captions: readonly string[];
}

/** Textos del diagrama por idioma. Fase: 0 request, 1 response, 2 update. */
export const MFE_COPY: Localized<MfeCopy> = {
  en: {
    host: "Host",
    hostSub: "Shared components, Infra A",
    registry: "Component registry",
    served: "Served at runtime",
    deploy: "Deploy to host only",
    ghost: "Consumer N",
    ghostSub: "any number of apps",
    wire: ["GET /remoteEntry.js", "200 OK, latest bundle", ""],
    steps: ["Request", "Response", "Runtime update"],
    captions: [
      "Each consumer asks the host for its components when the app loads.",
      "The host answers with the current bundle. Consumers render it as is.",
      "The host ships a new version. No consumer repo changes, no consumer deploys.",
    ],
  },
  es: {
    host: "Host",
    hostSub: "Componentes compartidos, Infra A",
    registry: "Registro de componentes",
    served: "Servido en runtime",
    deploy: "Deploy solo en el host",
    ghost: "Consumer N",
    ghostSub: "cualquier cantidad de apps",
    wire: ["GET /remoteEntry.js", "200 OK, último bundle", ""],
    steps: ["Request", "Response", "Update en runtime"],
    captions: [
      "Cada consumer le pide sus componentes al host cuando carga la app.",
      "El host responde con el bundle vigente. Los consumers lo renderizan tal cual.",
      "El host publica una versión nueva. Sin cambios en los repos consumer ni deploys.",
    ],
  },
};
