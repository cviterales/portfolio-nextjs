import styles from "./Copyright.module.css";

type CopyrightProps = {
  year: number;
  handle: string;
};

export default function Copyright({ year, handle }: CopyrightProps) {
  return (
    <p className={styles.copyright}>
      <span aria-hidden="true">©</span> {year} {handle}
    </p>
  );
}
