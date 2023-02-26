import styles from "./styles.module.scss";

const Footer = () => {
  return <footer className={styles.footer}>
    <p>{new Date().getFullYear()} - @cviterales</p>
  </footer>;
};

export default Footer;
