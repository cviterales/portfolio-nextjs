"use client";

import type { KeyboardEvent } from "react";
import styles from "./ProjectTile.module.css";
import { renderProjectMedia } from "@/components/organisms/ProjectCarousel/projectMedia";
import type { ProjectContent } from "@/types/project";

type ProjectTileProps = {
  project: ProjectContent;
  onSelect: (project: ProjectContent) => void;
};

/**
 * Tarjeta del carrusel: muestra el diagrama como preview estático y abre el
 * detalle al activarse. Es un `div` con rol de botón porque el diagrama trae
 * flow content (figure, figcaption) que no es válido dentro de un `<button>`.
 */
export default function ProjectTile({ project, onSelect }: ProjectTileProps) {
  const select = (): void => onSelect(project);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={styles.tile}
      aria-label={project.title}
      onClick={select}
      onKeyDown={onKeyDown}
    >
      <span className={styles.media} aria-hidden="true">
        {renderProjectMedia(project)}
      </span>
      <span className={styles.overlay} />
    </div>
  );
}
