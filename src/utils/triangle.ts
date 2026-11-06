const ROW_STEP = 2;

/** Suma de las filas `size`, `size - 2`, ... mientras sean positivas. */
function totalFor(size: number): number {
  let total = 0;
  for (let row = size; row > 0; row -= ROW_STEP) {
    total += row;
  }
  return total;
}

/**
 * Reparte una lista en filas que bajan de 2 en 2 (por ejemplo 12, 10, 8, 6, 4,
 * 2) para formar un triángulo invertido. La primera fila es la menor que
 * permite alojar todos los elementos; si no encajan exactos, la última fila
 * queda con los que sobran.
 */
export function toInvertedTriangle<T>(items: readonly T[]): T[][] {
  let firstRow = 1;
  while (totalFor(firstRow) < items.length) {
    firstRow += 1;
  }

  const rows: T[][] = [];
  let start = 0;
  for (let size = firstRow; size > 0 && start < items.length; size -= ROW_STEP) {
    rows.push(items.slice(start, start + size));
    start += size;
  }

  return rows;
}


