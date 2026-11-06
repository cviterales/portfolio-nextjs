"use client";

import { useState, type CSSProperties, type SyntheticEvent } from "react";
import Image from "next/image";
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
type Scroll = {
  /** Píxeles que recorre la imagen dentro del marco. */
  travel: number;
  /** Duración del recorrido en segundos. */
  duration: number;
};

export default function ProjectImage({ image, animate = false }: ProjectImageProps) {
  const [scroll, setScroll] = useState<Scroll | null>(null);

  const onLoad = (event: SyntheticEvent<HTMLImageElement>): void => {
    if (!animate) return;
    const rendered = event.currentTarget.getBoundingClientRect().height;
    const frame = event.currentTarget.parentElement?.clientHeight ?? 0;
    const travel = Math.max(0, rendered - frame);
    const duration = Math.min(MAX_DURATION, Math.max(MIN_DURATION, travel / SCROLL_SPEED));
    setScroll({ travel, duration });
  };

  // La captura entra a ancho completo con alto natural; las dimensiones reales
  // las resuelve el navegador (width/height 0 + sizes es el patrón de Next para
  // imágenes responsive de relación de aspecto desconocida). El recorrido se
  // calcula en JS y se pasa por variables CSS, así el marco no necesita
  // `container-type` (que colapsaría a 0 sin un alto definido en la cadena).
  const style: CSSProperties = {
    width: "100%",
    height: "auto",
    ...(animate && scroll !== null
      ? ({
          "--scroll-duration": `${scroll.duration}s`,
          "--scroll-travel": `${scroll.travel}px`,
        } as CSSProperties)
      : {}),
  };

  return (
    <div className={animate ? `${styles.frame} ${styles.animated}` : styles.frame}>
      <Image
        className={styles.shot}
        src={image.src}
        alt={image.alt}
        width={0}
        height={0}
        sizes="100vw"
        loading="lazy"
        style={style}
        onLoad={onLoad}
      />
    </div>
  );
}
