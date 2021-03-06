import { useInView } from "react-intersection-observer";
import styles from "./styles.module.scss";
import Project from "./Project/Project";
import { projectData } from "../../dummyData/projectData";
import Title from "../UI/Title/Title";
import AnimationList from "../Animations/List/AnimationList";
import AnimationItem from "../Animations/List/Item/AnimationItem";

const Projects = () => {
  const projects = projectData;
  const [ref, inView] = useInView();

  const projectsHandler = (projects) => {
    return projects.map((project, i) => {
      return (
        <AnimationItem className={styles.projects_list_items} key={project.title}>
          <Project src={project.img} title={project.title} techs={project.techs} gh={project.gh} demo={project.demo} />
        </AnimationItem>
      );
    });
  };
  return (
    <section className={styles.projects} id="projects" >
      <Title text={'<Projects />'} />
      <div ref={ref}>
        <AnimationList className={styles.projects_list} isVisible={inView} >{projectsHandler(projects)}</AnimationList>
      </div>
    </section>
  );
};

export default Projects;
