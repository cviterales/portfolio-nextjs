"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import styles from "./ProcessFlow.module.css";
import ProcessNode from "@/components/molecules/ProcessNode/ProcessNode";
import {
  ConnectorLine,
  ConnectorPulse,
} from "@/components/atoms/ProcessConnector/ProcessConnector";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { PROCESS_CASCADE_DELAY } from "@/constant/process";
import {
  PROCESS_ORIENTATION,
  getConnectorPath,
  getNodePosition,
  getStageSize,
} from "@/utils/processGeometry";
import type { ProcessStepContent } from "@/types/process";

type ProcessFlowProps = {
  steps: readonly ProcessStepContent[];
};

/** Debajo de este ancho el diagrama no entra en horizontal y pasa a vertical. */
const VERTICAL_QUERY = "(max-width: 1159px)";

/**
 * Al pasar el mouse (o tocar/enfocar) el diagrama se dispara la animación para
 * todos los círculos: arranca en el primero y avanza hasta el último (de
 * izquierda a derecha en desktop, de arriba hacia abajo en pantallas angostas).
 * Cada conector se dibuja (trazo, pulso y flecha) antes de que se encienda el
 * círculo siguiente. Con `prefers-reduced-motion` se muestra el estado final.
 */
export default function ProcessFlow({ steps }: ProcessFlowProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const vertical = useMediaQuery(VERTICAL_QUERY);
  const orientation = vertical
    ? PROCESS_ORIENTATION.vertical
    : PROCESS_ORIENTATION.horizontal;
  const [started, setStarted] = useState(false);
  const [shown, setShown] = useState(0);

  const { width, height } = getStageSize(steps.length, orientation);
  const lit = reduceMotion || started;
  const current = steps[shown];

  function activate(index: number): void {
    setStarted(true);
    setShown(index);
  }

  const nodeDelay = (index: number): number => index * PROCESS_CASCADE_DELAY;
  const linkDelay = (index: number): number =>
    nodeDelay(index) + PROCESS_CASCADE_DELAY * 0.4;

  return (
    <div className={styles.container}>
      <div className={styles.panel} onMouseEnter={() => setStarted(true)}>
        <div className={styles.stage} style={{ width, height }}>
          <svg
            className={styles.links}
            width={width}
            height={height}
            aria-hidden="true"
            focusable="false"
          >
            {steps.slice(0, -1).map(({ id }, index) => (
              <ConnectorLine
                key={id}
                path={getConnectorPath(index, orientation)}
                active={lit}
                delay={linkDelay(index)}
                reduceMotion={reduceMotion}
              />
            ))}
          </svg>
          {steps.slice(0, -1).map(({ id }, index) => (
            <ConnectorPulse
              key={id}
              path={getConnectorPath(index, orientation)}
              active={lit}
              delay={linkDelay(index)}
              reduceMotion={reduceMotion}
            />
          ))}
          <ol className={styles.nodes}>
            {steps.map((step, index) => {
              const { x, y } = getNodePosition(index, orientation);
              return (
                <li
                  key={step.id}
                  className={styles.item}
                  style={{ left: x, top: y }}
                  onMouseEnter={() => activate(index)}
                >
                  <ProcessNode
                    step={step}
                    index={index}
                    active={lit}
                    delay={nodeDelay(index)}
                    reduceMotion={reduceMotion}
                    onActivate={() => activate(index)}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className={styles.description} aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={current.id}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            {current.description}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
