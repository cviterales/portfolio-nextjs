import styles from "./styles.module.scss";
import { scroller } from 'react-scroll';

const scrollType = {
  duration: 500,
  delay: 50,
  smooth: true, // linear “easeInQuint” “easeOutCubic” 
  offset: -10,
};

const Header = () => {

  const scrollHandler = (element) => {
    scroller.scrollTo(element, scrollType);
  }

  return (
    <section className={styles.header}>
      <nav className={styles.header_nav}>
        <ul className={styles.header_nav_menu}>
          <li className={styles.header_nav_menu_item}>
            <a
              id="projects"
              href="#projects"
              aria-label="Projects"
              rel="noopener noreferrer"
              onClick={(e) => {scrollHandler(e.target.id)}}
            >
              Projects
            </a>
          </li>
          <li className={styles.header_nav_menu_item}>
            <a id="about" href="#about" aria-label="About" rel="noopener noreferrer" onClick={(e) => {scrollHandler(e.target.id)}}>
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
