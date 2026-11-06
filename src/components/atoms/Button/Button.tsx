import styles from "./Button.module.css";

type ButtonProps = {
  text: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  /** Si se define, se renderiza como enlace con el mismo estilo. */
  href?: string;
};

export default function Button({
  text,
  onClick,
  className,
  disabled = false,
  href,
}: ButtonProps) {
  const classes = className ? `${styles.button} ${className}` : styles.button;

  if (href) {
    return (
      <a className={classes} href={href}>
        {text}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
