"use client";

import { useState } from "react";
import styles from "./ProcessFlow.module.css";
import ProcessStep from "@/components/molecules/ProcessStep/ProcessStep";
import type { ProcessStepContent } from "@/types/process";

type ProcessFlowProps = {
  steps: readonly ProcessStepContent[];
};

export default function ProcessFlow({ steps }: ProcessFlowProps) {
  // Índices de los pasos que ya recibieron hover: quedan encendidos.
  const [activated, setActivated] = useState<readonly number[]>([]);

  function activate(index: number): void {
    setActivated((prev) => (prev.includes(index) ? prev : [...prev, index]));
  }

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
          active={activated.includes(index)}
          // La flecha hacia el siguiente paso se enciende cuando este se activa.
          connectorActive={activated.includes(index + 1)}
          onActivate={() => activate(index)}
        />
      ))}
    </ol>
  );
}
