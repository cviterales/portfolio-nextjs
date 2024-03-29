import styles from "./styles.module.scss";
import { MdWavingHand } from 'react-icons/md';
import Img from "../../Atoms/Image/Img";
import Technology from "../../Molecules/Technology/Technology";

const Home = () => {
  return (
    <section className={styles.main} id="home">
      <div className={styles.main_wrapper}>
        <div className={styles.main_wrapper_container}>
          <Img src="/images/1b.webp" alt="me" objFit="cover" priority />
        </div>
      </div>
      <div className={styles.main_wrapper}>
        <div className={styles.main_wrapper_content}>
          <p className={styles.main_wrapper_content_title}><MdWavingHand className={styles.main_wrapper_content_title_icon} /> Hi! I'm Cristian.</p>
          <p className={styles.main_wrapper_content_subtitle}>I'm Sofware Developer.</p>
          <p className={styles.main_wrapper_content_description}>
            I love programming, <br />
            I have experience in creating web and mobile applications <br />
            with JavaScript, Reactjs, React Native, Nodejs and other technologies.
          </p>
        </div>
        <div className={styles.main_wrapper_content_info}>
          <a
            href="https://www.linkedin.com/in/cristian-viterales"
            target="_blank"
            aria-label="LinkedIn"
            rel="noopener noreferrer"
          >
            <Technology tech={"linkedin"} />
          </a>

          <a href="https://github.com/cviterales" target="_blank" aria-label="GitHub" rel="noopener noreferrer">
            <Technology tech={"github"} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
