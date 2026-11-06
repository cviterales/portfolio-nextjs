import styles from "./TextLink.module.css";
import Icon from "@/components/atoms/Icon/Icon";
import { ICON_NAME } from "@/types/icon";

type TextLinkProps = {
  href: string;
  text: string;
};

export default function TextLink({ href, text }: TextLinkProps) {
  return (
    <a className={styles.textLink} href={href}>
      {text}
      <Icon name={ICON_NAME.arrowRight} />
    </a>
  );
}
