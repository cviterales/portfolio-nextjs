import Image from "next/image";
import styles from "./SkillLogo.module.css";
import type { SkillContent } from "@/types/skill";

type SkillLogoProps = {
  skill: SkillContent;
};

export default function SkillLogo({ skill }: SkillLogoProps) {
  return (
    <div className={styles.skill}>
      <Image
        className={styles.logo}
        src={skill.logo}
        alt={skill.name}
        width={40}
        height={40}
        unoptimized
      />
      <span className={styles.label} aria-hidden="true">
        {skill.name}
      </span>
    </div>
  );
}
