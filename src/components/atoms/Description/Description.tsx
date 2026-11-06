import styles from "./Description.module.css";

type DescriptionProps = {
  text: string;
};

export default function Description({ text }: DescriptionProps) {
  return <p className={styles.description}>{text}</p>;
}
