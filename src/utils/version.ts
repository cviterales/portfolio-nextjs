/** Etiqueta de versión que usan los diagramas: 0 -> v1.0.0, 1 -> v1.1.0. */
export function formatVersion(n: number): string {
  return `v1.${n}.0`;
}
