import styles from "./Eyebrow.module.css";

type EyebrowProps = {
  text: string;
};

export default function Eyebrow({ text }: EyebrowProps) {
  return <p className={styles.eyebrow}>{text}</p>;
}
