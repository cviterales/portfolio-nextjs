"use client";

import { useState, type CSSProperties, type SyntheticEvent } from "react";
import styles from "./ProjectImage.module.css";
import type { ProjectImageContent } from "@/types/project";

type ProjectImageProps = {
  image: ProjectImageContent;
  /** En el modal recorre la captura con auto-scroll; en la tarjeta queda fija. */
  animate?: boolean;
};

/** Velocidad del recorrido en píxeles (de la imagen renderizada) por segundo. */
const SCROLL_SPEED = 140;
/** Límites de duración para que ni la más corta ni la más larga se sientan mal. */
const MIN_DURATION = 6;
const MAX_DURATION = 40;

/**
 * Captura de una página. En la tarjeta muestra el tope fijo; en el modal hace
 * un recorrido vertical suave (ida y vuelta, en loop) que pausa al pasar el
 * mouse y respeta `prefers-reduced-motion`. La duración se calcula por el alto
 * renderizado para que todas las capturas recorran a la misma velocidad.
 */
export default function ProjectImage({ image, animate = false }: ProjectImageProps) {
  const [duration, setDuration] = useState<number | null>(null);

  const onLoad = (event: SyntheticEvent<HTMLImageElement>): void => {
    if (!animate) return;
    const rendered = event.currentTarget.getBoundingClientRect().height;
    const frame = event.currentTarget.parentElement?.clientHeight ?? 0;
    const travel = Math.max(0, rendered - frame);
    const seconds = Math.min(MAX_DURATION, Math.max(MIN_DURATION, travel / SCROLL_SPEED));
    setDuration(seconds);
  };

  const style =
    animate && duration !== null
      ? ({ "--scroll-duration": `${duration}s` } as CSSProperties)
      : undefined;

  return (
    <div className={animate ? `${styles.frame} ${styles.animated}` : styles.frame}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.shot}
        src={image.src}
        alt={image.alt}
        loading="lazy"
        style={style}
        onLoad={onLoad}
      />
    </div>
  );
}
