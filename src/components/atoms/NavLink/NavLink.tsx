import styles from "./NavLink.module.css";

type NavLinkProps = {
  href: string;
  label: string;
};

export default function NavLink({ href, label }: NavLinkProps) {
  return (
    <a className={styles.navLink} href={href}>
      {label}
    </a>
  );
}
