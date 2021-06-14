import Technology from "../../components/Technology/Technology";
import AnimationButton from "../Animations/AnimationButton";
import styles from "./styles.module.scss";
import Image from '../UI/Image/Image'

const Main = () => {
  return (
    <section className={styles.main}>
      <div className={styles.main_wrapper}>
        <div className={styles.main_wrapper_container}>
          <Image src="./images/1b.jpg" alt="me" />
        </div>
      </div>
      <div className={styles.main_wrapper}>
        <div className={styles.main_wrapper_content}>
          <p className={styles.main_wrapper_content_title}>Hi! I'm Cristian.</p>
          <p className={styles.main_wrapper_content_subtitle}>I'm Sofware Developer.</p>
          <p className={styles.main_wrapper_content_description}>
            I love programming, <br />
            I have experience in creating web and mobile applications <br />
            with JavaScript, Reactjs, React Native, Nodejs and other technologies.
          </p>
          <div className={styles.main_wrapper_content_info}>
            <a
              href="https://www.linkedin.com/in/cristian-viterales"
              target="_blank"
              aria-label="LinkedIn"
              rel="noopener noreferrer"
            >
              <AnimationButton>
                <Technology tech={"linkedin"} />
              </AnimationButton>
            </a>

            <a href="https://github.com/cviterales" target="_blank" aria-label="GitHub" rel="noopener noreferrer">
              <AnimationButton>
                <Technology tech={"github"} />
              </AnimationButton>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
