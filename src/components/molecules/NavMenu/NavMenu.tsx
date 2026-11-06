import styles from "./NavMenu.module.css";
import NavLink from "@/components/atoms/NavLink/NavLink";
import { NAV_ITEMS } from "@/constant/navigation";

export default function NavMenu() {
  return (
    <nav className={styles.nav} aria-label="Principal">
      <ul className={styles.list}>
        {NAV_ITEMS.map(({ label, href }) => (
          <li key={href}>
            <NavLink href={href} label={label} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
