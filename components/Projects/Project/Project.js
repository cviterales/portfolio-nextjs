import AnimatedButton from "../../Animations/AnimationButton";
import styles from "./styles.module.scss";
import Technology from "../../Technology/Technology";
import Image from '../../UI/Image/Image'

const Project = ({ src, title, techs, gh, demo }) => {

  
  const technologyHandler = () => {
    return techs.map((technology, i) => {
      return (
        <li className={styles.project_technologies_items} key={i}>
          <Technology tech={technology} />
        </li>
      );
    });
  };

  return (
    <div className={styles.project}>
      <div className={styles.project_content}>
        <Image src={src} alt={"project"}/>
      </div>
      <p className={styles.project_title}>{title}</p>
      <ul className={styles.project_technologies}>{technologyHandler()}</ul>
      <div className={styles.project_items}>
        <AnimatedButton>
          <a
            className={styles.project_items_link}
            href={demo}
            alt={title}
            target="_blank"
            aria-label={title}
            rel="noopener noreferrer"
          >
            Demo
          </a>
        </AnimatedButton>
        <AnimatedButton>
          <a
            className={styles.project_items_link}
            href={gh}
            alt={title}
            target="_blank"
            aria-label={title}
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </AnimatedButton>
      </div>
    </div>
  );
};

export default Project;
