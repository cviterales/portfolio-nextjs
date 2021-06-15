import styles from "./styles.module.scss";
import Img from '../UI/Image/Img'

const Technology = ({tech}) => {
  return (
    <div className={styles.technology}>
      <Img src={`/logos/${tech}.svg`} alt={tech} />
    </div>
  );
};

export default Technology;
