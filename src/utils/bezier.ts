import type { Link, Point } from "@/types/diagram";

/** Atributo `d` de un path para una curva de Bézier cúbica horizontal. */
export function linkPath({ x0, y0, xm, x1, y1 }: Link): string {
  return `M${x0},${y0} C${xm},${y0} ${xm},${y1} ${x1},${y1}`;
}

/**
 * Punto sobre la curva en el parámetro `t` (0 a 1). Los puntos de control
 * comparten `xm`; el primero mantiene `y0` y el segundo `y1`.
 */
export function pointOnLink(link: Link, t: number): Point {
  const { x0, y0, xm, x1, y1 } = link;
  const u = 1 - t;
  const u2 = u * u;
  const t2 = t * t;

  return {
    x: u2 * u * x0 + 3 * u2 * t * xm + 3 * u * t2 * xm + t2 * t * x1,
    y: u2 * u * y0 + 3 * u2 * t * y0 + 3 * u * t2 * y1 + t2 * t * y1,
  };
}
