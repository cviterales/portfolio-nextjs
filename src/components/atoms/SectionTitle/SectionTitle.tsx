import styles from "./SectionTitle.module.css";
import GradientText from "@/components/atoms/GradientText/GradientText";

type SectionTitleProps = {
  id?: string;
  text: string;
  highlight: string;
};

export default function SectionTitle({
  id,
  text,
  highlight,
}: SectionTitleProps) {
  return (
    <h2 id={id} className={styles.sectionTitle}>
      {text} <GradientText>{highlight}</GradientText>
    </h2>
  );
}
