"use client";

import type { ReactNode } from "react";
import styles from "./RevealOnScroll.module.css";
import { useScrolledPast } from "@/hooks/useScrolledPast";
import { HEADER_STUCK_OFFSET } from "@/constant/layout";

type RevealOnScrollProps = {
  children: ReactNode;
  offset?: number;
};

/** Muestra su contenido con un fundido cuando el scroll supera `offset`. */
export default function RevealOnScroll({
  children,
  offset = HEADER_STUCK_OFFSET,
}: RevealOnScrollProps) {
  const revealed = useScrolledPast(offset);

  return (
    <div
      className={
        revealed ? `${styles.reveal} ${styles.visible}` : styles.reveal
      }
    >
      {revealed ? children : null}
    </div>
  );
}
