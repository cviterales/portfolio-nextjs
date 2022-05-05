import Img from "../UI/Image/Img";
import styles from "./styles.module.scss";

const Header = () => {

  return (
    <section className={styles.header}>
      <a 
        className={styles.header_icon}
        href="#home"
        aria-label="Projects"
        rel="noopener noreferrer"
      >
        <Img src={`/logos/code.svg`} alt={"logo"} />
      </a>
      <nav className={styles.header_nav}>
        <ul className={styles.header_nav_menu}>
          <li className={styles.header_nav_menu_item}>
            <a
              href="#projects"
              aria-label="Projects"
              rel="noopener noreferrer"
            >
              Projects
            </a>
          </li>
          <li className={styles.header_nav_menu_item}>
            <a href="#about" aria-label="About" rel="noopener noreferrer">
              About
            </a>
          </li>
          <li className={styles.header_nav_menu_item}>
            <a
              href="mailto: cviterales@gmail.com"
              target="_blank"
              aria-label="Gmail"
              rel="noopener noreferrer"
            >
              Contact
            </a>
          </li>
          <li className={styles.header_nav_menu_item}>
            <a
              target="_blank"
              href="./files/CV.pdf"
              title="cv"
              aria-label="CV"
              rel="noopener noreferrer"
            >
              Download CV
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Header;
