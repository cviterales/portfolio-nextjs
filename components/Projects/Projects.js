import styles from "./styles.module.scss";
import Project from "./Project/Project";
import { projectData } from "../../dummyData/projectData";
import { Element } from "react-scroll";
const Projects = () => {
  const projects = projectData;

  const projectsHandler = (projects) => {
    return projects.map((project, i) => {
      return (
        <li className={styles.projects_list_items} key={i} index={i} delay={0.1}>
          <Project src={project.img} title={project.title} techs={project.techs} gh={project.gh} demo={project.demo} />
        </li>
      );
    });
  };
  return (
    <section className={styles.projects}>
      <Element name="projects">
        <h1 className={styles.projects_title}>{`<Projects />`}</h1>
        <ul className={styles.projects_list}>{projectsHandler(projects)}</ul>
      </Element>
    </section>
  );
};

export default Projects;
