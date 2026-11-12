"use client";

import { motion } from "motion/react";
import styles from "./ProcessConnector.module.css";
import type { ProcessConnectorPath } from "@/utils/processGeometry";

type ProcessConnectorProps = {
  path: ProcessConnectorPath;
  active: boolean;
  /** Segundos de espera antes de dibujar el trazo. */
  delay: number;
  reduceMotion: boolean;
};

const DRAW_DURATION = 0.6;
const PULSE_DURATION = 0.9;

/** Curva punteada gris + trazo naranja que se dibuja + flecha. Va dentro de un <svg>. */
export function ConnectorLine({
  path,
  active,
  delay,
  reduceMotion,
}: ProcessConnectorProps) {
  const duration = reduceMotion ? 0 : DRAW_DURATION;
  const wait = reduceMotion ? 0 : delay;

  return (
    <>
      <path className={styles.base} d={path.curve} />
      <motion.path
        className={styles.stroke}
        d={path.curve}
        initial={false}
        animate={{ pathLength: active ? 1 : 0 }}
        transition={{
          duration: active ? duration : 0.3,
          delay: active ? wait : 0,
          ease: "easeInOut",
        }}
      />
      <motion.path
        className={styles.head}
        d={path.head}
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.2, delay: active ? wait + duration : 0 }}
      />
    </>
  );
}

/** Punto de luz que viaja por la curva. Vive fuera del SVG para usar offset-path. */
export function ConnectorPulse({
  path,
  active,
  delay,
  reduceMotion,
}: ProcessConnectorProps) {
  if (reduceMotion) return null;

  return (
    <motion.i
      className={styles.pulse}
      aria-hidden="true"
      style={{ offsetPath: `path("${path.curve}")` }}
      initial={false}
      animate={
        active
          ? { offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] }
          : { offsetDistance: "0%", opacity: 0 }
      }
      transition={
        active
          ? {
              duration: PULSE_DURATION,
              delay,
              ease: "easeInOut",
              times: [0, 0.15, 0.85, 1],
            }
          : { duration: 0 }
      }
    />
  );
}
