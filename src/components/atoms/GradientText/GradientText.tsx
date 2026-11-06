import type { ReactNode } from "react";
import styles from "./GradientText.module.css";

type GradientTextProps = {
  children: ReactNode;
  className?: string;
};

export default function GradientText({
  children,
  className,
}: GradientTextProps) {
  const classes = className
    ? `${styles.gradientText} ${className}`
    : styles.gradientText;

  return <span className={classes}>{children}</span>;
}
