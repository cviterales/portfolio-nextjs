import type { CSSProperties } from "react";
import styles from "./SkillsTriangle.module.css";
import SkillRow from "@/components/molecules/SkillRow/SkillRow";
import SkillLogo from "@/components/atoms/SkillLogo/SkillLogo";
import { toInvertedTriangle } from "@/utils/triangle";
import type { SkillContent } from "@/types/skill";

type SkillsTriangleProps = {
  skills: readonly SkillContent[];
};

function widestRow(rows: readonly SkillContent[][]): number {
  return rows.reduce((max, row) => Math.max(max, row.length), 1);
}

/**
 * En desktop las skills forman un triángulo invertido; en mobile se muestran en
 * una grilla que fluye (los logos se acomodan en las filas necesarias). Se
 * renderizan ambas estructuras y el CSS muestra la que corresponde al breakpoint.
 */
export default function SkillsTriangle({ skills }: SkillsTriangleProps) {
  const triangleRows = toInvertedTriangle(skills);

  return (
    <>
      <div
        className={`${styles.layout} ${styles.triangle}`}
        // La fila más ancha define el tamaño de los logos.
        style={{ "--columns": widestRow(triangleRows) } as CSSProperties}
      >
        {triangleRows.map((row) => (
          <SkillRow key={row[0].id} skills={row} />
        ))}
      </div>

      <ul className={styles.grid}>
        {skills.map((skill) => (
          <li key={skill.id}>
            <SkillLogo skill={skill} />
          </li>
        ))}
      </ul>
    </>
  );
}
