import { useSyncExternalStore } from "react";

/** Devuelve true cuando el scroll vertical supera `offset` píxeles. */
export function useScrolledPast(offset: number): boolean {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("scroll", onChange, { passive: true });
      return () => window.removeEventListener("scroll", onChange);
    },
    () => window.scrollY > offset,
    () => false,
  );
}
