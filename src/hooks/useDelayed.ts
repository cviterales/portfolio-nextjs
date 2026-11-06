import { useEffect, useState } from "react";

/**
 * Devuelve `value` con retraso. Sirve para que un cambio de estado se vea
 * cuando llega el punto que lo causa, y no cuando cambia la fase.
 * `onMs` aplica si el nuevo valor es truthy; `offMs` si es falsy.
 */
export function useDelayed<T>(value: T, onMs: number, offMs: number = onMs): T {
  const [shown, setShown] = useState<T>(value);

  useEffect(() => {
    if (shown === value) return;

    const id = setTimeout(() => setShown(value), value ? onMs : offMs);
    return () => clearTimeout(id);
  }, [value, shown, onMs, offMs]);

  return shown;
}
