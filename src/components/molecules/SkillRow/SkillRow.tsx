import styles from "./SkillRow.module.css";
import SkillLogo from "@/components/atoms/SkillLogo/SkillLogo";
import type { SkillContent } from "@/types/skill";

type SkillRowProps = {
  skills: readonly SkillContent[];
};

export default function SkillRow({ skills }: SkillRowProps) {
  return (
    <ul className={styles.row}>
      {skills.map((skill) => (
        <li key={skill.id}>
          <SkillLogo skill={skill} />
        </li>
      ))}
    </ul>
  );
}
