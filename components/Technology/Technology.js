import styles from "./styles.module.scss";
import Img from '../UI/Image/Img'
import AnimatedButton from "../Animations/Button/AnimationButton";

const Technology = ({ tech }) => {
  return (
    <AnimatedButton>
      <div className={styles.technology}>
        <Img src={`/logos/${tech}.svg`} alt={tech} />
      </div>
    </AnimatedButton>

  );
};

export default Technology;
