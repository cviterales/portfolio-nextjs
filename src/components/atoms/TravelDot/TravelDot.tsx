"use client";

import { useEffect } from "react";
import { motion, animate, useMotionValue, useTransform } from "motion/react";
import { pointOnLink } from "@/utils/bezier";
import { DIAGRAM_COLOR } from "@/constant/diagramTheme";
import { TRAVEL_TONE, type Link, type TravelTone } from "@/types/diagram";

type TravelDotProps = {
  link: Link;
  tone: TravelTone;
  /** Recorre la curva de destino a origen. */
  reverse?: boolean;
  active: boolean;
  delay?: number;
  /** Segundos que tarda en recorrer la curva. */
  duration?: number;
  r?: number;
};

const TONE_COLOR: Record<TravelTone, string> = {
  [TRAVEL_TONE.accent]: DIAGRAM_COLOR.accent,
  [TRAVEL_TONE.request]: DIAGRAM_COLOR.request,
};

/** Punto luminoso que recorre una curva de conexión mientras `active`. */
export default function TravelDot({
  link,
  tone,
  reverse = false,
  active,
  delay = 0,
  duration = 1.3,
  r = 4.5,
}: TravelDotProps) {
  const color = TONE_COLOR[tone];
  const progress = useMotionValue(0);
  const cx = useTransform(progress, (t) => pointOnLink(link, reverse ? 1 - t : t).x);
  const cy = useTransform(progress, (t) => pointOnLink(link, reverse ? 1 - t : t).y);
  const opacity = useTransform(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  useEffect(() => {
    progress.set(0);
    if (!active) return;

    const controls = animate(progress, 1, {
      duration,
      delay,
      ease: [0.45, 0, 0.35, 1],
    });
    return () => controls.stop();
  }, [active, delay, duration, progress]);

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill={color}
      style={{ opacity, filter: `drop-shadow(0 0 6px ${color})` }}
    />
  );
}
