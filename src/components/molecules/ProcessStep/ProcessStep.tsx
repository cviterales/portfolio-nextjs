import styles from "./ProcessStep.module.css";
import StepNode from "@/components/atoms/StepNode/StepNode";
import ArrowConnector from "@/components/atoms/ArrowConnector/ArrowConnector";
import { ARROW_DIRECTION } from "@/types/arrow";

type ProcessStepProps = {
  label: string;
  /** Baja el nodo para formar el zigzag. */
  lowered?: boolean;
  /** Muestra la flecha hacia el siguiente paso. */
  hasNext?: boolean;
  /** Borde del nodo encendido. */
  active?: boolean;
  /** Flecha hacia el siguiente paso encendida. */
  connectorActive?: boolean;
  onActivate?: () => void;
};

export default function ProcessStep({
  label,
  lowered = false,
  hasNext = false,
  active = false,
  connectorActive = false,
  onActivate,
}: ProcessStepProps) {
  const classes = lowered ? `${styles.step} ${styles.lowered}` : styles.step;

  return (
    <li className={classes} onPointerEnter={onActivate}>
      <StepNode label={label} active={active} />
      {hasNext && (
        <ArrowConnector
          className={styles.connector}
          direction={lowered ? ARROW_DIRECTION.up : ARROW_DIRECTION.down}
          active={connectorActive}
        />
      )}
    </li>
  );
}
