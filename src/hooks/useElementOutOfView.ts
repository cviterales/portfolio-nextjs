import { useEffect, useState } from "react";

/**
 * Devuelve true cuando el elemento con `id` dejó de estar visible en el
 * viewport. Útil para mostrar algo en el header solo tras pasar una sección.
 */
export function useElementOutOfView(id: string): boolean {
  const [outOfView, setOutOfView] = useState(false);

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOutOfView(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [id]);

  return outOfView;
}
