import type { ReactNode } from "react";
import styles from "./Section.module.css";
import SectionHeading from "@/components/molecules/SectionHeading/SectionHeading";
import type { SectionContent } from "@/types/section";

type SectionProps = {
  content: SectionContent;
  children?: ReactNode;
};

export default function Section({ content, children }: SectionProps) {
  const titleId = `${content.id}-title`;

  return (
    <section
      id={content.id}
      className={styles.section}
      aria-labelledby={titleId}
    >
      <div className={styles.inner}>
        <SectionHeading content={content.heading} titleId={titleId} />
        {children}
      </div>
    </section>
  );
}
