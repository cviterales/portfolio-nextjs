import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

export interface DiagramPhaseState {
  ref: React.RefObject<SVGSVGElement | null>;
  inView: boolean;
  animating: boolean;
  /** Fase actual dentro del ciclo (0 .. stepCount - 1). */
  phase: number;
  /** Contador absoluto de pasos desde el montaje. */
  tick: number;
  /** Ciclo completo actual (tick / stepCount). */
  cycle: number;
}

/**
 * Avanza un ciclo de `stepCount` fases mientras el SVG está en viewport. Con
 * `prefers-reduced-motion` se queda fijo en `restPhase` sin animar.
 */
export function useDiagramPhase(
  interval: number,
  stepCount: number,
  restPhase = 1,
): DiagramPhaseState {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;

    const id = setInterval(() => setTick((t) => t + 1), interval);
    return () => clearInterval(id);
  }, [inView, reduceMotion, interval]);

  return {
    ref,
    inView,
    animating: !reduceMotion,
    phase: reduceMotion ? restPhase : tick % stepCount,
    tick,
    cycle: Math.floor(tick / stepCount),
  };
}
