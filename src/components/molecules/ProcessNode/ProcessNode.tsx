"use client";

import { motion } from "motion/react";
import styles from "./ProcessNode.module.css";
import type { ProcessStepContent } from "@/types/process";

type ProcessNodeProps = {
  step: ProcessStepContent;
  index: number;
  active: boolean;
  /** Segundos de espera antes de encender el nodo. */
  delay: number;
  reduceMotion: boolean;
  onActivate: () => void;
};

const RING_RADIUS = 73;

export default function ProcessNode({
  step,
  index,
  active,
  delay,
  reduceMotion,
  onActivate,
}: ProcessNodeProps) {
  const wait = reduceMotion || !active ? 0 : delay;
  const className = active ? `${styles.node} ${styles.on}` : styles.node;

  return (
    <div className={className}>
      <span className={styles.badge} aria-hidden="true">
        {index + 1}
      </span>
      <motion.button
        type="button"
        className={styles.button}
        aria-label={`Step ${index + 1}: ${step.label}`}
        initial={false}
        animate={{ scale: active && !reduceMotion ? 1.06 : 1 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 22,
          delay: wait,
        }}
        onClick={onActivate}
        onFocus={onActivate}
      >
        <i className={styles.orbit} aria-hidden="true" />
        <svg
          className={styles.ring}
          viewBox="0 0 150 150"
          aria-hidden="true"
          focusable="false"
        >
          <circle className={styles.track} cx="75" cy="75" r={RING_RADIUS} />
          <motion.circle
            className={styles.arc}
            cx="75"
            cy="75"
            r={RING_RADIUS}
            initial={false}
            animate={{ pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }}
            transition={{
              duration: reduceMotion ? 0 : active ? 0.6 : 0.3,
              delay: wait,
              ease: "easeInOut",
            }}
          />
        </svg>
        <span className={styles.disc}>
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            {step.iconPaths.map((d) => (
              <path key={d} d={d} />
            ))}
          </svg>
          <span className={styles.label}>{step.label}</span>
        </span>
      </motion.button>
    </div>
  );
}
