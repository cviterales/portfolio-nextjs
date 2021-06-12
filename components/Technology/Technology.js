import styles from "./styles.module.scss";


const Technology = ({tech}) => {
  return (
    <div className={styles.technology}>
      <img src={`./logos/${tech}.svg`} alt={tech} className={styles.technology_img}/>
    </div>
  );
};

export default Technology;
