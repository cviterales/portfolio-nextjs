import styles from "./styles.module.scss";
import CurrentYear from "../../Atoms/CurrentYear/CurrentYear";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <CurrentYear /> - @cviterales
      </p>
    </footer>
  );
};

export default Footer;
