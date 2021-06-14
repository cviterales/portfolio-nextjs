import styles from "./styles.module.scss";
import Image from '../UI/Image/Image'

const Technology = ({tech}) => {
  return (
    <div className={styles.technology}>
      <Image src={`./logos/${tech}.svg`} alt={tech} />
    </div>
  );
};

export default Technology;
