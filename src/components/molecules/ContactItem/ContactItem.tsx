import type { ReactNode } from "react";
import styles from "./ContactItem.module.css";
import Icon from "@/components/atoms/Icon/Icon";
import type { IconName } from "@/types/icon";

type ContactItemProps = {
  icon: IconName;
  text: string;
  href?: string;
  trailing?: ReactNode;
};

export default function ContactItem({
  icon,
  text,
  href,
  trailing,
}: ContactItemProps) {
  const content = href ? (
    <a className={styles.link} href={href}>
      {text}
    </a>
  ) : (
    <span>{text}</span>
  );

  return (
    <div className={styles.item}>
      <Icon name={icon} />
      {content}
      {trailing}
    </div>
  );
}
