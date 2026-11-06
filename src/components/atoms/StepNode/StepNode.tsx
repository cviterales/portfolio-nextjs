import styles from "./StepNode.module.css";

type StepNodeProps = {
  label: string;
  active?: boolean;
};

export default function StepNode({ label, active = false }: StepNodeProps) {
  return (
    <div className={active ? `${styles.node} ${styles.active}` : styles.node}>
      <span className={styles.core}>
        {/* Trazo naranja que se dibuja alrededor del borde en hover. */}
        <svg
          className={styles.progress}
          viewBox="0 0 100 100"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="50" cy="50" r="49.2" pathLength={1} />
        </svg>
        {label}
      </span>
    </div>
  );
}
