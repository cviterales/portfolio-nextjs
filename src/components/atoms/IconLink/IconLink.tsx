import styles from "./IconLink.module.css";
import Icon from "@/components/atoms/Icon/Icon";
import type { IconName } from "@/types/icon";

type IconLinkProps = {
  href: string;
  icon: IconName;
  label: string;
};

export default function IconLink({ href, icon, label }: IconLinkProps) {
  return (
    <a
      className={styles.iconLink}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <Icon name={icon} />
    </a>
  );
}
