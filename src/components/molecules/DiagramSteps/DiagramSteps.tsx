"use client";

import { motion, AnimatePresence } from "motion/react";
import styles from "./DiagramSteps.module.css";
import { DIAGRAM_COLOR } from "@/constant/diagramTheme";

type DiagramStepsProps = {
  steps: readonly string[];
  captions: readonly string[];
  phase: number;
};

/** Chips de las fases más el caption que cambia con la fase activa. */
export default function DiagramSteps({ steps, captions, phase }: DiagramStepsProps) {
  return (
    <figcaption className={styles.caption}>
      <div className={styles.steps}>
        {steps.map((label, i) => {
          const on = i === phase;
          return (
            <motion.span
              key={label}
              className={styles.chip}
              animate={{
                color: on ? DIAGRAM_COLOR.ink : DIAGRAM_COLOR.muted,
                borderColor: on ? DIAGRAM_COLOR.accent : DIAGRAM_COLOR.border,
                background: on
                  ? `linear-gradient(135deg, ${DIAGRAM_COLOR.accentLight}, ${DIAGRAM_COLOR.accentDeep})`
                  : "rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.3 }}
            >
              {label}
            </motion.span>
          );
        })}
      </div>

      <div className={styles.captionBody}>
        <AnimatePresence mode="wait">
          <motion.p
            key={phase}
            className={styles.captionText}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {captions[phase]}
          </motion.p>
        </AnimatePresence>
      </div>
    </figcaption>
  );
}
