import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <a className={styles.logo} href="#home" aria-label="Cristian, inicio">
      <span className={styles.mark} aria-hidden="true">
        C
      </span>
    </a>
  );
}
