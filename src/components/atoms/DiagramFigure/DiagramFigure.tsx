import type { ReactNode, Ref } from "react";
import styles from "./DiagramFigure.module.css";

type DiagramFigureProps = {
  svgRef: Ref<SVGSVGElement>;
  viewBox: string;
  ariaLabel: string;
  /** Contenido SVG del diagrama. */
  children: ReactNode;
  /** Pie: pasos y caption. */
  footer: ReactNode;
  /** defs del SVG (gradientes, patterns). */
  defs?: ReactNode;
};

/** Contenedor común de los diagramas: figure + svg con el estilo compartido. */
export default function DiagramFigure({
  svgRef,
  viewBox,
  ariaLabel,
  children,
  footer,
  defs,
}: DiagramFigureProps) {
  return (
    <figure className={styles.figure}>
      <svg
        ref={svgRef}
        viewBox={viewBox}
        role="img"
        aria-label={ariaLabel}
        className={styles.svg}
      >
        {defs}
        {children}
      </svg>
      {footer}
    </figure>
  );
}
