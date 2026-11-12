import {
  PROCESS_DROP,
  PROCESS_NODE_SIZE,
  PROCESS_PITCH,
} from "@/constant/process";

export const PROCESS_ORIENTATION = {
  horizontal: "horizontal",
  vertical: "vertical",
} as const;

export type ProcessOrientation =
  (typeof PROCESS_ORIENTATION)[keyof typeof PROCESS_ORIENTATION];

export interface ProcessConnectorPath {
  /** Curva en S entre los bordes de dos nodos consecutivos. */
  curve: string;
  /** Punta de flecha al final de la curva. */
  head: string;
}

export interface ProcessStageSize {
  width: number;
  height: number;
}

/** Zigzag horizontal (pares arriba, impares abajo) o vertical (izquierda/derecha). */
export function getNodePosition(
  index: number,
  orientation: ProcessOrientation,
): { x: number; y: number } {
  const offset = index % 2 === 1 ? PROCESS_DROP : 0;
  return orientation === PROCESS_ORIENTATION.horizontal
    ? { x: index * PROCESS_PITCH, y: offset }
    : { x: offset, y: index * PROCESS_PITCH };
}

export function getStageSize(
  count: number,
  orientation: ProcessOrientation,
): ProcessStageSize {
  const main = (count - 1) * PROCESS_PITCH + PROCESS_NODE_SIZE;
  const cross = PROCESS_NODE_SIZE + PROCESS_DROP;
  return orientation === PROCESS_ORIENTATION.horizontal
    ? { width: main, height: cross }
    : { width: cross, height: main };
}

/** Calcula la curva y la flecha desde los centros de los nodos `index` e `index + 1`. */
export function getConnectorPath(
  index: number,
  orientation: ProcessOrientation,
): ProcessConnectorPath {
  const half = PROCESS_NODE_SIZE / 2;
  const a = getNodePosition(index, orientation);
  const b = getNodePosition(index + 1, orientation);
  const cx = a.x + half;
  const cy = a.y + half;
  const ex = b.x + half;
  const ey = b.y + half;
  const length = Math.hypot(ex - cx, ey - cy);
  const ux = (ex - cx) / length;
  const uy = (ey - cy) / length;

  const sx = Math.round(cx + ux * (half + 13));
  const sy = Math.round(cy + uy * (half + 13));
  const tx = Math.round(ex - ux * (half + 17));
  const ty = Math.round(ey - uy * (half + 17));

  if (orientation === PROCESS_ORIENTATION.horizontal) {
    const k = Math.round((tx - sx) * 0.55);
    return {
      curve: `M${sx} ${sy}C${sx + k} ${sy} ${tx - k} ${ty} ${tx} ${ty}`,
      head: `M${tx - 7} ${ty - 5}L${tx} ${ty}L${tx - 7} ${ty + 5}`,
    };
  }

  const k = Math.round((ty - sy) * 0.55);
  return {
    curve: `M${sx} ${sy}C${sx} ${sy + k} ${tx} ${ty - k} ${tx} ${ty}`,
    head: `M${tx - 5} ${ty - 7}L${tx} ${ty}L${tx + 5} ${ty - 7}`,
  };
}
