"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./ProjectLightbox.module.css";
import { renderProjectMedia } from "@/components/organisms/ProjectCarousel/projectMedia";
import type { ProjectContent } from "@/types/project";

type ProjectLightboxProps = {
  project: ProjectContent;
  onClose: () => void;
};

/** Detalle de un proyecto centrado en pantalla sobre un fondo oscurecido. */
export default function ProjectLightbox({ project, onClose }: ProjectLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = `${project.id}-lightbox-title`;

  useEffect(() => {
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    // El scroll de la página vive en el documento (html), no en el body, así que
    // se bloquea ahí para que el fondo no se mueva con el modal abierto.
    const root = document.documentElement;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      root.style.overflow = previousRootOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div className={styles.panel} onClick={(event) => event.stopPropagation()}>
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>

        <div className={styles.media}>{renderProjectMedia(project, true)}</div>

        <div className={styles.info}>
          <h3 id={titleId} className={styles.title}>
            {project.title}
          </h3>
          <p className={styles.summary}>{project.summary}</p>
          <ul className={styles.tags}>
            {project.tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body,
  );
}
