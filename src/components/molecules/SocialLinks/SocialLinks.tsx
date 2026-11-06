import styles from "./SocialLinks.module.css";
import IconLink from "@/components/atoms/IconLink/IconLink";
import { SOCIAL_LINKS } from "@/constant/contact";

export default function SocialLinks() {
  return (
    <ul className={styles.list}>
      {SOCIAL_LINKS.map(({ icon, href, label }) => (
        <li key={icon}>
          <IconLink href={href} icon={icon} label={label} />
        </li>
      ))}
    </ul>
  );
}
