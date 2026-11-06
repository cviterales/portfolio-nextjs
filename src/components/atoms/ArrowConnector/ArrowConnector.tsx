import styles from "./ArrowConnector.module.css";
import Icon from "@/components/atoms/Icon/Icon";
import { ICON_NAME } from "@/types/icon";
import type { ArrowDirection } from "@/types/arrow";

type ArrowConnectorProps = {
  direction: ArrowDirection;
  className?: string;
  /** Encendida (naranja) o apagada (gris tenue). */
  active?: boolean;
};

export default function ArrowConnector({
  direction,
  className,
  active = false,
}: ArrowConnectorProps) {
  const classes = [
    styles.arrow,
    styles[direction],
    active ? styles.on : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} aria-hidden="true">
      <Icon name={ICON_NAME.arrowRight} size={24} />
    </span>
  );
}
