import styles from "./SectionHeading.module.css";
import Eyebrow from "@/components/atoms/Eyebrow/Eyebrow";
import SectionTitle from "@/components/atoms/SectionTitle/SectionTitle";
import Description from "@/components/atoms/Description/Description";
import type { SectionHeadingContent } from "@/types/section";

type SectionHeadingProps = {
  content: SectionHeadingContent;
  titleId?: string;
};

export default function SectionHeading({
  content,
  titleId,
}: SectionHeadingProps) {
  const { eyebrow, title, description } = content;

  return (
    <div className={styles.heading}>
      <Eyebrow text={eyebrow} />
      <SectionTitle id={titleId} text={title.text} highlight={title.highlight} />
      <Description text={description} />
    </div>
  );
}
