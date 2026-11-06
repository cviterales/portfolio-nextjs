"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ProjectCarousel.module.css";
import ProjectTile from "@/components/molecules/ProjectTile/ProjectTile";
import ProjectLightbox from "@/components/molecules/ProjectLightbox/ProjectLightbox";
import type { ProjectContent } from "@/types/project";

type ProjectCarouselProps = {
  projects: readonly ProjectContent[];
};

/**
 * Carrusel de proyectos, mismo comportamiento en desktop y mobile: las tarjetas
 * se deslizan con scroll-snap, la que queda más centrada es la "activa" y muestra
 * su título debajo. Flechas (desktop) y dots navegan de a una tarjeta. Al
 * seleccionar una se abre su detalle completo en un modal.
 */
export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [selected, setSelected] = useState<ProjectContent | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  // El índice activo se deriva del scroll: la celda cuyo centro está más cerca
  // del centro del track. Un listener pasivo + rAF evita trabajo por frame.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const maxScroll = (): number => track.scrollWidth - track.clientWidth;

    const update = (): void => {
      frame = 0;

      // En los extremos el snap no puede centrar la primera/última tarjeta
      // (no hay espacio a su lado), así que el borde fija el índice.
      if (track.scrollLeft <= 1) {
        setActiveIndex(0);
        return;
      }
      if (track.scrollLeft >= maxScroll() - 1) {
        setActiveIndex(projects.length - 1);
        return;
      }

      // Centro del track en coordenadas de viewport (independiente del offsetParent).
      const trackRect = track.getBoundingClientRect();
      const center = trackRect.left + trackRect.width / 2;
      let nearest = 0;
      let minDistance = Infinity;

      cellRefs.current.forEach((cell, index) => {
        if (!cell) return;
        const rect = cell.getBoundingClientRect();
        const cellCenter = rect.left + rect.width / 2;
        const distance = Math.abs(cellCenter - center);
        if (distance < minDistance) {
          minDistance = distance;
          nearest = index;
        }
      });

      setActiveIndex(nearest);
    };

    const onScroll = (): void => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    track.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      track.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [projects.length]);

  const goTo = (index: number): void => {
    const track = trackRef.current;
    const clamped = Math.max(0, Math.min(index, projects.length - 1));
    const cell = cellRefs.current[clamped];
    if (!track || !cell) return;

    // Desplazar el track por el delta entre el centro de la celda y el centro
    // del track (coordenadas de viewport), sin tocar el scroll de la página.
    const trackRect = track.getBoundingClientRect();
    const cellRect = cell.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;
    const cellCenter = cellRect.left + cellRect.width / 2;
    track.scrollTo({ left: track.scrollLeft + (cellCenter - trackCenter), behavior: "smooth" });
  };

  const activeProject = projects[activeIndex];
  const atStart = activeIndex === 0;
  const atEnd = activeIndex === projects.length - 1;

  return (
    <div className={styles.carousel}>
      <div className={styles.viewport}>
        <button
          type="button"
          className={
            atStart ? `${styles.arrow} ${styles.prev} ${styles.hidden}` : `${styles.arrow} ${styles.prev}`
          }
          aria-label="Previous project"
          aria-hidden={atStart}
          tabIndex={atStart ? -1 : 0}
          onClick={() => goTo(activeIndex - 1)}
        >
          &#8249;
        </button>

        <div ref={trackRef} className={styles.track}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(node) => {
                cellRefs.current[index] = node;
              }}
              className={styles.cell}
            >
              <ProjectTile project={project} onSelect={setSelected} />
            </div>
          ))}
        </div>

        <button
          type="button"
          className={
            atEnd ? `${styles.arrow} ${styles.next} ${styles.hidden}` : `${styles.arrow} ${styles.next}`
          }
          aria-label="Next project"
          aria-hidden={atEnd}
          tabIndex={atEnd ? -1 : 0}
          onClick={() => goTo(activeIndex + 1)}
        >
          &#8250;
        </button>
      </div>

      {activeProject ? (
        <h3 className={styles.activeTitle} aria-live="polite">
          {activeProject.title}
        </h3>
      ) : null}

      <div className={styles.dots} role="tablist" aria-label="Projects">
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={project.title}
            className={index === activeIndex ? `${styles.dot} ${styles.dotActive}` : styles.dot}
            onClick={() => goTo(index)}
          />
        ))}
      </div>

      {selected ? (
        <ProjectLightbox project={selected} onClose={() => setSelected(null)} />
      ) : null}
    </div>
  );
}
