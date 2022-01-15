import styles from "./styles.module.scss";
import Technology from "../Technology/Technology";
import { technologies } from "../../techs";
import { Element } from "react-scroll";
import Title from "../UI/Title/Title";
import Card from "../UI/Card/Card";

const About = () => {
  const technologyHandler = (techs) => {
    return techs.map((technology, i) => {
      return (
        <li className={styles.content_list_item} key={i}>
          <Technology tech={technology} />
          <p>{technology}</p>
        </li>
      );
    });
  };

  return (
    <section className={styles.about}>
      <Element name="about">
        <Title text={"{ About : Me }"} color={'#e7ecef'} />
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <Card styles={styles.card}>
              <p className={styles.content_title}>Something about me ...</p>
              <p className={styles.content_info}>
                My name is Cristian Viterales, <br />
                I'm from Mar del plata, Buenos Aires, Argentina. <br />I like tech and video games, but the most{" "}
                <strong>important! </strong>
                is that <strong>I love and enjoy coding.</strong>
              </p>
            </Card>
            <Card styles={styles.card}>
              <p className={styles.content_title}>... and some of my experience</p>
              <p className={styles.content_info}>
                I have been a software developer since 2009. In this way I have worked on frontend, backend and database
                with many technologies but my favorite areas are <strong>Frontend</strong> and <strong>Mobile. </strong>
                I like things to be fun and look good. <br />
                At work I'm responsible and persistent with the objectives, I like to help and share my experiences,
                learn new technologies and methodologies as well.
                <br />
              </p>
            </Card>
          </div>
          <div className={styles.content}>
            <Card styles={styles.card}>
              <p className={styles.content_title}>{"{ Some technologies I use and have experience }"}</p>
              <ul className={styles.content_list}>{technologyHandler(technologies)}</ul>
            </Card>
          </div>
        </div>
      </Element>
    </section>
  );
};

export default About;
