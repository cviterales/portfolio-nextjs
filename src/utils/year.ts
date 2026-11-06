import { cacheLife } from "next/cache";

/**
 * Año actual. Se usa `getFullYear()` porque `getYear()` está obsoleto y
 * devuelve el año menos 1900 (126 en 2026).
 *
 * Con `cacheComponents` activo, `new Date()` no puede ejecutarse suelto en un
 * Server Component, por eso el valor se cachea y se renueva cada día.
 */
export async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");

  return new Date().getFullYear();
}
