import styles from "./styles.module.scss";
import Technology from "../Technology/Technology";
import Img from "../../Atoms/Image/Img";
import Card from "../../Atoms/Card/Card";

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
    <Card styles={styles.project}>
      <div className={styles.project_content}>
        <Img src={src} alt={title} objFit="cover" />
      </div>
      <p className={styles.project_title}>{title}</p>
      <ul className={styles.project_technologies}>{technologyHandler()}</ul>
      <div className={styles.project_items}>
        <a
          className={`${styles.project_items_link} hoverScale`}
          href={demo}
          target="_blank"
          aria-label={`${title} demo`}
          rel="noopener noreferrer"
        >
          Demo
        </a>
        <a
          className={`${styles.project_items_link} hoverScale`}
          href={gh}
          target="_blank"
          aria-label={`${title} GitHub`}
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </Card>
  );
};

export default Project;
