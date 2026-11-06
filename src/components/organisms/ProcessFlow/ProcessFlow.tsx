"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ProcessFlow.module.css";
import ProcessStep from "@/components/molecules/ProcessStep/ProcessStep";
import type { ProcessStepContent } from "@/types/process";

type ProcessFlowProps = {
  steps: readonly ProcessStepContent[];
};

/** Milisegundos entre el encendido de un nodo y el siguiente en la cascada. */
const CASCADE_DELAY_MS = 450;

/**
 * Al hacer hover (o tap en mobile) sobre cualquier nodo se dispara una cascada
 * que enciende todos los nodos en orden: de izquierda a derecha en desktop y de
 * arriba hacia abajo en mobile (el mismo orden del array). Una vez disparada,
 * los nodos quedan encendidos.
 */
export default function ProcessFlow({ steps }: ProcessFlowProps) {
  // Cantidad de nodos encendidos, desde el inicio del array.
  const [activeCount, setActiveCount] = useState(0);
  const startedRef = useRef(false);

  function startCascade(): void {
    if (startedRef.current) return;
    startedRef.current = true;
    setActiveCount(1);
  }

  useEffect(() => {
    if (activeCount === 0 || activeCount >= steps.length) return;

    const timer = window.setTimeout(() => {
      setActiveCount((prev) => prev + 1);
    }, CASCADE_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [activeCount, steps.length]);

  return (
    <ol
      className={styles.flow}
      style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
    >
      {steps.map(({ id, label }, index) => (
        <ProcessStep
          key={id}
          label={label}
          lowered={index % 2 === 1}
          hasNext={index < steps.length - 1}
          active={index < activeCount}
          // La flecha hacia el siguiente paso se enciende cuando este se activa.
          connectorActive={index + 1 < activeCount}
          onActivate={startCascade}
        />
      ))}
    </ol>
  );
}
